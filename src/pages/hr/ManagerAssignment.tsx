import React, { useState } from 'react';
import { 
  UserCog, Plus, Search, Filter, Edit3, 
  Trash2, Save, FileText, MapPin, List,
  ArrowLeft, Info, GitFork, Users, Building2,
  History, UserCheck, AlertTriangle
} from 'lucide-react';

export function ManagerAssignment() {
  const [assignments] = useState([
    { 
      empGroup: 'JUNIOR ENGINEER', empPost: 'SOFTWARE DEVELOPER3', empWing: 'ELECTRICAL', empDept: 'P & P', empLoc: 'VISAKHAPATNAM', 
      holder: 'TEJESH GUDLA (DEE300426132)', mgrGroup: 'ENGINEER', mgrPost: 'SENIOR SOFTWARE DEVELOPER', mgrWing: 'ELECTRICAL', mgrDept: 'P & P' 
    },
    { 
      empGroup: 'TECHNICIAN', empPost: 'Welder', empWing: 'CIVIL', empDept: 'P & P', empLoc: 'VISAKHAPATNAM', 
      holder: 'GANDIBOINA GOWRI PRASAD (DEE130426131)', mgrGroup: 'MANAGER', mgrPost: 'MANAGER EAST', mgrWing: 'ELECTRICAL', mgrDept: 'P & P' 
    },
    { 
      empGroup: 'ASSISTANT SUPERVISOR', empPost: 'FIELD TECHNICIAN', empWing: 'ELECTRICAL', empDept: 'P & P', empLoc: 'VISAKHAPATNAM', 
      holder: 'MITHUN KUMAR (DEE251225109)', mgrGroup: 'SUPERVISOR', mgrPost: 'ELECTRICAL SUPERVISOR', mgrWing: 'ELECTRICAL', mgrDept: 'P & P' 
    },
    { 
      empGroup: 'UNDER TRAINING', empPost: 'HELPER', empWing: 'ELECTRICAL', empDept: 'P & P', empLoc: 'N/A', 
      holder: 'Post Vacant', mgrGroup: 'SUPERVISOR', mgrPost: 'ELECTRICAL SUPERVISOR', mgrWing: 'ELECTRICAL', mgrDept: 'P & P', isVacant: true 
    },
  ]);

  return (
    <div className="p-4 bg-[#f8f9fc] min-h-screen font-sans">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div className="space-y-1">
          <h1 className="text-gray-700 font-black text-xl uppercase tracking-widest flex items-center gap-2">
            <UserCog className="w-5 h-5 text-blue-600" /> Manager Assignment
          </h1>
          <p className="text-[11px] text-gray-400 font-bold uppercase tracking-tight">Assign managers to employee posts (Post-centric assignment)</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-blue-400 text-blue-600 text-[10px] font-black rounded hover:bg-blue-50 transition-all uppercase tracking-widest">
          <History className="w-4 h-4" /> View History
        </button>
      </div>

      <div className="max-w-[1600px] mx-auto space-y-8">
        {/* Assignment Form Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-blue-50/30 px-6 py-4 border-b border-gray-100 flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-blue-600" />
            <h2 className="text-[12px] font-black text-blue-700 uppercase tracking-widest">Assign Manager to Employee Post</h2>
          </div>
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 items-end">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Employee Group</label>
                <select className="w-full px-3 py-3 bg-white border border-gray-200 rounded text-[12px] font-bold text-gray-700 focus:outline-none focus:border-blue-400 transition-all">
                  <option>Select Group</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Select Employee Post</label>
                <select className="w-full px-3 py-3 bg-gray-50 border border-gray-200 rounded text-[12px] font-bold text-gray-400 focus:outline-none transition-all cursor-not-allowed">
                  <option>Select Employee Post</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Manager Group</label>
                <select className="w-full px-3 py-3 bg-white border border-gray-200 rounded text-[12px] font-bold text-gray-700 focus:outline-none focus:border-blue-400 transition-all">
                  <option>Select Manager Group</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Select Manager Post</label>
                <select className="w-full px-3 py-3 bg-gray-50 border border-gray-200 rounded text-[12px] font-bold text-gray-400 focus:outline-none transition-all cursor-not-allowed">
                  <option>Select Manager Post</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Description</label>
                <input type="text" placeholder="Enter Description" className="w-full px-3 py-3 bg-white border border-gray-200 rounded text-[12px] font-bold text-gray-700 focus:outline-none focus:border-blue-400 transition-all" />
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button className="px-10 py-3 bg-[#0061f2] text-white text-[11px] font-black rounded-lg shadow-lg shadow-blue-100 uppercase tracking-widest hover:bg-blue-700 transition-all">
                Assign
              </button>
            </div>
          </div>
        </div>

        {/* Active Assignments Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-gray-50/50 px-6 py-4 border-b border-gray-100 flex items-center gap-2">
            <List className="w-4 h-4 text-blue-600" />
            <h2 className="text-[12px] font-black text-gray-700 uppercase tracking-widest">Active Manager Assignments</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-[10px] border-collapse min-w-[1200px]">
              <thead>
                <tr className="bg-[#1a202c] text-white uppercase tracking-tighter">
                  <th className="px-4 py-5 text-center font-black border-r border-slate-700">Employee Group</th>
                  <th className="px-4 py-5 text-center font-black border-r border-slate-700">Employee Post</th>
                  <th className="px-4 py-5 text-center font-black border-r border-slate-700">Employee Wing</th>
                  <th className="px-4 py-5 text-center font-black border-r border-slate-700">Employee Dept</th>
                  <th className="px-4 py-5 text-center font-black border-r border-slate-700">Employee Location</th>
                  <th className="px-4 py-5 text-center font-black border-r border-slate-700">Current Holder</th>
                  <th className="px-4 py-5 text-center font-black border-r border-slate-700">Manager Group</th>
                  <th className="px-4 py-5 text-center font-black border-r border-slate-700">Manager Post</th>
                  <th className="px-4 py-5 text-center font-black border-r border-slate-700">Manager Wing</th>
                  <th className="px-4 py-5 text-center font-black">Manager Dept</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {assignments.map((asgn, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-4 py-6 border-r border-gray-50 text-center font-bold text-gray-400 uppercase tracking-tighter">{asgn.empGroup}</td>
                    <td className="px-4 py-6 border-r border-gray-50 text-center">
                       <span className="bg-[#00cfd5] text-white px-2 py-1 rounded text-[8px] font-black uppercase tracking-tight whitespace-nowrap">{asgn.empPost}</span>
                    </td>
                    <td className="px-4 py-6 border-r border-gray-50 text-center">
                       <span className="bg-[#0061f2] text-white px-2 py-1 rounded text-[8px] font-black uppercase tracking-tight">{asgn.empWing}</span>
                    </td>
                    <td className="px-4 py-6 border-r border-gray-50 text-center">
                       <span className="bg-[#6b58d3] text-white px-2 py-1 rounded text-[8px] font-black uppercase tracking-tight">{asgn.empDept}</span>
                    </td>
                    <td className="px-4 py-6 border-r border-gray-50 text-center">
                       <span className={`px-2 py-1 rounded text-[8px] font-black uppercase tracking-tight ${asgn.empLoc === 'N/A' ? 'bg-gray-400 text-white' : 'bg-[#1cc88a] text-white'}`}>
                          {asgn.empLoc}
                       </span>
                    </td>
                    <td className="px-4 py-6 border-r border-gray-50 text-center">
                       {asgn.isVacant ? (
                         <div className="flex flex-col items-center">
                            <span className="flex items-center gap-1 text-orange-500 font-black text-[9px] uppercase tracking-widest">
                               <AlertTriangle className="w-3 h-3" /> Post Vacant
                            </span>
                            <span className="text-[8px] text-gray-300 font-bold uppercase tracking-tighter">No one holds this post</span>
                         </div>
                       ) : (
                         <span className="text-gray-500 font-black text-[9px] uppercase tracking-tight">{asgn.holder}</span>
                       )}
                    </td>
                    <td className="px-4 py-6 border-r border-gray-50 text-center font-bold text-gray-400 uppercase tracking-tighter">{asgn.mgrGroup}</td>
                    <td className="px-4 py-6 border-r border-gray-50 text-center">
                       <span className="bg-[#f6c23e] text-white px-2 py-1 rounded text-[8px] font-black uppercase tracking-tight whitespace-nowrap">{asgn.mgrPost}</span>
                    </td>
                    <td className="px-4 py-6 border-r border-gray-50 text-center">
                       <span className="bg-[#f6c23e] text-white px-2 py-1 rounded text-[8px] font-black uppercase tracking-tight">{asgn.mgrWing}</span>
                    </td>
                    <td className="px-4 py-6 text-center">
                       <span className="bg-[#6b58d3] text-white px-2 py-1 rounded text-[8px] font-black uppercase tracking-tight">{asgn.mgrDept}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bottom History Link Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center space-y-4">
           <h3 className="text-[13px] font-black text-gray-700 uppercase tracking-widest">View Manager Assignment History</h3>
           <p className="text-[11px] text-gray-400 font-bold max-w-lg mx-auto">Access detailed historical data of all unassigned manager assignments with advanced filtering options.</p>
           <button className="px-8 py-3 border border-blue-400 text-blue-600 text-[11px] font-black rounded-lg hover:bg-blue-50 transition-all uppercase tracking-widest">
              View Historical Manager Assignments
           </button>
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
