import React, { useState } from 'react';
import { 
  FileText, Calendar, Clock, AlertTriangle, 
  CheckCircle2, Send, ArrowLeft, Info, 
  History, Users, Building2, MapPin,
  ClipboardList, UserPlus, Zap
} from 'lucide-react';

export function ApplyLeave() {
  const [leaveType, setLeaveType] = useState<'regular' | 'temporary' | null>(null);

  return (
    <div className="p-4 bg-[#f8f9fc] min-h-screen font-sans">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div className="space-y-1">
          <h1 className="text-gray-700 font-black text-xl uppercase tracking-widest flex items-center gap-2">
             <CheckCircle2 className="w-5 h-5 text-blue-600" /> Apply for Leave
          </h1>
          <p className="text-[11px] text-gray-400 font-bold uppercase tracking-tight">Submit your leave application for approval</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-2.5 bg-[#6b58d3] text-white text-[10px] font-black rounded shadow-lg shadow-purple-100 uppercase tracking-widest hover:bg-purple-700 transition-all">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
      </div>

      <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Form Column */}
        <div className="lg:col-span-3 space-y-8">
           {/* Step 1: Select Employee */}
           <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="bg-[#0061f2] px-8 py-4 border-b border-blue-400 flex items-center gap-2">
                 <Users className="w-4 h-4 text-white" />
                 <h3 className="text-[12px] font-black text-white uppercase tracking-widest text-center">Step 1: Select Employee</h3>
              </div>
              <div className="p-8">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-rose-500 uppercase tracking-widest">Employee *</label>
                    <select className="w-full px-4 py-3 bg-white border border-gray-100 rounded-lg text-[13px] font-bold text-gray-700 focus:outline-none focus:border-blue-400 appearance-none">
                       <option>DEE251225103 - SANJAY KUMAR MAHATO</option>
                    </select>
                 </div>
              </div>
           </div>

           {/* Warning Alert */}
           <div className="bg-amber-50 border-l-4 border-amber-400 p-6 rounded-r-xl flex items-start gap-4">
              <AlertTriangle className="w-6 h-6 text-amber-500 mt-0.5" />
              <div className="space-y-1">
                 <h4 className="text-[12px] font-black text-amber-800 uppercase tracking-widest">No Leave Types Assigned</h4>
                 <p className="text-[11px] text-amber-700 font-bold uppercase tracking-tight">No leave types have been assigned to this employee. Please contact HR to assign leave types.</p>
              </div>
           </div>

           {/* Step 3: Choose Leave Type */}
           <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="bg-[#6b58d3] px-8 py-4 border-b border-purple-400 flex items-center gap-2">
                 <ClipboardList className="w-4 h-4 text-white" />
                 <h3 className="text-[12px] font-black text-white uppercase tracking-widest">Step 3: Choose Leave Type</h3>
              </div>
              <div className="p-8 space-y-8">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div 
                      onClick={() => setLeaveType('regular')}
                      className={`cursor-pointer p-8 rounded-2xl border-2 transition-all text-center space-y-4 hover:shadow-lg ${leaveType === 'regular' ? 'border-blue-600 bg-blue-50/20' : 'border-gray-100 bg-white hover:border-blue-200'}`}
                    >
                       <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto text-blue-600 shadow-inner">
                          <Calendar className="w-8 h-8" />
                       </div>
                       <div className="space-y-1">
                          <h4 className="text-[13px] font-black text-gray-700 uppercase tracking-widest">Regular Leave</h4>
                          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">Multiple days leave</p>
                       </div>
                       <span className="inline-block bg-[#0061f2] text-white text-[8px] font-black px-3 py-1 rounded shadow-sm uppercase tracking-tighter">Requires Approval Chain</span>
                    </div>

                    <div 
                      onClick={() => setLeaveType('temporary')}
                      className={`cursor-pointer p-8 rounded-2xl border-2 transition-all text-center space-y-4 hover:shadow-lg ${leaveType === 'temporary' ? 'border-amber-500 bg-amber-50/20' : 'border-gray-100 bg-white hover:border-amber-200'}`}
                    >
                       <div className="bg-amber-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto text-amber-600 shadow-inner">
                          <Zap className="w-8 h-8" />
                       </div>
                       <div className="space-y-1">
                          <h4 className="text-[13px] font-black text-gray-700 uppercase tracking-widest">Temporary Leave</h4>
                          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">Single day emergency leave</p>
                       </div>
                       <span className="inline-block bg-[#f6c23e] text-white text-[8px] font-black px-3 py-1 rounded shadow-sm uppercase tracking-tighter">Quick Approval</span>
                    </div>
                 </div>

                 {/* Legends */}
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-gray-100 pt-8">
                    <div className="space-y-3">
                       <h5 className="text-[10px] font-black text-blue-700 uppercase tracking-widest flex items-center gap-2">
                          <Info className="w-3.5 h-3.5" /> Regular Leave:
                       </h5>
                       <ul className="space-y-2 text-[10px] text-gray-500 font-black uppercase tracking-tight pl-5 list-disc">
                          <li>For multiple days</li>
                          <li>Approval: Manager → Location Head → HR</li>
                          <li>Can combine multiple leave types</li>
                       </ul>
                    </div>
                    <div className="space-y-3 border-l border-gray-100 pl-8">
                       <h5 className="text-[10px] font-black text-amber-600 uppercase tracking-widest flex items-center gap-2">
                          <Info className="w-3.5 h-3.5" /> Temporary Leave:
                       </h5>
                       <ul className="space-y-2 text-[10px] text-gray-500 font-black uppercase tracking-tight pl-5 list-disc">
                          <li>For single day only</li>
                          <li>Apply 24 hours before until 7 AM</li>
                          <li>Direct HR approval</li>
                       </ul>
                    </div>
                 </div>
              </div>
           </div>

           {/* Step 4: Leave Details */}
           <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="bg-[#0061f2] px-8 py-4 border-b border-blue-400 flex items-center gap-2">
                 <History className="w-4 h-4 text-white" />
                 <h3 className="text-[12px] font-black text-white uppercase tracking-widest">Step 4: Leave Details</h3>
              </div>
              <div className="p-8">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-rose-500 uppercase tracking-widest">Total Leave Days Required *</label>
                    <input type="text" placeholder="Enter total number of days" className="w-full px-4 py-3 bg-white border border-gray-100 rounded-lg text-[13px] font-bold text-gray-700 focus:outline-none focus:border-blue-400" />
                    <p className="text-[9px] text-gray-400 font-bold uppercase tracking-tight italic flex items-center gap-1.5 mt-1">
                       <Info className="w-3 h-3" /> Enter the total number of days you need leave for.
                    </p>
                 </div>
              </div>
           </div>

           {/* Step 5: Leave Reason */}
           <div className="bg-[#1a202c] rounded-xl shadow-sm border border-gray-800 overflow-hidden">
              <div className="px-8 py-4 border-b border-gray-700 flex items-center gap-2">
                 <FileText className="w-4 h-4 text-gray-400" />
                 <h3 className="text-[12px] font-black text-gray-400 uppercase tracking-widest">Step 5: Leave Reason</h3>
              </div>
              <div className="p-8">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-rose-500 uppercase tracking-widest">Reason for Leave *</label>
                    <textarea 
                      rows={4} 
                      placeholder="Please provide a detailed reason for your leave application..."
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-[13px] font-bold text-gray-200 focus:outline-none focus:border-blue-400 transition-all resize-none placeholder:text-gray-600"
                    />
                    <p className="text-[9px] text-gray-500 font-bold uppercase tracking-tight italic flex items-center gap-1.5 mt-1">
                       <Info className="w-3 h-3 text-gray-600" /> Be specific and clear about your leave reason.
                    </p>
                 </div>
              </div>
           </div>

           {/* Submit Button */}
           <button className="w-full py-5 bg-[#0061f2] text-white text-[12px] font-black rounded-xl shadow-lg shadow-blue-100 uppercase tracking-[0.2em] hover:bg-blue-700 transition-all flex items-center justify-center gap-2">
              <Send className="w-5 h-5" /> Submit Leave Application
           </button>

           {/* Leave History */}
           <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden min-h-[400px]">
              <div className="px-8 py-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                 <h3 className="text-[12px] font-black text-gray-700 uppercase tracking-widest flex items-center gap-2">
                    <History className="w-4 h-4 text-blue-600" /> Leave History
                 </h3>
                 <div className="flex bg-white rounded-lg p-1 border border-gray-100 shadow-sm">
                    <button className="px-4 py-1.5 bg-[#0061f2] text-white text-[9px] font-black rounded shadow-sm uppercase">All</button>
                    <button className="px-4 py-1.5 text-blue-600 text-[9px] font-black rounded uppercase">Regular</button>
                    <button className="px-4 py-1.5 text-blue-600 text-[9px] font-black rounded uppercase">Temporary</button>
                 </div>
              </div>
              <div className="p-32 text-center flex flex-col items-center gap-4">
                 <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                    <FileText className="w-12 h-12 text-gray-200" />
                 </div>
                 <p className="text-[11px] font-black text-gray-300 uppercase tracking-[0.2em]">No leave applications found.</p>
              </div>
           </div>
        </div>

        {/* Sidebar Column */}
        <div className="lg:col-span-1 space-y-8">
           <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden h-fit">
              <div className="bg-[#6b58d3] px-6 py-4 border-b border-purple-400 flex items-center gap-2">
                 <History className="w-4 h-4 text-white" />
                 <h3 className="text-[11px] font-black text-white uppercase tracking-widest text-center">Recent Applications</h3>
              </div>
              <div className="p-16 text-center flex flex-col items-center gap-3">
                 <FileText className="w-10 h-10 text-gray-100" />
                 <p className="text-[10px] font-black text-gray-200 uppercase tracking-widest">No leave applications yet</p>
              </div>
           </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center text-[10px] text-gray-400 font-bold tracking-[0.2em] uppercase px-4">
        <p>Copyright &copy; Digital New Enterprises 2024</p>
        <div className="flex gap-4 text-gray-300 italic lowercase tracking-tight font-bold">
          <span>privacy policy</span>
          <span>•</span>
          <span>terms & conditions</span>
        </div>
      </div>
    </div>
  );
}
