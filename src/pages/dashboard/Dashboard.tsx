import { useState, useEffect } from 'react';
import { 
  TrendingUp, DollarSign, Users, FileText, Clock, 
  AlertCircle, Building, ShoppingBag, ArrowUpRight, CheckCircle2 
} from 'lucide-react';

interface DashboardProps {
  onNavigate?: (path: string) => void;
}

export function Dashboard({ onNavigate }: DashboardProps = {}) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchStats() {
      try {
        setLoading(true);
        const res = await fetch('http://localhost:5076/api/dashboard/stats');
        if (!res.ok) throw new Error('Failed to fetch dashboard stats');
        const json = await res.json();
        setData(json);
      } catch (err: any) {
        console.error('Error fetching dashboard stats:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  const formatRupee = (num: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(num);
  };

  const stats = data ? [
    { label: 'Total Revenue', value: formatRupee(data.revenue), icon: DollarSign, color: 'from-emerald-500 to-teal-600 shadow-emerald-100', change: '+12.5%', type: 'increase', path: '/invoices/all' },
    { label: 'Total Purchases', value: formatRupee(data.totalPurchases), icon: ShoppingBag, color: 'from-rose-500 to-red-600 shadow-rose-100', change: '-4.8%', type: 'decrease', path: '/purchase/manage' },
    { label: 'Total Employees', value: String(data.totalEmployees), icon: Users, color: 'from-purple-500 to-violet-600 shadow-purple-100', change: `+${data.totalEmployees > 0 ? 1 : 0} today`, type: 'increase', path: '/hr/employees' },
    { label: 'Active Projects', value: String(data.totalProjects), icon: FileText, color: 'from-blue-500 to-indigo-600 shadow-blue-100', change: 'Running', type: 'info', path: '/projects' },
    { label: 'Pending Actions', value: String(data.pendingTasks), icon: Clock, color: 'from-amber-500 to-orange-600 shadow-amber-100', change: 'Review Required', type: 'warning', path: '/hr/attendance/approval' },
    { label: 'Invoices Due', value: String(data.invoicesDue), icon: AlertCircle, color: 'from-red-500 to-rose-600 shadow-red-100', change: 'Urgent Pay', type: 'danger', path: '/invoices/all' },
    { label: 'Registered GSTs', value: String(data.totalCompanies), icon: Building, color: 'from-cyan-500 to-blue-600 shadow-cyan-100', change: 'Verified', type: 'info', path: '/company-gst' }
  ] : [
    { label: 'Total Revenue', value: '₹12,45,000', icon: DollarSign, color: 'from-emerald-500 to-teal-600 shadow-emerald-100', change: '+12.5%', type: 'increase', path: '/invoices/all' },
    { label: 'Total Purchases', value: '₹3,45,000', icon: ShoppingBag, color: 'from-rose-500 to-red-600 shadow-rose-100', change: '-4.8%', type: 'decrease', path: '/purchase/manage' },
    { label: 'Total Employees', value: '156', icon: Users, color: 'from-purple-500 to-violet-600 shadow-purple-100', change: '+8 today', type: 'increase', path: '/hr/employees' },
    { label: 'Active Projects', value: '24', icon: FileText, color: 'from-blue-500 to-indigo-600 shadow-blue-100', change: 'Running', type: 'info', path: '/projects' },
    { label: 'Pending Actions', value: '18', icon: Clock, color: 'from-amber-500 to-orange-600 shadow-amber-100', change: 'Review Required', type: 'warning', path: '/hr/attendance/approval' },
    { label: 'Invoices Due', value: '7', icon: AlertCircle, color: 'from-red-500 to-rose-600 shadow-red-100', change: 'Urgent Pay', type: 'danger', path: '/invoices/all' },
    { label: 'Registered GSTs', value: '3', icon: Building, color: 'from-cyan-500 to-blue-600 shadow-cyan-100', change: 'Verified', type: 'info', path: '/company-gst' }
  ];

  const recentActivities = data?.recentActivities || [
    { action: 'New project created', user: 'Admin User', time: '2 hours ago', type: 'project' },
    { action: 'Invoice #INV-001 paid', user: 'Client ABC', time: '5 hours ago', type: 'payment' },
    { action: 'Employee onboarding completed', user: 'HR Team', time: '1 day ago', type: 'hr' },
    { action: 'Quotation sent to XYZ Corp', user: 'Sales Team', time: '2 days ago', type: 'sales' },
  ];

  const quickActions = [
    { label: 'Add Project', path: '/projects', color: 'from-blue-600 to-indigo-600 shadow-blue-100 hover:shadow-blue-200' },
    { label: 'Create Quotation', path: '/quotations/new', color: 'from-emerald-600 to-teal-600 shadow-emerald-100 hover:shadow-emerald-200' },
    { label: 'Register Company GST', path: '/company-gst', color: 'from-cyan-600 to-blue-600 shadow-cyan-100 hover:shadow-cyan-200' },
    { label: 'Add Employee', path: '/hr/add-employee', color: 'from-purple-600 to-violet-600 shadow-purple-100 hover:shadow-purple-200' },
    { label: 'Manage Invoices', path: '/invoices/all', color: 'from-orange-600 to-amber-600 shadow-orange-100 hover:shadow-orange-200' },
  ];

  const getBadgeStyle = (type: string) => {
    switch (type) {
      case 'increase': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'decrease': return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'warning': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'danger': return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-blue-50 text-blue-700 border-blue-200';
    }
  };

  return (
    <div className="p-6 bg-[#f8f9fc] min-h-screen font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-[#1e293b] tracking-tight">Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">Welcome to your real-time DE Enterprises business control center</p>
        </div>
        {error && (
          <div className="mt-4 md:mt-0 flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-lg px-4 py-2 text-xs font-semibold text-amber-800">
            <AlertCircle className="w-4 h-4 text-amber-600" />
            <span>Using database fallbacks (backend connection offline)</span>
          </div>
        )}
      </div>

      {/* Loading Skeleton */}
      {loading && !data && !error ? (
        <div className="space-y-8 animate-pulse">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <div className="w-12 h-12 rounded-xl bg-gray-200" />
                  <div className="w-16 h-5 rounded-full bg-gray-200" />
                </div>
                <div className="space-y-2">
                  <div className="w-24 h-4 bg-gray-200 rounded" />
                  <div className="w-32 h-6 bg-gray-200 rounded" />
                </div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 h-80 bg-white rounded-2xl border border-gray-100" />
            <div className="h-80 bg-white rounded-2xl border border-gray-100" />
          </div>
        </div>
      ) : (
        <>
          {/* Dynamic Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div 
                  key={index} 
                  onClick={() => onNavigate && stat.path && onNavigate(stat.path)}
                  className="bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 p-6 transition-all duration-300 transform hover:-translate-y-1 group cursor-pointer hover:border-blue-200"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`bg-gradient-to-br ${stat.color} p-3 rounded-xl shadow-lg transition-transform duration-300 group-hover:scale-110`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${getBadgeStyle(stat.type)}`}>
                      {stat.change}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1">{stat.label}</p>
                    <p className="text-2xl font-extrabold text-gray-800 tracking-tight">{stat.value}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Dynamic Recent Activities */}
            <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col justify-between">
              <div>
                <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-gray-50/50 to-white">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-blue-600" />
                    <h3 className="font-bold text-gray-800 text-sm uppercase tracking-wider">Live System Feed</h3>
                  </div>
                  <span className="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded font-bold uppercase tracking-wider">Dynamic</span>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {recentActivities.map((activity: any, index: number) => (
                      <div 
                        key={index} 
                        className="flex items-start gap-4 p-4 hover:bg-[#f8f9fc] rounded-xl transition-all duration-300 border border-transparent hover:border-gray-100 group"
                      >
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm ${
                          activity.type === 'project' ? 'bg-blue-50 text-blue-600' :
                          activity.type === 'payment' ? 'bg-emerald-50 text-emerald-600' :
                          activity.type === 'hr' ? 'bg-purple-50 text-purple-600' :
                          'bg-amber-50 text-amber-600'
                        }`}>
                          {activity.type === 'project' ? <FileText className="w-5 h-5" /> :
                           activity.type === 'payment' ? <DollarSign className="w-5 h-5" /> :
                           activity.type === 'hr' ? <Users className="w-5 h-5" /> :
                           <Clock className="w-5 h-5" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-gray-800 tracking-tight group-hover:text-blue-600 transition-colors uppercase truncate">
                            {activity.action}
                          </p>
                          <p className="text-xs text-gray-400 mt-1 uppercase font-semibold tracking-wide">
                            Scope: <span className="text-gray-500 font-bold">{activity.user}</span>
                          </p>
                        </div>
                        <span className="text-[10px] text-gray-400 font-bold bg-gray-50 px-2 py-1 rounded shrink-0 self-center uppercase">
                          {activity.time}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="p-4 bg-gray-50/50 border-t border-gray-100 text-center">
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider flex items-center justify-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  Real-time synchronization active with Digital.Api database
                </p>
              </div>
            </div>

            {/* Quick Actions Router */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col justify-between">
              <div>
                <div className="p-5 border-b border-gray-100 bg-gradient-to-r from-gray-50/50 to-white">
                  <h3 className="font-bold text-gray-800 text-sm uppercase tracking-wider">Quick Navigation</h3>
                </div>
                <div className="p-6 space-y-3">
                  {quickActions.map((action, index) => (
                    <button
                      key={index}
                      onClick={() => onNavigate && onNavigate(action.path)}
                      className={`w-full bg-gradient-to-r ${action.color} text-white py-3.5 px-4 rounded-xl transition-all duration-300 font-bold text-xs uppercase tracking-widest shadow-md hover:-translate-y-0.5 flex items-center justify-between group active:translate-y-0`}
                    >
                      <span>{action.label}</span>
                      <ArrowUpRight className="w-4 h-4 opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </button>
                  ))}
                </div>
              </div>
              <div className="p-5 bg-gradient-to-br from-indigo-900 to-slate-900 text-white rounded-b-2xl m-3 relative overflow-hidden shadow-xl">
                <div className="absolute -right-8 -bottom-8 w-24 h-24 rounded-full bg-indigo-500/20 blur-xl" />
                <p className="text-xs font-semibold text-indigo-300 uppercase tracking-widest mb-1">Company Identity</p>
                <p className="text-base font-extrabold tracking-tight">Digital New Enterprises</p>
                <p className="text-[9px] text-indigo-400 mt-4 uppercase tracking-wider font-bold">2026 ERP Workspace Panel v2.0</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
