import React, { useState, useEffect, useMemo } from 'react';
import { 
  Briefcase, Plus, Search, Filter, Edit3, 
  Trash2, Save, FileText, Map, List,
  ArrowLeft, Info, GitFork, Users, Building2,
  X, Check, AlertCircle, Sparkles, RefreshCw, Loader2, Calendar, ChevronDown
} from 'lucide-react';


interface Post {
  id?: number;
  groupId: number;
  groupName: string;
  wing: string;
  dept: string;
  title: string;
  desc: string;
  date?: string;
}

interface Role {
  id: number;
  name: string;
  displayName: string;
  description: string;
}

interface Wing {
  id: number;
  name: string;
  description: string;
  status: boolean;
}

interface Department {
  id: number;
  name: string;
}

interface CreatePostProps {
  onNavigate?: (path: string) => void;
}

export function CreatePost({ onNavigate }: CreatePostProps) {
  // Lists fetched from DB
  const [posts, setPosts] = useState<Post[]>([]);
  const [groups, setGroups] = useState<Role[]>([]);
  const [wings, setWings] = useState<Wing[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  
  // Loading states
  const [loading, setLoading] = useState(true);
  const [saveLoading, setSaveLoading] = useState(false);
  const [deleteLoadingId, setDeleteLoadingId] = useState<number | null>(null);

  // Form states for creating/editing posts
  const [formData, setFormData] = useState({
    groupId: 0,
    groupName: '',
    wing: '',
    dept: '',
    title: '',
    desc: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [editingId, setEditingId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  


  // Custom Toast state
  const [toast, setToast] = useState<{
    show: boolean;
    message: string;
    type: 'success' | 'error' | 'info';
  }>({
    show: false,
    message: '',
    type: 'success'
  });

  // Modal delete confirmation state
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);

  // Automatically fetch initial active database entities
  useEffect(() => {
    fetchInitialData();
  }, []);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast(prev => ({ ...prev, show: false }));
    }, 4500);
  };

  const fetchInitialData = async () => {
    setLoading(true);
    try {
      const [postsRes, groupsRes, wingsRes, deptsRes] = await Promise.all([
        fetch('http://localhost:5076/api/posts'),
        fetch('http://localhost:5076/api/roles'),
        fetch('http://localhost:5076/api/wings'),
        fetch('http://localhost:5076/api/departments')
      ]);

      if (postsRes.ok) {
        const postsData = await postsRes.json();
        setPosts(postsData);
      }
      
      if (groupsRes.ok) {
        const groupsData = await groupsRes.json();
        setGroups(groupsData.sort((a: Role, b: Role) => a.id - b.id));
      }

      if (wingsRes.ok) {
        const wingsData = await wingsRes.json();
        setWings(wingsData.filter((w: Wing) => w.status !== false));
      }

      if (deptsRes.ok) {
        const deptsData = await deptsRes.json();
        setDepartments(deptsData);
      }
    } catch (err) {
      console.error('Error fetching dashboard system tables:', err);
      showToast('Failed to connect to active database services.', 'error');
    } finally {
      setLoading(false);
    }
  };



  // Handle post form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'groupId') {
      const selectedId = parseInt(value);
      if (selectedId) {
        const selectedGroup = groups.find(g => g.id === selectedId);
        setFormData(prev => ({
          ...prev,
          groupId: selectedId,
          groupName: selectedGroup ? selectedGroup.displayName || selectedGroup.name : ''
        }));
      } else {
        setFormData(prev => ({ ...prev, groupId: 0, groupName: '' }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.groupId) newErrors.groupId = 'Group / Role selection is required';
    if (!formData.wing) newErrors.wing = 'Wing selection is required';
    if (!formData.dept) newErrors.dept = 'Department selection is required';
    if (!formData.title.trim()) newErrors.title = 'Post title is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };



  const handleEdit = (post: Post) => {
    setEditingId(post.id || null);
    setFormData({
      groupId: post.groupId,
      groupName: post.groupName,
      wing: post.wing,
      dept: post.dept,
      title: post.title,
      desc: post.desc
    });
    setErrors({});
    
    // Smooth scroll to form section
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast(`Editing post ID: #${post.id}. Form loaded.`, 'info');
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({
      groupId: 0,
      groupName: '',
      wing: '',
      dept: '',
      title: '',
      desc: ''
    });
    setErrors({});
  };

  const handleSave = async () => {
    if (!validateForm()) {
      showToast('Please complete all required fields correctly.', 'error');
      return;
    }

    setSaveLoading(true);
    try {
      const url = editingId
        ? 'http://localhost:5076/api/posts/edit'
        : 'http://localhost:5076/api/posts';

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
        const savedPost = await response.json();
        if (editingId) {
          setPosts(prev => prev.map(p => p.id === editingId ? savedPost : p));
          showToast(`Post ID #${editingId} successfully updated!`, 'success');
        } else {
          setPosts(prev => [savedPost, ...prev]);
          showToast('New post saved and published successfully!', 'success');
        }
        handleCancel();
      } else {
        const errData = await response.json().catch(() => ({}));
        showToast(errData.message || 'Error occurred while saving post.', 'error');
      }
    } catch (error) {
      console.error('Error saving post:', error);
      showToast('Network error while saving post. Please try again.', 'error');
    } finally {
      setSaveLoading(false);
    }
  };

  const confirmDelete = (id: number) => {
    setDeleteConfirmId(id);
  };

  const handleDelete = async () => {
    if (!deleteConfirmId) return;

    setDeleteLoadingId(deleteConfirmId);
    try {
      const response = await fetch(`http://localhost:5076/api/posts/${deleteConfirmId}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        setPosts(prev => prev.filter(p => p.id !== deleteConfirmId));
        showToast('Post deleted successfully.', 'success');
      } else {
        showToast('Failed to delete post from active system.', 'error');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      showToast('Network error while deleting post.', 'error');
    } finally {
      setDeleteLoadingId(null);
      setDeleteConfirmId(null);
    }
  };

  // Live client-side search filtering
  const filteredPosts = useMemo(() => {
    if (!searchTerm.trim()) return posts;
    const term = searchTerm.toLowerCase();
    return posts.filter(p => 
      p.title.toLowerCase().includes(term) ||
      p.groupName.toLowerCase().includes(term) ||
      p.wing.toLowerCase().includes(term) ||
      p.dept.toLowerCase().includes(term) ||
      (p.desc && p.desc.toLowerCase().includes(term)) ||
      p.groupId.toString().includes(term)
    );
  }, [posts, searchTerm]);

  return (
    <div className="p-6 bg-slate-50 min-h-screen font-sans text-slate-700 relative">
      
      {/* Floating Custom Toast Notification System */}
      {toast.show && (
        <div className="fixed top-6 right-6 z-50 animate-slide-in max-w-sm bg-white rounded-xl shadow-xl border border-slate-100 p-4 flex items-start gap-3.5 transition-all transform hover:scale-[1.02]">
          <div className={`p-2 rounded-lg ${
            toast.type === 'success' ? 'bg-emerald-50 text-emerald-600' :
            toast.type === 'error' ? 'bg-rose-50 text-rose-600' :
            'bg-sky-50 text-sky-600'
          }`}>
            {toast.type === 'success' && <Check className="w-5 h-5" />}
            {toast.type === 'error' && <AlertCircle className="w-5 h-5" />}
            {toast.type === 'info' && <Info className="w-5 h-5" />}
          </div>
          <div className="flex-1">
            <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest">System Notification</h4>
            <p className="text-xs font-bold text-slate-700 mt-0.5 leading-relaxed">{toast.message}</p>
          </div>
          <button onClick={() => setToast(prev => ({ ...prev, show: false }))} className="text-slate-400 hover:text-slate-600 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Modern Custom Delete Confirmation Dialog Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-100 overflow-hidden transform transition-all scale-100">
            <div className="p-6 text-center">
              <div className="w-14 h-14 bg-rose-50 rounded-full flex items-center justify-center mx-auto text-rose-600 mb-4">
                <Trash2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-800">Confirm Deletion</h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Are you absolutely sure you want to permanently remove this corporate post record? This action is irreversible.
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
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Container */}
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Premium Header Banner */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-gradient-to-r from-blue-600 to-indigo-700 p-6 rounded-2xl shadow-lg shadow-indigo-600/15 text-white">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-1.5 bg-white/10 rounded-lg">
                <Briefcase className="w-5 h-5 text-indigo-200" />
              </span>
              <h1 className="text-xl font-bold tracking-tight uppercase">Corporate Post Management</h1>
            </div>
            <p className="text-xs text-indigo-100/80 font-medium max-w-xl">
              Publish corporate listings, manage active staff positions, and dynamically link group roles, company wings, and department structures.
            </p>
          </div>
          <div className="flex items-center gap-2.5 bg-white/10 px-4 py-2 rounded-xl backdrop-blur-sm border border-white/5">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span className="text-[10px] font-black tracking-widest uppercase text-indigo-100">System Connected</span>
          </div>
        </div>

        {/* Dynamic Creation / Editing Form Card */}
        <div className={`bg-white rounded-2xl shadow-md border overflow-hidden transition-all duration-300 ${
          editingId 
            ? 'border-amber-400/60 ring-4 ring-amber-500/5' 
            : 'border-slate-100'
        }`}>
          {/* Card Header Banner for Form */}
          <div className={`px-8 py-4 flex justify-between items-center border-b ${
            editingId ? 'bg-amber-50/40 border-amber-100' : 'bg-slate-50/50 border-slate-100'
          }`}>
            <div className="flex items-center gap-2">
              <span className={`p-1.5 rounded-lg ${editingId ? 'bg-amber-100 text-amber-600' : 'bg-blue-50/80 text-blue-600'}`}>
                {editingId ? <Edit3 className="w-4 h-4 animate-pulse" /> : <Save className="w-4 h-4" />}
              </span>
              <span className="text-[11px] font-black tracking-widest uppercase text-slate-500">
                {editingId ? `Update Post (ID: #${editingId})` : 'Publish New Corporate Post'}
              </span>
            </div>
            {editingId && (
              <span className="px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest bg-amber-100 text-amber-800 animate-pulse">
                Edit Mode Active
              </span>
            )}
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 items-end">
              
              {/* Select Group (Role) */}
              <div className="space-y-1.5 relative">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    Select Group <span className="text-rose-500">*</span>
                  </label>
                  <button 
                    onClick={() => onNavigate?.('/hr/group-id')}
                    className="text-[9px] font-black text-indigo-600 hover:text-indigo-800 flex items-center gap-0.5 uppercase tracking-wider transition-colors"
                  >
                    <Plus className="w-2.5 h-2.5" /> New Group
                  </button>
                </div>
                <div className="relative">
                  <select 
                    name="groupId"
                    value={formData.groupId || ''}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2.5 bg-white border rounded text-[12px] font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all appearance-none cursor-pointer ${
                      errors.groupId ? 'border-rose-400 focus:ring-rose-500/10' : 'border-slate-200 focus:border-blue-400'
                    }`}
                  >
                    <option value="">Select Group Role</option>
                    {groups.map((group) => (
                      <option key={group.id} value={group.id}>
                        {group.displayName || group.name} (ID: {group.id})
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
                {errors.groupId && <p className="text-[9px] font-bold text-rose-500 uppercase tracking-tight">{errors.groupId}</p>}
              </div>

              {/* Select Wing */}
              <div className="space-y-1.5 relative">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    Select Wing <span className="text-rose-500">*</span>
                  </label>
                  <button 
                    onClick={() => onNavigate?.('/hr/wing')}
                    className="text-[9px] font-black text-indigo-600 hover:text-indigo-800 flex items-center gap-0.5 uppercase tracking-wider transition-colors"
                  >
                    <Plus className="w-2.5 h-2.5" /> New Wing
                  </button>
                </div>
                <div className="relative">
                  <select 
                    name="wing"
                    value={formData.wing}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2.5 bg-white border rounded text-[12px] font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all appearance-none cursor-pointer ${
                      errors.wing ? 'border-rose-400 focus:ring-rose-500/10' : 'border-slate-200 focus:border-blue-400'
                    }`}
                  >
                    <option value="">Select Wing</option>
                    {wings.map((wing) => (
                      <option key={wing.id} value={wing.name}>
                        {wing.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
                {errors.wing && <p className="text-[9px] font-bold text-rose-500 uppercase tracking-tight">{errors.wing}</p>}
              </div>

              {/* Select Department */}
              <div className="space-y-1.5 relative">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    Select Department <span className="text-rose-500">*</span>
                  </label>
                  <button 
                    onClick={() => onNavigate?.('/hr/department')}
                    className="text-[9px] font-black text-indigo-600 hover:text-indigo-800 flex items-center gap-0.5 uppercase tracking-wider transition-colors"
                  >
                    <Plus className="w-2.5 h-2.5" /> New Dept
                  </button>
                </div>
                <div className="relative">
                  <select 
                    name="dept"
                    value={formData.dept}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2.5 bg-white border rounded text-[12px] font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all appearance-none cursor-pointer ${
                      errors.dept ? 'border-rose-400 focus:ring-rose-500/10' : 'border-slate-200 focus:border-blue-400'
                    }`}
                  >
                    <option value="">Select Department</option>
                    {departments.map((dept) => (
                      <option key={dept.id} value={dept.name}>
                        {dept.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
                {errors.dept && <p className="text-[9px] font-bold text-rose-500 uppercase tracking-tight">{errors.dept}</p>}
              </div>

              {/* Post Title */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Post Title <span className="text-rose-500">*</span>
                </label>
                <input 
                  type="text" 
                  name="title"
                  placeholder="Enter Post Title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2.5 bg-white border rounded text-[12px] font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all ${
                    errors.title ? 'border-rose-400 focus:ring-rose-500/10' : 'border-slate-200 focus:border-blue-400'
                  }`}
                />
                {errors.title && <p className="text-[9px] font-bold text-rose-500 uppercase tracking-tight">{errors.title}</p>}
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Description
                </label>
                <input 
                  type="text" 
                  name="desc"
                  placeholder="Enter Description"
                  value={formData.desc}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded text-[12px] font-bold text-slate-700 focus:outline-none focus:border-blue-400 transition-all"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button 
                  onClick={handleSave}
                  disabled={saveLoading}
                  className={`flex-1 flex items-center justify-center gap-1.5 px-5 py-2.5 text-white text-[10px] font-black rounded-lg shadow-md uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer ${
                    editingId 
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 shadow-amber-500/10' 
                      : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-indigo-600/10'
                  }`}
                >
                  {saveLoading ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Save className="w-3.5 h-3.5" />
                  )}
                  {editingId ? 'Update' : 'Save'}
                </button>
                {editingId && (
                  <button 
                    onClick={handleCancel}
                    className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-500 text-[10px] font-black rounded-lg uppercase tracking-widest transition-all"
                  >
                    Cancel
                  </button>
                )}
              </div>

            </div>
          </div>
        </div>

        {/* Live Filterable Posts Grid/Table Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden min-h-[500px] flex flex-col">
          
          {/* Table Header with Search Engine and Counters */}
          <div className="px-8 py-5 border-b border-slate-100 bg-slate-50/30 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <List className="w-4 h-4 text-slate-400" />
                <span className="text-[11px] font-black tracking-widest uppercase text-slate-500">Corporate Directory Index</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-400 font-bold">
                <span>Total Posts Loaded:</span>
                <span className="bg-slate-200/80 px-2 py-0.5 rounded-full text-slate-600 text-[10px] font-black">
                  {posts.length}
                </span>
                {searchTerm && (
                  <>
                    <span>• Filtered Results:</span>
                    <span className="bg-indigo-100 px-2 py-0.5 rounded-full text-indigo-700 text-[10px] font-black">
                      {filteredPosts.length}
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Smart Search Engine Input */}
            <div className="relative w-full sm:w-72">
              <input 
                type="text" 
                placeholder="Search Title, Role, Wing, Dept..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 focus:border-indigo-400 rounded-xl text-xs font-bold text-slate-600 focus:outline-none focus:ring-4 focus:ring-indigo-500/5 transition-all placeholder-slate-400"
              />
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400 pointer-events-none" />
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm('')} 
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-[11px] border-collapse text-left">
              <thead>
                <tr className="bg-slate-50/80 text-slate-400 uppercase tracking-widest border-b border-slate-100">
                  <th className="px-6 py-4.5 text-center font-black border-r border-slate-50 w-24">Group ID</th>
                  <th className="px-6 py-4.5 font-black border-r border-slate-50">Group Name</th>
                  <th className="px-6 py-4.5 text-center font-black border-r border-slate-50">Wing</th>
                  <th className="px-6 py-4.5 text-center font-black border-r border-slate-50">Department</th>
                  <th className="px-6 py-4.5 font-black border-r border-slate-50">Post Title</th>
                  <th className="px-6 py-4.5 font-black border-r border-slate-50">Description</th>
                  <th className="px-6 py-4.5 text-center font-black border-r border-slate-50">Date Published</th>
                  <th className="px-6 py-4.5 text-center font-black">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr>
                    <td colSpan={8} className="py-24 text-center">
                      <div className="flex flex-col items-center justify-center gap-3">
                        <div className="animate-spin inline-block w-8 h-8 border-3 border-indigo-600 rounded-full border-t-transparent shadow-sm"></div>
                        <p className="text-slate-400 text-xs font-black uppercase tracking-widest animate-pulse">Retrieving Postings...</p>
                      </div>
                    </td>
                  </tr>
                ) : filteredPosts.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-24 text-center">
                      <div className="flex flex-col items-center justify-center gap-2.5 max-w-sm mx-auto text-slate-400">
                        <div className="p-3 bg-slate-50 rounded-2xl text-slate-300">
                          <FileText className="w-8 h-8" />
                        </div>
                        <h4 className="text-xs font-black text-slate-700 uppercase tracking-widest mt-1">No Postings Found</h4>
                        <p className="text-[11px] text-slate-400 font-medium leading-relaxed">
                          {searchTerm 
                            ? 'No dynamic records matched your criteria. Refine your query or clear the active filter.' 
                            : 'No posts are currently seeded. Fill in the fields above to dynamic list your first post!'}
                        </p>
                        {searchTerm && (
                          <button 
                            onClick={() => setSearchTerm('')} 
                            className="mt-2 px-4 py-1.5 border border-slate-200 text-[10px] font-black text-indigo-600 rounded-lg hover:bg-slate-50 uppercase tracking-widest transition-all"
                          >
                            Clear Active Search
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredPosts.map((post) => (
                    <tr key={post.id} className="hover:bg-slate-50/30 transition-colors group">
                      
                      {/* Group ID */}
                      <td className="px-6 py-4.5 border-r border-slate-50 text-center font-mono font-bold text-slate-400 bg-slate-50/20 group-hover:bg-slate-50/40 transition-colors">
                        #{post.groupId}
                      </td>

                      {/* Group Name */}
                      <td className="px-6 py-4.5 border-r border-slate-50 font-black text-slate-600 uppercase tracking-tight">
                        {post.groupName}
                      </td>

                      {/* Wing */}
                      <td className="px-6 py-4.5 border-r border-slate-50 text-center font-bold text-slate-500 uppercase tracking-tight">
                        <span className="inline-block px-2.5 py-0.5 rounded-full text-[9px] font-black tracking-wide bg-blue-50 text-blue-600 border border-blue-100/30">
                          {post.wing}
                        </span>
                      </td>

                      {/* Department */}
                      <td className="px-6 py-4.5 border-r border-slate-50 text-center font-bold text-slate-500 uppercase tracking-tight">
                        <span className="inline-block px-2.5 py-0.5 rounded-full text-[9px] font-black tracking-wide bg-slate-100 text-slate-600">
                          {post.dept}
                        </span>
                      </td>

                      {/* Title */}
                      <td className="px-6 py-4.5 border-r border-slate-50 font-black text-slate-800 uppercase tracking-tight">
                        {post.title}
                      </td>

                      {/* Description */}
                      <td className="px-6 py-4.5 border-r border-slate-50 font-bold text-slate-400 max-w-[200px] truncate" title={post.desc}>
                        {post.desc || <span className="text-slate-300 font-medium italic">No description provided</span>}
                      </td>

                      {/* Created Date */}
                      <td className="px-6 py-4.5 border-r border-slate-50 text-center font-bold text-slate-400">
                        <div className="flex items-center justify-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-slate-300" />
                          <span>
                            {post.date 
                              ? new Date(post.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
                              : 'Just Now'}
                          </span>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4.5 text-center">
                        <div className="flex gap-2 justify-center items-center opacity-85 group-hover:opacity-100 transition-opacity">
                          <button 
                            onClick={() => handleEdit(post)}
                            title="Edit Corporate Listing"
                            className="p-2 border border-slate-200 bg-white text-indigo-500 rounded-lg hover:border-indigo-200 hover:bg-indigo-50/50 hover:text-indigo-600 hover:scale-105 active:scale-95 transition-all shadow-sm cursor-pointer"
                          >
                             <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button 
                            onClick={() => post.id && confirmDelete(post.id)}
                            title="Remove Post"
                            className="p-2 border border-slate-200 bg-white text-rose-500 rounded-lg hover:border-rose-200 hover:bg-rose-50/50 hover:text-rose-600 hover:scale-105 active:scale-95 transition-all shadow-sm cursor-pointer"
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

      {/* Modern Premium Footer */}
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center text-[10px] text-slate-400 font-black tracking-[0.2em] uppercase px-4">
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
