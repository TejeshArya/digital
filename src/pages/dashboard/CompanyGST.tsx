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
  secondaryMobileNo: string;
  color: string;
  logoPath: string;
  headerPath: string;
  footerPath: string;
}

export function CompanyGST() {
  const [companyList, setCompanyList] = useState<CompanyGst[]>([]);
  const [loading, setLoading] = useState(true);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isAdditionalInfoModalOpen, setIsAdditionalInfoModalOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<CompanyGst | null>(null);
  const [statesList, setStatesList] = useState<any[]>([]);
  const [citiesList, setCitiesList] = useState<any[]>([]);
  const [gstTypeList, setGstTypeList] = useState<any[]>([]);

  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [headerFile, setHeaderFile] = useState<File | null>(null);
  const [footerFile, setFooterFile] = useState<File | null>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
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
    dealsIn: '',
    secondaryMobileNo: '',
    color: '',
    logoPath: '',
    headerPath: '',
    footerPath: ''
  });

  useEffect(() => {
    fetchCompanies();
    fetchMasterData();
  }, []);

  const fetchMasterData = async () => {
    try {
      const [statesRes, citiesRes, gstTypeRes] = await Promise.all([
        fetch('http://localhost:5076/api/MasterData/category/State'),
        fetch('http://localhost:5076/api/MasterData/category/City'),
        fetch('http://localhost:5076/api/MasterData/category/GST Type')
      ]);
      setStatesList(await statesRes.json());
      setCitiesList(await citiesRes.json());
      setGstTypeList(await gstTypeRes.json());
    } catch (e) { 
      console.error('Error fetching master data:', e); 
    }
  };

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
    let { name, value } = e.target;
    
    // Automatically force uppercase on alphanumeric codes and strip spaces & special characters
    if (name === 'gstNumber' || name === 'panNumber' || name === 'tanNumber') {
      value = value.toUpperCase().replace(/[^A-Z0-9]/g, '');
    }

    // Only allow numeric digits for phone and PIN fields
    if (name === 'mobileNumber' || name === 'secondaryMobileNo' || name === 'pinCode') {
      value = value.replace(/[^0-9]/g, '');
    }

    // Enforce absolute maximum lengths
    const maxLengths: Record<string, number> = {
      gstNumber: 15,
      panNumber: 10,
      tanNumber: 10,
      mobileNumber: 10,
      secondaryMobileNo: 10,
      pinCode: 6
    };

    if (maxLengths[name]) {
      value = value.substring(0, maxLengths[name]);
    }

    setFormData(prev => {
      const newData = { ...prev, [name]: value };
      
      if (name === 'gstStateCode') {
        newData.city = '';
        const selectedState = statesList.find(s => s.gstStateCode === value);
        if (selectedState) {
          newData.stateName = selectedState.value;
        } else {
          newData.stateName = '';
        }
      }
      return newData;
    });

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // GSTIN validation rules:
    const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/;
    if (!formData.gstNumber) {
      newErrors.gstNumber = 'GST Number is required';
    } else if (!gstRegex.test(formData.gstNumber)) {
      newErrors.gstNumber = 'Invalid GSTIN format (e.g. 22AAAAA1111A1Z1)';
    }

    // Company Name validation: at least 3 characters
    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Company Name is required';
    } else if (formData.companyName.trim().length < 3) {
      newErrors.companyName = 'Must be at least 3 characters';
    }

    // PAN validation: exactly 10 characters (5 letters, 4 digits, 1 letter)
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
    if (formData.panNumber && !panRegex.test(formData.panNumber)) {
      newErrors.panNumber = 'Invalid PAN format (e.g. AAAAA1111A)';
    }

    // TAN validation: exactly 10 characters (4 letters, 5 digits, 1 letter)
    const tanRegex = /^[A-Z]{4}[0-9]{5}[A-Z]$/;
    if (formData.tanNumber && !tanRegex.test(formData.tanNumber)) {
      newErrors.tanNumber = 'Invalid TAN format (e.g. AAAA11111A)';
    }

    // Mobile Number validation: exactly 10 digits starting with 6-9
    const mobileRegex = /^[6-9][0-9]{9}$/;
    if (formData.mobileNumber && !mobileRegex.test(formData.mobileNumber)) {
      newErrors.mobileNumber = 'Must be 10 digits starting with 6-9';
    }

    if (formData.secondaryMobileNo && !mobileRegex.test(formData.secondaryMobileNo)) {
      newErrors.secondaryMobileNo = 'Must be 10 digits starting with 6-9';
    }

    // Email validation: standard format
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid Email address';
    }

    // Pin Code validation: exactly 6 digits starting with non-zero
    const pinRegex = /^[1-9][0-9]{5}$/;
    if (formData.pinCode && !pinRegex.test(formData.pinCode)) {
      newErrors.pinCode = 'Must be exactly 6 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      alert('Please correct validation errors first');
      return;
    }

    try {
      const method = isEditing ? 'PUT' : 'POST';
      const url = isEditing
        ? `http://localhost:5076/api/companygsts/${formData.gstNumber}`
        : 'http://localhost:5076/api/companygsts';

      const formPayload = new FormData();
      formPayload.append('data', JSON.stringify(formData));
      if (logoFile) formPayload.append('logo', logoFile);
      if (headerFile) formPayload.append('header', headerFile);
      if (footerFile) formPayload.append('footer', footerFile);

      const response = await fetch(url, {
        method: method,
        body: formPayload
      });

      if (response.ok) {
        alert(isEditing ? 'Company updated successfully!' : 'Company saved successfully!');
        fetchCompanies();
        setFormData({
          gstNumber: '', gstStateCode: '', companyName: '', panNumber: '',
          tanNumber: '', mobileNumber: '', stateName: '', email: '',
          pinCode: '', companyAddress: '', remarks: '', companyEstablished: '',
          city: '', gstType: 'GST', dealsIn: '',
          secondaryMobileNo: '', color: '', logoPath: '', headerPath: '', footerPath: ''
        });
        setLogoFile(null);
        setHeaderFile(null);
        setFooterFile(null);
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
      companyEstablished: formattedDate,
      secondaryMobileNo: company.secondaryMobileNo || '',
      color: company.color || '',
      logoPath: company.logoPath || '',
      headerPath: company.headerPath || '',
      footerPath: company.footerPath || ''
    });
    setLogoFile(null);
    setHeaderFile(null);
    setFooterFile(null);
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
                {statesList.map((s: any) => (
                  <option key={s.id} value={s.gstStateCode}>{s.gstStateCode}</option>
                ))}
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
                maxLength={15}
                className={`w-full px-3 py-2 border rounded text-sm focus:outline-none focus:border-blue-500 placeholder-gray-400 ${isEditing ? 'bg-gray-100 cursor-not-allowed text-gray-500' : 'bg-white border-gray-200'} ${errors.gstNumber ? 'border-red-500' : ''}`}
              />
              {errors.gstNumber && <p className="text-red-500 text-[10px] mt-1 font-bold uppercase tracking-tight">{errors.gstNumber}</p>}
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase">Company Name <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                placeholder="Company name"
                className={`w-full px-3 py-2 bg-white border rounded text-sm focus:outline-none focus:border-blue-500 placeholder-gray-400 ${errors.companyName ? 'border-red-500' : 'border-gray-200'}`}
              />
              {errors.companyName && <p className="text-red-500 text-[10px] mt-1 font-bold uppercase tracking-tight">{errors.companyName}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase">PAN Number</label>
              <input
                type="text"
                name="panNumber"
                value={formData.panNumber}
                onChange={handleInputChange}
                placeholder="PAN number"
                maxLength={10}
                className={`w-full px-3 py-2 bg-white border rounded text-sm focus:outline-none focus:border-blue-500 placeholder-gray-400 ${errors.panNumber ? 'border-red-500' : 'border-gray-200'}`}
              />
              {errors.panNumber && <p className="text-red-500 text-[10px] mt-1 font-bold uppercase tracking-tight">{errors.panNumber}</p>}
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase">TAN Number</label>
              <input
                type="text"
                name="tanNumber"
                value={formData.tanNumber}
                onChange={handleInputChange}
                placeholder="TAN number"
                maxLength={10}
                className={`w-full px-3 py-2 bg-white border rounded text-sm focus:outline-none focus:border-blue-500 placeholder-gray-400 ${errors.tanNumber ? 'border-red-500' : 'border-gray-200'}`}
              />
              {errors.tanNumber && <p className="text-red-500 text-[10px] mt-1 font-bold uppercase tracking-tight">{errors.tanNumber}</p>}
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase">Mobile Number</label>
              <input
                type="text"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleInputChange}
                placeholder="Mobile number"
                maxLength={10}
                className={`w-full px-3 py-2 bg-white border rounded text-sm focus:outline-none focus:border-blue-500 placeholder-gray-400 ${errors.mobileNumber ? 'border-red-500' : 'border-gray-200'}`}
              />
              {errors.mobileNumber && <p className="text-red-500 text-[10px] mt-1 font-bold uppercase tracking-tight">{errors.mobileNumber}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase">State Name</label>
              <input
                type="text"
                name="stateName"
                value={formData.stateName}
                readOnly
                placeholder="Auto-filled state name"
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded text-sm text-gray-500 cursor-not-allowed focus:outline-none placeholder-gray-400"
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
                className={`w-full px-3 py-2 bg-white border rounded text-sm focus:outline-none focus:border-blue-500 placeholder-gray-400 ${errors.email ? 'border-red-500' : 'border-gray-200'}`}
              />
              {errors.email && <p className="text-red-500 text-[10px] mt-1 font-bold uppercase tracking-tight">{errors.email}</p>}
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase">Pin Code</label>
              <input
                type="text"
                name="pinCode"
                value={formData.pinCode}
                onChange={handleInputChange}
                placeholder="Pin code"
                maxLength={6}
                className={`w-full px-3 py-2 bg-white border rounded text-sm focus:outline-none focus:border-blue-500 placeholder-gray-400 ${errors.pinCode ? 'border-red-500' : 'border-gray-200'}`}
              />
              {errors.pinCode && <p className="text-red-500 text-[10px] mt-1 font-bold uppercase tracking-tight">{errors.pinCode}</p>}
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
                {citiesList
                  .filter((c: any) => {
                    if (!formData.gstStateCode) return false;
                    const selectedState = statesList.find(s => s.gstStateCode === formData.gstStateCode);
                    return selectedState && c.parentId === selectedState.id;
                  })
                  .map((c: any) => (
                  <option key={c.id} value={c.value}>{c.value}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase">GST Type</label>
              {/* <input
                type="text"
                name="gstType"
                value={formData.gstType}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-500 text-gray-600"
              /> */}
              <select
                name="gstType"
                value={formData.gstType}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-[#f4f4f4] border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-500 text-gray-600"
              >
                <option value="">Select GST Type</option>
                {gstTypeList.map((t: any) => (
                  <option key={t.id} value={t.value}>{t.value}</option>
                ))}
              </select>
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
                    city: '', gstType: 'GST', dealsIn: '',
                    secondaryMobileNo: '', color: '', logoPath: '', headerPath: '', footerPath: ''
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
        <DialogContent className="max-w-xl p-0 overflow-hidden bg-white border-none shadow-2xl rounded-lg">
          <div className="bg-[#0061f2] p-4 text-white flex justify-between items-center">
            <h2 className="text-sm font-semibold tracking-wide">Additional Info</h2>
            <button onClick={() => setIsAdditionalInfoModalOpen(false)} className="p-1 hover:bg-white/10 rounded transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 space-y-4">
            <div>
              <label className="block text-xs text-gray-500 mb-1">Secondary Mobile No:</label>
              <input
                type="text"
                name="secondaryMobileNo"
                value={formData.secondaryMobileNo}
                onChange={handleInputChange}
                maxLength={10}
                className={`w-full px-3 py-2 bg-white border rounded text-sm focus:outline-none focus:border-blue-500 ${errors.secondaryMobileNo ? 'border-red-500' : 'border-gray-200'}`}
              />
              {errors.secondaryMobileNo && <p className="text-red-500 text-[10px] mt-1 font-bold uppercase tracking-tight">{errors.secondaryMobileNo}</p>}
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Color:</label>
              <input
                type="text"
                name="color"
                value={formData.color}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Logo:</label>
              <input
                type="file"
                onChange={(e) => e.target.files && setLogoFile(e.target.files[0])}
                className="w-full bg-white border border-gray-200 rounded text-sm file:mr-4 file:py-2 file:px-4 file:border-r file:border-gray-200 file:text-sm file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Header:</label>
              <input
                type="file"
                onChange={(e) => e.target.files && setHeaderFile(e.target.files[0])}
                className="w-full bg-white border border-gray-200 rounded text-sm file:mr-4 file:py-2 file:px-4 file:border-r file:border-gray-200 file:text-sm file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Footer:</label>
              <input
                type="file"
                onChange={(e) => e.target.files && setFooterFile(e.target.files[0])}
                className="w-full bg-white border border-gray-200 rounded text-sm file:mr-4 file:py-2 file:px-4 file:border-r file:border-gray-200 file:text-sm file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100"
              />
            </div>
          </div>

          <div className="p-4 flex justify-end">
            <button
              onClick={() => setIsAdditionalInfoModalOpen(false)}
              className="px-6 py-2 bg-[#6b21a8] text-white text-[13px] rounded hover:bg-[#581c87] transition-colors shadow-sm"
            >
              Close
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

