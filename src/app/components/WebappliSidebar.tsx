import React, { useState } from 'react';
import {
  LayoutDashboard, User, Briefcase, Calculator,
  Users, Shield, GitMerge, List, ChevronDown,
  ChevronRight, Search, Menu, Settings, Bell,
  FolderTree, LayoutGrid
} from 'lucide-react';
import logo from '../../assets/logo.png';

interface SidebarProps {
  isOpen: boolean;
  currentPath: string;
  onNavigate: (path: string) => void;
  user: { name: string; fullName?: string; email?: string; role?: string } | null;
}

export function Sidebar({ isOpen, currentPath, onNavigate, user }: SidebarProps) {
  const [expandedMenus, setExpandedMenus] = useState<string[]>(['dashboards', 'business']);

  const toggleMenu = (id: string) => {
    setExpandedMenus(prev =>
      prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
    );
  };

  const workBookGroups = [
    {
      id: 'dashboards',
      label: 'Dashboards',
      icon: LayoutDashboard,
      children: [
        { label: 'Home', path: '/dashboard', badge: 'Updated' },
        { label: 'Company GST', path: '/company-gst' },
        { label: 'Sub GST', path: '/sub-gst' },
        { label: 'Delivery Details', path: '/delivery-details' },
        { label: 'Add Bank', path: '/add-bank' },
        { label: 'Bank Details', path: '/bank-details' },
        { label: 'Upload Documents', path: '/upload-documents' },
        { label: 'My Documents', path: '/my-documents' },
      ]
    },
    {
      id: 'portal',
      label: 'My Portal',
      icon: User,
      path: '/portal'
    }
  ];

  const workBookOperational = [
    {
      id: 'business',
      label: 'Business',
      icon: LayoutGrid,
      children: [
        { label: 'Project', path: '/projects' },
        {
          id: 'psm',
          label: 'PSM',
          children: [
            {
              id: 'quotation',
              label: 'Quotation',
              children: [
                { label: 'New Quotes', path: '/quotations/new' },
                { label: 'All Quotes', path: '/quotations/all' }
              ]
            },
            {
              id: 'purchase-and-stocks',
              label: 'Purchase and Stocks',
              children: [
                { label: 'Purchase Invoice', path: '/purchase' },
                { label: 'Search and Manage Purchase', path: '/purchase/manage' },
                { label: 'Single Item Selling Page', path: '/purchase/single-item' },
                { label: 'Purchase DC Page', path: '/purchase/dc' },
                { label: 'All Created DC', path: '/purchase/all-dc' }
              ]
            },
            {
              id: 'invoices',
              label: 'Invoices',
              children: [
                { label: 'Total Item Consumption', path: '/invoices/consumption' },
                { label: 'All Invoice', path: '/invoices/all' }
              ]
            }
          ]
        },
        {
          id: 'accounts',
          label: 'Accounts',
          children: [
            { label: 'Prepare GSTR', path: '/accounts/prepare-gstr' },
            { label: 'All Prepared GSTR', path: '/accounts/all-prepared-gstr' },
            { label: 'Input GST', path: '/accounts/input-gst' },
          ]
        },
        {
          id: 'hr',
          label: 'HR',
          children: [
            {
              id: 'hr-management',
              label: 'Employee Management',
              children: [
                { label: 'HR Dashboard', path: '/hr/dashboard' },
                { label: 'Profile Updates', path: '/hr/profile-updates' },
                { label: 'Manage Employees', path: '/hr/employees' },
                { label: 'Add New Employee', path: '/hr/add-employee' },
                { label: 'Create Group ID', path: '/hr/group-id' },
                { label: 'Wing', path: '/hr/wing' },
                { label: 'New Department', path: '/hr/department' },
                { label: 'Location', path: '/hr/location' },
                { label: 'Sub Location', path: '/hr/sub-location' },
                { label: 'Create Post', path: '/hr/post' },
                { label: 'Role Assign', path: '/hr/role-assign' },
                { label: 'Manager Assign', path: '/hr/manager-assign' },
                { label: 'Assign Location Head', path: '/hr/location-head' },
                { label: 'Post Grouping', path: '/hr/post-grouping' },
                { label: 'Employee Fund Tracking', path: '/hr/employee-funds' }
              ]
            },
            {
              id: 'hr-duty',
              label: 'Employee Duty Management',
              children: [
                { label: 'Manage Shifts', path: '/hr/shifts' },
                { label: 'Daily Attendance', path: '/hr/attendance/daily' },
                { label: 'Daily Attendance Bulk', path: '/hr/attendance/bulk' },
                { label: 'Attendance View', path: '/hr/attendance/view' },
                { label: 'Attendance Approval', path: '/hr/attendance/approval' },
                { label: 'Manual Attendance', path: '/hr/attendance/manual' },
                { label: 'Employee OT', path: '/hr/ot' },
                { label: 'OT Approvals', path: '/hr/ot-approvals' }
              ]
            },
            {
              id: 'hr-salary',
              label: 'Employee Salary Management',
              children: [
                { label: 'Employee Salary', path: '/hr/salaries' },
                { label: 'Salary Types', path: '/hr/salary-types' },
                { label: 'View Salary Draft', path: '/hr/salary/draft' },
                { label: 'Salary Runs', path: '/hr/salary/runs' }
              ]
            },
            {
              id: 'hr-leave',
              label: 'Employee Leave Management',
              children: [
                { label: 'Leave Types', path: '/hr/leave-types' },
                { label: 'Leave Assign', path: '/hr/leave/assign' },
                { label: 'Leave Apply', path: '/hr/leave/apply' },
                { label: 'Leave Approval', path: '/hr/leave/approval' },
                { label: 'Holiday List', path: '/hr/holiday-list' },
                { label: 'Holiday Calendar', path: '/hr/holiday-calendar' },
                { label: 'Employee Holidays', path: '/hr/employee-holidays' }
              ]
            }
          ]
        },
        {
          id: 'it',
          label: 'IT',
          children: [
            { label: 'IT Dashboard', path: '/it/dashboard' },
            { label: 'Employee Approval', path: '/it/employee-approval' },
            { label: 'Update Password', path: '/it/update-password' },
            { label: 'Manage Users', path: '/it/manage-users' },
            { label: 'Manage Roles', path: '/it/manage-roles' },
          ]
        },
        {
          id: 'dd',
          label: 'DD MENUs',
          children: [
            { label: 'Add Payment Mode', path: '/dd/payment-mode' },
            { label: 'Add Category', path: '/dd/categories' },
            { label: 'Brands', path: '/dd/brands' },
            { label: 'Sub Category', path: '/dd/sub-categories' },
            { label: 'Client Department', path: '/dd/client-department' },
            { label: 'Designation - Officer', path: '/dd/designation-officer' },
            { label: 'Department - Designation - Officer', path: '/dd/department-designation-officer' },
            { label: 'HSN', path: '/dd/hsn' },
            { label: 'GST %', path: '/dd/gst-percent' },
            { label: 'GST Type', path: '/dd/gst-type' },
            { label: 'Denom', path: '/dd/denom' },
            { label: 'State', path: '/dd/state' },
            { label: 'City', path: '/dd/city' },
            { label: 'State Location', path: '/dd/state-location' },
            { label: 'Expense', path: '/dd/expense' },
            { label: 'Amount', path: '/dd/amount' },
            { label: 'Add Project', path: '/dd/add-project' },
            { label: 'Amount Type', path: '/dd/amount-type' },
            { label: 'Core Qualification', path: '/dd/core-qualification' },
            { label: 'Document Category', path: '/dd/document-categories' },
            { label: 'Sub Document Category', path: '/dd/sub-document-categories' },
            { label: 'Sub-Sub Document Category', path: '/dd/sub-sub-document-categories' },
          ]
        }
      ]
    }
  ];

  const renderMenuItem = (item: any, level: number = 0) => {
    const isExpanded = expandedMenus.includes(item.id);
    const hasChildren = item.children && item.children.length > 0;

    if (!hasChildren) {
      return (
        <button
          key={item.path}
          onClick={() => onNavigate(item.path)}
          className={`w-full text-left transition-all flex items-center ${level === 0 ? 'gap-4 px-0 py-2.5 text-[13px] font-bold text-gray-500 hover:text-gray-800' :
            `py-2 text-[12px] font-bold ${currentPath === item.path ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600'}`
            }`}
        >
          {level === 0 && item.icon && <item.icon className="w-5 h-5 text-gray-400" />}
          <span>{item.label}</span>
        </button>
      );
    }

    return (
      <div key={item.id} className={level === 0 ? "mb-1" : "mt-1"}>
        <button
          onClick={() => toggleMenu(item.id)}
          className={`w-full flex items-center transition-colors ${level === 0 ? 'gap-4 px-0 py-2.5 text-gray-500 hover:text-gray-800' : 'py-2 text-gray-500 hover:text-gray-800 text-[13px] font-medium'
            }`}
        >
          {level === 0 && item.icon && <item.icon className="w-5 h-5 text-gray-400" />}
          <span className={level === 0 ? "text-[13px] font-bold" : ""}>{item.label}</span>
          {isExpanded ? (
            <ChevronDown className={`ml-auto ${level === 0 ? 'w-4 h-4 text-gray-300' : 'w-4 h-4 text-gray-300'}`} />
          ) : (
            <ChevronRight className={`ml-auto ${level === 0 ? 'w-4 h-4 text-gray-300' : 'w-4 h-4 text-gray-300'}`} />
          )}
        </button>

        {isExpanded && (
          <div className={`${level === 0 ? 'ml-6 border-l border-gray-200 pl-4' : 'ml-2 border-l border-gray-100 pl-4'} space-y-0.5 mt-1`}>
            {item.children.map((child: any) => renderMenuItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  if (!isOpen) return null;

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col h-full overflow-hidden shadow-xl shadow-gray-100/50">
      <div className="p-6 flex flex-col items-center border-b border-gray-50 bg-gray-50/30">
        <div className="relative group">
          <div className="w-24 h-24 bg-white flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
            <img
              src={logo}
              alt="Company Logo"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-4 custom-scrollbar">
        {workBookGroups.map(group => (
          <div key={group.id} className="mb-1">
            {group.children ? (
              <>
                <button
                  onClick={() => toggleMenu(group.id)}
                  className={`w-full flex items-center gap-4 px-6 py-3 transition-all ${expandedMenus.includes(group.id)
                    ? 'text-gray-800 bg-gray-50/50'
                    : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'
                    }`}
                >
                  <group.icon className="w-5 h-5" />
                  <span className="text-[13px] font-bold">{group.label}</span>
                  {expandedMenus.includes(group.id) ? (
                    <ChevronDown className="w-4 h-4 ml-auto text-gray-300" />
                  ) : (
                    <ChevronRight className="w-4 h-4 ml-auto text-gray-300" />
                  )}
                </button>
                {expandedMenus.includes(group.id) && (
                  <div className="space-y-1">
                    {group.children.map(child => (
                      <button
                        key={child.path}
                        onClick={() => onNavigate(child.path)}
                        className={`w-full flex items-center justify-between px-14 py-2 text-[12px] font-bold transition-all ${currentPath === child.path
                          ? 'text-blue-600'
                          : 'text-gray-400 hover:text-gray-600'
                          }`}
                      >
                        <span>{child.label}</span>
                        {child.badge && (
                          <span className="bg-blue-100 text-blue-600 text-[8px] px-1.5 py-0.5 rounded uppercase font-black tracking-tighter">
                            {child.badge}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <button
                onClick={() => onNavigate(group.path!)}
                className={`w-full flex items-center gap-4 px-6 py-3 transition-all ${currentPath === group.path
                  ? 'text-blue-600 border-r-4 border-blue-600 bg-blue-50/50'
                  : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'
                  }`}
              >
                <group.icon className="w-5 h-5" />
                <span className="text-[13px] font-bold">{group.label}</span>
              </button>
            )}
          </div>
        ))}

        <div className="px-6 py-6 mt-2">
          <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Work Book</h3>

          <div className="space-y-1">
            {workBookOperational.map(group => renderMenuItem(group))}
          </div>
        </div>
      </div>

      <div className="p-6 bg-gray-50/50 border-t border-gray-100">
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Logged in as:</p>
        <h4 className="text-[12px] font-black text-gray-800 uppercase tracking-tight">{user?.fullName || user?.name || 'Guest'}</h4>
      </div>
    </aside>
  );
}
