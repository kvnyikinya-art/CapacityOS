"use client";

import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Select } from "@/components/ui/Select";
import { Users, UserPlus, FileBadge, Calendar, Phone, Mail } from "lucide-react";

export default function DriversManagementPage() {
  const [showAddForm, setShowAddForm] = useState(false);

  return (
    <DashboardLayout role="transporter">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Driver Management</h2>
          <p className="text-slate-500">Manage your team of professional drivers.</p>
        </div>
        <Button onClick={() => setShowAddForm(!showAddForm)} className="gap-2">
          <UserPlus size={18} /> Add New Driver
        </Button>
      </div>

      {showAddForm && (
        <Card title="Add New Driver Profile" className="mb-8 border-blue-200 bg-blue-50/30">
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="fname">First Name</Label>
                <Input id="fname" placeholder="Thabo" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lname">Last Name</Label>
                <Input id="lname" placeholder="Molefe" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="license">License Number</Label>
                <Input id="license" placeholder="1234567890" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="class">License Class</Label>
                <Select id="class">
                  <option>Code 14 (EC)</option>
                  <option>Code 10 (C1)</option>
                  <option>Code 8 (EB)</option>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="expiry">License Expiry</Label>
                <Input id="expiry" type="date" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="dphone">Phone Number</Label>
                <Input id="dphone" type="tel" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dmail">Email Address</Label>
                <Input id="dmail" type="email" />
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setShowAddForm(false)}>Cancel</Button>
              <Button>Save Driver Profile</Button>
            </div>
          </form>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[
          { name: "Sipho Kumalo", license: "Code 14", exp: "8 years", status: "Active", phone: "+27 71 222 3344" },
          { name: "David Miller", license: "Code 14", exp: "12 years", status: "On Route", phone: "+27 82 555 6677" },
          { name: "Petrus Venter", license: "Code 10", exp: "5 years", status: "Available", phone: "+27 60 888 9900" },
        ].map((driver, i) => (
          <Card key={i} className="hover:border-blue-200 transition-colors">
            <div className="flex items-start justify-between">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
                  <Users size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">{driver.name}</h4>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1">
                    <div className="flex items-center gap-1 text-xs text-slate-500">
                      <FileBadge size={14} className="text-blue-500" /> {driver.license}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-slate-500">
                      <Calendar size={14} className="text-blue-500" /> {driver.exp} experience
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2">
                    <div className="flex items-center gap-1 text-xs text-slate-500 underline">
                      <Phone size={14} /> {driver.phone}
                    </div>
                  </div>
                </div>
              </div>
              <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                driver.status === "Active" ? "bg-emerald-100 text-emerald-700" :
                driver.status === "On Route" ? "bg-blue-100 text-blue-700" :
                "bg-amber-100 text-amber-700"
              }`}>
                {driver.status}
              </span>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-50 flex gap-2">
              <Button variant="outline" size="sm" className="flex-1">Edit Profile</Button>
              <Button variant="outline" size="sm" className="flex-1">View Documents</Button>
            </div>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
}
