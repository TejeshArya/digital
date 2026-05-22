import React, { useState } from 'react';
import { 
  Calendar, Plus, Search, Filter, Edit3, 
  Trash2, Save, FileText, Info, History,
  Users, ArrowRight, X, RotateCcw,
  Settings, CheckCircle2, List, Clock,
  UserPlus, CalendarDays, ShieldCheck
} from 'lucide-react';

export function EmployeeHolidays() {
  const [assignments] = useState([
    { name: 'RAHI SAGAR KUMAR', id: 'DEE030126116', holiday: 'MAKAR SANKRANTI / PONGAL', date: '14 Jan 2026', type: 'Optional', by: 'BALMIKI GUPTA', at: '13 Apr 2026' },
    { name: 'RAHI SAGAR KUMAR', id: 'DEE030126116', holiday: 'HOLI', date: '04 Mar 2026', type: 'Optional', by: 'BALMIKI GUPTA', at: '13 Apr 2026' },
    { name: 'RAHI SAGAR KUMAR', id: 'DEE030126116', holiday: 'UGADI', date: '19 Mar 2026', type: 'Optional', by: 'BALMIKI GUPTA', at: '13 Apr 2026' },
    { name: 'UDAYA VARAHA BHASKARARAO ADARI', id: 'DEE291225112', holiday: 'MAKAR SANKRANTI / PONGAL', date: '14 Jan 2026', type: 'Optional', by: 'BALMIKI GUPTA', at: '08 Apr 2026' },
    { name: 'UDAYA VARAHA BHASKARARAO ADARI', id: 'DEE291225112', holiday: 'HOLI', date: '04 Mar 2026', type: 'Optional', by: 'BALMIKI GUPTA', at: '08 Apr 2026' },
    { name: 'UDAYA VARAHA BHASKARARAO ADARI', id: 'DEE291225112', holiday: 'UGADI', date: '19 Mar 2026', type: 'Optional', by: 'BALMIKI GUPTA', at: '08 Apr 2026' },
  ]);

  return (
    <div className="p-4 bg-[#f8f9fc] min-h-screen font-sans">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div className="space-y-1">
          <h1 className="text-gray-700 font-black text-xl uppercase tracking-widest flex items-center gap-2">
             Employee Holidays
          </h1>
          <p className="text-[11px] text-gray-400 font-bold uppercase tracking-tight">View and manage holiday assignments for employees</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-[#6b58d3] text-white text-[10px] font-black rounded shadow-lg shadow-purple-100 uppercase tracking-widest hover:bg-purple-700 transition-all">
            <List className="w-4 h-4" /> Holiday List
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-[#1cc88a] text-white text-[10px] font-black rounded shadow-lg shadow-emerald-100 uppercase tracking-widest hover:bg-emerald-700 transition-all">
            <CalendarDays className="w-4 h-4" /> Holiday Calendar
          </button>
          <button className="flex items-center gap-2 px-6 py-2.5 bg-[#0061f2] text-white text-[10px] font-black rounded shadow-lg shadow-blue-100 uppercase tracking-widest hover:bg-blue-700 transition-all">
            <UserPlus className="w-4 h-4" /> Assign Holidays
          </button>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto space-y-6">
        {/* Assignment Grid Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden min-h-[700px]">
          <div className="bg-blue-50/10 px-8 py-5 border-b border-gray-100 flex items-center gap-2">
            <Users className="w-4 h-4 text-blue-600" />
            <h2 className="text-[12px] font-black text-blue-700 uppercase tracking-widest">Employee Holiday Assignments for Year 2026</h2>
          </div>

          <div className="p-8 space-y-8">
             {/* Filter Bar */}
             <div className="flex flex-wrap gap-6 max-w-4xl">
                <div className="space-y-2 flex-1 min-w-[200px]">
                   <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Select Year</label>
                   <input type="text" defaultValue="2026" className="w-full px-4 py-2.5 bg-white border border-gray-100 rounded-lg text-[13px] font-bold text-gray-700 focus:outline-none focus:border-blue-400 transition-all" />
                </div>
                <div className="space-y-2 flex-1 min-w-[300px]">
                   <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Filter by Employee</label>
                   <select className="w-full px-4 py-2.5 bg-white border border-gray-100 rounded-lg text-[13px] font-bold text-gray-700 focus:outline-none focus:border-blue-400 transition-all appearance-none">
                      <option>All Employees</option>
                   </select>
                </div>
             </div>

             <div className="overflow-x-auto">
                <table className="w-full text-[11px] border-collapse">
                   <thead>
                      <tr className="bg-white text-gray-400 uppercase tracking-widest border-b border-gray-100">
                         <th className="px-8 py-5 text-left font-black border-r border-gray-50">Employee</th>
                         <th className="px-8 py-5 text-left font-black border-r border-gray-50">Holiday Name</th>
                         <th className="px-8 py-5 text-center font-black border-r border-gray-50">Date</th>
                         <th className="px-8 py-5 text-center font-black border-r border-gray-50">Type</th>
                         <th className="px-8 py-5 text-center font-black border-r border-gray-50">Assigned By</th>
                         <th className="px-8 py-5 text-center font-black border-r border-gray-50">Assigned At</th>
                         <th className="px-8 py-5 text-center font-black">Actions</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-gray-50">
                      {assignments.map((item, idx) => (
                        <tr key={idx} className="hover:bg-gray-50/50 transition-colors group">
                           <td className="px-8 py-6 border-r border-gray-50">
                              <div className="space-y-1">
                                 <h4 className="font-black text-gray-700 uppercase tracking-tight">{item.name}</h4>
                                 <span className="text-[9px] font-bold text-gray-300 uppercase tracking-tighter">{item.id}</span>
                              </div>
                           </td>
                           <td className="px-8 py-6 border-r border-gray-50 font-black text-gray-500 uppercase tracking-tight">{item.holiday}</td>
                           <td className="px-8 py-6 border-r border-gray-50 text-center font-bold text-gray-400 uppercase tracking-tight whitespace-nowrap">{item.date}</td>
                           <td className="px-8 py-6 border-r border-gray-50 text-center">
                              <span className="bg-[#1cc88a] text-white text-[8px] font-black px-2 py-0.5 rounded shadow-sm uppercase tracking-tighter">
                                 {item.type}
                              </span>
                           </td>
                           <td className="px-8 py-6 border-r border-gray-50 text-center font-black text-gray-500 uppercase tracking-tight whitespace-nowrap">{item.by}</td>
                           <td className="px-8 py-6 border-r border-gray-50 text-center font-bold text-gray-400 uppercase tracking-tighter whitespace-nowrap">
                              <div className="flex items-center justify-center gap-2 uppercase tracking-tighter">
                                 <Clock className="w-3.5 h-3.5 opacity-30" />
                                 {item.at}
                              </div>
                           </td>
                           <td className="px-8 py-6 text-center">
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
