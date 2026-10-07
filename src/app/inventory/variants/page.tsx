// src/app/inventory/variants/page.tsx
"use client";

import React, { useState, useEffect } from "react";

export default function VariantsPage() {
  const [inventory, setInventory] = useState([
    { id: 1, product: "EV Scooty Main Frame", sku: "EV-FRM-01", size: "10 Kgs", stock: 45, status: "In Stock", color: "bg-emerald-50 text-emerald-600" },
    { id: 2, product: "Swing Arm Assembly", sku: "EV-SWA-02", size: "25 Kgs", stock: 12, status: "Low Stock", color: "bg-amber-50 text-amber-600" },
    { id: 3, product: "Sheet Metal Stamping Part", sku: "SMS-PTS-03", size: "5 Feet", stock: 120, status: "In Stock", color: "bg-emerald-50 text-emerald-600" },
    { id: 4, product: "Precision Auto Component", sku: "PAC-AUT-04", size: "10 Feet", stock: 0, status: "Out of Stock", color: "bg-rose-50 text-rose-600" }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  
  const [formProduct, setFormProduct] = useState("");
  const [formSize, setFormSize] = useState("");
  const [formSku, setFormSku] = useState("");
  const [formStock, setFormStock] = useState("");

  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [updatedStock, setUpdatedStock] = useState("");

  useEffect(() => {
    const savedList = localStorage.getItem("covico_inventory_covico_v3");
    if (savedList) {
      try {
        const parsed = JSON.parse(savedList);
        if (parsed.length > 0) {
          setInventory(parsed);
        }
      } catch (err) {
        console.error("Failed to load inventory list", err);
      }
    }
  }, []);

  const saveAndSetInventory = (newList: any[]) => {
    setInventory(newList);
    localStorage.setItem("covico_inventory_covico_v3", JSON.stringify(newList));
  };

  const handleAddVariant = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formProduct.trim() || !formSize.trim()) {
      alert("Please fill in all required fields.");
      return;
    }

    const stockNum = Number(formStock) || 0;
    const statusText = stockNum > 0 ? (stockNum < 15 ? "Low Stock" : "In Stock") : "Out of Stock";
    const statusColor = stockNum > 0 ? (stockNum < 15 ? "bg-amber-50 text-amber-600" : "bg-emerald-50 text-emerald-600") : "bg-rose-50 text-rose-600";

    const newRecord = {
      id: Date.now(),
      product: formProduct,
      sku: formSku || `SKU-${Math.floor(1000 + Math.random() * 9000)}`,
      size: formSize,
      stock: stockNum,
      status: statusText,
      color: statusColor
    };

    const updated = [newRecord, ...inventory];
    saveAndSetInventory(updated);

    setIsModalOpen(false);
    setFormProduct("");
    setFormSize("");
    setFormSku("");
    setFormStock("");
  };

  const handleDelete = (id: number) => {
    const filtered = inventory.filter(item => item.id !== id);
    saveAndSetInventory(filtered);
  };

  const openUpdateModal = (item: any) => {
    setSelectedItem(item);
    setUpdatedStock(item.stock.toString());
    setIsUpdateModalOpen(true);
  };

  const handleUpdateStockSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedItem) return;

    const num = Number(updatedStock) || 0;
    const statusText = num > 0 ? (num < 15 ? "Low Stock" : "In Stock") : "Out of Stock";
    const statusColor = num > 0 ? (num < 15 ? "bg-amber-50 text-amber-600" : "bg-emerald-50 text-emerald-600") : "bg-rose-50 text-rose-600";

    const updatedList = inventory.map(item => {
      if (item.id === selectedItem.id) {
        return { ...item, stock: num, status: statusText, color: statusColor };
      }
      return item;
    });

    saveAndSetInventory(updatedList);
    setIsUpdateModalOpen(false);
    setSelectedItem(null);
  };

  return (
    <div className="fixed md:static inset-0 md:inset-auto z-40 md:z-0 overflow-y-auto md:overflow-visible min-h-screen bg-white p-6 md:p-10 font-sans w-full">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
            <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl border border-slate-100 animate-in fade-in zoom-in duration-200">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-black text-slate-900">Add New Unit Variant</h3>
                <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 font-bold text-lg cursor-pointer">✕</button>
              </div>

              <form onSubmit={handleAddVariant} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Base Product / Part</label>
                  <input 
                    type="text" 
                    value={formProduct} 
                    onChange={(e) => setFormProduct(e.target.value)} 
                    placeholder="e.g., EV Scooty Main Frame"
                    className="w-full p-3 rounded-xl border border-slate-200 text-sm font-semibold text-slate-900 outline-none focus:border-blue-500 bg-slate-50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Measurement Unit (Kgs / Feet)</label>
                  <input 
                    type="text" 
                    value={formSize} 
                    onChange={(e) => setFormSize(e.target.value)} 
                    placeholder="e.g., 25 Kgs or 10 Feet"
                    className="w-full p-3 rounded-xl border border-slate-200 text-sm font-semibold text-slate-900 outline-none focus:border-blue-500 bg-slate-50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Unique SKU</label>
                  <input 
                    type="text" 
                    value={formSku} 
                    onChange={(e) => setFormSku(e.target.value)} 
                    placeholder="e.g., EV-FRM-02"
                    className="w-full p-3 rounded-xl border border-slate-200 text-sm font-mono font-bold text-slate-900 outline-none focus:border-blue-500 bg-slate-50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Initial Stock Units</label>
                  <input 
                    type="number" 
                    value={formStock} 
                    onChange={(e) => setFormStock(e.target.value)} 
                    placeholder="e.g., 50"
                    className="w-full p-3 rounded-xl border border-slate-200 text-sm font-bold text-slate-900 outline-none focus:border-blue-500 bg-slate-50"
                  />
                </div>

                <div className="pt-4 flex gap-3">
                  <button 
                    type="button" 
                    onClick={() => setIsModalOpen(false)} 
                    className="flex-1 py-3 rounded-xl bg-slate-100 text-slate-700 font-bold text-sm hover:bg-slate-200 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="flex-1 py-3 rounded-xl bg-blue-600 text-white font-bold text-sm shadow-md hover:bg-blue-700 transition-colors cursor-pointer"
                  >
                    Save Variant
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {isUpdateModalOpen && selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
            <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl border border-slate-100 animate-in fade-in zoom-in duration-200">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-black text-slate-900">Update Stock Level</h3>
                <button onClick={() => setIsUpdateModalOpen(false)} className="text-slate-400 hover:text-slate-600 font-bold text-lg cursor-pointer">✕</button>
              </div>

              <div className="mb-4 p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="block text-xs font-bold text-slate-400 uppercase">Part & Measurement</span>
                <span className="text-sm font-bold text-slate-800">{selectedItem.product} ({selectedItem.size})</span>
              </div>

              <form onSubmit={handleUpdateStockSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">New Stock Units</label>
                  <input 
                    type="number" 
                    value={updatedStock} 
                    onChange={(e) => setUpdatedStock(e.target.value)} 
                    className="w-full p-3 rounded-xl border border-slate-200 text-sm font-bold text-slate-900 outline-none focus:border-blue-500 bg-slate-50"
                    autoFocus
                  />
                </div>

                <div className="pt-4 flex gap-3">
                  <button 
                    type="button" 
                    onClick={() => setIsUpdateModalOpen(false)} 
                    className="flex-1 py-3 rounded-xl bg-slate-100 text-slate-700 font-bold text-sm hover:bg-slate-200 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="flex-1 py-3 rounded-xl bg-blue-600 text-white font-bold text-sm shadow-md hover:bg-blue-700 transition-colors cursor-pointer"
                  >
                    Update Stock
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 shadow-sm">
              <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              <span className="text-xs font-bold tracking-widest text-slate-700 uppercase">
                COVICO Engineering (PVT) LTD
              </span>
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
              Product & Part Variants
            </h1>
            <p className="text-base text-slate-500 max-w-2xl leading-relaxed">
              Manage EV scooty frames and parts using accurate business measurement units such as kilograms (Kgs) and feet (Feet).
            </p>
          </div>
          <button 
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-3 rounded-xl bg-blue-600 text-white font-bold text-sm shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition-all cursor-pointer"
          >
            + Add New Size Variant
          </button>
        </header>

        <section className="bg-white rounded-3xl border border-slate-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
          <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h2 className="text-lg font-bold text-slate-900">Variant Stock Tracker</h2>
            <span className="px-3 py-1 bg-slate-200 text-slate-700 text-xs font-bold rounded-full">Independent Tracking Active</span>
          </div>
          
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse whitespace-nowrap">
                <thead>
                  <tr className="border-b border-slate-100">
                    <th className="pb-4 pr-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Base Product / Part</th>
                    <th className="pb-4 pr-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Measurement Unit</th>
                    <th className="pb-4 pr-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Unique SKU</th>
                    <th className="pb-4 pr-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Stock Level</th>
                    <th className="pb-4 pr-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                    <th className="pb-4 pr-6 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {inventory.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-4 pr-6 text-sm font-bold text-slate-900">{item.product}</td>
                      <td className="py-4 pr-6">
                        <span className="px-3 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200">
                          {item.size}
                        </span>
                      </td>
                      <td className="py-4 pr-6 text-sm font-medium text-slate-500 font-mono">{item.sku}</td>
                      <td className="py-4 pr-6 text-sm font-black text-slate-900">{item.stock} Units</td>
                      <td className="py-4 pr-6">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${item.color}`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="py-4 text-right space-x-3">
                        <button 
                          onClick={() => openUpdateModal(item)}
                          className="text-blue-600 hover:text-blue-800 text-sm font-bold cursor-pointer"
                        >
                          Update Stock
                        </button>
                        <button 
                          onClick={() => handleDelete(item.id)}
                          className="text-rose-600 hover:text-rose-800 text-sm font-bold cursor-pointer"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}