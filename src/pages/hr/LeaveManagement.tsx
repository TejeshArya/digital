import { Plus, Calendar, CheckCircle, XCircle, Clock, Filter } from 'lucide-react';
import { useState } from 'react';

export function LeaveManagement() {
  const [showForm, setShowForm] = useState(false);

  const leaveApplications = [
    {
      id: 'LV-001',
      employee: 'Rahul Sharma',
      empId: 'EMP-001',
      department: 'IT',
      leaveType: 'Casual Leave',
      fromDate: '2024-03-25',
      toDate: '2024-03-27',
      days: 3,
      reason: 'Personal work',
      status: 'Pending',
      appliedOn: '2024-03-20'
    },
    {
      id: 'LV-002',
      employee: 'Priya Singh',
      empId: 'EMP-002',
      department: 'HR',
      leaveType: 'Sick Leave',
      fromDate: '2024-03-28',
      toDate: '2024-03-28',
      days: 1,
      reason: 'Medical checkup',
      status: 'Approved',
      appliedOn: '2024-03-22'
    },
  ];

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Leave Management</h1>
          <p className="text-gray-600 mt-1">Manage employee leave applications</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Apply Leave
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-lg shadow mb-6 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Leave Application</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Leave Type *</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Select Leave Type</option>
                <option>Casual Leave</option>
                <option>Sick Leave</option>
                <option>Earned Leave</option>
                <option>Emergency Leave</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Number of Days *</label>
              <input
                type="number"
                placeholder="1"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">From Date *</label>
              <input
                type="date"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">To Date *</label>
              <input
                type="date"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Reason *</label>
              <textarea
                placeholder="Enter reason for leave"
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="mt-4 flex justify-end gap-3">
            <button
              onClick={() => setShowForm(false)}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Submit Application
            </button>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-3 mb-2">
            <Clock className="w-8 h-8 text-yellow-600" />
            <div>
              <p className="text-sm text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-gray-800">12</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle className="w-8 h-8 text-green-600" />
            <div>
              <p className="text-sm text-gray-600">Approved</p>
              <p className="text-2xl font-bold text-gray-800">45</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-3 mb-2">
            <XCircle className="w-8 h-8 text-red-600" />
            <div>
              <p className="text-sm text-gray-600">Rejected</p>
              <p className="text-2xl font-bold text-gray-800">3</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-3 mb-2">
            <Calendar className="w-8 h-8 text-blue-600" />
            <div>
              <p className="text-sm text-gray-600">Total</p>
              <p className="text-2xl font-bold text-gray-800">60</p>
            </div>
          </div>
        </div>
      </div>

      {/* Applications List */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b border-gray-200">
          <div className="flex gap-4">
            <select className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>All Status</option>
              <option>Pending</option>
              <option>Approved</option>
              <option>Rejected</option>
            </select>
            <select className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>All Departments</option>
              <option>IT</option>
              <option>HR</option>
              <option>Sales</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Leave ID</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Employee</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Department</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Leave Type</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">From - To</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Days</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Reason</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {leaveApplications.map((leave) => (
                <tr key={leave.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">{leave.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-800">{leave.employee}</div>
                    <div className="text-xs text-gray-500">{leave.empId}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{leave.department}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{leave.leaveType}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {leave.fromDate} to {leave.toDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-800">{leave.days}</td>
                  <td className="px-6 py-4 text-sm text-gray-700 max-w-xs truncate">{leave.reason}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      leave.status === 'Approved' ? 'bg-green-100 text-green-700' :
                      leave.status === 'Rejected' ? 'bg-red-100 text-red-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {leave.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {leave.status === 'Pending' && (
                      <div className="flex gap-2">
                        <button className="px-3 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700">
                          Approve
                        </button>
                        <button className="px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700">
                          Reject
                        </button>
                      </div>
                    )}
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
