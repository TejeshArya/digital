import { Calendar, Clock, Play, Square, UserCheck, UserX } from 'lucide-react';
import { useState } from 'react';

export function Attendance() {
  const [selectedDate, setSelectedDate] = useState('2024-03-25');

  const attendanceRecords = [
    {
      id: 'EMP-001',
      name: 'Rahul Sharma',
      department: 'IT',
      checkIn: '09:15 AM',
      checkOut: '06:30 PM',
      status: 'Present',
      hoursWorked: '9.25'
    },
    {
      id: 'EMP-002',
      name: 'Priya Singh',
      department: 'HR',
      checkIn: '09:00 AM',
      checkOut: '06:00 PM',
      status: 'Present',
      hoursWorked: '9.00'
    },
    {
      id: 'EMP-003',
      name: 'Amit Kumar',
      department: 'Sales',
      checkIn: '09:30 AM',
      checkOut: '07:00 PM',
      status: 'Present',
      hoursWorked: '9.50'
    },
    {
      id: 'EMP-004',
      name: 'Neha Patel',
      department: 'IT',
      checkIn: '-',
      checkOut: '-',
      status: 'Leave',
      hoursWorked: '0.00'
    },
    {
      id: 'EMP-005',
      name: 'Vikram Reddy',
      department: 'Finance',
      checkIn: '-',
      checkOut: '-',
      status: 'Absent',
      hoursWorked: '0.00'
    },
  ];

  const summary = {
    total: 156,
    present: 142,
    leave: 12,
    absent: 2
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Daily Attendance</h1>
          <p className="text-gray-600 mt-1">Track employee attendance and work hours</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2">
            <Play className="w-4 h-4" />
            Start All
          </button>
          <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center gap-2">
            <Square className="w-4 h-4" />
            Stop All
          </button>
        </div>
      </div>

      {/* Date Selector and Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Select Date</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-3 rounded-lg">
              <UserCheck className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total</p>
              <p className="text-2xl font-bold text-gray-800">{summary.total}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-3">
            <div className="bg-green-100 p-3 rounded-lg">
              <UserCheck className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Present</p>
              <p className="text-2xl font-bold text-gray-800">{summary.present}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-3">
            <div className="bg-yellow-100 p-3 rounded-lg">
              <Calendar className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Leave</p>
              <p className="text-2xl font-bold text-gray-800">{summary.leave}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-3">
            <div className="bg-red-100 p-3 rounded-lg">
              <UserX className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Absent</p>
              <p className="text-2xl font-bold text-gray-800">{summary.absent}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Attendance Table */}
      <div className="bg-white rounded-lg shadow">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Employee ID</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Department</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Check In</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Check Out</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Hours Worked</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {attendanceRecords.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">{record.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{record.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{record.department}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      {record.checkIn !== '-' && <Clock className="w-4 h-4 text-green-600" />}
                      <span className="text-sm text-gray-700">{record.checkIn}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      {record.checkOut !== '-' && <Clock className="w-4 h-4 text-red-600" />}
                      <span className="text-sm text-gray-700">{record.checkOut}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-800">
                    {record.hoursWorked} hrs
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      record.status === 'Present' ? 'bg-green-100 text-green-700' :
                      record.status === 'Leave' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {record.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {record.status === 'Present' && (
                      <div className="flex gap-2">
                        <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                          Edit
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
