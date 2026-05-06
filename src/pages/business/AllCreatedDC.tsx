import React, { useState } from 'react';
import { 
  Search, Calendar, Filter, FileText, Layout, 
  ChevronDown, ArrowLeft, Eye, List, Clock, Package,
  RefreshCcw, FileCheck, BarChart3, TrendingUp
} from 'lucide-react';

export function AllCreatedDC() {
  const [data] = useState([]);

  return (
    <div className="p-4 bg-[#f8f9fc] min-h-screen font-sans">
      {/* Main Header */}
      <div className="bg-[#0061f2] p-4 rounded-t-lg shadow-md flex justify-between items-center mb-1">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-2 rounded-lg">
            <FileCheck className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-white font-black text-sm uppercase tracking-widest">All Created Delivery Challans - 2026-2027</h1>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white/10 text-white text-[10px] font-black rounded uppercase hover:bg-white/20 transition-colors border border-white/20">
          <ArrowLeft className="w-4 h-4" /> Back to DC Management
        </button>
      </div>

      <div className="space-y-4 mt-4">
        {/* Filter Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-[#00cfd5] px-4 py-2 flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-white" />
            <h2 className="text-white font-black text-[10px] uppercase tracking-widest">Filter by Financial Year</h2>
          </div>
          <div className="p-8">
            <div className="flex flex-col md:flex-row items-end gap-6">
              <div className="flex-1 space-y-2">
                <label className="text-[11px] font-black text-gray-400 uppercase tracking-tight">Select Financial Year:</label>
                <select className="w-full max-w-md px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-700 focus:outline-none appearance-none">
                  <option>2026-2027</option>
                </select>
              </div>
              <div className="flex gap-3">
                <button className="px-8 py-3 bg-[#0061f2] text-white text-[11px] font-black rounded-xl shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all uppercase tracking-widest flex items-center gap-2">
                  <Search className="w-4 h-4" /> Filter DCs
                </button>
                <button className="px-8 py-3 bg-[#6f42c1] text-white text-[11px] font-black rounded-xl shadow-lg shadow-purple-100 hover:bg-purple-700 transition-all uppercase tracking-widest flex items-center gap-2">
                  <RefreshCcw className="w-4 h-4" /> Reset
                </button>
              </div>
              <div className="ml-auto pb-3 text-[10px] text-gray-300 font-bold uppercase italic tracking-widest">
                Showing DCs for Financial Year: <span className="text-gray-500">2026-2027</span>
              </div>
            </div>
          </div>
        </div>

        {/* Records Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-[#00cfd5] px-4 py-2 flex items-center gap-2">
            <Layout className="w-3.5 h-3.5 text-white" />
            <h2 className="text-white font-black text-[10px] uppercase tracking-widest">Delivery Challan Records</h2>
          </div>
          <div className="p-4 flex flex-col md:flex-row justify-between items-center gap-4 border-b border-gray-50">
            <div className="flex items-center gap-2 text-[11px] text-gray-400 font-black uppercase">
              Show 
              <select className="border border-gray-100 rounded px-3 py-1 text-gray-600 font-bold">
                <option>25</option>
              </select>
              DCs per page
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-gray-300 font-black uppercase tracking-tight">Search DCs:</span>
              <input type="text" className="px-4 py-2 border border-gray-100 rounded-lg text-sm focus:outline-none focus:border-cyan-400 w-64" />
            </div>
          </div>
          <div className="overflow-x-auto min-h-[300px]">
            <table className="w-full text-[10px] border-collapse">
              <thead>
                <tr className="bg-[#323c4e] text-white uppercase tracking-tighter">
                  <th className="px-4 py-4 text-left font-black border-r border-slate-600 w-16">S.No</th>
                  <th className="px-4 py-4 text-left font-black border-r border-slate-600">DC Number</th>
                  <th className="px-4 py-4 text-center font-black border-r border-slate-600">Created Date</th>
                  <th className="px-4 py-4 text-right font-black border-r border-slate-600">Sub Total</th>
                  <th className="px-4 py-4 text-right font-black border-r border-slate-600">CGST</th>
                  <th className="px-4 py-4 text-right font-black border-r border-slate-600">SGST</th>
                  <th className="px-4 py-4 text-right font-black border-r border-slate-600">IGST</th>
                  <th className="px-4 py-4 text-right font-black border-r border-slate-600">Grand Total</th>
                  <th className="px-4 py-4 text-center font-black border-r border-slate-600">File Upload</th>
                  <th className="px-4 py-4 text-center font-black">Action</th>
                </tr>
              </thead>
              <tbody>
                {data.length === 0 ? (
                  <tr>
                    <td colSpan={10} className="px-4 py-20 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <FileText className="w-12 h-12 text-gray-100" />
                        <p className="text-[11px] font-black text-gray-200 uppercase tracking-[0.3em]">No DCs found</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  data.map((row, index) => (
                    <tr key={index}>
                      {/* Data rows would go here */}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className="p-4 border-t border-gray-50 flex justify-end gap-2 bg-gray-50/30">
            <button className="px-4 py-2 bg-white border border-gray-200 text-[10px] font-black text-gray-400 rounded-lg hover:text-gray-600 transition-colors uppercase tracking-widest">Previous</button>
            <button className="px-4 py-2 bg-white border border-gray-200 text-[10px] font-black text-gray-400 rounded-lg hover:text-gray-600 transition-colors uppercase tracking-widest">Next</button>
          </div>
        </div>

        {/* Summary Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-[#1cc88a] px-4 py-2 flex items-center gap-2">
            <BarChart3 className="w-3.5 h-3.5 text-white" />
            <h2 className="text-white font-black text-[10px] uppercase tracking-widest">Financial Year Summary - 2026-2027</h2>
          </div>
          <div className="p-8 grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center space-y-2">
              <div className="text-2xl font-black text-blue-600">0</div>
              <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total DCs Created</div>
            </div>
            <div className="text-center space-y-2 border-l border-gray-50">
              <div className="text-2xl font-black text-emerald-600">₹0.00</div>
              <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total Sub Amount</div>
            </div>
            <div className="text-center space-y-2 border-l border-gray-50">
              <div className="text-2xl font-black text-blue-500">₹0.00</div>
              <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total GST</div>
            </div>
            <div className="text-center space-y-2 border-l border-gray-50">
              <div className="text-2xl font-black text-orange-500">₹0.00</div>
              <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Grand Total</div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center text-[10px] text-gray-400 font-bold tracking-[0.2em] uppercase">
        <p>Copyright © Your Website 2021</p>
        <div className="flex gap-4">
          <a href="#" className="hover:underline">Privacy Policy</a>
          <span>•</span>
          <a href="#" className="hover:underline">Terms & Conditions</a>
        </div>
      </div>
    </div>
  );
}
