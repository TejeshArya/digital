import React, { useState } from 'react';
import { 
  Users, Mail, ShieldCheck, MapPin, 
  Briefcase, Building2, UserCheck, 
  Search, Filter, MoreVertical, Info,
  Monitor, LayoutDashboard, Key, Network
} from 'lucide-react';

export function ITUserManagement() {
  const [users] = useState([
    { 
      name: 'TEJESH GUDLA', email: 'tejeshgudla2@gmail.com', 
      role: 'JUNIOR ENGINEER', location: 'VISAKHAPATNAM', 
      position: 'SOFTWARE DEVELOPER3', dept: 'P & P', 
      wing: 'ELECTRICAL', manager: 'UDAYA VARAHA BHASKARA' 
    },
    { 
      name: 'GANDIBOINA GOWRI PRASAD', email: 'gowriprasad111@gmail.com', 
      role: 'TECHNICIAN', location: 'VISAKHAPATNAM', 
      position: 'Welder', dept: 'P & P', 
      wing: 'CML', manager: 'RANJAN YADAV' 
    },
    { 
      name: 'RAVENDRA SINGH', email: 'ravendrasinghchouhan@gmail.com', 
      role: 'SENIOR MANAGER', location: 'No Location', 
      position: 'No Position', dept: 'No Department', 
      wing: 'No Wings', manager: 'No Manager' 
    },
    { 
      name: 'SAYAD SARFARAZ', email: 'sarfarazking9978@gmail.com', 
      role: 'ASSISTANT SUPERVISOR', location: 'VISAKHAPATNAM', 
      position: 'DEE HQ OFFICE ADMINISTRATOR', dept: 'P & P', 
      wing: 'ELECTRICAL', manager: 'BALMIKI GUPTA' 
    },
    { 
      name: 'KANDREGULA KOTESWARA RAO', email: 'gowriprasad199706@gmail.com', 
      role: 'TECHNICIAN', location: 'VISAKHAPATNAM', 
      position: 'ELECTRICAL TECHNICIAN', dept: 'P & P', 
      wing: 'ELECTRICAL', manager: 'RANJAN YADAV' 
    },
    { 
      name: 'VIKASH KUMAR', email: 'vikashkumar727763@gmail.com', 
      role: 'SUPERVISOR', location: 'VISAKHAPATNAM', 
      position: 'ELECTRICAL SUPERVISOR', dept: 'P & P', 
      wing: 'ELECTRICAL', manager: 'RANJAN YADAV' 
    },
  ]);

  return (
    <div className="p-4 bg-[#f8f9fc] min-h-screen font-sans text-[11px]">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <h1 className="text-gray-700 font-black text-xl uppercase tracking-widest flex items-center gap-2">
           User Management
        </h1>
        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tight italic">
           Users are created through HR Employee Management
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
                       <th className="px-8 py-5 text-left">Email</th>
                       <th className="px-4 py-5 text-center">Current Role</th>
                       <th className="px-4 py-5 text-center">Location</th>
                       <th className="px-4 py-5 text-center">Position Level</th>
                       <th className="px-4 py-5 text-center">Department</th>
                       <th className="px-4 py-5 text-center">Wings</th>
                       <th className="px-8 py-5 text-center">Manager</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-gray-50">
                    {users.map((user, idx) => (
                      <tr key={idx} className={`${idx % 2 === 1 ? 'bg-gray-50/30' : 'bg-white'} hover:bg-blue-50/10 transition-colors`}>
                         <td className="px-8 py-6 font-black text-gray-700 uppercase tracking-tight">{user.name}</td>
                         <td className="px-8 py-6 font-bold text-gray-400 tracking-tighter">{user.email}</td>
                         <td className="px-4 py-6 text-center">
                            <span className="bg-[#0061f2] text-white text-[8px] font-black px-2.5 py-1 rounded shadow-sm uppercase tracking-tighter inline-block">
                               {user.role}
                            </span>
                         </td>
                         <td className="px-4 py-6 text-center">
                            {user.location.startsWith('No') ? (
                              <span className="text-gray-300 font-bold uppercase italic">{user.location}</span>
                            ) : (
                              <span className="bg-[#36b9cc] text-white text-[8px] font-black px-2.5 py-1 rounded shadow-sm uppercase tracking-tighter inline-block">
                                 {user.location}
                              </span>
                            )}
                         </td>
                         <td className="px-4 py-6 text-center">
                            {user.position.startsWith('No') ? (
                              <span className="text-gray-300 font-bold uppercase italic">{user.position}</span>
                            ) : (
                              <span className="bg-[#00cfd5] text-white text-[8px] font-black px-2.5 py-1 rounded shadow-sm uppercase tracking-tighter inline-block">
                                 {user.position}
                              </span>
                            )}
                         </td>
                         <td className="px-4 py-6 text-center">
                            {user.dept.startsWith('No') ? (
                              <span className="text-gray-300 font-bold uppercase italic">{user.dept}</span>
                            ) : (
                              <span className="bg-[#6b58d3] text-white text-[8px] font-black px-2.5 py-1 rounded shadow-sm uppercase tracking-tighter inline-block">
                                 {user.dept}
                              </span>
                            )}
                         </td>
                         <td className="px-4 py-6 text-center">
                            {user.wing.startsWith('No') ? (
                              <span className="text-gray-300 font-bold uppercase italic">{user.wing}</span>
                            ) : (
                              <span className="bg-[#f6c23e] text-white text-[8px] font-black px-2.5 py-1 rounded shadow-sm uppercase tracking-tighter inline-block">
                                 {user.wing}
                              </span>
                            )}
                         </td>
                         <td className="px-8 py-6 text-center whitespace-nowrap">
                            {user.manager.startsWith('No') ? (
                              <span className="text-gray-300 font-bold uppercase italic">{user.manager}</span>
                            ) : (
                              <span className="bg-[#1cc88a] text-white text-[8px] font-black px-2.5 py-1 rounded shadow-sm uppercase tracking-tighter inline-block">
                                 {user.manager}
                              </span>
                            )}
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
