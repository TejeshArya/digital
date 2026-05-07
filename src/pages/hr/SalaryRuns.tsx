import React, { useState } from 'react';
import { 
  Plus, Search, Filter, Save, FileText, 
  Settings, DollarSign, List, Info, 
  CheckCircle2, XCircle, AlertCircle,
  Eye, History, Calendar, ArrowRight,
  TrendingUp, Wallet, Users, Clock
} from 'lucide-react';

export function SalaryRuns() {
  const [salaryRuns] = useState([
    { month: 'March 2026', status: 'Approved', employees: '14/31', gross: '388,549.00', net: '375,671.00', created: '09 Apr 2026' },
  ]);

  return (
    <div className="p-4 bg-[#f8f9fc] min-h-screen font-sans">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <h1 className="text-gray-700 font-black text-xl uppercase tracking-widest flex items-center gap-2">
           Salary Runs
        </h1>
        <button className="flex items-center gap-2 px-6 py-2.5 bg-[#0061f2] text-white text-[10px] font-black rounded shadow-lg shadow-blue-100 uppercase tracking-widest hover:bg-blue-700 transition-all">
          <Plus className="w-4 h-4" /> New Salary Run
        </button>
      </div>

      <div className="max-w-[1600px] mx-auto space-y-6">
        {/* Main Runs Grid */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden min-h-[600px]">
           <div className="overflow-x-auto">
              <table className="w-full text-[11px] border-collapse">
                 <thead>
                    <tr className="bg-white text-gray-400 uppercase tracking-widest border-b border-gray-100">
                       <th className="px-8 py-6 text-left font-black border-r border-gray-50">Month</th>
                       <th className="px-8 py-6 text-center font-black border-r border-gray-50">Status</th>
                       <th className="px-8 py-6 text-center font-black border-r border-gray-50">Employees</th>
                       <th className="px-8 py-6 text-right font-black border-r border-gray-50">Total Gross</th>
                       <th className="px-8 py-6 text-right font-black border-r border-gray-50">Total Net</th>
                       <th className="px-8 py-6 text-center font-black border-r border-gray-50">Created</th>
                       <th className="px-8 py-6 text-center font-black">Actions</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-gray-50">
                    {salaryRuns.map((run, idx) => (
                      <tr key={idx} className="hover:bg-gray-50/50 transition-colors group">
                         <td className="px-8 py-6 border-r border-gray-50 font-black text-gray-700 uppercase tracking-tight">{run.month}</td>
                         <td className="px-8 py-6 border-r border-gray-50 text-center">
                            <span className="bg-[#1cc88a] text-white text-[9px] font-black px-3 py-1 rounded shadow-sm uppercase tracking-widest">
                               {run.status}
                            </span>
                         </td>
                         <td className="px-8 py-6 border-r border-gray-50 text-center font-bold text-gray-400">
                            <div className="flex items-center justify-center gap-2">
                               <Users className="w-3.5 h-3.5 opacity-50" />
                               {run.employees}
                            </div>
                         </td>
                         <td className="px-8 py-6 border-r border-gray-50 text-right font-black text-gray-700 tracking-tight italic">
                            ₹ {run.gross}
                         </td>
                         <td className="px-8 py-6 border-r border-gray-50 text-right font-black text-emerald-600 tracking-tight italic">
                            ₹ {run.net}
                         </td>
                         <td className="px-8 py-6 border-r border-gray-50 text-center font-bold text-gray-400">
                            <div className="flex items-center justify-center gap-2 uppercase tracking-tighter">
                               <Calendar className="w-3.5 h-3.5 opacity-50" />
                               {run.created}
                            </div>
                         </td>
                         <td className="px-8 py-6 text-center">
                            <button className="p-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all shadow-sm">
                               <Eye className="w-4 h-4" />
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
