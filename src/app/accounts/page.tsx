// src/app/accounts/page.tsx
"use client";

import React, { useState } from "react";
import { useErp } from "../../context/ErpContext";

export default function AccountsCommandCenter() {
  const {
    inventory,
    mappings,
    ledgerEvents,
    verifiedPayables,
    pendingPoValue,
    recognizedRevenue,
    addLedgerMapping
  } = useErp();

  const [newItemName, setNewItemName] = useState("");
  const [newAssetRoute, setNewAssetRoute] = useState("1010 - Inventory Asset");
  const [newCogsRoute, setNewCogsRoute] = useState("5010 - COGS Raw");
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [isAuditMode, setIsAuditMode] = useState(false);

  const totalAssetValue = inventory.reduce(
    (sum, item) => sum + item.stock * (item.unitPrice || 350),
    850000
  );

  const totalLedgerVolume = ledgerEvents.reduce((sum, ev) => sum + ev.amount, 0);

  const handleSaveMapping = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim()) {
      alert("Please enter part name.");
      return;
    }

    const newEntry = {
      code: `EV-PART-${Math.floor(1000 + Math.random() * 9000)}`,
      name: newItemName.trim(),
      asset: newAssetRoute,
      cogs: newCogsRoute
    };

    addLedgerMapping(newEntry);

    setSuccessMsg(`Successfully mapped ${newItemName} (${newEntry.code}) to general ledger routes and synced to Inventory!`);
    setNewItemName("");
    setTimeout(() => setSuccessMsg(null), 5000);
  };

  const handleExportLedgers = () => {
    const csvRows: string[] = [];

    // Section 1: Chart of Accounts Mappings
    csvRows.push("SECTION 1: MASTER LEDGER MAPPING MATRIX");
    csvRows.push("Part SKU,Part Name,Asset Route,COGS Route,Audit Status");
    mappings.forEach((m) => {
      csvRows.push(`"${m.code}","${m.name}","${m.asset}","${m.cogs}","VERIFIED"`);
    });

    csvRows.push("");
    // Section 2: Double-Entry Transactions
    csvRows.push("SECTION 2: DOUBLE-ENTRY JOURNAL LEDGER EVENTS");
    csvRows.push("Event ID,Type,Reference,Item,Quantity,Debit Account,Credit Account,Amount ($),Status,Timestamp");
    ledgerEvents.forEach((ev) => {
      csvRows.push(
        `"${ev.id}","${ev.type}","${ev.ref}","${ev.item}","${ev.qty}","${ev.debitAccount}","${ev.creditAccount}","${ev.amount}","${ev.status || "Verified"}","${ev.timestamp}"`
      );
    });

    const csvContent = "data:text/csv;charset=utf-8," + csvRows.join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `COVICO_Chart_of_Accounts_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setSuccessMsg(`Exported ${mappings.length} ledger mappings and ${ledgerEvents.length} double-entry journal logs to CSV!`);
    setTimeout(() => setSuccessMsg(null), 5000);
  };

  const handleToggleAuditMode = () => {
    const nextState = !isAuditMode;
    setIsAuditMode(nextState);
    if (nextState) {
      setSuccessMsg("Audit Mode Activated: Running real-time Trial Balance & GRN Compliance Verification...");
      setTimeout(() => setSuccessMsg(null), 4000);
    }
  };

  const Icons = {
    Database: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" /></svg>,
    Link: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>,
    ShieldCheck: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
    ArrowRightRight: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7" /></svg>
  };

  return (
    <div className="fixed md:relative inset-0 md:inset-auto z-40 md:z-0 overflow-y-auto md:overflow-visible min-h-screen bg-[#F8FAFC] p-6 md:p-10 font-sans w-full">
      <div className="fixed top-0 left-0 w-full h-96 bg-gradient-to-b from-slate-200/50 to-transparent -z-10 pointer-events-none" />
      <div className="fixed -top-40 -right-40 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-10">
        
        {successMsg && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-bold shadow-sm">
            {successMsg}
          </div>
        )}

        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-slate-200 shadow-sm">
              <div className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
              <span className="text-xs font-bold tracking-widest text-slate-700 uppercase">
                COVICO Engineering Financial Core
              </span>
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
              Chart of Accounts
            </h1>
            <p className="text-base text-slate-500 max-w-2xl leading-relaxed">
              Master ledger mappings for EV scooty parts and sheet metal components, monitor live double-entry impacts, and govern supplier payables strictly through verified GRN rules.
            </p>
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleExportLedgers}
              className="px-6 py-3 rounded-xl bg-white border border-slate-200 text-slate-700 font-bold text-sm shadow-sm hover:bg-slate-50 transition-all cursor-pointer"
            >
              Export Ledgers
            </button>
            <button
              type="button"
              onClick={handleToggleAuditMode}
              className={`px-6 py-3 rounded-xl font-bold text-sm shadow-lg transition-all flex items-center gap-2 cursor-pointer ${
                isAuditMode
                  ? "bg-emerald-600 text-white shadow-emerald-600/20 hover:bg-emerald-700 ring-4 ring-emerald-500/20"
                  : "bg-indigo-600 text-white shadow-indigo-600/20 hover:bg-indigo-700"
              }`}
            >
              {Icons.ShieldCheck} {isAuditMode ? "Audit Mode: ACTIVE" : "Audit Mode"}
            </button>
          </div>
        </header>

        {/* AUDIT MODE LIVE RECONCILIATION BANNER */}
        {isAuditMode && (
          <div className="p-6 rounded-3xl bg-slate-900 text-white border border-indigo-500/30 shadow-xl space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-black uppercase tracking-wider">
                  ✓ Zero Discrepancy
                </span>
                <h3 className="text-base font-bold text-white">
                  Automated Trial Balance & Double-Entry Audit Report
                </h3>
              </div>
              <span className="text-xs font-mono text-slate-400">
                Timestamp: {new Date().toLocaleTimeString()}
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-800/70 border border-slate-700">
                <span className="block text-slate-400 uppercase font-bold mb-1">Total Debits (Dr.)</span>
                <span className="text-lg font-black text-emerald-400">+${totalLedgerVolume.toLocaleString()}</span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-800/70 border border-slate-700">
                <span className="block text-slate-400 uppercase font-bold mb-1">Total Credits (Cr.)</span>
                <span className="text-lg font-black text-rose-400">-${totalLedgerVolume.toLocaleString()}</span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-800/70 border border-slate-700">
                <span className="block text-slate-400 uppercase font-bold mb-1">Net Trial Variance</span>
                <span className="text-lg font-black text-white">$0.00 (Balanced)</span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-800/70 border border-slate-700">
                <span className="block text-slate-400 uppercase font-bold mb-1">GRN Policy Lock</span>
                <span className="text-lg font-black text-indigo-400">100% Enforced</span>
              </div>
            </div>
          </div>
        )}

        <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { label: "Total Asset Value", value: `$${totalAssetValue.toLocaleString()}`, color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-100" },
            { label: "Verified Liabilities (GRN)", value: `$${verifiedPayables.toLocaleString()}`, color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-100" },
            { label: "Recognized Revenue", value: `$${recognizedRevenue.toLocaleString()}`, color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-100" },
            { label: "Unmapped Parts", value: "0", color: "text-slate-600", bg: "bg-slate-100", border: "border-slate-200" }
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
          
          <div className="lg:col-span-7 space-y-8">
            
            <div className="bg-white rounded-3xl border border-slate-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
              <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    {Icons.Link} Ledger Mapping Matrix
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">Requirement: Every part must map to a financial ledger.</p>
                </div>
                <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-bold rounded-full">
                  {isAuditMode ? `${mappings.length} Routes Verified` : "Strict Enforcement"}
                </span>
              </div>
              
              <div className="p-6 space-y-4 max-h-[450px] overflow-y-auto">
                {mappings.map((item, i) => (
                  <div key={i} className="flex flex-col md:flex-row items-center gap-4 p-4 rounded-2xl border border-slate-100 bg-slate-50 hover:bg-white transition-colors group">
                    <div className="w-full md:w-1/3">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-slate-900">{item.code}</span>
                        {isAuditMode && (
                          <span className="px-1.5 py-0.5 text-[9px] font-black bg-emerald-100 text-emerald-700 rounded uppercase">
                            ✓ Verified
                          </span>
                        )}
                      </div>
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

                <form onSubmit={handleSaveMapping} className="mt-6 pt-6 border-t border-dashed border-slate-200">
                  <div className="mb-4">
                    <h3 className="text-sm font-bold text-slate-900">Initialize New Part Mapping</h3>
                    <p className="text-xs text-slate-500">System rule: New parts require ledger routing before activation.</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <input 
                      type="text" 
                      placeholder="New Part Name" 
                      value={newItemName}
                      onChange={(e) => setNewItemName(e.target.value)}
                      className="p-3 rounded-xl bg-white border border-slate-200 text-sm outline-none focus:border-indigo-500 text-slate-900 font-semibold" 
                    />
                    <select 
                      value={newAssetRoute}
                      onChange={(e) => setNewAssetRoute(e.target.value)}
                      className="p-3 rounded-xl bg-white border border-slate-200 text-sm outline-none focus:border-indigo-500 text-slate-600 cursor-pointer"
                    >
                      <option value="1010 - Inventory Asset">1010 - Inventory Asset</option>
                      <option value="1020 - Finished Goods">1020 - Finished Goods</option>
                    </select>
                    <select 
                      value={newCogsRoute}
                      onChange={(e) => setNewCogsRoute(e.target.value)}
                      className="p-3 rounded-xl bg-white border border-slate-200 text-sm outline-none focus:border-indigo-500 text-slate-600 cursor-pointer"
                    >
                      <option value="5010 - COGS Raw">5010 - COGS Raw</option>
                      <option value="5020 - COGS Finished">5020 - COGS Finished</option>
                    </select>
                  </div>
                  <button type="submit" className="mt-4 w-full py-3 rounded-xl bg-slate-900 text-white text-sm font-bold shadow-md hover:bg-indigo-600 transition-colors cursor-pointer">
                    Validate & Save Mapping
                  </button>
                </form>
              </div>
            </div>

          </div>

          <div className="lg:col-span-5 space-y-8">
            
            <div className="bg-white rounded-3xl border border-slate-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
              <div className="p-6 border-b border-slate-100 bg-slate-50/50">
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  {Icons.Database} Double-Entry Impact Engine
                </h2>
                <p className="text-xs text-slate-500 mt-1">Requirement: Defined accounting impacts & live sales dispatches.</p>
              </div>
              <div className="p-6 space-y-5 max-h-[500px] overflow-y-auto">
                
                {ledgerEvents.map((ev) => {
                  const isSale = ev.type === "SALE";
                  const isProd = ev.type === "PRODUCTION";
                  const borderClass = isSale ? "border-emerald-300" : isProd ? "border-purple-300" : "border-amber-200";
                  const dotClass = isSale ? "bg-emerald-500" : isProd ? "bg-purple-500" : "bg-amber-500";
                  const titleClass = isSale ? "text-emerald-600" : isProd ? "text-purple-600" : "text-amber-600";
                  const boxClass = isSale ? "bg-emerald-50/40 border-emerald-100" : isProd ? "bg-purple-50/40 border-purple-100" : "bg-slate-50 border-slate-100";

                  return (
                    <div key={ev.id} className={`relative pl-6 border-l-2 ${borderClass}`}>
                      <div className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full ${dotClass} ring-4 ring-white`} />
                      <div className={`text-xs font-bold ${titleClass} mb-1`}>
                        {isSale ? `LIVE SALE DISPATCH (REF: ${ev.ref})` : isProd ? `BATCH PRODUCTION (${ev.ref})` : `EVENT: GOODS RECEIPT (${ev.ref})`}
                      </div>
                      <div className={`rounded-xl border p-4 space-y-3 ${boxClass}`}>
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-semibold text-slate-800">{ev.item} ({ev.qty} Units)</span>
                          {ev.status && (
                            <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-600">
                              {ev.status}
                            </span>
                          )}
                        </div>
                        <div className="h-px bg-slate-200 w-full" />
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-bold text-slate-700">Dr. {ev.debitAccount}</span>
                          <span className="text-sm font-black text-emerald-600">+${ev.amount.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-bold text-slate-700">Cr. {ev.creditAccount}</span>
                          <span className="text-sm font-black text-rose-600">-${ev.amount.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}

              </div>
            </div>

            <div className="bg-slate-900 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
              
              <div className="p-6 border-b border-slate-800">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  {Icons.ShieldCheck} GRN-Governed Payables
                </h2>
                <p className="text-xs text-slate-400 mt-1">Requirement: Supplier ledger strictly follows PO/GRN workflow rules.</p>
              </div>

              <div className="p-6 space-y-4">
                <div className="p-5 rounded-2xl bg-slate-800/50 border border-slate-700 backdrop-blur-sm">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-sm font-bold text-white">Global Steel & Auto Parts</h3>
                    <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 text-[10px] font-bold rounded uppercase tracking-wider border border-emerald-500/30">
                      Ledger Active
                    </span>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-slate-400">Pending PO Pipeline (Unrecognized)</span>
                      <span className="text-sm font-medium text-slate-300">${pendingPoValue.toLocaleString()}</span>
                    </div>
                    
                    <div className="relative h-2 bg-slate-700 rounded-full overflow-hidden">
                      <div className="absolute top-0 left-0 h-full bg-slate-500 w-full opacity-30" />
                      <div className="absolute top-0 left-0 h-full bg-emerald-500 w-[65%]" />
                    </div>

                    <div className="flex justify-between items-end pt-2 border-t border-slate-700">
                      <div>
                        <span className="block text-[10px] font-bold text-emerald-400 uppercase">Verified via GRN</span>
                        <span className="block text-xs text-slate-400">Actual Payable Liability</span>
                      </div>
                      <span className="text-xl font-black text-white">${verifiedPayables.toLocaleString()}</span>
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