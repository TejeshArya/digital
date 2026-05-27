import React, { useState, useEffect } from 'react';
import { 
  Search, Calendar, Layout, User, FileText, Filter, 
  ChevronDown, CreditCard, ArrowRight, BarChart3, TrendingUp, AlertCircle
} from 'lucide-react';

export function ManagePurchase() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://dee-backend-7x0g.onrender.com/api/purchaseinvoices');
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Error fetching invoices:', error);
    } finally {
      setLoading(false);
    }
  };

  const totalPurchaseAmount = data.reduce((sum, item) => sum + (item.totalAmount || 0), 0);
  const totalPaidAmount = data.reduce((sum, item) => sum + (item.paidAmount || 0), 0);
  const totalDueAmount = totalPurchaseAmount - totalPaidAmount;

  return (
    <div className="p-4 bg-[#f8f9fc] min-h-screen font-sans">
      {/* Filter Section */}
      <div className="bg-[#0061f2] p-3 rounded-lg shadow-md mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-8 gap-2 items-center">
          <select className="bg-white text-gray-700 text-[11px] font-bold rounded px-2 py-2 focus:outline-none">
            <option>2026-2027</option>
          </select>
          <select className="bg-white text-gray-700 text-[11px] font-bold rounded px-2 py-2 focus:outline-none">
            <option>Month</option>
          </select>
          <input type="text" placeholder="Company Name - GST" className="bg-white text-gray-700 text-[11px] font-bold rounded px-2 py-2 focus:outline-none" />
          <input type="text" placeholder="Invoice No" className="bg-white text-gray-700 text-[11px] font-bold rounded px-2 py-2 focus:outline-none" />
          <div className="relative">
            <input type="text" placeholder="mm/dd/yyyy" className="w-full bg-white text-gray-700 text-[11px] font-bold rounded px-2 py-2 focus:outline-none" />
            <Calendar className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400" />
          </div>
          <div className="relative">
            <input type="text" placeholder="mm/dd/yyyy" className="w-full bg-white text-gray-700 text-[11px] font-bold rounded px-2 py-2 focus:outline-none" />
            <Calendar className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400" />
          </div>
          <select className="bg-white text-gray-700 text-[11px] font-bold rounded px-2 py-2 focus:outline-none">
            <option>Select Post / Designation</option>
          </select>
          <button className="bg-[#1cc88a] text-white text-[11px] font-black rounded px-4 py-2 hover:bg-[#17a673] transition-colors uppercase tracking-widest flex items-center justify-center gap-1">
            <Search className="w-3.5 h-3.5" /> SEARCH
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-8">
        <div className="p-4 flex flex-col md:flex-row justify-between items-center gap-4 border-b border-gray-50">
          <div className="flex items-center gap-2 text-[11px] text-gray-500 font-bold uppercase">
            Show 
            <select className="border border-gray-200 rounded px-2 py-1 focus:outline-none text-gray-700">
              <option>25</option>
            </select>
            entries per page
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-gray-400 font-black uppercase tracking-tight">Search invoices:</span>
            <input
              type="text"
              className="px-3 py-1.5 border border-gray-100 rounded text-sm focus:outline-none focus:border-blue-400 w-64"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-[10px] border-collapse">
            <thead>
              <tr className="bg-[#323c4e] text-white uppercase tracking-tighter">
                <th className="px-4 py-5 text-left font-black border-r border-slate-600">ID</th>
                <th className="px-4 py-5 text-center font-black border-r border-slate-600">Payment</th>
                <th className="px-4 py-5 text-left font-black border-r border-slate-600">Company Name</th>
                <th className="px-4 py-5 text-center font-black border-r border-slate-600">Expense Type</th>
                <th className="px-4 py-5 text-center font-black border-r border-slate-600">Invoice No</th>
                <th className="px-4 py-5 text-center font-black border-r border-slate-600">Invoice Date</th>
                <th className="px-4 py-5 text-center font-black border-r border-slate-600">Wing</th>
                <th className="px-4 py-5 text-center font-black">Department</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr>
                  <td colSpan={8} className="py-20 text-center text-gray-400 font-bold uppercase tracking-widest italic animate-pulse">Loading Purchase Invoices...</td>
                </tr>
              ) : data.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-20 text-center text-gray-300 font-bold uppercase tracking-widest">No Purchase Invoices Found</td>
                </tr>
              ) : data.map((row, index) => (
                <tr key={index} className="hover:bg-gray-50/80 transition-colors">
                  <td className="px-4 py-5 border-r border-gray-50 text-gray-400 font-bold">{row.id}</td>
                  <td className="px-4 py-5 border-r border-gray-50 text-center">
                    <button className="bg-[#1cc88a] text-white text-[9px] font-black px-3 py-1.5 rounded flex items-center justify-center gap-1 mx-auto hover:bg-[#17a673] transition-all shadow-sm">
                      <CreditCard className="w-3 h-3" /> PAY
                    </button>
                  </td>
                  <td className="px-4 py-5 border-r border-gray-50 font-bold text-gray-700 uppercase leading-tight max-w-md">{row.companyName}</td>
                  <td className="px-4 py-5 border-r border-gray-50 text-center">
                    <span className="bg-amber-500 text-white text-[8px] font-black px-2 py-0.5 rounded shadow-sm uppercase tracking-tighter">
                      {row.expenseType}
                    </span>
                  </td>
                  <td className="px-4 py-5 border-r border-gray-50 text-center text-gray-500 font-bold">{row.invoiceNo}</td>
                  <td className="px-4 py-5 border-r border-gray-50 text-center text-gray-600 font-bold">{new Date(row.invoiceDate).toLocaleDateString()}</td>
                  <td className="px-4 py-5 border-r border-gray-50 text-center">
                    <span className="bg-cyan-400 text-white text-[8px] font-black px-2 py-0.5 rounded shadow-sm uppercase">
                      N/A
                    </span>
                  </td>
                  <td className="px-4 py-5 text-center">
                    <span className="bg-purple-600 text-white text-[8px] font-black px-2 py-0.5 rounded shadow-sm uppercase">
                      {row.designation || 'N/A'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-gray-50 flex justify-between items-center bg-white">
          <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Showing {data.length} entries</div>
          <div className="flex items-center gap-2">
            <button className="text-[10px] font-bold text-gray-400 hover:text-gray-600 uppercase px-2">Previous</button>
            <button className="w-6 h-6 bg-blue-600 text-white text-[10px] font-bold rounded flex items-center justify-center shadow-lg shadow-blue-100">1</button>
            <button className="text-[10px] font-bold text-gray-400 hover:text-gray-600 uppercase px-2">Next</button>
          </div>
        </div>
      </div>

      {/* Summary Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-8">
        <div className="bg-[#1cc88a] p-4 flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-white" />
          <h2 className="text-white font-black text-[11px] uppercase tracking-widest">Financial Year Summary</h2>
        </div>
        <div className="p-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center space-y-2">
            <div className="text-2xl font-black text-blue-600">{data.length}</div>
            <div className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em]">Total Purchase Invoices</div>
          </div>
          <div className="text-center space-y-2 border-l border-gray-50">
            <div className="text-2xl font-black text-emerald-600">₹{totalPurchaseAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</div>
            <div className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em]">Total Purchase Amount</div>
          </div>
          <div className="text-center space-y-2 border-l border-gray-50">
            <div className="text-2xl font-black text-blue-500">₹{totalPaidAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</div>
            <div className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em]">Total Paid Amount</div>
          </div>
          <div className="text-center space-y-2 border-l border-gray-50">
            <div className="text-2xl font-black text-orange-500">₹{totalDueAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</div>
            <div className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em]">Total Due Amount</div>
          </div>
        </div>
      </div>

      <div className="mt-auto pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center text-[10px] text-gray-400 font-bold tracking-[0.2em] uppercase">
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
