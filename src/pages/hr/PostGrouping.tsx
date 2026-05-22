import React, { useState, useEffect, useMemo } from 'react';
import { 
  Layers, Plus, Search, Filter, Edit3, 
  Trash2, Save, FileText, Info, History,
  X, CheckSquare, Square, Building2, Users,
  RefreshCw, CheckCircle, AlertCircle, Calendar
} from 'lucide-react';

interface Post {
  id: number;
  groupId: number;
  groupName: string;
  wing: string;
  dept: string;
  title: string;
  desc: string;
  date: string;
}

interface PostGroupingItem {
  id: number;
  postId: number;
  post?: Post;
}

interface PostGroupingModel {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  postGroupingItems: PostGroupingItem[];
}

export function PostGrouping() {
  // DB States
  const [groupings, setGroupings] = useState<PostGroupingModel[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);

  // UX States
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  
  // Modal & History States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  // Form Selection States
  const [groupingName, setGroupingName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [selectedPosts, setSelectedPosts] = useState<number[]>([]);
  
  // Search Filters
  const [searchPostTerm, setSearchPostTerm] = useState<string>('');
  const [globalSearchTerm, setGlobalSearchTerm] = useState<string>('');
  const [formError, setFormError] = useState<string>('');

  // Floating Toast State
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

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
      const [groupsRes, postsRes] = await Promise.all([
        fetch('http://localhost:5076/api/postgroupings'),
        fetch('http://localhost:5076/api/posts')
      ]);

      if (groupsRes.ok) {
        const groupsData = await groupsRes.json();
        setGroupings(groupsData);
      } else {
        triggerToast('Failed to load active post groupings', 'error');
      }

      if (postsRes.ok) {
        const postsData = await postsRes.json();
        setPosts(postsData);
      } else {
        triggerToast('Failed to load posts catalog', 'error');
      }
    } catch (err) {
      console.error(err);
      triggerToast('Database server offline or unreachable', 'error');
    } finally {
      setLoading(false);
    }
  };

  const togglePostSelection = (id: number) => {
    setSelectedPosts(prev => 
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
    setFormError('');
  };

  const handleCreateGrouping = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!groupingName.trim()) {
      setFormError('Grouping Name is required');
      return;
    }
    if (selectedPosts.length < 2) {
      setFormError('At least 2 posts must be selected for grouping');
      return;
    }

    try {
      setSaving(true);
      const body = {
        name: groupingName.trim(),
        description: description.trim(),
        postIds: selectedPosts
      };

      const res = await fetch('http://localhost:5076/api/postgroupings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      if (res.ok) {
        triggerToast(`Post grouping "${body.name}" registered successfully`, 'success');
        
        // Reset and close
        setGroupingName('');
        setDescription('');
        setSelectedPosts([]);
        setIsModalOpen(false);

        // Reload data
        await fetchInitialData();
      } else {
        const errText = await res.text();
        triggerToast(errText || 'Failed to register grouping', 'error');
      }
    } catch (err) {
      console.error(err);
      triggerToast('Network error while saving grouping', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteGrouping = async (id: number, groupName: string) => {
    if (!window.confirm(`Are you sure you want to delete the grouping "${groupName}"?`)) {
      return;
    }

    try {
      setDeletingId(id);
      const res = await fetch(`http://localhost:5076/api/postgroupings/${id}`, {
        method: 'DELETE'
      });

      if (res.ok) {
        triggerToast(`Grouping "${groupName}" deleted successfully`, 'info');
        setGroupings(prev => prev.filter(g => g.id !== id));
      } else {
        triggerToast('Failed to delete grouping record', 'error');
      }
    } catch (err) {
      console.error(err);
      triggerToast('Network error while deleting grouping', 'error');
    } finally {
      setDeletingId(null);
    }
  };

  // Format creation timestamps
  const formatDate = (dateStr: string) => {
    if (!dateStr) return 'N/A';
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric'
      });
    } catch (e) {
      return dateStr;
    }
  };

  // Filter posts inside modal checklist
  const filteredPostsForSelect = useMemo(() => {
    return posts.filter(post => {
      const titleMatch = post.title?.toLowerCase().includes(searchPostTerm.toLowerCase()) || false;
      const groupMatch = post.groupName?.toLowerCase().includes(searchPostTerm.toLowerCase()) || false;
      const wingMatch = post.wing?.toLowerCase().includes(searchPostTerm.toLowerCase()) || false;
      const deptMatch = post.dept?.toLowerCase().includes(searchPostTerm.toLowerCase()) || false;
      return titleMatch || groupMatch || wingMatch || deptMatch;
    });
  }, [posts, searchPostTerm]);

  // Global search filters for cards list
  const filteredGroupings = useMemo(() => {
    return groupings.filter(group => {
      const nameMatch = group.name?.toLowerCase().includes(globalSearchTerm.toLowerCase()) || false;
      const descMatch = group.description?.toLowerCase().includes(globalSearchTerm.toLowerCase()) || false;
      const postsMatch = group.postGroupingItems?.some(item => 
        item.post?.title?.toLowerCase().includes(globalSearchTerm.toLowerCase())
      ) || false;
      return nameMatch || descMatch || postsMatch;
    });
  }, [groupings, globalSearchTerm]);

  return (
    <div className="p-4 bg-[#f8f9fc] min-h-screen font-sans relative">
      {/* Floating Status Toast */}
      {toast && (
        <div className={`fixed top-5 right-5 z-[100] flex items-center gap-3 px-6 py-4 rounded-xl shadow-2xl transition-all duration-300 border animate-bounce ${
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
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div className="space-y-1">
          <h1 className="text-gray-700 font-black text-xl uppercase tracking-widest flex items-center gap-2">
            <Layers className="w-5 h-5 text-blue-600" /> Post Grouping Management
          </h1>
          <p className="text-[11px] text-gray-400 font-bold uppercase tracking-tight">
            Group multiple posts together so their employees can see each other's projects.
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <button 
            onClick={fetchInitialData}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 hover:border-blue-400 text-gray-500 hover:text-blue-600 rounded bg-white shadow-sm transition-all text-[10px] font-black uppercase tracking-widest"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} /> Sync
          </button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-6 py-2.5 bg-[#0061f2] text-white text-[10px] font-black rounded shadow-lg shadow-blue-100 uppercase tracking-widest hover:bg-blue-700 transition-all"
          >
            <Plus className="w-4 h-4" /> Create New Grouping
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto space-y-6">
        {/* Active Groupings Display or Empty Alert */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 animate-pulse space-y-4">
                <div className="h-4 bg-gray-100 rounded w-2/3"></div>
                <div className="h-3 bg-gray-100 rounded w-5/6"></div>
                <div className="h-8 bg-gray-50 rounded w-full mt-4"></div>
              </div>
            ))}
          </div>
        ) : groupings.length > 0 ? (
          <div className="space-y-6">
            {/* Search Top Filter bar */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
              <span className="text-[11px] font-black text-gray-500 uppercase tracking-widest">
                Active Groupings ({groupings.length})
              </span>
              <div className="relative w-full md:w-72">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                  <Search className="w-3.5 h-3.5" />
                </span>
                <input 
                  type="text"
                  placeholder="Filter groupings or post titles..."
                  value={globalSearchTerm}
                  onChange={(e) => setGlobalSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded text-[11px] font-bold text-gray-700 focus:outline-none focus:border-blue-400 bg-[#f8f9fc] placeholder-gray-400 transition-all"
                />
              </div>
            </div>

            {/* List Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredGroupings.map((group) => (
                <div key={group.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md hover:scale-[1.01] transition-all relative overflow-hidden flex flex-col justify-between min-h-[220px]">
                  {/* Card Ribbon / Decoration */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-[#6b58d3]" />
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                      <h3 className="text-[13px] font-black text-gray-700 uppercase tracking-wide">{group.name}</h3>
                      <button 
                        onClick={() => handleDeleteGrouping(group.id, group.name)}
                        disabled={deletingId === group.id}
                        className="p-1.5 text-gray-300 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                        title="Delete Grouping"
                      >
                        {deletingId === group.id ? (
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <Trash2 className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                    <p className="text-[10px] text-gray-400 font-bold">{group.description || 'No description provided.'}</p>
                  </div>

                  {/* List of Posts in this grouping */}
                  <div className="mt-4 space-y-2">
                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Linked Posts ({group.postGroupingItems?.length || 0})</p>
                    <div className="flex flex-wrap gap-1.5 max-h-[80px] overflow-y-auto custom-scrollbar pr-1">
                      {group.postGroupingItems?.map((item) => (
                        <span key={item.id} className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-[8px] font-black uppercase tracking-tight flex items-center gap-1 border border-blue-100/50">
                          {item.post?.title || 'Unknown Post'}
                          <span className="opacity-40 text-[7px] font-bold">({item.post?.groupName})</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-gray-50 flex justify-between items-center text-[8px] text-gray-400 font-bold uppercase tracking-widest">
                    <span>Created: {formatDate(group.createdAt)}</span>
                    <span className="text-[#6b58d3] flex items-center gap-0.5">
                      <Users className="w-3 h-3" /> Shared Project Scope
                    </span>
                  </div>
                </div>
              ))}
              {filteredGroupings.length === 0 && (
                <div className="col-span-full bg-gray-50 border border-dashed border-gray-200 rounded-xl p-12 text-center text-gray-400 font-bold uppercase tracking-widest text-[11px]">
                  <Info className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                  No Groupings Match Your Search Filter
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Empty State Alert matching screenshot */
          <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-5 flex items-center gap-4 text-cyan-800">
             <div className="bg-cyan-600 p-1.5 rounded-full shadow-sm">
                <Info className="w-4 h-4 text-white animate-pulse" />
             </div>
             <p className="text-[11px] font-black uppercase tracking-widest">
               No post groupings created yet. Click "Create New Grouping" to start.
             </p>
          </div>
        )}

        {/* History Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center space-y-6">
           <div className="flex flex-col items-center gap-2">
              <History className="w-8 h-8 text-cyan-400 opacity-50 animate-pulse" />
              <h3 className="text-[14px] font-black text-gray-700 uppercase tracking-widest">View Complete Grouping History</h3>
              <p className="text-[11px] text-gray-400 font-bold max-w-sm mx-auto">Access detailed historical data of all post groupings.</p>
           </div>
           <button 
             onClick={() => setIsHistoryOpen(true)}
             className="px-10 py-3 border border-cyan-400 text-cyan-500 text-[11px] font-black rounded-lg hover:bg-cyan-50 transition-all uppercase tracking-widest"
           >
              View Full History
           </button>
        </div>
      </div>

      {/* Create Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
           <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
              {/* Modal Header */}
              <div className="bg-[#0061f2] px-6 py-4 flex justify-between items-center">
                 <h2 className="text-white text-[13px] font-black uppercase tracking-widest flex items-center gap-2">
                    <Plus className="w-4 h-4" /> Create New Post Grouping
                 </h2>
                 <button onClick={() => {
                   setIsModalOpen(false);
                   setFormError('');
                   setSelectedPosts([]);
                 }} className="text-white/80 hover:text-white transition-colors">
                    <X className="w-5 h-5" />
                 </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Grouping Name <span className="text-rose-500">*</span></label>
                    <input 
                      type="text" 
                      value={groupingName}
                      onChange={(e) => {
                        setGroupingName(e.target.value);
                        setFormError('');
                      }}
                      placeholder="e.g., IT & Development Team"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-lg text-[13px] font-bold text-gray-700 focus:outline-none focus:border-blue-400 transition-all"
                    />
                 </div>

                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Description (Optional)</label>
                    <textarea 
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Brief description of this grouping..."
                      rows={3}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-lg text-[13px] font-bold text-gray-700 focus:outline-none focus:border-blue-400 transition-all resize-none"
                    />
                 </div>

                 <div className="space-y-4">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Select Posts (Minimum 2) <span className="text-rose-500">*</span></label>
                    
                    <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4 flex items-start gap-3 text-cyan-800">
                       <Info className="w-4 h-4 mt-0.5 shrink-0 animate-pulse" />
                       <p className="text-[10px] font-bold tracking-tight">Select at least 2 posts. Employees holding these posts will be able to see each other's projects.</p>
                    </div>

                    {/* Checkbox search list */}
                    <div className="relative">
                       <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                       <input 
                         type="text" 
                         placeholder="Search posts..."
                         value={searchPostTerm}
                         onChange={(e) => setSearchPostTerm(e.target.value)}
                         className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-lg text-[12px] font-bold text-gray-700 focus:outline-none focus:border-blue-400 transition-all"
                       />
                    </div>

                    <div className="space-y-1 border border-gray-100 rounded-lg overflow-hidden max-h-[250px] overflow-y-auto custom-scrollbar bg-gray-50/30">
                       {filteredPostsForSelect.length > 0 ? (
                         filteredPostsForSelect.map(post => {
                            const isSelected = selectedPosts.includes(post.id);
                            return (
                              <div 
                                key={post.id} 
                                onClick={() => togglePostSelection(post.id)}
                                className={`p-4 flex items-start gap-4 cursor-pointer transition-colors border-b border-gray-50 last:border-0 ${isSelected ? 'bg-blue-50/50' : 'hover:bg-white'}`}
                              >
                                 <div className={`mt-0.5 ${isSelected ? 'text-blue-600 animate-pulse' : 'text-gray-300'}`}>
                                    {isSelected ? <CheckSquare className="w-4 h-4" /> : <Square className="w-4 h-4" />}
                                 </div>
                                 <div className="flex-1 space-y-1">
                                    <div className="flex items-center gap-2">
                                       <span className={`text-[12px] font-black uppercase tracking-tight ${isSelected ? 'text-blue-700' : 'text-gray-700'}`}>
                                         {post.title}
                                       </span>
                                       <span className="bg-[#6b58d3] text-white px-2 py-0.5 rounded text-[8px] font-black uppercase">
                                         {post.groupName}
                                       </span>
                                    </div>
                                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter flex items-center gap-1">
                                       <Building2 className="w-3 h-3 opacity-30" /> {post.wing} / {post.dept}
                                    </p>
                                 </div>
                              </div>
                            );
                         })
                       ) : (
                         <div className="p-8 text-center text-gray-400 font-bold uppercase tracking-widest text-[9px]">
                           No posts matched search query
                         </div>
                       )}
                    </div>
                    <div className="text-[10px] text-[#6b58d3] font-black uppercase px-1">
                      {selectedPosts.length} posts selected
                    </div>
                 </div>
              </div>

              {formError && (
                <div className="mx-6 p-3.5 bg-rose-50 border border-rose-100 text-rose-700 text-[11px] font-bold rounded-lg flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-500 animate-pulse" />
                  <span>{formError}</span>
                </div>
              )}

              {/* Modal Footer */}
              <div className="bg-gray-50/50 px-6 py-4 flex justify-end gap-3 border-t border-gray-100">
                 <button 
                   onClick={() => {
                     setIsModalOpen(false);
                     setFormError('');
                     setSelectedPosts([]);
                   }}
                   className="px-8 py-2.5 bg-[#6b58d3] text-white text-[11px] font-black rounded shadow-md uppercase tracking-widest hover:bg-purple-700 transition-all"
                 >
                    Cancel
                 </button>
                 <button 
                   onClick={handleCreateGrouping}
                   disabled={saving || !groupingName.trim() || selectedPosts.length < 2}
                   className="px-8 py-2.5 bg-[#0061f2] text-white text-[11px] font-black rounded shadow-md uppercase tracking-widest hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                 >
                    {saving && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
                    <span>Create Grouping</span>
                 </button>
              </div>
           </div>
        </div>
      )}

      {/* History Slide-over Drawer / Modal */}
      {isHistoryOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-end">
          <div className="bg-white h-full w-full max-w-lg shadow-2xl p-6 flex flex-col justify-between animate-in slide-in-from-right duration-300">
            <div className="space-y-6">
              <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <History className="w-5 h-5 text-blue-600 animate-spin-slow" />
                  <h2 className="text-[13px] font-black text-gray-700 uppercase tracking-widest">Grouping History Logs</h2>
                </div>
                <button onClick={() => setIsHistoryOpen(false)} className="p-1 hover:bg-gray-50 rounded">
                  <X className="w-5 h-5 text-gray-400 hover:text-gray-700" />
                </button>
              </div>

              <div className="space-y-4 max-h-[80vh] overflow-y-auto custom-scrollbar pr-1">
                {groupings.map(group => (
                  <div key={group.id} className="p-4 bg-gray-50/50 border border-gray-100 rounded-lg space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-[11px] font-black text-[#6b58d3] uppercase tracking-wide">{group.name}</span>
                      <span className="text-[9px] text-gray-400 font-bold uppercase">{formatDate(group.createdAt)}</span>
                    </div>
                    <p className="text-[10px] text-gray-400 font-bold">{group.description || 'No description added.'}</p>
                    <div className="flex flex-wrap gap-1">
                      {group.postGroupingItems?.map(item => (
                        <span key={item.id} className="bg-white border border-gray-100 text-gray-500 px-1.5 py-0.5 rounded text-[7px] font-black uppercase">
                          {item.post?.title}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
                {groupings.length === 0 && (
                  <div className="text-center text-gray-400 font-bold uppercase tracking-widest text-[10px] py-16">
                    No historical grouping records found
                  </div>
                )}
              </div>
            </div>

            <button 
              onClick={() => setIsHistoryOpen(false)}
              className="w-full py-3 bg-gray-900 text-white text-[11px] font-black uppercase tracking-widest rounded hover:bg-black transition-colors"
            >
              Close History Panel
            </button>
          </div>
        </div>
      )}

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
