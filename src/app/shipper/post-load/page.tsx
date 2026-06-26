"use client";

import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Select } from "@/components/ui/Select";
import { MapPin, Calendar, Package, Weight, Maximize, DollarSign, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function PostLoadPage() {
  const [isSubmitting, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
        window.location.href = "/shipper/shipments";
    }, 1500);
  };

  if (isSubmitting) {
    return (
      <DashboardLayout role="shipper">
        <div className="flex flex-col items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-slate-600 font-medium">Posting your load request...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout role="shipper">
      <div className="mb-8">
        <Link href="/shipper" className="inline-flex items-center text-sm text-blue-600 hover:underline mb-4">
          <ArrowLeft size={16} className="mr-1" /> Back to Overview
        </Link>
        <h2 className="text-2xl font-bold text-slate-900">Post a Load</h2>
        <p className="text-slate-500">Create a freight request to find transporters with matching capacity.</p>
      </div>

      <div className="max-w-4xl">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <Card title="Pickup & Delivery" icon={<MapPin size={18} />}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="origin">Pickup City</Label>
                    <Input id="origin" placeholder="City, Province" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="destination">Delivery City</Label>
                    <Input id="destination" placeholder="City, Province" required />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="pickup_date">Pickup Date</Label>
                      <Input id="pickup_date" type="date" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="delivery_date">Est. Delivery</Label>
                      <Input id="delivery_date" type="date" />
                    </div>
                  </div>
                </div>
              </Card>

              <Card title="Cargo Details" icon={<Package size={18} />}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="cargo_type">Cargo Type</Label>
                    <Select id="cargo_type" required>
                      <option value="">Select type</option>
                      <option value="general">General Cargo</option>
                      <option value="perishable">Perishable (Refrigerated)</option>
                      <option value="fragile">Fragile Goods</option>
                      <option value="hazardous">Hazardous Materials</option>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="weight">Total Weight (kg)</Label>
                      <Input id="weight" type="number" placeholder="0" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="volume">Total Volume (m³)</Label>
                      <Input id="volume" type="number" placeholder="0" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Cargo Description</Label>
                    <Input id="description" placeholder="e.g. 10 standard pallets of consumer electronics" />
                  </div>
                </div>
              </Card>
            </div>

            <div className="space-y-6">
              <Card title="Budget & Terms" icon={<DollarSign size={18} />}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="budget">Your Budget (ZAR)</Label>
                    <Input id="budget" type="number" placeholder="0.00" />
                    <p className="text-[10px] text-slate-400 mt-1 italic">This helps us match you with compatible transporters.</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="refrigeration" className="rounded text-blue-600" />
                    <Label htmlFor="refrigeration" className="font-normal cursor-pointer">Requires temperature control</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="insurance" className="rounded text-blue-600" />
                    <Label htmlFor="insurance" className="font-normal cursor-pointer">Cargo insurance requested</Label>
                  </div>
                </div>
              </Card>

              <Card title="Review & Post">
                <div className="space-y-4">
                  <p className="text-sm text-slate-600">
                    By posting this load, it will be visible to transporters on the CapacityOS marketplace. You will receive notifications when matches are found.
                  </p>
                  <Button type="submit" className="w-full">
                    Post Freight Request
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
