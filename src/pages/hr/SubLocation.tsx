import React, { useState } from 'react';
import { 
  MapPin, Plus, Search, Filter, Edit3, 
  Trash2, Save, FileText, Map, List,
  ArrowLeft, Info
} from 'lucide-react';

export function SubLocation() {
  const [subLocations] = useState([
    { location: 'KOLKATA', name: 'GRSE FOJ', description: 'GRSE FOJ', date: '02-04-2026' },
    { location: 'VISAKHAPATNAM', name: 'INS DEGA BLD', description: 'AFLS MUSTERING POINT', date: '28-03-2026' },
    { location: 'MUMBAI', name: 'LION GATE', description: 'N/A', date: '30-12-2025' },
  ]);

  return (
    <div className="p-4 bg-[#f8f9fc] min-h-screen font-sans">
      {/* Top Header */}
      <div className="flex flex-col mb-6">
        <h1 className="text-gray-700 font-black text-xl uppercase tracking-widest flex items-center gap-2">
          <MapPin className="w-5 h-5 text-blue-600" /> Sub Location Management
        </h1>
        <p className="text-[11px] text-gray-400 font-bold uppercase tracking-tight mt-1">Create and manage sub locations for each location</p>
      </div>

      <div className="max-w-6xl mx-auto space-y-6">
        {/* Add Sub Location Form Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-gray-50/50 px-6 py-4 border-b border-gray-100 flex items-center gap-2">
            <Plus className="w-4 h-4 text-blue-600" />
            <h2 className="text-[12px] font-black text-gray-700 uppercase tracking-widest">Add Sub Location</h2>
          </div>
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  Select Location <span className="text-rose-500">*</span>
                </label>
                <select className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-lg text-[13px] font-bold text-gray-700 focus:outline-none focus:border-blue-400 focus:bg-white transition-all appearance-none cursor-pointer">
                  <option>Select Location</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  Sub Location Name <span className="text-rose-500">*</span>
                </label>
                <input 
                  type="text" 
                  placeholder="Enter sub location name"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-lg text-[13px] font-bold text-gray-700 focus:outline-none focus:border-blue-400 focus:bg-white transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  Description
                </label>
                <input 
                  type="text" 
                  placeholder="Enter description"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-lg text-[13px] font-bold text-gray-700 focus:outline-none focus:border-blue-400 focus:bg-white transition-all"
                />
              </div>
            </div>
            <div className="mt-6">
              <button className="flex items-center gap-2 px-6 py-3 bg-[#0061f2] text-white text-[11px] font-black rounded-lg shadow-lg shadow-blue-100 uppercase tracking-widest hover:bg-blue-700 transition-all">
                <Save className="w-4 h-4" /> Add Sub Location
              </button>
            </div>
          </div>
        </div>

        {/* Sub Locations List Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-gray-50/50 px-6 py-4 border-b border-gray-100 flex items-center gap-2">
            <List className="w-4 h-4 text-blue-600" />
            <h2 className="text-[12px] font-black text-gray-700 uppercase tracking-widest">Sub Locations List</h2>
          </div>
          <div className="overflow-x-auto min-h-[400px]">
            <table className="w-full text-[11px] border-collapse">
              <thead>
                <tr className="bg-gray-50/50 text-gray-400 uppercase tracking-widest border-b border-gray-100">
                  <th className="px-8 py-5 text-left font-black border-r border-gray-100">Location</th>
                  <th className="px-8 py-5 text-left font-black border-r border-gray-100">Sub Location Name</th>
                  <th className="px-8 py-5 text-left font-black border-r border-gray-100">Description</th>
                  <th className="px-8 py-5 text-left font-black border-r border-gray-100">Created Date</th>
                  <th className="px-8 py-5 text-center font-black">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {subLocations.map((sub, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-8 py-5 border-r border-gray-50 font-black text-gray-700 uppercase tracking-tight">{sub.location}</td>
                    <td className="px-8 py-5 border-r border-gray-50 font-bold text-gray-500 uppercase tracking-tight">{sub.name}</td>
                    <td className="px-8 py-5 border-r border-gray-50 font-bold text-gray-400 uppercase tracking-tighter">{sub.description}</td>
                    <td className="px-8 py-5 border-r border-gray-50 font-bold text-gray-400">{sub.date}</td>
                    <td className="px-8 py-5">
                      <div className="flex justify-center gap-2">
                        <button className="flex items-center gap-1.5 px-3 py-1.5 border border-blue-400 text-blue-500 rounded text-[9px] font-black uppercase hover:bg-blue-50 transition-colors">
                           <Edit3 className="w-3.5 h-3.5" /> Edit
                        </button>
                        <button className="flex items-center gap-1.5 px-3 py-1.5 border border-red-400 text-red-500 rounded text-[9px] font-black uppercase hover:bg-red-50 transition-colors">
                           <Trash2 className="w-3.5 h-3.5" /> Delete
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
