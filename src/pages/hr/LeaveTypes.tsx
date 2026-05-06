import React, { useState } from 'react';
import { 
  Briefcase, Plus, Search, Filter, Edit3, 
  Trash2, Save, FileText, Info, History,
  Calendar, Users, ArrowRight, X, RotateCcw,
  Settings, CheckCircle2, ToggleLeft, ToggleRight,
  ShieldCheck, List, Clock
} from 'lucide-react';

export function LeaveTypes() {
  const [leaveTypes] = useState([
    { name: 'COMPENSATORY LEAVE', short: 'COM LEAVE', payable: true, created: '27 Jan 2026, 10:37 PM', updated: '27 Jan 2026, 10:37 PM' },
    { name: 'NATIONAL LEAVE', short: 'NL', payable: true, created: '27 Jan 2026, 10:38 PM', updated: '27 Jan 2026, 10:38 PM' },
    { name: 'PAID ANNUAL LEAVE', short: 'AL', payable: true, created: '27 Jan 2026, 10:34 PM', updated: '27 Jan 2026, 10:34 PM' },
    { name: 'PAID CASUAL LEAVE', short: 'CL', payable: true, created: '27 Jan 2026, 10:35 PM', updated: '27 Jan 2026, 10:35 PM' },
    { name: 'PAID FESTIVEL AND RELIGIOUS LEAVE', short: 'FR LEAVE', payable: true, created: '27 Jan 2026, 10:37 PM', updated: '27 Jan 2026, 10:37 PM' },
    { name: 'PAID MATERNITY LEAVE', short: 'MAT LEAVE', payable: true, created: '27 Jan 2026, 10:36 PM', updated: '27 Jan 2026, 10:36 PM' },
    { name: 'PAID MEDICAL LEAVE', short: 'ML', payable: true, created: '27 Jan 2026, 10:35 PM', updated: '27 Jan 2026, 10:35 PM' },
    { name: 'PAID PATERNITY LEAVE', short: 'PAT LEAVE', payable: true, created: '27 Jan 2026, 10:36 PM', updated: '27 Jan 2026, 10:36 PM' },
    { name: 'UN PAID LEAVE', short: 'UPL', payable: false, created: '27 Jan 2026, 10:38 PM', updated: '05 Feb 2026, 01:09 PM' },
  ]);

  return (
    <div className="p-4 bg-[#f8f9fc] min-h-screen font-sans">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <h1 className="text-gray-700 font-black text-xl uppercase tracking-widest flex items-center gap-2">
           Leave Types
        </h1>
        <button className="flex items-center gap-2 px-6 py-2.5 bg-[#0061f2] text-white text-[10px] font-black rounded shadow-lg shadow-blue-100 uppercase tracking-widest hover:bg-blue-700 transition-all">
          <Plus className="w-4 h-4" /> Add Leave Type
        </button>
      </div>

      <div className="max-w-[1600px] mx-auto space-y-6">
        {/* Leave Types Table Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden min-h-[600px]">
          <div className="bg-blue-50/10 px-8 py-5 border-b border-gray-100 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-blue-600" />
            <h2 className="text-[12px] font-black text-blue-700 uppercase tracking-widest">Leave Types Management</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-[11px] border-collapse">
              <thead>
                <tr className="bg-white text-gray-400 uppercase tracking-widest border-b border-gray-100">
                  <th className="px-8 py-5 text-left font-black border-r border-gray-50">Full Name</th>
                  <th className="px-8 py-5 text-center font-black border-r border-gray-50">Short Name</th>
                  <th className="px-8 py-5 text-center font-black border-r border-gray-50">Payable Status</th>
                  <th className="px-8 py-5 text-left font-black border-r border-gray-50">Created At</th>
                  <th className="px-8 py-5 text-left font-black border-r border-gray-50">Updated At</th>
                  <th className="px-8 py-5 text-center font-black">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {leaveTypes.map((item, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-8 py-5 border-r border-gray-50 font-black text-gray-600 uppercase tracking-tight">{item.name}</td>
                    <td className="px-8 py-5 border-r border-gray-50 text-center">
                       <span className="bg-cyan-500 text-white text-[8px] font-black px-2 py-1 rounded uppercase tracking-tighter shadow-sm">
                          {item.short}
                       </span>
                    </td>
                    <td className="px-8 py-5 border-r border-gray-50 text-center">
                       <div className="flex items-center justify-center gap-2">
                          {item.payable ? (
                            <ToggleRight className="w-8 h-8 text-emerald-500 cursor-pointer fill-current" />
                          ) : (
                            <ToggleLeft className="w-8 h-8 text-gray-200 cursor-pointer fill-current" />
                          )}
                          <span className={`text-[9px] font-black uppercase ${item.payable ? 'text-emerald-500' : 'text-gray-300'}`}>
                             {item.payable ? 'ON' : 'OFF'}
                          </span>
                       </div>
                    </td>
                    <td className="px-8 py-5 border-r border-gray-50 font-bold text-gray-400 whitespace-nowrap">
                       <div className="flex items-center gap-2 tracking-tighter uppercase">
                          <Clock className="w-3.5 h-3.5 opacity-30" />
                          {item.created}
                       </div>
                    </td>
                    <td className="px-8 py-5 border-r border-gray-50 font-bold text-gray-400 whitespace-nowrap">
                       <div className="flex items-center gap-2 tracking-tighter uppercase">
                          <Clock className="w-3.5 h-3.5 opacity-30" />
                          {item.updated}
                       </div>
                    </td>
                    <td className="px-8 py-5 text-center">
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
