"use client";

import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Package, MapPin, Calendar, Truck, CheckCircle2, ChevronRight, Search } from "lucide-react";
import Link from "next/link";

export default function ShipperShipmentsPage() {
  const shipments = [
    {
      id: "SHP-7421",
      carrier: "Transporter Logistics Ltd",
      origin: "Johannesburg",
      destination: "Durban",
      pickup: "2026-06-25",
      status: "In Transit",
      progress: 65,
    },
    {
      id: "SHP-7425",
      carrier: "Cape Town Freight",
      origin: "Cape Town",
      destination: "Port Elizabeth",
      pickup: "2026-06-25",
      status: "Picking Up",
      progress: 10,
    },
    {
      id: "SHP-7312",
      carrier: "B-Forward Carriers",
      origin: "Pretoria",
      destination: "Polokwane",
      pickup: "2026-06-20",
      status: "Delivered",
      progress: 100,
    },
  ];

  return (
    <DashboardLayout role="shipper">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">My Shipments</h2>
          <p className="text-slate-500">Track your active freight and view delivery history.</p>
        </div>
        <Link href="/shipper/search">
          <Button className="gap-2">
            <Search size={18} /> Find More Capacity
          </Button>
        </Link>
      </div>

      <div className="space-y-6">
        {shipments.map((shipment) => (
          <Card key={shipment.id} className="hover:border-blue-200 transition-colors">
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">{shipment.id}</span>
                    <h3 className="font-bold text-slate-900">{shipment.carrier}</h3>
                  </div>
                  <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                    shipment.status === "Delivered" ? "bg-emerald-100 text-emerald-700" :
                    shipment.status === "In Transit" ? "bg-blue-100 text-blue-700" :
                    "bg-amber-100 text-amber-700"
                  }`}>
                    {shipment.status}
                  </span>
                </div>

                <div className="flex items-center gap-4 text-sm font-medium text-slate-900 mb-6">
                  <div className="flex items-center gap-1.5">
                    <MapPin size={14} className="text-slate-400" />
                    <span>{shipment.origin}</span>
                  </div>
                  <ChevronRight size={14} className="text-slate-300" />
                  <div className="flex items-center gap-1.5">
                    <MapPin size={14} className="text-blue-600" />
                    <span>{shipment.destination}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-xs text-slate-500">
                  <div className="flex items-center gap-2">
                    <Calendar size={14} />
                    <span>Pickup: {shipment.pickup}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Truck size={14} />
                    <span>Scania R450</span>
                  </div>
                </div>
              </div>

              <div className="lg:w-64 flex flex-col justify-center lg:border-l lg:pl-8 border-slate-100">
                <div className="mb-4">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-400 font-medium">Tracking</span>
                    <span className="text-slate-700 font-bold">{shipment.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${shipment.progress === 100 ? "bg-emerald-500" : "bg-blue-500"}`}
                      style={{ width: `${shipment.progress}%` }}
                    ></div>
                  </div>
                </div>
                <Link href={`/shipper/shipments/${shipment.id}`} className="w-full">
                  <Button variant="outline" size="sm" className="w-full gap-2">
                    View Details
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
}
