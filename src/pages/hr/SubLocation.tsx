import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  MapPin, Plus, Search, Filter, Edit3, 
  Trash2, Save, List, X, Check, AlertCircle, 
  Sparkles, RefreshCw, Layers, Map, Calendar, Info
} from 'lucide-react';

interface Location {
  id: number;
  name: string;
  description: string;
}

interface SubLocation {
  id?: number;
  locationId: number;
  location?: Location;
  name: string;
  description: string;
  createdAt?: string;
}

export function SubLocation() {
  // DB States
  const [subLocations, setSubLocations] = useState<SubLocation[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  
  // App UX States
  const [loading, setLoading] = useState<boolean>(true);
  const [saveLoading, setSaveLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Editing state
  const [editingId, setEditingId] = useState<number | null>(null);

  // Custom Toast state
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  // Delete modal state
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [selectedSubLocation, setSelectedSubLocation] = useState<SubLocation | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    locationId: '',
    name: '',
    description: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Reference for scrolling to form card during Edit
  const formRef = useRef<HTMLDivElement>(null);

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
      const [subLocRes, locRes] = await Promise.all([
        fetch('http://localhost:5076/api/sublocations'),
        fetch('http://localhost:5076/api/locations')
      ]);

      if (subLocRes.ok) {
        const subLocData = await subLocRes.json();
        setSubLocations(subLocData);
      } else {
        triggerToast('Failed to load sub-locations catalog', 'error');
      }

      if (locRes.ok) {
        const locData = await locRes.json();
        setLocations(locData);
      } else {
        triggerToast('Failed to load locations dropdown options', 'error');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      triggerToast('Database server offline or unreachable', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    fetchInitialData();
    triggerToast('Database synchronized', 'info');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.locationId) {
      newErrors.locationId = 'Select a parent location';
    }
    if (!formData.name.trim()) {
      newErrors.name = 'Sub-location name is required';
    } else if (formData.name.trim().length < 3) {
      newErrors.name = 'Must be at least 3 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setSaveLoading(true);
      const url = editingId
        ? 'http://localhost:5076/api/sublocations/edit'
        : 'http://localhost:5076/api/sublocations';

      const body = {
        id: editingId || 0,
        locationId: parseInt(formData.locationId),
        name: formData.name.toUpperCase().trim(),
        description: formData.description.trim() || 'N/A'
      };

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      if (response.ok) {
        triggerToast(
          editingId
            ? `Sub-location "${body.name}" updated successfully`
            : `Sub-location "${body.name}" registered successfully`,
          'success'
        );
        fetchInitialData();
        handleCancel();
      } else {
        triggerToast('Failed to save sub-location details', 'error');
      }
    } catch (err) {
      console.error(err);
      triggerToast('Network error during save', 'error');
    } finally {
      setSaveLoading(false);
    }
  };

  const handleEdit = (sub: SubLocation) => {
    setEditingId(sub.id || null);
    setFormData({
      locationId: String(sub.locationId),
      name: sub.name,
      description: sub.description === 'N/A' ? '' : sub.description
    });
    setErrors({});
    
    // Smooth scroll to the form card
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({ locationId: '', name: '', description: '' });
    setErrors({});
  };

  const handleOpenDeleteModal = (sub: SubLocation) => {
    setSelectedSubLocation(sub);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    if (!selectedSubLocation || !selectedSubLocation.id) return;

    try {
      setSaveLoading(true);
      const response = await fetch(`http://localhost:5076/api/sublocations/${selectedSubLocation.id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        triggerToast(`Sub-location "${selectedSubLocation.name}" decommissioned successfully`, 'info');
        setSubLocations(prev => prev.filter(s => s.id !== selectedSubLocation.id));
        setShowDeleteModal(false);
        setSelectedSubLocation(null);
      } else {
        triggerToast('Failed to decommission sub-location', 'error');
      }
    } catch (err) {
      console.error(err);
      triggerToast('Connection timed out during deletion', 'error');
    } finally {
      setSaveLoading(false);
    }
  };

  // Searching logic
  const filteredSubLocations = useMemo(() => {
    return subLocations.filter(sub => {
      const query = searchTerm.toLowerCase();
      const parentName = sub.location?.name || '';
      return (
        parentName.toLowerCase().includes(query) ||
        sub.name.toLowerCase().includes(query) ||
        sub.description.toLowerCase().includes(query)
      );
    });
  }, [subLocations, searchTerm]);

  // Analytics Metrics
  const totalSubLocations = subLocations.length;
  const uniqueParentLocationsCount = new Set(subLocations.map(s => s.locationId)).size;
  const recentSubLocationName = useMemo(() => {
    if (subLocations.length === 0) return 'N/A';
    return subLocations[0].name;
  }, [subLocations]);

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return 'N/A';
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr;
      
      const pad = (n: number) => n.toString().padStart(2, '0');
      const day = pad(d.getDate());
      const month = pad(d.getMonth() + 1);
      const year = d.getFullYear();
      return `${day}-${month}-${year}`;
    } catch (e) {
      return dateStr;
    }
  };

  return (
    <div className="p-6 bg-slate-50 min-h-screen font-sans text-slate-800 relative">
      
      {/* Floating Alerts Custom Toasts */}
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

      {/* Sleek Gradient Header Card */}
      <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-gradient-to-r from-blue-600 to-indigo-700 p-6 rounded-2xl shadow-lg shadow-indigo-600/15 text-white animate-fade-in">
        <div>
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider font-extrabold text-indigo-200 mb-1">
            <Layers className="w-3.5 h-3.5" /> DEE Structural Master Catalog
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2.5">
            <MapPin className="w-6 h-6 text-indigo-300" /> SUB LOCATION MANAGEMENT
          </h1>
          <p className="text-xs text-indigo-100/90 font-medium mt-0.5 max-w-2xl">
            Map structural points, gates, office buildings, warehouses, and sub-divisions under main parent regional bases with unified catalog tracking.
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
        </div>
      </div>

      {/* Analytics Counter Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 text-blue-500/10 pointer-events-none group-hover:scale-110 transition-transform">
            <Layers className="w-12 h-12" />
          </div>
          <div className="text-slate-400 text-[10px] font-black uppercase tracking-wider">Total Sub Locations</div>
          <div className="text-2xl font-black text-slate-800 mt-1">{loading ? '...' : totalSubLocations}</div>
          <div className="text-[9px] text-slate-400 font-bold mt-1.5 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span> Partitioned sectors
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 text-emerald-500/10 pointer-events-none group-hover:scale-110 transition-transform">
            <Map className="w-12 h-12" />
          </div>
          <div className="text-slate-400 text-[10px] font-black uppercase tracking-wider">Mapped Parents</div>
          <div className="text-2xl font-black text-emerald-600 mt-1">{loading ? '...' : uniqueParentLocationsCount}</div>
          <div className="text-[9px] text-slate-400 font-bold mt-1.5 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Active primary centers
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 text-cyan-500/10 pointer-events-none group-hover:scale-110 transition-transform">
            <Sparkles className="w-12 h-12" />
          </div>
          <div className="text-slate-400 text-[10px] font-black uppercase tracking-wider">Recent Addition</div>
          <div className="text-sm font-black text-cyan-600 mt-2 truncate pr-6 uppercase tracking-tight">{loading ? '...' : recentSubLocationName}</div>
          <div className="text-[9px] text-slate-400 font-bold mt-1.5 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500"></span> Newly established site partition
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Unified Form Card */}
        <div ref={formRef} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden transition-all duration-300">
          <div className="bg-slate-50/50 px-6 py-4 border-b border-slate-100 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Plus className="w-4 h-4 text-blue-600" />
              <h2 className="text-[12px] font-black text-slate-700 uppercase tracking-widest">
                {editingId ? 'Edit Sub Location' : 'Add New Sub Location'}
              </h2>
            </div>
            {editingId && (
              <button 
                onClick={handleCancel}
                className="flex items-center gap-1 px-2.5 py-1 bg-rose-50 border border-rose-100 hover:bg-rose-100 text-rose-600 rounded-lg text-[9px] font-black uppercase tracking-wider transition-all"
              >
                <X className="w-3 h-3" /> Cancel Edit
              </button>
            )}
          </div>
          
          <form onSubmit={handleSave} className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-end">
              
              {/* Select Location Dropdown */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  Select Location <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <select 
                    name="locationId"
                    value={formData.locationId}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2.5 bg-slate-50 border rounded-xl text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:bg-white transition-all appearance-none cursor-pointer ${
                      errors.locationId 
                        ? 'border-rose-400 focus:ring-rose-500/20 focus:border-rose-400' 
                        : 'border-slate-200 focus:ring-blue-500/20 focus:border-blue-500'
                    }`}
                  >
                    <option value="">Select Location</option>
                    {locations.map(loc => (
                      <option key={loc.id} value={loc.id}>
                        {loc.name}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                    <Filter className="w-3.5 h-3.5" />
                  </div>
                </div>
                {errors.locationId && (
                  <p className="text-[9px] text-rose-500 font-extrabold flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.locationId}
                  </p>
                )}
              </div>

              {/* Sub Location Name */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  Sub Location Name <span className="text-rose-500">*</span>
                </label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter sub location name"
                  className={`w-full px-4 py-2.5 bg-slate-50 border rounded-xl text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:bg-white transition-all uppercase tracking-wide ${
                    errors.name 
                      ? 'border-rose-400 focus:ring-rose-500/20 focus:border-rose-400' 
                      : 'border-slate-200 focus:ring-blue-500/20 focus:border-blue-500'
                  }`}
                />
                {errors.name && (
                  <p className="text-[9px] text-rose-500 font-extrabold flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.name}
                  </p>
                )}
              </div>

              {/* Description Fields */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  Description
                </label>
                <input 
                  type="text" 
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Enter description"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all text-slate-700"
                />
              </div>

            </div>
            
            <div className="mt-5 pt-4 border-t border-slate-100 flex justify-end gap-2">
              {editingId && (
                <button 
                  type="button"
                  onClick={handleCancel}
                  className="px-5 py-2.5 border border-slate-200 text-slate-500 text-[10px] font-black uppercase tracking-wider rounded-xl hover:bg-slate-50 transition-all focus:outline-none"
                >
                  Cancel
                </button>
              )}
              <button 
                type="submit"
                disabled={saveLoading}
                className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-black rounded-xl shadow-md uppercase tracking-widest disabled:opacity-50 transition-all focus:outline-none"
              >
                {saveLoading ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-3.5 h-3.5" /> 
                    {editingId ? 'Save Changes' : 'Add Sub Location'}
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Sub Locations List Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          
          <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <List className="w-4 h-4 text-blue-600" />
              <h2 className="text-[12px] font-black text-slate-700 uppercase tracking-widest">Sub Locations List</h2>
            </div>
            
            <div className="relative w-full sm:max-w-xs shrink-0">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input 
                type="text"
                placeholder="Search by parent, name, or description..."
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
          </div>

          <div className="overflow-x-auto min-h-[300px]">
            {loading ? (
              <div className="py-24 flex flex-col items-center justify-center gap-3">
                <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest animate-pulse">Syncing sub-location catalog...</p>
              </div>
            ) : filteredSubLocations.length === 0 ? (
              <div className="py-24 flex flex-col items-center justify-center gap-4 text-center">
                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300">
                  <MapPin className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="text-sm font-black text-slate-700 uppercase tracking-wider">No matching sub-locations</h4>
                  <p className="text-xs text-slate-400 font-bold mt-1 max-w-sm px-4">
                    There are no partitioned locations matching your search filter. Create one above to start mapping structural segments!
                  </p>
                </div>
              </div>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#323c4e] text-white text-[10px] uppercase tracking-wider font-extrabold">
                    <th className="px-8 py-4.5 border-r border-slate-600/30">Location</th>
                    <th className="px-8 py-4.5 border-r border-slate-600/30">Sub Location Name</th>
                    <th className="px-8 py-4.5 border-r border-slate-600/30">Description</th>
                    <th className="px-8 py-4.5 border-r border-slate-600/30">Created Date</th>
                    <th className="px-8 py-4.5 text-center w-60">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {filteredSubLocations.map((sub) => (
                    <tr key={sub.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-8 py-4 border-r border-slate-50 font-black text-slate-700 uppercase tracking-tight flex items-center gap-2">
                        <div className="w-6.5 h-6.5 rounded bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                          <MapPin className="w-3.5 h-3.5" />
                        </div>
                        {sub.location?.name || 'UNKNOWN LOCATION'}
                      </td>
                      <td className="px-8 py-4 border-r border-slate-50 font-extrabold text-slate-600 uppercase tracking-tight">{sub.name}</td>
                      <td className="px-8 py-4 border-r border-slate-50 font-semibold text-slate-400 uppercase tracking-tighter">{sub.description}</td>
                      <td className="px-8 py-4 border-r border-slate-50 font-bold text-slate-400">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-slate-300" />
                          {formatDate(sub.createdAt)}
                        </div>
                      </td>
                      <td className="px-8 py-4">
                        <div className="flex justify-center gap-2">
                          <button 
                            onClick={() => handleEdit(sub)}
                            className="flex items-center gap-1 px-3 py-1.5 border border-blue-200 text-blue-600 bg-blue-50/20 hover:bg-blue-50 rounded-xl text-[9px] font-black uppercase tracking-wider transition-all focus:outline-none"
                          >
                             <Edit3 className="w-3.5 h-3.5" /> Edit
                          </button>
                          <button 
                            onClick={() => handleOpenDeleteModal(sub)}
                            className="flex items-center gap-1 px-3 py-1.5 border border-red-200 text-red-600 bg-red-50/20 hover:bg-red-50 rounded-xl text-[9px] font-black uppercase tracking-wider transition-all focus:outline-none"
                          >
                             <Trash2 className="w-3.5 h-3.5" /> Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedSubLocation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 max-w-sm w-full overflow-hidden transform scale-100 transition-all duration-300 animate-scale-up">
            
            {/* Modal Header Icon */}
            <div className="p-6 flex flex-col items-center text-center space-y-4">
              <div className="w-14 h-14 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center shadow-inner">
                <AlertCircle className="w-7 h-7 animate-pulse" />
              </div>
              
              <div>
                <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">Confirm Decommission</h3>
                <p className="text-xs text-slate-400 font-bold mt-1.5 px-2">
                  Are you absolutely sure you want to delete the sub-location <span className="text-rose-600 font-black">"{selectedSubLocation.name}"</span>?
                </p>
              </div>

              {/* Modal Actions */}
              <div className="flex gap-2 w-full pt-2">
                <button 
                  onClick={() => { setShowDeleteModal(false); setSelectedSubLocation(null); }}
                  className="flex-1 px-4 py-2.5 border border-slate-200 text-slate-500 text-[10px] font-black uppercase tracking-wider rounded-xl hover:bg-slate-50 active:scale-95 transition-all focus:outline-none"
                >
                  No, Keep it
                </button>
                <button 
                  onClick={handleDelete}
                  disabled={saveLoading}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-[10px] font-black uppercase tracking-wider rounded-xl shadow-md active:scale-95 disabled:opacity-50 transition-all focus:outline-none"
                >
                  {saveLoading ? (
                    <>
                      <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Deleting...</span>
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

      {/* Premium Footer */}
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
