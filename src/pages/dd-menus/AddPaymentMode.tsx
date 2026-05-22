import React, { useState } from 'react';
import { 
  CreditCard, Wallet, Plus, Search, 
  Filter, Edit3, Trash2, Save, FileText, 
  Info, History, ArrowRight, X, RotateCcw,
  Settings, CheckCircle2, List, Clock
} from 'lucide-react';

export function AddPaymentMode() {
  const [paymentModes] = useState([
    { mode: 'GPay', desc: 'GPay', created: '2026-03-27 20:44:27' },
    { mode: 'Online Transfer', desc: 'Online Transfer', created: '2026-03-27 20:43:51' },
    { mode: 'Cheque Payment', desc: 'Cheque Payment', created: '2026-03-27 20:43:30' },
    { mode: 'Cash Payment', desc: 'Cash Payment', created: '2026-03-27 20:43:16' },
    { mode: 'PhonePe', desc: 'PhonePe', created: '2026-03-27 20:43:01' },
  ]);

  return (
    <div className="p-4 bg-[#f8f9fc] min-h-screen font-sans">
      <div className="max-w-[1600px] mx-auto space-y-8">
        {/* Input Form Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-[#0061f2] px-8 py-4">
             <h2 className="text-white text-[12px] font-black uppercase tracking-widest">Add Payment Mode</h2>
          </div>
          <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
             <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Payment Mode</label>
                <input type="text" className="w-full px-4 py-3 bg-white border border-gray-100 rounded-lg text-[13px] font-bold text-gray-700 focus:outline-none focus:border-blue-400 transition-all" />
             </div>
             <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Description</label>
                <input type="text" className="w-full px-4 py-3 bg-white border border-gray-100 rounded-lg text-[13px] font-bold text-gray-700 focus:outline-none focus:border-blue-400 transition-all" />
             </div>
             <button className="px-12 py-3.5 bg-[#0061f2] text-white text-[11px] font-black rounded shadow-lg shadow-blue-100 uppercase tracking-widest hover:bg-blue-700 transition-all">
                Save
             </button>
          </div>
        </div>

        {/* Data Table Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden min-h-[600px]">
           <div className="overflow-x-auto">
              <table className="w-full text-[11px] border-collapse">
                 <thead>
                    <tr className="bg-white text-gray-400 uppercase tracking-widest border-b border-gray-100">
                       <th className="px-8 py-6 text-left font-black border-r border-gray-50">Payment Mode</th>
                       <th className="px-8 py-6 text-left font-black border-r border-gray-50">Description</th>
                       <th className="px-8 py-6 text-left font-black border-r border-gray-50">Created Date</th>
                       <th className="px-8 py-6 text-center font-black">Actions</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-gray-50">
                    {paymentModes.map((item, idx) => (
                      <tr key={idx} className="hover:bg-gray-50/50 transition-colors group">
                         <td className="px-8 py-5 border-r border-gray-50 font-black text-gray-600 uppercase tracking-tight">{item.mode}</td>
                         <td className="px-8 py-5 border-r border-gray-50 font-bold text-gray-400 uppercase tracking-tight">{item.desc}</td>
                         <td className="px-8 py-5 border-r border-gray-50 font-bold text-gray-400 tracking-tighter whitespace-nowrap">{item.created}</td>
                         <td className="px-8 py-5 text-center">
                            <div className="flex gap-2 justify-center">
                               <button className="p-2 border border-blue-400 text-blue-500 rounded hover:bg-blue-500 hover:text-white transition-all">
                                  <Edit3 className="w-3.5 h-3.5" />
                               </button>
                               <button className="p-2 border border-red-400 text-red-500 rounded hover:bg-red-500 hover:text-white transition-all">
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
