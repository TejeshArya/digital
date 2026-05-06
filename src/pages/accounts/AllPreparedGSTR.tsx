import React, { useState } from 'react';
import { 
  FileCheck, Search, Filter, RefreshCcw, 
  Eye, Download, Calendar, ArrowLeft, BarChart3
} from 'lucide-react';

export function AllPreparedGSTR() {
  const [data] = useState([
    {
      id: 1,
      gstType: 'GSTR-1',
      fy: '2026-2027',
      quarter: 'Quarter 1',
      preparedDate: '05 May 2026',
      totalInvoices: 4,
      totalAmount: '872,136.64',
      totalGst: '54,887.11',
      status: 'Prepared'
    }
  ]);

  return (
    <div className="p-4 bg-[#f8f9fc] min-h-screen font-sans">
      {/* Main Header */}
      <div className="bg-[#0061f2] p-4 rounded-t-lg shadow-md flex justify-between items-center mb-1">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-2 rounded-lg">
            <FileCheck className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-white font-black text-sm uppercase tracking-widest">All Prepared GSTR Reports</h1>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white/10 text-white text-[10px] font-black rounded uppercase hover:bg-white/20 transition-colors border border-white/20">
          <ArrowLeft className="w-4 h-4" /> Back to Preparation
        </button>
      </div>

      <div className="space-y-4 mt-4">
        {/* Filter Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-[#6b58d3] px-4 py-2 flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-white" />
            <h2 className="text-white font-black text-[10px] uppercase tracking-widest">Filter Reports</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
              <div className="space-y-2">
                <label className="text-[11px] font-black text-gray-400 uppercase tracking-tight">Financial Year</label>
                <select className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm font-bold text-gray-700 focus:outline-none">
                  <option>2026-2027</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-black text-gray-400 uppercase tracking-tight">Quarter</label>
                <select className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm font-bold text-gray-700 focus:outline-none">
                  <option>All Quarters</option>
                  <option>Quarter 1 (Apr-Jun)</option>
                </select>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 px-6 py-2.5 bg-[#0061f2] text-white text-[11px] font-black rounded-lg shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all uppercase tracking-widest flex items-center justify-center gap-2">
                  <Search className="w-4 h-4" /> Search
                </button>
                <button className="px-6 py-2.5 border-2 border-gray-100 text-gray-400 text-[11px] font-black rounded-lg hover:bg-gray-50 transition-all uppercase tracking-widest">
                  <RefreshCcw className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Reports Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto min-h-[400px]">
            <table className="w-full text-[10px] border-collapse">
              <thead>
                <tr className="bg-[#323c4e] text-white uppercase tracking-tighter">
                  <th className="px-6 py-5 text-left font-black border-r border-slate-600">GST Type</th>
                  <th className="px-6 py-5 text-center font-black border-r border-slate-600">Financial Year</th>
                  <th className="px-6 py-5 text-center font-black border-r border-slate-600">Quarter</th>
                  <th className="px-6 py-5 text-center font-black border-r border-slate-600">Prepared Date</th>
                  <th className="px-6 py-5 text-center font-black border-r border-slate-600">Total Invoices</th>
                  <th className="px-6 py-5 text-right font-black border-r border-slate-600">Taxable Amount</th>
                  <th className="px-6 py-5 text-right font-black border-r border-slate-600">GST Amount</th>
                  <th className="px-6 py-5 text-center font-black border-r border-slate-600">Status</th>
                  <th className="px-6 py-5 text-center font-black">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {data.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-5 border-r border-gray-50 font-black text-blue-600">{row.gstType}</td>
                    <td className="px-6 py-5 border-r border-gray-50 text-center font-bold text-gray-700">{row.fy}</td>
                    <td className="px-6 py-5 border-r border-gray-50 text-center font-bold text-gray-400">{row.quarter}</td>
                    <td className="px-6 py-5 border-r border-gray-50 text-center font-bold text-gray-400">{row.preparedDate}</td>
                    <td className="px-6 py-5 border-r border-gray-50 text-center font-black text-gray-700">{row.totalInvoices}</td>
                    <td className="px-6 py-5 border-r border-gray-50 text-right font-bold text-gray-600">₹{row.totalAmount}</td>
                    <td className="px-6 py-5 border-r border-gray-50 text-right font-black text-emerald-600">₹{row.totalGst}</td>
                    <td className="px-6 py-5 border-r border-gray-50 text-center">
                      <span className="bg-emerald-500 text-white text-[9px] font-black px-3 py-1 rounded-full uppercase shadow-sm">
                        {row.status}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex justify-center gap-2">
                        <button className="p-2 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition-colors shadow-sm border border-blue-100"><Eye className="w-3.5 h-3.5" /></button>
                        <button className="p-2 bg-emerald-50 text-emerald-600 rounded hover:bg-emerald-100 transition-colors shadow-sm border border-emerald-100"><Download className="w-3.5 h-3.5" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-[#1cc88a] px-4 py-2 flex items-center gap-2">
            <BarChart3 className="w-3.5 h-3.5 text-white" />
            <h2 className="text-white font-black text-[10px] uppercase tracking-widest">GSTR Filing Summary</h2>
          </div>
          <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-2">
              <div className="text-2xl font-black text-blue-600">1</div>
              <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total Reports Prepared</div>
            </div>
            <div className="text-center space-y-2 border-l border-gray-50">
              <div className="text-2xl font-black text-emerald-600">₹54,887.11</div>
              <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total GST Claimed</div>
            </div>
            <div className="text-center space-y-2 border-l border-gray-50">
              <div className="text-2xl font-black text-orange-500">₹872,136.64</div>
              <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total Taxable Value</div>
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
