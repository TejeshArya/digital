import React, { useState } from 'react';
import { 
  Calendar, Plus, Search, Filter, Edit3, 
  Trash2, Save, FileText, Info, History,
  Users, ArrowRight, X, RotateCcw,
  Settings, CheckCircle2, List, Clock,
  CalendarDays, UserPlus, ShieldAlert,
  AlertCircle
} from 'lucide-react';

export function HolidayCalendar() {
  const [holidays] = useState([
    { name: 'MAKAR SANKRANTI / PONGAL', date: '14 Jan 2026', day: 'Wednesday', mandatory: false, limit: '10 holidays max', by: 'BALMIKI GUPTA' },
    { name: 'BHOGI', date: '15 Jan 2026', day: 'Thursday', mandatory: false, limit: '10 holidays max', by: 'BALMIKI GUPTA' },
    { name: 'BHOGI 2', date: '16 Jan 2026', day: 'Friday', mandatory: false, limit: '10 holidays max', by: 'BALMIKI GUPTA' },
    { name: 'REPUBLIC DAY', date: '26 Jan 2026', day: 'Monday', mandatory: true, limit: '10 holidays max', by: 'BALMIKI GUPTA' },
    { name: 'SHIV RATRI', date: '15 Feb 2026', day: 'Sunday', mandatory: false, limit: '10 holidays max', by: 'BALMIKI GUPTA' },
    { name: 'SHIVAJI JAYANTI', date: '19 Feb 2026', day: 'Thursday', mandatory: false, limit: '10 holidays max', by: 'BALMIKI GUPTA' },
    { name: 'HOLI', date: '04 Mar 2026', day: 'Wednesday', mandatory: false, limit: '10 holidays max', by: 'BALMIKI GUPTA' },
    { name: 'UGADI', date: '19 Mar 2026', day: 'Thursday', mandatory: false, limit: '10 holidays max', by: 'BALMIKI GUPTA' },
  ]);

  return (
    <div className="p-4 bg-[#f8f9fc] min-h-screen font-sans">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div className="space-y-1">
          <h1 className="text-gray-700 font-black text-xl uppercase tracking-widest flex items-center gap-2">
             Holiday Calendar
          </h1>
          <p className="text-[11px] text-gray-400 font-bold uppercase tracking-tight">Assign holidays to years with dates and mark as mandatory</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-[#6b58d3] text-white text-[10px] font-black rounded shadow-lg shadow-purple-100 uppercase tracking-widest hover:bg-purple-700 transition-all">
            <List className="w-4 h-4" /> Holiday List
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-[#1cc88a] text-white text-[10px] font-black rounded shadow-lg shadow-emerald-100 uppercase tracking-widest hover:bg-emerald-700 transition-all">
            <Users className="w-4 h-4" /> Employee Holidays
          </button>
          <button className="flex items-center gap-2 px-6 py-2.5 bg-[#0061f2] text-white text-[10px] font-black rounded shadow-lg shadow-blue-100 uppercase tracking-widest hover:bg-blue-700 transition-all">
            <Plus className="w-4 h-4" /> Assign Holidays for 2026
          </button>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto space-y-6">
        {/* Calendar Grid Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden min-h-[700px]">
          <div className="bg-blue-50/10 px-8 py-5 border-b border-gray-100 flex items-center gap-2">
            <CalendarDays className="w-4 h-4 text-blue-600" />
            <h2 className="text-[12px] font-black text-blue-700 uppercase tracking-widest">Holiday Calendar for Year 2026</h2>
          </div>

          <div className="p-8 space-y-8">
             <div className="space-y-2 max-w-xs">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Select Year</label>
                <input type="text" defaultValue="2026" className="w-full px-4 py-2.5 bg-white border border-gray-100 rounded-lg text-[13px] font-bold text-gray-700 focus:outline-none focus:border-blue-400 transition-all" />
             </div>

             <div className="overflow-x-auto">
                <table className="w-full text-[11px] border-collapse">
                   <thead>
                      <tr className="bg-white text-gray-400 uppercase tracking-widest border-b border-gray-100">
                         <th className="px-8 py-5 text-left font-black border-r border-gray-50">Holiday Name</th>
                         <th className="px-8 py-5 text-center font-black border-r border-gray-50">Date</th>
                         <th className="px-8 py-5 text-center font-black border-r border-gray-50">Day</th>
                         <th className="px-8 py-5 text-center font-black border-r border-gray-50">Mandatory</th>
                         <th className="px-8 py-5 text-center font-black border-r border-gray-50">Holiday Limit</th>
                         <th className="px-8 py-5 text-center font-black border-r border-gray-50">Created By</th>
                         <th className="px-8 py-5 text-center font-black">Actions</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-gray-50">
                      {holidays.map((item, idx) => (
                        <tr key={idx} className="hover:bg-gray-50/50 transition-colors group">
                           <td className="px-8 py-5 border-r border-gray-50 font-black text-gray-600 uppercase tracking-tight">{item.name}</td>
                           <td className="px-8 py-5 border-r border-gray-50 text-center font-bold text-gray-400 uppercase tracking-tight whitespace-nowrap">{item.date}</td>
                           <td className="px-8 py-5 border-r border-gray-50 text-center font-bold text-gray-400 uppercase tracking-tight">{item.day}</td>
                           <td className="px-8 py-5 border-r border-gray-50 text-center">
                              {item.mandatory ? (
                                <span className="bg-[#e74a3b] text-white text-[8px] font-black px-2 py-1 rounded shadow-sm uppercase tracking-tighter">Mandatory</span>
                              ) : (
                                <span className="bg-[#6b58d3] text-white text-[8px] font-black px-2 py-1 rounded shadow-sm uppercase tracking-tighter">Optional</span>
                              )}
                           </td>
                           <td className="px-8 py-5 border-r border-gray-50 text-center font-bold text-gray-400 uppercase tracking-tighter">{item.limit}</td>
                           <td className="px-8 py-5 border-r border-gray-50 text-center font-black text-gray-500 uppercase tracking-tight whitespace-nowrap">{item.by}</td>
                           <td className="px-8 py-5 text-center">
                              <button className="p-2 bg-[#e74a3b] text-white rounded hover:bg-red-700 transition-all shadow-sm">
                                 <Trash2 className="w-3.5 h-3.5" />
                              </button>
                           </td>
                        </tr>
                      ))}
                   </tbody>
                </table>
             </div>
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
