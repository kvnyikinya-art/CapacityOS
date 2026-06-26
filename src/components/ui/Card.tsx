import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
  icon?: React.ReactNode;
}

export function Card({ children, title, className, icon }: CardProps) {
  return (
    <div className={cn("bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm", className)}>
      {(title || icon) && (
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          {title && <h3 className="font-semibold text-slate-900">{title}</h3>}
          {icon && <div className="text-slate-400">{icon}</div>}
        </div>
      )}
      <div className="p-6">
        {children}
      </div>
    </div>
  );
}

export function StatCard({ title, value, subValue, icon, trend }: { 
  title: string; 
  value: string; 
  subValue?: string; 
  icon: React.ReactNode;
  trend?: { value: string; positive: boolean };
}) {
  return (
    <Card className="hover:border-blue-200 transition-colors">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <h4 className="text-2xl font-bold text-slate-900 mt-1">{value}</h4>
          {subValue && <p className="text-xs text-slate-400 mt-1">{subValue}</p>}
          {trend && (
            <div className={cn(
              "flex items-center gap-1 mt-2 text-xs font-semibold",
              trend.positive ? "text-emerald-600" : "text-rose-600"
            )}>
              <span>{trend.positive ? "↑" : "↓"}</span>
              <span>{trend.value}</span>
              <span className="text-slate-400 font-normal ml-1">vs last month</span>
            </div>
          )}
        </div>
        <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
          {icon}
        </div>
      </div>
    </Card>
  );
}
