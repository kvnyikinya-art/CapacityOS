import { Sidebar } from "./Sidebar";
import { Navbar } from "./Navbar";

interface DashboardLayoutProps {
  children: React.ReactNode;
  role: "transporter" | "shipper" | "admin";
}

export default function DashboardLayout({ children, role }: DashboardLayoutProps) {
  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar role={role} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
