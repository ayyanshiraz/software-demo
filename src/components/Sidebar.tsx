// src/components/Sidebar.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Tags,
  ShoppingCart,
  TrendingUp,
  Landmark,
  Factory,
  Users,
  Key,
  Shield,
  Menu,
  X
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const getLinkClass = (path: string) => {
    const isActive = pathname === path;
    return isActive
      ? `group relative flex items-center gap-4 px-6 py-3.5 my-1.5 rounded-xl bg-gradient-to-r from-[#162544] to-transparent text-blue-400 font-medium transition-all duration-500 before:absolute before:left-0 before:top-1 before:bottom-1 before:w-1.5 before:bg-blue-500 before:rounded-r-md before:shadow-[0_0_15px_rgba(59,130,246,0.8)] after:absolute after:inset-0 after:bg-gradient-to-r after:from-blue-500/10 after:to-transparent after:opacity-0 after:animate-pulse`
      : `group relative flex items-center gap-4 px-6 py-3.5 my-1.5 rounded-xl text-slate-400 hover:text-slate-100 font-medium transition-all duration-500 z-10 before:absolute before:inset-0 before:bg-gradient-to-r before:from-[#162544]/40 before:to-transparent before:translate-x-[-100%] hover:before:translate-x-0 before:transition-transform before:duration-500 before:-z-10 after:absolute after:left-0 after:top-1/2 after:-translate-y-1/2 after:w-1 after:h-0 hover:after:h-3/4 after:bg-blue-400/30 after:transition-all after:duration-300 after:rounded-r-md`;
  };

  const getIconClass = (path: string) => {
    const isActive = pathname === path;
    return isActive
      ? `w-5 h-5 transition-all duration-500 scale-110 drop-shadow-[0_0_8px_rgba(96,165,250,0.6)]`
      : `w-5 h-5 transition-all duration-500 group-hover:scale-125 group-hover:-rotate-12 group-hover:text-blue-300`;
  };

  return (
    <>
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className={`md:hidden fixed bottom-6 right-6 z-[60] p-4 rounded-full bg-[#3358df] text-white shadow-[0_0_20px_rgba(51,88,223,0.5)] flex items-center justify-center transition-transform active:scale-95`}
      >
        {isMobileMenuOpen ? <X className={`w-6 h-6`} /> : <Menu className={`w-6 h-6`} />}
      </button>

      {isMobileMenuOpen && (
        <div
          className={`md:hidden fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40`}
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <aside className={`w-72 bg-[#0a0f1c] text-slate-300 fixed inset-y-0 left-0 z-50 flex flex-col border-r border-slate-800/50 shadow-[4px_0_30px_rgba(0,0,0,0.5)] transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? `translate-x-0` : `-translate-x-full`} md:translate-x-0`}>
        <div className={`p-6 flex items-center gap-4 group cursor-pointer`}>
          <div className={`relative flex items-center justify-center w-12 h-12 rounded-2xl bg-[#3358df] shadow-[0_0_15px_rgba(51,88,223,0.3)] overflow-hidden transition-all duration-500 group-hover:shadow-[0_0_25px_rgba(51,88,223,0.6)]`}>
            <div className={`absolute inset-[-50%] bg-[conic-gradient(from_0deg,transparent_0_340deg,rgba(255,255,255,0.6)_360deg)] animate-spin group-hover:animate-[spin_0.5s_linear_infinite] opacity-50`} />
            <div className={`absolute inset-[2px] bg-[#3358df] rounded-[14px] flex items-center justify-center`}>
              <div className={`w-3 h-3 rounded-full bg-white absolute animate-ping opacity-75`} />
              <div className={`w-3 h-3 rounded-full bg-white relative z-10`} />
            </div>
          </div>
          <div className={`flex flex-col`}>
            <span className={`text-xl font-black tracking-wide text-white transition-all duration-500 group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]`}>COVICO</span>
            <span className={`text-[10px] font-bold text-blue-400 tracking-[0.05em] uppercase`}>Engineering (PVT) LTD.</span>
          </div>
        </div>

        <div className={`flex-1 px-4 py-2 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]`}>
          <Link href={`/`} className={getLinkClass(`/`)} onClick={() => setIsMobileMenuOpen(false)}>
            <LayoutDashboard className={getIconClass(`/`)} strokeWidth={2} />
            <span className={`tracking-wide text-[15px] transition-transform duration-500 group-hover:translate-x-1`}>Dashboard Overview</span>
          </Link>
          <Link href={`/inventory`} className={getLinkClass(`/inventory`)} onClick={() => setIsMobileMenuOpen(false)}>
            <Package className={getIconClass(`/inventory`)} strokeWidth={2} />
            <span className={`tracking-wide text-[15px] transition-transform duration-500 group-hover:translate-x-1`}>Inventory Hub</span>
          </Link>
          <Link href={`/inventory/variants`} className={getLinkClass(`/inventory/variants`)} onClick={() => setIsMobileMenuOpen(false)}>
            <Tags className={getIconClass(`/inventory/variants`)} strokeWidth={2} />
            <span className={`tracking-wide text-[15px] transition-transform duration-500 group-hover:translate-x-1`}>Product Variants</span>
          </Link>
          <Link href={`/purchase-workflow`} className={getLinkClass(`/purchase-workflow`)} onClick={() => setIsMobileMenuOpen(false)}>
            <ShoppingCart className={getIconClass(`/purchase-workflow`)} strokeWidth={2} />
            <span className={`tracking-wide text-[15px] transition-transform duration-500 group-hover:translate-x-1`}>Purchase Workflow</span>
          </Link>
          <Link href={`/sales`} className={getLinkClass(`/sales`)} onClick={() => setIsMobileMenuOpen(false)}>
            <TrendingUp className={getIconClass(`/sales`)} strokeWidth={2} />
            <span className={`tracking-wide text-[15px] transition-transform duration-500 group-hover:translate-x-1`}>Sales Terminal</span>
          </Link>
          <Link href={`/accounts`} className={getLinkClass(`/accounts`)} onClick={() => setIsMobileMenuOpen(false)}>
            <Landmark className={getIconClass(`/accounts`)} strokeWidth={2} />
            <span className={`tracking-wide text-[15px] transition-transform duration-500 group-hover:translate-x-1`}>Chart of Accounts</span>
          </Link>
          <Link href={`/production`} className={getLinkClass(`/production`)} onClick={() => setIsMobileMenuOpen(false)}>
            <Factory className={getIconClass(`/production`)} strokeWidth={2} />
            <span className={`tracking-wide text-[15px] transition-transform duration-500 group-hover:translate-x-1`}>Production & BOM</span>
          </Link>
          <Link href={`/hr-payroll`} className={getLinkClass(`/hr-payroll`)} onClick={() => setIsMobileMenuOpen(false)}>
            <Users className={getIconClass(`/hr-payroll`)} strokeWidth={2} />
            <span className={`tracking-wide text-[15px] transition-transform duration-500 group-hover:translate-x-1`}>HR & Payroll</span>
          </Link>
          <Link href={`/gate-pass`} className={getLinkClass(`/gate-pass`)} onClick={() => setIsMobileMenuOpen(false)}>
            <Key className={getIconClass(`/gate-pass`)} strokeWidth={2} />
            <span className={`tracking-wide text-[15px] transition-transform duration-500 group-hover:translate-x-1`}>Employee Gate Pass</span>
          </Link>
          <Link href={`/users`} className={getLinkClass(`/users`)} onClick={() => setIsMobileMenuOpen(false)}>
            <Shield className={getIconClass(`/users`)} strokeWidth={2} />
            <span className={`tracking-wide text-[15px] transition-transform duration-500 group-hover:translate-x-1`}>User Management</span>
          </Link>
        </div>

        <div className={`p-6 mt-auto`}>
          <div className={`p-4 rounded-2xl bg-[#131c31] border border-slate-700/30 relative overflow-hidden group cursor-pointer`}>
            <div className={`absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
            <div className={`absolute -right-8 -top-8 w-20 h-20 bg-emerald-500/20 blur-2xl rounded-full group-hover:bg-emerald-500/40 transition-colors duration-700`} />
            <span className={`block text-xs font-bold text-slate-300 mb-1.5 relative z-10`}>System Status</span>
            <div className={`flex items-center gap-2 relative z-10`}>
              <div className={`relative flex h-2.5 w-2.5`}>
                <div className={`animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75`} />
                <div className={`relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]`} />
              </div>
              <span className={`text-sm font-bold text-emerald-400 drop-shadow-[0_0_5px_rgba(52,211,153,0.3)]`}>All Ledgers Synced</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}