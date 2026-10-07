// src/app/gate-pass/page.tsx
"use client";

import React, { useState } from "react";

export default function GatePassModule() {
  const [activeTab, setActiveTab] = useState("Issue Pass");
  const [reportFilter, setReportFilter] = useState("All");
  const [selectedType, setSelectedType] = useState("Official Use");

  const tabs = ["Issue Pass", "History & Reports"];
  const filterOptions = ["All", "Official Use", "Personal Use"];

  const gatePassRecords = [
    { id: "GP-1001", name: "Ali Khan", type: "Official Use", reason: "Client meeting at Gulberg HQ", outTime: "10:30 AM", inTime: "01:45 PM", status: "Closed", typeColor: "bg-indigo-50 text-indigo-700 ring-1 ring-indigo-500/20", statusColor: "bg-slate-100 text-slate-600" },
    { id: "GP-1002", name: "Sara Ahmed", type: "Personal Use", reason: "Bank visit for personal work", outTime: "11:15 AM", inTime: "Pending", status: "Active", typeColor: "bg-rose-50 text-rose-700 ring-1 ring-rose-500/20", statusColor: "bg-emerald-50 text-emerald-600 ring-1 ring-emerald-500/30" },
    { id: "GP-1003", name: "Usman Asif", type: "Official Use", reason: "Site inspection and hardware delivery", outTime: "02:00 PM", inTime: "04:30 PM", status: "Closed", typeColor: "bg-indigo-50 text-indigo-700 ring-1 ring-indigo-500/20", statusColor: "bg-slate-100 text-slate-600" }
  ];

  const filteredRecords = reportFilter === "All" 
    ? gatePassRecords 
    : gatePassRecords.filter(record => record.type === reportFilter);

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-6 md:p-10 font-sans relative z-0">
      
      {/* Abstract Background Enhancements */}
      <div className="fixed top-0 left-0 w-full h-96 bg-gradient-to-b from-blue-50/50 to-transparent -z-10 pointer-events-none" />
      <div className="fixed -top-40 -right-40 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* ENHANCED HEADER */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
              <div className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-600"></span>
              </div>
              <span className="text-[10px] font-black tracking-[0.2em] text-slate-700 uppercase">
                Security Hub
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-blue-950 to-slate-800">
              Employee Gate Pass
            </h1>
            <p className="text-sm md:text-base text-slate-500 max-w-2xl leading-relaxed font-medium">
              Digital entry and exit monitoring. Strict distinction between official duties and personal tasks for transparent reporting.
            </p>
          </div>
        </header>

        {/* APPLE-STYLE FLOATING TABS */}
        <div className="relative w-full overflow-x-auto pb-4 hide-scrollbar">
          <div className="inline-flex p-1.5 space-x-1 bg-white/80 backdrop-blur-xl border border-slate-200/80 rounded-2xl shadow-sm">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${
                  activeTab === tab
                    ? "text-blue-600 shadow-sm"
                    : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                {activeTab === tab && (
                  <div className="absolute inset-0 bg-blue-50/80 border border-blue-100/50 rounded-xl -z-10 transition-all duration-300" />
                )}
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* MAIN CONTENT AREA */}
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-[2rem] blur opacity-0 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
          
          {/* TAB 1: ISSUE GATE PASS */}
          {activeTab === "Issue Pass" && (
            <section className="relative bg-white rounded-3xl border border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
              <div className="p-8 border-b border-slate-100/80 bg-gradient-to-r from-white to-slate-50/50">
                <h2 className="text-xl font-bold text-slate-900">Issue New Gate Pass</h2>
                <p className="text-sm text-slate-500 mt-1 font-medium">Complete the form below. Selecting the pass type is mandatory.</p>
              </div>
              
              <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-10">
                
                {/* Left Side: Mandatory Type Selection */}
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-bold text-slate-900 uppercase tracking-wider">Gate Pass Type</label>
                    <span className="text-[10px] font-bold px-2 py-1 bg-rose-50 text-rose-600 rounded uppercase">Mandatory</span>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button 
                      onClick={() => setSelectedType("Official Use")}
                      className={`p-6 rounded-2xl border-2 text-left transition-all ${
                        selectedType === "Official Use" 
                        ? "border-indigo-600 bg-indigo-50/50 shadow-md shadow-indigo-600/10" 
                        : "border-slate-100 bg-white hover:border-slate-200"
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 ${selectedType === "Official Use" ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-400"}`}>
                        🏢
                      </div>
                      <h3 className={`text-base font-bold ${selectedType === "Official Use" ? "text-indigo-900" : "text-slate-700"}`}>Official Use</h3>
                      <p className="text-xs text-slate-500 mt-1">Company meetings, site visits, or client deliveries.</p>
                    </button>

                    <button 
                      onClick={() => setSelectedType("Personal Use")}
                      className={`p-6 rounded-2xl border-2 text-left transition-all ${
                        selectedType === "Personal Use" 
                        ? "border-rose-500 bg-rose-50/50 shadow-md shadow-rose-500/10" 
                        : "border-slate-100 bg-white hover:border-slate-200"
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 ${selectedType === "Personal Use" ? "bg-rose-500 text-white" : "bg-slate-100 text-slate-400"}`}>
                        👤
                      </div>
                      <h3 className={`text-base font-bold ${selectedType === "Personal Use" ? "text-rose-900" : "text-slate-700"}`}>Personal Use</h3>
                      <p className="text-xs text-slate-500 mt-1">Personal breaks, doctor visits, or emergencies.</p>
                    </button>
                  </div>
                </div>

                {/* Right Side: Form Details */}
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Select Employee</label>
                    <select className="w-full p-4 rounded-xl border border-slate-200 bg-slate-50 text-sm font-semibold text-slate-700 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all">
                      <option>Select staff member...</option>
                      <option>EMP-001 - Ali Khan</option>
                      <option>EMP-002 - Sara Ahmed</option>
                      <option>EMP-003 - Usman Asif</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Reason for Leave</label>
                    <textarea 
                      rows={3} 
                      className="w-full p-4 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
                      placeholder="Specify the exact location or reason..."
                    ></textarea>
                  </div>

                  <button className="w-full py-4 bg-blue-600 text-white text-sm font-black uppercase tracking-wider rounded-xl shadow-lg shadow-blue-600/20 hover:bg-blue-700 hover:-translate-y-0.5 transition-all">
                    Generate {selectedType} Pass
                  </button>
                </div>

              </div>
            </section>
          )}

          {/* TAB 2: REPORTS & HISTORY */}
          {activeTab === "History & Reports" && (
            <section className="relative bg-white rounded-3xl border border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden flex flex-col">
              <div className="p-8 border-b border-slate-100/80 bg-gradient-to-r from-white to-slate-50/50 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Pass History and Reports</h2>
                  <p className="text-sm text-slate-500 mt-1 font-medium">Filter and monitor exit records based on pass type.</p>
                </div>
                
                {/* Reports Filter UI */}
                <div className="flex bg-slate-100 p-1 rounded-xl">
                  {filterOptions.map(option => (
                    <button
                      key={option}
                      onClick={() => setReportFilter(option)}
                      className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                        reportFilter === option 
                        ? "bg-white text-slate-900 shadow-sm" 
                        : "text-slate-500 hover:text-slate-700"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <div className="overflow-x-auto p-4">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr>
                      <th className="px-4 pb-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Pass ID</th>
                      <th className="px-4 pb-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Employee</th>
                      <th className="px-4 pb-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Pass Type</th>
                      <th className="px-4 pb-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Time Out</th>
                      <th className="px-4 pb-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Time In</th>
                      <th className="px-4 pb-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="space-y-2">
                    {filteredRecords.map((record) => (
                      <tr key={record.id} className="group/row hover:bg-slate-50/80 transition-colors border-b border-slate-50 last:border-0">
                        <td className="p-4 text-sm font-bold text-slate-900 font-mono">{record.id}</td>
                        <td className="p-4">
                          <div className="text-sm font-bold text-slate-900">{record.name}</div>
                          <div className="text-[10px] text-slate-500 mt-0.5 truncate max-w-[180px]">{record.reason}</div>
                        </td>
                        <td className="p-4">
                          <span className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider inline-flex items-center gap-1.5 ${record.typeColor}`}>
                            {record.type === "Official Use" ? "🏢" : "👤"} {record.type}
                          </span>
                        </td>
                        <td className="p-4 text-sm font-bold text-slate-700">{record.outTime}</td>
                        <td className="p-4 text-sm font-bold text-slate-700">{record.inTime}</td>
                        <td className="p-4 text-right">
                          <span className={`px-3 py-1.5 rounded-md text-[10px] font-black uppercase tracking-wider inline-block ${record.statusColor}`}>
                            {record.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                    {filteredRecords.length === 0 && (
                      <tr>
                        <td colSpan={6} className="p-8 text-center text-sm font-bold text-slate-400">
                          No records found for the selected category.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </section>
          )}

        </div>
      </div>
    </div>
  );
}