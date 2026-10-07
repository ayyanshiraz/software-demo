// src/app/purchase-workflow/page.tsx
"use client";

import React, { useState } from "react";

export default function PurchaseWorkflow() {
  const [currentStep, setCurrentStep] = useState(1);
  const [department, setDepartment] = useState("");
  const [selectedPart, setSelectedPart] = useState("EV-FRM-01: EV Scooty Main Frame");
  const [requestedQty, setRequestedQty] = useState("50");
  const [poApproved, setPoApproved] = useState(false);
  const [receivedQty, setReceivedQty] = useState("");
  const [actualGrnValue, setActualGrnValue] = useState("");

  const expectedPoValue = 12500;
  const isLedgerMismatch = actualGrnValue !== "" && Number(actualGrnValue) !== expectedPoValue;

  const handleGenerateDemandNote = () => {
    if (department.trim() !== "") {
      setCurrentStep(2);
    }
  };

  const handleSendToSupplier = () => {
    if (poApproved) {
      setCurrentStep(3);
    }
  };

  const handleLogGatePass = () => {
    if (receivedQty !== "") {
      setCurrentStep(4);
    }
  };

  const handleGenerateGRN = () => {
    if (actualGrnValue !== "") {
      setCurrentStep(5);

      // Sync purchased item into shared inventory/variants and ledger storage
      try {
        const existingItems = JSON.parse(localStorage.getItem("covico_inventory_covico_v3") || "[]");
        const parts = selectedPart.split(":");
        const sku = parts[0] ? parts[0].trim() : "EV-PRD-01";
        const productName = parts[1] ? parts[1].trim() : selectedPart;
        const qtyNum = Number(receivedQty) || Number(requestedQty) || 50;

        const newItem = {
          id: Date.now(),
          product: productName,
          sku: sku,
          size: "Standard",
          stock: qtyNum,
          status: "In Stock",
          color: "bg-emerald-50 text-emerald-600",
          ledgerRoute: "1001",
          directSale: true,
          productionConsumption: true
        };

        const filtered = existingItems.filter((item: any) => item.sku !== sku);
        localStorage.setItem("covico_inventory_covico_v3", JSON.stringify([newItem, ...filtered]));
      } catch (err) {
        console.error("Failed to sync purchase to inventory", err);
      }
    }
  };

  const getSidebarCardClass = (stepNum: number) => {
    if (currentStep === stepNum) return "border-blue-600 bg-white shadow-lg shadow-blue-900/5 ring-1 ring-blue-600/20 scale-100";
    if (currentStep > stepNum) return "border-emerald-200 bg-emerald-50/50 scale-95 opacity-80";
    return "border-slate-200 bg-slate-50/30 scale-95 opacity-50";
  };

  const getSidebarIconClass = (stepNum: number) => {
    if (currentStep === stepNum) return "bg-blue-600 text-white shadow-md shadow-blue-500/30";
    if (currentStep > stepNum) return "bg-emerald-500 text-white";
    return "bg-slate-200 text-slate-500";
  };

  const getApprovalDot = poApproved ? "bg-emerald-500" : "bg-amber-500 animate-pulse";
  const getApprovalText = poApproved ? "text-emerald-700" : "text-amber-700";

  return (
    <div className="fixed md:static inset-0 md:inset-auto z-40 md:z-0 overflow-y-auto md:overflow-visible min-h-screen bg-[#F4F7F9] p-6 font-sans sm:p-12 w-full">
      <div className="mx-auto max-w-6xl">
        
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-slate-200 shadow-sm">
              <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              <span className="text-xs font-bold tracking-widest text-slate-700 uppercase">
               COVICO Engineering (PVT) LTD
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
              Procurement Engine
            </h1>
            <p className="text-base text-slate-500 max-w-xl leading-relaxed">
              Complete workflow stages for raw steel, EV scooty frames, and auto parts procurement sequentially with strict ledger integration.
            </p>
          </div>
        </header>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          <div className="w-full lg:w-1/3 flex flex-col gap-4 relative">
            <div className="absolute left-[1.6rem] top-8 bottom-8 w-0.5 bg-slate-200 -z-10" />

            <div className={`relative flex items-start gap-4 p-5 rounded-2xl border transition-all duration-500 ${getSidebarCardClass(1)}`}>
              <div className={`flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold shrink-0 transition-colors ${getSidebarIconClass(1)}`}>1</div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Demand Note</h3>
                <p className="text-xs text-slate-500 mt-1">Departmental request</p>
              </div>
            </div>

            <div className={`relative flex items-start gap-4 p-5 rounded-2xl border transition-all duration-500 ${getSidebarCardClass(2)}`}>
              <div className={`flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold shrink-0 transition-colors ${getSidebarIconClass(2)}`}>2</div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">PO Generation</h3>
                <p className="text-xs text-slate-500 mt-1">Approval & Dispatch</p>
              </div>
            </div>

            <div className={`relative flex items-start gap-4 p-5 rounded-2xl border transition-all duration-500 ${getSidebarCardClass(3)}`}>
              <div className={`flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold shrink-0 transition-colors ${getSidebarIconClass(3)}`}>3</div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Inward Gate Pass</h3>
                <p className="text-xs text-slate-500 mt-1">Blind quantity receipt</p>
              </div>
            </div>

            <div className={`relative flex items-start gap-4 p-5 rounded-2xl border transition-all duration-500 ${getSidebarCardClass(4)}`}>
              <div className={`flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold shrink-0 transition-colors ${getSidebarIconClass(4)}`}>4</div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">GRN & Ledger</h3>
                <p className="text-xs text-slate-500 mt-1">Value verification</p>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-2/3">
            
            {currentStep === 1 && (
              <div className="bg-white rounded-3xl p-8 md:p-10 border border-slate-200 shadow-xl shadow-slate-200/40 transition-all">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-xl bg-blue-50 text-blue-600 text-xl">📝</div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">Demand Note (Mandatory)</h2>
                    <p className="text-sm text-slate-500 mt-1">Procurement cannot begin without an authorized departmental request.</p>
                  </div>
                </div>
                
                <div className="space-y-6 pt-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Requesting Department</label>
                    <input 
                      type="text" 
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      placeholder="e.g., Factory Floor Assembly B" 
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-900 outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-semibold" 
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Select Part / Material</label>
                      <select 
                        value={selectedPart}
                        onChange={(e) => setSelectedPart(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-900 outline-none focus:bg-white focus:border-blue-500 font-semibold cursor-pointer"
                      >
                        <option value="EV-FRM-01: EV Scooty Main Frame">EV-FRM-01: EV Scooty Main Frame</option>
                        <option value="EV-SWA-02: Swing Arm Assembly">EV-SWA-02: Swing Arm Assembly</option>
                        <option value="RM-STEEL: Grade A Sheet Steel">RM-STEEL: Grade A Sheet Steel (Kgs)</option>
                        <option value="RM-MOTOR: Electric Motor Assembly">RM-MOTOR: Electric Motor Assembly</option>
                        <option value="SMS-PTS-03: Sheet Metal Stamping">SMS-PTS-03: Sheet Metal Stamping</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Requested Quantity</label>
                      <input 
                        type="number" 
                        value={requestedQty}
                        onChange={(e) => setRequestedQty(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-900 font-bold outline-none focus:bg-white focus:border-blue-500" 
                      />
                    </div>
                  </div>

                  <button onClick={handleGenerateDemandNote} className="w-full py-4 rounded-xl bg-slate-900 text-white font-bold text-sm hover:bg-blue-600 transition-colors shadow-md cursor-pointer">
                    Authorize Demand Request
                  </button>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="bg-white rounded-3xl p-8 md:p-10 border border-slate-200 shadow-xl shadow-slate-200/40 transition-all">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-xl bg-purple-50 text-purple-600 text-xl">🛡️</div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">PO Approval Matrix</h2>
                    <p className="text-sm text-slate-500 mt-1">Review linked demand note for {selectedPart} and grant finance clearance.</p>
                  </div>
                </div>

                <div className="space-y-6 pt-4">
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 flex justify-between items-center">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Linked Demand Note</label>
                      <div className="text-sm font-semibold text-slate-900">DN-2044 ({department || "Factory Floor"})</div>
                    </div>
                    <div className="text-right">
                      <span className="block text-xs font-bold text-indigo-600 uppercase">Part & Qty</span>
                      <span className="text-sm font-black text-slate-800">{requestedQty} Units</span>
                    </div>
                  </div>
                  
                  <div className="p-5 rounded-2xl bg-white border border-slate-200">
                    <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-4">Authorization Chain</h3>
                    <div className="space-y-4 relative before:absolute before:inset-y-0 before:left-[11px] before:w-0.5 before:bg-slate-100">
                      <div className="relative flex items-center gap-4 pl-8">
                        <div className="absolute left-0 w-6 h-6 rounded-full bg-emerald-100 border border-emerald-200 flex items-center justify-center z-10"><span className="w-2 h-2 rounded-full bg-emerald-500" /></div>
                        <span className="text-sm font-semibold text-slate-700">Drafted by Procurement</span>
                      </div>
                      <div className="relative flex items-center gap-4 pl-8">
                        <div className="absolute left-0 w-6 h-6 rounded-full bg-white border border-slate-200 flex items-center justify-center z-10"><span className={`w-2 h-2 rounded-full ${getApprovalDot}`} /></div>
                        <span className={`text-sm font-bold ${getApprovalText}`}>Finance Manager Clearance</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 pt-2">
                    {!poApproved ? (
                      <button onClick={() => setPoApproved(true)} className="flex-1 py-4 rounded-xl bg-emerald-500 text-white font-bold text-sm hover:bg-emerald-600 transition-colors shadow-md cursor-pointer">
                        Grant Manager Approval
                      </button>
                    ) : (
                      <button onClick={handleSendToSupplier} className="flex-1 py-4 rounded-xl bg-slate-900 text-white font-bold text-sm hover:bg-purple-600 transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer">
                        Dispatch PO to Supplier →
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="bg-white rounded-3xl p-8 md:p-10 border border-slate-200 shadow-xl shadow-slate-200/40 transition-all">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-xl bg-amber-50 text-amber-600 text-xl">🚧</div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">Inward Gate Pass (IGP)</h2>
                    <p className="text-sm text-slate-500 mt-1">Record physical receipt of components at the factory gate.</p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-sm font-semibold mb-6">
                  Blind Receipt Active: Only quantity data is visible. Pricing is hidden.
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">PO Expected Qty</label>
                    <div className="w-full rounded-xl border border-slate-200 bg-slate-100 px-4 py-4 text-sm text-slate-700 font-black">{requestedQty} Units</div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">Actual Received Qty</label>
                    <input 
                      type="number" 
                      value={receivedQty}
                      onChange={(e) => setReceivedQty(e.target.value)}
                      placeholder="Enter Unit Count" 
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-900 font-bold outline-none focus:bg-white focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 transition-all" 
                    />
                  </div>
                </div>
                
                <div className="pt-8">
                  <button onClick={handleLogGatePass} className="w-full py-4 rounded-xl bg-slate-900 text-white font-bold text-sm hover:bg-amber-500 transition-colors shadow-md cursor-pointer">
                    Log Gate Arrival & Verify
                  </button>
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="bg-white rounded-3xl p-8 md:p-10 border border-slate-200 shadow-xl shadow-slate-200/40 transition-all">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-xl bg-emerald-50 text-emerald-600 text-xl">🧾</div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">GRN & Ledger Sync</h2>
                    <p className="text-sm text-slate-500 mt-1">Verify financial values for {selectedPart} before hitting the supplier ledger.</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Original PO Value</label>
                    <div className="w-full rounded-xl border border-slate-200 bg-slate-100 px-4 py-4 text-sm text-slate-700 font-black">${expectedPoValue}</div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">Final Billed Value</label>
                    <input 
                      type="number" 
                      value={actualGrnValue}
                      onChange={(e) => setActualGrnValue(e.target.value)}
                      placeholder="Enter Total Amount" 
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-900 font-bold outline-none focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all" 
                    />
                  </div>
                </div>

                {isLedgerMismatch && (
                  <div className="mt-6 p-5 rounded-xl border border-rose-200 bg-rose-50 flex gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
                    <div className="text-rose-600 text-xl">⚠️</div>
                    <div>
                      <span className="block text-sm font-bold text-rose-900">Ledger Suspension Triggered</span>
                      <span className="block text-sm text-rose-700 mt-1 leading-relaxed">The billed value does not match the original PO value. The automatic supplier ledger entry will be halted pending a manual finance override.</span>
                    </div>
                  </div>
                )}

                <div className="pt-8">
                  <button onClick={handleGenerateGRN} className={`w-full py-4 rounded-xl text-white font-bold text-sm transition-colors shadow-md cursor-pointer ${isLedgerMismatch ? "bg-rose-600 hover:bg-rose-700" : "bg-emerald-600 hover:bg-emerald-700"}`}>
                    {isLedgerMismatch ? "Generate GRN (Hold Ledger Sync)" : "Finalize & Update Supplier Ledger"}
                  </button>
                </div>
              </div>
            )}

            {currentStep === 5 && (
              <div className="bg-emerald-50 rounded-3xl p-12 border border-emerald-200 text-center shadow-xl shadow-slate-200/40 transition-all">
                <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-500/30">
                  <span className="text-white text-4xl">✓</span>
                </div>
                <h2 className="text-3xl font-bold text-emerald-900 mb-2">Workflow Complete</h2>
                <p className="text-emerald-700 font-medium">The procurement cycle for {selectedPart} has been successfully logged and processed into inventory.</p>
                <button onClick={() => window.location.reload()} className="mt-8 px-8 py-3 rounded-xl bg-white text-emerald-700 font-bold border border-emerald-200 hover:bg-emerald-100 transition-colors cursor-pointer">
                  Start New Procurement Cycle
                </button>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}