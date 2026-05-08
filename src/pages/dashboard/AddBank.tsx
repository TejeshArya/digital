import React, { useState, useEffect } from 'react';
import { Edit, Trash2, X } from 'lucide-react';

interface Bank {
  id?: number;
  bankName: string;
  description: string;
  createdAt?: string;
}

export function AddBank() {
  const [banks, setBanks] = useState<Bank[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Bank>({
    bankName: '',
    description: ''
  });

  useEffect(() => {
    fetchBanks();
  }, []);

  const fetchBanks = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5076/api/banks');
      const data = await response.json();
      setBanks(data);
    } catch (error) {
      console.error('Error fetching banks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!formData.bankName) {
      alert('Bank Name is required');
      return;
    }

    try {
      const url = isEditing 
        ? 'http://localhost:5076/api/banks/edit' 
        : 'http://localhost:5076/api/banks';

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert(isEditing ? 'Bank updated!' : 'Bank saved!');
        fetchBanks();
        resetForm();
      } else {
        alert('Failed to save');
      }
    } catch (error) {
      console.error('Error saving:', error);
    }
  };

  const handleEdit = (bank: Bank) => {
    setIsEditing(true);
    setFormData(bank);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Delete this bank?')) {
      try {
        const response = await fetch(`http://localhost:5076/api/banks/${id}`, {
          method: 'DELETE'
        });
        if (response.ok) {
          setBanks(prev => prev.filter(b => b.id !== id));
        }
      } catch (error) {
        console.error('Error deleting:', error);
      }
    }
  };

  const resetForm = () => {
    setFormData({ bankName: '', description: '' });
    setIsEditing(false);
  };

  return (
    <div className="p-4 bg-[#f8f9fc] min-h-screen font-sans">
      {/* Add New Bank Form */}
      <div className="bg-white rounded-lg shadow-sm mb-6 overflow-hidden border border-gray-100">
        <div className={`p-4 transition-colors ${isEditing ? 'bg-orange-500' : 'bg-[#0061f2]'}`}>
          <h2 className="text-white font-bold text-[13px]">{isEditing ? 'Edit Bank' : 'Add New Bank'}</h2>
        </div>
        <div className="p-10">
          <div className="flex flex-col md:flex-row items-end gap-6">
            <div className="flex-1 space-y-1.5 w-full">
              <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-tight">Bank Name</label>
              <input
                type="text"
                name="bankName"
                value={formData.bankName}
                onChange={handleInputChange}
                className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded focus:outline-none focus:border-blue-400 transition-colors"
              />
            </div>
            <div className="flex-1 space-y-1.5 w-full">
              <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-tight">Description</label>
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded focus:outline-none focus:border-blue-400 transition-colors"
              />
            </div>
            <div className="flex gap-2">
              <button 
                onClick={handleSave}
                className={`px-8 py-2.5 text-white text-[11px] font-bold rounded shadow-sm transition-all uppercase tracking-widest ${isEditing ? 'bg-orange-500 hover:bg-orange-600' : 'bg-[#0061f2] hover:bg-blue-700'}`}
              >
                {isEditing ? 'Update' : 'Save'}
              </button>
              {isEditing && (
                <button 
                  onClick={resetForm}
                  className="px-8 py-2.5 bg-gray-100 text-gray-600 text-[11px] font-bold rounded hover:bg-gray-200 transition-all uppercase tracking-widest"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bank List Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden mb-8">
        <div className="overflow-x-auto">
          <table className="w-full text-[12px] border-collapse">
            <thead>
              <tr className="bg-white border-b border-gray-100">
                <th className="px-6 py-5 text-left font-bold text-gray-700 border-r border-gray-50">Bank Name</th>
                <th className="px-6 py-5 text-left font-bold text-gray-700 border-r border-gray-50">Description</th>
                <th className="px-6 py-5 text-left font-bold text-gray-700 border-r border-gray-50">Created Date</th>
                <th className="px-6 py-5 text-left font-bold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr><td colSpan={4} className="py-10 text-center text-gray-300 italic">Loading...</td></tr>
              ) : banks.length === 0 ? (
                <tr><td colSpan={4} className="py-10 text-center text-gray-300 italic">No banks found.</td></tr>
              ) : banks.map((bank) => (
                <tr key={bank.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 border-r border-gray-50 text-gray-600 font-medium">{bank.bankName}</td>
                  <td className="px-6 py-4 border-r border-gray-50 text-gray-500 uppercase">{bank.description}</td>
                  <td className="px-6 py-4 border-r border-gray-50 text-gray-500">
                    {bank.createdAt ? new Date(bank.createdAt).toLocaleString() : 'N/A'}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleEdit(bank)}
                        className="px-3 py-1.5 bg-orange-400 text-white text-[10px] font-bold rounded uppercase hover:bg-orange-500 transition-colors shadow-sm"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => bank.id && handleDelete(bank.id)}
                        className="px-3 py-1.5 bg-red-600 text-white text-[10px] font-bold rounded uppercase hover:bg-red-700 transition-colors shadow-sm"
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

      {/* Footer */}
      <div className="mt-auto pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center text-[10px] text-gray-400 font-bold tracking-widest uppercase">
        <p>Copyright &copy; Digital New Enterprises 2024</p>
        <div className="flex gap-4 mt-2 md:mt-0">
          <a href="#" className="hover:underline">Privacy Policy</a>
          <span>•</span>
          <a href="#" className="hover:underline">Terms & Conditions</a>
        </div>
      </div>
    </div>
  );
}
