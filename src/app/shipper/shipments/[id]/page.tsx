"use client";

import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { MapPin, Calendar, Package, FileText, Truck, Clock, ArrowLeft, Download, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function ShipperShipmentDetailPage({ params }: { params: { id: string } }) {
  const steps = [
    { label: "Order Confirmed", date: "Jun 24, 09:15", completed: true },
    { label: "Cargo Picked Up", date: "Jun 25, 10:30", completed: true },
    { label: "In Transit", date: "Jun 25, 14:45", completed: true, current: true },
    { label: "Delivered", date: "Pending", completed: false },
  ];

  return (
    <DashboardLayout role="shipper">
      <div className="mb-8">
        <Link href="/shipper/shipments" className="inline-flex items-center text-sm text-blue-600 hover:underline mb-4">
          <ArrowLeft size={16} className="mr-1" /> Back to My Shipments
        </Link>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Tracking {params.id || "SHP-7421"}</h2>
            <p className="text-slate-500">Carrier: Transporter Logistics Ltd • Johannesburg → Durban</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="gap-2">
              <ShieldCheck size={18} /> Contact Carrier
            </Button>
            <Button variant="outline" className="gap-2">
              <FileText size={18} /> View Invoice
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Tracking Visualization */}
          <Card title="Shipment Status" icon={<Truck size={18} />}>
            <div className="relative py-8 px-4">
              <div className="absolute left-[31px] top-12 bottom-12 w-0.5 bg-slate-100"></div>
              
              <div className="space-y-12">
                {steps.map((step, i) => (
                  <div key={i} className="relative flex items-start gap-6">
                    <div className={`z-10 w-8 h-8 rounded-full flex items-center justify-center border-4 border-white shadow-sm ${
                      step.completed ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-400"
                    }`}>
                      {step.completed ? <ShieldCheck size={16} /> : <div className="w-2 h-2 rounded-full bg-current"></div>}
                    </div>
                    <div>
                      <h4 className={`font-bold text-sm ${step.current ? "text-blue-600" : "text-slate-900"}`}>
                        {step.label}
                      </h4>
                      <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
                        <Clock size={12} />
                        <span>{step.date}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-8 h-64 bg-slate-100 rounded-xl flex items-center justify-center border border-slate-200 overflow-hidden relative">
                <div className="absolute inset-0 bg-blue-50 opacity-50 flex items-center justify-center">
                    <div className="w-full h-full flex flex-col p-4">
                         <div className="w-full h-full border-2 border-dashed border-blue-200 rounded-lg flex items-center justify-center text-blue-300 font-bold italic">
                            [ LIVE MAP VISUALIZATION ]
                         </div>
                    </div>
                </div>
            </div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card title="Carrier Details" icon={<Truck size={18} />}>
                <div className="space-y-4">
                    <div>
                        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Company</div>
                        <div className="text-sm font-bold text-slate-900">Transporter Logistics Ltd</div>
                        <div className="text-xs text-slate-500">Verified Premium Carrier</div>
                    </div>
                    <div>
                        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Vehicle</div>
                        <div className="text-sm font-bold text-slate-900">Scania R450 (GP 12345)</div>
                    </div>
                </div>
            </Card>

            <Card title="Cargo Info" icon={<Package size={18} />}>
                <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                        <span className="text-slate-500">Weight</span>
                        <span className="text-slate-900 font-medium">1,200 kg</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-slate-500">Volume</span>
                        <span className="text-slate-900 font-medium">4.5 m³</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-slate-500">Insurance</span>
                        <span className="text-emerald-600 font-medium">Active</span>
                    </div>
                </div>
            </Card>
          </div>
        </div>

        <div className="space-y-8">
          {/* POD Record Section */}
          <Card title="Proof of Delivery" icon={<FileText size={18} />}>
            <div className="flex flex-col items-center justify-center py-8 text-center">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                    <FileText size={32} className="text-slate-300" />
                </div>
                <h4 className="text-sm font-bold text-slate-900 mb-1">POD Pending</h4>
                <p className="text-xs text-slate-500 max-w-[200px]">The signed delivery document will appear here once the shipment is completed.</p>
            </div>
            
            <div className="pt-6 border-t border-slate-100">
                <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3">Available Documents</h5>
                <button className="w-full flex items-center justify-between text-xs p-3 hover:bg-slate-50 rounded-lg border border-slate-100 mb-2 transition-colors group">
                    <div className="flex items-center gap-2">
                        <FileText size={14} className="text-blue-500" />
                        <span className="text-slate-700">Waybill-7421.pdf</span>
                    </div>
                    <Download size={14} className="text-slate-400 group-hover:text-blue-500" />
                </button>
            </div>
          </Card>

          <Card title="Support">
            <p className="text-xs text-slate-500 mb-4">Having issues with this shipment? Our support team is available 24/7.</p>
            <Button variant="outline" size="sm" className="w-full">Open Dispute / Help</Button>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
