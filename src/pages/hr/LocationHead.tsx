import React, { useState } from 'react';
import { 
  MapPin, Plus, Search, Filter, Edit3, 
  Trash2, Save, FileText, Map, List,
  ArrowLeft, Info, UserCheck, ShieldCheck,
  Calendar, Users
} from 'lucide-react';

export function LocationHead() {
  const [heads] = useState([
    { location: 'VISAKHAPATNAM', name: 'RANJAN YADAV', id: 'DEE010126115', date: 'Mar 31, 2026 01:02 PM' },
    { location: 'MUMBAI', name: 'ANUPAM KUMAR', id: 'DEE251225102', date: 'Apr 01, 2026 04:39 AM' },
    { location: 'KARWAR', name: 'ANUPAM KUMAR', id: 'DEE251225102', date: 'Apr 01, 2026 04:39 AM' },
    { location: 'JAMNAGAR', name: 'SANJAY KUMAR MAHATO', id: 'DEE251225103', date: 'Apr 03, 2026 04:00 AM' },
    { location: 'KOLKATA', name: 'RANJAN YADAV', id: 'DEE010126115', date: 'Apr 03, 2026 04:15 AM' },
  ]);

  return (
    <div className="p-4 bg-[#f8f9fc] min-h-screen font-sans">
      {/* Top Header */}
      <div className="flex flex-col mb-6">
        <h1 className="text-gray-700 font-black text-xl uppercase tracking-widest flex items-center gap-2">
          <MapPin className="w-5 h-5 text-blue-600" /> Assign Location Head
        </h1>
        <p className="text-[11px] text-gray-400 font-bold uppercase tracking-tight mt-1">Assign location head for each location (One head per location)</p>
      </div>

      <div className="max-w-5xl mx-auto space-y-6">
        {/* Assign Form Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-blue-50/30 px-6 py-4 border-b border-gray-100 flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-blue-600" />
            <h2 className="text-[12px] font-black text-blue-700 uppercase tracking-widest">Assign Location Head</h2>
          </div>
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  Select Location <span className="text-rose-500">*</span>
                </label>
                <select className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-[13px] font-bold text-gray-700 focus:outline-none focus:border-blue-400 transition-all appearance-none cursor-pointer">
                  <option>Select Location</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  Select Employee <span className="text-rose-500">*</span>
                </label>
                <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-[13px] font-bold text-gray-400 focus:outline-none transition-all cursor-not-allowed">
                  <option>Select Location First</option>
                </select>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button className="flex items-center gap-2 px-10 py-3 bg-[#0061f2] text-white text-[11px] font-black rounded-lg shadow-lg shadow-blue-100 uppercase tracking-widest hover:bg-blue-700 transition-all">
                <Save className="w-4 h-4" /> Assign
              </button>
            </div>
          </div>
        </div>

        {/* Current Heads List Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden min-h-[400px]">
          <div className="bg-gray-50/50 px-6 py-4 border-b border-gray-100 flex items-center gap-2">
            <List className="w-4 h-4 text-blue-600" />
            <h2 className="text-[12px] font-black text-gray-700 uppercase tracking-widest">Current Location Heads</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-[11px] border-collapse">
              <thead>
                <tr className="bg-gray-50/50 text-gray-400 uppercase tracking-widest border-b border-gray-100">
                  <th className="px-8 py-5 text-left font-black border-r border-gray-100">Location</th>
                  <th className="px-8 py-5 text-left font-black border-r border-gray-100">Employee Name</th>
                  <th className="px-8 py-5 text-left font-black border-r border-gray-100">Employee ID</th>
                  <th className="px-8 py-5 text-left font-black">Assigned On</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {heads.map((head, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-8 py-5 border-r border-gray-50 font-black text-gray-700 uppercase tracking-tight">{head.location}</td>
                    <td className="px-8 py-5 border-r border-gray-50 font-black text-gray-600 uppercase tracking-tight">{head.name}</td>
                    <td className="px-8 py-5 border-r border-gray-50 font-bold text-gray-400">{head.id}</td>
                    <td className="px-8 py-5 font-bold text-gray-400 uppercase tracking-tighter flex items-center gap-2">
                       <Calendar className="w-3.5 h-3.5 opacity-30" /> {head.date}
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
