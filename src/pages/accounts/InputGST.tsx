import React, { useState } from 'react';
import { 
  Search, Calendar, Filter, FileText, Layout, 
  ChevronDown, CreditCard, Printer, Trash2, ArrowRight,
  BarChart3, CheckCircle2, DollarSign
} from 'lucide-react';

export function InputGST() {
  const [data] = useState([
    {
      id: 1,
      client: 'FLEET MAINTENANCE UNIT VISAKHAPATNAM',
      invoiceNo: 'DEE2627103',
      date: '2026-05-01',
      amount: '138,214.24',
      gst: '6,910.71',
      total: '145,124.95',
      paidInvoice: '0.00',
      paidGst: '0.00'
    },
    {
      id: 2,
      client: 'FLEET MAINTENANCE UNIT VISAKHAPATNAM',
      invoiceNo: 'DEE2627102',
      date: '2026-04-02',
      amount: '138,214.24',
      gst: '6,910.71',
      total: '145,124.95',
      paidInvoice: '0.00',
      paidGst: '0.00'
    },
    {
      id: 3,
      client: 'FLEET MAINTENANCE UNIT VISAKHAPATNAM',
      invoiceNo: 'DEE2627104',
      date: '2026-04-02',
      amount: '231,860.00',
      gst: '11,593.00',
      total: '243,453.00',
      paidInvoice: '0.00',
      paidGst: '0.00'
    },
    {
      id: 4,
      client: 'THE ADMIRAL SUPERINTENDANT OF NAVAL DOCKYARD (VISAKHAPATNAM)',
      invoiceNo: 'DEE2627101',
      date: '2026-04-01',
      amount: '363,808.00',
      gst: '18,190.40',
      total: '381,998.40',
      paidInvoice: '0.00',
      paidGst: '0.00'
    }
  ]);

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

      {/* Main Table Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-8">
        <div className="p-4 flex flex-col md:flex-row justify-between items-center gap-4 border-b border-gray-50">
          <div className="flex items-center gap-2 text-[11px] text-gray-400 font-black uppercase">
            Show 
            <select className="border border-gray-200 rounded px-2 py-1 text-gray-600 font-bold focus:outline-none">
              <option>10</option>
            </select>
            entries
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-gray-300 font-black uppercase tracking-tight">Search:</span>
            <input type="text" className="px-3 py-1.5 border border-gray-100 rounded text-sm focus:outline-none focus:border-blue-400 w-64" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-[10px] border-collapse">
            <thead>
              <tr className="bg-[#323c4e] text-white uppercase tracking-tighter">
                <th className="px-4 py-5 text-left font-black border-r border-slate-600">Client Name</th>
                <th className="px-4 py-5 text-center font-black border-r border-slate-600">Invoice No</th>
                <th className="px-4 py-5 text-center font-black border-r border-slate-600">Invoice Date</th>
                <th className="px-4 py-5 text-right font-black border-r border-slate-600">Amount</th>
                <th className="px-4 py-5 text-right font-black border-r border-slate-600">GST Amount</th>
                <th className="px-4 py-5 text-right font-black border-r border-slate-600">Total Amount</th>
                <th className="px-4 py-5 text-center font-black border-r border-slate-600">Payment</th>
                <th className="px-4 py-5 text-center font-black border-r border-slate-600">Invoice Paid</th>
                <th className="px-4 py-5 text-center font-black border-r border-slate-600">Input GST Paid</th>
                <th className="px-4 py-5 text-center font-black border-r border-slate-600">Print</th>
                <th className="px-4 py-5 text-center font-black">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {data.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-5 border-r border-gray-50 font-bold text-gray-700 uppercase leading-tight max-w-[200px]">{row.client}</td>
                  <td className="px-4 py-5 border-r border-gray-50 text-center font-bold text-gray-400">{row.invoiceNo}</td>
                  <td className="px-4 py-5 border-r border-gray-50 text-center font-bold text-gray-400">{row.date}</td>
                  <td className="px-4 py-5 border-r border-gray-50 text-right font-bold text-gray-600">{row.amount}</td>
                  <td className="px-4 py-5 border-r border-gray-50 text-right font-black text-emerald-600">{row.gst}</td>
                  <td className="px-4 py-5 border-r border-gray-50 text-right font-black text-blue-600">{row.total}</td>
                  <td className="px-4 py-5 border-r border-gray-50 text-center">
                    <button className="bg-[#1cc88a] text-white text-[9px] font-black px-4 py-1.5 rounded flex items-center justify-center gap-1 mx-auto hover:bg-[#17a673] transition-all shadow-sm">
                      <CreditCard className="w-3 h-3" /> PAY
                    </button>
                  </td>
                  <td className="px-4 py-5 border-r border-gray-50 text-center">
                    <input 
                      type="text" 
                      defaultValue={row.paidInvoice}
                      className="w-20 px-2 py-1.5 bg-white border border-blue-200 rounded text-center text-blue-600 font-black focus:outline-none shadow-sm" 
                    />
                  </td>
                  <td className="px-4 py-5 border-r border-gray-50 text-center">
                    <input 
                      type="text" 
                      defaultValue={row.paidGst}
                      className="w-20 px-2 py-1.5 bg-white border border-cyan-200 rounded text-center text-cyan-600 font-black focus:outline-none shadow-sm" 
                    />
                  </td>
                  <td className="px-4 py-5 border-r border-gray-50 text-center">
                    <button className="text-blue-500 font-bold hover:underline">Print</button>
                  </td>
                  <td className="px-4 py-5 text-center">
                    <button className="bg-rose-600 text-white text-[9px] font-black px-3 py-1.5 rounded flex items-center justify-center gap-1 mx-auto hover:bg-rose-700 transition-all shadow-sm">
                      <Trash2 className="w-3 h-3" /> DELETE
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-gray-50 flex justify-between items-center bg-white text-[10px] text-gray-400 font-bold uppercase tracking-widest">
          <div>Showing 1 to 4 of 4 entries</div>
          <div className="flex items-center gap-2">
            <button className="hover:text-gray-600">Previous</button>
            <button className="w-6 h-6 bg-blue-600 text-white rounded flex items-center justify-center shadow-lg shadow-blue-100">1</button>
            <button className="hover:text-gray-600">Next</button>
          </div>
        </div>
      </div>

      {/* Summary Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-8">
        <div className="bg-[#1cc88a] p-4 flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-white" />
          <h2 className="text-white font-black text-[11px] uppercase tracking-widest">Financial Year Summary (2026-2027)</h2>
        </div>
        <div className="p-10 grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="text-center space-y-3">
            <div className="text-2xl font-black text-blue-600">₹43,604.82</div>
            <div className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Total GST Amount</div>
          </div>
          <div className="text-center space-y-3 border-l border-gray-50">
            <div className="text-2xl font-black text-emerald-600">₹915,701.30</div>
            <div className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Total Sell Amount</div>
          </div>
          <div className="text-center space-y-3 border-l border-gray-50">
            <div className="text-2xl font-black text-blue-500">₹0.00</div>
            <div className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Total Invoice Paid</div>
          </div>
          <div className="text-center space-y-3 border-l border-gray-50">
            <div className="text-2xl font-black text-cyan-500">₹0.00</div>
            <div className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Total Input GST Paid</div>
          </div>
          <div className="text-center space-y-3 border-l border-gray-50">
            <div className="text-2xl font-black text-orange-500">₹915,701.30</div>
            <div className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Total Due Amount</div>
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
