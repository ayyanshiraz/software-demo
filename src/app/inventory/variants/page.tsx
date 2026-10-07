// src/app/inventory/variants/page.tsx
"use client";

import React, { useState } from "react";

export default function VariantsPage() {
  const [inventory, setInventory] = useState([
    { id: 1, product: "Executive Leather Jacket", sku: "JAC-EX-S", size: "Small", stock: 45, status: "In Stock", color: "bg-emerald-50 text-emerald-600" },
    { id: 2, product: "Executive Leather Jacket", sku: "JAC-EX-M", size: "Medium", stock: 12, status: "Low Stock", color: "bg-amber-50 text-amber-600" },
    { id: 3, product: "Executive Leather Jacket", sku: "JAC-EX-L", size: "Large", stock: 0, status: "Out of Stock", color: "bg-rose-50 text-rose-600" },
    { id: 4, product: "Executive Leather Jacket", sku: "JAC-EX-XL", size: "XL", stock: 28, status: "In Stock", color: "bg-emerald-50 text-emerald-600" }
  ]);

  return (
    <div className="fixed md:static inset-0 md:inset-auto z-40 md:z-0 overflow-y-auto md:overflow-visible min-h-screen bg-white p-6 md:p-10 font-sans w-full">
      <div className="max-w-7xl mx-auto space-y-10">
        
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 shadow-sm">
              <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              <span className="text-xs font-bold tracking-widest text-slate-700 uppercase">
                Inventory Hub
              </span>
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
              Product Variants
            </h1>
            <p className="text-base text-slate-500 max-w-2xl leading-relaxed">
              Manage size based variants independently. Track stock levels for Small, Medium, Large, and XL sizes with unique SKUs.
            </p>
          </div>
          <button className="px-6 py-3 rounded-xl bg-blue-600 text-white font-bold text-sm shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition-all">
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
                    <th className="pb-4 pr-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Base Product</th>
                    <th className="pb-4 pr-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Size Variant</th>
                    <th className="pb-4 pr-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Unique SKU</th>
                    <th className="pb-4 pr-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Stock Level</th>
                    <th className="pb-4 pr-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                    <th className="pb-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Actions</th>
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
                      <td className="py-4 text-right">
                        <button className="text-blue-600 hover:text-blue-800 text-sm font-bold">Update Stock</button>
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