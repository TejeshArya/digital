import React, { useState } from 'react';
import { 
  ShieldCheck, Eye, Edit3, Lock, 
  Settings, Users, Info, Search, 
  Filter, MoreVertical, LayoutDashboard,
  Key, Network, Monitor, Zap, Plus,
  ShieldAlert
} from 'lucide-react';

export function ITRoleManagement() {
  const [roles] = useState([
    { name: 'admin', display: 'Administrator', desc: 'Full system access', permissions: ['All Permissions'], total: 57, users: 1 },
    { name: 'DIRECTOR', display: 'DIRECTOR', desc: 'ADMIN', permissions: ['All Permissions'], total: 57, users: 2 },
    { name: 'MANAGING DIRECTOR', display: 'MANAGING DIRECTOR', desc: 'DESC', permissions: ['View Dashboard', 'Create Projects'], total: 54, users: 0 },
    { name: 'HR', display: 'HR', desc: 'HR', permissions: ['View Dashboard', 'Create Projects', 'View Projects'], total: 54, users: 1 },
    { name: 'IT', display: 'IT', desc: 'IT DEPARTMENT', permissions: ['Create Projects', 'View Projects', 'Create Quotations'], total: 52, users: 0 },
    { name: 'SENIOR MANAGER', display: 'SENIOR MANAGER', desc: 'DESCRIPTION', permissions: ['View Dashboard', 'View Projects', 'Create Quotations'], total: 3, users: 0 },
    { name: 'MANAGER', display: 'MANAGER', desc: 'DESCRIPTION', permissions: ['View Dashboard', 'Create Projects', 'View Projects'], total: 45, users: 2 },
    { name: 'ASSITANT MANAGER', display: 'ASSITANT MANAGER', desc: 'DESCRIPTION', permissions: ['View Dashboard', 'View Projects', 'Create Quotations'], total: 3, users: 0 },
    { name: 'JUNIOR MANAGER', display: 'JUNIOR MANAGER', desc: 'DESCRIPTION', permissions: ['View Dashboard', 'Create Projects', 'View Projects'], total: 23, users: 0 },
    { name: 'SENIOR ENGINEER', display: 'SENIOR ENGINEER', desc: 'DESCRIPTION', permissions: ['View Dashboard', 'View Projects', 'Create Quotations'], total: 3, users: 0 },
    { name: 'ENGINEER', display: 'ENGINEER', desc: 'DESCRIPTION', permissions: ['View Dashboard', 'Create Projects', 'View Projects'], total: 18, users: 1 },
  ]);

  return (
    <div className="p-4 bg-[#f8f9fc] min-h-screen font-sans text-[11px]">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <h1 className="text-gray-700 font-black text-xl uppercase tracking-widest flex items-center gap-2">
           Role Management
        </h1>
        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tight italic">
           Roles are created through Group Management
        </p>
      </div>

      <div className="max-w-[1800px] mx-auto">
        {/* Main Grid Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden min-h-[800px]">
           <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                 <thead>
                    <tr className="bg-gray-50/10 text-gray-400 uppercase tracking-widest border-b border-gray-100 font-black">
                       <th className="px-8 py-5 text-left">Name</th>
                       <th className="px-8 py-5 text-left">Display Name</th>
                       <th className="px-8 py-5 text-left">Description</th>
                       <th className="px-8 py-5 text-left">Permissions</th>
                       <th className="px-8 py-5 text-center">Users</th>
                       <th className="px-8 py-5 text-center">Actions</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-gray-50">
                    {roles.map((role, idx) => (
                      <tr key={idx} className="hover:bg-blue-50/10 transition-colors group">
                         <td className="px-8 py-6">
                            <span className="bg-blue-600 text-white text-[9px] font-black px-3 py-1 rounded-full shadow-sm lowercase tracking-tighter inline-block">
                               {role.name}
                            </span>
                         </td>
                         <td className="px-8 py-6 font-bold text-gray-400 uppercase tracking-tight">{role.display}</td>
                         <td className="px-8 py-6 font-bold text-gray-300 uppercase tracking-tighter italic">{role.desc}</td>
                         <td className="px-8 py-6 min-w-[400px]">
                            <div className="flex flex-wrap gap-1.5 items-center">
                               {role.permissions[0] === 'All Permissions' ? (
                                 <span className="bg-[#e74a3b] text-white text-[8px] font-black px-2.5 py-1 rounded shadow-sm uppercase tracking-tighter">All Permissions</span>
                               ) : (
                                 role.permissions.map((p, i) => (
                                   <span key={i} className="bg-[#6b58d3] text-white text-[8px] font-black px-2.5 py-1 rounded shadow-sm uppercase tracking-tighter">
                                      {p}
                                   </span>
                                 ))
                               )}
                               <span className="bg-[#36b9cc] text-white text-[8px] font-black px-2.5 py-1 rounded shadow-sm uppercase tracking-tighter">
                                  {role.permissions[0] === 'All Permissions' ? `${role.total} total` : `+${role.total} more`}
                               </span>
                            </div>
                         </td>
                         <td className="px-8 py-6 text-center">
                            <span className={`text-[9px] font-black px-3 py-1 rounded-full shadow-sm uppercase tracking-tighter inline-block ${
                              role.users > 0 ? 'bg-[#1cc88a] text-white' : 'bg-gray-100 text-gray-300'
                            }`}>
                               {role.users} users
                            </span>
                         </td>
                         <td className="px-8 py-6 text-center">
                            <div className="flex gap-2 justify-center">
                               <button className="p-2 bg-[#36b9cc]/10 text-[#36b9cc] rounded border border-[#36b9cc]/30 hover:bg-[#36b9cc] hover:text-white transition-all shadow-sm group">
                                  <Eye className="w-3.5 h-3.5" />
                               </button>
                               <button className="p-2 bg-[#f6c23e]/10 text-[#f6c23e] rounded border border-[#f6c23e]/30 hover:bg-[#f6c23e] hover:text-white transition-all shadow-sm group">
                                  <Edit3 className="w-3.5 h-3.5" />
                               </button>
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
      <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center text-[10px] text-gray-400 font-bold tracking-[0.2em] uppercase px-4">
        <p>Copyright © Your Website 2021</p>
        <div className="flex gap-4">
          <a href="#" className="hover:underline transition-colors hover:text-gray-600">Privacy Policy</a>
          <span>•</span>
          <a href="#" className="hover:underline transition-colors hover:text-gray-600">Terms & Conditions</a>
        </div>
      </div>
    </div>
  );
}
