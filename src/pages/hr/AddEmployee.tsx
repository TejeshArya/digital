import React, { useState } from 'react';
import { 
  User, Mail, Calendar, GraduationCap, DollarSign, 
  FileText, Lock, RefreshCw, AlertCircle, ArrowLeft,
  Layout, ShieldCheck, CheckCircle, UserPlus, Info,
  X, Settings, Copy, ChevronLeft, LayoutDashboard, Eye, EyeOff
} from 'lucide-react';

interface AddEmployeeProps {
  onNavigate?: (path: string) => void;
}

export function AddEmployee({ onNavigate }: AddEmployeeProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    officialEmail: '',
    dateOfJoining: '',
    coreQualification: '',
    annualSalary: '',
    remarks: '',
    password: '',
    confirmPassword: ''
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const qualifications = [
    'B.E / B.TECH',
    'MBA',
    'MCA',
    'M.TECH',
    'Ph.D',
    'B.COM',
    'M.COM',
    'B.SC',
    'M.SC',
    'DIPLOMA',
    'ITI'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const generatePassword = () => {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
    let retVal = "";
    for (let i = 0, n = charset.length; i < 12; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    setFormData(prev => ({ ...prev, password: retVal, confirmPassword: retVal }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.officialEmail || !formData.dateOfJoining || !formData.password) {
      alert('Please fill all required fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await fetch('http://localhost:5076/api/employees', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.officialEmail,
          joiningDate: formData.dateOfJoining,
          qualification: formData.coreQualification,
          annualSalary: formData.annualSalary,
          remarks: formData.remarks,
          temporaryPassword: formData.password,
          role: 'Employee',
          status: 'Pending'
        })
      });

      if (response.ok) {
        setShowSuccess(true);
      } else if (response.status === 409) {
        const data = await response.json();
        setError(data.message);
      } else {
        setError('Failed to create employee. Please check all fields.');
      }
    } catch (error) {
      console.error('Error creating employee:', error);
      setError('Connection error. Please ensure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  if (showSuccess) {
    return (
      <div className="p-6 flex flex-col items-center justify-center min-h-[600px] bg-white rounded-2xl shadow-xl border border-blue-50">
        <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-6 animate-bounce">
          <CheckCircle className="w-12 h-12 text-emerald-600" />
        </div>
        <h2 className="text-2xl font-black text-gray-800 uppercase tracking-widest mb-2">Registration Successful!</h2>
        <p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest mb-8">Please share these temporary credentials with the employee</p>
        
        <div className="w-full max-w-md space-y-4 mb-8">
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
            <p className="text-[9px] font-black text-blue-600 uppercase tracking-widest mb-1">Official Email ID</p>
            <p className="text-lg font-black text-gray-700">{formData.officialEmail}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 relative group">
            <p className="text-[9px] font-black text-emerald-600 uppercase tracking-widest mb-1">Temporary Password</p>
            <p className="text-lg font-black text-gray-700 tracking-wider">{formData.password}</p>
            <button 
              onClick={() => {
                navigator.clipboard.writeText(`Email: ${formData.officialEmail}\nPassword: ${formData.password}`);
                alert('Copied to clipboard!');
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-all text-blue-600"
            >
              <Copy className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex gap-4">
          <button 
            onClick={() => {
              setShowSuccess(false);
              setFormData({
                fullName: '',
                officialEmail: '',
                dateOfJoining: '',
                coreQualification: '',
                annualSalary: '',
                remarks: '',
                password: '',
                confirmPassword: ''
              });
            }}
            className="px-6 py-3 bg-gray-100 text-gray-600 font-black uppercase text-[10px] tracking-widest rounded-xl hover:bg-gray-200 transition-all"
          >
            Create Another
          </button>
          <button 
            onClick={() => onNavigate?.('/hr/employees')}
            className="px-6 py-3 bg-blue-600 text-white font-black uppercase text-[10px] tracking-widest rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
          >
            Manage Employees
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 bg-[#f8f9fc] min-h-screen font-sans">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <h1 className="text-gray-700 font-black text-xl uppercase tracking-widest">Add New Employee</h1>
        <div className="flex gap-2">
          <button 
            onClick={() => onNavigate?.('/hr/employees')}
            className="flex items-center gap-2 px-4 py-2 bg-[#6b58d3] text-white text-[10px] font-black rounded shadow-sm uppercase tracking-widest hover:bg-purple-700 transition-all"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Employees
          </button>
          <button 
            onClick={() => onNavigate?.('/hr/dashboard')}
            className="flex items-center gap-2 px-4 py-2 bg-[#00cfd5] text-white text-[10px] font-black rounded shadow-sm uppercase tracking-widest hover:bg-cyan-600 transition-all"
          >
            <Layout className="w-4 h-4" /> HR Dashboard
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto space-y-6">
        {/* Main Form Card */}
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {error && (
            <div className="mx-8 mt-8 p-4 bg-rose-50 border border-rose-100 rounded-xl flex items-center gap-3 text-rose-600">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <p className="text-[11px] font-black uppercase tracking-widest">{error}</p>
            </div>
          )}
          <div className="bg-gray-50/50 px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-[12px] font-black text-[#0061f2] uppercase tracking-widest flex items-center gap-2">
              <UserPlus className="w-4 h-4" /> Employee Information
            </h2>
          </div>

          <div className="p-8">
            {/* HR Information Alert Box */}
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-5 mb-8">
              <div className="flex items-start gap-4 text-blue-800">
                <div className="bg-blue-600 p-1.5 rounded-full shadow-sm mt-0.5">
                  <User className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="text-[12px] font-black uppercase tracking-widest mb-1">HR Information (Required)</h3>
                  <p className="text-[11px] font-medium opacity-80">This section contains information that HR must fill while creating the employee record.</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
              {/* Full Name */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] flex items-center gap-2">
                  <User className="w-3.5 h-3.5 text-gray-300" /> Full Name <span className="text-rose-500">*</span>
                </label>
                <input 
                  type="text" 
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Enter employee's full name"
                  required
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-lg text-[13px] font-bold text-gray-700 focus:outline-none focus:border-blue-400 focus:bg-white transition-all shadow-inner-sm" 
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-gray-300" /> Official Email ID <span className="text-rose-500">*</span>
                </label>
                <input 
                  type="email" 
                  name="officialEmail"
                  value={formData.officialEmail}
                  onChange={handleInputChange}
                  placeholder="employee@company.com"
                  required
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-lg text-[13px] font-bold text-gray-700 focus:outline-none focus:border-blue-400 focus:bg-white transition-all shadow-inner-sm" 
                />
                <p className="text-[9px] text-gray-300 font-bold uppercase tracking-tight italic">This will be used for login and official communications</p>
              </div>

              {/* Date of Joining */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-gray-300" /> Date of Joining <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <input 
                    type="date" 
                    name="dateOfJoining"
                    value={formData.dateOfJoining}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-lg text-[13px] font-bold text-gray-700 focus:outline-none focus:border-blue-400 focus:bg-white transition-all shadow-inner-sm" 
                  />
                </div>
              </div>

              {/* Core Qualification */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] flex items-center gap-2">
                  <GraduationCap className="w-3.5 h-3.5 text-gray-300" /> Core Qualification <span className="text-rose-500">*</span>
                </label>
                <select 
                  name="coreQualification"
                  value={formData.coreQualification}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-lg text-[13px] font-bold text-gray-700 focus:outline-none focus:border-blue-400 focus:bg-white transition-all shadow-inner-sm appearance-none cursor-pointer"
                >
                  <option value="">-- Select Core Qualification --</option>
                  {qualifications.map(q => <option key={q} value={q}>{q}</option>)}
                </select>
                <p className="text-[9px] text-gray-300 font-bold uppercase tracking-tight italic">Select the employee's highest educational qualification</p>
              </div>

              {/* Salary */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] flex items-center gap-2">
                  <DollarSign className="w-3.5 h-3.5 text-gray-300" /> Rs Salary (Annual)
                </label>
                <input 
                  type="number" 
                  name="annualSalary"
                  value={formData.annualSalary}
                  onChange={handleInputChange}
                  placeholder="Enter annual salary"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-lg text-[13px] font-bold text-gray-700 focus:outline-none focus:border-blue-400 focus:bg-white transition-all shadow-inner-sm" 
                />
              </div>

              {/* Remarks */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] flex items-center gap-2">
                  <FileText className="w-3.5 h-3.5 text-gray-300" /> Remarks
                </label>
                <textarea 
                  name="remarks"
                  value={formData.remarks}
                  onChange={handleInputChange}
                  placeholder="Enter any additional notes or remarks"
                  rows={1}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-lg text-[13px] font-bold text-gray-700 focus:outline-none focus:border-blue-400 focus:bg-white transition-all shadow-inner-sm resize-none" 
                />
                <p className="text-[9px] text-gray-300 font-bold uppercase tracking-tight italic text-right">Optional: Add any additional notes or remarks</p>
              </div>

              {/* Temp Password */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] flex items-center gap-2">
                  <Lock className="w-3.5 h-3.5 text-gray-300" /> Temporary Login Password <span className="text-rose-500">*</span>
                </label>
                <div className="flex gap-2">
                  <input 
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter password"
                    required
                    className="flex-1 px-4 py-3 bg-gray-50 border border-gray-100 rounded-lg text-[13px] font-bold text-gray-700 focus:outline-none focus:border-blue-400 focus:bg-white transition-all shadow-inner-sm" 
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="bg-white border border-gray-100 p-3 rounded-lg text-gray-400 hover:text-gray-600 transition-colors shadow-sm"
                    title={showPassword ? "Hide Password" : "Show Password"}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                  <button 
                    type="button"
                    onClick={generatePassword}
                    className="bg-white border border-gray-100 p-3 rounded-lg text-blue-500 hover:bg-blue-50 transition-colors shadow-sm"
                    title="Generate Random Password"
                  >
                    <RefreshCw className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex items-center gap-1.5 text-amber-500">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span className="text-[9px] font-black uppercase tracking-tight">Employee must change this password on first login</span>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-gray-300" /> Confirm Password <span className="text-rose-500">*</span>
                </label>
                <div className="relative group">
                  <input 
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Confirm the password"
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-lg text-[13px] font-bold text-gray-700 focus:outline-none focus:border-blue-400 focus:bg-white transition-all shadow-inner-sm" 
                  />
                  <button 
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Teal Info Box - To be completed by employee */}
            <div className="mt-12 bg-teal-50 border border-teal-100 rounded-xl p-8 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-5">
                  <Info className="w-32 h-32 text-teal-600" />
               </div>
               <div className="flex items-start gap-4 text-teal-800 relative z-10">
                  <div className="bg-teal-600 p-2 rounded-lg shadow-md mt-0.5">
                    <UserCircle className="w-5 h-5 text-white" />
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-[13px] font-black uppercase tracking-widest mb-1">Employee Information (To be completed by Employee)</h3>
                      <p className="text-[11px] font-bold opacity-70">The following information will be filled by the employee after they login for the first time:</p>
                    </div>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
                      {[
                        { label: 'Personal Details', desc: 'Date of Birth, Gender, Marital Status, Blood Group, etc.' },
                        { label: 'Contact Information', desc: 'Phone numbers, Addresses' },
                        { label: 'Government Documents', desc: 'Aadhar, PAN, UAN, ESIC' },
                        { label: 'Bank Information', desc: 'Bank account details' },
                        { label: 'Emergency Contacts', desc: 'Emergency contact person details' },
                        { label: 'Family Information', desc: 'Father name, Nominee details' },
                      ].map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-[10px]">
                          <div className="w-1.5 h-1.5 rounded-full bg-teal-400 mt-1.5 shrink-0" />
                          <p className="font-medium tracking-tight">
                            <span className="font-black uppercase text-teal-700">{item.label}:</span> <span className="opacity-80">{item.desc}</span>
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
               </div>
            </div>

            {/* Workflow Box */}
            <div className="mt-8 bg-emerald-50/50 border border-emerald-100/50 rounded-xl p-8">
               <div className="flex items-start gap-4">
                  <div className="bg-emerald-600 p-2 rounded-lg shadow-md mt-0.5">
                    <Settings className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 space-y-6">
                    <h3 className="text-[13px] font-black text-emerald-800 uppercase tracking-widest">Employee Creation Workflow</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                      {/* HR Side */}
                      <div className="space-y-3">
                        <h4 className="text-[11px] font-black text-blue-700 uppercase tracking-widest flex items-center gap-2">
                           <User className="w-4 h-4" /> HR Responsibilities:
                        </h4>
                        <ul className="space-y-2">
                          {['Fill basic employee information', 'Create temporary login credentials', 'Submit for IT approval'].map((text, i) => (
                            <li key={i} className="flex items-center gap-2 text-[10px] font-medium text-blue-900/60 tracking-tight">
                              <div className="w-1 h-1 rounded-full bg-blue-300" /> {text}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* IT Side */}
                      <div className="space-y-3">
                        <h4 className="text-[11px] font-black text-purple-700 uppercase tracking-widest flex items-center gap-2">
                           <Layout className="w-4 h-4" /> IT Responsibilities:
                        </h4>
                        <ul className="space-y-2">
                          {['Review employee information', 'Approve or reject the request', 'Activate user account', 'Send login credentials to employee'].map((text, i) => (
                            <li key={i} className="flex items-center gap-2 text-[10px] font-medium text-purple-900/60 tracking-tight">
                              <div className="w-1 h-1 rounded-full bg-purple-300" /> {text}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-emerald-200/50 space-y-3">
                      <h4 className="text-[11px] font-black text-emerald-700 uppercase tracking-widest flex items-center gap-2">
                         <UserCheck className="w-4 h-4" /> Employee Responsibilities (After Approval):
                      </h4>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2">
                        {[
                          'Login with provided credentials',
                          'Change temporary password',
                          'Complete personal profile details',
                          'Upload required documents',
                          'Fill bank and emergency contact information'
                        ].map((text, i) => (
                          <li key={i} className="flex items-center gap-2 text-[10px] font-medium text-emerald-900/60 tracking-tight">
                            <div className="w-1 h-1 rounded-full bg-emerald-300" /> {text}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
               </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-12 flex justify-end gap-3 pt-8 border-t border-gray-100">
               <button 
                type="button"
                onClick={() => onNavigate?.('/hr/employees')}
                className="flex items-center gap-2 px-8 py-3 bg-[#6b58d3] text-white text-[11px] font-black rounded-lg shadow-lg shadow-purple-100 uppercase tracking-widest hover:bg-purple-700 transition-all"
               >
                  <X className="w-4 h-4" /> Cancel
               </button>
               <button 
                type="submit"
                disabled={loading}
                className={`flex items-center gap-2 px-10 py-3 bg-[#0061f2] text-white text-[11px] font-black rounded-lg shadow-lg shadow-blue-100 uppercase tracking-widest hover:bg-blue-700 transition-all ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
               >
                  {loading ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <CheckCircle className="w-4 h-4" />
                  )}
                  {loading ? 'Creating...' : 'Create Employee & User Account'}
               </button>
            </div>
          </div>
        </form>
      </div>

      {/* Footer */}
      <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center text-[10px] text-gray-400 font-bold tracking-[0.2em] uppercase px-4">
        <p>Copyright &copy; Digital New Enterprises 2024</p>
        <div className="flex gap-4">
          <a href="#" className="hover:underline transition-colors hover:text-gray-600">Privacy Policy</a>
          <span>•</span>
          <a href="#" className="hover:underline transition-colors hover:text-gray-600">Terms & Conditions</a>
        </div>
      </div>
    </div>
  );
}

// Simple internal helper for icon used in Teal box
function UserCircle({ className }: { className: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <circle cx="12" cy="12" r="10"/><circle cx="12" cy="10" r="3"/><path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662"/>
    </svg>
  );
}

function UserCheck({ className }: { className: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><polyline points="16 11 18 13 22 9"/></svg>
  );
}


