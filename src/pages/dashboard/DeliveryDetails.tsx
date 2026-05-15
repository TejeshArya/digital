import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, Eye, X, MapPin, Building2, Phone, Mail } from 'lucide-react';
import {
  Dialog,
  DialogContent,
} from "../../components/ui/dialog";

interface DeliveryDetail {
  id?: number;
  companyName: string;
  state: string;
  mobileNo: string;
  email: string
  pinCode: string;
  remarks: string;
  location: string;
  address: string;
}

export function DeliveryDetails() {
  const [deliveries, setDeliveries] = useState<DeliveryDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedDelivery, setSelectedDelivery] = useState<DeliveryDetail | null>(null);

  const [formData, setFormData] = useState<DeliveryDetail>({
    companyName: '',
    state: '',
    mobileNo: '',
    email: '',
    pinCode: '',
    remarks: '',
    location: '',
    address: ''
  });

  useEffect(() => {
    fetchDeliveries();
  }, []);

  const fetchDeliveries = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5076/api/deliverydetails');
      const data = await response.json();
      setDeliveries(data);
    } catch (error) {
      console.error('Error fetching deliveries:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!formData.companyName) {
      alert('Company Name is required');
      return;
    }

    try {
      const url = isEditing
        ? 'http://localhost:5076/api/deliverydetails/edit'
        : 'http://localhost:5076/api/deliverydetails';

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert(isEditing ? 'Delivery updated!' : 'Delivery saved!');
        fetchDeliveries();
        resetForm();
      } else {
        alert('Failed to save');
      }
    } catch (error) {
      console.error('Error saving:', error);
    }
  };

  const handleEdit = (delivery: DeliveryDetail) => {
    setIsEditing(true);
    setFormData(delivery);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Delete this record?')) {
      try {
        const response = await fetch(`http://localhost:5076/api/deliverydetails/${id}`, {
          method: 'DELETE'
        });
        if (response.ok) {
          setDeliveries(prev => prev.filter(d => d.id !== id));
        }
      } catch (error) {
        console.error('Error deleting:', error);
      }
    }
  };

  const handleView = (delivery: DeliveryDetail) => {
    setSelectedDelivery(delivery);
    setIsViewModalOpen(true);
  };

  const resetForm = () => {
    setFormData({
      companyName: '', state: '', mobileNo: '', email: '',
      pinCode: '', remarks: '', location: '', address: ''
    });
    setIsEditing(false);
  };

  return (
    <div className="p-4 bg-[#f8f9fc] min-h-screen font-sans">
      {/* Form Section */}
      <div className="bg-white rounded-lg shadow-sm mb-6 overflow-hidden border border-gray-100">
        <div className={`p-4 transition-colors ${isEditing ? 'bg-orange-500' : 'bg-[#0061f2]'}`}>
          <h2 className="text-white font-bold text-[13px]">{isEditing ? 'Edit Delivery Detail' : 'Add Delivery Detail'}</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-5">
            <div className="space-y-1">
              <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-tight">Company Name</label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded focus:outline-none focus:border-blue-400 transition-colors"
              />
            </div>
            <div className="space-y-1">
              <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-tight">State</label>
              <select
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded text-gray-700 text-sm focus:outline-none focus:border-blue-400 transition-colors"
              >
                <option value="">Select state</option>
                <option value="Andhra Pradesh">Andhra Pradesh</option>
                <option value="Telangana">Telangana</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Karnataka">Karnataka</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-tight">Mobile No</label>
              <input
                type="text"
                name="mobileNo"
                value={formData.mobileNo}
                onChange={handleInputChange}
                className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded focus:outline-none focus:border-blue-400 transition-colors"
              />
            </div>
            <div className="space-y-1">
              <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-tight">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded focus:outline-none focus:border-blue-400 transition-colors"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-tight">Pin Code</label>
              <input
                type="text"
                name="pinCode"
                value={formData.pinCode}
                onChange={handleInputChange}
                className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded focus:outline-none focus:border-blue-400 transition-colors"
              />
            </div>
            <div className="space-y-1">
              <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-tight">Remarks</label>
              <input
                type="text"
                name="remarks"
                value={formData.remarks}
                onChange={handleInputChange}
                className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded focus:outline-none focus:border-blue-400 transition-colors"
              />
            </div>

            <div className="md:col-span-2 space-y-1">
              <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-tight">Location</label>
              <textarea
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                rows={2}
                className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded focus:outline-none focus:border-blue-400 transition-colors resize-none text-sm"
              />
            </div>

            <div className="md:col-span-2 space-y-1">
              <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-tight">Company Address</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                rows={2}
                className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded focus:outline-none focus:border-blue-400 transition-colors resize-none text-sm"
              />
            </div>
          </div>

          <div className="mt-6 flex gap-2">
            <button
              onClick={handleSave}
              className={`px-8 py-2 text-white text-[11px] font-bold rounded shadow-sm transition-all uppercase tracking-wider ${isEditing ? 'bg-orange-500 hover:bg-orange-600' : 'bg-[#0061f2] hover:bg-blue-700'}`}
            >
              {isEditing ? 'Update' : 'Save'}
            </button>
            {isEditing && (
              <button
                onClick={resetForm}
                className="px-8 py-2 bg-gray-100 text-gray-600 text-[11px] font-bold rounded hover:bg-gray-200 transition-all uppercase tracking-wider"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden mb-8">
        <div className="overflow-x-auto">
          <table className="w-full text-[12px] border-collapse">
            <thead>
              <tr className="bg-[#323c4e] text-white uppercase tracking-tighter">
                <th className="px-4 py-4 text-left font-bold border-r border-slate-600 whitespace-nowrap">Company Name</th>
                <th className="px-4 py-4 text-left font-bold border-r border-slate-600 whitespace-nowrap">State</th>
                <th className="px-4 py-4 text-left font-bold border-r border-slate-600 whitespace-nowrap">Mobile No</th>
                <th className="px-4 py-4 text-left font-bold border-r border-slate-600 whitespace-nowrap">Location</th>
                <th className="px-4 py-4 text-center font-bold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-4 py-12 text-center text-gray-300 italic font-medium">
                    <div className="flex justify-center"><div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div></div>
                  </td>
                </tr>
              ) : deliveries.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-12 text-center text-gray-300 italic font-medium uppercase tracking-widest">
                    No delivery records found.
                  </td>
                </tr>
              ) : (
                deliveries.map((delivery) => (
                  <tr key={delivery.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-4 text-blue-600 font-bold border-r border-gray-50 uppercase">{delivery.companyName}</td>
                    <td className="px-4 py-4 text-gray-500 border-r border-gray-50 uppercase">{delivery.state}</td>
                    <td className="px-4 py-4 text-gray-500 border-r border-gray-50">{delivery.mobileNo}</td>
                    <td className="px-4 py-4 text-gray-500 border-r border-gray-50 uppercase max-w-[200px] truncate">{delivery.location}</td>
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-center gap-1.5">
                        <button onClick={() => handleView(delivery)} className="p-1.5 bg-cyan-500 text-white rounded hover:bg-cyan-600 transition-colors" title="View"><Eye className="w-3 h-3" /></button>
                        <button onClick={() => handleEdit(delivery)} className="p-1.5 bg-orange-400 text-white rounded hover:bg-orange-500 transition-colors" title="Edit"><Edit className="w-3 h-3" /></button>
                        <button onClick={() => delivery.id && handleDelete(delivery.id)} className="p-1.5 bg-red-600 text-white rounded hover:bg-red-700 transition-colors" title="Delete"><Trash2 className="w-3 h-3" /></button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Modal */}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="max-w-2xl p-0 overflow-hidden bg-white border-none shadow-2xl rounded-lg">
          <div className="bg-[#00cfd5] p-4 text-white flex justify-between items-center">
            <h2 className="text-sm font-bold tracking-wide uppercase">Delivery Details: {selectedDelivery?.companyName}</h2>
            <button onClick={() => setIsViewModalOpen(false)} className="hover:opacity-70 transition-opacity">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-[#0061f2] border-b border-blue-50 pb-2">
                  <Building2 className="w-4 h-4" />
                  <span className="text-[12px] font-bold uppercase tracking-wider">Business Info</span>
                </div>
                <div className="space-y-2 text-[12px]">
                  <p className="text-gray-400 font-bold uppercase">Name</p>
                  <p className="text-gray-700 font-bold text-sm">{selectedDelivery?.companyName}</p>
                  <p className="text-gray-400 font-bold uppercase mt-3">State</p>
                  <p className="text-gray-700 uppercase">{selectedDelivery?.state || 'N/A'}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-[#0061f2] border-b border-blue-50 pb-2">
                  <Phone className="w-4 h-4" />
                  <span className="text-[12px] font-bold uppercase tracking-wider">Contact Details</span>
                </div>
                <div className="space-y-2 text-[12px]">
                  <p className="text-gray-400 font-bold uppercase">Mobile</p>
                  <p className="text-gray-700 font-bold">{selectedDelivery?.mobileNo || 'N/A'}</p>
                  <p className="text-gray-400 font-bold uppercase mt-3">Email</p>
                  <p className="text-gray-700 lowercase">{selectedDelivery?.email || 'N/A'}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2 text-[#0061f2] border-b border-blue-50 pb-2">
                <MapPin className="w-4 h-4" />
                <span className="text-[12px] font-bold uppercase tracking-wider">Address & Location</span>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                <div className="text-[12px]">
                  <p className="text-gray-400 font-bold uppercase mb-1">Location</p>
                  <p className="text-gray-700 uppercase leading-relaxed">{selectedDelivery?.location || 'No location specified'}</p>
                </div>
                <div className="text-[12px]">
                  <p className="text-gray-400 font-bold uppercase mb-1">Company Address</p>
                  <p className="text-gray-700 uppercase leading-relaxed">{selectedDelivery?.address || 'No address specified'}</p>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button onClick={() => setIsViewModalOpen(false)} className="px-6 py-2 bg-gray-100 text-gray-600 text-[11px] font-bold rounded hover:bg-gray-200 transition-colors uppercase">Close</button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <div className="mt-auto pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center text-[10px] text-gray-400 font-medium tracking-wide uppercase">
        <p>Copyright &copy; Digital New Enterprises 2024</p>
        <div className="flex gap-4 mt-2 md:mt-0">
          <a href="#" className="hover:underline hover:text-blue-500 transition-colors">Privacy Policy</a>
          <span>•</span>
          <a href="#" className="hover:underline hover:text-blue-500 transition-colors">Terms & Conditions</a>
        </div>
      </div>
    </div>
  );
}