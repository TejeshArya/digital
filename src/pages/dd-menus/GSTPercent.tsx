import React, { useState } from 'react';
import { 
  Plus, Edit3, Trash2, Search, 
  Filter, MoreVertical, Percent,
  FileText, Clock
} from 'lucide-react';

export function GSTPercent() {
  const [gstRates] = useState([
    { rate: '0', desc: 'NON GST', date: '13-03-2026' },
    { rate: '5', desc: 'GST RATE', date: '24-12-2025' },
    { rate: '12', desc: 'GST RATE', date: '24-12-2025' },
    { rate: '18', desc: 'GST RATE', date: '23-12-2025' },
  ]);

  return (
    <div className="p-4 bg-[#f8f9fc] min-h-screen font-sans">
      <div className="max-w-[1600px] mx-auto space-y-8">
        {/* GST Form Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-[#0061f2] px-8 py-5">
             <h2 className="text-white text-[12px] font-black uppercase tracking-widest">GST</h2>
          </div>
          <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8 items-end">
             <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">GST Percentage</label>
                <input type="text" className="w-full px-4 py-3 bg-white border border-gray-100 rounded-lg text-[13px] font-bold text-gray-700 focus:outline-none focus:border-blue-400 transition-all shadow-inner" />
             </div>
             <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Description</label>
                <input type="text" className="w-full px-4 py-3 bg-white border border-gray-100 rounded-lg text-[13px] font-bold text-gray-700 focus:outline-none focus:border-blue-400 transition-all shadow-inner" />
             </div>
             <button className="px-12 py-3.5 bg-[#0061f2] text-white text-[11px] font-black rounded shadow-lg shadow-blue-100 uppercase tracking-widest hover:bg-blue-700 transition-all">
                Save GST
             </button>
          </div>
        </div>

        {/* GST Data Grid */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden min-h-[600px]">
           <div className="overflow-x-auto">
              <table className="w-full text-[11px] border-collapse">
                 <thead>
                    <tr className="bg-white text-gray-400 uppercase tracking-widest border-b border-gray-100 font-black">
                       <th className="px-8 py-5 text-left border-r border-gray-50">GST Percentage</th>
                       <th className="px-8 py-5 text-left border-r border-gray-50">Description</th>
                       <th className="px-8 py-5 text-left border-r border-gray-50">Created At</th>
                       <th className="px-8 py-5 text-center">Actions</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-gray-50">
                    {gstRates.map((item, idx) => (
                      <tr key={idx} className="hover:bg-gray-50/50 transition-colors group">
                         <td className="px-8 py-4 border-r border-gray-50 font-black text-gray-600 uppercase tracking-tight">{item.rate}</td>
                         <td className="px-8 py-4 border-r border-gray-50 font-bold text-gray-400 uppercase tracking-tight">{item.desc}</td>
                         <td className="px-8 py-4 border-r border-gray-50 font-bold text-gray-400 tracking-tighter whitespace-nowrap">{item.date}</td>
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

      {/* Footer */}
      <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center text-[10px] text-gray-400 font-bold tracking-[0.2em] uppercase px-4">
        <p>Copyright &copy; Digital New Enterprises 2024</p>
        <div className="flex gap-4">
          <a href="#" className="hover:underline transition-colors hover:text-gray-600">Privacy Policy</a>
          <span>•</span>
          <a href="#" className="hover:underline transition-colors hover:text-gray-600">Terms & Conditions</a>
        </div>
      </div>
    </div>
  );
}
