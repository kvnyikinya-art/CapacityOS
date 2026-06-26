"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Select } from "@/components/ui/Select";
import { Building2, Save, User } from "lucide-react";

export default function TransporterProfilePage() {
  return (
    <DashboardLayout role="transporter">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900">Profile Settings</h2>
        <p className="text-slate-500">Manage your personal and company information.</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 space-y-8">
          {/* User Information */}
          <Card title="Personal Information" icon={<User size={18} />}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="first_name">First Name</Label>
                <Input id="first_name" defaultValue="John" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last_name">Last Name</Label>
                <Input id="last_name" defaultValue="Doe" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" defaultValue="john@transporter.co.za" disabled />
                <p className="text-[10px] text-slate-400 italic">Email cannot be changed manually. Contact support.</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" defaultValue="+27 82 123 4567" />
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <Button size="sm" className="gap-2">
                <Save size={16} /> Save Changes
              </Button>
            </div>
          </Card>

          {/* Company Information */}
          <Card title="Company Profile" icon={<Building2 size={18} />}>
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="company_name">Registered Company Name</Label>
                <Input id="company_name" defaultValue="Transporter Logistics Ltd" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="reg_no">Registration No.</Label>
                  <Input id="reg_no" defaultValue="2020/556677/07" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tax_id">Tax ID</Label>
                  <Input id="tax_id" defaultValue="9988776655" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="vat_no">VAT Number</Label>
                  <Input id="vat_no" defaultValue="4433221100" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input id="website" defaultValue="https://www.transporter.co.za" />
              </div>

              <div className="pt-4 border-t border-slate-100">
                <h4 className="text-sm font-bold text-slate-900 mb-4">Business Address</h4>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="address1">Address Line 1</Label>
                    <Input id="address1" defaultValue="45 Logistics Way" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input id="city" defaultValue="Cape Town" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="province">Province</Label>
                      <Input id="province" defaultValue="Western Cape" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="postal">Postal Code</Label>
                      <Input id="postal" defaultValue="8001" />
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
          <Card title="Verification Status">
            <div className="flex items-center gap-3 p-3 bg-emerald-50 border border-emerald-100 rounded-lg">
              <div className="w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center">
                <CheckCircle2 size={20} />
              </div>
              <div>
                <div className="text-sm font-bold text-emerald-800">Verified Carrier</div>
                <div className="text-[10px] text-emerald-600">Since Oct 2024</div>
              </div>
            </div>
            
            <div className="mt-6 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Documents</span>
                <span className="text-slate-900 font-medium">3/3 Uploaded</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Bank Details</span>
                <span className="text-emerald-600 font-medium">Confirmed</span>
              </div>
            </div>
          </Card>

          <Card title="Account Security">
            <div className="space-y-4">
              <Button variant="outline" className="w-full justify-start text-xs font-bold uppercase tracking-wider h-auto py-3 px-4">
                Change Password
              </Button>
              <Button variant="outline" className="w-full justify-start text-xs font-bold uppercase tracking-wider h-auto py-3 px-4">
                Enable 2FA
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}

function CheckCircle2({ size, className }: { size?: number, className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}
