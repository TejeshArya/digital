import React, { useState } from 'react';
import { 
  Users, Plus, Search, Filter, Play, 
  Square, Save, FileText, Info, History,
  MapPin, CheckCircle2, Clock, X, ArrowLeft,
  CheckSquare, Square as SquareIcon, ChevronDown
} from 'lucide-react';

export function BulkAttendance() {
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);
  const [employees] = useState([
    { id: 'ADMIN001', name: 'Admin User', status: 'Not Started', start: '---', end: '---', duration: '---' },
    { id: 'DEE280326123', name: 'ALAMANDA NARENDRA', status: 'Not Started', start: '---', end: '---', duration: '---' },
    { id: 'DEE221225101', name: 'BALMIKI GUPTA', status: 'Not Started', start: '---', end: '---', duration: '---' },
    { id: 'DEE310326126', name: 'BIJAYATA GUPTA', status: 'Not Started', start: '---', end: '---', duration: '---' },
    { id: 'DEE251225108', name: 'BIPIN KUMAR THAKUR', status: 'Not Started', start: '---', end: '---', duration: '---' },
    { id: 'DEE291225111', name: 'CHIPULLA SAIRAM', status: 'Running', start: '9:32:22 AM', end: '---', duration: '---' },
    { id: 'DEE130426131', name: 'GANDIBOINA GOWRI PRASAD', status: 'Not Started', start: '---', end: '---', duration: '---' },
    { id: 'DEE040126117', name: 'JOG RAJ SINGH', status: 'Running', start: '9:12:22 AM', end: '---', duration: '---' },
  ]);

  const toggleSelect = (id: string) => {
    setSelectedEmployees(prev => 
      prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedEmployees.length === employees.length) {
      setSelectedEmployees([]);
    } else {
      setSelectedEmployees(employees.map(e => e.id));
    }
  };

  return (
    <div className="p-4 bg-[#f8f9fc] min-h-screen font-sans">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div className="space-y-1">
          <h1 className="text-gray-700 font-black text-xl uppercase tracking-widest flex items-center gap-2">
             Bulk Attendance Management
          </h1>
          <p className="text-[11px] text-gray-400 font-bold uppercase tracking-tight">Mark attendance for employees by location</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-2.5 bg-[#6b58d3] text-white text-[10px] font-black rounded shadow-lg shadow-purple-100 uppercase tracking-widest hover:bg-purple-700 transition-all">
          <ArrowLeft className="w-4 h-4" /> Back to Daily Attendance
        </button>
      </div>

      <div className="max-w-7xl mx-auto space-y-6">
        {/* Location Selector */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 space-y-4">
           <label className="text-[10px] font-black text-rose-500 uppercase tracking-widest">Select Location *</label>
           <div className="relative max-w-4xl">
              <select className="w-full px-4 py-3.5 bg-white border border-gray-100 rounded-xl text-[14px] font-black text-gray-500 focus:outline-none focus:border-blue-400 transition-all appearance-none cursor-pointer">
                 <option>VISAKHAPATNAM</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 pointer-events-none" />
           </div>
        </div>

        {/* Attendance Grid */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden min-h-[600px]">
           {/* Grid Toolbar */}
           <div className="p-6 border-b border-gray-50 flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-4">
                 <div 
                   onClick={toggleSelectAll}
                   className="flex items-center gap-2 cursor-pointer group"
                 >
                    <div className={`transition-colors ${selectedEmployees.length === employees.length ? 'text-blue-600' : 'text-gray-300'}`}>
                       {selectedEmployees.length === employees.length ? <CheckSquare className="w-5 h-5" /> : <SquareIcon className="w-5 h-5" />}
                    </div>
                    <span className="text-[11px] font-black text-gray-400 uppercase tracking-widest group-hover:text-gray-600">Select All</span>
                 </div>
                 <span className="text-[11px] font-bold text-gray-300 uppercase">{selectedEmployees.length} selected</span>
              </div>
              <div className="flex gap-2">
                 <button className="flex items-center gap-2 px-4 py-2 bg-[#1cc88a] text-white text-[10px] font-black rounded shadow-md uppercase tracking-widest hover:bg-emerald-600 transition-all">
                    <Play className="w-3.5 h-3.5 fill-current" /> Start Selected
                 </button>
                 <button className="flex items-center gap-2 px-4 py-2 bg-[#e74a3b] text-white text-[10px] font-black rounded shadow-md uppercase tracking-widest hover:bg-red-600 transition-all">
                    <Square className="w-3.5 h-3.5 fill-current" /> Stop Selected
                 </button>
              </div>
           </div>

           <div className="overflow-x-auto">
              <table className="w-full text-[11px] border-collapse">
                 <thead>
                    <tr className="bg-gray-50/50 text-gray-400 uppercase tracking-widest border-b border-gray-100">
                       <th className="px-6 py-4 text-left font-black border-r border-gray-50 w-16">Select</th>
                       <th className="px-6 py-4 text-left font-black border-r border-gray-50">Employee ID</th>
                       <th className="px-6 py-4 text-left font-black border-r border-gray-50">Name</th>
                       <th className="px-6 py-4 text-center font-black border-r border-gray-50">Status</th>
                       <th className="px-6 py-4 text-center font-black border-r border-gray-50">Start Time</th>
                       <th className="px-6 py-4 text-center font-black border-r border-gray-50">End Time</th>
                       <th className="px-6 py-4 text-center font-black border-r border-gray-50">Duration</th>
                       <th className="px-6 py-4 text-center font-black">Actions</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-gray-50">
                    {employees.map((emp) => {
                      const isSelected = selectedEmployees.includes(emp.id);
                      return (
                        <tr key={emp.id} className={`hover:bg-gray-50/50 transition-colors ${isSelected ? 'bg-blue-50/30' : ''}`}>
                           <td className="px-6 py-4 border-r border-gray-50 text-center">
                              <div 
                                onClick={() => toggleSelect(emp.id)}
                                className={`cursor-pointer transition-colors ${isSelected ? 'text-blue-600' : 'text-gray-200 hover:text-gray-400'}`}
                              >
                                 {isSelected ? <CheckSquare className="w-4 h-4" /> : <SquareIcon className="w-4 h-4" />}
                              </div>
                           </td>
                           <td className="px-6 py-4 border-r border-gray-50 font-bold text-gray-400 uppercase tracking-tight">{emp.id}</td>
                           <td className="px-6 py-4 border-r border-gray-50 font-black text-gray-600 uppercase tracking-tight">{emp.name}</td>
                           <td className="px-6 py-4 border-r border-gray-50 text-center">
                              <span className={`text-[8px] font-black px-2 py-0.5 rounded shadow-sm uppercase tracking-widest ${emp.status === 'Running' ? 'bg-[#1cc88a] text-white' : 'bg-[#6b58d3] text-white'}`}>
                                 {emp.status}
                              </span>
                           </td>
                           <td className="px-6 py-4 border-r border-gray-50 text-center font-bold text-gray-400">{emp.start}</td>
                           <td className="px-6 py-4 border-r border-gray-50 text-center font-bold text-gray-400">{emp.end}</td>
                           <td className="px-6 py-4 border-r border-gray-50 text-center font-bold text-gray-400">{emp.duration}</td>
                           <td className="px-6 py-4 text-center">
                              {emp.status === 'Running' ? (
                                <button className="flex items-center gap-1.5 px-3 py-1.5 bg-[#e74a3b] text-white rounded text-[9px] font-black uppercase hover:bg-red-600 shadow-sm transition-all mx-auto">
                                   <Square className="w-3 h-3 fill-current" /> Stop
                                </button>
                              ) : (
                                <button className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1cc88a] text-white rounded text-[9px] font-black uppercase hover:bg-emerald-600 shadow-sm transition-all mx-auto">
                                   <Play className="w-3 h-3 fill-current" /> Start
                                </button>
                              )}
                           </td>
                        </tr>
                      );
                    })}
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
