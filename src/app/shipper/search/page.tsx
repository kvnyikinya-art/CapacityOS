"use client";

import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Route, MapPin, Calendar, Search, Filter, Truck, ArrowRight, Star } from "lucide-react";
import Link from "next/link";

export default function SearchCapacityPage() {
  const results = [
    {
      id: "CL-1001",
      carrier: "Transporter Logistics Ltd",
      rating: 4.8,
      origin: "Johannesburg",
      destination: "Durban",
      departure: "2026-06-28",
      vehicle: "Scania R450",
      available_weight: "4500kg",
      available_volume: "12m³",
      rate: "R 2.50/kg",
    },
    {
      id: "CL-1005",
      carrier: "FastTrack Solutions",
      rating: 4.5,
      origin: "Johannesburg",
      destination: "Durban",
      departure: "2026-06-27",
      vehicle: "Volvo FH16",
      available_weight: "2000kg",
      available_volume: "6m³",
      rate: "R 2.75/kg",
    },
    {
      id: "CL-1009",
      carrier: "B-Forward Carriers",
      rating: 4.2,
      origin: "Johannesburg",
      destination: "Durban",
      departure: "2026-06-30",
      vehicle: "Mercedes Actros",
      available_weight: "10000kg",
      available_volume: "25m³",
      rate: "R 2.10/kg",
    },
  ];

  return (
    <DashboardLayout role="shipper">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900">Search Available Capacity</h2>
        <p className="text-slate-500">Find transporters with unused space on your required routes.</p>
      </div>

      <Card className="mb-8">
        <form className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div className="space-y-2">
            <Label htmlFor="origin">From</Label>
            <div className="relative">
              <Input id="origin" placeholder="Origin City" className="pl-8" defaultValue="Johannesburg" />
              <MapPin size={14} className="absolute left-2.5 top-3 text-slate-400" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="destination">To</Label>
            <div className="relative">
              <Input id="destination" placeholder="Destination City" className="pl-8" defaultValue="Durban" />
              <MapPin size={14} className="absolute left-2.5 top-3 text-slate-400" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <div className="relative">
              <Input id="date" type="date" className="pl-8" />
              <Calendar size={14} className="absolute left-2.5 top-3 text-slate-400" />
            </div>
          </div>
          <Button className="gap-2">
            <Search size={18} /> Search Capacity
          </Button>
        </form>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <Card title="Filters" icon={<Filter size={18} />}>
            <div className="space-y-6">
              <div>
                <Label className="mb-3 block">Vehicle Type</Label>
                <div className="space-y-2">
                  {["Curtainside", "Refrigerated", "Flatbed", "Container"].map((type) => (
                    <div key={type} className="flex items-center gap-2">
                      <input type="checkbox" id={type} className="rounded text-blue-600" />
                      <label htmlFor={type} className="text-sm text-slate-600">{type}</label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <Label className="mb-3 block">Carrier Rating</Label>
                <div className="space-y-2">
                  {[4, 3, 2].map((rating) => (
                    <div key={rating} className="flex items-center gap-2">
                      <input type="checkbox" id={`r-${rating}`} className="rounded text-blue-600" />
                      <label htmlFor={`r-${rating}`} className="text-sm text-slate-600 flex items-center gap-1">
                        {rating}+ Stars <Star size={12} className="fill-amber-400 text-amber-400" />
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <Button variant="outline" className="w-full text-xs font-bold uppercase tracking-wider">Reset Filters</Button>
            </div>
          </Card>
        </div>

        <div className="lg:col-span-3 space-y-6">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">Showing <span className="font-bold text-slate-900">{results.length}</span> available routes</p>
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-500">Sort by:</span>
              <select className="text-sm border-none bg-transparent font-bold text-slate-900 focus:ring-0 cursor-pointer">
                <option>Lowest Rate</option>
                <option>Earliest Departure</option>
                <option>Highest Rating</option>
              </select>
            </div>
          </div>

          {results.map((listing) => (
            <Card key={listing.id} className="hover:border-blue-300 transition-all group">
              <div className="flex flex-col md:flex-row justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="font-bold text-slate-900">{listing.carrier}</h3>
                    <div className="flex items-center gap-1 bg-amber-50 text-amber-700 px-2 py-0.5 rounded text-[10px] font-bold border border-amber-100">
                      <Star size={10} className="fill-amber-500" />
                      {listing.rating}
                    </div>
                    {listing.rating >= 4.5 && <span className="text-[10px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded font-bold border border-blue-100 uppercase tracking-tight">Top Rated</span>}
                  </div>

                  <div className="flex items-center gap-4 text-lg font-bold text-slate-900 mb-4">
                    <span>{listing.origin}</span>
                    <Route size={18} className="text-slate-300" />
                    <span>{listing.destination}</span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-slate-600">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-slate-400" />
                      <span>{listing.departure}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Truck size={16} className="text-slate-400" />
                      <span>{listing.vehicle}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-blue-600">{listing.available_weight}</span>
                      <span className="text-slate-400">/</span>
                      <span className="font-bold text-blue-600">{listing.available_volume}</span>
                    </div>
                  </div>
                </div>

                <div className="md:w-48 flex flex-col justify-center items-end md:border-l md:pl-6 border-slate-100">
                  <div className="text-right mb-4">
                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Starting at</div>
                    <div className="text-2xl font-black text-slate-900">{listing.rate}</div>
                  </div>
                  <Button className="w-full gap-2 group-hover:scale-105 transition-transform">
                    Book Now <ArrowRight size={16} />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
