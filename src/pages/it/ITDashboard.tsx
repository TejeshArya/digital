import React, { useState } from 'react';
import { 
  Monitor, Users, ShieldCheck, UserCheck, 
  Settings, Key, LayoutDashboard, Search,
  Eye, Filter, MoreVertical, Building2,
  MapPin, Clock, ArrowRight, UserPlus,
  ShieldAlert, UserX, UserMinus, Network
} from 'lucide-react';

export function ITDashboard() {
  const [requests] = useState([
    { id: 'DEE300426132', name: 'TEJESH GUDLA', location: 'VISAKHAPATNAM', created: 'Apr 30, 2026' },
    { id: 'DEE130426131', name: 'GANDIBOINA GOWRI PRASAD', location: 'VISAKHAPATNAM', created: 'Apr 13, 2026' },
    { id: 'DEE040426130', name: 'RAVENDRA SINGH', location: 'JAMNAGAR', created: 'Apr 04, 2026' },
  ]);

  const kpis = [
    { label: 'TOTAL EMPLOYEES', value: '33', icon: <Users className="w-8 h-8 text-blue-200" />, color: 'blue' },
    { label: 'PENDING IT APPROVAL', value: '0', icon: <Clock className="w-8 h-8 text-amber-200" />, color: 'amber' },
    { label: 'APPROVED BY IT', value: '33', icon: <UserCheck className="w-8 h-8 text-emerald-200" />, color: 'emerald' },
    { label: 'ACTIVE USERS', value: '33', icon: <UserPlus className="w-8 h-8 text-green-200" />, color: 'green' },
    { label: 'REJECTED', value: '0', icon: <UserX className="w-8 h-8 text-rose-200" />, color: 'rose' },
    { label: 'INACTIVE', value: '0', icon: <UserMinus className="w-8 h-8 text-gray-200" />, color: 'gray' },
  ];

  return (
    <div className="p-4 bg-[#f8f9fc] min-h-screen font-sans">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <h1 className="text-gray-700 font-black text-xl uppercase tracking-widest flex items-center gap-2">
           IT Dashboard
        </h1>
        <div className="flex flex-wrap gap-3">
          <button className="flex items-center gap-2 px-6 py-2.5 bg-[#0061f2] text-white text-[10px] font-black rounded shadow-lg shadow-blue-100 uppercase tracking-widest hover:bg-blue-700 transition-all">
            <UserCheck className="w-4 h-4" /> Employee Approval
          </button>
          <button className="flex items-center gap-2 px-6 py-2.5 bg-[#6b58d3] text-white text-[10px] font-black rounded shadow-lg shadow-purple-100 uppercase tracking-widest hover:bg-purple-700 transition-all">
            <Settings className="w-4 h-4" /> Manage Users
          </button>
          <button className="flex items-center gap-2 px-6 py-2.5 bg-[#1cc88a] text-white text-[10px] font-black rounded shadow-lg shadow-emerald-100 uppercase tracking-widest hover:bg-emerald-700 transition-all">
            <Network className="w-4 h-4" /> Hierarchy Dashboard
          </button>
        </div>
      </div>

      <div className="max-w-[1800px] mx-auto space-y-8">
        {/* KPI Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {kpis.map((kpi, idx) => (
            <div key={idx} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between h-32 relative overflow-hidden group hover:shadow-md transition-all">
               <div className="absolute right-[-10px] top-[-10px] opacity-10 group-hover:scale-110 transition-transform">
                  {kpi.icon}
               </div>
               <div className="space-y-1">
                  <h4 className={`text-[9px] font-black uppercase tracking-widest ${
                    kpi.color === 'blue' ? 'text-blue-500' :
                    kpi.color === 'amber' ? 'text-amber-500' :
                    kpi.color === 'emerald' ? 'text-emerald-500' :
                    kpi.color === 'green' ? 'text-green-500' :
                    kpi.color === 'rose' ? 'text-rose-500' : 'text-gray-400'
                  }`}>{kpi.label}</h4>
                  <p className="text-2xl font-black text-gray-700">{kpi.value}</p>
               </div>
               <div className="flex justify-end">
                  {React.cloneElement(kpi.icon as React.ReactElement, { className: "w-5 h-5 text-gray-100" })}
               </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
           <div className="bg-blue-50/10 px-8 py-4 border-b border-gray-100">
              <h3 className="text-[11px] font-black text-blue-600 uppercase tracking-widest">Quick Actions</h3>
           </div>
           <div className="p-8 grid grid-cols-1 md:grid-cols-4 gap-6">
              <button className="flex items-center justify-between px-6 py-4 bg-[#f6c23e] text-white rounded-xl shadow-lg shadow-amber-100 hover:scale-[1.02] transition-all group">
                 <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5" />
                    <span className="text-[11px] font-black uppercase tracking-widest text-left">Review Pending Employees</span>
                 </div>
                 <span className="text-[10px] font-black bg-white/20 px-2 py-0.5 rounded">0</span>
              </button>
              <button className="flex items-center justify-between px-6 py-4 bg-[#1cc88a] text-white rounded-xl shadow-lg shadow-emerald-100 hover:scale-[1.02] transition-all group">
                 <div className="flex items-center gap-3">
                    <UserCheck className="w-5 h-5" />
                    <span className="text-[11px] font-black uppercase tracking-widest text-left">View Approved Employees</span>
                 </div>
                 <span className="text-[10px] font-black bg-white/20 px-2 py-0.5 rounded">33</span>
              </button>
              <button className="flex items-center gap-3 px-6 py-4 bg-[#36b9cc] text-white rounded-xl shadow-lg shadow-cyan-100 hover:scale-[1.02] transition-all group">
                 <Network className="w-5 h-5" />
                 <span className="text-[11px] font-black uppercase tracking-widest text-left">View Hierarchy</span>
              </button>
              <button className="flex items-center gap-3 px-6 py-4 bg-[#6b58d3] text-white rounded-xl shadow-lg shadow-purple-100 hover:scale-[1.02] transition-all group">
                 <Settings className="w-5 h-5" />
                 <span className="text-[11px] font-black uppercase tracking-widest text-left">Manage All Users</span>
              </button>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
           {/* Recent Requests */}
           <div className="lg:col-span-3 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden min-h-[500px]">
              <div className="bg-gray-50/50 px-8 py-5 border-b border-gray-100 flex items-center gap-2">
                 <ShieldAlert className="w-4 h-4 text-blue-600" />
                 <h3 className="text-[12px] font-black text-gray-700 uppercase tracking-widest">Recent Employee Requests</h3>
              </div>
              <div className="overflow-x-auto">
                 <table className="w-full text-[11px]">
                    <thead>
                       <tr className="text-gray-400 uppercase tracking-widest border-b border-gray-50 font-black">
                          <th className="px-8 py-5 text-left border-r border-gray-50">Employee ID</th>
                          <th className="px-8 py-5 text-left border-r border-gray-50">Name</th>
                          <th className="px-8 py-5 text-left border-r border-gray-50">Location</th>
                          <th className="px-8 py-5 text-center border-r border-gray-50">Status</th>
                          <th className="px-8 py-5 text-left border-r border-gray-50">Created</th>
                          <th className="px-8 py-5 text-center">Actions</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                       {requests.map((req, idx) => (
                         <tr key={idx} className="hover:bg-gray-50/30 transition-colors">
                            <td className="px-8 py-5 border-r border-gray-50 whitespace-nowrap">
                               <span className="bg-[#0061f2] text-white text-[9px] font-black px-2 py-1 rounded shadow-sm uppercase tracking-tighter">{req.id}</span>
                            </td>
                            <td className="px-8 py-5 border-r border-gray-50 font-black text-gray-600 uppercase tracking-tight">{req.name}</td>
                            <td className="px-8 py-5 border-r border-gray-50 font-bold text-gray-400 uppercase tracking-tighter">{req.location}</td>
                            <td className="px-8 py-5 border-r border-gray-50 text-center">---</td>
                            <td className="px-8 py-5 border-r border-gray-50 font-bold text-gray-400 whitespace-nowrap uppercase tracking-tighter">{req.created}</td>
                            <td className="px-8 py-5 text-center">
                               <button className="flex items-center gap-1.5 px-4 py-1.5 bg-[#0061f2] text-white rounded-lg text-[9px] font-black uppercase hover:bg-blue-700 shadow-sm transition-all mx-auto">
                                  <Eye className="w-3.5 h-3.5" /> Review
                               </button>
                            </td>
                         </tr>
                       ))}
                    </tbody>
                 </table>
              </div>
           </div>

           {/* Stats Column */}
           <div className="lg:col-span-1 space-y-8">
              {/* Status Distribution */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                 <div className="px-6 py-4 border-b border-gray-100">
                    <h3 className="text-[11px] font-black text-blue-600 uppercase tracking-widest">Status Distribution</h3>
                 </div>
                 <div className="p-6 space-y-4">
                    <div className="space-y-2">
                       <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                          <span className="text-gray-400">Approved</span>
                          <span className="text-blue-600">33</span>
                       </div>
                       <div className="w-full h-2 bg-gray-50 rounded-full overflow-hidden">
                          <div className="w-full h-full bg-[#0061f2] shadow-sm"></div>
                       </div>
                    </div>
                 </div>
              </div>

              {/* Employees by Location */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                 <div className="px-6 py-4 border-b border-gray-100">
                    <h3 className="text-[11px] font-black text-blue-600 uppercase tracking-widest">Employees by Location</h3>
                 </div>
                 <div className="p-6 space-y-4">
                    <div className="space-y-3">
                       <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                          <div className="flex items-center gap-2">
                             <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
                             <span className="text-gray-400">Unknown</span>
                          </div>
                          <span className="text-gray-700">1</span>
                       </div>
                    </div>
                 </div>
              </div>
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
