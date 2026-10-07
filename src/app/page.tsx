// src/app/page.tsx
"use client";

import React from "react";
import Link from "next/link";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, LineChart, Line
} from "recharts";
import { 
  Package, ClipboardList, TrendingUp, Users, Landmark, Key 
} from "lucide-react";

export default function DashboardPage() {
  const kpiStats = [
    { label: `Total Inventory Items`, value: `15,482`, change: `+12%`, icon: <Package className={`w-6 h-6`} />, color: `bg-blue-50 text-blue-600` },
    { label: `Active Purchase Orders`, value: `142`, change: `Requires Review`, icon: <ClipboardList className={`w-6 h-6`} />, color: `bg-purple-50 text-purple-600` },
    { label: `Monthly Sales Revenue`, value: `$45,231`, change: `+8.4%`, icon: <TrendingUp className={`w-6 h-6`} />, color: `bg-emerald-50 text-emerald-600` },
    { label: `Active Employees`, value: `84`, change: `On Duty`, icon: <Users className={`w-6 h-6`} />, color: `bg-cyan-50 text-cyan-600` }
  ];

  const navigationModules = [
    { name: `Inventory Hub`, desc: `Manage items, variants, and BOM recipes`, href: `/inventory`, icon: <Package className={`w-6 h-6`} />, badge: `Active`, theme: { bg: `bg-blue-50`, border: `border-blue-200/60`, text: `text-blue-900`, desc: `text-blue-600/80`, iconBg: `bg-blue-100 text-blue-700`, badgeBg: `bg-blue-200/50 text-blue-800` } },
    { name: `Purchase Workflow`, desc: `Demand notes, PO approval, IGP & GRN`, href: `/purchase-workflow`, icon: <ClipboardList className={`w-6 h-6`} />, badge: `Governed`, theme: { bg: `bg-purple-50`, border: `border-purple-200/60`, text: `text-purple-900`, desc: `text-purple-600/80`, iconBg: `bg-purple-100 text-purple-700`, badgeBg: `bg-purple-200/50 text-purple-800` } },
    { name: `Sales Terminal`, desc: `Process sales against verified PO/SO`, href: `/sales`, icon: <TrendingUp className={`w-6 h-6`} />, badge: `Terminal`, theme: { bg: `bg-emerald-50`, border: `border-emerald-200/60`, text: `text-emerald-900`, desc: `text-emerald-600/80`, iconBg: `bg-emerald-100 text-emerald-700`, badgeBg: `bg-emerald-200/50 text-emerald-800` } },
    { name: `Chart of Accounts`, desc: `Financial ledger and accounting routes`, href: `/accounts`, icon: <Landmark className={`w-6 h-6`} />, badge: `Ledger`, theme: { bg: `bg-amber-50`, border: `border-amber-200/60`, text: `text-amber-900`, desc: `text-amber-700/80`, iconBg: `bg-amber-100 text-amber-700`, badgeBg: `bg-amber-200/50 text-amber-800` } },
    { name: `HR & Payroll`, desc: `Staff attendance and salary disbursement`, href: `/hr-payroll`, icon: <Users className={`w-6 h-6`} />, badge: `Staff`, theme: { bg: `bg-cyan-50`, border: `border-cyan-200/60`, text: `text-cyan-900`, desc: `text-cyan-700/80`, iconBg: `bg-cyan-100 text-cyan-700`, badgeBg: `bg-cyan-200/50 text-cyan-800` } },
    { name: `Employee Gate Pass`, desc: `Digital entry and exit monitoring`, href: `/gate-pass`, icon: <Key className={`w-6 h-6`} />, badge: `Security`, theme: { bg: `bg-rose-50`, border: `border-rose-200/60`, text: `text-rose-900`, desc: `text-rose-600/80`, iconBg: `bg-rose-100 text-rose-700`, badgeBg: `bg-rose-200/50 text-rose-800` } }
  ];

  const revenueData = [
    { month: `Jan`, sales: 28000, purchases: 15000 },
    { month: `Feb`, sales: 32000, purchases: 18000 },
    { month: `Mar`, sales: 35000, purchases: 20000 },
    { month: `Apr`, sales: 29000, purchases: 16000 },
    { month: `May`, sales: 41000, purchases: 22000 },
    { month: `Jun`, sales: 45231, purchases: 25000 }
  ];

  const hrAttendanceData = [
    { name: `Present`, value: 72, color: `#06b6d4` },
    { name: `On Leave`, value: 8, color: `#a855f7` },
    { name: `Absent`, value: 4, color: `#f43f5e` }
  ];

  const productionData = [
    { day: `Mon`, target: 100, yielded: 95 },
    { day: `Tue`, target: 120, yielded: 110 },
    { day: `Wed`, target: 100, yielded: 105 },
    { day: `Thu`, target: 140, yielded: 130 },
    { day: `Fri`, target: 150, yielded: 145 },
  ];

  const inventoryStockData = [
    { category: `Raw Materials`, units: 8500 },
    { category: `WIP`, units: 3200 },
    { category: `Finished Goods`, units: 3782 },
    { category: `Packaging`, units: 1500 },
  ];

  const purchasePipelineData = [
    { stage: `Demand Notes`, count: 42 },
    { stage: `Pending POs`, count: 28 },
    { stage: `Dispatched`, count: 18 },
    { stage: `GRN Logged`, count: 54 },
  ];

  const accountsData = [
    { period: `Q1`, assets: 980, liabilities: 350 },
    { period: `Q2`, assets: 1050, liabilities: 320 },
    { period: `Q3`, assets: 1150, liabilities: 380 },
    { period: `Q4 (Est)`, assets: 1245, liabilities: 410 },
  ];

  const gatePassData = [
    { name: `Official Use`, value: 82, color: `#3b82f6` },
    { name: `Personal Use`, value: 18, color: `#f43f5e` } 
  ];

  return (
    <div className={`min-h-screen bg-slate-50 p-6 md:p-10 w-full font-sans`}>
      <header className={`mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6`}>
        <div>
          <h1 className={`text-3xl font-black tracking-tight text-black`}>
            Executive Dashboard
          </h1>
          <p className={`text-black text-sm mt-1`}>
            Real-time operational overview, financial analytics, and system-wide workflow tracking.
          </p>
        </div>
        <div className={`flex items-center gap-3`}>
          <div className={`px-4 py-2 rounded-xl bg-white border border-slate-200 shadow-sm text-xs font-bold text-black flex items-center gap-2`}>
            <span className={`w-2 h-2 rounded-full bg-emerald-500 animate-pulse`} />
            Lahore HQ • System Active
          </div>
        </div>
      </header>

      {/* ROW 1: TOP KPI CARDS */}
      <section className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8`}>
        {kpiStats.map((stat, idx) => (
          <div key={idx} className={`bg-white rounded-3xl p-6 border border-slate-200/60 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-lg transition-all hover:-translate-y-1`}>
            <div className={`flex items-center justify-between mb-4`}>
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl ${stat.color} shadow-inner`}>
                {stat.icon}
              </div>
              <span className={`text-xs font-bold px-2.5 py-1 rounded-full bg-slate-50 text-black border border-slate-100`}>
                {stat.change}
              </span>
            </div>
            <h3 className={`text-xs font-bold uppercase tracking-wider text-black mb-1`}>{stat.label}</h3>
            <p className={`text-3xl font-black text-black`}>{stat.value}</p>
          </div>
        ))}
      </section>

      {/* ROW 2: SALES & HR */}
      <section className={`grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8`}>
        <div className={`lg:col-span-2 bg-white rounded-3xl p-6 md:p-8 border border-slate-200/60 shadow-[0_4px_20px_rgb(0,0,0,0.03)] relative overflow-hidden`}>
          <div className={`absolute top-0 right-0 w-64 h-64 bg-cyan-50 rounded-full blur-3xl opacity-50 pointer-events-none`} />
          <div className={`flex justify-between items-center mb-8 relative z-10`}>
            <div>
              <h2 className={`text-lg font-bold text-black`}>Financial Trajectory</h2>
              <p className={`text-xs text-black mt-1`}>Sales Revenue vs Procurement Costs (Last 6 Months)</p>
            </div>
            <div className={`flex gap-4 text-xs font-bold text-black`}>
              <div className={`flex items-center gap-1.5`}><span className={`w-3 h-3 rounded bg-[#06b6d4]`} /> Revenue</div>
              <div className={`flex items-center gap-1.5`}><span className={`w-3 h-3 rounded bg-[#a855f7]`} /> Purchases</div>
            </div>
          </div>
          <div className={`h-72 w-full relative z-10`}>
            <ResponsiveContainer width={`100%`} height={`100%`}>
              <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id={`colorSales`} x1={`0`} y1={`0`} x2={`0`} y2={`1`}>
                    <stop offset={`5%`} stopColor={`#06b6d4`} stopOpacity={0.3}/>
                    <stop offset={`95%`} stopColor={`#06b6d4`} stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id={`colorPurchases`} x1={`0`} y1={`0`} x2={`0`} y2={`1`}>
                    <stop offset={`5%`} stopColor={`#a855f7`} stopOpacity={0.3}/>
                    <stop offset={`95%`} stopColor={`#a855f7`} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray={`3 3`} vertical={false} stroke={`#f1f5f9`} />
                <XAxis dataKey={`month`} axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: `#000000` }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: `#000000` }} tickFormatter={(value) => `$${value/1000}k`} />
                <Tooltip contentStyle={{ borderRadius: `12px`, border: `none`, boxShadow: `0 10px 25px rgba(0,0,0,0.1)`, color: `#000000` }} itemStyle={{ color: `#000000` }} labelStyle={{ color: `#000000` }} />
                <Area type={`monotone`} dataKey={`sales`} stroke={`#06b6d4`} strokeWidth={3} fillOpacity={1} fill={`url(#colorSales)`} />
                <Area type={`monotone`} dataKey={`purchases`} stroke={`#a855f7`} strokeWidth={3} fillOpacity={1} fill={`url(#colorPurchases)`} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className={`bg-white rounded-3xl p-6 md:p-8 border border-slate-200/60 shadow-[0_4px_20px_rgb(0,0,0,0.03)] flex flex-col`}>
          <div>
            <h2 className={`text-lg font-bold text-black`}>Workforce Status</h2>
            <p className={`text-xs text-black mt-1`}>Today's HR Activity</p>
          </div>
          <div className={`flex-1 flex items-center justify-center min-h-[200px]`}>
            <ResponsiveContainer width={`100%`} height={`100%`}>
              <PieChart>
                <Pie data={hrAttendanceData} cx={`50%`} cy={`50%`} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey={`value`}>
                  {hrAttendanceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke={`transparent`} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: `8px`, border: `none`, boxShadow: `0 4px 15px rgba(0,0,0,0.1)`, color: `#000000` }} itemStyle={{ color: `#000000` }} labelStyle={{ color: `#000000` }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className={`grid grid-cols-3 gap-2 mt-2`}>
            {hrAttendanceData.map((item, idx) => (
              <div key={idx} className={`text-center`}>
                <div className={`text-[10px] font-bold uppercase tracking-wider text-black mb-1`}>{item.name}</div>
                <div className={`text-lg font-black`} style={{ color: item.color }}>{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROW 3: ACCOUNTS & INVENTORY */}
      <section className={`grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8`}>
        <div className={`bg-white rounded-3xl p-6 md:p-8 border border-slate-200/60 shadow-[0_4px_20px_rgb(0,0,0,0.03)]`}>
          <div className={`flex justify-between items-center mb-6`}>
            <div>
              <h2 className={`text-lg font-bold text-black`}>Chart of Accounts</h2>
              <p className={`text-xs text-black mt-1`}>Assets vs Liabilities Trajectory</p>
            </div>
            <div className={`flex gap-4 text-xs font-bold text-black`}>
              <div className={`flex items-center gap-1.5`}><span className={`w-3 h-3 rounded bg-[#3b82f6]`} /> Assets</div>
              <div className={`flex items-center gap-1.5`}><span className={`w-3 h-3 rounded bg-[#f43f5e]`} /> Liab.</div>
            </div>
          </div>
          <div className={`h-64 w-full`}>
            <ResponsiveContainer width={`100%`} height={`100%`}>
              <LineChart data={accountsData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray={`3 3`} vertical={false} stroke={`#f1f5f9`} />
                <XAxis dataKey={`period`} axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: `#000000` }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: `#000000` }} tickFormatter={(val) => `$${val}k`} />
                <Tooltip contentStyle={{ borderRadius: `12px`, border: `none`, boxShadow: `0 10px 25px rgba(0,0,0,0.1)`, color: `#000000` }} itemStyle={{ color: `#000000` }} labelStyle={{ color: `#000000` }} />
                <Line type={`monotone`} dataKey={`assets`} stroke={`#3b82f6`} strokeWidth={4} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
                <Line type={`monotone`} dataKey={`liabilities`} stroke={`#f43f5e`} strokeWidth={4} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className={`bg-white rounded-3xl p-6 md:p-8 border border-slate-200/60 shadow-[0_4px_20px_rgb(0,0,0,0.03)]`}>
          <div className={`flex justify-between items-center mb-6`}>
            <div>
              <h2 className={`text-lg font-bold text-black`}>Inventory Hub Distribution</h2>
              <p className={`text-xs text-black mt-1`}>Stock levels across asset categories</p>
            </div>
            <div className={`px-3 py-1 bg-indigo-50 text-indigo-600 text-xs font-bold rounded-lg border border-indigo-100`}>
              Total: 16,982
            </div>
          </div>
          <div className={`h-64 w-full`}>
            <ResponsiveContainer width={`100%`} height={`100%`}>
              <BarChart data={inventoryStockData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray={`3 3`} vertical={false} stroke={`#f1f5f9`} />
                <XAxis dataKey={`category`} axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: `#000000` }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: `#000000` }} />
                <Tooltip cursor={{ fill: `#f8fafc` }} contentStyle={{ borderRadius: `12px`, border: `none`, boxShadow: `0 10px 25px rgba(0,0,0,0.1)`, color: `#000000` }} itemStyle={{ color: `#000000` }} labelStyle={{ color: `#000000` }} />
                <Bar dataKey={`units`} fill={`#6366f1`} radius={[4, 4, 0, 0]} barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* ROW 4: PURCHASE & GATE PASS */}
      <section className={`grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8`}>
        <div className={`bg-white rounded-3xl p-6 md:p-8 border border-slate-200/60 shadow-[0_4px_20px_rgb(0,0,0,0.03)] flex flex-col`}>
          <div>
            <h2 className={`text-lg font-bold text-black`}>Gate Pass Security</h2>
            <p className={`text-xs text-black mt-1`}>Official vs Personal exits ratio</p>
          </div>
          <div className={`flex-1 flex items-center justify-center min-h-[200px]`}>
            <ResponsiveContainer width={`100%`} height={`100%`}>
              <PieChart>
                <Pie data={gatePassData} cx={`50%`} cy={`50%`} innerRadius={50} outerRadius={70} paddingAngle={5} dataKey={`value`}>
                  {gatePassData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke={`transparent`} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: `8px`, border: `none`, boxShadow: `0 4px 15px rgba(0,0,0,0.1)`, color: `#000000` }} itemStyle={{ color: `#000000` }} labelStyle={{ color: `#000000` }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className={`grid grid-cols-2 gap-2 mt-2`}>
            {gatePassData.map((item, idx) => (
              <div key={idx} className={`text-center`}>
                <div className={`text-[10px] font-bold uppercase tracking-wider text-black mb-1`}>{item.name}</div>
                <div className={`text-lg font-black`} style={{ color: item.color }}>{item.value}%</div>
              </div>
            ))}
          </div>
        </div>

        <div className={`lg:col-span-2 bg-white rounded-3xl p-6 md:p-8 border border-slate-200/60 shadow-[0_4px_20px_rgb(0,0,0,0.03)] relative overflow-hidden`}>
          <div className={`absolute bottom-0 right-0 w-64 h-64 bg-amber-50 rounded-full blur-3xl opacity-50 pointer-events-none`} />
          <div className={`flex justify-between items-center mb-8 relative z-10`}>
            <div>
              <h2 className={`text-lg font-bold text-black`}>Purchase Workflow Pipeline</h2>
              <p className={`text-xs text-black mt-1`}>Real-time status of all procurement operations</p>
            </div>
          </div>
          <div className={`h-64 w-full relative z-10`}>
            <ResponsiveContainer width={`100%`} height={`100%`}>
              <BarChart data={purchasePipelineData} layout={`vertical`} margin={{ top: 0, right: 10, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray={`3 3`} horizontal={true} vertical={false} stroke={`#f1f5f9`} />
                <XAxis type={`number`} axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: `#000000` }} />
                <YAxis dataKey={`stage`} type={`category`} axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: `#000000` }} width={100} />
                <Tooltip cursor={{ fill: `#f8fafc` }} contentStyle={{ borderRadius: `12px`, border: `none`, boxShadow: `0 10px 25px rgba(0,0,0,0.1)`, color: `#000000` }} itemStyle={{ color: `#000000` }} labelStyle={{ color: `#000000` }} />
                <Bar dataKey={`count`} fill={`#f59e0b`} radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* ROW 5: PRODUCTION & ARCHITECTURE */}
      <section className={`grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8`}>
        <div className={`bg-white rounded-3xl p-6 md:p-8 border border-slate-200/60 shadow-[0_4px_20px_rgb(0,0,0,0.03)]`}>
          <div className={`flex justify-between items-center mb-6`}>
            <div>
              <h2 className={`text-lg font-bold text-black`}>Production Yield (BOM)</h2>
              <p className={`text-xs text-black mt-1`}>Weekly target vs actual finished goods.</p>
            </div>
            <div className={`px-3 py-1 bg-[#eab308]/10 text-[#eab308] text-xs font-bold rounded-lg border border-[#eab308]/20`}>
              Efficiency: 92%
            </div>
          </div>
          <div className={`h-64 w-full`}>
            <ResponsiveContainer width={`100%`} height={`100%`}>
              <BarChart data={productionData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }} barGap={8}>
                <CartesianGrid strokeDasharray={`3 3`} vertical={false} stroke={`#f1f5f9`} />
                <XAxis dataKey={`day`} axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: `#000000` }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: `#000000` }} />
                <Tooltip cursor={{ fill: `#f8fafc` }} contentStyle={{ borderRadius: `12px`, border: `none`, boxShadow: `0 10px 25px rgba(0,0,0,0.1)`, color: `#000000` }} itemStyle={{ color: `#000000` }} labelStyle={{ color: `#000000` }} />
                <Bar dataKey={`target`} fill={`#cbd5e1`} radius={[4, 4, 0, 0]} barSize={12} />
                <Bar dataKey={`yielded`} fill={`#eab308`} radius={[4, 4, 0, 0]} barSize={12} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className={`bg-slate-900 rounded-3xl p-6 md:p-8 border border-slate-800 shadow-2xl relative overflow-hidden flex flex-col justify-center`}>
          <div className={`absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none`} />
          <div className={`absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none`} />
          
          <div className={`mb-6 relative z-10`}>
            <h2 className={`text-lg font-bold text-white`}>Live Enterprise Architecture</h2>
            <p className={`text-xs text-slate-400 mt-1`}>How data flows through your CRM modules right now.</p>
          </div>

          <div className={`flex-1 flex flex-col justify-center relative z-10 py-4`}>
            <div className={`flex items-center justify-between gap-2`}>
              <div className={`flex flex-col items-center gap-2 flex-1`}>
                <div className={`w-12 h-12 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400 text-xl shadow-[0_0_15px_rgba(168,85,247,0.2)]`}><ClipboardList className={`w-6 h-6`} /></div>
                <div className={`text-[10px] font-bold text-slate-300 uppercase tracking-wider text-center`}>Procure<br/><span className={`text-slate-500 font-normal`}>PO & GRN</span></div>
              </div>
              
              <div className={`h-0.5 flex-1 bg-gradient-to-r from-purple-500/40 to-cyan-500/40 relative`}>
                <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow-[0_0_10px_white] animate-ping`} />
              </div>

              <div className={`flex flex-col items-center gap-2 flex-1`}>
                <div className={`w-14 h-14 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 text-2xl shadow-[0_0_15px_rgba(6,182,212,0.2)]`}><Package className={`w-7 h-7`} /></div>
                <div className={`text-[10px] font-bold text-slate-300 uppercase tracking-wider text-center`}>Inventory<br/><span className={`text-slate-500 font-normal`}>Raw & BOM</span></div>
              </div>

              <div className={`h-0.5 flex-1 bg-gradient-to-r from-cyan-500/40 to-emerald-500/40 relative`}>
                 <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow-[0_0_10px_white] animate-ping`} style={{ animationDelay: `0.5s` }} />
              </div>

              <div className={`flex flex-col items-center gap-2 flex-1`}>
                <div className={`w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 text-xl shadow-[0_0_15px_rgba(16,185,129,0.2)]`}><TrendingUp className={`w-6 h-6`} /></div>
                <div className={`text-[10px] font-bold text-slate-300 uppercase tracking-wider text-center`}>Sales<br/><span className={`text-slate-500 font-normal`}>Dispatch</span></div>
              </div>
            </div>

            <div className={`mt-8 p-4 rounded-xl bg-slate-800/50 border border-slate-700/50 text-center`}>
              <span className={`text-xs text-slate-400`}>All movements automatically sync with the </span>
              <span className={`text-xs font-bold text-[#eab308] inline-flex items-center gap-1`}>Chart of Accounts Ledger <Landmark className={`w-3.5 h-3.5`} /></span>
            </div>
          </div>
        </div>
      </section>

      {/* NAVIGATION MODULES GRID */}
      <section className={`mb-12`}>
        <div className={`flex items-center justify-between mb-6`}>
          <h2 className={`text-xl font-bold text-black`}>Enterprise Modules</h2>
          <span className={`text-xs font-semibold text-black uppercase tracking-wider`}>Click any card to launch module</span>
        </div>

        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`}>
          {navigationModules.map((mod, idx) => (
            <Link 
              key={idx} 
              href={mod.href}
              className={`group ${mod.theme.bg} rounded-3xl p-7 border ${mod.theme.border} shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between`}
            >
              <div>
                <div className={`flex items-center justify-between mb-4`}>
                  <div className={`w-12 h-12 rounded-2xl ${mod.theme.iconBg} flex items-center justify-center text-xl group-hover:scale-110 transition-transform`}>
                    {mod.icon}
                  </div>
                  <span className={`text-[10px] font-bold px-3 py-1.5 rounded-full ${mod.theme.badgeBg} uppercase tracking-wider`}>
                    {mod.badge}
                  </span>
                </div>
                <h3 className={`text-lg font-bold ${mod.theme.text} mb-1 group-hover:opacity-80 transition-opacity`}>{mod.name}</h3>
                <p className={`text-sm ${mod.theme.desc} leading-relaxed`}>{mod.desc}</p>
              </div>

              <div className={`mt-6 pt-4 border-t border-black/5 flex items-center justify-between text-xs font-bold ${mod.theme.text} opacity-70 group-hover:opacity-100`}>
                <span className={`uppercase tracking-wider`}>Launch Module</span>
                <span className={`transform group-hover:translate-x-1 transition-transform`}>→</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}