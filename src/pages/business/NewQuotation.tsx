import React, { useState } from 'react';
import { 
  Plus, ArrowLeft, FileText, Layout, ChevronDown, Trash2, 
  Settings, ShoppingCart, Calculator, CheckCircle, Info
} from 'lucide-react';

export function NewQuotation() {
  const [items, setItems] = useState([]);

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
        <button className="flex items-center gap-2 px-3 py-1.5 bg-white/10 text-white text-[10px] font-bold rounded uppercase hover:bg-white/20 transition-colors border border-white/20">
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
            <label className="flex items-center gap-4 p-4 border border-gray-100 rounded-xl hover:bg-indigo-50 cursor-pointer transition-colors group">
              <input type="radio" name="expenseType" className="w-4 h-4 text-indigo-600 focus:ring-indigo-500" />
              <span className="text-sm font-bold text-gray-500 group-hover:text-indigo-600 uppercase tracking-tight">Direct Expenses (DE)</span>
            </label>
            <label className="flex items-center gap-4 p-4 border border-gray-100 rounded-xl hover:bg-indigo-50 cursor-pointer transition-colors group">
              <input type="radio" name="expenseType" className="w-4 h-4 text-indigo-600 focus:ring-indigo-500" />
              <span className="text-sm font-bold text-gray-500 group-hover:text-indigo-600 uppercase tracking-tight">Indirect Expenses (IDE)</span>
            </label>
          </div>
        </div>

        {/* Card 2: Quotation Details */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-2 mb-6">
            <Info className="w-4 h-4 text-gray-400" />
            <h2 className="text-[12px] font-bold text-gray-600 uppercase tracking-tight">Quotation Details</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-x-6 gap-y-5">
            <div className="space-y-1">
              <input type="text" placeholder="Company Name" className="w-full px-3 py-2 bg-white border border-gray-200 rounded text-sm focus:outline-none focus:border-indigo-400 placeholder:text-gray-300" />
            </div>
            <div className="space-y-1">
              <input type="text" placeholder="Project Name" className="w-full px-3 py-2 bg-white border border-gray-200 rounded text-sm focus:outline-none focus:border-indigo-400 placeholder:text-gray-300" />
            </div>
            <div className="space-y-1 relative">
              <div className="absolute -top-3 left-2 px-1 bg-white text-[9px] font-bold text-indigo-400 uppercase tracking-tighter">Invoice Date</div>
              <input type="date" className="w-full px-3 py-2 bg-gray-50 border border-gray-100 rounded text-sm text-gray-400 focus:outline-none" />
            </div>
            <div className="space-y-1">
              <select className="w-full px-3 py-2 bg-gray-50 border border-gray-100 rounded text-sm text-gray-400 focus:outline-none appearance-none">
                <option>BQ Template</option>
              </select>
            </div>
            
            <input type="text" placeholder="Validity Days" className="w-full px-3 py-2 bg-white border border-gray-200 rounded text-sm focus:outline-none placeholder:text-gray-300" />
            <input type="text" placeholder="Delivery Days" className="w-full px-3 py-2 bg-white border border-gray-200 rounded text-sm focus:outline-none placeholder:text-gray-300" />
            <input type="text" placeholder="Warranty Days" className="w-full px-3 py-2 bg-white border border-gray-200 rounded text-sm focus:outline-none placeholder:text-gray-300" />
            <input type="text" placeholder="Inquiry No" className="w-full px-3 py-2 bg-white border border-gray-200 rounded text-sm focus:outline-none placeholder:text-gray-300" />
            
            <div className="space-y-1 relative md:col-span-1">
              <div className="absolute -top-3 left-2 px-1 bg-white text-[9px] font-bold text-indigo-400 uppercase tracking-tighter">Inquiry Date</div>
              <input type="date" className="w-full px-3 py-2 bg-white border border-gray-200 rounded text-sm text-gray-400 focus:outline-none" />
            </div>
            <input type="text" placeholder="Remarks" className="w-full px-3 py-2 bg-white border border-gray-200 rounded text-sm focus:outline-none placeholder:text-gray-300 md:col-span-2" />
            <select className="w-full px-3 py-2 bg-white border border-gray-200 rounded text-sm text-gray-400 focus:outline-none">
              <option>GST Type</option>
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
            
            <select className="w-full px-3 py-2 bg-white border border-gray-200 rounded text-sm text-gray-400">
              <option>Category</option>
            </select>
            <select className="w-full px-3 py-2 bg-white border border-gray-200 rounded text-sm text-gray-400">
              <option>Subcategory</option>
            </select>
            <input type="text" placeholder="Brand" className="w-full px-3 py-2 bg-white border border-gray-200 rounded text-sm placeholder:text-gray-300" />
            <textarea placeholder="Description" rows={3} className="w-full px-3 py-2 bg-white border border-gray-200 rounded text-sm placeholder:text-gray-300 resize-none" />
            <input type="text" placeholder="Capacity" className="w-full px-3 py-2 bg-white border border-gray-200 rounded text-sm placeholder:text-gray-300" />
            <select className="w-full px-3 py-2 bg-white border border-gray-200 rounded text-sm text-gray-400">
              <option>HSN Code</option>
            </select>
            <select className="w-full px-3 py-2 bg-white border border-gray-200 rounded text-sm text-gray-400">
              <option>Denomination</option>
            </select>
            <div className="grid grid-cols-2 gap-4">
              <input type="text" placeholder="Quantity" className="w-full px-3 py-2 bg-white border border-gray-200 rounded text-sm placeholder:text-gray-300" />
              <input type="text" placeholder="Price" className="w-full px-3 py-2 bg-white border border-gray-200 rounded text-sm placeholder:text-gray-300" />
            </div>
            
            <button className="w-full py-2.5 bg-[#a294e3] text-white text-[11px] font-bold rounded shadow-md hover:bg-[#8e7fcf] transition-all uppercase tracking-widest flex items-center justify-center gap-2">
              <Plus className="w-3.5 h-3.5" /> Add Item
            </button>
          </div>

          {/* Table Area */}
          <div className="lg:col-span-3 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col min-h-[500px]">
            <div className="bg-[#8370cc] p-3 flex items-center justify-center gap-2">
              <Layout className="w-4 h-4 text-white" />
              <h2 className="text-white font-bold text-[11px] uppercase tracking-wider">Quotation Items</h2>
            </div>
            <div className="flex-1 overflow-x-auto">
              <table className="w-full text-[10px] border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100 text-gray-600">
                    <th className="px-3 py-4 text-left font-bold border-r border-gray-100 uppercase">S.No</th>
                    <th className="px-3 py-4 text-left font-bold border-r border-gray-100 uppercase">Description</th>
                    <th className="px-3 py-4 text-left font-bold border-r border-gray-100 uppercase">Capacity</th>
                    <th className="px-3 py-4 text-left font-bold border-r border-gray-100 uppercase">HSN</th>
                    <th className="px-3 py-4 text-left font-bold border-r border-gray-100 uppercase">Denom</th>
                    <th className="px-3 py-4 text-center font-bold border-r border-gray-100 uppercase">Qty</th>
                    <th className="px-3 py-4 text-right font-bold border-r border-gray-100 uppercase">Price</th>
                    <th className="px-3 py-4 text-right font-bold border-r border-gray-100 uppercase">IGST</th>
                    <th className="px-3 py-4 text-right font-bold border-r border-gray-100 uppercase">CGST</th>
                    <th className="px-3 py-4 text-right font-bold border-r border-gray-100 uppercase">SGST</th>
                    <th className="px-3 py-4 text-right font-bold border-r border-gray-100 uppercase">Amount</th>
                    <th className="px-3 py-4 text-right font-bold border-r border-gray-100 uppercase whitespace-nowrap">Total</th>
                    <th className="px-3 py-4 text-center font-bold uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 italic text-gray-300">
                  {/* Empty state placeholder rows could go here */}
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
              <div className="text-xl font-black text-indigo-700">0.00</div>
            </div>
            <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-6 text-center">
              <div className="text-[10px] font-black text-indigo-400 uppercase mb-2 tracking-widest">% CGST</div>
              <div className="text-xl font-black text-indigo-700">0.00</div>
            </div>
            <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-6 text-center">
              <div className="text-[10px] font-black text-indigo-400 uppercase mb-2 tracking-widest">% SGST</div>
              <div className="text-xl font-black text-indigo-700">0.00</div>
            </div>
            <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-6 text-center">
              <div className="text-[10px] font-black text-indigo-400 uppercase mb-2 tracking-widest">Amount (Excl GST)</div>
              <div className="text-xl font-black text-indigo-700">0.00</div>
            </div>
            <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-6 text-center">
              <div className="text-[10px] font-black text-indigo-400 uppercase mb-2 tracking-widest">Round Off</div>
              <div className="text-xl font-black text-indigo-700">0.00</div>
            </div>
            <div className="bg-cyan-500 rounded-xl p-6 text-center shadow-lg shadow-cyan-100">
              <div className="text-[10px] font-black text-white/90 uppercase mb-2 tracking-widest">$ Total Amount</div>
              <div className="text-xl font-black text-white">0.00</div>
            </div>
          </div>
          
          <div className="mt-12 flex justify-center">
            <button className="px-16 py-4 bg-[#00d4ff] text-white text-[12px] font-black rounded-full shadow-xl shadow-cyan-100 hover:bg-[#00c4ef] transition-all uppercase tracking-[0.2em] flex items-center gap-3">
              <CheckCircle className="w-5 h-5" /> Create Quotation
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
