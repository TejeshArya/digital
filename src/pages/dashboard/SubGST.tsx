import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Search, Edit, Trash2, Eye, X, ChevronDown, Calendar, 
  Phone, Building2, Check, AlertCircle, Sparkles, RefreshCw, 
  Briefcase, ShieldCheck, Pause, Play, FileText, UserCheck, 
  UserPlus, HelpCircle, Plus, Filter
} from 'lucide-react';

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
  createdAt?: string;
}

interface Company {
  gstNumber: string;
  companyName: string;
  stateName?: string;
  mobileNumber?: string;
  email?: string;
}

interface Department {
  id: number;
  name: string;
  companyGstNumber?: string;
}

interface DesignationOfficer {
  id: number;
  designationName: string;
  officerName: string;
  mobileNumber: string;
  startTime?: string;
  endTime?: string;
  departmentId?: number;
}

interface Employee {
  id: number;
  name: string;
  email: string;
  mobile?: string;
  role?: string;
  status?: string;
  departmentId?: number;
}

interface SubGSTProps {
  isMasterPage?: boolean;
}

export function SubGST({ isMasterPage = false }: SubGSTProps) {
  // DB States
  const [records, setRecords] = useState<SubGst[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [designations, setDesignations] = useState<DesignationOfficer[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);

  // App UX States
  const [loading, setLoading] = useState<boolean>(true);
  const [saveLoading, setSaveLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  
  // Modal & Popup States
  const [showFormModal, setShowFormModal] = useState<boolean>(false);
  const [showViewModal, setShowViewModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  
  const [selectedRecord, setSelectedRecord] = useState<SubGst | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);

  // Custom Toast state
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  // Form State
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

  // Autocomplete suggestion popup visibility states
  const [showCompanySuggestions, setShowCompanySuggestions] = useState(false);
  const [showDeptSuggestions, setShowDeptSuggestions] = useState(false);
  const [showDesgSuggestions, setShowDesgSuggestions] = useState(false);
  const [showOfficerSuggestions, setShowOfficerSuggestions] = useState(false);

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
      const [subGstRes, compRes, deptRes, desgRes, empRes] = await Promise.all([
        fetch('http://localhost:5076/api/subgsts'),
        fetch('http://localhost:5076/api/companygsts'),
        fetch('http://localhost:5076/api/departments'),
        fetch('http://localhost:5076/api/designationofficers'),
        fetch('http://localhost:5076/api/employees')
      ]);

      if (subGstRes.ok) {
        const data = await subGstRes.json();
        const mapped = data.map((item: any) => ({
          ...item,
          startDate: item.startDate ? item.startDate.split('T')[0] : '',
          endDate: item.endDate ? item.endDate.split('T')[0] : ''
        }));
        setRecords(mapped);
      } else {
        triggerToast('Failed to load Sub GST records', 'error');
      }

      if (compRes.ok) {
        const compData = await compRes.json();
        setCompanies(compData);
      }

      if (deptRes.ok) {
        const deptData = await deptRes.json();
        setDepartments(deptData);
      }

      if (desgRes.ok) {
        const desgData = await desgRes.json();
        setDesignations(desgData);
      }

      if (empRes.ok) {
        const empData = await empRes.json();
        setEmployees(empData);
      }

    } catch (error) {
      console.error('Error fetching dynamic entities:', error);
      triggerToast('Database server offline or unreachable', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    fetchInitialData();
    triggerToast('Database synced successfully', 'info');
  };

  // context-sensitive auto-suggestion calculations
  const filteredDepartments = useMemo(() => {
    if (!formData.companyName) return departments;
    const selectedCompany = companies.find(c => c.companyName.toLowerCase() === formData.companyName.toLowerCase());
    if (!selectedCompany) return departments;
    
    const filtered = departments.filter(d => d.companyGstNumber === selectedCompany.gstNumber);
    return filtered.length > 0 ? filtered : departments;
  }, [formData.companyName, departments, companies]);

  const filteredDesignations = useMemo(() => {
    if (!formData.department) return designations;
    const selectedDept = departments.find(d => d.name.toLowerCase() === formData.department.toLowerCase());
    if (!selectedDept) {
      const seen = new Set();
      return designations.filter(d => {
        const duplicate = seen.has(d.designationName);
        seen.add(d.designationName);
        return !duplicate;
      });
    }
    
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

  const filteredEmployees = useMemo(() => {
    if (!formData.designation) return [];
    
    const officers = designations
      .filter(d => d.designationName.toLowerCase() === formData.designation.toLowerCase())
      .map(d => ({
        name: d.officerName,
        mobile: d.mobileNumber,
        startTime: d.startTime,
        endTime: d.endTime,
        source: 'Designation Directory'
      }));
      
    const matchesFromEmployees = employees
      .filter(e => e.role?.toLowerCase() === formData.designation.toLowerCase())
      .map(e => ({
        name: e.name,
        mobile: e.mobile || '',
        startTime: undefined,
        endTime: undefined,
        source: 'Employee Roster'
      }));

    const combined = [...officers];
    matchesFromEmployees.forEach(emp => {
      if (!combined.some(o => o.name.toLowerCase() === emp.name.toLowerCase())) {
        combined.push(emp);
      }
    });

    return combined;
  }, [formData.designation, employees, designations]);

  // Autocomplete suggestions based on input fields text
  const autocompleteCompanyList = useMemo(() => {
    if (!formData.companyName) return companies;
    return companies.filter(c => 
      c.companyName.toLowerCase().includes(formData.companyName.toLowerCase())
    );
  }, [companies, formData.companyName]);

  const autocompleteDeptList = useMemo(() => {
    const list = filteredDepartments;
    if (!formData.department) return list;
    return list.filter(d => 
      d.name.toLowerCase().includes(formData.department.toLowerCase())
    );
  }, [filteredDepartments, formData.department]);

  const autocompleteDesgList = useMemo(() => {
    const list = filteredDesignations;
    if (!formData.designation) return list;
    return list.filter(d => 
      (d.designationName || '').toLowerCase().includes(formData.designation.toLowerCase())
    );
  }, [filteredDesignations, formData.designation]);

  const autocompleteOfficerList = useMemo(() => {
    const list = filteredEmployees.length > 0 ? filteredEmployees : designations.map(d => ({
      name: d.officerName,
      mobile: d.mobileNumber,
      startTime: d.startTime,
      endTime: d.endTime,
      source: 'Designation Directory'
    }));

    if (!formData.officerName) return list;
    return list.filter(o => 
      o.name.toLowerCase().includes(formData.officerName.toLowerCase())
    );
  }, [filteredEmployees, designations, formData.officerName]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    let { name, value } = e.target;
    
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
        const matched = autocompleteOfficerList.find(o => o.name.toLowerCase() === value.toLowerCase());
        if (matched) {
          updated.mobile = matched.mobile || '';
          if (matched.startTime) updated.startDate = matched.startTime.split('T')[0];
          if (matched.endTime) updated.endDate = matched.endTime.split('T')[0];
        }
      }
      
      return updated;
    });

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

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

  const handleSelectOfficer = (officer: any) => {
    setFormData(prev => ({
      ...prev,
      officerName: officer.name,
      mobile: officer.mobile || '',
      startDate: officer.startTime ? officer.startTime.split('T')[0] : prev.startDate,
      endDate: officer.endTime ? officer.endTime.split('T')[0] : prev.endDate
    }));
    setShowOfficerSuggestions(false);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Company profile is required';
    }
    if (!formData.department.trim()) {
      newErrors.department = 'Department name is required';
    }
    if (!formData.designation.trim()) {
      newErrors.designation = 'Designation name is required';
    }
    if (!formData.officerName.trim()) {
      newErrors.officerName = 'Officer name is required';
    }

    const mobileRegex = /^[5-9][0-9]{9}$/;
    if (formData.mobile && !mobileRegex.test(formData.mobile)) {
      newErrors.mobile = 'Must be 10 digits starting with 5-9';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleOpenAddModal = () => {
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
    setShowFormModal(true);
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
    setShowFormModal(true);
  };

  const handleCancel = () => {
    setShowFormModal(false);
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

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setSaveLoading(true);
      const url = editingId
        ? 'http://localhost:5076/api/subgsts/edit'
        : 'http://localhost:5076/api/subgsts';

      // Retain CreatedAt on editing to prevent database timestamp loss
      let originalCreatedAt = new Date().toISOString();
      if (editingId) {
        const matched = records.find(r => r.id === editingId);
        if (matched?.createdAt) {
          originalCreatedAt = matched.createdAt;
        }
      }

      const body = {
        ...formData,
        id: editingId || 0,
        createdAt: originalCreatedAt,
        startDate: formData.startDate ? new Date(formData.startDate).toISOString() : null,
        endDate: formData.status ? null : (formData.endDate ? new Date(formData.endDate).toISOString() : null)
      };

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      if (response.ok) {
        triggerToast(
          editingId 
            ? `Record for "${body.officerName}" updated successfully` 
            : `Record for "${body.officerName}" registered successfully`, 
          'success'
        );
        fetchInitialData();
        setShowFormModal(false);
        handleCancel();
      } else {
        const err = await response.json().catch(() => ({}));
        triggerToast(err.message || 'Error occurred while saving Sub GST record', 'error');
      }
    } catch (error) {
      console.error('Error saving:', error);
      triggerToast('Connection timed out while writing records', 'error');
    } finally {
      setSaveLoading(false);
    }
  };

  const handleToggleStatus = async (record: SubGst) => {
    try {
      const updated = { 
        ...record, 
        status: !record.status,
        endDate: !record.status ? null : new Date().toISOString()
      };
      
      const res = await fetch('http://localhost:5076/api/subgsts/edit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated)
      });

      if (res.ok) {
        triggerToast(`Status for "${record.officerName}" updated to ${!record.status ? 'Active' : 'Disabled'}`, 'success');
        fetchInitialData();
      } else {
        triggerToast('Failed to toggle status', 'error');
      }
    } catch (err) {
      console.error(err);
      triggerToast('Server connection failed', 'error');
    }
  };

  const handleOpenDeleteModal = (record: SubGst) => {
    setSelectedRecord(record);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    if (!selectedRecord || !selectedRecord.id) return;

    try {
      setSaveLoading(true);
      const response = await fetch(`http://localhost:5076/api/subgsts/${selectedRecord.id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        triggerToast(`Officer record "${selectedRecord.officerName}" decommissioned successfully`, 'info');
        setRecords(prev => prev.filter(r => r.id !== selectedRecord.id));
        setShowDeleteModal(false);
        setSelectedRecord(null);
      } else {
        triggerToast('Failed to decommission from active directory', 'error');
      }
    } catch (error) {
      console.error('Error deleting:', error);
      triggerToast('Network error during deletion', 'error');
    } finally {
      setSaveLoading(false);
    }
  };

  const handleOpenViewModal = (record: SubGst) => {
    setSelectedRecord(record);
    setShowViewModal(true);
  };

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return 'N/A';
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr;
      
      const pad = (n: number) => n.toString().padStart(2, '0');
      const day = pad(d.getDate());
      const month = pad(d.getMonth() + 1);
      const year = d.getFullYear();
      let hours = d.getHours();
      const minutes = pad(d.getMinutes());
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12;
      return `${day}/${month}/${year} ${pad(hours)}:${minutes} ${ampm}`;
    } catch (e) {
      return dateStr;
    }
  };

  const formatLocalDateOnly = (dateStr?: string) => {
    if (!dateStr) return 'Present';
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr;
      return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
    } catch (e) {
      return dateStr;
    }
  };

  // Searching logic
  const filteredRecords = records.filter(record => {
    const searchLower = searchTerm.toLowerCase();
    const companyMatch = record.companyName.toLowerCase().includes(searchLower);
    const gstMatch = record.gstNumber.toLowerCase().includes(searchLower);
    const deptMatch = record.department.toLowerCase().includes(searchLower);
    const desgMatch = record.designation.toLowerCase().includes(searchLower);
    const officerMatch = record.officerName.toLowerCase().includes(searchLower);
    const combinationMatch = (record.departmentOfficer || '').toLowerCase().includes(searchLower);
    const remarksMatch = (record.remarks || '').toLowerCase().includes(searchLower);
    const idMatch = String(record.id).includes(searchLower);

    return companyMatch || gstMatch || deptMatch || desgMatch || officerMatch || combinationMatch || remarksMatch || idMatch;
  });

  // Dynamic Statistics
  const totalRecords = records.length;
  const activeRecords = records.filter(r => r.status).length;
  const inactiveRecords = records.filter(r => !r.status).length;
  const uniqueCompanies = new Set(records.map(r => r.companyName.toLowerCase())).size;
  const activeCombinations = records.filter(r => r.departmentOfficer && r.status).length;

  return (
    <div className="p-6 bg-slate-50 min-h-screen font-sans text-slate-800 relative">
      
      {/* Dynamic Floating Toast Alert Notifications */}
      {toast && (
        <div className="fixed top-6 right-6 z-[100] max-w-sm w-full bg-white border border-slate-100 rounded-xl shadow-2xl overflow-hidden transition-all duration-300 transform translate-y-0 scale-100 animate-slide-in">
          <div className="p-4 flex items-center gap-3">
            {toast.type === 'success' && (
              <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center shrink-0 shadow-inner">
                <Check className="w-4.5 h-4.5" />
              </div>
            )}
            {toast.type === 'error' && (
              <div className="w-8 h-8 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center shrink-0 shadow-inner">
                <AlertCircle className="w-4.5 h-4.5" />
              </div>
            )}
            {toast.type === 'info' && (
              <div className="w-8 h-8 rounded-full bg-cyan-50 text-cyan-500 flex items-center justify-center shrink-0 shadow-inner">
                <Sparkles className="w-4.5 h-4.5" />
              </div>
            )}
            <div className="flex-1">
              <p className="text-xs font-bold text-slate-700 leading-tight">{toast.message}</p>
            </div>
            <button onClick={() => setToast(null)} className="text-slate-400 hover:text-slate-600 transition-colors focus:outline-none">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className={`h-1.5 w-full ${
            toast.type === 'success' ? 'bg-emerald-500' : toast.type === 'error' ? 'bg-rose-500' : 'bg-cyan-500'
          }`} />
        </div>
      )}

      {/* Top Banner Card with Gradient */}
      <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-gradient-to-r from-[#0061f2] to-indigo-700 p-6 rounded-2xl shadow-lg shadow-indigo-600/15 text-white">
        <div>
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider font-extrabold text-indigo-200 mb-1">
            <Building2 className="w-3.5 h-3.5" /> DEE Client GST Infrastructure
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2.5">
            {isMasterPage ? 'DEPARTMENT - OFFICER MASTER DIRECTORY' : 'SUB GST CONFIGURATION'}
          </h1>
          <p className="text-xs text-indigo-100/90 font-medium mt-0.5 max-w-2xl">
            {isMasterPage 
              ? 'Establish unified operational indexes mapping client business sectors, structural roles, and active officers under unique identifiers.' 
              : 'Orchestrate client organization parameters, dynamic GST reference tags, divisional units, and operational timelines.'}
          </p>
        </div>
        
        <div className="flex gap-2 w-full md:w-auto shrink-0">
          <button 
            onClick={handleRefresh}
            className="p-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all shadow-sm flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-white/30"
            title="Refresh database entries"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <button 
            onClick={handleOpenAddModal}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-white text-indigo-700 text-xs font-black rounded-xl shadow-lg shadow-black/5 hover:bg-indigo-50 hover:scale-[1.01] active:scale-95 transition-all uppercase tracking-wider focus:outline-none"
          >
            <Plus className="w-4 h-4" /> Add New Record
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 text-blue-500/10 pointer-events-none group-hover:scale-110 transition-transform">
            <Building2 className="w-12 h-12" />
          </div>
          <div className="text-slate-400 text-[10px] font-black uppercase tracking-wider">Total Records</div>
          <div className="text-2xl font-black text-slate-800 mt-1">{loading ? '...' : totalRecords}</div>
          <div className="text-[9px] text-slate-400 font-bold mt-1.5 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span> Registered references
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 text-emerald-500/10 pointer-events-none group-hover:scale-110 transition-transform">
            <ShieldCheck className="w-12 h-12" />
          </div>
          <div className="text-slate-400 text-[10px] font-black uppercase tracking-wider">Active Associations</div>
          <div className="text-2xl font-black text-emerald-600 mt-1">{loading ? '...' : activeRecords}</div>
          <div className="text-[9px] text-slate-400 font-bold mt-1.5 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Fully operational
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 text-rose-500/10 pointer-events-none group-hover:scale-110 transition-transform">
            <Pause className="w-12 h-12" />
          </div>
          <div className="text-slate-400 text-[10px] font-black uppercase tracking-wider">Paused Indexes</div>
          <div className="text-2xl font-black text-slate-400 mt-1">{loading ? '...' : inactiveRecords}</div>
          <div className="text-[9px] text-slate-400 font-bold mt-1.5 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span> Deactivated timeline
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 text-cyan-500/10 pointer-events-none group-hover:scale-110 transition-transform">
            <Briefcase className="w-12 h-12" />
          </div>
          <div className="text-slate-400 text-[10px] font-black uppercase tracking-wider">
            {isMasterPage ? 'Active Combos' : 'Unique Companies'}
          </div>
          <div className="text-2xl font-black text-cyan-600 mt-1">
            {loading ? '...' : (isMasterPage ? activeCombinations : uniqueCompanies)}
          </div>
          <div className="text-[9px] text-slate-400 font-bold mt-1.5 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500"></span> 
            {isMasterPage ? 'Dynamic directory' : 'Assigned organizations'}
          </div>
        </div>
      </div>

      {/* Main Content Card Area */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden mb-6">
        
        {/* Table Filters & Toolbar */}
        <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="relative w-full sm:max-w-xs">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input 
              type="text"
              placeholder="Search by combination, company, GST, role..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#0061f2]/20 focus:border-[#0061f2] transition-all"
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')} 
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold focus:outline-none"
              >
                Clear
              </button>
            )}
          </div>
          
          <div className="flex items-center gap-3 text-xs text-slate-400 font-bold">
            <Filter className="w-4 h-4 text-slate-400" />
            <span>Showing {filteredRecords.length} of {records.length} items</span>
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          {loading ? (
            <div className="py-24 flex flex-col items-center justify-center gap-3">
              <div className="w-10 h-10 border-4 border-[#0061f2] border-t-transparent rounded-full animate-spin"></div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest animate-pulse">Accessing directory profiles...</p>
            </div>
          ) : filteredRecords.length === 0 ? (
            <div className="py-24 flex flex-col items-center justify-center gap-4 text-center">
              <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300">
                <Building2 className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-sm font-black text-slate-700 uppercase tracking-wider">No matching profiles found</h4>
                <p className="text-xs text-slate-400 font-bold mt-1 max-w-sm px-4">
                  There are no records matching your active filter credentials. Add a new configuration to start tracking!
                </p>
              </div>
              <button 
                onClick={handleOpenAddModal}
                className="mt-2 flex items-center gap-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10px] font-black rounded-xl uppercase tracking-wider transition-colors focus:outline-none"
              >
                <Plus className="w-3.5 h-3.5" /> Register New Combination
              </button>
            </div>
          ) : isMasterPage ? (
            /* Master Directory Table View */
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#323c4e] text-white text-[10px] uppercase tracking-wider font-extrabold">
                  <th className="px-6 py-4.5 border-r border-slate-600/30 w-16">ID</th>
                  <th className="px-6 py-4.5 border-r border-slate-600/30">Master Combination Designation</th>
                  <th className="px-6 py-4.5 border-r border-slate-600/30">Client Department</th>
                  <th className="px-6 py-4.5 border-r border-slate-600/30">Designation Role</th>
                  <th className="px-6 py-4.5 border-r border-slate-600/30">Assigned Officer</th>
                  <th className="px-6 py-4.5 border-r border-slate-600/30 text-center w-24">Status</th>
                  <th className="px-6 py-4.5 text-center w-36">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-[11px] font-semibold text-slate-600">
                {filteredRecords.map((record) => (
                  <tr key={record.id} className="hover:bg-slate-50/70 transition-colors group">
                    <td className="px-6 py-4 border-r border-slate-100 font-bold text-slate-400 group-hover:text-slate-600 transition-colors">
                      #{record.id}
                    </td>
                    <td className="px-6 py-4 border-r border-slate-100 font-extrabold text-blue-600 uppercase tracking-tight">
                      {record.departmentOfficer || `${record.department} - ${record.designation} - ${record.officerName}`}
                    </td>
                    <td className="px-6 py-4 border-r border-slate-100 text-slate-500 uppercase font-medium">
                      {record.department}
                    </td>
                    <td className="px-6 py-4 border-r border-slate-100 text-slate-500 uppercase font-bold tracking-tight">
                      {record.designation}
                    </td>
                    <td className="px-6 py-4 border-r border-slate-100 text-slate-700 uppercase font-bold">
                      {record.officerName}
                    </td>
                    <td className="px-6 py-4 border-r border-slate-100 text-center">
                      <button
                        onClick={() => handleToggleStatus(record)}
                        className={`inline-flex items-center gap-1.5 text-[9px] font-black px-2.5 py-1 rounded-full uppercase shadow-xs transition-all hover:scale-[1.03] active:scale-95 focus:outline-none ${
                          record.status 
                            ? 'bg-emerald-500 text-white hover:bg-emerald-600' 
                            : 'bg-slate-300 text-slate-600 hover:bg-slate-400'
                        }`}
                        title={`Click to mark as ${record.status ? 'Disabled' : 'Active'}`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${record.status ? 'bg-white animate-pulse' : 'bg-slate-500'}`}></span>
                        {record.status ? 'Active' : 'Disabled'}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center items-center gap-1">
                        <button 
                          onClick={() => handleOpenViewModal(record)}
                          className="p-1.5 bg-cyan-50 hover:bg-cyan-500 text-cyan-600 hover:text-white rounded-lg shadow-xs hover:shadow-cyan-100 transition-all focus:outline-none"
                          title="View detailed profiles"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button 
                          onClick={() => handleEdit(record)}
                          className="p-1.5 bg-yellow-50 hover:bg-yellow-500 text-yellow-600 hover:text-white rounded-lg shadow-xs hover:shadow-yellow-100 transition-all focus:outline-none"
                          title="Edit combination parameters"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button 
                          onClick={() => handleOpenDeleteModal(record)}
                          className="p-1.5 bg-red-50 hover:bg-red-500 text-red-600 hover:text-white rounded-lg shadow-xs hover:shadow-red-100 transition-all focus:outline-none"
                          title="Decommission combination"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            /* Sub GST Table View */
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#323c4e] text-white text-[10px] uppercase tracking-wider font-extrabold">
                  <th className="px-6 py-4.5 border-r border-slate-600/30 w-16">ID</th>
                  <th className="px-6 py-4.5 border-r border-slate-600/30">Client Company</th>
                  <th className="px-6 py-4.5 border-r border-slate-600/30">GST Reference</th>
                  <th className="px-6 py-4.5 border-r border-slate-600/30">Department</th>
                  <th className="px-6 py-4.5 border-r border-slate-600/30">Designation</th>
                  <th className="px-6 py-4.5 border-r border-slate-600/30">Officer Credentials</th>
                  <th className="px-6 py-4.5 border-r border-slate-600/30 w-32">Operational Period</th>
                  <th className="px-6 py-4.5 border-r border-slate-600/30">Remarks</th>
                  <th className="px-6 py-4.5 border-r border-slate-600/30 text-center w-24">Status</th>
                  <th className="px-6 py-4.5 text-center w-36">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-[11px] font-semibold text-slate-600">
                {filteredRecords.map((record) => (
                  <tr key={record.id} className="hover:bg-slate-50/70 transition-colors group">
                    <td className="px-6 py-4 border-r border-slate-100 font-bold text-slate-400 group-hover:text-slate-600 transition-colors">
                      #{record.id}
                    </td>
                    <td className="px-6 py-4 border-r border-slate-100 font-extrabold text-slate-700 uppercase tracking-tight">
                      {record.companyName}
                    </td>
                    <td className="px-6 py-4 border-r border-slate-100 font-mono text-[10px] text-slate-500">
                      {record.gstNumber}
                    </td>
                    <td className="px-6 py-4 border-r border-slate-100 text-slate-500 uppercase font-medium">
                      {record.department}
                    </td>
                    <td className="px-6 py-4 border-r border-slate-100 text-slate-500 uppercase font-bold tracking-tight">
                      {record.designation}
                    </td>
                    <td className="px-6 py-4 border-r border-slate-100 text-slate-700">
                      <div className="font-bold uppercase leading-normal">{record.officerName}</div>
                      {record.mobile && (
                        <div className="text-[9px] text-slate-400 mt-0.5 font-bold flex items-center gap-1">
                          <Phone className="w-2.5 h-2.5 text-slate-400 shrink-0" />
                          {record.mobile}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 border-r border-slate-100 text-slate-500 text-[9px] font-bold">
                      {record.startDate || record.endDate ? (
                        <div className="space-y-1">
                          {record.startDate && (
                            <div className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 border border-emerald-100/50 px-1.5 py-0.5 rounded">
                              <Calendar className="w-2.5 h-2.5" />
                              {formatLocalDateOnly(record.startDate)}
                            </div>
                          )}
                          <div className="block">
                            {record.status ? (
                              <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 border border-emerald-100/50 px-1.5 py-0.5 rounded text-[8px] tracking-wide font-black uppercase">
                                Present
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-rose-700 bg-rose-50 border border-rose-100/50 px-1.5 py-0.5 rounded">
                                <Calendar className="w-2.5 h-2.5" />
                                {formatLocalDateOnly(record.endDate)}
                              </span>
                            )}
                          </div>
                        </div>
                      ) : (
                        <span className="text-slate-400 italic text-[10px] font-medium">Not Defined</span>
                      )}
                    </td>
                    <td className="px-6 py-4 border-r border-slate-100 text-slate-400 text-[10px] font-medium italic max-w-[120px] truncate" title={record.remarks}>
                      {record.remarks || 'No additional remarks'}
                    </td>
                    <td className="px-6 py-4 border-r border-slate-100 text-center">
                      <button
                        onClick={() => handleToggleStatus(record)}
                        className={`inline-flex items-center gap-1.5 text-[9px] font-black px-2.5 py-1 rounded-full uppercase shadow-xs transition-all hover:scale-[1.03] active:scale-95 focus:outline-none ${
                          record.status 
                            ? 'bg-emerald-500 text-white hover:bg-emerald-600' 
                            : 'bg-slate-300 text-slate-600 hover:bg-slate-400'
                        }`}
                        title={`Click to mark as ${record.status ? 'Disabled' : 'Active'}`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${record.status ? 'bg-white animate-pulse' : 'bg-slate-500'}`}></span>
                        {record.status ? 'Active' : 'Disabled'}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center items-center gap-1">
                        <button 
                          onClick={() => handleOpenViewModal(record)}
                          className="p-1.5 bg-cyan-50 hover:bg-cyan-500 text-cyan-600 hover:text-white rounded-lg shadow-xs hover:shadow-cyan-100 transition-all focus:outline-none"
                          title="View detailed profiles"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button 
                          onClick={() => handleEdit(record)}
                          className="p-1.5 bg-yellow-50 hover:bg-yellow-500 text-yellow-600 hover:text-white rounded-lg shadow-xs hover:shadow-yellow-100 transition-all focus:outline-none"
                          title="Edit combination parameters"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button 
                          onClick={() => handleOpenDeleteModal(record)}
                          className="p-1.5 bg-red-50 hover:bg-red-500 text-red-600 hover:text-white rounded-lg shadow-xs hover:shadow-red-100 transition-all focus:outline-none"
                          title="Decommission combination"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
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

      {/* Slide-out / Premium Dynamic Card Form Drawer Modal */}
      {showFormModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs transition-opacity duration-300">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 max-w-2xl w-full overflow-hidden transform transition-all duration-300 scale-100 animate-scale-up">
            
            {/* Modal Header */}
            <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-[#323c4e] text-white">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 bg-white/10 rounded-lg shadow-sm">
                  {editingId ? <Edit className="w-4 h-4 text-yellow-400 animate-pulse" /> : <UserPlus className="w-4 h-4 text-emerald-400" />}
                </div>
                <h3 className="text-xs font-black uppercase tracking-wider">
                  {editingId ? 'Edit Configuration' : 'Register New Combinations'}
                </h3>
              </div>
              <button 
                onClick={handleCancel}
                className="p-1.5 rounded-lg hover:bg-white/10 text-slate-300 hover:text-white transition-colors focus:outline-none"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSave}>
              <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-5 max-h-[65vh] overflow-y-auto">
                
                {/* Record ID Field (Fixed/Disabled) */}
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400">Reference Record ID</label>
                  <input
                    type="text"
                    disabled
                    value={editingId ? `ID: #${editingId} (Active Reference)` : 'AUTO-ASSIGNED ON SAVE'}
                    className="w-full px-4 py-2.5 bg-slate-100 border border-slate-200 rounded-xl text-xs font-semibold text-slate-500 cursor-not-allowed focus:outline-none"
                  />
                </div>

                {/* Company Name Input with Autocomplete */}
                <div className="space-y-1.5 relative">
                  <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400">Company Name *</label>
                  <div className="relative">
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      onFocus={() => setShowCompanySuggestions(true)}
                      onBlur={() => setTimeout(() => setShowCompanySuggestions(false), 200)}
                      placeholder="Type & search client company..."
                      autoComplete="off"
                      className={`w-full px-4 py-2.5 bg-slate-50 border rounded-xl focus:outline-none focus:ring-2 focus:bg-white transition-all text-xs font-semibold uppercase ${
                        errors.companyName 
                          ? 'border-rose-400 focus:ring-rose-500/20' 
                          : 'border-slate-200 focus:ring-[#0061f2]/20'
                      }`}
                    />
                    <ChevronDown className="absolute right-3.5 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
                    
                    {showCompanySuggestions && autocompleteCompanyList.length > 0 && (
                      <div className="absolute z-50 w-full mt-1 bg-white border border-slate-200 rounded-xl shadow-2xl max-h-48 overflow-y-auto divide-y divide-slate-100">
                        {autocompleteCompanyList.map((c, i) => (
                          <div
                            key={i}
                            onMouseDown={() => handleSelectCompany(c)}
                            className="px-4 py-2.5 hover:bg-indigo-50/50 cursor-pointer text-[10px] text-slate-700 transition-colors flex justify-between items-center"
                          >
                            <span className="font-extrabold uppercase">{c.companyName}</span>
                            <span className="text-[9px] font-mono bg-slate-100 px-1.5 py-0.5 rounded text-slate-500 font-bold">{c.gstNumber}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  {errors.companyName && (
                    <p className="text-[10px] font-bold text-rose-500 flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {errors.companyName}
                    </p>
                  )}
                </div>

                {/* GST Number Field (Auto-Populated) */}
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400">GST Registration Number</label>
                  <input
                    type="text"
                    name="gstNumber"
                    value={formData.gstNumber}
                    readOnly
                    placeholder="Auto-populated upon company selection"
                    className="w-full px-4 py-2.5 bg-slate-100 border border-slate-200 rounded-xl text-xs font-mono font-bold text-slate-500 cursor-not-allowed focus:outline-none"
                  />
                </div>

                {/* Department Field with Autocomplete */}
                <div className="space-y-1.5 relative">
                  <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400">Corporate Department *</label>
                  <div className="relative">
                    <input
                      type="text"
                      name="department"
                      value={formData.department}
                      onChange={handleInputChange}
                      onFocus={() => setShowDeptSuggestions(true)}
                      onBlur={() => setTimeout(() => setShowDeptSuggestions(false), 200)}
                      placeholder="Type & search department..."
                      autoComplete="off"
                      className={`w-full px-4 py-2.5 bg-slate-50 border rounded-xl focus:outline-none focus:ring-2 focus:bg-white transition-all text-xs font-semibold uppercase ${
                        errors.department 
                          ? 'border-rose-400 focus:ring-rose-500/20' 
                          : 'border-slate-200 focus:ring-[#0061f2]/20'
                      }`}
                    />
                    <ChevronDown className="absolute right-3.5 top-3 w-4 h-4 text-slate-400 pointer-events-none" />

                    {showDeptSuggestions && autocompleteDeptList.length > 0 && (
                      <div className="absolute z-50 w-full mt-1 bg-white border border-slate-200 rounded-xl shadow-2xl max-h-48 overflow-y-auto divide-y divide-slate-100">
                        {autocompleteDeptList.map((dept, i) => (
                          <div
                            key={i}
                            onMouseDown={() => handleSelectDepartment(dept.name)}
                            className="px-4 py-2.5 hover:bg-indigo-50/50 cursor-pointer text-[10px] text-slate-700 font-extrabold uppercase transition-colors"
                          >
                            {dept.name}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  {errors.department && (
                    <p className="text-[10px] font-bold text-rose-500 flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {errors.department}
                    </p>
                  )}
                </div>

                {/* Designation Field with Autocomplete */}
                <div className="space-y-1.5 relative">
                  <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400">Designation Role *</label>
                  <div className="relative">
                    <input
                      type="text"
                      name="designation"
                      value={formData.designation}
                      onChange={handleInputChange}
                      onFocus={() => setShowDesgSuggestions(true)}
                      onBlur={() => setTimeout(() => setShowDesgSuggestions(false), 200)}
                      placeholder="Type & search designation..."
                      autoComplete="off"
                      className={`w-full px-4 py-2.5 bg-slate-50 border rounded-xl focus:outline-none focus:ring-2 focus:bg-white transition-all text-xs font-semibold uppercase ${
                        errors.designation 
                          ? 'border-rose-400 focus:ring-rose-500/20' 
                          : 'border-slate-200 focus:ring-[#0061f2]/20'
                      }`}
                    />
                    <ChevronDown className="absolute right-3.5 top-3 w-4 h-4 text-slate-400 pointer-events-none" />

                    {showDesgSuggestions && autocompleteDesgList.length > 0 && (
                      <div className="absolute z-50 w-full mt-1 bg-white border border-slate-200 rounded-xl shadow-2xl max-h-48 overflow-y-auto divide-y divide-slate-100">
                        {autocompleteDesgList.map((desg, i) => (
                          <div
                            key={i}
                            onMouseDown={() => handleSelectDesignation(desg.designationName)}
                            className="px-4 py-2.5 hover:bg-indigo-50/50 cursor-pointer text-[10px] text-slate-700 font-extrabold uppercase transition-colors"
                          >
                            {desg.designationName}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  {errors.designation && (
                    <p className="text-[10px] font-bold text-rose-500 flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {errors.designation}
                    </p>
                  )}
                </div>

                {/* Officer Name Field with Autocomplete */}
                <div className="space-y-1.5 relative">
                  <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400">Assigned Officer *</label>
                  <div className="relative">
                    <input
                      type="text"
                      name="officerName"
                      value={formData.officerName}
                      onChange={handleInputChange}
                      onFocus={() => setShowOfficerSuggestions(true)}
                      onBlur={() => setTimeout(() => setShowOfficerSuggestions(false), 200)}
                      placeholder="Type & search active personnel..."
                      autoComplete="off"
                      className={`w-full px-4 py-2.5 bg-slate-50 border rounded-xl focus:outline-none focus:ring-2 focus:bg-white transition-all text-xs font-semibold uppercase ${
                        errors.officerName 
                          ? 'border-rose-400 focus:ring-rose-500/20' 
                          : 'border-slate-200 focus:ring-[#0061f2]/20'
                      }`}
                    />
                    <ChevronDown className="absolute right-3.5 top-3 w-4 h-4 text-slate-400 pointer-events-none" />

                    {showOfficerSuggestions && autocompleteOfficerList.length > 0 && (
                      <div className="absolute z-50 w-full mt-1 bg-white border border-slate-200 rounded-xl shadow-2xl max-h-48 overflow-y-auto divide-y divide-slate-100">
                        {autocompleteOfficerList.map((officer, i) => (
                          <div
                            key={i}
                            onMouseDown={() => handleSelectOfficer(officer)}
                            className="px-4 py-2 hover:bg-indigo-50/50 cursor-pointer text-[10px] text-slate-700 transition-colors flex justify-between items-center"
                          >
                            <div>
                              <span className="font-extrabold uppercase block">{officer.name}</span>
                              <span className="text-[8px] font-extrabold text-slate-400 uppercase tracking-widest">{officer.source}</span>
                            </div>
                            {officer.mobile && (
                              <span className="text-[8px] font-mono bg-slate-100 px-1.5 py-0.5 rounded text-slate-500 font-bold shrink-0">{officer.mobile}</span>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  {errors.officerName && (
                    <p className="text-[10px] font-bold text-rose-500 flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {errors.officerName}
                    </p>
                  )}
                </div>

                {/* Mobile Number Field */}
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400">Mobile Contact</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleInputChange}
                      placeholder="10-digit mobile number..."
                      maxLength={10}
                      className={`w-full pl-10 pr-4 py-2.5 bg-slate-50 border rounded-xl focus:outline-none focus:ring-2 focus:bg-white transition-all text-xs font-semibold ${
                        errors.mobile 
                          ? 'border-rose-400 focus:ring-rose-500/20' 
                          : 'border-slate-200 focus:ring-[#0061f2]/20'
                      }`}
                    />
                  </div>
                  {errors.mobile && (
                    <p className="text-[10px] font-bold text-rose-500 flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {errors.mobile}
                    </p>
                  )}
                </div>

                {/* Start Date */}
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400">Period Start Date</label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate || ''}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0061f2]/20 focus:bg-white transition-all text-xs font-semibold text-slate-600"
                  />
                </div>

                {/* End Date */}
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400">Period End Date</label>
                  <input
                    type="date"
                    name="endDate"
                    disabled={formData.status}
                    value={formData.status ? '' : (formData.endDate || '')}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0061f2]/20 focus:bg-white transition-all text-xs font-semibold text-slate-600 disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed"
                  />
                  <p className="text-[8px] text-slate-400 font-bold mt-0.5 uppercase">Disabled when Active Status is ON.</p>
                </div>

                {/* Active Status Toggle */}
                <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-100 sm:col-span-2">
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500">Active Operational Status</label>
                    <p className="text-[9px] text-slate-400 font-bold mt-0.5">Toggle to set current reference availability.</p>
                  </div>
                  
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({
                      ...prev,
                      status: !prev.status,
                      endDate: !prev.status ? '' : prev.endDate
                    }))}
                    className={`w-11 h-6 rounded-full p-0.5 transition-colors focus:outline-none shrink-0 ${
                      formData.status ? 'bg-emerald-500' : 'bg-slate-300'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-200 ${
                      formData.status ? 'translate-x-5' : 'translate-x-0'
                    }`} />
                  </button>
                </div>

                {/* Remarks Textarea */}
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400">Additional Remarks</label>
                  <textarea 
                    rows={2}
                    name="remarks"
                    placeholder="Enter configuration notes, assignments history, or general notes..."
                    value={formData.remarks}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0061f2]/20 focus:bg-white transition-all resize-none"
                  />
                </div>

              </div>

              {/* Modal Actions Footer */}
              <div className="px-6 py-4.5 border-t border-slate-50 bg-slate-50/50 flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-4 py-2 border border-slate-200 text-slate-600 text-xs font-bold rounded-xl hover:bg-slate-100 transition-colors uppercase tracking-wider"
                  disabled={saveLoading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#0061f2] hover:bg-blue-700 text-white text-xs font-black rounded-xl transition-all shadow-md shadow-blue-100 flex items-center gap-1.5 uppercase tracking-wider"
                  disabled={saveLoading}
                >
                  {saveLoading && <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>}
                  {editingId ? 'Update Combo' : 'Save Combo'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Floating View Details Deep-dive Modal */}
      {showViewModal && selectedRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs transition-opacity duration-300">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 max-w-lg w-full overflow-hidden transform transition-all duration-300 scale-100 animate-scale-up">
            
            {/* Modal Header */}
            <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-indigo-950 text-white">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-white/10 rounded-lg">
                  <Eye className="w-4 h-4 text-cyan-400" />
                </div>
                <h3 className="text-xs font-black uppercase tracking-wider">
                  Combination Deep-Dive Inspection
                </h3>
              </div>
              <button 
                onClick={() => setShowViewModal(false)}
                className="p-1 rounded-lg hover:bg-white/10 text-slate-300 hover:text-white transition-colors focus:outline-none"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
              
              {/* Graphic Representation */}
              <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-br from-indigo-50/50 to-indigo-100/30 rounded-2xl border border-indigo-50/60 relative overflow-hidden text-center">
                <div className="absolute -right-6 -bottom-6 text-indigo-500/5 pointer-events-none">
                  <Building2 className="w-24 h-24" />
                </div>
                <div className="w-12 h-12 rounded-2xl bg-indigo-900 text-white flex items-center justify-center shadow-lg shadow-indigo-100 text-sm font-black uppercase mb-3 border border-indigo-800">
                  {selectedRecord.officerName.substring(0, 2).toUpperCase()}
                </div>
                <h4 className="text-sm font-black text-slate-800 uppercase tracking-wider">{selectedRecord.officerName}</h4>
                <p className="text-[9px] font-mono font-extrabold text-blue-600 bg-blue-50 border border-blue-100/50 px-2.5 py-0.5 rounded-full mt-1.5">
                  Record Key: #{selectedRecord.id}
                </p>
              </div>

              {/* Status and Dates */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl">
                  <span className="block text-[9px] font-black uppercase tracking-wider text-slate-400">Current Status</span>
                  <span className={`inline-flex items-center gap-1 text-[9px] font-black uppercase tracking-wider mt-2 px-2.5 py-0.5 rounded-full ${
                    selectedRecord.status ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${selectedRecord.status ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`}></span>
                    {selectedRecord.status ? 'OPERATIONAL' : 'INACTIVE'}
                  </span>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl">
                  <span className="block text-[9px] font-black uppercase tracking-wider text-slate-400">Created Date</span>
                  <span className="text-[10px] font-black text-slate-700 flex items-center gap-1.5 mt-2">
                    <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    {formatDate(selectedRecord.createdAt)}
                  </span>
                </div>
              </div>

              {/* Operational Combination Summary */}
              <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl space-y-2.5">
                <h5 className="text-[10px] font-black uppercase tracking-wider text-indigo-950 flex items-center gap-1.5 border-b border-slate-200/50 pb-1.5">
                  <FileText className="w-3.5 h-3.5 text-indigo-900" /> combination properties
                </h5>
                <div className="text-[10px] space-y-2">
                  <div>
                    <span className="block text-slate-400 font-extrabold uppercase text-[8px] tracking-wider">Department Officer Combo Name</span>
                    <span className="font-extrabold text-blue-600 uppercase">
                      {selectedRecord.departmentOfficer || `${selectedRecord.department} - ${selectedRecord.designation} - ${selectedRecord.officerName}`}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="block text-slate-400 font-extrabold uppercase text-[8px] tracking-wider">Structural Department</span>
                      <span className="font-bold text-slate-700 uppercase">{selectedRecord.department}</span>
                    </div>
                    <div>
                      <span className="block text-slate-400 font-extrabold uppercase text-[8px] tracking-wider">Designation / Role</span>
                      <span className="font-bold text-slate-700 uppercase">{selectedRecord.designation}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Company Details (Only if present in Sub GST Mode) */}
              <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl space-y-2.5">
                <h5 className="text-[10px] font-black uppercase tracking-wider text-indigo-950 flex items-center gap-1.5 border-b border-slate-200/50 pb-1.5">
                  <Building2 className="w-3.5 h-3.5 text-indigo-900" /> Company tax & references
                </h5>
                <div className="grid grid-cols-2 gap-y-2.5 gap-x-2 text-[10px]">
                  <div>
                    <span className="block text-slate-400 font-extrabold uppercase text-[8px] tracking-wider">Affiliated Corporation</span>
                    <span className="font-extrabold text-slate-700 uppercase">{selectedRecord.companyName}</span>
                  </div>
                  <div>
                    <span className="block text-slate-400 font-extrabold uppercase text-[8px] tracking-wider">Corporate GST Reference</span>
                    <span className="font-bold text-slate-700 font-mono">{selectedRecord.gstNumber}</span>
                  </div>
                </div>
              </div>

              {/* Timeline Period details */}
              <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl space-y-2.5">
                <h5 className="text-[10px] font-black uppercase tracking-wider text-indigo-950 flex items-center gap-1.5 border-b border-slate-200/50 pb-1.5">
                  <Calendar className="w-3.5 h-3.5 text-indigo-900" /> Operational timeline duration
                </h5>
                <div className="grid grid-cols-2 gap-2 text-[10px]">
                  <div>
                    <span className="block text-slate-400 font-extrabold uppercase text-[8px] tracking-wider">Start Date</span>
                    <span className="font-bold text-slate-700 flex items-center gap-1 mt-1">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      {formatLocalDateOnly(selectedRecord.startDate)}
                    </span>
                  </div>
                  <div>
                    <span className="block text-slate-400 font-extrabold uppercase text-[8px] tracking-wider">End Date</span>
                    <span className="font-bold text-slate-700 flex items-center gap-1 mt-1">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      {selectedRecord.status ? 'Present / Active' : formatLocalDateOnly(selectedRecord.endDate)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Additional Remarks Section */}
              <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl space-y-2">
                <span className="block text-[9px] font-black uppercase tracking-wider text-slate-400">Additional Remarks</span>
                <p className="text-[10px] font-bold text-slate-600 uppercase tracking-tight leading-relaxed">
                  {selectedRecord.remarks || 'NO REMARKS DEFINED ON REFERENCE'}
                </p>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4.5 border-t border-slate-100 bg-slate-50 flex justify-end">
              <button
                type="button"
                onClick={() => setShowViewModal(false)}
                className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-black rounded-xl transition-all uppercase tracking-wider"
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Custom Delete Confirmation Modal */}
      {showDeleteModal && selectedRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs transition-opacity duration-300">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 max-w-sm w-full overflow-hidden transform transition-all duration-300 scale-100 animate-scale-up">
            
            {/* Modal Header */}
            <div className="p-5 flex flex-col items-center text-center space-y-3">
              <div className="w-12 h-12 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center shadow-inner">
                <Trash2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-800">
                  Decommission Configuration?
                </h3>
                <p className="text-[10px] text-slate-400 font-bold mt-1 px-2 leading-relaxed">
                  Are you absolutely certain you want to permanently decommission the structural mapping for <strong className="text-slate-700 uppercase">"{selectedRecord.officerName}"</strong>? This action cannot be undone.
                </p>
              </div>
            </div>

            {/* Warning Note */}
            <div className="mx-5 mb-4 p-3 bg-amber-50 border border-amber-100 rounded-xl flex gap-2.5 items-start">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-[9px] font-bold text-amber-800 leading-normal">
                WARNING: Decommissioning this link immediately terminates active divisional role associations.
              </p>
            </div>

            {/* Modal Actions Footer */}
            <div className="px-5 py-4 border-t border-slate-50 bg-slate-50 flex justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 border border-slate-200 text-slate-600 text-xs font-bold rounded-xl hover:bg-slate-100 transition-colors uppercase tracking-wider"
                disabled={saveLoading}
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-black rounded-xl transition-all shadow-md shadow-rose-100 flex items-center gap-1.5 uppercase tracking-wider"
                disabled={saveLoading}
              >
                {saveLoading && <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>}
                Decommission
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center text-[10px] text-gray-400 font-bold tracking-[0.2em] uppercase px-4">
        <p>Copyright &copy; Digital New Enterprises 2026</p>
        <div className="flex gap-4">
          <a href="#" className="hover:underline transition-colors hover:text-gray-600">Privacy Policy</a>
          <span>•</span>
          <a href="#" className="hover:underline transition-colors hover:text-gray-600">Terms & Conditions</a>
        </div>
      </div>
    </div>
  );
}
