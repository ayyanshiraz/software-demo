// src/app/inventory/page.tsx
"use client";

import React, { useState, useRef } from "react";
import { Package, ClipboardList, TrendingUp } from "lucide-react";

export default function InventorySalesPurchase() {
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [nomenclature, setNomenclature] = useState("");
  const [itemCode, setItemCode] = useState("EV-FRM-01");
  const [ledgerRoute, setLedgerRoute] = useState("");
  const [bomPrimary, setBomPrimary] = useState("");
  const [bomSecondary, setBomSecondary] = useState("");
  const [bomAux, setBomAux] = useState("");
  const [variants, setVariants] = useState({
    Kgs: false,
    Feet: false
  });
  const [measurementValue, setMeasurementValue] = useState("");
  const [directSale, setDirectSale] = useState(false);
  const [productionConsumption, setProductionConsumption] = useState(true);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const stats = [
    { label: "Total Stock Items", value: "15,482", icon: <Package width="1em" height="1em" strokeWidth={2} />, color: "from-blue-500 to-blue-600", shadow: "shadow-blue-500/20" },
    { label: "Pending Orders", value: "142", icon: <ClipboardList width="1em" height="1em" strokeWidth={2} />, color: "from-purple-500 to-purple-600", shadow: "shadow-purple-500/20" },
    { label: "Monthly Revenue", value: "$45,231", icon: <TrendingUp width="1em" height="1em" strokeWidth={2} />, color: "from-emerald-500 to-emerald-600", shadow: "shadow-emerald-500/20" }
  ];

  const handleAutoGenerate = () => {
    const randomCode = `EV-PART-${Math.floor(1000 + Math.random() * 9000)}`;
    setItemCode(randomCode);
  };

  const handleInitializeClick = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
    inputRef.current?.focus();
  };

  const handleVariantToggle = (key: keyof typeof variants) => {
    setVariants(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleDeploy = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nomenclature.trim()) {
      alert("Please enter part nomenclature before deploying.");
      return;
    }

    const existingItems = JSON.parse(localStorage.getItem("covico_inventory_covico_v3") || "[]");
    const selectedUnits = Object.keys(variants).filter(k => variants[k as keyof typeof variants]);
    const unitStr = selectedUnits.length > 0 ? selectedUnits[0] : "Kgs";
    const finalSize = measurementValue.trim() ? `${measurementValue} ${unitStr}` : unitStr;
    
    const newItem = {
      id: Date.now(),
      product: nomenclature,
      sku: itemCode,
      size: finalSize,
      stock: 50,
      status: "In Stock",
      color: "bg-emerald-50 text-emerald-600",
      ledgerRoute,
      directSale,
      productionConsumption
    };

    localStorage.setItem("covico_inventory_covico_v3", JSON.stringify([newItem, ...existingItems]));

    setSuccessMessage(`Successfully deployed ${nomenclature} (${itemCode}) to the general ledger and variants hub!`);
    window.scrollTo({ top: 0, behavior: "smooth" });
    
    setNomenclature("");
    handleAutoGenerate();
    setLedgerRoute("");
    setMeasurementValue("");

    setTimeout(() => {
      setSuccessMessage(null);
    }, 6000);
  };

  return (
    <div className="fixed md:static inset-0 md:inset-auto z-40 md:z-0 overflow-y-auto md:overflow-visible min-h-screen bg-[#F8FAFC] p-6 font-sans sm:p-12 w-full">
      <div className="fixed top-0 left-0 w-full h-96 bg-gradient-to-b from-blue-50/80 to-transparent -z-10 pointer-events-none" />
      <div className="fixed -top-40 -right-40 w-96 h-96 bg-purple-100/40 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="mx-auto max-w-7xl">
        
        {successMessage && (
          <div className="mb-8 p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-bold shadow-lg flex items-center justify-between animate-in fade-in duration-300">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
              <span>{successMessage}</span>
            </div>
            <button onClick={() => setSuccessMessage(null)} className="text-xs uppercase tracking-wider text-emerald-600 hover:text-emerald-900 cursor-pointer">Dismiss</button>
          </div>
        )}

        <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-slate-200 shadow-sm">
              <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              <span className="text-xs font-bold tracking-widest text-slate-700 uppercase">
               COVICO Engineering (PVT) LTD
              </span>
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
              Inventory Hub
            </h1>
            <p className="text-base text-slate-500 max-w-xl leading-relaxed">
              Orchestrate your product catalog, define complex manufacturing parameters, and map financial routing in one unified space.
            </p>
          </div>
          <button 
            type="button"
            onClick={handleInitializeClick}
            className="group relative flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-7 py-3.5 text-white font-semibold transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_20px_rgba(0,0,0,0.1)] overflow-hidden cursor-pointer"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <span className="relative z-10 flex items-center gap-2">
              <span className="text-xl font-light">+</span> Initialize New Item
            </span>
          </button>
        </header>

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

        <form ref={formRef} onSubmit={handleDeploy} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <div className="lg:col-span-7 space-y-8">
            <div className="rounded-3xl bg-white border border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
              <div className="px-8 py-6 border-b border-slate-100 bg-slate-50/50">
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <span className="w-1.5 h-6 rounded-full bg-blue-500" />
                  Master Part Profile
                </h2>
              </div>
              
              <div className="p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2.5">
                    <label className="block text-sm font-bold text-slate-700">Part Nomenclature</label>
                    <input 
                      ref={inputRef}
                      type="text" 
                      value={nomenclature}
                      onChange={(e) => setNomenclature(e.target.value)}
                      placeholder="e.g., EV Scooty Main Frame" 
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3.5 text-sm text-slate-900 transition-all focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none" 
                    />
                  </div>
                  <div className="space-y-2.5">
                    <label className="block text-sm font-bold text-slate-700 flex justify-between">
                      Unique SKU
                      <button 
                        type="button" 
                        onClick={handleAutoGenerate}
                        className="text-xs text-blue-600 font-semibold bg-blue-50 px-2 py-0.5 rounded-md hover:bg-blue-100 transition-colors cursor-pointer"
                      >
                        Auto-Generate
                      </button>
                    </label>
                    <input 
                      type="text" 
                      value={itemCode}
                      onChange={(e) => setItemCode(e.target.value)}
                      placeholder="EV-FRM-01" 
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3.5 text-sm text-slate-900 font-mono tracking-wide transition-all focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none" 
                    />
                  </div>
                </div>

                <div className="space-y-2.5 pt-2">
                  <label className="block text-sm font-bold text-slate-700">Financial Routing (Chart of Accounts)</label>
                  <div className="relative">
                    <select 
                      value={ledgerRoute}
                      onChange={(e) => setLedgerRoute(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3.5 text-sm text-slate-900 font-medium appearance-none transition-all focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none cursor-pointer"
                    >
                      <option value="">Select Ledger Integration...</option>
                      <option value="1001">1001 - Inventory Asset (Current)</option>
                      <option value="4001">4001 - Sales Revenue (Income)</option>
                      <option value="5001">5001 - Cost of Goods Sold (Expense)</option>
                      <option value="5002">5002 - Raw Material Expense (COGS)</option>
                    </select>
                    <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                      <span className="text-slate-400 text-xs">▼</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl bg-white border border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
              <div className="px-8 py-6 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <span className="w-1.5 h-6 rounded-full bg-purple-500" />
                  Production Recipe (BOM)
                </h2>
                <span className="text-xs font-bold text-purple-700 bg-purple-100 px-3 py-1 rounded-full uppercase tracking-wider">Manufacturing</span>
              </div>
              
              <div className="p-8">
                <p className="text-sm text-slate-500 mb-6 leading-relaxed">Configure exact raw material dependencies required to manufacture this part on your production line.</p>
                
                <div className="space-y-4">
                  {[
                    { label: "Primary Material", value: bomPrimary, setter: setBomPrimary, color: "border-slate-200" },
                    { label: "Secondary Component", value: bomSecondary, setter: setBomSecondary, color: "border-slate-200" },
                    { label: "Auxiliary Item (Optional)", value: bomAux, setter: setBomAux, color: "border-dashed border-slate-300 bg-slate-50/30" }
                  ].map((bom, idx) => (
                    <div key={idx} className={`flex items-center gap-4 p-3 rounded-2xl border ${bom.color}`}>
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-500 text-xs font-bold">
                        0{idx + 1}
                      </div>
                      <select 
                        value={bom.value}
                        onChange={(e) => bom.setter(e.target.value)}
                        className="flex-1 bg-transparent text-sm font-medium text-slate-800 outline-none cursor-pointer appearance-none"
                      >
                        <option value="">Search and Attach Material...</option>
                        <option value="RM-STEEL">Grade A Sheet Steel</option>
                        <option value="RM-MOTOR">Electric Motor Assembly</option>
                        <option value="RM-WIRE">Wiring Harness & Cables</option>
                        <option value="RM-DIE">Stamping Die Component</option>
                      </select>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-8">
            
            <div className="rounded-3xl bg-white border border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
              <div className="px-8 py-6 border-b border-slate-100 bg-slate-50/50">
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <span className="w-1.5 h-6 rounded-full bg-amber-400" />
                  Measurement Units (Kgs & Feet)
                </h2>
              </div>
              <div className="p-8 space-y-5">
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "Kgs", key: "Kgs" },
                    { label: "Feet", key: "Feet" }
                  ].map((size, idx) => (
                    <label 
                      key={idx} 
                      onClick={() => handleVariantToggle(size.key as keyof typeof variants)}
                      className={`relative flex cursor-pointer items-center justify-center rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-4 transition-all hover:bg-slate-100 hover:border-slate-300 ${variants[size.key as keyof typeof variants] ? "border-blue-600 bg-blue-50/50" : ""}`}
                    >
                      <input 
                        type="checkbox" 
                        checked={variants[size.key as keyof typeof variants]}
                        onChange={() => {}} 
                        className="peer absolute opacity-0 w-full h-full cursor-pointer" 
                      />
                      <div className="flex flex-col items-center gap-1">
                        <span className={`text-sm font-bold transition-colors ${variants[size.key as keyof typeof variants] ? "text-blue-700" : "text-slate-600"}`}>
                          {size.label}
                        </span>
                      </div>
                      <div className={`absolute top-2 right-2 w-2 h-2 rounded-full bg-blue-600 transition-opacity ${variants[size.key as keyof typeof variants] ? "opacity-100" : "opacity-0"}`} />
                    </label>
                  ))}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Optional Measurement Value (Number)</label>
                  <input 
                    type="number" 
                    value={measurementValue} 
                    onChange={(e) => setMeasurementValue(e.target.value)} 
                    placeholder="e.g., 10 or 25"
                    className="w-full p-3.5 rounded-xl border border-slate-200 text-sm font-bold text-slate-900 outline-none focus:border-blue-500 bg-slate-50"
                  />
                </div>
              </div>
            </div>

            <div className="rounded-3xl bg-white border border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
              <div className="px-8 py-6 border-b border-slate-100 bg-slate-50/50">
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <span className="w-1.5 h-6 rounded-full bg-emerald-500" />
                  Material Consumption Rules
                </h2>
              </div>
              <div className="p-8 space-y-4">
                
                <label 
                  onClick={() => setDirectSale(!directSale)}
                  className={`flex items-start gap-4 p-5 rounded-2xl border bg-slate-50/30 cursor-pointer transition-all group ${directSale ? "border-emerald-500 bg-emerald-50/30" : "border-slate-200 hover:border-emerald-300"}`}
                >
                  <div className={`mt-0.5 relative flex items-center justify-center w-5 h-5 rounded border-2 transition-colors ${directSale ? "border-emerald-500 bg-emerald-500" : "border-slate-300"}`}>
                    <input type="checkbox" checked={directSale} onChange={() => {}} className="absolute opacity-0 w-full h-full cursor-pointer" />
                    <svg className={`w-3 h-3 text-white transition-opacity ${directSale ? "opacity-100" : "opacity-0"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  <div>
                    <span className="block text-sm font-bold text-slate-900 mb-0.5">Direct-to-Customer Sale</span>
                    <span className="block text-xs text-slate-500">Permit this part to be sold As-Is directly to customers without processing.</span>
                  </div>
                </label>

                <label 
                  onClick={() => setProductionConsumption(!productionConsumption)}
                  className={`flex items-start gap-4 p-5 rounded-2xl border bg-slate-50/30 cursor-pointer transition-all group ${productionConsumption ? "border-blue-500 bg-blue-50/30" : "border-slate-200 hover:border-blue-300"}`}
                >
                  <div className={`mt-0.5 relative flex items-center justify-center w-5 h-5 rounded border-2 transition-colors ${productionConsumption ? "border-blue-500 bg-blue-500" : "border-slate-300"}`}>
                    <input type="checkbox" checked={productionConsumption} onChange={() => {}} className="absolute opacity-0 w-full h-full cursor-pointer" />
                    <svg className={`w-3 h-3 text-white transition-opacity ${productionConsumption ? "opacity-100" : "opacity-0"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  <div>
                    <span className="block text-sm font-bold text-slate-900 mb-0.5">Production Consumption</span>
                    <span className="block text-xs text-slate-500">Route this part exclusively to the factory floor for finished goods manufacturing.</span>
                  </div>
                </label>

              </div>
            </div>

            <div className="pt-4">
              <button type="submit" className="w-full relative flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-8 py-5 text-white font-bold text-lg transition-all hover:-translate-y-1 hover:shadow-[0_15px_30px_rgba(0,0,0,0.15)] overflow-hidden group cursor-pointer">
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