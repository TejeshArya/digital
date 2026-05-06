import React, { useState } from 'react';
import { 
  Plus, Edit3, Trash2, Search, 
  Filter, MoreVertical, DollarSign,
  ChevronDown, FileText, Clock
} from 'lucide-react';

export function Amount() {
  const [amounts] = useState([
    { type: 'CREDIT', amount: '50000.00', desc: 'ADVANCE PAYMENT', date: '2026-04-10 11:20:00' },
    { type: 'DEBIT', amount: '12500.00', desc: 'OFFICE SUPPLIES', date: '2026-04-05 15:45:00' },
  ]);

  return (
    <div className="p-4 bg-[#f8f9fc] min-h-screen font-sans">
      <div className="max-w-[1600px] mx-auto space-y-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-[#0061f2] px-8 py-4">
             <h2 className="text-white text-[12px] font-black uppercase tracking-widest">Add Amount</h2>
          </div>
          <div className="p-8 grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
             <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Amount Type</label>
                <div className="relative">
                   <select className="w-full px-4 py-3 bg-white border border-gray-100 rounded-lg text-[13px] font-bold text-gray-700 focus:outline-none focus:border-blue-400 transition-all shadow-inner appearance-none">
                      <option>Select Type</option>
                      <option>CREDIT</option>
                      <option>DEBIT</option>
                   </select>
                   <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                </div>
             </div>
             <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Amount Value</label>
                <input type="number" placeholder="0.00" className="w-full px-4 py-3 bg-white border border-gray-100 rounded-lg text-[13px] font-bold text-gray-700 focus:outline-none focus:border-blue-400 transition-all shadow-inner" />
             </div>
             <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Description</label>
                <input type="text" placeholder="Description" className="w-full px-4 py-3 bg-white border border-gray-100 rounded-lg text-[13px] font-bold text-gray-700 focus:outline-none focus:border-blue-400 transition-all shadow-inner" />
             </div>
             <button className="px-12 py-3.5 bg-[#0061f2] text-white text-[11px] font-black rounded shadow-lg shadow-blue-100 uppercase tracking-widest hover:bg-blue-700 transition-all">
                Save
             </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden min-h-[600px]">
           <div className="overflow-x-auto">
              <table className="w-full text-[11px] border-collapse">
                 <thead>
                    <tr className="bg-white text-gray-400 uppercase tracking-widest border-b border-gray-100 font-black">
                       <th className="px-8 py-5 text-left border-r border-gray-50">Type</th>
                       <th className="px-8 py-5 text-right border-r border-gray-50">Amount</th>
                       <th className="px-8 py-5 text-left border-r border-gray-50">Description</th>
                       <th className="px-8 py-5 text-center">Actions</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-gray-50">
                    {amounts.map((item, idx) => (
                      <tr key={idx} className="hover:bg-gray-50/50 transition-colors group">
                         <td className="px-8 py-4 border-r border-gray-50">
                            <span className={`text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-tighter ${
                              item.type === 'CREDIT' ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'
                            }`}>
                               {item.type}
                            </span>
                         </td>
                         <td className="px-8 py-4 border-r border-gray-50 text-right font-black text-gray-700">
                            {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(Number(item.amount))}
                         </td>
                         <td className="px-8 py-4 border-r border-gray-50 font-bold text-gray-400 uppercase tracking-tight">{item.desc}</td>
                         <td className="px-8 py-4 text-center">
                            <div className="flex gap-2 justify-center">
                               <button className="p-2 border border-blue-400 text-blue-500 rounded hover:bg-blue-500 hover:text-white transition-all shadow-sm">
                                  <Edit3 className="w-3.5 h-3.5" />
                               </button>
                               <button className="p-2 border border-red-400 text-red-500 rounded hover:bg-red-500 hover:text-white transition-all shadow-sm">
                                  <Trash2 className="w-3.5 h-3.5" />
                               </button>
                            </div>
                         </td>
                      </tr>
                    ))}
                 </tbody>
              </table>
           </div>
        </div>
      </div>
    </div>
  );
}
