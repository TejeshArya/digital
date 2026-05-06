import React, { useState } from 'react';
import { 
  Plus, Edit3, Trash2, Image as ImageIcon, 
  Upload, Search, Filter, MoreVertical,
  ChevronDown
} from 'lucide-react';

export function SubSubCategories() {
  const [subs] = useState([
    { 
      category: 'CIVIL', sub: 'JAMANAR NEI PROJECT', subSub: 'PHASE 1 FOUNDATION', desc: 'FOUNDATION WORKS', date: '2026-03-13', 
      photo: 'https://images.unsplash.com/photo-1541913057-22122752670d?q=80&w=200&auto=format&fit=crop' 
    },
  ]);

  return (
    <div className="p-4 bg-[#f8f9fc] min-h-screen font-sans">
      <div className="max-w-[1600px] mx-auto space-y-8">
        {/* New Sub-Sub Category Form Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-[#0061f2] px-8 py-5">
             <h2 className="text-white text-[12px] font-black uppercase tracking-widest">New Sub-Sub Category</h2>
          </div>
          <div className="p-8 space-y-6">
             <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                <div className="space-y-2">
                   <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Category Name</label>
                   <div className="relative">
                      <select className="w-full px-4 py-3 bg-white border border-gray-100 rounded-lg text-[13px] font-bold text-gray-700 focus:outline-none focus:border-blue-400 transition-all shadow-inner appearance-none">
                         <option>Select Category</option>
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                   </div>
                </div>
                <div className="space-y-2">
                   <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Sub Category</label>
                   <div className="relative">
                      <select className="w-full px-4 py-3 bg-white border border-gray-100 rounded-lg text-[13px] font-bold text-gray-700 focus:outline-none focus:border-blue-400 transition-all shadow-inner appearance-none">
                         <option>Select Sub</option>
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                   </div>
                </div>
                <div className="space-y-2">
                   <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Sub-Sub Category</label>
                   <input type="text" placeholder="Sub-Sub Category" className="w-full px-4 py-3 bg-white border border-gray-100 rounded-lg text-[13px] font-bold text-gray-700 focus:outline-none focus:border-blue-400 transition-all shadow-inner" />
                </div>
                <div className="space-y-2">
                   <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Description</label>
                   <input type="text" placeholder="Description" className="w-full px-4 py-3 bg-white border border-gray-100 rounded-lg text-[13px] font-bold text-gray-700 focus:outline-none focus:border-blue-400 transition-all shadow-inner" />
                </div>
                <div className="space-y-2">
                   <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Photo</label>
                   <div className="flex border border-gray-100 rounded-lg overflow-hidden h-[46px] shadow-inner">
                      <button className="px-4 bg-gray-50 text-[10px] font-black text-gray-500 uppercase tracking-tight border-r border-gray-100 hover:bg-gray-100 transition-all">Choose File</button>
                      <div className="flex-1 px-4 py-3 text-[11px] font-bold text-gray-300 italic truncate">No file chosen</div>
                   </div>
                </div>
             </div>
             <div className="flex justify-end">
                <button className="px-12 py-3.5 bg-[#0061f2] text-white text-[11px] font-black rounded shadow-lg shadow-blue-100 uppercase tracking-widest hover:bg-blue-700 transition-all">
                   Save Sub-Sub Category
                </button>
             </div>
          </div>
        </div>

        {/* Sub-Sub Categories Data Grid */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden min-h-[600px]">
           <div className="overflow-x-auto">
              <table className="w-full text-[11px] border-collapse">
                 <thead>
                    <tr className="bg-white text-gray-400 uppercase tracking-widest border-b border-gray-100">
                       <th className="px-8 py-6 text-center font-black border-r border-gray-50 w-32">Photo</th>
                       <th className="px-8 py-6 text-center font-black border-r border-gray-50">Category</th>
                       <th className="px-8 py-6 text-center font-black border-r border-gray-50">Sub Category</th>
                       <th className="px-8 py-6 text-center font-black border-r border-gray-50">Sub-Sub Category</th>
                       <th className="px-8 py-6 text-center font-black border-r border-gray-50">Created Date</th>
                       <th className="px-8 py-6 text-center font-black">Actions</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-gray-50">
                    {subs.map((item, idx) => (
                      <tr key={idx} className="hover:bg-gray-50/50 transition-colors group text-center">
                         <td className="px-8 py-4 border-r border-gray-50">
                            <div className="w-24 h-24 mx-auto rounded-lg overflow-hidden border border-gray-100 shadow-sm">
                               <img src={item.photo} alt={item.subSub} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all" />
                            </div>
                         </td>
                         <td className="px-8 py-4 border-r border-gray-50 font-bold text-gray-400 uppercase tracking-tight">{item.category}</td>
                         <td className="px-8 py-4 border-r border-gray-50 font-bold text-gray-400 uppercase tracking-tight">{item.sub}</td>
                         <td className="px-8 py-4 border-r border-gray-50 font-black text-gray-600 uppercase tracking-tight">{item.subSub}</td>
                         <td className="px-8 py-4 border-r border-gray-50 font-bold text-gray-400 tracking-tighter whitespace-nowrap">{item.date}</td>
                         <td className="px-8 py-4">
                            <div className="flex gap-2 justify-center">
                               <button className="px-3 py-1.5 bg-[#f6c23e] text-white rounded text-[10px] font-black uppercase tracking-widest hover:bg-amber-600 transition-all shadow-sm">
                                  Edit
                               </button>
                               <button className="px-3 py-1.5 bg-[#e74a3b] text-white rounded text-[10px] font-black uppercase tracking-widest hover:bg-red-700 transition-all shadow-sm">
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
