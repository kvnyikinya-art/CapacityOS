"use client";

import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Truck, Route, Calendar, Weight, Box, Plus, MoreVertical, Edit2, Trash2 } from "lucide-react";
import Link from "next/link";

export default function ManageRoutesPage() {
  const listings = [
    { 
      id: "CL-1001",
      origin: "Johannesburg", 
      destination: "Durban", 
      departure: "2026-06-28", 
      arrival: "2026-06-29",
      vehicle: "Scania R450 (GP 12345)",
      weight: "4500kg", 
      volume: "12m³", 
      rate: "R 2.50/kg", 
      status: "Active" 
    },
    { 
      id: "CL-1002",
      origin: "Cape Town", 
      destination: "Port Elizabeth", 
      departure: "2026-06-29", 
      arrival: "2026-06-30",
      vehicle: "Volvo FH16 (CA 98765)",
      weight: "2000kg", 
      volume: "8m³", 
      rate: "R 3.10/kg", 
      status: "Partial" 
    },
    { 
      id: "CL-1003",
      origin: "Pretoria", 
      destination: "Bloemfontein", 
      departure: "2026-07-01", 
      arrival: "2026-07-01",
      vehicle: "Mercedes Actros (ZN 55443)",
      weight: "8000kg", 
      volume: "20m³", 
      rate: "R 2.20/kg", 
      status: "Active" 
    },
  ];

  return (
    <DashboardLayout role="transporter">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Manage Capacity Listings</h2>
          <p className="text-slate-500">View and update your active routes and available space.</p>
        </div>
        <Link href="/transporter/routes/new">
          <Button className="gap-2">
            <Plus size={18} /> List New Capacity
          </Button>
        </Link>
      </div>

      <div className="space-y-6">
        {listings.map((listing) => (
          <Card key={listing.id} className="hover:border-blue-200 transition-colors">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">{listing.id}</span>
                  <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                    listing.status === "Active" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                  }`}>
                    {listing.status}
                  </span>
                </div>
                
                <div className="flex items-center gap-4 text-lg font-bold text-slate-900 mb-4">
                  <span>{listing.origin}</span>
                  <Route size={18} className="text-slate-400" />
                  <span>{listing.destination}</span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-slate-600">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-slate-400" />
                    <span>{listing.departure}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Truck size={16} className="text-slate-400" />
                    <span className="truncate">{listing.vehicle}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Weight size={16} className="text-slate-400" />
                    <span>{listing.weight} available</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Box size={16} className="text-slate-400" />
                    <span>{listing.volume} available</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 lg:border-l lg:pl-8 border-slate-100">
                <div className="text-right mr-4">
                  <div className="text-xs text-slate-400 uppercase font-bold tracking-wider">Rate</div>
                  <div className="text-lg font-bold text-slate-900">{listing.rate}</div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="gap-2">
                    <Edit2 size={14} /> Edit
                  </Button>
                  <Button variant="outline" size="sm" className="text-red-600 hover:bg-red-50 hover:text-red-700 border-red-100">
                    <Trash2 size={14} />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
}
