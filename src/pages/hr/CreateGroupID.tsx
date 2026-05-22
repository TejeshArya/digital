import React, { useState, useEffect } from 'react';
import { 
  Users, Plus, Search, Edit3, 
  Trash2, Save, FileText, Hash, Calendar,
  Layout, ArrowLeft
} from 'lucide-react';

export function CreateGroupID() {
  const [groups, setGroups] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    description: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [editingId, setEditingId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchGroups = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5076/api/roles');
      if (response.ok) {
        const data = await response.json();
        setGroups(data);
        const nextId = data.length > 0 ? Math.max(...data.map((g: any) => g.id)) + 1 : 1;
        setFormData(prev => {
          if (editingId === null) {
            return { ...prev, id: nextId.toString() };
          }
          return prev;
        });
      }
    } catch (error) {
      console.error('Error fetching roles/groups:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'id') {
      const sanitized = value.replace(/[^0-9]/g, '');
      setFormData(prev => ({ ...prev, [name]: sanitized }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!editingId && formData.id) {
      const idNum = parseInt(formData.id);
      if (isNaN(idNum) || idNum <= 0) {
        newErrors.id = 'Group ID must be a positive number';
      } else if (groups.some(g => g.id === idNum)) {
        newErrors.id = 'This Group ID is already taken';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    try {
      const isEdit = editingId !== null;
      const url = isEdit 
        ? 'http://localhost:5076/api/roles/edit' 
        : 'http://localhost:5076/api/roles';
      
      const payload = {
        id: isEdit ? editingId : (formData.id ? parseInt(formData.id) : 0),
        name: formData.name.trim(),
        displayName: formData.name.trim(),
        description: formData.description.trim(),
        permissions: ''
      };

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        await fetchGroups();
        handleCancel();
      } else {
        const errData = await response.json().catch(() => ({}));
        if (errData.message) {
          setErrors(prev => ({ ...prev, id: errData.message }));
        } else {
          alert('Failed to save group');
        }
      }
    } catch (error) {
      console.error('Error saving group:', error);
      alert('An error occurred while saving.');
    }
  };

  const handleEdit = (group: any) => {
    setEditingId(group.id);
    setFormData({
      id: group.id.toString(),
      name: group.name,
      description: group.description
    });
    setErrors({});
  };

  const handleCancel = () => {
    setEditingId(null);
    const nextId = groups.length > 0 ? Math.max(...groups.map(g => g.id)) + 1 : 1;
    setFormData({
      id: nextId.toString(),
      name: '',
      description: ''
    });
    setErrors({});
  };

  const handleDelete = async (id: number) => {
    if (window.confirm(`Are you sure you want to delete Group ID ${id}?`)) {
      try {
        const response = await fetch(`http://localhost:5076/api/roles/${id}`, {
          method: 'DELETE'
        });
        if (response.ok) {
          const updatedGroups = groups.filter(g => g.id !== id);
          setGroups(updatedGroups);
          if (editingId === null) {
            const nextId = updatedGroups.length > 0 ? Math.max(...updatedGroups.map(g => g.id)) + 1 : 1;
            setFormData(prev => ({ ...prev, id: nextId.toString() }));
          }
        } else {
          alert('Failed to delete group. Ensure it is not linked to any users.');
        }
      } catch (error) {
        console.error('Error deleting group:', error);
      }
    }
  };

  const filteredGroups = groups.filter(g => {
    const searchLower = searchTerm.toLowerCase();
    return (
      g.id.toString().includes(searchLower) ||
      g.name.toLowerCase().includes(searchLower) ||
      g.description.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="p-4 bg-[#f8f9fc] min-h-screen font-sans">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <h1 className="text-gray-700 font-black text-xl uppercase tracking-widest flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-lg shadow-sm">
            <Users className="w-5 h-5 text-white" />
          </div>
          Create Group ID
        </h1>
        <div className="flex gap-2">
          <button 
            onClick={() => window.history.back()}
            className="flex items-center gap-2 px-4 py-2 bg-[#6b58d3] text-white text-[10px] font-black rounded shadow-sm uppercase tracking-widest hover:bg-purple-700 transition-all"
          >
            <ArrowLeft className="w-4 h-4" /> Back to HR
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto space-y-6">
        {/* New Group Entry Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-gray-50/50 px-6 py-4 border-b border-gray-100">
            <h2 className="text-[12px] font-black text-[#0061f2] uppercase tracking-widest flex items-center gap-2">
              <Plus className="w-4 h-4" /> {editingId ? 'Edit Group' : 'New Group'}
            </h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
              {/* Group ID Input (Auto-generated) */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  <Hash className="w-3.5 h-3.5" /> Group ID
                </label>
                <input 
                  type="text" 
                  name="id"
                  value={formData.id}
                  disabled
                  placeholder="Auto-generated"
                  className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg text-[13px] font-bold text-gray-400 cursor-not-allowed focus:outline-none shadow-inner-sm"
                />
                {errors.id && <p className="text-red-500 text-[9px] font-bold uppercase tracking-tight mt-1">{errors.id}</p>}
              </div>

              {/* Name Input */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  <FileText className="w-3.5 h-3.5" /> Name
                </label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter Name"
                  className={`w-full px-4 py-3 bg-gray-50 border rounded-lg text-[13px] font-bold text-gray-700 focus:outline-none focus:bg-white transition-all shadow-inner-sm ${
                    errors.name ? 'border-red-400 focus:border-red-400' : 'border-gray-100 focus:border-blue-400'
                  }`}
                />
                {errors.name && <p className="text-red-500 text-[9px] font-bold uppercase tracking-tight mt-1">{errors.name}</p>}
              </div>

              {/* Description Input */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  <FileText className="w-3.5 h-3.5" /> Description
                </label>
                <input 
                  type="text" 
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Enter Description"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-lg text-[13px] font-bold text-gray-700 focus:outline-none focus:border-blue-400 focus:bg-white transition-all shadow-inner-sm"
                />
              </div>

              {/* Save/Cancel Buttons */}
              <div className="flex gap-2">
                <button 
                  onClick={handleSave}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-[#0061f2] text-white text-[11px] font-black rounded-lg shadow-lg shadow-blue-100 uppercase tracking-widest hover:bg-blue-700 transition-all"
                >
                  <Save className="w-4 h-4" /> {editingId ? 'Update Group' : 'Save Group'}
                </button>
                {editingId && (
                  <button 
                    onClick={handleCancel}
                    className="flex items-center justify-center px-4 py-3.5 bg-gray-200 text-gray-700 text-[11px] font-black rounded-lg uppercase tracking-widest hover:bg-gray-300 transition-all"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Groups List Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden min-h-[400px]">
          {/* Table Header with Search */}
          <div className="px-8 py-5 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4 bg-gray-50/20">
            <h2 className="text-[12px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-2">
              <Layout className="w-4 h-4" /> Group List
            </h2>
            <div className="relative w-full sm:w-72">
              <input
                type="text"
                placeholder="Search Groups..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-xs font-bold text-gray-600 focus:outline-none focus:border-blue-400 transition-all placeholder-gray-400"
              />
              <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-[11px] border-collapse">
              <thead>
                <tr className="bg-white text-gray-400 uppercase tracking-widest border-b border-gray-100">
                  <th className="px-8 py-5 text-left font-black border-r border-gray-100 w-24">Group ID</th>
                  <th className="px-8 py-5 text-left font-black border-r border-gray-100">Name</th>
                  <th className="px-8 py-5 text-left font-black border-r border-gray-100">Description</th>
                  <th className="px-8 py-5 text-left font-black border-r border-gray-100 w-48">Created Date</th>
                  <th className="px-8 py-5 text-center font-black w-32">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="py-12 text-center">
                      <div className="animate-spin inline-block w-6 h-6 border-2 border-blue-600 rounded-full border-t-transparent"></div>
                      <p className="text-gray-400 font-bold mt-2 text-[10px] tracking-widest uppercase">Loading groups...</p>
                    </td>
                  </tr>
                ) : filteredGroups.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-gray-400 font-bold uppercase tracking-widest text-[10px]">
                      No groups found.
                    </td>
                  </tr>
                ) : (
                  filteredGroups.map((group) => (
                    <tr key={group.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-8 py-5 border-r border-gray-50 font-black text-gray-500">#{group.id}</td>
                      <td className="px-8 py-5 border-r border-gray-50 font-black text-gray-700 uppercase tracking-tight">{group.name}</td>
                      <td className="px-8 py-5 border-r border-gray-50 font-bold text-gray-400 uppercase tracking-tighter">{group.description || 'No Description'}</td>
                      <td className="px-8 py-5 border-r border-gray-50 font-bold text-gray-400 flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 opacity-30" /> 
                        {group.id <= 18 ? '2025-12-23' : new Date().toISOString().split('T')[0]}
                      </td>
                      <td className="px-8 py-5 text-center">
                        <div className="flex justify-center gap-2">
                          <button 
                            onClick={() => handleEdit(group)}
                            className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors shadow-sm border border-blue-100"
                            title="Edit Group"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleDelete(group.id)}
                            className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors shadow-sm border border-red-100"
                            title="Delete Group"
                          >
                            <Trash2 className="w-4 h-4" />
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
