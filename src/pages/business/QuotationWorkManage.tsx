import React, { useState } from 'react';
import { 
  ArrowLeft, Layout, FileText, CheckCircle, Settings, 
  Plus, Search, Info, ShieldCheck, ChevronRight
} from 'lucide-react';

interface QuotationWorkManageProps {
  onNavigate: (path: string) => void;
  quotation: any;
}

export function QuotationWorkManage({ onNavigate, quotation }: QuotationWorkManageProps) {
  if (!quotation) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-bold text-gray-400">No Quotation Selected</h2>
        <button 
          onClick={() => onNavigate('/quotations/all')}
          className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg font-bold"
        >
          Back to List
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 bg-[#f8f9fc] min-h-screen font-sans">
      {/* Header Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[#6b58d3] font-black uppercase tracking-widest text-xs">
              <FileText className="w-4 h-4" /> Quotation Details
            </div>
            <h1 className="text-2xl font-black text-slate-800 uppercase">
              Quotation: <span className="text-[#6b58d3]">{quotation.quotationNumber}</span>
            </h1>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs font-bold text-gray-500 uppercase">
              <div className="flex items-center gap-2">
                <span className="text-gray-300">Company:</span>
                <span className="text-slate-700">{quotation.companyName}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-300">Project:</span>
                <span className="text-slate-700">{quotation.projectName || quotation.subject}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-end gap-3">
            <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl text-right">
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Amount</div>
              <div className="text-2xl font-black text-[#6b58d3]">
                ₹ {Number(quotation.totalAmount).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
              </div>
              <div className="text-[10px] font-bold text-gray-400 mt-1 uppercase">Date: {new Date(quotation.invoiceDate).toLocaleDateString()}</div>
            </div>
            <button 
              onClick={() => onNavigate('/quotations/all')}
              className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-white text-[10px] font-bold rounded uppercase tracking-widest hover:bg-slate-700 transition-all shadow-lg shadow-slate-100"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Quotations
            </button>
          </div>
        </div>
      </div>

      {/* Line Items Section */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 px-2">
          <Layout className="w-4 h-4 text-gray-400" />
          <h2 className="text-[11px] font-black text-gray-500 uppercase tracking-[0.2em]">Line Items ({quotation.items?.length || 0})</h2>
        </div>

        {quotation.items?.map((item: any, idx: number) => (
          <div key={idx} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-md transition-all">
            {/* Item Header */}
            <div className="bg-[#6b58d3] p-3 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-white/20 rounded flex items-center justify-center text-white text-[10px] font-bold">
                  #{idx + 1}
                </div>
                <h3 className="text-white text-[11px] font-black uppercase tracking-wider">{item.description}</h3>
              </div>
              <div className="flex items-center gap-4 text-white/90 text-[10px] font-bold">
                <div className="flex items-center gap-2 px-3 py-1 bg-white/10 rounded">
                  <span className="opacity-60 uppercase">Qty:</span>
                  <span>{item.quantity} {item.denom}</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-white/10 rounded font-black">
                  <span className="opacity-60 uppercase">Rate:</span>
                  <span>₹ {Number(item.price).toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            {/* Item Details */}
            <div className="p-5">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                <div className="space-y-1">
                  <div className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Category</div>
                  <div className="text-[11px] font-bold text-slate-700 uppercase">{item.category}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Subcategory</div>
                  <div className="text-[11px] font-bold text-slate-700 uppercase">{item.subcategory || 'N/A'}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Brand</div>
                  <div className="text-[11px] font-bold text-slate-700 uppercase">{item.brand}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-[9px] font-black text-gray-400 uppercase tracking-widest">HSN Code</div>
                  <div className="text-[11px] font-bold text-slate-700 uppercase">{item.hsn}</div>
                </div>
              </div>

              {/* Action Buttons for Item */}
              <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-50">
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-[10px] font-bold rounded shadow-md hover:bg-blue-700 transition-all uppercase tracking-wider">
                  <Settings className="w-3.5 h-3.5" /> Work Manage
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-cyan-500 text-white text-[10px] font-bold rounded shadow-md hover:bg-cyan-600 transition-all uppercase tracking-wider">
                  <Layout className="w-3.5 h-3.5" /> View Work Items (0)
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-amber-500 text-white text-[10px] font-bold rounded shadow-md hover:bg-amber-600 transition-all uppercase tracking-wider">
                  <CheckCircle className="w-3.5 h-3.5" /> QC
                </button>
              </div>

              {/* Status Banner */}
              <div className="mt-4 bg-cyan-50 border border-cyan-100 rounded-lg p-3 flex items-center gap-3">
                <Info className="w-4 h-4 text-cyan-500" />
                <p className="text-[10px] text-cyan-700 font-bold uppercase tracking-tight italic">
                  No work items added yet. Click "Work Manage" to add materials or services for this item.
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
