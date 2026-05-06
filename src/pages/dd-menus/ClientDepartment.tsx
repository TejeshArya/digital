import React, { useState } from 'react';
import { 
  Plus, Edit3, Trash2, Search, 
  Filter, MoreVertical, Building2,
  Clock, ArrowRight, UserPlus
} from 'lucide-react';

export function ClientDepartment() {
  const [depts] = useState([
    { name: 'INS DEGA PHOTO SECTION', desc: 'INS DEGA PHOTO SECTION', date: '29-04-2026' },
    { name: 'MYU', desc: 'MYU', date: '22-04-2026' },
    { name: 'INS DEGA , BLD', desc: 'INS DEGA , BLD', date: '06-04-2026' },
    { name: 'EPS', desc: 'EPS', date: '29-03-2026' },
    { name: 'SALES', desc: 'SALES', date: '26-03-2026' },
    { name: 'MCD', desc: 'MCD', date: '23-03-2026' },
    { name: 'CIVIL', desc: 'CIVIL', date: '13-03-2026' },
  ]);

  return (
    <div className="p-4 bg-[#f8f9fc] min-h-screen font-sans">
      <div className="max-w-[1600px] mx-auto space-y-8">
        {/* Add Department Form Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-blue-50/10 px-8 py-5 border-b border-gray-100 flex items-center justify-between">
             <h2 className="text-[#0061f2] text-[12px] font-black uppercase tracking-widest">Add Department</h2>
          </div>
          <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
             <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Department Name</label>
                <input type="text" placeholder="Department Name" className="w-full px-4 py-3 bg-white border border-gray-100 rounded-lg text-[13px] font-bold text-gray-700 focus:outline-none focus:border-blue-400 transition-all shadow-inner" />
             </div>
             <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Description</label>
                <input type="text" placeholder="Description" className="w-full px-4 py-3 bg-white border border-gray-100 rounded-lg text-[13px] font-bold text-gray-700 focus:outline-none focus:border-blue-400 transition-all shadow-inner" />
             </div>
             <button className="px-12 py-3.5 bg-[#0061f2] text-white text-[11px] font-black rounded shadow-lg shadow-blue-100 uppercase tracking-widest hover:bg-blue-700 transition-all">
                Add Department
             </button>
          </div>
        </div>

        {/* Departments Data Grid */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden min-h-[600px]">
           <div className="overflow-x-auto">
              <table className="w-full text-[11px] border-collapse">
                 <thead>
                    <tr className="bg-white text-gray-400 uppercase tracking-widest border-b border-gray-100 font-black">
                       <th className="px-8 py-5 text-left border-r border-gray-50">Department Name</th>
                       <th className="px-8 py-5 text-left border-r border-gray-50">Description</th>
                       <th className="px-8 py-5 text-left border-r border-gray-50">Created Date</th>
                       <th className="px-8 py-5 text-center">Actions</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-gray-50">
                    {depts.map((item, idx) => (
                      <tr key={idx} className="hover:bg-gray-50/50 transition-colors group">
                         <td className="px-8 py-4 border-r border-gray-50 font-black text-gray-600 uppercase tracking-tight">{item.name}</td>
                         <td className="px-8 py-4 border-r border-gray-50 font-bold text-gray-400 uppercase tracking-tight">{item.desc}</td>
                         <td className="px-8 py-4 border-r border-gray-50 font-bold text-gray-400 tracking-tighter whitespace-nowrap">{item.date}</td>
                         <td className="px-8 py-4 text-center">
                            <div className="flex gap-2 justify-center">
                               <button className="px-4 py-1.5 border border-blue-400 text-blue-500 rounded text-[9px] font-black uppercase tracking-widest hover:bg-blue-500 hover:text-white transition-all shadow-sm">
                                  Edit
                               </button>
                               <button className="px-4 py-1.5 border border-red-400 text-red-500 rounded text-[9px] font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all shadow-sm">
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
