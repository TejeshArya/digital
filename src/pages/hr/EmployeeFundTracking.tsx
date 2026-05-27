import React, { useState, useEffect, useMemo } from 'react';
import { 
  Wallet, Plus, Search, Filter, Edit3, 
  Trash2, Save, FileText, Info, History,
  Calendar, Users, ArrowRight, X, RotateCcw,
  RefreshCw, CheckCircle, AlertCircle, Coins, ShieldCheck
} from 'lucide-react';

interface Employee {
  id: number;
  employeeId?: string;
  name: string;
  email: string;
  status: string;
}

interface EmployeeFund {
  id: number;
  employeeId: number;
  employee?: Employee;
  amount: number;
  givenDate: string;
  purpose: string;
  status: string; // Pending, Approved, Released, Rejected
  refNo: string;
  recordedBy: string;
  createdAt: string;
}

export function EmployeeFundTracking() {
  // DB States
  const [funds, setFunds] = useState<EmployeeFund[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);

  // UX States
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  // Modal States
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingFund, setEditingFund] = useState<EmployeeFund | null>(null);

  // Form States
  const [formEmployeeId, setFormEmployeeId] = useState<string>('');
  const [formAmount, setFormAmount] = useState<string>('');
  const [formGivenDate, setFormGivenDate] = useState<string>('');
  const [formPurpose, setFormPurpose] = useState<string>('');
  const [formStatus, setFormStatus] = useState<string>('Pending');
  const [formRefNo, setFormRefNo] = useState<string>('');
  const [formRecordedBy, setFormRecordedBy] = useState<string>('AMANTU');
  const [formError, setFormError] = useState<string>('');

  // Filter States
  const [filterEmployeeId, setFilterEmployeeId] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<string>('');
  const [filterFromDate, setFilterFromDate] = useState<string>('');
  const [filterToDate, setFilterToDate] = useState<string>('');

  // Toast State
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  useEffect(() => {
    fetchEmployees();
    fetchFunds();
  }, []);

  const triggerToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4500);
  };

  const fetchEmployees = async () => {
    try {
      const res = await fetch('https://dee-backend-7x0g.onrender.com/api/employees');
      if (res.ok) {
        const data = await res.json();
        // Load active or approved employees
        const activeEmps = data.filter((e: Employee) => e.status.toLowerCase() === 'active' || e.status.toLowerCase() === 'approved');
        setEmployees(activeEmps);
      }
    } catch (err) {
      console.error('Failed to load employee list:', err);
    }
  };

  const fetchFunds = async (params: { employeeId?: string; status?: string; fromDate?: string; toDate?: string } = {}) => {
    try {
      setLoading(true);
      
      const queryParts: string[] = [];
      if (params.employeeId && params.employeeId !== 'All Employees') {
        queryParts.push(`employeeId=${params.employeeId}`);
      }
      if (params.status && params.status !== 'All Statuses') {
        queryParts.push(`status=${params.status}`);
      }
      if (params.fromDate) {
        queryParts.push(`fromDate=${params.fromDate}`);
      }
      if (params.toDate) {
        queryParts.push(`toDate=${params.toDate}`);
      }

      const queryString = queryParts.length > 0 ? `?${queryParts.join('&')}` : '';
      const res = await fetch(`https://dee-backend-7x0g.onrender.com/api/employeefunds${queryString}`);
      
      if (res.ok) {
        const data = await res.json();
        setFunds(data);
      } else {
        triggerToast('Failed to fetch fund tracking records', 'error');
      }
    } catch (err) {
      console.error(err);
      triggerToast('Database server offline or unreachable', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleApplyFilter = () => {
    fetchFunds({
      employeeId: filterEmployeeId,
      status: filterStatus,
      fromDate: filterFromDate,
      toDate: filterToDate
    });
  };

  const handleClearFilter = () => {
    setFilterEmployeeId('');
    setFilterStatus('');
    setFilterFromDate('');
    setFilterToDate('');
    fetchFunds({});
  };

  const openCreateModal = () => {
    setEditingFund(null);
    setFormEmployeeId('');
    setFormAmount('');
    // Default date to today's local date (YYYY-MM-DD)
    const today = new Date();
    const localDate = today.getFullYear() + '-' + String(today.getMonth() + 1).padStart(2, '0') + '-' + String(today.getDate()).padStart(2, '0');
    setFormGivenDate(localDate);
    setFormPurpose('');
    setFormStatus('Pending');
    // Pre-generate custom ref number
    setFormRefNo(`FT-${Math.floor(100000 + Math.random() * 900000)}`);
    setFormRecordedBy('AMANTU');
    setFormError('');
    setIsModalOpen(true);
  };

  const openEditModal = (fund: EmployeeFund) => {
    setEditingFund(fund);
    setFormEmployeeId(fund.employeeId.toString());
    setFormAmount(fund.amount.toString());
    
    // Format GivenDate for input type="date"
    let formattedDate = '';
    if (fund.givenDate) {
      try {
        formattedDate = fund.givenDate.split('T')[0];
      } catch (e) {
        formattedDate = fund.givenDate;
      }
    }
    
    setFormGivenDate(formattedDate);
    setFormPurpose(fund.purpose);
    setFormStatus(fund.status);
    setFormRefNo(fund.refNo);
    setFormRecordedBy(fund.recordedBy || 'AMANTU');
    setFormError('');
    setIsModalOpen(true);
  };

  const handleSaveFund = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!formEmployeeId) {
      setFormError('Employee selection is required');
      return;
    }
    const amountNum = parseFloat(formAmount);
    if (isNaN(amountNum) || amountNum <= 0) {
      setFormError('Amount must be a positive number');
      return;
    }
    if (!formGivenDate) {
      setFormError('Given Date is required');
      return;
    }
    if (!formPurpose.trim()) {
      setFormError('Purpose details are required');
      return;
    }

    try {
      setSaving(true);
      const payload = {
        employeeId: parseInt(formEmployeeId),
        amount: amountNum,
        givenDate: formGivenDate,
        purpose: formPurpose.trim(),
        status: formStatus,
        refNo: formRefNo.trim(),
        recordedBy: formRecordedBy.trim()
      };

      const url = editingFund 
        ? `https://dee-backend-7x0g.onrender.com/api/employeefunds/${editingFund.id}`
        : 'https://dee-backend-7x0g.onrender.com/api/employeefunds';
      
      const method = editingFund ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        triggerToast(
          editingFund 
            ? `Fund record #${formRefNo} updated successfully`
            : `Fund disburse record #${formRefNo} created successfully`,
          'success'
        );
        setIsModalOpen(false);
        fetchFunds({
          employeeId: filterEmployeeId,
          status: filterStatus,
          fromDate: filterFromDate,
          toDate: filterToDate
        });
      } else {
        const errText = await res.text();
        setFormError(errText || 'Failed to save fund record');
      }
    } catch (err) {
      console.error(err);
      setFormError('Network error while saving fund transaction');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteFund = async (id: number, refNo: string) => {
    if (!window.confirm(`Are you sure you want to delete fund record #${refNo}?`)) {
      return;
    }

    try {
      setDeletingId(id);
      const res = await fetch(`https://dee-backend-7x0g.onrender.com/api/employeefunds/${id}`, {
        method: 'DELETE'
      });

      if (res.ok) {
        triggerToast(`Fund record #${refNo} has been deleted`, 'info');
        setFunds(prev => prev.filter(f => f.id !== id));
      } else {
        triggerToast('Failed to delete fund record', 'error');
      }
    } catch (err) {
      console.error(err);
      triggerToast('Network error while deleting fund record', 'error');
    } finally {
      setDeletingId(null);
    }
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2
    }).format(val).replace('INR', '₹');
  };

  const formatDateDisplay = (dateStr: string) => {
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

  // Compute status colors
  const getStatusStyle = (status: string) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return 'bg-emerald-50 text-emerald-700 border border-emerald-100';
      case 'released':
        return 'bg-blue-50 text-blue-700 border border-blue-100';
      case 'rejected':
        return 'bg-rose-50 text-rose-700 border border-rose-100';
      case 'pending':
      default:
        return 'bg-amber-50 text-amber-700 border border-amber-100';
    }
  };

  return (
    <div className="p-4 bg-[#f8f9fc] min-h-screen font-sans relative">
      {/* Floating Alert Toast */}
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
            <Wallet className="w-5 h-5 text-blue-600 animate-pulse" /> Employee Fund Tracking
          </h1>
          <p className="text-[11px] text-gray-400 font-bold uppercase tracking-tight">
            Manage, approve, disburse, and monitor organizational funds allocated to specific employees.
          </p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => fetchFunds({
              employeeId: filterEmployeeId,
              status: filterStatus,
              fromDate: filterFromDate,
              toDate: filterToDate
            })}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 hover:border-blue-400 text-gray-500 hover:text-blue-600 rounded bg-white shadow-sm transition-all text-[10px] font-black uppercase tracking-widest disabled:opacity-55"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} /> Sync
          </button>
          <button 
            onClick={openCreateModal}
            className="flex items-center gap-2 px-6 py-2.5 bg-[#0061f2] text-white text-[10px] font-black rounded shadow-lg shadow-blue-100 uppercase tracking-widest hover:bg-blue-700 transition-all hover:scale-[1.02]"
          >
            <Plus className="w-4 h-4" /> Give Fund
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto space-y-6">
        {/* Filter Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 items-end">
              <div className="space-y-2 lg:col-span-1">
                 <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Employee</label>
                 <select 
                   value={filterEmployeeId}
                   onChange={(e) => setFilterEmployeeId(e.target.value)}
                   className="w-full px-3 py-2 bg-white border border-gray-200 rounded text-[11px] font-bold text-gray-700 focus:outline-none focus:border-blue-400 transition-all cursor-pointer"
                 >
                    <option value="">All Employees</option>
                    {employees.map(emp => (
                      <option key={emp.id} value={emp.id}>{emp.name}</option>
                    ))}
                 </select>
              </div>
              <div className="space-y-2 lg:col-span-1">
                 <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Status</label>
                 <select 
                   value={filterStatus}
                   onChange={(e) => setFilterStatus(e.target.value)}
                   className="w-full px-3 py-2 bg-white border border-gray-200 rounded text-[11px] font-bold text-gray-700 focus:outline-none focus:border-blue-400 transition-all cursor-pointer"
                 >
                    <option value="">All Statuses</option>
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Released">Released</option>
                    <option value="Rejected">Rejected</option>
                 </select>
              </div>
              <div className="space-y-2 lg:col-span-1">
                 <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest">From Date</label>
                 <div className="relative">
                    <input 
                      type="date" 
                      value={filterFromDate}
                      onChange={(e) => setFilterFromDate(e.target.value)}
                      className="w-full px-3 py-1.5 bg-white border border-gray-200 rounded text-[11px] font-bold text-gray-700 focus:outline-none focus:border-blue-400 transition-all cursor-pointer" 
                    />
                 </div>
              </div>
              <div className="space-y-2 lg:col-span-1">
                 <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest">To Date</label>
                 <div className="relative">
                    <input 
                      type="date" 
                      value={filterToDate}
                      onChange={(e) => setFilterToDate(e.target.value)}
                      className="w-full px-3 py-1.5 bg-white border border-gray-200 rounded text-[11px] font-bold text-gray-700 focus:outline-none focus:border-blue-400 transition-all cursor-pointer" 
                    />
                 </div>
              </div>
              <div className="lg:col-span-1">
                 <button 
                   onClick={handleApplyFilter}
                   disabled={loading}
                   className="w-full flex items-center justify-center gap-2 px-6 py-2.5 bg-[#6b58d3] text-white text-[10px] font-black rounded shadow-md uppercase tracking-widest hover:bg-purple-700 transition-all disabled:opacity-60"
                 >
                    <Filter className="w-3.5 h-3.5" /> Filter
                 </button>
              </div>
              <div className="lg:col-span-1">
                 <button 
                   onClick={handleClearFilter}
                   disabled={loading}
                   className="w-full flex items-center justify-center gap-2 px-6 py-2.5 border border-[#6b58d3] text-[#6b58d3] text-[10px] font-black rounded hover:bg-purple-50 transition-all uppercase tracking-widest disabled:opacity-60"
                 >
                    <RotateCcw className="w-3.5 h-3.5" /> Clear
                 </button>
              </div>
           </div>
        </div>

        {/* Records Table Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden min-h-[400px]">
           <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-[10px] border-collapse">
                 <thead>
                    <tr className="bg-[#1a202c] text-white uppercase tracking-widest text-[9px] text-center">
                       <th className="px-4 py-4 font-black border-r border-slate-700 w-12">#</th>
                       <th className="px-6 py-4 text-left font-black border-r border-slate-700">Employee</th>
                       <th className="px-6 py-4 text-right font-black border-r border-slate-700">Amount</th>
                       <th className="px-6 py-4 font-black border-r border-slate-700">Given Date</th>
                       <th className="px-6 py-4 text-left font-black border-r border-slate-700 w-72">Purpose</th>
                       <th className="px-6 py-4 font-black border-r border-slate-700">Status</th>
                       <th className="px-6 py-4 font-black border-r border-slate-700">Ref No.</th>
                       <th className="px-6 py-4 text-left font-black border-r border-slate-700">Recorded By</th>
                       <th className="px-6 py-4 font-black">Action</th>
                    </tr>
                 </thead>
                 <tbody>
                    {loading ? (
                      /* Skeleton Loading rows */
                      [...Array(4)].map((_, i) => (
                        <tr key={i} className="animate-pulse border-b border-gray-50 bg-white">
                          <td className="px-4 py-5 text-center"><div className="h-3 bg-gray-100 rounded w-4 mx-auto"></div></td>
                          <td className="px-6 py-5"><div className="h-3 bg-gray-100 rounded w-24"></div></td>
                          <td className="px-6 py-5 text-right"><div className="h-3 bg-gray-100 rounded w-16 ml-auto"></div></td>
                          <td className="px-6 py-5 text-center"><div className="h-3 bg-gray-100 rounded w-20 mx-auto"></div></td>
                          <td className="px-6 py-5"><div className="h-3 bg-gray-100 rounded w-48"></div></td>
                          <td className="px-6 py-5 text-center"><div className="h-6 bg-gray-50 rounded-full w-16 mx-auto"></div></td>
                          <td className="px-6 py-5 text-center"><div className="h-3 bg-gray-100 rounded w-16 mx-auto"></div></td>
                          <td className="px-6 py-5"><div className="h-3 bg-gray-100 rounded w-16"></div></td>
                          <td className="px-6 py-5 text-center"><div className="h-5 bg-gray-100 rounded w-12 mx-auto"></div></td>
                        </tr>
                      ))
                    ) : funds.length > 0 ? (
                      funds.map((fund, index) => (
                        <tr key={fund.id} className="border-b border-gray-50 hover:bg-slate-50/50 transition-colors bg-white">
                           <td className="px-4 py-4 text-center text-gray-400 font-bold border-r border-gray-100">{index + 1}</td>
                           <td className="px-6 py-4 border-r border-gray-100">
                             <div className="flex flex-col gap-0.5">
                               <span className="font-black text-gray-700 uppercase tracking-tight">{fund.employee?.name || 'Unknown Employee'}</span>
                               <span className="text-[8px] text-[#6b58d3] font-bold uppercase">{fund.employee?.employeeId || 'No Code'}</span>
                             </div>
                           </td>
                           <td className="px-6 py-4 text-right font-black text-gray-800 text-[11px] border-r border-gray-100">
                             {formatCurrency(fund.amount)}
                           </td>
                           <td className="px-6 py-4 text-center font-bold text-gray-500 border-r border-gray-100">
                             {formatDateDisplay(fund.givenDate)}
                           </td>
                           <td className="px-6 py-4 text-gray-400 font-medium border-r border-gray-100 text-left line-clamp-2 max-w-xs mt-1.5">
                             {fund.purpose}
                           </td>
                           <td className="px-6 py-4 text-center border-r border-gray-100">
                             <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${getStatusStyle(fund.status)}`}>
                               {fund.status}
                             </span>
                           </td>
                           <td className="px-6 py-4 text-center font-black text-[#6b58d3] uppercase border-r border-gray-100">
                             {fund.refNo}
                           </td>
                           <td className="px-6 py-4 font-bold text-gray-500 border-r border-gray-100">
                             {fund.recordedBy}
                           </td>
                           <td className="px-6 py-4 text-center">
                             <div className="flex items-center justify-center gap-1.5">
                               <button 
                                 onClick={() => openEditModal(fund)}
                                 className="p-1.5 text-gray-300 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                                 title="Edit Record"
                               >
                                 <Edit3 className="w-3.5 h-3.5" />
                               </button>
                               <button 
                                 onClick={() => handleDeleteFund(fund.id, fund.refNo)}
                                 disabled={deletingId === fund.id}
                                 className="p-1.5 text-gray-300 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
                                 title="Delete Record"
                               >
                                 {deletingId === fund.id ? (
                                   <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                                 ) : (
                                   <Trash2 className="w-3.5 h-3.5" />
                                 )}
                               </button>
                             </div>
                           </td>
                        </tr>
                      ))
                    ) : (
                      /* Empty State Alert */
                      <tr>
                         <td colSpan={9} className="py-24 text-center">
                            <div className="flex flex-col items-center gap-3 text-gray-400">
                               <FileText className="w-14 h-14 opacity-20" />
                               <p className="text-[12px] font-black uppercase tracking-[0.2em] opacity-40">No fund records found.</p>
                               <p className="text-[10px] text-gray-400 font-bold uppercase opacity-65">Try modifying your filters or record a new fund disbursement.</p>
                            </div>
                         </td>
                      </tr>
                    )}
                 </tbody>
              </table>
           </div>
        </div>
      </div>

      {/* Give Fund / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
           <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
              {/* Modal Header */}
              <div className="bg-[#0061f2] px-6 py-4 flex justify-between items-center">
                 <h2 className="text-white text-[12px] font-black uppercase tracking-widest flex items-center gap-2">
                    {editingFund ? (
                      <>
                        <Edit3 className="w-4 h-4" /> Edit Fund Record ({formRefNo})
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4" /> Disburse Organizational Fund
                      </>
                    )}
                 </h2>
                 <button onClick={() => setIsModalOpen(false)} className="text-white/80 hover:text-white transition-colors focus:outline-none">
                    <X className="w-5 h-5" />
                 </button>
              </div>

              {/* Modal Body */}
              <form onSubmit={handleSaveFund}>
                <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
                   {/* Info Alert Box */}
                   <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex items-start gap-3 text-blue-800">
                      <Coins className="w-4 h-4 mt-0.5 shrink-0 text-blue-600 animate-bounce" />
                      <div className="space-y-1">
                        <p className="text-[10px] font-black uppercase tracking-wide">Financial Tracking Compliance</p>
                        <p className="text-[9.5px] font-bold opacity-80 leading-relaxed uppercase">Disbursed organizational funds are recorded instantly in the general ledger. Ensure employee credentials and amount compliance values are checked.</p>
                      </div>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Employee Dropdown */}
                      <div className="space-y-1">
                         <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Select Employee <span className="text-rose-500">*</span></label>
                         <select 
                           value={formEmployeeId}
                           onChange={(e) => setFormEmployeeId(e.target.value)}
                           className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-lg text-[12px] font-bold text-gray-700 focus:outline-none focus:border-blue-400 transition-all cursor-pointer"
                         >
                            <option value="">Select Employee...</option>
                            {employees.map(emp => (
                              <option key={emp.id} value={emp.id}>{emp.name} ({emp.employeeId || 'Pending'})</option>
                            ))}
                         </select>
                      </div>

                      {/* Fund Amount */}
                      <div className="space-y-1">
                         <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Fund Amount (₹) <span className="text-rose-500">*</span></label>
                         <input 
                           type="number"
                           step="any"
                           placeholder="e.g. 15000.00"
                           value={formAmount}
                           onChange={(e) => setFormAmount(e.target.value)}
                           className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-lg text-[12px] font-bold text-gray-700 focus:outline-none focus:border-blue-400 transition-all"
                         />
                      </div>

                      {/* Given Date */}
                      <div className="space-y-1">
                         <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Given Date <span className="text-rose-500">*</span></label>
                         <input 
                           type="date"
                           value={formGivenDate}
                           onChange={(e) => setFormGivenDate(e.target.value)}
                           className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-lg text-[12px] font-bold text-gray-700 focus:outline-none focus:border-blue-400 transition-all cursor-pointer"
                         />
                      </div>

                      {/* Status */}
                      <div className="space-y-1">
                         <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Fund Status <span className="text-rose-500">*</span></label>
                         <select 
                           value={formStatus}
                           onChange={(e) => setFormStatus(e.target.value)}
                           className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-lg text-[12px] font-bold text-gray-700 focus:outline-none focus:border-blue-400 transition-all cursor-pointer"
                         >
                            <option value="Pending">Pending</option>
                            <option value="Approved">Approved</option>
                            <option value="Released">Released</option>
                            <option value="Rejected">Rejected</option>
                         </select>
                      </div>

                      {/* Reference Number */}
                      <div className="space-y-1">
                         <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Reference Number (Auto-Generated)</label>
                         <input 
                           type="text"
                           value={formRefNo}
                           onChange={(e) => setFormRefNo(e.target.value)}
                           placeholder="e.g. FT-123456"
                           className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg text-[12px] font-bold text-[#6b58d3] focus:outline-none"
                         />
                      </div>

                      {/* Recorded By */}
                      <div className="space-y-1">
                         <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Recorded By</label>
                         <input 
                           type="text"
                           value={formRecordedBy}
                           onChange={(e) => setFormRecordedBy(e.target.value)}
                           className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg text-[12px] font-bold text-gray-600 focus:outline-none"
                           readOnly
                         />
                      </div>
                   </div>

                   {/* Purpose Details */}
                   <div className="space-y-1">
                      <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Disbursement Purpose <span className="text-rose-500">*</span></label>
                      <textarea 
                        rows={3}
                        value={formPurpose}
                        onChange={(e) => setFormPurpose(e.target.value)}
                        placeholder="Provide details regarding the purpose of this fund allocation..."
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-lg text-[12px] font-bold text-gray-700 focus:outline-none focus:border-blue-400 transition-all resize-none"
                      />
                   </div>

                   {formError && (
                     <div className="p-3.5 bg-rose-50 border border-rose-100 text-rose-700 text-[11px] font-bold rounded-lg flex items-center gap-2 animate-pulse">
                       <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
                       <span>{formError}</span>
                     </div>
                   )}
                </div>

                {/* Modal Footer */}
                <div className="bg-gray-50/50 px-6 py-4 flex justify-end gap-3 border-t border-gray-100">
                   <button 
                     type="button"
                     onClick={() => setIsModalOpen(false)}
                     className="px-8 py-2.5 bg-[#6b58d3] text-white text-[11px] font-black rounded shadow-md uppercase tracking-widest hover:bg-purple-700 transition-all"
                   >
                      Cancel
                   </button>
                   <button 
                     type="submit"
                     disabled={saving || !formEmployeeId || !formAmount || !formPurpose.trim()}
                     className="px-8 py-2.5 bg-[#0061f2] text-white text-[11px] font-black rounded shadow-md uppercase tracking-widest hover:bg-blue-700 transition-all disabled:opacity-55 flex items-center gap-2"
                   >
                      {saving && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
                      <span>{editingFund ? 'Save Changes' : 'Record Disburse'}</span>
                   </button>
                </div>
              </form>
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
