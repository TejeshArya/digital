import React, { useState, useEffect, useMemo } from 'react';
import {
  UserCheck, Plus, Search, Filter, Edit3,
  Trash2, Save, FileText, MapPin, List,
  ArrowLeft, Info, GitFork, Users, Building2,
  History, UserPlus, X, Check, AlertCircle, Sparkles, Loader2, Calendar, ChevronDown
} from 'lucide-react';

interface RoleAssignmentData {
  id?: number;
  groupId: number;
  groupName: string;
  postId: number;
  postTitle: string;
  wing: string;
  dept: string;
  locationId: number;
  locationName: string;
  employeeId: number;
  employeeName: string;
  employeeCode?: string;
  desc?: string;
  date?: string;
}

interface Role {
  id: number;
  name: string;
  displayName?: string;
}

interface Post {
  id: number;
  title: string;
  wing: string;
  dept: string;
  groupName: string;
  groupId: number;
}

interface Location {
  id: number;
  name: string;
}

interface Employee {
  id: number;
  employeeId?: string;
  name: string;
}
export function RoleAssignment() {
  // DB Lists
  const [assignments, setAssignments] = useState<RoleAssignmentData[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);

  // Loading states
  const [loading, setLoading] = useState(true);
  const [saveLoading, setSaveLoading] = useState(false);
  const [deleteLoadingId, setDeleteLoadingId] = useState<number | null>(null);

  // Form states
  const [formData, setFormData] = useState({
    groupId: 0,
    groupName: '',
    postId: 0,
    postTitle: '',
    wing: '',
    dept: '',
    locationId: 0,
    locationName: '',
    employeeId: 0,
    employeeName: '',
    employeeCode: '',
    desc: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [editingId, setEditingId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Custom Toast State
  const [toast, setToast] = useState<{
    show: boolean;
    message: string;
    type: 'success' | 'error' | 'info';
  }>({
    show: false,
    message: '',
    type: 'success'
  });

  // Modal Delete Confirmation State
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);

  // Fetch initial entities
  useEffect(() => {
    fetchInitialData();
  }, []);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast(prev => ({ ...prev, show: false }));
    }, 4000);
  };

  const fetchInitialData = async () => {
    setLoading(true);
    try {
      const [assignmentsRes, rolesRes, postsRes, locationsRes, employeesRes] = await Promise.all([
        fetch('https://dee-backend-7x0g.onrender.com/api/roleassignments'),
        fetch('https://dee-backend-7x0g.onrender.com/api/roles'),
        fetch('https://dee-backend-7x0g.onrender.com/api/posts'),
        fetch('https://dee-backend-7x0g.onrender.com/api/locations'),
        fetch('https://dee-backend-7x0g.onrender.com/api/employees')
      ]);

      if (assignmentsRes.ok) {
        const assignmentsData = await assignmentsRes.json();
        setAssignments(assignmentsData);
      }

      if (rolesRes.ok) {
        const rolesData = await rolesRes.json();
        setRoles(rolesData.sort((a: Role, b: Role) => a.id - b.id));
      }

      if (postsRes.ok) {
        const postsData = await postsRes.json();
        setPosts(postsData);
      }

      if (locationsRes.ok) {
        const locationsData = await locationsRes.json();
        setLocations(locationsData);
      }

      if (employeesRes.ok) {
        const employeesData = await employeesRes.json();
        // Only active/approved employees
        const activeEmployees = employeesData.filter((e: any) => e.status === 'Active' || e.status === 'Approved');
        setEmployees(activeEmployees);
      }
    } catch (err) {
      console.error('Error fetching dynamic assignment details:', err);
      showToast('Failed to connect to backend ERP database services.', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Dropdown Handlers
  const handleGroupChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const gId = parseInt(e.target.value);
    if (gId) {
      const role = roles.find(x => x.id === gId);
      setFormData(prev => ({
        ...prev,
        groupId: gId,
        groupName: role ? role.displayName || role.name : ''
      }));
    } else {
      setFormData(prev => ({ ...prev, groupId: 0, groupName: '' }));
    }
    if (errors.groupId) setErrors(prev => ({ ...prev, groupId: '' }));
  };

  const handlePostChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const pId = parseInt(e.target.value);
    if (pId) {
      const post = posts.find(x => x.id === pId);
      setFormData(prev => ({
        ...prev,
        postId: pId,
        postTitle: post ? post.title : '',
        wing: post ? post.wing : '',
        dept: post ? post.dept : ''
      }));
    } else {
      setFormData(prev => ({ ...prev, postId: 0, postTitle: '', wing: '', dept: '' }));
    }
    if (errors.postId) setErrors(prev => ({ ...prev, postId: '' }));
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const lId = parseInt(e.target.value);
    if (lId) {
      const loc = locations.find(x => x.id === lId);
      setFormData(prev => ({
        ...prev,
        locationId: lId,
        locationName: loc ? loc.name : ''
      }));
    } else {
      setFormData(prev => ({ ...prev, locationId: 0, locationName: '' }));
    }
    if (errors.locationId) setErrors(prev => ({ ...prev, locationId: '' }));
  };

  const handleEmployeeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const empId = parseInt(e.target.value);
    if (empId) {
      const emp = employees.find(x => x.id === empId);
      setFormData(prev => ({
        ...prev,
        employeeId: empId,
        employeeName: emp ? emp.name : '',
        employeeCode: emp ? emp.employeeId || '' : ''
      }));
    } else {
      setFormData(prev => ({ ...prev, employeeId: 0, employeeName: '', employeeCode: '' }));
    }
    if (errors.employeeId) setErrors(prev => ({ ...prev, employeeId: '' }));
  };

  const handleDescChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, desc: e.target.value }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.groupId) newErrors.groupId = 'Group is required';
    if (!formData.postId) newErrors.postId = 'Post is required';
    if (!formData.locationId) newErrors.locationId = 'Location is required';
    if (!formData.employeeId) newErrors.employeeId = 'Employee is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      showToast('Please complete all required fields.', 'error');
      return;
    }

    setSaveLoading(true);
    try {
      const url = editingId
        ? 'https://dee-backend-7x0g.onrender.com/api/roleassignments/edit'
        : 'https://dee-backend-7x0g.onrender.com/api/roleassignments';

      const body = {
        ...formData,
        id: editingId || 0
      };

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      if (response.ok) {
        const savedAssignment = await response.json();
        if (editingId) {
          setAssignments(prev => prev.map(a => a.id === editingId ? savedAssignment : a));
          showToast(`Assignment successfully updated!`, 'success');
        } else {
          setAssignments(prev => [savedAssignment, ...prev]);
          showToast('New role assignment saved successfully!', 'success');
        }
        handleCancel();
      } else {
        showToast('Error saving role assignment to system.', 'error');
      }
    } catch (error) {
      console.error('Error saving role assignment:', error);
      showToast('Network error while saving.', 'error');
    } finally {
      setSaveLoading(false);
    }
  };

  const handleEdit = (asgn: RoleAssignmentData) => {
    setEditingId(asgn.id || null);
    setFormData({
      groupId: asgn.groupId,
      groupName: asgn.groupName,
      postId: asgn.postId,
      postTitle: asgn.postTitle,
      wing: asgn.wing,
      dept: asgn.dept,
      locationId: asgn.locationId,
      locationName: asgn.locationName,
      employeeId: asgn.employeeId,
      employeeName: asgn.employeeName,
      employeeCode: asgn.employeeCode || '',
      desc: asgn.desc || ''
    });
    setErrors({});
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast(`Loaded details for edit.`, 'info');
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({
      groupId: 0,
      groupName: '',
      postId: 0,
      postTitle: '',
      wing: '',
      dept: '',
      locationId: 0,
      locationName: '',
      employeeId: 0,
      employeeName: '',
      employeeCode: '',
      desc: ''
    });
    setErrors({});
  };

  const confirmDelete = (id: number) => {
    setDeleteConfirmId(id);
  };

  const handleDelete = async () => {
    if (!deleteConfirmId) return;

    setDeleteLoadingId(deleteConfirmId);
    try {
      const response = await fetch(`https://dee-backend-7x0g.onrender.com/api/roleassignments/${deleteConfirmId}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        setAssignments(prev => prev.filter(a => a.id !== deleteConfirmId));
        showToast('Role assignment deleted successfully.', 'success');
      } else {
        showToast('Failed to delete assignment from database.', 'error');
      }
    } catch (error) {
      console.error('Error deleting assignment:', error);
      showToast('Network error while deleting.', 'error');
    } finally {
      setDeleteLoadingId(null);
      setDeleteConfirmId(null);
    }
  };

  // Client-side search filtering
  const filteredAssignments = useMemo(() => {
    if (!searchTerm.trim()) return assignments;
    const term = searchTerm.toLowerCase();
    return assignments.filter(a =>
      a.groupName.toLowerCase().includes(term) ||
      a.postTitle.toLowerCase().includes(term) ||
      a.locationName.toLowerCase().includes(term) ||
      a.wing.toLowerCase().includes(term) ||
      a.dept.toLowerCase().includes(term) ||
      a.employeeName.toLowerCase().includes(term) ||
      (a.employeeCode && a.employeeCode.toLowerCase().includes(term)) ||
      (a.desc && a.desc.toLowerCase().includes(term))
    );
  }, [assignments, searchTerm]);

  return (
    <div className="p-6 bg-slate-50 min-h-screen font-sans text-slate-700 relative">

      {/* Premium Notification Toasts */}
      {toast.show && (
        <div className="fixed top-6 right-6 z-50 animate-slide-in max-w-sm bg-white rounded-xl shadow-xl border border-slate-100 p-4 flex items-start gap-3.5 transition-all hover:scale-[1.02]">
          <div className={`p-2 rounded-lg ${toast.type === 'success' ? 'bg-emerald-50 text-emerald-600' :
            toast.type === 'error' ? 'bg-rose-50 text-rose-600' :
              'bg-sky-50 text-sky-600'
            }`}>
            {toast.type === 'success' && <Check className="w-5 h-5" />}
            {toast.type === 'error' && <AlertCircle className="w-5 h-5" />}
            {toast.type === 'info' && <Info className="w-5 h-5" />}
          </div>
          <div className="flex-1">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Notification</h4>
            <p className="text-xs font-bold text-slate-700 mt-0.5 leading-relaxed">{toast.message}</p>
          </div>
          <button onClick={() => setToast(prev => ({ ...prev, show: false }))} className="text-slate-400 hover:text-slate-600">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Delete Confirmation Dialog Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-100 overflow-hidden transform transition-all scale-100">
            <div className="p-6 text-center">
              <div className="w-14 h-14 bg-rose-50 rounded-full flex items-center justify-center mx-auto text-rose-600 mb-4">
                <Trash2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-800">Delete Assignment</h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Are you sure you want to permanently delete this corporate role assignment? This record will be wiped from the system directory.
              </p>
            </div>
            <div className="bg-slate-50 px-6 py-4 flex gap-3 justify-end border-t border-slate-100">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 text-xs font-black text-slate-500 uppercase tracking-wider hover:bg-slate-100 rounded-lg transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-5 py-2 text-xs font-black text-white bg-rose-500 uppercase tracking-wider hover:bg-rose-600 rounded-lg shadow-md hover:shadow-rose-500/10 transition-all flex items-center gap-2"
              >
                {deleteLoadingId ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : null}
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-[1400px] mx-auto space-y-6">

        {/* Dynamic Top Banner */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-gradient-to-r from-blue-600 to-indigo-700 p-6 rounded-2xl shadow-lg shadow-indigo-600/15 text-white">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-1.5 bg-white/10 rounded-lg">
                <UserCheck className="w-5 h-5 text-indigo-200" />
              </span>
              <h1 className="text-xl font-bold tracking-tight uppercase">Corporate Role Assignments</h1>
            </div>
            <p className="text-xs text-indigo-100/80 font-medium max-w-xl">
              Assign corporate active posts and functional locations to employees, managing assignments in real time with synchronized database structures.
            </p>
          </div>
          <div className="flex items-center gap-2.5 bg-white/10 px-4 py-2 rounded-xl backdrop-blur-sm border border-white/5">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span className="text-[10px] font-black tracking-widest uppercase text-indigo-100">Live Schema Connected</span>
          </div>
        </div>

        {/* Creation/Edit Form Card */}
        <div className={`bg-white rounded-2xl shadow-md border overflow-hidden transition-all duration-300 ${editingId ? 'border-amber-400/60 ring-4 ring-amber-500/5' : 'border-slate-100'
          }`}>
          {/* Card Header */}
          <div className={`px-8 py-4 flex justify-between items-center border-b ${editingId ? 'bg-amber-50/40 border-amber-100' : 'bg-slate-50/50 border-slate-100'
            }`}>
            <div className="flex items-center gap-2">
              <span className={`p-1.5 rounded-lg ${editingId ? 'bg-amber-100 text-amber-600' : 'bg-blue-50/80 text-blue-600'}`}>
                {editingId ? <Edit3 className="w-4 h-4 animate-pulse" /> : <Save className="w-4 h-4" />}
              </span>
              <span className="text-[11px] font-black tracking-widest uppercase text-slate-500">
                {editingId ? `Update Assignment (#ID: ${editingId})` : 'Create New Assignment'}
              </span>
            </div>
            {editingId && (
              <span className="px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest bg-amber-100 text-amber-800 animate-pulse">
                Edit Mode
              </span>
            )}
          </div>

          {/* Form Fields */}
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 items-end">

              {/* Select Group */}
              <div className="space-y-1.5 relative">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Select Group <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <select
                    value={formData.groupId || ''}
                    onChange={handleGroupChange}
                    className={`w-full px-3 py-2.5 bg-white border rounded text-[12px] font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all appearance-none cursor-pointer ${errors.groupId ? 'border-rose-400 focus:ring-rose-500/10' : 'border-slate-200 focus:border-blue-400'
                      }`}
                  >
                    <option value="">Select Group</option>
                    {roles.map(r => (
                      <option key={r.id} value={r.id}>
                        {r.displayName || r.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
                {errors.groupId && <p className="text-[9px] font-bold text-rose-500 uppercase tracking-tight">{errors.groupId}</p>}
              </div>

              {/* Select Location */}
              <div className="space-y-1.5 relative">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Select Location <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <select
                    value={formData.locationId || ''}
                    onChange={handleLocationChange}
                    className={`w-full px-3 py-2.5 bg-white border rounded text-[12px] font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all appearance-none cursor-pointer ${errors.locationId ? 'border-rose-400 focus:ring-rose-500/10' : 'border-slate-200 focus:border-blue-400'
                      }`}
                  >
                    <option value="">Select Location</option>
                    {locations.map(l => (
                      <option key={l.id} value={l.id}>
                        {l.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
                {errors.locationId && <p className="text-[9px] font-bold text-rose-500 uppercase tracking-tight">{errors.locationId}</p>}
              </div>


              {/* Select Post */}
              <div className="space-y-1.5 relative">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Select Post <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <select
                    value={formData.postId || ''}
                    onChange={handlePostChange}
                    className={`w-full px-3 py-2.5 bg-white border rounded text-[12px] font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all appearance-none cursor-pointer ${errors.postId ? 'border-rose-400 focus:ring-rose-500/10' : 'border-slate-200 focus:border-blue-400'
                      }`}
                  >
                    <option value="">Select Post</option>
                    {posts.map(p => (
                      <option key={p.id} value={p.id}>
                        {p.title} ({p.groupName})
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
                {errors.postId && <p className="text-[9px] font-bold text-rose-500 uppercase tracking-tight">{errors.postId}</p>}
              </div>


              {/* Select Employee */}
              <div className="space-y-1.5 relative">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Select Employee <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <select
                    value={formData.employeeId || ''}
                    onChange={handleEmployeeChange}
                    className={`w-full px-3 py-2.5 bg-white border rounded text-[12px] font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all appearance-none cursor-pointer ${errors.employeeId ? 'border-rose-400 focus:ring-rose-500/10' : 'border-slate-200 focus:border-blue-400'
                      }`}
                  >
                    <option value="">Select Employee</option>
                    {employees.map(e => (
                      <option key={e.id} value={e.id}>
                        {e.name} {e.employeeId ? `(${e.employeeId})` : ''}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
                {errors.employeeId && <p className="text-[9px] font-bold text-rose-500 uppercase tracking-tight">{errors.employeeId}</p>}
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Description
                </label>
                <input
                  type="text"
                  value={formData.desc}
                  onChange={handleDescChange}
                  placeholder="Enter Description"
                  className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded text-[12px] font-bold text-slate-700 focus:outline-none focus:border-blue-400 transition-all"
                />
              </div>

            </div>

            <div className="mt-6 flex justify-end gap-3 border-t border-slate-100 pt-4">
              {editingId && (
                <button
                  onClick={handleCancel}
                  className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-500 text-[10px] font-black rounded-lg uppercase tracking-widest transition-all"
                >
                  Cancel
                </button>
              )}
              <button
                onClick={handleSave}
                disabled={saveLoading}
                className={`flex items-center justify-center gap-1.5 px-12 py-2.5 text-white text-[10px] font-black rounded-lg shadow-md uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer ${editingId
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 shadow-amber-500/10'
                  : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-indigo-600/10'
                  }`}
              >
                {saveLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                {editingId ? 'Update' : 'Save'}
              </button>
            </div>
          </div>
        </div>

        {/* Assignments Table Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden min-h-[500px] flex flex-col">

          {/* Table Header toolbar */}
          <div className="px-8 py-5 border-b border-slate-100 bg-slate-50/30 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <List className="w-4 h-4 text-slate-400" />
                <span className="text-[11px] font-black tracking-widest uppercase text-slate-500">Corporate Assignment Matrix</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-400 font-bold">
                <span>Total Active Matrix Listings:</span>
                <span className="bg-slate-200/80 px-2 py-0.5 rounded-full text-slate-600 text-[10px] font-black">
                  {assignments.length}
                </span>
                {searchTerm && (
                  <>
                    <span>• Filters:</span>
                    <span className="bg-indigo-100 px-2 py-0.5 rounded-full text-indigo-700 text-[10px] font-black">
                      {filteredAssignments.length}
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Toolbar Search Box */}
            <div className="relative w-full sm:w-80">
              <input
                type="text"
                placeholder="Search Group, Post, Employee, Location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 focus:border-indigo-400 rounded-xl text-xs font-bold text-slate-600 focus:outline-none focus:ring-4 focus:ring-indigo-500/5 transition-all placeholder-slate-400"
              />
              <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Core Table View */}
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-[11px] border-collapse text-left">
              <thead>
                <tr className="bg-slate-50/80 text-slate-400 uppercase tracking-widest border-b border-slate-100">
                  <th className="px-6 py-4.5 font-black border-r border-slate-50">Group</th>
                  <th className="px-6 py-4.5 font-black border-r border-slate-50">Post</th>
                  <th className="px-6 py-4.5 text-center font-black border-r border-slate-50">Location</th>
                  <th className="px-6 py-4.5 text-center font-black border-r border-slate-50">Wing</th>
                  <th className="px-6 py-4.5 text-center font-black border-r border-slate-50">Department</th>
                  <th className="px-6 py-4.5 font-black border-r border-slate-50">Employee</th>
                  <th className="px-6 py-4.5 font-black border-r border-slate-50">Description</th>
                  <th className="px-6 py-4.5 text-center font-black border-r border-slate-50">Created Date</th>
                  <th className="px-6 py-4.5 text-center font-black">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr>
                    <td colSpan={9} className="py-24 text-center">
                      <div className="flex flex-col items-center justify-center gap-3">
                        <div className="animate-spin inline-block w-8 h-8 border-3 border-indigo-600 rounded-full border-t-transparent shadow-sm"></div>
                        <p className="text-slate-400 text-xs font-black uppercase tracking-widest animate-pulse">Syncing matrix schema...</p>
                      </div>
                    </td>
                  </tr>
                ) : filteredAssignments.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="py-24 text-center">
                      <div className="flex flex-col items-center justify-center gap-2.5 max-w-sm mx-auto text-slate-400">
                        <div className="p-3 bg-slate-50 rounded-2xl text-slate-300">
                          <FileText className="w-8 h-8" />
                        </div>
                        <h4 className="text-xs font-black text-slate-700 uppercase tracking-widest mt-1">No Assignments Seeding</h4>
                        <p className="text-[11px] text-slate-400 font-medium leading-relaxed">
                          {searchTerm
                            ? 'No dynamic index matches your query context.'
                            : 'No corporate active assignments found in the matrix database.'}
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredAssignments.map((asgn) => (
                    <tr key={asgn.id} className="hover:bg-slate-50/30 transition-colors group">

                      {/* Group */}
                      <td className="px-6 py-4.5 border-r border-slate-50 font-black text-slate-400 uppercase tracking-tighter">
                        {asgn.groupName}
                      </td>

                      {/* Post */}
                      <td className="px-6 py-4.5 border-r border-slate-50 font-black text-slate-800 uppercase tracking-tight">
                        {asgn.postTitle}
                      </td>

                      {/* Location */}
                      <td className="px-6 py-4.5 border-r border-slate-50 text-center font-bold text-slate-500 uppercase tracking-tight">
                        <span className="inline-block px-2.5 py-0.5 rounded-full text-[9px] font-black tracking-wide bg-indigo-50 text-indigo-600 border border-indigo-100/30">
                          {asgn.locationName}
                        </span>
                      </td>

                      {/* Wing */}
                      <td className="px-6 py-4.5 border-r border-slate-50 text-center font-bold text-slate-500 uppercase tracking-tight">
                        <span className="inline-block px-2.5 py-0.5 rounded-full text-[9px] font-black tracking-wide bg-blue-50 text-blue-600 border border-blue-100/30">
                          {asgn.wing}
                        </span>
                      </td>

                      {/* Dept */}
                      <td className="px-6 py-4.5 border-r border-slate-50 text-center font-bold text-slate-500 uppercase tracking-tight">
                        <span className="inline-block px-2.5 py-0.5 rounded-full text-[9px] font-black tracking-wide bg-slate-100 text-slate-600">
                          {asgn.dept}
                        </span>
                      </td>

                      {/* Employee */}
                      <td className="px-6 py-4.5 border-r border-slate-50 font-black text-slate-700 leading-normal">
                        <div className="flex flex-col">
                          <span className="uppercase text-slate-700 font-bold">{asgn.employeeName}</span>
                          {asgn.employeeCode && (
                            <span className="text-[9px] text-slate-400 font-mono tracking-tight mt-0.5 font-bold">
                              #{asgn.employeeCode}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Description */}
                      <td className="px-6 py-4.5 border-r border-slate-50 font-bold text-slate-400 max-w-[180px] truncate" title={asgn.desc}>
                        {asgn.desc || <span className="text-slate-300 font-medium italic">None</span>}
                      </td>

                      {/* Created Date */}
                      <td className="px-6 py-4.5 border-r border-slate-50 text-center font-bold text-slate-400">
                        <div className="flex items-center justify-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-slate-300" />
                          <span>
                            {asgn.date
                              ? new Date(asgn.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
                              : 'Just Now'}
                          </span>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4.5 text-center">
                        <div className="flex gap-2 justify-center items-center opacity-85 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => handleEdit(asgn)}
                            title="Edit Assignment"
                            className="p-2 border border-slate-200 bg-white text-indigo-500 rounded-lg hover:border-indigo-200 hover:bg-indigo-50/50 hover:text-indigo-600 hover:scale-105 active:scale-95 transition-all shadow-sm cursor-pointer animate-fade-in"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => asgn.id && confirmDelete(asgn.id)}
                            title="Delete Assignment"
                            className="p-2 border border-slate-200 bg-white text-rose-500 rounded-lg hover:border-rose-200 hover:bg-rose-50/50 hover:text-rose-600 hover:scale-105 active:scale-95 transition-all shadow-sm cursor-pointer animate-fade-in"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>

                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Premium Footer */}
      <div className="max-w-[1400px] mx-auto mt-12 pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center text-[10px] text-slate-400 font-black tracking-[0.2em] uppercase px-4">
        <p>Copyright &copy; Digital New Enterprises 2026</p>
        <div className="flex gap-4">
          <a href="#" className="hover:underline transition-colors hover:text-slate-600">Privacy Policy</a>
          <span>•</span>
          <a href="#" className="hover:underline transition-colors hover:text-slate-600">Terms & Conditions</a>
        </div>
      </div>
    </div>
  );
}
