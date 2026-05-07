import React, { useState } from 'react';
import { 
  Search, Calendar, Filter, FileText, Layout, 
  ChevronDown, ArrowRight, Eye, Edit, User, BarChart3
} from 'lucide-react';

export function ItemConsumption() {
  const [data] = useState([
    {
      company: 'INS DEGA',
      project: 'SUPPLY AND INSTALLATION OF CABLE TRAY FOR DG SETS ARSR RADAR EQUIPPED AT DOLPIHIN HILLS',
      wing: 'CIVIL',
      dept: 'P & P',
      post: 'CIVIL HEAD',
      amount: '0.00'
    },
    {
      company: 'INS RANVIJAY',
      project: 'INSTALLATION AND COMMISSIONING OF 10 TRAY MARINE GRADE CUSTOMISED COMBI OVEN',
      wing: 'CIVIL',
      dept: 'P & P',
      post: 'CIVIL HEAD',
      amount: '0.00'
    }
  ]);

  return (
    <div className="p-4 bg-[#f8f9fc] min-h-screen font-sans">
      {/* Filter Section */}
      <div className="bg-[#0061f2] p-4 rounded-lg shadow-md mb-6 flex items-center gap-6">
        <div className="text-white font-black text-[12px] uppercase tracking-widest whitespace-nowrap">Financial Year</div>
        <div className="relative w-full max-w-xs">
          <select className="w-full bg-white text-gray-700 text-[11px] font-bold rounded px-4 py-2.5 focus:outline-none appearance-none cursor-pointer">
            <option>Select Financial Year</option>
            <option>2026-2027</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* Main Table Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-8">
        <div className="p-4 flex flex-col md:flex-row justify-between items-center gap-4 border-b border-gray-50">
          <div className="flex items-center gap-2 text-[11px] text-gray-400 font-black uppercase">
            Show 
            <select className="border border-gray-200 rounded px-2 py-1 text-gray-600 font-bold focus:outline-none">
              <option>10</option>
              <option>25</option>
              <option>50</option>
            </select>
            entries
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-gray-300 font-black uppercase tracking-tight">Search:</span>
            <div className="relative">
              <input type="text" className="px-3 py-1.5 border border-gray-100 rounded text-sm focus:outline-none focus:border-blue-400 w-64" />
              <Search className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-200" />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-[10px] border-collapse">
            <thead>
              <tr className="bg-gray-50/80 text-gray-500 uppercase tracking-tighter border-b border-gray-100">
                <th className="px-6 py-5 text-left font-black border-r border-gray-100">Company Name</th>
                <th className="px-6 py-5 text-left font-black border-r border-gray-100">Project Name</th>
                <th className="px-6 py-5 text-center font-black border-r border-gray-100">Wing</th>
                <th className="px-6 py-5 text-center font-black border-r border-gray-100">Department</th>
                <th className="px-6 py-5 text-center font-black border-r border-gray-100">Post</th>
                <th className="px-6 py-5 text-right font-black border-r border-gray-100">Total Amount</th>
                <th className="px-6 py-5 text-center font-black border-r border-gray-100">View</th>
                <th className="px-6 py-5 text-center font-black">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {data.map((row, index) => (
                <tr key={index} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-6 py-6 border-r border-gray-50 font-bold text-gray-700 uppercase tracking-tight">{row.company}</td>
                  <td className="px-6 py-6 border-r border-gray-50 text-gray-500 font-medium uppercase leading-relaxed max-w-xs">{row.project}</td>
                  <td className="px-6 py-6 border-r border-gray-50 text-center">
                    <span className="bg-cyan-400 text-white text-[8px] font-black px-2 py-0.5 rounded shadow-sm">
                      {row.wing}
                    </span>
                  </td>
                  <td className="px-6 py-6 border-r border-gray-50 text-center">
                    <span className="bg-purple-600 text-white text-[8px] font-black px-2 py-0.5 rounded shadow-sm">
                      {row.dept}
                    </span>
                  </td>
                  <td className="px-6 py-6 border-r border-gray-50 text-center">
                    <span className="bg-blue-600 text-white text-[8px] font-black px-2 py-0.5 rounded shadow-sm">
                      {row.post}
                    </span>
                  </td>
                  <td className="px-6 py-6 border-r border-gray-50 text-right font-black text-gray-600 tracking-wider">₹ {row.amount}</td>
                  <td className="px-6 py-6 border-r border-gray-50 text-center">
                    <button className="px-4 py-1.5 bg-[#0061f2] text-white text-[9px] font-black rounded shadow-md hover:bg-blue-700 transition-all uppercase tracking-widest flex items-center justify-center gap-1 mx-auto">
                      <Eye className="w-3 h-3" /> View
                    </button>
                  </td>
                  <td className="px-6 py-6 text-center">
                    <button className="px-4 py-1.5 bg-[#0061f2] text-white text-[9px] font-black rounded shadow-md hover:bg-blue-700 transition-all uppercase tracking-widest flex items-center justify-center gap-1 mx-auto">
                      <Edit className="w-3 h-3" /> Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-gray-50 flex justify-between items-center bg-white text-[10px] text-gray-400 font-bold uppercase tracking-widest">
          <div>Showing 1 to 2 of 2 entries</div>
          <div className="flex items-center gap-2">
            <button className="hover:text-gray-600">Previous</button>
            <button className="w-6 h-6 bg-[#0061f2] text-white rounded flex items-center justify-center shadow-lg shadow-blue-100">1</button>
            <button className="hover:text-gray-600">Next</button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center text-[10px] text-gray-400 font-bold tracking-[0.2em] uppercase">
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
