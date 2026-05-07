import React, { useState } from 'react';
import { 
  Users, Plus, Search, Filter, Edit3, 
  Trash2, Save, FileText, Hash, Calendar,
  Layout, ArrowLeft
} from 'lucide-react';

export function CreateGroupID() {
  const [groups] = useState([
    { id: 17, name: 'UNDER TRAINING', description: 'DESCRIPTION', date: '2025-12-23' },
    { id: 16, name: 'HELPER', description: 'DESCRIPTION', date: '2025-12-23' },
    { id: 15, name: 'TECHNICIAN', description: 'DESCRIPTION', date: '2025-12-23' },
    { id: 14, name: 'ASSISTANT SUPERVISOR', description: 'DESCRIPTION', date: '2025-12-23' },
    { id: 13, name: 'SUPERVISOR', description: 'DESCRIPTION', date: '2025-12-23' },
    { id: 12, name: 'JUNIOR ENGINEER', description: 'DESCRIPTION', date: '2025-12-23' },
    { id: 11, name: 'ENGINEER', description: 'DESCRIPTION', date: '2025-12-23' },
  ]);

  return (
    <div className="p-4 bg-[#f8f9fc] min-h-screen font-sans">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <h1 className="text-gray-700 font-black text-xl uppercase tracking-widest flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-lg shadow-sm">
            <Users className="w-5 h-5 text-white" />
          </div>
          Create Group ID
        </h1>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-[#6b58d3] text-white text-[10px] font-black rounded shadow-sm uppercase tracking-widest hover:bg-purple-700 transition-all">
            <ArrowLeft className="w-4 h-4" /> Back to HR
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto space-y-6">
        {/* New Group Entry Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-gray-50/50 px-6 py-4 border-b border-gray-100">
            <h2 className="text-[12px] font-black text-[#0061f2] uppercase tracking-widest flex items-center gap-2">
              <Plus className="w-4 h-4" /> New Group
            </h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  <Hash className="w-3.5 h-3.5" /> Group ID
                </label>
                <input 
                  type="text" 
                  placeholder="Enter Group ID"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-lg text-[13px] font-bold text-gray-700 focus:outline-none focus:border-blue-400 focus:bg-white transition-all shadow-inner-sm"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  <FileText className="w-3.5 h-3.5" /> Name
                </label>
                <input 
                  type="text" 
                  placeholder="Enter Name"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-lg text-[13px] font-bold text-gray-700 focus:outline-none focus:border-blue-400 focus:bg-white transition-all shadow-inner-sm"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  <FileText className="w-3.5 h-3.5" /> Description
                </label>
                <input 
                  type="text" 
                  placeholder="Enter Description"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-lg text-[13px] font-bold text-gray-700 focus:outline-none focus:border-blue-400 focus:bg-white transition-all shadow-inner-sm"
                />
              </div>
              <button className="flex items-center justify-center gap-2 px-6 py-3.5 bg-[#0061f2] text-white text-[11px] font-black rounded-lg shadow-lg shadow-blue-100 uppercase tracking-widest hover:bg-blue-700 transition-all">
                <Save className="w-4 h-4" /> Save Group
              </button>
            </div>
          </div>
        </div>

        {/* Groups List Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden min-h-[400px]">
          <div className="overflow-x-auto">
            <table className="w-full text-[11px] border-collapse">
              <thead>
                <tr className="bg-white text-gray-400 uppercase tracking-widest border-b border-gray-100">
                  <th className="px-8 py-5 text-left font-black border-r border-gray-100 w-24">Group ID</th>
                  <th className="px-8 py-5 text-left font-black border-r border-gray-100">Name</th>
                  <th className="px-8 py-5 text-left font-black border-r border-gray-100">Description</th>
                  <th className="px-8 py-5 text-left font-black border-r border-gray-100 w-48">Created Date</th>
                  <th className="px-8 py-5 text-center font-black w-32">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {groups.map((group) => (
                  <tr key={group.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-8 py-5 border-r border-gray-50 font-black text-gray-500">{group.id}</td>
                    <td className="px-8 py-5 border-r border-gray-50 font-black text-gray-700 uppercase tracking-tight">{group.name}</td>
                    <td className="px-8 py-5 border-r border-gray-50 font-bold text-gray-400 uppercase tracking-tighter">{group.description}</td>
                    <td className="px-8 py-5 border-r border-gray-50 font-bold text-gray-400 flex items-center gap-2">
                       <Calendar className="w-3.5 h-3.5 opacity-30" /> {group.date}
                    </td>
                    <td className="px-8 py-5 text-center">
                      <button className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors shadow-sm border border-blue-100">
                        <Edit3 className="w-4 h-4" />
                      </button>
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
