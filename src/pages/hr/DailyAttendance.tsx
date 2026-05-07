import React, { useState } from 'react';
import { 
  Calendar, Plus, Search, Filter, Edit3, 
  Trash2, Save, FileText, Info, History,
  MapPin, Users, CheckCircle2, Clock, 
  X, Map, Smartphone, ArrowRight, Check
} from 'lucide-react';

export function DailyAttendance() {
  const [recentAttendance] = useState([
    { date: 'Apr 30, 2026', start: '08:55 AM', end: '06:00 PM', status: 'Approved' },
    { date: 'Apr 29, 2026', start: '08:55 AM', end: '06:00 PM', status: 'Approved' },
    { date: 'Apr 28, 2026', start: '08:55 AM', end: '06:00 PM', status: 'Approved' },
    { date: 'Apr 27, 2026', start: '08:55 AM', end: '06:00 PM', status: 'Approved' },
    { date: 'Apr 26, 2026', start: '08:55 AM', end: '06:00 PM', status: 'Approved' },
    { date: 'Apr 25, 2026', start: '08:55 AM', end: '06:00 PM', status: 'Approved' },
    { date: 'Apr 24, 2026', start: '08:55 AM', end: '06:00 PM', status: 'Approved' },
    { date: 'Apr 23, 2026', start: '08:55 AM', end: '06:00 PM', status: 'Approved' },
    { date: 'Apr 22, 2026', start: '08:55 AM', end: '06:00 PM', status: 'Approved' },
    { date: 'Apr 21, 2026', start: '08:55 AM', end: '06:00 PM', status: 'Approved' },
  ]);

  return (
    <div className="p-4 bg-[#f8f9fc] min-h-screen font-sans">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div className="space-y-1">
          <h1 className="text-gray-700 font-black text-xl uppercase tracking-widest flex items-center gap-2">
             Daily Attendance
          </h1>
          <p className="text-[11px] text-gray-400 font-bold uppercase tracking-tight">Track your daily attendance</p>
        </div>
        <div className="flex flex-wrap gap-2">
           <button className="flex items-center gap-2 px-4 py-2.5 bg-[#0061f2] text-white text-[10px] font-black rounded shadow-lg shadow-blue-100 uppercase tracking-widest hover:bg-blue-700 transition-all">
              <Users className="w-4 h-4" /> Mark Attendance (HR)
           </button>
           <button className="flex items-center gap-2 px-4 py-2.5 bg-[#f6c23e] text-white text-[10px] font-black rounded shadow-lg shadow-yellow-100 uppercase tracking-widest hover:bg-yellow-600 transition-all">
              <Calendar className="w-4 h-4" /> Apply Leave
           </button>
           <button className="flex items-center gap-2 px-4 py-2.5 bg-[#1cc88a] text-white text-[10px] font-black rounded shadow-lg shadow-green-100 uppercase tracking-widest hover:bg-emerald-600 transition-all">
              <CheckCircle2 className="w-4 h-4" /> Approve Attendance
           </button>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Column */}
        <div className="lg:col-span-2 space-y-6">
           {/* Date Display */}
           <div className="text-center space-y-1">
              <p className="text-[11px] font-black text-gray-300 uppercase tracking-[0.3em]">DEE251225103</p>
              <h2 className="text-[15px] font-black text-gray-600 uppercase tracking-widest">Tuesday, May 05, 2026</h2>
           </div>

           {/* Today's Attendance Card */}
           <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="bg-[#0061f2] px-6 py-4 flex items-center gap-3">
                 <Calendar className="w-5 h-5 text-white" />
                 <h3 className="text-white text-[12px] font-black uppercase tracking-widest">Today's Attendance <span className="text-white/60 text-[10px] ml-2">(Employees You Manage)</span></h3>
              </div>
              <div className="p-20 flex flex-col items-center justify-center gap-4">
                 <div className="bg-gray-100 p-4 rounded-xl">
                    <X className="w-8 h-8 text-gray-300" />
                 </div>
                 <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest">No attendance marked today for managed employees.</p>
              </div>
           </div>

           {/* Geofence Settings */}
           <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 space-y-6">
              <div className="flex items-center gap-3 text-gray-700">
                 <MapPin className="w-5 h-5 text-blue-600" />
                 <h3 className="text-[13px] font-black uppercase tracking-widest">Office Location & Geofence Settings</h3>
              </div>
              
              <div className="space-y-4 pt-4 border-t border-gray-50">
                 <div className="flex items-center gap-2 text-blue-600">
                    <CheckSquare className="w-4 h-4" />
                    <span className="text-[11px] font-black uppercase tracking-widest">Step 1: Select Location</span>
                 </div>
                 <div className="space-y-2 max-w-2xl">
                    <label className="text-[10px] font-black text-rose-500 uppercase tracking-widest">Location *</label>
                    <select className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-[12px] font-bold text-gray-500 focus:outline-none focus:border-blue-400 transition-all appearance-none cursor-pointer">
                       <option>-- Select Location --</option>
                    </select>
                 </div>
              </div>
           </div>

           {/* Location Check */}
           <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 space-y-6">
              <div className="flex items-center gap-3 text-gray-700">
                 <Users className="w-5 h-5 text-blue-600" />
                 <h3 className="text-[13px] font-black uppercase tracking-widest">Employee Location Check</h3>
              </div>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-tight">Select location, sub location, and device to check if you are within office range.</p>
              
              <div className="space-y-2 max-w-2xl pt-4 border-t border-gray-50">
                 <label className="text-[10px] font-black text-rose-500 uppercase tracking-widest">Select Location *</label>
                 <select className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-[12px] font-bold text-gray-500 focus:outline-none focus:border-blue-400 transition-all appearance-none cursor-pointer">
                    <option>-- Select Location --</option>
                 </select>
              </div>
           </div>
        </div>

        {/* Sidebar Column */}
        <div className="space-y-6">
           <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-100 bg-gray-50/50">
                 <h3 className="text-[13px] font-black text-gray-700 uppercase tracking-widest">Recent Attendance</h3>
              </div>
              <div className="divide-y divide-gray-50 max-h-[1000px] overflow-y-auto custom-scrollbar">
                 {recentAttendance.map((item, idx) => (
                   <div key={idx} className="p-6 hover:bg-gray-50/30 transition-colors flex justify-between items-center">
                      <div className="space-y-1">
                         <h4 className="text-[13px] font-black text-gray-700 uppercase tracking-tight">{item.date}</h4>
                         <p className="text-[10px] font-bold text-gray-400 flex items-center gap-1.5 uppercase">
                            <Clock className="w-3 h-3" /> Start: {item.start} | End: {item.end}
                         </p>
                      </div>
                      <span className="bg-[#1cc88a] text-white text-[8px] font-black px-2 py-0.5 rounded shadow-sm uppercase tracking-widest">
                         {item.status}
                      </span>
                   </div>
                 ))}
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

function CheckSquare(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="9 11 12 14 22 4" />
      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
    </svg>
  );
}
