import React, { useState, useEffect } from 'react';
import { 
  Plane, Plus, Search, Filter, Eye, Edit3, 
  Pause, Play, Trash2, Users, Calendar, Layout,
  ArrowLeft, X, Sparkles, Check, AlertCircle, RefreshCw,
  FolderPlus, Layers, ShieldCheck, HelpCircle
} from 'lucide-react';

interface Wing {
  id?: number;
  name: string;
  description: string;
  status: boolean;
  userCount: number;
  createdAt?: string;
}

export function Wings() {
  const [wings, setWings] = useState<Wing[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [saveLoading, setSaveLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  
  // Modals & Drawer States
  const [showFormModal, setShowFormModal] = useState<boolean>(false);
  const [showViewModal, setShowViewModal] = useState<boolean>(false);
  const [selectedWing, setSelectedWing] = useState<Wing | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  
  // Toast Alert Notification
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    status: true,
    userCount: 0
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    fetchWings();
  }, []);

  const triggerToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  const fetchWings = async () => {
    try {
      setLoading(true);
      const res = await fetch('https://dee-backend-7x0g.onrender.com/api/wings');
      if (res.ok) {
        const data = await res.json();
        setWings(data);
      } else {
        triggerToast('Failed to load wings from database', 'error');
      }
    } catch (err) {
      console.error(err);
      triggerToast('Server connection failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) {
      errors.name = 'Wing Name is required';
    } else if (formData.name.length < 2) {
      errors.name = 'Wing Name must be at least 2 characters';
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
      userCount: 0
    });
    setFormErrors({});
    setShowFormModal(true);
  };

  const handleOpenEditModal = (wing: Wing) => {
    setEditingId(wing.id || null);
    setFormData({
      name: wing.name,
      description: wing.description,
      status: wing.status,
      userCount: wing.userCount
    });
    setFormErrors({});
    setShowFormModal(true);
  };

  const handleOpenViewModal = (wing: Wing) => {
    setSelectedWing(wing);
    setShowViewModal(true);
  };

  const handleSaveWing = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setSaveLoading(true);
      const url = editingId 
        ? 'https://dee-backend-7x0g.onrender.com/api/wings/edit' 
        : 'https://dee-backend-7x0g.onrender.com/api/wings';
      
      const payload = {
        ...formData,
        id: editingId || 0,
        name: formData.name.toUpperCase().trim()
      };

      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        triggerToast(
          editingId ? `Wing "${payload.name}" updated successfully` : `Wing "${payload.name}" created successfully`, 
          'success'
        );
        fetchWings();
        setShowFormModal(false);
      } else {
        const errorData = await res.json().catch(() => ({}));
        triggerToast(errorData.message || 'Error occurred during save action', 'error');
      }
    } catch (err) {
      console.error(err);
      triggerToast('Connection error during save operations', 'error');
    } finally {
      setSaveLoading(false);
    }
  };

  const handleDeleteWing = async (id: number, name: string) => {
    if (window.confirm(`Are you sure you want to permanently delete the wing "${name}"?`)) {
      try {
        const res = await fetch(`https://dee-backend-7x0g.onrender.com/api/wings/${id}`, {
          method: 'DELETE'
        });
        if (res.ok) {
          triggerToast(`Wing "${name}" has been deleted`, 'info');
          fetchWings();
        } else {
          triggerToast('Failed to delete wing from server', 'error');
        }
      } catch (err) {
        console.error(err);
        triggerToast('Network error during deletion', 'error');
      }
    }
  };

  const handleToggleStatus = async (wing: Wing) => {
    try {
      const updated = { ...wing, status: !wing.status };
      const res = await fetch('https://dee-backend-7x0g.onrender.com/api/wings/edit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated)
      });
      if (res.ok) {
        triggerToast(`Wing "${wing.name}" is now ${!wing.status ? 'Active' : 'Disabled'}`, 'success');
        fetchWings();
      } else {
        triggerToast('Failed to toggle wing status', 'error');
      }
    } catch (err) {
      console.error(err);
      triggerToast('Server connection failed', 'error');
    }
  };

  // Live Date Formatter
  const formatDate = (dateStr?: string) => {
    if (!dateStr) return 'N/A';
    try {
      const d = new Date(dateStr);
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
  const filteredWings = wings.filter(wing => 
    wing.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    wing.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Statistics calculation
  const totalWings = wings.length;
  const activeWings = wings.filter(w => w.status).length;
  const disabledWings = wings.filter(w => !w.status).length;
  const totalUsers = wings.reduce((acc, w) => acc + (w.userCount || 0), 0);

  return (
    <div className="p-6 bg-slate-50 min-h-screen font-sans text-slate-800 relative">
      
      {/* Toast Alert Notification */}
      {toast && (
        <div className="fixed top-6 right-6 z-[100] max-w-sm w-full bg-white border border-slate-100 rounded-xl shadow-xl overflow-hidden animate-slide-in duration-300">
          <div className="p-4 flex items-center gap-3">
            {toast.type === 'success' && (
              <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center shrink-0">
                <Check className="w-4 h-4" />
              </div>
            )}
            {toast.type === 'error' && (
              <div className="w-8 h-8 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center shrink-0">
                <AlertCircle className="w-4 h-4" />
              </div>
            )}
            {toast.type === 'info' && (
              <div className="w-8 h-8 rounded-full bg-cyan-50 text-cyan-500 flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4" />
              </div>
            )}
            <div className="flex-1">
              <p className="text-xs font-semibold text-slate-700">{toast.message}</p>
            </div>
            <button onClick={() => setToast(null)} className="text-slate-400 hover:text-slate-600 transition-colors">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className={`h-1 w-full ${toast.type === 'success' ? 'bg-emerald-500' : toast.type === 'error' ? 'bg-rose-500' : 'bg-cyan-500'} animate-progress-bar`} />
        </div>
      )}

      {/* Top Header Card with glassmorphic layout */}
      <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider font-extrabold text-[#0061f2] mb-1">
            <Layers className="w-3.5 h-3.5" /> HR Enterprise Suite
          </div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight flex items-center gap-2.5">
            WINGS MANAGEMENT
          </h1>
          <p className="text-xs text-slate-400 font-bold mt-0.5">
            Define organizational divisions, operations sectors, and track user associations dynamically.
          </p>
        </div>
        
        <div className="flex gap-2 w-full md:w-auto shrink-0">
          <button 
            onClick={fetchWings}
            className="p-2.5 bg-slate-100 text-slate-600 hover:bg-slate-200 rounded-xl transition-all shadow-sm flex items-center justify-center"
            title="Refresh database records"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <button 
            onClick={handleOpenAddModal}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#0061f2] to-indigo-600 text-white text-xs font-black rounded-xl shadow-lg shadow-blue-100 hover:shadow-indigo-100 hover:scale-[1.01] active:scale-95 transition-all uppercase tracking-wider"
          >
            <Plus className="w-4 h-4" /> Add New Wing
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4.5 rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-3 text-indigo-500/10 pointer-events-none group-hover:scale-110 transition-transform">
            <Layers className="w-12 h-12" />
          </div>
          <div className="text-slate-400 text-[10px] font-black uppercase tracking-wider">Total Wings</div>
          <div className="text-2xl font-black text-slate-800 mt-1">{loading ? '...' : totalWings}</div>
          <div className="text-[9px] text-slate-400 font-bold mt-1.5 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span> Sectors overall
          </div>
        </div>

        <div className="bg-white p-4.5 rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-3 text-emerald-500/10 pointer-events-none group-hover:scale-110 transition-transform">
            <ShieldCheck className="w-12 h-12" />
          </div>
          <div className="text-slate-400 text-[10px] font-black uppercase tracking-wider">Active Sectors</div>
          <div className="text-2xl font-black text-emerald-600 mt-1">{loading ? '...' : activeWings}</div>
          <div className="text-[9px] text-emerald-600 font-bold mt-1.5 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Online & usable
          </div>
        </div>

        <div className="bg-white p-4.5 rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-3 text-slate-400/10 pointer-events-none group-hover:scale-110 transition-transform">
            <Pause className="w-12 h-12" />
          </div>
          <div className="text-slate-400 text-[10px] font-black uppercase tracking-wider">Disabled Sectors</div>
          <div className="text-2xl font-black text-slate-500 mt-1">{loading ? '...' : disabledWings}</div>
          <div className="text-[9px] text-slate-400 font-bold mt-1.5 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span> Currently paused
          </div>
        </div>

        <div className="bg-white p-4.5 rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-3 text-cyan-500/10 pointer-events-none group-hover:scale-110 transition-transform">
            <Users className="w-12 h-12" />
          </div>
          <div className="text-slate-400 text-[10px] font-black uppercase tracking-wider">Associated Users</div>
          <div className="text-2xl font-black text-cyan-600 mt-1">{loading ? '...' : totalUsers}</div>
          <div className="text-[9px] text-slate-400 font-bold mt-1.5 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500"></span> User counts overall
          </div>
        </div>
      </div>

      {/* Main Table & Control Layout */}
      <div className="max-w-7xl mx-auto">
        
        {/* Filter and search actions header */}
        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 mb-4 bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
          <div className="relative flex-1 max-w-md">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <Search className="w-4 h-4 text-slate-400" />
            </span>
            <input 
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search wing name or description..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0061f2]/20 focus:bg-white transition-all"
            />
            {searchTerm && (
              <button onClick={() => setSearchTerm('')} className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 text-xs">
                Clear
              </button>
            )}
          </div>
          
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-[10px] text-slate-400 font-extrabold uppercase bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5" /> Filtering {filteredWings.length} of {wings.length}
            </span>
          </div>
        </div>

        {/* Dynamic Table Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto min-h-[350px]">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="bg-slate-800 text-slate-200 uppercase tracking-wider text-[10px] font-black select-none">
                  <th className="px-6 py-4.5 text-left font-black border-r border-slate-700 w-16">ID</th>
                  <th className="px-6 py-4.5 text-left font-black border-r border-slate-700">Wing Name</th>
                  <th className="px-6 py-4.5 text-left font-black border-r border-slate-700">Description</th>
                  <th className="px-6 py-4.5 text-center font-black border-r border-slate-700 w-24">Status</th>
                  <th className="px-6 py-4.5 text-center font-black border-r border-slate-700 w-24">Users Count</th>
                  <th className="px-6 py-4.5 text-left font-black border-r border-slate-700">Created At</th>
                  <th className="px-6 py-4.5 text-center font-black">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr>
                    <td colSpan={7} className="py-20 text-center">
                      <div className="flex flex-col items-center justify-center gap-3">
                        <div className="w-10 h-10 border-3 border-[#0061f2] border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-xs text-slate-400 font-bold uppercase tracking-widest animate-pulse">Querying database records...</p>
                      </div>
                    </td>
                  </tr>
                ) : filteredWings.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-20 text-center">
                      <div className="flex flex-col items-center justify-center gap-3 max-w-sm mx-auto">
                        <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center">
                          <HelpCircle className="w-6 h-6" />
                        </div>
                        <h3 className="text-sm font-black text-slate-700 uppercase">No wings matched</h3>
                        <p className="text-xs text-slate-400 font-semibold leading-relaxed">
                          We couldn't find any wings matching your search. Try adjusting your query or create a brand new wing.
                        </p>
                        {searchTerm && (
                          <button 
                            onClick={() => setSearchTerm('')}
                            className="mt-1 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 text-[10px] font-black rounded-lg transition-colors uppercase tracking-wider"
                          >
                            Reset filters
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredWings.map((wing) => (
                    <tr key={wing.id} className="hover:bg-slate-50/50 transition-all group">
                      <td className="px-6 py-4 border-r border-slate-50 font-bold text-slate-400">
                        {wing.id}
                      </td>
                      <td className="px-6 py-4 border-r border-slate-50 font-black text-slate-700 uppercase tracking-tight">
                        <div className="flex items-center gap-2">
                          <div className="w-1.5 h-6 rounded-full bg-indigo-500 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                          {wing.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 border-r border-slate-50 font-semibold text-slate-400 max-w-[200px] truncate" title={wing.description}>
                        {wing.description || <span className="text-slate-300 italic text-[10px]">No description defined</span>}
                      </td>
                      <td className="px-6 py-4 border-r border-slate-50 text-center">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider ${
                          wing.status 
                            ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' 
                            : 'bg-slate-100 text-slate-500 border border-slate-200'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${wing.status ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`}></span>
                          {wing.status ? 'Active' : 'Disabled'}
                        </span>
                      </td>
                      <td className="px-6 py-4 border-r border-slate-50 text-center">
                        <span className="bg-cyan-50 text-cyan-600 border border-cyan-100 text-[9px] font-black px-2.5 py-1 rounded-full inline-flex items-center gap-1.5">
                          <Users className="w-3 h-3" />
                          {wing.userCount || 0} Users
                        </span>
                      </td>
                      <td className="px-6 py-4 border-r border-slate-50 font-bold text-slate-400">
                        {formatDate(wing.createdAt)}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex justify-center gap-1.5 opacity-90 group-hover:opacity-100 transition-all">
                          <button 
                            onClick={() => handleOpenViewModal(wing)}
                            className="p-1.5 bg-slate-50 text-slate-500 hover:text-cyan-600 hover:bg-cyan-50 rounded-lg border border-slate-200 hover:border-cyan-200 shadow-sm transition-all"
                            title="View Wing Details"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button 
                            onClick={() => handleOpenEditModal(wing)}
                            className="p-1.5 bg-slate-50 text-slate-500 hover:text-amber-600 hover:bg-amber-50 rounded-lg border border-slate-200 hover:border-amber-200 shadow-sm transition-all"
                            title="Edit Wing"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button 
                            onClick={() => handleToggleStatus(wing)}
                            className={`p-1.5 rounded-lg border shadow-sm transition-all ${
                              wing.status 
                                ? 'bg-slate-50 text-slate-500 hover:text-purple-600 hover:bg-purple-50 border-slate-200 hover:border-purple-200' 
                                : 'bg-slate-50 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 border-slate-200 hover:border-emerald-200'
                            }`}
                            title={wing.status ? 'Deactivate Wing' : 'Activate Wing'}
                          >
                            {wing.status ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                          </button>
                          <button 
                            onClick={() => wing.id && handleDeleteWing(wing.id, wing.name)}
                            className="p-1.5 bg-slate-50 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg border border-slate-200 hover:border-rose-200 shadow-sm transition-all"
                            title="Delete Wing"
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

      {/* Floating Interactive Form Modal */}
      {showFormModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs transition-opacity duration-300">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 max-w-md w-full overflow-hidden transform transition-all duration-300 scale-100 animate-scale-up">
            
            {/* Modal Header */}
            <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-gradient-to-r from-slate-900 to-slate-800 text-white">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-white/10 rounded-lg">
                  <FolderPlus className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-black uppercase tracking-wider">
                  {editingId ? 'Edit Operations Wing' : 'Add New Operations Wing'}
                </h3>
              </div>
              <button 
                onClick={() => setShowFormModal(false)}
                className="p-1 rounded-lg hover:bg-white/10 text-slate-300 hover:text-white transition-colors focus:outline-none"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body / Form */}
            <form onSubmit={handleSaveWing}>
              <div className="p-6 space-y-4">
                
                {/* Wing Name Input */}
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400">Wing Name *</label>
                  <input 
                    type="text"
                    placeholder="E.g. CIVIL, ELECTRICAL, SALES"
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
                    <p className="text-[10px] font-bold text-rose-500 flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {formErrors.name}
                    </p>
                  )}
                </div>

                {/* Description Textarea */}
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400">Description</label>
                  <textarea 
                    rows={3}
                    placeholder="Enter division operations details, roles, or general notes..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-2.5 text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0061f2]/20 focus:bg-white transition-all resize-none"
                  />
                </div>

                {/* Status Toggle (only inside Modal form) */}
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500">Active Status</label>
                    <p className="text-[9px] text-slate-400 font-bold mt-0.5">Toggle to set division availability.</p>
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
              <div className="px-6 py-4.5 border-t border-slate-50 bg-slate-50 flex justify-end gap-2.5">
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
                  className="px-5 py-2 bg-[#0061f2] hover:bg-blue-700 text-white text-xs font-black rounded-xl transition-all shadow-md shadow-blue-100 flex items-center gap-1.5 uppercase tracking-wider"
                  disabled={saveLoading}
                >
                  {saveLoading && <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>}
                  {editingId ? 'Update Wing' : 'Create Wing'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Floating View Details Modal */}
      {showViewModal && selectedWing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs transition-opacity duration-300">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 max-w-md w-full overflow-hidden transform transition-all duration-300 scale-100 animate-scale-up">
            
            {/* Modal Header */}
            <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-indigo-900 text-white">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-white/10 rounded-lg">
                  <Eye className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-black uppercase tracking-wider">
                  Wing Deep-Dive Details
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
            <div className="p-6 space-y-5">
              
              {/* Graphic Representation */}
              <div className="flex flex-col items-center justify-center p-5 bg-gradient-to-br from-indigo-50/50 to-indigo-100/30 rounded-2xl border border-indigo-50/60 relative overflow-hidden">
                <div className="absolute -right-6 -bottom-6 text-indigo-500/5 pointer-events-none">
                  <Plane className="w-24 h-24" />
                </div>
                <div className="w-12 h-12 rounded-2xl bg-indigo-500 text-white flex items-center justify-center shadow-lg shadow-indigo-100 text-lg font-black uppercase mb-3">
                  {selectedWing.name.substring(0, 2)}
                </div>
                <h4 className="text-sm font-black text-slate-800 uppercase tracking-wider">{selectedWing.name}</h4>
                <p className="text-[10px] font-bold text-slate-400 mt-0.5">Primary Organization Wing ID: #{selectedWing.id}</p>
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 gap-4.5">
                <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-xl">
                  <span className="block text-[9px] font-black uppercase tracking-wider text-slate-400">Sector Status</span>
                  <span className={`inline-flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wide mt-1.5 ${
                    selectedWing.status ? 'text-emerald-600' : 'text-slate-500'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${selectedWing.status ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`}></span>
                    {selectedWing.status ? 'ACTIVE / ONLINE' : 'DISABLED / OFFLINE'}
                  </span>
                </div>

                <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-xl">
                  <span className="block text-[9px] font-black uppercase tracking-wider text-slate-400">Total Users</span>
                  <span className="text-[10px] font-black text-slate-700 flex items-center gap-1.5 mt-1.5">
                    <Users className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
                    {selectedWing.userCount} Active Users
                  </span>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1">
                <span className="block text-[9px] font-black uppercase tracking-wider text-slate-400">Operations Scope</span>
                <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl text-xs font-semibold text-slate-600 leading-relaxed min-h-[60px]">
                  {selectedWing.description || <span className="text-slate-300 italic text-[10px]">No Operations Scope defined for this sector.</span>}
                </div>
              </div>

              {/* Timeline */}
              <div className="flex items-center gap-2 p-3 bg-indigo-50/30 rounded-xl border border-indigo-100/40 text-[10px] font-semibold text-slate-500">
                <Calendar className="w-4 h-4 text-indigo-500" />
                <span>Sector defined at: <strong className="text-indigo-600">{formatDate(selectedWing.createdAt)}</strong></span>
              </div>
            </div>

            {/* View Details Footer */}
            <div className="px-6 py-4.5 border-t border-slate-50 bg-slate-50 flex justify-end">
              <button
                type="button"
                onClick={() => setShowViewModal(false)}
                className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-black rounded-xl transition-colors uppercase tracking-wider"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="mt-12 pt-8 border-t border-slate-200/50 flex flex-col md:flex-row justify-between items-center text-[10px] text-slate-400 font-bold tracking-[0.2em] uppercase px-4 select-none">
        <p>Copyright &copy; Digital New Enterprises 2024</p>
        <div className="flex gap-4">
          <a href="#" className="hover:underline transition-colors hover:text-slate-600">Privacy Policy</a>
          <span>•</span>
          <a href="#" className="hover:underline transition-colors hover:text-slate-600">Terms & Conditions</a>
        </div>
      </div>
    </div>
  );
}
