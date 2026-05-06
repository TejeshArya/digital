import React, { useState } from 'react';
import { 
  Banknote, Plus, Search, Filter, Edit3, 
  Trash2, Save, FileText, Info, History,
  Calendar, Users, ArrowRight, X, RotateCcw,
  Settings, DollarSign, List, MapPin, Building2
} from 'lucide-react';

export function EmployeeSalaries() {
  const [employees] = useState([
    { id: 'ADMIN001', name: 'Admin User', dept: 'N/A', location: 'VISAKHAPATNAM', salary: '---' },
    { id: 'DEE280326123', name: 'ALAMANDA NARENDRA', dept: 'P & P', location: 'VISAKHAPATNAM', salary: '---' },
    { id: 'DEE251225102', name: 'ANUPAM KUMAR', dept: 'P & P', location: 'MUMBAI', salary: '15,000.00' },
    { id: 'DEE221225101', name: 'BALMIKI GUPTA', dept: 'HR', location: 'VISAKHAPATNAM', salary: '---' },
    { id: 'DEE310326126', name: 'BIJAYATA GUPTA', dept: 'HR', location: 'VISAKHAPATNAM', salary: '---' },
    { id: 'DEE251225108', name: 'BIPIN KUMAR THAKUR', dept: 'P & P', location: 'VISAKHAPATNAM', salary: '---' },
    { id: 'DEE291225111', name: 'CHIPULLA SAIRAM', dept: 'P & P', location: 'VISAKHAPATNAM', salary: '12,000.00' },
    { id: 'DEE130426131', name: 'GANDIBOINA GOWRI PRASAD', dept: 'P & P', location: 'VISAKHAPATNAM', salary: '---' },
    { id: 'DEE040126117', name: 'JOG RAJ SINGH', dept: 'P & P', location: 'VISAKHAPATNAM', salary: '12,000.00' },
    { id: 'DEE030426128', name: 'KANDREGULA KOTESWARA RAO', dept: 'P & P', location: 'VISAKHAPATNAM', salary: '8,000.00' },
  ]);

  return (
    <div className="p-4 bg-[#f8f9fc] min-h-screen font-sans">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <h1 className="text-gray-700 font-black text-xl uppercase tracking-widest flex items-center gap-2">
           Employee Salary
        </h1>
        <button className="flex items-center gap-2 px-6 py-2.5 bg-[#0061f2] text-white text-[10px] font-black rounded shadow-lg shadow-blue-100 uppercase tracking-widest hover:bg-blue-700 transition-all">
          <Plus className="w-4 h-4" /> Add Employee
        </button>
      </div>

      <div className="max-w-[1600px] mx-auto space-y-6">
        {/* Employees Table Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden min-h-[600px]">
          <div className="bg-blue-50/10 px-8 py-5 border-b border-gray-100 flex items-center gap-2">
            <List className="w-4 h-4 text-blue-600" />
            <h2 className="text-[12px] font-black text-blue-700 uppercase tracking-widest">Employees</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-[11px] border-collapse">
              <thead>
                <tr className="bg-white text-gray-400 uppercase tracking-widest border-b border-gray-100">
                  <th className="px-8 py-5 text-left font-black border-r border-gray-50">Employee ID</th>
                  <th className="px-8 py-5 text-left font-black border-r border-gray-50">Name</th>
                  <th className="px-8 py-5 text-center font-black border-r border-gray-50">Department</th>
                  <th className="px-8 py-5 text-center font-black border-r border-gray-50">Location</th>
                  <th className="px-8 py-5 text-right font-black border-r border-gray-50">Current Salary (₹)</th>
                  <th className="px-8 py-5 text-center font-black">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {employees.map((emp, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-8 py-5 border-r border-gray-50 font-bold text-gray-400 uppercase tracking-tight">{emp.id}</td>
                    <td className="px-8 py-5 border-r border-gray-50 font-black text-gray-600 uppercase tracking-tight">{emp.name}</td>
                    <td className="px-8 py-5 border-r border-gray-50 text-center font-bold text-gray-400 uppercase">{emp.dept}</td>
                    <td className="px-8 py-5 border-r border-gray-50 text-center font-bold text-gray-400 uppercase whitespace-nowrap">{emp.location}</td>
                    <td className="px-8 py-5 border-r border-gray-50 text-right font-black text-gray-700 tracking-tight">
                       {emp.salary === '---' ? (
                         <span className="text-gray-200">---</span>
                       ) : (
                         emp.salary
                       )}
                    </td>
                    <td className="px-8 py-5 text-center">
                       <button className="flex items-center gap-1.5 px-4 py-2 bg-[#f6c23e] text-white rounded text-[9px] font-black uppercase hover:bg-yellow-600 shadow-sm transition-all mx-auto">
                          <Settings className="w-3.5 h-3.5" /> Manage Salary
                       </button>
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
