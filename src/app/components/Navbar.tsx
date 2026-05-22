import React, { useState, useEffect, useRef } from 'react';
import { Menu, Bell, User, Search, Settings, LogOut, Mail, X } from 'lucide-react';
import logo from '@/assets/logo.png';

interface NotificationItem {
  id: string;
  type: 'employee' | 'gst' | 'backup';
  title: string;
  subtitle: string;
  path?: string;
  actionLabel?: string;
  color?: 'amber' | 'blue' | 'emerald';
  empData?: any;
}

const STATIC_ALERTS: NotificationItem[] = [
  {
    id: 'static-gst',
    type: 'gst',
    title: 'GST compliance filing window is open for the current financial quarter.',
    subtitle: 'Accounts Department • 2 hours ago',
    path: '/accounts/prepare-gstr',
    actionLabel: 'Prepare GSTR',
    color: 'blue'
  },
  {
    id: 'static-backup',
    type: 'backup',
    title: 'Weekly system backup completed successfully. All data secure.',
    subtitle: 'IT System Control • 1 day ago',
    color: 'emerald'
  }
];

interface NavbarProps {
  onToggleSidebar: () => void;
  onLogout?: () => void;
  onNavigate: (path: string) => void;
  user: {
    name?: string;
    fullName?: string;
    email: string;
    avatar: string;
  };
}

const SEARCHABLE_PAGES = [
  // Dashboards
  { label: 'Dashboard Home', path: '/dashboard' },
  { label: 'Company GST Info', path: '/company-gst' },
  { label: 'Sub GST List', path: '/sub-gst' },
  { label: 'Delivery Details & Logs', path: '/delivery-details' },
  { label: 'Add Bank Account', path: '/add-bank' },
  { label: 'Bank Details List', path: '/bank-details' },
  { label: 'Upload Documents / PVC', path: '/upload-documents' },
  { label: 'My Uploaded Documents', path: '/my-documents' },
  { label: 'My Employee Portal', path: '/portal' },
  { label: 'View My Profile', path: '/portal/view-profile' },
  { label: 'Update My Profile', path: '/portal/profile' },

  // Business
  { label: 'Projects Registry', path: '/projects' },
  { label: 'Create New Quotation', path: '/quotations/new' },
  { label: 'View All Quotations', path: '/quotations/all' },
  { label: 'Quotation Work Management', path: '/quotations/work-manage' },
  { label: 'Purchase Invoices', path: '/purchase' },
  { label: 'Search and Manage Purchases', path: '/purchase/manage' },
  { label: 'Single Item Selling Page', path: '/purchase/single-item' },
  { label: 'Purchase DC Page', path: '/purchase/dc' },
  { label: 'All Created DC List', path: '/purchase/all-dc' },
  { label: 'Total Item Consumption', path: '/invoices/consumption' },
  { label: 'All Invoices View', path: '/invoices/all' },

  // Accounts
  { label: 'Prepare GSTR Document', path: '/accounts/prepare-gstr' },
  { label: 'All Prepared GSTR list', path: '/accounts/all-prepared-gstr' },
  { label: 'Input GST Ledger', path: '/accounts/input-gst' },

  // Employee Management
  { label: 'HR Dashboard', path: '/hr/dashboard' },
  { label: 'Profile Updates History', path: '/hr/profile-updates' },
  { label: 'Manage All Employees', path: '/hr/employees' },
  { label: 'Add New Employee Registration', path: '/hr/add-employee' },
  { label: 'Create Employee Group ID', path: '/hr/group-id' },
  { label: 'Wing Management', path: '/hr/wing' },
  { label: 'New Department Setup', path: '/hr/department' },
  { label: 'Location Management', path: '/hr/location' },
  { label: 'Sub-Location Setup', path: '/hr/sub-location' },
  { label: 'Create New Post Designation', path: '/hr/post' },
  { label: 'Role Assignment Controls', path: '/hr/role-assign' },
  { label: 'Manager Assignment Setup', path: '/hr/manager-assign' },
  { label: 'Assign Location Head', path: '/hr/location-head' },
  { label: 'Post Grouping Rules', path: '/hr/post-grouping' },
  { label: 'Employee Provident Fund Tracking', path: '/hr/employee-funds' },

  // Duty & Attendance
  { label: 'Manage Duty Shifts', path: '/hr/shifts' },
  { label: 'Daily Attendance Logs', path: '/hr/attendance/daily' },
  { label: 'Bulk Daily Attendance Import', path: '/hr/attendance/bulk' },
  { label: 'Attendance Sheet View', path: '/hr/attendance/view' },
  { label: 'Attendance Approvals Window', path: '/hr/attendance/approval' },
  { label: 'Manual Attendance Entry', path: '/hr/attendance/manual' },
  { label: 'Employee Overtime Duty', path: '/hr/ot' },
  { label: 'Overtime Approvals Panel', path: '/hr/ot-approvals' },

  // Salary & Payroll
  { label: 'Employee Salary Structure', path: '/hr/salaries' },
  { label: 'Salary Types Definition', path: '/hr/salary-types' },
  { label: 'View Salary Draft', path: '/hr/salary/draft' },
  { label: 'Salary Runs Processing', path: '/hr/salary/runs' },

  // Leaves & Holidays
  { label: 'Leave Types Registry', path: '/hr/leave-types' },
  { label: 'Leave Allocation Settings', path: '/hr/leave/assign' },
  { label: 'Apply for Leave Request', path: '/hr/leave/apply' },
  { label: 'Leave Approval Console', path: '/hr/leave/approval' },
  { label: 'Holiday List Definition', path: '/hr/holiday-list' },
  { label: 'Holiday Calendar View', path: '/hr/holiday-calendar' },
  { label: 'Employee Holidays Allotment', path: '/hr/employee-holidays' },

  // IT & Access
  { label: 'IT Dashboard & Stats', path: '/it/dashboard' },
  { label: 'IT Employee Approval Queue', path: '/it/employee-approval' },
  { label: 'Update System Passwords', path: '/it/update-password' },
  { label: 'Manage Portal Users', path: '/it/manage-users' },
  { label: 'Manage System Roles', path: '/it/manage-roles' },

  // DD Master Menus
  { label: 'Payment Mode Master', path: '/dd/payment-mode' },
  { label: 'Category Registry Master', path: '/dd/categories' },
  { label: 'Product Brand Master', path: '/dd/brands' },
  { label: 'Sub-Category Registry', path: '/dd/sub-categories' },
  { label: 'Client Department Registry', path: '/dd/client-department' },
  { label: 'Designation Officer Master', path: '/dd/designation-officer' },
  { label: 'Department - Designation - Officer Mapping', path: '/dd/department-designation-officer' },
  { label: 'HSN Tax Code Registry', path: '/dd/hsn' },
  { label: 'GST Percentage Tier Setup', path: '/dd/gst-percent' },
  { label: 'GST Type Setup', path: '/dd/gst-type' },
  { label: 'Denomination Configuration', path: '/dd/denom' },
  { label: 'State GST Codes Registry', path: '/dd/state' },
  { label: 'City Registry Master', path: '/dd/city' },
  { label: 'State-Location Mapping', path: '/dd/state-location' },
  { label: 'Expense Types Setup', path: '/dd/expense' },
  { label: 'Transaction Amount Master', path: '/dd/amount' },
  { label: 'Project Listing Master', path: '/dd/add-project' },
  { label: 'Amount Type Definitions', path: '/dd/amount-type' },
  { label: 'Core Educational Qualifications', path: '/dd/core-qualification' },
  { label: 'Document Category Setup', path: '/dd/document-categories' },
  { label: 'Sub-Document Category Setup', path: '/dd/sub-document-categories' },
  { label: 'Sub-Sub-Document Category Configuration', path: '/dd/sub-sub-document-categories' }
];

export function Navbar({ onToggleSidebar, user, onLogout, onNavigate }: NavbarProps) {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showNotificationDropdown, setShowNotificationDropdown] = useState(false);
  const [showMailDropdown, setShowMailDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  
  const [pendingEmployees, setPendingEmployees] = useState<any[]>([]);
  const [loadingPending, setLoadingPending] = useState(false);
  const [dismissedIds, setDismissedIds] = useState<string[]>([]);

  const profileRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);
  const mailRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  // Fetch real-time pending approvals from backend
  useEffect(() => {
    let active = true;
    const fetchEmployees = async () => {
      try {
        setLoadingPending(true);
        const response = await fetch('http://localhost:5076/api/employees');
        if (response.ok) {
          const data = await response.json();
          if (active) {
            const pending = data.filter((e: any) => e.status === 'Pending');
            setPendingEmployees(pending);
          }
        }
      } catch (error) {
        console.warn('Backend API `/api/employees` is offline. Using local simulated pending items.');
        if (active) {
          setPendingEmployees([
            { id: 101, name: 'Sanjay Kumar', email: 'sanjay.k@gmail.com', role: 'Engineer', qualification: 'B.Tech', annualSalary: '750000', createdAt: new Date().toISOString() }
          ]);
        }
      } finally {
        if (active) setLoadingPending(false);
      }
    };
    fetchEmployees();
    const interval = setInterval(fetchEmployees, 30000);
    return () => {
      active = false;
      clearInterval(interval);
    };
  }, []);

  // Handle click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfileDropdown(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotificationDropdown(false);
      }
      if (mailRef.current && !mailRef.current.contains(event.target as Node)) {
        setShowMailDropdown(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearchResults(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const filteredPages = searchQuery.trim() === ''
    ? []
    : SEARCHABLE_PAGES.filter(page =>
        page.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        page.path.toLowerCase().includes(searchQuery.toLowerCase())
      );

  const activeNotifications = [
    ...pendingEmployees.map(emp => ({
      id: `emp-${emp.id}`,
      type: 'employee' as const,
      title: `New employee ${emp.name.toUpperCase()} is pending registration approval.`,
      subtitle: `Role: ${emp.role || 'Staff'} • Quals: ${emp.qualification || 'N/A'}`,
      path: '/hr/employee-approval',
      actionLabel: 'Go to Approvals',
      color: 'amber' as const,
      empData: emp
    })),
    ...STATIC_ALERTS
  ].filter(item => !dismissedIds.includes(item.id));

  const notificationCount = activeNotifications.length;

  const removeNotification = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setDismissedIds(prev => [...prev, id]);
  };

  const clearAllNotifications = (e: React.MouseEvent) => {
    e.stopPropagation();
    const allIds = [
      ...pendingEmployees.map(emp => `emp-${emp.id}`),
      ...STATIC_ALERTS.map(alert => alert.id)
    ];
    setDismissedIds(prev => {
      const next = [...prev];
      allIds.forEach(id => {
        if (!next.includes(id)) {
          next.push(id);
        }
      });
      return next;
    });
  };

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 z-50 relative">
      <div className="flex items-center gap-4">
        <button 
          onClick={onToggleSidebar}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-500"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2">
           <img src={logo} alt="Company Logo" className="h-8 w-auto object-contain" />
           <span className="font-black text-xs tracking-tighter text-gray-800 uppercase">Digital Engineering Enterprises</span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* Global Search Component */}
        <div ref={searchRef} className="hidden md:flex items-center relative mr-4">
           <Search className="w-4 h-4 text-gray-400 absolute left-3 z-10" />
           <input 
             type="text" 
             placeholder="Search for..." 
             value={searchQuery}
             onChange={(e) => {
               setSearchQuery(e.target.value);
               setShowSearchResults(true);
             }}
             onFocus={() => setShowSearchResults(true)}
             className="bg-gray-100 border-none rounded-lg pl-10 pr-4 py-2 text-xs w-64 focus:ring-2 focus:ring-blue-500 transition-all z-0 font-bold"
           />
           {showSearchResults && searchQuery.trim() !== '' && (
             <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl max-h-80 overflow-y-auto z-50 py-2">
               <div className="px-3 py-1.5 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-50">
                 Search Results ({filteredPages.length})
               </div>
               {filteredPages.length === 0 ? (
                 <div className="px-4 py-4 text-center text-xs text-gray-400 font-bold">
                   No pages found for "{searchQuery}"
                 </div>
               ) : (
                 filteredPages.map(page => (
                   <button
                     key={page.path}
                     onClick={() => {
                       onNavigate(page.path);
                       setSearchQuery('');
                       setShowSearchResults(false);
                     }}
                     className="w-full text-left px-4 py-2 hover:bg-blue-50 transition-colors flex flex-col"
                   >
                     <span className="text-xs font-bold text-gray-700">{page.label}</span>
                     <span className="text-[9px] text-gray-400 font-bold tracking-tight">{page.path}</span>
                   </button>
                 ))
               )}
             </div>
           )}
        </div>
        
        {/* Notifications Component */}
        <div ref={notificationRef} className="relative">
          <button 
            onClick={() => {
              setShowNotificationDropdown(!showNotificationDropdown);
              setShowMailDropdown(false);
              setShowProfileDropdown(false);
            }}
            className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg relative transition-all"
            title="Notifications"
          >
            <Bell className="w-5 h-5" />
            {notificationCount > 0 && (
              <span className="absolute top-1 right-1 px-1 min-w-[16px] h-4 bg-red-500 border border-white rounded-full text-[8px] font-black text-white flex items-center justify-center animate-pulse">
                {notificationCount}
              </span>
            )}
          </button>
          
          {showNotificationDropdown && (
            <div className="absolute right-0 top-full mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-xl z-50 py-2">
              <div className="px-4 py-2 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black text-gray-800 uppercase tracking-widest">Notifications</span>
                  {notificationCount > 0 && (
                    <span className="bg-red-100 text-red-600 text-[9px] font-black px-1.5 py-0.5 rounded-full">
                      {notificationCount}
                    </span>
                  )}
                </div>
                {notificationCount > 0 && (
                  <button
                    onClick={clearAllNotifications}
                    className="text-[9px] font-black text-gray-400 hover:text-red-500 hover:bg-red-50 px-2 py-1 rounded transition-all uppercase tracking-wider"
                  >
                    Clear All
                  </button>
                )}
              </div>
              <div className="max-h-72 overflow-y-auto divide-y divide-gray-50">
                {activeNotifications.length === 0 ? (
                  <div className="p-6 text-center text-xs text-gray-400 font-bold">
                    No new notifications
                  </div>
                ) : (
                  activeNotifications.map(item => {
                    let icon = <Bell className="w-3.5 h-3.5" />;
                    let iconBg = 'bg-blue-50 text-blue-500';
                    let itemBg = 'bg-white';

                    if (item.type === 'employee') {
                      icon = <User className="w-3.5 h-3.5" />;
                      iconBg = 'bg-amber-50 text-amber-500';
                      itemBg = 'bg-amber-50/10';
                    } else if (item.type === 'backup') {
                      iconBg = 'bg-emerald-50 text-emerald-500';
                    }

                    return (
                      <div
                        key={item.id}
                        className={`p-3 hover:bg-gray-50 transition-colors relative group ${itemBg}`}
                      >
                        <button
                          onClick={(e) => removeNotification(item.id, e)}
                          className="absolute top-2 right-2 text-gray-400 hover:text-red-500 hover:bg-gray-100 rounded-full p-1 transition-all"
                          title="Dismiss notification"
                        >
                          <X className="w-3 h-3" />
                        </button>

                        <div className="flex gap-2.5 pr-6">
                          <div className={`mt-0.5 p-1.5 rounded-full h-fit shrink-0 ${iconBg}`}>
                            {icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold text-gray-700 leading-snug">
                              {item.type === 'employee' ? (
                                <>
                                  New employee <span className="font-black text-gray-900 uppercase">{item.empData?.name}</span> is pending registration approval.
                                </>
                              ) : (
                                item.title
                              )}
                            </p>
                            <p className="text-[9px] font-bold text-gray-400 mt-0.5">{item.subtitle}</p>
                            {item.path && item.actionLabel && (
                              <button
                                onClick={() => {
                                  onNavigate(item.path!);
                                  setShowNotificationDropdown(false);
                                }}
                                className="mt-2 text-[9px] font-black text-blue-600 uppercase tracking-widest hover:underline flex items-center gap-1"
                              >
                                {item.actionLabel} &rarr;
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
              <div className="border-t border-gray-100 mt-1 px-4 py-1.5 text-center">
                <button 
                  onClick={() => {
                    onNavigate('/hr/dashboard');
                    setShowNotificationDropdown(false);
                  }}
                  className="text-[9px] font-black text-gray-400 hover:text-blue-600 uppercase tracking-widest transition-colors"
                >
                  View All Alerts
                </button>
              </div>
            </div>
          )}
        </div>
        
        {/* Messages Component */}
        <div ref={mailRef} className="relative">
          <button 
            onClick={() => {
              setShowMailDropdown(!showMailDropdown);
              setShowNotificationDropdown(false);
              setShowProfileDropdown(false);
            }}
            className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg relative transition-all"
            title="Messages"
          >
            <Mail className="w-5 h-5" />
            <span className="absolute top-1 right-1 px-1 min-w-[12px] h-3 bg-blue-500 border border-white rounded-full text-[7px] font-black text-white flex items-center justify-center">
              2
            </span>
          </button>

          {showMailDropdown && (
            <div className="absolute right-0 top-full mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-xl z-50 py-2">
              <div className="px-4 py-2 border-b border-gray-100 flex items-center justify-between bg-gray-50/10">
                <span className="text-[10px] font-black text-gray-800 uppercase tracking-widest">Inbox Alerts</span>
                <span className="bg-blue-100 text-blue-600 text-[9px] font-black px-1.5 py-0.5 rounded-full">2 New</span>
              </div>
              <div className="max-h-72 overflow-y-auto divide-y divide-gray-50">
                <div className="p-3 hover:bg-gray-50 transition-colors bg-blue-50/10">
                  <div className="flex gap-2.5">
                    <div className="mt-0.5 p-1.5 bg-rose-50 rounded-full text-rose-500 h-fit">
                      <Mail className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <span className="text-[9px] font-black text-gray-800 uppercase tracking-wider">HR DEPARTMENT</span>
                        <span className="text-[7px] font-black bg-rose-100 text-rose-600 px-1 py-0.2 rounded uppercase tracking-tighter">Urgent</span>
                      </div>
                      <p className="text-xs font-bold text-gray-700 leading-snug mt-1">
                        Please complete your PVC (Police Verification Certificate) upload by the end of this week.
                      </p>
                      <p className="text-[9px] font-bold text-gray-400 mt-0.5">Required document for compliance verification.</p>
                      <button
                        onClick={() => {
                          onNavigate('/upload-documents');
                          setShowMailDropdown(false);
                        }}
                        className="mt-2 text-[9px] font-black text-rose-600 uppercase tracking-widest hover:underline flex items-center gap-1"
                      >
                        Upload PVC Now &rarr;
                      </button>
                    </div>
                  </div>
                </div>

                <div className="p-3 hover:bg-gray-50 transition-colors">
                  <div className="flex gap-2.5">
                    <div className="mt-0.5 p-1.5 bg-gray-100 rounded-full text-gray-500 h-fit">
                      <Mail className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <span className="text-[9px] font-black text-gray-500 uppercase tracking-wider">IT SUPPORT</span>
                        <span className="text-[7px] font-black bg-gray-100 text-gray-500 px-1 py-0.2 rounded uppercase tracking-tighter">System</span>
                      </div>
                      <p className="text-xs font-bold text-gray-700 leading-snug mt-1">
                        Routine system database maintenance is scheduled for Sunday between 2:00 AM and 4:00 AM IST.
                      </p>
                      <p className="text-[9px] font-bold text-gray-400 mt-0.5">Expect minor interruptions during this window.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="h-8 w-[1px] bg-gray-200 mx-2"></div>

        {/* Profile Pill & Dropdown */}
        <div ref={profileRef} className="relative">
          <button 
            onClick={() => {
              setShowProfileDropdown(!showProfileDropdown);
              setShowNotificationDropdown(false);
              setShowMailDropdown(false);
            }}
            className="flex items-center gap-3 pl-2 pr-1 py-1 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <div className="text-right hidden sm:block">
              <p className="text-[11px] font-black text-gray-800 uppercase tracking-wider leading-none mb-0.5">{user.fullName || user.name}</p>
              <p className="text-[9px] font-bold text-gray-400 leading-none">{user.email}</p>
            </div>
            <img 
              src={user.avatar || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(user.fullName || user.name || 'User')} 
              alt="Profile" 
              className="w-8 h-8 rounded-full border border-gray-100"
            />
          </button>
          
          {showProfileDropdown && (
            <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-xl z-50 py-1">
              <div className="px-4 py-2.5 border-b border-gray-100 bg-gray-50/50">
                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Logged in as</p>
                <p className="text-xs font-black text-gray-800 uppercase tracking-tight truncate mt-0.5">{user.fullName || user.name}</p>
                <p className="text-[9px] font-bold text-gray-400 truncate">{user.email}</p>
              </div>
              <div className="py-1">
                <button 
                  onClick={() => {
                    onNavigate('/portal/view-profile');
                    setShowProfileDropdown(false);
                  }}
                  className="w-full text-left px-4 py-2 text-xs font-bold text-gray-600 hover:bg-gray-50 hover:text-blue-600 transition-colors flex items-center gap-2"
                >
                  <User className="w-3.5 h-3.5 text-gray-400" />
                  View My Profile
                </button>
                <button 
                  onClick={() => {
                    onNavigate('/portal/profile');
                    setShowProfileDropdown(false);
                  }}
                  className="w-full text-left px-4 py-2 text-xs font-bold text-gray-600 hover:bg-gray-50 hover:text-blue-600 transition-colors flex items-center gap-2"
                >
                  <Settings className="w-3.5 h-3.5 text-gray-400" />
                  Edit Profile Settings
                </button>
                <button 
                  onClick={() => {
                    onNavigate('/it/update-password');
                    setShowProfileDropdown(false);
                  }}
                  className="w-full text-left px-4 py-2 text-xs font-bold text-gray-600 hover:bg-gray-50 hover:text-blue-600 transition-colors flex items-center gap-2"
                >
                  <Settings className="w-3.5 h-3.5 text-gray-400" />
                  Change Password
                </button>
              </div>
              <div className="border-t border-gray-100 my-1"></div>
              <div className="px-2 py-1">
                <button 
                  onClick={() => {
                    setShowProfileDropdown(false);
                    onLogout?.();
                  }}
                  className="w-full text-left px-3 py-2 text-xs font-black text-rose-600 hover:bg-rose-50 rounded-md transition-colors flex items-center gap-2"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Logout Session
                </button>
              </div>
            </div>
          )}
        </div>

        <button 
          onClick={onLogout}
          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors ml-1 hidden sm:inline-flex"
          title="Logout"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
}
