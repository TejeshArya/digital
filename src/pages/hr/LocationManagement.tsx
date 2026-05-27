import React, { useState, useEffect, useMemo } from 'react';
import { 
  MapPin, Plus, Search, Filter, Eye, Edit3, 
  Trash2, Calendar, RefreshCw, X, Check, 
  AlertCircle, Sparkles, Building2, Users, ArrowRight
} from 'lucide-react';

interface Location {
  id?: number;
  name: string;
  description: string;
  createdAt?: string;
}

interface Employee {
  id: number;
  name: string;
  employeeId?: string;
  email: string;
  role?: string;
  locationId?: number | null;
}

export function LocationManagement() {
  // DB States
  const [locations, setLocations] = useState<Location[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [saveLoading, setSaveLoading] = useState<boolean>(false);

  // Search & Filtering
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Modals & Panels State
  const [showFormModal, setShowFormModal] = useState<boolean>(false);
  const [showViewModal, setShowViewModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);

  // Custom Toast State
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  // Form State
  const [formData, setFormData] = useState<{ name: string; description: string }>({
    name: '',
    description: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    fetchInitialData();
  }, []);

  const triggerToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  const fetchInitialData = async () => {
    try {
      setLoading(true);
      const [locRes, empRes] = await Promise.all([
        fetch('https://dee-backend-7x0g.onrender.com/api/locations'),
        fetch('https://dee-backend-7x0g.onrender.com/api/employees')
      ]);

      if (locRes.ok) {
        const locData = await locRes.json();
        setLocations(locData);
      } else {
        triggerToast('Failed to load locations', 'error');
      }

      if (empRes.ok) {
        const empData = await empRes.json();
        setEmployees(empData);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      triggerToast('Server connection offline or unreachable', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    fetchInitialData();
    triggerToast('Database synchronized', 'info');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Location name is required';
    } else if (formData.name.trim().length < 3) {
      newErrors.name = 'Location name must be at least 3 characters';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description/Remarks are required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleOpenAddModal = () => {
    setEditingId(null);
    setFormData({ name: '', description: '' });
    setErrors({});
    setShowFormModal(true);
  };

  const handleOpenEditModal = (loc: Location) => {
    setEditingId(loc.id || null);
    setFormData({
      name: loc.name,
      description: loc.description
    });
    setErrors({});
    setShowFormModal(true);
  };

  const handleCancel = () => {
    setShowFormModal(false);
    setEditingId(null);
    setFormData({ name: '', description: '' });
    setErrors({});
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setSaveLoading(true);
      const url = editingId
        ? 'https://dee-backend-7x0g.onrender.com/api/locations/edit'
        : 'https://dee-backend-7x0g.onrender.com/api/locations';

      const body = {
        id: editingId || 0,
        name: formData.name.toUpperCase().trim(),
        description: formData.description.trim()
      };

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      if (response.ok) {
        triggerToast(
          editingId
            ? `Location "${body.name}" updated successfully`
            : `Location "${body.name}" registered successfully`,
          'success'
        );
        fetchInitialData();
        setShowFormModal(false);
        handleCancel();
      } else {
        triggerToast('Failed to save location details', 'error');
      }
    } catch (err) {
      console.error(err);
      triggerToast('Network error during save', 'error');
    } finally {
      setSaveLoading(false);
    }
  };

  const handleOpenDeleteModal = (loc: Location) => {
    setSelectedLocation(loc);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    if (!selectedLocation || !selectedLocation.id) return;

    try {
      setSaveLoading(true);
      const response = await fetch(`https://dee-backend-7x0g.onrender.com/api/locations/${selectedLocation.id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        triggerToast(`Location "${selectedLocation.name}" decommissioned successfully`, 'info');
        setLocations(prev => prev.filter(l => l.id !== selectedLocation.id));
        setShowDeleteModal(false);
        setSelectedLocation(null);
        // Refresh employees list since their location is now set to null
        fetchInitialData();
      } else {
        triggerToast('Failed to delete location', 'error');
      }
    } catch (err) {
      console.error(err);
      triggerToast('Network error during deletion', 'error');
    } finally {
      setSaveLoading(false);
    }
  };

  const handleOpenViewModal = (loc: Location) => {
    setSelectedLocation(loc);
    setShowViewModal(true);
  };

  // Searching logic
  const filteredLocations = useMemo(() => {
    return locations.filter(loc => {
      const query = searchTerm.toLowerCase();
      return (
        loc.name.toLowerCase().includes(query) ||
        loc.description.toLowerCase().includes(query) ||
        String(loc.id).includes(query)
      );
    });
  }, [locations, searchTerm]);

  // Dynamic Statistics
  const totalLocations = locations.length;
  const activeStaffLocations = useMemo(() => {
    const activeLocs = new Set(employees.filter(e => e.locationId != null).map(e => e.locationId));
    return activeLocs.size;
  }, [employees]);

  const unassignedStaff = useMemo(() => {
    return employees.filter(e => e.locationId == null).length;
  }, [employees]);

  const recentLocation = useMemo(() => {
    if (locations.length === 0) return 'N/A';
    return locations[0].name;
  }, [locations]);

  // Selected Location Employees
  const locationEmployees = useMemo(() => {
    if (!selectedLocation || !selectedLocation.id) return [];
    return employees.filter(e => e.locationId === selectedLocation.id);
  }, [selectedLocation, employees]);

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

  return (
    <div className="p-6 bg-slate-50 min-h-screen font-sans text-slate-800 relative">
      
      {/* Floating Dynamic Toasts */}
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

      {/* Modern Gradient Banner */}
      <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-gradient-to-r from-blue-600 to-indigo-700 p-6 rounded-2xl shadow-lg shadow-indigo-600/15 text-white">
        <div>
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider font-extrabold text-indigo-200 mb-1">
            <Building2 className="w-3.5 h-3.5" /> Digital Engineering Enterprises
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2.5">
            <MapPin className="w-6 h-6 text-indigo-300" /> LOCATION MANAGEMENT
          </h1>
          <p className="text-xs text-indigo-100/90 font-medium mt-0.5 max-w-2xl">
            Orchestrate corporate locations, offices, sites, and regional bases. Map active personnel to distinct operational locations dynamically.
          </p>
        </div>
        
        <div className="flex gap-2 w-full md:w-auto shrink-0">
          <button 
            onClick={handleRefresh}
            className="p-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all shadow-sm flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-white/30"
            title="Refresh database entries"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <button 
            onClick={handleOpenAddModal}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-white text-indigo-700 text-xs font-black rounded-xl shadow-lg shadow-black/5 hover:bg-indigo-50 hover:scale-[1.01] active:scale-95 transition-all uppercase tracking-wider focus:outline-none"
          >
            <Plus className="w-4 h-4" /> Add New Location
          </button>
        </div>
      </div>

      {/* Analytics Dashboard Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 text-blue-500/10 pointer-events-none group-hover:scale-110 transition-transform">
            <MapPin className="w-12 h-12" />
          </div>
          <div className="text-slate-400 text-[10px] font-black uppercase tracking-wider">Total Locations</div>
          <div className="text-2xl font-black text-slate-800 mt-1">{loading ? '...' : totalLocations}</div>
          <div className="text-[9px] text-slate-400 font-bold mt-1.5 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span> Registered centers
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 text-emerald-500/10 pointer-events-none group-hover:scale-110 transition-transform">
            <Users className="w-12 h-12" />
          </div>
          <div className="text-slate-400 text-[10px] font-black uppercase tracking-wider">Staffed Locations</div>
          <div className="text-2xl font-black text-emerald-600 mt-1">{loading ? '...' : activeStaffLocations}</div>
          <div className="text-[9px] text-slate-400 font-bold mt-1.5 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Active personnel assigned
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 text-rose-500/10 pointer-events-none group-hover:scale-110 transition-transform">
            <AlertCircle className="w-12 h-12" />
          </div>
          <div className="text-slate-400 text-[10px] font-black uppercase tracking-wider">Unassigned Staff</div>
          <div className="text-2xl font-black text-rose-500 mt-1">{loading ? '...' : unassignedStaff}</div>
          <div className="text-[9px] text-slate-400 font-bold mt-1.5 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span> Awaiting deployment
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 text-cyan-500/10 pointer-events-none group-hover:scale-110 transition-transform">
            <Sparkles className="w-12 h-12" />
          </div>
          <div className="text-slate-400 text-[10px] font-black uppercase tracking-wider">Latest Branch</div>
          <div className="text-sm font-black text-cyan-600 mt-2 truncate pr-6 uppercase tracking-tight">{loading ? '...' : recentLocation}</div>
          <div className="text-[9px] text-slate-400 font-bold mt-1.5 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500"></span> Freshly established site
          </div>
        </div>
      </div>

      {/* Main Table Area */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden mb-6">
        
        {/* Search & Stats Bar */}
        <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="relative w-full sm:max-w-xs">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input 
              type="text"
              placeholder="Search by ID, name, or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-700"
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
            <span>Showing {filteredLocations.length} of {locations.length} items</span>
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          {loading ? (
            <div className="py-24 flex flex-col items-center justify-center gap-3">
              <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest animate-pulse">Syncing location catalog...</p>
            </div>
          ) : filteredLocations.length === 0 ? (
            <div className="py-24 flex flex-col items-center justify-center gap-4 text-center">
              <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300">
                <MapPin className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-sm font-black text-slate-700 uppercase tracking-wider">No matching locations</h4>
                <p className="text-xs text-slate-400 font-bold mt-1 max-w-sm px-4">
                  No records matched your search term. Enter a new query or register a new location!
                </p>
              </div>
              <button 
                onClick={handleOpenAddModal}
                className="mt-2 flex items-center gap-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10px] font-black rounded-xl uppercase tracking-wider transition-colors focus:outline-none"
              >
                <Plus className="w-3.5 h-3.5" /> Register New Location
              </button>
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#323c4e] text-white text-[10px] uppercase tracking-wider font-extrabold">
                  <th className="px-6 py-4.5 border-r border-slate-600/30 w-24 text-center">ID</th>
                  <th className="px-6 py-4.5 border-r border-slate-600/30">Location Name</th>
                  <th className="px-6 py-4.5 border-r border-slate-600/30">Description</th>
                  <th className="px-6 py-4.5 border-r border-slate-600/30">Created Date</th>
                  <th className="px-6 py-4.5 text-center w-80">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {filteredLocations.map((loc) => {
                  const employeeCount = employees.filter(e => e.locationId === loc.id).length;
                  return (
                    <tr key={loc.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4 border-r border-slate-50 text-center font-bold text-slate-400">{loc.id}</td>
                      <td className="px-6 py-4 border-r border-slate-50 font-black text-slate-700 uppercase tracking-tight">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                            <MapPin className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <p className="font-extrabold">{loc.name}</p>
                            <p className="text-[9px] text-slate-400 font-bold tracking-tight uppercase flex items-center gap-1 mt-0.5">
                              <Users className="w-2.5 h-2.5 text-slate-400" /> {employeeCount} Stationed
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 border-r border-slate-50 font-medium text-slate-500 max-w-xs truncate" title={loc.description}>
                        {loc.description}
                      </td>
                      <td className="px-6 py-4 border-r border-slate-50 font-semibold text-slate-400">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-slate-300" />
                          {formatDate(loc.createdAt)}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center gap-2">
                          <button 
                            onClick={() => handleOpenViewModal(loc)}
                            className="flex items-center gap-1 px-3 py-1.5 border border-cyan-200 text-cyan-600 bg-cyan-50/20 hover:bg-cyan-50 rounded-xl text-[9px] font-black uppercase tracking-wider transition-all focus:outline-none"
                          >
                             <Eye className="w-3 h-3" /> View Details
                          </button>
                          <button 
                            onClick={() => handleOpenEditModal(loc)}
                            className="flex items-center gap-1 px-3 py-1.5 border border-blue-200 text-blue-600 bg-blue-50/20 hover:bg-blue-50 rounded-xl text-[9px] font-black uppercase tracking-wider transition-all focus:outline-none"
                          >
                             <Edit3 className="w-3 h-3" /> Edit Profile
                          </button>
                          <button 
                            onClick={() => handleOpenDeleteModal(loc)}
                            className="flex items-center gap-1 px-3 py-1.5 border border-red-200 text-red-600 bg-red-50/20 hover:bg-red-50 rounded-xl text-[9px] font-black uppercase tracking-wider transition-all focus:outline-none"
                          >
                             <Trash2 className="w-3 h-3" /> Delete
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

      {/* Modals Backdrops & Layouts */}

      {/* Form Modal (Add / Edit) */}
      {showFormModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 max-w-md w-full overflow-hidden transform scale-100 transition-all duration-300 animate-scale-up">
            
            {/* Modal Header */}
            <div className="px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex justify-between items-center">
              <div>
                <h3 className="text-sm font-black uppercase tracking-wider flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-indigo-200" />
                  {editingId ? 'Edit Location Details' : 'Register New Location'}
                </h3>
                <p className="text-[10px] text-indigo-100 mt-0.5">
                  {editingId ? 'Modify profile tags, descriptions, and site records.' : 'Define unique location profile keys and operational notes.'}
                </p>
              </div>
              <button 
                onClick={handleCancel}
                className="p-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors focus:outline-none"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSave} className="p-6 space-y-4">
              
              {/* Location Name Field */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Location Name *</label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input 
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g. BANGALORE, HYDERABAD"
                    className={`w-full pl-9 pr-4 py-2 text-xs font-semibold bg-slate-50 border rounded-xl focus:outline-none focus:ring-2 transition-all uppercase tracking-wide text-slate-700 ${
                      errors.name 
                        ? 'border-rose-400 focus:ring-rose-500/20 focus:border-rose-400' 
                        : 'border-slate-200 focus:ring-blue-500/20 focus:border-blue-500'
                    }`}
                  />
                </div>
                {errors.name && (
                  <p className="text-[10px] text-rose-500 font-extrabold flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.name}
                  </p>
                )}
              </div>

              {/* Description Field */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Description / Remarks *</label>
                <textarea 
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="Provide reference logs, regional details, or office coordinates..."
                  className={`w-full px-4 py-2.5 text-xs font-semibold bg-slate-50 border rounded-xl focus:outline-none focus:ring-2 transition-all text-slate-700 ${
                    errors.description 
                      ? 'border-rose-400 focus:ring-rose-500/20 focus:border-rose-400' 
                      : 'border-slate-200 focus:ring-blue-500/20 focus:border-blue-500'
                  }`}
                />
                {errors.description && (
                  <p className="text-[10px] text-rose-500 font-extrabold flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.description}
                  </p>
                )}
              </div>

              {/* Form Actions */}
              <div className="flex gap-2 pt-2 border-t border-slate-100">
                <button 
                  type="button"
                  onClick={handleCancel}
                  className="flex-1 px-4 py-2.5 border border-slate-200 text-slate-500 text-[10px] font-black uppercase tracking-wider rounded-xl hover:bg-slate-50 active:scale-95 transition-all focus:outline-none"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={saveLoading}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-black uppercase tracking-wider rounded-xl shadow-md active:scale-95 disabled:opacity-50 transition-all focus:outline-none"
                >
                  {saveLoading ? (
                    <>
                      <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Saving...</span>
                    </>
                  ) : (
                    <span>Confirm Save</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Details Drawer/Modal */}
      {showViewModal && selectedLocation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 max-w-lg w-full overflow-hidden transform scale-100 transition-all duration-300 animate-scale-up">
            
            {/* Modal Header */}
            <div className="px-6 py-4 bg-slate-800 text-white flex justify-between items-center">
              <div>
                <span className="px-2 py-0.5 bg-blue-500 text-[8px] font-black uppercase tracking-widest rounded">Center Profile</span>
                <h3 className="text-sm font-black uppercase tracking-wider flex items-center gap-2 mt-1">
                  <MapPin className="w-4 h-4 text-blue-400" />
                  {selectedLocation.name} Details
                </h3>
              </div>
              <button 
                onClick={() => { setShowViewModal(false); setSelectedLocation(null); }}
                className="p-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors focus:outline-none"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content Body */}
            <div className="p-6 space-y-6">
              
              {/* Meta Stats Panel */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Database ID</p>
                  <p className="text-lg font-black text-slate-700 mt-0.5">{selectedLocation.id}</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Created Date</p>
                  <p className="text-xs font-extrabold text-slate-600 mt-1.5 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    {formatDate(selectedLocation.createdAt)}
                  </p>
                </div>
              </div>

              {/* Description Logs */}
              <div className="space-y-1.5 bg-blue-50/20 p-4 rounded-xl border border-blue-50/50">
                <p className="text-[9px] font-black text-blue-500 uppercase tracking-widest block">Description & Scope</p>
                <p className="text-xs font-semibold text-slate-600 leading-relaxed mt-1">
                  {selectedLocation.description}
                </p>
              </div>

              {/* Assigned Staff Directory */}
              <div className="space-y-3">
                <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-slate-400" /> 
                    Stationed Personnel Directory
                  </h4>
                  <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[9px] font-black rounded-lg">
                    {locationEmployees.length} Total
                  </span>
                </div>

                <div className="max-h-40 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
                  {locationEmployees.length === 0 ? (
                    <div className="py-6 text-center text-slate-400 font-bold text-[10px] uppercase tracking-wider bg-slate-50 rounded-xl border border-dashed border-slate-200">
                      No active staff stationed at this location
                    </div>
                  ) : (
                    locationEmployees.map(emp => (
                      <div key={emp.id} className="p-3 bg-white border border-slate-100 rounded-xl shadow-sm hover:border-blue-100 transition-colors flex justify-between items-center">
                        <div>
                          <p className="text-xs font-extrabold text-slate-700">{emp.name}</p>
                          <p className="text-[9px] text-slate-400 font-bold uppercase tracking-tight mt-0.5 flex items-center gap-1">
                            <span className="px-1.5 py-0.5 bg-slate-100 rounded text-slate-500 text-[8px] font-black">{emp.employeeId || 'STAFF'}</span> • {emp.role || 'No Assigned Role'}
                          </p>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="text-[9px] text-slate-400 font-extrabold">{emp.email}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Actions Footer */}
              <div className="pt-2 border-t border-slate-100 flex justify-end">
                <button 
                  onClick={() => { setShowViewModal(false); setSelectedLocation(null); }}
                  className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10px] font-black uppercase tracking-wider rounded-xl active:scale-95 transition-all focus:outline-none"
                >
                  Close Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedLocation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 max-w-sm w-full overflow-hidden transform scale-100 transition-all duration-300 animate-scale-up">
            
            {/* Modal Header Icon */}
            <div className="p-6 flex flex-col items-center text-center space-y-4">
              <div className="w-14 h-14 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center shadow-inner">
                <AlertCircle className="w-7 h-7 animate-pulse" />
              </div>
              
              <div>
                <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">Confirm Location Decommission</h3>
                <p className="text-xs text-slate-400 font-bold mt-1.5 px-2">
                  Are you absolutely sure you want to delete the location <span className="text-rose-600 font-black">"{selectedLocation.name}"</span>?
                </p>
              </div>

              <div className="bg-rose-50 border border-rose-100 p-3.5 rounded-xl text-left w-full space-y-1">
                <p className="text-[9px] font-black text-rose-600 uppercase tracking-widest flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5" /> High Risk Operation
                </p>
                <p className="text-[10px] font-bold text-rose-600/90 leading-relaxed">
                  Decommissioning this location will decouple and unassign all stationed employees currently mapped to it. This change is permanent.
                </p>
              </div>

              {/* Modal Actions */}
              <div className="flex gap-2 w-full pt-2">
                <button 
                  onClick={() => { setShowDeleteModal(false); setSelectedLocation(null); }}
                  className="flex-1 px-4 py-2.5 border border-slate-200 text-slate-500 text-[10px] font-black uppercase tracking-wider rounded-xl hover:bg-slate-50 active:scale-95 transition-all focus:outline-none"
                >
                  No, Keep it
                </button>
                <button 
                  onClick={handleDelete}
                  disabled={saveLoading}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-[10px] font-black uppercase tracking-wider rounded-xl shadow-md shadow-rose-600/10 active:scale-95 disabled:opacity-50 transition-all focus:outline-none"
                >
                  {saveLoading ? (
                    <>
                      <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Decommissioning...</span>
                    </>
                  ) : (
                    <span>Decommission</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sleek Footer */}
      <div className="mt-12 pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center text-[10px] text-slate-400 font-bold tracking-[0.2em] uppercase px-4 gap-4">
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
