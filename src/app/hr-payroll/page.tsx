// src/app/hr-payroll/page.tsx
"use client";

import React, { useState } from "react";

export default function HrPayrollModule() {
  const [activeTab, setActiveTab] = useState("Employees");

  const tabs = ["Employees", "Attendance", "Payroll", "Loans & Advances"];

  const employeesData = [
    { id: "EMP-001", name: "Ali Khan", email: "ali@bizvibez.com", role: "Software Engineer", status: "Active", color: "bg-emerald-50 text-emerald-600 ring-1 ring-emerald-500/20" },
    { id: "EMP-002", name: "Sara Ahmed", email: "sara@bizvibez.com", role: "HR Manager", status: "On Leave", color: "bg-amber-50 text-amber-600 ring-1 ring-amber-500/20" },
    { id: "EMP-003", name: "Usman Asif", email: "usman@bizvibez.com", role: "Sales Lead", status: "Active", color: "bg-emerald-50 text-emerald-600 ring-1 ring-emerald-500/20" }
  ];

  const attendanceData = [
    { date: "2026-10-06", id: "EMP-001", name: "Ali Khan", timeIn: "09:00 AM", timeOut: "06:00 PM", status: "Present", color: "bg-blue-50 text-blue-600 ring-1 ring-blue-500/20" },
    { date: "2026-10-06", id: "EMP-002", name: "Sara Ahmed", timeIn: "---", timeOut: "---", status: "Absent", color: "bg-rose-50 text-rose-600 ring-1 ring-rose-500/20" },
    { date: "2026-10-06", id: "EMP-003", name: "Usman Asif", timeIn: "09:15 AM", timeOut: "Pending", status: "In Office", color: "bg-emerald-50 text-emerald-600 ring-1 ring-emerald-500/20" }
  ];

  const salaryData = [
    { id: "EMP-001", name: "Ali Khan", basic: "$2,000", allowances: "$500", deductions: "$600", net: "$1,900", status: "Pending", color: "bg-amber-50 text-amber-600 ring-1 ring-amber-500/20" },
    { id: "EMP-002", name: "Sara Ahmed", basic: "$2,500", allowances: "$600", deductions: "$0", net: "$3,100", status: "Processed", color: "bg-emerald-50 text-emerald-600 ring-1 ring-emerald-500/20" }
  ];

  const financialRecords = [
    { id: "EMP-001", name: "Ali Khan", advanceAmt: "$500", advanceRec: "$100", loanAmt: "$5,000", installment: "$500", outstanding: "$3,000" },
    { id: "EMP-003", name: "Usman Asif", advanceAmt: "$0", advanceRec: "$0", loanAmt: "$2,000", installment: "$200", outstanding: "$1,800" }
  ];

  return (
    <div className="fixed md:relative inset-0 md:inset-auto z-40 md:z-0 overflow-y-auto md:overflow-visible min-h-screen bg-[#F8FAFC] p-6 md:p-10 font-sans w-full">
      
      {/* Abstract Background Enhancements */}
      <div className="fixed top-0 left-0 w-full h-96 bg-gradient-to-b from-indigo-50/50 to-transparent -z-10 pointer-events-none" />
      <div className="fixed -top-40 -right-40 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* ENHANCED HEADER */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
              <div className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-600"></span>
              </div>
              <span className="text-[10px] font-black tracking-[0.2em] text-slate-700 uppercase">
                Human Resources Hub
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-800">
              HR & Payroll Engine
            </h1>
            <p className="text-sm md:text-base text-slate-500 max-w-2xl leading-relaxed font-medium">
              Comprehensive management for employee profiles, attendance logs, monthly salary processing, and financial ledgers.
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
                    ? "text-indigo-600 shadow-sm"
                    : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                {activeTab === tab && (
                  <div className="absolute inset-0 bg-indigo-50/80 border border-indigo-100/50 rounded-xl -z-10 transition-all duration-300" />
                )}
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* ENHANCED CONTENT SECTIONS */}
        <div className="relative group">
          {/* Decorative glowing border effect */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-[2rem] blur opacity-0 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
          
          {activeTab === "Employees" && (
            <section className="relative bg-white rounded-3xl border border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden flex flex-col">
              <div className="p-8 border-b border-slate-100/80 bg-gradient-to-r from-white to-slate-50/50 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Employee Master Profile</h2>
                  <p className="text-sm text-slate-500 mt-1 font-medium">Manage personal information and duty status.</p>
                </div>
                <button className="px-5 py-2.5 bg-indigo-600 text-white text-sm font-bold rounded-xl shadow-lg shadow-indigo-600/20 hover:bg-indigo-700 hover:-translate-y-0.5 transition-all">
                  + Register Employee
                </button>
              </div>
              <div className="overflow-x-auto p-4">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr>
                      <th className="px-4 pb-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Employee ID</th>
                      <th className="px-4 pb-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Information</th>
                      <th className="px-4 pb-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Role</th>
                      <th className="px-4 pb-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Status</th>
                      <th className="px-4 pb-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="space-y-2">
                    {employeesData.map((emp) => (
                      <tr key={emp.id} className="group/row hover:bg-slate-50/80 transition-colors border-b border-slate-50 last:border-0">
                        <td className="p-4 text-sm font-bold text-slate-900 font-mono">{emp.id}</td>
                        <td className="p-4">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center text-indigo-700 font-bold shadow-inner border border-indigo-200/50">
                              {emp.name.charAt(0)}
                            </div>
                            <div>
                              <div className="text-sm font-bold text-slate-900 group-hover/row:text-indigo-600 transition-colors">{emp.name}</div>
                              <div className="text-xs text-slate-500 font-medium">{emp.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 text-sm font-semibold text-slate-700">{emp.role}</td>
                        <td className="p-4">
                          <span className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider ${emp.color}`}>
                            {emp.status}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <button className="px-4 py-2 text-indigo-600 text-xs font-bold rounded-lg hover:bg-indigo-50 transition-colors opacity-0 group-hover/row:opacity-100">View Profile →</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {activeTab === "Attendance" && (
            <section className="relative bg-white rounded-3xl border border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden flex flex-col">
              <div className="p-8 border-b border-slate-100/80 bg-gradient-to-r from-white to-slate-50/50 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Attendance History & Reports</h2>
                  <p className="text-sm text-slate-500 mt-1 font-medium">Monitor daily check ins and check outs.</p>
                </div>
                <div className="flex gap-3">
                  <button className="px-5 py-2.5 bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-bold rounded-xl shadow-sm hover:bg-emerald-100 transition-colors">
                    Manual Punch In
                  </button>
                  <button className="px-5 py-2.5 bg-rose-50 border border-rose-200 text-rose-700 text-sm font-bold rounded-xl shadow-sm hover:bg-rose-100 transition-colors">
                    Manual Punch Out
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto p-4">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr>
                      <th className="px-4 pb-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Date</th>
                      <th className="px-4 pb-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Employee</th>
                      <th className="px-4 pb-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Time In</th>
                      <th className="px-4 pb-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Time Out</th>
                      <th className="px-4 pb-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Status</th>
                    </tr>
                  </thead>
                  <tbody className="space-y-2">
                    {attendanceData.map((record, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/80 transition-colors border-b border-slate-50 last:border-0 group/row">
                        <td className="p-4 text-sm font-semibold text-slate-500">{record.date}</td>
                        <td className="p-4">
                          <div className="text-sm font-bold text-slate-900 group-hover/row:text-indigo-600 transition-colors">{record.name}</div>
                          <div className="text-[10px] text-slate-400 font-mono mt-0.5">{record.id}</div>
                        </td>
                        <td className="p-4 text-sm font-bold text-slate-700">{record.timeIn}</td>
                        <td className="p-4 text-sm font-bold text-slate-700">{record.timeOut}</td>
                        <td className="p-4">
                          <span className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider ${record.color}`}>
                            {record.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {activeTab === "Payroll" && (
            <section className="relative bg-white rounded-3xl border border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden flex flex-col">
              <div className="p-8 border-b border-slate-100/80 bg-gradient-to-r from-white to-slate-50/50 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Monthly Salary Sheet</h2>
                  <p className="text-sm text-slate-500 mt-1 font-medium">Process automated payroll and salary records.</p>
                </div>
                <button className="px-5 py-2.5 bg-indigo-600 text-white text-sm font-bold rounded-xl shadow-lg shadow-indigo-600/20 hover:bg-indigo-700 hover:-translate-y-0.5 transition-all">
                  Run Monthly Payroll
                </button>
              </div>
              <div className="overflow-x-auto p-4">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr>
                      <th className="px-4 pb-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Employee</th>
                      <th className="px-4 pb-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Basic Salary</th>
                      <th className="px-4 pb-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Allowances</th>
                      <th className="px-4 pb-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Deductions</th>
                      <th className="px-4 pb-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Net Salary</th>
                      <th className="px-4 pb-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="space-y-2">
                    {salaryData.map((salary, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/80 transition-colors border-b border-slate-50 last:border-0 group/row">
                        <td className="p-4">
                          <div className="text-sm font-bold text-slate-900 group-hover/row:text-indigo-600 transition-colors">{salary.name}</div>
                          <div className="text-[10px] text-slate-400 font-mono mt-0.5">{salary.id}</div>
                        </td>
                        <td className="p-4 text-sm font-semibold text-slate-600">{salary.basic}</td>
                        <td className="p-4 text-sm font-bold text-emerald-600 bg-emerald-50/30 rounded-lg">+{salary.allowances}</td>
                        <td className="p-4 text-sm font-bold text-rose-600 bg-rose-50/30 rounded-lg">-{salary.deductions}</td>
                        <td className="p-4 text-base font-black text-slate-900">{salary.net}</td>
                        <td className="p-4 text-right">
                          <span className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider inline-block ${salary.color}`}>
                            {salary.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {activeTab === "Loans & Advances" && (
            <section className="relative bg-white rounded-3xl border border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden flex flex-col">
              <div className="p-8 border-b border-slate-100/80 bg-gradient-to-r from-white to-slate-50/50 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Advances & Loans Management</h2>
                  <p className="text-sm text-slate-500 mt-1 font-medium">Track granted amounts, adjustments, and outstanding balances.</p>
                </div>
                <div className="flex gap-3">
                  <button className="px-5 py-2.5 bg-white border border-slate-200 text-slate-700 text-sm font-bold rounded-xl shadow-sm hover:bg-slate-50 transition-colors">
                    Grant Advance
                  </button>
                  <button className="px-5 py-2.5 bg-indigo-600 text-white text-sm font-bold rounded-xl shadow-lg shadow-indigo-600/20 hover:bg-indigo-700 hover:-translate-y-0.5 transition-all">
                    Approve Loan
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto p-4">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr>
                      <th className="px-4 pb-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Employee</th>
                      <th className="px-4 pb-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Advance Taken</th>
                      <th className="px-4 pb-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Total Loan</th>
                      <th className="px-4 pb-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Inst. Recovery</th>
                      <th className="px-4 pb-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Outstanding</th>
                      <th className="px-4 pb-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="space-y-2">
                    {financialRecords.map((record, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/80 transition-colors border-b border-slate-50 last:border-0 group/row">
                        <td className="p-4">
                          <div className="text-sm font-bold text-slate-900 group-hover/row:text-indigo-600 transition-colors">{record.name}</div>
                          <div className="text-[10px] text-slate-400 font-mono mt-0.5">{record.id}</div>
                        </td>
                        <td className="p-4">
                          <div className="text-sm font-bold text-slate-700">{record.advanceAmt}</div>
                          <div className="text-xs font-semibold text-amber-600 bg-amber-50 inline-block px-2 py-0.5 rounded mt-1">Adj: {record.advanceRec}</div>
                        </td>
                        <td className="p-4 text-sm font-bold text-slate-900">{record.loanAmt}</td>
                        <td className="p-4 text-sm font-semibold text-emerald-600">{record.installment} / mo</td>
                        <td className="p-4 text-base font-black text-rose-600">{record.outstanding}</td>
                        <td className="p-4 text-right">
                          <button className="px-4 py-2 text-indigo-600 text-xs font-bold rounded-lg hover:bg-indigo-50 transition-colors opacity-0 group-hover/row:opacity-100">Edit Record →</button>
                        </td>
                      </tr>
                    ))}
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