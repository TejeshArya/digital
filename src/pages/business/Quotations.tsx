import React, { useState } from 'react';
import { 
  Search, Filter, X, Copy, FileSpreadsheet, FileText, Printer, 
  ChevronDown, Eye, Layout, Edit, Download, Trash2, User
} from 'lucide-react';

export function Quotations() {
  const [data] = useState([
    {
      no: 'Q2024-19',
      company: 'ACME CORP',
      date: '16-04-2024',
      subject: 'SUPPLY AND INSTALLATION OF SERVER RACKS FOR MAIN DATA CENTER - PRJ-2024-01',
      wing: 'FACILITIES',
      dept: 'Engineering',
      post: 'PROJECT LEAD',
      createdBy: 'JOHN DOE',
      amount: '496,500.00',
      status: 'Pending'
    },
    {
      no: 'Q2024-18',
      company: 'TECH SOLUTIONS',
      date: '15-04-2024',
      subject: 'INSTALLATION AND COMMISSIONING OF ENTERPRISE NETWORK HARDWARE - PRJ-2024-02',
      wing: 'IT OPS',
      dept: 'Engineering',
      post: 'NETWORK LEAD',
      createdBy: 'JOHN DOE',
      amount: '1,498,000.00',
      status: 'Pending'
    }
  ]);

  return (
    <div className="p-4 bg-[#f8f9fc] min-h-screen font-sans">
      {/* Filter Section */}
      <div className="bg-white rounded-lg shadow-sm mb-6 overflow-hidden border border-gray-100">
        <div className="bg-[#0061f2] p-3">
          <div className="grid grid-cols-1 md:grid-cols-7 lg:grid-cols-9 gap-2 items-center">
            <div className="space-y-1">
              <div className="flex items-center gap-1 text-[10px] text-white/80 font-bold uppercase">
                <Layout className="w-3 h-3" /> Financial Year
              </div>
              <select className="w-full bg-white text-gray-700 text-[11px] rounded px-2 py-1.5 focus:outline-none appearance-none">
                <option>2026-2027</option>
              </select>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-1 text-[10px] text-white/80 font-bold uppercase">
                <User className="w-3 h-3" /> Company
              </div>
              <input type="text" placeholder="Search..." className="w-full bg-white text-gray-700 text-[11px] rounded px-2 py-1.5 focus:outline-none" />
            </div>
            <div className="md:col-span-2 space-y-1">
              <div className="flex items-center gap-1 text-[10px] text-white/80 font-bold uppercase">
                <Layout className="w-3 h-3" /> Subject
              </div>
              <input type="text" placeholder="Search subject..." className="w-full bg-white text-gray-700 text-[11px] rounded px-2 py-1.5 focus:outline-none" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-1 text-[10px] text-white/80 font-bold uppercase">
                <Layout className="w-3 h-3" /> Wing
              </div>
              <select className="w-full bg-white text-gray-700 text-[11px] rounded px-2 py-1.5 focus:outline-none appearance-none">
                <option>Search...</option>
                <option>CIVIL</option>
              </select>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-1 text-[10px] text-white/80 font-bold uppercase">
                <Layout className="w-3 h-3" /> Department
              </div>
              <select className="w-full bg-white text-gray-700 text-[11px] rounded px-2 py-1.5 focus:outline-none appearance-none">
                <option>Search...</option>
                <option>P & P</option>
              </select>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-1 text-[10px] text-white/80 font-bold uppercase">
                <Layout className="w-3 h-3" /> Post
              </div>
              <select className="w-full bg-white text-gray-700 text-[11px] rounded px-2 py-1.5 focus:outline-none appearance-none">
                <option>Search...</option>
              </select>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-1 text-[10px] text-white/80 font-bold uppercase">
                <User className="w-3 h-3" /> Created By
              </div>
              <select className="w-full bg-white text-gray-700 text-[11px] rounded px-2 py-1.5 focus:outline-none appearance-none">
                <option>Search...</option>
              </select>
            </div>
            <div className="flex gap-1 mt-auto pb-0.5">
              <button className="bg-[#0061f2] border border-white/30 text-white text-[10px] font-bold px-3 py-1.5 rounded hover:bg-blue-700 flex items-center gap-1">
                <Filter className="w-3 h-3" /> Filter
              </button>
              <button className="bg-[#5a5c69] text-white text-[10px] font-bold px-3 py-1.5 rounded hover:bg-gray-700 flex items-center gap-1">
                <X className="w-3 h-3" /> Clear
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden mb-8">
        <div className="p-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex gap-1">
            <button className="px-3 py-1.5 bg-gray-50 border border-gray-200 text-[10px] font-medium text-gray-600 hover:bg-gray-100 rounded">Copy</button>
            <button className="px-3 py-1.5 bg-gray-50 border border-gray-200 text-[10px] font-medium text-gray-600 hover:bg-gray-100 rounded">CSV</button>
            <button className="px-3 py-1.5 bg-gray-50 border border-gray-200 text-[10px] font-medium text-gray-600 hover:bg-gray-100 rounded">Excel</button>
            <button className="px-3 py-1.5 bg-gray-50 border border-gray-200 text-[10px] font-medium text-gray-600 hover:bg-gray-100 rounded">Print</button>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400 font-medium uppercase tracking-tight">Search:</span>
            <input
              type="text"
              className="px-3 py-1.5 border border-gray-100 rounded bg-white text-sm focus:outline-none focus:border-blue-400 w-64"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-[10px] border-collapse">
            <thead>
              <tr className="bg-[#1a202c] text-white uppercase tracking-tighter">
                <th className="px-3 py-4 text-left font-bold border-r border-slate-700">Quotation No</th>
                <th className="px-3 py-4 text-left font-bold border-r border-slate-700">Company Name</th>
                <th className="px-3 py-4 text-left font-bold border-r border-slate-700">Date</th>
                <th className="px-3 py-4 text-left font-bold border-r border-slate-700">Subject</th>
                <th className="px-3 py-4 text-center font-bold border-r border-slate-700">Wing</th>
                <th className="px-3 py-4 text-center font-bold border-r border-slate-700">Department</th>
                <th className="px-3 py-4 text-center font-bold border-r border-slate-700">Post</th>
                <th className="px-3 py-4 text-left font-bold border-r border-slate-700">Created By</th>
                <th className="px-3 py-4 text-right font-bold border-r border-slate-700 whitespace-nowrap">Total Amount</th>
                <th className="px-3 py-4 text-center font-bold border-r border-slate-700">Status</th>
                <th className="px-3 py-4 text-center font-bold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {data.map((row, index) => (
                <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-3 py-5 border-r border-gray-50 text-gray-600 font-medium">{row.no}</td>
                  <td className="px-3 py-5 border-r border-gray-50 font-bold text-gray-800 uppercase">{row.company}</td>
                  <td className="px-3 py-5 border-r border-gray-50 text-gray-500 whitespace-nowrap">{row.date}</td>
                  <td className="px-3 py-5 border-r border-gray-50 text-gray-600 leading-relaxed uppercase max-w-xs">{row.subject}</td>
                  <td className="px-3 py-5 border-r border-gray-50 text-center">
                    <span className="bg-cyan-500 text-white text-[8px] font-black px-2 py-0.5 rounded shadow-sm">
                      {row.wing}
                    </span>
                  </td>
                  <td className="px-3 py-5 border-r border-gray-50 text-center">
                    <span className="bg-slate-500 text-white text-[8px] font-black px-2 py-0.5 rounded shadow-sm">
                      {row.dept}
                    </span>
                  </td>
                  <td className="px-3 py-5 border-r border-gray-50 text-center">
                    <span className="bg-blue-600 text-white text-[8px] font-black px-2 py-0.5 rounded shadow-sm">
                      {row.post}
                    </span>
                  </td>
                  <td className="px-3 py-5 border-r border-gray-50">
                    <div className="flex items-center gap-1 text-emerald-600 font-black tracking-tighter leading-tight max-w-[80px]">
                      <User className="w-3 h-3 flex-shrink-0" />
                      {row.createdBy}
                    </div>
                  </td>
                  <td className="px-3 py-5 border-r border-gray-50 text-right font-bold text-gray-600">{row.amount}</td>
                  <td className="px-3 py-5 border-r border-gray-50 text-center">
                    <span className="bg-amber-500 text-white text-[8px] font-black px-2 py-1 rounded-full flex items-center justify-center gap-1 uppercase">
                      <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                      {row.status}
                    </span>
                  </td>
                  <td className="px-3 py-5">
                    <div className="flex items-center justify-center gap-1">
                      <button className="p-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button className="p-1.5 bg-cyan-500 text-white rounded hover:bg-cyan-600 transition-colors">
                        <Layout className="w-3.5 h-3.5" />
                      </button>
                      <button className="p-1.5 bg-emerald-500 text-white rounded hover:bg-emerald-600 transition-colors">
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button className="p-1.5 bg-amber-500 text-white rounded hover:bg-amber-600 transition-colors">
                        <Download className="w-3.5 h-3.5" />
                      </button>
                      <button className="p-1.5 bg-rose-500 text-white rounded hover:bg-rose-600 transition-colors">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-gray-50 flex justify-between items-center bg-white">
          <div className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">Showing 1 to 2 of 2 entries</div>
          <div className="flex items-center gap-2">
            <button className="text-[10px] font-bold text-gray-400 hover:text-gray-600 uppercase px-2">Previous</button>
            <button className="w-6 h-6 bg-blue-50 text-blue-600 text-[10px] font-bold rounded flex items-center justify-center border border-blue-100">1</button>
            <button className="text-[10px] font-bold text-gray-400 hover:text-gray-600 uppercase px-2">Next</button>
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
