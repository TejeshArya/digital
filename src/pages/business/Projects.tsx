import React, { useState, useEffect } from 'react';
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

interface Project {
  projectId: string;
  name: string;
  wing: string;
  department: string;
  location: string;
  post: string;
  createdBy: string;
  client: string;
  gst: string;
  value: string;
  startDate?: string;
  endDate?: string;
  selectDate?: string;
  status: string;
  priority: string;
  description: string;
  filePath?: string;
}

export function Projects() {
  const [projectList, setProjectList] = useState<Project[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);
  const [departments, setDepartments] = useState<any[]>([]);
  const [locations, setLocations] = useState<any[]>([]);
  const [companies, setCompanies] = useState<any[]>([]);
  const [availablePosts, setAvailablePosts] = useState<string[]>([]);
  const [postSearch, setPostSearch] = useState('');
  const [showPostResults, setShowPostResults] = useState(false);

  const user = JSON.parse(localStorage.getItem('user') || '{"fullName": "System User"}');
  
  const [formData, setFormData] = useState({
    projectId: '',
    name: '',
    wing: '',
    department: '',
    location: '',
    post: '',
    createdBy: user.fullName || user.name || 'Anonymous',
    client: '',
    gst: '',
    value: '',
    startDate: '',
    endDate: '',
    selectDate: new Date().toISOString().split('T')[0],
    status: 'In Progress',
    priority: 'Medium',
    description: ''
  });

  useEffect(() => {
    fetchProjects();
    fetchDropdowns();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5076/api/projects');
      const data = await response.json();
      setProjectList(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchDropdowns = async () => {
    try {
      const [deptRes, locRes, compRes, empRes] = await Promise.all([
        fetch('http://localhost:5076/api/departments'),
        fetch('http://localhost:5076/api/locations'),
        fetch('http://localhost:5076/api/companygsts'),
        fetch('http://localhost:5076/api/employees')
      ]);
      
      const depts = await deptRes.json();
      const locs = await locRes.json();
      const comps = await compRes.json();
      const emps = await empRes.json();
      
      setDepartments(depts);
      setLocations(locs);
      setCompanies(comps);
      
      // Extract unique roles/posts from employees
      const uniquePosts = Array.from(new Set(emps.map((e: any) => e.role).filter(Boolean))) as string[];
      setAvailablePosts(uniquePosts.length > 0 ? uniquePosts : ['IT', 'ASSISTANT MANAGER', 'SENIOR MANAGER', 'PROJECT LEAD']);
      
    } catch (error) {
      console.error('Error fetching dropdowns:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // If client is selected, try to find its GST
    if (name === 'client') {
      const selectedComp = companies.find(c => c.companyName === value);
      setFormData(prev => ({ 
        ...prev, 
        [name]: value,
        gst: selectedComp ? selectedComp.gstNumber : prev.gst
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSave = async () => {
    if (!formData.name || !formData.client || !formData.post) {
      alert('Please fill all required fields (Post, Name, Client)');
      return;
    }

    const finalFormData = {
      ...formData,
      projectId: formData.projectId || `PRJ-${Date.now().toString().slice(-6)}`,
      wing: formData.wing || 'GENERAL' // Default wing if not set
    };

    const data = new FormData();
    Object.entries(finalFormData).forEach(([key, value]) => {
      data.append(key, value);
    });
    if (selectedFile) {
      data.append('File', selectedFile);
    }

    try {
      const response = await fetch('http://localhost:5076/api/projects', {
        method: 'POST',
        body: data
      });

      if (response.ok) {
        alert('Project saved successfully!');
        fetchProjects();
        setFormData({
          projectId: '', name: '', wing: '', department: '', location: '',
          post: '', createdBy: user.fullName || user.name || 'Anonymous', client: '', gst: '', value: '',
          startDate: '', endDate: '', selectDate: new Date().toISOString().split('T')[0],
          status: 'In Progress', priority: 'Medium', description: ''
        });
        setSelectedFile(null);
        setPostSearch('');
      } else {
        const error = await response.json();
        alert('Error saving project: ' + (error.message || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error saving project:', error);
      alert('Failed to connect to the server.');
    }
  };

  const filteredPosts = availablePosts.filter(p => 
    p.toLowerCase().includes(postSearch.toLowerCase())
  );

  return (
    <div className="p-6 bg-white min-h-screen font-sans">
      {/* Top Controls */}
      <div className="mb-8">
        <button className="flex items-center gap-2 px-4 py-1.5 border border-purple-200 text-[#6f42c1] text-[11px] font-bold rounded hover:bg-purple-50 transition-colors uppercase tracking-tight">
          <RotateCw className="w-3.5 h-3.5" /> Clear Table Cache
        </button>
      </div>

      {/* Project Form */}
      <div className="mb-12 max-w-[1400px]">
        <div className="space-y-6">
          {/* Post Selection */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 uppercase tracking-tight text-[12px]">
              Select Post/Designation <span className="text-red-500">*</span>
            </label>
            <div className="relative max-w-2xl">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-500" />
                <input
                  type="text"
                  placeholder="Type to search your posts..."
                  value={postSearch}
                  onChange={(e) => {
                    setPostSearch(e.target.value);
                    setShowPostResults(true);
                  }}
                  onFocus={() => setShowPostResults(true)}
                  className="w-full pl-10 pr-4 py-2.5 bg-[#f8f9fc] border border-gray-100 rounded-lg text-sm focus:outline-none focus:border-blue-400 focus:bg-white transition-all placeholder:text-gray-400 shadow-sm"
                />
              </div>
              
              {showPostResults && postSearch && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-100 rounded-lg shadow-xl max-h-48 overflow-y-auto">
                  {filteredPosts.map((p, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setFormData(prev => ({ ...prev, post: p }));
                        setPostSearch(p);
                        setShowPostResults(false);
                      }}
                      className="w-full text-left px-4 py-2.5 text-sm hover:bg-blue-50 transition-colors border-b border-gray-50 last:border-0"
                    >
                      {p}
                    </button>
                  ))}
                  {filteredPosts.length === 0 && (
                    <div className="px-4 py-2.5 text-sm text-gray-400 italic">No posts found</div>
                  )}
                </div>
              )}

              <div className="flex items-center gap-2 mt-2">
                <Info className="w-3.5 h-3.5 text-gray-400" />
                <p className="text-[11px] text-gray-400 font-medium italic">
                  You have multiple posts. Please select which post you're creating this project for.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Row 2 */}
            <div className="space-y-1.5">
              <label className="block text-[12px] font-bold text-gray-600 uppercase tracking-tight">Select Date <span className="text-red-500">*</span></label>
              <input
                type="date"
                name="selectDate"
                value={formData.selectDate}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-400 transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-[12px] font-bold text-gray-600 uppercase tracking-tight">Client (Company Name - GST) <span className="text-red-500">*</span></label>
              <select
                name="client"
                value={formData.client}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-400 transition-all"
              >
                <option value="">Select Client</option>
                {companies.map(c => (
                  <option key={c.gstNumber} value={c.companyName}>
                    {c.companyName} - {c.gstNumber}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="block text-[12px] font-bold text-gray-600 uppercase tracking-tight">Value (₹) <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="value"
                value={formData.value}
                onChange={handleInputChange}
                placeholder="Enter project value"
                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-400 transition-all placeholder:text-gray-300"
              />
            </div>

            {/* Row 3 */}
            <div className="space-y-1.5">
              <label className="block text-[12px] font-bold text-gray-600 uppercase tracking-tight">Department - Officer <span className="text-red-500">*</span></label>
              <select
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-400 transition-all appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cpath%20d%3D%22M5%207.5L10%2012.5L15%207.5%22%20stroke%3D%22%236B7280%22%20stroke-width%3D%221.67%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22/%3E%3C/svg%3E')] bg-[length:1.25rem_1.25rem] bg-[right_0.75rem_center] bg-no-repeat"
              >
                <option value="">Select</option>
                {departments.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
              </select>
            </div>

            <div className="md:col-span-2 space-y-1.5">
              <label className="block text-[12px] font-bold text-gray-600 uppercase tracking-tight">Project Name <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-400 transition-all"
              />
            </div>

            {/* Row 4 */}
            <div className="space-y-1.5">
              <label className="block text-[12px] font-bold text-gray-600 uppercase tracking-tight">Start Date <span className="text-red-500">*</span></label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-400 transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-[12px] font-bold text-gray-600 uppercase tracking-tight">End Date <span className="text-red-500">*</span></label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-400 transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-[12px] font-bold text-gray-600 uppercase tracking-tight">Upload File</label>
              <div className="flex border border-gray-200 rounded overflow-hidden shadow-sm">
                <label className="bg-[#f8f9fc] px-4 py-2.5 text-sm font-semibold text-gray-500 cursor-pointer border-r border-gray-200 hover:bg-gray-100 transition-colors">
                  Choose File
                  <input type="file" className="hidden" onChange={handleFileChange} />
                </label>
                <div className="flex-1 px-4 py-2.5 text-sm text-gray-400 truncate bg-white italic">
                  {selectedFile ? selectedFile.name : 'No file chosen'}
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button 
              onClick={handleSave}
              className="px-8 py-2.5 bg-[#00ac69] text-white text-sm font-bold rounded hover:bg-[#008a54] transition-all shadow-md active:scale-95 uppercase tracking-widest"
            >
              Save Project
            </button>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="mt-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
          <div className="flex items-center gap-2 text-sm text-gray-600 font-medium">
            Show 
            <select className="border border-gray-200 rounded-md px-3 py-1 bg-white focus:outline-none focus:border-blue-400">
              <option>25</option>
              <option>50</option>
              <option>100</option>
            </select>
            entries
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500 font-medium tracking-tight">Search:</span>
            <input
              type="text"
              className="px-4 py-1.5 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-blue-400 bg-white"
            />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-[11px] border-collapse">
              <thead>
                <tr className="bg-[#323c4e] text-white uppercase font-bold tracking-tight">
                  <th className="px-4 py-5 text-left border-r border-slate-600">Project No</th>
                  <th className="px-4 py-5 text-left border-r border-slate-600">Project Name</th>
                  <th className="px-4 py-5 text-left border-r border-slate-600">Wing</th>
                  <th className="px-4 py-5 text-left border-r border-slate-600">Department</th>
                  <th className="px-4 py-5 text-left border-r border-slate-600">Location</th>
                  <th className="px-4 py-5 text-left border-r border-slate-600">Post</th>
                  <th className="px-4 py-5 text-left border-r border-slate-600">Created By</th>
                  <th className="px-4 py-5 text-left">Client</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {loading ? (
                  <tr>
                    <td colSpan={8} className="py-20 text-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                    </td>
                  </tr>
                ) : projectList.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-12 text-center text-gray-400 italic">No projects found</td>
                  </tr>
                ) : (
                  projectList.map((project, index) => (
                    <tr key={index} className="hover:bg-gray-50/80 transition-colors">
                      <td className="px-4 py-4 text-blue-500 font-bold border-r border-gray-50">{project.projectId}</td>
                      <td className="px-4 py-4 text-gray-700 font-bold border-r border-gray-50 uppercase leading-relaxed max-w-[300px]">{project.name}</td>
                      <td className="px-4 py-4 text-gray-500 border-r border-gray-50 uppercase">{project.wing}</td>
                      <td className="px-4 py-4 text-gray-500 border-r border-gray-50 uppercase">{project.department}</td>
                      <td className="px-4 py-4 text-gray-500 border-r border-gray-50 uppercase">{project.location}</td>
                      <td className="px-4 py-4 text-gray-500 border-r border-gray-50 uppercase">{project.post}</td>
                      <td className="px-4 py-4 text-gray-500 border-r border-gray-50 uppercase">{project.createdBy}</td>
                      <td className="px-4 py-4 text-gray-700 font-bold border-gray-50 uppercase">{project.client}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center text-[10px] text-gray-400 font-bold tracking-[0.2em] uppercase">
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
