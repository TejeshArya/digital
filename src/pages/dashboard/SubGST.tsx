import React, { useState, useEffect } from 'react';
import { Search, Edit, Trash2, Eye, X, ChevronDown, Calendar, Phone } from 'lucide-react';

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
  startDate?: string;
  endDate?: string;
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

  // Form Data
  const [formData, setFormData] = useState<SubGst>({
    companyName: '',
    department: '',
    officerName: '',
    mobile: '',
    gstNumber: '',
    designation: '',
    remarks: '',
    status: true,
    startDate: '',
    endDate: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [editingId, setEditingId] = useState<number | null>(null);

  // Autocomplete suggestion popup visibility states
  const [showCompanySuggestions, setShowCompanySuggestions] = useState(false);
  const [showDeptSuggestions, setShowDeptSuggestions] = useState(false);
  const [showDesgSuggestions, setShowDesgSuggestions] = useState(false);

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
      setDepartments(Array.isArray(data) ? data : data?.value ?? []);
    } catch (error) {
      console.error('Error fetching departments:', error);
      setDepartments([]);
    }
  };

  const fetchDesignations = async () => {
    try {
      const response = await fetch('http://localhost:5076/api/designationofficers');
      const data = await response.json();
      setDesignations(Array.isArray(data) ? data : data?.value ?? []);
    } catch (error) {
      console.error('Error fetching designations:', error);
      setDesignations([]);
    }
  };

  const fetchEmployees = async () => {
    try {
      const response = await fetch('http://localhost:5076/api/employees');
      const data = await response.json();
      setEmployees(Array.isArray(data) ? data : data?.value ?? []);
    } catch (error) {
      console.error('Error fetching employees:', error);
      setEmployees([]);
    }
  };

  const fetchRecords = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5076/api/subgsts');
      const data = await response.json();
      const rawList = Array.isArray(data) ? data : data?.value ?? [];
      const mapped = rawList.map((item: any) => ({
        ...item,
        startDate: item.startDate ? item.startDate.split('T')[0] : '',
        endDate: item.endDate ? item.endDate.split('T')[0] : ''
      }));
      setRecords(mapped);
    } catch (error) {
      console.error('Error fetching records:', error);
      setRecords([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchCompanies = async () => {
    try {
      const response = await fetch('http://localhost:5076/api/companygsts');
      const data = await response.json();
      setCompanies(Array.isArray(data) ? data : data?.value ?? []);
    } catch (error) {
      console.error('Error fetching companies:', error);
      setCompanies([]);
    }
  };

  // Filtered lists for suggestions based on current selected values
  const filteredDepartments = React.useMemo(() => {
    if (!formData.companyName) return [];
    const selectedCompany = companies.find(c => c.companyName.toLowerCase() === formData.companyName.toLowerCase());
    if (!selectedCompany) return [];
    
    const filtered = departments.filter(d => d.companyGstNumber === selectedCompany.gstNumber);
    return filtered.length > 0 ? filtered : departments;
  }, [formData.companyName, departments, companies]);

  const filteredDesignations = React.useMemo(() => {
    if (!formData.department) return [];
    const selectedDept = departments.find(d => d.name.toLowerCase() === formData.department.toLowerCase());
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

  const filteredEmployees = React.useMemo<Array<{
    id: any;
    name: any;
    mobile: any;
    startTime?: string;
    endTime?: string;
  }>>(() => {
    if (!formData.designation) return [];
    
    const officers = designations
      .filter(d => d.designationName.toLowerCase() === formData.designation.toLowerCase())
      .map(d => ({
        id: d.id,
        name: d.officerName,
        mobile: d.mobileNumber,
        startTime: d.startTime,
        endTime: d.endTime
      }));
    if (officers.length > 0) return officers;

    return employees
      .filter(e => e.role?.toLowerCase() === formData.designation.toLowerCase())
      .map(e => ({
        id: e.id,
        name: e.name,
        mobile: e.mobile || ''
      }));
  }, [formData.designation, employees, designations]);

  // Autocomplete typing filtering
  const filteredCompanySuggestions = React.useMemo(() => {
    if (!formData.companyName) return companies;
    return companies.filter(c => 
      c.companyName.toLowerCase().includes(formData.companyName.toLowerCase())
    );
  }, [companies, formData.companyName]);

  const filteredDeptSuggestions = React.useMemo(() => {
    const list = filteredDepartments.length > 0 ? filteredDepartments : departments;
    if (!formData.department) return list;
    return list.filter(d => 
      d.name.toLowerCase().includes(formData.department.toLowerCase())
    );
  }, [filteredDepartments, departments, formData.department]);

  const filteredDesgSuggestions = React.useMemo(() => {
    const list = filteredDesignations.length > 0 ? filteredDesignations : designations;
    if (!formData.designation) return list;
    return list.filter(d => 
      (d.designationName || d.name || '').toLowerCase().includes(formData.designation.toLowerCase())
    );
  }, [filteredDesignations, designations, formData.designation]);



  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      if (name === 'mobile') {
        value = value.replace(/[^0-9]/g, '').substring(0, 10);
      }
      
      setFormData(prev => {
        const updated = { ...prev, [name]: value };
        
        if (name === 'companyName') {
          const selected = companies.find(c => c.companyName.toLowerCase() === value.toLowerCase());
          updated.gstNumber = selected ? selected.gstNumber : '';
          updated.department = '';
          updated.designation = '';
          updated.officerName = '';
          updated.mobile = '';
        } else if (name === 'department') {
          updated.designation = '';
          updated.officerName = '';
          updated.mobile = '';
        } else if (name === 'designation') {
          updated.officerName = '';
          updated.mobile = '';
        } else if (name === 'officerName') {
          const matchedEmp = filteredEmployees.find(emp => emp.name.toLowerCase() === value.toLowerCase());
          if (matchedEmp) {
            updated.mobile = matchedEmp.mobile || '';
            if (matchedEmp.startTime) updated.startDate = matchedEmp.startTime.split('T')[0];
            if (matchedEmp.endTime) updated.endDate = matchedEmp.endTime.split('T')[0];
          }
        }
        
        return updated;
      });
    }

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Autocomplete Selectors
  const handleSelectCompany = (company: Company) => {
    setFormData(prev => ({
      ...prev,
      companyName: company.companyName,
      gstNumber: company.gstNumber,
      department: '',
      designation: '',
      officerName: '',
      mobile: ''
    }));
    setShowCompanySuggestions(false);
  };

  const handleSelectDepartment = (deptName: string) => {
    setFormData(prev => ({
      ...prev,
      department: deptName,
      designation: '',
      officerName: '',
      mobile: ''
    }));
    setShowDeptSuggestions(false);
  };

  const handleSelectDesignation = (desgName: string) => {
    setFormData(prev => ({
      ...prev,
      designation: desgName,
      officerName: '',
      mobile: ''
    }));
    setShowDesgSuggestions(false);
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
      status: record.status,
      startDate: record.startDate ? record.startDate.split('T')[0] : '',
      endDate: record.endDate ? record.endDate.split('T')[0] : ''
    });
    setErrors({});
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({
      companyName: '',
      department: '',
      officerName: '',
      mobile: '',
      gstNumber: '',
      designation: '',
      remarks: '',
      status: true,
      startDate: '',
      endDate: ''
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

      const body = {
        ...formData,
        id: editingId || 0,
        startDate: formData.startDate ? new Date(formData.startDate).toISOString() : null,
        endDate: formData.status ? null : (formData.endDate ? new Date(formData.endDate).toISOString() : null)
      };

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
        
        {/* Record ID Field */}
        <div className="space-y-1.5">
          <label className="block text-[13px] font-medium text-gray-500">Record ID (Primary Key)</label>
          <input
            type="text"
            disabled
            value={editingId ? `ID: ${editingId}` : 'AUTO-ASSIGNED'}
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded text-sm text-gray-400 cursor-not-allowed focus:outline-none"
          />
        </div>

        {/* Company Name Input with Autocomplete */}
        <div className="space-y-1.5 relative">
          <label className="block text-[13px] font-medium text-gray-500">Company Name</label>
          <div className="relative">
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleInputChange}
              onFocus={() => setShowCompanySuggestions(true)}
              onBlur={() => setTimeout(() => setShowCompanySuggestions(false), 200)}
              placeholder="Search Company"
              autoComplete="off"
              className={`w-full px-4 py-2.5 bg-white border rounded focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all text-sm placeholder-gray-400 ${
                errors.companyName ? 'border-red-500 focus:ring-red-500/20' : 'border-gray-200'
              }`}
            />
            <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-gray-400 pointer-events-none" />
            
            {showCompanySuggestions && filteredCompanySuggestions.length > 0 && (
              <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded shadow-lg max-h-60 overflow-y-auto divide-y divide-gray-100">
                {filteredCompanySuggestions.map((c, i) => (
                  <div
                    key={i}
                    onMouseDown={() => handleSelectCompany(c)}
                    className="px-4 py-2.5 hover:bg-blue-50 cursor-pointer text-xs text-slate-700 transition-colors flex justify-between items-center"
                  >
                    <span className="font-semibold">{c.companyName}</span>
                    <span className="text-[10px] font-mono bg-gray-100 px-1.5 py-0.5 rounded text-gray-500">{c.gstNumber}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          {errors.companyName && <p className="text-red-500 text-[10px] mt-1 font-bold uppercase tracking-tight">{errors.companyName}</p>}
        </div>

        {/* GST Number Field (Auto-Populated) */}
        <div className="space-y-1.5">
          <label className="block text-[13px] font-medium text-gray-500">GST Number</label>
          <input
            type="text"
            name="gstNumber"
            value={formData.gstNumber}
            readOnly
            placeholder="GST Number"
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded text-sm text-gray-400 cursor-not-allowed focus:outline-none font-mono"
          />
        </div>

        {/* Department Field with Autocomplete */}
        <div className="space-y-1.5 relative">
          <label className="block text-[13px] font-medium text-gray-500">Department</label>
          <div className="relative">
            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleInputChange}
              onFocus={() => setShowDeptSuggestions(true)}
              onBlur={() => setTimeout(() => setShowDeptSuggestions(false), 200)}
              placeholder="Search Department"
              autoComplete="off"
              className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all text-sm placeholder-gray-400"
            />
            <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-gray-400 pointer-events-none" />

            {showDeptSuggestions && filteredDeptSuggestions.length > 0 && (
              <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded shadow-lg max-h-60 overflow-y-auto divide-y divide-gray-100">
                {filteredDeptSuggestions.map((dept, i) => (
                  <div
                    key={i}
                    onMouseDown={() => handleSelectDepartment(dept.name)}
                    className="px-4 py-2.5 hover:bg-blue-50 cursor-pointer text-xs text-slate-700 font-semibold uppercase transition-colors"
                  >
                    {dept.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Designation Field with Autocomplete */}
        <div className="space-y-1.5 relative">
          <label className="block text-[13px] font-medium text-gray-500">Designation</label>
          <div className="relative">
            <input
              type="text"
              name="designation"
              value={formData.designation}
              onChange={handleInputChange}
              onFocus={() => setShowDesgSuggestions(true)}
              onBlur={() => setTimeout(() => setShowDesgSuggestions(false), 200)}
              placeholder="Search Designation"
              autoComplete="off"
              className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all text-sm placeholder-gray-400"
            />
            <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-gray-400 pointer-events-none" />

            {showDesgSuggestions && filteredDesgSuggestions.length > 0 && (
              <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded shadow-lg max-h-60 overflow-y-auto divide-y divide-gray-100">
                {filteredDesgSuggestions.map((desg, i) => (
                  <div
                    key={i}
                    onMouseDown={() => handleSelectDesignation(desg.designationName || desg.name)}
                    className="px-4 py-2.5 hover:bg-blue-50 cursor-pointer text-xs text-slate-700 font-semibold uppercase transition-colors"
                  >
                    {desg.designationName || desg.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Officer Name Field */}
        <div className="space-y-1.5">
          <label className="block text-[13px] font-medium text-gray-500">Officer Name</label>
          <input
            type="text"
            name="officerName"
            value={formData.officerName}
            onChange={handleInputChange}
            placeholder="Officer Name"
            className={`w-full px-4 py-2.5 bg-white border rounded focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all text-sm placeholder-gray-400 ${
              errors.officerName ? 'border-red-500 focus:ring-red-500/20' : 'border-gray-200'
            }`}
          />
          {errors.officerName && <p className="text-red-500 text-[10px] mt-1 font-bold uppercase tracking-tight">{errors.officerName}</p>}
        </div>

        {/* Mobile Number Field */}
        <div className="space-y-1.5">
          <label className="block text-[13px] font-medium text-gray-500">Mobile Number</label>
          <input
            type="text"
            name="mobile"
            value={formData.mobile}
            onChange={handleInputChange}
            placeholder="Mobile Number"
            maxLength={10}
            className={`w-full px-4 py-2.5 bg-white border rounded focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all text-sm placeholder-gray-400 ${
              errors.mobile ? 'border-red-500 focus:ring-red-500/20' : 'border-gray-200'
            }`}
          />
          {errors.mobile && <p className="text-red-500 text-[10px] mt-1 font-bold uppercase tracking-tight">{errors.mobile}</p>}
        </div>

        {/* Start Date */}
        <div className="space-y-1.5">
          <label className="block text-[13px] font-medium text-gray-500">Start Date</label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate || ''}
            onChange={handleInputChange}
            className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all text-sm text-slate-600"
          />
        </div>

        {/* End Date */}
        <div className="space-y-1.5">
          <label className="block text-[13px] font-medium text-gray-500">End Date</label>
          <input
            type="date"
            name="endDate"
            disabled={formData.status}
            value={formData.status ? '' : (formData.endDate || '')}
            onChange={handleInputChange}
            className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all text-sm text-slate-600 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
          />
        </div>

        {/* Remarks */}
        <div className="space-y-1.5">
          <label className="block text-[13px] font-medium text-gray-500">Remarks</label>
          <input
            type="text"
            name="remarks"
            value={formData.remarks}
            onChange={handleInputChange}
            placeholder="Remarks"
            className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all text-sm placeholder-gray-400"
          />
        </div>

        {/* Active Status Checkbox */}
        <div className="flex items-center gap-2 pt-8">
          <input
            type="checkbox"
            id="status"
            name="status"
            checked={formData.status}
            onChange={(e) => {
              const checked = e.target.checked;
              setFormData(prev => ({
                ...prev,
                status: checked,
                endDate: checked ? '' : prev.endDate
              }));
            }}
            className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
          />
          <label htmlFor="status" className="text-xs font-semibold text-gray-500 cursor-pointer select-none uppercase">
            Active Status
          </label>
        </div>

        {/* Save/Cancel Action Buttons */}
        <div className="flex gap-2 items-end">
          <button
            onClick={handleSave}
            className={`flex-1 py-2.5 text-white font-bold rounded transition-colors shadow-sm text-sm uppercase tracking-wider ${
              editingId ? 'bg-amber-500 hover:bg-amber-600' : 'bg-[#0061f2] hover:bg-blue-700'
            }`}
          >
            {editingId ? 'Update' : 'Save'}
          </button>
          {editingId && (
            <button
              onClick={handleCancel}
              className="py-2.5 px-4 bg-gray-200 text-gray-700 font-bold rounded hover:bg-gray-300 transition-colors shadow-sm text-sm uppercase"
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
                <th className="px-6 py-4 font-bold text-gray-600 uppercase tracking-tight">ID (PK)</th>
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
                <tr>
                  <td colSpan={7} className="py-10 text-center">
                    <div className="animate-spin inline-block w-6 h-6 border-2 border-blue-600 rounded-full border-t-transparent"></div>
                  </td>
                </tr>
              ) : records.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-10 text-center text-gray-400 font-medium">
                    No records found.
                  </td>
                </tr>
              ) : (
                records.map((record) => (
                  <tr key={record.id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-6 py-5 font-mono text-blue-600 font-bold">#{record.id}</td>
                    <td className="px-6 py-5 font-semibold text-blue-600">
                      {record.departmentOfficer || `${record.department} - ${record.designation} - ${record.officerName}`}
                    </td>
                    <td className="px-6 py-5 text-gray-500">{record.department}</td>
                    <td className="px-6 py-5 text-gray-500 uppercase">{record.designation}</td>
                    <td className="px-6 py-5 text-gray-500 uppercase">{record.officerName}</td>
                    <td className="px-6 py-5 text-center">
                      <span className={`inline-block px-2.5 py-1 rounded text-[10px] font-bold uppercase ${
                        record.status ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {record.status ? 'Active' : 'Disabled'}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex gap-2 justify-center">
                        <button
                          onClick={() => handleEdit(record)}
                          className="px-3 py-1 bg-amber-500 text-white text-[11px] font-bold rounded hover:bg-amber-600 transition-colors shadow-sm"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => record.id && handleDelete(record.id)}
                          className="px-3 py-1 bg-red-600 text-white text-[11px] font-bold rounded hover:bg-red-700 transition-colors shadow-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        ) : (
          <table className="w-full text-sm text-left border-collapse">
            <thead>
              <tr className="bg-[#f8f9fc] border-b border-gray-100">
                <th className="px-6 py-4 font-bold text-gray-600 uppercase tracking-tight">ID (PK)</th>
                <th className="px-6 py-4 font-bold text-gray-600 uppercase tracking-tight">Company</th>
                <th className="px-6 py-4 font-bold text-gray-600 uppercase tracking-tight">GST Number</th>
                <th className="px-6 py-4 font-bold text-gray-600 uppercase tracking-tight">Department</th>
                <th className="px-6 py-4 font-bold text-gray-600 uppercase tracking-tight">Designation</th>
                <th className="px-6 py-4 font-bold text-gray-600 uppercase tracking-tight">Officer Details</th>
                <th className="px-6 py-4 font-bold text-gray-600 uppercase tracking-tight">Dates Period</th>
                <th className="px-6 py-4 font-bold text-gray-600 uppercase tracking-tight">Remarks</th>
                <th className="px-6 py-4 font-bold text-gray-600 uppercase tracking-tight text-center">Status</th>
                <th className="px-6 py-4 font-bold text-gray-600 uppercase tracking-tight text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr>
                  <td colSpan={10} className="py-10 text-center">
                    <div className="animate-spin inline-block w-6 h-6 border-2 border-blue-600 rounded-full border-t-transparent"></div>
                  </td>
                </tr>
              ) : records.length === 0 ? (
                <tr>
                  <td colSpan={10} className="py-10 text-center text-gray-400 font-medium">
                    No records found.
                  </td>
                </tr>
              ) : (
                records.map((record) => (
                  <tr key={record.id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-6 py-5 font-mono text-blue-600 font-bold">#{record.id}</td>
                    <td className="px-6 py-5 font-medium text-gray-600">{record.companyName}</td>
                    <td className="px-6 py-5 text-gray-500 font-mono text-xs">{record.gstNumber}</td>
                    <td className="px-6 py-5 text-gray-500">{record.department}</td>
                    <td className="px-6 py-5 text-gray-500 uppercase">{record.designation}</td>
                    <td className="px-6 py-5 text-gray-600 font-semibold uppercase">
                      <div>{record.officerName}</div>
                      {record.mobile && (
                        <div className="text-[10px] text-gray-400 mt-0.5 font-medium flex items-center gap-1">
                          <Phone className="w-2.5 h-2.5 text-gray-400" />
                          {record.mobile}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-5 text-gray-500 text-[11px]">
                      {record.startDate || record.endDate ? (
                        <div className="space-y-1">
                          {record.startDate && (
                            <div className="flex items-center gap-1 text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded w-max">
                              <Calendar className="w-3 h-3" />
                              {new Date(record.startDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                            </div>
                          )}
                          {record.endDate ? (
                            <div className="flex items-center gap-1 text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded w-max">
                              <Calendar className="w-3 h-3" />
                              {new Date(record.endDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                            </div>
                          ) : (
                            <div className="flex items-center gap-1 text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded w-max text-[10px] font-bold uppercase tracking-wider">
                              Present
                            </div>
                          )}
                        </div>
                      ) : (
                        <span className="text-gray-400 italic text-xs">No Period Defined</span>
                      )}
                    </td>
                    <td className="px-6 py-5 text-gray-400 text-xs italic max-w-[120px] truncate" title={record.remarks}>
                      {record.remarks || 'No remarks'}
                    </td>
                    <td className="px-6 py-5 text-center">
                      <span className={`inline-block px-2.5 py-1 rounded text-[10px] font-bold uppercase ${
                        record.status ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {record.status ? 'Active' : 'Disabled'}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex gap-2 justify-center">
                        <button
                          onClick={() => handleEdit(record)}
                          className="px-3 py-1 bg-amber-500 text-white text-[11px] font-bold rounded hover:bg-amber-600 transition-colors shadow-sm"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => record.id && handleDelete(record.id)}
                          className="px-3 py-1 bg-red-600 text-white text-[11px] font-bold rounded hover:bg-red-700 transition-colors shadow-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
