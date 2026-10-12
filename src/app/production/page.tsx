// src/app/production/page.tsx
"use client";

import React, { useState } from "react";
import { useErp } from "../../context/ErpContext";

export default function ProductionBOMPage() {
  const { inventory, productionBatches, executeProductionBatch } = useErp();
  const [activeTab, setActiveTab] = useState("bom_builder");

  // Batch Production Modal State
  const [isBatchModalOpen, setIsBatchModalOpen] = useState(false);
  const [selectedProductSku, setSelectedProductSku] = useState("EV-FRM-01");
  const [batchQty, setBatchQty] = useState("50");

  // Attach Component Modal State
  const [isAttachModalOpen, setIsAttachModalOpen] = useState(false);
  const [selectedRawSku, setSelectedRawSku] = useState("");
  const [requiredPerUnit, setRequiredPerUnit] = useState("2");
  const [attachedBomItems, setAttachedBomItems] = useState<
    { code: string; name: string; qty: number; unit: string; route: string; routeColor: string }[]
  >([]);

  const customMaterials = inventory.map((item) => ({
    code: item.sku,
    name: item.product,
    qty: item.sku === "RM-STEEL" ? 25 : item.sku === "RM-TUBE" ? 10 : item.sku === "RM-MOTOR" ? 1 : 2.0,
    unit: item.size || "Units",
    route: item.directSale ? "Multi-Route: Production & Direct Sale" : "Production Only",
    routeColor: item.directSale
      ? "text-emerald-700 bg-emerald-50 border-emerald-200"
      : "text-purple-700 bg-purple-50 border-purple-200"
  }));

  const Icons = {
    Cog: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
    ArrowDown: <svg className="w-4 h-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>,
    CheckCircle: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
  };

  const selectedTargetObj =
    inventory.find((i) => i.sku === selectedProductSku) || {
      sku: "EV-FRM-01",
      product: "EV Scooty Main Frame Assembly"
    };

  const activeBOM = {
    finishedProduct: {
      code: selectedTargetObj.sku,
      name: selectedTargetObj.product,
      targetQty: 1,
      unit: "Unit"
    },
    rawMaterials: [...attachedBomItems, ...customMaterials]
  };

  const latestBatch = productionBatches[0] || {
    batchId: "EV-BATCH-8094",
    productCode: "EV-FRM-01",
    productName: "EV Scooty Main Frame",
    targetYield: 50,
    status: "Completed & Synced",
    impacts: [
      { item: "Grade A Sheet Steel", action: "CONSUMPTION", qty: "-1,250 Kgs", stockImpact: "Inventory Deducted", color: "text-rose-600", bg: "bg-rose-50/80" },
      { item: "Electric Motor Assembly", action: "CONSUMPTION", qty: "-50 Units", stockImpact: "Inventory Deducted", color: "text-rose-600", bg: "bg-rose-50/80" },
      { item: "Steel Tubing Structure", action: "CONSUMPTION", qty: "-500 Feet", stockImpact: "Inventory Deducted", color: "text-rose-600", bg: "bg-rose-50/80" },
      { item: "EV Scooty Main Frame", action: "FINISHED YIELD", qty: "+50 Units", stockImpact: "Added to Inventory", color: "text-emerald-600", bg: "bg-emerald-50/80" }
    ]
  };

  const handleConfirmBatchProduction = (e: React.FormEvent) => {
    e.preventDefault();
    const qtyNum = Number(batchQty) || 50;
    if (qtyNum <= 0) {
      alert("Please enter a valid batch quantity greater than 0.");
      return;
    }

    executeProductionBatch({
      finishedSku: selectedProductSku,
      batchQty: qtyNum
    });

    setIsBatchModalOpen(false);
    setActiveTab("execution");
  };

  const handleAttachComponentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const found = inventory.find((i) => i.sku === selectedRawSku);
    if (!found) {
      alert("Please select a valid component from inventory.");
      return;
    }

    const newDep = {
      code: found.sku,
      name: found.product,
      qty: Number(requiredPerUnit) || 1,
      unit: found.size || "Units",
      route: found.directSale ? "Multi-Route: Production & Direct Sale" : "Production Only",
      routeColor: found.directSale
        ? "text-emerald-700 bg-emerald-50 border-emerald-200"
        : "text-purple-700 bg-purple-50 border-purple-200"
    };

    setAttachedBomItems((prev) => [newDep, ...prev]);
    setIsAttachModalOpen(false);
    setSelectedRawSku("");
    setRequiredPerUnit("2");
  };

  const previewQtyNum = Number(batchQty) || 0;

  return (
    <div className="fixed md:relative inset-0 md:inset-auto z-40 md:z-0 overflow-y-auto md:overflow-visible min-h-screen bg-[#F4F7F9] p-6 md:p-12 font-sans w-full">
      <div className="fixed top-0 right-0 w-[35rem] h-[35rem] bg-gradient-to-bl from-purple-100/50 via-blue-50/20 to-transparent rounded-full blur-3xl -z-10 pointer-events-none" />
      
      {/* MODAL 1: INITIALIZE BATCH PRODUCTION */}
      {isBatchModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl border border-slate-100 animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center mb-6">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-purple-600 bg-purple-50 px-2.5 py-1 rounded-full">
                  Factory Floor Dispatch
                </span>
                <h3 className="text-xl font-black text-slate-900 mt-2">Initialize Batch Production</h3>
              </div>
              <button
                onClick={() => setIsBatchModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 font-bold text-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleConfirmBatchProduction} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                  Target Finished Product (Level 0)
                </label>
                <select
                  value={selectedProductSku}
                  onChange={(e) => setSelectedProductSku(e.target.value)}
                  className="w-full p-3.5 rounded-xl border border-slate-200 text-sm font-bold text-slate-900 outline-none focus:border-purple-500 bg-slate-50 cursor-pointer"
                >
                  {inventory.map((item) => (
                    <option key={item.id} value={item.sku}>
                      {item.sku} — {item.product} (Current Stock: {item.stock})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                  Target Batch Yield Quantity (Units)
                </label>
                <input
                  type="number"
                  min="1"
                  value={batchQty}
                  onChange={(e) => setBatchQty(e.target.value)}
                  placeholder="e.g., 50"
                  className="w-full p-3.5 rounded-xl border border-slate-200 text-sm font-black text-slate-900 outline-none focus:border-purple-500 bg-slate-50"
                  required
                />
              </div>

              {/* LIVE CONSUMPTION PREVIEW */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2.5">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Estimated Simultaneous Inventory & Ledger Impact
                </div>
                <div className="flex justify-between text-xs font-semibold text-rose-600">
                  <span>• Grade A Sheet Steel (RM-STEEL)</span>
                  <span>-{previewQtyNum * 5} Kgs</span>
                </div>
                <div className="flex justify-between text-xs font-semibold text-rose-600">
                  <span>• Electric Motor Assembly (RM-MOTOR)</span>
                  <span>-{previewQtyNum} Units</span>
                </div>
                <div className="flex justify-between text-xs font-semibold text-rose-600">
                  <span>• Steel Tubing Structure (RM-TUBE)</span>
                  <span>-{previewQtyNum * 2} Feet</span>
                </div>
                <div className="h-px bg-slate-200 my-1" />
                <div className="flex justify-between text-xs font-black text-emerald-600">
                  <span>• {selectedTargetObj.product} ({selectedTargetObj.sku})</span>
                  <span>+{previewQtyNum} Units Added</span>
                </div>
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsBatchModalOpen(false)}
                  className="flex-1 py-3.5 rounded-xl bg-slate-100 text-slate-700 font-bold text-sm hover:bg-slate-200 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3.5 rounded-xl bg-slate-900 text-white font-bold text-sm shadow-lg hover:bg-purple-600 transition-colors cursor-pointer"
                >
                  Execute & Sync Ledger
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: ATTACH RAW COMPONENT TO BOM */}
      {isAttachModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl border border-slate-100 animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-black text-slate-900">Attach BOM Component</h3>
              <button
                onClick={() => setIsAttachModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 font-bold text-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAttachComponentSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Select Inventory Material
                </label>
                <select
                  value={selectedRawSku}
                  onChange={(e) => setSelectedRawSku(e.target.value)}
                  className="w-full p-3.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-900 outline-none focus:border-purple-500 bg-slate-50 cursor-pointer"
                  required
                >
                  <option value="">Choose material...</option>
                  {inventory.map((item) => (
                    <option key={item.id} value={item.sku}>
                      {item.sku} — {item.product} ({item.size})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Required Qty per Finished Unit
                </label>
                <input
                  type="number"
                  step="0.5"
                  min="0.5"
                  value={requiredPerUnit}
                  onChange={(e) => setRequiredPerUnit(e.target.value)}
                  className="w-full p-3.5 rounded-xl border border-slate-200 text-sm font-bold text-slate-900 outline-none focus:border-purple-500 bg-slate-50"
                  required
                />
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsAttachModalOpen(false)}
                  className="flex-1 py-3 rounded-xl bg-slate-100 text-slate-700 font-bold text-sm hover:bg-slate-200 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-purple-600 text-white font-bold text-sm shadow-md hover:bg-purple-700 transition-colors cursor-pointer"
                >
                  Attach to Recipe
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto space-y-10">
        
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-slate-200 shadow-sm">
              <div className="w-2 h-2 rounded-full bg-purple-600 animate-pulse" />
              <span className="text-xs font-bold tracking-widest text-slate-700 uppercase">
                COVICO Engineering Manufacturing Core
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
              Production & Bill of Materials
            </h1>
            <p className="text-base text-slate-500 max-w-2xl leading-relaxed">
              Design multi-tier BOM recipes for EV frames and auto parts. Automate raw material deductions and finished product inventory additions instantly.
            </p>
          </div>
          <div>
            <button
              onClick={() => setIsBatchModalOpen(true)}
              className="group relative flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-7 py-4 text-white font-bold text-sm transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_25px_rgba(0,0,0,0.15)] overflow-hidden cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="relative z-10 flex items-center gap-2">
                {Icons.Cog} Initialize Batch Production
              </span>
            </button>
          </div>
        </header>

        <div className="flex p-1.5 bg-white rounded-2xl border border-slate-200/80 shadow-sm max-w-md">
          <button
            onClick={() => setActiveTab("bom_builder")}
            className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer ${
              activeTab === "bom_builder"
                ? "bg-slate-900 text-white shadow-md shadow-slate-900/10"
                : "text-slate-500 hover:text-slate-900"
            }`}
          >
            BOM Hierarchy Builder
          </button>
          <button
            onClick={() => setActiveTab("execution")}
            className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer ${
              activeTab === "execution"
                ? "bg-slate-900 text-white shadow-md shadow-slate-900/10"
                : "text-slate-500 hover:text-slate-900"
            }`}
          >
            Production Execution Engine
          </button>
        </div>

        {activeTab === "bom_builder" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 space-y-6">
              
              <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.03)] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-purple-50 rounded-full blur-3xl opacity-60 pointer-events-none" />
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-purple-600 uppercase tracking-widest bg-purple-50 px-3 py-1 rounded-full">
                    Target Finished Part (Level 0)
                  </span>
                  <span className="text-xs font-semibold text-slate-400">Master Recipe</span>
                </div>
                
                <div className="flex flex-col md:flex-row md:items-center justify-between p-6 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 text-white shadow-xl">
                  <div className="space-y-1 mb-4 md:mb-0">
                    <span className="text-xs font-mono font-bold text-purple-400">{activeBOM.finishedProduct.code}</span>
                    <h3 className="text-2xl font-black">{activeBOM.finishedProduct.name}</h3>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md px-5 py-3 rounded-xl border border-white/10 text-right">
                    <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Base Recipe Yield</span>
                    <span className="text-2xl font-black text-white">{activeBOM.finishedProduct.targetQty} <span className="text-xs font-normal text-slate-300">{activeBOM.finishedProduct.unit}</span></span>
                  </div>
                </div>
              </div>

              <div className="flex justify-center -my-2 relative z-10">
                <div className="p-2.5 rounded-full bg-white border border-slate-200 shadow-md">
                  {Icons.ArrowDown}
                </div>
              </div>

              <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.03)]">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">Raw Material Dependencies (Level 1)</h2>
                    <p className="text-xs text-slate-500 mt-0.5">Configured raw components consumed during manufacturing assembly.</p>
                  </div>
                  <button
                    onClick={() => setIsAttachModalOpen(true)}
                    className="px-4 py-2 rounded-xl bg-purple-50 text-purple-700 text-xs font-bold hover:bg-purple-100 transition-colors cursor-pointer"
                  >
                    + Attach Component
                  </button>
                </div>
                
                <div className="space-y-4 max-h-[400px] overflow-y-auto">
                  {activeBOM.rawMaterials.map((rm, idx) => (
                    <div key={idx} className="flex flex-col md:flex-row md:items-center justify-between p-5 rounded-2xl border border-slate-100 bg-slate-50/60 hover:bg-white hover:border-slate-200 transition-all shadow-sm group">
                      <div className="space-y-1.5 mb-4 md:mb-0">
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-mono font-bold text-slate-900 bg-slate-200/60 px-2 py-0.5 rounded">{rm.code}</span>
                          <span className="text-sm font-bold text-slate-800">{rm.name}</span>
                        </div>
                        <div className={`inline-flex px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${rm.routeColor}`}>
                          {rm.route}
                        </div>
                      </div>
                      <div className="flex items-center gap-3 bg-white px-4 py-2.5 rounded-xl border border-slate-200/80 shadow-sm">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Required:</span>
                        <span className="text-lg font-black text-slate-900">{rm.qty}</span>
                        <span className="text-xs font-medium text-slate-500">{rm.unit}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            <div className="lg:col-span-4">
              <div className="sticky top-8 bg-white rounded-3xl p-8 border border-slate-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.03)] space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
                    ℹ️
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">Routing Governance</h3>
                    <p className="text-xs text-slate-500">Dual-use material compliance</p>
                  </div>
                </div>

                <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                    <strong className="block text-slate-900 font-bold">Production & Direct Sale</strong>
                    <p className="text-xs text-slate-500">Components like Sheet Steel and Steel Tubing can flow into factory assembly OR be sold as raw stock directly through the Sales Terminal.</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                    <strong className="block text-slate-900 font-bold">Strict Factory Lock</strong>
                    <p className="text-xs text-slate-500">Specialized components are ring-fenced exclusively for manufacturing workflows to protect retail stock integrity.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "execution" && (
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.03)] overflow-hidden">
            <div className="p-8 md:p-10 border-b border-slate-100 bg-slate-50/50 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                  {Icons.Cog} Batch Production Execution
                </h2>
                <p className="text-sm text-slate-500 mt-1">Real-time ledger adjustments: Raw materials deducted, Finished goods added.</p>
              </div>
              <div className="px-4 py-2 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center gap-2 text-emerald-700 font-bold text-xs uppercase tracking-wider">
                {Icons.CheckCircle} {latestBatch.status}
              </div>
            </div>

            <div className="p-8 md:p-10 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 rounded-2xl bg-slate-50 border border-slate-100">
                <div>
                  <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Batch Reference</span>
                  <span className="text-lg font-black text-slate-900">{latestBatch.batchId}</span>
                </div>
                <div>
                  <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Product Line</span>
                  <span className="text-lg font-bold text-slate-800">{latestBatch.productCode} ({latestBatch.productName})</span>
                </div>
                <div className="md:text-right">
                  <span className="block text-xs font-bold text-purple-600 uppercase tracking-wider mb-1">Batch Yield Target</span>
                  <span className="text-3xl font-black text-slate-900">{latestBatch.targetYield} <span className="text-sm font-semibold text-slate-500">Units</span></span>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-4">Simultaneous Inventory Ledger Impact</h3>
                <div className="space-y-3">
                  {latestBatch.impacts.map((impact, idx) => (
                    <div key={idx} className="flex flex-col md:flex-row md:items-center justify-between p-5 rounded-2xl border border-slate-100 bg-white shadow-sm hover:border-slate-200 transition-all">
                      <div className="w-full md:w-1/3 mb-2 md:mb-0">
                        <span className="block text-sm font-bold text-slate-900">{impact.item}</span>
                        <span className="block text-xs text-slate-400 mt-0.5 uppercase tracking-wider font-semibold">{impact.action}</span>
                      </div>
                      
                      <div className="w-full md:w-1/3 mb-2 md:mb-0 flex justify-start md:justify-center">
                        <span className={`px-4 py-2 rounded-xl text-base font-black tracking-wide ${impact.color} ${impact.bg} border border-slate-200/50 shadow-sm`}>
                          {impact.qty}
                        </span>
                      </div>

                      <div className="w-full md:w-1/3 flex justify-start md:justify-end">
                        <div className="flex items-center gap-2">
                          <div className={`w-2.5 h-2.5 rounded-full ${impact.color.replace("text", "bg")}`} />
                          <span className="text-sm font-bold text-slate-700">{impact.stockImpact}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-purple-50 border border-purple-100 text-center">
                <span className="text-sm font-bold text-purple-900">
                  Automated validation passed: Raw steel and component stocks were successfully decremented, and {latestBatch.targetYield} finished units of {latestBatch.productName} were credited to the warehouse ledger.
                </span>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}