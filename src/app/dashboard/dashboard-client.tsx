"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Truck, Package, Users, LogOut, User, Shield } from "lucide-react";
import type { CapacityOSUser } from "@/lib/auth";

interface DashboardClientProps {
  user: CapacityOSUser;
}

export default function DashboardClient({ user }: DashboardClientProps) {
  const router = useRouter();

  const roleLabels: Record<string, string> = {
    shipper: "Shipper",
    transporter: "Transporter",
    driver: "Driver",
    admin: "Administrator",
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Truck className="h-7 w-7 text-blue-600" />
            <span className="text-lg font-bold text-slate-900">CapacityOS</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <User className="h-4 w-4" />
              <span>{user.firstName} {user.lastName}</span>
              <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                {roleLabels[user.role] || user.role}
              </span>
            </div>
            <button
              onClick={() => signOut({ callbackUrl: "/auth/login" })}
              className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-red-600 transition px-3 py-1.5 rounded-lg hover:bg-red-50"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900">
            Welcome, {user.firstName}!
          </h1>
          <p className="text-slate-600 mt-1">
            You are logged in as a <strong>{roleLabels[user.role]}</strong>.
            {user.isVerified
              ? " Your account is verified."
              : " Please verify your email to access all features."}
          </p>
        </div>

        {/* Role-based quick actions */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {(user.role === "transporter" || user.role === "admin") && (
            <div className="bg-white rounded-xl border p-6 hover:shadow-md transition cursor-pointer">
              <Truck className="h-8 w-8 text-blue-600 mb-3" />
              <h3 className="font-semibold text-slate-900">List Capacity</h3>
              <p className="text-sm text-slate-600 mt-1">Sell unused space on your scheduled routes</p>
            </div>
          )}
          {(user.role === "shipper" || user.role === "admin") && (
            <div className="bg-white rounded-xl border p-6 hover:shadow-md transition cursor-pointer">
              <Package className="h-8 w-8 text-green-600 mb-3" />
              <h3 className="font-semibold text-slate-900">Post a Load</h3>
              <p className="text-sm text-slate-600 mt-1">Find cost-effective transport for your goods</p>
            </div>
          )}
          {(user.role === "driver" || user.role === "admin") && (
            <div className="bg-white rounded-xl border p-6 hover:shadow-md transition cursor-pointer">
              <Users className="h-8 w-8 text-purple-600 mb-3" />
              <h3 className="font-semibold text-slate-900">Find Work</h3>
              <p className="text-sm text-slate-600 mt-1">Browse driving opportunities near you</p>
            </div>
          )}
          {user.role === "admin" && (
            <div className="bg-white rounded-xl border p-6 hover:shadow-md transition cursor-pointer">
              <Shield className="h-8 w-8 text-amber-600 mb-3" />
              <h3 className="font-semibold text-slate-900">Admin Panel</h3>
              <p className="text-sm text-slate-600 mt-1">Manage users, verify payments, view analytics</p>
            </div>
          )}
        </div>

        {/* Account Info */}
        <div className="bg-white rounded-xl border p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Account Details</h2>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-slate-500">Email</span>
              <p className="font-medium text-slate-900">{user.email}</p>
            </div>
            <div>
              <span className="text-slate-500">Role</span>
              <p className="font-medium text-slate-900 capitalize">{roleLabels[user.role]}</p>
            </div>
            <div>
              <span className="text-slate-500">Status</span>
              <p className={`font-medium ${user.isActive ? "text-green-600" : "text-red-600"}`}>
                {user.isActive ? "Active" : "Inactive"}
              </p>
            </div>
            <div>
              <span className="text-slate-500">Verified</span>
              <p className={`font-medium ${user.isVerified ? "text-green-600" : "text-amber-600"}`}>
                {user.isVerified ? "Yes" : "No"}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}