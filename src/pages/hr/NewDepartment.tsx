import React, { useState, useEffect } from 'react';
import { 
  Building2, Plus, Search, Filter, Eye, Edit3, 
  Pause, Play, Trash2, Users, Calendar, Layout,
  ArrowLeft, X, Sparkles, Check, AlertCircle, RefreshCw,
  FolderPlus, Layers, ShieldCheck, Building, HelpCircle, Briefcase
} from 'lucide-react';

interface Company {
  gstNumber: string;
  companyName: string;
  stateName?: string;
  mobileNumber?: string;
  email?: string;
}

interface Employee {
  id: number;
  employeeId?: string;
  name: string;
  email: string;
  departmentId?: number;
  role?: string;
  status?: string;
}

interface Department {
  id?: number;
  name: string;
  description: string;
  status: boolean;
  companyGstNumber?: string;
  company?: Company;
  createdAt?: string;
}

export function NewDepartment() {
  // DB States
  const [departments, setDepartments] = useState<Department[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  
  // App UX States
  const [loading, setLoading] = useState<boolean>(true);
  const [saveLoading, setSaveLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  
  // Modal & Popup Dialog States
  const [showFormModal, setShowFormModal] = useState<boolean>(false);
  const [showViewModal, setShowViewModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  
  const [selectedDept, setSelectedDept] = useState<Department | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  
  // Custom Toast Alerts
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    status: true,
    companyGstNumber: ''
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    fetchInitialData();
  }, []);

  const triggerToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4500);
  };

  const fetchInitialData = async () => {
    try {
      setLoading(true);
      
      // Parallel fetches for efficiency
      const [deptRes, compRes, empRes] = await Promise.all([
        fetch('https://dee-backend-7x0g.onrender.com/api/departments'),
        fetch('https://dee-backend-7x0g.onrender.com/api/companygsts'),
        fetch('https://dee-backend-7x0g.onrender.com/api/employees')
      ]);

      if (deptRes.ok) {
        const deptData = await deptRes.json();
        setDepartments(deptData);
      } else {
        triggerToast('Failed to load departments from database', 'error');
      }

      if (compRes.ok) {
        const compData = await compRes.json();
        setCompanies(compData);
        if (compData.length > 0 && !formData.companyGstNumber) {
          setFormData(prev => ({ ...prev, companyGstNumber: compData[0].gstNumber }));
        }
      }

      if (empRes.ok) {
        const empData = await empRes.json();
        setEmployees(empData);
      }

    } catch (err) {
      console.error(err);
      triggerToast('Could not establish database connection', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Quick refresh
  const handleRefresh = () => {
    fetchInitialData();
    triggerToast('Data reloaded from server', 'info');
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) {
      errors.name = 'Department Name is required';
    } else if (formData.name.length < 2) {
      errors.name = 'Name must be at least 2 characters';
    }

    if (!formData.companyGstNumber) {
      errors.companyGstNumber = 'Please select a company';
    }

    // Check for duplicate names (excluding current editing department)
    const normalizedName = formData.name.trim().toUpperCase();
    const isDuplicate = departments.some(dept => 
      dept.id !== editingId && dept.name.trim().toUpperCase() === normalizedName
    );
    if (isDuplicate) {
      errors.name = 'A department with this name already exists';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleOpenAddModal = () => {
    setEditingId(null);
    setFormData({
      name: '',
      description: '',
      status: true,
      companyGstNumber: companies.length > 0 ? companies[0].gstNumber : '27AADCD1234A1Z1'
    });
    setFormErrors({});
    setShowFormModal(true);
  };

  const handleOpenEditModal = (dept: Department) => {
    setEditingId(dept.id || null);
    setFormData({
      name: dept.name,
      description: dept.description,
      status: dept.status,
      companyGstNumber: dept.companyGstNumber || (companies.length > 0 ? companies[0].gstNumber : '')
    });
    setFormErrors({});
    setShowFormModal(true);
  };

  const handleOpenViewModal = (dept: Department) => {
    setSelectedDept(dept);
    setShowViewModal(true);
  };

  const handleOpenDeleteModal = (dept: Department) => {
    setSelectedDept(dept);
    setShowDeleteModal(true);
  };

  const handleSaveDepartment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setSaveLoading(true);
      const url = editingId 
        ? 'https://dee-backend-7x0g.onrender.com/api/departments/edit' 
        : 'https://dee-backend-7x0g.onrender.com/api/departments';
      
      // Retain CreatedAt on editing to prevent database timestamp loss
      let originalCreatedAt = new Date().toISOString();
      if (editingId) {
        const matched = departments.find(d => d.id === editingId);
        if (matched?.createdAt) {
          originalCreatedAt = matched.createdAt;
        }
      }

      const payload = {
        id: editingId || 0,
        name: formData.name.toUpperCase().trim(),
        description: formData.description.trim(),
        status: formData.status,
        companyGstNumber: formData.companyGstNumber,
        createdAt: originalCreatedAt
      };

      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        triggerToast(
          editingId 
            ? `Department "${payload.name}" updated successfully` 
            : `Department "${payload.name}" created successfully`, 
          'success'
        );
        fetchInitialData();
        setShowFormModal(false);
      } else {
        const errorData = await res.json().catch(() => ({}));
        triggerToast(errorData.message || 'Error occurred while saving department details', 'error');
      }
    } catch (err) {
      console.error(err);
      triggerToast('Connection timeout during save operations', 'error');
    } finally {
      setSaveLoading(false);
    }
  };

  const handleDeleteDepartment = async () => {
    if (!selectedDept || !selectedDept.id) return;

    try {
      setSaveLoading(true);
      const res = await fetch(`https://dee-backend-7x0g.onrender.com/api/departments/${selectedDept.id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        triggerToast(`Department "${selectedDept.name}" deleted successfully`, 'info');
        fetchInitialData();
        setShowDeleteModal(false);
        setSelectedDept(null);
      } else {
        triggerToast('Failed to delete department. Verify relations exist.', 'error');
      }
    } catch (err) {
      console.error(err);
      triggerToast('Network error during deletion', 'error');
    } finally {
      setSaveLoading(false);
    }
  };

  const handleToggleStatus = async (dept: Department) => {
    try {
      const updated = { 
        ...dept, 
        status: !dept.status 
      };
      
      const res = await fetch('https://dee-backend-7x0g.onrender.com/api/departments/edit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated)
      });

      if (res.ok) {
        triggerToast(`Department "${dept.name}" status updated to ${!dept.status ? 'Active' : 'Disabled'}`, 'success');
        fetchInitialData();
      } else {
        triggerToast('Failed to toggle department status', 'error');
      }
    } catch (err) {
      console.error(err);
      triggerToast('Server connection failed during status change', 'error');
    }
  };

  // Date Formatter
  const formatDate = (dateStr?: string) => {
    if (!dateStr) return 'N/A';
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr;
      
      const pad = (n: number) => n.toString().padStart(2, '0');
      const day = pad(d.getDate());
      const month = pad(d.getMonth() + 1);
      const year = d.getFullYear();
      let hours = d.getHours();
      const minutes = pad(d.getMinutes());
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12;
      return `${day}/${month}/${year} ${pad(hours)}:${minutes} ${ampm}`;
    } catch (e) {
      return dateStr;
    }
  };

  // Searching logic
  const filteredDepts = departments.filter(dept => {
    const searchLower = searchTerm.toLowerCase();
    const nameMatch = dept.name.toLowerCase().includes(searchLower);
    const descMatch = (dept.description || '').toLowerCase().includes(searchLower);
    const idMatch = String(dept.id).includes(searchLower);
    const companyMatch = dept.company?.companyName.toLowerCase().includes(searchLower) || 
                          (dept.companyGstNumber || '').toLowerCase().includes(searchLower);
    return nameMatch || descMatch || idMatch || companyMatch;
  });

  // Dynamic Statistics
  const totalDepts = departments.length;
  const activeDepts = departments.filter(d => d.status).length;
  const inactiveDepts = departments.filter(d => !d.status).length;
  
  // Associated user mapping
  const getDeptUserCount = (deptId?: number) => {
    if (!deptId) return 0;
    return employees.filter(emp => emp.departmentId === deptId).length;
  };
  
  const totalAssociatedUsers = employees.filter(emp => 
    departments.some(d => d.id === emp.departmentId)
  ).length;

  const getDeptEmployees = (deptId?: number) => {
    if (!deptId) return [];
    return employees.filter(emp => emp.departmentId === deptId);
  };

  return (
    <div className="p-6 bg-slate-50 min-h-screen font-sans text-slate-800 relative">
      
      {/* Dynamic Floating Toast Alerts */}
      {toast && (
        <div className="fixed top-6 right-6 z-[100] max-w-sm w-full bg-white border border-slate-100 rounded-xl shadow-2xl overflow-hidden transition-all duration-300 transform translate-y-0 scale-100 animate-slide-in">
          <div className="p-4 flex items-center gap-3">
            {toast.type === 'success' && (
              <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center shrink-0 shadow-inner">
                <Check className="w-4.5 h-4.5" />
              </div>
            )}
            {toast.type === 'error' && (
              <div className="w-8 h-8 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center shrink-0 shadow-inner">
                <AlertCircle className="w-4.5 h-4.5" />
              </div>
            )}
            {toast.type === 'info' && (
              <div className="w-8 h-8 rounded-full bg-cyan-50 text-cyan-500 flex items-center justify-center shrink-0 shadow-inner">
                <Sparkles className="w-4.5 h-4.5" />
              </div>
            )}
            <div className="flex-1">
              <p className="text-xs font-bold text-slate-700 leading-tight">{toast.message}</p>
            </div>
            <button onClick={() => setToast(null)} className="text-slate-400 hover:text-slate-600 transition-colors focus:outline-none">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className={`h-1.5 w-full ${
            toast.type === 'success' ? 'bg-emerald-500' : toast.type === 'error' ? 'bg-rose-500' : 'bg-cyan-500'
          }`} />
        </div>
      )}

      {/* Top Header Card */}
      <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider font-extrabold text-[#0061f2] mb-1">
            <Building2 className="w-3.5 h-3.5" /> DEE Operations Framework
          </div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight flex items-center gap-2.5">
            DEPARTMENTS DIRECTORY
          </h1>
          <p className="text-xs text-slate-400 font-bold mt-0.5">
            Oversee corporate units, assign regulatory company profiles, and coordinate active employees dynamically.
          </p>
        </div>
        
        <div className="flex gap-2 w-full md:w-auto shrink-0">
          <button 
            onClick={handleRefresh}
            className="p-2.5 bg-slate-100 text-slate-600 hover:bg-slate-200 rounded-xl transition-all shadow-sm flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-slate-300"
            title="Refresh database records"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <button 
            onClick={handleOpenAddModal}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#0061f2] to-indigo-600 text-white text-xs font-black rounded-xl shadow-lg shadow-blue-100 hover:shadow-indigo-100 hover:scale-[1.01] active:scale-95 transition-all uppercase tracking-wider focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <Plus className="w-4 h-4" /> Add New Department
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 text-blue-500/10 pointer-events-none group-hover:scale-110 transition-transform">
            <Building2 className="w-12 h-12" />
          </div>
          <div className="text-slate-400 text-[10px] font-black uppercase tracking-wider">Total Departments</div>
          <div className="text-2xl font-black text-slate-800 mt-1">{loading ? '...' : totalDepts}</div>
          <div className="text-[9px] text-slate-400 font-bold mt-1.5 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span> Live divisions
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 text-emerald-500/10 pointer-events-none group-hover:scale-110 transition-transform">
            <ShieldCheck className="w-12 h-12" />
          </div>
          <div className="text-slate-400 text-[10px] font-black uppercase tracking-wider">Active Units</div>
          <div className="text-2xl font-black text-emerald-600 mt-1">{loading ? '...' : activeDepts}</div>
          <div className="text-[9px] text-slate-400 font-bold mt-1.5 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Fully operational
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 text-rose-500/10 pointer-events-none group-hover:scale-110 transition-transform">
            <Pause className="w-12 h-12" />
          </div>
          <div className="text-slate-400 text-[10px] font-black uppercase tracking-wider">Inactive Units</div>
          <div className="text-2xl font-black text-slate-400 mt-1">{loading ? '...' : inactiveDepts}</div>
          <div className="text-[9px] text-slate-400 font-bold mt-1.5 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span> Operations paused
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 text-cyan-500/10 pointer-events-none group-hover:scale-110 transition-transform">
            <Users className="w-12 h-12" />
          </div>
          <div className="text-slate-400 text-[10px] font-black uppercase tracking-wider">Associated Users</div>
          <div className="text-2xl font-black text-cyan-600 mt-1">{loading ? '...' : totalAssociatedUsers}</div>
          <div className="text-[9px] text-slate-400 font-bold mt-1.5 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500"></span> Assigned members
          </div>
        </div>
      </div>

      {/* Main Table Card Area */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden mb-6">
        
        {/* Table Filters & Toolbar */}
        <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="relative w-full sm:max-w-xs">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input 
              type="text"
              placeholder="Search by name, company, GST, description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#0061f2]/20 focus:border-[#0061f2] transition-all"
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')} 
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold focus:outline-none"
              >
                Clear
              </button>
            )}
          </div>
          
          <div className="flex items-center gap-3 text-xs text-slate-400 font-bold">
            <Filter className="w-4 h-4 text-slate-400" />
            <span>Showing {filteredDepts.length} of {departments.length} units</span>
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          {loading ? (
            <div className="py-24 flex flex-col items-center justify-center gap-3">
              <div className="w-10 h-10 border-4 border-[#0061f2] border-t-transparent rounded-full animate-spin"></div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest animate-pulse">Syncing Database Directory...</p>
            </div>
          ) : filteredDepts.length === 0 ? (
            <div className="py-24 flex flex-col items-center justify-center gap-4 text-center">
              <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300">
                <Building2 className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-sm font-black text-slate-700 uppercase tracking-wider">No matching departments found</h4>
                <p className="text-xs text-slate-400 font-bold mt-1 max-w-sm px-4">
                  We couldn't locate any records matching your search queries. Try clearing the filters or add a new department!
                </p>
              </div>
              <button 
                onClick={handleOpenAddModal}
                className="mt-2 flex items-center gap-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10px] font-black rounded-xl uppercase tracking-wider transition-colors focus:outline-none"
              >
                <Plus className="w-3.5 h-3.5" /> Create New Department
              </button>
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#323c4e] text-white text-[10px] uppercase tracking-wider font-extrabold">
                  <th className="px-6 py-4.5 border-r border-slate-600/30 w-16">ID</th>
                  <th className="px-6 py-4.5 border-r border-slate-600/30">Department Unit</th>
                  <th className="px-6 py-4.5 border-r border-slate-600/30">Associated Company</th>
                  <th className="px-6 py-4.5 border-r border-slate-600/30">Description</th>
                  <th className="px-6 py-4.5 border-r border-slate-600/30 text-center w-24">Status</th>
                  <th className="px-6 py-4.5 border-r border-slate-600/30 text-center w-28">User Count</th>
                  <th className="px-6 py-4.5 border-r border-slate-600/30">Created At</th>
                  <th className="px-6 py-4.5 text-center w-40">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-[11px] font-semibold text-slate-600">
                {filteredDepts.map((dept) => {
                  const userCount = getDeptUserCount(dept.id);
                  return (
                    <tr key={dept.id} className="hover:bg-slate-50/70 transition-colors group">
                      <td className="px-6 py-4 border-r border-slate-100 font-bold text-slate-400 group-hover:text-slate-600 transition-colors">
                        #{dept.id}
                      </td>
                      <td className="px-6 py-4 border-r border-slate-100 font-extrabold text-slate-800 uppercase tracking-tight">
                        {dept.name}
                      </td>
                      <td className="px-6 py-4 border-r border-slate-100">
                        <div className="flex flex-col gap-0.5">
                          <span className="font-extrabold text-slate-700 uppercase leading-normal">
                            {dept.company?.companyName || 'DIGITAL NEW ENTERPRISES'}
                          </span>
                          <span className="text-[9px] font-extrabold text-slate-400 tracking-wider">
                            GST: {dept.companyGstNumber || '27AADCD1234A1Z1'}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 border-r border-slate-100 text-slate-400 uppercase tracking-tight line-clamp-2 mt-2 border-none max-w-xs font-medium">
                        {dept.description || 'No description provided'}
                      </td>
                      <td className="px-6 py-4 border-r border-slate-100 text-center">
                        <button
                          onClick={() => handleToggleStatus(dept)}
                          className={`inline-flex items-center gap-1.5 text-[9px] font-black px-2.5 py-1 rounded-full uppercase shadow-xs transition-all hover:scale-[1.03] active:scale-95 focus:outline-none ${
                            dept.status 
                              ? 'bg-emerald-500 text-white hover:bg-emerald-600' 
                              : 'bg-slate-300 text-slate-600 hover:bg-slate-400'
                          }`}
                          title={`Click to mark as ${dept.status ? 'Disabled' : 'Active'}`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${dept.status ? 'bg-white animate-pulse' : 'bg-slate-500'}`}></span>
                          {dept.status ? 'Active' : 'Disabled'}
                        </button>
                      </td>
                      <td className="px-6 py-4 border-r border-slate-100 text-center">
                        <span className={`inline-flex items-center gap-1 text-[9px] font-black px-2.5 py-1.5 rounded shadow-xs ${
                          userCount > 0 
                            ? 'bg-cyan-500 text-white' 
                            : 'bg-slate-100 text-slate-400 font-bold border border-slate-200/50'
                        }`}>
                          <Users className="w-3 h-3" />
                          {userCount} {userCount === 1 ? 'User' : 'Users'}
                        </span>
                      </td>
                      <td className="px-6 py-4 border-r border-slate-100 text-slate-400 font-bold uppercase tracking-tight">
                        {formatDate(dept.createdAt)}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex justify-center items-center gap-1">
                          <button 
                            onClick={() => handleOpenViewModal(dept)}
                            className="p-1.5 bg-cyan-50 hover:bg-cyan-500 text-cyan-600 hover:text-white rounded-lg shadow-xs hover:shadow-cyan-100 transition-all focus:outline-none"
                            title="Detailed Inspection"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button 
                            onClick={() => handleOpenEditModal(dept)}
                            className="p-1.5 bg-yellow-50 hover:bg-yellow-500 text-yellow-600 hover:text-white rounded-lg shadow-xs hover:shadow-yellow-100 transition-all focus:outline-none"
                            title="Edit division credentials"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button 
                            onClick={() => handleToggleStatus(dept)}
                            className={`p-1.5 rounded-lg shadow-xs transition-all focus:outline-none ${
                              dept.status
                                ? 'bg-purple-50 hover:bg-purple-500 text-purple-600 hover:text-white hover:shadow-purple-100'
                                : 'bg-emerald-50 hover:bg-emerald-500 text-emerald-600 hover:text-white hover:shadow-emerald-100'
                            }`}
                            title={dept.status ? 'Deactivate unit operations' : 'Activate unit operations'}
                          >
                            {dept.status ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                          </button>
                          <button 
                            onClick={() => handleOpenDeleteModal(dept)}
                            className="p-1.5 bg-red-50 hover:bg-red-500 text-red-600 hover:text-white rounded-lg shadow-xs hover:shadow-red-100 transition-all focus:outline-none"
                            title="Decommission department"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Slide-out Overlay / Beautiful Form Drawer Modal */}
      {showFormModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs transition-opacity duration-300">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 max-w-lg w-full overflow-hidden transform transition-all duration-300 scale-100 animate-scale-up">
            
            {/* Modal Header */}
            <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-[#323c4e] text-white">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 bg-white/10 rounded-lg shadow-sm">
                  {editingId ? <Edit3 className="w-4 h-4" /> : <FolderPlus className="w-4 h-4" />}
                </div>
                <h3 className="text-xs font-black uppercase tracking-wider">
                  {editingId ? 'Edit Department Credentials' : 'Add New Corporate Department'}
                </h3>
              </div>
              <button 
                onClick={() => setShowFormModal(false)}
                className="p-1.5 rounded-lg hover:bg-white/10 text-slate-300 hover:text-white transition-colors focus:outline-none"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body / Form */}
            <form onSubmit={handleSaveDepartment}>
              <div className="p-6 space-y-5">
                
                {/* Department Name Input */}
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400">Department Name *</label>
                  <input 
                    type="text"
                    placeholder="E.g. HUMAN RESOURCES, IT SERVICES, ACCOUNTS"
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                      if (formErrors.name) setFormErrors({ ...formErrors, name: '' });
                    }}
                    className={`w-full px-4 py-2.5 text-xs font-semibold bg-slate-50 border rounded-xl focus:outline-none focus:ring-2 focus:bg-white uppercase transition-all ${
                      formErrors.name 
                        ? 'border-rose-400 focus:ring-rose-500/20' 
                        : 'border-slate-200 focus:ring-[#0061f2]/20'
                    }`}
                  />
                  {formErrors.name && (
                    <p className="text-[10px] font-bold text-rose-500 flex items-center gap-1.5 mt-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {formErrors.name}
                    </p>
                  )}
                </div>

                {/* Company Association Dropdown */}
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400">Assign Company Profile *</label>
                  <div className="relative">
                    <Building className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <select
                      value={formData.companyGstNumber}
                      onChange={(e) => {
                        setFormData({ ...formData, companyGstNumber: e.target.value });
                        if (formErrors.companyGstNumber) setFormErrors({ ...formErrors, companyGstNumber: '' });
                      }}
                      className={`w-full pl-10 pr-4 py-2.5 text-xs font-semibold bg-slate-50 border rounded-xl focus:outline-none focus:ring-2 focus:bg-white transition-all uppercase appearance-none ${
                        formErrors.companyGstNumber 
                          ? 'border-rose-400 focus:ring-rose-500/20' 
                          : 'border-slate-200 focus:ring-[#0061f2]/20'
                      }`}
                    >
                      <option value="" disabled>Select Company</option>
                      {companies.map(comp => (
                        <option key={comp.gstNumber} value={comp.gstNumber}>
                          {comp.companyName} ({comp.gstNumber})
                        </option>
                      ))}
                    </select>
                  </div>
                  {formErrors.companyGstNumber && (
                    <p className="text-[10px] font-bold text-rose-500 flex items-center gap-1.5 mt-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {formErrors.companyGstNumber}
                    </p>
                  )}
                  <p className="text-[9px] text-slate-400 font-bold mt-1">
                    Select the operational corporation profile this division operates under.
                  </p>
                </div>

                {/* Description Textarea */}
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400">Description</label>
                  <textarea 
                    rows={3}
                    placeholder="Enter division operations details, responsibilities, or general remarks..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-2.5 text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0061f2]/20 focus:bg-white transition-all resize-none"
                  />
                </div>

                {/* Status Toggle (only inside Modal form) */}
                <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500">Active Operational Status</label>
                    <p className="text-[9px] text-slate-400 font-bold mt-0.5">Toggle to immediately set division availability.</p>
                  </div>
                  
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, status: !formData.status })}
                    className={`w-11 h-6 rounded-full p-0.5 transition-colors focus:outline-none shrink-0 ${
                      formData.status ? 'bg-emerald-500' : 'bg-slate-300'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-200 ${
                      formData.status ? 'translate-x-5' : 'translate-x-0'
                    }`} />
                  </button>
                </div>
              </div>

              {/* Modal Actions Footer */}
              <div className="px-6 py-4.5 border-t border-slate-50 bg-slate-50/50 flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setShowFormModal(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-600 text-xs font-bold rounded-xl hover:bg-slate-100 transition-colors uppercase tracking-wider"
                  disabled={saveLoading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#0061f2] hover:bg-blue-700 text-white text-xs font-black rounded-xl transition-all shadow-md shadow-blue-100 flex items-center gap-1.5 uppercase tracking-wider"
                  disabled={saveLoading}
                >
                  {saveLoading && <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>}
                  {editingId ? 'Update Credentials' : 'Create Department'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Floating View Details Deep-dive Modal */}
      {showViewModal && selectedDept && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs transition-opacity duration-300 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 max-w-lg w-full overflow-hidden transform transition-all duration-300 scale-100 animate-scale-up">
            
            {/* Modal Header */}
            <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-indigo-950 text-white">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-white/10 rounded-lg">
                  <Eye className="w-4 h-4 text-cyan-400" />
                </div>
                <h3 className="text-xs font-black uppercase tracking-wider">
                  Department Deep-Dive Metrics
                </h3>
              </div>
              <button 
                onClick={() => setShowViewModal(false)}
                className="p-1 rounded-lg hover:bg-white/10 text-slate-300 hover:text-white transition-colors focus:outline-none"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
              
              {/* Graphic Representation */}
              <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-br from-indigo-50/50 to-indigo-100/30 rounded-2xl border border-indigo-50/60 relative overflow-hidden text-center">
                <div className="absolute -right-6 -bottom-6 text-indigo-500/5 pointer-events-none">
                  <Building2 className="w-24 h-24" />
                </div>
                <div className="w-12 h-12 rounded-2xl bg-indigo-900 text-white flex items-center justify-center shadow-lg shadow-indigo-100 text-sm font-black uppercase mb-3 border border-indigo-800">
                  {selectedDept.name.substring(0, 2)}
                </div>
                <h4 className="text-sm font-black text-slate-800 uppercase tracking-wider">{selectedDept.name}</h4>
                <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-wide">
                  Corporate Department ID: #{selectedDept.id}
                </p>
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl">
                  <span className="block text-[9px] font-black uppercase tracking-wider text-slate-400">Department Status</span>
                  <span className={`inline-flex items-center gap-1 text-[9px] font-black uppercase tracking-wider mt-2 px-2.5 py-0.5 rounded-full ${
                    selectedDept.status ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${selectedDept.status ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`}></span>
                    {selectedDept.status ? 'OPERATIONAL' : 'PAUSED'}
                  </span>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl">
                  <span className="block text-[9px] font-black uppercase tracking-wider text-slate-400">Registered Date</span>
                  <span className="text-[10px] font-black text-slate-700 flex items-center gap-1.5 mt-2">
                    <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    {formatDate(selectedDept.createdAt)}
                  </span>
                </div>
              </div>

              {/* Associated Company details */}
              <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl space-y-3">
                <h5 className="text-[10px] font-black uppercase tracking-wider text-indigo-950 flex items-center gap-1.5 border-b border-slate-200/50 pb-1.5">
                  <Building className="w-3.5 h-3.5 text-indigo-900" /> Company Corporate Affiliation
                </h5>
                <div className="grid grid-cols-2 gap-y-2.5 gap-x-2 text-[10px]">
                  <div>
                    <span className="block text-slate-400 font-extrabold uppercase text-[8px] tracking-wider">Company Name</span>
                    <span className="font-extrabold text-slate-700 uppercase">
                      {selectedDept.company?.companyName || 'DIGITAL NEW ENTERPRISES'}
                    </span>
                  </div>
                  <div>
                    <span className="block text-slate-400 font-extrabold uppercase text-[8px] tracking-wider">GST Reference Number</span>
                    <span className="font-extrabold text-slate-700 uppercase">
                      {selectedDept.companyGstNumber || '27AADCD1234A1Z1'}
                    </span>
                  </div>
                  {selectedDept.company?.email && (
                    <div>
                      <span className="block text-slate-400 font-extrabold uppercase text-[8px] tracking-wider">Official Email</span>
                      <span className="font-semibold text-slate-600">{selectedDept.company.email}</span>
                    </div>
                  )}
                  {selectedDept.company?.mobileNumber && (
                    <div>
                      <span className="block text-slate-400 font-extrabold uppercase text-[8px] tracking-wider">Contact Number</span>
                      <span className="font-semibold text-slate-600">{selectedDept.company.mobileNumber}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Description Section */}
              <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl space-y-2">
                <span className="block text-[9px] font-black uppercase tracking-wider text-slate-400">Division Operations Description</span>
                <p className="text-[10px] font-bold text-slate-600 uppercase tracking-tight leading-relaxed">
                  {selectedDept.description || 'NO ADDITIONAL DETAILS PROVIDED'}
                </p>
              </div>

              {/* Employees List within Department */}
              <div className="space-y-3">
                <h5 className="text-[10px] font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-slate-400" /> 
                  Assigned Personnel ({getDeptEmployees(selectedDept.id).length})
                </h5>
                
                {getDeptEmployees(selectedDept.id).length === 0 ? (
                  <div className="p-4 border border-dashed border-slate-200 rounded-xl text-center">
                    <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wide">
                      No active personnel assigned to this department
                    </p>
                  </div>
                ) : (
                  <div className="border border-slate-100 rounded-xl overflow-hidden divide-y divide-slate-100 bg-slate-50/30 max-h-48 overflow-y-auto">
                    {getDeptEmployees(selectedDept.id).map(emp => (
                      <div key={emp.id} className="p-3 flex justify-between items-center text-[10px]">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                            {emp.name.substring(0, 1).toUpperCase()}
                          </div>
                          <div>
                            <span className="block font-extrabold text-slate-700 uppercase leading-snug">{emp.name}</span>
                            <span className="block text-[8px] font-extrabold text-slate-400 tracking-wider">
                              ID: {emp.employeeId || 'Pending Approval'}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="inline-block px-2 py-0.5 bg-slate-100 text-slate-500 rounded text-[8px] font-bold uppercase tracking-wider mb-0.5">
                            {emp.role || 'Member'}
                          </span>
                          <span className="block text-[8px] font-extrabold text-slate-400">{emp.email}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4.5 border-t border-slate-100 bg-slate-50 flex justify-end">
              <button
                type="button"
                onClick={() => setShowViewModal(false)}
                className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-black rounded-xl transition-all uppercase tracking-wider"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Custom Delete Confirmation Modal */}
      {showDeleteModal && selectedDept && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs transition-opacity duration-300">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 max-w-sm w-full overflow-hidden transform transition-all duration-300 scale-100 animate-scale-up">
            
            {/* Modal Header */}
            <div className="p-5 flex flex-col items-center text-center space-y-3">
              <div className="w-12 h-12 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center shadow-inner">
                <Trash2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-800">
                  Decommission Department?
                </h3>
                <p className="text-[10px] text-slate-400 font-bold mt-1 px-2 leading-relaxed">
                  Are you absolutely certain you want to permanently delete the department <strong className="text-slate-700 uppercase">"{selectedDept.name}"</strong>?
                </p>
              </div>
            </div>

            {/* Warning Note */}
            <div className="mx-5 mb-4 p-3 bg-amber-50 border border-amber-100 rounded-xl flex gap-2.5 items-start">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-[9px] font-bold text-amber-800 leading-normal">
                WARNING: Deleting this division will break database relations if there are active employees currently assigned to it.
              </p>
            </div>

            {/* Modal Actions Footer */}
            <div className="px-5 py-4 border-t border-slate-50 bg-slate-50 flex justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 border border-slate-200 text-slate-600 text-xs font-bold rounded-xl hover:bg-slate-100 transition-colors uppercase tracking-wider"
                disabled={saveLoading}
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteDepartment}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-black rounded-xl transition-all shadow-md shadow-rose-100 flex items-center gap-1.5 uppercase tracking-wider"
                disabled={saveLoading}
              >
                {saveLoading && <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>}
                Decommission
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center text-[10px] text-gray-400 font-bold tracking-[0.2em] uppercase px-4">
        <p>Copyright &copy; Digital New Enterprises 2026</p>
        <div className="flex gap-4">
          <a href="#" className="hover:underline transition-colors hover:text-gray-600">Privacy Policy</a>
          <span>•</span>
          <a href="#" className="hover:underline transition-colors hover:text-gray-600">Terms & Conditions</a>
        </div>
      </div>
    </div>
  );
}
