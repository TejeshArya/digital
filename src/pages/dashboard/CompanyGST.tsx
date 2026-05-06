import { Plus, Search, Edit, Trash2, Eye, LayoutDashboard, Network, UserPlus, CheckCircle, Clock, CheckCircle2, Users, XCircle, ChevronRight, ChevronDown } from 'lucide-react';
import { useState } from 'react';

export function CompanyGST() {
  const [showForm, setShowForm] = useState(false);

  const companies = [
    {
      gstNo: '33ANVES1111A1Z1',
      name: 'INS ANVESH',
      state: 'TAMIL NADU',
      mobile: '8912578000',
      email: 'anvesh-navy@gov.in'
    },
    {
      gstNo: '37COMNC1111A1Z1',
      name: 'COMMUNICATION NETWORK CENTER',
      state: 'ANDHRA PRADESH',
      mobile: '8912812630',
      email: 'netwarcom_suff_csc@navy.mil'
    },
    {
      gstNo: '27TABAR1111A1Z1',
      name: 'INS TABAR',
      state: 'MAHARASHTRA',
      mobile: '9409520932',
      email: 'TABAR-NAVY@GOV.IN'
    },
    {
      gstNo: '27BGIPG2942N1Z2',
      name: 'FLEET MAINTENANCE UNIT MUMBAI',
      state: 'MAHARASHTRA',
      mobile: '9161224444',
      email: 'fmipl@fleetship.com'
    },
    {
      gstNo: '20AAECC7652H1ZU',
      name: 'Eekakshara Projects Pvt Ltd',
      state: 'JHARKHAND',
      mobile: '9234600666',
      email: 'jatz1986@gmail.com'
    },
    {
      gstNo: '27WEDMA1111A1Z1',
      name: 'WED MANKHURD',
      state: 'MAHARASHTRA',
      mobile: '9956562952',
      email: 'wed@navy.gov.in'
    }
  ];

  return (
    <div className="p-4 bg-[#f8f9fc] min-h-screen font-sans">
      {/* Form Section */}
      <div className="bg-white rounded-lg shadow-sm mb-6 overflow-hidden">
        <div className="bg-[#0061f2] p-4">
          <h2 className="text-white font-bold text-sm">Add New Company GST</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">GST State Code</label>
              <select className="w-full px-3 py-2 bg-white border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-500 text-gray-600">
                <option>Select GST code</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">GST Number</label>
              <input
                type="text"
                placeholder="GST number"
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-500 placeholder-gray-400"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Company Name</label>
              <input
                type="text"
                placeholder="Company name"
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-500 placeholder-gray-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">PAN Number</label>
              <input
                type="text"
                placeholder="PAN number"
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-500 placeholder-gray-400"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">TAN Number</label>
              <input
                type="text"
                placeholder="TAN number"
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-500 placeholder-gray-400"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Mobile Number</label>
              <input
                type="text"
                placeholder="Mobile number"
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-500 placeholder-gray-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">State Name</label>
              <input
                type="text"
                placeholder="State name"
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-500 placeholder-gray-400"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Email</label>
              <input
                type="email"
                placeholder="Email"
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-500 placeholder-gray-400"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Pin Code</label>
              <input
                type="text"
                placeholder="Pin code"
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-500 placeholder-gray-400"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-gray-500 mb-1">Company Address</label>
              <textarea
                placeholder="Company address"
                rows={2}
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-500 placeholder-gray-400"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Remarks</label>
              <textarea
                placeholder="Remarks"
                rows={2}
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-500 placeholder-gray-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Company Established</label>
              <input
                type="date"
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-500 text-gray-400"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">City</label>
              <select className="w-full px-3 py-2 bg-[#f4f4f4] border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-500 text-gray-600">
                <option>Select City</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">GST Type</label>
              <input
                type="text"
                defaultValue="GST"
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-500 text-gray-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Deals in</label>
              <input
                type="text"
                placeholder="Deals in"
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-500 placeholder-gray-400"
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-2">
            <button className="px-4 py-2 bg-[#0061f2] text-white text-xs font-semibold rounded hover:bg-blue-700 transition-colors">
              Open Additional Info
            </button>
            <button className="px-4 py-2 bg-[#0061f2] text-white text-xs font-semibold rounded hover:bg-blue-700 transition-colors">
              Save
            </button>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>Show</span>
            <select className="border border-gray-200 rounded px-1 py-1 focus:outline-none">
              <option>10</option>
              <option>25</option>
              <option>50</option>
            </select>
            <span>companies per page</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>Search companies:</span>
            <input
              type="text"
              className="border border-gray-200 rounded px-3 py-1.5 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="px-4 py-3 text-left font-semibold text-gray-600 border-r border-gray-100">GST No</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-600 border-r border-gray-100">Company Name</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-600 border-r border-gray-100">State</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-600 border-r border-gray-100">Mobile</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-600 border-r border-gray-100">Email</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {companies.map((company, index) => (
                <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-4 text-gray-500 border-r border-gray-100">{company.gstNo}</td>
                  <td className="px-4 py-4 text-gray-600 border-r border-gray-100 uppercase">{company.name}</td>
                  <td className="px-4 py-4 text-gray-500 border-r border-gray-100 uppercase">{company.state}</td>
                  <td className="px-4 py-4 text-gray-500 border-r border-gray-100">{company.mobile}</td>
                  <td className="px-4 py-4 text-gray-500 border-r border-gray-100">{company.email}</td>
                  <td className="px-4 py-4">
                    <div className="flex flex-col gap-1.5">
                      <div className="flex gap-1.5">
                        <button className="flex items-center gap-1 px-2 py-1 bg-cyan-500 text-white text-[10px] font-bold rounded uppercase hover:bg-cyan-600">
                          <Eye className="w-3 h-3" /> View
                        </button>
                        <button className="flex items-center gap-1 px-2 py-1 bg-orange-400 text-white text-[10px] font-bold rounded uppercase hover:bg-orange-500">
                          <Edit className="w-3 h-3" /> Edit
                        </button>
                      </div>
                      <button className="flex items-center justify-center gap-1 px-2 py-1 bg-red-600 text-white text-[10px] font-bold rounded uppercase hover:bg-red-700 w-fit">
                        <Trash2 className="w-3 h-3" /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
