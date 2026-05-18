import React, { useState, useEffect } from 'react';
import { Search, Edit, Trash2, Eye, X, ChevronDown } from 'lucide-react';

interface SubGst {
  id?: number;
  companyName: string;
  department: string;
  officerName: string;
  mobile: string;
  gstNumber: string;
  remarks: string;
  status: boolean;
}

interface Company {
  gstNumber: string;
  companyName: string;
}

export function SubGST() {
  const [records, setRecords] = useState<SubGst[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [departments, setDepartments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<SubGst>({
    companyName: '',
    department: '',
    officerName: '',
    mobile: '',
    gstNumber: '',
    remarks: '',
    status: true
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    fetchRecords();
    fetchCompanies();
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const response = await fetch('http://localhost:5076/api/MasterData/category/Client%20Department');
      const data = await response.json();
      setDepartments(data);
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };

  const fetchRecords = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5076/api/subgsts');
      const data = await response.json();
      setRecords(data);
    } catch (error) {
      console.error('Error fetching records:', error);
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
    let { name, value, type } = e.target as HTMLInputElement;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      if (name === 'mobile') {
        value = value.replace(/[^0-9]/g, '').substring(0, 10);
      }
      setFormData(prev => ({ ...prev, [name]: value }));
      
      // Auto-fill GST Number if company is selected
      if (name === 'companyName') {
        const selected = companies.find(c => c.companyName === value);
        if (selected) {
          setFormData(prev => ({ ...prev, gstNumber: selected.gstNumber }));
        }
      }
    }

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.companyName) {
      newErrors.companyName = 'Company is required';
    }
    if (!formData.officerName.trim()) {
      newErrors.officerName = 'Officer Name is required';
    }

    const mobileRegex = /^[6-9][0-9]{9}$/;
    if (formData.mobile && !mobileRegex.test(formData.mobile)) {
      newErrors.mobile = 'Must be 10 digits starting with 6-9';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      alert('Please correct validation errors first');
      return;
    }

    try {
      const response = await fetch('http://localhost:5076/api/subgsts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        fetchRecords();
        setFormData({
          companyName: '', department: '', officerName: '',
          mobile: '', gstNumber: '', remarks: '', status: true
        });
      }
    } catch (error) {
      console.error('Error saving:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      try {
        const response = await fetch(`http://localhost:5076/api/subgsts/${id}`, {
          method: 'DELETE'
        });
        if (response.ok) {
          setRecords(prev => prev.filter(r => r.id !== id));
        }
      } catch (error) {
        console.error('Error deleting:', error);
      }
    }
  };

  return (
    <div className="p-8 bg-white min-h-screen font-sans text-slate-600">
      {/* Header Form */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="space-y-1.5">
          <label className="block text-[13px] font-medium text-gray-500">Company Name</label>
          <div className="relative">
             <select 
               name="companyName"
               value={formData.companyName}
               onChange={handleInputChange}
               className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all appearance-none text-sm"
             >
               <option value="">Search Company</option>
               {companies.map((c, i) => (
                 <option key={i} value={c.companyName}>{c.companyName}</option>
               ))}
             </select>
             <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="block text-[13px] font-medium text-gray-500">Department</label>
          <div className="relative">
            <select 
              name="department"
              value={formData.department}
              onChange={handleInputChange}
              className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all appearance-none text-sm"
            >
              <option value="">Select Department</option>
              {departments.map((dept: any) => (
                <option key={dept.id} value={dept.value}>{dept.value}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="block text-[13px] font-medium text-gray-500">Officer Name</label>
          <input
            type="text"
            name="officerName"
            value={formData.officerName}
            onChange={handleInputChange}
            placeholder="Officer Name"
            className={`w-full px-4 py-2.5 bg-white border rounded focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all text-sm ${errors.officerName ? 'border-red-500 focus:ring-red-500/20' : 'border-gray-200'}`}
          />
          {errors.officerName && <p className="text-red-500 text-[10px] mt-1 font-bold uppercase tracking-tight">{errors.officerName}</p>}
        </div>

        <div className="space-y-1.5">
          <label className="block text-[13px] font-medium text-gray-500">Mobile Number</label>
          <input
            type="text"
            name="mobile"
            value={formData.mobile}
            onChange={handleInputChange}
            placeholder="Mobile Number"
            maxLength={10}
            className={`w-full px-4 py-2.5 bg-white border rounded focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all text-sm ${errors.mobile ? 'border-red-500 focus:ring-red-500/20' : 'border-gray-200'}`}
          />
          {errors.mobile && <p className="text-red-500 text-[10px] mt-1 font-bold uppercase tracking-tight">{errors.mobile}</p>}
        </div>

        <div className="space-y-1.5">
          <label className="block text-[13px] font-medium text-gray-500">Remarks</label>
          <input
            type="text"
            name="remarks"
            value={formData.remarks}
            onChange={handleInputChange}
            placeholder="Remarks"
            className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all text-sm"
          />
        </div>

        <div className="md:col-start-2 md:col-span-1 flex items-end">
          <button 
            onClick={handleSave}
            className="w-full py-2.5 bg-[#0061f2] text-white font-bold rounded-md hover:bg-blue-700 transition-colors shadow-sm"
          >
            Save
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="overflow-hidden border border-gray-100 rounded-lg">
        <table className="w-full text-sm text-left border-collapse">
          <thead>
            <tr className="bg-[#f8f9fc] border-b border-gray-100">
              <th className="px-6 py-4 font-bold text-gray-600 uppercase tracking-tight">Company</th>
              <th className="px-6 py-4 font-bold text-gray-600 uppercase tracking-tight">Department</th>
              <th className="px-6 py-4 font-bold text-gray-600 uppercase tracking-tight">Officer</th>
              <th className="px-6 py-4 font-bold text-gray-600 uppercase tracking-tight">Mobile Number</th>
              <th className="px-6 py-4 font-bold text-gray-600 uppercase tracking-tight">GST Number</th>
              <th className="px-6 py-4 font-bold text-gray-600 uppercase tracking-tight">Remarks</th>
              <th className="px-6 py-4 font-bold text-gray-600 uppercase tracking-tight text-center">Status</th>
              <th className="px-6 py-4 font-bold text-gray-600 uppercase tracking-tight text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {loading ? (
               <tr><td colSpan={8} className="py-10 text-center"><div className="animate-spin inline-block w-6 h-6 border-2 border-blue-600 rounded-full border-t-transparent"></div></td></tr>
            ) : records.length === 0 ? (
               <tr><td colSpan={8} className="py-10 text-center text-gray-400">No records found.</td></tr>
            ) : records.map((record) => (
              <tr key={record.id} className="hover:bg-gray-50/50 transition-colors group">
                <td className="px-6 py-5 font-medium text-gray-600">{record.companyName}</td>
                <td className="px-6 py-5 text-gray-500">{record.department}</td>
                <td className="px-6 py-5 text-gray-500 uppercase">{record.officerName}</td>
                <td className="px-6 py-5 text-gray-500">{record.mobile}</td>
                <td className="px-6 py-5 text-gray-500">{record.gstNumber}</td>
                <td className="px-6 py-5 text-gray-400 text-xs">{record.remarks || '..'}</td>
                <td className="px-6 py-5 text-center">
                  <input 
                    type="checkbox" 
                    checked={record.status} 
                    readOnly
                    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </td>
                <td className="px-6 py-5">
                  <div className="flex justify-center">
                    <button 
                      onClick={() => record.id && handleDelete(record.id)}
                      className="px-3 py-1 bg-red-600 text-white text-[11px] font-bold rounded-md hover:bg-red-700 transition-colors shadow-sm"
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
