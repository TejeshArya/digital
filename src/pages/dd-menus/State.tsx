import React, { useState } from 'react';
import { 
  Plus, Edit3, Trash2, Search, 
  Filter, MoreVertical, Map,
  Navigation, FileText, Clock
} from 'lucide-react';

export function State() {
  const [states] = useState([
    { name: 'ANDHRA PRADESH', gst: '37', loc: 'Visakhapatnam', remarks: 'Ap' },
    { name: 'WEST BENGAL', gst: '19', loc: 'Kolkata', remarks: 'Wb' },
    { name: 'DELHI', gst: '07', loc: 'Delhi', remarks: 'Dl' },
    { name: 'MAHARASHTRA', gst: '27', loc: 'Mumbai', remarks: 'Mh' },
    { name: 'TAMIL NADU', gst: '33', loc: 'Chennai', remarks: 'Tn' },
    { name: 'KARNATAKA', gst: '29', loc: 'Karwar', remarks: 'Ka' },
  ]);

  return (
    <div className="p-4 bg-[#f8f9fc] min-h-screen font-sans">
      <div className="max-w-[1600px] mx-auto space-y-8">
        {/* Form Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-[#0061f2] px-8 py-4">
             <h2 className="text-white text-[12px] font-black uppercase tracking-widest">State</h2>
          </div>
          <div className="p-8 grid grid-cols-1 md:grid-cols-5 gap-6 items-end">
             <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">State Name</label>
                <input type="text" placeholder="State Name" className="w-full px-4 py-3 bg-white border border-gray-100 rounded-lg text-[13px] font-bold text-gray-700 focus:outline-none focus:border-blue-400 transition-all shadow-inner" />
             </div>
             <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">State GST Code</label>
                <input type="text" placeholder="GST Code" className="w-full px-4 py-3 bg-white border border-gray-100 rounded-lg text-[13px] font-bold text-gray-700 focus:outline-none focus:border-blue-400 transition-all shadow-inner" />
             </div>
             <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Location</label>
                <input type="text" placeholder="Location" className="w-full px-4 py-3 bg-white border border-gray-100 rounded-lg text-[13px] font-bold text-gray-700 focus:outline-none focus:border-blue-400 transition-all shadow-inner" />
             </div>
             <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Remarks</label>
                <input type="text" placeholder="Remarks" className="w-full px-4 py-3 bg-white border border-gray-100 rounded-lg text-[13px] font-bold text-gray-700 focus:outline-none focus:border-blue-400 transition-all shadow-inner" />
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
                       <th className="px-8 py-5 text-left border-r border-gray-50">State Name</th>
                       <th className="px-8 py-5 text-left border-r border-gray-50">State GST</th>
                       <th className="px-8 py-5 text-left border-r border-gray-50">Location</th>
                       <th className="px-8 py-5 text-left border-r border-gray-50">Remarks</th>
                       <th className="px-8 py-5 text-center">Actions</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-gray-50">
                    {states.map((item, idx) => (
                      <tr key={idx} className="hover:bg-gray-50/50 transition-colors group">
                         <td className="px-8 py-4 border-r border-gray-50 font-black text-gray-600 uppercase tracking-tight">{item.name}</td>
                         <td className="px-8 py-4 border-r border-gray-50 font-bold text-gray-400 uppercase tracking-tight">{item.gst}</td>
                         <td className="px-8 py-4 border-r border-gray-50 font-bold text-gray-400 uppercase tracking-tight">{item.loc}</td>
                         <td className="px-8 py-4 border-r border-gray-50 font-bold text-gray-400 uppercase tracking-tight">{item.remarks}</td>
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
