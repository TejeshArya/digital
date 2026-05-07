import React, { useState } from 'react';
import { 
  UserCircle, Clock, ArrowLeft, Layout, 
  Search, Filter, Eye, CheckCircle2, XCircle,
  FileEdit, ClipboardList, Info
} from 'lucide-react';

export function ProfileUpdates() {
  const [requests] = useState([]);

  return (
    <div className="p-4 bg-[#f8f9fc] min-h-screen font-sans">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <h1 className="text-gray-700 font-black text-xl uppercase tracking-widest">Profile Update Requests</h1>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-[#6b58d3] text-white text-[10px] font-black rounded shadow-sm uppercase tracking-widest hover:bg-purple-700 transition-all">
            <ArrowLeft className="w-4 h-4" /> Back to Employees
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#00cfd5] text-white text-[10px] font-black rounded shadow-sm uppercase tracking-widest hover:bg-cyan-600 transition-all">
            <Layout className="w-4 h-4" /> HR Dashboard
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto space-y-6">
        {/* Stat Card */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col justify-center relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 transition-opacity">
              <Clock className="w-16 h-16 text-orange-500" />
            </div>
            <span className="text-[10px] font-black text-orange-400 uppercase tracking-widest mb-1">Pending Requests</span>
            <div className="text-3xl font-black text-gray-800">{requests.length}</div>
            <div className="w-8 h-8 bg-gray-50 rounded-full flex items-center justify-center absolute right-6 top-1/2 -translate-y-1/2 shadow-inner border border-gray-100">
              <Clock className="w-4 h-4 text-gray-300" />
            </div>
          </div>
        </div>

        {/* Requests Table Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden min-h-[450px]">
          <div className="bg-gray-50/50 px-6 py-4 border-b border-gray-100">
            <h2 className="text-[12px] font-black text-[#0061f2] uppercase tracking-widest flex items-center gap-2">
              <ClipboardList className="w-4 h-4" /> Pending Profile Update Requests
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-[10px] border-collapse">
              <thead>
                <tr className="bg-gray-50/80 text-gray-400 uppercase tracking-widest border-b border-gray-100">
                  <th className="px-8 py-5 text-left font-black border-r border-gray-100">Employee ID</th>
                  <th className="px-8 py-5 text-left font-black border-r border-gray-100">Name</th>
                  <th className="px-8 py-5 text-left font-black border-r border-gray-100">Changed Fields</th>
                  <th className="px-8 py-5 text-left font-black border-r border-gray-100">Requested At</th>
                  <th className="px-8 py-5 text-center font-black">Actions</th>
                </tr>
              </thead>
              <tbody>
                {requests.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-8 py-24 text-center bg-gray-50/10">
                      <div className="flex flex-col items-center gap-4">
                        <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center border border-gray-50">
                           <FileEdit className="w-8 h-8 text-gray-100" />
                        </div>
                        <p className="text-[12px] font-black text-gray-300 uppercase tracking-[0.2em]">No pending profile update requests found.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  requests.map((req, idx) => (
                    <tr key={idx} className="hover:bg-gray-50/50 transition-colors border-b border-gray-50">
                      {/* Data rows would go here */}
                    </tr>
                  ))
                )}
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
