import { FileText, Download, Eye, Search, Filter, Trash2, LayoutDashboard, Plus, Info, ChevronDown } from 'lucide-react';
import { useState } from 'react';

export function MyDocuments() {
  const [searchTerm, setSearchTerm] = useState('');

  const documents = [
    {
      id: 1,
      name: 'SOFTWARE LICENSE AGREEMENT',
      category: 'ACME CORP',
      subCategory: 'VENDOR CONTRACTS',
      subSubCategory: 'JANE DOE',
      fileType: 'PDF',
      fileSize: '233.97 KB',
      remarks: '-',
      employee: 'JANE DOE',
      uploadedBy: 'JANE DOE',
      uploadDate: '30 Apr, 2024 02:35 AM'
    },
    {
      id: 2,
      name: 'NDA DOCUMENT',
      category: 'ACME CORP',
      subCategory: 'LEGAL DOCUMENTS',
      subSubCategory: 'NDA/2024/B/1234567',
      fileType: 'PDF',
      fileSize: '114.13 KB',
      remarks: 'CONFIDENTIAL',
      employee: 'MICHAEL SMITH',
      uploadedBy: 'MICHAEL SMITH',
      uploadDate: '15 Apr, 2024 11:41 AM'
    },
    {
      id: 3,
      name: 'PBG',
      category: '-',
      subCategory: '-',
      subSubCategory: '-',
      fileType: 'PNG',
      fileSize: '36.72 KB',
      remarks: 're',
      employee: 'MICHAEL SMITH',
      uploadedBy: 'MICHAEL SMITH',
      uploadDate: '03 Apr, 2024 05:23 AM'
    }
  ];

  return (
    <div className="p-4 bg-[#f8f9fc] min-h-screen font-sans">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-gray-700" />
          <h1 className="text-lg font-bold text-gray-800 uppercase tracking-tight">My Documents</h1>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-[#4e73df] text-white text-[11px] font-bold rounded shadow-sm hover:opacity-90">
            <LayoutDashboard className="w-3 h-3" /> Dashboard
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#0061f2] text-white text-[11px] font-bold rounded shadow-sm hover:opacity-90">
            <Plus className="w-3 h-3" /> Upload New Document
          </button>
        </div>
      </div>

      {/* Filter Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 mb-6 overflow-hidden">
        <div className="p-4 border-b border-gray-50 flex items-center gap-2">
          <Filter className="w-4 h-4 text-blue-600" />
          <span className="text-xs font-bold text-blue-600 uppercase">Filter Documents</span>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[11px] font-bold text-gray-500 uppercase">
                <FileText className="w-3 h-3 text-blue-600" /> Document Category
              </label>
              <div className="relative">
                <select className="w-full pl-3 pr-8 py-2 bg-white border border-gray-200 rounded text-xs text-gray-500 focus:outline-none focus:border-blue-400 appearance-none">
                  <option>All Categories</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[11px] font-bold text-gray-500 uppercase">
                <FileText className="w-3 h-3 text-blue-600" /> Sub Document Category
              </label>
              <div className="relative">
                <select className="w-full pl-3 pr-8 py-2 bg-[#f4f4f4] border border-gray-200 rounded text-xs text-gray-500 focus:outline-none appearance-none">
                  <option>All Sub Categories</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[11px] font-bold text-gray-500 uppercase">
                <FileText className="w-3 h-3 text-blue-600" /> Sub-Sub Document Category
              </label>
              <div className="relative">
                <select className="w-full pl-3 pr-8 py-2 bg-[#f4f4f4] border border-gray-200 rounded text-xs text-gray-500 focus:outline-none appearance-none">
                  <option>All Sub-Sub Categories</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-[#0061f2] text-white text-[11px] font-bold rounded shadow-sm">
              <Search className="w-3 h-3" /> Apply Filter
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-[#4e73df] text-white text-[11px] font-bold rounded shadow-sm">
              <Trash2 className="w-3 h-3" /> Reset Filters
            </button>
            <span className="text-xs text-gray-400 font-medium ml-2 italic">
              Showing {documents.length} document(s)
            </span>
          </div>
        </div>
      </div>

      {/* Uploaded Documents Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <LayoutDashboard className="w-4 h-4 text-blue-600" />
            <span className="text-xs font-bold text-blue-600 uppercase">Uploaded Documents</span>
          </div>
          <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded">3 Documents</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-[11px]">
            <thead>
              <tr className="bg-gray-50/50 text-gray-600 uppercase tracking-wider border-b border-gray-50">
                <th className="px-4 py-4 text-center font-bold">#</th>
                <th className="px-4 py-4 text-left font-bold">Document Name</th>
                <th className="px-4 py-4 text-left font-bold">Category</th>
                <th className="px-4 py-4 text-left font-bold">Sub Category</th>
                <th className="px-4 py-4 text-left font-bold">Sub-Sub Category</th>
                <th className="px-4 py-4 text-center font-bold">File Type</th>
                <th className="px-4 py-4 text-left font-bold">File Size</th>
                <th className="px-4 py-4 text-left font-bold">Remarks</th>
                <th className="px-4 py-4 text-left font-bold">Employee</th>
                <th className="px-4 py-4 text-left font-bold">Uploaded By</th>
                <th className="px-4 py-4 text-left font-bold">Upload Date</th>
                <th className="px-4 py-4 text-center font-bold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {documents.map((doc, index) => (
                <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-5 text-center text-gray-400">{index + 1}</td>
                  <td className="px-4 py-5 font-bold text-gray-700">
                    <div className="flex items-center gap-2">
                      {doc.fileType === 'PDF' ? (
                        <FileText className="w-4 h-4 text-red-500" />
                      ) : (
                        <FileText className="w-4 h-4 text-emerald-500" />
                      )}
                      {doc.name}
                    </div>
                  </td>
                  <td className="px-4 py-5">
                    {doc.category !== '-' ? (
                      <span className="bg-cyan-500 text-white text-[9px] font-bold px-2 py-1 rounded uppercase">
                        {doc.category}
                      </span>
                    ) : '-'}
                  </td>
                  <td className="px-4 py-5">
                    {doc.subCategory !== '-' ? (
                      <span className="bg-orange-400 text-white text-[9px] font-bold px-2 py-1 rounded uppercase">
                        {doc.subCategory}
                      </span>
                    ) : '-'}
                  </td>
                  <td className="px-4 py-5">
                    {doc.subSubCategory !== '-' ? (
                      <span className="bg-emerald-500 text-white text-[9px] font-bold px-2 py-1 rounded uppercase">
                        {doc.subSubCategory}
                      </span>
                    ) : '-'}
                  </td>
                  <td className="px-4 py-5 text-center">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded text-white ${
                      doc.fileType === 'PDF' ? 'bg-red-500' : 'bg-emerald-500'
                    }`}>
                      {doc.fileType}
                    </span>
                  </td>
                  <td className="px-4 py-5 text-gray-500">{doc.fileSize}</td>
                  <td className="px-4 py-5 text-gray-400 italic">{doc.remarks}</td>
                  <td className="px-4 py-5 text-gray-600 font-medium uppercase">{doc.employee}</td>
                  <td className="px-4 py-5 text-gray-600 font-medium uppercase">{doc.uploadedBy}</td>
                  <td className="px-4 py-5 text-gray-400">{doc.uploadDate}</td>
                  <td className="px-4 py-5">
                    <div className="flex items-center justify-center gap-1.5">
                      <button className="p-1.5 bg-cyan-100 text-cyan-600 rounded hover:bg-cyan-600 hover:text-white transition-all">
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button className="p-1.5 bg-blue-100 text-blue-600 rounded hover:bg-blue-600 hover:text-white transition-all">
                        <Download className="w-3.5 h-3.5" />
                      </button>
                      <button className="p-1.5 bg-red-100 text-red-600 rounded hover:bg-red-600 hover:text-white transition-all">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Guidelines Section */}
      <div className="mt-8 bg-[#fdfdfd] border border-gray-100 rounded-lg p-6 flex gap-6">
        <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center shrink-0 shadow-lg shadow-blue-200">
          <Info className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="font-bold text-gray-800 text-sm mb-3">Document Guidelines:</h3>
          <ul className="text-xs text-gray-500 space-y-2 list-disc ml-4 font-medium">
            <li>Only upload clear, readable copies of your documents</li>
            <li>Ensure sensitive information is properly secured</li>
            <li>Contact HR if you need assistance with document uploads</li>
            <li>You can delete your own documents, but HR/Admin can manage all</li>
          </ul>
        </div>
      </div>

      <div className="mt-12 flex justify-between items-center text-[10px] text-gray-400 px-2 uppercase font-medium">
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
