import React, { useState } from 'react';
import { 
  Layers, Plus, Search, Filter, Edit3, 
  Trash2, Save, FileText, Info, History,
  X, CheckSquare, Square, Building2, Users
} from 'lucide-react';

export function PostGrouping() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPosts, setSelectedPosts] = useState<number[]>([]);

  const posts = [
    { id: 1, title: 'Administrator', badge: 'DIRECTOR', sub: 'N/A / N/A' },
    { id: 2, title: 'Administrator', badge: 'Admin', sub: 'N/A / N/A' },
    { id: 3, title: 'CIVIL HEAD', badge: 'HR', sub: 'CIVIL / P & P' },
    { id: 4, title: 'DATA ENTRY OPERATOR', badge: 'TECHNICIAN', sub: 'ELECTRICAL / P & P' },
    { id: 5, title: 'DEE HQ OFFICE ADMINISTRATOR', badge: 'ASSISTANT SUPERVISOR', sub: 'ELECTRICAL / P & P' },
  ];

  const togglePost = (id: number) => {
    setSelectedPosts(prev => 
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  return (
    <div className="p-4 bg-[#f8f9fc] min-h-screen font-sans relative">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div className="space-y-1">
          <h1 className="text-gray-700 font-black text-xl uppercase tracking-widest flex items-center gap-2">
            <Layers className="w-5 h-5 text-blue-600" /> Post Grouping Management
          </h1>
          <p className="text-[11px] text-gray-400 font-bold uppercase tracking-tight">Group multiple posts together so their employees can see each other's projects.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-6 py-2.5 bg-[#0061f2] text-white text-[10px] font-black rounded shadow-lg shadow-blue-100 uppercase tracking-widest hover:bg-blue-700 transition-all"
        >
          <Plus className="w-4 h-4" /> Create New Grouping
        </button>
      </div>

      <div className="max-w-5xl mx-auto space-y-6">
        {/* Empty State Alert */}
        <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-5 flex items-center gap-4 text-cyan-800">
           <div className="bg-cyan-600 p-1.5 rounded-full shadow-sm">
              <Info className="w-4 h-4 text-white" />
           </div>
           <p className="text-[11px] font-black uppercase tracking-widest">No post groupings created yet. Click "Create New Grouping" to start.</p>
        </div>

        {/* History Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center space-y-6">
           <div className="flex flex-col items-center gap-2">
              <History className="w-8 h-8 text-cyan-400 opacity-50" />
              <h3 className="text-[14px] font-black text-gray-700 uppercase tracking-widest">View Complete Grouping History</h3>
              <p className="text-[11px] text-gray-400 font-bold max-w-sm mx-auto">Access detailed historical data of all post groupings.</p>
           </div>
           <button className="px-10 py-3 border border-cyan-400 text-cyan-500 text-[11px] font-black rounded-lg hover:bg-cyan-50 transition-all uppercase tracking-widest">
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
                 <button onClick={() => setIsModalOpen(false)} className="text-white/80 hover:text-white transition-colors">
                    <X className="w-5 h-5" />
                 </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Grouping Name <span className="text-rose-500">*</span></label>
                    <input 
                      type="text" 
                      placeholder="e.g., IT & Development Team"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-lg text-[13px] font-bold text-gray-700 focus:outline-none focus:border-blue-400 transition-all"
                    />
                 </div>

                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Description (Optional)</label>
                    <textarea 
                      placeholder="Brief description of this grouping..."
                      rows={3}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-lg text-[13px] font-bold text-gray-700 focus:outline-none focus:border-blue-400 transition-all resize-none"
                    />
                 </div>

                 <div className="space-y-4">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Select Posts (Minimum 2) <span className="text-rose-500">*</span></label>
                    
                    <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4 flex items-start gap-3 text-cyan-800">
                       <Info className="w-4 h-4 mt-0.5 shrink-0" />
                       <p className="text-[10px] font-bold tracking-tight">Select at least 2 posts. Employees holding these posts will be able to see each other's projects.</p>
                    </div>

                    <div className="relative">
                       <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                       <input 
                         type="text" 
                         placeholder="Search posts..."
                         className="w-full pl-10 pr-4 py-3 bg-white border border-gray-100 rounded-lg text-[12px] font-bold text-gray-700 focus:outline-none focus:border-blue-400 transition-all"
                       />
                    </div>

                    <div className="space-y-1 border border-gray-100 rounded-lg overflow-hidden max-h-[300px] overflow-y-auto custom-scrollbar bg-gray-50/30">
                       {posts.map(post => {
                         const isSelected = selectedPosts.includes(post.id);
                         return (
                           <div 
                             key={post.id} 
                             onClick={() => togglePost(post.id)}
                             className={`p-4 flex items-start gap-4 cursor-pointer transition-colors border-b border-gray-50 last:border-0 ${isSelected ? 'bg-blue-50/50' : 'hover:bg-white'}`}
                           >
                              <div className={`mt-0.5 ${isSelected ? 'text-blue-600' : 'text-gray-300'}`}>
                                 {isSelected ? <CheckSquare className="w-4 h-4" /> : <Square className="w-4 h-4" />}
                              </div>
                              <div className="flex-1 space-y-1">
                                 <div className="flex items-center gap-2">
                                    <span className={`text-[12px] font-black uppercase tracking-tight ${isSelected ? 'text-blue-700' : 'text-gray-700'}`}>{post.title}</span>
                                    <span className="bg-[#6b58d3] text-white px-2 py-0.5 rounded text-[8px] font-black uppercase">{post.badge}</span>
                                 </div>
                                 <p className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter flex items-center gap-1">
                                    <Building2 className="w-3 h-3 opacity-30" /> {post.sub}
                                 </p>
                              </div>
                           </div>
                         );
                       })}
                    </div>
                    <div className="text-[10px] text-gray-400 font-bold uppercase px-1">{selectedPosts.length} posts selected</div>
                 </div>
              </div>

              {/* Modal Footer */}
              <div className="bg-gray-50/50 px-6 py-4 flex justify-end gap-3 border-t border-gray-100">
                 <button 
                   onClick={() => setIsModalOpen(false)}
                   className="px-8 py-2.5 bg-[#6b58d3] text-white text-[11px] font-black rounded shadow-md uppercase tracking-widest hover:bg-purple-700 transition-all"
                 >
                    Cancel
                 </button>
                 <button className="px-8 py-2.5 bg-[#0061f2] text-white text-[11px] font-black rounded shadow-md uppercase tracking-widest hover:bg-blue-700 transition-all opacity-90 hover:opacity-100">
                    Create Grouping
                 </button>
              </div>
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
