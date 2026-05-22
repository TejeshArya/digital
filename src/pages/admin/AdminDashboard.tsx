import React, { useState, useEffect } from 'react';
import {
   Users, Briefcase, FileText, TrendingUp,
   Clock, CheckCircle, AlertCircle, Calendar,
   ArrowUpRight, ArrowDownRight, DollarSign,
   Activity, PieChart, BarChart3
} from 'lucide-react';

export function AdminDashboard() {
   const [dashboardData, setDashboardData] = useState({
      totalEmployees: 0,
      totalProjects: 0,
      revenue: 0,
      pending: 0
   });

   useEffect(() => {
      fetch('http://localhost:5076/api/dashboard/stats')
         .then(res => res.json())
         .then(data => setDashboardData(data))
         .catch(err => console.error('Error fetching dashboard stats:', err));
   }, []);

   const stats = [
      { label: 'Total Employees', value: dashboardData.totalEmployees.toLocaleString(), change: '+12%', icon: Users, color: 'blue' },
      { label: 'Active Projects', value: dashboardData.totalProjects.toLocaleString(), change: '+5%', icon: Briefcase, color: 'emerald' },
      { label: 'Revenue (MTD)', value: `$${dashboardData.revenue.toLocaleString()}`, change: '+18%', icon: DollarSign, color: 'indigo' },
      { label: 'Pending Approvals', value: dashboardData.pending.toString(), change: '-4', icon: Clock, color: 'amber' },
   ];

   return (
      <div className="p-6 space-y-6 bg-[#f8f9fc] min-h-screen">
         <div className="flex justify-between items-center mb-4">
            <div>
               <h1 className="text-2xl font-black text-gray-800 uppercase tracking-tight">Admin Dashboard</h1>
               <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Overview of your enterprise performance</p>
            </div>
            <div className="flex gap-3">
               <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-[10px] font-black uppercase tracking-widest text-gray-600 hover:bg-gray-50 transition-all shadow-sm">
                  Generate Report
               </button>
               <button className="px-4 py-2 bg-blue-600 rounded-lg text-[10px] font-black uppercase tracking-widest text-white hover:bg-blue-700 transition-all shadow-md shadow-blue-100">
                  New Project
               </button>
            </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
               <div key={idx} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all group cursor-pointer">
                  <div className="flex justify-between items-start mb-4">
                     <div className={`p-3 rounded-lg bg-${stat.color}-50 text-${stat.color}-600 group-hover:bg-${stat.color}-600 group-hover:text-white transition-all`}>
                        <stat.icon className="w-5 h-5" />
                     </div>
                     <span className={`text-[10px] font-black px-2 py-1 rounded ${stat.change.startsWith('+') ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                        }`}>
                        {stat.change}
                     </span>
                  </div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{stat.label}</p>
                  <h3 className="text-2xl font-black text-gray-800 mt-1">{stat.value}</h3>
               </div>
            ))}
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
            <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-100 shadow-sm min-h-[400px]">
               <div className="flex justify-between items-center mb-8">
                  <h3 className="text-[12px] font-black text-gray-800 uppercase tracking-widest flex items-center gap-2">
                     <Activity className="w-4 h-4 text-blue-600" />
                     Activity Overview
                  </h3>
                  <select className="text-[10px] font-black uppercase tracking-widest border-none bg-gray-50 px-3 py-1.5 rounded-lg text-gray-500">
                     <option>Last 7 Days</option>
                     <option>Last 30 Days</option>
                  </select>
               </div>
               <div className="h-[300px] flex items-center justify-center border-2 border-dashed border-gray-50 rounded-xl">
                  <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest italic">Chart Data Visualizer Placeholder</p>
               </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
               <h3 className="text-[12px] font-black text-gray-800 uppercase tracking-widest flex items-center gap-2 mb-8">
                  <PieChart className="w-4 h-4 text-emerald-600" />
                  Resource Allocation
               </h3>
               <div className="space-y-6">
                  {[
                     { label: 'Engineering', value: 45, color: 'blue' },
                     { label: 'Marketing', value: 20, color: 'emerald' },
                     { label: 'Operations', value: 25, color: 'indigo' },
                     { label: 'Other', value: 10, color: 'amber' },
                  ].map((item, idx) => (
                     <div key={idx} className="space-y-2">
                        <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                           <span className="text-gray-400">{item.label}</span>
                           <span className="text-gray-800">{item.value}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-gray-50 rounded-full overflow-hidden">
                           <div
                              className={`h-full bg-${item.color}-500 transition-all`}
                              style={{ width: `${item.value}%` }}
                           ></div>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </div>
   );
}
