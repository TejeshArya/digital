import React, { useState, useEffect } from 'react';
import { 
  Plus, Search, Edit, Trash2, Eye, X, Building2, MapPin, 
  Phone, Mail, Calendar, Info, Globe, ShieldCheck, Briefcase 
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";

interface CompanyGst {
  gstNumber: string;
  gstStateCode: string;
  companyName: string;
  panNumber: string;
  tanNumber: string;
  mobileNumber: string;
  stateName: string;
  email: string;
  pinCode: string;
  companyAddress: string;
  remarks: string;
  companyEstablished?: string;
  city: string;
  gstType: string;
  dealsIn: string;
}

export function CompanyGST() {
  const [companyList, setCompanyList] = useState<CompanyGst[]>([]);
  const [loading, setLoading] = useState(true);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isAdditionalInfoModalOpen, setIsAdditionalInfoModalOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<CompanyGst | null>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<CompanyGst>({
    gstNumber: '',
    gstStateCode: '',
    companyName: '',
    panNumber: '',
    tanNumber: '',
    mobileNumber: '',
    stateName: '',
    email: '',
    pinCode: '',
    companyAddress: '',
    remarks: '',
    companyEstablished: '',
    city: '',
    gstType: 'GST',
    dealsIn: ''
  });

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5076/api/companygsts');
      const data = await response.json();
      setCompanyList(data);
    } catch (error) {
      console.error('Error fetching companies:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!formData.gstNumber || !formData.companyName) {
      alert('Please fill GST Number and Company Name');
      return;
    }

    try {
      const method = isEditing ? 'PUT' : 'POST';
      const url = isEditing 
        ? `http://localhost:5076/api/companygsts/${formData.gstNumber}`
        : 'http://localhost:5076/api/companygsts';

      const response = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert(isEditing ? 'Company updated successfully!' : 'Company saved successfully!');
        fetchCompanies();
        setFormData({
          gstNumber: '', gstStateCode: '', companyName: '', panNumber: '',
          tanNumber: '', mobileNumber: '', stateName: '', email: '',
          pinCode: '', companyAddress: '', remarks: '', companyEstablished: '',
          city: '', gstType: 'GST', dealsIn: ''
        });
        setIsEditing(false);
      } else {
        const error = await response.json();
        alert('Error saving: ' + (error.message || 'Check if GST Number already exists'));
      }
    } catch (error) {
      console.error('Error saving:', error);
      alert('Connection failed');
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      try {
        const response = await fetch(`http://localhost:5076/api/companygsts/${id}`, {
          method: 'DELETE'
        });
        if (response.ok) {
          setCompanyList(prev => prev.filter(c => c.gstNumber !== id));
        } else {
          alert('Failed to delete');
        }
      } catch (error) {
        console.error('Error deleting:', error);
      }
    }
  };

  const handleView = (company: CompanyGst) => {
    setSelectedCompany(company);
    setIsViewModalOpen(true);
  };

  const handleEdit = (company: CompanyGst) => {
    setIsEditing(true);
    // Format date for the input field (YYYY-MM-DD)
    const formattedDate = company.companyEstablished 
      ? new Date(company.companyEstablished).toISOString().split('T')[0] 
      : '';
    
    setFormData({
      ...company,
      companyEstablished: formattedDate
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenAdditionalInfo = () => {
    setIsAdditionalInfoModalOpen(true);
  };

  return (
    <div className="p-4 bg-[#f8f9fc] min-h-screen font-sans">
      {/* Form Section */}
      <div className="bg-white rounded-lg shadow-sm mb-6 overflow-hidden border border-gray-100">
        <div className="bg-[#0061f2] p-4 flex justify-between items-center">
          <h2 className="text-white font-bold text-sm">Add New Company GST</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase">GST State Code</label>
              <select 
                name="gstStateCode"
                value={formData.gstStateCode}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-500 text-gray-600"
              >
                <option value="">Select GST code</option>
                <option value="27">27 - Maharashtra</option>
                <option value="33">33 - Tamil Nadu</option>
                <option value="37">37 - Andhra Pradesh</option>
                <option value="20">20 - Jharkhand</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase">GST Number <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="gstNumber"
                value={formData.gstNumber}
                onChange={handleInputChange}
                readOnly={isEditing}
                placeholder="GST number"
                className={`w-full px-3 py-2 border rounded text-sm focus:outline-none focus:border-blue-500 placeholder-gray-400 ${isEditing ? 'bg-gray-100 cursor-not-allowed text-gray-500' : 'bg-white border-gray-200'}`}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase">Company Name <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                placeholder="Company name"
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-500 placeholder-gray-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase">PAN Number</label>
              <input
                type="text"
                name="panNumber"
                value={formData.panNumber}
                onChange={handleInputChange}
                placeholder="PAN number"
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-500 placeholder-gray-400"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase">TAN Number</label>
              <input
                type="text"
                name="tanNumber"
                value={formData.tanNumber}
                onChange={handleInputChange}
                placeholder="TAN number"
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-500 placeholder-gray-400"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase">Mobile Number</label>
              <input
                type="text"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleInputChange}
                placeholder="Mobile number"
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-500 placeholder-gray-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase">State Name</label>
              <input
                type="text"
                name="stateName"
                value={formData.stateName}
                onChange={handleInputChange}
                placeholder="State name"
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-500 placeholder-gray-400"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email"
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-500 placeholder-gray-400"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase">Pin Code</label>
              <input
                type="text"
                name="pinCode"
                value={formData.pinCode}
                onChange={handleInputChange}
                placeholder="Pin code"
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-500 placeholder-gray-400"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase">Company Address</label>
              <textarea
                name="companyAddress"
                value={formData.companyAddress}
                onChange={handleInputChange}
                placeholder="Company address"
                rows={2}
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-500 placeholder-gray-400"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase">Remarks</label>
              <textarea
                name="remarks"
                value={formData.remarks}
                onChange={handleInputChange}
                placeholder="Remarks"
                rows={2}
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-500 placeholder-gray-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase">Company Established</label>
              <input
                type="date"
                name="companyEstablished"
                value={formData.companyEstablished}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-500 text-gray-600"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase">City</label>
              <select 
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-[#f4f4f4] border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-500 text-gray-600"
              >
                <option value="">Select City</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Chennai">Chennai</option>
                <option value="Vizag">Vizag</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase">GST Type</label>
              <input
                type="text"
                name="gstType"
                value={formData.gstType}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-500 text-gray-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase">Deals in</label>
              <input
                type="text"
                name="dealsIn"
                value={formData.dealsIn}
                onChange={handleInputChange}
                placeholder="Deals in"
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-500 placeholder-gray-400"
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-2">
            {isEditing && (
              <button 
                onClick={() => {
                  setIsEditing(false);
                  setFormData({
                    gstNumber: '', gstStateCode: '', companyName: '', panNumber: '',
                    tanNumber: '', mobileNumber: '', stateName: '', email: '',
                    pinCode: '', companyAddress: '', remarks: '', companyEstablished: '',
                    city: '', gstType: 'GST', dealsIn: ''
                  });
                }}
                className="px-6 py-2.5 bg-gray-100 text-gray-600 text-xs font-bold rounded uppercase hover:bg-gray-200 transition-colors border border-gray-200"
              >
                Cancel
              </button>
            )}
            <button 
              onClick={handleOpenAdditionalInfo}
              className="px-6 py-2.5 bg-blue-50 text-[#0061f2] text-xs font-bold rounded uppercase hover:bg-blue-100 transition-colors border border-blue-100"
            >
              Open Additional Info
            </button>
            <button 
              onClick={handleSave}
              className={`px-8 py-2.5 text-white text-xs font-bold rounded shadow-lg transition-all uppercase tracking-widest ${isEditing ? 'bg-orange-500 hover:bg-orange-600 shadow-orange-100' : 'bg-[#0061f2] hover:bg-blue-700 shadow-blue-100'}`}
            >
              {isEditing ? 'Update' : 'Save'}
            </button>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
            <span>Show</span>
            <select className="border border-gray-200 rounded px-2 py-1 focus:outline-none bg-gray-50">
              <option>10</option>
              <option>25</option>
              <option>50</option>
            </select>
            <span>entries</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
            <Search className="w-4 h-4" />
            <input
              type="text"
              placeholder="Search companies..."
              className="border border-gray-200 rounded px-3 py-1.5 focus:outline-none focus:border-blue-500 bg-gray-50 min-w-[250px]"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-[#323c4e] text-white uppercase tracking-tighter">
                  <th className="px-4 py-4 text-left font-bold border-r border-slate-600">GST No</th>
                  <th className="px-4 py-4 text-left font-bold border-r border-slate-600">Company Name</th>
                  <th className="px-4 py-4 text-left font-bold border-r border-slate-600">State</th>
                  <th className="px-4 py-4 text-left font-bold border-r border-slate-600">Mobile</th>
                  <th className="px-4 py-4 text-left font-bold border-r border-slate-600">Email</th>
                  <th className="px-4 py-4 text-center font-bold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {companyList.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-10 text-center text-gray-400 font-bold uppercase tracking-widest">No companies found</td>
                  </tr>
                ) : (
                  companyList.map((company, index) => (
                    <tr key={index} className="hover:bg-gray-50/80 transition-colors group">
                      <td className="px-4 py-4 text-blue-600 font-bold border-r border-gray-50 uppercase">{company.gstNumber}</td>
                      <td className="px-4 py-4 text-gray-700 font-bold border-r border-gray-50 uppercase">{company.companyName}</td>
                      <td className="px-4 py-4 text-gray-500 border-r border-gray-50 uppercase">{company.stateName}</td>
                      <td className="px-4 py-4 text-gray-500 border-r border-gray-50">{company.mobileNumber}</td>
                      <td className="px-4 py-4 text-gray-500 border-r border-gray-50">{company.email}</td>
                      <td className="px-4 py-4">
                        <div className="flex items-center justify-center gap-1.5">
                          <button 
                            onClick={() => handleView(company)}
                            className="p-1.5 bg-cyan-500 text-white rounded hover:bg-cyan-600 transition-colors shadow-sm" 
                            title="View"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button 
                            onClick={() => handleEdit(company)}
                            className="p-1.5 bg-orange-400 text-white rounded hover:bg-orange-500 transition-colors shadow-sm" 
                            title="Edit"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button 
                            onClick={() => handleDelete(company.gstNumber)}
                            className="p-1.5 bg-red-600 text-white rounded hover:bg-red-700 transition-colors shadow-sm" 
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* View Company Modal */}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="max-w-3xl p-0 overflow-hidden bg-white border-none shadow-2xl rounded-none">
          <div className="bg-[#00cfd5] p-4 text-white flex justify-between items-center">
            <h2 className="text-sm font-bold tracking-wide uppercase">Company Details: {selectedCompany?.companyName}</h2>
            <button onClick={() => setIsViewModalOpen(false)} className="hover:opacity-70 transition-opacity">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-2 gap-x-12 gap-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-[#0061f2] mb-4">
                  <Building2 className="w-4 h-4" />
                  <span className="text-[13px] font-bold uppercase">Basic Information</span>
                </div>
                <div className="space-y-3 text-[12px]">
                  <div className="grid grid-cols-[120px_1fr] gap-2">
                    <span className="text-gray-500 font-semibold uppercase">GST Number:</span>
                    <span className="text-gray-700 font-bold">{selectedCompany?.gstNumber}</span>
                  </div>
                  <div className="grid grid-cols-[120px_1fr] gap-2">
                    <span className="text-gray-500 font-semibold uppercase">PAN Number:</span>
                    <span className="text-gray-700">{selectedCompany?.panNumber || 'N/A'}</span>
                  </div>
                  <div className="grid grid-cols-[120px_1fr] gap-2">
                    <span className="text-gray-500 font-semibold uppercase">TAN Number:</span>
                    <span className="text-gray-700">{selectedCompany?.tanNumber || 'N/A'}</span>
                  </div>
                  <div className="grid grid-cols-[120px_1fr] gap-2">
                    <span className="text-gray-500 font-semibold uppercase">GST Type:</span>
                    <span className="text-gray-700 font-bold text-blue-600">{selectedCompany?.gstType}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2 text-[#0061f2] mb-4">
                  <Phone className="w-4 h-4" />
                  <span className="text-[13px] font-bold uppercase">Contact Information</span>
                </div>
                <div className="space-y-3 text-[12px]">
                  <div className="grid grid-cols-[120px_1fr] gap-2">
                    <span className="text-gray-500 font-semibold uppercase">Mobile:</span>
                    <span className="text-gray-700 font-bold">{selectedCompany?.mobileNumber}</span>
                  </div>
                  <div className="grid grid-cols-[120px_1fr] gap-2">
                    <span className="text-gray-500 font-semibold uppercase">Email:</span>
                    <span className="text-gray-700 lowercase">{selectedCompany?.email}</span>
                  </div>
                  <div className="grid grid-cols-[120px_1fr] gap-2">
                    <span className="text-gray-500 font-semibold uppercase">City:</span>
                    <span className="text-gray-700 uppercase">{selectedCompany?.city}</span>
                  </div>
                  <div className="grid grid-cols-[120px_1fr] gap-2">
                    <span className="text-gray-500 font-semibold uppercase">State:</span>
                    <span className="text-gray-700 uppercase">{selectedCompany?.stateName}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 space-y-3">
              <div className="flex items-center gap-2 text-[#0061f2]">
                <MapPin className="w-4 h-4" />
                <span className="text-[13px] font-bold uppercase">Address & Remarks</span>
              </div>
              <div className="bg-[#f2f8ff] p-4 rounded text-[12px] text-gray-600 leading-relaxed uppercase">
                <p className="font-bold text-gray-400 mb-1">COMPANY ADDRESS:</p>
                {selectedCompany?.companyAddress || 'No address provided'}
              </div>
              <div className="bg-[#f2f8ff] p-4 rounded text-[12px] text-gray-600 italic">
                 <p className="font-bold text-gray-400 mb-1 uppercase not-italic">REMARKS:</p>
                {selectedCompany?.remarks || 'No remarks available'}
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <button 
                onClick={() => setIsViewModalOpen(false)}
                className="px-6 py-2 bg-[#6f42c1] text-white text-[12px] font-bold rounded hover:bg-[#5a32a3] transition-colors shadow-sm uppercase tracking-wider"
              >
                Close
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Additional Info Modal */}
      <Dialog open={isAdditionalInfoModalOpen} onOpenChange={setIsAdditionalInfoModalOpen}>
        <DialogContent className="max-w-2xl p-0 overflow-hidden bg-white border-none shadow-2xl">
          <div className="bg-[#323c4e] p-5 text-white flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/20 rounded">
                <Info className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <h2 className="text-lg font-bold tracking-tight uppercase">Additional Information</h2>
                <p className="text-[10px] opacity-60 uppercase tracking-widest font-bold">Configure extended parameters</p>
              </div>
            </div>
            <button onClick={() => setIsAdditionalInfoModalOpen(false)} className="p-1 hover:bg-white/10 rounded-full transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-8 space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-wider">Business Type</label>
                <div className="grid grid-cols-2 gap-2">
                  <button className="py-2 border-2 border-emerald-500 text-emerald-600 text-[10px] font-black rounded uppercase bg-emerald-50">Manufacturer</button>
                  <button className="py-2 border border-gray-200 text-gray-400 text-[10px] font-bold rounded uppercase">Trader</button>
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-wider">Taxation Category</label>
                <select className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-400 transition-colors appearance-none">
                  <option>Standard (18%)</option>
                  <option>Exempt</option>
                  <option>Zero Rated</option>
                  <option>Luxury (28%)</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-wider">Internal Notes / Documentation</label>
              <textarea 
                rows={4}
                placeholder="Enter internal notes for this company..."
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400 transition-colors resize-none"
              ></textarea>
            </div>

            <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg flex gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-500 shrink-0" />
              <p className="text-xs text-blue-600 leading-relaxed">
                <span className="font-bold">Compliance Note:</span> Ensure all GST documentation is verified before proceeding with transactions.
              </p>
            </div>
          </div>

          <div className="p-6 border-t border-gray-100 flex justify-end gap-3 bg-gray-50/50">
            <button 
              onClick={() => setIsAdditionalInfoModalOpen(false)}
              className="px-6 py-2 text-gray-400 text-[11px] font-bold rounded uppercase hover:text-gray-600 transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={() => setIsAdditionalInfoModalOpen(false)}
              className="px-8 py-2.5 bg-[#1cc88a] text-white text-[11px] font-bold rounded shadow-sm hover:bg-[#17a673] transition-all uppercase tracking-widest flex items-center gap-2"
            >
              Save Information
            </button>
          </div>
        </DialogContent>
      </Dialog>

      <div className="mt-12 flex justify-between items-center text-[10px] text-gray-400 px-2 uppercase font-bold tracking-[0.2em]">
        <p>Copyright &copy; Digital New Enterprises 2024</p>
        <div className="flex gap-4">
          <a href="#" className="hover:underline">Privacy Policy</a>
          <span>•</span>
          <a href="#" className="hover:underline">Terms & Conditions</a>
        </div>
      </div>
    </div>
  );
}

