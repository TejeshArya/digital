import React, { useState } from 'react';
import { Plus, Edit3, Trash2, ChevronDown, Briefcase } from 'lucide-react';

export function AddProject() {
  const [projects] = useState([
    { id: 'PRJ-001', name: 'Smart City Infrastructure', client: 'Digital Engineering', manager: 'Amit Sharma', date: '2026-04-01' },
    { id: 'PRJ-002', name: 'Cloud Migration Phase 2', client: 'Tech Solutions', manager: 'Sanjay Mahato', date: '2026-03-25' },
  ]);

  return (
    <div className="p-4 bg-[#f8f9fc] min-h-screen font-sans">
      <div className="max-w-[1600px] mx-auto space-y-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-[#0061f2] px-8 py-4">
             <h2 className="text-white text-[12px] font-black uppercase tracking-widest">Add Project</h2>
          </div>
          <div className="p-8 grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
             <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Project Name</label>
                <input type="text" placeholder="Project Name" className="w-full px-4 py-3 bg-white border border-gray-100 rounded-lg text-[13px] font-bold text-gray-700 focus:outline-none focus:border-blue-400 transition-all shadow-inner" />
             </div>
             <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Client Name</label>
                <div className="relative">
                   <select className="w-full px-4 py-3 bg-white border border-gray-100 rounded-lg text-[13px] font-bold text-gray-700 focus:outline-none focus:border-blue-400 transition-all shadow-inner appearance-none">
                      <option>Select Client</option>
                   </select>
                   <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                </div>
             </div>
             <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Project Manager</label>
                <div className="relative">
                   <select className="w-full px-4 py-3 bg-white border border-gray-100 rounded-lg text-[13px] font-bold text-gray-700 focus:outline-none focus:border-blue-400 transition-all shadow-inner appearance-none">
                      <option>Select Manager</option>
                   </select>
                   <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                </div>
             </div>
             <button className="px-12 py-3.5 bg-[#0061f2] text-white text-[11px] font-black rounded shadow-lg shadow-blue-100 uppercase tracking-widest hover:bg-blue-700 transition-all">
                Save Project
             </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden min-h-[600px]">
           <div className="overflow-x-auto">
              <table className="w-full text-[11px] border-collapse">
                 <thead>
                    <tr className="bg-white text-gray-400 uppercase tracking-widest border-b border-gray-100 font-black">
                       <th className="px-8 py-5 text-left border-r border-gray-50">Project ID</th>
                       <th className="px-8 py-5 text-left border-r border-gray-50">Project Name</th>
                       <th className="px-8 py-5 text-left border-r border-gray-50">Client</th>
                       <th className="px-8 py-5 text-center">Actions</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-gray-50">
                    {projects.map((item, idx) => (
                      <tr key={idx} className="hover:bg-gray-50/50 transition-colors group">
                         <td className="px-8 py-4 border-r border-gray-50 font-black text-blue-600">{item.id}</td>
                         <td className="px-8 py-4 border-r border-gray-50 font-black text-gray-600 uppercase tracking-tight">{item.name}</td>
                         <td className="px-8 py-4 border-r border-gray-50 font-bold text-gray-400 uppercase tracking-tight">{item.client}</td>
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
    </div>
  );
}
