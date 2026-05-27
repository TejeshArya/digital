import React, { useState, useEffect } from 'react';
import {
  ShoppingCart, Search, Info, Calendar, User, FileText,
  Trash2, Edit, Package, DollarSign, Calculator, Upload,
  Plus, ChevronDown, CheckCircle, AlertCircle
} from 'lucide-react';

interface PurchaseItem {
  id?: number;
  category: string;
  subcategory: string;
  brand: string;
  description: string;
  capacity: string;
  hsn: string;
  denom: string;
  quantity: number;
  mrp: number;
  costRate: number;
  sellPrice: number;
  serialNo: string;
  expiryDate: string;
  location: string;
  purchaseType: string;
  igst: number;
  cgst: number;
  sgst: number;
  amount: number;
  total: number;
}

export function Purchase() {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [subcategories, setSubcategories] = useState<any[]>([]);
  const [brands, setBrands] = useState<any[]>([]);
  const [denominations, setDenominations] = useState<any[]>([]);
  const [locations, setLocations] = useState<any[]>([]);
  const [posts, setPosts] = useState<any[]>([]);
  const [items, setItems] = useState<PurchaseItem[]>([]);
  const [invoiceFile, setInvoiceFile] = useState<File | null>(null);

  // Header State
  const [header, setHeader] = useState({
    designation: '',
    expenseType: 'DE',
    companyName: '',
    invoiceNo: '',
    invoiceDate: new Date().toISOString().split('T')[0],
    panCard: ''
  });

  // Item Input State
  const [itemInput, setItemInput] = useState({
    category: '',
    subcategory: '',
    brand: '',
    description: '',
    capacity: '',
    hsn: '',
    denom: '',
    quantity: 1,
    mrp: 0,
    costRate: 0,
    sellPrice: 0,
    serialNo: '',
    expiryDate: '',
    location: '',
    purchaseType: 'Stock'
  });

  useEffect(() => {
    fetchMasters();
  }, []);

  const fetchMasters = async () => {
    try {
      const fetchCat = (cat: string) => fetch(`https://dee-backend-7x0g.onrender.com/api/MasterData/category/${cat}`).then(r => r.json());
      
      const [catList, subCatList, brandList, denomList, locList, postList] = await Promise.all([
        fetchCat('Category'),
        fetchCat('Sub Category'),
        fetchCat('Brand'),
        fetchCat('Denom'),
        fetchCat('Location'),
        fetchCat('Post')
      ]);

      setCategories(catList);
      setSubcategories(subCatList);
      setBrands(brandList);
      setDenominations(denomList);
      setLocations(locList);
      setPosts(postList);
    } catch (err) {
      console.error('Master fetch error:', err);
    }
  };

  const handleHeaderChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setHeader(prev => ({ ...prev, [name]: value }));
  };

  const handleItemInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setItemInput(prev => ({ ...prev, [name]: value }));
  };

  const handleAddItem = () => {
    if (!itemInput.description || itemInput.quantity <= 0 || itemInput.costRate <= 0) {
      alert('Please fill in required item details (Description, Qty, Cost Rate)');
      return;
    }

    const amount = itemInput.quantity * itemInput.costRate;
    const igst = amount * 0.18; // Default 18%
    const total = amount + igst;

    const newItem: PurchaseItem = {
      ...itemInput,
      quantity: Number(itemInput.quantity),
      mrp: Number(itemInput.mrp),
      costRate: Number(itemInput.costRate),
      sellPrice: Number(itemInput.sellPrice),
      igst: Number(igst.toFixed(2)),
      cgst: 0,
      sgst: 0,
      amount: Number(amount.toFixed(2)),
      total: Number(total.toFixed(2))
    };

    setItems(prev => [...prev, newItem]);
    // Reset item input
    setItemInput(prev => ({
      ...prev,
      description: '',
      serialNo: '',
      quantity: 1,
      costRate: 0,
      mrp: 0,
      sellPrice: 0
    }));
  };

  const handleRemoveItem = (index: number) => {
    setItems(prev => prev.filter((_, i) => i !== index));
  };

  // Totals
  const totalAmountExclGst = items.reduce((sum, item) => sum + item.amount, 0);
  const totalIgst = items.reduce((sum, item) => sum + item.igst, 0);
  const totalCgst = items.reduce((sum, item) => sum + item.cgst, 0);
  const totalSgst = items.reduce((sum, item) => sum + item.sgst, 0);
  const grandTotal = totalAmountExclGst + totalIgst + totalCgst + totalSgst;
  const roundOff = Math.round(grandTotal) - grandTotal;
  const finalTotal = Math.round(grandTotal);

  const handleSaveInvoice = async () => {
    if (!header.companyName || items.length === 0) {
      alert('Please fill in company name and add at least one item.');
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      const payload = {
        ...header,
        totalIgst,
        totalCgst,
        totalSgst,
        amountExclGst: totalAmountExclGst,
        roundOff: Number(roundOff.toFixed(2)),
        totalAmount: finalTotal,
        items: items
      };

      formData.append('data', JSON.stringify(payload));
      if (invoiceFile) {
        formData.append('file', invoiceFile);
      }

      const response = await fetch('https://dee-backend-7x0g.onrender.com/api/purchaseinvoices', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        alert('Purchase invoice saved successfully!');
        // Reset everything
        setItems([]);
        setHeader({
          designation: '',
          expenseType: 'DE',
          companyName: '',
          invoiceNo: '',
          invoiceDate: new Date().toISOString().split('T')[0],
          panCard: ''
        });
        setInvoiceFile(null);
      } else {
        const err = await response.json();
        alert('Failed to save invoice: ' + (err.message || 'Server error'));
      }
    } catch (err) {
      console.error('Save error:', err);
      alert('Error connecting to server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-[#f8f9fc] min-h-screen font-sans">
      {/* Header */}
      <div className="bg-[#0061f2] p-4 rounded-t-lg shadow-md mb-1">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-2 rounded-lg">
            <ShoppingCart className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-white font-bold text-sm uppercase tracking-widest">Purchase Invoice Entry</h1>
            <p className="text-blue-100 text-[10px] font-medium uppercase tracking-tight">Record new stock acquisitions and tax details</p>
          </div>
        </div>
      </div>

      <div className="space-y-4 mt-4">
        {/* Section 1: General Invoice Info */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-8 gap-y-6">
            <div className="lg:col-span-2 space-y-1.5">
              <label className="block text-[11px] font-black text-gray-400 uppercase tracking-tight">Post/Designation <span className="text-red-500">*</span></label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                <select name="designation" value={header.designation} onChange={handleHeaderChange} className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-400 font-bold text-gray-700">
                  <option value="">Search & select post...</option>
                  {posts.map((p: any) => <option key={p.id} value={p.value}>{p.value}</option>)}
                </select>
              </div>
            </div>

            <div className="lg:col-span-2 space-y-1.5">
              <label className="block text-[11px] font-black text-gray-400 uppercase tracking-tight">Expense Type</label>
              <div className="flex gap-6 mt-2">
                {['DE', 'IDE', 'Credit'].map((type) => (
                  <label key={type} className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="radio"
                      name="expenseType"
                      value={type}
                      checked={header.expenseType === type}
                      onChange={handleHeaderChange}
                      className="w-4 h-4 text-blue-600 focus:ring-blue-400"
                    />
                    <span className="text-[11px] font-bold text-gray-500 group-hover:text-blue-600 uppercase transition-colors">{type}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-[11px] font-black text-gray-400 uppercase tracking-tight">Company Name & GST</label>
              <input type="text" name="companyName" value={header.companyName} onChange={handleHeaderChange} className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-400 font-bold" />
            </div>
            <div className="space-y-1.5">
              <label className="block text-[11px] font-black text-gray-400 uppercase tracking-tight">Invoice No</label>
              <input type="text" name="invoiceNo" value={header.invoiceNo} onChange={handleHeaderChange} className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-400" />
            </div>
            <div className="space-y-1.5 relative">
              <label className="block text-[11px] font-black text-gray-400 uppercase tracking-tight">Invoice Date</label>
              <div className="relative">
                <input type="date" name="invoiceDate" value={header.invoiceDate} onChange={handleHeaderChange} className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded text-sm text-gray-700 focus:outline-none focus:border-blue-400" />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="block text-[11px] font-black text-gray-400 uppercase tracking-tight">PAN Card</label>
              <input type="text" name="panCard" value={header.panCard} onChange={handleHeaderChange} className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-400" />
            </div>
          </div>
        </div>

        {/* Section 2: Item Entry Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-start">
          {/* Add Item Form */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <Package className="w-4 h-4 text-blue-500" />
              <h2 className="text-[11px] font-black text-gray-700 uppercase tracking-widest">Add Item to Invoice</h2>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-gray-400 uppercase">Category</label>
                <select
                  name="category"
                  value={itemInput.category}
                  onChange={handleItemInputChange}
                  className="w-full px-2 py-2 border border-gray-100 rounded text-xs focus:outline-none"
                >
                  <option value="">Select Category</option>
                  {categories.map((c: any) => <option key={c.id} value={c.value}>{c.value}</option>)}
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-gray-400 uppercase">Subcategory</label>
                <select 
                  name="subcategory" 
                  value={itemInput.subcategory} 
                  onChange={handleItemInputChange} 
                  className="w-full px-2 py-2 border border-gray-100 rounded text-xs focus:outline-none"
                >
                  <option value="">Select Subcategory</option>
                  {subcategories
                    .filter(s => {
                      const selectedCat = categories.find(c => c.value === itemInput.category);
                      return !itemInput.category || s.parentId === selectedCat?.id;
                    })
                    .map((s: any) => <option key={s.id} value={s.value}>{s.value}</option>)
                  }
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[9px] font-bold text-gray-400 uppercase">Brand</label>
              <select 
                name="brand" 
                value={itemInput.brand} 
                onChange={handleItemInputChange} 
                className="w-full px-2 py-2 border border-gray-100 rounded text-xs focus:outline-none"
              >
                <option value="">Select Brand</option>
                {brands.map((b: any) => <option key={b.id} value={b.value}>{b.value}</option>)}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[9px] font-bold text-gray-400 uppercase">Description</label>
              <textarea name="description" value={itemInput.description} onChange={handleItemInputChange} rows={2} className="w-full px-2 py-2 border border-gray-100 rounded text-xs focus:outline-none resize-none" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-gray-400 uppercase">Capacity</label>
                <input type="text" name="capacity" value={itemInput.capacity} onChange={handleItemInputChange} className="w-full px-2 py-2 border border-gray-100 rounded text-xs focus:outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-gray-400 uppercase">HSN</label>
                <input type="text" name="hsn" value={itemInput.hsn} onChange={handleItemInputChange} className="w-full px-2 py-2 border border-gray-100 rounded text-xs focus:outline-none" />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-gray-400 uppercase">Denom</label>
                <select 
                  name="denom" 
                  value={itemInput.denom} 
                  onChange={handleItemInputChange} 
                  className="w-full px-2 py-2 border border-gray-100 rounded text-xs focus:outline-none"
                >
                  <option value="">Select Denom</option>
                  {denominations.map((d: any) => <option key={d.id} value={d.value}>{d.value}</option>)}
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-gray-400 uppercase">Qty</label>
                <input type="number" name="quantity" value={itemInput.quantity} onChange={handleItemInputChange} className="w-full px-2 py-2 border border-gray-100 rounded text-xs focus:outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-gray-400 uppercase">MRP</label>
                <input type="number" name="mrp" value={itemInput.mrp} onChange={handleItemInputChange} className="w-full px-2 py-2 border border-gray-100 rounded text-xs focus:outline-none" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-gray-400 uppercase">Cost Rate</label>
                <input type="number" name="costRate" value={itemInput.costRate} onChange={handleItemInputChange} className="w-full px-2 py-2 border border-gray-100 rounded text-xs focus:outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-gray-400 uppercase">Sell Price</label>
                <input type="number" name="sellPrice" value={itemInput.sellPrice} onChange={handleItemInputChange} className="w-full px-2 py-2 border border-gray-100 rounded text-xs focus:outline-none" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-gray-400 uppercase">Serial No</label>
                <input type="text" name="serialNo" value={itemInput.serialNo} onChange={handleItemInputChange} className="w-full px-2 py-2 border border-gray-100 rounded text-xs focus:outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-gray-400 uppercase">Expiry Date</label>
                <input type="date" name="expiryDate" value={itemInput.expiryDate} onChange={handleItemInputChange} className="w-full px-2 py-2 border border-gray-100 rounded text-xs focus:outline-none" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-gray-400 uppercase">Location</label>
                <select 
                  name="location" 
                  value={itemInput.location} 
                  onChange={handleItemInputChange} 
                  className="w-full px-2 py-2 border border-gray-100 rounded text-xs focus:outline-none"
                >
                  <option value="">Select Location</option>
                  {locations.map((l: any) => <option key={l.id} value={l.value}>{l.value}</option>)}
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-gray-400 uppercase">Type</label>
                <div className="flex gap-2 mt-1">
                  {['Stock', 'Ecom'].map(t => (
                    <label key={t} className="flex items-center gap-1 text-[8px] font-bold text-gray-400 uppercase cursor-pointer">
                      <input
                        type="radio"
                        name="purchaseType"
                        value={t}
                        checked={itemInput.purchaseType === t}
                        onChange={handleItemInputChange}
                        className="w-3 h-3"
                      /> {t}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={handleAddItem}
              className="w-full py-3 bg-[#0061f2] text-white text-[10px] font-black rounded shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all uppercase tracking-[0.2em] flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" /> Add Item
            </button>
          </div>

          {/* Items Table Area */}
          <div className="lg:col-span-3 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col min-h-[600px]">
            <div className="bg-[#2e59d9] p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calculator className="w-4 h-4 text-white" />
                <h2 className="text-white font-black text-[11px] uppercase tracking-widest">Tax Details of Each Item</h2>
              </div>
              <span className="text-[10px] text-blue-100 font-bold bg-white/10 px-3 py-1 rounded-full uppercase">Items Added: {items.length}</span>
            </div>

            <div className="flex-1 overflow-x-auto">
              <table className="w-full text-[10px] border-collapse">
                <thead>
                  <tr className="bg-gray-50/80 text-gray-600 uppercase border-b border-gray-100">
                    <th className="px-3 py-4 text-left font-black border-r border-gray-100">#</th>
                    <th className="px-3 py-4 text-left font-black border-r border-gray-100">Description</th>
                    <th className="px-3 py-4 text-center font-black border-r border-gray-100">Capacity</th>
                    <th className="px-3 py-4 text-center font-black border-r border-gray-100">HSN</th>
                    <th className="px-3 py-4 text-center font-black border-r border-gray-100">Denom</th>
                    <th className="px-3 py-4 text-center font-black border-r border-gray-100">Qty</th>
                    <th className="px-3 py-4 text-right font-black border-r border-gray-100">Cost Price</th>
                    <th className="px-3 py-4 text-center font-black border-r border-gray-100">IGST</th>
                    <th className="px-3 py-4 text-center font-black border-r border-gray-100">CGST</th>
                    <th className="px-3 py-4 text-center font-black border-r border-gray-100">SGST</th>
                    <th className="px-3 py-4 text-right font-black border-r border-gray-100">Amount</th>
                    <th className="px-3 py-4 text-right font-black border-r border-gray-100">Total</th>
                    <th className="px-3 py-4 text-center font-black">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {items.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50/50 transition-colors group">
                      <td className="px-3 py-5 border-r border-gray-50 text-gray-400 font-bold">{index + 1}</td>
                      <td className="px-3 py-5 border-r border-gray-50 text-gray-700 font-bold uppercase">{item.description}</td>
                      <td className="px-3 py-5 border-r border-gray-50 text-center text-gray-500 uppercase">{item.capacity || 'N/A'}</td>
                      <td className="px-3 py-5 border-r border-gray-50 text-center text-gray-500">{item.hsn}</td>
                      <td className="px-3 py-5 border-r border-gray-50 text-center text-gray-500">{item.denom}</td>
                      <td className="px-3 py-5 border-r border-gray-50 text-center font-bold text-gray-800">{item.quantity}</td>
                      <td className="px-3 py-5 border-r border-gray-50 text-right font-bold text-gray-600">{item.costRate.toFixed(2)}</td>
                      <td className="px-3 py-5 border-r border-gray-50 text-center"><span className="bg-indigo-50 text-indigo-600 font-bold px-2 py-0.5 rounded">{item.igst.toFixed(2)}</span></td>
                      <td className="px-3 py-5 border-r border-gray-50 text-center"><span className="bg-blue-50 text-blue-600 font-bold px-2 py-0.5 rounded">{item.cgst.toFixed(2)}</span></td>
                      <td className="px-3 py-5 border-r border-gray-50 text-center"><span className="bg-emerald-50 text-emerald-600 font-bold px-2 py-0.5 rounded">{item.sgst.toFixed(2)}</span></td>
                      <td className="px-3 py-5 border-r border-gray-50 text-right font-bold text-gray-700">{item.amount.toFixed(2)}</td>
                      <td className="px-3 py-5 border-r border-gray-50 text-right font-black text-blue-600">{item.total.toFixed(2)}</td>
                      <td className="px-3 py-5">
                        <div className="flex justify-center gap-1.5">
                          <button
                            onClick={() => handleRemoveItem(index)}
                            className="p-1.5 bg-red-50 text-red-600 rounded hover:bg-red-100 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {items.length === 0 && (
                    <tr>
                      <td colSpan={13} className="py-20 text-center text-gray-300 font-bold uppercase tracking-widest italic">No items added to invoice</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Section 3: Summary & Finalization */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
            <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
              <div className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">IGST Total</div>
              <div className="text-xl font-bold text-gray-700">{totalIgst.toFixed(2)}</div>
            </div>
            <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
              <div className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">CGST Total</div>
              <div className="text-xl font-bold text-gray-700">{totalCgst.toFixed(2)}</div>
            </div>
            <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
              <div className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">SGST Total</div>
              <div className="text-xl font-bold text-gray-700">{totalSgst.toFixed(2)}</div>
            </div>
            <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
              <div className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Amount (Excl GST)</div>
              <div className="text-xl font-bold text-gray-700">{totalAmountExclGst.toFixed(2)}</div>
            </div>
            <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
              <div className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Round Off</div>
              <div className="text-xl font-bold text-gray-700">{roundOff.toFixed(2)}</div>
            </div>
            <div className="bg-emerald-500 rounded-xl p-5 shadow-lg shadow-emerald-100 flex flex-col justify-center">
              <div className="text-[9px] font-black text-white/80 uppercase tracking-widest mb-1">Actual Paid (Incl GST)</div>
              <div className="text-2xl font-black text-white">₹ {finalTotal.toFixed(2)}</div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-4 border-t border-gray-50">
            <div className="flex items-center gap-4 bg-gray-50/50 p-4 rounded-2xl border border-dashed border-gray-200 w-full max-w-md">
              <div className="bg-white p-3 rounded-xl shadow-sm">
                <Upload className="w-5 h-5 text-blue-500" />
              </div>
              <div className="flex-1">
                <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Upload Invoice File</div>
                <div className="flex items-center gap-2">
                  <input
                    type="file"
                    id="invoice-upload"
                    className="hidden"
                    onChange={(e) => setInvoiceFile(e.target.files?.[0] || null)}
                  />
                  <label htmlFor="invoice-upload" className="text-[10px] font-bold text-blue-600 hover:underline cursor-pointer">
                    {invoiceFile ? 'Change File' : 'Choose File'}
                  </label>
                  <span className="text-[10px] text-gray-300 font-medium italic">
                    {invoiceFile ? invoiceFile.name : 'No file chosen'}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={handleSaveInvoice}
              disabled={loading}
              className={`px-12 py-4 ${loading ? 'bg-gray-400' : 'bg-rose-600 hover:bg-rose-700'} text-white text-[12px] font-black rounded-full shadow-xl shadow-rose-100 transition-all uppercase tracking-[0.2em] flex items-center gap-3`}
            >
              <CheckCircle className="w-5 h-5" />
              {loading ? 'Processing...' : 'Add Invoice In Stock'}
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center text-[10px] text-gray-400 font-bold tracking-[0.2em] uppercase">
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
