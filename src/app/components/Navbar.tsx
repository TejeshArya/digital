import React from 'react';
import { Menu, Bell, User, Search, Settings, LogOut, Mail } from 'lucide-react';
import logo from '@/assets/logo.png';

interface NavbarProps {
  onToggleSidebar: () => void;
  onLogout?: () => void;
  user: {
    name?: string;
    fullName?: string;
    email: string;
    avatar: string;
  };
}

export function Navbar({ onToggleSidebar, user, onLogout }: NavbarProps) {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 z-50">
      <div className="flex items-center gap-4">
        <button 
          onClick={onToggleSidebar}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-500"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2">
           <img src={logo} alt="Company Logo" className="h-8 w-auto object-contain" />
           <span className="font-black text-xs tracking-tighter text-gray-800 uppercase">Digital Engineering Enterprises</span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="hidden md:flex items-center relative mr-4">
           <Search className="w-4 h-4 text-gray-400 absolute left-3" />
           <input 
             type="text" 
             placeholder="Search for..." 
             className="bg-gray-100 border-none rounded-lg pl-10 pr-4 py-2 text-xs w-64 focus:ring-2 focus:ring-blue-500 transition-all"
           />
        </div>
        
        <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 border-2 border-white rounded-full"></span>
        </button>
        
        <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg">
          <Mail className="w-5 h-5" />
        </button>

        <div className="h-8 w-[1px] bg-gray-200 mx-2"></div>

        <button className="flex items-center gap-3 pl-2 pr-1 py-1 hover:bg-gray-50 rounded-lg transition-colors">
          <div className="text-right hidden sm:block">
            <p className="text-[11px] font-black text-gray-800 uppercase tracking-wider">{user.fullName || user.name}</p>
            <p className="text-[9px] font-bold text-gray-400">{user.email}</p>
          </div>
          <img 
            src={user.avatar || 'https://ui-avatars.com/api/?name=' + (user.fullName || user.name)} 
            alt="Profile" 
            className="w-8 h-8 rounded-full border border-gray-100"
          />
        </button>

        <button 
          onClick={onLogout}
          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors ml-1"
          title="Logout"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
}
