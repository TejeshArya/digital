import React, { useState, useEffect } from 'react';
import { 
  Plus, ArrowLeft, FileText, Layout, ChevronDown, Trash2, 
  Settings, ShoppingCart, Calculator, CheckCircle, Info, RefreshCw
} from 'lucide-react';

interface QuotationItem {
  id?: number;
  category: string;
  subcategory: string;
  brand: string;
  description: string;
  capacity: string;
  hsn: string;
  denom: string;
  quantity: number;
  price: number;
  igst: number;
  cgst: number;
  sgst: number;
  amount: number;
  total: number;
}

export function NewQuotation({ onNavigate }: { onNavigate?: (path: string) => void }) {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [hsnCodes, setHsnCodes] = useState<any[]>([]);
  const [denominations, setDenominations] = useState<any[]>([]);
  const [departments, setDepartments] = useState<any[]>([]);

  // Header State
  const [header, setHeader] = useState({
    expenseType: 'Direct Expenses (DE)',
    companyName: '',
    projectName: '',
    wing: '',
    department: '',
    post: '',
    createdBy: JSON.parse(localStorage.getItem('user') || '{}').fullName || 'System User',
    invoiceDate: new Date().toISOString().split('T')[0],
    validityDays: '30',
    deliveryDays: '7',
    warrantyDays: '365',
    inquiryNo: '',
    inquiryDate: new Date().toISOString().split('T')[0],
    remarks: '',
    gstType: 'IGST',
    subject: ''
  });

  // Single Item Input State
  const [itemInput, setItemInput] = useState({
    category: '',
    subcategory: '',
    brand: '',
    description: '',
    capacity: '',
    hsn: '',
    denom: '',
    quantity: 1,
    price: 0
  });

  // Added Items List
  const [items, setItems] = useState<QuotationItem[]>([]);

  useEffect(() => {
    fetchMasters();
    fetchDepartments();
  }, []);

  const fetchMasters = async () => {
    try {
      const [catRes, hsnRes, denRes] = await Promise.all([
        fetch('http://localhost:5076/api/categories'),
        fetch('http://localhost:5076/api/hsncodes'),
        fetch('http://localhost:5076/api/denominations')
      ]);
      if (catRes.ok) setCategories(await catRes.json());
    } catch (err) {
      console.error('Master fetch error:', err);
    }
  };

  const fetchDepartments = async () => {
    try {
      const res = await fetch('http://localhost:5076/api/departments');
      if (res.ok) setDepartments(await res.json());
    } catch (err) {
      console.error('Dept fetch error:', err);
    }
  };

  const handleHeaderChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setHeader(prev => ({ ...prev, [name]: value }));
  };

  const handleItemInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setItemInput(prev => ({ ...prev, [name]: value }));
  };

  const calculateItemTotals = (qty: number, price: number, gstType: string) => {
    const amount = qty * price;
    let igst = 0, cgst = 0, sgst = 0;
    
    // Assuming a standard 18% GST for simplicity in this dynamic calculation
    if (gstType === 'IGST') {
      igst = amount * 0.18;
    } else {
      cgst = amount * 0.09;
      sgst = amount * 0.09;
    }
    
    const total = amount + igst + cgst + sgst;
    return { amount, igst, cgst, sgst, total };
  };

  const handleAddItem = () => {
    if (!itemInput.description || itemInput.quantity <= 0 || itemInput.price <= 0) {
      alert('Please enter valid item details');
      return;
    }

    const totals = calculateItemTotals(Number(itemInput.quantity), Number(itemInput.price), header.gstType);
    const newItem: QuotationItem = {
      ...itemInput,
      quantity: Number(itemInput.quantity),
      price: Number(itemInput.price),
      ...totals
    };

    setItems(prev => [...prev, newItem]);
    // Reset item input
    setItemInput({
      category: '', subcategory: '', brand: '', description: '',
      capacity: '', hsn: '', denom: '', quantity: 1, price: 0
    });
  };

  const removeItem = (index: number) => {
    setItems(prev => prev.filter((_, i) => i !== index));
  };

  // Summary Calculations
  const summary = items.reduce((acc, item) => ({
    totalIgst: acc.totalIgst + item.igst,
    totalCgst: acc.totalCgst + item.cgst,
    totalSgst: acc.totalSgst + item.sgst,
    amountExclGst: acc.amountExclGst + item.amount,
    totalAmount: acc.totalAmount + item.total
  }), { totalIgst: 0, totalCgst: 0, totalSgst: 0, amountExclGst: 0, totalAmount: 0 });

  const handleCreateQuotation = async () => {
    if (items.length === 0) {
      alert('Please add at least one item');
      return;
    }

    try {
      setLoading(true);
      const payload = {
        ...header,
        ...summary,
        roundOff: Math.round(summary.totalAmount) - summary.totalAmount,
        totalAmount: Math.round(summary.totalAmount),
        items: items.map(({ id, ...rest }) => rest)
      };

      const response = await fetch('http://localhost:5076/api/quotations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        const result = await response.json();
        alert(`Quotation ${result.quotationNumber} created successfully!`);
        onNavigate?.('/quotations/all');
      } else {
        const errorData = await response.json();
        alert('Failed to create quotation: ' + (errorData.message || 'Server error'));
      }
    } catch (err) {
      console.error('Save error:', err);
      alert('Connection error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-[#f8f9fc] min-h-screen font-sans">
      {/* Header */}
      <div className="bg-[#6b58d3] p-4 rounded-t-lg flex justify-between items-center shadow-lg">
        <div className="flex items-center gap-3 text-white">
          <div className="bg-white/20 p-1.5 rounded">
            <FileText className="w-4 h-4" />
          </div>
          <h1 className="text-sm font-bold uppercase tracking-wider">Create New Quotation</h1>
        </div>
        <button 
          onClick={() => onNavigate?.('/quotations/all')}
          className="flex items-center gap-2 px-3 py-1.5 bg-white/10 text-white text-[10px] font-bold rounded uppercase hover:bg-white/20 transition-colors border border-white/20"
        >
          <ArrowLeft className="w-3 h-3" /> Back to List
        </button>
      </div>

      <div className="space-y-6 mt-6">
        {/* Card 1: Expense Type */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-2 mb-6">
            <Settings className="w-4 h-4 text-gray-400" />
            <h2 className="text-[12px] font-bold text-gray-600 uppercase tracking-tight">Expense Type</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {['Direct Expenses (DE)', 'Indirect Expenses (IDE)'].map(type => (
              <label key={type} className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition-colors group ${header.expenseType === type ? 'bg-indigo-50 border-indigo-200' : 'border-gray-100 hover:bg-gray-50'}`}>
                <input 
                  type="radio" 
                  name="expenseType" 
                  value={type}
                  checked={header.expenseType === type}
                  onChange={handleHeaderChange}
                  className="w-4 h-4 text-indigo-600 focus:ring-indigo-500" 
                />
                <span className={`text-sm font-bold uppercase tracking-tight ${header.expenseType === type ? 'text-indigo-600' : 'text-gray-500'}`}>{type}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Card 2: Quotation Details */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-2 mb-6">
            <Info className="w-4 h-4 text-gray-400" />
            <h2 className="text-[12px] font-bold text-gray-600 uppercase tracking-tight">Quotation Details</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-x-6 gap-y-5">
            <input type="text" name="companyName" value={header.companyName} onChange={handleHeaderChange} placeholder="Company Name" className="w-full px-3 py-2 bg-white border border-gray-200 rounded text-sm focus:outline-none focus:border-indigo-400 placeholder:text-gray-300 font-bold" />
            <input type="text" name="projectName" value={header.projectName} onChange={handleHeaderChange} placeholder="Project Name" className="w-full px-3 py-2 bg-white border border-gray-200 rounded text-sm focus:outline-none focus:border-indigo-400 placeholder:text-gray-300 font-bold" />
            
            <div className="space-y-1 relative">
              <div className="absolute -top-3 left-2 px-1 bg-white text-[9px] font-bold text-indigo-400 uppercase tracking-tighter">Invoice Date</div>
              <input type="date" name="invoiceDate" value={header.invoiceDate} onChange={handleHeaderChange} className="w-full px-3 py-2 bg-gray-50 border border-gray-100 rounded text-sm text-gray-600 focus:outline-none" />
            </div>
            
            <input type="text" name="subject" value={(header as any).subject || ''} onChange={handleHeaderChange} placeholder="Quotation Subject (Description)" className="w-full px-3 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:border-indigo-400 placeholder:text-gray-300 font-bold md:col-span-2" />
            
            <select name="department" value={header.department} onChange={handleHeaderChange} className="w-full px-3 py-2 bg-white border border-gray-200 rounded text-sm text-gray-600 focus:outline-none font-bold">
              <option value="">Select Department</option>
              {departments.map((d: any) => <option key={d.id} value={d.name}>{d.name}</option>)}
            </select>

            <input type="text" name="wing" value={header.wing} onChange={handleHeaderChange} placeholder="Wing (e.g. Facilities)" className="w-full px-3 py-2 border border-gray-200 rounded text-sm focus:outline-none" />
            <input type="text" name="post" value={header.post} onChange={handleHeaderChange} placeholder="Post (e.g. Project Lead)" className="w-full px-3 py-2 border border-gray-200 rounded text-sm focus:outline-none" />
            
            <div className="space-y-1 relative">
              <div className="absolute -top-3 left-2 px-1 bg-white text-[9px] font-bold text-indigo-400 uppercase tracking-tighter">Validity (Days)</div>
              <input type="number" name="validityDays" value={header.validityDays} onChange={handleHeaderChange} className="w-full px-3 py-2 border border-gray-200 rounded text-sm focus:outline-none" />
            </div>
            <div className="space-y-1 relative">
              <div className="absolute -top-3 left-2 px-1 bg-white text-[9px] font-bold text-indigo-400 uppercase tracking-tighter">Delivery (Days)</div>
              <input type="number" name="deliveryDays" value={header.deliveryDays} onChange={handleHeaderChange} className="w-full px-3 py-2 border border-gray-200 rounded text-sm focus:outline-none" />
            </div>
            <div className="space-y-1 relative">
              <div className="absolute -top-3 left-2 px-1 bg-white text-[9px] font-bold text-indigo-400 uppercase tracking-tighter">Warranty (Days)</div>
              <input type="number" name="warrantyDays" value={header.warrantyDays} onChange={handleHeaderChange} className="w-full px-3 py-2 border border-gray-200 rounded text-sm focus:outline-none" />
            </div>
            
            <input type="text" name="inquiryNo" value={header.inquiryNo} onChange={handleHeaderChange} placeholder="Inquiry No" className="w-full px-3 py-2 border border-gray-200 rounded text-sm focus:outline-none" />
            
            <div className="space-y-1 relative">
              <div className="absolute -top-3 left-2 px-1 bg-white text-[9px] font-bold text-indigo-400 uppercase tracking-tighter">Inquiry Date</div>
              <input type="date" name="inquiryDate" value={header.inquiryDate} onChange={handleHeaderChange} className="w-full px-3 py-2 border border-gray-200 rounded text-sm text-gray-600 focus:outline-none" />
            </div>
            
            <input type="text" name="remarks" value={header.remarks} onChange={handleHeaderChange} placeholder="Remarks" className="w-full px-3 py-2 border border-gray-200 rounded text-sm focus:outline-none md:col-span-2" />
            
            <select name="gstType" value={header.gstType} onChange={handleHeaderChange} className="w-full px-3 py-2 bg-indigo-50 border border-indigo-100 rounded text-sm text-indigo-600 font-bold focus:outline-none">
              <option value="IGST">IGST (Inter-State)</option>
              <option value="CGST_SGST">CGST + SGST (Intra-State)</option>
            </select>
          </div>
        </div>

        {/* Card 3 & 4: Add Item & Table */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
          {/* Add Item Form */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-5">
            <div className="flex items-center gap-2 mb-2">
              <Plus className="w-4 h-4 text-gray-400" />
              <h2 className="text-[12px] font-bold text-gray-600 uppercase tracking-tight">Add Item</h2>
            </div>
            
            <select name="category" value={itemInput.category} onChange={handleItemInputChange} className="w-full px-3 py-2 bg-white border border-gray-200 rounded text-sm text-gray-600 font-medium">
              <option value="">Select Category</option>
              {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
            </select>
            
            <input type="text" name="subcategory" value={itemInput.subcategory} onChange={handleItemInputChange} placeholder="Subcategory" className="w-full px-3 py-2 border border-gray-200 rounded text-sm" />
            <input type="text" name="brand" value={itemInput.brand} onChange={handleItemInputChange} placeholder="Brand" className="w-full px-3 py-2 border border-gray-200 rounded text-sm" />
            
            <textarea name="description" value={itemInput.description} onChange={handleItemInputChange} placeholder="Description" rows={3} className="w-full px-3 py-2 border border-gray-200 rounded text-sm resize-none" />
            
            <input type="text" name="capacity" value={itemInput.capacity} onChange={handleItemInputChange} placeholder="Capacity" className="w-full px-3 py-2 border border-gray-200 rounded text-sm" />
            
            <div className="grid grid-cols-2 gap-4">
              <input type="text" name="hsn" value={itemInput.hsn} onChange={handleItemInputChange} placeholder="HSN Code" className="w-full px-3 py-2 border border-gray-200 rounded text-sm" />
              <input type="text" name="denom" value={itemInput.denom} onChange={handleItemInputChange} placeholder="Denom (e.g. Nos)" className="w-full px-3 py-2 border border-gray-200 rounded text-sm" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <div className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter ml-1">Quantity</div>
                <input type="number" name="quantity" value={itemInput.quantity} onChange={handleItemInputChange} className="w-full px-3 py-2 border border-gray-200 rounded text-sm font-bold" />
              </div>
              <div className="space-y-1">
                <div className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter ml-1">Price (₹)</div>
                <input type="number" name="price" value={itemInput.price} onChange={handleItemInputChange} className="w-full px-3 py-2 border border-gray-200 rounded text-sm font-bold text-indigo-600" />
              </div>
            </div>
            
            <button 
              onClick={handleAddItem}
              className="w-full py-2.5 bg-[#a294e3] text-white text-[11px] font-bold rounded shadow-md hover:bg-[#8e7fcf] transition-all uppercase tracking-widest flex items-center justify-center gap-2"
            >
              <Plus className="w-3.5 h-3.5" /> Add to List
            </button>
          </div>

          {/* Table Area */}
          <div className="lg:col-span-3 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col min-h-[500px]">
            <div className="bg-[#8370cc] p-3 flex items-center justify-center gap-2">
              <Layout className="w-4 h-4 text-white" />
              <h2 className="text-white font-bold text-[11px] uppercase tracking-wider">Quotation Items ({items.length})</h2>
            </div>
            <div className="flex-1 overflow-x-auto">
              <table className="w-full text-[10px] border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100 text-gray-600">
                    <th className="px-2 py-4 text-center font-bold border-r border-gray-100 uppercase w-10">#</th>
                    <th className="px-3 py-4 text-left font-bold border-r border-gray-100 uppercase min-w-[150px]">Description</th>
                    <th className="px-3 py-4 text-center font-bold border-r border-gray-100 uppercase">Qty</th>
                    <th className="px-3 py-4 text-right font-bold border-r border-gray-100 uppercase">Price</th>
                    <th className="px-3 py-4 text-right font-bold border-r border-gray-100 uppercase">IGST</th>
                    <th className="px-3 py-4 text-right font-bold border-r border-gray-100 uppercase">CGST</th>
                    <th className="px-3 py-4 text-right font-bold border-r border-gray-100 uppercase">SGST</th>
                    <th className="px-3 py-4 text-right font-bold border-r border-gray-100 uppercase">Amount</th>
                    <th className="px-3 py-4 text-right font-bold border-r border-gray-100 uppercase whitespace-nowrap">Total</th>
                    <th className="px-3 py-4 text-center font-bold uppercase">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {items.length === 0 ? (
                    <tr>
                      <td colSpan={10} className="py-20 text-center text-gray-300 italic font-bold uppercase tracking-widest">
                        No items added yet. Use the form on the left to add items.
                      </td>
                    </tr>
                  ) : items.map((item, idx) => (
                    <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-2 py-3 text-center text-gray-400 font-bold">{idx + 1}</td>
                      <td className="px-3 py-3 border-r border-gray-50">
                        <div className="font-bold text-gray-700 uppercase">{item.description}</div>
                        <div className="text-[8px] text-gray-400 flex gap-2">
                          <span>{item.category}</span>
                          <span>•</span>
                          <span>{item.brand}</span>
                        </div>
                      </td>
                      <td className="px-3 py-3 text-center font-bold text-gray-600 border-r border-gray-50">{item.quantity}</td>
                      <td className="px-3 py-3 text-right font-bold text-gray-600 border-r border-gray-50">{item.price.toFixed(2)}</td>
                      <td className="px-3 py-3 text-right text-gray-500 border-r border-gray-50">{item.igst.toFixed(2)}</td>
                      <td className="px-3 py-3 text-right text-gray-500 border-r border-gray-50">{item.cgst.toFixed(2)}</td>
                      <td className="px-3 py-3 text-right text-gray-500 border-r border-gray-50">{item.sgst.toFixed(2)}</td>
                      <td className="px-3 py-3 text-right font-bold text-indigo-600 border-r border-gray-50">{item.amount.toFixed(2)}</td>
                      <td className="px-3 py-3 text-right font-black text-indigo-900 border-r border-gray-50">{item.total.toFixed(2)}</td>
                      <td className="px-3 py-3 text-center">
                        <button 
                          onClick={() => removeItem(idx)}
                          className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded transition-all"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Card 5: Quotation Summary */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          <div className="flex items-center gap-2 mb-8">
            <Calculator className="w-4 h-4 text-gray-400" />
            <h2 className="text-[12px] font-bold text-gray-600 uppercase tracking-tight">Quotation Summary</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-6 text-center">
              <div className="text-[10px] font-black text-indigo-400 uppercase mb-2 tracking-widest">% IGST</div>
              <div className="text-xl font-black text-indigo-700">{summary.totalIgst.toFixed(2)}</div>
            </div>
            <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-6 text-center">
              <div className="text-[10px] font-black text-indigo-400 uppercase mb-2 tracking-widest">% CGST</div>
              <div className="text-xl font-black text-indigo-700">{summary.totalCgst.toFixed(2)}</div>
            </div>
            <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-6 text-center">
              <div className="text-[10px] font-black text-indigo-400 uppercase mb-2 tracking-widest">% SGST</div>
              <div className="text-xl font-black text-indigo-700">{summary.totalSgst.toFixed(2)}</div>
            </div>
            <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-6 text-center">
              <div className="text-[10px] font-black text-indigo-400 uppercase mb-2 tracking-widest">Amount (Excl GST)</div>
              <div className="text-xl font-black text-indigo-700">{summary.amountExclGst.toFixed(2)}</div>
            </div>
            <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-6 text-center">
              <div className="text-[10px] font-black text-indigo-400 uppercase mb-2 tracking-widest">Round Off</div>
              <div className="text-xl font-black text-indigo-700">{(Math.round(summary.totalAmount) - summary.totalAmount).toFixed(2)}</div>
            </div>
            <div className="bg-cyan-500 rounded-xl p-6 text-center shadow-lg shadow-cyan-100">
              <div className="text-[10px] font-black text-white/90 uppercase mb-2 tracking-widest">$ Total Amount</div>
              <div className="text-xl font-black text-white">{Math.round(summary.totalAmount).toFixed(2)}</div>
            </div>
          </div>
          
          <div className="mt-12 flex justify-center">
            <button 
              onClick={handleCreateQuotation}
              disabled={loading}
              className="px-16 py-4 bg-[#00d4ff] text-white text-[12px] font-black rounded-full shadow-xl shadow-cyan-100 hover:bg-[#00c4ef] transition-all uppercase tracking-[0.2em] flex items-center gap-3 disabled:opacity-50"
            >
              {loading ? <RefreshCw className="w-5 h-5 animate-spin" /> : <CheckCircle className="w-5 h-5" />}
              {loading ? 'Processing...' : 'Create Quotation'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

