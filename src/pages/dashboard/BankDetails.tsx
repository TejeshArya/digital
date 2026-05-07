import React from 'react';
import { Edit, Trash2 } from 'lucide-react';

export function BankDetails() {
  const bankRecords = [
    {
      empId: 'DEE010126115',
      company: 'RANJAN YADAV',
      bank: 'STATE BANK OF INDIA',
      accNo: '32698162709',
      ifsc: 'SBIN0002945',
      swift: '',
      micr: '',
      branch: 'HATHUA',
      holder: 'RANJAN YADAV',
      cat: '4'
    }
  ];

  return (
    <div className="p-4 bg-[#f8f9fc] min-h-screen font-sans">
      {/* Bank Form */}
      <div className="bg-white rounded-lg shadow-sm mb-6 overflow-hidden border border-gray-100">
        <div className="bg-[#0061f2] p-4">
          <h2 className="text-white font-bold text-[13px] uppercase tracking-wider">Bank Form</h2>
        </div>
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-6">
            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-tight">Employee ID</label>
              <input
                type="text"
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-400"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-tight">Company Name</label>
              <input
                type="text"
                placeholder="Type to search company..."
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-400 placeholder:text-gray-200"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-tight">Bank Name</label>
              <select className="w-full px-3 py-2 bg-white border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-400 text-gray-400">
                <option>Select Bank</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-tight">Account No</label>
              <input
                type="text"
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-400"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-tight">IFSC Code</label>
              <input
                type="text"
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-400"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-tight">Swift Code</label>
              <input
                type="text"
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-400"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-tight">MICR Code</label>
              <input
                type="text"
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-400"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-tight">Branch Name</label>
              <input
                type="text"
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-400"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-tight">Account Holder</label>
              <input
                type="text"
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-400"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-tight">Category</label>
              <select className="w-full px-3 py-2 bg-white border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-400 text-gray-400">
                <option>Select Category</option>
              </select>
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <button className="px-10 py-2.5 bg-[#0061f2] text-white text-[11px] font-bold rounded shadow-sm hover:bg-blue-700 transition-colors uppercase tracking-widest">
              Save
            </button>
          </div>
        </div>
      </div>

      {/* Bank Records Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden mb-8">
        <div className="overflow-x-auto">
          <table className="w-full text-[11px] border-collapse">
            <thead>
              <tr className="bg-white border-b border-gray-100">
                <th className="px-4 py-5 text-left font-bold text-gray-600 border-r border-gray-50 uppercase tracking-tighter whitespace-nowrap">Emp ID</th>
                <th className="px-4 py-5 text-left font-bold text-gray-600 border-r border-gray-50 uppercase tracking-tighter whitespace-nowrap">Company</th>
                <th className="px-4 py-5 text-left font-bold text-gray-600 border-r border-gray-50 uppercase tracking-tighter whitespace-nowrap">Bank</th>
                <th className="px-4 py-5 text-left font-bold text-gray-600 border-r border-gray-50 uppercase tracking-tighter whitespace-nowrap">Acc No</th>
                <th className="px-4 py-5 text-left font-bold text-gray-600 border-r border-gray-50 uppercase tracking-tighter whitespace-nowrap">IFSC</th>
                <th className="px-4 py-5 text-left font-bold text-gray-600 border-r border-gray-50 uppercase tracking-tighter whitespace-nowrap">Swift</th>
                <th className="px-4 py-5 text-left font-bold text-gray-600 border-r border-gray-50 uppercase tracking-tighter whitespace-nowrap">MICR</th>
                <th className="px-4 py-5 text-left font-bold text-gray-600 border-r border-gray-50 uppercase tracking-tighter whitespace-nowrap">Branch</th>
                <th className="px-4 py-5 text-left font-bold text-gray-600 border-r border-gray-50 uppercase tracking-tighter whitespace-nowrap">Holder</th>
                <th className="px-4 py-5 text-left font-bold text-gray-600 border-r border-gray-50 uppercase tracking-tighter whitespace-nowrap">Cat</th>
                <th className="px-4 py-5 text-left font-bold text-gray-600 uppercase tracking-tighter whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {bankRecords.map((record, index) => (
                <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-4 border-r border-gray-50 text-gray-500 uppercase">{record.empId}</td>
                  <td className="px-4 py-4 border-r border-gray-50 text-gray-700 font-bold uppercase">{record.company}</td>
                  <td className="px-4 py-4 border-r border-gray-50 text-gray-500 uppercase">{record.bank}</td>
                  <td className="px-4 py-4 border-r border-gray-50 text-gray-500">{record.accNo}</td>
                  <td className="px-4 py-4 border-r border-gray-50 text-gray-500">{record.ifsc}</td>
                  <td className="px-4 py-4 border-r border-gray-50 text-gray-500 text-center">{record.swift || '-'}</td>
                  <td className="px-4 py-4 border-r border-gray-50 text-gray-500 text-center">{record.micr || '-'}</td>
                  <td className="px-4 py-4 border-r border-gray-50 text-gray-500 uppercase">{record.branch}</td>
                  <td className="px-4 py-4 border-r border-gray-50 text-gray-500 uppercase">{record.holder}</td>
                  <td className="px-4 py-4 border-r border-gray-50 text-gray-500">{record.cat}</td>
                  <td className="px-4 py-4">
                    <div className="flex flex-col gap-1.5 items-center">
                      <button className="w-full max-w-[50px] px-2 py-1 bg-orange-400 text-white text-[9px] font-bold rounded uppercase hover:bg-orange-500 transition-colors shadow-sm">
                        Edit
                      </button>
                      <button className="w-full max-w-[50px] px-2 py-1 bg-red-600 text-white text-[9px] font-bold rounded uppercase hover:bg-red-700 transition-colors shadow-sm">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center text-[10px] text-gray-400 font-bold tracking-widest uppercase">
        <p>Copyright &copy; Digital New Enterprises 2024</p>
        <div className="flex gap-4 mt-2 md:mt-0">
          <a href="#" className="hover:underline">Privacy Policy</a>
          <span>•</span>
          <a href="#" className="hover:underline">Terms & Conditions</a>
        </div>
      </div>
    </div>
  );
}
