import React, { useState, useEffect } from 'react';
import { 
  Plus, Edit3, Trash2, Search, ListChecks, 
  Save, FileText, LayoutGrid, Calendar, User as UserIcon,
  PlusCircle, List
} from 'lucide-react';

interface MasterDataManagementProps {
  category: string;
  title: string;
  fieldLabel: string;
  parentCategory?: string;
  showPhoto?: boolean;
  showShortName?: boolean;
  shortNameLabel?: string;
  showLocation?: boolean;
  locationLabel?: string;
  descriptionLabel?: string;
  types?: string[];
  tableHeaderColor?: string;
  tableTitle?: string;
  showId?: boolean;
  showCreatedBy?: boolean;
  isDescriptionTextArea?: boolean;
  showGstStateCode?: boolean;
}

export function MasterDataManagement({ 
  category, title, fieldLabel, parentCategory, 
  showPhoto = false, 
  showShortName = false, shortNameLabel,
  showLocation = false, locationLabel,
  descriptionLabel = 'Description',
  types,
  tableHeaderColor = 'bg-[#0061f2]',
  tableTitle,
  showId = false,
  showCreatedBy = false,
  isDescriptionTextArea = false,
  showGstStateCode = false
}: MasterDataManagementProps) {
  const [data, setData] = useState<any[]>([]);
  const [parents, setParents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ 
    id: 0, value: '', description: '', parentId: 0, shortName: '', location: '',
    type: types ? types[0] : '' 
  });
  const [file, setFile] = useState<File | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchData();
    if (parentCategory) {
      fetchParents();
    }
  }, [category, parentCategory]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`https://dee-backend-7x0g.onrender.com/api/MasterData/category/${category}`);
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Error fetching master data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchParents = async () => {
    try {
      const response = await fetch(`https://dee-backend-7x0g.onrender.com/api/MasterData/category/${parentCategory}`);
      const result = await response.json();
      setParents(result);
    } catch (error) {
      console.error('Error fetching parent data:', error);
    }
  };

  const handleSave = async () => {
    if (!formData.value) {
      alert('Please enter a value');
      return;
    }

    try {
      const url = isEditing ? `https://dee-backend-7x0g.onrender.com/api/MasterData/${formData.id}` : 'https://dee-backend-7x0g.onrender.com/api/MasterData';
      const method = isEditing ? 'PUT' : 'POST';
      
      const form = new FormData();
      form.append('data', JSON.stringify({
        id: formData.id,
        category,
        value: formData.value,
        description: formData.description || formData.value,
        parentId: formData.parentId > 0 ? formData.parentId : null,
        shortName: formData.type || formData.shortName || '',
        location: formData.location || ''
      }));
      if (file) {
        form.append('file', file);
      }

      const response = await fetch(url, {
        method: method,
        body: form
      });

      if (response.ok) {
        setFormData({ id: 0, value: '', description: '', parentId: 0, shortName: '', location: '', type: types ? types[0] : '' });
        setFile(null);
        setIsEditing(false);
        fetchData();
      } else {
        const errorText = await response.text();
        alert(errorText || 'Failed to save data. Please check your inputs.');
      }
    } catch (error) {
      console.error('Error saving master data:', error);
    }
  };

  const handleEdit = (item: any) => {
    setFormData({ 
      id: item.id, 
      value: item.value, 
      description: item.description, 
      parentId: item.parentId || 0, 
      shortName: item.shortName || '',
      location: item.location || '',
      type: item.shortName || (types ? types[0] : '')
    });
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this?')) return;
    try {
      const response = await fetch(`https://dee-backend-7x0g.onrender.com/api/MasterData/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        fetchData();
      }
    } catch (error) {
      console.error('Error deleting master data:', error);
    }
  };

  return (
    <div className="p-4 bg-[#f8f9fc] min-h-screen font-sans">
      <div className="max-w-[1600px] mx-auto space-y-8">
        {/* Input Form Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-[#0061f2] px-8 py-4 flex items-center justify-between">
             <h2 className="text-white text-[12px] font-black uppercase tracking-widest">{title}</h2>
             {types && (
               <div className="flex gap-4">
                  {types.map(t => (
                    <label key={t} className="flex items-center gap-2 cursor-pointer group">
                       <input 
                         type="radio" 
                         name="masterType"
                         value={t}
                         checked={formData.type === t}
                         onChange={(e) => setFormData({...formData, type: e.target.value})}
                         className="hidden"
                       />
                       <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${formData.type === t ? 'border-white bg-white' : 'border-white/30 group-hover:border-white/60'}`}>
                          {formData.type === t && <div className="w-2 h-2 rounded-full bg-[#0061f2]" />}
                       </div>
                       <span className={`text-[10px] font-black uppercase tracking-widest transition-all ${formData.type === t ? 'text-white' : 'text-white/50 group-hover:text-white/80'}`}>{t}</span>
                    </label>
                  ))}
               </div>
             )}
          </div>
          <div className={`p-8 grid grid-cols-1 ${parentCategory && showPhoto ? 'md:grid-cols-5' : (showLocation ? 'md:grid-cols-4' : (parentCategory || showPhoto || showShortName ? 'md:grid-cols-4' : 'md:grid-cols-3'))} gap-6 items-end`}>
            {parentCategory && (
                <div className="space-y-2">
                   <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{parentCategory} Name</label>
                   <select 
                     value={formData.parentId}
                     onChange={(e) => setFormData({...formData, parentId: parseInt(e.target.value)})}
                     className="w-full px-4 py-3 bg-white border border-gray-100 rounded-lg text-[13px] font-bold text-gray-700 focus:outline-none focus:border-blue-400 transition-all" 
                   >
                     <option value={0}>Select {parentCategory}</option>
                     {parents.map(p => <option key={p.id} value={p.id}>{p.value}</option>)}
                   </select>
                </div>
            )}
             <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{fieldLabel} <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  value={formData.value}
                  onChange={(e) => setFormData({...formData, value: e.target.value})}
                  className="w-full px-4 py-3 bg-white border border-gray-100 rounded-lg text-[13px] font-bold text-gray-700 focus:outline-none focus:border-blue-400 transition-all" 
                />
             </div>
             {showShortName && (
                <div className="space-y-2">
                   <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{shortNameLabel || (category + ' Short Name')}</label>
                   <input 
                     type="text" 
                     value={formData.shortName}
                     onChange={(e) => setFormData({...formData, shortName: e.target.value})}
                     className="w-full px-4 py-3 bg-white border border-gray-100 rounded-lg text-[13px] font-bold text-gray-700 focus:outline-none focus:border-blue-400 transition-all" 
                   />
                </div>
             )}
             {showLocation && (
                <div className="space-y-2">
                   <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{locationLabel || 'Location'}</label>
                   <input 
                     type="text" 
                     value={formData.location}
                     onChange={(e) => setFormData({...formData, location: e.target.value})}
                     className="w-full px-4 py-3 bg-white border border-gray-100 rounded-lg text-[13px] font-bold text-gray-700 focus:outline-none focus:border-blue-400 transition-all" 
                   />
                </div>
             )}
             <div className={`space-y-2 ${isDescriptionTextArea ? 'md:col-span-2' : ''}`}>
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{descriptionLabel}</label>
                {isDescriptionTextArea ? (
                  <textarea 
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="w-full px-4 py-3 bg-white border border-gray-100 rounded-lg text-[13px] font-bold text-gray-700 focus:outline-none focus:border-blue-400 transition-all min-h-[100px]" 
                  />
                ) : (
                  <input 
                    type="text" 
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="w-full px-4 py-3 bg-white border border-gray-100 rounded-lg text-[13px] font-bold text-gray-700 focus:outline-none focus:border-blue-400 transition-all" 
                  />
                )}
             </div>
             {showPhoto && (
               <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Photo</label>
                  <input 
                    type="file" 
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                    className="w-full px-4 py-2 bg-white border border-gray-100 rounded-lg text-[11px] font-bold text-gray-700 focus:outline-none focus:border-blue-400 transition-all" 
                  />
               </div>
             )}
             <div className="flex gap-2">
              <button 
                onClick={handleSave}
                className={`flex-1 px-8 py-3.5 ${isEditing ? 'bg-amber-500 shadow-amber-100' : 'bg-[#0061f2] shadow-blue-100'} text-white text-[11px] font-black rounded shadow-lg uppercase tracking-widest hover:opacity-90 transition-all flex items-center justify-center gap-2`}
              >
                  <Save className="w-3.5 h-3.5" />
                  {isEditing ? 'Update ' + category : 'Save ' + category}
              </button>
              {isEditing && (
                <button 
                  onClick={() => { setIsEditing(false); setFormData({ id: 0, value: '', description: '', parentId: 0, shortName: '', location: '', type: types ? types[0] : '' }); setFile(null); }}
                  className="px-6 py-3.5 bg-gray-100 text-gray-500 text-[11px] font-black rounded uppercase tracking-widest hover:bg-gray-200 transition-all"
                >
                  Cancel
                </button>
              )}
             </div>
          </div>
        </div>

        {/* Data Table Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden min-h-[600px]">
           <div className={`${tableHeaderColor} px-8 py-4 flex items-center gap-3`}>
              <List className="text-white w-5 h-5" />
              <h2 className="text-white text-[12px] font-black uppercase tracking-widest">{tableTitle || (category + ' List')}</h2>
           </div>
           <div className="overflow-x-auto">
              <table className="w-full text-[11px] border-collapse">
                 <thead>
                    <tr className="bg-[#212529] text-white uppercase tracking-widest border-b border-gray-100">
                       {showId && <th className="px-8 py-6 text-left font-black border-r border-gray-700">ID</th>}
                       {showPhoto && <th className="px-8 py-6 text-center font-black border-r border-gray-700">Photo</th>}
                       {parentCategory && <th className="px-8 py-6 text-left font-black border-r border-gray-700">{parentCategory}</th>}
                       <th className="px-8 py-6 text-left font-black border-r border-gray-700">{fieldLabel}</th>
                       {types && <th className="px-8 py-6 text-left font-black border-r border-gray-700">Type</th>}
                       {showShortName && <th className="px-8 py-6 text-left font-black border-r border-gray-700">{shortNameLabel || 'Short Name'}</th>}
                       {showGstStateCode && <th className="px-8 py-6 text-left font-black border-r border-gray-700">GST State Code</th>}
                       {showLocation && <th className="px-8 py-6 text-left font-black border-r border-gray-700">{locationLabel || 'Location'}</th>}
                       <th className="px-8 py-6 text-left font-black border-r border-gray-700">{descriptionLabel}</th>
                       {showCreatedBy && <th className="px-8 py-6 text-left font-black border-r border-gray-700">Created By</th>}
                       <th className="px-8 py-6 text-left font-black border-r border-gray-700">Created Date</th>
                       <th className="px-8 py-6 text-center font-black">Actions</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-gray-50">
                    {loading ? (
                      <tr><td colSpan={10} className="text-center py-20 font-bold text-gray-400">Loading...</td></tr>
                    ) : data.length === 0 ? (
                      <tr><td colSpan={10} className="text-center py-20 font-bold text-gray-400">No records found for {category}</td></tr>
                    ) : data.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50/50 transition-colors group">
                         {showId && (
                           <td className="px-8 py-5 border-r border-gray-50 font-bold text-gray-400">{item.id}</td>
                         )}
                         {showPhoto && (
                           <td className="px-8 py-4 border-r border-gray-50 text-center">
                              {item.photoPath ? (
                                <img src={`https://dee-backend-7x0g.onrender.com${item.photoPath}`} alt={item.value} className="w-12 h-12 object-contain mx-auto rounded border border-gray-100" />
                              ) : (
                                <div className="w-12 h-12 bg-gray-50 rounded border border-dashed border-gray-200 mx-auto flex items-center justify-center text-[8px] text-gray-300 font-bold uppercase">No Image</div>
                              )}
                           </td>
                         )}
                         {parentCategory && (
                           <td className="px-8 py-5 border-r border-gray-50 font-bold text-gray-500 uppercase tracking-tight">
                              {parents.find(p => p.id === item.parentId)?.value || '---'}
                           </td>
                         )}
                         <td className="px-8 py-5 border-r border-gray-50 font-black text-gray-600 uppercase tracking-tight">{item.value}</td>
                         {types && (
                           <td className="px-8 py-5 border-r border-gray-50 font-bold text-blue-500 uppercase tracking-tight">{item.shortName || '---'}</td>
                         )}
                         {showShortName && (
                           <td className="px-8 py-5 border-r border-gray-50 font-bold text-gray-500 uppercase tracking-tight">{item.shortName || '---'}</td>
                         )}
                         {showGstStateCode && (
                           <td className="px-8 py-5 border-r border-gray-50 font-bold text-blue-500 uppercase tracking-tight">{item.gstStateCode || '---'}</td>
                         )}
                         {showLocation && (
                           <td className="px-8 py-5 border-r border-gray-50 font-bold text-gray-500 uppercase tracking-tight">{item.location || '---'}</td>
                         )}
                         <td className="px-8 py-5 border-r border-gray-50 font-bold text-gray-400 uppercase tracking-tight">{item.description}</td>
                         {showCreatedBy && (
                           <td className="px-8 py-5 border-r border-gray-50 font-bold text-gray-400">2</td>
                         )}
                         <td className="px-8 py-5 border-r border-gray-50 font-bold text-gray-400 tracking-tighter whitespace-nowrap">
                            {new Date(item.createdAt).toLocaleDateString('en-GB').replace(/\//g, '-') + ' ' + new Date(item.createdAt).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
                         </td>
                         <td className="px-8 py-5 text-center">
                            <div className="flex gap-2 justify-center">
                               <button 
                                 onClick={() => handleEdit(item)}
                                 className="p-2 border border-blue-400 text-blue-500 rounded hover:bg-blue-500 hover:text-white transition-all"
                               >
                                  <Edit3 className="w-3.5 h-3.5" />
                               </button>
                               <button 
                                 onClick={() => handleDelete(item.id)}
                                 className="p-2 border border-red-400 text-red-500 rounded hover:bg-red-500 hover:text-white transition-all"
                               >
                                  <Trash2 className="w-3.5 h-3.5" />
                               </button>
                            </div>
                         </td>
                      </tr>
                    ))}
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
