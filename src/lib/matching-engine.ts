/**
 * CapacityOS Smart Matching Engine
 * 
 * Matches load postings with available capacity listings based on:
 * - Route compatibility (origin → destination)
 * - Available weight vs. load weight
 * - Available volume vs. load volume
 * - Delivery dates alignment
 * - Vehicle type compatibility
 * - Cross-border consistency
 */

import { query } from "@/lib/db";

export interface MatchResult {
  score: number;
  capacityListing: Record<string, unknown>;
  loadPosting: Record<string, unknown>;
  matchReasons: string[];
}

export interface MatchFilters {
  originCity?: string;
  destinationCity?: string;
  minWeightKg?: number;
  maxWeightKg?: number;
  maxBudget?: number;
  dateFrom?: string;
  dateTo?: string;
}

/**
 * Find matching capacity listings for a given load posting.
 * Returns matches sorted by compatibility score (highest first).
 */
export function findCapacityForLoad(
  loadPosting: Record<string, unknown>,
  limit = 10
): MatchResult[] {
  const originCity = (loadPosting.origin_city as string).toLowerCase();
  const originCountry = (loadPosting.origin_country as string).toLowerCase();
  const destinationCity = (loadPosting.destination_city as string).toLowerCase();
  const destinationCountry = (loadPosting.destination_country as string).toLowerCase();
  const weightKg = loadPosting.weight_kg as number;
  const volumeM3 = (loadPosting.volume_m3 as number) || 0;
  const pickupDate = loadPosting.pickup_date as string;
  const isCrossBorder = (loadPosting.is_cross_border as number) === 1;

  // Query active capacity listings
  const allListings = query(
    `SELECT cl.*, v.vehicle_type, v.max_weight_kg as vehicle_max_weight, 
            v.max_volume_m3 as vehicle_max_volume
     FROM capacity_listings cl
     LEFT JOIN vehicles v ON cl.vehicle_id = v.id
     WHERE cl.status = 'active'
       AND LOWER(cl.origin_city) = '${originCity.replace(/'/g, "''")}'
       AND LOWER(cl.destination_city) = '${destinationCity.replace(/'/g, "''")}'
       AND cl.available_weight_kg >= ${weightKg}
     ORDER BY cl.departure_date ASC`
  );

  const matches: MatchResult[] = [];

  for (const listing of allListings) {
    const reasons: string[] = [];
    let score = 0;

    // --- Route match (same origin/destination — essential) ---
    const listingOrigin = (listing.origin_city as string).toLowerCase();
    const listingDest = (listing.destination_city as string).toLowerCase();
    
    if (listingOrigin === originCity && listingDest === destinationCity) {
      score += 40;
      reasons.push("Exact route match");
    }

    // --- Weight check ---
    const availWeight = listing.available_weight_kg as number;
    if (availWeight >= weightKg) {
      const utilization = weightKg / availWeight;
      score += 20;
      if (utilization > 0.8) {
        score += 10; // High utilization bonus
        reasons.push("High weight utilization");
      } else {
        reasons.push("Weight capacity available");
      }
    }

    // --- Volume check ---
    const availVolume = listing.available_volume_m3 as number;
    if (volumeM3 > 0 && availVolume > 0) {
      if (availVolume >= volumeM3) {
        score += 15;
        reasons.push("Volume capacity available");
      }
    } else if (volumeM3 === 0) {
      score += 10; // No volume requirement
    }

    // --- Date alignment ---
    const departDate = listing.departure_date as string;
    const arrivalDate = listing.arrival_date as string;

    // Load pickup should be on or after departure
    if (pickupDate >= departDate) {
      score += 10;
      reasons.push("Schedule aligned");
      // Bonus for tight date match
      const daysDiff = daysBetween(pickupDate, departDate);
      if (daysDiff <= 2) {
        score += 5;
        reasons.push("Tight date match");
      }
    }

    // Check arrival date constraint
    if (arrivalDate && loadPosting.delivery_date) {
      if ((loadPosting.delivery_date as string) <= arrivalDate) {
        score += 5;
      }
    }

    // --- Cross-border consistency ---
    const listingCrossBorder = (listing.is_cross_border as number) === 1;
    if (listingCrossBorder === isCrossBorder) {
      score += 5;
    }

    // --- Vehicle type check ---
    if (listing.vehicle_type) {
      const vt = (listing.vehicle_type as string).toLowerCase();
      const cargoType = ((loadPosting.cargo_type as string) || "").toLowerCase();
      
      if (cargoType === "refrigerated" && vt === "refrigerated") {
        score += 10;
        reasons.push("Refrigerated vehicle match");
      } else if (cargoType === "refrigerated" && vt !== "refrigerated") {
        score -= 20; // Major mismatch
      }
    }

    // --- Featured listing bonus ---
    if ((listing.is_featured as number) === 1) {
      score += 5;
      reasons.push("Featured carrier");
    }

    // --- Rate / budget check ---
    const budget = loadPosting.budget as number;
    if (budget && budget > 0) {
      const flatRate = listing.flat_rate as number;
      const ratePerKg = listing.rate_per_kg as number;
      
      if (flatRate && flatRate <= budget) {
        score += 10;
        reasons.push("Within budget (flat rate)");
      } else if (ratePerKg && (ratePerKg * weightKg) <= budget) {
        score += 8;
        reasons.push("Within budget (per kg)");
      }
    }

    // Only include if minimum score threshold met
    if (score >= 50) {
      matches.push({
        score,
        capacityListing: listing,
        loadPosting,
        matchReasons: reasons,
      });
    }
  }

  // Sort by score descending
  return matches.sort((a, b) => b.score - a.score).slice(0, limit);
}

/**
 * Find matching load postings for a given capacity listing.
 * Returns matches sorted by compatibility score (highest first).
 */
export function findLoadsForCapacity(
  capacityListing: Record<string, unknown>,
  limit = 10
): MatchResult[] {
  const originCity = (capacityListing.origin_city as string).toLowerCase();
  const destinationCity = (capacityListing.destination_city as string).toLowerCase();
  const availWeight = capacityListing.available_weight_kg as number;
  const availVolume = capacityListing.available_volume_m3 as number;
  const departDate = capacityListing.departure_date as string;

  // Query open load postings on matching route
  const allLoads = query(
    `SELECT * FROM load_postings 
     WHERE status = 'open'
       AND LOWER(origin_city) = '${originCity.replace(/'/g, "''")}'
       AND LOWER(destination_city) = '${destinationCity.replace(/'/g, "''")}'
       AND weight_kg <= ${availWeight}
     ORDER BY pickup_date ASC`
  );

  const matches: MatchResult[] = [];

  for (const load of allLoads) {
    const reasons: string[] = [];
    let score = 0;

    // Route match
    score += 40;
    reasons.push("Route match");

    // Weight utilization
    const loadWeight = load.weight_kg as number;
    const utilization = loadWeight / availWeight;
    score += 20;
    if (utilization > 0.8) {
      score += 10;
      reasons.push("High weight utilization");
    }

    // Volume
    const loadVolume = (load.volume_m3 as number) || 0;
    if (loadVolume > 0 && availVolume >= loadVolume) {
      score += 15;
    }

    // Date alignment
    const pickupDate = load.pickup_date as string;
    if (pickupDate >= departDate) {
      score += 15;
      reasons.push("Schedule aligned");
      const daysDiff = daysBetween(pickupDate, departDate);
      if (daysDiff <= 2) {
        score += 5;
        reasons.push("Tight date match");
      }
    }

    // Budget check
    const budget = load.budget as number;
    const flatRate = capacityListing.flat_rate as number;
    const ratePerKg = capacityListing.rate_per_kg as number;
    if (budget && budget > 0) {
      if (flatRate && flatRate <= budget) {
        score += 10;
        reasons.push("Within budget");
      } else if (ratePerKg && (ratePerKg * loadWeight) <= budget) {
        score += 8;
      }
    }

    if (score >= 50) {
      matches.push({
        score,
        capacityListing,
        loadPosting: load,
        matchReasons: reasons,
      });
    }
  }

  return matches.sort((a, b) => b.score - a.score).slice(0, limit);
}

/**
 * Get all potential matches across the marketplace.
 * Returns top matches for each open load posting.
 */
export function getMarketplaceMatches(limit = 50): MatchResult[] {
  const openLoads = query(
    "SELECT * FROM load_postings WHERE status = 'open' ORDER BY created_at DESC"
  );

  const allMatches: MatchResult[] = [];
  
  for (const load of openLoads) {
    const matches = findCapacityForLoad(load, 3);
    allMatches.push(...matches);
  }

  return allMatches.sort((a, b) => b.score - a.score).slice(0, limit);
}

function daysBetween(date1: string, date2: string): number {
  const d1 = new Date(date1).getTime();
  const d2 = new Date(date2).getTime();
  return Math.abs(Math.floor((d1 - d2) / (1000 * 60 * 60 * 24)));
}