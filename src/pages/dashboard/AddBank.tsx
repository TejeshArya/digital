import React from 'react';
import { Edit, Trash2 } from 'lucide-react';

export function AddBank() {
  const banks = [
    { name: 'ALLAHABAD BANK', description: 'ALLAHABAD BANK', date: '2025-12-23 14:01:08' },
    { name: 'CANERA BANK', description: 'CANERA BANK', date: '2025-12-23 14:00:46' },
    { name: 'BANK OF INDIA', description: 'BOI', date: '2025-12-23 14:00:33' },
    { name: 'ICICI', description: 'ICICI', date: '2025-12-23 14:00:24' },
    { name: 'HDFC', description: 'HDFC', date: '2025-12-23 14:00:03' },
    { name: 'STATE BANK OF INDIA', description: 'SBI', date: '2025-12-23 13:59:56' },
  ];

  return (
    <div className="p-4 bg-[#f8f9fc] min-h-screen font-sans">
      {/* Add New Bank Form */}
      <div className="bg-white rounded-lg shadow-sm mb-6 overflow-hidden border border-gray-100">
        <div className="bg-[#0061f2] p-4">
          <h2 className="text-white font-bold text-[13px]">Add New Bank</h2>
        </div>
        <div className="p-10">
          <div className="flex flex-col md:flex-row items-end gap-6">
            <div className="flex-1 space-y-1.5">
              <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-tight">Bank Name</label>
              <input
                type="text"
                className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded focus:outline-none focus:border-blue-400 transition-colors"
              />
            </div>
            <div className="flex-1 space-y-1.5">
              <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-tight">Description</label>
              <input
                type="text"
                className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded focus:outline-none focus:border-blue-400 transition-colors"
              />
            </div>
            <button className="px-8 py-2.5 bg-[#0061f2] text-white text-[11px] font-bold rounded shadow-sm hover:bg-blue-700 transition-all uppercase tracking-widest">
              Save
            </button>
          </div>
        </div>
      </div>

      {/* Bank List Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden mb-8">
        <div className="overflow-x-auto">
          <table className="w-full text-[12px] border-collapse">
            <thead>
              <tr className="bg-white border-b border-gray-100">
                <th className="px-6 py-5 text-left font-bold text-gray-700 border-r border-gray-50">Bank Name</th>
                <th className="px-6 py-5 text-left font-bold text-gray-700 border-r border-gray-50">Description</th>
                <th className="px-6 py-5 text-left font-bold text-gray-700 border-r border-gray-50">Created Date</th>
                <th className="px-6 py-5 text-left font-bold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {banks.map((bank, index) => (
                <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 border-r border-gray-50 text-gray-600 font-medium">{bank.name}</td>
                  <td className="px-6 py-4 border-r border-gray-50 text-gray-500 uppercase">{bank.description}</td>
                  <td className="px-6 py-4 border-r border-gray-50 text-gray-500">{bank.date}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button className="px-3 py-1.5 bg-orange-400 text-white text-[10px] font-bold rounded uppercase hover:bg-orange-500 transition-colors shadow-sm">
                        Edit
                      </button>
                      <button className="px-3 py-1.5 bg-red-600 text-white text-[10px] font-bold rounded uppercase hover:bg-red-700 transition-colors shadow-sm">
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
        <p>Copyright © Your Website 2021</p>
        <div className="flex gap-4 mt-2 md:mt-0">
          <a href="#" className="hover:underline">Privacy Policy</a>
          <span>•</span>
          <a href="#" className="hover:underline">Terms & Conditions</a>
        </div>
      </div>
    </div>
  );
}
