import React, { useState } from 'react';
import { 
  ShieldCheck, Calendar, Filter, FileText, 
  Settings, Save, RotateCcw, Info, 
  History, UserCheck, CheckCircle2,
  List, ArrowRight, X, Clock, Layers
} from 'lucide-react';

export function OTApprovals() {
  return (
    <div className="p-4 bg-[#f8f9fc] min-h-screen font-sans">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div className="space-y-1">
          <h1 className="text-gray-700 font-black text-xl uppercase tracking-widest flex items-center gap-2">
             OT Approvals
          </h1>
          <p className="text-[11px] text-gray-400 font-bold uppercase tracking-tight">Month: May 2026</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-2.5 bg-[#6b58d3] text-white text-[10px] font-black rounded shadow-lg shadow-purple-100 uppercase tracking-widest hover:bg-purple-700 transition-all">
          <Layers className="w-4 h-4" /> OT Entry Page
        </button>
      </div>

      <div className="max-w-[1600px] mx-auto space-y-6">
        {/* Month Filter Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
           <div className="flex flex-wrap items-end gap-4">
              <div className="space-y-2">
                 <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Select Month</label>
                 <div className="relative">
                    <input type="month" defaultValue="2026-05" className="px-4 py-2.5 bg-white border border-gray-100 rounded-lg text-[13px] font-bold text-gray-700 focus:outline-none focus:border-blue-400 transition-all" />
                 </div>
              </div>
              <button className="px-10 py-2.5 bg-[#0061f2] text-white text-[11px] font-black rounded-lg shadow-md uppercase tracking-widest hover:bg-blue-700 transition-all">
                 <Filter className="w-4 h-4 inline mr-2" /> Filter
              </button>
           </div>
        </div>

        {/* Approval Flow Cards */}
        <div className="space-y-8">
           {/* Manager Approval Section */}
           <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-8 py-5 border-b border-gray-50 flex justify-between items-center bg-blue-50/10">
                 <div className="space-y-1">
                    <h3 className="text-[12px] font-black text-blue-700 uppercase tracking-widest flex items-center gap-2">
                       <UserCheck className="w-4 h-4" /> Pending Manager Approval
                    </h3>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">Review hours, update if needed, then approve.</p>
                 </div>
                 <span className="bg-[#0061f2] text-white text-[9px] font-black px-3 py-1 rounded-full uppercase shadow-sm">0 entries</span>
              </div>
              <div className="p-16 text-center border-b border-gray-50 bg-gray-50/10">
                 <div className="flex flex-col items-center gap-2 text-gray-300">
                    <FileText className="w-10 h-10 opacity-20" />
                    <p className="text-[11px] font-black uppercase tracking-[0.2em] opacity-40">No entries waiting for manager approval.</p>
                 </div>
              </div>
           </div>

           {/* HR Approval Section */}
           <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-8 py-5 border-b border-gray-50 flex justify-between items-center bg-emerald-50/10">
                 <div className="space-y-1">
                    <h3 className="text-[12px] font-black text-emerald-600 uppercase tracking-widest flex items-center gap-2">
                       <ShieldCheck className="w-4 h-4" /> Pending HR Approval
                    </h3>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">Manager approved entries waiting for final confirmation.</p>
                 </div>
                 <span className="bg-[#1cc88a] text-white text-[9px] font-black px-3 py-1 rounded-full uppercase shadow-sm">0 entries</span>
              </div>
              <div className="p-16 text-center border-b border-gray-50 bg-gray-50/10">
                 <div className="flex flex-col items-center gap-2 text-gray-300">
                    <FileText className="w-10 h-10 opacity-20" />
                    <p className="text-[11px] font-black uppercase tracking-[0.2em] opacity-40">No entries waiting for HR approval.</p>
                 </div>
              </div>
           </div>

           {/* Final Approved Section */}
           <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-8 py-5 border-b border-gray-50 flex justify-between items-center bg-purple-50/10">
                 <div className="space-y-1">
                    <h3 className="text-[12px] font-black text-purple-700 uppercase tracking-widest flex items-center gap-2">
                       <List className="w-4 h-4" /> HR Approved Entries
                    </h3>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">Entries already included in salary runs.</p>
                 </div>
                 <span className="bg-[#6b58d3] text-white text-[9px] font-black px-3 py-1 rounded-full uppercase shadow-sm">0 entries</span>
              </div>
              <div className="p-16 text-center border-b border-gray-50 bg-gray-50/10">
                 <div className="flex flex-col items-center gap-2 text-gray-300">
                    <FileText className="w-10 h-10 opacity-20" />
                    <p className="text-[11px] font-black uppercase tracking-[0.2em] opacity-40">No HR approved entries for this month.</p>
                 </div>
              </div>
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
