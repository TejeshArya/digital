import { Clock, CheckCircle2, Users, XCircle, LayoutDashboard, Network, UserPlus, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';

export function EmployeeApproval() {
  const stats = [
    { label: 'PENDING IT APPROVAL', count: 0, color: 'text-amber-500', icon: Clock, bgColor: 'bg-amber-50' },
    { label: 'APPROVED BY IT', count: 33, color: 'text-emerald-500', icon: CheckCircle2, bgColor: 'bg-emerald-50' },
    { label: 'ACTIVE USERS', count: 33, color: 'text-blue-500', icon: Users, bgColor: 'bg-blue-50' },
    { label: 'REJECTED', count: 0, color: 'text-red-500', icon: XCircle, bgColor: 'bg-red-50' },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold text-gray-800">Employee Approval Management</h1>
        <div className="flex gap-2">
          <Button className="bg-indigo-700 hover:bg-indigo-800 text-white flex items-center gap-2">
            <LayoutDashboard className="w-4 h-4" /> IT Dashboard
          </Button>
          <Button className="bg-cyan-500 hover:bg-cyan-600 text-white flex items-center gap-2">
            <Network className="w-4 h-4" /> Hierarchy Dashboard
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2">
            <UserPlus className="w-4 h-4" /> Manage Users
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, i) => (
          <Card key={i} className="border-none shadow-sm">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className={`text-[10px] font-bold ${stat.color} mb-1 uppercase`}>{stat.label}</p>
                <p className="text-2xl font-bold text-gray-800">{stat.count}</p>
              </div>
              <div className={`p-3 rounded-full ${stat.bgColor}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-none shadow-sm overflow-hidden">
        <Tabs defaultValue="pending" className="w-full">
          <CardHeader className="p-0 border-b bg-gray-50/50">
            <TabsList className="bg-transparent h-auto p-0 gap-0">
              <TabsTrigger value="pending" className="px-6 py-4 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-white data-[state=active]:shadow-none flex items-center gap-2">
                <Clock className="w-4 h-4" /> Pending IT Approval (0)
              </TabsTrigger>
              <TabsTrigger value="approved" className="px-6 py-4 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-white data-[state=active]:shadow-none flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600" /> Approved by IT (33)
              </TabsTrigger>
              <TabsTrigger value="active" className="px-6 py-4 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-white data-[state=active]:shadow-none flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-600" /> Active Users (33)
              </TabsTrigger>
              <TabsTrigger value="rejected" className="px-6 py-4 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-white data-[state=active]:shadow-none flex items-center gap-2">
                <XCircle className="w-4 h-4 text-blue-600" /> Rejected (0)
              </TabsTrigger>
            </TabsList>
          </CardHeader>
          <CardContent className="p-12 text-center">
            <TabsContent value="pending" className="mt-0">
              <div className="flex flex-col items-center justify-center py-10">
                <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-emerald-500 mb-1">All Employees Approved!</h3>
                <p className="text-gray-400">No pending IT approvals at this time.</p>
              </div>
            </TabsContent>
            <TabsContent value="approved">
              <p className="text-gray-500">List of approved employees will appear here.</p>
            </TabsContent>
            <TabsContent value="active">
              <p className="text-gray-500">List of active users will appear here.</p>
            </TabsContent>
            <TabsContent value="rejected">
              <p className="text-gray-500">List of rejected employees will appear here.</p>
            </TabsContent>
          </CardContent>
        </Tabs>
      </Card>
      
      <div className="mt-6 flex items-center justify-between text-xs text-gray-500">
        <p>Copyright © Your Website 2021</p>
        <div className="flex gap-4">
          <button className="hover:underline">Privacy Policy</button>
          <span>•</span>
          <button className="hover:underline">Terms & Conditions</button>
        </div>
      </div>
    </div>
  );
}
