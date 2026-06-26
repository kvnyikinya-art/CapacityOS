"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Truck,
  Package,
  Route,
  BarChart3,
  Users,
  Settings,
  ShieldCheck,
  FileText,
  CreditCard,
  LogOut,
} from "lucide-react";

const transporterLinks = [
  { href: "/transporter", label: "Overview", icon: LayoutDashboard },
  { href: "/transporter/fleet", label: "Fleet", icon: Truck },
  { href: "/transporter/drivers", label: "Drivers", icon: Users },
  { href: "/transporter/routes", label: "Routes", icon: Route },
  { href: "/transporter/shipments", label: "Active Shipments", icon: Package },
  { href: "/transporter/earnings", label: "Earnings", icon: BarChart3 },
  { href: "/transporter/profile", label: "Company Profile", icon: Settings },
];

const shipperLinks = [
  { href: "/shipper", label: "Overview", icon: LayoutDashboard },
  { href: "/shipper/search", label: "Search Capacity", icon: Route },
  { href: "/shipper/post-load", label: "Post Load", icon: Package },
  { href: "/shipper/shipments", label: "My Shipments", icon: Truck },
  { href: "/shipper/invoices", label: "Invoices", icon: FileText },
  { href: "/shipper/profile", label: "Account Profile", icon: Settings },
];

const adminLinks = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/companies", label: "Companies", icon: ShieldCheck },
  { href: "/admin/shipments", label: "Shipments", icon: Truck },
  { href: "/admin/payments", label: "Payments", icon: CreditCard },
  { href: "/admin/audit", label: "Audit Log", icon: FileText },
  { href: "/admin/settings", label: "Platform Settings", icon: Settings },
];

interface SidebarProps {
  role: "transporter" | "shipper" | "admin";
}

export function Sidebar({ role }: SidebarProps) {
  const pathname = usePathname();
  
  const links = {
    transporter: transporterLinks,
    shipper: shipperLinks,
    admin: adminLinks,
  }[role];

  return (
    <div className="flex flex-col h-full bg-slate-900 text-slate-300 w-64 border-r border-slate-800">
      <div className="p-6">
        <h1 className="text-xl font-bold text-white flex items-center gap-2">
          <Truck className="text-blue-500" />
          <span>CapacityOS</span>
        </h1>
      </div>
      
      <nav className="flex-1 px-4 space-y-1">
        <div className="pb-4 text-xs font-semibold text-slate-500 uppercase tracking-wider px-2">
          {role} Menu
        </div>
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;
          
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                isActive 
                  ? "bg-blue-600 text-white" 
                  : "hover:bg-slate-800 hover:text-white"
              )}
            >
              <Icon size={20} />
              <span className="font-medium">{link.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <button className="flex items-center gap-3 px-3 py-2 w-full rounded-md hover:bg-slate-800 hover:text-white transition-colors">
          <Settings size={20} />
          <span className="font-medium">Settings</span>
        </button>
        <button className="flex items-center gap-3 px-3 py-2 w-full rounded-md hover:bg-red-900/20 text-red-400 transition-colors mt-1">
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
}
