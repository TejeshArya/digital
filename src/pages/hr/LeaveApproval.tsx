import React, { useState } from 'react';
import { 
  ShieldCheck, Calendar, Clock, CheckCircle2, 
  XCircle, AlertCircle, Filter, Search,
  ArrowRight, List, UserCheck, Forward,
  MoreVertical, Info, FileText
} from 'lucide-react';

export function LeaveApproval() {
  const [leaveApplications] = useState([
    { 
      name: 'MUKESH KUMAR', id: 'DEE251225106', 
      start: 'Apr 30, 2026', end: 'Apr 30, 2026', days: 1, 
      type: 'UPL (1 days)', category: 'Regular', reason: '[Manual Entry]', applied: 'May 05, 2026',
      recommendation: { status: 'Approved', by: 'SANJAY KUMAR MAHATO', at: 'May 05, 2026 11:38 AM' },
      forwarding: { status: 'Forwarded', by: 'SANJAY KUMAR MAHATO', at: 'May 05, 2026 11:39 AM' },
      hrApproval: { status: 'Approved', by: 'SANJAY KUMAR MAHATO', at: 'May 05, 2026 11:39 AM' },
      finalStatus: 'Approved'
    },
    { 
      name: 'MUKESH KUMAR', id: 'DEE251225106', 
      start: 'Apr 29, 2026', end: 'Apr 29, 2026', days: 1, 
      type: 'UPL (1 days)', category: 'Regular', reason: '[Manual Entry]', applied: 'May 05, 2026',
      recommendation: { status: 'Approved', by: 'SANJAY KUMAR MAHATO', at: 'May 05, 2026 11:39 AM' },
      forwarding: { status: 'Forwarded', by: 'SANJAY KUMAR MAHATO', at: 'May 05, 2026 11:39 AM' },
      hrApproval: { status: 'Approved', by: 'SANJAY KUMAR MAHATO', at: 'May 05, 2026 11:39 AM' },
      finalStatus: 'Approved'
    },
    { 
      name: 'MUKESH KUMAR', id: 'DEE251225106', 
      start: 'Apr 28, 2026', end: 'Apr 28, 2026', days: 1, 
      type: 'UPL (1 days)', category: 'Regular', reason: '[Manual Entry]', applied: 'May 05, 2026',
      recommendation: { status: 'Approved', by: 'SANJAY KUMAR MAHATO', at: 'May 05, 2026 11:39 AM' },
      forwarding: { status: 'Forwarded', by: 'SANJAY KUMAR MAHATO', at: 'May 05, 2026 11:39 AM' },
      hrApproval: { status: 'Approved', by: 'SANJAY KUMAR MAHATO', at: 'May 05, 2026 11:39 AM' },
      finalStatus: 'Approved'
    },
  ]);

  return (
    <div className="p-4 bg-[#f8f9fc] min-h-screen font-sans">
      {/* Top Header */}
      <div className="flex flex-col mb-6">
        <h1 className="text-gray-700 font-black text-xl uppercase tracking-widest flex items-center gap-2">
           Leave Approval
        </h1>
        <p className="text-[11px] text-gray-400 font-bold uppercase tracking-tight mt-1">Approve or reject leave applications and emergency leaves</p>
      </div>

      <div className="max-w-[1800px] mx-auto space-y-6">
        {/* Main Approval Grid Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden min-h-[700px]">
           <div className="px-8 py-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/30">
              <h3 className="text-[12px] font-black text-gray-700 uppercase tracking-widest flex items-center gap-2">
                 <Calendar className="w-4 h-4 text-blue-600" /> Leave Applications
              </h3>
              <div className="flex bg-white rounded-lg p-1 border border-gray-100 shadow-sm">
                 <button className="px-4 py-1.5 bg-[#0061f2] text-white text-[9px] font-black rounded shadow-sm uppercase">All</button>
                 <button className="px-4 py-1.5 text-amber-500 text-[9px] font-black rounded uppercase hover:bg-amber-50">Pending</button>
                 <button className="px-4 py-1.5 text-emerald-500 text-[9px] font-black rounded uppercase hover:bg-emerald-50">Approved</button>
                 <button className="px-4 py-1.5 text-rose-500 text-[9px] font-black rounded uppercase hover:bg-rose-50">Rejected</button>
              </div>
           </div>

           <div className="overflow-x-auto">
              <table className="w-full text-[10px] border-collapse">
                 <thead>
                    <tr className="bg-gray-50/10 text-gray-400 uppercase tracking-widest border-b border-gray-100 font-black">
                       <th className="px-6 py-5 text-left border-r border-gray-50">Employee</th>
                       <th className="px-4 py-5 text-center border-r border-gray-50">Start Date</th>
                       <th className="px-4 py-5 text-center border-r border-gray-50">End Date</th>
                       <th className="px-4 py-5 text-center border-r border-gray-50">Days</th>
                       <th className="px-6 py-5 text-center border-r border-gray-50">Leave Type(s)</th>
                       <th className="px-4 py-5 text-center border-r border-gray-50">Category</th>
                       <th className="px-4 py-5 text-center border-r border-gray-50">Reason</th>
                       <th className="px-4 py-5 text-center border-r border-gray-50">Applied On</th>
                       <th className="px-6 py-5 text-center border-r border-gray-50">Recommendation</th>
                       <th className="px-6 py-5 text-center border-r border-gray-50 whitespace-nowrap">Location Head Forwarding</th>
                       <th className="px-6 py-5 text-center border-r border-gray-50">HR Approval</th>
                       <th className="px-6 py-5 text-center">Status</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-gray-50">
                    {leaveApplications.map((app, idx) => (
                      <tr key={idx} className="bg-emerald-50/20 hover:bg-emerald-50/40 transition-colors">
                         <td className="px-6 py-6 border-r border-gray-50">
                            <div className="space-y-1">
                               <h4 className="font-black text-gray-700 uppercase tracking-tight">{app.name}</h4>
                               <span className="text-[8px] font-bold text-gray-300 uppercase tracking-tighter">{app.id}</span>
                            </div>
                         </td>
                         <td className="px-4 py-6 border-r border-gray-50 text-center font-bold text-gray-500 uppercase leading-tight">{app.start}</td>
                         <td className="px-4 py-6 border-r border-gray-50 text-center font-bold text-gray-500 uppercase leading-tight">{app.end}</td>
                         <td className="px-4 py-6 border-r border-gray-50 text-center font-black text-gray-800 text-[12px]">{app.days}</td>
                         <td className="px-6 py-6 border-r border-gray-50 text-center">
                            <span className="bg-purple-600 text-white text-[8px] font-black px-2 py-0.5 rounded shadow-sm uppercase tracking-tighter">{app.type}</span>
                         </td>
                         <td className="px-4 py-6 border-r border-gray-50 text-center">
                            <span className="bg-[#0061f2] text-white text-[8px] font-black px-2 py-0.5 rounded shadow-sm uppercase tracking-tighter">{app.category}</span>
                         </td>
                         <td className="px-4 py-6 border-r border-gray-50 text-center font-bold text-gray-300 italic uppercase">{app.reason}</td>
                         <td className="px-4 py-6 border-r border-gray-50 text-center font-bold text-gray-500 uppercase leading-tight">{app.applied}</td>
                         
                         {/* Status Stacks */}
                         <td className="px-6 py-6 border-r border-gray-50">
                            <div className="space-y-1 text-center">
                               <span className="bg-[#1cc88a] text-white text-[8px] font-black px-2 py-0.5 rounded shadow-sm uppercase tracking-tighter flex items-center justify-center gap-1 mx-auto w-fit">
                                  <CheckCircle2 className="w-2.5 h-2.5" /> {app.recommendation.status}
                               </span>
                               <p className="text-[7px] font-black text-gray-400 uppercase tracking-tighter">{app.recommendation.by}</p>
                               <p className="text-[7px] font-bold text-gray-300 uppercase tracking-tighter">{app.recommendation.at}</p>
                            </div>
                         </td>

                         <td className="px-6 py-6 border-r border-gray-50">
                            <div className="space-y-1 text-center">
                               <span className="bg-[#0061f2] text-white text-[8px] font-black px-2 py-0.5 rounded shadow-sm uppercase tracking-tighter flex items-center justify-center gap-1 mx-auto w-fit">
                                  <Forward className="w-2.5 h-2.5" /> {app.forwarding.status}
                               </span>
                               <p className="text-[7px] font-black text-gray-400 uppercase tracking-tighter">{app.forwarding.by}</p>
                               <p className="text-[7px] font-bold text-gray-300 uppercase tracking-tighter">{app.forwarding.at}</p>
                            </div>
                         </td>

                         <td className="px-6 py-6 border-r border-gray-50">
                            <div className="space-y-1 text-center">
                               <span className="bg-[#1cc88a] text-white text-[8px] font-black px-2 py-0.5 rounded shadow-sm uppercase tracking-tighter flex items-center justify-center gap-1 mx-auto w-fit">
                                  <CheckCircle2 className="w-2.5 h-2.5" /> {app.hrApproval.status}
                               </span>
                               <p className="text-[7px] font-black text-gray-400 uppercase tracking-tighter">{app.hrApproval.by}</p>
                               <p className="text-[7px] font-bold text-gray-300 uppercase tracking-tighter">{app.hrApproval.at}</p>
                            </div>
                         </td>

                         <td className="px-6 py-6 text-center">
                            <span className="bg-[#1cc88a] text-white text-[9px] font-black px-4 py-1.5 rounded-lg shadow-sm uppercase tracking-widest border border-emerald-400">
                               {app.finalStatus}
                            </span>
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
