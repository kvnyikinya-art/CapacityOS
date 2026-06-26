"use client";

import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Package, MapPin, Calendar, Clock, Plus, Search, Edit2, Trash2, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function ManagePostingsPage() {
  const postings = [
    {
      id: "LP-2001",
      origin: "Johannesburg",
      destination: "Cape Town",
      pickup: "2026-06-30",
      cargo: "Electronics",
      weight: "1500kg",
      status: "Open",
      matches: 4,
    },
    {
      id: "LP-2005",
      origin: "Durban",
      destination: "Nelspruit",
      pickup: "2026-07-02",
      cargo: "Frozen Foods",
      weight: "3000kg",
      status: "Matched",
      matches: 1,
    },
  ];

  return (
    <DashboardLayout role="shipper">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Manage Load Postings</h2>
          <p className="text-slate-500">Track your open freight requests and view matches.</p>
        </div>
        <Link href="/shipper/post-load">
          <Button className="gap-2">
            <Plus size={18} /> Post New Load
          </Button>
        </Link>
      </div>

      <div className="space-y-6">
        {postings.map((post) => (
          <Card key={post.id} className="hover:border-blue-200 transition-colors">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">{post.id}</span>
                  <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                    post.status === "Open" ? "bg-blue-100 text-blue-700" : "bg-emerald-100 text-emerald-700"
                  }`}>
                    {post.status}
                  </span>
                </div>
                
                <div className="flex items-center gap-4 text-lg font-bold text-slate-900 mb-4">
                  <span>{post.origin}</span>
                  <ChevronRight size={18} className="text-slate-300" />
                  <span>{post.destination}</span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-slate-600">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-slate-400" />
                    <span>{post.pickup}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Package size={16} className="text-slate-400" />
                    <span>{post.cargo} ({post.weight})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Search size={16} className="text-blue-500" />
                    <span className="font-medium text-blue-600">{post.matches} Potential Matches</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 lg:border-l lg:pl-8 border-slate-100">
                <Button variant="outline" size="sm" className="gap-2">
                  <Edit2 size={14} /> Edit
                </Button>
                <Button variant="outline" size="sm" className="text-red-600 hover:bg-red-50 hover:text-red-700 border-red-100">
                  <Trash2 size={14} />
                </Button>
                <Link href="/shipper/search">
                  <Button size="sm">View Matches</Button>
                </Link>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
}
