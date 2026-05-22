import React, { useState } from 'react';
import { 
  Timer, Calendar, User, FileText, 
  Settings, Save, RotateCcw, Info, 
  History, DollarSign, Calculator,
  Search, ArrowRight, X, Clock
} from 'lucide-react';

export function EmployeeOT() {
  return (
    <div className="p-4 bg-[#f8f9fc] min-h-screen font-sans">
      {/* Top Header */}
      <div className="flex flex-col mb-6">
        <h1 className="text-gray-700 font-black text-xl uppercase tracking-widest flex items-center gap-2">
           <Timer className="w-5 h-5 text-blue-600" /> Employee Overtime
        </h1>
        <p className="text-[11px] text-gray-400 font-bold uppercase tracking-tight mt-1">Manage and calculate overtime for employees</p>
      </div>

      <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Fill OT Form Column */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden h-fit">
           <div className="bg-blue-50/30 px-8 py-5 border-b border-gray-100 flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-600" />
              <h3 className="text-[13px] font-black text-blue-700 uppercase tracking-widest">Fill OT</h3>
           </div>
           
           <div className="p-8 space-y-6">
              <div className="space-y-2">
                 <label className="text-[10px] font-black text-rose-500 uppercase tracking-widest">OT Date *</label>
                 <input type="date" defaultValue="2026-05-05" className="w-full px-4 py-3 bg-white border border-gray-100 rounded-lg text-[13px] font-bold text-gray-700 focus:outline-none focus:border-blue-400 transition-all" />
                 <p className="text-[9px] font-bold text-gray-400 uppercase italic tracking-tighter">Select date first to calculate OT based on salary effective on that date</p>
              </div>

              <div className="space-y-2">
                 <label className="text-[10px] font-black text-rose-500 uppercase tracking-widest">Employee *</label>
                 <select className="w-full px-4 py-3 bg-white border border-gray-100 rounded-lg text-[13px] font-bold text-gray-500 focus:outline-none focus:border-blue-400 transition-all appearance-none cursor-pointer">
                    <option>Select Employee</option>
                 </select>
              </div>

              <div className="space-y-2">
                 <label className="text-[10px] font-black text-rose-500 uppercase tracking-widest">Hours *</label>
                 <input type="text" placeholder="e.g. 2.5" className="w-full px-4 py-3 bg-white border border-gray-100 rounded-lg text-[13px] font-bold text-gray-700 focus:outline-none focus:border-blue-400 transition-all" />
              </div>

              <div className="space-y-2">
                 <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">OT Rate (1.5x hourly rate)</label>
                 <input type="text" value="Auto-calculated" disabled className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-lg text-[13px] font-bold text-gray-400 cursor-not-allowed" />
              </div>

              <div className="space-y-2">
                 <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Amount (auto-calculated)</label>
                 <input type="text" value="Auto-calculated" disabled className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-lg text-[13px] font-bold text-gray-400 cursor-not-allowed" />
              </div>

              <div className="space-y-2">
                 <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Description</label>
                 <textarea 
                   rows={3} 
                   placeholder="Notes"
                   className="w-full px-4 py-3 bg-white border border-gray-100 rounded-lg text-[13px] font-bold text-gray-700 focus:outline-none focus:border-blue-400 transition-all resize-none"
                 />
              </div>

              <button className="w-full flex items-center justify-center gap-2 py-4 bg-[#0061f2] text-white text-[11px] font-black rounded-lg shadow-lg shadow-blue-100 uppercase tracking-widest hover:bg-blue-700 transition-all">
                 <Save className="w-4 h-4" /> Save OT
              </button>
           </div>
        </div>

        {/* OT Entries History Column */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden h-fit min-h-[600px]">
           <div className="bg-gray-50/50 px-8 py-5 border-b border-gray-100 flex justify-between items-center">
              <div className="flex items-center gap-2">
                 <History className="w-4 h-4 text-blue-600" />
                 <h3 className="text-[13px] font-black text-gray-700 uppercase tracking-widest">OT Entries (Month-wise)</h3>
              </div>
              <div className="flex items-center gap-2">
                 <input type="month" defaultValue="2026-05" className="px-3 py-1.5 border border-gray-100 rounded-lg text-[11px] font-bold text-gray-600 focus:outline-none" />
              </div>
           </div>

           <div className="overflow-x-auto">
              <table className="w-full text-[11px] border-collapse">
                 <thead>
                    <tr className="bg-white text-gray-400 uppercase tracking-widest border-b border-gray-100">
                       <th className="px-6 py-5 text-left font-black border-r border-gray-50">Date</th>
                       <th className="px-6 py-5 text-left font-black border-r border-gray-50">Employee</th>
                       <th className="px-6 py-5 text-center font-black border-r border-gray-50">Hours</th>
                       <th className="px-6 py-5 text-right font-black border-r border-gray-50">Amount (₹)</th>
                       <th className="px-6 py-5 text-left font-black">Description</th>
                    </tr>
                 </thead>
                 <tbody>
                    <tr>
                       <td colSpan={5} className="py-20 text-center">
                          <div className="flex flex-col items-center gap-3 text-gray-300">
                             <FileText className="w-12 h-12 opacity-20" />
                             <p className="text-[11px] font-black uppercase tracking-[0.2em] opacity-40">No entries for selected month.</p>
                          </div>
                       </td>
                    </tr>
                 </tbody>
              </table>
           </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center text-[10px] text-gray-400 font-bold tracking-[0.2em] uppercase px-4">
        <p>Copyright &copy; Digital New Enterprises 2024</p>
        <div className="flex gap-4">
          <a href="#" className="hover:underline transition-colors hover:text-gray-600">Privacy Policy</a>
          <span>•</span>
          <a href="#" className="hover:underline transition-colors hover:text-gray-600">Terms & Conditions</a>
        </div>
      </div>
    </div>
  );
}
