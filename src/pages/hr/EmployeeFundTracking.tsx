import React, { useState } from 'react';
import { 
  Wallet, Plus, Search, Filter, Edit3, 
  Trash2, Save, FileText, Info, History,
  Calendar, Users, ArrowRight, X, RotateCcw
} from 'lucide-react';

export function EmployeeFundTracking() {
  return (
    <div className="p-4 bg-[#f8f9fc] min-h-screen font-sans">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <h1 className="text-gray-700 font-black text-xl uppercase tracking-widest flex items-center gap-2">
          <Wallet className="w-5 h-5 text-blue-600" /> Employee Fund Tracking
        </h1>
        <button className="flex items-center gap-2 px-6 py-2.5 bg-[#0061f2] text-white text-[10px] font-black rounded shadow-lg shadow-blue-100 uppercase tracking-widest hover:bg-blue-700 transition-all">
          <Plus className="w-4 h-4" /> Give Fund
        </button>
      </div>

      <div className="max-w-7xl mx-auto space-y-6">
        {/* Filter Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 items-end">
              <div className="space-y-2 lg:col-span-1">
                 <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Employee</label>
                 <select className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded text-[12px] font-bold text-gray-700 focus:outline-none focus:border-blue-400 transition-all">
                    <option>All Employees</option>
                 </select>
              </div>
              <div className="space-y-2 lg:col-span-1">
                 <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</label>
                 <select className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded text-[12px] font-bold text-gray-700 focus:outline-none focus:border-blue-400 transition-all">
                    <option>All Statuses</option>
                 </select>
              </div>
              <div className="space-y-2 lg:col-span-1">
                 <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">From Date</label>
                 <div className="relative">
                    <input type="date" className="w-full px-3 py-2 bg-white border border-gray-200 rounded text-[12px] font-bold text-gray-700 focus:outline-none focus:border-blue-400 transition-all" />
                 </div>
              </div>
              <div className="space-y-2 lg:col-span-1">
                 <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">To Date</label>
                 <div className="relative">
                    <input type="date" className="w-full px-3 py-2 bg-white border border-gray-200 rounded text-[12px] font-bold text-gray-700 focus:outline-none focus:border-blue-400 transition-all" />
                 </div>
              </div>
              <div className="lg:col-span-1">
                 <button className="w-full flex items-center justify-center gap-2 px-6 py-2.5 bg-[#6b58d3] text-white text-[10px] font-black rounded shadow-md uppercase tracking-widest hover:bg-purple-700 transition-all">
                    <Filter className="w-4 h-4" /> Filter
                 </button>
              </div>
              <div className="lg:col-span-1">
                 <button className="w-full flex items-center justify-center gap-2 px-6 py-2.5 border border-[#6b58d3] text-[#6b58d3] text-[10px] font-black rounded hover:bg-purple-50 transition-all uppercase tracking-widest">
                    <RotateCcw className="w-4 h-4" /> Clear
                 </button>
              </div>
           </div>
        </div>

        {/* Records Table Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden min-h-[400px]">
           <div className="overflow-x-auto">
              <table className="w-full text-[10px] border-collapse">
                 <thead>
                    <tr className="bg-[#1a202c] text-white uppercase tracking-widest">
                       <th className="px-4 py-4 text-center font-black border-r border-slate-700 w-12">#</th>
                       <th className="px-6 py-4 text-left font-black border-r border-slate-700">Employee</th>
                       <th className="px-6 py-4 text-right font-black border-r border-slate-700">Amount</th>
                       <th className="px-6 py-4 text-center font-black border-r border-slate-700">Given Date</th>
                       <th className="px-6 py-4 text-left font-black border-r border-slate-700">Purpose</th>
                       <th className="px-6 py-4 text-center font-black border-r border-slate-700">Status</th>
                       <th className="px-6 py-4 text-center font-black border-r border-slate-700">Ref No.</th>
                       <th className="px-6 py-4 text-left font-black border-r border-slate-700">Recorded By</th>
                       <th className="px-6 py-4 text-center font-black">Action</th>
                    </tr>
                 </thead>
                 <tbody>
                    <tr>
                       <td colSpan={9} className="py-20 text-center">
                          <div className="flex flex-col items-center gap-2 text-gray-400">
                             <FileText className="w-12 h-12 opacity-20" />
                             <p className="text-[11px] font-black uppercase tracking-[0.2em] opacity-40">No fund records found.</p>
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
