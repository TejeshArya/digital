import React, { useState, useEffect } from 'react';
import { Search, Edit, Trash2, Eye, X, ChevronDown } from 'lucide-react';

interface SubGst {
  id?: number;
  companyName: string;
  department: string;
  officerName: string;
  mobile: string;
  gstNumber: string;
  designation: string;
  remarks: string;
  status: boolean;
  departmentOfficer?: string;
}

interface Company {
  gstNumber: string;
  companyName: string;
}

interface SubGSTProps {
  isMasterPage?: boolean;
}

export function SubGST({ isMasterPage = false }: SubGSTProps) {
  const [records, setRecords] = useState<SubGst[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [departments, setDepartments] = useState<any[]>([]);
  const [designations, setDesignations] = useState<any[]>([]);
  const [employees, setEmployees] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<SubGst>({
    companyName: '',
    department: '',
    officerName: '',
    mobile: '',
    gstNumber: '',
    designation: '',
    remarks: '',
    status: true
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    fetchRecords();
    fetchCompanies();
    fetchDepartments();
    fetchDesignations();
    fetchEmployees();
  }, []);

  const fetchDepartments = async () => {
    try {
      const response = await fetch('http://localhost:5076/api/departments');
      const data = await response.json();
      setDepartments(data);
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };

  const fetchDesignations = async () => {
    try {
      const response = await fetch('http://localhost:5076/api/designationofficers');
      const data = await response.json();
      setDesignations(data);
    } catch (error) {
      console.error('Error fetching designations:', error);
    }
  };

  const fetchEmployees = async () => {
    try {
      const response = await fetch('http://localhost:5076/api/employees');
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error('Error fetching employees:', error);
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

  // 1. Filter Departments based on chosen Company GstNumber
  const filteredDepartments = React.useMemo(() => {
    if (!formData.companyName) return [];
    const selectedCompany = companies.find(c => c.companyName === formData.companyName);
    if (!selectedCompany) return [];
    
    const filtered = departments.filter(d => d.companyGstNumber === selectedCompany.gstNumber);
    return filtered.length > 0 ? filtered : departments;
  }, [formData.companyName, departments, companies]);

  // 2. Filter Designations based on chosen Department
  const filteredDesignations = React.useMemo(() => {
    if (!formData.department) return [];
    const selectedDept = departments.find(d => d.name === formData.department);
    if (!selectedDept) return [];
    
    const filtered = designations.filter(d => d.departmentId === selectedDept.id);
    if (filtered.length === 0) {
      const seen = new Set();
      return designations.filter(d => {
        const duplicate = seen.has(d.designationName);
        seen.add(d.designationName);
        return !duplicate;
      });
    }
    return filtered;
  }, [formData.department, designations, departments]);

  // 3. Filter Employees based on chosen Designation
  const filteredEmployees = React.useMemo(() => {
    if (!formData.designation) return [];
    
    // First try filtering from DesignationOfficers assignments matching this designation
    const officers = designations
      .filter(d => d.designationName === formData.designation)
      .map(d => ({
        id: d.id,
        name: d.officerName,
        mobile: d.mobileNumber,
        startTime: d.startTime,
        endTime: d.endTime
      }));
    if (officers.length > 0) return officers;

    // Fallback: employees table
    return employees
      .filter(e => e.role?.toLowerCase() === formData.designation.toLowerCase())
      .map(e => ({
        id: e.id,
        name: e.name,
        mobile: e.mobile || ''
      }));
  }, [formData.designation, employees, designations]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    let { name, value, type } = e.target as HTMLInputElement;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      if (name === 'mobile') {
        value = value.replace(/[^0-9]/g, '').substring(0, 10);
      }

      // Reset dependents when company changes
      if (name === 'companyName') {
        const selected = companies.find(c => c.companyName === value);
        setFormData(prev => ({
          ...prev,
          companyName: value,
          gstNumber: selected ? selected.gstNumber : '',
          department: '',
          designation: '',
          officerName: '',
          mobile: ''
        }));
      }
      // Reset dependents when department changes
      else if (name === 'department') {
        setFormData(prev => ({
          ...prev,
          department: value,
          designation: '',
          officerName: '',
          mobile: ''
        }));
      }
      // Reset dependents when designation changes
      else if (name === 'designation') {
        setFormData(prev => ({
          ...prev,
          designation: value,
          officerName: '',
          mobile: ''
        }));
      }
      // Auto-fill mobile number when employee/officer is selected!
      else if (name === 'officerName') {
        const selectedEmp = filteredEmployees.find(e => e.name === value);
        setFormData(prev => ({
          ...prev,
          officerName: value,
          mobile: selectedEmp ? (selectedEmp.mobile || '') : ''
        }));
      }
      else {
        setFormData(prev => ({ ...prev, [name]: value }));
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

  const handleEdit = (record: SubGst) => {
    setEditingId(record.id || null);
    setFormData({
      companyName: record.companyName,
      department: record.department,
      officerName: record.officerName,
      mobile: record.mobile,
      gstNumber: record.gstNumber,
      designation: record.designation || '',
      remarks: record.remarks,
      status: record.status
    });
    setErrors({});
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({
      companyName: '', department: '', officerName: '',
      mobile: '', gstNumber: '', designation: '', remarks: '', status: true
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
        ? 'http://localhost:5076/api/subgsts/edit'
        : 'http://localhost:5076/api/subgsts';

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
      {/* Header */}
      <div className="mb-8 border-b border-gray-100 pb-4">
        <h1 className="text-xl font-bold text-gray-800 tracking-tight">
          {isMasterPage ? 'Department - Designation - Officer Master' : 'Sub GST Details'}
        </h1>
        <p className="text-xs text-gray-400 font-medium">
          {isMasterPage 
            ? 'Create and link client departments, designations, and active officers under unique reference keys' 
            : 'Configure Sub GST settings for companies, departments, and active officers'}
        </p>
      </div>

      {/* Header Form */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
              {filteredDepartments.map((dept: any) => (
                <option key={dept.id} value={dept.name}>{dept.name}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="block text-[13px] font-medium text-gray-500">Designation</label>
          <div className="relative">
            <select
              name="designation"
              value={formData.designation}
              onChange={handleInputChange}
              className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all appearance-none text-sm"
            >
              <option value="">Select Designation</option>
              {filteredDesignations.map((desg: any, index: number) => (
                <option key={index} value={desg.designationName}>{desg.designationName}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="block text-[13px] font-medium text-gray-500">Officer Name</label>
          <div className="relative">
            <select
              name="officerName"
              value={formData.officerName}
              onChange={handleInputChange}
              className={`w-full px-4 py-2.5 bg-white border rounded focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all appearance-none text-sm ${errors.officerName ? 'border-red-500 focus:ring-red-500/20' : 'border-gray-200'}`}
            >
              <option value="">Select Officer Name</option>
              {filteredEmployees.map((emp: any, index: number) => {
                let dateLabel = '';
                if (emp.startTime) {
                  const startStr = new Date(emp.startTime).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
                  const endStr = emp.endTime 
                    ? new Date(emp.endTime).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
                    : 'Present';
                  dateLabel = ` (${startStr} - ${endStr})`;
                }
                return (
                  <option key={index} value={emp.name}>
                    {emp.name}{dateLabel}
                  </option>
                );
              })}
            </select>
            <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
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

        <div className="md:col-start-2 md:col-span-1 flex gap-2 items-end">
          <button
            onClick={handleSave}
            className={`flex-1 py-2.5 text-white font-bold rounded-md transition-colors shadow-sm ${editingId ? 'bg-amber-500 hover:bg-amber-600' : 'bg-[#0061f2] hover:bg-blue-700'}`}
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
        {isMasterPage ? (
          <table className="w-full text-sm text-left border-collapse">
            <thead>
              <tr className="bg-[#f8f9fc] border-b border-gray-100">
                <th className="px-6 py-4 font-bold text-gray-600 uppercase tracking-tight">Combination Name</th>
                <th className="px-6 py-4 font-bold text-gray-600 uppercase tracking-tight">Department</th>
                <th className="px-6 py-4 font-bold text-gray-600 uppercase tracking-tight">Designation</th>
                <th className="px-6 py-4 font-bold text-gray-600 uppercase tracking-tight">Officer Name</th>
                <th className="px-6 py-4 font-bold text-gray-600 uppercase tracking-tight text-center">Status</th>
                <th className="px-6 py-4 font-bold text-gray-600 uppercase tracking-tight text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr><td colSpan={6} className="py-10 text-center"><div className="animate-spin inline-block w-6 h-6 border-2 border-blue-600 rounded-full border-t-transparent"></div></td></tr>
              ) : records.length === 0 ? (
                <tr><td colSpan={6} className="py-10 text-center text-gray-400">No records found.</td></tr>
              ) : records.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-6 py-5 font-semibold text-blue-600">{record.departmentOfficer || `${record.department} - ${record.designation} - ${record.officerName}`}</td>
                  <td className="px-6 py-5 text-gray-500">{record.department}</td>
                  <td className="px-6 py-5 text-gray-500 uppercase">{record.designation}</td>
                  <td className="px-6 py-5 text-gray-500 uppercase">{record.officerName}</td>
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
        ) : (
          <table className="w-full text-sm text-left border-collapse">
            <thead>
              <tr className="bg-[#f8f9fc] border-b border-gray-100">
                <th className="px-6 py-4 font-bold text-gray-600 uppercase tracking-tight">Company</th>
                <th className="px-6 py-4 font-bold text-gray-600 uppercase tracking-tight">GST Number</th>
                <th className="px-6 py-4 font-bold text-gray-600 uppercase tracking-tight">Department</th>
                <th className="px-6 py-4 font-bold text-gray-600 uppercase tracking-tight">Designation</th>
                <th className="px-6 py-4 font-bold text-gray-600 uppercase tracking-tight">Officer</th>
                <th className="px-6 py-4 font-bold text-gray-600 uppercase tracking-tight">Mobile Number</th>
                <th className="px-6 py-4 font-bold text-gray-600 uppercase tracking-tight">Remarks</th>
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
                  <td className="px-6 py-5 font-medium text-gray-600">{record.companyName}</td>
                  <td className="px-6 py-5 text-gray-500">{record.gstNumber}</td>
                  <td className="px-6 py-5 text-gray-500">{record.department}</td>
                  <td className="px-6 py-5 text-gray-500 uppercase">{record.designation}</td>
                  <td className="px-6 py-5 text-gray-500 uppercase">{record.officerName}</td>
                  <td className="px-6 py-5 text-gray-500">{record.mobile}</td>
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
        )}
      </div>
    </div>
  );
}
