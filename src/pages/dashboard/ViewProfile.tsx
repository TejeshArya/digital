import React, { useState, useEffect } from 'react';
import { 
  User, Mail, Calendar, Building2, MapPin, 
  Smartphone, CreditCard, Landmark, Users as UsersIcon, 
  ArrowLeft, CheckCircle, ShieldAlert, BadgeInfo
} from 'lucide-react';

interface ProfileData {
  phone: string;
  emergencyPhone: string;
  presentAddress: string;
  permanentAddress: string;
  aadharNumber: string;
  panNumber: string;
  bankName: string;
  accountNumber: string;
  ifscCode: string;
  fathersName: string;
  nomineeName: string;
  nomineeRelation: string;
  avatarUrl?: string;
}

interface ViewProfileProps {
  onNavigate?: (path: string) => void;
}

export function ViewProfile({ onNavigate }: ViewProfileProps) {
  const user = JSON.parse(localStorage.getItem('user') || '{"fullName": "SANJAY KUMAR MAHATO", "email": "sanay.mahto@gmail.com", "employeeId": "DEE251225103"}');

  const [profileData, setProfileData] = useState<ProfileData>({
    phone: '',
    emergencyPhone: '',
    presentAddress: '',
    permanentAddress: '',
    aadharNumber: '',
    panNumber: '',
    bankName: '',
    accountNumber: '',
    ifscCode: '',
    fathersName: '',
    nomineeName: '',
    nomineeRelation: '',
    avatarUrl: ''
  });

  useEffect(() => {
    const savedProfile = localStorage.getItem(`profile_data_${user.email}`);
    if (savedProfile) {
      setProfileData(JSON.parse(savedProfile));
    }
  }, [user.email]);

  return (
    <div className="p-6 bg-[#f8f9fc] min-h-screen font-sans">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div className="space-y-1">
          <h1 className="text-gray-700 font-black text-xl uppercase tracking-widest flex items-center gap-2">
            My Profile
          </h1>
          <p className="text-[11px] text-gray-400 font-bold uppercase tracking-tight">View personal and employment details</p>
        </div>
        <button 
          onClick={() => onNavigate && onNavigate('/portal')}
          className="flex items-center gap-2 px-6 py-2.5 bg-[#6b58d3] text-white text-[10px] font-black rounded-lg shadow-md uppercase tracking-widest hover:bg-purple-700 transition-all active:scale-95"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </button>
      </div>

      <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Overview Details */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden text-center p-8">
            <div className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-6 text-left border-b border-gray-50 pb-3">
              Overview
            </div>

            {/* Avatar Circle */}
            <div className="relative w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden bg-gray-100 border border-gray-200 flex items-center justify-center">
              {profileData.avatarUrl ? (
                <img 
                  src={profileData.avatarUrl} 
                  alt="Avatar" 
                  className="w-full h-full object-cover" 
                />
              ) : (
                <User className="w-16 h-16 text-gray-300" />
              )}
            </div>

            <h3 className="text-[15px] font-black text-gray-800 uppercase tracking-wide mb-1">
              {user.fullName || user.name || 'SANJAY KUMAR MAHATO'}
            </h3>
            
            <div className="inline-block bg-blue-50 text-blue-600 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider mb-6">
              {user.employeeId || 'DEE251225103'}
            </div>

            {/* Details List */}
            <div className="space-y-4 text-left border-t border-gray-50 pt-6">
              <div>
                <span className="text-[9px] font-black text-gray-400 uppercase tracking-wider block">EMAIL</span>
                <span className="text-[12px] font-bold text-gray-600 block">{user.email || 'sanay.mahto@gmail.com'}</span>
              </div>
              <div>
                <span className="text-[9px] font-black text-gray-400 uppercase tracking-wider block">JOINING DATE</span>
                <span className="text-[12px] font-bold text-gray-600 block">01 Jul, 2025</span>
              </div>
              <div>
                <span className="text-[9px] font-black text-gray-400 uppercase tracking-wider block">DEPARTMENT</span>
                <span className="text-[12px] font-bold text-gray-600 block">P & P</span>
              </div>
              <div>
                <span className="text-[9px] font-black text-gray-400 uppercase tracking-wider block">LOCATION</span>
                <span className="text-[12px] font-bold text-gray-600 block">JAMNAGAR</span>
              </div>
            </div>

            {/* Reporting Manager */}
            <div className="mt-6 pt-6 border-t border-gray-100 flex items-center justify-between text-left">
              <div>
                <span className="text-[9px] font-black text-gray-400 uppercase tracking-wider block">REPORTING MANAGER</span>
                <span className="text-[12px] font-bold text-gray-700 block flex items-center gap-1.5 uppercase">
                  <User className="w-3.5 h-3.5 text-blue-500" />
                  Company Admin
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Columns: Structured Profile Grid Cards */}
        <div className="lg:col-span-2 space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Professional Info Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden border-t-4 border-[#00ac69]">
              <div className="p-6 space-y-4">
                <div className="text-[11px] font-black text-[#00ac69] uppercase tracking-widest flex items-center gap-1.5 border-b border-gray-50 pb-3">
                  <Building2 className="w-4 h-4" /> Professional Info
                </div>
                
                <div className="space-y-4">
                  <div>
                    <span className="text-[9px] font-black text-gray-400 uppercase tracking-wider block">QUALIFICATION</span>
                    <span className="text-[12px] font-bold text-gray-700 block uppercase">N/A</span>
                  </div>
                  <div>
                    <span className="text-[9px] font-black text-gray-400 uppercase tracking-wider block">PORTAL ROLE</span>
                    <span className="text-[12px] font-bold text-gray-700 block uppercase">Employee</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Identification Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden border-t-4 border-[#f6c23e]">
              <div className="p-6 space-y-4">
                <div className="text-[11px] font-black text-[#f6c23e] uppercase tracking-widest flex items-center gap-1.5 border-b border-gray-50 pb-3">
                  <CreditCard className="w-4 h-4" /> Identification
                </div>
                
                <div className="space-y-4">
                  <div>
                    <span className="text-[9px] font-black text-gray-400 uppercase tracking-wider block">AADHAR NUMBER</span>
                    <span className="text-[12px] font-bold text-gray-700 block uppercase">
                      {profileData.aadharNumber || 'N/A'}
                    </span>
                  </div>
                  <div>
                    <span className="text-[9px] font-black text-gray-400 uppercase tracking-wider block">PAN CARD NUMBER</span>
                    <span className="text-[12px] font-bold text-gray-700 block uppercase">
                      {profileData.panNumber || 'N/A'}
                    </span>
                  </div>
                  <div>
                    <span className="text-[9px] font-black text-gray-400 uppercase tracking-wider block">UAN (UNIVERSAL ACCOUNT NUMBER)</span>
                    <span className="text-[12px] font-bold text-gray-700 block uppercase">N/A</span>
                  </div>
                  <div>
                    <span className="text-[9px] font-black text-gray-400 uppercase tracking-wider block">ESIC ID</span>
                    <span className="text-[12px] font-bold text-gray-700 block uppercase">N/A</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bank Details Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden border-t-4 border-[#323c4e] md:col-span-2">
              <div className="p-6 space-y-4">
                <div className="text-[11px] font-black text-gray-600 uppercase tracking-widest flex items-center gap-1.5 border-b border-gray-50 pb-3">
                  <Landmark className="w-4 h-4" /> Bank Details
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <span className="text-[9px] font-black text-gray-400 uppercase tracking-wider block">BANK NAME</span>
                    <span className="text-[12px] font-bold text-gray-700 block uppercase">
                      {profileData.bankName || 'N/A'}
                    </span>
                  </div>
                  <div>
                    <span className="text-[9px] font-black text-gray-400 uppercase tracking-wider block">ACCOUNT NUMBER</span>
                    <span className="text-[12px] font-bold text-gray-700 block uppercase">
                      {profileData.accountNumber || 'N/A'}
                    </span>
                  </div>
                  <div>
                    <span className="text-[9px] font-black text-gray-400 uppercase tracking-wider block">IFSC CODE</span>
                    <span className="text-[12px] font-bold text-gray-700 block uppercase">
                      {profileData.ifscCode || 'N/A'}
                    </span>
                  </div>
                  <div>
                    <span className="text-[9px] font-black text-gray-400 uppercase tracking-wider block">BRANCH</span>
                    <span className="text-[12px] font-bold text-gray-700 block uppercase">N/A</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Nominee & Emergency Contact Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden border-t-4 border-[#6b58d3] md:col-span-2">
              <div className="p-6 space-y-4">
                <div className="text-[11px] font-black text-[#6b58d3] uppercase tracking-widest flex items-center gap-1.5 border-b border-gray-50 pb-3">
                  <UsersIcon className="w-4 h-4" /> Nominee & Emergency Contact
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <span className="text-[9px] font-black text-gray-400 uppercase tracking-wider block">NOMINEE NAME</span>
                    <span className="text-[12px] font-bold text-gray-700 block uppercase">
                      {profileData.nomineeName || 'N/A'}
                    </span>
                  </div>
                  <div>
                    <span className="text-[9px] font-black text-gray-400 uppercase tracking-wider block">NOMINEE RELATION</span>
                    <span className="text-[12px] font-bold text-gray-700 block uppercase">
                      {profileData.nomineeRelation || 'N/A'}
                    </span>
                  </div>
                  <div>
                    <span className="text-[9px] font-black text-gray-400 uppercase tracking-wider block">NOMINEE AADHAR</span>
                    <span className="text-[12px] font-bold text-gray-700 block uppercase">N/A</span>
                  </div>
                  <div>
                    <span className="text-[9px] font-black text-gray-400 uppercase tracking-wider block">EMERGENCY CONTACT PERSON</span>
                    <span className="text-[12px] font-bold text-gray-700 block uppercase">N/A</span>
                  </div>
                  <div>
                    <span className="text-[9px] font-black text-gray-400 uppercase tracking-wider block">EMERGENCY PHONE</span>
                    <span className="text-[12px] font-bold text-gray-700 block uppercase">
                      {profileData.emergencyPhone || 'N/A'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Address Details Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden border-t-4 border-blue-500 md:col-span-2">
              <div className="p-6 space-y-4">
                <div className="text-[11px] font-black text-blue-500 uppercase tracking-widest flex items-center gap-1.5 border-b border-gray-50 pb-3">
                  <MapPin className="w-4 h-4" /> Address Details
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <span className="text-[9px] font-black text-gray-400 uppercase tracking-wider block">PRESENT ADDRESS (CURRENT)</span>
                    <p className="text-[12px] font-bold text-gray-700 uppercase leading-relaxed whitespace-pre-line mt-1">
                      {profileData.presentAddress || 'N/A'}
                    </p>
                  </div>
                  <div>
                    <span className="text-[9px] font-black text-gray-400 uppercase tracking-wider block">PERMANENT ADDRESS</span>
                    <p className="text-[12px] font-bold text-gray-700 uppercase leading-relaxed whitespace-pre-line mt-1">
                      {profileData.permanentAddress || 'N/A'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
          
        </div>

      </div>
    </div>
  );
}
