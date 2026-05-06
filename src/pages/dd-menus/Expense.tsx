import React, { useState } from 'react';
import { 
  Plus, Edit3, Trash2, Search, 
  Filter, MoreVertical, Wallet,
  PieChart, FileText, Clock
} from 'lucide-react';

export function Expense() {
  const [expenses] = useState([
    { name: 'TRANSPOTATIONS ON GOODS', desc: 'TRANSPOTATIONS ON GOODS', date: '2026-04-07 14:03:56' },
    { name: 'FREIGHT ON GOODS', desc: 'FREIGHT ON GOODS', date: '2026-04-07 14:03:40' },
    { name: 'GOODS', desc: 'GOOD', date: '2026-04-07 14:03:14' },
    { name: 'SERVICES', desc: 'SERVICES', date: '2026-01-01 11:58:07' },
    { name: 'WORKS', desc: 'SUPPLY AND SERVICES', date: '2026-01-01 11:57:54' },
    { name: 'SUPPLY OF ITEMS', desc: 'SUPPLY OF ITEMS', date: '2026-01-01 11:57:42' },
  ]);

  return (
    <div className="p-4 bg-[#f8f9fc] min-h-screen font-sans">
      <div className="max-w-[1600px] mx-auto space-y-8">
        {/* Form Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-[#0061f2] px-8 py-4 flex gap-6">
             <label className="flex items-center gap-2 cursor-pointer group">
                <input type="radio" name="exp-type" className="w-4 h-4 accent-white" defaultChecked />
                <span className="text-white text-[11px] font-black uppercase tracking-widest">Direct Expense</span>
             </label>
             <label className="flex items-center gap-2 cursor-pointer group opacity-60 hover:opacity-100 transition-opacity">
                <input type="radio" name="exp-type" className="w-4 h-4 accent-white" />
                <span className="text-white text-[11px] font-black uppercase tracking-widest">Indirect Expense</span>
             </label>
          </div>
          <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
             <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Expense Name</label>
                <input type="text" placeholder="Expense Name" className="w-full px-4 py-3 bg-white border border-gray-100 rounded-lg text-[13px] font-bold text-gray-700 focus:outline-none focus:border-blue-400 transition-all shadow-inner" />
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

        {/* Data Grid */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden min-h-[600px]">
           <div className="overflow-x-auto">
              <table className="w-full text-[11px] border-collapse">
                 <thead>
                    <tr className="bg-white text-gray-400 uppercase tracking-widest border-b border-gray-100 font-black">
                       <th className="px-8 py-5 text-left border-r border-gray-50">Expense Name</th>
                       <th className="px-8 py-5 text-left border-r border-gray-50">Description</th>
                       <th className="px-8 py-5 text-left border-r border-gray-50">Created Date</th>
                       <th className="px-8 py-5 text-center">Actions</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-gray-50">
                    {expenses.map((item, idx) => (
                      <tr key={idx} className="hover:bg-gray-50/50 transition-colors group">
                         <td className="px-8 py-4 border-r border-gray-50 font-black text-gray-600 uppercase tracking-tight">{item.name}</td>
                         <td className="px-8 py-4 border-r border-gray-50 font-bold text-gray-400 uppercase tracking-tight">{item.desc}</td>
                         <td className="px-8 py-4 border-r border-gray-50 font-bold text-gray-400 tracking-tighter whitespace-nowrap">{item.date}</td>
                         <td className="px-8 py-4 text-center">
                            <div className="flex gap-2 justify-center">
                               <button className="px-4 py-1.5 bg-[#36b9cc] text-white rounded text-[9px] font-black uppercase tracking-widest hover:bg-[#2c9faf] transition-all shadow-sm">
                                  Edit
                               </button>
                               <button className="px-4 py-1.5 bg-[#e74a3b] text-white rounded text-[9px] font-black uppercase tracking-widest hover:bg-[#be3827] transition-all shadow-sm">
                                  Delete
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

      {/* Footer */}
      <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center text-[10px] text-gray-400 font-bold tracking-[0.2em] uppercase px-4">
        <p>Copyright © Your Website 2021</p>
        <div className="flex gap-4">
          <a href="#" className="hover:underline transition-colors hover:text-gray-600">Privacy Policy</a>
          <span>•</span>
          <a href="#" className="hover:underline transition-colors hover:text-gray-600">Terms & Conditions</a>
        </div>
      </div>
    </div>
  );
}
