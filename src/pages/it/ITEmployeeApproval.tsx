import React, { useState } from 'react';
import { 
  Monitor, Users, ShieldCheck, UserCheck, 
  Settings, Key, LayoutDashboard, Search,
  Eye, Filter, MoreVertical, Building2,
  MapPin, Clock, ArrowRight, UserPlus,
  ShieldAlert, UserX, UserMinus, Network,
  CheckCircle2
} from 'lucide-react';

export function ITEmployeeApproval() {
  const [activeTab, setActiveTab] = useState('pending');

  const kpis = [
    { label: 'PENDING IT APPROVAL', value: '0', icon: <Clock className="w-8 h-8 text-amber-200" />, color: 'amber' },
    { label: 'APPROVED BY IT', value: '33', icon: <CheckCircle2 className="w-8 h-8 text-emerald-200" />, color: 'emerald' },
    { label: 'ACTIVE USERS', value: '33', icon: <Users className="w-8 h-8 text-blue-200" />, color: 'blue' },
    { label: 'REJECTED', value: '0', icon: <UserX className="w-8 h-8 text-rose-200" />, color: 'rose' },
  ];

  const tabs = [
    { id: 'pending', label: 'Pending IT Approval', count: 0, icon: <Clock className="w-4 h-4 text-amber-500" /> },
    { id: 'approved', label: 'Approved by IT', count: 33, icon: <CheckCircle2 className="w-4 h-4 text-blue-500" /> },
    { id: 'active', label: 'Active Users', count: 33, icon: <UserPlus className="w-4 h-4 text-blue-500" /> },
    { id: 'rejected', label: 'Rejected', count: 0, icon: <UserX className="w-4 h-4 text-blue-500" /> },
  ];

  return (
    <div className="p-4 bg-[#f8f9fc] min-h-screen font-sans">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <h1 className="text-gray-700 font-black text-xl uppercase tracking-widest flex items-center gap-2">
           Employee Approval Management
        </h1>
        <div className="flex flex-wrap gap-3">
          <button className="flex items-center gap-2 px-6 py-2.5 bg-[#6b58d3] text-white text-[10px] font-black rounded shadow-lg shadow-purple-100 uppercase tracking-widest hover:bg-purple-700 transition-all">
            <LayoutDashboard className="w-4 h-4" /> IT Dashboard
          </button>
          <button className="flex items-center gap-2 px-6 py-2.5 bg-[#36b9cc] text-white text-[10px] font-black rounded shadow-lg shadow-cyan-100 uppercase tracking-widest hover:bg-cyan-700 transition-all">
            <Network className="w-4 h-4" /> Hierarchy Dashboard
          </button>
          <button className="flex items-center gap-2 px-6 py-2.5 bg-[#0061f2] text-white text-[10px] font-black rounded shadow-lg shadow-blue-100 uppercase tracking-widest hover:bg-blue-700 transition-all">
            <Users className="w-4 h-4" /> Manage Users
          </button>
        </div>
      </div>

      <div className="max-w-[1800px] mx-auto space-y-8">
        {/* KPI Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {kpis.map((kpi, idx) => (
            <div key={idx} className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between group hover:shadow-md transition-all">
               <div className="space-y-1">
                  <h4 className={`text-[9px] font-black uppercase tracking-widest ${
                    kpi.color === 'amber' ? 'text-amber-500' :
                    kpi.color === 'emerald' ? 'text-emerald-500' :
                    kpi.color === 'blue' ? 'text-blue-500' : 'text-rose-500'
                  }`}>{kpi.label}</h4>
                  <p className="text-2xl font-black text-gray-700">{kpi.value}</p>
               </div>
               <div className="opacity-10 group-hover:scale-110 transition-transform">
                  {kpi.icon}
               </div>
            </div>
          ))}
        </div>

        {/* Tabbed Content Area */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden min-h-[500px]">
           {/* Tab Headers */}
           <div className="flex border-b border-gray-100 overflow-x-auto">
              {tabs.map((tab) => (
                <button 
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-8 py-5 text-[11px] font-black uppercase tracking-widest transition-all relative border-r border-gray-50 whitespace-nowrap ${
                    activeTab === tab.id ? 'text-blue-600 bg-blue-50/10' : 'text-gray-400 hover:bg-gray-50'
                  }`}
                >
                   {tab.icon}
                   {tab.label} ({tab.count})
                   {activeTab === tab.id && (
                     <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-600"></div>
                   )}
                </button>
              ))}
           </div>

           {/* Tab Body */}
           <div className="p-24 flex flex-col items-center justify-center text-center space-y-6">
              {activeTab === 'pending' && (
                <>
                   <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-500 shadow-inner">
                      <CheckCircle2 className="w-12 h-12" />
                   </div>
                   <div className="space-y-2">
                      <h3 className="text-[18px] font-black text-emerald-600 uppercase tracking-widest">All Employees Approved!</h3>
                      <p className="text-[12px] text-gray-300 font-bold uppercase tracking-widest">No pending IT approvals at this time.</p>
                   </div>
                </>
              )}
              {activeTab !== 'pending' && (
                <div className="space-y-4">
                   <Users className="w-16 h-16 text-gray-100 mx-auto" />
                   <p className="text-[11px] font-black text-gray-200 uppercase tracking-[0.2em]">Showing {activeTab} user records...</p>
                </div>
              )}
           </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center text-[10px] text-gray-400 font-bold tracking-[0.2em] uppercase px-4">
        <p>Copyright © Your Website 2021</p>
        <div className="flex gap-4">
          <a href="#" className="hover:underline transition-colors hover:text-gray-600 lowercase italic tracking-tight">privacy policy</a>
          <span>•</span>
          <a href="#" className="hover:underline transition-colors hover:text-gray-600 lowercase italic tracking-tight">terms & conditions</a>
        </div>
      </div>
    </div>
  );
}
