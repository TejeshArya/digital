import React, { useState } from 'react';
import { 
  FileEdit, Calendar, Clock, User, 
  Settings, Save, RotateCcw, Info, 
  CheckCircle2, ArrowLeft, Users, 
  Timer, Calculator, ShieldCheck, List
} from 'lucide-react';

export function ManualAttendance() {
  const [entryType, setEntryType] = useState<'attendance' | 'leave'>('attendance');

  return (
    <div className="p-4 bg-[#f8f9fc] min-h-screen font-sans">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div className="space-y-1">
          <h1 className="text-gray-700 font-black text-xl uppercase tracking-widest flex items-center gap-2">
             Manual Attendance & Leave Entry
          </h1>
          <p className="text-[11px] text-gray-400 font-bold uppercase tracking-tight">Manually add attendance records or mark leave for employees</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-2.5 bg-[#6b58d3] text-white text-[10px] font-black rounded shadow-lg shadow-purple-100 uppercase tracking-widest hover:bg-purple-700 transition-all">
          <ArrowLeft className="w-4 h-4" /> Back to Attendance View
        </button>
      </div>

      <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form Column */}
        <div className="lg:col-span-2">
           <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="bg-white px-8 py-5 border-b border-gray-50 flex justify-between items-center">
                 <h3 className="text-[13px] font-black text-blue-700 uppercase tracking-widest">Add Manual Entry</h3>
                 <button className="flex items-center gap-2 px-4 py-1.5 bg-[#1cc88a] text-white text-[9px] font-black rounded uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-sm">
                    <Calendar className="w-3.5 h-3.5" /> View Monthly Attendance
                 </button>
              </div>

              <div className="p-8 space-y-8">
                 {/* Entry Type Toggle */}
                 <div className="space-y-3">
                    <label className="text-[10px] font-black text-rose-500 uppercase tracking-widest">Entry Type *</label>
                    <div className="flex border-2 border-blue-600 rounded-lg overflow-hidden max-w-lg">
                       <button 
                         onClick={() => setEntryType('attendance')}
                         className={`flex-1 py-3 px-6 text-[11px] font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${entryType === 'attendance' ? 'bg-blue-600 text-white' : 'bg-white text-blue-600 hover:bg-blue-50'}`}
                       >
                          <Clock className="w-4 h-4" /> Attendance
                       </button>
                       <button 
                         onClick={() => setEntryType('leave')}
                         className={`flex-1 py-3 px-6 text-[11px] font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${entryType === 'leave' ? 'bg-blue-600 text-white' : 'bg-white text-blue-600 hover:bg-blue-50'}`}
                       >
                          <Calendar className="w-4 h-4" /> Leave
                       </button>
                    </div>
                 </div>

                 {/* Form Fields */}
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-rose-500 uppercase tracking-widest">Employee *</label>
                       <select className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-lg text-[13px] font-bold text-gray-500 focus:outline-none focus:border-blue-400 transition-all appearance-none cursor-pointer">
                          <option>Select Employee</option>
                       </select>
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-rose-500 uppercase tracking-widest">Start Date *</label>
                       <input type="date" defaultValue="2026-05-05" className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-lg text-[13px] font-bold text-gray-700 focus:outline-none focus:border-blue-400 transition-all" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">End Date <span className="text-[9px] lowercase font-normal">(Optional for Range)</span></label>
                       <input type="date" className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-lg text-[13px] font-bold text-gray-700 focus:outline-none focus:border-blue-400 transition-all" />
                    </div>
                    {entryType === 'attendance' && (
                      <>
                        <div className="space-y-2">
                           <label className="text-[10px] font-black text-rose-500 uppercase tracking-widest">Start Time *</label>
                           <input type="time" className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-lg text-[13px] font-bold text-gray-700 focus:outline-none focus:border-blue-400 transition-all" />
                        </div>
                        <div className="space-y-2">
                           <label className="text-[10px] font-black text-rose-500 uppercase tracking-widest">End Time *</label>
                           <input type="time" className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-lg text-[13px] font-bold text-gray-700 focus:outline-none focus:border-blue-400 transition-all" />
                        </div>
                      </>
                    )}
                 </div>

                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Remarks (Optional)</label>
                    <textarea 
                      rows={3} 
                      placeholder="Add any additional remarks..."
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-lg text-[13px] font-bold text-gray-700 focus:outline-none focus:border-blue-400 transition-all resize-none"
                    />
                 </div>

                 {/* Action Buttons */}
                 <div className="flex justify-end gap-3 pt-4">
                    <button className="flex items-center gap-2 px-8 py-2.5 bg-[#6b58d3] text-white text-[10px] font-black rounded shadow-md uppercase tracking-widest hover:bg-purple-700 transition-all">
                       <RotateCcw className="w-4 h-4" /> Reset
                    </button>
                    <button className="flex items-center gap-2 px-8 py-2.5 bg-[#0061f2] text-white text-[10px] font-black rounded shadow-md uppercase tracking-widest hover:bg-blue-700 transition-all">
                       <Save className="w-4 h-4" /> Save {entryType === 'attendance' ? 'Attendance' : 'Leave'}
                    </button>
                 </div>
              </div>
           </div>
        </div>

        {/* Info Column */}
        <div className="space-y-6">
           <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 space-y-8">
              <h3 className="text-[13px] font-black text-gray-700 uppercase tracking-widest pb-4 border-b border-gray-50 flex items-center gap-2">
                 How It Works
              </h3>
              
              <div className="space-y-8">
                 <div className="flex gap-4">
                    <div className="bg-blue-50 p-2 rounded text-blue-600 shrink-0 h-fit">
                       <User className="w-4 h-4" />
                    </div>
                    <div className="space-y-1">
                       <h4 className="text-[11px] font-black text-blue-700 uppercase tracking-widest">Select Employee</h4>
                       <p className="text-[10px] font-bold text-gray-400 leading-relaxed uppercase tracking-tight">Choose the employee for whom you want to add attendance.</p>
                    </div>
                 </div>

                 <div className="flex gap-4">
                    <div className="bg-blue-50 p-2 rounded text-blue-600 shrink-0 h-fit">
                       <List className="w-4 h-4" />
                    </div>
                    <div className="space-y-1">
                       <h4 className="text-[11px] font-black text-blue-700 uppercase tracking-widest">Choose Entry Type</h4>
                       <p className="text-[10px] font-bold text-gray-400 leading-relaxed uppercase tracking-tight">Select either Attendance or Leave for the employee.</p>
                    </div>
                 </div>

                 <div className="flex gap-4">
                    <div className="bg-blue-50 p-2 rounded text-blue-600 shrink-0 h-fit">
                       <Calendar className="w-4 h-4" />
                    </div>
                    <div className="space-y-1">
                       <h4 className="text-[11px] font-black text-blue-700 uppercase tracking-widest">Pick Date & Time</h4>
                       <p className="text-[10px] font-bold text-gray-400 leading-relaxed uppercase tracking-tight">For attendance: Select date and enter start/end times. For leave: Select date and leave type.</p>
                    </div>
                 </div>

                 <div className="flex gap-4">
                    <div className="bg-blue-50 p-2 rounded text-blue-600 shrink-0 h-fit">
                       <Calculator className="w-4 h-4" />
                    </div>
                    <div className="space-y-1">
                       <h4 className="text-[11px] font-black text-blue-700 uppercase tracking-widest">Leave Balance</h4>
                       <p className="text-[10px] font-bold text-gray-400 leading-relaxed uppercase tracking-tight">When marking leave, the system shows assigned, used, and remaining balance for each leave type.</p>
                    </div>
                 </div>

                 <div className="flex gap-4">
                    <div className="bg-blue-50 p-2 rounded text-blue-600 shrink-0 h-fit">
                       <Timer className="w-4 h-4" />
                    </div>
                    <div className="space-y-1">
                       <h4 className="text-[11px] font-black text-blue-700 uppercase tracking-widest">Auto OT Calculation</h4>
                       <p className="text-[10px] font-bold text-gray-400 leading-relaxed uppercase tracking-tight">Overtime is automatically calculated for attendance entries if the end time exceeds working hours.</p>
                    </div>
                 </div>

                 <div className="flex gap-4">
                    <div className="bg-blue-50 p-2 rounded text-blue-600 shrink-0 h-fit">
                       <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div className="space-y-1">
                       <h4 className="text-[11px] font-black text-blue-700 uppercase tracking-widest">Auto Approval</h4>
                       <p className="text-[10px] font-bold text-gray-400 leading-relaxed uppercase tracking-tight">Manual entries are automatically approved and appear in reports immediately.</p>
                    </div>
                 </div>
              </div>

              {/* Note Box */}
              <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-5 flex items-start gap-3">
                 <div className="space-y-1">
                    <span className="text-[10px] font-black text-cyan-700 uppercase tracking-[0.2em]">Note:</span>
                    <p className="text-[10px] font-bold text-cyan-600 leading-relaxed uppercase tracking-tight italic">
                       Make sure the employee has an active shift assigned for accurate OT calculation.
                    </p>
                 </div>
              </div>
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
