import React, { useState, useEffect } from 'react';
import { 
  Monitor, Users, ShieldCheck, UserCheck, 
  Settings, Key, LayoutDashboard, Search,
  Eye, Filter, MoreVertical, Building2,
  MapPin, Clock, ArrowRight, UserPlus,
  ShieldAlert, UserX, UserMinus, Network,
  CheckCircle2, Check, X
} from 'lucide-react';

interface Employee {
  id: number;
  employeeId?: string;
  name: string;
  email: string;
  role: string;
  status: string;
  qualification?: string;
  annualSalary?: string;
  createdAt: string;
  approvedAt?: string;
  approvedBy?: string;
}

export function ITEmployeeApproval() {
  const [activeTab, setActiveTab] = useState('pending');
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://dee-backend-7x0g.onrender.com/api/employees');
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
      const savedUser = localStorage.getItem('user');
      let adminName = 'IT Admin';
      if (savedUser) {
        try {
          const u = JSON.parse(savedUser);
          adminName = u.fullName || u.name || 'IT Admin';
        } catch (e) {
          console.error('Error parsing user:', e);
        }
      }
      const response = await fetch(`https://dee-backend-7x0g.onrender.com/api/employees/approve/${id}?approvedBy=${encodeURIComponent(adminName)}`, {
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
      const response = await fetch(`https://dee-backend-7x0g.onrender.com/api/employees/reject/${id}`, {
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

  const pending = employees.filter(e => e.status === 'Pending');
  const approved = employees.filter(e => e.status === 'Active' || e.status === 'Approved');
  const rejected = employees.filter(e => e.status === 'Rejected');

  const kpis = [
    { label: 'PENDING IT APPROVAL', value: pending.length.toString(), icon: <Clock className="w-8 h-8 text-amber-200" />, color: 'amber' },
    { label: 'APPROVED BY IT', value: approved.length.toString(), icon: <CheckCircle2 className="w-8 h-8 text-emerald-200" />, color: 'emerald' },
    { label: 'ACTIVE USERS', value: approved.length.toString(), icon: <Users className="w-8 h-8 text-blue-200" />, color: 'blue' },
    { label: 'REJECTED', value: rejected.length.toString(), icon: <UserX className="w-8 h-8 text-rose-200" />, color: 'rose' },
  ];

  const tabs = [
    { id: 'pending', label: 'Pending IT Approval', count: pending.length, icon: <Clock className="w-4 h-4 text-amber-500" /> },
    { id: 'approved', label: 'Approved by IT', count: approved.length, icon: <CheckCircle2 className="w-4 h-4 text-blue-500" /> },
    { id: 'active', label: 'Active Users', count: approved.length, icon: <UserPlus className="w-4 h-4 text-blue-500" /> },
    { id: 'rejected', label: 'Rejected', count: rejected.length, icon: <UserX className="w-4 h-4 text-rose-500" /> },
  ];

  const currentList = activeTab === 'pending' ? pending : activeTab === 'rejected' ? rejected : approved;

  return (
    <div className="p-4 bg-[#f8f9fc] min-h-screen font-sans">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <h1 className="text-gray-700 font-black text-xl uppercase tracking-widest flex items-center gap-2">
           Employee Approval Management
        </h1>
        <div className="flex flex-wrap gap-3">
          <button className="flex items-center gap-2 px-6 py-2.5 bg-[#6b58d3] text-white text-[10px] font-black rounded shadow-lg shadow-purple-100 uppercase tracking-widest hover:bg-purple-700 transition-all">
            <LayoutDashboard className="w-4 h-4" /> IT Dashboard
          </button>
          <button className="flex items-center gap-2 px-6 py-2.5 bg-[#36b9cc] text-white text-[10px] font-black rounded shadow-lg shadow-cyan-100 uppercase tracking-widest hover:bg-cyan-700 transition-all">
            <Network className="w-4 h-4" /> Hierarchy Dashboard
          </button>
          <button className="flex items-center gap-2 px-6 py-2.5 bg-[#0061f2] text-white text-[10px] font-black rounded shadow-lg shadow-blue-100 uppercase tracking-widest hover:bg-blue-700 transition-all">
            <Users className="w-4 h-4" /> Manage Users
          </button>
        </div>
      </div>

      <div className="max-w-[1800px] mx-auto space-y-8">
        {/* KPI Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {kpis.map((kpi, idx) => (
            <div key={idx} className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between group hover:shadow-md transition-all">
               <div className="space-y-1">
                  <h4 className={`text-[9px] font-black uppercase tracking-widest ${
                    kpi.color === 'amber' ? 'text-amber-500' :
                    kpi.color === 'emerald' ? 'text-emerald-500' :
                    kpi.color === 'blue' ? 'text-blue-500' : 'text-rose-500'
                  }`}>{kpi.label}</h4>
                  <p className="text-2xl font-black text-gray-700">{kpi.value}</p>
               </div>
               <div className="opacity-10 group-hover:scale-110 transition-transform">
                  {kpi.icon}
               </div>
            </div>
          ))}
        </div>

        {/* Tabbed Content Area */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden min-h-[500px]">
           {/* Tab Headers */}
           <div className="flex border-b border-gray-100 overflow-x-auto">
              {tabs.map((tab) => (
                <button 
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-8 py-5 text-[11px] font-black uppercase tracking-widest transition-all relative border-r border-gray-50 whitespace-nowrap ${
                    activeTab === tab.id ? 'text-blue-600 bg-blue-50/10' : 'text-gray-400 hover:bg-gray-50'
                  }`}
                >
                   {tab.icon}
                   {tab.label} ({tab.count})
                   {activeTab === tab.id && (
                     <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-600"></div>
                   )}
                </button>
              ))}
           </div>

           {/* Tab Body */}
           <div className="p-0">
             <div className="overflow-x-auto min-h-[400px]">
               <table className="w-full text-[11px] border-collapse">
                 <thead>
                   <tr className="bg-gray-50/50 text-gray-400 uppercase tracking-widest border-b border-gray-100 font-black">
                     <th className="px-6 py-4 text-left">Details</th>
                     <th className="px-6 py-4 text-left">Qualification</th>
                     <th className="px-6 py-4 text-left">Salary</th>
                     <th className="px-6 py-4 text-center">Registered Date</th>
                     {(activeTab === 'approved' || activeTab === 'active') && (
                       <>
                         <th className="px-6 py-4 text-center">Approved At</th>
                         <th className="px-6 py-4 text-center">Approved By</th>
                       </>
                     )}
                     <th className="px-6 py-4 text-center">Actions</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-gray-50">
                   {loading ? (
                     <tr><td colSpan={7} className="py-20 text-center"><div className="animate-spin inline-block w-8 h-8 border-4 border-blue-600 rounded-full border-t-transparent"></div></td></tr>
                   ) : currentList.length === 0 ? (
                     <tr>
                       <td colSpan={7} className="py-24 text-center">
                         <div className="flex flex-col items-center justify-center">
                           {activeTab === 'pending' ? (
                             <>
                               <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-500 shadow-inner mb-6">
                                  <CheckCircle2 className="w-12 h-12" />
                               </div>
                               <h3 className="text-[18px] font-black text-emerald-600 uppercase tracking-widest mb-2">All Employees Approved!</h3>
                               <p className="text-[12px] text-gray-300 font-bold uppercase tracking-widest">No pending IT approvals at this time.</p>
                             </>
                           ) : (
                             <>
                               <Users className="w-16 h-16 text-gray-100 mb-4" />
                               <h3 className="text-lg font-black text-gray-300 uppercase tracking-widest">No Records Found</h3>
                             </>
                           )}
                         </div>
                       </td>
                     </tr>
                   ) : currentList.map((emp) => (
                     <tr key={emp.id} className="hover:bg-gray-50/50 transition-colors">
                       <td className="px-6 py-4">
                         <div className="flex flex-col">
                           <span className="font-black text-gray-700 uppercase">{emp.name}</span>
                           <span className="text-[10px] text-gray-400 font-bold lowercase">{emp.email}</span>
                           {emp.employeeId && <span className="mt-1 text-[9px] bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded w-fit font-black">{emp.employeeId}</span>}
                         </div>
                       </td>
                       <td className="px-6 py-4 font-bold text-gray-500 uppercase tracking-tight">{emp.qualification || 'N/A'}</td>
                       <td className="px-6 py-4 font-black text-gray-600">{emp.annualSalary ? `₹ ${emp.annualSalary}` : '0'}</td>
                       <td className="px-6 py-4 text-center font-bold text-gray-400 uppercase">{new Date(emp.createdAt).toLocaleDateString()}</td>
                       {(activeTab === 'approved' || activeTab === 'active') && (
                          <>
                            <td className="px-6 py-4 text-center font-bold text-emerald-600 uppercase">
                              {emp.approvedAt ? new Date(emp.approvedAt).toLocaleString('en-US', { hour12: true }) : '—'}
                            </td>
                            <td className="px-6 py-4 text-center font-bold text-gray-600 uppercase">
                              {emp.approvedBy || '—'}
                            </td>
                          </>
                       )}
                       <td className="px-6 py-4">
                         <div className="flex justify-center gap-2">
                           {emp.status === 'Pending' ? (
                             <>
                               <button 
                                 onClick={() => handleApprove(emp.id)}
                                 className="flex items-center gap-1 px-3 py-1.5 bg-emerald-500 text-white rounded text-[9px] font-black uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-sm"
                               >
                                 <Check className="w-3 h-3" /> Approve
                               </button>
                               <button 
                                 onClick={() => handleReject(emp.id)}
                                 className="flex items-center gap-1 px-3 py-1.5 bg-rose-500 text-white rounded text-[9px] font-black uppercase tracking-widest hover:bg-rose-600 transition-all shadow-sm"
                               >
                                 <X className="w-3 h-3" /> Reject
                               </button>
                             </>
                           ) : (
                             <button className="flex items-center gap-1 px-3 py-1.5 bg-gray-100 text-gray-500 rounded text-[9px] font-black uppercase tracking-widest cursor-default">
                               <Eye className="w-3 h-3" /> Details
                             </button>
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
      </div>

      {/* Footer */}
      <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center text-[10px] text-gray-400 font-bold tracking-[0.2em] uppercase px-4">
        <p>Copyright &copy; Digital New Enterprises 2024</p>
        <div className="flex gap-4">
          <a href="#" className="hover:underline transition-colors hover:text-gray-600 lowercase italic tracking-tight">privacy policy</a>
          <span>•</span>
          <a href="#" className="hover:underline transition-colors hover:text-gray-600 lowercase italic tracking-tight">terms & conditions</a>
        </div>
      </div>
    </div>
  );
}
