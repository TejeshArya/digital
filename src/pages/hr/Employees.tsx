import React, { useState, useEffect } from 'react';
import { 
  Users, UserCheck, UserX, Clock, Search, 
  Filter, Eye, GitFork, UserPlus, Layout,
  Building2, Mail, MapPin, Briefcase, Calendar,
  ArrowRight
} from 'lucide-react';

interface Employee {
  employeeId: string;
  name: string;
  email: string;
  role: string;
  status: string;
  createdAt: string;
  department?: { name: string };
  location?: { name: string };
}

export function Employees() {
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

  const tabs = [
    { id: 'all', label: 'All Employees', count: 33, icon: Users },
    { id: 'pending', label: 'Pending IT', count: 0, icon: Clock },
    { id: 'approved', label: 'Approved', count: 33, icon: CheckCircle2 },
    { id: 'rejected', label: 'Rejected', count: 0, icon: UserX },
  ];

  const stats = [
    { label: 'TOTAL EMPLOYEES', value: '33', icon: Users, color: 'text-blue-500' },
    { label: 'PENDING IT', value: '0', icon: Clock, color: 'text-gray-400' },
    { label: 'APPROVED', value: '33', icon: UserCheck, color: 'text-emerald-500' },
    { label: 'REJECTED', value: '0', icon: UserX, color: 'text-rose-400' },
  ];

  return (
    <div className="p-4 bg-[#f8f9fc] min-h-screen font-sans">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <h1 className="text-gray-700 font-black text-xl uppercase tracking-widest">Employee Management</h1>
        <div className="flex flex-wrap gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-[#0061f2] text-white text-[10px] font-black rounded shadow-lg shadow-blue-100 uppercase tracking-widest hover:bg-blue-700 transition-all">
            <UserPlus className="w-4 h-4" /> Add New Employee
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#6b58d3] text-white text-[10px] font-black rounded shadow-lg shadow-purple-100 uppercase tracking-widest hover:bg-purple-700 transition-all">
            <Layout className="w-4 h-4" /> HR Dashboard
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#00cfd5] text-white text-[10px] font-black rounded shadow-lg shadow-cyan-100 uppercase tracking-widest hover:bg-cyan-600 transition-all">
            <GitFork className="w-4 h-4" /> Hierarchy Dashboard
          </button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 relative group overflow-hidden">
               <div className="flex justify-between items-start relative z-10">
                  <div className="space-y-1">
                    <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest leading-none">{stat.label}</span>
                    <div className="text-2xl font-black text-gray-800">{stat.value}</div>
                  </div>
                  <div className={`p-3 rounded-lg bg-gray-50 group-hover:scale-110 transition-transform ${stat.color}`}>
                    <Icon className="w-6 h-6 opacity-80" />
                  </div>
               </div>
               <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                  <Icon className={`w-24 h-24 ${stat.color}`} />
               </div>
            </div>
          );
        })}
      </div>

      {/* Main Content Area with Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-8">
        <div className="flex overflow-x-auto bg-gray-50/50 border-b border-gray-100 no-scrollbar">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isTabActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-8 py-4 text-[11px] font-black uppercase tracking-widest transition-all relative border-r border-gray-100 whitespace-nowrap ${
                  isTabActive ? 'bg-white text-blue-600' : 'text-gray-400 hover:bg-gray-100'
                }`}
              >
                <Icon className={`w-4 h-4 ${isTabActive ? 'text-blue-600' : 'text-gray-300'}`} />
                {tab.label} <span className={`ml-1 text-[10px] ${isTabActive ? 'text-blue-400' : 'text-gray-300'}`}>({tab.count})</span>
                {isTabActive && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
                )}
              </button>
            );
          })}
        </div>

        <div className="overflow-x-auto min-h-[500px]">
          {loading ? (
            <div className="flex items-center justify-center h-[500px]">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <table className="w-full text-[10px] border-collapse">
              <thead>
                <tr className="bg-white text-gray-400 uppercase tracking-widest border-b border-gray-100">
                  <th className="px-6 py-5 text-left font-black border-r border-gray-100">Employee ID</th>
                  <th className="px-6 py-5 text-left font-black border-r border-gray-100">Name</th>
                  <th className="px-6 py-5 text-left font-black border-r border-gray-100">Email</th>
                  <th className="px-6 py-5 text-left font-black border-r border-gray-100">Location</th>
                  <th className="px-6 py-5 text-left font-black border-r border-gray-100">Department</th>
                  <th className="px-6 py-5 text-left font-black border-r border-gray-100">Role</th>
                  <th className="px-6 py-5 text-center font-black border-r border-gray-100">Status</th>
                  <th className="px-6 py-5 text-center font-black border-r border-gray-100">Created</th>
                  <th className="px-6 py-5 text-center font-black">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {employees.map((emp, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-6 py-6 border-r border-gray-50">
                      <span className="bg-[#0061f2] text-white text-[9px] font-black px-2 py-1 rounded shadow-sm">
                        {emp.employeeId}
                      </span>
                    </td>
                    <td className="px-6 py-6 border-r border-gray-50">
                      <span className="font-black text-gray-700 uppercase tracking-tight">{emp.name}</span>
                    </td>
                    <td className="px-6 py-6 border-r border-gray-50 font-bold text-gray-400 lowercase">{emp.email}</td>
                    <td className="px-6 py-6 border-r border-gray-50 font-bold text-gray-400 uppercase tracking-tighter">{emp.location?.name || 'N/A'}</td>
                    <td className="px-6 py-6 border-r border-gray-50 font-bold text-gray-400 uppercase tracking-tighter">{emp.department?.name || 'N/A'}</td>
                    <td className="px-6 py-6 border-r border-gray-50 font-black text-gray-500 uppercase tracking-tight">{emp.role}</td>
                    <td className="px-6 py-6 border-r border-gray-50 text-center">
                      <div className={`w-2 h-2 rounded-full mx-auto shadow-lg ${emp.status === 'Active' ? 'bg-emerald-500 shadow-emerald-100' : 'bg-amber-500 shadow-amber-100'}`} />
                    </td>
                    <td className="px-6 py-6 border-r border-gray-50 text-center font-bold text-gray-400 uppercase">
                      {new Date(emp.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-6 text-center">
                      <div className="flex justify-center gap-2">
                        <button className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0061f2] text-white text-[9px] font-black rounded shadow-md hover:bg-blue-700 transition-all uppercase tracking-widest">
                            <Eye className="w-3 h-3" /> View
                        </button>
                        <button className="flex items-center gap-1.5 px-3 py-1.5 bg-[#00cfd5] text-white text-[9px] font-black rounded shadow-md hover:bg-cyan-600 transition-all uppercase tracking-widest">
                            <GitFork className="w-3 h-3" /> Hierarchy
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="p-4 border-t border-gray-100 flex justify-between items-center text-[10px] text-gray-400 font-bold uppercase tracking-widest bg-gray-50/20">
          <div>Showing 1 to 5 of 33 entries</div>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 hover:text-gray-600 transition-colors">Previous</button>
            <button className="w-7 h-7 bg-[#0061f2] text-white rounded-lg flex items-center justify-center shadow-lg shadow-blue-100">1</button>
            <button className="w-7 h-7 hover:bg-gray-100 rounded-lg flex items-center justify-center transition-colors">2</button>
            <button className="w-7 h-7 hover:bg-gray-100 rounded-lg flex items-center justify-center transition-colors">3</button>
            <button className="px-3 py-1 hover:text-gray-600 transition-colors">Next</button>
          </div>
        </div>
      </div>

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

function CheckCircle2({ className }: { className: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>
  );
}
