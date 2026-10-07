// src/app/gate-pass/page.tsx
"use client";

import React, { useState, useEffect } from "react";

export default function GatePassModule() {
  const [activeTab, setActiveTab] = useState("Issue Pass");
  const [reportFilter, setReportFilter] = useState("All");
  
  const tabs = ["Issue Pass", "History & Reports"];
  const filterOptions = ["All", "Official Use", "Personal Use"];

  const [selectedType, setSelectedType] = useState("Official Use");
  const [employeeName, setEmployeeName] = useState("Ali Khan");
  const [reason, setReason] = useState("");
  const [outTime, setOutTime] = useState("10:30 AM");

  // Employees List State
  const [employees, setEmployees] = useState(["Ali Khan", "Sara Ahmed", "Usman Asif", "Ajwa Arshad"]);
  const [newEmployeeName, setNewEmployeeName] = useState("");

  const [gatePassRecords, setGatePassRecords] = useState([
    { id: "GP-1001", name: "Ali Khan", type: "Official Use", reason: "Client meeting at Gulberg HQ", outTime: "10:30 AM", inTime: "01:45 PM", status: "Closed", typeColor: "bg-indigo-50 text-indigo-700 ring-1 ring-indigo-500/20", statusColor: "bg-slate-100 text-slate-600" },
    { id: "GP-1002", name: "Sara Ahmed", type: "Personal Use", reason: "Bank visit for personal work", outTime: "11:15 AM", inTime: "Pending", status: "Active", typeColor: "bg-rose-50 text-rose-700 ring-1 ring-rose-500/20", statusColor: "bg-emerald-50 text-emerald-600 ring-1 ring-emerald-500/30" },
    { id: "GP-1003", name: "Usman Asif", type: "Official Use", reason: "Site inspection and hardware delivery", outTime: "02:00 PM", inTime: "04:30 PM", status: "Closed", typeColor: "bg-indigo-50 text-indigo-700 ring-1 ring-indigo-500/20", statusColor: "bg-slate-100 text-slate-600" }
  ]);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<any>(null);

  useEffect(() => {
    const savedPasses = localStorage.getItem("covico_gate_passes");
    if (savedPasses) {
      try {
        const parsed = JSON.parse(savedPasses);
        if (parsed.length > 0) {
          setGatePassRecords(parsed);
        }
      } catch (e) {}
    }

    const savedEmps = localStorage.getItem("covico_employees_list");
    if (savedEmps) {
      try {
        const parsedEmps = JSON.parse(savedEmps);
        if (parsedEmps.length > 0) {
          setEmployees(parsedEmps);
        }
      } catch (e) {}
    }
  }, []);

  const savePasses = (records: any[]) => {
    setGatePassRecords(records);
    localStorage.setItem("covico_gate_passes", JSON.stringify(records));
  };

  const handleAddEmployee = () => {
    if (newEmployeeName.trim() && !employees.includes(newEmployeeName.trim())) {
      const updatedEmps = [...employees, newEmployeeName.trim()];
      setEmployees(updatedEmps);
      setEmployeeName(newEmployeeName.trim());
      localStorage.setItem("covico_employees_list", JSON.stringify(updatedEmps));
      setNewEmployeeName("");
    } else {
      alert("Please enter a valid or unique employee name.");
    }
  };

  const handleIssuePass = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reason.trim()) {
      alert("Please specify the reason for leave.");
      return;
    }

    const newPass = {
      id: `GP-${Math.floor(1000 + Math.random() * 9000)}`,
      name: employeeName,
      type: selectedType,
      reason: reason,
      outTime: outTime || "09:00 AM",
      inTime: selectedType === "Official Use" ? "05:00 PM" : "Pending",
      status: selectedType === "Official Use" ? "Closed" : "Active",
      typeColor: selectedType === "Official Use" 
        ? "bg-indigo-50 text-indigo-700 ring-1 ring-indigo-500/20" 
        : "bg-rose-50 text-rose-700 ring-1 ring-rose-500/20",
      statusColor: selectedType === "Official Use" 
        ? "bg-slate-100 text-slate-600" 
        : "bg-emerald-50 text-emerald-600 ring-1 ring-emerald-500/30"
    };

    const updated = [newPass, ...gatePassRecords];
    savePasses(updated);
    setReason("");
    setActiveTab("History & Reports");
  };

  const handleDelete = (id: string) => {
    const filtered = gatePassRecords.filter(r => r.id !== id);
    savePasses(filtered);
  };

  const openEditModal = (record: any) => {
    setEditingRecord({ ...record });
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingRecord) return;

    const typeColor = editingRecord.type === "Official Use" 
      ? "bg-indigo-50 text-indigo-700 ring-1 ring-indigo-500/20" 
      : "bg-rose-50 text-rose-700 ring-1 ring-rose-500/20";
      
    const statusColor = editingRecord.status === "Closed" 
      ? "bg-slate-100 text-slate-600" 
      : "bg-emerald-50 text-emerald-600 ring-1 ring-emerald-500/30";

    const updatedList = gatePassRecords.map(r => {
      if (r.id === editingRecord.id) {
        return { ...editingRecord, typeColor, statusColor };
      }
      return r;
    });

    savePasses(updatedList);
    setIsEditModalOpen(false);
    setEditingRecord(null);
  };

  const filteredRecords = reportFilter === "All" 
    ? gatePassRecords 
    : gatePassRecords.filter(record => record.type === reportFilter);

  return (
    <div className="fixed md:relative inset-0 md:inset-auto z-40 md:z-0 overflow-y-auto md:overflow-visible min-h-screen bg-[#F8FAFC] p-6 md:p-10 font-sans w-full">
      
      <div className="fixed top-0 left-0 w-full h-96 bg-gradient-to-b from-blue-50/50 to-transparent -z-10 pointer-events-none" />
      <div className="fixed -top-40 -right-40 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl -z-10 pointer-events-none" />

      {isEditModalOpen && editingRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl border border-slate-100 animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-black text-slate-900">Edit Gate Pass ({editingRecord.id})</h3>
              <button onClick={() => setIsEditModalOpen(false)} className="text-slate-400 hover:text-slate-600 font-bold text-lg cursor-pointer">✕</button>
            </div>

            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Employee Name</label>
                <input 
                  type="text" 
                  value={editingRecord.name} 
                  onChange={(e) => setEditingRecord({ ...editingRecord, name: e.target.value })} 
                  className="w-full p-3 rounded-xl border border-slate-200 text-sm font-semibold text-slate-900 outline-none focus:border-blue-500 bg-slate-50"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Pass Type</label>
                <select 
                  value={editingRecord.type} 
                  onChange={(e) => setEditingRecord({ ...editingRecord, type: e.target.value })} 
                  className="w-full p-3 rounded-xl border border-slate-200 text-sm font-semibold text-slate-900 outline-none focus:border-blue-500 bg-slate-50 cursor-pointer"
                >
                  <option value="Official Use">Official Use</option>
                  <option value="Personal Use">Personal Use</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Reason</label>
                <input 
                  type="text" 
                  value={editingRecord.reason} 
                  onChange={(e) => setEditingRecord({ ...editingRecord, reason: e.target.value })} 
                  className="w-full p-3 rounded-xl border border-slate-200 text-sm font-semibold text-slate-900 outline-none focus:border-blue-500 bg-slate-50"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Time Out</label>
                  <input 
                    type="text" 
                    value={editingRecord.outTime} 
                    onChange={(e) => setEditingRecord({ ...editingRecord, outTime: e.target.value })} 
                    className="w-full p-3 rounded-xl border border-slate-200 text-sm font-semibold text-slate-900 outline-none focus:border-blue-500 bg-slate-50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Time In</label>
                  <input 
                    type="text" 
                    value={editingRecord.inTime} 
                    onChange={(e) => setEditingRecord({ ...editingRecord, inTime: e.target.value })} 
                    className="w-full p-3 rounded-xl border border-slate-200 text-sm font-semibold text-slate-900 outline-none focus:border-blue-500 bg-slate-50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Status</label>
                <select 
                  value={editingRecord.status} 
                  onChange={(e) => setEditingRecord({ ...editingRecord, status: e.target.value })} 
                  className="w-full p-3 rounded-xl border border-slate-200 text-sm font-semibold text-slate-900 outline-none focus:border-blue-500 bg-slate-50 cursor-pointer"
                >
                  <option value="Active">Active</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>

              <div className="pt-4 flex gap-3">
                <button 
                  type="button" 
                  onClick={() => setIsEditModalOpen(false)} 
                  className="flex-1 py-3 rounded-xl bg-slate-100 text-slate-700 font-bold text-sm hover:bg-slate-200 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="flex-1 py-3 rounded-xl bg-blue-600 text-white font-bold text-sm shadow-md hover:bg-blue-700 transition-colors cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto space-y-10">
        
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
              <div className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-600"></span>
              </div>
              <span className="text-[10px] font-black tracking-[0.2em] text-slate-700 uppercase">
                COVICO Security Hub
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-blue-950 to-slate-800">
              Employee Gate Pass
            </h1>
            <p className="text-sm md:text-base text-slate-500 max-w-2xl leading-relaxed font-medium">
              Digital entry and exit monitoring for COVICO Engineering staff. Strict distinction between official duties and personal tasks.
            </p>
          </div>
        </header>

        <div className="relative w-full overflow-x-auto pb-4 hide-scrollbar">
          <div className="inline-flex p-1.5 space-x-1 bg-white/80 backdrop-blur-xl border border-slate-200/80 rounded-2xl shadow-sm">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 cursor-pointer ${
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

        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-[2rem] blur opacity-0 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
          
          {activeTab === "Issue Pass" && (
            <section className="relative bg-white rounded-3xl border border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
              <div className="p-8 border-b border-slate-100/80 bg-gradient-to-r from-white to-slate-50/50">
                <h2 className="text-xl font-bold text-slate-900">Issue New Gate Pass</h2>
                <p className="text-sm text-slate-500 mt-1 font-medium">Complete the form below. Selecting the pass type is mandatory.</p>
              </div>
              
              <form onSubmit={handleIssuePass} className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-10">
                
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-bold text-slate-900 uppercase tracking-wider">Gate Pass Type</label>
                    <span className="text-[10px] font-bold px-2 py-1 bg-rose-50 text-rose-600 rounded uppercase">Mandatory</span>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button 
                      type="button"
                      onClick={() => setSelectedType("Official Use")}
                      className={`p-6 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                        selectedType === "Official Use" 
                        ? "border-indigo-600 bg-indigo-50/50 shadow-md shadow-indigo-600/10" 
                        : "border-slate-100 bg-white hover:border-slate-200"
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 ${selectedType === "Official Use" ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-400"}`}>
                        💼
                      </div>
                      <h3 className={`text-base font-bold ${selectedType === "Official Use" ? "text-indigo-900" : "text-slate-700"}`}>Official Use</h3>
                      <p className="text-xs text-slate-500 mt-1">Company meetings, site visits, or client deliveries.</p>
                    </button>

                    <button 
                      type="button"
                      onClick={() => setSelectedType("Personal Use")}
                      className={`p-6 rounded-2xl border-2 text-left transition-all cursor-pointer ${
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

                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Select Employee</label>
                    <select 
                      value={employeeName}
                      onChange={(e) => setEmployeeName(e.target.value)}
                      className="w-full p-4 rounded-xl border border-slate-200 bg-slate-50 text-sm font-semibold text-slate-700 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all cursor-pointer"
                    >
                      {employees.map((emp, idx) => (
                        <option key={idx} value={emp}>EMP-00{idx + 1} - {emp}</option>
                      ))}
                    </select>

                    <div className="flex gap-2 pt-2">
                      <input 
                        type="text" 
                        value={newEmployeeName}
                        onChange={(e) => setNewEmployeeName(e.target.value)}
                        placeholder="Add new employee name..."
                        className="flex-1 p-3 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-800 outline-none focus:border-blue-500"
                      />
                      <button 
                        type="button"
                        onClick={handleAddEmployee}
                        className="px-4 py-3 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-blue-600 transition-colors cursor-pointer"
                      >
                        + Add Staff
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Reason for Leave</label>
                    <textarea 
                      rows={3} 
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      className="w-full p-4 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-medium"
                      placeholder="Specify the exact location or reason..."
                      required
                    ></textarea>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Departure Time</label>
                    <input 
                      type="text"
                      value={outTime}
                      onChange={(e) => setOutTime(e.target.value)}
                      className="w-full p-4 rounded-xl border border-slate-200 bg-slate-50 text-sm font-bold text-slate-800 outline-none focus:border-blue-500"
                    />
                  </div>

                  <button type="submit" className="w-full py-4 bg-blue-600 text-white text-sm font-black uppercase tracking-wider rounded-xl shadow-lg shadow-blue-600/20 hover:bg-blue-700 hover:-translate-y-0.5 transition-all cursor-pointer">
                    Generate {selectedType} Pass
                  </button>
                </div>

              </form>
            </section>
          )}

          {activeTab === "History & Reports" && (
            <section className="relative bg-white rounded-3xl border border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden flex flex-col">
              <div className="p-8 border-b border-slate-100/80 bg-gradient-to-r from-white to-slate-50/50 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Pass History and Reports</h2>
                  <p className="text-sm text-slate-500 mt-1 font-medium">Filter, edit, or delete exit records based on pass type.</p>
                </div>
                
                <div className="flex bg-slate-100 p-1 rounded-xl">
                  {filterOptions.map(option => (
                    <button
                      key={option}
                      onClick={() => setReportFilter(option)}
                      className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
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
                <table className="w-full text-left border-collapse whitespace-nowrap">
                  <thead>
                    <tr className="border-b border-slate-100">
                      <th className="px-4 pb-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Pass ID</th>
                      <th className="px-4 pb-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Employee</th>
                      <th className="px-4 pb-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Pass Type</th>
                      <th className="px-4 pb-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Time Out</th>
                      <th className="px-4 pb-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Time In</th>
                      <th className="px-4 pb-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Status</th>
                      <th className="px-4 pb-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {filteredRecords.map((record) => (
                      <tr key={record.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="p-4 text-sm font-bold text-slate-900 font-mono">{record.id}</td>
                        <td className="p-4">
                          <div className="text-sm font-bold text-slate-900">{record.name}</div>
                          <div className="text-[10px] text-slate-500 mt-0.5 truncate max-w-[180px]">{record.reason}</div>
                        </td>
                        <td className="p-4">
                          <span className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider inline-flex items-center gap-1.5 ${record.typeColor}`}>
                            {record.type}
                          </span>
                        </td>
                        <td className="p-4 text-sm font-bold text-slate-700">{record.outTime}</td>
                        <td className="p-4 text-sm font-bold text-slate-700">{record.inTime}</td>
                        <td className="p-4">
                          <span className={`px-3 py-1.5 rounded-md text-[10px] font-black uppercase tracking-wider inline-block ${record.statusColor}`}>
                            {record.status}
                          </span>
                        </td>
                        <td className="p-4 text-right space-x-3">
                          <button 
                            onClick={() => openEditModal(record)}
                            className="text-blue-600 hover:text-blue-800 text-xs font-bold cursor-pointer"
                          >
                            Edit
                          </button>
                          <button 
                            onClick={() => handleDelete(record.id)}
                            className="text-rose-600 hover:text-rose-800 text-xs font-bold cursor-pointer"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                    {filteredRecords.length === 0 && (
                      <tr>
                        <td colSpan={7} className="p-8 text-center text-sm font-bold text-slate-400">
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