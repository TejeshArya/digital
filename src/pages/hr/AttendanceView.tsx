import React, { useState } from 'react';
import { 
  Eye, Calendar, Filter, FileText, 
  CheckCircle2, XCircle, AlertCircle,
  Clock, MapPin, Building2, ArrowLeft,
  Search, ChevronDown, Download, Printer
} from 'lucide-react';

export function AttendanceView() {
  const [attendanceData] = useState([
    { id: 'DEE280326123', name: 'ALAMANDA NARENDRA', dept: 'P & P', location: 'VISAKHAPATNAM', status: 'Absent', start: '---', end: '---', duration: '---', leaveType: '---', remarks: '---' },
    { id: 'DEE251225102', name: 'ANUPAM KUMAR', dept: 'P & P', location: 'MUMBAI', status: 'On Leave', start: '---', end: '---', duration: '---', leaveType: 'PAT LEAVE', remarks: 'Requested for Paternity Leave' },
    { id: 'DEE251225108', name: 'BIPIN KUMAR THAKUR', dept: 'P & P', location: 'VISAKHAPATNAM', status: 'Absent', start: '---', end: '---', duration: '---', leaveType: '---', remarks: '---' },
    { id: 'DEE291225111', name: 'CHIPULLA SAIRAM', dept: 'P & P', location: 'VISAKHAPATNAM', status: 'Absent', start: '---', end: '---', duration: '---', leaveType: '---', remarks: '---' },
    { id: 'DEE130426131', name: 'GANDIBOINA GOWRI PRASAD', dept: 'P & P', location: 'VISAKHAPATNAM', status: 'Absent', start: '---', end: '---', duration: '---', leaveType: '---', remarks: '---' },
  ]);

  return (
    <div className="p-4 bg-[#f8f9fc] min-h-screen font-sans">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div className="space-y-1">
          <h1 className="text-gray-700 font-black text-xl uppercase tracking-widest flex items-center gap-2">
             Attendance View
          </h1>
          <p className="text-[11px] text-gray-400 font-bold uppercase tracking-tight">View employee attendance - Present and Absent status</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-2.5 bg-[#6b58d3] text-white text-[10px] font-black rounded shadow-lg shadow-purple-100 uppercase tracking-widest hover:bg-purple-700 transition-all">
          <ArrowLeft className="w-4 h-4" /> Back to HR Dashboard
        </button>
      </div>

      <div className="max-w-[1600px] mx-auto space-y-6">
        {/* Filters Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
           <div className="flex flex-wrap items-end gap-4">
              <div className="space-y-2">
                 <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Select Date</label>
                 <div className="relative">
                    <input type="date" defaultValue="2026-05-05" className="px-4 py-2.5 bg-white border border-gray-100 rounded-lg text-[13px] font-bold text-gray-700 focus:outline-none focus:border-blue-400 transition-all" />
                 </div>
              </div>
              <button className="px-6 py-2.5 bg-[#0061f2] text-white text-[11px] font-black rounded-lg shadow-md uppercase tracking-widest hover:bg-blue-700 transition-all">
                 <Filter className="w-4 h-4 inline mr-2" /> Filter
              </button>
              <div className="flex gap-2">
                 <button className="px-5 py-2.5 border border-purple-400 text-purple-600 text-[10px] font-black rounded-lg hover:bg-purple-50 transition-all uppercase tracking-widest">
                    <Calendar className="w-3.5 h-3.5 inline mr-1.5" /> Today
                 </button>
                 <button className="px-5 py-2.5 border border-blue-400 text-blue-600 text-[10px] font-black rounded-lg hover:bg-blue-50 transition-all uppercase tracking-widest">
                    <Calendar className="w-3.5 h-3.5 inline mr-1.5" /> Monthly
                 </button>
                 <button className="px-5 py-2.5 border border-teal-400 text-teal-600 text-[10px] font-black rounded-lg hover:bg-teal-50 transition-all uppercase tracking-widest">
                    <Calendar className="w-3.5 h-3.5 inline mr-1.5" /> Yearly
                 </button>
              </div>
           </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <div className="bg-white border-l-4 border-emerald-400 rounded-xl shadow-sm p-6 flex justify-between items-center group hover:bg-emerald-50/20 transition-all">
              <div className="space-y-1">
                 <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Present</p>
                 <h3 className="text-2xl font-black text-gray-700">0</h3>
              </div>
              <div className="bg-emerald-50 p-3 rounded-full text-emerald-500 group-hover:scale-110 transition-transform shadow-sm border border-emerald-100">
                 <CheckCircle2 className="w-6 h-6" />
              </div>
           </div>

           <div className="bg-white border-l-4 border-rose-400 rounded-xl shadow-sm p-6 flex justify-between items-center group hover:bg-rose-50/20 transition-all">
              <div className="space-y-1">
                 <p className="text-[10px] font-black text-rose-500 uppercase tracking-widest">Absent</p>
                 <h3 className="text-2xl font-black text-gray-700">27</h3>
              </div>
              <div className="bg-rose-50 p-3 rounded-full text-rose-500 group-hover:scale-110 transition-transform shadow-sm border border-rose-100">
                 <XCircle className="w-6 h-6" />
              </div>
           </div>

           <div className="bg-white border-l-4 border-amber-400 rounded-xl shadow-sm p-6 flex justify-between items-center group hover:bg-amber-50/20 transition-all">
              <div className="space-y-1">
                 <p className="text-[10px] font-black text-amber-500 uppercase tracking-widest">On Leave</p>
                 <h3 className="text-2xl font-black text-gray-700">3</h3>
              </div>
              <div className="bg-amber-50 p-3 rounded-full text-amber-500 group-hover:scale-110 transition-transform shadow-sm border border-amber-100">
                 <AlertCircle className="w-6 h-6" />
              </div>
           </div>
        </div>

        {/* Attendance List Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
           <div className="bg-gray-50/50 px-8 py-5 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-[13px] font-black text-blue-700 uppercase tracking-widest">Attendance for Tuesday, May 05, 2026</h3>
              <div className="flex gap-2">
                 <button className="p-2 hover:bg-blue-50 text-blue-400 rounded-lg transition-colors"><Printer className="w-4 h-4" /></button>
                 <button className="p-2 hover:bg-blue-50 text-blue-400 rounded-lg transition-colors"><Download className="w-4 h-4" /></button>
              </div>
           </div>
           <div className="overflow-x-auto min-h-[500px]">
              <table className="w-full text-[11px] border-collapse">
                 <thead>
                    <tr className="bg-white text-gray-400 uppercase tracking-widest border-b border-gray-100">
                       <th className="px-6 py-5 text-left font-black border-r border-gray-50">Employee ID</th>
                       <th className="px-6 py-5 text-left font-black border-r border-gray-50">Employee Name</th>
                       <th className="px-6 py-5 text-center font-black border-r border-gray-50">Department</th>
                       <th className="px-6 py-5 text-center font-black border-r border-gray-50">Location</th>
                       <th className="px-6 py-5 text-center font-black border-r border-gray-50 w-28">Status</th>
                       <th className="px-6 py-5 text-center font-black border-r border-gray-50">Start Time</th>
                       <th className="px-6 py-5 text-center font-black border-r border-gray-50">End Time</th>
                       <th className="px-6 py-5 text-center font-black border-r border-gray-50">Duration</th>
                       <th className="px-6 py-5 text-center font-black border-r border-gray-50 w-32">Leave Type</th>
                       <th className="px-6 py-5 text-left font-black">Remarks</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-gray-50">
                    {attendanceData.map((row, idx) => (
                      <tr key={idx} className="hover:bg-gray-50/30 transition-colors">
                         <td className="px-6 py-6 border-r border-gray-50 font-bold text-gray-400">{row.id}</td>
                         <td className="px-6 py-6 border-r border-gray-50 font-black text-gray-600 uppercase tracking-tight">{row.name}</td>
                         <td className="px-6 py-6 border-r border-gray-50 text-center font-bold text-gray-400">{row.dept}</td>
                         <td className="px-6 py-6 border-r border-gray-50 text-center font-bold text-gray-400">{row.location}</td>
                         <td className="px-6 py-6 border-r border-gray-50 text-center">
                            <span className={`flex items-center justify-center gap-1.5 px-3 py-1 rounded text-[9px] font-black uppercase shadow-sm ${
                              row.status === 'Absent' ? 'bg-[#e74a3b] text-white' : 
                              row.status === 'On Leave' ? 'bg-[#f6c23e] text-white' : 
                              'bg-[#1cc88a] text-white'
                            }`}>
                               {row.status === 'Absent' ? <XCircle className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                               {row.status}
                            </span>
                         </td>
                         <td className="px-6 py-6 border-r border-gray-50 text-center font-bold text-gray-300">{row.start}</td>
                         <td className="px-6 py-6 border-r border-gray-50 text-center font-bold text-gray-300">{row.end}</td>
                         <td className="px-6 py-6 border-r border-gray-50 text-center font-bold text-gray-300">{row.duration}</td>
                         <td className="px-6 py-6 border-r border-gray-50 text-center">
                            {row.leaveType !== '---' ? (
                              <span className="bg-[#6b58d3] text-white text-[8px] font-black px-2 py-1 rounded uppercase tracking-tighter shadow-sm">
                                 {row.leaveType}
                              </span>
                            ) : (
                              <span className="text-gray-200 font-bold">---</span>
                            )}
                         </td>
                         <td className="px-6 py-6 text-[10px] font-bold text-gray-300 uppercase tracking-tight">
                            {row.remarks !== '---' ? <span className="text-gray-400 normal-case italic">{row.remarks}</span> : '---'}
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
