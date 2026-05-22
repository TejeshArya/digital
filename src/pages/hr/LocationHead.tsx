import React, { useState, useEffect, useMemo } from 'react';
import { 
  MapPin, Plus, Search, Filter, Edit3, 
  Trash2, Save, FileText, Map, List,
  ArrowLeft, Info, UserCheck, ShieldCheck,
  Calendar, Users, RefreshCw, CheckCircle, AlertCircle
} from 'lucide-react';

interface Location {
  id: number;
  name: string;
  description: string;
}

interface Employee {
  id: number;
  employeeId?: string;
  name: string;
  email: string;
  status: string;
}

interface LocationHeadAssignment {
  id: number;
  locationId: number;
  location?: Location;
  employeeId: number;
  employee?: Employee;
  assignedAt: string;
}

export function LocationHead() {
  // DB States
  const [assignments, setAssignments] = useState<LocationHeadAssignment[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);

  // UX States
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Form State
  const [selectedLocationId, setSelectedLocationId] = useState<string>('');
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string>('');
  const [formError, setFormError] = useState<string>('');

  // Toast State
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

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
      const [headsRes, locRes, empRes] = await Promise.all([
        fetch('http://localhost:5076/api/locationheads'),
        fetch('http://localhost:5076/api/locations'),
        fetch('http://localhost:5076/api/employees')
      ]);

      if (headsRes.ok) {
        const headsData = await headsRes.json();
        setAssignments(headsData);
      } else {
        triggerToast('Failed to load current location heads list', 'error');
      }

      if (locRes.ok) {
        const locData = await locRes.json();
        setLocations(locData);
      } else {
        triggerToast('Failed to load locations listing', 'error');
      }

      if (empRes.ok) {
        const empData = await empRes.json();
        // Only load Active or approved employees
        const activeEmps = empData.filter((e: Employee) => e.status.toLowerCase() === 'active');
        setEmployees(activeEmps);
      } else {
        triggerToast('Failed to load active employee directory', 'error');
      }
    } catch (err) {
      console.error('Fetch error:', err);
      triggerToast('Database server is offline or unreachable', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleAssign = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!selectedLocationId) {
      setFormError('Please select a valid location');
      return;
    }
    if (!selectedEmployeeId) {
      setFormError('Please select an employee');
      return;
    }

    try {
      setSaving(true);
      const body = {
        locationId: parseInt(selectedLocationId),
        employeeId: parseInt(selectedEmployeeId)
      };

      const res = await fetch('http://localhost:5076/api/locationheads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      if (res.ok) {
        const updatedOrNew = await res.json();
        
        // Find if this is an upsert update
        const updatedName = updatedOrNew.employee?.name || 'Employee';
        const updatedLoc = updatedOrNew.location?.name || 'Location';

        triggerToast(`Successfully assigned ${updatedName} as Location Head for ${updatedLoc}`, 'success');
        
        // Reset form selections
        setSelectedLocationId('');
        setSelectedEmployeeId('');
        
        // Refresh catalog
        await fetchInitialData();
      } else {
        const errText = await res.text();
        triggerToast(errText || 'Failed to complete assignment request', 'error');
      }
    } catch (err) {
      console.error(err);
      triggerToast('Network error while saving assignment', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number, locationName: string) => {
    if (!window.confirm(`Are you sure you want to unassign the location head for ${locationName}?`)) {
      return;
    }

    try {
      setDeletingId(id);
      const res = await fetch(`http://localhost:5076/api/locationheads/${id}`, {
        method: 'DELETE'
      });

      if (res.ok) {
        triggerToast(`Head assignment for ${locationName} removed successfully`, 'info');
        setAssignments(prev => prev.filter(item => item.id !== id));
      } else {
        triggerToast('Failed to delete head assignment', 'error');
      }
    } catch (err) {
      console.error(err);
      triggerToast('Network error during deletion', 'error');
    } finally {
      setDeletingId(null);
    }
  };

  // Helper date formatter
  const formatDate = (dateStr: string) => {
    if (!dateStr) return 'N/A';
    try {
      const d = new Date(dateStr);
      return d.toLocaleString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }).replace(',', '');
    } catch (e) {
      return dateStr;
    }
  };

  // Dynamic search & filters
  const filteredAssignments = useMemo(() => {
    return assignments.filter(item => {
      const locationMatch = item.location?.name?.toLowerCase().includes(searchTerm.toLowerCase()) || false;
      const employeeMatch = item.employee?.name?.toLowerCase().includes(searchTerm.toLowerCase()) || false;
      const codeMatch = item.employee?.employeeId?.toLowerCase().includes(searchTerm.toLowerCase()) || false;
      return locationMatch || employeeMatch || codeMatch;
    });
  }, [assignments, searchTerm]);

  // Dynamic KPIs calculations
  const stats = useMemo(() => {
    const total = assignments.length;
    const uniqueEmployees = new Set(assignments.map(a => a.employeeId)).size;
    const allLocationCount = locations.length;
    const unassignedCount = Math.max(0, allLocationCount - assignments.map(a => a.locationId).length);

    return {
      total,
      uniqueEmployees,
      unassignedCount
    };
  }, [assignments, locations]);

  return (
    <div className="p-4 bg-[#f8f9fc] min-h-screen font-sans">
      {/* Floating Status Toast */}
      {toast && (
        <div className={`fixed top-5 right-5 z-50 flex items-center gap-3 px-6 py-4 rounded-xl shadow-2xl transition-all duration-300 border animate-bounce ${
          toast.type === 'success' ? 'bg-emerald-50 border-emerald-100 text-emerald-800' :
          toast.type === 'error' ? 'bg-rose-50 border-rose-100 text-rose-800' :
          'bg-blue-50 border-blue-100 text-blue-800'
        }`}>
          {toast.type === 'success' && <CheckCircle className="w-5 h-5 text-emerald-600 animate-pulse" />}
          {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-rose-600 animate-pulse" />}
          {toast.type === 'info' && <Info className="w-5 h-5 text-blue-600 animate-pulse" />}
          <span className="text-[12px] font-black uppercase tracking-wider">{toast.message}</span>
        </div>
      )}

      {/* Top Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-gray-700 font-black text-xl uppercase tracking-widest flex items-center gap-2">
            <MapPin className="w-5 h-5 text-blue-600 animate-pulse" /> Assign Location Head
          </h1>
          <p className="text-[11px] text-gray-400 font-bold uppercase tracking-tight mt-1">
            Assign location head for each location (One head per location)
          </p>
        </div>
        <button 
          onClick={fetchInitialData}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 border border-gray-200 hover:border-blue-400 text-gray-500 hover:text-blue-600 rounded-lg text-[10px] font-black uppercase tracking-widest bg-white shadow-sm transition-all"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} /> Sync Database
        </button>
      </div>

      <div className="max-w-5xl mx-auto space-y-6">
        {/* Modern KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center gap-4 hover:scale-[1.02] transition-transform">
            <div className="p-3.5 rounded-lg bg-blue-50 text-blue-600">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Total Assigned Heads</p>
              <h3 className="text-2xl font-black text-gray-700 mt-1">{loading ? '...' : stats.total}</h3>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center gap-4 hover:scale-[1.02] transition-transform">
            <div className="p-3.5 rounded-lg bg-emerald-50 text-emerald-600">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Unique Officers</p>
              <h3 className="text-2xl font-black text-gray-700 mt-1">{loading ? '...' : stats.uniqueEmployees}</h3>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center gap-4 hover:scale-[1.02] transition-transform">
            <div className="p-3.5 rounded-lg bg-amber-50 text-amber-600">
              <Map className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Unassigned Locations</p>
              <h3 className="text-2xl font-black text-gray-700 mt-1">{loading ? '...' : stats.unassignedCount}</h3>
            </div>
          </div>
        </div>

        {/* Assign Form Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-blue-50/30 px-6 py-4 border-b border-gray-100 flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-blue-600" />
            <h2 className="text-[12px] font-black text-blue-700 uppercase tracking-widest">Assign Location Head</h2>
          </div>
          <form onSubmit={handleAssign} className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
              {/* Select Location */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  Select Location <span className="text-rose-500">*</span>
                </label>
                <select 
                  value={selectedLocationId}
                  onChange={(e) => {
                    setSelectedLocationId(e.target.value);
                    setFormError('');
                  }}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-[13px] font-bold text-gray-700 focus:outline-none focus:border-blue-400 transition-all appearance-none cursor-pointer"
                >
                  <option value="">Select Location</option>
                  {locations.map(loc => (
                    <option key={loc.id} value={loc.id}>
                      {loc.name.toUpperCase()} {assignments.some(a => a.locationId === loc.id) ? ' (Already Has Head - Will Update)' : ''}
                    </option>
                  ))}
                </select>
              </div>

              {/* Select Employee */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  Select Employee <span className="text-rose-500">*</span>
                </label>
                {selectedLocationId ? (
                  <select 
                    value={selectedEmployeeId}
                    onChange={(e) => {
                      setSelectedEmployeeId(e.target.value);
                      setFormError('');
                    }}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-[13px] font-bold text-gray-700 focus:outline-none focus:border-blue-400 transition-all appearance-none cursor-pointer"
                  >
                    <option value="">Select Employee</option>
                    {employees.map(emp => (
                      <option key={emp.id} value={emp.id}>
                        {emp.name.toUpperCase()} ({emp.employeeId || 'No ID'})
                      </option>
                    ))}
                  </select>
                ) : (
                  <select 
                    disabled 
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-[13px] font-bold text-gray-400 focus:outline-none transition-all cursor-not-allowed"
                  >
                    <option>Select Location First</option>
                  </select>
                )}
              </div>
            </div>

            {formError && (
              <div className="mt-4 p-3 bg-rose-50 border border-rose-100 text-rose-700 text-[11px] font-bold rounded-lg flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-500" />
                <span>{formError}</span>
              </div>
            )}

            <div className="mt-6 flex justify-end">
              <button 
                type="submit"
                disabled={saving || !selectedLocationId || !selectedEmployeeId}
                className="flex items-center gap-2 px-10 py-3 bg-[#0061f2] text-white text-[11px] font-black rounded-lg shadow-lg shadow-blue-100 uppercase tracking-widest hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                <span>Assign</span>
              </button>
            </div>
          </form>
        </div>

        {/* Current Heads List Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden min-h-[400px]">
          <div className="bg-gray-50/50 px-6 py-4 border-b border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-2">
              <List className="w-4 h-4 text-blue-600" />
              <h2 className="text-[12px] font-black text-gray-700 uppercase tracking-widest">Current Location Heads</h2>
            </div>
            
            {/* Live Search */}
            <div className="relative w-full md:w-72">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <Search className="w-3.5 h-3.5" />
              </span>
              <input 
                type="text"
                placeholder="Search location, name, or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-[11px] font-bold text-gray-700 bg-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-all"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-[11px] border-collapse">
              <thead>
                <tr className="bg-gray-50/50 text-gray-400 uppercase tracking-widest border-b border-gray-100">
                  <th className="px-8 py-5 text-left font-black border-r border-gray-100">Location</th>
                  <th className="px-8 py-5 text-left font-black border-r border-gray-100">Employee Name</th>
                  <th className="px-8 py-5 text-left font-black border-r border-gray-100">Employee ID</th>
                  <th className="px-8 py-5 text-left font-black border-r border-gray-100">Assigned On</th>
                  <th className="px-8 py-5 text-center font-black">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {loading ? (
                  // Elegant skeletons loaders
                  [...Array(5)].map((_, index) => (
                    <tr key={index} className="animate-pulse">
                      <td className="px-8 py-5 border-r border-gray-50"><div className="h-3.5 bg-gray-100 rounded w-24"></div></td>
                      <td className="px-8 py-5 border-r border-gray-50"><div className="h-3.5 bg-gray-100 rounded w-32"></div></td>
                      <td className="px-8 py-5 border-r border-gray-50"><div className="h-3 bg-gray-100 rounded w-20"></div></td>
                      <td className="px-8 py-5 border-r border-gray-50"><div className="h-3 bg-gray-100 rounded w-28 flex items-center gap-2"></div></td>
                      <td className="px-8 py-5 text-center"><div className="h-7 bg-gray-100 rounded w-16 mx-auto"></div></td>
                    </tr>
                  ))
                ) : filteredAssignments.length > 0 ? (
                  filteredAssignments.map((head) => (
                    <tr key={head.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-8 py-5 border-r border-gray-50 font-black text-gray-700 uppercase tracking-tight">
                        {head.location?.name || 'N/A'}
                      </td>
                      <td className="px-8 py-5 border-r border-gray-50 font-black text-gray-600 uppercase tracking-tight">
                        {head.employee?.name || 'N/A'}
                      </td>
                      <td className="px-8 py-5 border-r border-gray-50 font-bold text-gray-400">
                        {head.employee?.employeeId || 'N/A'}
                      </td>
                      <td className="px-8 py-5 border-r border-gray-50 font-bold text-gray-400 uppercase tracking-tighter">
                         <div className="flex items-center gap-2">
                            <Calendar className="w-3.5 h-3.5 opacity-30" /> 
                            {formatDate(head.assignedAt)}
                         </div>
                      </td>
                      <td className="px-8 py-5 text-center">
                        <button
                          onClick={() => handleDelete(head.id, head.location?.name || 'Location')}
                          disabled={deletingId === head.id}
                          className="p-2 border border-gray-100 text-rose-500 hover:text-white hover:bg-rose-500 hover:border-rose-500 rounded-lg shadow-sm transition-all duration-200 inline-flex items-center justify-center gap-1.5"
                          title="Remove Head Assignment"
                        >
                          {deletingId === head.id ? (
                            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          ) : (
                            <Trash2 className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-8 py-12 text-center text-gray-400 font-bold uppercase tracking-widest">
                      <Info className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                      No Location Heads Seeded or Found
                    </td>
                  </tr>
                )}
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
