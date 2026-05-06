import React, { useState } from 'react';
import { 
  Search, Calendar, Layout, User, FileText, Filter, 
  ChevronDown, CreditCard, ArrowRight, BarChart3, TrendingUp, AlertCircle,
  Edit, ShoppingBag, Package, MapPin
} from 'lucide-react';

export function SingleItemSelling() {
  const [data] = useState([
    {
      id: 1,
      company: 'HOTEL NAWANAGAR RESIDENCY - OPERATED BY - KHUSHI HOSPITALITY',
      invoiceNo: 'NIL',
      item: 'COST OF LAUNDRY AND TEA CHARGES FROM 14.03.2026 TO 28.03.2026 (FOR 2 PERSON)',
      date: '',
      hsn: '0000-0',
      rate: '540.00',
      qty: '1.00',
      consumption: '0.00',
      balance: '1.00',
      location: '',
      address: ''
    },
    {
      id: 2,
      company: 'HOTEL NAWANAGAR RESIDENCY - OPERATED BY - KHUSHI HOSPITALITY',
      invoiceNo: 'NIL',
      item: 'COST OF TEA AND LAUNDRY CHARGES FROM 14.03.2025 TO 28.03.2026 (FOR 2 STAFF)',
      date: '',
      hsn: '0000-0',
      rate: '540.00',
      qty: '1.00',
      consumption: '0.00',
      balance: '1.00',
      location: '',
      address: ''
    },
    {
      id: 3,
      company: 'GUJRAT NON GST PURCHASE',
      invoiceNo: 'NIL',
      item: 'COST OF LUNCH FOR 5 LABOUR',
      date: '',
      hsn: '0000-0',
      rate: '60.00',
      qty: '5.00',
      consumption: '0.00',
      balance: '5.00',
      location: '',
      address: ''
    }
  ]);

  return (
    <div className="p-4 bg-[#f8f9fc] min-h-screen font-sans text-[11px]">
      {/* Filter Section */}
      <div className="bg-[#0061f2] p-3 rounded-lg shadow-md mb-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-3 flex items-center gap-2">
          <span className="bg-white/10 text-white text-[9px] font-black px-3 py-1 rounded-full border border-white/20 uppercase tracking-widest">
            Showing: 2026-2027 <span className="text-emerald-300">(Current FY)</span>
          </span>
        </div>
        <div className="mb-4 flex items-center gap-2">
          <Filter className="w-3.5 h-3.5 text-blue-100" />
          <h1 className="text-white font-black uppercase tracking-widest">Purchase Expenses Filter</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-8 gap-2 items-end">
          <div className="space-y-1">
            <select className="w-full bg-white text-gray-700 font-bold rounded px-2 py-2 focus:outline-none appearance-none">
              <option>2026-2027</option>
            </select>
          </div>
          <div className="space-y-1">
            <select className="w-full bg-white text-gray-700 font-bold rounded px-2 py-2 focus:outline-none appearance-none">
              <option>Month</option>
            </select>
          </div>
          <div className="relative">
            <input type="text" placeholder="mm/dd/yyyy" className="w-full bg-white text-gray-700 font-bold rounded px-2 py-2 focus:outline-none" />
            <Calendar className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-300" />
          </div>
          <div className="relative flex items-center gap-1">
            <span className="text-white font-black px-1 uppercase tracking-tighter">To</span>
            <div className="relative flex-1">
              <input type="text" placeholder="mm/dd/yyyy" className="w-full bg-white text-gray-700 font-bold rounded px-2 py-2 focus:outline-none" />
              <Calendar className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-300" />
            </div>
          </div>
          <input type="text" placeholder="Company Name" className="w-full bg-white text-gray-700 font-bold rounded px-2 py-2 focus:outline-none" />
          <input type="text" placeholder="Project Name" className="w-full bg-white text-gray-700 font-bold rounded px-2 py-2 focus:outline-none" />
          <select className="w-full bg-white text-gray-700 font-bold rounded px-2 py-2 focus:outline-none">
            <option>Select Post / Designa</option>
          </select>
          <button className="bg-[#1cc88a] text-white font-black rounded px-4 py-2 hover:bg-[#17a673] transition-colors uppercase tracking-[0.2em] flex items-center justify-center gap-1">
            <Search className="w-3.5 h-3.5" /> SEARCH
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-100 text-gray-500 uppercase tracking-tighter">
                <th className="px-4 py-5 text-left font-black border-r border-gray-100 w-[20%]">Company Name</th>
                <th className="px-3 py-5 text-center font-black border-r border-gray-100">Invoice No</th>
                <th className="px-4 py-5 text-left font-black border-r border-gray-100 w-[25%]">Item</th>
                <th className="px-3 py-5 text-center font-black border-r border-gray-100">Invoice date</th>
                <th className="px-3 py-5 text-center font-black border-r border-gray-100">HSN</th>
                <th className="px-3 py-5 text-right font-black border-r border-gray-100">Rate</th>
                <th className="px-3 py-5 text-center font-black border-r border-gray-100">Quantity</th>
                <th className="px-3 py-5 text-center font-black border-r border-gray-100">Consumption QTY</th>
                <th className="px-3 py-5 text-center font-black border-r border-gray-100">Balance QTY</th>
                <th className="px-3 py-5 text-center font-black border-r border-gray-100">Location</th>
                <th className="px-3 py-5 text-center font-black border-r border-gray-100">Address</th>
                <th className="px-3 py-5 text-center font-black">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {data.map((row, index) => (
                <tr key={index} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-4 py-5 border-r border-gray-50 font-bold text-gray-600 uppercase leading-tight">{row.company}</td>
                  <td className="px-3 py-5 border-r border-gray-50 text-center text-gray-400 font-bold">{row.invoiceNo}</td>
                  <td className="px-4 py-5 border-r border-gray-50 text-gray-500 leading-relaxed italic">{row.item}</td>
                  <td className="px-3 py-5 border-r border-gray-50 text-center text-gray-300">N/A</td>
                  <td className="px-3 py-5 border-r border-gray-50 text-center text-gray-500 font-bold tracking-widest">{row.hsn}</td>
                  <td className="px-3 py-5 border-r border-gray-50 text-right font-bold text-gray-600">{row.rate}</td>
                  <td className="px-3 py-5 border-r border-gray-50 text-center font-black text-gray-700">{row.qty}</td>
                  <td className="px-3 py-5 border-r border-gray-50 text-center">
                    <input 
                      type="text" 
                      defaultValue={row.consumption}
                      className="w-16 px-2 py-1 bg-white border border-indigo-200 rounded text-center text-indigo-600 font-black focus:outline-none focus:border-indigo-500 shadow-sm" 
                    />
                  </td>
                  <td className="px-3 py-5 border-r border-gray-50 text-center font-black text-emerald-600">{row.balance}</td>
                  <td className="px-3 py-5 border-r border-gray-50 text-center">
                    <MapPin className="w-3.5 h-3.5 text-gray-200 mx-auto" />
                  </td>
                  <td className="px-3 py-5 border-r border-gray-50 text-center">
                    <FileText className="w-3.5 h-3.5 text-gray-200 mx-auto" />
                  </td>
                  <td className="px-3 py-5">
                    <div className="flex justify-center">
                      <button className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors border border-blue-100 shadow-sm">
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-gray-50 flex justify-between items-center bg-white text-[10px] text-gray-400 font-bold uppercase tracking-widest">
          <div>Showing 1 to 3 of 3 entries</div>
          <div className="flex gap-2">
            <button className="hover:text-gray-600">Previous</button>
            <button className="w-6 h-6 bg-blue-600 text-white rounded flex items-center justify-center">1</button>
            <button className="hover:text-gray-600">Next</button>
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
