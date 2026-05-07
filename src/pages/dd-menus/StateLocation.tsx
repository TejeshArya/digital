import React, { useState } from 'react';
import { 
  Plus, Edit3, Trash2, Search, 
  Filter, MoreVertical, MapPin,
  ChevronDown, FileText, Clock,
  Navigation
} from 'lucide-react';

export function StateLocation() {
  const [locations] = useState([
    { state: 'WEST BENGAL', city: 'KOLKATA', location: 'SALT LAKE', desc: 'SALT LAKE SEC-V' },
    { state: 'MAHARASHTRA', city: 'MUMBAI', location: 'ANDHERI', desc: 'ANDHERI EAST' },
    { state: 'KARNATAKA', city: 'BANGLORE', location: 'WHITEFIELD', desc: 'WHITEFIELD IT HUB' },
    { state: 'DELHI', city: 'DELHI', location: 'OAKHLA', desc: 'OAKHLA IND ESTATE' },
  ]);

  return (
    <div className="p-4 bg-[#f8f9fc] min-h-screen font-sans">
      <div className="max-w-[1600px] mx-auto space-y-8">
        {/* Form Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-[#0061f2] px-8 py-4">
             <h2 className="text-white text-[12px] font-black uppercase tracking-widest">Add State Location</h2>
          </div>
          <div className="p-8 grid grid-cols-1 md:grid-cols-5 gap-6 items-end">
             <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">State</label>
                <div className="relative">
                   <select className="w-full px-4 py-3 bg-white border border-gray-100 rounded-lg text-[13px] font-bold text-gray-700 focus:outline-none focus:border-blue-400 transition-all shadow-inner appearance-none">
                      <option>Select State</option>
                   </select>
                   <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                </div>
             </div>
             <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">City</label>
                <div className="relative">
                   <select className="w-full px-4 py-3 bg-white border border-gray-100 rounded-lg text-[13px] font-bold text-gray-700 focus:outline-none focus:border-blue-400 transition-all shadow-inner appearance-none">
                      <option>Select City</option>
                   </select>
                   <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                </div>
             </div>
             <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Location Name</label>
                <input type="text" placeholder="Location Name" className="w-full px-4 py-3 bg-white border border-gray-100 rounded-lg text-[13px] font-bold text-gray-700 focus:outline-none focus:border-blue-400 transition-all shadow-inner" />
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
                       <th className="px-8 py-5 text-left border-r border-gray-50">State</th>
                       <th className="px-8 py-5 text-left border-r border-gray-50">City</th>
                       <th className="px-8 py-5 text-left border-r border-gray-50">Location</th>
                       <th className="px-8 py-5 text-left border-r border-gray-50">Description</th>
                       <th className="px-8 py-5 text-center">Actions</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-gray-50">
                    {locations.map((item, idx) => (
                      <tr key={idx} className="hover:bg-gray-50/50 transition-colors group">
                         <td className="px-8 py-4 border-r border-gray-50 font-bold text-gray-400 uppercase tracking-tight">{item.state}</td>
                         <td className="px-8 py-4 border-r border-gray-50 font-bold text-gray-400 uppercase tracking-tight">{item.city}</td>
                         <td className="px-8 py-4 border-r border-gray-50 font-black text-gray-600 uppercase tracking-tight">{item.location}</td>
                         <td className="px-8 py-4 border-r border-gray-50 font-bold text-gray-400 uppercase tracking-tight">{item.desc}</td>
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
