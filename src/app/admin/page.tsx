import DashboardLayout from "@/components/layout/DashboardLayout";
import { StatCard, Card } from "@/components/ui/Card";
import { ShieldCheck, Users, BarChart3, Wallet, CheckCircle, AlertCircle } from "lucide-react";

export default function AdminDashboard() {
  return (
    <DashboardLayout role="admin">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Admin Control Center</h2>
          <p className="text-slate-500">Platform-wide overview and management.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="Total GMV" 
          value="R 2.4M" 
          icon={<BarChart3 size={20} />} 
          trend={{ value: "24%", positive: true }} 
        />
        <StatCard 
          title="Platform Revenue" 
          value="R 384,000" 
          icon={<Wallet size={20} />} 
          trend={{ value: "18%", positive: true }} 
        />
        <StatCard 
          title="Active Users" 
          value="1,240" 
          icon={<Users size={20} />} 
          trend={{ value: "5%", positive: true }} 
        />
        <StatCard 
          title="Pending Verifications" 
          value="42" 
          icon={<ShieldCheck size={20} />} 
          trend={{ value: "12", positive: false }} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card title="Pending Payment Verifications" className="lg:col-span-2">
          <div className="space-y-4">
            {[
              { id: "PAY-9012", from: "RetailCorp South", to: "FastTrack Logistics", amount: "R 14,200", date: "2026-06-25", ref: "EFT-JHB-882" },
              { id: "PAY-9015", from: "Global Shippers", to: "Swift Movers", amount: "R 5,100", date: "2026-06-25", ref: "TRSF-99120" },
              { id: "PAY-9018", from: "Cape Wholesale", to: "Route Masters", amount: "R 22,800", date: "2026-06-24", ref: "BANK-ZA-771" },
            ].map((pay, i) => (
              <div key={i} className="flex items-center justify-between p-4 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors">
                <div className="flex gap-4 items-center">
                  <div className="w-10 h-10 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center">
                    <Clock size={18} />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">{pay.amount}</div>
                    <div className="text-xs text-slate-500">{pay.from} → {pay.to}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-slate-700">{pay.ref}</div>
                  <div className="text-xs text-slate-400">{pay.date}</div>
                </div>
                <div className="flex gap-2">
                  <button className="px-3 py-1 text-xs font-bold bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
                    Verify
                  </button>
                  <button className="px-3 py-1 text-xs font-bold bg-white text-slate-700 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                    Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <div className="space-y-6">
          <Card title="Recent Audit Log">
            <div className="space-y-4">
              {[
                { action: "User Login", user: "admin_sarah", time: "2 mins ago", type: "success" },
                { action: "Company Verified", user: "admin_mike", time: "15 mins ago", type: "success" },
                { action: "Failed Login", user: "unknown_ip", time: "42 mins ago", type: "error" },
                { action: "Payment Verified", user: "admin_sarah", time: "1 hour ago", type: "success" },
              ].map((log, i) => (
                <div key={i} className="flex gap-3 items-start">
                  {log.type === "success" ? (
                    <CheckCircle size={16} className="text-emerald-500 mt-0.5" />
                  ) : (
                    <AlertCircle size={16} className="text-rose-500 mt-0.5" />
                  )}
                  <div>
                    <div className="text-xs font-semibold text-slate-900">{log.action}</div>
                    <div className="text-[10px] text-slate-500">{log.user} • {log.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card title="Platform Health">
            <div className="space-y-4">
              <div className="flex justify-between text-xs">
                <span className="text-slate-500">Database Sync</span>
                <span className="text-emerald-600 font-bold">Connected</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-500">Manual Verification Queue</span>
                <span className="text-amber-600 font-bold">12 Pending</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-500">EFT Processing Speed</span>
                <span className="text-slate-900 font-bold">~4.2 hrs</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}

function Clock({ size, className }: { size?: number, className?: string }) {
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
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}
