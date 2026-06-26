import DashboardLayout from "@/components/layout/DashboardLayout";
import { StatCard, Card } from "@/components/ui/Card";
import { Package, Search, CreditCard, Clock, Send } from "lucide-react";

export default function ShipperDashboard() {
  return (
    <DashboardLayout role="shipper">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Shipper Dashboard</h2>
          <p className="text-slate-500">Welcome back, Sarah. Ready to move some cargo?</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-4 py-2 rounded-lg font-medium transition-colors shadow-sm">
            <Search size={20} />
            <span>Search Capacity</span>
          </button>
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-sm">
            <Send size={20} />
            <span>Post New Load</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="Active Loads" 
          value="8" 
          icon={<Package size={20} />} 
          trend={{ value: "2", positive: true }} 
        />
        <StatCard 
          title="Total Shipments" 
          value="156" 
          icon={<Clock size={20} />} 
        />
        <StatCard 
          title="Monthly Spend" 
          value="R 85,200" 
          icon={<CreditCard size={20} />} 
          trend={{ value: "15%", positive: false }} 
        />
        <StatCard 
          title="Savings vs standard" 
          value="22%" 
          icon={<Send size={20} />} 
          trend={{ value: "4%", positive: true }} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card title="My Active Shipments" className="lg:col-span-2">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-100">
                  <th className="pb-3 px-2">Shipment ID</th>
                  <th className="pb-3 px-2">Transporter</th>
                  <th className="pb-3 px-2">Route</th>
                  <th className="pb-3 px-2">Est. Delivery</th>
                  <th className="pb-3 px-2">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {[
                  { id: "SHP-7421", carrier: "FastTrack Logistics", route: "JHB → DBN", delivery: "2026-06-26", status: "In Transit" },
                  { id: "SHP-7425", carrier: "Global Freight", route: "CPT → PE", delivery: "2026-06-27", status: "Booked" },
                  { id: "SHP-7430", carrier: "Swift Movers", route: "PTA → BFN", delivery: "2026-06-28", status: "Pending Pickup" },
                ].map((row, i) => (
                  <tr key={i} className="text-sm text-slate-700 hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-2 font-medium text-blue-600">{row.id}</td>
                    <td className="py-4 px-2">{row.carrier}</td>
                    <td className="py-4 px-2">{row.route}</td>
                    <td className="py-4 px-2">{row.delivery}</td>
                    <td className="py-4 px-2">
                      <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                        row.status === "In Transit" ? "bg-blue-100 text-blue-700" :
                        row.status === "Booked" ? "bg-amber-100 text-amber-700" :
                        "bg-slate-100 text-slate-700"
                      }`}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <div className="space-y-6">
          <Card title="Available on your routes">
            <div className="space-y-4">
              {[
                { route: "Johannesburg → Durban", date: "2026-06-30", rate: "R 2.20/kg" },
                { route: "Cape Town → Johannesburg", date: "2026-07-02", rate: "R 2.80/kg" },
              ].map((route, i) => (
                <div key={i} className="p-3 border border-slate-100 rounded-lg hover:border-blue-200 transition-colors cursor-pointer">
                  <div className="text-sm font-semibold text-slate-900">{route.route}</div>
                  <div className="flex justify-between mt-2 text-xs text-slate-500">
                    <span>{route.date}</span>
                    <span className="text-blue-600 font-bold">{route.rate}</span>
                  </div>
                </div>
              ))}
              <button className="w-full text-sm text-blue-600 hover:underline text-center">See more matches</button>
            </div>
          </Card>

          <Card title="Pending Invoices">
            <div className="space-y-3">
              {[
                { id: "INV-2026-045", amount: "R 12,450", due: "In 2 days" },
                { id: "INV-2026-048", amount: "R 8,200", due: "In 5 days" },
              ].map((inv, i) => (
                <div key={i} className="flex justify-between items-center text-sm">
                  <div>
                    <div className="font-medium text-slate-900">{inv.id}</div>
                    <div className="text-xs text-slate-500">Due {inv.due}</div>
                  </div>
                  <div className="font-bold text-slate-900">{inv.amount}</div>
                </div>
              ))}
              <button className="w-full mt-2 py-2 text-sm font-medium bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors">
                Pay All
              </button>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
