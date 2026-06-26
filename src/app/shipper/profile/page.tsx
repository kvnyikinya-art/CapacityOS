"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Select } from "@/components/ui/Select";
import { Building2, Save, User, ShieldCheck } from "lucide-react";

export default function ShipperProfilePage() {
  return (
    <DashboardLayout role="shipper">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900">Profile Settings</h2>
        <p className="text-slate-500">Manage your shipper profile and company billing details.</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 space-y-8">
          {/* User Information */}
          <Card title="Personal Information" icon={<User size={18} />}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="first_name">First Name</Label>
                <Input id="first_name" defaultValue="Sarah" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last_name">Last Name</Label>
                <Input id="last_name" defaultValue="Muller" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" defaultValue="sarah@retailcorp.co.za" disabled />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" defaultValue="+27 83 999 8888" />
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <Button size="sm" className="gap-2">
                <Save size={16} /> Save Changes
              </Button>
            </div>
          </Card>

          {/* Company Information */}
          <Card title="Company Information" icon={<Building2 size={18} />}>
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="company_name">Company Name</Label>
                <Input id="company_name" defaultValue="RetailCorp South Africa (Pty) Ltd" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="reg_no">Registration No.</Label>
                  <Input id="reg_no" defaultValue="2015/123456/07" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tax_id">Tax ID</Label>
                  <Input id="tax_id" defaultValue="1122334455" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="vat_no">VAT Number</Label>
                  <Input id="vat_no" defaultValue="6677889900" />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <h4 className="text-sm font-bold text-slate-900 mb-4">Billing Address</h4>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="address1">Address Line 1</Label>
                    <Input id="address1" defaultValue="100 Business Boulevard" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input id="city" defaultValue="Sandton" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="province">Province</Label>
                      <Input id="province" defaultValue="Gauteng" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="postal">Postal Code</Label>
                      <Input id="postal" defaultValue="2196" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="country">Country</Label>
                      <Select id="country" defaultValue="ZA">
                        <option value="ZA">South Africa</option>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <Button size="sm" className="gap-2">
                <Save size={16} /> Save Company Details
              </Button>
            </div>
          </Card>
        </div>

        <div className="space-y-8">
          <Card title="Shipper Verification">
            <div className="flex items-center gap-3 p-3 bg-blue-50 border border-blue-100 rounded-lg">
              <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center">
                <ShieldCheck size={20} />
              </div>
              <div>
                <div className="text-sm font-bold text-blue-800">Verified Shipper</div>
                <div className="text-[10px] text-blue-600">Premium Account</div>
              </div>
            </div>
            
            <div className="mt-6 space-y-4">
              <div className="p-3 border border-slate-100 rounded-lg">
                <div className="text-xs text-slate-500 mb-1">Platform Credit Limit</div>
                <div className="text-lg font-bold text-slate-900">R 250,000</div>
              </div>
            </div>
          </Card>

          <Card title="Preferences">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="notif" className="font-normal text-slate-600">Email Notifications</Label>
                <input type="checkbox" id="notif" defaultChecked className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300" />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="cross" className="font-normal text-slate-600">Show Cross-Border Only</Label>
                <input type="checkbox" id="cross" className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300" />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
