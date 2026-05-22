import React, { useState, useEffect } from 'react';
import { 
  User, Mail, Calendar, Building2, MapPin, 
  Smartphone, CreditCard, Landmark, Users as UsersIcon, 
  Save, ArrowLeft, Upload, FileText
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

interface UpdateProfileProps {
  onNavigate?: (path: string) => void;
}

export function UpdateProfile({ onNavigate }: UpdateProfileProps) {
  const user = JSON.parse(localStorage.getItem('user') || '{"fullName": "SANJAY KUMAR MAHATO", "email": "sanay.mahto@gmail.com", "employeeId": "DEE251225103"}');

  const [formData, setFormData] = useState<ProfileData>({
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

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string>('');

  useEffect(() => {
    // Load existing profile details from localStorage
    const savedProfile = localStorage.getItem(`profile_data_${user.email}`);
    if (savedProfile) {
      setFormData(JSON.parse(savedProfile));
    }
  }, [user.email]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    const updatedProfile = {
      ...formData,
      avatarUrl: filePreview || formData.avatarUrl
    };

    localStorage.setItem(`profile_data_${user.email}`, JSON.stringify(updatedProfile));
    
    // Trigger success notification
    alert('Profile update request submitted successfully for approval!');
    if (onNavigate) {
      onNavigate('/portal');
    }
  };

  return (
    <div className="p-6 bg-[#f8f9fc] min-h-screen font-sans">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div className="space-y-1">
          <h1 className="text-gray-700 font-black text-xl uppercase tracking-widest flex items-center gap-2">
            My Profile
          </h1>
          <p className="text-[11px] text-gray-400 font-bold uppercase tracking-tight">Edit and update your profile details</p>
        </div>
        <button 
          onClick={() => onNavigate && onNavigate('/portal')}
          className="flex items-center gap-2 px-6 py-2.5 bg-[#6b58d3] text-white text-[10px] font-black rounded-lg shadow-md uppercase tracking-widest hover:bg-purple-700 transition-all active:scale-95"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </button>
      </div>

      <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Overview Panel */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden text-center p-8">
            <div className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-6 text-left border-b border-gray-50 pb-3">
              Overview
            </div>

            {/* Avatar Circle */}
            <div className="relative w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden bg-gray-100 border border-gray-200 flex items-center justify-center">
              {filePreview || formData.avatarUrl ? (
                <img 
                  src={filePreview || formData.avatarUrl} 
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
          </div>
        </div>

        {/* Right Column - Edit form details */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSave} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-8 py-5 border-b border-gray-50 flex items-center justify-between">
              <h3 className="text-[13px] font-black text-blue-700 uppercase tracking-widest">
                Edit Personal & Professional Details
              </h3>
            </div>

            <div className="p-8 space-y-8">
              {/* Profile Photo Upload */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block">Profile Picture</label>
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100 border border-gray-200 flex items-center justify-center shrink-0">
                    {filePreview || formData.avatarUrl ? (
                      <img src={filePreview || formData.avatarUrl} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-8 h-8 text-gray-300" />
                    )}
                  </div>
                  <div className="space-y-1.5 flex-1 max-w-xl">
                    <div className="text-[10px] font-black text-gray-400 uppercase tracking-wider mb-1">Upload New Photo</div>
                    <div className="flex border border-gray-200 rounded overflow-hidden shadow-sm">
                      <label className="bg-[#f8f9fc] px-4 py-2.5 text-sm font-semibold text-gray-500 cursor-pointer border-r border-gray-200 hover:bg-gray-100 transition-colors">
                        Choose File
                        <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                      </label>
                      <div className="flex-1 px-4 py-2.5 text-sm text-gray-400 truncate bg-white italic">
                        {selectedFile ? selectedFile.name : 'No file chosen'}
                      </div>
                    </div>
                    <span className="text-[9px] text-gray-400 font-bold block">Allowed: JPG, JPEG, PNG. Max size: 2MB.</span>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-4 border-t border-gray-50 pt-6">
                <div className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-4">Contact Information</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Phone Number</label>
                    <input 
                      type="text" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Enter phone number"
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-[13px] font-bold text-gray-700 focus:outline-none focus:border-blue-400 transition-all" 
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Emergency Phone</label>
                    <input 
                      type="text" 
                      name="emergencyPhone"
                      value={formData.emergencyPhone}
                      onChange={handleInputChange}
                      placeholder="Enter emergency phone number"
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-[13px] font-bold text-gray-700 focus:outline-none focus:border-blue-400 transition-all" 
                    />
                  </div>
                  <div className="space-y-1 md:col-span-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Present Address</label>
                    <textarea 
                      rows={3} 
                      name="presentAddress"
                      value={formData.presentAddress}
                      onChange={handleInputChange}
                      placeholder="Enter present address details..."
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-[13px] font-bold text-gray-700 focus:outline-none focus:border-blue-400 transition-all resize-none" 
                    />
                  </div>
                  <div className="space-y-1 md:col-span-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Permanent Address</label>
                    <textarea 
                      rows={3} 
                      name="permanentAddress"
                      value={formData.permanentAddress}
                      onChange={handleInputChange}
                      placeholder="Enter permanent address details..."
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-[13px] font-bold text-gray-700 focus:outline-none focus:border-blue-400 transition-all resize-none" 
                    />
                  </div>
                </div>
              </div>

              {/* Identity & Government Documents */}
              <div className="space-y-4 border-t border-gray-50 pt-6">
                <div className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-4">Identity & Government Documents</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Aadhar Card Number</label>
                    <input 
                      type="text" 
                      name="aadharNumber"
                      value={formData.aadharNumber}
                      onChange={handleInputChange}
                      placeholder="Enter Aadhar card number"
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-[13px] font-bold text-gray-700 focus:outline-none focus:border-blue-400 transition-all" 
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">PAN Card Number</label>
                    <input 
                      type="text" 
                      name="panNumber"
                      value={formData.panNumber}
                      onChange={handleInputChange}
                      placeholder="Enter PAN card number"
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-[13px] font-bold text-gray-700 focus:outline-none focus:border-blue-400 transition-all" 
                    />
                  </div>
                </div>
              </div>

              {/* Bank Details */}
              <div className="space-y-4 border-t border-gray-50 pt-6">
                <div className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-4">Bank Details</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Bank Name</label>
                    <input 
                      type="text" 
                      name="bankName"
                      value={formData.bankName}
                      onChange={handleInputChange}
                      placeholder="Enter bank name"
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-[13px] font-bold text-gray-700 focus:outline-none focus:border-blue-400 transition-all" 
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Account Number</label>
                    <input 
                      type="text" 
                      name="accountNumber"
                      value={formData.accountNumber}
                      onChange={handleInputChange}
                      placeholder="Enter bank account number"
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-[13px] font-bold text-gray-700 focus:outline-none focus:border-blue-400 transition-all" 
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">IFSC Code</label>
                    <input 
                      type="text" 
                      name="ifscCode"
                      value={formData.ifscCode}
                      onChange={handleInputChange}
                      placeholder="Enter bank IFSC code"
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-[13px] font-bold text-gray-700 focus:outline-none focus:border-blue-400 transition-all" 
                    />
                  </div>
                </div>
              </div>

              {/* Family & Nominee Information */}
              <div className="space-y-4 border-t border-gray-50 pt-6">
                <div className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-4">Family & Nominee Information</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Father's Name</label>
                    <input 
                      type="text" 
                      name="fathersName"
                      value={formData.fathersName}
                      onChange={handleInputChange}
                      placeholder="Enter father's name"
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-[13px] font-bold text-gray-700 focus:outline-none focus:border-blue-400 transition-all" 
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Nominee Name</label>
                    <input 
                      type="text" 
                      name="nomineeName"
                      value={formData.nomineeName}
                      onChange={handleInputChange}
                      placeholder="Enter nominee name"
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-[13px] font-bold text-gray-700 focus:outline-none focus:border-blue-400 transition-all" 
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Nominee Relation</label>
                    <input 
                      type="text" 
                      name="nomineeRelation"
                      value={formData.nomineeRelation}
                      onChange={handleInputChange}
                      placeholder="Enter relationship with nominee"
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-[13px] font-bold text-gray-700 focus:outline-none focus:border-blue-400 transition-all" 
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Form Action */}
            <div className="bg-slate-50 px-8 py-5 flex justify-end border-t border-gray-100">
              <button 
                type="submit"
                className="flex items-center gap-2 px-8 py-3 bg-[#0061f2] text-white text-[10px] font-black rounded-lg shadow-md uppercase tracking-widest hover:bg-blue-700 transition-all active:scale-95"
              >
                <Save className="w-4 h-4" /> Request Profile Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
