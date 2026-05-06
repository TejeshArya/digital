import React, { useState } from 'react';
import { 
  FileText, Search, Filter, RefreshCcw, CheckCircle2, 
  Clock, Eye, FilePlus, ChevronDown, Building2, Layout
} from 'lucide-react';

export function PrepareGSTR() {
  const [selectedInvoices, setSelectedInvoices] = useState<number[]>([]);
  const [invoices] = useState([
    {
      id: 1,
      client: 'FLEET MAINTENANCE UNIT VISAKHAPATNAM',
      invoiceNo: 'DEE2627104',
      date: '02 Apr 2026',
      amount: '231,860.00',
      gst: '11,593.00',
      total: '243,453.00',
      payAmount: '0.00',
      status: 'Pending'
    },
    {
      id: 2,
      client: 'FLEET MAINTENANCE UNIT VISAKHAPATNAM',
      invoiceNo: 'DEE2627103',
      date: '01 May 2026',
      amount: '138,214.24',
      gst: '6,910.71',
      total: '145,124.95',
      payAmount: '0.00',
      status: 'Pending'
    },
    {
      id: 3,
      client: 'FLEET MAINTENANCE UNIT VISAKHAPATNAM',
      invoiceNo: 'DEE2627102',
      date: '02 Apr 2026',
      amount: '138,214.24',
      gst: '6,910.71',
      total: '145,124.95',
      payAmount: '0.00',
      status: 'Pending'
    },
    {
      id: 4,
      client: 'THE ADMIRAL SUPERINTENDANT OF NAVAL DOCKYARD (VISAKHAPATNAM)',
      invoiceNo: 'DEE2627101',
      date: '01 Apr 2026',
      amount: '363,808.00',
      gst: '18,190.40',
      total: '381,998.40',
      payAmount: '0.00',
      status: 'Pending'
    }
  ]);

  const toggleSelect = (id: number) => {
    setSelectedInvoices(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="p-4 bg-[#f8f9fc] min-h-screen font-sans">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-[#0061f2] font-black text-xl uppercase tracking-widest flex items-center gap-2">
            <FileText className="w-6 h-6" /> GSTR Preparation
          </h1>
          <p className="text-gray-400 text-[10px] font-bold uppercase tracking-tight mt-1">Select invoices and prepare GSTR reports</p>
        </div>
        <div className="bg-cyan-500 text-white text-[10px] font-black px-4 py-2 rounded-full shadow-lg shadow-cyan-100 uppercase tracking-widest">
          4 Invoices Found
        </div>
      </div>

      <div className="space-y-4">
        {/* Filter Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-[#6b58d3] px-4 py-2.5 flex items-center gap-2">
            <Filter className="w-4 h-4 text-white" />
            <h2 className="text-white font-black text-[11px] uppercase tracking-widest">Filter Options</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-tight flex items-center gap-1">
                  <Layout className="w-3 h-3" /> GST Type
                </label>
                <select className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm font-bold text-gray-700 focus:outline-none">
                  <option>All GST Types</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-tight flex items-center gap-1">
                  <FileText className="w-3 h-3" /> Financial Year
                </label>
                <select className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm font-bold text-gray-700 focus:outline-none">
                  <option>2026-2027</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-tight flex items-center gap-1">
                  <Clock className="w-3 h-3" /> Quarter
                </label>
                <select className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm font-bold text-gray-700 focus:outline-none">
                  <option>Quarter 1 (Apr-Jun) - Available</option>
                </select>
              </div>
              <button className="px-6 py-2.5 border-2 border-blue-100 text-blue-500 text-[11px] font-black rounded-lg hover:bg-blue-50 transition-all uppercase tracking-widest flex items-center justify-center gap-2">
                <RefreshCcw className="w-4 h-4" /> Clear Filters
              </button>
            </div>
          </div>
        </div>

        {/* Invoice List Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-8">
          <div className="p-4 border-b border-gray-50 flex justify-between items-center bg-gray-50/30">
            <h2 className="text-[12px] font-black text-gray-700 uppercase tracking-widest flex items-center gap-2">
              <FilePlus className="w-4 h-4 text-blue-500" /> Invoice List
            </h2>
            <div className="flex items-center gap-3">
              <div className="bg-emerald-500 text-white text-[9px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest shadow-lg shadow-emerald-100">
                {selectedInvoices.length} Selected
              </div>
              <button className="bg-[#6b58d3] text-white text-[11px] font-black px-6 py-2 rounded shadow-lg shadow-purple-100 hover:bg-purple-700 transition-all uppercase tracking-[0.1em] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> Create Draft
              </button>
            </div>
          </div>

          <div className="overflow-x-auto min-h-[400px]">
            <table className="w-full text-[10px] border-collapse">
              <thead>
                <tr className="bg-[#323c4e] text-white uppercase tracking-tighter">
                  <th className="px-4 py-5 text-center border-r border-slate-600">
                    <input type="checkbox" className="w-4 h-4 rounded border-slate-500" />
                  </th>
                  <th className="px-4 py-5 text-left font-black border-r border-slate-600">Client Name</th>
                  <th className="px-4 py-5 text-center font-black border-r border-slate-600">Invoice No</th>
                  <th className="px-4 py-5 text-center font-black border-r border-slate-600">Invoice Date</th>
                  <th className="px-4 py-5 text-right font-black border-r border-slate-600">Amount</th>
                  <th className="px-4 py-5 text-right font-black border-r border-slate-600">GST Amount</th>
                  <th className="px-4 py-5 text-right font-black border-r border-slate-600">Total Amount</th>
                  <th className="px-4 py-5 text-right font-black border-r border-slate-600">Pay Amount</th>
                  <th className="px-4 py-5 text-center font-black border-r border-slate-600">Status</th>
                  <th className="px-4 py-5 text-center font-black">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {invoices.map((inv) => (
                  <tr key={inv.id} className={`hover:bg-gray-50 transition-colors ${selectedInvoices.includes(inv.id) ? 'bg-blue-50/30' : ''}`}>
                    <td className="px-4 py-5 text-center border-r border-gray-50">
                      <input 
                        type="checkbox" 
                        checked={selectedInvoices.includes(inv.id)}
                        onChange={() => toggleSelect(inv.id)}
                        className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" 
                      />
                    </td>
                    <td className="px-4 py-5 border-r border-gray-50">
                      <div className="flex items-center gap-3">
                        <div className="bg-blue-600 p-2 rounded shadow-sm">
                          <Building2 className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-bold text-gray-700 uppercase leading-tight max-w-[240px]">{inv.client}</span>
                      </div>
                    </td>
                    <td className="px-4 py-5 border-r border-gray-50 text-center">
                      <span className="bg-cyan-400 text-white text-[9px] font-black px-2 py-0.5 rounded shadow-sm">
                        {inv.invoiceNo}
                      </span>
                    </td>
                    <td className="px-4 py-5 border-r border-gray-50 text-center font-bold text-gray-400">{inv.date}</td>
                    <td className="px-4 py-5 border-r border-gray-50 text-right font-bold text-gray-600">₹{inv.amount}</td>
                    <td className="px-4 py-5 border-r border-gray-50 text-right font-black text-emerald-600">₹{inv.gst}</td>
                    <td className="px-4 py-5 border-r border-gray-50 text-right font-black text-blue-600">₹{inv.total}</td>
                    <td className="px-4 py-5 border-r border-gray-50 text-right font-bold text-amber-500">₹{inv.payAmount}</td>
                    <td className="px-4 py-5 border-r border-gray-50 text-center">
                      <span className="bg-[#6b58d3] text-white text-[9px] font-black px-3 py-1 rounded-full uppercase shadow-sm">
                        {inv.status}
                      </span>
                    </td>
                    <td className="px-4 py-5 text-center">
                      <button className="px-4 py-1.5 border border-blue-200 text-blue-600 text-[9px] font-black rounded hover:bg-blue-50 transition-all uppercase tracking-widest flex items-center gap-1 mx-auto">
                        <Eye className="w-3 h-3" /> View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center text-[10px] text-gray-400 font-bold tracking-[0.2em] uppercase">
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
