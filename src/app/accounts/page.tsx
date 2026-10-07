// src/app/accounts/page.tsx
"use client";

import React, { useState } from "react";

export default function AccountsCommandCenter() {
  const [activeModule, setActiveModule] = useState("dashboard");

  // Premium SVG Icons for a professional look
  const Icons = {
    Database: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" /></svg>,
    Link: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>,
    ShieldCheck: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
    ArrowRightRight: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7" /></svg>
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-6 md:p-10 font-sans relative z-0">
      {/* Decorative Background Elements */}
      <div className="fixed top-0 left-0 w-full h-96 bg-gradient-to-b from-slate-200/50 to-transparent -z-10 pointer-events-none" />
      <div className="fixed -top-40 -right-40 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* HEADER SECTION */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-slate-200 shadow-sm">
              <div className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
              <span className="text-xs font-bold tracking-widest text-slate-700 uppercase">
                Financial Core Engine
              </span>
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
              Chart of Accounts
            </h1>
            <p className="text-base text-slate-500 max-w-2xl leading-relaxed">
              Master ledger mappings, monitor live double-entry impacts, and govern supplier payables strictly through verified GRN rules.
            </p>
          </div>
          <div className="flex gap-3">
            <button className="px-6 py-3 rounded-xl bg-white border border-slate-200 text-slate-700 font-bold text-sm shadow-sm hover:bg-slate-50 transition-all">
              Export Ledgers
            </button>
            <button className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-bold text-sm shadow-lg shadow-indigo-600/20 hover:bg-indigo-700 transition-all flex items-center gap-2">
              {Icons.ShieldCheck} Audit Mode
            </button>
          </div>
        </header>

        {/* TOP KPI DASHBOARD */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { label: "Total Asset Value", value: "$1,245,000", color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-100" },
            { label: "Verified Liabilities (GRN)", value: "$84,230", color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-100" },
            { label: "Recognized Revenue", value: "$345,231", color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-100" },
            { label: "Unmapped Items", value: "0", color: "text-slate-600", bg: "bg-slate-100", border: "border-slate-200" }
          ].map((stat, idx) => (
            <div key={idx} className={`bg-white rounded-3xl p-6 border ${stat.border} shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden group`}>
              <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full ${stat.bg} opacity-50 group-hover:scale-150 transition-transform duration-500`} />
              <div className="relative z-10">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">{stat.label}</h3>
                <p className={`text-3xl font-black ${stat.color} tracking-tight`}>{stat.value}</p>
              </div>
            </div>
          ))}
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT COLUMN: ITEM MAPPINGS & RULES (Spans 7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* REQUIREMENT 1 & 2: LEDGER MAPPING MATRIX */}
            <div className="bg-white rounded-3xl border border-slate-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
              <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    {Icons.Link} Ledger Mapping Matrix
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">Requirement: Every item must map to a financial ledger.</p>
                </div>
                <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-bold rounded-full">Strict Enforcement</span>
              </div>
              
              <div className="p-6 space-y-4">
                {/* Visualizing Existing Mappings */}
                {[
                  { code: "RM-001", name: "Premium Leather", asset: "1010 - Inventory", cogs: "5010 - COGS Raw" },
                  { code: "FP-101", name: "Executive Jacket", asset: "1020 - Finished Goods", cogs: "5020 - COGS Finished" }
                ].map((item, i) => (
                  <div key={i} className="flex flex-col md:flex-row items-center gap-4 p-4 rounded-2xl border border-slate-100 bg-slate-50 hover:bg-white transition-colors group">
                    <div className="w-full md:w-1/3">
                      <div className="text-sm font-bold text-slate-900">{item.code}</div>
                      <div className="text-xs text-slate-500">{item.name}</div>
                    </div>
                    <div className="hidden md:flex text-slate-300 group-hover:text-indigo-400 transition-colors">
                      {Icons.ArrowRightRight}
                    </div>
                    <div className="w-full md:w-2/3 grid grid-cols-2 gap-2">
                      <div className="p-2 rounded-lg bg-blue-50/50 border border-blue-100/50">
                        <div className="text-[10px] font-bold text-blue-600 uppercase">Asset Route</div>
                        <div className="text-xs font-semibold text-slate-700 truncate">{item.asset}</div>
                      </div>
                      <div className="p-2 rounded-lg bg-emerald-50/50 border border-emerald-100/50">
                        <div className="text-[10px] font-bold text-emerald-600 uppercase">COGS Route</div>
                        <div className="text-xs font-semibold text-slate-700 truncate">{item.cogs}</div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* REQUIREMENT 2: NEW ITEM MAPPING FORM UI */}
                <div className="mt-6 pt-6 border-t border-dashed border-slate-200">
                  <div className="mb-4">
                    <h3 className="text-sm font-bold text-slate-900">Initialize New Item Mapping</h3>
                    <p className="text-xs text-slate-500">System rule: New items require ledger routing before activation.</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <input type="text" placeholder="New Item Name" className="p-3 rounded-xl bg-white border border-slate-200 text-sm outline-none focus:border-indigo-500" />
                    <select className="p-3 rounded-xl bg-white border border-slate-200 text-sm outline-none focus:border-indigo-500 text-slate-500">
                      <option>Select Asset Ledger...</option>
                      <option>1010 - Inventory Asset</option>
                    </select>
                    <select className="p-3 rounded-xl bg-white border border-slate-200 text-sm outline-none focus:border-indigo-500 text-slate-500">
                      <option>Select COGS Ledger...</option>
                      <option>5010 - COGS Expense</option>
                    </select>
                  </div>
                  <button className="mt-4 w-full py-3 rounded-xl bg-slate-900 text-white text-sm font-bold shadow-md hover:bg-indigo-600 transition-colors">
                    Validate & Save Mapping
                  </button>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: TRANSACTIONS & SUPPLIERS (Spans 5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* REQUIREMENT 3: TRANSACTION IMPACTS */}
            <div className="bg-white rounded-3xl border border-slate-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
              <div className="p-6 border-b border-slate-100 bg-slate-50/50">
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  {Icons.Database} Double-Entry Impact Engine
                </h2>
                <p className="text-xs text-slate-500 mt-1">Requirement: Defined accounting impacts.</p>
              </div>
              <div className="p-6 space-y-5">
                
                {/* Impact Node 1: Purchase/GRN */}
                <div className="relative pl-6 border-l-2 border-amber-200">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-amber-500 ring-4 ring-white" />
                  <div className="text-xs font-bold text-amber-600 mb-1">EVENT: GOODS RECEIPT (GRN-992)</div>
                  <div className="bg-slate-50 rounded-xl border border-slate-100 p-4 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-bold text-slate-700">Dr. Inventory Asset (1010)</span>
                      <span className="text-sm font-black text-emerald-600">+$5,000</span>
                    </div>
                    <div className="h-px bg-slate-200 w-full" />
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-bold text-slate-700">Cr. Accounts Payable (2010)</span>
                      <span className="text-sm font-black text-rose-600">-$5,000</span>
                    </div>
                  </div>
                </div>

                {/* Impact Node 2: Sales */}
                <div className="relative pl-6 border-l-2 border-blue-200">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-500 ring-4 ring-white" />
                  <div className="text-xs font-bold text-blue-600 mb-1">EVENT: SALES DISPATCH (INV-402)</div>
                  <div className="bg-slate-50 rounded-xl border border-slate-100 p-4 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-bold text-slate-700">Dr. Accounts Receivable (1200)</span>
                      <span className="text-sm font-black text-emerald-600">+$1,200</span>
                    </div>
                    <div className="h-px bg-slate-200 w-full" />
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-bold text-slate-700">Cr. Sales Revenue (4010)</span>
                      <span className="text-sm font-black text-rose-600">-$1,200</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* REQUIREMENT 4: GRN GOVERNED SUPPLIER LEDGER */}
            <div className="bg-slate-900 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
              
              <div className="p-6 border-b border-slate-800">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  {Icons.ShieldCheck} GRN-Governed Payables
                </h2>
                <p className="text-xs text-slate-400 mt-1">Requirement: Supplier ledger strictly follows PO/GRN workflow rules.</p>
              </div>

              <div className="p-6 space-y-4">
                
                {/* Supplier Widget */}
                <div className="p-5 rounded-2xl bg-slate-800/50 border border-slate-700 backdrop-blur-sm">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-sm font-bold text-white">Global Leathers Ltd</h3>
                    <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 text-[10px] font-bold rounded uppercase tracking-wider border border-emerald-500/30">
                      Ledger Active
                    </span>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-slate-400">Pending PO Pipeline (Unrecognized)</span>
                      <span className="text-sm font-medium text-slate-300">$12,000</span>
                    </div>
                    
                    <div className="relative h-2 bg-slate-700 rounded-full overflow-hidden">
                      <div className="absolute top-0 left-0 h-full bg-slate-500 w-full opacity-30" />
                      <div className="absolute top-0 left-0 h-full bg-emerald-500 w-[30%]" />
                    </div>

                    <div className="flex justify-between items-end pt-2 border-t border-slate-700">
                      <div>
                        <span className="block text-[10px] font-bold text-emerald-400 uppercase">Verified via GRN</span>
                        <span className="block text-xs text-slate-400">Actual Payable Liability</span>
                      </div>
                      <span className="text-xl font-black text-white">$5,000</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 flex gap-3">
                  <span className="text-amber-500 text-sm">⚠</span>
                  <span className="text-xs text-amber-200/80 leading-relaxed">System Lock: Supplier balances cannot be increased manually. They are only updated automatically upon finalization of a Goods Receipt Note (GRN).</span>
                </div>

              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}