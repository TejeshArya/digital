import React from 'react';
import { 
  ArrowLeft, Printer, Download, Mail, 
  CheckCircle, ShieldCheck, FileText, Layout
} from 'lucide-react';

interface InvoiceViewProps {
  onNavigate: (path: string) => void;
  invoice: any;
}

export function InvoiceView({ onNavigate, invoice }: InvoiceViewProps) {
  if (!invoice) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-bold text-gray-400">No Invoice Selected</h2>
        <button 
          onClick={() => onNavigate('/invoices/all')}
          className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg font-bold"
        >
          Back to List
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 bg-[#f8f9fc] min-h-screen font-sans">
      {/* Action Header */}
      <div className="flex justify-between items-center mb-6">
        <button 
          onClick={() => onNavigate('/invoices/all')}
          className="flex items-center gap-2 px-4 py-2 bg-white text-gray-600 text-xs font-bold rounded-lg border border-gray-100 shadow-sm hover:bg-gray-50 transition-all"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Invoices
        </button>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-white text-blue-600 text-xs font-bold rounded-lg border border-blue-50 shadow-sm hover:bg-blue-50 transition-all">
            <Printer className="w-4 h-4" /> Print
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#6b58d3] text-white text-xs font-bold rounded-lg shadow-lg shadow-indigo-100 hover:bg-[#5a47c2] transition-all">
            <Download className="w-4 h-4" /> Download PDF
          </button>
        </div>
      </div>

      {/* Invoice Document */}
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl shadow-slate-200/50 border border-gray-100 overflow-hidden mb-12">
        {/* Document Header */}
        <div className="bg-[#1a202c] p-10 text-white flex justify-between items-start">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-blue-500 p-2 rounded-xl shadow-lg shadow-blue-500/20">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-2xl font-black uppercase tracking-tighter">Digital Engineering</h1>
                <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">Enterprises</p>
              </div>
            </div>
            <div className="text-[10px] text-gray-400 font-medium leading-relaxed max-w-[250px]">
              Plot No. 12, Industrial Estate, Sector 5, <br />
              New Bombay, Maharashtra - 400701 <br />
              GSTIN: 27AADCD1234A1Z1
            </div>
          </div>
          <div className="text-right">
            <h2 className="text-5xl font-black opacity-10 uppercase tracking-tighter mb-4">Invoice</h2>
            <div className="space-y-1">
              <div className="text-xs font-black text-blue-400 uppercase tracking-widest">Invoice Number</div>
              <div className="text-2xl font-black">{invoice.invoiceNo}</div>
              <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-2">Date: {new Date(invoice.invoiceDate).toLocaleDateString('en-GB')}</div>
            </div>
          </div>
        </div>

        {/* Client Info */}
        <div className="grid grid-cols-2 gap-10 p-10 border-b border-gray-50 bg-slate-50/50">
          <div>
            <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Bill To</div>
            <div className="space-y-1">
              <div className="text-lg font-black text-slate-800 uppercase">{invoice.clientName}</div>
              <div className="text-xs text-gray-500 font-medium leading-relaxed">
                Project Name Reference <br />
                Department: P & P <br />
                Post: Project Lead
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Status</div>
            <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 ${
              invoice.status === 'Paid' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'
            }`}>
              <div className={`w-1.5 h-1.5 rounded-full ${invoice.status === 'Paid' ? 'bg-emerald-600' : 'bg-amber-600 animate-pulse'}`} />
              {invoice.status}
            </div>
          </div>
        </div>

        {/* Line Items Table */}
        <div className="p-10">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b-2 border-slate-800 text-[10px] font-black uppercase tracking-widest text-slate-400">
                <th className="pb-4">Description</th>
                <th className="pb-4 text-center">Qty</th>
                <th className="pb-4 text-right">Rate</th>
                <th className="pb-4 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {/* Mock items for preview since invoice might not have Items joined if it's summary */}
              <tr className="group">
                <td className="py-6">
                  <div className="text-sm font-black text-slate-800 uppercase">Consultancy Services</div>
                  <div className="text-[10px] text-gray-400 font-bold uppercase mt-1">Project Planning & Engineering</div>
                </td>
                <td className="py-6 text-center text-sm font-bold text-slate-600">1.00</td>
                <td className="py-6 text-right text-sm font-bold text-slate-600">₹{invoice.amount?.toLocaleString()}</td>
                <td className="py-6 text-right text-sm font-black text-slate-800">₹{invoice.amount?.toLocaleString()}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Totals */}
        <div className="p-10 bg-slate-50 flex justify-end">
          <div className="w-full max-w-[300px] space-y-4">
            <div className="flex justify-between text-xs font-bold text-gray-500 uppercase tracking-wider">
              <span>Subtotal</span>
              <span>₹{invoice.amount?.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-xs font-bold text-emerald-500 uppercase tracking-wider">
              <span>GST Amount (18%)</span>
              <span>₹{invoice.gstAmount?.toLocaleString()}</span>
            </div>
            <div className="pt-4 border-t-2 border-slate-800 flex justify-between items-center">
              <div className="text-xs font-black text-slate-800 uppercase tracking-widest">Total Amount</div>
              <div className="text-2xl font-black text-blue-600 font-sans">₹{invoice.totalAmount?.toLocaleString()}</div>
            </div>
          </div>
        </div>

        {/* Note Footer */}
        <div className="p-10 border-t border-gray-100 text-center">
          <div className="flex justify-center gap-2 mb-4 text-[#6b58d3]">
            <CheckCircle className="w-5 h-5" />
            <p className="text-xs font-black uppercase tracking-widest">Verified Digital Document</p>
          </div>
          <p className="text-[10px] text-gray-400 font-medium leading-relaxed max-w-md mx-auto">
            This is a computer generated document and does not require a physical signature. 
            For any queries regarding this invoice, please contact support@digital-erp.com
          </p>
        </div>
      </div>
    </div>
  );
}
