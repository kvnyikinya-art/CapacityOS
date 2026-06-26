"use client";

import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { MapPin, Calendar, Package, Weight, Box, FileText, Upload, CheckCircle2, ArrowLeft, Truck, Clock } from "lucide-react";
import Link from "next/link";

export default function ShipmentDetailPage({ params }: { params: { id: string } }) {
  const [status, setStatus] = useState("In Transit");
  const [podUploaded, setPodUploaded] = useState(false);

  const steps = [
    { label: "Booked", date: "Jun 24, 09:15", completed: true },
    { label: "Picked Up", date: "Jun 25, 10:30", completed: true },
    { label: "In Transit", date: "Jun 25, 14:45", completed: true, current: true },
    { label: "Delivered", date: "Pending", completed: false },
  ];

  return (
    <DashboardLayout role="transporter">
      <div className="mb-8">
        <Link href="/transporter/shipments" className="inline-flex items-center text-sm text-blue-600 hover:underline mb-4">
          <ArrowLeft size={16} className="mr-1" /> Back to Shipments
        </Link>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Shipment {params.id || "SHP-7421"}</h2>
            <p className="text-slate-500">RetailCorp South • Johannesburg → Durban</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="gap-2">
              <FileText size={18} /> View Invoice
            </Button>
            <Button className="gap-2">
              Update Status
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Tracking Visualization */}
          <Card title="Real-time Tracking" icon={<Truck size={18} />}>
            <div className="relative py-8 px-4">
              {/* Vertical line */}
              <div className="absolute left-[31px] top-12 bottom-12 w-0.5 bg-slate-100"></div>
              
              <div className="space-y-12">
                {steps.map((step, i) => (
                  <div key={i} className="relative flex items-start gap-6">
                    <div className={`z-10 w-8 h-8 rounded-full flex items-center justify-center border-4 border-white shadow-sm ${
                      step.completed ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-400"
                    }`}>
                      {step.completed ? <CheckCircle2 size={16} /> : <div className="w-2 h-2 rounded-full bg-current"></div>}
                    </div>
                    <div>
                      <h4 className={`font-bold text-sm ${step.current ? "text-blue-600" : "text-slate-900"}`}>
                        {step.label} {step.current && <span className="ml-2 text-[10px] bg-blue-100 px-2 py-0.5 rounded-full uppercase tracking-wider">Current</span>}
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
                {/* Mock Map Background */}
                <div className="absolute inset-0 bg-blue-50 opacity-50 flex items-center justify-center">
                    <div className="w-full h-full flex flex-col p-4">
                         <div className="w-full h-full border-2 border-dashed border-blue-200 rounded-lg flex items-center justify-center text-blue-300 font-bold italic">
                            [ LIVE MAP VISUALIZATION OVERLAY ]
                         </div>
                    </div>
                </div>
                <div className="relative z-10 bg-white p-3 rounded-lg shadow-lg border border-blue-100 flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center">
                        <Truck size={20} />
                    </div>
                    <div>
                        <div className="text-xs font-bold text-slate-900 italic">CapacityOS Tracker</div>
                        <div className="text-[10px] text-slate-500">Currently near Harrismith, N3</div>
                    </div>
                </div>
            </div>
          </Card>

          {/* Shipment Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card title="Cargo Summary" icon={<Package size={18} />}>
                <div className="space-y-4">
                    <div className="flex justify-between border-b border-slate-50 pb-2">
                        <span className="text-slate-500 text-sm">Type</span>
                        <span className="text-slate-900 font-medium text-sm">General Cargo</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-50 pb-2">
                        <span className="text-slate-500 text-sm">Weight</span>
                        <span className="text-slate-900 font-medium text-sm">1,200 kg</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-50 pb-2">
                        <span className="text-slate-500 text-sm">Volume</span>
                        <span className="text-slate-900 font-medium text-sm">4.5 m³</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-slate-500 text-sm">Items</span>
                        <span className="text-slate-900 font-medium text-sm">12 Pallets</span>
                    </div>
                </div>
            </Card>

            <Card title="Route Information" icon={<MapPin size={18} />}>
                <div className="space-y-4">
                    <div>
                        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Pickup</div>
                        <div className="text-sm font-bold text-slate-900">Johannesburg DC</div>
                        <div className="text-xs text-slate-500">123 Logistics Park, Jet Park</div>
                    </div>
                    <div className="pt-2">
                        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Delivery</div>
                        <div className="text-sm font-bold text-slate-900">Durban Port Warehouse</div>
                        <div className="text-xs text-slate-500">45 Quay Street, Point, Durban</div>
                    </div>
                </div>
            </Card>
          </div>
        </div>

        <div className="space-y-8">
          {/* POD Section */}
          <Card title="Proof of Delivery (POD)" icon={<FileText size={18} />}>
            <div className="space-y-6">
                {!podUploaded ? (
                    <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center bg-slate-50/50 hover:bg-slate-50 hover:border-blue-300 transition-all cursor-pointer group">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm group-hover:scale-110 transition-transform">
                            <Upload size={24} className="text-blue-600" />
                        </div>
                        <h4 className="text-sm font-bold text-slate-900 mb-1">Upload POD</h4>
                        <p className="text-xs text-slate-500">Upload signed document or photo of receipt</p>
                        <input type="file" className="hidden" id="pod-upload" onChange={() => setPodUploaded(true)} />
                        <label htmlFor="pod-upload" className="absolute inset-0 cursor-pointer"></label>
                    </div>
                ) : (
                    <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 flex items-start gap-3">
                        <div className="w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center shrink-0">
                            <CheckCircle2 size={18} />
                        </div>
                        <div className="flex-1">
                            <h4 className="text-sm font-bold text-emerald-900">POD Received</h4>
                            <p className="text-xs text-emerald-600 mb-3">Uploaded on Jun 25, 16:20</p>
                            <div className="flex gap-2">
                                <Button variant="outline" size="sm" className="bg-white border-emerald-200 text-emerald-700 h-7 text-[10px]">View Doc</Button>
                                <Button variant="outline" size="sm" className="bg-white border-emerald-200 text-emerald-700 h-7 text-[10px]" onClick={() => setPodUploaded(false)}>Change</Button>
                            </div>
                        </div>
                    </div>
                )}

                <div className="space-y-3">
                    <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Document History</h5>
                    <div className="flex items-center justify-between text-xs p-2 hover:bg-slate-50 rounded-lg group">
                        <div className="flex items-center gap-2">
                            <FileText size={14} className="text-slate-400" />
                            <span className="text-slate-700">Waybill-7421.pdf</span>
                        </div>
                        <span className="text-slate-400">0.8 MB</span>
                    </div>
                    <div className="flex items-center justify-between text-xs p-2 hover:bg-slate-50 rounded-lg group">
                        <div className="flex items-center gap-2">
                            <FileText size={14} className="text-slate-400" />
                            <span className="text-slate-700">Packing-List.pdf</span>
                        </div>
                        <span className="text-slate-400">1.2 MB</span>
                    </div>
                </div>
            </div>
          </Card>

          <Card title="Transporter Notes">
            <textarea 
                className="w-full h-32 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                placeholder="Add internal notes about this shipment..."
            ></textarea>
            <Button size="sm" variant="outline" className="w-full mt-3">Save Note</Button>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
