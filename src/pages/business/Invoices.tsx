import React, { useState } from 'react';
import { 
  Search, Calendar, Layout, User, FileText, Filter, 
  ChevronDown, CreditCard, ArrowRight, BarChart3, TrendingUp, AlertCircle,
  Printer, ShieldCheck, DollarSign, Info
} from 'lucide-react';

export function Invoices() {
  const [data] = useState([]);

  return (
    <div className="p-4 bg-[#f8f9fc] min-h-screen font-sans">
      {/* Filter Section */}
      <div className="bg-[#0061f2] p-3 rounded-lg shadow-md mb-6 flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <select className="bg-white text-gray-700 text-[11px] font-bold rounded px-4 py-2 focus:outline-none appearance-none cursor-pointer">
            <option>2026-2027</option>
          </select>
        </div>
        
        <div className="flex items-center gap-3">
          <span className="text-white font-black text-[11px] uppercase tracking-tighter">From</span>
          <div className="relative">
            <input type="text" placeholder="mm/dd/yyyy" className="bg-white text-gray-700 text-[11px] font-bold rounded px-4 py-2 focus:outline-none w-40" />
            <Calendar className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-300" />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-white font-black text-[11px] uppercase tracking-tighter">To</span>
          <div className="relative">
            <input type="text" placeholder="mm/dd/yyyy" className="bg-white text-gray-700 text-[11px] font-bold rounded px-4 py-2 focus:outline-none w-40" />
            <Calendar className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-300" />
          </div>
        </div>

        <button className="bg-white text-gray-600 text-[11px] font-black rounded px-6 py-2 hover:bg-gray-50 transition-colors uppercase tracking-widest border border-gray-100 shadow-sm ml-auto md:ml-0">
          Search
        </button>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-8">
        <div className="overflow-x-auto min-h-[400px]">
          <table className="w-full text-[10px] border-collapse">
            <thead>
              <tr className="bg-[#323c4e] text-white uppercase tracking-tighter">
                <th className="px-3 py-5 text-left font-black border-r border-slate-600">Client Name</th>
                <th className="px-3 py-5 text-center font-black border-r border-slate-600">Invoice No</th>
                <th className="px-3 py-5 text-center font-black border-r border-slate-600">Invoice Date</th>
                <th className="px-3 py-4 text-center font-black border-r border-slate-600">Wing</th>
                <th className="px-3 py-4 text-center font-black border-r border-slate-600">Department</th>
                <th className="px-3 py-4 text-center font-black border-r border-slate-600">Post</th>
                <th className="px-3 py-4 text-left font-black border-r border-slate-600">Created By</th>
                <th className="px-3 py-4 text-right font-black border-r border-slate-600">Amount</th>
                <th className="px-3 py-4 text-right font-black border-r border-slate-600">GST Amount</th>
                <th className="px-3 py-4 text-right font-black border-r border-slate-600">Total Amount</th>
                <th className="px-3 py-4 text-center font-black border-r border-slate-600">Payment</th>
                <th className="px-3 py-4 text-right font-black border-r border-slate-600">Paid Amount</th>
                <th className="px-3 py-4 text-center font-black border-r border-slate-600">Print</th>
                <th className="px-3 py-4 text-center font-black">Warranty</th>
              </tr>
            </thead>
            <tbody>
              {data.length === 0 ? (
                <tr>
                  <td colSpan={14} className="px-4 py-24 text-center bg-gray-50/20">
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center border border-gray-100">
                        <Info className="w-6 h-6 text-blue-400" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest">No invoices found for the selected criteria</p>
                        <p className="text-[10px] text-gray-300 font-medium italic">Try adjusting the financial year or date range filters</p>
                      </div>
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

      {/* Summary Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-8">
        <div className="bg-[#1cc88a] p-4 flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-white" />
          <h2 className="text-white font-black text-[11px] uppercase tracking-widest flex items-center gap-2">
            Financial Year Summary <span className="opacity-70">(2026-2027)</span>
          </h2>
        </div>
        <div className="p-10 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center space-y-3">
            <div className="text-2xl font-black text-blue-600">₹0.00</div>
            <div className="text-[9px] font-black text-gray-400 uppercase tracking-[0.3em]">Total GST Amount</div>
          </div>
          <div className="text-center space-y-3 border-l border-gray-50">
            <div className="text-2xl font-black text-emerald-600">₹0.00</div>
            <div className="text-[9px] font-black text-gray-400 uppercase tracking-[0.3em]">Total Sell Amount</div>
          </div>
          <div className="text-center space-y-3 border-l border-gray-50">
            <div className="text-2xl font-black text-blue-500">₹0.00</div>
            <div className="text-[9px] font-black text-gray-400 uppercase tracking-[0.3em]">Total Paid Amount</div>
          </div>
          <div className="text-center space-y-3 border-l border-gray-50">
            <div className="text-2xl font-black text-orange-500">₹0.00</div>
            <div className="text-[9px] font-black text-gray-400 uppercase tracking-[0.3em]">Total Due Amount</div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center text-[10px] text-gray-400 font-bold tracking-[0.2em] uppercase">
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
