import React from 'react';
import { 
  Users, UserCheck, UserX, UserPlus, Eye, 
  GitFork, Clock, CheckCircle2, ShieldCheck, 
  Layout, BarChart3, PieChart, MapPin, 
  Settings, UserMinus, UserCog
} from 'lucide-react';

export function HRDashboard() {
  const stats = [
    { label: 'TOTAL EMPLOYEES', value: '1', color: 'text-blue-500', icon: Users },
    { label: 'PENDING IT', value: '0', color: 'text-gray-400', icon: Clock },
    { label: 'APPROVED BY IT', value: '0', color: 'text-emerald-500', icon: ShieldCheck },
    { label: 'ACTIVE USERS', value: '0', color: 'text-emerald-400', icon: UserCheck },
    { label: 'REJECTED', value: '0', color: 'text-rose-500', icon: UserMinus },
    { label: 'INACTIVE', value: '0', color: 'text-gray-300', icon: UserX },
  ];

  return (
    <div className="p-6 bg-[#f8f9fc] min-h-screen font-sans">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <h1 className="text-gray-700 font-black text-xl uppercase tracking-widest">HR Dashboard</h1>
        <div className="flex flex-wrap gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-[#0061f2] text-white text-[11px] font-black rounded shadow-lg shadow-blue-100 uppercase tracking-widest hover:bg-blue-700 transition-all">
            <UserPlus className="w-4 h-4" /> Add New Employee
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#6b58d3] text-white text-[11px] font-black rounded shadow-lg shadow-purple-100 uppercase tracking-widest hover:bg-purple-700 transition-all">
            <Users className="w-4 h-4" /> View All Employees
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#00cfd5] text-white text-[11px] font-black rounded shadow-lg shadow-cyan-100 uppercase tracking-widest hover:bg-cyan-600 transition-all">
            <GitFork className="w-4 h-4" /> Hierarchy Dashboard
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center group hover:shadow-md transition-all cursor-default">
              <div className="flex justify-between w-full mb-4">
                <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest leading-none">{stat.label}</span>
                <Icon className={`w-5 h-5 ${stat.color} opacity-20 group-hover:opacity-100 transition-opacity`} />
              </div>
              <div className="text-2xl font-black text-gray-800">{stat.value}</div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-8">
        <div className="bg-gray-50/50 px-6 py-4 border-b border-gray-100">
          <h2 className="text-[12px] font-black text-[#0061f2] uppercase tracking-widest">Quick Actions</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-3">
            <button className="flex items-center justify-center gap-2 px-4 py-3 bg-[#0061f2] text-white text-[10px] font-black rounded shadow-sm uppercase tracking-tighter hover:scale-[1.02] transition-transform">
              <UserPlus className="w-3.5 h-3.5" /> Add New Employee
            </button>
            <button className="flex items-center justify-center gap-2 px-4 py-3 bg-[#6b58d3] text-white text-[10px] font-black rounded shadow-sm uppercase tracking-tighter hover:scale-[1.02] transition-transform">
              <Users className="w-3.5 h-3.5" /> View All Employees
            </button>
            <button className="flex items-center justify-center gap-2 px-4 py-3 bg-[#f6c23e] text-white text-[10px] font-black rounded shadow-sm uppercase tracking-tighter hover:scale-[1.02] transition-transform text-center leading-tight">
              <Clock className="w-3.5 h-3.5 shrink-0" /> Pending IT Approval
              <span className="ml-1 bg-white/20 px-1.5 py-0.5 rounded text-[8px]">0</span>
            </button>
            <button className="flex items-center justify-center gap-2 px-4 py-3 bg-[#1cc88a] text-white text-[10px] font-black rounded shadow-sm uppercase tracking-tighter hover:scale-[1.02] transition-transform">
              <CheckCircle2 className="w-3.5 h-3.5 shrink-0" /> Approved Employees
              <span className="ml-1 bg-white/20 px-1.5 py-0.5 rounded text-[8px]">0</span>
            </button>
            <button className="flex items-center justify-center gap-2 px-4 py-3 bg-[#00cfd5] text-white text-[10px] font-black rounded shadow-sm uppercase tracking-tighter hover:scale-[1.02] transition-transform">
              <GitFork className="w-3.5 h-3.5" /> Hierarchy Dashboard
            </button>
            <button className="flex items-center justify-center gap-2 px-4 py-3 bg-[#323c4e] text-white text-[10px] font-black rounded shadow-sm uppercase tracking-tighter hover:scale-[1.02] transition-transform">
              <UserCog className="w-3.5 h-3.5" /> Manage Users
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Recent Requests */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden min-h-[400px] flex flex-col">
          <div className="bg-gray-50/50 px-6 py-4 border-b border-gray-100">
            <h2 className="text-[12px] font-black text-[#0061f2] uppercase tracking-widest">Recent Employee Requests</h2>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6 border border-gray-100 shadow-inner">
              <Users className="w-10 h-10 text-gray-200" />
            </div>
            <h3 className="text-[14px] font-black text-gray-600 uppercase tracking-widest mb-2">No Employee Requests Found</h3>
            <p className="text-[11px] text-gray-400 font-bold uppercase tracking-tight mb-8">Start by creating your first employee.</p>
            <button className="flex items-center gap-2 px-6 py-3 bg-[#0061f2] text-white text-[11px] font-black rounded-full shadow-lg shadow-blue-100 uppercase tracking-widest hover:bg-blue-700 transition-all">
              <UserPlus className="w-4 h-4" /> Add New Employee
            </button>
          </div>
        </div>

        {/* Distribution Charts Side */}
        <div className="space-y-6">
          {/* Status Distribution */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-[200px]">
            <div className="bg-gray-50/50 px-6 py-3 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-[11px] font-black text-blue-500 uppercase tracking-widest">Status Distribution</h2>
              <PieChart className="w-4 h-4 text-gray-300" />
            </div>
            <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
              <PieChart className="w-12 h-12 text-gray-100 mb-2" />
              <p className="text-[10px] text-gray-300 font-bold uppercase tracking-widest">No data available</p>
            </div>
          </div>

          {/* Employees by Location */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-[200px]">
            <div className="bg-gray-50/50 px-6 py-3 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-[11px] font-black text-blue-500 uppercase tracking-widest">Employees by Location</h2>
              <MapPin className="w-4 h-4 text-gray-300" />
            </div>
            <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
              <BarChart3 className="w-12 h-12 text-gray-100 mb-2" />
              <p className="text-[10px] text-gray-300 font-bold uppercase tracking-widest">No data available</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center text-[10px] text-gray-400 font-bold tracking-[0.2em] uppercase">
        <p>Copyright © Your Website 2021</p>
        <div className="flex gap-4">
          <a href="#" className="hover:underline transition-colors hover:text-gray-600">Privacy Policy</a>
          <span>•</span>
          <a href="#" className="hover:underline transition-colors hover:text-gray-600">Terms & Conditions</a>
        </div>
      </div>
    </div>
  );
}
