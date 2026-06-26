import { NextRequest, NextResponse } from "next/server";
import {
  findCapacityForLoad,
  findLoadsForCapacity,
  getMarketplaceMatches,
} from "@/lib/matching-engine";
import { query } from "@/lib/db";

/**
 * GET /api/matching?loadId=xxx — Find capacity for a specific load
 * GET /api/matching?capacityId=xxx — Find loads for a specific capacity listing
 * GET /api/matching — Get marketplace-wide matches
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const loadId = searchParams.get("loadId");
    const capacityId = searchParams.get("capacityId");
    const limit = parseInt(searchParams.get("limit") || "10", 10);

    // Match capacity for a specific load
    if (loadId) {
      const loadResults = query(
        `SELECT * FROM load_postings WHERE id = '${loadId.replace(/'/g, "''")}'`
      );
      if (loadResults.length === 0) {
        return NextResponse.json(
          { error: "Load posting not found" },
          { status: 404 }
        );
      }
      const matches = findCapacityForLoad(loadResults[0], limit);
      return NextResponse.json({
        load: loadResults[0],
        matches,
        matchCount: matches.length,
      });
    }

    // Match loads for a specific capacity listing
    if (capacityId) {
      const capResults = query(
        `SELECT cl.*, v.vehicle_type FROM capacity_listings cl
         LEFT JOIN vehicles v ON cl.vehicle_id = v.id
         WHERE cl.id = '${capacityId.replace(/'/g, "''")}'`
      );
      if (capResults.length === 0) {
        return NextResponse.json(
          { error: "Capacity listing not found" },
          { status: 404 }
        );
      }
      const matches = findLoadsForCapacity(capResults[0], limit);
      return NextResponse.json({
        capacity: capResults[0],
        matches,
        matchCount: matches.length,
      });
    }

    // Marketplace-wide matches
    const matches = getMarketplaceMatches(limit);
    return NextResponse.json({
      matches,
      matchCount: matches.length,
    });
  } catch (error) {
    console.error("Matching error:", error);
    return NextResponse.json(
      { error: "Matching engine error" },
      { status: 500 }
    );
  }
}