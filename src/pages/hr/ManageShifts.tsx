import React, { useState } from 'react';
import { 
  Clock, Plus, Search, Filter, Edit3, 
  Trash2, Save, FileText, Info, History,
  Calendar, Users, ArrowRight, X, RotateCcw,
  UserCheck
} from 'lucide-react';

export function ManageShifts() {
  const [shifts] = useState([
    { name: 'MUKUNTI SRINU', id: 'DEE280326125', shift: 'DAY SHIFT', start: '09:00 AM', hours: '9.00 hrs', from: '28 Mar 2026', to: 'Active', creator: 'BALMIKI GUPTA', updated: '28 Mar 2026, 09:23 AM', status: 'Active' },
    { name: 'ODOORU MAHESH BABU', id: 'DEE280326124', shift: 'DAY SHIFT', start: '09:00 AM', hours: '9.00 hrs', from: '28 Mar 2026', to: 'Active', creator: 'BALMIKI GUPTA', updated: '28 Mar 2026, 09:22 AM', status: 'Active' },
    { name: 'ALAMANDA NARENDRA', id: 'DEE280326123', shift: 'DAY SHIFT', start: '09:00 AM', hours: '9.00 hrs', from: '28 Mar 2026', to: 'Active', creator: 'BALMIKI GUPTA', updated: '28 Mar 2026, 09:22 AM', status: 'Active' },
    { name: 'UDAYA VARAHA BHASKARARAO ADARI', id: 'DEE291225112', shift: 'DAY SHIFT', start: '09:00 AM', hours: '9.00 hrs', from: '01 Feb 2026', to: 'Active', creator: 'BALMIKI GUPTA', updated: '08 Apr 2026, 07:19 AM', status: 'Active' },
    { name: 'JOG RAJ SINGH', id: 'DEE040126117', shift: 'DAY SHIFT', start: '09:00 AM', hours: '8.00 hrs', from: '05 Jan 2026', to: 'Active', creator: 'BALMIKI GUPTA', updated: '04 Jan 2026, 03:07 PM', status: 'Active' },
    { name: 'RANJAN YADAV', id: 'DEE280326115', shift: 'DAY SHIFT', start: '09:00 AM', hours: '9.00 hrs', from: '01 Jan 2026', to: 'Active', creator: 'BALMIKI GUPTA', updated: '08 Apr 2026, 01:26 PM', status: 'Active' },
  ]);

  return (
    <div className="p-4 bg-[#f8f9fc] min-h-screen font-sans">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <h1 className="text-gray-700 font-black text-xl uppercase tracking-widest flex items-center gap-3">
           Manage Shifts
        </h1>
        <button className="flex items-center gap-2 px-6 py-2.5 bg-[#0061f2] text-white text-[10px] font-black rounded shadow-lg shadow-blue-100 uppercase tracking-widest hover:bg-blue-700 transition-all">
          <Plus className="w-4 h-4" /> Assign Shift
        </button>
      </div>

      <div className="max-w-[1600px] mx-auto space-y-6">
        {/* Main Content Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-blue-50/30 px-6 py-4 border-b border-gray-100 flex items-center gap-2">
            <Clock className="w-4 h-4 text-blue-600" />
            <h2 className="text-[12px] font-black text-blue-700 uppercase tracking-widest">Shift Assignments</h2>
          </div>
          
          {/* Search Bar */}
          <div className="p-6 flex items-center gap-4 border-b border-gray-50">
             <div className="relative max-w-sm w-full">
                <input 
                  type="text" 
                  placeholder="Search by employee name or ID..."
                  className="w-full pl-4 pr-4 py-2.5 bg-gray-50/50 border border-gray-100 rounded text-[13px] font-bold text-gray-700 focus:outline-none focus:border-blue-400 focus:bg-white transition-all"
                />
             </div>
             <button className="flex items-center gap-2 px-6 py-2.5 bg-[#0061f2] text-white text-[10px] font-black rounded shadow-md uppercase tracking-widest hover:bg-blue-700 transition-all">
                <Search className="w-3.5 h-3.5" /> Search
             </button>
          </div>

          <div className="overflow-x-auto min-h-[500px]">
            <table className="w-full text-[11px] border-collapse">
              <thead>
                <tr className="bg-white text-gray-400 uppercase tracking-widest border-b border-gray-100">
                  <th className="px-6 py-5 text-left font-black border-r border-gray-100">Employee</th>
                  <th className="px-6 py-5 text-center font-black border-r border-gray-100">Shift Name</th>
                  <th className="px-6 py-5 text-center font-black border-r border-gray-100">Start Time</th>
                  <th className="px-6 py-5 text-center font-black border-r border-gray-100">Working Hours</th>
                  <th className="px-6 py-5 text-center font-black border-r border-gray-100">Effective From</th>
                  <th className="px-6 py-5 text-center font-black border-r border-gray-100">Effective To</th>
                  <th className="px-6 py-5 text-center font-black border-r border-gray-100">Created By</th>
                  <th className="px-6 py-5 text-center font-black border-r border-gray-100">Updated At</th>
                  <th className="px-6 py-5 text-center font-black border-r border-gray-100 w-24">Status</th>
                  <th className="px-6 py-5 text-center font-black">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {shifts.map((shift, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-6 border-r border-gray-50">
                       <div className="flex flex-col gap-1">
                          <span className="font-black text-gray-700 uppercase tracking-tight">{shift.name}</span>
                          <span className="text-[10px] font-bold text-gray-400">{shift.id}</span>
                       </div>
                    </td>
                    <td className="px-6 py-6 border-r border-gray-50 text-center font-bold text-gray-400 uppercase tracking-tighter">{shift.shift}</td>
                    <td className="px-6 py-6 border-r border-gray-50 text-center font-bold text-gray-400 uppercase tracking-tighter">{shift.start}</td>
                    <td className="px-6 py-6 border-r border-gray-50 text-center font-bold text-gray-400 uppercase tracking-tighter">{shift.hours}</td>
                    <td className="px-6 py-6 border-r border-gray-50 text-center font-bold text-gray-400 uppercase tracking-tighter">{shift.from}</td>
                    <td className="px-6 py-6 border-r border-gray-50 text-center font-bold text-gray-400 uppercase tracking-tighter">{shift.to}</td>
                    <td className="px-6 py-6 border-r border-gray-50 text-center font-bold text-gray-400 uppercase tracking-tighter">{shift.creator}</td>
                    <td className="px-6 py-6 border-r border-gray-50 text-center font-bold text-gray-400 uppercase tracking-tighter max-w-[120px]">{shift.updated}</td>
                    <td className="px-6 py-6 border-r border-gray-50 text-center">
                      <span className="bg-[#1cc88a] text-white text-[9px] font-black px-2.5 py-1 rounded-full uppercase shadow-sm">
                        {shift.status}
                      </span>
                    </td>
                    <td className="px-6 py-6 text-center">
                       <button className="flex items-center gap-1.5 px-4 py-1.5 bg-[#0061f2] text-white rounded text-[9px] font-black uppercase hover:bg-blue-700 shadow-md transition-all">
                          <Edit3 className="w-3.5 h-3.5" /> Edit
                       </button>
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
