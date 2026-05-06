import React, { useState } from 'react';
import { 
  UserCheck, Plus, Search, Filter, Edit3, 
  Trash2, Save, FileText, Info, History,
  Calendar, Users, ArrowRight, X, RotateCcw,
  Settings, CheckCircle2, List, Clock,
  UserPlus, Briefcase
} from 'lucide-react';

export function LeaveAssignments() {
  const [assignments] = useState([
    { name: 'MUKESH KUMAR', id: 'DEE251225106', type: 'UN PAID LEAVE', short: 'UPL', days: 20, by: 'SANJAY KUMAR MAHATO', at: '05 May 2026, 06:06 AM' },
    { name: 'JOG RAJ SINGH', id: 'DEE040126117', type: 'UN PAID LEAVE', short: 'UPL', days: 20, by: 'SANJAY KUMAR MAHATO', at: '05 May 2026, 05:53 AM' },
    { name: 'RAMBABU', id: 'DEE070126120', type: 'UN PAID LEAVE', short: 'UPL', days: 20, by: 'SANJAY KUMAR MAHATO', at: '05 May 2026, 05:36 AM' },
    { name: 'PENTAPALLI ASHA JYOTHI', id: 'DEE291225113', type: 'UN PAID LEAVE', short: 'UPL', days: 20, by: 'SANJAY KUMAR MAHATO', at: '05 May 2026, 05:28 AM' },
    { name: 'KANDREGULA KOTESWARA RAO', id: 'DEE030426128', type: 'UN PAID LEAVE', short: 'UPL', days: 20, by: 'SANJAY KUMAR MAHATO', at: '04 May 2026, 10:14 AM' },
    { name: 'GANDIBOINA GOWRI PRASAD', id: 'DEE130426131', type: 'UN PAID LEAVE', short: 'UPL', days: 20, by: 'SANJAY KUMAR MAHATO', at: '13 Apr 2026, 07:02 AM' },
  ]);

  return (
    <div className="p-4 bg-[#f8f9fc] min-h-screen font-sans">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <h1 className="text-gray-700 font-black text-xl uppercase tracking-widest flex items-center gap-2">
           Leave Assignments
        </h1>
        <button className="flex items-center gap-2 px-6 py-2.5 bg-[#0061f2] text-white text-[10px] font-black rounded shadow-lg shadow-blue-100 uppercase tracking-widest hover:bg-blue-700 transition-all">
          <Plus className="w-4 h-4" /> Assign Leave
        </button>
      </div>

      <div className="max-w-[1600px] mx-auto space-y-6">
        {/* Leave Assignments Table Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden min-h-[600px]">
          <div className="bg-blue-50/10 px-8 py-5 border-b border-gray-100 flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-blue-600" />
            <h2 className="text-[12px] font-black text-blue-700 uppercase tracking-widest">Leave Assignments Management</h2>
          </div>

          {/* Search Toolbar */}
          <div className="p-8 border-b border-gray-50 flex gap-3 max-w-2xl">
             <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                <input 
                  type="text" 
                  placeholder="Search by employee name, ID, or leave type..."
                  className="w-full pl-10 pr-4 py-3 bg-gray-50/50 border border-gray-100 rounded-xl text-[13px] font-bold text-gray-500 focus:outline-none focus:border-blue-400 transition-all"
                />
             </div>
             <button className="px-8 py-3 bg-[#0061f2] text-white text-[11px] font-black rounded-xl shadow-md uppercase tracking-widest hover:bg-blue-700 transition-all flex items-center gap-2">
                <Search className="w-4 h-4" /> Search
             </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-[11px] border-collapse">
              <thead>
                <tr className="bg-white text-gray-400 uppercase tracking-widest border-b border-gray-100">
                  <th className="px-8 py-5 text-left font-black border-r border-gray-50">Employee</th>
                  <th className="px-8 py-5 text-center font-black border-r border-gray-50">Leave Type</th>
                  <th className="px-8 py-5 text-center font-black border-r border-gray-50">Days</th>
                  <th className="px-8 py-5 text-left font-black border-r border-gray-50">Created By</th>
                  <th className="px-8 py-5 text-left font-black border-r border-gray-50">Created At</th>
                  <th className="px-8 py-5 text-center font-black">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {assignments.map((item, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-8 py-6 border-r border-gray-50">
                       <div className="space-y-1">
                          <h4 className="font-black text-gray-600 uppercase tracking-tight">{item.name}</h4>
                          <span className="text-[10px] font-bold text-gray-300 uppercase tracking-tighter">{item.id}</span>
                       </div>
                    </td>
                    <td className="px-8 py-6 border-r border-gray-50 text-center">
                       <div className="space-y-1">
                          <span className="bg-cyan-500 text-white text-[8px] font-black px-2 py-0.5 rounded shadow-sm uppercase tracking-tighter">{item.short}</span>
                          <p className="text-[9px] font-bold text-gray-300 uppercase tracking-tight">{item.type}</p>
                       </div>
                    </td>
                    <td className="px-8 py-6 border-r border-gray-50 text-center">
                       <span className="text-[14px] font-black text-blue-600 tracking-tighter">{item.days} <span className="text-[10px] text-gray-300 font-bold uppercase">days</span></span>
                    </td>
                    <td className="px-8 py-6 border-r border-gray-50 font-black text-gray-500 uppercase tracking-tight whitespace-nowrap">{item.by}</td>
                    <td className="px-8 py-6 border-r border-gray-50 font-bold text-gray-400 whitespace-nowrap uppercase tracking-tighter">
                       <div className="flex items-center gap-2">
                          <Clock className="w-3.5 h-3.5 opacity-30" />
                          {item.at}
                       </div>
                    </td>
                    <td className="px-8 py-6 text-center">
                       <div className="flex gap-2 justify-center">
                          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0061f2] text-white rounded text-[9px] font-black uppercase hover:bg-blue-700 shadow-sm transition-all">
                             <Edit3 className="w-3 h-3" /> Edit
                          </button>
                          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-[#e74a3b] text-white rounded text-[9px] font-black uppercase hover:bg-red-700 shadow-sm transition-all">
                             <Trash2 className="w-3 h-3" /> Delete
                          </button>
                       </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center text-[10px] text-gray-400 font-bold tracking-[0.2em] uppercase px-4">
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
