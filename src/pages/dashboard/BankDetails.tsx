import React, { useState, useEffect } from 'react';
import { Edit, Trash2, X, ChevronDown } from 'lucide-react';

interface BankRecord {
  empId: string;
  companyName: string;
  bankName: string;
  accountNo: string;
  ifscCode: string;
  swiftCode: string;
  micrCode: string;
  branchName: string;
  accountHolder: string;
  category: string;
}

interface Company { companyName: string; }
interface BankMaster { bankName: string; }

export function BankDetails() {
  const [records, setRecords] = useState<BankRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<BankRecord>({
    empId: '',
    companyName: '',
    bankName: '',
    accountNo: '',
    ifscCode: '',
    swiftCode: '',
    micrCode: '',
    branchName: '',
    accountHolder: '',
    category: ''
  });

  const [companies, setCompanies] = useState<any[]>([]);
  const [banks, setBanks] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    fetchRecords();
    fetchMasterData();
  }, []);

  const fetchMasterData = async () => {
    try {
      const [companiesRes, banksRes, categoriesRes] = await Promise.all([
        fetch('http://localhost:5076/api/companygsts'),
        fetch('http://localhost:5076/api/banks'),
        fetch('http://localhost:5076/api/MasterData/category/Category')
      ]);
      setCompanies(await companiesRes.json());
      setBanks(await banksRes.json());
      setCategories(await categoriesRes.json());
    } catch (error) {
      console.error('Error fetching master data:', error);
    }
  };

  const fetchRecords = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5076/api/bankdetails');
      const data = await response.json();
      setRecords(data);
    } catch (error) {
      console.error('Error fetching records:', error);
    } finally {
      setLoading(false);
    }
  };



  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!formData.empId || !formData.bankName) {
      alert('Employee ID and Bank Name are required');
      return;
    }

    try {
      const url = isEditing 
        ? 'http://localhost:5076/api/bankdetails/edit' 
        : 'http://localhost:5076/api/bankdetails';

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert(isEditing ? 'Bank record updated!' : 'Bank record saved!');
        fetchRecords();
        resetForm();
      }
    } catch (error) {
      console.error('Error saving:', error);
    }
  };

  const handleEdit = (record: BankRecord) => {
    setIsEditing(true);
    setFormData(record);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (empId: string) => {
    if (window.confirm('Delete this bank record?')) {
      try {
        const response = await fetch(`http://localhost:5076/api/bankdetails/${empId}`, {
          method: 'DELETE'
        });
        if (response.ok) {
          setRecords(prev => prev.filter(r => r.empId !== empId));
        }
      } catch (error) {
        console.error('Error deleting:', error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      empId: '', companyName: '', bankName: '', accountNo: '',
      ifscCode: '', swiftCode: '', micrCode: '', branchName: '',
      accountHolder: '', category: ''
    });
    setIsEditing(false);
  };

  return (
    <div className="p-4 bg-[#f8f9fc] min-h-screen font-sans text-slate-600">
      {/* Bank Form */}
      <div className="bg-white rounded-lg shadow-sm mb-6 overflow-hidden border border-gray-100">
        <div className={`p-4 transition-colors ${isEditing ? 'bg-orange-500' : 'bg-[#0061f2]'}`}>
          <h2 className="text-white font-bold text-[13px] uppercase tracking-wider">{isEditing ? 'Edit Bank Detail' : 'Bank Form'}</h2>
        </div>
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-6">
            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-tight">Employee ID</label>
              <input
                type="text"
                name="empId"
                value={formData.empId}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-400"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-tight">Company Name</label>
              <div className="relative">
                <select
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-white border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-400 appearance-none"
                >
                  <option value="">Select Company</option>
                  {companies.map((c: any) => (
                    <option key={c.gstNumber} value={c.companyName}>{c.companyName}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-tight">Bank Name</label>
              <div className="relative">
                <select
                  name="bankName"
                  value={formData.bankName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-white border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-400 appearance-none"
                >
                  <option value="">Select Bank</option>
                  {banks.map((b: any) => (
                    <option key={b.id} value={b.bankName}>{b.bankName}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-tight">Account No</label>
              <input
                type="text"
                name="accountNo"
                value={formData.accountNo}
                onChange={handleInputChange}
                placeholder="Enter Account Number"
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-400"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-tight">IFSC Code</label>
              <input
                type="text"
                name="ifscCode"
                value={formData.ifscCode}
                onChange={handleInputChange}
                placeholder="Enter IFSC Code"
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-400"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-tight">Swift Code</label>
              <input
                type="text"
                name="swiftCode"
                value={formData.swiftCode}
                onChange={handleInputChange}
                placeholder="Enter Swift Code"
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-400"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-tight">MICR Code</label>
              <input
                type="text"
                name="micrCode"
                value={formData.micrCode}
                onChange={handleInputChange}
                placeholder="Enter MICR Code"
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-400"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-tight">Branch Name</label>
              <input
                type="text"
                name="branchName"
                value={formData.branchName}
                onChange={handleInputChange}
                placeholder="Enter Branch Name"
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-400"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-tight">Account Holder</label>
              <input
                type="text"
                name="accountHolder"
                value={formData.accountHolder}
                onChange={handleInputChange}
                placeholder="Enter Account Holder Name"
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-400"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-tight">Category</label>
              <div className="relative">
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-white border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-400 appearance-none"
                >
                  <option value="">Select Category</option>
                  {categories.map((cat: any) => (
                    <option key={cat.id} value={cat.value}>{cat.value}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-end gap-2">
            <button 
              onClick={handleSave}
              className={`px-10 py-2.5 text-white text-[11px] font-bold rounded shadow-sm transition-colors uppercase tracking-widest ${isEditing ? 'bg-orange-500 hover:bg-orange-600' : 'bg-[#0061f2] hover:bg-blue-700'}`}
            >
              {isEditing ? 'Update' : 'Save'}
            </button>
            {isEditing && (
              <button 
                onClick={resetForm}
                className="px-8 py-2.5 bg-gray-100 text-gray-600 text-[11px] font-bold rounded hover:bg-gray-200 transition-colors uppercase tracking-widest"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Bank Records Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden mb-8">
        <div className="overflow-x-auto">
          <table className="w-full text-[11px] border-collapse">
            <thead>
              <tr className="bg-[#323c4e] text-white uppercase tracking-tighter">
                <th className="px-4 py-5 text-left font-bold border-r border-slate-600 whitespace-nowrap">Emp ID</th>
                <th className="px-4 py-5 text-left font-bold border-r border-slate-600 whitespace-nowrap">Company</th>
                <th className="px-4 py-5 text-left font-bold border-r border-slate-600 whitespace-nowrap">Bank</th>
                <th className="px-4 py-5 text-left font-bold border-r border-slate-600 whitespace-nowrap">Acc No</th>
                <th className="px-4 py-5 text-left font-bold border-r border-slate-600 whitespace-nowrap">IFSC</th>
                <th className="px-4 py-5 text-left font-bold border-r border-slate-600 whitespace-nowrap">Branch</th>
                <th className="px-4 py-5 text-left font-bold border-r border-slate-600 whitespace-nowrap">Holder</th>
                <th className="px-4 py-5 text-center font-bold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr><td colSpan={8} className="py-10 text-center"><div className="animate-spin inline-block w-6 h-6 border-2 border-blue-600 rounded-full border-t-transparent"></div></td></tr>
              ) : records.length === 0 ? (
                <tr><td colSpan={8} className="py-10 text-center text-gray-400 uppercase tracking-widest">No records found.</td></tr>
              ) : records.map((record) => (
                <tr key={record.empId} className="hover:bg-gray-50 transition-colors group">
                  <td className="px-4 py-4 border-r border-gray-50 text-gray-500 uppercase">{record.empId}</td>
                  <td className="px-4 py-4 border-r border-gray-50 text-gray-700 font-bold uppercase">{record.companyName}</td>
                  <td className="px-4 py-4 border-r border-gray-50 text-gray-500 uppercase">{record.bankName}</td>
                  <td className="px-4 py-4 border-r border-gray-50 text-gray-500">{record.accountNo}</td>
                  <td className="px-4 py-4 border-r border-gray-50 text-gray-500">{record.ifscCode}</td>
                  <td className="px-4 py-4 border-r border-gray-50 text-gray-500 uppercase">{record.branchName}</td>
                  <td className="px-4 py-4 border-r border-gray-50 text-gray-500 uppercase">{record.accountHolder}</td>
                  <td className="px-4 py-4">
                    <div className="flex flex-col gap-1.5 items-center">
                      <button 
                        onClick={() => handleEdit(record)}
                        className="w-full max-w-[60px] px-2 py-1 bg-orange-400 text-white text-[9px] font-bold rounded uppercase hover:bg-orange-500 transition-colors shadow-sm"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(record.empId)}
                        className="w-full max-w-[60px] px-2 py-1 bg-red-600 text-white text-[9px] font-bold rounded uppercase hover:bg-red-700 transition-colors shadow-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
