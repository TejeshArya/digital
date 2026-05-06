import React, { useState } from 'react';
import { Info, RotateCw, Search, ChevronDown, Calendar, Upload, Save, ArrowUpDown } from 'lucide-react';

export function Projects() {
  const projects = [
    {
      id: 'PN2627-17',
      name: 'SUPPLY AND INSTALLATION OF',
      wing: 'CIVIL',
      dept: 'P & P',
      location: 'JAMNAGAR',
      post: 'CIVIL HEAD',
      createdBy: 'SANJAY KUMA...',
      client: 'INS DEGA',
      gst: '37DEGAB1111...'
    }
  ];

  return (
    <div className="p-4 bg-[#f8f9fc] min-h-screen font-sans">
      {/* Note Banner */}
      <div className="bg-[#e2f7f5] border border-[#c5e9e5] p-3 rounded-lg mb-6 flex items-center gap-3">
        <Info className="w-4 h-4 text-[#0d9488]" />
        <p className="text-[12px] text-[#0d9488] font-semibold">
          Note: <span className="font-normal">You can view projects for all posts you are currently assigned to. Projects are tied to posts, not individual employees.</span>
        </p>
      </div>

      {/* Action Buttons */}
      <div className="mb-6">
        <button className="flex items-center gap-2 px-3 py-1.5 border border-purple-200 text-purple-600 text-[11px] font-bold rounded uppercase hover:bg-purple-50 transition-colors">
          <RotateCw className="w-3.5 h-3.5" /> Clear Table Cache
        </button>
      </div>

      {/* Project Form */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Post/Designation - Full Width in grid row */}
          <div className="md:col-span-3 space-y-1.5">
            <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-tight">Select Post/Designation <span className="text-red-500">*</span></label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
              <input
                type="text"
                placeholder="Type to search your posts..."
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-400 transition-colors placeholder:text-gray-200"
              />
            </div>
            <p className="text-[10px] text-gray-300 italic flex items-center gap-1">
              <Info className="w-3 h-3" /> You have multiple posts. Please select which post you're creating this project for.
            </p>
          </div>

          <div className="space-y-1.5">
            <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-tight">Select Date <span className="text-red-500">*</span></label>
            <div className="relative">
              <input
                type="text"
                placeholder="mm/dd/yyyy"
                className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-400 transition-colors placeholder:text-gray-200"
              />
              <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-tight">Client (Company Name - GST) <span className="text-red-500">*</span></label>
            <input
              type="text"
              className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-400 transition-colors"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-tight">Value (₹) <span className="text-red-500">*</span></label>
            <input
              type="text"
              placeholder="Enter project value"
              className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-400 transition-colors placeholder:text-gray-200"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-tight">Department - Officer <span className="text-red-500">*</span></label>
            <div className="relative">
              <select className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-400 transition-colors text-gray-400 appearance-none">
                <option>Select</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          <div className="md:col-span-2 space-y-1.5">
            <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-tight">Project Name <span className="text-red-500">*</span></label>
            <input
              type="text"
              className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-400 transition-colors"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-tight">Start Date <span className="text-red-500">*</span></label>
            <div className="relative">
              <input
                type="text"
                placeholder="mm/dd/yyyy"
                className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-400 transition-colors placeholder:text-gray-200"
              />
              <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-tight">End Date <span className="text-red-500">*</span></label>
            <div className="relative">
              <input
                type="text"
                placeholder="mm/dd/yyyy"
                className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-400 transition-colors placeholder:text-gray-200"
              />
              <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-tight">Upload File</label>
            <div className="flex border border-gray-200 rounded overflow-hidden">
              <button className="px-4 py-2 bg-gray-50 border-r border-gray-200 text-[11px] font-bold text-gray-600 hover:bg-gray-100 transition-colors">Choose File</button>
              <div className="px-3 py-2 text-xs text-gray-400 bg-white flex-1 flex items-center">No file chosen</div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <button className="px-8 py-2.5 bg-[#1cc88a] text-white text-[11px] font-bold rounded shadow-sm hover:bg-[#17a673] transition-all uppercase tracking-widest flex items-center gap-2">
            <Save className="w-3.5 h-3.5" /> Save Project
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-8">
        <div className="p-4 flex flex-col md:flex-row justify-between items-center gap-4 border-b border-gray-50">
          <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
            Show 
            <select className="border border-gray-200 rounded px-2 py-1 focus:outline-none">
              <option>25</option>
              <option>50</option>
              <option>100</option>
            </select>
            entries
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 font-medium">Search:</span>
            <input
              type="text"
              className="px-3 py-1.5 border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-400"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-[11px] border-collapse">
            <thead>
              <tr className="bg-[#323c4e] text-white uppercase tracking-tighter">
                <th className="px-4 py-5 text-left font-bold border-r border-slate-600 cursor-pointer hover:bg-slate-700 transition-colors">
                  <div className="flex items-center justify-between gap-1">
                    Project No <ArrowUpDown className="w-3 h-3 opacity-30" />
                  </div>
                </th>
                <th className="px-4 py-5 text-left font-bold border-r border-slate-600 cursor-pointer hover:bg-slate-700 transition-colors">
                  <div className="flex items-center justify-between gap-1">
                    Project Name <ArrowUpDown className="w-3 h-3 opacity-30" />
                  </div>
                </th>
                <th className="px-4 py-5 text-left font-bold border-r border-slate-600 cursor-pointer hover:bg-slate-700 transition-colors">
                  Wing
                </th>
                <th className="px-4 py-5 text-left font-bold border-r border-slate-600 cursor-pointer hover:bg-slate-700 transition-colors">
                  Department
                </th>
                <th className="px-4 py-5 text-left font-bold border-r border-slate-600 cursor-pointer hover:bg-slate-700 transition-colors">
                  Location
                </th>
                <th className="px-4 py-5 text-left font-bold border-r border-slate-600 cursor-pointer hover:bg-slate-700 transition-colors">
                  Post
                </th>
                <th className="px-4 py-5 text-left font-bold border-r border-slate-600 cursor-pointer hover:bg-slate-700 transition-colors">
                  Created By
                </th>
                <th className="px-4 py-5 text-left font-bold border-r border-slate-600 cursor-pointer hover:bg-slate-700 transition-colors">
                  Client
                </th>
                <th className="px-4 py-5 text-left font-bold cursor-pointer hover:bg-slate-700 transition-colors">
                  GST Number
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {projects.map((project, index) => (
                <tr key={index} className="hover:bg-gray-50/80 transition-colors group">
                  <td className="px-4 py-4 text-blue-500 font-bold border-r border-gray-50 uppercase">{project.id}</td>
                  <td className="px-4 py-4 text-gray-700 font-bold border-r border-gray-50 uppercase">{project.name}</td>
                  <td className="px-4 py-4 text-gray-500 border-r border-gray-50 uppercase">{project.wing}</td>
                  <td className="px-4 py-4 text-gray-500 border-r border-gray-50 uppercase">{project.dept}</td>
                  <td className="px-4 py-4 text-gray-500 border-r border-gray-50 uppercase">{project.location}</td>
                  <td className="px-4 py-4 text-gray-500 border-r border-gray-50 uppercase">{project.post}</td>
                  <td className="px-4 py-4 text-gray-500 border-r border-gray-50 uppercase">{project.createdBy}</td>
                  <td className="px-4 py-4 text-gray-500 border-r border-gray-50 uppercase font-bold text-blue-600/80">{project.client}</td>
                  <td className="px-4 py-4 text-gray-500 uppercase">{project.gst}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-12 flex justify-between items-center text-[10px] text-gray-400 px-2 uppercase font-bold tracking-[0.2em]">
        <p>Copyright © Your Website 2021</p>
        <div className="flex gap-4">
          <a href="#" className="hover:underline">Privacy Policy</a>
          <span>•</span>
          <a href="#" className="hover:underline">Terms & Conditions</a>
        </div>
      </div>
    </div>
  );
}
