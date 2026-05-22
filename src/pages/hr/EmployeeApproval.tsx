import { Clock, CheckCircle2, Users, XCircle, LayoutDashboard, Network, UserPlus, CheckCircle, Eye, Check, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';

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
}

interface EmployeeApprovalProps {
  onNavigate?: (path: string) => void;
}

export function EmployeeApproval({ onNavigate }: EmployeeApprovalProps) {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('pending');

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

  const pending = employees.filter(e => e.status === 'Pending');
  const approved = employees.filter(e => e.status === 'Active' || e.status === 'Approved');
  const rejected = employees.filter(e => e.status === 'Rejected');

  const stats = [
    { label: 'PENDING IT APPROVAL', count: pending.length, color: 'text-amber-500', icon: Clock, bgColor: 'bg-amber-50' },
    { label: 'APPROVED BY IT', count: approved.length, color: 'text-emerald-500', icon: CheckCircle2, bgColor: 'bg-emerald-50' },
    { label: 'ACTIVE USERS', count: approved.length, color: 'text-blue-500', icon: Users, bgColor: 'bg-blue-50' },
    { label: 'REJECTED', count: rejected.length, color: 'text-red-500', icon: XCircle, bgColor: 'bg-red-50' },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen font-sans">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-black text-gray-800 uppercase tracking-widest">Employee Approval Management</h1>
        <div className="flex gap-2">
          <Button onClick={() => onNavigate?.('/hr/dashboard')} className="bg-indigo-700 hover:bg-indigo-800 text-white flex items-center gap-2 text-[10px] font-black uppercase tracking-widest">
            <LayoutDashboard className="w-4 h-4" /> IT Dashboard
          </Button>
          <Button onClick={() => onNavigate?.('/hr/employees')} className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 text-[10px] font-black uppercase tracking-widest">
            <Users className="w-4 h-4" /> Manage Employees
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, i) => (
          <Card key={i} className="border-none shadow-sm">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className={`text-[10px] font-black ${stat.color} mb-1 uppercase tracking-widest`}>{stat.label}</p>
                <p className="text-2xl font-black text-gray-800">{stat.count}</p>
              </div>
              <div className={`p-3 rounded-full ${stat.bgColor}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-none shadow-sm overflow-hidden">
        <Tabs defaultValue="pending" onValueChange={setActiveTab} className="w-full">
          <CardHeader className="p-0 border-b bg-gray-50/50">
            <TabsList className="bg-transparent h-auto p-0 gap-0">
              <TabsTrigger value="pending" className="px-8 py-4 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-white data-[state=active]:shadow-none flex items-center gap-2 text-[11px] font-black uppercase tracking-widest">
                <Clock className="w-4 h-4" /> Pending ({pending.length})
              </TabsTrigger>
              <TabsTrigger value="approved" className="px-8 py-4 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-white data-[state=active]:shadow-none flex items-center gap-2 text-[11px] font-black uppercase tracking-widest">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Approved ({approved.length})
              </TabsTrigger>
              <TabsTrigger value="rejected" className="px-8 py-4 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-white data-[state=active]:shadow-none flex items-center gap-2 text-[11px] font-black uppercase tracking-widest">
                <XCircle className="w-4 h-4 text-rose-600" /> Rejected ({rejected.length})
              </TabsTrigger>
            </TabsList>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto min-h-[400px]">
              <table className="w-full text-[11px] border-collapse">
                <thead>
                  <tr className="bg-gray-50/50 text-gray-400 uppercase tracking-widest border-b border-gray-100 font-black">
                    <th className="px-6 py-4 text-left">Details</th>
                    <th className="px-6 py-4 text-left">Qualification</th>
                    <th className="px-6 py-4 text-left">Salary</th>
                    <th className="px-6 py-4 text-center">Date</th>
                    <th className="px-6 py-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {loading ? (
                    <tr><td colSpan={5} className="py-20 text-center"><div className="animate-spin inline-block w-8 h-8 border-4 border-blue-600 rounded-full border-t-transparent"></div></td></tr>
                  ) : (activeTab === 'pending' ? pending : activeTab === 'approved' ? approved : rejected).length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-20 text-center">
                        <div className="flex flex-col items-center justify-center">
                          <CheckCircle className="w-12 h-12 text-emerald-500 mb-4 opacity-20" />
                          <h3 className="text-lg font-black text-gray-300 uppercase tracking-widest">No Records Found</h3>
                        </div>
                      </td>
                    </tr>
                  ) : (activeTab === 'pending' ? pending : activeTab === 'approved' ? approved : rejected).map((emp) => (
                    <tr key={emp.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="font-black text-gray-700 uppercase">{emp.name}</span>
                          <span className="text-[10px] text-gray-400 font-bold lowercase">{emp.email}</span>
                          {emp.employeeId && <span className="mt-1 text-[9px] bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded w-fit font-black">{emp.employeeId}</span>}
                        </div>
                      </td>
                      <td className="px-6 py-4 font-bold text-gray-500 uppercase tracking-tight">{emp.qualification || 'N/A'}</td>
                      <td className="px-6 py-4 font-black text-gray-600">₹ {emp.annualSalary || '0'}</td>
                      <td className="px-6 py-4 text-center font-bold text-gray-400 uppercase">{new Date(emp.createdAt).toLocaleDateString()}</td>
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
          </CardContent>
        </Tabs>
      </Card>
      
      <div className="mt-6 flex items-center justify-between text-[10px] text-gray-400 font-black uppercase tracking-widest">
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
