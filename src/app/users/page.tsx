// src/app/users/page.tsx
"use client";

import React, { useState } from "react";
import { 
  Users, UserPlus, Shield, Search, Key, Mail, MoreVertical, CheckCircle2 
} from "lucide-react";

export default function UserManagementPage() {
  const [searchQuery, setSearchQuery] = useState(``);
  const [activeFilter, setActiveFilter] = useState(`All`);

  const usersList = [
    { id: `USR-001`, name: `Yasir Irshad`, email: `yasir@blackzero.org`, role: `Super Admin`, status: `Active`, lastLogin: `2 mins ago`, initials: `MH`, color: `bg-purple-100 text-purple-700 border-purple-200` },
    { id: `USR-002`, name: `Ayyan Shiraz`, email: `ayyan@blackzero.org`, role: `System Admin`, status: `Active`, lastLogin: `1 hour ago`, initials: `AS`, color: `bg-blue-100 text-blue-700 border-blue-200` },
    { id: `USR-003`, name: `Ajwa Arshad`, email: `ajwa@blackzero.org`, role: `System Admin`, status: `Active`, lastLogin: `Just now`, initials: `AA`, color: `bg-blue-100 text-blue-700 border-blue-200` },
    { id: `USR-004`, name: `Alishba Zia`, email: `alishba@blackzero.org`, role: `Manager`, status: `Active`, lastLogin: `5 hours ago`, initials: `AZ`, color: `bg-emerald-100 text-emerald-700 border-emerald-200` },
    { id: `USR-005`, name: `Usman Asif`, email: `usman@blackzero.org`, role: `Sales Agent`, status: `Invite Pending`, lastLogin: `Never`, initials: `UA`, color: `bg-amber-100 text-amber-700 border-amber-200` }
  ];

  const filters = [`All`, `Super Admin`, `System Admin`, `Manager`, `Sales Agent`];

  const filteredUsers = usersList.filter(user => 
    (activeFilter === `All` || user.role === activeFilter) &&
    (user.name.toLowerCase().includes(searchQuery.toLowerCase()) || user.email.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className={`min-h-screen bg-[#f8fafc] text-slate-800 p-4 md:p-8 w-full font-sans relative z-0 overflow-hidden`}>
      
      {/* Immersive Animated Background Mesh */}
      <div className={`fixed top-[-10%] left-[-10%] w-[50rem] h-[50rem] bg-gradient-to-br from-indigo-200/40 via-purple-100/30 to-transparent rounded-full blur-3xl -z-10 mix-blend-multiply animate-[pulse_10s_ease-in-out_infinite]`} />
      <div className={`fixed bottom-[-10%] right-[-10%] w-[60rem] h-[60rem] bg-gradient-to-tl from-emerald-100/40 via-blue-100/30 to-transparent rounded-full blur-3xl -z-10 mix-blend-multiply`} />
      
      <div className={`max-w-7xl mx-auto space-y-8`}>
        
        {/* HEADER SECTION - Glassmorphism floating pill */}
        <header className={`relative bg-white/40 backdrop-blur-2xl border border-white/80 shadow-[0_8px_32px_rgba(0,0,0,0.04)] rounded-3xl p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 overflow-hidden`}>
          <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-blue-400/10 to-transparent rounded-full blur-2xl pointer-events-none`} />
          
          <div className={`space-y-4 relative z-10`}>
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/60 backdrop-blur-md border border-white/80 shadow-sm`}>
              <Shield className={`w-4 h-4 text-indigo-600`} />
              <span className={`text-xs font-black tracking-widest text-indigo-950 uppercase`}>
                Command Center
              </span>
            </div>
            <div>
              <h1 className={`text-4xl md:text-5xl font-black tracking-tight text-slate-900 drop-shadow-sm`}>
                User Matrix
              </h1>
              <p className={`text-sm md:text-base text-slate-600 max-w-xl mt-2 font-medium`}>
                Orchestrate team access, deploy permissions, and monitor the heartbeat of your organization across the secure network.
              </p>
            </div>
          </div>

          <button className={`group relative flex items-center justify-center gap-3 rounded-2xl bg-slate-900 px-8 py-4 text-white font-bold transition-all hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(15,23,42,0.2)] overflow-hidden z-10`}>
            <div className={`absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
            <span className={`relative z-10 flex items-center gap-2`}>
              <UserPlus className={`w-5 h-5`} /> 
              <span>Deploy New User</span>
            </span>
          </button>
        </header>

        <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8`}>
          
          {/* LEFT COLUMN: STATS BENTO BOX */}
          <div className={`lg:col-span-4 flex flex-col gap-6`}>
            <div className={`grid grid-cols-2 gap-4 lg:flex lg:flex-col lg:gap-6`}>
              
              {/* Stat Card 1 */}
              <div className={`col-span-2 bg-gradient-to-br from-indigo-600 to-blue-700 rounded-3xl p-6 shadow-xl text-white relative overflow-hidden group`}>
                <div className={`absolute -right-6 -top-6 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-colors duration-500`} />
                <Users className={`w-8 h-8 text-blue-200 mb-6`} />
                <div>
                  <span className={`block text-xs font-bold text-blue-200 uppercase tracking-widest mb-1`}>Network Population</span>
                  <span className={`block text-5xl font-black tracking-tighter`}>5</span>
                </div>
              </div>

              {/* Stat Card 2 */}
              <div className={`bg-white/50 backdrop-blur-xl border border-white/80 rounded-3xl p-6 shadow-[0_8px_32px_rgba(0,0,0,0.03)] hover:bg-white/70 transition-colors`}>
                <CheckCircle2 className={`w-7 h-7 text-emerald-500 mb-4`} />
                <span className={`block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1`}>Live Nodes</span>
                <span className={`block text-3xl font-black text-slate-800`}>4</span>
              </div>

              {/* Stat Card 3 */}
              <div className={`bg-white/50 backdrop-blur-xl border border-white/80 rounded-3xl p-6 shadow-[0_8px_32px_rgba(0,0,0,0.03)] hover:bg-white/70 transition-colors`}>
                <Mail className={`w-7 h-7 text-amber-500 mb-4`} />
                <span className={`block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1`}>Pending Links</span>
                <span className={`block text-3xl font-black text-slate-800`}>1</span>
              </div>

            </div>
          </div>

          {/* RIGHT COLUMN: INTERACTIVE LIST */}
          <div className={`lg:col-span-8 flex flex-col gap-6`}>
            
            {/* Floating Filter Bar */}
            <div className={`bg-white/60 backdrop-blur-xl rounded-3xl p-3 border border-white/80 shadow-[0_8px_32px_rgba(0,0,0,0.03)] flex flex-col xl:flex-row gap-4 items-center justify-between`}>
              
              <div className={`relative w-full xl:w-80 group`}>
                <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-600 transition-colors`} />
                <input 
                  type={`text`} 
                  placeholder={`Search personnel...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full pl-11 pr-4 py-3.5 rounded-2xl border-2 border-transparent bg-white/50 text-sm font-medium focus:outline-none focus:bg-white focus:border-indigo-100 focus:shadow-[0_0_20px_rgba(79,70,229,0.1)] transition-all`}
                />
              </div>

              <div className={`flex flex-wrap items-center gap-2 w-full xl:w-auto p-1 bg-slate-100/50 rounded-2xl`}>
                {filters.map(filter => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`px-4 py-2.5 rounded-xl text-xs font-black tracking-wide transition-all duration-300 ${
                      activeFilter === filter 
                      ? `bg-white text-indigo-600 shadow-sm border border-white/80 scale-105` 
                      : `text-slate-500 hover:text-slate-900 hover:bg-slate-200/50`
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            {/* Levitating List Items instead of a boring table */}
            <div className={`space-y-4`}>
              {filteredUsers.map((user) => (
                <div 
                  key={user.id} 
                  className={`group relative bg-white/40 backdrop-blur-lg border border-white/80 rounded-3xl p-4 md:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:bg-white/80 transition-all duration-300 hover:shadow-[0_15px_35px_rgba(0,0,0,0.05)] hover:-translate-y-1 cursor-default`}
                >
                  
                  {/* Glowing left accent border hidden by default, visible on hover */}
                  <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-0 bg-indigo-500 rounded-r-full group-hover:h-12 transition-all duration-300`} />

                  <div className={`flex items-center gap-5 w-full md:w-auto`}>
                    <div className={`relative flex-shrink-0`}>
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-lg shadow-sm border-2 ${user.color}`}>
                        {user.initials}
                      </div>
                      {user.status === `Active` && (
                        <div className={`absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full animate-pulse`} />
                      )}
                    </div>
                    
                    <div className={`flex-1`}>
                      <h3 className={`text-base font-bold text-slate-900 group-hover:text-indigo-700 transition-colors`}>{user.name}</h3>
                      <p className={`text-sm font-medium text-slate-500`}>{user.email}</p>
                    </div>
                  </div>

                  <div className={`flex flex-row md:flex-row items-center gap-6 w-full md:w-auto justify-between md:justify-end bg-slate-50/50 md:bg-transparent p-3 md:p-0 rounded-2xl md:rounded-none`}>
                    
                    <div className={`flex flex-col gap-1 items-start md:items-end`}>
                      <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-100 shadow-sm`}>
                        <Key className={`w-3.5 h-3.5 text-indigo-400`} />
                        <span className={`text-xs font-bold text-slate-700`}>{user.role}</span>
                      </div>
                    </div>

                    <div className={`flex flex-col gap-1 items-end`}>
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider ${
                        user.status === `Active` 
                          ? `bg-emerald-100/50 text-emerald-700 border border-emerald-200` 
                          : `bg-amber-100/50 text-amber-700 border border-amber-200`
                      }`}>
                        {user.status}
                      </span>
                      <span className={`text-[11px] font-semibold text-slate-400 mt-1`}>
                        {user.lastLogin === `Never` ? `Awaiting Join` : `Seen: ${user.lastLogin}`}
                      </span>
                    </div>

                    <button className={`w-10 h-10 flex items-center justify-center rounded-xl text-slate-400 hover:bg-white hover:text-indigo-600 hover:shadow-sm border border-transparent hover:border-slate-200 transition-all`}>
                      <MoreVertical className={`w-5 h-5`} />
                    </button>
                  </div>

                </div>
              ))}

              {filteredUsers.length === 0 && (
                <div className={`w-full bg-white/40 backdrop-blur-lg border border-white/80 rounded-3xl p-16 flex flex-col items-center justify-center text-center shadow-sm`}>
                  <div className={`w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mb-6`}>
                    <Search className={`w-10 h-10 text-indigo-300`} />
                  </div>
                  <h3 className={`text-xl font-black text-slate-900 mb-2`}>No matches found</h3>
                  <p className={`text-slate-500 font-medium max-w-sm`}>We could not find anyone matching your current search parameters. Try adjusting your filters.</p>
                </div>
              )}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}