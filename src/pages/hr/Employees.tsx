import React, { useState, useEffect } from 'react';
import { 
  Users, UserCheck, UserX, Clock, Search, 
  Filter, Eye, GitFork, UserPlus, Layout,
  Building2, Mail, MapPin, Briefcase, Calendar,
  ArrowRight, CheckCircle2, XCircle, LayoutDashboard, Network
} from 'lucide-react';

interface Employee {
  id: number;
  employeeId: string;
  name: string;
  email: string;
  role: string;
  status: string;
  createdAt: string;
  department?: { name: string };
  location?: { name: string };
}

interface EmployeesProps {
  onNavigate?: (path: string) => void;
}

export function Employees({ onNavigate }: EmployeesProps) {
  const [activeTab, setActiveTab] = useState('all');
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5076/api/employees');
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:5076/api/employees/approve/${id}`, {
        method: 'POST'
      });
      if (response.ok) {
        alert('Employee approved successfully!');
        fetchEmployees();
      }
    } catch (error) {
      console.error('Error approving:', error);
    }
  };

  const handleReject = async (id: number) => {
    if (!window.confirm('Are you sure you want to reject this request?')) return;
    try {
      const response = await fetch(`http://localhost:5076/api/employees/reject/${id}`, {
        method: 'POST'
      });
      if (response.ok) {
        alert('Employee request rejected.');
        fetchEmployees();
      }
    } catch (error) {
      console.error('Error rejecting:', error);
    }
  };

  const counts = {
    all: employees.length,
    pending: employees.filter(e => e.status === 'Pending').length,
    approved: employees.filter(e => e.status === 'Active' || e.status === 'Approved').length,
    rejected: employees.filter(e => e.status === 'Rejected').length,
  };

  const filteredEmployees = employees.filter(emp => {
    if (activeTab === 'all') return true;
    if (activeTab === 'pending') return emp.status === 'Pending';
    if (activeTab === 'approved') return emp.status === 'Active' || emp.status === 'Approved';
    if (activeTab === 'rejected') return emp.status === 'Rejected';
    return true;
  });

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'active':
      case 'approved':
        return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'pending':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'rejected':
        return 'bg-rose-100 text-rose-700 border-rose-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="p-6 bg-[#f8f9fc] min-h-screen font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-xl font-black text-gray-800 uppercase tracking-widest">Employee Management</h1>
          <p className="text-[11px] text-gray-400 font-bold uppercase tracking-wider mt-1">Directory and Lifecycle Management</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button 
            onClick={() => onNavigate?.('/hr/add-employee')}
            className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 text-[10px] font-black uppercase tracking-widest px-4 py-2.5 rounded shadow-lg shadow-blue-100 transition-all"
          >
            <UserPlus className="w-4 h-4" /> Add New Employee
          </button>
          <button 
            onClick={() => onNavigate?.('/hr/dashboard')}
            className="bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-2 text-[10px] font-black uppercase tracking-widest px-4 py-2.5 rounded shadow-lg shadow-indigo-100 transition-all"
          >
            <LayoutDashboard className="w-4 h-4" /> HR Dashboard
          </button>
          <button 
            className="bg-cyan-500 hover:bg-cyan-600 text-white flex items-center gap-2 text-[10px] font-black uppercase tracking-widest px-4 py-2.5 rounded shadow-lg shadow-cyan-100 transition-all"
          >
            <Network className="w-4 h-4" /> Hierarchy Dashboard
          </button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatCard label="Total Employees" count={counts.all} icon={Users} color="text-blue-500" bgColor="bg-blue-50" />
        <StatCard label="Pending IT" count={counts.pending} icon={Clock} color="text-amber-500" bgColor="bg-amber-50" />
        <StatCard label="Approved" count={counts.approved} icon={CheckCircle2} color="text-emerald-500" bgColor="bg-emerald-50" />
        <StatCard label="Rejected" count={counts.rejected} icon={UserX} color="text-rose-500" bgColor="bg-rose-50" />
      </div>

      {/* Main Table Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Tabs Header */}
        <div className="flex bg-gray-50/50 border-b border-gray-100 overflow-x-auto no-scrollbar">
          <TabButton id="all" label="All Employees" count={counts.all} active={activeTab === 'all'} onClick={setActiveTab} icon={Users} />
          <TabButton id="pending" label="Pending IT" count={counts.pending} active={activeTab === 'pending'} onClick={setActiveTab} icon={Clock} activeColor="border-amber-500 text-amber-600" />
          <TabButton id="approved" label="Approved" count={counts.approved} active={activeTab === 'approved'} onClick={setActiveTab} icon={CheckCircle2} activeColor="border-emerald-500 text-emerald-600" />
          <TabButton id="rejected" label="Rejected" count={counts.rejected} active={activeTab === 'rejected'} onClick={setActiveTab} icon={XCircle} activeColor="border-rose-500 text-rose-600" />
        </div>

        <div className="p-0">
          <div className="overflow-x-auto min-h-[400px]">
            <table className="w-full text-[11px] uppercase tracking-wide border-collapse">
              <thead>
                <tr className="bg-gray-50/30 text-gray-400 font-black border-b border-gray-100">
                  <th className="px-6 py-4 text-left">Employee ID</th>
                  <th className="px-6 py-4 text-left">Name</th>
                  <th className="px-6 py-4 text-left">Email</th>
                  <th className="px-6 py-4 text-left">Location</th>
                  <th className="px-6 py-4 text-left">Department</th>
                  <th className="px-6 py-4 text-left">Role</th>
                  <th className="px-6 py-4 text-center">Status</th>
                  <th className="px-6 py-4 text-center">Created</th>
                  <th className="px-6 py-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {loading ? (
                  <tr><td colSpan={9} className="py-20 text-center"><div className="animate-spin inline-block w-8 h-8 border-4 border-blue-600 rounded-full border-t-transparent"></div></td></tr>
                ) : filteredEmployees.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="py-20 text-center">
                      <div className="flex flex-col items-center justify-center opacity-40">
                        <Users className="w-12 h-12 text-gray-300 mb-4" />
                        <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest">No Employee Records Found</h3>
                      </div>
                    </td>
                  </tr>
                ) : filteredEmployees.map((emp) => (
                  <tr key={emp.id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-6 py-4 font-black">
                      <span className={`px-2.5 py-1 rounded-md text-[9px] ${emp.status === 'Pending' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'}`}>
                        {emp.employeeId || 'PENDING'}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-black text-gray-700">{emp.name}</td>
                    <td className="px-6 py-4 font-bold text-gray-400 lowercase">{emp.email}</td>
                    <td className="px-6 py-4 font-bold text-gray-400">{emp.location?.name || 'N/A'}</td>
                    <td className="px-6 py-4 font-bold text-gray-400">{emp.department?.name || 'N/A'}</td>
                    <td className="px-6 py-4 font-black text-gray-600">{emp.role}</td>
                    <td className="px-6 py-4 text-center">
                      <span className={`flex items-center justify-center gap-1.5 px-2.5 py-1 rounded-full border text-[9px] font-black uppercase ${getStatusColor(emp.status)}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${emp.status === 'Pending' ? 'bg-amber-500 animate-pulse' : emp.status === 'Rejected' ? 'bg-rose-500' : 'bg-emerald-500'}`}></span>
                        {emp.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center font-bold text-gray-400">{new Date(emp.createdAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-2">
                        {emp.status === 'Pending' ? (
                          <>
                            <button 
                              onClick={() => handleApprove(emp.id)}
                              className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 text-white rounded text-[9px] font-black uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-sm"
                            >
                              <UserCheck className="w-3 h-3" /> Approve
                            </button>
                            <button 
                              onClick={() => handleReject(emp.id)}
                              className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-600 text-white rounded text-[9px] font-black uppercase tracking-widest hover:bg-rose-700 transition-all shadow-sm"
                            >
                              <UserX className="w-3 h-3" /> Reject
                            </button>
                          </>
                        ) : (
                          <>
                            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white rounded text-[9px] font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-sm">
                              <Eye className="w-3 h-3" /> View
                            </button>
                            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-cyan-500 text-white rounded text-[9px] font-black uppercase tracking-widest hover:bg-cyan-600 transition-all shadow-sm">
                              <GitFork className="w-3 h-3" /> Hierarchy
                            </button>
                          </>
                        )}
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
      <div className="mt-8 flex items-center justify-between text-[10px] text-gray-400 font-black uppercase tracking-widest">
        <p>Copyright &copy; Digital New Enterprises 2024</p>
        <div className="flex gap-4">
          <button className="hover:underline">Privacy Policy</button>
          <span>•</span>
          <button className="hover:underline">Terms & Conditions</button>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, count, icon: Icon, color, bgColor }: any) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
      <div>
        <p className={`text-[10px] font-black ${color} mb-1 uppercase tracking-widest`}>{label}</p>
        <p className="text-2xl font-black text-gray-800">{count}</p>
      </div>
      <div className={`p-3 rounded-2xl ${bgColor}`}>
        <Icon className={`w-6 h-6 ${color}`} />
      </div>
    </div>
  );
}

function TabButton({ id, label, count, active, onClick, icon: Icon, activeColor = 'border-blue-600 text-blue-600' }: any) {
  return (
    <button
      onClick={() => onClick(id)}
      className={`flex items-center gap-3 px-8 py-4 text-[11px] font-black uppercase tracking-widest transition-all relative border-r border-gray-100 whitespace-nowrap ${
        active ? `bg-white ${activeColor}` : 'text-gray-400 hover:bg-gray-100'
      }`}
    >
      <Icon className="w-4 h-4" />
      {label} <span className="ml-1 opacity-50">({count})</span>
      {active && (
        <div className={`absolute bottom-0 left-0 right-0 h-0.5 ${activeColor.split(' ')[0].replace('text', 'bg')}`} />
      )}
    </button>
  );
}
