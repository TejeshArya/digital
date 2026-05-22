import React, { useState } from 'react';
import { 
  Plus, Edit3, Trash2, Search, 
  Filter, MoreVertical, DollarSign,
  List, Save, FileText, Clock, User
} from 'lucide-react';

export function AmountType() {
  const [types] = useState([
    { id: 2, type: 'CREDIT', desc: 'ALL AMOUNT WHICH IS TO BE RECEIVED FROM ANY ONE', by: '2', date: '23-12-2025 13:58' },
    { id: 1, type: 'DEBIT', desc: 'ALL AMOUNT WHICH IS TO BE PAID', by: '2', date: '23-12-2025 13:58' },
  ]);

  return (
    <div className="p-4 bg-[#f8f9fc] min-h-screen font-sans">
      <div className="max-w-[1600px] mx-auto space-y-8">
        {/* Form Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-[#0061f2] px-8 py-4 flex items-center gap-2">
             <Plus className="w-4 h-4 text-white" />
             <h2 className="text-white text-[12px] font-black uppercase tracking-widest">Add Amount Type</h2>
          </div>
          <div className="p-8 space-y-6">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                   <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Amount Type <span className="text-rose-500">*</span></label>
                   <input type="text" className="w-full px-4 py-3 bg-white border border-gray-100 rounded-lg text-[13px] font-bold text-gray-700 focus:outline-none focus:border-blue-400 transition-all shadow-inner" />
                </div>
                <div className="space-y-2">
                   <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Description</label>
                   <textarea rows={1} className="w-full px-4 py-3 bg-white border border-gray-100 rounded-lg text-[13px] font-bold text-gray-700 focus:outline-none focus:border-blue-400 transition-all shadow-inner resize-none"></textarea>
                </div>
             </div>
             <div className="flex justify-start">
                <button className="px-10 py-3.5 bg-[#0061f2] text-white text-[11px] font-black rounded shadow-lg shadow-blue-100 uppercase tracking-widest hover:bg-blue-700 transition-all flex items-center gap-2">
                   <Save className="w-4 h-4" /> Save Amount Type
                </button>
             </div>
          </div>
        </div>

        {/* Data List Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
           <div className="bg-[#1cc88a] px-8 py-4 flex items-center gap-2">
              <List className="w-4 h-4 text-white" />
              <h2 className="text-white text-[12px] font-black uppercase tracking-widest">Amount Types List</h2>
           </div>
           <div className="overflow-x-auto">
              <table className="w-full text-[11px] border-collapse">
                 <thead>
                    <tr className="bg-[#1a202c] text-white uppercase tracking-widest font-black">
                       <th className="px-6 py-4 text-left w-16">ID</th>
                       <th className="px-6 py-4 text-left">Amount Type</th>
                       <th className="px-6 py-4 text-left">Description</th>
                       <th className="px-6 py-4 text-left">Created By</th>
                       <th className="px-6 py-4 text-left">Created Date</th>
                       <th className="px-6 py-4 text-center">Actions</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-gray-50">
                    {types.map((item, idx) => (
                      <tr key={idx} className="hover:bg-gray-50/50 transition-colors group">
                         <td className="px-6 py-4 font-bold text-gray-400">{item.id}</td>
                         <td className="px-6 py-4 font-black text-gray-600 uppercase tracking-tight">{item.type}</td>
                         <td className="px-6 py-4 font-bold text-gray-400 uppercase tracking-tight">{item.desc}</td>
                         <td className="px-6 py-4 font-bold text-gray-400">{item.by}</td>
                         <td className="px-6 py-4 font-bold text-gray-400 tracking-tighter whitespace-nowrap">{item.date}</td>
                         <td className="px-6 py-4 text-center">
                            <div className="flex gap-2 justify-center">
                               <button className="px-4 py-1.5 bg-[#0061f2] text-white rounded text-[9px] font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-sm flex items-center gap-1">
                                  <Edit3 className="w-3 h-3" /> Edit
                               </button>
                               <button className="px-4 py-1.5 bg-[#e74a3b] text-white rounded text-[9px] font-black uppercase tracking-widest hover:bg-red-700 transition-all shadow-sm flex items-center gap-1">
                                  <Trash2 className="w-3 h-3" /> Delete
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
        <p>Copyright &copy; Digital New Enterprises 2024</p>
        <div className="flex gap-4">
          <a href="#" className="hover:underline transition-colors hover:text-gray-600 lowercase italic tracking-tight">privacy policy</a>
          <span>•</span>
          <a href="#" className="hover:underline transition-colors hover:text-gray-600 lowercase italic tracking-tight">terms & conditions</a>
        </div>
      </div>
    </div>
  );
}
