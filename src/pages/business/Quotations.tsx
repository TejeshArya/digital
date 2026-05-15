import React, { useState, useEffect } from 'react';
import { 
  Search, Filter, X, Copy, FileSpreadsheet, FileText, Printer, 
  ChevronDown, Eye, Layout, Edit, Download, Trash2, User, ShieldCheck,
  Percent, ListChecks, Pencil
} from 'lucide-react';

export function Quotations({ onNavigate, onSelectQuotation }: { onNavigate?: (path: string) => void, onSelectQuotation?: (quote: any) => void }) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [selectedQuote, setSelectedQuote] = useState<any>(null);
  const [supportData, setSupportData] = useState({
    percentage: '',
    companyName: 'Vishwakarma',
    format: 'Format 1',
    inquiryNo: '',
    inquiryDate: ''
  });

  useEffect(() => {
    fetchQuotations();
  }, []);

  const fetchQuotations = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5076/api/quotations');
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Error fetching quotations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this quotation?')) {
      try {
        const response = await fetch(`http://localhost:5076/api/quotations/${id}`, {
          method: 'DELETE'
        });
        if (response.ok) {
          setData(prev => prev.filter(q => q.id !== id));
          alert('Quotation deleted successfully!');
        } else {
          alert('Failed to delete quotation.');
        }
      } catch (error) {
        console.error('Error deleting quotation:', error);
      }
    }
  };

  const handleApprove = async (id: number) => {
    if (window.confirm('Approve this quotation and generate an invoice?')) {
      try {
        const response = await fetch(`http://localhost:5076/api/quotations/${id}/approve`, {
          method: 'POST'
        });
        if (response.ok) {
          alert('Quotation approved and Invoice generated!');
          fetchQuotations(); // Refresh list
        } else {
          const err = await response.json();
          alert('Failed to approve: ' + (err.message || 'Server error'));
        }
      } catch (error) {
        console.error('Approval error:', error);
        alert('Connection error');
      }
    }
  };

  return (
    <div className="p-4 bg-[#f8f9fc] min-h-screen font-sans">
      {/* Filter Section */}
      <div className="bg-white rounded-lg shadow-sm mb-6 overflow-hidden border border-gray-100">
        <div className="bg-[#0061f2] p-3">
          <div className="grid grid-cols-1 md:grid-cols-7 lg:grid-cols-9 gap-2 items-center">
            <div className="space-y-1">
              <div className="flex items-center gap-1 text-[10px] text-white/80 font-bold uppercase">
                <Layout className="w-3 h-3" /> Financial Year
              </div>
              <select className="w-full bg-white text-gray-700 text-[11px] rounded px-2 py-1.5 focus:outline-none appearance-none">
                <option>2026-2027</option>
              </select>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-1 text-[10px] text-white/80 font-bold uppercase">
                <User className="w-3 h-3" /> Company
              </div>
              <input type="text" placeholder="Search..." className="w-full bg-white text-gray-700 text-[11px] rounded px-2 py-1.5 focus:outline-none" />
            </div>
            <div className="md:col-span-2 space-y-1">
              <div className="flex items-center gap-1 text-[10px] text-white/80 font-bold uppercase">
                <Layout className="w-3 h-3" /> Subject
              </div>
              <input type="text" placeholder="Search subject..." className="w-full bg-white text-gray-700 text-[11px] rounded px-2 py-1.5 focus:outline-none" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-1 text-[10px] text-white/80 font-bold uppercase">
                <Layout className="w-3 h-3" /> Wing
              </div>
              <select className="w-full bg-white text-gray-700 text-[11px] rounded px-2 py-1.5 focus:outline-none appearance-none">
                <option>Search...</option>
                <option>CIVIL</option>
              </select>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-1 text-[10px] text-white/80 font-bold uppercase">
                <Layout className="w-3 h-3" /> Department
              </div>
              <select className="w-full bg-white text-gray-700 text-[11px] rounded px-2 py-1.5 focus:outline-none appearance-none">
                <option>Search...</option>
                <option>P & P</option>
              </select>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-1 text-[10px] text-white/80 font-bold uppercase">
                <Layout className="w-3 h-3" /> Post
              </div>
              <select className="w-full bg-white text-gray-700 text-[11px] rounded px-2 py-1.5 focus:outline-none appearance-none">
                <option>Search...</option>
              </select>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-1 text-[10px] text-white/80 font-bold uppercase">
                <User className="w-3 h-3" /> Created By
              </div>
              <select className="w-full bg-white text-gray-700 text-[11px] rounded px-2 py-1.5 focus:outline-none appearance-none">
                <option>Search...</option>
              </select>
            </div>
            <div className="flex gap-1 mt-auto pb-0.5">
              <button className="bg-[#0061f2] border border-white/30 text-white text-[10px] font-bold px-3 py-1.5 rounded hover:bg-blue-700 flex items-center gap-1">
                <Filter className="w-3 h-3" /> Filter
              </button>
              <button className="bg-[#5a5c69] text-white text-[10px] font-bold px-3 py-1.5 rounded hover:bg-gray-700 flex items-center gap-1">
                <X className="w-3 h-3" /> Clear
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden mb-8">
        <div className="p-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex gap-1">
            <button className="px-3 py-1.5 bg-gray-50 border border-gray-200 text-[10px] font-medium text-gray-600 hover:bg-gray-100 rounded">Copy</button>
            <button className="px-3 py-1.5 bg-gray-50 border border-gray-200 text-[10px] font-medium text-gray-600 hover:bg-gray-100 rounded">CSV</button>
            <button className="px-3 py-1.5 bg-gray-50 border border-gray-200 text-[10px] font-medium text-gray-600 hover:bg-gray-100 rounded">Excel</button>
            <button className="px-3 py-1.5 bg-gray-50 border border-gray-200 text-[10px] font-medium text-gray-600 hover:bg-gray-100 rounded">Print</button>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400 font-medium uppercase tracking-tight">Search:</span>
            <input
              type="text"
              className="px-3 py-1.5 border border-gray-100 rounded bg-white text-sm focus:outline-none focus:border-blue-400 w-64"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-[10px] border-collapse">
            <thead>
              <tr className="bg-[#1a202c] text-white uppercase tracking-tighter">
                <th className="px-3 py-4 text-left font-bold border-r border-slate-700">Quotation No</th>
                <th className="px-3 py-4 text-left font-bold border-r border-slate-700">Company Name</th>
                <th className="px-3 py-4 text-left font-bold border-r border-slate-700">Date</th>
                <th className="px-3 py-4 text-left font-bold border-r border-slate-700">Subject</th>
                <th className="px-3 py-4 text-center font-bold border-r border-slate-700">Wing</th>
                <th className="px-3 py-4 text-center font-bold border-r border-slate-700">Department</th>
                <th className="px-3 py-4 text-center font-bold border-r border-slate-700">Post</th>
                <th className="px-3 py-4 text-left font-bold border-r border-slate-700">Created By</th>
                <th className="px-3 py-4 text-right font-bold border-r border-slate-700 whitespace-nowrap">Total Amount</th>
                <th className="px-3 py-4 text-center font-bold border-r border-slate-700">Status</th>
                <th className="px-3 py-4 text-center font-bold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr>
                  <td colSpan={11} className="py-20 text-center text-gray-400 font-bold uppercase tracking-widest italic animate-pulse">Loading Quotations...</td>
                </tr>
              ) : data.length === 0 ? (
                <tr>
                  <td colSpan={11} className="py-20 text-center text-gray-300 font-bold uppercase tracking-widest">No Quotations Found</td>
                </tr>
              ) : data.map((row, index) => (
                <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-3 py-5 border-r border-gray-50 text-gray-600 font-medium">{row.quotationNumber}</td>
                  <td className="px-3 py-5 border-r border-gray-50 font-bold text-gray-800 uppercase">{row.companyName}</td>
                  <td className="px-3 py-5 border-r border-gray-50 text-gray-500 whitespace-nowrap">{new Date(row.invoiceDate).toLocaleDateString()}</td>
                  <td className="px-3 py-5 border-r border-gray-50 text-gray-600 leading-relaxed uppercase max-w-xs">{row.subject || row.projectName}</td>
                  <td className="px-3 py-5 border-r border-gray-50 text-center">
                    <span className="bg-cyan-500 text-white text-[8px] font-black px-2 py-0.5 rounded shadow-sm uppercase">
                      {row.wing || 'N/A'}
                    </span>
                  </td>
                  <td className="px-3 py-5 border-r border-gray-50 text-center">
                    <span className="bg-slate-500 text-white text-[8px] font-black px-2 py-0.5 rounded shadow-sm uppercase">
                      {row.department || 'N/A'}
                    </span>
                  </td>
                  <td className="px-3 py-5 border-r border-gray-50 text-center">
                    <span className="bg-blue-600 text-white text-[8px] font-black px-2 py-0.5 rounded shadow-sm uppercase">
                      {row.post || 'N/A'}
                    </span>
                  </td>
                  <td className="px-3 py-5 border-r border-gray-50">
                    <div className="flex items-center gap-1 text-emerald-600 font-black tracking-tighter leading-tight max-w-[80px] uppercase">
                      <User className="w-3 h-3 flex-shrink-0" />
                      {row.createdBy || 'System'}
                    </div>
                  </td>
                  <td className="px-3 py-5 border-r border-gray-50 text-right font-bold text-gray-600">
                    {Number(row.totalAmount).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                  </td>
                  <td className="px-3 py-5 border-r border-gray-50 text-center">
                    <span className={`${
                      row.status === 'Approved' ? 'bg-emerald-500' : 
                      row.status === 'Rejected' ? 'bg-rose-500' : 'bg-amber-500'
                    } text-white text-[8px] font-black px-2 py-1 rounded-full flex items-center justify-center gap-1 uppercase`}>
                      {row.status === 'Pending' && <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />}
                      {row.status || 'Pending'}
                    </span>
                  </td>
                  <td className="px-3 py-5">
                    <div className="flex items-center justify-center gap-1">
                      <button 
                        onClick={() => {
                          onSelectQuotation?.(row);
                          onNavigate?.('/quotations/preview');
                        }}
                        className="p-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors shadow-sm" 
                        title="View Quotation (PDF)"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      
                      <button 
                        onClick={() => {
                          setSelectedQuote(row);
                          setShowSupportModal(true);
                        }}
                        className="p-1.5 bg-cyan-500 text-white rounded hover:bg-cyan-600 transition-colors shadow-sm" 
                        title="Supporting Quotation"
                      >
                        <Percent className="w-3.5 h-3.5" />
                      </button>

                      <button 
                        onClick={() => {
                          onSelectQuotation?.(row);
                          onNavigate?.('/quotations/work-manage');
                        }}
                        className="p-1.5 bg-emerald-500 text-white rounded hover:bg-emerald-600 transition-colors shadow-sm" 
                        title="Manage Work & QC"
                      >
                        <ListChecks className="w-3.5 h-3.5" />
                      </button>

                      <button className="p-1.5 bg-amber-500 text-white rounded hover:bg-amber-600 transition-colors shadow-sm" title="Edit">
                        <Pencil className="w-3.5 h-3.5" />
                      </button>

                      {row.status === 'Pending' && (
                        <button 
                          onClick={() => handleApprove(row.id)}
                          className="p-1.5 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors shadow-sm"
                          title="Approve & Generate Invoice"
                        >
                          <ShieldCheck className="w-3.5 h-3.5" />
                        </button>
                      )}

                      <button 
                        onClick={() => handleDelete(row.id)}
                        className="p-1.5 bg-rose-500 text-white rounded hover:bg-rose-600 transition-colors shadow-sm"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-gray-50 flex justify-between items-center bg-white">
          <div className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">Showing 1 to 2 of 2 entries</div>
          <div className="flex items-center gap-2">
            <button className="text-[10px] font-bold text-gray-400 hover:text-gray-600 uppercase px-2">Previous</button>
            <button className="w-6 h-6 bg-blue-50 text-blue-600 text-[10px] font-bold rounded flex items-center justify-center border border-blue-100">1</button>
            <button className="text-[10px] font-bold text-gray-400 hover:text-gray-600 uppercase px-2">Next</button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center text-[10px] text-gray-400 font-bold tracking-[0.2em] uppercase">
        <p>Copyright &copy; Digital New Enterprises 2024</p>
        <div className="flex gap-4">
          <a href="#" className="hover:underline">Privacy Policy</a>
          <span>•</span>
          <a href="#" className="hover:underline">Terms & Conditions</a>
        </div>
      </div>

      {/* Supporting Quotation Modal */}
      {showSupportModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden border border-gray-100 animate-in fade-in zoom-in duration-200">
            <div className="bg-emerald-600 p-4 flex justify-between items-center">
              <h3 className="text-white font-bold uppercase tracking-widest text-sm flex items-center gap-2">
                <Percent className="w-4 h-4" /> Supporting Quotation
              </h3>
              <button onClick={() => setShowSupportModal(false)} className="text-white/80 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-5">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider ml-1">Percentage</label>
                <input 
                  type="text" 
                  value={supportData.percentage}
                  onChange={(e) => setSupportData({...supportData, percentage: e.target.value})}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-emerald-500 font-bold text-gray-700" 
                  placeholder="Enter Percentage"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider ml-1">Company Name</label>
                <select 
                  value={supportData.companyName}
                  onChange={(e) => setSupportData({...supportData, companyName: e.target.value})}
                  className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-emerald-500 font-bold text-gray-700 appearance-none"
                >
                  <option>Vishwakarma</option>
                  <option>AG Coders</option>
                  <option>DEE Enterprises</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider ml-1">Quotation Format</label>
                <select 
                  value={supportData.format}
                  onChange={(e) => setSupportData({...supportData, format: e.target.value})}
                  className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-emerald-500 font-bold text-gray-700 appearance-none"
                >
                  <option>Format 1</option>
                  <option>Format 2</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider ml-1">Inquiry Number</label>
                <input 
                  type="text" 
                  value={supportData.inquiryNo}
                  onChange={(e) => setSupportData({...supportData, inquiryNo: e.target.value})}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-emerald-500 font-bold text-gray-700" 
                  placeholder="Enter Inquiry No"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider ml-1">Inquiry Date</label>
                <input 
                  type="date" 
                  value={supportData.inquiryDate}
                  onChange={(e) => setSupportData({...supportData, inquiryDate: e.target.value})}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-emerald-500 font-bold text-gray-700" 
                />
              </div>
            </div>

            <div className="p-4 bg-gray-50 flex justify-end gap-3">
              <button 
                onClick={() => setShowSupportModal(false)}
                className="px-6 py-2 bg-slate-500 text-white text-[11px] font-bold rounded uppercase tracking-wider hover:bg-slate-600 transition-colors"
              >
                Close
              </button>
              <button 
                className="px-6 py-2 bg-emerald-600 text-white text-[11px] font-bold rounded uppercase tracking-wider hover:bg-emerald-700 transition-colors shadow-md shadow-emerald-100"
              >
                View Quotation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
