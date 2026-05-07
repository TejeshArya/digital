import React, { useState } from 'react';
import { Search, Edit, Trash2, Eye } from 'lucide-react';

export function SubGST() {
  const [showForm, setShowForm] = useState(true);

  const gstRecords = [
    {
      companyName: 'Digital Engineering Sub 1',
      state: 'Maharashtra',
      mobile: '9876543210',
      email: 'sub1@de.com',
      pincode: '400001',
      remarks: 'Active',
      location: 'Andheri',
      address: 'Office 101, Business Center'
    }
  ];

  return (
    <div className="p-4 bg-[#f8f9fc] min-h-screen font-sans">
      {/* Form Section */}
      <div className="bg-white rounded-lg shadow-sm mb-6 overflow-hidden border border-gray-100">
        <div className="bg-[#0061f2] p-4">
          <h2 className="text-white font-bold text-[13px]">Sub GST</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-5">
            <div className="space-y-1">
              <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-tight">Company Name</label>
              <input
                type="text"
                placeholder="Company Name"
                className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded focus:outline-none focus:border-blue-400 transition-colors placeholder:text-gray-200"
              />
            </div>
            <div className="space-y-1">
              <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-tight">State</label>
              <select className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded text-gray-400 text-sm focus:outline-none focus:border-blue-400 transition-colors">
                <option>Select state</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-tight">Mobile No</label>
              <input
                type="text"
                placeholder="Mobile No"
                className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded focus:outline-none focus:border-blue-400 transition-colors placeholder:text-gray-200"
              />
            </div>
            <div className="space-y-1">
              <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-tight">Email</label>
              <input
                type="email"
                placeholder="Email"
                className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded focus:outline-none focus:border-blue-400 transition-colors placeholder:text-gray-200"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-tight">Pin Code</label>
              <input
                type="text"
                placeholder="Pin Code"
                className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded focus:outline-none focus:border-blue-400 transition-colors placeholder:text-gray-200"
              />
            </div>
            <div className="space-y-1">
              <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-tight">Remarks</label>
              <input
                type="text"
                placeholder="Remarks"
                className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded focus:outline-none focus:border-blue-400 transition-colors placeholder:text-gray-200"
              />
            </div>

            <div className="md:col-span-2 space-y-1">
              <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-tight">Location</label>
              <textarea
                placeholder="Location"
                rows={2}
                className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded focus:outline-none focus:border-blue-400 transition-colors resize-none placeholder:text-gray-200"
              />
            </div>

            <div className="md:col-span-2 space-y-1">
              <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-tight">Company Address</label>
              <textarea
                placeholder="Company Address"
                rows={2}
                className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded focus:outline-none focus:border-blue-400 transition-colors resize-none placeholder:text-gray-200"
              />
            </div>
          </div>

          <div className="mt-6">
            <button className="px-5 py-2 bg-[#0061f2] text-white text-[11px] font-bold rounded shadow-sm hover:bg-blue-700 transition-all uppercase tracking-wider">
              Save
            </button>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden mb-8">
        <div className="overflow-x-auto">
          <table className="w-full text-[12px] border-collapse">
            <thead>
              <tr className="bg-white border-b border-gray-100">
                <th className="px-4 py-5 text-left font-bold text-gray-600 border-r border-gray-50 whitespace-nowrap">Company Name</th>
                <th className="px-4 py-5 text-left font-bold text-gray-600 border-r border-gray-50 whitespace-nowrap">State</th>
                <th className="px-4 py-5 text-left font-bold text-gray-600 border-r border-gray-50 whitespace-nowrap">Mobile No</th>
                <th className="px-4 py-5 text-left font-bold text-gray-600 border-r border-gray-50 whitespace-nowrap">Email</th>
                <th className="px-4 py-5 text-left font-bold text-gray-600 border-r border-gray-50 whitespace-nowrap">Pin Code</th>
                <th className="px-4 py-5 text-left font-bold text-gray-600 border-r border-gray-50 whitespace-nowrap">Remarks</th>
                <th className="px-4 py-5 text-left font-bold text-gray-600 border-r border-gray-50 whitespace-nowrap">Location</th>
                <th className="px-4 py-5 text-left font-bold text-gray-600 border-r border-gray-50 whitespace-nowrap">Address</th>
                <th className="px-4 py-5 text-left font-bold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {gstRecords.map((record, index) => (
                <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-4 border-r border-gray-50 uppercase font-medium">{record.companyName}</td>
                  <td className="px-4 py-4 border-r border-gray-50 uppercase text-gray-500">{record.state}</td>
                  <td className="px-4 py-4 border-r border-gray-50 text-gray-500">{record.mobile}</td>
                  <td className="px-4 py-4 border-r border-gray-50 text-gray-500">{record.email}</td>
                  <td className="px-4 py-4 border-r border-gray-50 text-gray-500">{record.pincode}</td>
                  <td className="px-4 py-4 border-r border-gray-50 text-gray-500 italic">{record.remarks}</td>
                  <td className="px-4 py-4 border-r border-gray-50 text-gray-500">{record.location}</td>
                  <td className="px-4 py-4 border-r border-gray-50 text-gray-500">{record.address}</td>
                  <td className="px-4 py-4">
                    <div className="flex gap-2">
                      <button className="p-1 hover:bg-blue-50 rounded text-blue-600 transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1 hover:bg-orange-50 rounded text-orange-600 transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-1 hover:bg-red-50 rounded text-red-600 transition-colors">
                        <Trash2 className="w-4 h-4" />
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
          <a href="#" className="hover:underline hover:text-blue-500 transition-colors">Privacy Policy</a>
          <span>•</span>
          <a href="#" className="hover:underline hover:text-blue-500 transition-colors">Terms & Conditions</a>
        </div>
      </div>
    </div>
  );
}
