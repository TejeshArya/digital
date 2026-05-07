import React, { useState } from 'react';
import { 
  Plane, Plus, Search, Filter, Eye, Edit3, 
  Pause, Trash2, Users, Calendar, Layout,
  ArrowLeft
} from 'lucide-react';

export function Wings() {
  const [wings] = useState([
    { id: 2, name: 'CIVIL', description: 'DEC', status: 'Active', userCount: 0, date: '22/12/2025 05:56 AM' },
    { id: 1, name: 'ELECTRICAL', description: 'DESC', status: 'Active', userCount: 0, date: '22/12/2025 05:56 AM' },
  ]);

  return (
    <div className="p-4 bg-[#f8f9fc] min-h-screen font-sans">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <h1 className="text-gray-700 font-black text-xl uppercase tracking-widest flex items-center gap-3">
          Wings Management
        </h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#0061f2] text-white text-[10px] font-black rounded shadow-lg shadow-blue-100 uppercase tracking-widest hover:bg-blue-700 transition-all">
          <Plus className="w-4 h-4" /> Add New Wing
        </button>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Table Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto min-h-[400px]">
            <table className="w-full text-[11px] border-collapse">
              <thead>
                <tr className="bg-[#323c4e] text-white uppercase tracking-tighter">
                  <th className="px-6 py-5 text-left font-black border-r border-slate-600 w-16">ID</th>
                  <th className="px-6 py-5 text-left font-black border-r border-slate-600">Wing Name</th>
                  <th className="px-6 py-5 text-left font-black border-r border-slate-600">Description</th>
                  <th className="px-6 py-5 text-center font-black border-r border-slate-600 w-24">Status</th>
                  <th className="px-6 py-5 text-center font-black border-r border-slate-600 w-24">Users Count</th>
                  <th className="px-6 py-5 text-left font-black border-r border-slate-600">Created At</th>
                  <th className="px-6 py-5 text-center font-black">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {wings.map((wing) => (
                  <tr key={wing.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-5 border-r border-gray-50 font-bold text-gray-400">{wing.id}</td>
                    <td className="px-6 py-5 border-r border-gray-50 font-black text-gray-700 uppercase tracking-tight">{wing.name}</td>
                    <td className="px-6 py-5 border-r border-gray-50 font-bold text-gray-400 uppercase tracking-tighter">{wing.description}</td>
                    <td className="px-6 py-5 border-r border-gray-50 text-center">
                      <span className="bg-emerald-500 text-white text-[9px] font-black px-2.5 py-1 rounded-full uppercase shadow-sm">
                        {wing.status}
                      </span>
                    </td>
                    <td className="px-6 py-5 border-r border-gray-50 text-center">
                      <span className="bg-cyan-500 text-white text-[9px] font-black px-2.5 py-1 rounded shadow-sm">
                        {wing.userCount} Users
                      </span>
                    </td>
                    <td className="px-6 py-5 border-r border-gray-50 font-bold text-gray-400">{wing.date}</td>
                    <td className="px-6 py-5">
                      <div className="flex justify-center gap-1">
                        <button className="p-1.5 bg-[#00cfd5] text-white rounded hover:bg-cyan-600 shadow-sm transition-colors"><Eye className="w-3.5 h-3.5" /></button>
                        <button className="p-1.5 bg-[#f6c23e] text-white rounded hover:bg-yellow-600 shadow-sm transition-colors"><Edit3 className="w-3.5 h-3.5" /></button>
                        <button className="p-1.5 bg-[#6b58d3] text-white rounded hover:bg-purple-600 shadow-sm transition-colors"><Pause className="w-3.5 h-3.5" /></button>
                        <button className="p-1.5 bg-[#e74a3b] text-white rounded hover:bg-red-600 shadow-sm transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
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
