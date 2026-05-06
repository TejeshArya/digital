import React, { useState } from 'react';
import { 
  FileText, Calendar, Filter, ArrowLeft, 
  CheckCircle2, AlertCircle, Clock, 
  Info, Save, Download, Printer,
  ChevronDown, UserCheck, Users, Timer
} from 'lucide-react';

export function SalaryDraft() {
  const [selectedMonth, setSelectedMonth] = useState<string>('');
  const [isGenerated, setIsGenerated] = useState(false);

  const [employees] = useState([
    { name: 'ANUPAM KUMAR', id: 'DEE251225102', dept: 'P & P', status: 'Ready to Run', present: 26, totalPresent: '30.0', calc: '(26 + 4S + 0H)', totalDays: 30, leave: 0, deduction: '0.00', emergency: 0, holidays: 0, otHours: 0, otAmount: 0, expected: '270.00' },
    { name: 'LEELA RAM PRASANTH', id: 'DEE251225104', dept: 'P & P', status: 'Ready to Run', present: 21, totalPresent: '25.0', calc: '(21 + 4S + 0H)', totalDays: 30, leave: 3, deduction: '4,166.67', emergency: 0, holidays: 0, otHours: 0, otAmount: 0, expected: '270.00' },
    { name: 'MANTU KUMAR', id: 'DEE251225105', dept: 'P & P', status: 'Ready to Run', present: 26, totalPresent: '30.0', calc: '(26 + 4S + 0H)', totalDays: 30, leave: 0, deduction: '0.00', emergency: 0, holidays: 0, otHours: 0, otAmount: 0, expected: '270.00' },
    { name: 'MUKESH KUMAR', id: 'DEE251225106', dept: 'P & P', status: 'Ready to Run', present: 20, totalPresent: '24.0', calc: '(20 + 4S + 0H)', totalDays: 30, leave: 6, deduction: '3,600.00', emergency: 0, holidays: 0, otHours: 0, otAmount: 900, expected: '270.00' },
    { name: 'RANJAN KUMAR GUPTA', id: 'DEE251225107', dept: 'P & P', status: 'Ready to Run', present: 26, totalPresent: '30.0', calc: '(26 + 4S + 0H)', totalDays: 30, leave: 0, deduction: '0.00', emergency: 0, holidays: 0, otHours: 0, otAmount: 0, expected: '270.00' },
  ]);

  if (!isGenerated) {
    return (
      <div className="p-4 bg-[#f8f9fc] min-h-screen font-sans flex flex-col items-center justify-center">
         <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-12 w-full max-w-md text-center space-y-8 animate-in fade-in zoom-in duration-500">
            <div className="bg-blue-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto text-blue-600 shadow-sm border border-blue-100">
               <Calendar className="w-10 h-10" />
            </div>
            <div className="space-y-2">
               <h1 className="text-gray-700 font-black text-xl uppercase tracking-widest">Select Month</h1>
               <p className="text-[11px] text-gray-400 font-bold uppercase tracking-tight">Generate draft for salary calculation</p>
            </div>
            <div className="space-y-4">
               <input 
                 type="month" 
                 onChange={(e) => setSelectedMonth(e.target.value)}
                 className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-xl text-[14px] font-black text-gray-700 focus:outline-none focus:border-blue-400 transition-all shadow-inner" 
               />
               <button 
                 onClick={() => setIsGenerated(true)}
                 disabled={!selectedMonth}
                 className="w-full py-4 bg-[#0061f2] text-white text-[12px] font-black rounded-xl shadow-lg shadow-blue-100 uppercase tracking-widest hover:bg-blue-700 transition-all disabled:bg-gray-200 disabled:shadow-none"
               >
                  Generate Draft
               </button>
            </div>
         </div>
      </div>
    );
  }

  return (
    <div className="p-4 bg-[#f8f9fc] min-h-screen font-sans">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div className="space-y-1">
          <h1 className="text-gray-700 font-black text-xl uppercase tracking-widest flex items-center gap-2">
             Salary Draft Preview – April 2026
          </h1>
          <p className="text-[11px] text-gray-400 font-bold uppercase tracking-tight">Review and edit salary calculations before generating the final run</p>
        </div>
        <button 
          onClick={() => setIsGenerated(false)}
          className="flex items-center gap-2 px-6 py-2.5 bg-[#6b58d3] text-white text-[10px] font-black rounded shadow-lg shadow-purple-100 uppercase tracking-widest hover:bg-purple-700 transition-all"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
      </div>

      <div className="max-w-[1700px] mx-auto space-y-6">
        {/* Main Draft Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden min-h-[700px]">
           <div className="bg-[#0061f2] px-8 py-5 border-b border-blue-400 flex items-center gap-2">
              <Users className="w-4 h-4 text-white" />
              <h3 className="text-[12px] font-black text-white uppercase tracking-widest">Employees (18)</h3>
           </div>

           <div className="overflow-x-auto">
              <table className="w-full text-[11px] border-collapse">
                 <thead>
                    <tr className="bg-gray-50/50 text-gray-400 uppercase tracking-widest border-b border-gray-100">
                       <th className="px-6 py-5 text-left font-black border-r border-gray-100 w-64">Employee</th>
                       <th className="px-4 py-5 text-center font-black border-r border-gray-100 w-24">Present Days</th>
                       <th className="px-6 py-5 text-center font-black border-r border-gray-100 w-32">Total Present Days</th>
                       <th className="px-4 py-5 text-center font-black border-r border-gray-100 w-24">Total Days</th>
                       <th className="px-4 py-5 text-center font-black border-r border-gray-100 w-24">Leave Days</th>
                       <th className="px-4 py-5 text-center font-black border-r border-gray-100 w-32">Leave Deduction</th>
                       <th className="px-4 py-5 text-center font-black border-r border-gray-100 w-28">Emergency Leave</th>
                       <th className="px-4 py-5 text-center font-black border-r border-gray-100 w-24">Holidays</th>
                       <th className="px-4 py-5 text-center font-black border-r border-gray-100 w-24">OT Hours</th>
                       <th className="px-4 py-5 text-center font-black border-r border-gray-100 w-24">OT Amount</th>
                       <th className="px-6 py-5 text-center font-black bg-amber-50/50 w-48">Expected Hours</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-gray-100">
                    {employees.map((emp, idx) => (
                      <tr key={idx} className="hover:bg-gray-50/30 transition-colors">
                         <td className="px-6 py-6 border-r border-gray-50">
                            <div className="space-y-1">
                               <h4 className="font-black text-gray-600 uppercase tracking-tight">{emp.name}</h4>
                               <div className="flex items-center gap-2">
                                  <span className="text-[8px] font-black px-2 py-0.5 bg-emerald-500 text-white rounded shadow-sm uppercase tracking-tighter">{emp.status}</span>
                               </div>
                               <div className="text-[9px] font-bold text-gray-300 space-x-2">
                                  <span>{emp.id}</span>
                                  <span>•</span>
                                  <span>{emp.dept}</span>
                               </div>
                            </div>
                         </td>
                         <td className="px-4 py-6 border-r border-gray-50">
                            <input type="text" defaultValue={emp.present} className="w-full px-2 py-2 border border-gray-100 rounded text-center font-bold text-gray-400 focus:outline-none focus:border-blue-400" />
                         </td>
                         <td className="px-6 py-6 border-r border-gray-50 text-center bg-blue-50/20">
                            <div className="space-y-0.5">
                               <span className="font-black text-gray-700 text-[12px]">{emp.totalPresent}</span>
                               <p className="text-[8px] font-bold text-gray-300 tracking-tighter">{emp.calc}</p>
                            </div>
                         </td>
                         <td className="px-4 py-6 border-r border-gray-50 text-center font-black text-gray-700">{emp.totalDays}</td>
                         <td className="px-4 py-6 border-r border-gray-50 text-center">
                            <span className="bg-blue-600 text-white text-[9px] font-black px-2 py-1 rounded-full shadow-sm w-7 h-7 flex items-center justify-center mx-auto">{emp.leave}</span>
                         </td>
                         <td className="px-4 py-6 border-r border-gray-50 text-center">
                            <span className="bg-rose-600 text-white text-[9px] font-black px-2 py-1 rounded shadow-sm uppercase">₹{emp.deduction}</span>
                         </td>
                         <td className="px-4 py-6 border-r border-gray-50 text-center">
                            <span className="bg-amber-500 text-white text-[9px] font-black px-2 py-1 rounded-full shadow-sm w-7 h-7 flex items-center justify-center mx-auto">{emp.emergency}</span>
                         </td>
                         <td className="px-4 py-6 border-r border-gray-50 text-center">
                            <span className="bg-emerald-500 text-white text-[9px] font-black px-2 py-1 rounded-full shadow-sm w-7 h-7 flex items-center justify-center mx-auto">{emp.holidays}</span>
                         </td>
                         <td className="px-4 py-6 border-r border-gray-50">
                            <input type="text" defaultValue={emp.otHours} className="w-full px-2 py-2 border border-gray-100 rounded text-center font-bold text-gray-400 focus:outline-none focus:border-blue-400" />
                         </td>
                         <td className="px-4 py-6 border-r border-gray-50">
                            <input type="text" defaultValue={emp.otAmount} className="w-full px-2 py-2 border border-gray-100 rounded text-center font-bold text-gray-400 focus:outline-none focus:border-blue-400" />
                         </td>
                         <td className="px-6 py-6 text-center bg-amber-50/30">
                            <div className="space-y-0.5">
                               <span className="font-black text-amber-700 text-[12px]">{emp.expected} hrs</span>
                               <p className="text-[8px] font-bold text-gray-400 tracking-tighter uppercase whitespace-nowrap">({emp.totalDays} days × 9 hrs)</p>
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
        <p>Copyright © Your Website 2021</p>
        <div className="flex gap-4">
           <button className="flex items-center gap-1 hover:text-gray-600"><Save className="w-3 h-3" /> Save Changes</button>
           <span>•</span>
           <button className="flex items-center gap-1 hover:text-gray-600"><Printer className="w-3 h-3" /> Print Preview</button>
        </div>
      </div>
    </div>
  );
}
