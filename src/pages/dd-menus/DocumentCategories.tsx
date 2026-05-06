import React, { useState } from 'react';
import { 
  Plus, Edit3, Trash2, Folder, 
  ArrowLeft, X, Save
} from 'lucide-react';

export function DocumentCategories() {
  const [isCreating, setIsCreating] = useState(false);
  const [docs] = useState([
    { id: 1, name: 'SHREEYAAN ENTERPRISES', desc: 'N/A', status: 'Active', date: '24-04-2026' },
    { id: 2, name: 'BIJYAANTEK PRIVATE LIMITED', desc: 'N/A', status: 'Active', date: '24-04-2026' },
    { id: 3, name: 'DIGITAL ENGINEERING ENTERPRISES', desc: 'desc', status: 'Active', date: '15-04-2026' },
  ]);

  if (isCreating) {
    return (
      <div className="p-6 bg-[#f8f9fc] min-h-screen font-sans">
        <div className="max-w-[1600px] mx-auto space-y-6">
          {/* Header area */}
          <div className="flex items-center justify-between">
             <div className="flex items-center gap-2 text-gray-800">
                <Folder className="w-5 h-5 text-gray-800" />
                <h1 className="text-xl font-bold">Create Document Category</h1>
             </div>
             <button 
               onClick={() => setIsCreating(false)}
               className="flex items-center gap-2 px-4 py-2 bg-[#6f42c1] text-white rounded text-sm font-semibold hover:bg-purple-700 transition-all shadow-sm"
             >
                <ArrowLeft className="w-4 h-4" /> Back to List
             </button>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded shadow-sm border border-gray-100">
            <div className="px-6 py-4 border-b border-gray-100">
               <h2 className="text-[#0061f2] text-[14px] font-bold">Add New Document Category</h2>
            </div>
            <div className="p-6 space-y-6">
               <div className="space-y-2">
                  <label className="text-[13px] text-gray-600 font-medium">Category Name <span className="text-red-500">*</span></label>
                  <input type="text" placeholder="ENTER CATEGORY NAME" className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded text-[13px] text-gray-700 focus:outline-none focus:border-[#0061f2] transition-all" />
               </div>
               
               <div className="space-y-2">
                  <label className="text-[13px] text-gray-600 font-medium">Description</label>
                  <textarea rows={3} placeholder="Enter description" className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded text-[13px] text-gray-700 focus:outline-none focus:border-[#0061f2] transition-all resize-none"></textarea>
               </div>

               <div className="flex items-center gap-2">
                  <input type="checkbox" id="active" defaultChecked className="w-4 h-4 text-[#0061f2] border-gray-300 rounded focus:ring-[#0061f2]" />
                  <label htmlFor="active" className="text-[13px] text-gray-600 font-medium">Active</label>
               </div>

               <div className="flex justify-end gap-3 pt-4">
                  <button 
                    onClick={() => setIsCreating(false)}
                    className="flex items-center gap-2 px-4 py-2 bg-[#6f42c1] text-white rounded text-sm font-semibold hover:bg-purple-700 transition-all shadow-sm"
                  >
                     <X className="w-4 h-4" /> Cancel
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-[#0061f2] text-white rounded text-sm font-semibold hover:bg-blue-700 transition-all shadow-sm">
                     <Save className="w-4 h-4" /> Save Category
                  </button>
               </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-[#f8f9fc] min-h-screen font-sans">
      <div className="max-w-[1600px] mx-auto space-y-6">
        {/* Header area */}
        <div className="flex items-center justify-between">
           <div className="flex items-center gap-2 text-gray-800">
              <Folder className="w-5 h-5 text-gray-800 fill-gray-800" />
              <h1 className="text-xl font-bold">Document Categories</h1>
           </div>
           <button 
             onClick={() => setIsCreating(true)}
             className="flex items-center gap-2 px-4 py-2 bg-[#0061f2] text-white rounded text-sm font-semibold hover:bg-blue-700 transition-all shadow-sm"
           >
              <Plus className="w-4 h-4" /> Add New Category
           </button>
        </div>

        {/* Data Grid Card */}
        <div className="bg-white rounded shadow-sm border border-gray-100">
          <div className="px-6 py-4 border-b border-gray-100">
             <h2 className="text-[#0061f2] text-[14px] font-bold">All Document Categories</h2>
          </div>
          <div className="p-6">
             <div className="overflow-x-auto border border-gray-200 rounded">
                <table className="w-full text-[13px] border-collapse">
                   <thead>
                      <tr className="bg-[#f8f9fc] text-gray-900 font-bold border-b border-gray-200">
                         <th className="px-6 py-4 text-left border-r border-gray-200 w-16">#</th>
                         <th className="px-6 py-4 text-left border-r border-gray-200">Name</th>
                         <th className="px-6 py-4 text-left border-r border-gray-200">Description</th>
                         <th className="px-6 py-4 text-left border-r border-gray-200 w-32">Status</th>
                         <th className="px-6 py-4 text-left border-r border-gray-200 w-40">Created At</th>
                         <th className="px-6 py-4 text-center w-32">Actions</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-gray-200">
                      {docs.map((item, idx) => (
                        <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                           <td className="px-6 py-3 border-r border-gray-200 text-gray-400">{item.id}</td>
                           <td className="px-6 py-3 border-r border-gray-200 font-bold text-gray-600 uppercase">{item.name}</td>
                           <td className="px-6 py-3 border-r border-gray-200 text-gray-500">{item.desc}</td>
                           <td className="px-6 py-3 border-r border-gray-200">
                              <span className="px-3 py-1 bg-[#1cc88a] text-white text-[10px] font-bold rounded uppercase">
                                 {item.status}
                              </span>
                           </td>
                           <td className="px-6 py-3 border-r border-gray-200 text-gray-500">{item.date}</td>
                           <td className="px-6 py-3 text-center">
                              <div className="flex gap-2 justify-center">
                                 <button className="p-1.5 bg-[#0061f2] text-white rounded hover:bg-blue-700 transition-all shadow-sm">
                                    <Edit3 className="w-3.5 h-3.5" />
                                 </button>
                                 <button className="p-1.5 bg-[#e74a3b] text-white rounded hover:bg-red-700 transition-all shadow-sm">
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
    </div>
  );
}
