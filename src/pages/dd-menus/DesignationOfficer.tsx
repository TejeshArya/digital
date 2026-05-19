import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface Department {
  id: number;
  name: string;
}

interface DesignationOfficerRec {
  id?: number;
  designationName: string;
  officerName: string;
  officerId: string;
  mobileNumber: string;
  status: boolean;
  startTime?: string;
  endTime?: string | null;
  departmentId?: number;
  department?: Department;
}

export function DesignationOfficer() {
  const [records, setRecords] = useState<DesignationOfficerRec[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<DesignationOfficerRec>({
    designationName: '',
    officerName: '',
    officerId: '',
    mobileNumber: '',
    status: true,
    startTime: new Date().toISOString().slice(0, 10),
    endTime: null,
    departmentId: undefined
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    fetchRecords();
    fetchDepartments();
  }, []);

  const fetchRecords = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5076/api/designationofficers');
      const data = await response.json();
      setRecords(data);
    } catch (error) {
      console.error('Error fetching designation officers:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchDepartments = async () => {
    try {
      const response = await fetch('http://localhost:5076/api/departments');
      const data = await response.json();
      setDepartments(data);
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    let { name, value, type } = e.target as HTMLInputElement;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      if (name === 'isCurrent') {
        setFormData(prev => ({ ...prev, endTime: checked ? null : new Date().toISOString().slice(0, 10) }));
      } else {
        setFormData(prev => ({ ...prev, [name]: checked }));
      }
    } else {
      if (name === 'mobileNumber') {
        value = value.replace(/[^0-9]/g, '').substring(0, 10);
      }
      setFormData(prev => ({ 
        ...prev, 
        [name]: name === 'departmentId' ? (value ? parseInt(value) : undefined) : value 
      }));
    }

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.designationName.trim()) {
      newErrors.designationName = 'Designation is required';
    }
    if (!formData.officerName.trim()) {
      newErrors.officerName = 'Officer Name is required';
    }
    if (!formData.officerId.trim()) {
      newErrors.officerId = 'Officer ID is required';
    }
    if (!formData.departmentId) {
      newErrors.departmentId = 'Department is required';
    }

    const mobileRegex = /^[6-9][0-9]{9}$/;
    if (!formData.mobileNumber) {
      newErrors.mobileNumber = 'Mobile number is required';
    } else if (!mobileRegex.test(formData.mobileNumber)) {
      newErrors.mobileNumber = 'Must be 10 digits starting with 6-9';
    }

    if (!formData.startTime) {
      newErrors.startTime = 'Start time is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEdit = (record: DesignationOfficerRec) => {
    setEditingId(record.id || null);
    setFormData({
      designationName: record.designationName,
      officerName: record.officerName,
      officerId: record.officerId,
      mobileNumber: record.mobileNumber,
      status: record.status,
      startTime: record.startTime ? new Date(record.startTime).toISOString().slice(0, 10) : new Date().toISOString().slice(0, 10),
      endTime: record.endTime ? new Date(record.endTime).toISOString().slice(0, 10) : null,
      departmentId: record.departmentId
    });
    setErrors({});
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({
      designationName: '', officerName: '', officerId: '',
      mobileNumber: '', status: true,
      startTime: new Date().toISOString().slice(0, 10),
      endTime: null,
      departmentId: undefined
    });
    setErrors({});
  };

  const handleSave = async () => {
    if (!validateForm()) {
      alert('Please correct validation errors first');
      return;
    }

    try {
      const url = editingId 
        ? 'http://localhost:5076/api/designationofficers/edit' 
        : 'http://localhost:5076/api/designationofficers';
      
      const body = editingId 
        ? { ...formData, id: editingId }
        : formData;

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      if (response.ok) {
        fetchRecords();
        handleCancel();
      }
    } catch (error) {
      console.error('Error saving designation officer:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      try {
        const response = await fetch(`http://localhost:5076/api/designationofficers/${id}`, {
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
      {/* Header Title */}
      <div className="mb-8 border-b border-gray-100 pb-4">
        <h1 className="text-xl font-bold text-gray-800 tracking-tight">Designation - Officer Master</h1>
        <p className="text-xs text-gray-400 font-medium">Add and manage designations, officer profiles, and historical timeline tracking</p>
      </div>

      {/* Header Form */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 bg-[#f8f9fc] p-6 rounded-lg border border-gray-100">
        <div className="space-y-1.5">
          <label className="block text-[13px] font-medium text-gray-500">Department Name <span className="text-red-500">*</span></label>
          <div className="relative">
            <select
              name="departmentId"
              value={formData.departmentId || ''}
              onChange={handleInputChange}
              className={`w-full px-4 py-2.5 bg-white border rounded focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all appearance-none text-sm ${errors.departmentId ? 'border-red-500 focus:ring-red-500/20' : 'border-gray-200'}`}
            >
              <option value="">Select Department</option>
              {departments.map((dept) => (
                <option key={dept.id} value={dept.id}>{dept.name}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-3.5 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
          {errors.departmentId && <p className="text-red-500 text-[10px] mt-1 font-bold uppercase tracking-tight">{errors.departmentId}</p>}
        </div>

        <div className="space-y-1.5">
          <label className="block text-[13px] font-medium text-gray-500">Designation Name <span className="text-red-500">*</span></label>
          <input
            type="text"
            name="designationName"
            value={formData.designationName}
            onChange={handleInputChange}
            placeholder="e.g. Senior Officer, Director"
            className={`w-full px-4 py-2.5 bg-white border rounded focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all text-sm ${errors.designationName ? 'border-red-500 focus:ring-red-500/20' : 'border-gray-200'}`}
          />
          {errors.designationName && <p className="text-red-500 text-[10px] mt-1 font-bold uppercase tracking-tight">{errors.designationName}</p>}
        </div>

        <div className="space-y-1.5">
          <label className="block text-[13px] font-medium text-gray-500">Officer Name <span className="text-red-500">*</span></label>
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
          <label className="block text-[13px] font-medium text-gray-500">Officer ID <span className="text-red-500">*</span></label>
          <input
            type="text"
            name="officerId"
            value={formData.officerId}
            onChange={handleInputChange}
            placeholder="Officer ID"
            className={`w-full px-4 py-2.5 bg-white border rounded focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all text-sm ${errors.officerId ? 'border-red-500 focus:ring-red-500/20' : 'border-gray-200'}`}
          />
          {errors.officerId && <p className="text-red-500 text-[10px] mt-1 font-bold uppercase tracking-tight">{errors.officerId}</p>}
        </div>

        <div className="space-y-1.5">
          <label className="block text-[13px] font-medium text-gray-500">Mobile Number <span className="text-red-500">*</span></label>
          <input
            type="text"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleInputChange}
            placeholder="Mobile Number"
            maxLength={10}
            className={`w-full px-4 py-2.5 bg-white border rounded focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all text-sm ${errors.mobileNumber ? 'border-red-500 focus:ring-red-500/20' : 'border-gray-200'}`}
          />
          {errors.mobileNumber && <p className="text-red-500 text-[10px] mt-1 font-bold uppercase tracking-tight">{errors.mobileNumber}</p>}
        </div>

        <div className="space-y-1.5">
          <label className="block text-[13px] font-medium text-gray-500">Start Date <span className="text-red-500">*</span></label>
          <input
            type="date"
            name="startTime"
            value={formData.startTime}
            onChange={handleInputChange}
            className="w-full px-4 py-2 bg-white border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all text-sm text-gray-600 font-mono"
          />
          {errors.startTime && <p className="text-red-500 text-[10px] mt-1 font-bold uppercase tracking-tight">{errors.startTime}</p>}
        </div>

        <div className="space-y-1.5">
          <label className="block text-[13px] font-medium text-gray-500">End Date</label>
          <input
            type="date"
            name="endTime"
            value={formData.endTime || ''}
            disabled={formData.endTime === null}
            onChange={handleInputChange}
            className="w-full px-4 py-2 bg-white border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all text-sm text-gray-600 font-mono disabled:bg-gray-100 disabled:text-gray-400"
          />
        </div>

        <div className="space-y-1.5 flex items-center pt-6 pl-2">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              name="isCurrent"
              checked={formData.endTime === null}
              onChange={handleInputChange}
              className="w-4.5 h-4.5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-[13px] font-bold text-gray-600 uppercase tracking-tight">Active (Present)</span>
          </label>
        </div>

        <div className="flex gap-2 items-end pt-2 col-span-1 md:col-span-4 justify-end">
          <button 
            onClick={handleSave}
            className={`w-48 py-2.5 text-white font-bold rounded-md transition-colors shadow-sm ${editingId ? 'bg-amber-500 hover:bg-amber-600' : 'bg-[#0061f2] hover:bg-blue-700'}`}
          >
            {editingId ? 'Update' : 'Save'}
          </button>
          {editingId && (
            <button 
              onClick={handleCancel}
              className="py-2.5 px-4 bg-gray-200 text-gray-700 font-bold rounded-md hover:bg-gray-300 transition-colors shadow-sm"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto border border-gray-100 rounded-lg">
        <table className="w-full text-sm text-left border-collapse">
          <thead>
            <tr className="bg-[#f8f9fc] border-b border-gray-100">
              <th className="px-6 py-4 font-bold text-gray-600 uppercase tracking-tight">Department</th>
              <th className="px-6 py-4 font-bold text-gray-600 uppercase tracking-tight">Designation Name</th>
              <th className="px-6 py-4 font-bold text-gray-600 uppercase tracking-tight">Officer Name</th>
              <th className="px-6 py-4 font-bold text-gray-600 uppercase tracking-tight">Officer ID</th>
              <th className="px-6 py-4 font-bold text-gray-600 uppercase tracking-tight">Mobile Number</th>
              <th className="px-6 py-4 font-bold text-gray-600 uppercase tracking-tight">Start Date</th>
              <th className="px-6 py-4 font-bold text-gray-600 uppercase tracking-tight">End Date</th>
              <th className="px-6 py-4 font-bold text-gray-600 uppercase tracking-tight text-center">Status</th>
              <th className="px-6 py-4 font-bold text-gray-600 uppercase tracking-tight text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {loading ? (
               <tr><td colSpan={9} className="py-10 text-center"><div className="animate-spin inline-block w-6 h-6 border-2 border-blue-600 rounded-full border-t-transparent"></div></td></tr>
            ) : records.length === 0 ? (
               <tr><td colSpan={9} className="py-10 text-center text-gray-400">No records found.</td></tr>
            ) : records.map((record) => (
              <tr key={record.id} className="hover:bg-gray-50/50 transition-colors group">
                <td className="px-6 py-5 text-blue-600 font-bold uppercase">{record.department?.name || 'GLOBAL SEEDED'}</td>
                <td className="px-6 py-5 font-semibold text-gray-700">{record.designationName}</td>
                <td className="px-6 py-5 text-gray-500 uppercase font-medium">{record.officerName}</td>
                <td className="px-6 py-5 text-gray-500 font-mono text-xs">{record.officerId}</td>
                <td className="px-6 py-5 text-gray-500">{record.mobileNumber}</td>
                <td className="px-6 py-5 text-gray-400 font-mono text-[11px]">
                  {record.startTime ? new Date(record.startTime).toLocaleDateString('en-IN', { dateStyle: 'medium' }) : '---'}
                </td>
                <td className="px-6 py-5 font-mono text-[11px]">
                  {record.endTime ? (
                    <span className="text-gray-400">{new Date(record.endTime).toLocaleDateString('en-IN', { dateStyle: 'medium' })}</span>
                  ) : (
                    <span className="px-2.5 py-1 bg-green-50 text-green-700 font-bold text-[9px] uppercase rounded-full tracking-wider border border-green-200">Present</span>
                  )}
                </td>
                <td className="px-6 py-5 text-center">
                  <input 
                    type="checkbox" 
                    checked={record.status} 
                    readOnly
                    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </td>
                <td className="px-6 py-5">
                  <div className="flex gap-2 justify-center">
                    <button 
                      onClick={() => handleEdit(record)}
                      className="px-3 py-1 bg-amber-500 text-white text-[11px] font-bold rounded-md hover:bg-amber-600 transition-colors shadow-sm"
                    >
                      Edit
                    </button>
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
