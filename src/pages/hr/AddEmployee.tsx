import React, { useState } from 'react';
import { 
  User, Mail, Calendar, GraduationCap, DollarSign, 
  FileText, Lock, RefreshCw, AlertCircle, ArrowLeft,
  Layout, ShieldCheck, CheckCircle2, UserPlus, Info,
  X, Settings
} from 'lucide-react';

export function AddEmployee() {
  return (
    <div className="p-4 bg-[#f8f9fc] min-h-screen font-sans">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <h1 className="text-gray-700 font-black text-xl uppercase tracking-widest">Add New Employee</h1>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-[#6b58d3] text-white text-[10px] font-black rounded shadow-sm uppercase tracking-widest hover:bg-purple-700 transition-all">
            <ArrowLeft className="w-4 h-4" /> Back to Employees
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#00cfd5] text-white text-[10px] font-black rounded shadow-sm uppercase tracking-widest hover:bg-cyan-600 transition-all">
            <Layout className="w-4 h-4" /> HR Dashboard
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto space-y-6">
        {/* Main Form Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-gray-50/50 px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-[12px] font-black text-[#0061f2] uppercase tracking-widest flex items-center gap-2">
              <UserPlus className="w-4 h-4" /> Employee Information
            </h2>
          </div>

          <div className="p-8">
            {/* HR Information Alert Box */}
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-5 mb-8">
              <div className="flex items-start gap-4 text-blue-800">
                <div className="bg-blue-600 p-1.5 rounded-full shadow-sm mt-0.5">
                  <User className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="text-[12px] font-black uppercase tracking-widest mb-1">HR Information (Required)</h3>
                  <p className="text-[11px] font-medium opacity-80">This section contains information that HR must fill while creating the employee record.</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
              {/* Full Name */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] flex items-center gap-2">
                  <User className="w-3.5 h-3.5 text-gray-300" /> Full Name <span className="text-rose-500">*</span>
                </label>
                <input 
                  type="text" 
                  placeholder="Enter employee's full name"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-lg text-[13px] font-bold text-gray-700 focus:outline-none focus:border-blue-400 focus:bg-white transition-all shadow-inner-sm" 
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-gray-300" /> Official Email ID <span className="text-rose-500">*</span>
                </label>
                <input 
                  type="email" 
                  placeholder="employee@company.com"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-lg text-[13px] font-bold text-gray-700 focus:outline-none focus:border-blue-400 focus:bg-white transition-all shadow-inner-sm" 
                />
                <p className="text-[9px] text-gray-300 font-bold uppercase tracking-tight italic">This will be used for login and official communications</p>
              </div>

              {/* Date of Joining */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-gray-300" /> Date of Joining <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="mm/dd/yyyy"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-lg text-[13px] font-bold text-gray-700 focus:outline-none focus:border-blue-400 focus:bg-white transition-all shadow-inner-sm" 
                  />
                  <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                </div>
              </div>

              {/* Core Qualification */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] flex items-center gap-2">
                  <GraduationCap className="w-3.5 h-3.5 text-gray-300" /> Core Qualification <span className="text-rose-500">*</span>
                </label>
                <select className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-lg text-[13px] font-bold text-gray-700 focus:outline-none focus:border-blue-400 focus:bg-white transition-all shadow-inner-sm appearance-none cursor-pointer">
                  <option>-- Select Core Qualification --</option>
                </select>
                <p className="text-[9px] text-gray-300 font-bold uppercase tracking-tight italic">Select the employee's highest educational qualification</p>
              </div>

              {/* Salary */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] flex items-center gap-2">
                  <DollarSign className="w-3.5 h-3.5 text-gray-300" /> Rs Salary (Annual)
                </label>
                <input 
                  type="text" 
                  placeholder="Enter annual salary"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-lg text-[13px] font-bold text-gray-700 focus:outline-none focus:border-blue-400 focus:bg-white transition-all shadow-inner-sm" 
                />
              </div>

              {/* Remarks */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] flex items-center gap-2">
                  <FileText className="w-3.5 h-3.5 text-gray-300" /> Remarks
                </label>
                <textarea 
                  placeholder="Enter any additional notes or remarks"
                  rows={1}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-lg text-[13px] font-bold text-gray-700 focus:outline-none focus:border-blue-400 focus:bg-white transition-all shadow-inner-sm resize-none" 
                />
                <p className="text-[9px] text-gray-300 font-bold uppercase tracking-tight italic text-right">Optional: Add any additional notes or remarks</p>
              </div>

              {/* Temp Password */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] flex items-center gap-2">
                  <Lock className="w-3.5 h-3.5 text-gray-300" /> Temporary Login Password <span className="text-rose-500">*</span>
                </label>
                <div className="flex gap-2">
                  <input 
                    type="password" 
                    defaultValue="**********"
                    className="flex-1 px-4 py-3 bg-gray-50 border border-gray-100 rounded-lg text-[13px] font-bold text-gray-700 focus:outline-none focus:border-blue-400 focus:bg-white transition-all shadow-inner-sm" 
                  />
                  <button className="bg-white border border-gray-100 p-3 rounded-lg text-blue-500 hover:bg-blue-50 transition-colors shadow-sm">
                    <RefreshCw className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex items-center gap-1.5 text-amber-500">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span className="text-[9px] font-black uppercase tracking-tight">Employee must change this password on first login</span>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-gray-300" /> Confirm Password <span className="text-rose-500">*</span>
                </label>
                <input 
                  type="password" 
                  placeholder="Confirm the password"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-lg text-[13px] font-bold text-gray-700 focus:outline-none focus:border-blue-400 focus:bg-white transition-all shadow-inner-sm" 
                />
              </div>
            </div>

            {/* Teal Info Box - To be completed by employee */}
            <div className="mt-12 bg-teal-50 border border-teal-100 rounded-xl p-8 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-5">
                  <Info className="w-32 h-32 text-teal-600" />
               </div>
               <div className="flex items-start gap-4 text-teal-800 relative z-10">
                  <div className="bg-teal-600 p-2 rounded-lg shadow-md mt-0.5">
                    <UserCircle className="w-5 h-5 text-white" />
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-[13px] font-black uppercase tracking-widest mb-1">Employee Information (To be completed by Employee)</h3>
                      <p className="text-[11px] font-bold opacity-70">The following information will be filled by the employee after they login for the first time:</p>
                    </div>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
                      {[
                        { label: 'Personal Details', desc: 'Date of Birth, Gender, Marital Status, Blood Group, etc.' },
                        { label: 'Contact Information', desc: 'Phone numbers, Addresses' },
                        { label: 'Government Documents', desc: 'Aadhar, PAN, UAN, ESIC' },
                        { label: 'Bank Information', desc: 'Bank account details' },
                        { label: 'Emergency Contacts', desc: 'Emergency contact person details' },
                        { label: 'Family Information', desc: 'Father name, Nominee details' },
                      ].map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-[10px]">
                          <div className="w-1.5 h-1.5 rounded-full bg-teal-400 mt-1.5 shrink-0" />
                          <p className="font-medium tracking-tight">
                            <span className="font-black uppercase text-teal-700">{item.label}:</span> <span className="opacity-80">{item.desc}</span>
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
               </div>
            </div>

            {/* Workflow Box */}
            <div className="mt-8 bg-emerald-50/50 border border-emerald-100/50 rounded-xl p-8">
               <div className="flex items-start gap-4">
                  <div className="bg-emerald-600 p-2 rounded-lg shadow-md mt-0.5">
                    <Settings className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 space-y-6">
                    <h3 className="text-[13px] font-black text-emerald-800 uppercase tracking-widest">Employee Creation Workflow</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                      {/* HR Side */}
                      <div className="space-y-3">
                        <h4 className="text-[11px] font-black text-blue-700 uppercase tracking-widest flex items-center gap-2">
                           <User className="w-4 h-4" /> HR Responsibilities:
                        </h4>
                        <ul className="space-y-2">
                          {['Fill basic employee information', 'Create temporary login credentials', 'Submit for IT approval'].map((text, i) => (
                            <li key={i} className="flex items-center gap-2 text-[10px] font-medium text-blue-900/60 tracking-tight">
                              <div className="w-1 h-1 rounded-full bg-blue-300" /> {text}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* IT Side */}
                      <div className="space-y-3">
                        <h4 className="text-[11px] font-black text-purple-700 uppercase tracking-widest flex items-center gap-2">
                           <Layout className="w-4 h-4" /> IT Responsibilities:
                        </h4>
                        <ul className="space-y-2">
                          {['Review employee information', 'Approve or reject the request', 'Activate user account', 'Send login credentials to employee'].map((text, i) => (
                            <li key={i} className="flex items-center gap-2 text-[10px] font-medium text-purple-900/60 tracking-tight">
                              <div className="w-1 h-1 rounded-full bg-purple-300" /> {text}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-emerald-200/50 space-y-3">
                      <h4 className="text-[11px] font-black text-emerald-700 uppercase tracking-widest flex items-center gap-2">
                         <UserCheck className="w-4 h-4" /> Employee Responsibilities (After Approval):
                      </h4>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2">
                        {[
                          'Login with provided credentials',
                          'Change temporary password',
                          'Complete personal profile details',
                          'Upload required documents',
                          'Fill bank and emergency contact information'
                        ].map((text, i) => (
                          <li key={i} className="flex items-center gap-2 text-[10px] font-medium text-emerald-900/60 tracking-tight">
                            <div className="w-1 h-1 rounded-full bg-emerald-300" /> {text}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
               </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-12 flex justify-end gap-3 pt-8 border-t border-gray-100">
               <button className="flex items-center gap-2 px-8 py-3 bg-[#6b58d3] text-white text-[11px] font-black rounded-lg shadow-lg shadow-purple-100 uppercase tracking-widest hover:bg-purple-700 transition-all">
                  <X className="w-4 h-4" /> Cancel
               </button>
               <button className="flex items-center gap-2 px-10 py-3 bg-[#0061f2] text-white text-[11px] font-black rounded-lg shadow-lg shadow-blue-100 uppercase tracking-widest hover:bg-blue-700 transition-all">
                  <CheckCircle2 className="w-4 h-4" /> Create Employee & User Account
               </button>
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

// Simple internal helper for icon used in Teal box
function UserCircle({ className }: { className: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <circle cx="12" cy="12" r="10"/><circle cx="12" cy="10" r="3"/><path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662"/>
    </svg>
  );
}

function UserCheck({ className }: { className: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><polyline points="16 11 18 13 22 9"/></svg>
  );
}
