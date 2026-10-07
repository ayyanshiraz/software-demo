// src/app/hr-payroll/page.tsx
"use client";

import React, { useState } from "react";

export default function HrPayrollModule() {
  const [activeTab, setActiveTab] = useState("Employees");

  const tabs = ["Employees", "Attendance", "Payroll", "Loans & Advances"];

  const initialEmployees = [
    { id: "EMP-001", name: "Ali Khan", email: "ali@bizvibez.com", role: "Software Engineer", status: "Active", color: "bg-emerald-50 text-emerald-600 ring-1 ring-emerald-500/20" },
    { id: "EMP-002", name: "Sara Ahmed", email: "sara@bizvibez.com", role: "HR Manager", status: "On Leave", color: "bg-amber-50 text-amber-600 ring-1 ring-amber-500/20" },
    { id: "EMP-003", name: "Usman Asif", email: "usman@bizvibez.com", role: "Sales Lead", status: "Active", color: "bg-emerald-50 text-emerald-600 ring-1 ring-emerald-500/20" }
  ];

  const initialAttendance = [
    { date: "2026-10-06", id: "EMP-001", name: "Ali Khan", timeIn: "09:00 AM", timeOut: "06:00 PM", status: "Present", color: "bg-blue-50 text-blue-600 ring-1 ring-blue-500/20" },
    { date: "2026-10-06", id: "EMP-002", name: "Sara Ahmed", timeIn: "---", timeOut: "---", status: "Absent", color: "bg-rose-50 text-rose-600 ring-1 ring-rose-500/20" },
    { date: "2026-10-06", id: "EMP-003", name: "Usman Asif", timeIn: "09:15 AM", timeOut: "Pending", status: "In Office", color: "bg-emerald-50 text-emerald-600 ring-1 ring-emerald-500/20" }
  ];

  const initialSalary = [
    { id: "EMP-001", name: "Ali Khan", basic: "$2,000", allowances: "$500", deductions: "$600", net: "$1,900", status: "Pending", color: "bg-amber-50 text-amber-600 ring-1 ring-amber-500/20" },
    { id: "EMP-002", name: "Sara Ahmed", basic: "$2,500", allowances: "$600", deductions: "$0", net: "$3,100", status: "Processed", color: "bg-emerald-50 text-emerald-600 ring-1 ring-emerald-500/20" }
  ];

  const initialFinancial = [
    { id: "EMP-001", name: "Ali Khan", advanceAmt: "$500", advanceRec: "$100", loanAmt: "$5,000", installment: "$500", outstanding: "$3,000" },
    { id: "EMP-003", name: "Usman Asif", advanceAmt: "$0", advanceRec: "$0", loanAmt: "$2,000", installment: "$200", outstanding: "$1,800" }
  ];

  const [employeesData, setEmployeesData] = useState(initialEmployees);
  const [attendanceData, setAttendanceData] = useState(initialAttendance);
  const [salaryData, setSalaryData] = useState(initialSalary);
  const [financialRecords, setFinancialRecords] = useState(initialFinancial);

  // Modal State
  const [modalMode, setModalMode] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  // Form State
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    role: "",
    status: "Active",
    date: "",
    timeIn: "",
    timeOut: "",
    basic: "",
    allowances: "",
    deductions: "",
    net: "",
    advanceAmt: "",
    advanceRec: "",
    loanAmt: "",
    installment: "",
    outstanding: ""
  });

  const handleOpenModal = (mode: string, item: any = null) => {
    setModalMode(mode);
    setSelectedItem(item);
    if (item) {
      setFormData({ ...formData, ...item });
    } else {
      setFormData({
        id: "",
        name: "",
        email: "",
        role: "",
        status: "Active",
        date: "",
        timeIn: "",
        timeOut: "",
        basic: "",
        allowances: "",
        deductions: "",
        net: "",
        advanceAmt: "",
        advanceRec: "",
        loanAmt: "",
        installment: "",
        outstanding: ""
      });
    }
  };

  const handleCloseModal = () => {
    setModalMode(null);
    setSelectedItem(null);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (modalMode === "add-emp") {
      const color = formData.status === "Active" ? "bg-emerald-50 text-emerald-600 ring-1 ring-emerald-500/20" : "bg-amber-50 text-amber-600 ring-1 ring-amber-500/20";
      setEmployeesData([...employeesData, { ...formData, color }]);
    } else if (modalMode === "edit-emp") {
      setEmployeesData(employeesData.map(emp => emp.id === selectedItem.id ? { ...formData, color: emp.color } : emp));
    } else if (modalMode === "add-att") {
      const color = formData.status === "Present" || formData.status === "In Office" ? "bg-emerald-50 text-emerald-600 ring-1 ring-emerald-500/20" : "bg-rose-50 text-rose-600 ring-1 ring-rose-500/20";
      setAttendanceData([...attendanceData, { ...formData, color }]);
    } else if (modalMode === "edit-att") {
      setAttendanceData(attendanceData.map((att, idx) => idx === selectedItem.idx ? { ...formData, color: att.color } : att));
    } else if (modalMode === "add-sal") {
      const color = formData.status === "Processed" ? "bg-emerald-50 text-emerald-600 ring-1 ring-emerald-500/20" : "bg-amber-50 text-amber-600 ring-1 ring-amber-500/20";
      setSalaryData([...salaryData, { ...formData, color }]);
    } else if (modalMode === "edit-sal") {
      setSalaryData(salaryData.map(sal => sal.id === selectedItem.id ? { ...formData, color: sal.color } : sal));
    } else if (modalMode === "add-loan") {
      setFinancialRecords([...financialRecords, { ...formData }]);
    } else if (modalMode === "edit-loan") {
      setFinancialRecords(financialRecords.map(rec => rec.id === selectedItem.id ? { ...formData } : rec));
    }
    handleCloseModal();
  };

  const handleDeleteEmployee = (id: string) => {
    setEmployeesData(employeesData.filter(emp => emp.id !== id));
  };

  const handleDeleteAttendance = (idx: number) => {
    setAttendanceData(attendanceData.filter((_, i) => i !== idx));
  };

  const handleDeleteSalary = (id: string) => {
    setSalaryData(salaryData.filter(sal => sal.id !== id));
  };

  const handleDeleteLoan = (id: string) => {
    setFinancialRecords(financialRecords.filter(rec => rec.id !== id));
  };

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
          <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-[2rem] blur opacity-0 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
          
          {activeTab === "Employees" && (
            <section className="relative bg-white rounded-3xl border border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden flex flex-col">
              <div className="p-8 border-b border-slate-100/80 bg-gradient-to-r from-white to-slate-50/50 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Employee Master Profile</h2>
                  <p className="text-sm text-slate-500 mt-1 font-medium">Manage personal information and duty status.</p>
                </div>
                <button 
                  onClick={() => handleOpenModal("add-emp")}
                  className="px-5 py-2.5 bg-indigo-600 text-white text-sm font-bold rounded-xl shadow-lg shadow-indigo-600/20 hover:bg-indigo-700 hover:-translate-y-0.5 transition-all"
                >
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
                        <td className="p-4 text-right space-x-2">
                          <button 
                            onClick={() => handleOpenModal("edit-emp", emp)}
                            className="px-3 py-1.5 text-indigo-600 bg-indigo-50 text-xs font-bold rounded-lg hover:bg-indigo-100 transition-colors"
                          >
                            Edit
                          </button>
                          <button 
                            onClick={() => handleDeleteEmployee(emp.id)}
                            className="px-3 py-1.5 text-rose-600 bg-rose-50 text-xs font-bold rounded-lg hover:bg-rose-100 transition-colors"
                          >
                            Delete
                          </button>
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
                  <button 
                    onClick={() => handleOpenModal("add-att")}
                    className="px-5 py-2.5 bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-bold rounded-xl shadow-sm hover:bg-emerald-100 transition-colors"
                  >
                    + Add Attendance
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
                      <th className="px-4 pb-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
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
                        <td className="p-4 text-right space-x-2">
                          <button 
                            onClick={() => handleOpenModal("edit-att", { ...record, idx })}
                            className="px-3 py-1.5 text-indigo-600 bg-indigo-50 text-xs font-bold rounded-lg hover:bg-indigo-100 transition-colors"
                          >
                            Edit
                          </button>
                          <button 
                            onClick={() => handleDeleteAttendance(idx)}
                            className="px-3 py-1.5 text-rose-600 bg-rose-50 text-xs font-bold rounded-lg hover:bg-rose-100 transition-colors"
                          >
                            Delete
                          </button>
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
                <button 
                  onClick={() => handleOpenModal("add-sal")}
                  className="px-5 py-2.5 bg-indigo-600 text-white text-sm font-bold rounded-xl shadow-lg shadow-indigo-600/20 hover:bg-indigo-700 hover:-translate-y-0.5 transition-all"
                >
                  + Run Monthly Payroll
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
                      <th className="px-4 pb-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
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
                        <td className="p-4 text-right space-x-2">
                          <button 
                            onClick={() => handleOpenModal("edit-sal", salary)}
                            className="px-3 py-1.5 text-indigo-600 bg-indigo-50 text-xs font-bold rounded-lg hover:bg-indigo-100 transition-colors"
                          >
                            Edit
                          </button>
                          <button 
                            onClick={() => handleDeleteSalary(salary.id)}
                            className="px-3 py-1.5 text-rose-600 bg-rose-50 text-xs font-bold rounded-lg hover:bg-rose-100 transition-colors"
                          >
                            Delete
                          </button>
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
                  <button 
                    onClick={() => handleOpenModal("add-loan")}
                    className="px-5 py-2.5 bg-indigo-600 text-white text-sm font-bold rounded-xl shadow-lg shadow-indigo-600/20 hover:bg-indigo-700 hover:-translate-y-0.5 transition-all"
                  >
                    + Grant Loan / Advance
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
                        <td className="p-4 text-right space-x-2">
                          <button 
                            onClick={() => handleOpenModal("edit-loan", record)}
                            className="px-3 py-1.5 text-indigo-600 bg-indigo-50 text-xs font-bold rounded-lg hover:bg-indigo-100 transition-colors"
                          >
                            Edit
                          </button>
                          <button 
                            onClick={() => handleDeleteLoan(record.id)}
                            className="px-3 py-1.5 text-rose-600 bg-rose-50 text-xs font-bold rounded-lg hover:bg-rose-100 transition-colors"
                          >
                            Delete
                          </button>
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

      {/* MODAL DIALOG */}
      {modalMode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h3 className="text-lg font-bold text-slate-900">
                {modalMode.includes("add") ? "Add New Record" : "Edit Record"}
              </h3>
              <button 
                onClick={handleCloseModal}
                className="w-8 h-8 rounded-full bg-slate-200/60 hover:bg-slate-200 flex items-center justify-center text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleSave} className="p-8 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Employee ID</label>
                <input 
                  type="text" 
                  value={formData.id} 
                  onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                  placeholder="EMP-004"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Name</label>
                <input 
                  type="text" 
                  value={formData.name} 
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter employee name"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
                  required
                />
              </div>

              {modalMode.includes("emp") && (
                <>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Email</label>
                    <input 
                      type="email" 
                      value={formData.email} 
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="employee@bizvibez.com"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Role</label>
                    <input 
                      type="text" 
                      value={formData.role} 
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      placeholder="Software Engineer"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Status</label>
                    <select 
                      value={formData.status} 
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
                    >
                      <option value="Active">Active</option>
                      <option value="On Leave">On Leave</option>
                    </select>
                  </div>
                </>
              )}

              {modalMode.includes("att") && (
                <>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Date</label>
                    <input 
                      type="date" 
                      value={formData.date} 
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Time In</label>
                      <input 
                        type="text" 
                        value={formData.timeIn} 
                        onChange={(e) => setFormData({ ...formData, timeIn: e.target.value })}
                        placeholder="09:00 AM"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Time Out</label>
                      <input 
                        type="text" 
                        value={formData.timeOut} 
                        onChange={(e) => setFormData({ ...formData, timeOut: e.target.value })}
                        placeholder="06:00 PM"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Status</label>
                    <select 
                      value={formData.status} 
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
                    >
                      <option value="Present">Present</option>
                      <option value="Absent">Absent</option>
                      <option value="In Office">In Office</option>
                    </select>
                  </div>
                </>
              )}

              {modalMode.includes("sal") && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Basic Salary</label>
                      <input 
                        type="text" 
                        value={formData.basic} 
                        onChange={(e) => setFormData({ ...formData, basic: e.target.value })}
                        placeholder="$2,000"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Allowances</label>
                      <input 
                        type="text" 
                        value={formData.allowances} 
                        onChange={(e) => setFormData({ ...formData, allowances: e.target.value })}
                        placeholder="$500"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Deductions</label>
                      <input 
                        type="text" 
                        value={formData.deductions} 
                        onChange={(e) => setFormData({ ...formData, deductions: e.target.value })}
                        placeholder="$100"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Net Salary</label>
                      <input 
                        type="text" 
                        value={formData.net} 
                        onChange={(e) => setFormData({ ...formData, net: e.target.value })}
                        placeholder="$2,400"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Status</label>
                    <select 
                      value={formData.status} 
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processed">Processed</option>
                    </select>
                  </div>
                </>
              )}

              {modalMode.includes("loan") && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Advance Amt</label>
                      <input 
                        type="text" 
                        value={formData.advanceAmt} 
                        onChange={(e) => setFormData({ ...formData, advanceAmt: e.target.value })}
                        placeholder="$0"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Advance Rec</label>
                      <input 
                        type="text" 
                        value={formData.advanceRec} 
                        onChange={(e) => setFormData({ ...formData, advanceRec: e.target.value })}
                        placeholder="$0"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Total Loan</label>
                      <input 
                        type="text" 
                        value={formData.loanAmt} 
                        onChange={(e) => setFormData({ ...formData, loanAmt: e.target.value })}
                        placeholder="$0"
                        className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Installment</label>
                      <input 
                        type="text" 
                        value={formData.installment} 
                        onChange={(e) => setFormData({ ...formData, installment: e.target.value })}
                        placeholder="$0"
                        className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Outstanding</label>
                      <input 
                        type="text" 
                        value={formData.outstanding} 
                        onChange={(e) => setFormData({ ...formData, outstanding: e.target.value })}
                        placeholder="$0"
                        className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
                      />
                    </div>
                  </div>
                </>
              )}

              <div className="flex justify-end gap-3 pt-4">
                <button 
                  type="button" 
                  onClick={handleCloseModal}
                  className="px-5 py-2.5 bg-slate-100 text-slate-700 text-sm font-bold rounded-xl hover:bg-slate-200 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-5 py-2.5 bg-indigo-600 text-white text-sm font-bold rounded-xl shadow-lg shadow-indigo-600/20 hover:bg-indigo-700 transition-colors"
                >
                  Save Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}