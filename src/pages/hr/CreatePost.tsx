import React, { useState } from 'react';
import { 
  Briefcase, Plus, Search, Filter, Edit3, 
  Trash2, Save, FileText, Map, List,
  ArrowLeft, Info, GitFork, Users, Building2
} from 'lucide-react';

export function CreatePost() {
  const [posts] = useState([
    { groupId: 12, groupName: 'JUNIOR ENGINEER', wing: 'ELECTRICAL', dept: 'P & P', title: 'SOFTWARE DEVELOPER3', desc: 'DEVELOPER', date: '2026-04-30' },
    { groupId: 15, groupName: 'TECHNICIAN', wing: 'CIVIL', dept: 'P & P', title: 'Welder', desc: 'Welder', date: '2026-04-13' },
    { groupId: 14, groupName: 'ASSISTANT SUPERVISOR', wing: 'ELECTRICAL', dept: 'P & P', title: 'DEE HQ OFFICE ADMINISTRATOR', desc: 'DEE HQ OFFICE ADMINISTRATOR', date: '2026-04-04' },
    { groupId: 15, groupName: 'TECHNICIAN', wing: 'ELECTRICAL', dept: 'P & P', title: 'ELECTRICAL TECHNICIAN', desc: 'ELECTRICAL TECHNICIAN', date: '2026-04-03' },
  ]);

  return (
    <div className="p-4 bg-[#f8f9fc] min-h-screen font-sans">
      {/* Top Header */}
      <div className="flex flex-col mb-6">
        <h1 className="text-blue-600 font-bold text-lg uppercase tracking-tight">
          Create New Post
        </h1>
      </div>

      <div className="max-w-7xl mx-auto space-y-6">
        {/* Creation Form Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 items-end">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  Select Group <span className="text-rose-500">*</span>
                </label>
                <select className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded text-[12px] font-bold text-gray-700 focus:outline-none focus:border-blue-400 transition-all appearance-none cursor-pointer">
                  <option>Select Group</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  Select Wing <span className="text-rose-500">*</span>
                </label>
                <select className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded text-[12px] font-bold text-gray-700 focus:outline-none focus:border-blue-400 transition-all appearance-none cursor-pointer">
                  <option>Select Wing</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  Select Department <span className="text-rose-500">*</span>
                </label>
                <select className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded text-[12px] font-bold text-gray-700 focus:outline-none focus:border-blue-400 transition-all appearance-none cursor-pointer">
                  <option>Select Department</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  Post Title <span className="text-rose-500">*</span>
                </label>
                <input 
                  type="text" 
                  placeholder="Enter Post Title"
                  className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded text-[12px] font-bold text-gray-700 focus:outline-none focus:border-blue-400 transition-all"
                />
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
              <button className="flex items-center justify-center gap-2 px-6 py-2.5 bg-[#0061f2] text-white text-[11px] font-black rounded shadow-md uppercase tracking-widest hover:bg-blue-700 transition-all">
                Save Post
              </button>
            </div>
          </div>
        </div>

        {/* Posts Table Card */}
        <div className="bg-white rounded shadow-sm border border-gray-100 overflow-hidden min-h-[500px]">
          <div className="overflow-x-auto">
            <table className="w-full text-[11px] border-collapse">
              <thead>
                <tr className="bg-white text-gray-400 uppercase tracking-widest border-b border-gray-100">
                  <th className="px-6 py-5 text-center font-black border-r border-gray-100 w-24">Group ID</th>
                  <th className="px-6 py-5 text-center font-black border-r border-gray-100">Group Name</th>
                  <th className="px-6 py-5 text-center font-black border-r border-gray-100">Wing</th>
                  <th className="px-6 py-5 text-center font-black border-r border-gray-100">Department</th>
                  <th className="px-6 py-5 text-center font-black border-r border-gray-100">Post Title</th>
                  <th className="px-6 py-5 text-center font-black border-r border-gray-100">Description</th>
                  <th className="px-6 py-5 text-center font-black border-r border-gray-100">Created Date</th>
                  <th className="px-6 py-5 text-center font-black">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {posts.map((post, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-6 border-r border-gray-50 text-center font-bold text-gray-400">{post.groupId}</td>
                    <td className="px-6 py-6 border-r border-gray-50 text-center font-black text-gray-600 uppercase tracking-tight">{post.groupName}</td>
                    <td className="px-6 py-6 border-r border-gray-50 text-center font-bold text-gray-400 uppercase tracking-tighter">{post.wing}</td>
                    <td className="px-6 py-6 border-r border-gray-50 text-center font-bold text-gray-400 uppercase tracking-tighter">{post.dept}</td>
                    <td className="px-6 py-6 border-r border-gray-50 text-center font-black text-gray-700 uppercase tracking-tight">{post.title}</td>
                    <td className="px-6 py-6 border-r border-gray-50 text-center font-bold text-gray-400 uppercase tracking-tighter max-w-[200px] truncate">{post.desc}</td>
                    <td className="px-6 py-6 border-r border-gray-50 text-center font-bold text-gray-400">{post.date}</td>
                    <td className="px-6 py-6 text-center">
                      <div className="flex flex-col gap-1.5 items-center">
                        <button className="p-1.5 border border-blue-400 text-blue-500 rounded hover:bg-blue-50 transition-colors shadow-sm">
                           <Edit3 className="w-3.5 h-3.5" />
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
