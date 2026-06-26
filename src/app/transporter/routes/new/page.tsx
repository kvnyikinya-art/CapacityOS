"use client";

import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Select } from "@/components/ui/Select";
import { Truck, Route, Calendar, Weight, Box, DollarSign, Plus, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ListCapacityPage() {
  const [isSubmitting, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    // In a real app, we would call the API here
    setTimeout(() => {
        window.location.href = "/transporter/routes";
    }, 1500);
  };

  if (isSubmitting) {
    return (
      <DashboardLayout role="transporter">
        <div className="flex flex-col items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-slate-600 font-medium">Listing your capacity...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout role="transporter">
      <div className="mb-8">
        <Link href="/transporter/routes" className="inline-flex items-center text-sm text-blue-600 hover:underline mb-4">
          <ArrowLeft size={16} className="mr-1" /> Back to Routes
        </Link>
        <h2 className="text-2xl font-bold text-slate-900">List New Capacity</h2>
        <p className="text-slate-500">Add available space on your scheduled routes to start receiving bookings.</p>
      </div>

      <div className="max-w-4xl">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <Card title="Route Information" icon={<Route size={18} />}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="origin">Origin City</Label>
                    <Input id="origin" placeholder="e.g. Johannesburg" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="destination">Destination City</Label>
                    <Input id="destination" placeholder="e.g. Durban" required />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="departure_date">Departure Date</Label>
                      <Input id="departure_date" type="date" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="arrival_date">Est. Arrival Date</Label>
                      <Input id="arrival_date" type="date" />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <input type="checkbox" id="is_cross_border" className="rounded text-blue-600" />
                    <Label htmlFor="is_cross_border" className="font-normal cursor-pointer">This is a cross-border route</Label>
                  </div>
                </div>
              </Card>

              <Card title="Vehicle & Capacity" icon={<Truck size={18} />}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="vehicle">Select Vehicle</Label>
                    <Select id="vehicle" required>
                      <option value="">Select a vehicle from fleet</option>
                      <option value="v1">GP 12345 - Scania R450</option>
                      <option value="v2">CA 98765 - Volvo FH16</option>
                      <option value="v3">ZN 55443 - Mercedes Actros</option>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="weight">Available Weight (kg)</Label>
                      <div className="relative">
                        <Input id="weight" type="number" placeholder="0" className="pl-8" required />
                        <Weight size={14} className="absolute left-2.5 top-3 text-slate-400" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="volume">Available Volume (m³)</Label>
                      <div className="relative">
                        <Input id="volume" type="number" placeholder="0" className="pl-8" required />
                        <Box size={14} className="absolute left-2.5 top-3 text-slate-400" />
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            <div className="space-y-6">
              <Card title="Pricing & Terms" icon={<DollarSign size={18} />}>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="rate_kg">Rate per kg (ZAR)</Label>
                      <Input id="rate_kg" type="number" step="0.01" placeholder="0.00" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="rate_m3">Rate per m³ (ZAR)</Label>
                      <Input id="rate_m3" type="number" step="0.01" placeholder="0.00" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="flat_rate">Flat Rate (Optional)</Label>
                    <Input id="flat_rate" type="number" step="0.01" placeholder="Enter fixed price" />
                  </div>
                  <div className="pt-2">
                    <p className="text-xs text-slate-500 italic">Note: A 16% domestic or 17.5% cross-border fee will be applied to the final transaction.</p>
                  </div>
                </div>
              </Card>

              <Card title="Additional Notes">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="notes">Special Instructions</Label>
                    <textarea 
                      id="notes" 
                      className="w-full h-32 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="e.g. Tailgate lift available, no hazardous materials, etc."
                    ></textarea>
                  </div>
                  <Button type="submit" className="w-full">
                    Publish Listing
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
