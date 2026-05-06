import React, { useState } from 'react';
import { 
  MapPin, Plus, Search, Filter, Eye, Edit3, 
  Trash2, Calendar, Layout, ArrowLeft
} from 'lucide-react';

export function LocationManagement() {
  const [locations] = useState([
    { id: 6, name: 'KOCHIN', description: 'KOCHIN', date: '2026-03-31 14:28:28' },
    { id: 5, name: 'JAMNAGAR', description: 'JAMNAGAR', date: '2026-03-31 14:26:42' },
    { id: 4, name: 'KOLKATA', description: 'WEST BENGAL', date: '2026-01-02 06:01:30' },
    { id: 3, name: 'MUMBAI', description: 'MUMBAI', date: '2025-12-30 06:40:15' },
    { id: 2, name: 'KARWAR', description: 'DESC', date: '2025-12-24 02:42:58' },
    { id: 1, name: 'VISAKHAPATNAM', description: 'Main Office Location', date: '2025-12-19 11:00:18' },
  ]);

  return (
    <div className="p-4 bg-[#f8f9fc] min-h-screen font-sans">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <h1 className="text-[#0061f2] font-bold text-lg">
          Location Management
        </h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#0061f2] text-white text-[11px] font-black rounded shadow-md uppercase tracking-widest hover:bg-blue-700 transition-all">
          <Plus className="w-4 h-4" /> Add New Location
        </button>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Table Card */}
        <div className="bg-white rounded shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto min-h-[400px]">
            <table className="w-full text-[11px] border-collapse">
              <thead>
                <tr className="bg-white text-gray-400 uppercase tracking-widest border-b border-gray-100">
                  <th className="px-6 py-5 text-center font-black border-r border-gray-100 w-24">ID</th>
                  <th className="px-6 py-5 text-center font-black border-r border-gray-100">Location Name</th>
                  <th className="px-6 py-5 text-center font-black border-r border-gray-100">Description</th>
                  <th className="px-6 py-5 text-center font-black border-r border-gray-100">Created Date</th>
                  <th className="px-6 py-5 text-center font-black">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {locations.map((loc) => (
                  <tr key={loc.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-5 border-r border-gray-50 text-center font-bold text-gray-400">{loc.id}</td>
                    <td className="px-6 py-5 border-r border-gray-50 text-center font-black text-gray-600 uppercase tracking-tight">{loc.name}</td>
                    <td className="px-6 py-5 border-r border-gray-50 text-center font-bold text-gray-400 uppercase tracking-tighter">{loc.description}</td>
                    <td className="px-6 py-5 border-r border-gray-50 text-center font-bold text-gray-400">{loc.date}</td>
                    <td className="px-6 py-5">
                      <div className="flex justify-center gap-2">
                        <button className="flex items-center gap-1 px-2 py-1 border border-cyan-400 text-cyan-500 rounded text-[9px] font-black uppercase hover:bg-cyan-50 transition-colors">
                           <Eye className="w-3 h-3" /> View
                        </button>
                        <button className="flex items-center gap-1 px-2 py-1 border border-blue-400 text-blue-500 rounded text-[9px] font-black uppercase hover:bg-blue-50 transition-colors">
                           <Edit3 className="w-3 h-3" /> Edit
                        </button>
                        <button className="flex items-center gap-1 px-2 py-1 border border-red-400 text-red-500 rounded text-[9px] font-black uppercase hover:bg-red-50 transition-colors">
                           <Trash2 className="w-3 h-3" /> Delete
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
