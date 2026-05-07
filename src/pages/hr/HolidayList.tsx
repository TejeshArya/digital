import React, { useState } from 'react';
import { 
  Calendar, Plus, Search, Filter, Edit3, 
  Trash2, Save, FileText, Info, History,
  Users, ArrowRight, X, RotateCcw,
  Settings, CheckCircle2, List, Clock,
  MapPin, Building2, LayoutGrid, CalendarDays
} from 'lucide-react';

export function HolidayList() {
  const [holidays] = useState([
    { name: 'BHOGI', desc: '---' },
    { name: 'BHOGI 2', desc: '---' },
    { name: 'DIWALI', desc: 'DESC' },
    { name: 'DUSSEHRA', desc: 'DESC' },
    { name: 'DUSSHERA', desc: '---' },
    { name: 'DUSSHERA ASTHAMI', desc: '---' },
    { name: 'DUSSHERA NAVMI', desc: '---' },
    { name: 'DUSSHERA SAPTMI', desc: '---' },
  ]);

  return (
    <div className="p-4 bg-[#f8f9fc] min-h-screen font-sans">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div className="space-y-1">
          <h1 className="text-gray-700 font-black text-xl uppercase tracking-widest flex items-center gap-2">
             Holidays Master List
          </h1>
          <p className="text-[11px] text-gray-400 font-bold uppercase tracking-tight">Manage holiday names and descriptions</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-[#1cc88a] text-white text-[10px] font-black rounded shadow-lg shadow-emerald-100 uppercase tracking-widest hover:bg-emerald-700 transition-all">
            <CalendarDays className="w-4 h-4" /> Holiday Calendar
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-[#6b58d3] text-white text-[10px] font-black rounded shadow-lg shadow-purple-100 uppercase tracking-widest hover:bg-purple-700 transition-all">
            <Users className="w-4 h-4" /> Employee Holidays
          </button>
          <button className="flex items-center gap-2 px-6 py-2.5 bg-[#0061f2] text-white text-[10px] font-black rounded shadow-lg shadow-blue-100 uppercase tracking-widest hover:bg-blue-700 transition-all">
            <Plus className="w-4 h-4" /> Add Holiday
          </button>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto space-y-6">
        {/* Holidays Table Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden min-h-[600px]">
          <div className="bg-blue-50/10 px-8 py-5 border-b border-gray-100 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-blue-600" />
            <h2 className="text-[12px] font-black text-blue-700 uppercase tracking-widest">Holidays List</h2>
          </div>

          {/* Search Toolbar */}
          <div className="p-8 border-b border-gray-50 flex gap-3 max-w-2xl">
             <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                <input 
                  type="text" 
                  placeholder="Search by holiday name or description..."
                  className="w-full pl-10 pr-4 py-3 bg-gray-50/50 border border-gray-100 rounded-xl text-[13px] font-bold text-gray-500 focus:outline-none focus:border-blue-400 transition-all"
                />
             </div>
             <button className="px-10 py-3 bg-[#0061f2] text-white text-[11px] font-black rounded-xl shadow-md uppercase tracking-widest hover:bg-blue-700 transition-all flex items-center gap-2">
                <Search className="w-4 h-4" /> Search
             </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-[11px] border-collapse">
              <thead>
                <tr className="bg-white text-gray-400 uppercase tracking-widest border-b border-gray-100">
                  <th className="px-8 py-5 text-left font-black border-r border-gray-50">Holiday Name</th>
                  <th className="px-8 py-5 text-left font-black border-r border-gray-50">Description</th>
                  <th className="px-8 py-5 text-center font-black">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {holidays.map((item, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-8 py-5 border-r border-gray-50 font-black text-gray-600 uppercase tracking-tight">{item.name}</td>
                    <td className="px-8 py-5 border-r border-gray-50 font-bold text-gray-300 uppercase italic">{item.desc}</td>
                    <td className="px-8 py-5 text-center">
                       <div className="flex gap-2 justify-center">
                          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0061f2] text-white rounded text-[9px] font-black uppercase hover:bg-blue-700 shadow-sm transition-all">
                             <Edit3 className="w-3 h-3" /> Edit
                          </button>
                          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-[#e74a3b] text-white rounded text-[9px] font-black uppercase hover:bg-red-700 shadow-sm transition-all">
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
