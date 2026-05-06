import { TrendingUp, DollarSign, Users, FileText, Clock, AlertCircle } from 'lucide-react';

export function Dashboard() {
  const stats = [
    { label: 'Total Revenue', value: '₹12,45,000', icon: DollarSign, color: 'bg-blue-500', change: '+12.5%' },
    { label: 'Active Projects', value: '24', icon: FileText, color: 'bg-green-500', change: '+3' },
    { label: 'Total Employees', value: '156', icon: Users, color: 'bg-purple-500', change: '+8' },
    { label: 'Pending Tasks', value: '18', icon: Clock, color: 'bg-orange-500', change: '-5' },
    { label: 'Invoices Due', value: '7', icon: AlertCircle, color: 'bg-red-500', change: '+2' },
    { label: 'Growth Rate', value: '23%', icon: TrendingUp, color: 'bg-indigo-500', change: '+5.2%' },
  ];

  const recentActivities = [
    { action: 'New project created', user: 'Admin User', time: '2 hours ago', type: 'project' },
    { action: 'Invoice #INV-001 paid', user: 'Client ABC', time: '5 hours ago', type: 'payment' },
    { action: 'Employee onboarding completed', user: 'HR Team', time: '1 day ago', type: 'hr' },
    { action: 'Quotation sent to XYZ Corp', user: 'Sales Team', time: '2 days ago', type: 'sales' },
  ];

  const quickActions = [
    { label: 'Create Project', color: 'bg-blue-600 hover:bg-blue-700' },
    { label: 'Add Invoice', color: 'bg-green-600 hover:bg-green-700' },
    { label: 'New Employee', color: 'bg-purple-600 hover:bg-purple-700' },
    { label: 'Generate Report', color: 'bg-orange-600 hover:bg-orange-700' },
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome to your DE Enterprises dashboard</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm font-semibold text-green-600">{stat.change}</span>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activities */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow">
          <div className="p-4 border-b border-gray-200">
            <h3 className="font-semibold text-gray-800">Recent Activities</h3>
          </div>
          <div className="p-4">
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className={`w-2 h-2 mt-2 rounded-full ${
                    activity.type === 'project' ? 'bg-blue-500' :
                    activity.type === 'payment' ? 'bg-green-500' :
                    activity.type === 'hr' ? 'bg-purple-500' :
                    'bg-orange-500'
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800">{activity.action}</p>
                    <p className="text-xs text-gray-500 mt-1">by {activity.user} • {activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b border-gray-200">
            <h3 className="font-semibold text-gray-800">Quick Actions</h3>
          </div>
          <div className="p-4">
            <div className="space-y-3">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  className={`w-full ${action.color} text-white py-3 px-4 rounded-lg transition-colors font-medium text-sm`}
                >
                  {action.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
