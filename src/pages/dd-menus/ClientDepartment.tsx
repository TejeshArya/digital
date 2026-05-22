import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface Company {
  gstNumber: string;
  companyName: string;
}

interface Department {
  id?: number;
  name: string;
  companyGstNumber: string;
  company?: Company;
}

export function ClientDepartment() {
  const [depts, setDepts] = useState<Department[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    companyGstNumber: ''
  });
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    fetchDepts();
    fetchCompanies();
  }, []);

  const fetchDepts = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5076/api/departments');
      const data = await response.json();
      setDepts(data);
    } catch (error) {
      console.error('Error fetching departments:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCompanies = async () => {
    try {
      const response = await fetch('http://localhost:5076/api/companygsts');
      const data = await response.json();
      setCompanies(data);
    } catch (error) {
      console.error('Error fetching companies:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!formData.name.trim()) {
      alert('Department Name is required');
      return;
    }
    if (!formData.companyGstNumber) {
      alert('Please select a Company');
      return;
    }

    try {
      const url = editingId 
        ? 'http://localhost:5076/api/departments/edit' 
        : 'http://localhost:5076/api/departments';

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingId ? { ...formData, id: editingId } : formData)
      });

      if (response.ok) {
        fetchDepts();
        handleCancel();
      }
    } catch (error) {
      console.error('Error saving department:', error);
    }
  };

  const handleEdit = (dept: Department) => {
    setEditingId(dept.id || null);
    setFormData({
      name: dept.name,
      companyGstNumber: dept.companyGstNumber || ''
    });
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({
      name: '',
      companyGstNumber: ''
    });
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this department?')) {
      try {
        const response = await fetch(`http://localhost:5076/api/departments/${id}`, {
          method: 'DELETE'
        });
        if (response.ok) {
          fetchDepts();
        }
      } catch (error) {
        console.error('Error deleting:', error);
      }
    }
  };

  return (
    <div className="p-8 bg-white min-h-screen font-sans text-slate-600">
      {/* Header */}
      <div className="mb-8 border-b border-gray-100 pb-4">
        <h1 className="text-xl font-bold text-gray-800 tracking-tight">Client Department Master</h1>
        <p className="text-xs text-gray-400 font-medium">Link client departments to registered companies under reference keys</p>
      </div>

      {/* Add Department Form */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 bg-[#f8f9fc] p-6 rounded-lg border border-gray-100 items-end">
        <div className="space-y-1.5">
          <label className="block text-[13px] font-medium text-gray-500">Company Name <span className="text-red-500">*</span></label>
          <div className="relative">
            <select
              name="companyGstNumber"
              value={formData.companyGstNumber}
              onChange={handleInputChange}
              className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all appearance-none text-sm"
            >
              <option value="">Select Company</option>
              {companies.map((c, idx) => (
                <option key={idx} value={c.gstNumber}>{c.companyName}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-3.5 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="block text-[13px] font-medium text-gray-500">Department Name <span className="text-red-500">*</span></label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="e.g. Civil Department, IT Department"
            className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all text-sm"
          />
        </div>

        <div className="flex gap-2">
          <button 
            onClick={handleSave}
            className={`flex-1 py-2.5 text-white font-bold rounded transition-colors shadow-sm ${editingId ? 'bg-amber-500 hover:bg-amber-600' : 'bg-[#0061f2] hover:bg-blue-700'}`}
          >
            {editingId ? 'Update' : 'Save'}
          </button>
          {editingId && (
            <button 
              onClick={handleCancel}
              className="py-2.5 px-4 bg-gray-200 text-gray-700 font-bold rounded hover:bg-gray-300 transition-colors shadow-sm"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* Departments Grid */}
      <div className="overflow-x-auto border border-gray-100 rounded-lg">
        <table className="w-full text-sm text-left border-collapse">
          <thead>
            <tr className="bg-[#f8f9fc] border-b border-gray-100">
              <th className="px-6 py-4 font-bold text-gray-600 uppercase tracking-tight font-black">Department Name</th>
              <th className="px-6 py-4 font-bold text-gray-600 uppercase tracking-tight text-center font-black">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 font-medium text-gray-600">
            {loading ? (
               <tr><td colSpan={2} className="py-10 text-center"><div className="animate-spin inline-block w-6 h-6 border-2 border-blue-600 rounded-full border-t-transparent"></div></td></tr>
            ) : depts.length === 0 ? (
               <tr><td colSpan={2} className="py-10 text-center text-gray-400">No records found.</td></tr>
            ) : depts.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50/50 transition-colors group">
                 <td className="px-6 py-4 uppercase font-bold text-blue-600">{item.name}</td>
                 <td className="px-6 py-4">
                    <div className="flex gap-2 justify-center">
                       <button 
                         onClick={() => handleEdit(item)}
                         className="px-3 py-1 bg-amber-500 text-white text-[11px] font-bold rounded hover:bg-amber-600 transition-colors shadow-sm font-black"
                       >
                          Edit
                       </button>
                       <button 
                         onClick={() => item.id && handleDelete(item.id)}
                         className="px-3 py-1 bg-red-600 text-white text-[11px] font-bold rounded hover:bg-red-700 transition-colors shadow-sm font-black"
                       >
                          Delete
                       </button>
                    </div>
                 </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
