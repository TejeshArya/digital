import React, { useState } from 'react';
import { 
  CheckCircle2, XCircle, Clock, Search, 
  Filter, Calendar, ArrowLeft, UserCheck,
  AlertTriangle, Check, X, ShieldCheck
} from 'lucide-react';

export function AttendanceApproval() {
  const [approvals] = useState([
    { name: 'PENTAPALLI ASHA JYOTHI', id: 'DEE291225113', date: 'May 05, 2026', type: 'Present', start: '08:50 AM', end: 'Missing', duration: '---', remarks: '---', status: 'Pending' },
    { name: 'SAYAD SARFARAZ', id: 'DEE040426129', date: 'May 05, 2026', type: 'Present', start: '08:52 AM', end: 'Missing', duration: '---', remarks: '---', status: 'Pending' },
    { name: 'MITHUN KUMAR', id: 'DEE251225109', date: 'May 05, 2026', type: 'Present', start: '09:12 AM', end: 'Missing', duration: '---', remarks: '---', status: 'Pending' },
    { name: 'JOG RAJ SINGH', id: 'DEE040126117', date: 'May 05, 2026', type: 'Present', start: '09:12 AM', end: 'Missing', duration: '---', remarks: '---', status: 'Pending' },
    { name: 'CHIPULLA SAIRAM', id: 'DEE291225111', date: 'May 05, 2026', type: 'Present', start: '09:32 AM', end: 'Missing', duration: '---', remarks: '---', status: 'Pending' },
  ]);

  return (
    <div className="p-4 bg-[#f8f9fc] min-h-screen font-sans">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div className="space-y-1">
          <h1 className="text-gray-700 font-black text-xl uppercase tracking-widest flex items-center gap-2">
             Attendance Approval
          </h1>
          <p className="text-[11px] text-gray-400 font-bold uppercase tracking-tight">Approve or reject daily attendance records</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-2.5 bg-[#6b58d3] text-white text-[10px] font-black rounded shadow-lg shadow-purple-100 uppercase tracking-widest hover:bg-purple-700 transition-all">
          <ArrowLeft className="w-4 h-4" /> Back to Attendance
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
              <button className="px-10 py-2.5 bg-[#0061f2] text-white text-[11px] font-black rounded-lg shadow-md uppercase tracking-widest hover:bg-blue-700 transition-all">
                 <Filter className="w-4 h-4 inline mr-2" /> Filter
              </button>
           </div>
        </div>

        {/* Approval Grid */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden min-h-[600px]">
           <div className="overflow-x-auto">
              <table className="w-full text-[11px] border-collapse">
                 <thead>
                    <tr className="bg-gray-50/50 text-gray-400 uppercase tracking-widest border-b border-gray-100">
                       <th className="px-8 py-5 text-left font-black">Employee</th>
                       <th className="px-6 py-5 text-left font-black">Date</th>
                       <th className="px-6 py-5 text-center font-black">Type</th>
                       <th className="px-6 py-5 text-center font-black">Start Time</th>
                       <th className="px-6 py-5 text-center font-black">End Time</th>
                       <th className="px-6 py-5 text-center font-black">Duration / Leave Type</th>
                       <th className="px-6 py-5 text-center font-black">Remarks</th>
                       <th className="px-6 py-5 text-center font-black">Status</th>
                       <th className="px-8 py-5 text-center font-black">Actions</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-gray-50">
                    {approvals.map((row, idx) => (
                      <tr key={idx} className="hover:bg-gray-50/30 transition-colors">
                         <td className="px-8 py-6">
                            <div className="flex flex-col gap-1">
                               <span className="font-black text-gray-600 uppercase tracking-tight">{row.name}</span>
                               <span className="text-[10px] font-bold text-gray-300">{row.id}</span>
                            </div>
                         </td>
                         <td className="px-6 py-6 font-bold text-gray-400 uppercase tracking-tighter whitespace-nowrap">{row.date}</td>
                         <td className="px-6 py-6 text-center">
                            <span className="bg-[#1cc88a] text-white text-[9px] font-black px-3 py-1 rounded shadow-sm uppercase flex items-center justify-center gap-1.5 mx-auto w-fit">
                               <Clock className="w-3 h-3" /> {row.type}
                            </span>
                         </td>
                         <td className="px-6 py-6 text-center font-bold text-gray-400">{row.start}</td>
                         <td className="px-6 py-6 text-center">
                            {row.end === 'Missing' ? (
                              <span className="bg-[#f6c23e] text-white text-[9px] font-black px-3 py-1 rounded shadow-sm uppercase flex items-center justify-center gap-1.5 mx-auto w-fit">
                                 <AlertTriangle className="w-3 h-3" /> {row.end}
                              </span>
                            ) : (
                              <span className="font-bold text-gray-400">{row.end}</span>
                            )}
                         </td>
                         <td className="px-6 py-6 text-center font-bold text-gray-300">{row.duration}</td>
                         <td className="px-6 py-6 text-center font-bold text-gray-300">{row.remarks}</td>
                         <td className="px-6 py-6 text-center">
                            <span className="bg-[#f6c23e] text-white text-[9px] font-black px-3 py-1 rounded shadow-sm uppercase mx-auto w-fit block tracking-widest">
                               {row.status}
                            </span>
                         </td>
                         <td className="px-8 py-6 text-center">
                            <div className="flex gap-2 justify-center items-center">
                               <button className="flex items-center gap-1.5 px-4 py-2 bg-[#1cc88a] text-white rounded text-[9px] font-black uppercase hover:bg-emerald-600 shadow-md transition-all">
                                  <Check className="w-3.5 h-3.5" /> Approve
                               </button>
                               <button className="flex items-center gap-1.5 px-4 py-2 bg-[#e74a3b] text-white rounded text-[9px] font-black uppercase hover:bg-red-600 shadow-md transition-all">
                                  <X className="w-3.5 h-3.5" /> Reject
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
