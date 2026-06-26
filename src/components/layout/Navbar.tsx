"use client";

import { Bell, Search, User } from "lucide-react";

export function Navbar() {
  return (
    <header className="h-16 border-b border-slate-200 bg-white px-8 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center flex-1 max-w-md">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search shipments, routes..." 
            className="w-full pl-10 pr-4 py-2 bg-slate-100 border-transparent rounded-lg focus:bg-white focus:border-blue-500 focus:ring-0 transition-all text-sm"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full relative transition-colors">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        
        <div className="h-8 w-px bg-slate-200 mx-2"></div>
        
        <button className="flex items-center gap-3 pl-2 pr-1 py-1 hover:bg-slate-100 rounded-lg transition-colors">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-slate-900 leading-none">John Doe</p>
            <p className="text-xs text-slate-500 mt-1">Transporter Ltd</p>
          </div>
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
            <User size={18} />
          </div>
        </button>
      </div>
    </header>
  );
}
