import DashboardLayout from "@/components/layout/DashboardLayout";
import { StatCard, Card } from "@/components/ui/Card";
import { Truck, Package, DollarSign, Activity, Plus } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function TransporterDashboard() {
  return (
    <DashboardLayout role="transporter">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Transporter Dashboard</h2>
          <p className="text-slate-500">Welcome back, John. Here's what's happening with your fleet today.</p>
        </div>
        <Link href="/transporter/routes/new">
          <Button className="gap-2">
            <Plus size={20} />
            <span>List New Capacity</span>
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="Active Listings" 
          value="12" 
          icon={<Truck size={20} />} 
          trend={{ value: "8%", positive: true }} 
        />
        <StatCard 
          title="Booked Shipments" 
          value="48" 
          icon={<Package size={20} />} 
          trend={{ value: "12%", positive: true }} 
        />
        <StatCard 
          title="Monthly Revenue" 
          value="R 142,500" 
          icon={<DollarSign size={20} />} 
          trend={{ value: "5%", positive: true }} 
        />
        <StatCard 
          title="Capacity Utilized" 
          value="74%" 
          icon={<Activity size={20} />} 
          trend={{ value: "2%", positive: false }} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card title="Recent Capacity Listings" className="lg:col-span-2">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-100">
                  <th className="pb-3 px-2">Route</th>
                  <th className="pb-3 px-2">Departure</th>
                  <th className="pb-3 px-2">Space Available</th>
                  <th className="pb-3 px-2">Rate</th>
                  <th className="pb-3 px-2">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {[
                  { route: "Johannesburg → Durban", date: "2026-06-28", space: "4500kg / 12m³", rate: "R 2.50/kg", status: "Active" },
                  { route: "Cape Town → Port Elizabeth", date: "2026-06-29", space: "2000kg / 8m³", rate: "R 3.10/kg", status: "Partial" },
                  { route: "Pretoria → Bloemfontein", date: "2026-07-01", space: "8000kg / 20m³", rate: "R 2.20/kg", status: "Active" },
                  { route: "Durban → East London", date: "2026-07-02", space: "1500kg / 5m³", rate: "R 3.50/kg", status: "Booked" },
                ].map((row, i) => (
                  <tr key={i} className="text-sm text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer" onClick={() => window.location.href='/transporter/routes'}>
                    <td className="py-4 px-2 font-medium">{row.route}</td>
                    <td className="py-4 px-2">{row.date}</td>
                    <td className="py-4 px-2">{row.space}</td>
                    <td className="py-4 px-2">{row.rate}</td>
                    <td className="py-4 px-2">
                      <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                        row.status === "Active" ? "bg-emerald-100 text-emerald-700" :
                        row.status === "Partial" ? "bg-amber-100 text-amber-700" :
                        "bg-blue-100 text-blue-700"
                      }`}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-50">
            <Link href="/transporter/routes" className="text-sm text-blue-600 font-medium hover:underline">
              Manage all listings →
            </Link>
          </div>
        </Card>

        <Card title="Active Shipment Status">
          <div className="space-y-6">
            {[
              { id: "SHP-7421", client: "RetailCorp South", status: "In Transit", progress: 65 },
              { id: "SHP-7425", client: "Logistics Hub", status: "Picking Up", progress: 10 },
              { id: "SHP-7398", client: "Mega Wholesale", status: "Delivered", progress: 100 },
            ].map((shipment, i) => (
              <Link key={i} href={`/transporter/shipments/${shipment.id}`} className="block group">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">{shipment.id}</span>
                    <span className="text-slate-500">{shipment.status}</span>
                  </div>
                  <div className="text-xs text-slate-400 mb-1">{shipment.client}</div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${shipment.progress === 100 ? "bg-emerald-500" : "bg-blue-500"}`}
                      style={{ width: `${shipment.progress}%` }}
                    ></div>
                  </div>
                </div>
              </Link>
            ))}
            <Link href="/transporter/shipments">
              <Button variant="outline" size="sm" className="w-full mt-4">
                View All Shipments
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}

