import React from 'react';
import { ArrowLeft, Printer, Download, Share2 } from 'lucide-react';

interface QuotationPreviewProps {
  onNavigate: (path: string) => void;
  quotation: any;
}

export function QuotationPreview({ onNavigate, quotation }: QuotationPreviewProps) {
  if (!quotation) {
    return (
      <div className="p-8 text-center font-sans">
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

  const amountInWords = (amount: number) => {
    // Simple mock for now
    return "Rupees Four Lakh Ninety Six Thousands Five Hundred Only";
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen font-sans print:bg-white print:p-0">
      {/* Navigation & Actions */}
      <div className="max-w-4xl mx-auto flex justify-between items-center mb-6 print:hidden">
        <button 
          onClick={() => onNavigate('/quotations/all')}
          className="flex items-center gap-2 px-4 py-2 bg-white text-gray-600 text-xs font-bold rounded-lg border border-gray-200 shadow-sm hover:bg-gray-50 transition-all"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Quotations
        </button>
        <div className="flex gap-2">
          <button 
            onClick={() => window.print()}
            className="flex items-center gap-2 px-4 py-2 bg-white text-blue-600 text-xs font-bold rounded-lg border border-blue-50 shadow-sm hover:bg-blue-50 transition-all"
          >
            <Printer className="w-4 h-4" /> Print PDF
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white text-xs font-bold rounded-lg shadow-lg shadow-emerald-100 hover:bg-emerald-700 transition-all">
            <Download className="w-4 h-4" /> Download
          </button>
        </div>
      </div>

      {/* PDF Document Container */}
      <div className="max-w-[800px] mx-auto bg-white shadow-2xl print:shadow-none p-10 min-h-[1123px] text-[#2d3748]">
        
        {/* Header */}
        <div className="text-center mb-8 border-b-2 border-slate-100 pb-6">
          <h1 className="text-3xl font-black text-blue-800 tracking-tighter uppercase mb-1">DIGITAL ENGINEERING ENTERPRISES</h1>
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">
            104 AREA MARRIPALEM, VISAKHAPATNAM - 530018
          </p>
          <div className="flex justify-center gap-6 text-[9px] font-black text-gray-400 uppercase tracking-wider">
            <span>GST: 37AOPFK4319F1Z3</span>
            <span>Email: ind.digitalengineering@gmail.com</span>
            <span>Phone: 7042833181, 7468168313</span>
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-10">
          <h2 className="text-lg font-black uppercase underline tracking-[0.3em] decoration-2 underline-offset-8">Quotation</h2>
        </div>

        {/* To & Info Section */}
        <div className="flex justify-between items-start mb-8 text-[11px]">
          <div className="space-y-1 max-w-[300px]">
            <p className="font-black text-gray-400 uppercase tracking-widest text-[9px]">To:</p>
            <p className="font-black text-slate-800 uppercase text-xs">{quotation.companyName}</p>
            <p className="text-gray-500 leading-relaxed font-bold uppercase">
              The Commanding Officer, <br />
              INS DEGA, NAD AIRPORT <br />
              Visakhapatnam, Andhra Pradesh
            </p>
          </div>
          <div className="text-right space-y-2">
            <div className="flex justify-end gap-3 font-bold uppercase">
              <span className="text-gray-400">DQ NO:</span>
              <span className="text-slate-800 font-black">{quotation.quotationNumber}</span>
            </div>
            <div className="flex justify-end gap-3 font-bold uppercase">
              <span className="text-gray-400">Date:</span>
              <span className="text-slate-800">{new Date(quotation.invoiceDate).toLocaleDateString('en-GB')}</span>
            </div>
            <div className="flex justify-end gap-3 font-bold uppercase">
              <span className="text-gray-400">GSTIN:</span>
              <span className="text-slate-800">37*******</span>
            </div>
          </div>
        </div>

        {/* Subject */}
        <div className="mb-8 p-3 bg-slate-50 rounded border-l-4 border-blue-800">
          <p className="text-[11px] font-black uppercase text-slate-700">
            <span className="text-blue-800">Subject:</span> {quotation.subject || quotation.projectName}
          </p>
        </div>

        {/* Items Table */}
        <table className="w-full text-[10px] border-collapse mb-6">
          <thead>
            <tr className="bg-slate-800 text-white uppercase tracking-wider">
              <th className="px-3 py-2 text-center border border-slate-700 w-10">S No</th>
              <th className="px-3 py-2 text-left border border-slate-700">Item Description</th>
              <th className="px-3 py-2 text-center border border-slate-700 w-16">Denom</th>
              <th className="px-3 py-2 text-center border border-slate-700 w-16">Quantity</th>
              <th className="px-3 py-2 text-right border border-slate-700 w-24">Unit Price</th>
              <th className="px-3 py-2 text-right border border-slate-700 w-24">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {quotation.items?.map((item: any, idx: number) => (
              <tr key={idx} className="hover:bg-slate-50/50">
                <td className="px-3 py-4 text-center border border-gray-100 font-bold">{idx + 1}</td>
                <td className="px-3 py-4 border border-gray-100">
                  <p className="font-black text-slate-800 uppercase leading-relaxed">{item.description}</p>
                </td>
                <td className="px-3 py-4 text-center border border-gray-100 font-bold uppercase">{item.denom}</td>
                <td className="px-3 py-4 text-center border border-gray-100 font-black">{item.quantity}</td>
                <td className="px-3 py-4 text-right border border-gray-100 font-bold text-gray-600">
                  {Number(item.price).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </td>
                <td className="px-3 py-4 text-right border border-gray-100 font-black text-slate-800">
                  {(item.quantity * item.price).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Totals Section */}
        <div className="flex flex-col items-end mb-8">
          <div className="w-[200px] space-y-2">
            <div className="flex justify-between text-[11px] font-bold uppercase">
              <span className="text-gray-400">Subtotal:</span>
              <span className="text-slate-800">₹ {(quotation.totalAmount - (quotation.gstAmount || 0)).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between text-[11px] font-bold uppercase text-blue-600">
              <span>GST Amount:</span>
              <span>₹ {(quotation.gstAmount || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between text-[13px] font-black uppercase border-t-2 border-slate-800 pt-2 text-slate-900">
              <span>Total:</span>
              <span>₹ {Number(quotation.totalAmount).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
            </div>
          </div>
        </div>

        {/* Words and Terms */}
        <div className="space-y-6 mb-12">
          <p className="text-[10px] font-black text-slate-700 italic border-l-2 border-slate-200 pl-4 uppercase">
            INR Price (in words): <span className="text-blue-800">{amountInWords(quotation.totalAmount)}</span>
          </p>

          <div className="space-y-2">
            <h4 className="text-[10px] font-black uppercase underline tracking-widest text-slate-400">Terms and Conditions:</h4>
            <ol className="list-[lower-alpha] ml-4 text-[9px] font-bold text-gray-500 uppercase space-y-1.5 leading-relaxed">
              <li>Quotation is fixed price and can not be altered after acceptance.</li>
              <li>Quotation validity: 90 Days.</li>
              <li>Delivery period: 45 Days.</li>
              <li>Jurisdiction: Visakhapatnam.</li>
              <li>Payment within 45 days as per MSME guidelines.</li>
            </ol>
          </div>
        </div>

        {/* Page Break for HSN Table if needed */}
        <div className="border-t-2 border-dashed border-gray-100 my-12" />

        {/* HSN & GST Table */}
        <div className="space-y-4 mb-12">
          <h4 className="text-[10px] font-black uppercase underline tracking-widest text-blue-800">HSN and GST%:</h4>
          <table className="w-full text-[9px] border-collapse">
            <thead>
              <tr className="bg-slate-100 text-slate-600 uppercase tracking-wider">
                <th className="px-2 py-1.5 text-center border border-gray-200 w-10">S No</th>
                <th className="px-2 py-1.5 text-left border border-gray-200">HSN code and GST%</th>
                <th className="px-2 py-1.5 text-right border border-gray-200">IGST</th>
                <th className="px-2 py-1.5 text-right border border-gray-200">CGST</th>
                <th className="px-2 py-1.5 text-right border border-gray-200">SGST</th>
              </tr>
            </thead>
            <tbody>
              {quotation.items?.map((item: any, idx: number) => (
                <tr key={idx}>
                  <td className="px-2 py-2 text-center border border-gray-200 font-bold">{idx + 1}</td>
                  <td className="px-2 py-2 border border-gray-200 font-black uppercase text-slate-700">
                    {item.hsn || '998311'} - 18%
                  </td>
                  <td className="px-2 py-2 text-right border border-gray-200 text-gray-400">0.00</td>
                  <td className="px-2 py-2 text-right border border-gray-200 font-bold text-slate-600">
                    {((item.quantity * item.price) * 0.09).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                  </td>
                  <td className="px-2 py-2 text-right border border-gray-200 font-bold text-slate-600">
                    {((item.quantity * item.price) * 0.09).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                  </td>
                </tr>
              ))}
              <tr className="bg-slate-50 font-black uppercase">
                <td colSpan={4} className="px-2 py-2 text-right border border-gray-200 text-slate-400">Total GST:</td>
                <td className="px-2 py-2 text-right border border-gray-200 text-blue-700">
                  ₹ {Number(quotation.gstAmount || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Motivation Footer */}
        <div className="mt-auto text-center pt-20 pb-10">
          <div className="w-20 h-1 bg-blue-800 mx-auto mb-6 opacity-20 rounded-full" />
          <h3 className="text-sm font-black text-slate-800 uppercase tracking-[0.2em] mb-2">Your purchase order is our motivation</h3>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Feel free to contact us for any query</p>
        </div>

      </div>
    </div>
  );
}
