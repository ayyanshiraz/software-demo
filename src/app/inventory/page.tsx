// src/app/inventory/page.tsx
"use client";

import React from "react";
import { Package, ClipboardList, TrendingUp } from "lucide-react";

export default function InventorySalesPurchase() {
  const stats = [
    { label: "Total Stock Items", value: "15,482", icon: <Package width="1em" height="1em" strokeWidth={2} />, color: "from-blue-500 to-blue-600", shadow: "shadow-blue-500/20" },
    { label: "Pending Orders", value: "142", icon: <ClipboardList width="1em" height="1em" strokeWidth={2} />, color: "from-purple-500 to-purple-600", shadow: "shadow-purple-500/20" },
    { label: "Monthly Revenue", value: "$45,231", icon: <TrendingUp width="1em" height="1em" strokeWidth={2} />, color: "from-emerald-500 to-emerald-600", shadow: "shadow-emerald-500/20" }
  ];

  return (
    <div className="fixed md:static inset-0 md:inset-auto z-40 md:z-0 overflow-y-auto md:overflow-visible min-h-screen bg-[#F8FAFC] p-6 font-sans sm:p-12 w-full">
      {/* Decorative background blurs for a premium SaaS feel */}
      <div className="fixed top-0 left-0 w-full h-96 bg-gradient-to-b from-blue-50/80 to-transparent -z-10 pointer-events-none" />
      <div className="fixed -top-40 -right-40 w-96 h-96 bg-purple-100/40 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="mx-auto max-w-7xl">
        {/* PREMIUM HEADER */}
        <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-slate-200 shadow-sm">
              <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              <span className="text-xs font-bold tracking-widest text-slate-700 uppercase">
               COVICO Engineering (PVT) LTD.
              </span>
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
              Inventory Hub
            </h1>
            <p className="text-base text-slate-500 max-w-xl leading-relaxed">
              Orchestrate your product catalog, define complex manufacturing parameters, and map financial routing in one unified space.
            </p>
          </div>
          <button className="group relative flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-7 py-3.5 text-white font-semibold transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_20px_rgba(0,0,0,0.1)] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <span className="relative z-10 flex items-center gap-2">
              <span className="text-xl font-light">+</span> Initialize New Item
            </span>
          </button>
        </header>

        {/* ELEGANT STATS WIDGETS */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {stats.map((stat, index) => (
            <div key={index} className="relative group rounded-3xl bg-white p-7 border border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-10 transform translate-x-4 -translate-y-4 group-hover:scale-110 transition-transform duration-500">
                <span className="text-6xl filter grayscale inline-block">{stat.icon}</span>
              </div>
              <div className="relative z-10">
                <div className={`mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${stat.color} ${stat.shadow} shadow-lg text-white`}>
                  <span className="text-2xl flex items-center justify-center">{stat.icon}</span>
                </div>
                <h3 className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">{stat.label}</h3>
                <p className="text-3xl font-black text-slate-900 tracking-tight">{stat.value}</p>
              </div>
            </div>
          ))}
        </section>

        {/* ULTRA-MODERN ITEM CREATION FORM */}
        <form className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT COLUMN: CORE IDENTITY & LEDGER (Spans 7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="rounded-3xl bg-white border border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
              <div className="px-8 py-6 border-b border-slate-100 bg-slate-50/50">
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <span className="w-1.5 h-6 rounded-full bg-blue-500" />
                  Master Item Profile
                </h2>
              </div>
              
              <div className="p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2.5">
                    <label className="block text-sm font-bold text-slate-700">Item Nomenclature</label>
                    <input type="text" placeholder="e.g., Premium Leather Jacket" className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3.5 text-sm text-slate-900 transition-all focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none" />
                  </div>
                  <div className="space-y-2.5">
                    <label className="block text-sm font-bold text-slate-700 flex justify-between">
                      Unique Item Code
                      <span className="text-xs text-blue-600 font-semibold bg-blue-50 px-2 py-0.5 rounded-md">Auto-Generate</span>
                    </label>
                    <input type="text" placeholder="ITM-10045" className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3.5 text-sm text-slate-900 font-mono tracking-wide transition-all focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none" />
                  </div>
                </div>

                <div className="space-y-2.5 pt-2">
                  <label className="block text-sm font-bold text-slate-700">Financial Routing (Chart of Accounts)</label>
                  <div className="relative">
                    <select className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3.5 text-sm text-slate-900 font-medium appearance-none transition-all focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none cursor-pointer">
                      <option>Select Ledger Integration...</option>
                      <option>1001 - Inventory Asset (Current)</option>
                      <option>4001 - Sales Revenue (Income)</option>
                      <option>5001 - Cost of Goods Sold (Expense)</option>
                      <option>5002 - Raw Material Expense (COGS)</option>
                    </select>
                    <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                      <span className="text-slate-400 text-xs">▼</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* BILL OF MATERIALS MODULE */}
            <div className="rounded-3xl bg-white border border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
              <div className="px-8 py-6 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <span className="w-1.5 h-6 rounded-full bg-purple-500" />
                  Production Recipe (BOM)
                </h2>
                <span className="text-xs font-bold text-purple-700 bg-purple-100 px-3 py-1 rounded-full uppercase tracking-wider">Manufacturing</span>
              </div>
              
              <div className="p-8">
                <p className="text-sm text-slate-500 mb-6 leading-relaxed">Configure the exact raw material dependencies required to manufacture this finished product in your production line.</p>
                
                <div className="space-y-4">
                  {[
                    { label: "Primary Material", color: "border-slate-200" },
                    { label: "Secondary Component", color: "border-slate-200" },
                    { label: "Auxiliary Item (Optional)", color: "border-dashed border-slate-300 bg-slate-50/30" }
                  ].map((bom, idx) => (
                    <div key={idx} className={`flex items-center gap-4 p-3 rounded-2xl border ${bom.color}`}>
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-500 text-xs font-bold">
                        0{idx + 1}
                      </div>
                      <select className="flex-1 bg-transparent text-sm font-medium text-slate-800 outline-none cursor-pointer appearance-none">
                        <option>Search & Attach Material...</option>
                        <option>RM-001: Grade A Leather Sheet</option>
                        <option>RM-002: Industrial Nylon Thread</option>
                        <option>RM-003: Brass Zippers</option>
                        <option>RM-015: Premium Packing Box</option>
                      </select>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: ATTRIBUTES & BEHAVIOR (Spans 5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* VARIANTS CONFIGURATOR */}
            <div className="rounded-3xl bg-white border border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
              <div className="px-8 py-6 border-b border-slate-100 bg-slate-50/50">
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <span className="w-1.5 h-6 rounded-full bg-amber-400" />
                  Dimensional Variants
                </h2>
              </div>
              <div className="p-8">
                <div className="grid grid-cols-2 gap-3">
                  {["Small", "Medium", "Large", "Extra Large"].map((size, idx) => (
                    <label key={idx} className="relative flex cursor-pointer items-center justify-center rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-4 transition-all hover:bg-slate-100 hover:border-slate-300 has-[:checked]:border-blue-600 has-[:checked]:bg-blue-50/50">
                      <input type="checkbox" className="peer absolute opacity-0 w-full h-full cursor-pointer" />
                      <div className="flex flex-col items-center gap-1">
                        <span className="text-sm font-bold text-slate-600 peer-checked:text-blue-700 transition-colors">{size}</span>
                      </div>
                      <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-blue-600 opacity-0 peer-checked:opacity-100 transition-opacity" />
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* RAW MATERIAL BEHAVIOR */}
            <div className="rounded-3xl bg-white border border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
              <div className="px-8 py-6 border-b border-slate-100 bg-slate-50/50">
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <span className="w-1.5 h-6 rounded-full bg-emerald-500" />
                  Material Consumption Rules
                </h2>
              </div>
              <div className="p-8 space-y-4">
                
                <label className="flex items-start gap-4 p-5 rounded-2xl border border-slate-200 bg-slate-50/30 cursor-pointer transition-all hover:border-emerald-300 has-[:checked]:border-emerald-500 has-[:checked]:bg-emerald-50/30 group">
                  <div className="mt-0.5 relative flex items-center justify-center w-5 h-5 rounded border-2 border-slate-300 group-has-[:checked]:border-emerald-500 group-has-[:checked]:bg-emerald-500 transition-colors">
                    <input type="checkbox" className="absolute opacity-0 w-full h-full cursor-pointer" />
                    <svg className="w-3 h-3 text-white opacity-0 group-has-[:checked]:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  <div>
                    <span className="block text-sm font-bold text-slate-900 mb-0.5">Direct-to-Consumer Sale</span>
                    <span className="block text-xs text-slate-500">Permit this raw material to be sold As-Is directly to customers without processing.</span>
                  </div>
                </label>

                <label className="flex items-start gap-4 p-5 rounded-2xl border border-slate-200 bg-slate-50/30 cursor-pointer transition-all hover:border-blue-300 has-[:checked]:border-blue-500 has-[:checked]:bg-blue-50/30 group">
                  <div className="mt-0.5 relative flex items-center justify-center w-5 h-5 rounded border-2 border-slate-300 group-has-[:checked]:border-blue-500 group-has-[:checked]:bg-blue-500 transition-colors">
                    <input type="checkbox" defaultChecked className="absolute opacity-0 w-full h-full cursor-pointer" />
                    <svg className="w-3 h-3 text-white opacity-0 group-has-[:checked]:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  <div>
                    <span className="block text-sm font-bold text-slate-900 mb-0.5">Production Consumption</span>
                    <span className="block text-xs text-slate-500">Route this material exclusively to the factory floor for finished goods manufacturing.</span>
                  </div>
                </label>

              </div>
            </div>

            {/* ACTION BUTTON */}
            <div className="pt-4">
              <button type="button" className="w-full relative flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-8 py-5 text-white font-bold text-lg transition-all hover:-translate-y-1 hover:shadow-[0_15px_30px_rgba(0,0,0,0.15)] overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-slate-800 to-slate-900 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="relative z-10 flex items-center gap-3">
                  Deploy Configuration to Ledger
                  <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                </span>
              </button>
            </div>

          </div>
        </form>
      </div>
    </div>
  );
}