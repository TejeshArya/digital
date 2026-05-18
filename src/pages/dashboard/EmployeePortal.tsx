import React, { useState, useEffect } from 'react';
import { 
  Fingerprint, Eye, User as UserIcon, CalendarPlus, ShoppingCart, Banknote, 
  ListTodo, History, CheckCircle, ClipboardList, CalendarDays, 
  Sun, BadgeCheck, Building2, LayoutGrid, Calendar, ChevronRight
} from 'lucide-react';

interface UserProfile {
  name: string;
  email: string;
  employeeId: string;
  department?: { name: string };
  location?: { name: string };
  status: string;
}

export function EmployeePortal({ onNavigate }: { onNavigate?: (path: string) => void }) {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      const user = JSON.parse(userStr);
      fetchProfile(user.email);
    }
  }, []);

  const fetchProfile = async (email: string) => {
    try {
      const response = await fetch(`http://localhost:5076/api/employees/email/${email}`);
      if (response.ok) {
        const data = await response.json();
        setProfile(data);
      } else {
        // Mock fallback if offline/error
        setProfile({
          name: 'SANJAY KUMAR MAHATO',
          email: email,
          employeeId: 'DEE251225103',
          department: { name: 'P & P' },
          location: { name: 'JAMNAGAR' },
          status: 'Active'
        });
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      setProfile({
        name: 'SANJAY KUMAR MAHATO',
        email: email,
        employeeId: 'DEE251225103',
        department: { name: 'P & P' },
        location: { name: 'JAMNAGAR' },
        status: 'Active'
      });
    } finally {
      setLoading(false);
    }
  };

  const actionCards = [
    { label: 'Mark Attendance', icon: Fingerprint, color: 'text-cyan-500', border: 'border-cyan-100', bg: 'bg-cyan-50', path: '/hr/attendance/daily' },
    { label: 'View Profile', icon: Eye, color: 'text-blue-500', border: 'border-blue-100', bg: 'bg-blue-50', path: '/portal/view-profile' },
    { label: 'Update Profile', icon: UserIcon, color: 'text-amber-500', border: 'border-amber-100', bg: 'bg-amber-50', path: '/portal/profile' },
    { label: 'Apply for Leave', icon: CalendarPlus, color: 'text-emerald-500', border: 'border-emerald-100', bg: 'bg-emerald-50', path: '/hr/leave/apply' },
    { label: 'Purchase Request', icon: ShoppingCart, color: 'text-slate-600', border: 'border-slate-100', bg: 'bg-slate-50', path: '/purchase' },
    { label: 'Pay', icon: Banknote, color: 'text-emerald-500', border: 'border-emerald-100', bg: 'bg-emerald-50', badge: '19', path: '/hr/salaries' },
    { label: 'Manage Requests', icon: ListTodo, color: 'text-rose-500', border: 'border-rose-100', bg: 'bg-rose-50', badge: '30', path: '/hr/profile-updates' },
    { label: 'All Edited Purchases', icon: History, color: 'text-teal-500', border: 'border-teal-100', bg: 'bg-teal-50', badge: '6', path: '/purchase/manage' },
    { label: 'Finalized', icon: CheckCircle, color: 'text-indigo-500', border: 'border-indigo-100', bg: 'bg-indigo-50', path: '/invoices/all' },
    { label: 'Work Assigned', icon: ClipboardList, color: 'text-sky-500', border: 'border-sky-100', bg: 'bg-sky-50', path: '/projects' },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8f9fc]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-[#f8f9fc] min-h-screen font-sans">
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
              <LayoutGrid className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-800 tracking-tight uppercase">My Portal</h1>
          </div>
          <p className="text-sm text-gray-400 font-medium">
            Welcome back, <span className="text-gray-500 font-black uppercase">{profile?.name || 'User'}</span>
          </p>
        </div>
        <div className="flex items-center gap-2 text-[11px] font-bold text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-full uppercase tracking-wider">
          <Calendar className="w-3.5 h-3.5" />
          {new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}, {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>

      {/* Action Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        {actionCards.map((card, index) => (
          <div 
            key={index}
            onClick={() => card.path && onNavigate && onNavigate(card.path)}
            className={`bg-white border ${card.border} rounded-xl p-5 flex flex-col items-center justify-center gap-3 shadow-sm hover:shadow-md transition-all cursor-pointer relative group active:scale-95`}
          >
            <div className={`${card.color} ${card.bg} p-3 rounded-xl group-hover:scale-110 transition-transform`}>
              <card.icon className="w-6 h-6" />
            </div>
            <span className="text-[11px] font-black text-gray-600 uppercase text-center tracking-tight leading-tight">
              {card.label}
            </span>
            {card.badge && (
              <span className={`absolute top-2 right-2 text-[9px] font-black text-white px-1.5 py-0.5 rounded-full ${card.color.replace('text', 'bg')}`}>
                {card.badge}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm flex items-center gap-4">
          <div className="bg-blue-600 p-3 rounded-xl shadow-lg shadow-blue-100">
            <CalendarDays className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="text-[9px] font-black text-blue-600 uppercase tracking-widest mb-0.5">Attendance {new Date().toLocaleString('default', { month: 'long' })}</div>
            <div className="text-lg font-black text-gray-800">0 / 31 Days</div>
            <div className="w-full bg-gray-100 h-1.5 rounded-full mt-2">
              <div className="bg-blue-600 h-full rounded-full w-0" />
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm flex items-center gap-4">
          <div className="bg-emerald-500 p-3 rounded-xl shadow-lg shadow-emerald-100">
            <Sun className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="text-[9px] font-black text-emerald-600 uppercase tracking-widest mb-0.5">Remaining Leave</div>
            <div className="text-lg font-black text-gray-800">0 Days</div>
            <div className="text-[10px] text-gray-400 font-black uppercase mt-1">Assigned: 0</div>
          </div>
        </div>

        <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm flex items-center gap-4">
          <div className="bg-cyan-500 p-3 rounded-xl shadow-lg shadow-cyan-100">
            <BadgeCheck className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="text-[9px] font-black text-cyan-600 uppercase tracking-widest mb-0.5">Employment Status</div>
            <div className="text-lg font-black text-gray-800 italic uppercase">{profile?.status || 'Active'}</div>
            <div className="text-[10px] text-gray-400 font-black uppercase mt-1">{profile?.employeeId || 'PENDING'}</div>
          </div>
        </div>

        <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm flex items-center gap-4">
          <div className="bg-amber-500 p-3 rounded-xl shadow-lg shadow-amber-100">
            <Building2 className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="text-[9px] font-black text-amber-600 uppercase tracking-widest mb-0.5">Department</div>
            <div className="text-lg font-black text-gray-800 uppercase">{profile?.department?.name || 'Engineering'}</div>
            <div className="text-[10px] text-gray-400 font-black uppercase mt-1 tracking-wider">{profile?.location?.name || 'Headquarters'}</div>
          </div>
        </div>
      </div>

      {/* Bottom Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Attendance Details */}
        <div className="lg:col-span-2 bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden flex flex-col">
          <div className="p-5 border-b border-gray-50 flex justify-between items-center bg-gray-50/30">
            <div className="flex items-center gap-2">
              <ClipboardList className="w-4 h-4 text-blue-600" />
              <h3 className="text-[11px] font-black text-blue-700 uppercase tracking-wider">Attendance Details — {new Date().toLocaleString('default', { month: 'long', year: 'numeric' })}</h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-gray-400 font-black uppercase">Month:</span>
              <select className="text-[10px] font-black text-gray-600 bg-white border border-gray-200 rounded px-2 py-1 focus:outline-none uppercase">
                <option>{new Date().toLocaleString('default', { month: 'long', year: 'numeric' })}</option>
              </select>
            </div>
          </div>
          <div className="flex-1 min-h-[300px] flex flex-col">
            <table className="w-full text-[11px] uppercase tracking-wide font-black">
              <thead>
                <tr className="border-b border-gray-100 text-gray-800 bg-gray-50/20">
                  <th className="px-6 py-4 text-left font-black border-r border-gray-50">Date</th>
                  <th className="px-6 py-4 text-left font-black border-r border-gray-50">In Time</th>
                  <th className="px-6 py-4 text-left font-black border-r border-gray-50">Out Time</th>
                  <th className="px-6 py-4 text-left font-black border-r border-gray-50">Status</th>
                  <th className="px-6 py-4 text-left font-black">Note</th>
                </tr>
              </thead>
            </table>
            <div className="flex-1 flex flex-col items-center justify-center p-12 text-center opacity-40">
              <LayoutGrid className="w-12 h-12 text-gray-300 mb-4" />
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">No attendance records found for this month.</p>
            </div>
          </div>
        </div>

        {/* Upcoming Holidays */}
        <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden flex flex-col">
          <div className="p-5 border-b border-gray-50 flex justify-between items-center bg-gray-50/30">
            <div className="flex items-center gap-2">
              <Sun className="w-4 h-4 text-amber-500" />
              <h3 className="text-[11px] font-black text-blue-700 uppercase tracking-wider">Upcoming Holidays</h3>
            </div>
            <button className="text-[10px] font-black text-blue-600 border border-blue-200 rounded px-3 py-1 hover:bg-blue-50 uppercase transition-colors">
              View All
            </button>
          </div>
          <div className="p-6 space-y-6">
            <div className="flex items-center gap-4 group cursor-pointer">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex flex-col items-center justify-center text-white shadow-lg shadow-blue-100 group-hover:scale-105 transition-transform">
                <span className="text-[9px] font-black uppercase leading-none mb-0.5">Aug</span>
                <span className="text-xl font-black leading-none">15</span>
              </div>
              <div>
                <h4 className="text-[11px] font-black text-gray-800 uppercase tracking-wide">Independence Day</h4>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-wider mt-0.5">Saturday</p>
              </div>
            </div>

            <div className="flex items-center gap-4 group cursor-pointer">
              <div className="w-12 h-12 bg-indigo-600 rounded-xl flex flex-col items-center justify-center text-white shadow-lg shadow-indigo-100 group-hover:scale-105 transition-transform">
                <span className="text-[9px] font-black uppercase leading-none mb-0.5">Oct</span>
                <span className="text-xl font-black leading-none">02</span>
              </div>
              <div>
                <h4 className="text-[11px] font-black text-gray-800 uppercase tracking-wide">Dussehra</h4>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-wider mt-0.5">Friday</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 flex justify-between items-center text-[10px] text-gray-400 px-2 uppercase font-black tracking-[0.2em]">
        <p>Copyright &copy; Digital New Enterprises 2024</p>
        <div className="flex gap-4">
          <a href="#" className="hover:underline">Privacy Policy</a>
          <span>•</span>
          <a href="#" className="hover:underline">Terms & Conditions</a>
        </div>
      </div>
    </div>
  );
}
