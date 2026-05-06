import React, { useState } from 'react';
import { 
  ShoppingCart, Search, Info, Calendar, User, FileText, 
  Trash2, Edit, Package, DollarSign, Calculator, Upload,
  Plus, ChevronDown, CheckCircle, AlertCircle
} from 'lucide-react';

export function Purchase() {
  const [items, setItems] = useState([
    {
      id: 1,
      description: 'CABLE TRAY 200MM',
      capacity: 'N/A',
      hsn: '7308',
      denom: 'NOS',
      qty: 10,
      costPrice: '450.00',
      igst: '18%',
      cgst: '0%',
      sgst: '0%',
      amount: '4500.00',
      total: '5310.00',
      mrp: '600.00'
    }
  ]);

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
                <input type="text" placeholder="Search & select post..." className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-400" />
              </div>
            </div>
            
            <div className="lg:col-span-2 space-y-1.5">
              <label className="block text-[11px] font-black text-gray-400 uppercase tracking-tight">Expense Type</label>
              <div className="flex gap-6 mt-2">
                {['DE', 'IDE', 'Credit'].map((type) => (
                  <label key={type} className="flex items-center gap-2 cursor-pointer group">
                    <input type="radio" name="expenseType" className="w-4 h-4 text-blue-600 focus:ring-blue-400" />
                    <span className="text-[11px] font-bold text-gray-500 group-hover:text-blue-600 uppercase transition-colors">{type}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-[11px] font-black text-gray-400 uppercase tracking-tight">Company Name & GST</label>
              <input type="text" className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-400" />
            </div>
            <div className="space-y-1.5">
              <label className="block text-[11px] font-black text-gray-400 uppercase tracking-tight">Invoice No</label>
              <input type="text" className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-400" />
            </div>
            <div className="space-y-1.5 relative">
              <label className="block text-[11px] font-black text-gray-400 uppercase tracking-tight">Invoice Date</label>
              <div className="relative">
                <input type="date" className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded text-sm text-gray-400 focus:outline-none focus:border-blue-400" />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="block text-[11px] font-black text-gray-400 uppercase tracking-tight">PAN Card</label>
              <input type="text" className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-400" />
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
                <select className="w-full px-2 py-2 border border-gray-100 rounded text-xs focus:outline-none">
                  <option>Select</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-gray-400 uppercase">Subcategory</label>
                <select className="w-full px-2 py-2 border border-gray-100 rounded text-xs focus:outline-none">
                  <option>Select</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[9px] font-bold text-gray-400 uppercase">Brand</label>
              <input type="text" className="w-full px-2 py-2 border border-gray-100 rounded text-xs focus:outline-none" />
            </div>

            <div className="space-y-1">
              <label className="text-[9px] font-bold text-gray-400 uppercase">Description</label>
              <textarea rows={2} className="w-full px-2 py-2 border border-gray-100 rounded text-xs focus:outline-none resize-none" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-gray-400 uppercase">Capacity</label>
                <input type="text" className="w-full px-2 py-2 border border-gray-100 rounded text-xs focus:outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-gray-400 uppercase">HSN</label>
                <select className="w-full px-2 py-2 border border-gray-100 rounded text-xs focus:outline-none">
                  <option>Select</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-gray-400 uppercase">Denom</label>
                <select className="w-full px-2 py-2 border border-gray-100 rounded text-xs focus:outline-none">
                  <option>Select</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-gray-400 uppercase">Qty</label>
                <input type="text" className="w-full px-2 py-2 border border-gray-100 rounded text-xs focus:outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-gray-400 uppercase">MRP</label>
                <input type="text" className="w-full px-2 py-2 border border-gray-100 rounded text-xs focus:outline-none" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-gray-400 uppercase">Cost Rate</label>
                <input type="text" className="w-full px-2 py-2 border border-gray-100 rounded text-xs focus:outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-gray-400 uppercase">Sell Price</label>
                <input type="text" className="w-full px-2 py-2 border border-gray-100 rounded text-xs focus:outline-none" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-gray-400 uppercase">Serial No</label>
                <input type="text" className="w-full px-2 py-2 border border-gray-100 rounded text-xs focus:outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-gray-400 uppercase">Expiry Date</label>
                <input type="date" className="w-full px-2 py-2 border border-gray-100 rounded text-xs focus:outline-none" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-gray-400 uppercase">Location</label>
                <input type="text" className="w-full px-2 py-2 border border-gray-100 rounded text-xs focus:outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-gray-400 uppercase">Type</label>
                <div className="flex gap-2 mt-1">
                  <label className="flex items-center gap-1 text-[8px] font-bold text-gray-400 uppercase cursor-pointer">
                    <input type="radio" name="purchaseType" className="w-3 h-3" /> Stock
                  </label>
                  <label className="flex items-center gap-1 text-[8px] font-bold text-gray-400 uppercase cursor-pointer">
                    <input type="radio" name="purchaseType" className="w-3 h-3" /> Ecom
                  </label>
                </div>
              </div>
            </div>

            <button className="w-full py-3 bg-[#0061f2] text-white text-[10px] font-black rounded shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all uppercase tracking-[0.2em] flex items-center justify-center gap-2">
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
                      <td className="px-3 py-5 border-r border-gray-50 text-center text-gray-500 uppercase">{item.capacity}</td>
                      <td className="px-3 py-5 border-r border-gray-50 text-center text-gray-500">{item.hsn}</td>
                      <td className="px-3 py-5 border-r border-gray-50 text-center text-gray-500">{item.denom}</td>
                      <td className="px-3 py-5 border-r border-gray-50 text-center font-bold text-gray-800">{item.qty}</td>
                      <td className="px-3 py-5 border-r border-gray-50 text-right font-bold text-gray-600">{item.costPrice}</td>
                      <td className="px-3 py-5 border-r border-gray-50 text-center"><span className="bg-indigo-50 text-indigo-600 font-bold px-2 py-0.5 rounded">{item.igst}</span></td>
                      <td className="px-3 py-5 border-r border-gray-50 text-center"><span className="bg-blue-50 text-blue-600 font-bold px-2 py-0.5 rounded">{item.cgst}</span></td>
                      <td className="px-3 py-5 border-r border-gray-50 text-center"><span className="bg-emerald-50 text-emerald-600 font-bold px-2 py-0.5 rounded">{item.sgst}</span></td>
                      <td className="px-3 py-5 border-r border-gray-50 text-right font-bold text-gray-700">{item.amount}</td>
                      <td className="px-3 py-5 border-r border-gray-50 text-right font-black text-blue-600">{item.total}</td>
                      <td className="px-3 py-5">
                        <div className="flex justify-center gap-1.5">
                          <button className="p-1.5 bg-orange-50 text-orange-600 rounded hover:bg-orange-100 transition-colors"><Edit className="w-3.5 h-3.5" /></button>
                          <button className="p-1.5 bg-red-50 text-red-600 rounded hover:bg-red-100 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
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
              <div className="text-xl font-bold text-gray-700">0.00</div>
            </div>
            <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
              <div className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">CGST Total</div>
              <div className="text-xl font-bold text-gray-700">0.00</div>
            </div>
            <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
              <div className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">SGST Total</div>
              <div className="text-xl font-bold text-gray-700">0.00</div>
            </div>
            <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
              <div className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Amount (Excl GST)</div>
              <div className="text-xl font-bold text-gray-700">0.00</div>
            </div>
            <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
              <div className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Round Off</div>
              <input type="text" placeholder="0.00" className="w-full bg-transparent text-xl font-bold text-gray-700 focus:outline-none placeholder:text-gray-300" />
            </div>
            <div className="bg-emerald-500 rounded-xl p-5 shadow-lg shadow-emerald-100 flex flex-col justify-center">
              <div className="text-[9px] font-black text-white/80 uppercase tracking-widest mb-1">Actual Paid (Incl GST)</div>
              <div className="text-2xl font-black text-white">₹ 0.00</div>
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
                  <button className="text-[10px] font-bold text-blue-600 hover:underline">Choose File</button>
                  <span className="text-[10px] text-gray-300 font-medium italic">No file chosen</span>
                </div>
              </div>
            </div>
            
            <button className="px-12 py-4 bg-rose-600 text-white text-[12px] font-black rounded-full shadow-xl shadow-rose-100 hover:bg-rose-700 transition-all uppercase tracking-[0.2em] flex items-center gap-3">
              <CheckCircle className="w-5 h-5" /> Add Invoice In Stock
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center text-[10px] text-gray-400 font-bold tracking-[0.2em] uppercase">
        <p>Copyright © Your Website 2021</p>
        <div className="flex gap-4">
          <a href="#" className="hover:underline">Privacy Policy</a>
          <span>•</span>
          <a href="#" className="hover:underline">Terms & Conditions</a>
        </div>
      </div>
    </div>
  );
}
