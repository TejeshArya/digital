import React, { useState } from 'react';
import { 
  ShieldCheck, Lock, Eye, EyeOff, CheckCircle2, 
  AlertCircle, ShieldAlert, Key, RefreshCw,
  Info, ArrowRight, ShieldCheck as SecurityIcon,
  Fingerprint, Smartphone
} from 'lucide-react';

export function UpdatePassword() {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [password, setPassword] = useState('');
  const [strength, setStrength] = useState(0); // 0 to 100

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setPassword(val);
    // Simple strength logic for UI demo
    let s = 0;
    if (val.length > 8) s += 25;
    if (/[A-Z]/.test(val)) s += 25;
    if (/[0-9]/.test(val)) s += 25;
    if (/[^A-Za-z0-9]/.test(val)) s += 25;
    setStrength(s);
  };

  const requirements = [
    { label: 'At least 12 characters long', met: password.length >= 12 },
    { label: 'One uppercase character', met: /[A-Z]/.test(password) },
    { label: 'One lowercase character', met: /[a-z]/.test(password) },
    { label: 'One number', met: /[0-9]/.test(password) },
    { label: 'One special character (!@#$...)', met: /[^A-Za-z0-9]/.test(password) },
  ];

  return (
    <div className="p-4 bg-[#f8f9fc] min-h-screen font-sans">
      {/* Top Header */}
      <div className="flex flex-col mb-8">
        <h1 className="text-gray-700 font-black text-xl uppercase tracking-widest flex items-center gap-2">
           Update Password
        </h1>
        <p className="text-[11px] text-gray-400 font-bold uppercase tracking-tight mt-1">Ensure your account stays secure with a strong, unique password</p>
      </div>

      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Form Column */}
        <div className="lg:col-span-2 space-y-8">
           <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="bg-[#0061f2] px-8 py-5 border-b border-blue-400 flex items-center gap-2">
                 <Lock className="w-4 h-4 text-white" />
                 <h3 className="text-[12px] font-black text-white uppercase tracking-widest">Security Credentials</h3>
              </div>
              
              <div className="p-10 space-y-8">
                 {/* Current Password */}
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Current Password</label>
                    <div className="relative">
                       <input 
                         type={showCurrent ? "text" : "password"} 
                         placeholder="••••••••••••"
                         className="w-full pl-4 pr-12 py-4 bg-gray-50/50 border border-gray-100 rounded-xl text-[14px] font-bold text-gray-700 focus:outline-none focus:border-blue-400 transition-all shadow-inner"
                       />
                       <button 
                         onClick={() => setShowCurrent(!showCurrent)}
                         className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-blue-500 transition-colors"
                       >
                          {showCurrent ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                       </button>
                    </div>
                 </div>

                 <div className="border-t border-gray-50 pt-8 space-y-8">
                    {/* New Password */}
                    <div className="space-y-4">
                       <div className="space-y-2">
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">New Password</label>
                          <div className="relative">
                             <input 
                               type={showNew ? "text" : "password"} 
                               value={password}
                               onChange={handlePasswordChange}
                               placeholder="Min. 12 characters"
                               className="w-full pl-4 pr-12 py-4 bg-gray-50/50 border border-gray-100 rounded-xl text-[14px] font-bold text-gray-700 focus:outline-none focus:border-blue-400 transition-all shadow-inner"
                             />
                             <button 
                               onClick={() => setShowNew(!showNew)}
                               className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-blue-500 transition-colors"
                             >
                                {showNew ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                             </button>
                          </div>
                       </div>

                       {/* Strength Meter */}
                       <div className="space-y-2">
                          <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-widest">
                             <span className="text-gray-400">Password Strength</span>
                             <span className={`${
                               strength <= 25 ? 'text-rose-500' :
                               strength <= 50 ? 'text-amber-500' :
                               strength <= 75 ? 'text-blue-500' : 'text-emerald-500'
                             }`}>
                                {strength <= 25 ? 'Weak' :
                                 strength <= 50 ? 'Fair' :
                                 strength <= 75 ? 'Good' : 'Strong'}
                             </span>
                          </div>
                          <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden flex gap-0.5">
                             <div className={`h-full transition-all duration-500 ${strength >= 25 ? (strength <= 25 ? 'bg-rose-500' : strength <= 50 ? 'bg-amber-500' : 'bg-emerald-500') : 'bg-gray-100'}`} style={{ width: '25%' }}></div>
                             <div className={`h-full transition-all duration-500 ${strength >= 50 ? (strength <= 50 ? 'bg-amber-500' : 'bg-emerald-500') : 'bg-gray-100'}`} style={{ width: '25%' }}></div>
                             <div className={`h-full transition-all duration-500 ${strength >= 75 ? 'bg-emerald-500' : 'bg-gray-100'}`} style={{ width: '25%' }}></div>
                             <div className={`h-full transition-all duration-500 ${strength >= 100 ? 'bg-emerald-500' : 'bg-gray-100'}`} style={{ width: '25%' }}></div>
                          </div>
                       </div>
                    </div>

                    {/* Confirm Password */}
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Confirm New Password</label>
                       <div className="relative">
                          <input 
                            type={showConfirm ? "text" : "password"} 
                            placeholder="Re-enter new password"
                            className="w-full pl-4 pr-12 py-4 bg-gray-50/50 border border-gray-100 rounded-xl text-[14px] font-bold text-gray-700 focus:outline-none focus:border-blue-400 transition-all shadow-inner"
                          />
                          <button 
                            onClick={() => setShowConfirm(!showConfirm)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-blue-500 transition-colors"
                          >
                             {showConfirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                       </div>
                    </div>
                 </div>

                 {/* Submit Action */}
                 <div className="pt-4">
                    <button className="w-full py-5 bg-[#0061f2] text-white text-[12px] font-black rounded-xl shadow-lg shadow-blue-100 uppercase tracking-[0.2em] hover:bg-blue-700 transition-all flex items-center justify-center gap-3 group">
                       <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-700" /> 
                       Update Password & Secure Account
                    </button>
                 </div>
              </div>
           </div>

           {/* Security History (Mock) */}
           <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex items-center justify-between">
              <div className="flex items-center gap-4">
                 <div className="bg-blue-50 p-3 rounded-xl">
                    <SecurityIcon className="w-6 h-6 text-blue-600" />
                 </div>
                 <div className="space-y-0.5">
                    <h4 className="text-[11px] font-black text-gray-700 uppercase tracking-widest">Last Password Change</h4>
                    <p className="text-[10px] text-gray-400 font-bold uppercase">March 12, 2026 at 10:30 AM • IP: 192.168.1.45</p>
                 </div>
              </div>
              <button className="text-[9px] font-black text-blue-600 uppercase tracking-widest hover:underline">View History</button>
           </div>
        </div>

        {/* Sidebar Column */}
        <div className="space-y-8">
           {/* Requirements Card */}
           <div className="bg-[#1a202c] rounded-2xl shadow-sm border border-gray-800 p-8 space-y-6">
              <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                 <ShieldAlert className="w-4 h-4 text-amber-500" /> Security Guidelines
              </h3>
              <div className="space-y-4">
                 {requirements.map((req, idx) => (
                   <div key={idx} className="flex items-start gap-3 group">
                      <div className={`mt-0.5 p-0.5 rounded-full border transition-all ${req.met ? 'bg-emerald-500 border-emerald-400' : 'bg-transparent border-gray-700'}`}>
                         <CheckCircle2 className={`w-3 h-3 ${req.met ? 'text-white' : 'text-gray-800'}`} />
                      </div>
                      <span className={`text-[10px] font-bold uppercase tracking-tight transition-colors ${req.met ? 'text-emerald-400' : 'text-gray-500'}`}>
                         {req.label}
                      </span>
                   </div>
                 ))}
              </div>
              <div className="pt-4 border-t border-gray-800 flex items-center gap-3">
                 <div className="bg-amber-500/10 p-2 rounded-lg">
                    <Info className="w-4 h-4 text-amber-500" />
                 </div>
                 <p className="text-[9px] text-gray-500 font-bold uppercase leading-relaxed">
                    A strong password helps prevent unauthorized access to your account.
                 </p>
              </div>
           </div>

           {/* MFA Promotion Card */}
           <div className="bg-gradient-to-br from-[#0061f2] to-[#6b58d3] rounded-2xl shadow-xl p-8 text-white space-y-6 relative overflow-hidden">
              <div className="absolute right-[-20px] bottom-[-20px] opacity-10 rotate-12">
                 <Fingerprint className="w-40 h-40 text-white" />
              </div>
              <div className="space-y-2 relative">
                 <h3 className="text-[13px] font-black uppercase tracking-widest flex items-center gap-2">
                    <Smartphone className="w-5 h-5" /> Multi-Factor Auth
                 </h3>
                 <p className="text-[10px] font-bold uppercase tracking-tight opacity-80 leading-relaxed">
                    Add an extra layer of security by enabling 2FA. Protect your account from unauthorized logins.
                 </p>
              </div>
              <button className="w-full py-3 bg-white text-blue-600 text-[10px] font-black rounded-xl uppercase tracking-widest hover:bg-blue-50 transition-all relative">
                 Enable 2FA Now
              </button>
           </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center text-[10px] text-gray-400 font-bold tracking-[0.2em] uppercase px-4">
        <p>Copyright © Your Website 2021</p>
        <div className="flex gap-4">
          <a href="#" className="hover:underline transition-colors hover:text-gray-600 lowercase italic tracking-tight">privacy policy</a>
          <span>•</span>
          <a href="#" className="hover:underline transition-colors hover:text-gray-600 lowercase italic tracking-tight">terms & conditions</a>
        </div>
      </div>
    </div>
  );
}
