"use client";

import React, { useState } from "react";

export default function SalesPipeline() {
  const [orderReference, setOrderReference] = useState(``);
  const [isOrderValidated, setIsOrderValidated] = useState(false);
  const [productCategory, setProductCategory] = useState(`Finished Product`);
  const [selectedItem, setSelectedItem] = useState(``);
  const [quantity, setQuantity] = useState(``);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transactionComplete, setTransactionComplete] = useState(false);

  const handleValidateOrder = () => {
    if (orderReference.trim() !== ``) {
      setIsOrderValidated(true);
    }
  };

  const handleProcessSale = () => {
    if (isOrderValidated && selectedItem !== `` && quantity !== ``) {
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        setTransactionComplete(true);
      }, 1500);
    }
  };

  const resetTerminal = () => {
    setOrderReference(``);
    setIsOrderValidated(false);
    setProductCategory(`Finished Product`);
    setSelectedItem(``);
    setQuantity(``);
    setTransactionComplete(false);
  };

  const finishedProducts = [
    `FP-101: Premium Leather Jacket`,
    `FP-102: Executive Office Chair`,
    `FP-103: Mechanical Keyboard`
  ];
  
  const rawMaterials = [
    `RM-001: Grade A Leather Sheet (Direct Sale)`,
    `RM-002: Industrial Nylon Thread (Direct Sale)`,
    `RM-045: Bulk Steel Bearings (Direct Sale)`
  ];

  const currentOptions = productCategory === `Finished Product` ? finishedProducts : rawMaterials;

  // DYNAMIC HELPER CLASSES TO AVOID PARSER CRASHES
  const step1CardClass = isOrderValidated 
    ? `bg-white rounded-3xl p-8 border border-emerald-200 shadow-lg shadow-emerald-900/5 ring-1 ring-emerald-500/10` 
    : `bg-white rounded-3xl p-8 border border-blue-200 shadow-xl shadow-blue-900/5 ring-1 ring-blue-500/20`;

  const step1IconClass = isOrderValidated 
    ? `flex items-center justify-center w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 font-bold` 
    : `flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white font-bold`;

  const step2ContainerClass = !isOrderValidated 
    ? `bg-white rounded-3xl p-8 border border-slate-200 opacity-50 grayscale-[50%] pointer-events-none` 
    : `bg-white rounded-3xl p-8 border border-slate-200 shadow-lg shadow-slate-200/50`;

  const step2IconClass = isOrderValidated 
    ? `flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600 font-bold` 
    : `flex items-center justify-center w-10 h-10 rounded-full bg-slate-200 text-slate-500 font-bold`;

  const finishedTabClass = productCategory === `Finished Product` 
    ? `flex-1 py-3 text-sm font-bold rounded-lg transition-all bg-white text-blue-700 shadow-sm` 
    : `flex-1 py-3 text-sm font-bold rounded-lg transition-all text-slate-500 hover:text-slate-700`;

  const rawTabClass = productCategory === `Raw Material` 
    ? `flex-1 py-3 text-sm font-bold rounded-lg transition-all bg-white text-purple-700 shadow-sm` 
    : `flex-1 py-3 text-sm font-bold rounded-lg transition-all text-slate-500 hover:text-slate-700`;

  const categoryTextColor = productCategory === `Raw Material` ? `text-purple-400` : `text-blue-400`;

  const executeButtonClass = isOrderValidated && selectedItem && quantity 
    ? `w-full py-5 rounded-2xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 bg-blue-600 text-white hover:bg-blue-500 shadow-[0_0_30px_rgba(37,99,235,0.3)]` 
    : `w-full py-5 rounded-2xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 bg-slate-800 text-slate-500 cursor-not-allowed`;

  return (
    <div className={`min-h-screen bg-[#F4F7F9] p-6 font-sans sm:p-12 relative z-0`}>
      <div className={`fixed top-0 right-0 w-[40rem] h-[40rem] bg-gradient-to-bl from-blue-100/40 via-purple-50/20 to-transparent rounded-full blur-3xl -z-10 pointer-events-none`} />
      
      <div className={`mx-auto max-w-7xl`}>
        <header className={`mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6`}>
          <div className={`space-y-3`}>
            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-slate-200 shadow-sm`}>
              <div className={`w-2 h-2 rounded-full bg-blue-600 animate-pulse`} />
              <span className={`text-xs font-bold tracking-widest text-slate-700 uppercase`}>
                COVICO Engineering (PVT) LTD.
              </span>
            </div>
            <h1 className={`text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900`}>
              Sales Execution Terminal
            </h1>
            <p className={`text-base text-slate-500 max-w-2xl leading-relaxed`}>
              Process outbound sales transactions. Strict governance requires an authorized Sales Order or Customer PO before processing.
            </p>
          </div>
        </header>

        <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8`}>
          
          <div className={`lg:col-span-7 space-y-8`}>
            
            <div className={step1CardClass}>
              <div className={`flex items-center justify-between mb-6`}>
                <div className={`flex items-center gap-4`}>
                  <div className={step1IconClass}>
                    {isOrderValidated ? `✓` : `1`}
                  </div>
                  <div>
                    <h2 className={`text-xl font-bold text-slate-900`}>Mandatory Order Reference</h2>
                    <p className={`text-sm text-slate-500 mt-0.5`}>Sales cannot process without a valid PO/SO.</p>
                  </div>
                </div>
                {isOrderValidated && (
                  <button onClick={() => setIsOrderValidated(false)} className={`text-xs font-bold text-slate-400 hover:text-slate-600 uppercase tracking-wider`}>
                    Edit Ref
                  </button>
                )}
              </div>

              {!isOrderValidated ? (
                <div className={`space-y-4`}>
                  <div className={`p-4 rounded-xl bg-amber-50 border border-amber-200 flex gap-3`}>
                    <span className={`text-amber-500`}>⚠</span>
                    <span className={`text-sm font-medium text-amber-800`}>System Lock Active: Enter Customer PO or internal Sales Order to unlock the terminal.</span>
                  </div>
                  <div className={`flex gap-4`}>
                    <input 
                      type={`text`} 
                      value={orderReference}
                      onChange={(e) => setOrderReference(e.target.value)}
                      placeholder={`e.g., SO-8842 or CUST-PO-991`} 
                      className={`flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-900 font-bold tracking-wide outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all uppercase`} 
                    />
                    <button onClick={handleValidateOrder} className={`px-8 py-4 rounded-xl bg-slate-900 text-white font-bold text-sm hover:bg-blue-600 transition-colors shadow-md shrink-0`}>
                      Validate Order
                    </button>
                  </div>
                </div>
              ) : (
                <div className={`p-4 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-between`}>
                  <div className={`flex items-center gap-3`}>
                    <span className={`text-sm text-emerald-600 font-bold uppercase tracking-wider`}>Authorized Reference:</span>
                    <span className={`text-lg font-black text-emerald-900 uppercase`}>{orderReference}</span>
                  </div>
                  <span className={`px-3 py-1 bg-emerald-200 text-emerald-800 text-xs font-bold rounded-full uppercase`}>Unlocked</span>
                </div>
              )}
            </div>

            <div className={step2ContainerClass}>
              <div className={`flex items-center gap-4 mb-8`}>
                <div className={step2IconClass}>
                  2
                </div>
                <div>
                  <h2 className={`text-xl font-bold text-slate-900`}>Item Configuration</h2>
                  <p className={`text-sm text-slate-500 mt-0.5`}>Select product category and inventory item.</p>
                </div>
              </div>

              <div className={`space-y-8`}>
                <div>
                  <label className={`block text-xs font-bold text-slate-700 uppercase tracking-wider mb-3`}>Sales Category</label>
                  <div className={`flex p-1 bg-slate-100 rounded-xl`}>
                    <button 
                      onClick={() => { setProductCategory(`Finished Product`); setSelectedItem(``); }}
                      className={finishedTabClass}
                    >
                      Finished Products
                    </button>
                    <button 
                      onClick={() => { setProductCategory(`Raw Material`); setSelectedItem(``); }}
                      className={rawTabClass}
                    >
                      Raw Materials (As-Is Sale)
                    </button>
                  </div>
                </div>

                <div className={`grid grid-cols-1 md:grid-cols-2 gap-6`}>
                  <div className={`space-y-2`}>
                    <label className={`block text-xs font-bold text-slate-700 uppercase tracking-wider`}>Select Item</label>
                    <select 
                      value={selectedItem}
                      onChange={(e) => setSelectedItem(e.target.value)}
                      className={`w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-900 outline-none focus:bg-white focus:border-blue-500 cursor-pointer appearance-none`}
                    >
                      <option value={``}>Choose from inventory...</option>
                      {currentOptions.map((opt, idx) => (
                        <option key={idx} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                  <div className={`space-y-2`}>
                    <label className={`block text-xs font-bold text-slate-700 uppercase tracking-wider`}>Quantity to Sell</label>
                    <input 
                      type={`number`}
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      placeholder={`Enter Qty`}
                      className={`w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-900 font-bold outline-none focus:bg-white focus:border-blue-500`}
                    />
                  </div>
                </div>
              </div>
            </div>

          </div>

          <div className={`lg:col-span-5`}>
            <div className={`sticky top-8 bg-slate-900 rounded-3xl p-8 border border-slate-800 shadow-2xl overflow-hidden relative min-h-[32rem] flex flex-col`}>
              
              <div className={`absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none`} />
              <div className={`absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none`} />

              {!transactionComplete ? (
                <>
                  <div className={`mb-8 border-b border-slate-800 pb-6 relative z-10`}>
                    <h3 className={`text-slate-400 text-xs font-bold uppercase tracking-widest mb-1`}>Transaction Preview</h3>
                    <div className={`text-2xl font-black text-white uppercase`}>
                      {orderReference || `AWAITING ORDER REF`}
                    </div>
                  </div>

                  <div className={`flex-1 space-y-6 relative z-10`}>
                    <div className={`space-y-1`}>
                      <span className={`block text-xs text-slate-500 uppercase tracking-wider`}>Category</span>
                      <span className={`block text-sm font-medium ` + categoryTextColor}>
                        {productCategory}
                      </span>
                    </div>

                    <div className={`space-y-1`}>
                      <span className={`block text-xs text-slate-500 uppercase tracking-wider`}>Item Detail</span>
                      <span className={`block text-base font-bold text-slate-200 leading-snug`}>
                        {selectedItem || `No item selected`}
                      </span>
                    </div>

                    <div className={`space-y-1`}>
                      <span className={`block text-xs text-slate-500 uppercase tracking-wider`}>Quantity</span>
                      <span className={`block text-3xl font-light text-white`}>
                        {quantity || `0`} <span className={`text-lg text-slate-500`}>Units</span>
                      </span>
                    </div>
                  </div>

                  <div className={`pt-8 mt-8 border-t border-slate-800 relative z-10`}>
                    <button 
                      onClick={handleProcessSale}
                      disabled={!isOrderValidated || selectedItem === `` || quantity === `` || isProcessing}
                      className={executeButtonClass}
                    >
                      {isProcessing ? (
                        <>
                          <div className={`w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin`} />
                          Processing Ledger...
                        </>
                      ) : (
                        `Execute Sales Transaction`
                      )}
                    </button>
                  </div>
                </>
              ) : (
                <div className={`flex-1 flex flex-col items-center justify-center text-center relative z-10`}>
                  <div className={`w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center mb-6`}>
                    <div className={`w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center text-white text-3xl shadow-[0_0_30px_rgba(16,185,129,0.5)]`}>
                      ✓
                    </div>
                  </div>
                  <h3 className={`text-2xl font-bold text-white mb-2`}>Transaction Successful</h3>
                  <p className={`text-slate-400 text-sm mb-8 px-4`}>
                    Order <strong className={`text-emerald-400 uppercase`}>{orderReference}</strong> processed. Inventory deducted and sales ledger updated.
                  </p>
                  <button 
                    onClick={resetTerminal}
                    className={`px-8 py-3 rounded-xl bg-slate-800 text-white font-bold hover:bg-slate-700 transition-colors border border-slate-700`}
                  >
                    Process New Sale
                  </button>
                </div>
              )}

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}