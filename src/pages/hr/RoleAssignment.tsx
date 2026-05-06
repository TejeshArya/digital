import React, { useState } from 'react';
import { 
  UserCheck, Plus, Search, Filter, Edit3, 
  Trash2, Save, FileText, MapPin, List,
  ArrowLeft, Info, GitFork, Users, Building2,
  History, UserPlus
} from 'lucide-react';

export function RoleAssignment() {
  const [assignments] = useState([
    { group: 'JUNIOR ENGINEER', post: 'SOFTWARE DEVELOPER3', location: 'VISAKHAPATNAM', wing: 'ELECTRICAL', dept: 'P & P', employee: 'TEJESH GUDLA (DEE300426132)', desc: 'DEVELOPER', date: '2026-04-30' },
    { group: 'TECHNICIAN', post: 'Welder', location: 'VISAKHAPATNAM', wing: 'CIVIL', dept: 'P & P', employee: 'GANDIBOINA GOWRI PRASAD (DEE130426131)', desc: 'Welder', date: '2026-04-13' },
    { group: 'ASSISTANT SUPERVISOR', post: 'DEE HQ OFFICE ADMINISTRATOR', location: 'VISAKHAPATNAM', wing: 'ELECTRICAL', dept: 'P & P', employee: 'SAYAD SARFARAZ (DEE040426129)', desc: 'DEE HQ OFFICE ADMINISTRATIVE', date: '2026-04-04' },
    { group: 'TECHNICIAN', post: 'ELECTRICAL TECHNICIAN', location: 'VISAKHAPATNAM', wing: 'ELECTRICAL', dept: 'P & P', employee: 'KANDREGULA KOTESWARA RAO (DEE030426128)', desc: 'desc', date: '2026-04-03' },
  ]);

  return (
    <div className="p-4 bg-[#f8f9fc] min-h-screen font-sans">
      {/* Top Header */}
      <div className="flex flex-col mb-6">
        <h1 className="text-blue-600 font-bold text-lg uppercase tracking-tight">
          Create New Assignment
        </h1>
      </div>

      <div className="max-w-[1400px] mx-auto space-y-6">
        {/* Creation Form Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 items-end">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  Select Group
                </label>
                <select className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded text-[12px] font-bold text-gray-700 focus:outline-none focus:border-blue-400 transition-all appearance-none cursor-pointer">
                  <option>Select Group</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  Select Post
                </label>
                <select className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded text-[12px] font-bold text-gray-700 focus:outline-none focus:border-blue-400 transition-all appearance-none cursor-pointer">
                  <option>Select Post</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  Select Location
                </label>
                <select className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded text-[12px] font-bold text-gray-700 focus:outline-none focus:border-blue-400 transition-all appearance-none cursor-pointer">
                  <option>Select Location</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  Select Employee
                </label>
                <select className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded text-[12px] font-bold text-gray-700 focus:outline-none focus:border-blue-400 transition-all appearance-none cursor-pointer">
                  <option>Select Employee</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  Description
                </label>
                <input 
                  type="text" 
                  placeholder="Enter Description"
                  className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded text-[12px] font-bold text-gray-700 focus:outline-none focus:border-blue-400 transition-all"
                />
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <button className="flex items-center justify-center gap-2 px-12 py-2 bg-[#0061f2] text-white text-[11px] font-black rounded shadow-md uppercase tracking-widest hover:bg-blue-700 transition-all">
                Save
              </button>
            </div>
          </div>
        </div>

        {/* Assignments Table Card */}
        <div className="bg-white rounded shadow-sm border border-gray-100 overflow-hidden min-h-[600px]">
          <div className="p-4 bg-gray-50/30 border-b border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-[11px] font-bold text-gray-500">
               Show 
               <select className="px-2 py-1 bg-white border border-gray-200 rounded">
                  <option>10</option>
               </select>
               entries
            </div>
            <div className="flex items-center gap-2">
               <span className="text-[11px] font-bold text-gray-500">Search:</span>
               <input type="text" className="px-3 py-1.5 bg-white border border-gray-200 rounded text-[12px] focus:outline-none focus:border-blue-400" />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-[10px] border-collapse">
              <thead>
                <tr className="bg-white text-gray-400 uppercase tracking-widest border-b border-gray-100">
                  <th className="px-4 py-5 text-center font-black border-r border-gray-100">Group</th>
                  <th className="px-4 py-5 text-center font-black border-r border-gray-100">Post</th>
                  <th className="px-4 py-5 text-center font-black border-r border-gray-100">Location</th>
                  <th className="px-4 py-5 text-center font-black border-r border-gray-100">Wing</th>
                  <th className="px-4 py-5 text-center font-black border-r border-gray-100">Department</th>
                  <th className="px-4 py-5 text-center font-black border-r border-gray-100">Employee</th>
                  <th className="px-4 py-5 text-center font-black border-r border-gray-100">Description</th>
                  <th className="px-4 py-5 text-center font-black border-r border-gray-100 w-24">Created Date</th>
                  <th className="px-4 py-5 text-center font-black">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {assignments.map((asgn, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-4 py-6 border-r border-gray-50 text-center font-bold text-gray-400 uppercase tracking-tighter">{asgn.group}</td>
                    <td className="px-4 py-6 border-r border-gray-50 text-center font-black text-gray-700 uppercase tracking-tight">{asgn.post}</td>
                    <td className="px-4 py-6 border-r border-gray-50 text-center font-bold text-gray-500 uppercase tracking-tighter">{asgn.location}</td>
                    <td className="px-4 py-6 border-r border-gray-50 text-center font-bold text-gray-400 uppercase tracking-tighter">{asgn.wing}</td>
                    <td className="px-4 py-6 border-r border-gray-50 text-center font-bold text-gray-400 uppercase tracking-tighter">{asgn.dept}</td>
                    <td className="px-4 py-6 border-r border-gray-50 text-center font-black text-gray-600 uppercase tracking-tight max-w-[150px]">{asgn.employee}</td>
                    <td className="px-4 py-6 border-r border-gray-50 text-center font-bold text-gray-400 uppercase tracking-tighter max-w-[200px] truncate">{asgn.desc}</td>
                    <td className="px-4 py-6 border-r border-gray-50 text-center font-bold text-gray-400">{asgn.date}</td>
                    <td className="px-4 py-6 text-center">
                      <div className="flex gap-1 justify-center">
                        <button className="p-1.5 border border-blue-400 text-blue-500 rounded hover:bg-blue-50 transition-colors shadow-sm">
                           <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button className="p-1.5 border border-cyan-400 text-cyan-500 rounded hover:bg-cyan-50 transition-colors shadow-sm">
                           <History className="w-3.5 h-3.5" />
                        </button>
                        <button className="p-1.5 border border-orange-400 text-orange-500 rounded hover:bg-orange-50 transition-colors shadow-sm">
                           <UserPlus className="w-3.5 h-3.5" />
                        </button>
                        <button className="p-1.5 border border-red-400 text-red-500 rounded hover:bg-red-50 transition-colors shadow-sm">
                           <Trash2 className="w-3.5 h-3.5" />
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
