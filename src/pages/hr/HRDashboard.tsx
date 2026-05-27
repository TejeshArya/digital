import React, { useState, useEffect, useMemo } from 'react';
import {
  Users, UserCheck, UserX, UserPlus, GitFork,
  Clock, CheckCircle2, ShieldCheck, UserMinus,
  UserCog, BarChart3, PieChart, MapPin, RefreshCw,
  AlertCircle, Briefcase, TrendingUp, Wallet,
  FileEdit, Building2, ChevronRight, Activity
} from 'lucide-react';

const API = 'http://localhost:5076';

interface HRStats {
  totalEmployees: number;
  pendingIT: number;
  approvedByIT: number;
  activeUsers: number;
  rejected: number;
  inactive: number;
}

interface RecentEmployee {
  id: number;
  employeeId?: string;
  name: string;
  email: string;
  role: string;
  status: string;
  departmentName?: string;
  locationName?: string;
  createdAt: string;
}

interface DistItem {
  status?: string;
  location?: string;
  department?: string;
  count: number;
}

interface PendingUpdate {
  id: number;
  employeeName: string;
  employeeCode?: string;
  fieldName: string;
  oldValue?: string;
  newValue: string;
  requestedAt: string;
}

interface FundSummary {
  totalFunds: number;
  pendingFunds: number;
  totalDisbursed: number;
}

interface HRDashboardData {
  stats: HRStats;
  recentEmployees: RecentEmployee[];
  statusDistribution: DistItem[];
  locationDistribution: DistItem[];
  departmentDistribution: DistItem[];
  pendingProfileUpdates: PendingUpdate[];
  fundSummary: FundSummary;
}

const STATUS_COLORS: Record<string, string> = {
  Active: 'bg-emerald-500',
  Pending: 'bg-amber-400',
  Approved: 'bg-blue-500',
  Rejected: 'bg-rose-500',
  Inactive: 'bg-gray-300',
};

const STATUS_BADGE: Record<string, string> = {
  Active: 'bg-emerald-50 text-emerald-700 border-emerald-100',
  Pending: 'bg-amber-50 text-amber-700 border-amber-100',
  Approved: 'bg-blue-50 text-blue-700 border-blue-100',
  Rejected: 'bg-rose-50 text-rose-700 border-rose-100',
  Inactive: 'bg-gray-100 text-gray-500 border-gray-200',
};

const BAR_COLORS = [
  'bg-[#0061f2]', 'bg-[#6b58d3]', 'bg-[#00cfd5]',
  'bg-[#1cc88a]', 'bg-[#f6c23e]', 'bg-rose-400'
];

export function HRDashboard() {
  const [data, setData] = useState<HRDashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`${API}/api/dashboard/hr`);
      if (res.ok) {
        setData(await res.json());
      } else {
        setError('Failed to load HR dashboard data');
      }
    } catch {
      setError('Backend server offline or unreachable');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const maxLocCount = useMemo(
    () => Math.max(1, ...(data?.locationDistribution.map(l => l.count) ?? [1])),
    [data]
  );
  const maxDeptCount = useMemo(
    () => Math.max(1, ...(data?.departmentDistribution.map(d => d.count) ?? [1])),
    [data]
  );

  const formatDate = (d?: string) => {
    if (!d) return '—';
    return new Date(d).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
  };

  const stats = data?.stats;

  const statCards = [
    { label: 'Total Employees', value: stats?.totalEmployees ?? 0, color: 'text-blue-500', bg: 'bg-blue-50', border: 'border-blue-100', bar: 'bg-[#0061f2]', icon: Users },
    { label: 'Pending IT', value: stats?.pendingIT ?? 0, color: 'text-amber-500', bg: 'bg-amber-50', border: 'border-amber-100', bar: 'bg-amber-400', icon: Clock },
    { label: 'Approved by IT', value: stats?.approvedByIT ?? 0, color: 'text-emerald-500', bg: 'bg-emerald-50', border: 'border-emerald-100', bar: 'bg-emerald-500', icon: ShieldCheck },
    { label: 'Active Users', value: stats?.activeUsers ?? 0, color: 'text-cyan-500', bg: 'bg-cyan-50', border: 'border-cyan-100', bar: 'bg-[#00cfd5]', icon: UserCheck },
    { label: 'Rejected', value: stats?.rejected ?? 0, color: 'text-rose-500', bg: 'bg-rose-50', border: 'border-rose-100', bar: 'bg-rose-500', icon: UserMinus },
    { label: 'Inactive', value: stats?.inactive ?? 0, color: 'text-gray-400', bg: 'bg-gray-50', border: 'border-gray-100', bar: 'bg-gray-300', icon: UserX },
  ];

  const SkeletonBar = ({ w = 'w-20' }: { w?: string }) => (
    <div className={`h-3 ${w} bg-gray-100 rounded animate-pulse`} />
  );

  return (
    <div className="p-6 bg-[#f8f9fc] min-h-screen font-sans">

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div className="space-y-1">
          <h1 className="text-gray-700 font-black text-xl uppercase tracking-widest flex items-center gap-2">
            <Activity className="w-5 h-5 text-blue-500" /> HR Dashboard
          </h1>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
            Live employee data &amp; workforce overview
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={fetchData}
            disabled={loading}
            className="flex items-center gap-2 px-3 py-2 border border-gray-200 hover:border-blue-400 text-gray-400 hover:text-blue-500 rounded bg-white shadow-sm text-[10px] font-black uppercase tracking-widest transition-all disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} /> Sync
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#0061f2] text-white text-[10px] font-black rounded shadow-lg shadow-blue-100 uppercase tracking-widest hover:bg-blue-700 transition-all">
            <UserPlus className="w-3.5 h-3.5" /> Add Employee
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#6b58d3] text-white text-[10px] font-black rounded shadow-lg shadow-purple-100 uppercase tracking-widest hover:bg-purple-700 transition-all">
            <Users className="w-3.5 h-3.5" /> All Employees
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#00cfd5] text-white text-[10px] font-black rounded shadow-lg shadow-cyan-100 uppercase tracking-widest hover:bg-cyan-600 transition-all">
            <GitFork className="w-3.5 h-3.5" /> Hierarchy
          </button>
        </div>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="mb-6 flex items-center gap-3 px-5 py-3 bg-rose-50 border border-rose-100 rounded-xl text-rose-700 text-[11px] font-black uppercase tracking-wide">
          <AlertCircle className="w-4 h-4" /> {error}
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {statCards.map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={i} className={`bg-white rounded-xl p-5 shadow-sm border border-gray-100 group hover:shadow-md transition-all relative overflow-hidden`}>
              <div className={`absolute top-0 left-0 w-1 h-full ${s.bar} rounded-l-xl`} />
              <div className="pl-2">
                <div className="flex justify-between items-start mb-3">
                  <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest leading-tight">{s.label}</p>
                  <div className={`w-7 h-7 ${s.bg} rounded-full flex items-center justify-center border ${s.border} shrink-0`}>
                    <Icon className={`w-3.5 h-3.5 ${s.color}`} />
                  </div>
                </div>
                {loading
                  ? <div className="h-7 w-10 bg-gray-100 rounded animate-pulse" />
                  : <div className="text-2xl font-black text-gray-800">{s.value.toLocaleString()}</div>
                }
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-8">
        <div className="bg-gray-50/50 px-6 py-4 border-b border-gray-100">
          <h2 className="text-[11px] font-black text-[#0061f2] uppercase tracking-widest">Quick Actions</h2>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { label: 'Add Employee', color: 'bg-[#0061f2]', icon: UserPlus },
              { label: 'All Employees', color: 'bg-[#6b58d3]', icon: Users },
              { label: `Pending IT · ${stats?.pendingIT ?? 0}`, color: 'bg-[#f6c23e]', icon: Clock },
              { label: `Approved · ${stats?.approvedByIT ?? 0}`, color: 'bg-[#1cc88a]', icon: CheckCircle2 },
              { label: 'Hierarchy', color: 'bg-[#00cfd5]', icon: GitFork },
              { label: 'Manage Users', color: 'bg-[#323c4e]', icon: UserCog },
            ].map((btn, i) => {
              const BtnIcon = btn.icon;
              return (
                <button key={i} className={`flex items-center justify-center gap-2 px-3 py-3 ${btn.color} text-white text-[9px] font-black rounded shadow-sm uppercase tracking-tight hover:scale-[1.03] transition-transform text-center`}>
                  <BtnIcon className="w-3.5 h-3.5 shrink-0" />
                  {btn.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main 3-col grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">

        {/* Recent Employees — spans 2 cols */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
          <div className="bg-gray-50/50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-[11px] font-black text-[#0061f2] uppercase tracking-widest flex items-center gap-2">
              <Users className="w-3.5 h-3.5" /> Recent Employees
            </h2>
            <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Latest 10</span>
          </div>

          <div className="overflow-x-auto flex-1">
            <table className="w-full text-[10px] border-collapse">
              <thead>
                <tr className="bg-gray-50/80 text-gray-400 uppercase tracking-widest text-[8px] border-b border-gray-100">
                  <th className="px-5 py-3 text-left font-black border-r border-gray-100">Employee</th>
                  <th className="px-5 py-3 text-left font-black border-r border-gray-100">Role</th>
                  <th className="px-5 py-3 text-left font-black border-r border-gray-100">Dept / Location</th>
                  <th className="px-5 py-3 text-center font-black border-r border-gray-100">Status</th>
                  <th className="px-5 py-3 text-left font-black">Joined</th>
                </tr>
              </thead>
              <tbody>
                {loading
                  ? [...Array(5)].map((_, i) => (
                    <tr key={i} className="border-b border-gray-50 animate-pulse">
                      <td className="px-5 py-4"><div className="h-3 bg-gray-100 rounded w-28" /></td>
                      <td className="px-5 py-4"><div className="h-3 bg-gray-100 rounded w-20" /></td>
                      <td className="px-5 py-4"><div className="h-3 bg-gray-100 rounded w-24" /></td>
                      <td className="px-5 py-4 text-center"><div className="h-5 bg-gray-50 rounded-full w-14 mx-auto" /></td>
                      <td className="px-5 py-4"><div className="h-3 bg-gray-100 rounded w-16" /></td>
                    </tr>
                  ))
                  : data?.recentEmployees.length === 0
                    ? (
                      <tr>
                        <td colSpan={5} className="px-8 py-16 text-center">
                          <div className="flex flex-col items-center gap-3">
                            <div className="w-14 h-14 bg-gray-50 rounded-full flex items-center justify-center border border-gray-100">
                              <Users className="w-7 h-7 text-gray-200" />
                            </div>
                            <p className="text-[11px] font-black text-gray-300 uppercase tracking-widest">No employees found.</p>
                            <button className="flex items-center gap-2 mt-2 px-5 py-2.5 bg-[#0061f2] text-white text-[10px] font-black rounded-full shadow uppercase tracking-widest hover:bg-blue-700 transition-all">
                              <UserPlus className="w-3.5 h-3.5" /> Add First Employee
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                    : data?.recentEmployees.map(emp => (
                      <tr key={emp.id} className="border-b border-gray-50 hover:bg-slate-50/40 transition-colors">
                        <td className="px-5 py-3.5 border-r border-gray-100">
                          <div className="flex flex-col">
                            <span className="font-black text-gray-700 uppercase text-[10px]">{emp.name}</span>
                            <span className="text-[8px] text-[#6b58d3] font-bold">{emp.employeeId ?? `ID-${emp.id}`}</span>
                          </div>
                        </td>
                        <td className="px-5 py-3.5 font-bold text-gray-500 border-r border-gray-100 text-[10px]">
                          {emp.role || '—'}
                        </td>
                        <td className="px-5 py-3.5 border-r border-gray-100">
                          <div className="flex flex-col gap-0.5">
                            {emp.departmentName && (
                              <span className="flex items-center gap-1 text-[9px] font-bold text-gray-500">
                                <Building2 className="w-3 h-3 text-gray-300" /> {emp.departmentName}
                              </span>
                            )}
                            {emp.locationName && (
                              <span className="flex items-center gap-1 text-[9px] font-bold text-gray-400">
                                <MapPin className="w-3 h-3 text-gray-300" /> {emp.locationName}
                              </span>
                            )}
                            {!emp.departmentName && !emp.locationName && <span className="text-gray-300">—</span>}
                          </div>
                        </td>
                        <td className="px-5 py-3.5 text-center border-r border-gray-100">
                          <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest border ${STATUS_BADGE[emp.status] ?? 'bg-gray-50 text-gray-400 border-gray-100'}`}>
                            {emp.status}
                          </span>
                        </td>
                        <td className="px-5 py-3.5 text-[9px] font-bold text-gray-400 whitespace-nowrap">
                          {formatDate(emp.createdAt)}
                        </td>
                      </tr>
                    ))
                }
              </tbody>
            </table>
          </div>
        </div>

        {/* Right-side panels */}
        <div className="space-y-6">

          {/* Status Distribution */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="bg-gray-50/50 px-5 py-3 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-[10px] font-black text-blue-500 uppercase tracking-widest flex items-center gap-2">
                <PieChart className="w-3.5 h-3.5" /> Status Distribution
              </h2>
            </div>
            <div className="p-4 space-y-2.5">
              {loading
                ? [...Array(3)].map((_, i) => (
                  <div key={i} className="animate-pulse flex items-center gap-3">
                    <div className="h-3 w-16 bg-gray-100 rounded" />
                    <div className="flex-1 h-2 bg-gray-100 rounded-full" />
                    <div className="h-3 w-5 bg-gray-100 rounded" />
                  </div>
                ))
                : data?.statusDistribution.length === 0
                  ? <p className="text-[10px] text-gray-300 font-bold uppercase text-center py-6">No data available</p>
                  : data?.statusDistribution.map((s, i) => {
                    const total = data.stats.totalEmployees || 1;
                    const pct = Math.round((s.count / total) * 100);
                    const colorBar = STATUS_COLORS[s.status ?? ''] ?? 'bg-gray-300';
                    return (
                      <div key={i} className="flex items-center gap-2">
                        <span className="text-[9px] font-black text-gray-500 uppercase w-16 shrink-0 truncate">{s.status}</span>
                        <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div className={`h-full ${colorBar} rounded-full transition-all duration-700`} style={{ width: `${pct}%` }} />
                        </div>
                        <span className="text-[9px] font-black text-gray-400 w-6 text-right">{s.count}</span>
                      </div>
                    );
                  })
              }
            </div>
          </div>

          {/* Pending Profile Updates */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="bg-gray-50/50 px-5 py-3 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-[10px] font-black text-amber-500 uppercase tracking-widest flex items-center gap-2">
                <FileEdit className="w-3.5 h-3.5" /> Pending Updates
              </h2>
              <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
            </div>
            <div className="divide-y divide-gray-50">
              {loading
                ? [...Array(3)].map((_, i) => (
                  <div key={i} className="px-5 py-3 animate-pulse flex items-center gap-3">
                    <div className="h-3 w-20 bg-gray-100 rounded" />
                    <div className="h-4 w-12 bg-gray-100 rounded" />
                  </div>
                ))
                : data?.pendingProfileUpdates.length === 0
                  ? <p className="text-[10px] text-gray-300 font-bold uppercase text-center py-8">No pending updates</p>
                  : data?.pendingProfileUpdates.map(upd => (
                    <div key={upd.id} className="px-5 py-3 hover:bg-amber-50/30 transition-colors">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="font-black text-gray-700 text-[10px] uppercase">{upd.employeeName}</p>
                          <p className="text-[8px] text-[#6b58d3] font-bold">{upd.employeeCode}</p>
                        </div>
                        <span className="px-2 py-0.5 rounded text-[7px] font-black uppercase bg-amber-50 text-amber-700 border border-amber-100 shrink-0">
                          {upd.fieldName}
                        </span>
                      </div>
                      <div className="mt-1.5 flex items-center gap-1.5 text-[9px]">
                        <span className="text-gray-400 italic">{upd.oldValue || 'None'}</span>
                        <ChevronRight className="w-3 h-3 text-gray-300" />
                        <span className="font-bold text-gray-600">{upd.newValue}</span>
                      </div>
                    </div>
                  ))
              }
            </div>
          </div>
        </div>
      </div>

      {/* Bottom row: Location + Department distribution + Fund summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">

        {/* Location Distribution */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-gray-50/50 px-5 py-3 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-[10px] font-black text-blue-500 uppercase tracking-widest flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5" /> By Location
            </h2>
          </div>
          <div className="p-4 space-y-3">
            {loading
              ? [...Array(3)].map((_, i) => <div key={i} className="h-8 bg-gray-50 rounded animate-pulse" />)
              : data?.locationDistribution.length === 0
                ? <p className="text-[10px] text-gray-300 font-bold uppercase text-center py-8">No data</p>
                : data?.locationDistribution.map((l, i) => (
                  <div key={i}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[9px] font-black text-gray-600 uppercase truncate max-w-[120px]">{l.location}</span>
                      <span className="text-[9px] font-bold text-gray-400">{l.count}</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${BAR_COLORS[i % BAR_COLORS.length]} rounded-full transition-all duration-700`}
                        style={{ width: `${Math.round((l.count / maxLocCount) * 100)}%` }}
                      />
                    </div>
                  </div>
                ))
            }
          </div>
        </div>

        {/* Department Distribution */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-gray-50/50 px-5 py-3 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-[10px] font-black text-blue-500 uppercase tracking-widest flex items-center gap-2">
              <Building2 className="w-3.5 h-3.5" /> By Department
            </h2>
          </div>
          <div className="p-4 space-y-3">
            {loading
              ? [...Array(3)].map((_, i) => <div key={i} className="h-8 bg-gray-50 rounded animate-pulse" />)
              : data?.departmentDistribution.length === 0
                ? <p className="text-[10px] text-gray-300 font-bold uppercase text-center py-8">No data</p>
                : data?.departmentDistribution.map((d, i) => (
                  <div key={i}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[9px] font-black text-gray-600 uppercase truncate max-w-[120px]">{d.department}</span>
                      <span className="text-[9px] font-bold text-gray-400">{d.count}</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${BAR_COLORS[i % BAR_COLORS.length]} rounded-full transition-all duration-700`}
                        style={{ width: `${Math.round((d.count / maxDeptCount) * 100)}%` }}
                      />
                    </div>
                  </div>
                ))
            }
          </div>
        </div>

        {/* Fund Summary */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-gray-50/50 px-5 py-3 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-[10px] font-black text-blue-500 uppercase tracking-widest flex items-center gap-2">
              <Wallet className="w-3.5 h-3.5" /> Fund Tracking
            </h2>
          </div>
          <div className="p-5 space-y-4">
            {[
              { label: 'Total Records', value: data?.fundSummary.totalFunds ?? 0, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-100', icon: BarChart3 },
              { label: 'Pending Release', value: data?.fundSummary.pendingFunds ?? 0, color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-100', icon: Clock },
              { label: 'Total Disbursed', value: `₹${(data?.fundSummary.totalDisbursed ?? 0).toLocaleString('en-IN')}`, color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-100', icon: TrendingUp, isString: true },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className={`flex items-center gap-4 p-3 rounded-xl ${item.bg} border ${item.border}`}>
                  <div className={`w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-sm border ${item.border}`}>
                    <Icon className={`w-4 h-4 ${item.color}`} />
                  </div>
                  <div>
                    <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest">{item.label}</p>
                    {loading
                      ? <div className="h-5 w-12 bg-white rounded animate-pulse mt-0.5" />
                      : <p className={`text-lg font-black ${item.color}`}>{item.value}</p>
                    }
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center text-[10px] text-gray-400 font-bold tracking-[0.2em] uppercase">
        <p>Copyright &copy; Digital New Enterprises 2024</p>
        <div className="flex gap-4">
          <a href="#" className="hover:underline hover:text-gray-600 transition-colors">Privacy Policy</a>
          <span>•</span>
          <a href="#" className="hover:underline hover:text-gray-600 transition-colors">Terms &amp; Conditions</a>
        </div>
      </div>
    </div>
  );
}
