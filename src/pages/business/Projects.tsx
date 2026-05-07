import React, { useState } from 'react';
import { 
  Info, RotateCw, Search, ChevronDown, Calendar, Upload, Save, 
  ArrowUpDown, Eye, Edit, Trash2, Plus, X, FileText, Check, AlertCircle,
  Building2, MapPin, Briefcase, User, DollarSign, Clock, List
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../../components/ui/dialog";

export function Projects() {
  const [projectList, setProjectList] = useState([
    {
      id: 'PRJ-2024-01',
      name: 'OFFICE RENOVATION AND SETUP',
      wing: 'FACILITIES',
      dept: 'Engineering',
      location: 'Headquarters',
      post: 'PROJECT LEAD',
      createdBy: 'JOHN DOE',
      client: 'ACME CORP',
      gst: '00ABCDE1234...',
      value: '2,500,000',
      date: '04/15/2024',
      startDate: '04/20/2024',
      endDate: '10/20/2024',
      status: 'In Progress',
      priority: 'High',
      description: 'Complete renovation of the 4th floor office space including new furniture, networking, and interior design.'
    },
    {
      id: 'PRJ-2024-02',
      name: 'DATA CENTER UPGRADE',
      wing: 'IT INFRA',
      dept: 'Technology',
      location: 'Data Center A',
      post: 'INFRA LEAD',
      createdBy: 'JANE SMITH',
      client: 'GLOBAL TECH',
      gst: '11FGHIJ5678...',
      value: '5,000,000',
      date: '04/10/2024',
      startDate: '05/01/2024',
      endDate: '12/31/2024',
      status: 'Planning',
      priority: 'Critical',
      description: 'Upgrading the core server racks and cooling systems in Data Center A.'
    }
  ]);

  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isAdditionalModalOpen, setIsAdditionalModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      setProjectList(prev => prev.filter(p => p.id !== id));
    }
  };

  const handleEdit = (project: any) => {
    setSelectedProject(project);
    setIsEditModalOpen(true);
  };

  const handleView = (project: any) => {
    setSelectedProject(project);
    setIsViewModalOpen(true);
  };

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

        <div className="mt-8 flex justify-end gap-3">
          <button 
            onClick={() => setIsAdditionalModalOpen(true)}
            className="px-6 py-2.5 bg-[#4e73df] text-white text-[11px] font-bold rounded shadow-sm hover:bg-[#2e59d9] transition-all uppercase tracking-widest flex items-center gap-2"
          >
            <Plus className="w-3.5 h-3.5" /> Additional Info
          </button>
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
                <th className="px-4 py-5 text-left font-bold border-r border-slate-600 cursor-pointer hover:bg-slate-700 transition-colors">
                  GST Number
                </th>
                <th className="px-4 py-5 text-center font-bold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {projectList.map((project, index) => (
                <tr key={index} className="hover:bg-gray-50/80 transition-colors group">
                  <td className="px-4 py-4 text-blue-500 font-bold border-r border-gray-50 uppercase">{project.id}</td>
                  <td className="px-4 py-4 text-gray-700 font-bold border-r border-gray-50 uppercase">{project.name}</td>
                  <td className="px-4 py-4 text-gray-500 border-r border-gray-50 uppercase">{project.wing}</td>
                  <td className="px-4 py-4 text-gray-500 border-r border-gray-50 uppercase">{project.dept}</td>
                  <td className="px-4 py-4 text-gray-500 border-r border-gray-50 uppercase">{project.location}</td>
                  <td className="px-4 py-4 text-gray-500 border-r border-gray-50 uppercase">{project.post}</td>
                  <td className="px-4 py-4 text-gray-500 border-r border-gray-50 uppercase">{project.createdBy}</td>
                  <td className="px-4 py-4 text-gray-500 border-r border-gray-50 uppercase font-bold text-blue-600/80">{project.client}</td>
                  <td className="px-4 py-4 text-gray-500 border-r border-gray-50 uppercase">{project.gst}</td>
                  <td className="px-4 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button 
                        onClick={() => handleView(project)}
                        className="p-1.5 bg-[#4e73df] text-white rounded hover:bg-[#2e59d9] transition-colors shadow-sm"
                        title="View Details"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button 
                        onClick={() => handleEdit(project)}
                        className="p-1.5 bg-[#1cc88a] text-white rounded hover:bg-[#17a673] transition-colors shadow-sm"
                        title="Edit Project"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button 
                        onClick={() => handleDelete(project.id)}
                        className="p-1.5 bg-[#e74a3b] text-white rounded hover:bg-[#be2617] transition-colors shadow-sm"
                        title="Delete Project"
                      >
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

      {/* View Project Modal */}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="max-w-3xl p-0 overflow-hidden bg-white border-none shadow-2xl rounded-none">
          {/* Header */}
          <div className="bg-[#00cfd5] p-4 text-white flex justify-between items-center">
            <h2 className="text-sm font-bold tracking-wide">Project Details</h2>
            <button onClick={() => setIsViewModalOpen(false)} className="hover:opacity-70 transition-opacity">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-2 gap-x-12 gap-y-6">
              {/* Column 1: Project Information */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-[#0061f2] mb-4">
                  <Building2 className="w-4 h-4" />
                  <span className="text-[13px] font-bold">Project Information</span>
                </div>
                
                <div className="space-y-3 text-[12px]">
                  <div className="grid grid-cols-[120px_1fr] gap-2">
                    <span className="text-gray-500 font-semibold">Project Number:</span>
                    <span className="text-gray-700">{selectedProject?.id}</span>
                  </div>
                  <div className="grid grid-cols-[120px_1fr] gap-2">
                    <span className="text-gray-500 font-semibold">Project Name:</span>
                    <span className="text-gray-700 uppercase">{selectedProject?.name}</span>
                  </div>
                  <div className="grid grid-cols-[120px_1fr] gap-2">
                    <span className="text-gray-500 font-semibold">Wing:</span>
                    <span className="text-gray-700 uppercase">{selectedProject?.wing}</span>
                  </div>
                  <div className="grid grid-cols-[120px_1fr] gap-2">
                    <span className="text-gray-500 font-semibold">Department:</span>
                    <span className="text-gray-700 uppercase">{selectedProject?.dept}</span>
                  </div>
                  <div className="grid grid-cols-[120px_1fr] gap-2">
                    <span className="text-gray-500 font-semibold">Project Value:</span>
                    <span className="text-gray-700 font-bold">₹ {selectedProject?.value}</span>
                  </div>
                  <div className="grid grid-cols-[120px_1fr] gap-2">
                    <span className="text-gray-500 font-semibold">Priority:</span>
                    <span className="text-gray-700">{selectedProject?.priority}</span>
                  </div>
                  <div className="grid grid-cols-[120px_1fr] gap-2">
                    <span className="text-gray-500 font-semibold">Status:</span>
                    <span className="text-gray-700">{selectedProject?.status}</span>
                  </div>
                </div>
              </div>

              {/* Column 2: Timeline & Client */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-[#0061f2] mb-4">
                  <MapPin className="w-4 h-4" />
                  <span className="text-[13px] font-bold">Timeline & Client</span>
                </div>

                <div className="space-y-3 text-[12px]">
                  <div className="grid grid-cols-[120px_1fr] gap-2">
                    <span className="text-gray-500 font-semibold">Start Date:</span>
                    <span className="text-gray-700">{selectedProject?.startDate}</span>
                  </div>
                  <div className="grid grid-cols-[120px_1fr] gap-2">
                    <span className="text-gray-500 font-semibold">End Date:</span>
                    <span className="text-gray-700">{selectedProject?.endDate}</span>
                  </div>
                  <div className="grid grid-cols-[120px_1fr] gap-2">
                    <span className="text-gray-500 font-semibold">Created By:</span>
                    <span className="text-gray-700 uppercase">{selectedProject?.createdBy}</span>
                  </div>
                  <div className="grid grid-cols-[120px_1fr] gap-2">
                    <span className="text-gray-500 font-semibold">Designation:</span>
                    <span className="text-gray-700 uppercase">{selectedProject?.post}</span>
                  </div>
                  <div className="grid grid-cols-[120px_1fr] gap-2">
                    <span className="text-gray-500 font-semibold">Location:</span>
                    <span className="text-gray-700 uppercase">{selectedProject?.location}</span>
                  </div>
                  <div className="grid grid-cols-[120px_1fr] gap-2">
                    <span className="text-gray-500 font-semibold">Client:</span>
                    <span className="text-gray-700 font-bold uppercase">{selectedProject?.client}</span>
                  </div>
                  <div className="grid grid-cols-[120px_1fr] gap-2">
                    <span className="text-gray-500 font-semibold">GST Number:</span>
                    <span className="text-gray-700">{selectedProject?.gst}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Full Description Section */}
            <div className="mt-8 space-y-3">
              <div className="flex items-center gap-2 text-[#0061f2]">
                <FileText className="w-4 h-4" />
                <span className="text-[13px] font-bold">Full Description</span>
              </div>
              <div className="bg-[#f2f8ff] p-4 rounded text-[12px] text-gray-600 leading-relaxed min-h-[60px] uppercase">
                {selectedProject?.description || 'No description available for this project.'}
              </div>
            </div>

            {/* Remarks Section */}
            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-2 text-[#0061f2]">
                <Info className="w-4 h-4" />
                <span className="text-[13px] font-bold">Remarks</span>
              </div>
              <div className="bg-[#f2f8ff] p-4 rounded text-[12px] text-gray-600 italic min-h-[60px]">
                No remarks available
              </div>
            </div>

            {/* Footer Close Button */}
            <div className="mt-8 flex justify-end">
              <button 
                onClick={() => setIsViewModalOpen(false)}
                className="px-6 py-2 bg-[#6f42c1] text-white text-[12px] font-bold rounded hover:bg-[#5a32a3] transition-colors shadow-sm"
              >
                Close
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Additional Info Modal */}
      <Dialog open={isAdditionalModalOpen} onOpenChange={setIsAdditionalModalOpen}>
        <DialogContent className="max-w-2xl p-0 overflow-hidden bg-white border-none shadow-2xl">
          <div className="bg-[#323c4e] p-5 text-white flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/20 rounded">
                <Plus className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <h2 className="text-lg font-bold tracking-tight uppercase">Additional Project Information</h2>
                <p className="text-[10px] opacity-60 uppercase tracking-widest font-bold">Configure extended project parameters</p>
              </div>
            </div>
            <button onClick={() => setIsAdditionalModalOpen(false)} className="p-1 hover:bg-white/10 rounded-full transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-8 space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-wider">Project Priority</label>
                <div className="grid grid-cols-3 gap-2">
                  <button className="py-2 border-2 border-emerald-500 text-emerald-600 text-[10px] font-black rounded uppercase bg-emerald-50">Low</button>
                  <button className="py-2 border-2 border-amber-500 text-amber-600 text-[10px] font-black rounded uppercase">Medium</button>
                  <button className="py-2 border border-gray-200 text-gray-400 text-[10px] font-bold rounded uppercase">High</button>
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-wider">Project Category</label>
                <select className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-400 transition-colors appearance-none">
                  <option>Development</option>
                  <option>Maintenance</option>
                  <option>Infrastructure</option>
                  <option>Research</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-wider">Project Description / Remarks</label>
              <textarea 
                rows={4}
                placeholder="Enter detailed project scope, objectives or special remarks..."
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400 transition-colors resize-none"
              ></textarea>
            </div>

            <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg flex gap-3">
              <AlertCircle className="w-5 h-5 text-blue-500 shrink-0" />
              <p className="text-xs text-blue-600 leading-relaxed">
                <span className="font-bold">Note:</span> These details are used for project analytics and tracking. Make sure to provide accurate information for better reporting.
              </p>
            </div>
          </div>

          <div className="p-6 border-t border-gray-100 flex justify-end gap-3 bg-gray-50/50">
            <button 
              onClick={() => setIsAdditionalModalOpen(false)}
              className="px-6 py-2 text-gray-400 text-[11px] font-bold rounded uppercase hover:text-gray-600 transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={() => setIsAdditionalModalOpen(false)}
              className="px-8 py-2.5 bg-[#1cc88a] text-white text-[11px] font-bold rounded shadow-sm hover:bg-[#17a673] transition-all uppercase tracking-widest flex items-center gap-2"
            >
              <Check className="w-3.5 h-3.5" /> Save Information
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Project Modal (Simplified for demo) */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-w-2xl p-0 overflow-hidden bg-white border-none shadow-2xl">
          <div className="bg-emerald-600 p-5 text-white flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded">
                <Edit className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-bold tracking-tight uppercase">Edit Project: {selectedProject?.id}</h2>
            </div>
            <button onClick={() => setIsEditModalOpen(false)} className="p-1 hover:bg-white/10 rounded-full transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="p-8">
            <p className="text-sm text-gray-600 mb-6">Modify the project details below and save your changes.</p>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="block text-[10px] font-black text-gray-400 uppercase">Project Name</label>
                <input type="text" defaultValue={selectedProject?.name} className="w-full px-3 py-2 border border-gray-200 rounded text-sm focus:border-emerald-500 outline-none" />
              </div>
              <div className="space-y-1.5">
                <label className="block text-[10px] font-black text-gray-400 uppercase">Client</label>
                <input type="text" defaultValue={selectedProject?.client} className="w-full px-3 py-2 border border-gray-200 rounded text-sm focus:border-emerald-500 outline-none" />
              </div>
            </div>
            <div className="mt-8 flex justify-end gap-3">
              <button onClick={() => setIsEditModalOpen(false)} className="px-6 py-2 text-gray-400 text-[11px] font-bold uppercase">Discard</button>
              <button onClick={() => setIsEditModalOpen(false)} className="px-8 py-2.5 bg-emerald-500 text-white text-[11px] font-bold rounded uppercase">Update Project</button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <div className="mt-12 flex justify-between items-center text-[10px] text-gray-400 px-2 uppercase font-bold tracking-[0.2em]">
        <p>Copyright &copy; Digital New Enterprises 2024</p>
        <div className="flex gap-4">
          <a href="#" className="hover:underline">Privacy Policy</a>
          <span>•</span>
          <a href="#" className="hover:underline">Terms & Conditions</a>
        </div>
      </div>
    </div>
  );
}
