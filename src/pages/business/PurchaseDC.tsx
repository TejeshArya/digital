import React, { useState } from 'react';
import { 
  Search, Calendar, Filter, FileText, Layout, 
  ChevronDown, ArrowRight, Eye, List, Clock, Package
} from 'lucide-react';

export function PurchaseDC() {
  const [data] = useState([]);

  return (
    <div className="p-4 bg-[#f8f9fc] min-h-screen font-sans">
      {/* Filter Section */}
      <div className="bg-[#0061f2] p-3 rounded-lg shadow-md mb-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-3 flex items-center gap-2">
          <span className="bg-white/10 text-white text-[9px] font-black px-3 py-1 rounded-full border border-white/20 uppercase tracking-widest">
            Showing: 2026-2027 <span className="text-emerald-300">(Current FY)</span>
          </span>
        </div>
        <div className="mb-4 flex items-center gap-2">
          <Filter className="w-3.5 h-3.5 text-blue-100" />
          <h1 className="text-white font-black text-[11px] uppercase tracking-widest">Purchase DC Filter</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-2 items-center">
          <select className="bg-white text-gray-700 text-[11px] font-bold rounded px-2 py-2 focus:outline-none appearance-none">
            <option>Financial Year</option>
            <option>2026-2027</option>
          </select>
          <input type="text" placeholder="Company Name" className="bg-white text-gray-700 text-[11px] font-bold rounded px-2 py-2 focus:outline-none" />
          <input type="text" placeholder="Project Name" className="bg-white text-gray-700 text-[11px] font-bold rounded px-2 py-2 focus:outline-none" />
          <div className="relative">
            <input type="text" placeholder="mm/dd/yyyy" className="w-full bg-white text-gray-700 text-[11px] font-bold rounded px-2 py-2 focus:outline-none" />
            <Calendar className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-300" />
          </div>
          <div className="relative flex items-center gap-1">
            <span className="text-white font-black px-1 uppercase tracking-tighter text-[10px]">To</span>
            <div className="relative flex-1">
              <input type="text" placeholder="mm/dd/yyyy" className="w-full bg-white text-gray-700 text-[11px] font-bold rounded px-2 py-2 focus:outline-none" />
              <Calendar className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-300" />
            </div>
          </div>
          <button className="bg-[#1cc88a] text-white text-[11px] font-black rounded px-4 py-2 hover:bg-[#17a673] transition-colors uppercase tracking-[0.2em] flex items-center justify-center gap-1">
            <Search className="w-3.5 h-3.5" /> SEARCH
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-50 flex flex-col md:flex-row justify-between items-center gap-4">
          <h2 className="text-[12px] font-black text-gray-700 uppercase tracking-widest flex items-center gap-2">
            <Package className="w-4 h-4 text-blue-500" /> Consumption Data
          </h2>
          <div className="flex gap-2">
            <button className="px-4 py-1.5 bg-[#1cc88a] text-white text-[10px] font-black rounded shadow-md hover:bg-[#17a673] transition-all uppercase tracking-widest flex items-center gap-2">
              <List className="w-3.5 h-3.5" /> View All Created DCs
            </button>
            <button className="px-4 py-1.5 bg-[#4e73df] text-white text-[10px] font-black rounded shadow-md hover:bg-[#2e59d9] transition-all uppercase tracking-widest flex items-center gap-2">
              <Clock className="w-3.5 h-3.5" /> View in Draft
            </button>
          </div>
        </div>

        <div className="overflow-x-auto min-h-[400px]">
          <table className="w-full text-[10px] border-collapse">
            <thead>
              <tr className="bg-[#323c4e] text-white uppercase tracking-tighter whitespace-nowrap">
                <th className="px-4 py-5 text-left font-black border-r border-slate-600">Company Name</th>
                <th className="px-4 py-5 text-left font-black border-r border-slate-600">Project Name</th>
                <th className="px-4 py-5 text-center font-black border-r border-slate-600">Project No</th>
                <th className="px-4 py-5 text-left font-black border-r border-slate-600">Description</th>
                <th className="px-4 py-5 text-center font-black border-r border-slate-600">Date</th>
                <th className="px-4 py-5 text-center font-black border-r border-slate-600">Wing</th>
                <th className="px-4 py-5 text-center font-black border-r border-slate-600">Department</th>
                <th className="px-4 py-5 text-center font-black border-r border-slate-600">Post</th>
                <th className="px-4 py-5 text-left font-black border-r border-slate-600">Created By</th>
                <th className="px-4 py-5 text-center font-black border-r border-slate-600">HSN Code</th>
                <th className="px-4 py-5 text-right font-black border-r border-slate-600">Rate</th>
                <th className="px-4 py-5 text-center font-black border-r border-slate-600">Quantity</th>
                <th className="px-4 py-5 text-center font-black border-r border-slate-600">Consumption Qty</th>
                <th className="px-4 py-5 text-center font-black border-r border-slate-600">Balance Qty</th>
                <th className="px-4 py-5 text-center font-black border-r border-slate-600">Location</th>
                <th className="px-4 py-5 text-center font-black border-r border-slate-600">Address</th>
                <th className="px-4 py-5 text-center font-black">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.length === 0 ? (
                <tr>
                  <td colSpan={17} className="px-4 py-20 text-center">
                    <div className="flex flex-col items-center gap-3 text-gray-300">
                      <Layout className="w-12 h-12 opacity-20" />
                      <p className="text-[11px] font-bold uppercase tracking-[0.2em] italic">No consumption data found</p>
                    </div>
                  </td>
                </tr>
              ) : (
                data.map((row, index) => (
                  <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                    {/* Data rows would go here */}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center text-[10px] text-gray-400 font-bold tracking-[0.2em] uppercase">
        <p>Copyright &copy; Digital New Enterprises 2024</p>
        <div className="flex gap-4">
          <a href="#" className="hover:underline">Privacy Policy</a>
          <span>•</span>
          <a href="#" className="hover:underline">Terms & Conditions</a>
        </div>
      </div>
    </div>
  );
}
