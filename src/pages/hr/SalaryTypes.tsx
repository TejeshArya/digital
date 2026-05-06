import React, { useState } from 'react';
import { 
  Plus, Search, Filter, Save, FileText, 
  Settings, DollarSign, List, Info, 
  CheckCircle2, XCircle, AlertCircle,
  ToggleLeft, ToggleRight, ArrowRight,
  ShieldCheck, Briefcase
} from 'lucide-react';

export function SalaryTypes() {
  const [salaryTypes] = useState([
    { active: true, type: 'Debit', name: 'EPF-EMPLOYEE CONTRIBUTION', desc: '---' },
    { active: true, type: 'Debit', name: 'ESIC-EMPLOYEE CONTRIBUTION', desc: '---' },
    { active: true, type: 'Debit', name: 'PROFESSIONAL TAX', desc: '---' },
    { active: true, type: 'Debit', name: 'SALARY ADVANCE', desc: '---' },
    { active: true, type: 'Debit', name: 'TDS', desc: '---' },
    { active: true, type: 'Credit', name: 'CONVEYANCE', desc: '---' },
    { active: true, type: 'Credit', name: 'FOODING ALLOWANCE', desc: '---' },
    { active: true, type: 'Credit', name: 'HRA', desc: '---' },
    { active: true, type: 'Credit', name: 'MEDICAL', desc: '---' },
    { active: true, type: 'Credit', name: 'MOBILE RECHARGE', desc: '---' },
  ]);

  return (
    <div className="p-4 bg-[#f8f9fc] min-h-screen font-sans">
      {/* Top Header */}
      <div className="flex flex-col mb-6">
        <h1 className="text-gray-700 font-black text-xl uppercase tracking-widest flex items-center gap-2">
           Salary Types
        </h1>
        <p className="text-[11px] text-gray-400 font-bold uppercase tracking-tight mt-1">Configure earnings and deductions for payroll</p>
      </div>

      <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Add Salary Type Form Column */}
        <div className="lg:col-span-1">
           <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden h-fit">
              <div className="bg-blue-50/10 px-8 py-5 border-b border-gray-100 flex items-center gap-2">
                 <Plus className="w-4 h-4 text-blue-600" />
                 <h3 className="text-[13px] font-black text-blue-700 uppercase tracking-widest">Add Salary Type</h3>
              </div>
              
              <div className="p-8 space-y-6">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-rose-500 uppercase tracking-widest">Type *</label>
                    <select className="w-full px-4 py-3 bg-white border border-gray-100 rounded-lg text-[13px] font-bold text-gray-500 focus:outline-none focus:border-blue-400 transition-all appearance-none cursor-pointer">
                       <option>Select</option>
                       <option>Credit</option>
                       <option>Debit</option>
                    </select>
                 </div>

                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-rose-500 uppercase tracking-widest">Type Name *</label>
                    <input type="text" placeholder="e.g. Performance Bonus" className="w-full px-4 py-3 bg-white border border-gray-100 rounded-lg text-[13px] font-bold text-gray-700 focus:outline-none focus:border-blue-400 transition-all" />
                 </div>

                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Description</label>
                    <textarea 
                      rows={4} 
                      placeholder="Optional notes"
                      className="w-full px-4 py-3 bg-white border border-gray-100 rounded-lg text-[13px] font-bold text-gray-700 focus:outline-none focus:border-blue-400 transition-all resize-none"
                    />
                 </div>

                 <button className="w-full flex items-center justify-center gap-2 py-4 bg-[#0061f2] text-white text-[11px] font-black rounded-lg shadow-lg shadow-blue-100 uppercase tracking-widest hover:bg-blue-700 transition-all">
                    <Save className="w-4 h-4" /> Save Type
                 </button>
              </div>
           </div>
        </div>

        {/* Existing Salary Types List Column */}
        <div className="lg:col-span-2">
           <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden h-fit min-h-[700px]">
              <div className="bg-gray-50/50 px-8 py-5 border-b border-gray-100 flex justify-between items-center">
                 <div className="space-y-1">
                    <h3 className="text-[13px] font-black text-gray-700 uppercase tracking-widest flex items-center gap-2">
                       <List className="w-4 h-4 text-blue-600" /> Existing Salary Types
                    </h3>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">Toggle ON to include in salary slips</p>
                 </div>
              </div>

              <div className="overflow-x-auto">
                 <table className="w-full text-[11px] border-collapse">
                    <thead>
                       <tr className="bg-white text-gray-400 uppercase tracking-widest border-b border-gray-100">
                          <th className="px-6 py-5 text-left font-black w-24">Select</th>
                          <th className="px-6 py-5 text-left font-black w-24">Type</th>
                          <th className="px-6 py-5 text-left font-black">Name</th>
                          <th className="px-6 py-5 text-left font-black">Description</th>
                          <th className="px-6 py-5 text-center font-black w-32">Overrides</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                       {salaryTypes.map((item, idx) => (
                         <tr key={idx} className="hover:bg-gray-50/30 transition-colors group">
                            <td className="px-6 py-5">
                               <div className="flex items-center">
                                  {item.active ? (
                                    <ToggleRight className="w-7 h-7 text-blue-600 cursor-pointer fill-current" />
                                  ) : (
                                    <ToggleLeft className="w-7 h-7 text-gray-200 cursor-pointer fill-current" />
                                  )}
                               </div>
                            </td>
                            <td className="px-6 py-5">
                               <span className={`text-[9px] font-black px-2 py-0.5 rounded shadow-sm uppercase tracking-tighter ${item.type === 'Debit' ? 'bg-rose-50 text-rose-500' : 'bg-emerald-50 text-emerald-500'}`}>
                                  {item.type}
                               </span>
                            </td>
                            <td className="px-6 py-5 font-black text-gray-600 uppercase tracking-tight">{item.name}</td>
                            <td className="px-6 py-5 font-bold text-gray-300 italic">{item.desc}</td>
                            <td className="px-6 py-5 text-center">
                               <button className="px-4 py-1.5 border border-blue-600 text-blue-600 text-[9px] font-black rounded uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all shadow-sm">
                                  Manage
                               </button>
                            </td>
                         </tr>
                       ))}
                    </tbody>
                 </table>
              </div>
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
