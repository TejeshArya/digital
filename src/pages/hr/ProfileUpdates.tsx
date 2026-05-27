import React, { useState, useEffect, useMemo } from 'react';
import {
  UserCircle, Clock, ArrowLeft, Layout,
  Search, CheckCircle2, XCircle,
  FileEdit, ClipboardList, RefreshCw,
  CheckCircle, AlertCircle, Info, X,
  Filter, History, Eye
} from 'lucide-react';

interface Employee {
  id: number;
  employeeId?: string;
  name: string;
  email: string;
}

interface ProfileUpdateRequest {
  id: number;
  employeeId: number;
  employee?: Employee;
  fieldName: string;
  oldValue?: string;
  newValue: string;
  status: string; // Pending | Approved | Rejected
  rejectionReason?: string;
  requestedAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
}

type TabType = 'Pending' | 'Approved' | 'Rejected' | 'All';

export function ProfileUpdates() {
  // Data states
  const [requests, setRequests] = useState<ProfileUpdateRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>('Pending');

  // Action states
  const [approvingId, setApprovingId] = useState<number | null>(null);
  const [rejectingId, setRejectingId] = useState<number | null>(null);

  // Reject modal state
  const [rejectModal, setRejectModal] = useState<{ id: number; refName: string } | null>(null);
  const [rejectReason, setRejectReason] = useState('');
  const [rejectSaving, setRejectSaving] = useState(false);

  // Search
  const [searchTerm, setSearchTerm] = useState('');

  // Toast
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  useEffect(() => {
    fetchRequests();
  }, []);

  const triggerToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4500);
  };

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const res = await fetch('https://dee-backend-7x0g.onrender.com/api/profileupdaterequests');
      if (res.ok) {
        const data = await res.json();
        setRequests(data);
      } else {
        triggerToast('Failed to load profile update requests', 'error');
      }
    } catch (err) {
      console.error(err);
      triggerToast('Database server offline or unreachable', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id: number, empName: string, fieldName: string) => {
    if (!window.confirm(`Approve ${fieldName} change for ${empName}? This will update their employee record immediately.`)) return;

    try {
      setApprovingId(id);
      const res = await fetch(`https://dee-backend-7x0g.onrender.com/api/profileupdaterequests/${id}/approve`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reviewedBy: 'AMANTU' })
      });

      if (res.ok) {
        triggerToast(`${fieldName} change approved & applied to employee record`, 'success');
        setRequests(prev => prev.map(r =>
          r.id === id ? { ...r, status: 'Approved', reviewedAt: new Date().toISOString(), reviewedBy: 'AMANTU' } : r
        ));
      } else {
        const errText = await res.text();
        triggerToast(errText || 'Failed to approve request', 'error');
      }
    } catch (err) {
      console.error(err);
      triggerToast('Network error while approving', 'error');
    } finally {
      setApprovingId(null);
    }
  };

  const openRejectModal = (id: number, empName: string, fieldName: string) => {
    setRejectModal({ id, refName: `${fieldName} change for ${empName}` });
    setRejectReason('');
  };

  const handleRejectSubmit = async () => {
    if (!rejectModal) return;
    try {
      setRejectSaving(true);
      const res = await fetch(`https://dee-backend-7x0g.onrender.com/api/profileupdaterequests/${rejectModal.id}/reject`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rejectionReason: rejectReason.trim(), reviewedBy: 'AMANTU' })
      });

      if (res.ok) {
        triggerToast('Request rejected successfully', 'info');
        setRequests(prev => prev.map(r =>
          r.id === rejectModal.id
            ? { ...r, status: 'Rejected', rejectionReason: rejectReason.trim(), reviewedAt: new Date().toISOString(), reviewedBy: 'AMANTU' }
            : r
        ));
        setRejectModal(null);
      } else {
        const errText = await res.text();
        triggerToast(errText || 'Failed to reject request', 'error');
      }
    } catch (err) {
      console.error(err);
      triggerToast('Network error while rejecting', 'error');
    } finally {
      setRejectSaving(false);
    }
  };

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return '—';
    try {
      return new Date(dateStr).toLocaleDateString('en-US', {
        month: 'short', day: '2-digit', year: 'numeric',
        hour: '2-digit', minute: '2-digit'
      });
    } catch { return dateStr; }
  };

  const getFieldBadgeStyle = (field: string) => {
    switch (field.toLowerCase()) {
      case 'email': return 'bg-blue-50 text-blue-700 border-blue-100';
      case 'role': return 'bg-purple-50 text-purple-700 border-purple-100';
      case 'qualification': return 'bg-green-50 text-green-700 border-green-100';
      case 'annualsalary': case 'salary': return 'bg-amber-50 text-amber-700 border-amber-100';
      case 'name': return 'bg-indigo-50 text-indigo-700 border-indigo-100';
      case 'remarks': return 'bg-gray-100 text-gray-600 border-gray-200';
      default: return 'bg-slate-50 text-slate-600 border-slate-100';
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status.toLowerCase()) {
      case 'approved': return 'bg-emerald-50 text-emerald-700 border-emerald-100';
      case 'rejected': return 'bg-rose-50 text-rose-700 border-rose-100';
      default: return 'bg-amber-50 text-amber-700 border-amber-100';
    }
  };

  const pendingCount = useMemo(() => requests.filter(r => r.status === 'Pending').length, [requests]);
  const approvedCount = useMemo(() => requests.filter(r => r.status === 'Approved').length, [requests]);
  const rejectedCount = useMemo(() => requests.filter(r => r.status === 'Rejected').length, [requests]);

  const filteredRequests = useMemo(() => {
    let list = requests;
    if (activeTab !== 'All') {
      list = list.filter(r => r.status === activeTab);
    }
    if (searchTerm.trim()) {
      const s = searchTerm.toLowerCase();
      list = list.filter(r =>
        r.employee?.name?.toLowerCase().includes(s) ||
        r.employee?.employeeId?.toLowerCase().includes(s) ||
        r.fieldName?.toLowerCase().includes(s) ||
        r.newValue?.toLowerCase().includes(s) ||
        r.oldValue?.toLowerCase().includes(s)
      );
    }
    return list;
  }, [requests, activeTab, searchTerm]);

  const tabs: { key: TabType; label: string; count: number; color: string }[] = [
    { key: 'Pending', label: 'Pending', count: pendingCount, color: 'amber' },
    { key: 'Approved', label: 'Approved', count: approvedCount, color: 'emerald' },
    { key: 'Rejected', label: 'Rejected', count: rejectedCount, color: 'rose' },
    { key: 'All', label: 'All History', count: requests.length, color: 'blue' },
  ];

  return (
    <div className="p-4 bg-[#f8f9fc] min-h-screen font-sans relative">

      {/* Toast */}
      {toast && (
        <div className={`fixed top-5 right-5 z-[100] flex items-center gap-3 px-6 py-4 rounded-xl shadow-2xl border animate-bounce ${
          toast.type === 'success' ? 'bg-emerald-50 border-emerald-100 text-emerald-800' :
          toast.type === 'error'   ? 'bg-rose-50 border-rose-100 text-rose-800' :
                                     'bg-blue-50 border-blue-100 text-blue-800'
        }`}>
          {toast.type === 'success' && <CheckCircle className="w-5 h-5 text-emerald-600 animate-pulse" />}
          {toast.type === 'error'   && <AlertCircle className="w-5 h-5 text-rose-600 animate-pulse" />}
          {toast.type === 'info'    && <Info className="w-5 h-5 text-blue-600 animate-pulse" />}
          <span className="text-[12px] font-black uppercase tracking-wider">{toast.message}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div className="space-y-1">
          <h1 className="text-gray-700 font-black text-xl uppercase tracking-widest flex items-center gap-2">
            <UserCircle className="w-5 h-5 text-blue-600" /> Profile Update Requests
          </h1>
          <p className="text-[11px] text-gray-400 font-bold uppercase tracking-tight">
            Review, approve, or reject employee profile change requests.
          </p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={fetchRequests}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 border border-gray-200 hover:border-blue-400 text-gray-500 hover:text-blue-600 rounded bg-white shadow-sm transition-all text-[10px] font-black uppercase tracking-widest disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} /> Sync
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#6b58d3] text-white text-[10px] font-black rounded shadow-sm uppercase tracking-widest hover:bg-purple-700 transition-all">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Employees
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#00cfd5] text-white text-[10px] font-black rounded shadow-sm uppercase tracking-widest hover:bg-cyan-600 transition-all">
            <Layout className="w-3.5 h-3.5" /> HR Dashboard
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto space-y-6">

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Pending */}
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex items-center justify-between group hover:shadow-md transition-all relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-amber-400 rounded-l-xl" />
            <div className="pl-3">
              <p className="text-[9px] font-black text-amber-500 uppercase tracking-widest mb-1">Pending Review</p>
              <div className="text-3xl font-black text-gray-800">{pendingCount}</div>
            </div>
            <div className="w-10 h-10 bg-amber-50 rounded-full flex items-center justify-center border border-amber-100">
              <Clock className="w-5 h-5 text-amber-400" />
            </div>
          </div>

          {/* Approved */}
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex items-center justify-between group hover:shadow-md transition-all relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-emerald-400 rounded-l-xl" />
            <div className="pl-3">
              <p className="text-[9px] font-black text-emerald-600 uppercase tracking-widest mb-1">Approved</p>
              <div className="text-3xl font-black text-gray-800">{approvedCount}</div>
            </div>
            <div className="w-10 h-10 bg-emerald-50 rounded-full flex items-center justify-center border border-emerald-100">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
            </div>
          </div>

          {/* Rejected */}
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex items-center justify-between group hover:shadow-md transition-all relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-rose-400 rounded-l-xl" />
            <div className="pl-3">
              <p className="text-[9px] font-black text-rose-500 uppercase tracking-widest mb-1">Rejected</p>
              <div className="text-3xl font-black text-gray-800">{rejectedCount}</div>
            </div>
            <div className="w-10 h-10 bg-rose-50 rounded-full flex items-center justify-center border border-rose-100">
              <XCircle className="w-5 h-5 text-rose-400" />
            </div>
          </div>
        </div>

        {/* Table Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">

          {/* Card Header with tabs + search */}
          <div className="border-b border-gray-100">
            <div className="px-6 pt-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
              <h2 className="text-[12px] font-black text-[#0061f2] uppercase tracking-widest flex items-center gap-2 mb-2">
                <ClipboardList className="w-4 h-4" /> Profile Update Requests
              </h2>
              {/* Search */}
              <div className="relative w-full md:w-64 mb-2">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-300" />
                <input
                  type="text"
                  placeholder="Search employee, field..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded text-[11px] font-bold text-gray-700 focus:outline-none focus:border-blue-400 bg-[#f8f9fc] placeholder-gray-400 transition-all"
                />
              </div>
            </div>

            {/* Tab Bar */}
            <div className="flex px-6 gap-0 overflow-x-auto">
              {tabs.map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center gap-2 px-4 py-3 text-[10px] font-black uppercase tracking-widest border-b-2 transition-all whitespace-nowrap ${
                    activeTab === tab.key
                      ? 'border-[#0061f2] text-[#0061f2]'
                      : 'border-transparent text-gray-400 hover:text-gray-600'
                  }`}
                >
                  {tab.key === 'All' && <History className="w-3.5 h-3.5" />}
                  {tab.label}
                  <span className={`px-1.5 py-0.5 rounded-full text-[8px] font-black ${
                    tab.color === 'amber'   ? 'bg-amber-50 text-amber-600' :
                    tab.color === 'emerald' ? 'bg-emerald-50 text-emerald-600' :
                    tab.color === 'rose'    ? 'bg-rose-50 text-rose-600' :
                                              'bg-blue-50 text-blue-600'
                  }`}>
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-[10px] border-collapse">
              <thead>
                <tr className="bg-gray-50/80 text-gray-400 uppercase tracking-widest border-b border-gray-100 text-[9px]">
                  <th className="px-6 py-4 text-left font-black border-r border-gray-100">Employee</th>
                  <th className="px-6 py-4 text-left font-black border-r border-gray-100">Field Changed</th>
                  <th className="px-6 py-4 text-left font-black border-r border-gray-100">Old Value</th>
                  <th className="px-6 py-4 text-left font-black border-r border-gray-100">Requested Value</th>
                  <th className="px-6 py-4 text-center font-black border-r border-gray-100">Status</th>
                  <th className="px-6 py-4 text-left font-black border-r border-gray-100">Requested At</th>
                  {(activeTab === 'Approved' || activeTab === 'Rejected' || activeTab === 'All') && (
                    <th className="px-6 py-4 text-left font-black border-r border-gray-100">Reviewed</th>
                  )}
                  {activeTab === 'Rejected' && (
                    <th className="px-6 py-4 text-left font-black border-r border-gray-100">Reason</th>
                  )}
                  {activeTab === 'Pending' && (
                    <th className="px-6 py-4 text-center font-black">Actions</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  [...Array(3)].map((_, i) => (
                    <tr key={i} className="animate-pulse border-b border-gray-50">
                      <td className="px-6 py-5"><div className="h-3 bg-gray-100 rounded w-28" /></td>
                      <td className="px-6 py-5"><div className="h-5 bg-gray-100 rounded w-16" /></td>
                      <td className="px-6 py-5"><div className="h-3 bg-gray-100 rounded w-24" /></td>
                      <td className="px-6 py-5"><div className="h-3 bg-gray-100 rounded w-24" /></td>
                      <td className="px-6 py-5 text-center"><div className="h-5 bg-gray-50 rounded-full w-16 mx-auto" /></td>
                      <td className="px-6 py-5"><div className="h-3 bg-gray-100 rounded w-24" /></td>
                      <td className="px-6 py-5 text-center"><div className="h-7 bg-gray-100 rounded w-20 mx-auto" /></td>
                    </tr>
                  ))
                ) : filteredRequests.length > 0 ? (
                  filteredRequests.map((req) => (
                    <tr key={req.id} className="border-b border-gray-50 hover:bg-slate-50/40 transition-colors">
                      {/* Employee */}
                      <td className="px-6 py-4 border-r border-gray-100">
                        <div className="flex flex-col gap-0.5">
                          <span className="font-black text-gray-700 uppercase tracking-tight text-[11px]">
                            {req.employee?.name || 'Unknown'}
                          </span>
                          <span className="text-[8px] text-[#6b58d3] font-bold uppercase">
                            {req.employee?.employeeId || `EMP-${req.employeeId}`}
                          </span>
                        </div>
                      </td>

                      {/* Field */}
                      <td className="px-6 py-4 border-r border-gray-100">
                        <span className={`px-2 py-1 rounded text-[8px] font-black uppercase tracking-widest border ${getFieldBadgeStyle(req.fieldName)}`}>
                          {req.fieldName}
                        </span>
                      </td>

                      {/* Old Value */}
                      <td className="px-6 py-4 border-r border-gray-100 text-gray-400 font-bold italic text-[10px]">
                        {req.oldValue || <span className="text-gray-300 not-italic">None</span>}
                      </td>

                      {/* New Value */}
                      <td className="px-6 py-4 border-r border-gray-100 font-black text-gray-700 text-[10px]">
                        {req.newValue}
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4 border-r border-gray-100 text-center">
                        <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border ${getStatusStyle(req.status)}`}>
                          {req.status}
                        </span>
                      </td>

                      {/* Requested At */}
                      <td className="px-6 py-4 border-r border-gray-100 font-bold text-gray-400 text-[9px] whitespace-nowrap">
                        {formatDate(req.requestedAt)}
                      </td>

                      {/* Reviewed column (history tabs) */}
                      {(activeTab === 'Approved' || activeTab === 'Rejected' || activeTab === 'All') && (
                        <td className="px-6 py-4 border-r border-gray-100 text-[9px] font-bold text-gray-400 whitespace-nowrap">
                          {req.reviewedAt ? (
                            <div className="flex flex-col gap-0.5">
                              <span>{formatDate(req.reviewedAt)}</span>
                              <span className="text-[#6b58d3] font-black uppercase text-[8px]">by {req.reviewedBy}</span>
                            </div>
                          ) : '—'}
                        </td>
                      )}

                      {/* Rejection reason */}
                      {activeTab === 'Rejected' && (
                        <td className="px-6 py-4 border-r border-gray-100 text-[9px] text-rose-500 font-bold italic max-w-[180px]">
                          {req.rejectionReason || <span className="text-gray-300 not-italic">No reason given</span>}
                        </td>
                      )}

                      {/* Actions (Pending only) */}
                      {activeTab === 'Pending' && (
                        <td className="px-6 py-4 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => handleApprove(req.id, req.employee?.name ?? '', req.fieldName)}
                              disabled={approvingId === req.id}
                              title="Approve Request"
                              className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 border border-emerald-100 text-emerald-700 hover:bg-emerald-100 text-[9px] font-black uppercase tracking-widest rounded transition-all disabled:opacity-50"
                            >
                              {approvingId === req.id
                                ? <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                                : <CheckCircle2 className="w-3.5 h-3.5" />
                              }
                              Approve
                            </button>
                            <button
                              onClick={() => openRejectModal(req.id, req.employee?.name ?? '', req.fieldName)}
                              disabled={approvingId === req.id}
                              title="Reject Request"
                              className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-50 border border-rose-100 text-rose-600 hover:bg-rose-100 text-[9px] font-black uppercase tracking-widest rounded transition-all disabled:opacity-50"
                            >
                              <XCircle className="w-3.5 h-3.5" />
                              Reject
                            </button>
                          </div>
                        </td>
                      )}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="px-8 py-24 text-center bg-gray-50/10">
                      <div className="flex flex-col items-center gap-4">
                        <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center border border-gray-100">
                          <FileEdit className="w-8 h-8 text-gray-200" />
                        </div>
                        <p className="text-[12px] font-black text-gray-300 uppercase tracking-[0.2em]">
                          No {activeTab.toLowerCase() === 'all' ? '' : activeTab.toLowerCase()} profile update requests found.
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Reject Modal */}
      {rejectModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
            {/* Header */}
            <div className="bg-rose-600 px-6 py-4 flex justify-between items-center">
              <h2 className="text-white text-[12px] font-black uppercase tracking-widest flex items-center gap-2">
                <XCircle className="w-4 h-4" /> Reject Request
              </h2>
              <button onClick={() => setRejectModal(null)} className="text-white/80 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 space-y-5">
              <div className="bg-rose-50 border border-rose-100 rounded-lg p-4">
                <p className="text-[11px] font-black text-rose-700 uppercase tracking-wide">Rejecting:</p>
                <p className="text-[11px] font-bold text-rose-600 mt-1">{rejectModal.refName}</p>
              </div>

              <div className="space-y-2">
                <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest">
                  Rejection Reason <span className="text-gray-300">(Optional)</span>
                </label>
                <textarea
                  rows={3}
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  placeholder="Provide a reason for the employee (optional)..."
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-lg text-[12px] font-bold text-gray-700 focus:outline-none focus:border-rose-400 transition-all resize-none"
                />
              </div>
            </div>

            {/* Footer */}
            <div className="bg-gray-50/50 px-6 py-4 flex justify-end gap-3 border-t border-gray-100">
              <button
                onClick={() => setRejectModal(null)}
                className="px-6 py-2.5 border border-gray-200 text-gray-500 text-[11px] font-black rounded uppercase tracking-widest hover:bg-gray-50 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleRejectSubmit}
                disabled={rejectSaving}
                className="px-6 py-2.5 bg-rose-600 text-white text-[11px] font-black rounded shadow-md uppercase tracking-widest hover:bg-rose-700 transition-all disabled:opacity-50 flex items-center gap-2"
              >
                {rejectSaving && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
                Confirm Reject
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
          <a href="#" className="hover:underline transition-colors hover:text-gray-600">Terms &amp; Conditions</a>
        </div>
      </div>
    </div>
  );
}
