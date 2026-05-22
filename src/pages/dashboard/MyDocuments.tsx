import { FileText, Download, Eye, Search, Filter, Trash2, LayoutDashboard, Plus, Info, ChevronDown, RefreshCw, AlertCircle, Files } from 'lucide-react';
import { useState, useEffect } from 'react';

interface Document {
  id: number;
  documentName: string;
  category: string;
  subCategory: string;
  subSubCategory: string;
  fileType: string;
  fileSize: number;
  remarks: string;
  employeeEmail: string;
  filePath: string;
  uploadedAt: string;
}

interface MyDocumentsProps {
  onNavigate?: (path: string) => void;
}

export function MyDocuments({ onNavigate }: MyDocumentsProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const user = JSON.parse(localStorage.getItem('user') || '{"email": "anonymous@company.com"}');
  const userEmail = user.email || user.Email;

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`http://localhost:5076/api/documents/employee/${userEmail}`);
      if (response.ok) {
        const data = await response.json();
        setDocuments(data);
      } else {
        setError('Failed to fetch documents.');
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Connection error. Please ensure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this document?')) {
      try {
        const response = await fetch(`http://localhost:5076/api/documents/${id}`, {
          method: 'DELETE'
        });
        if (response.ok) {
          setDocuments(prev => prev.filter(d => d.id !== id));
        } else {
          alert('Failed to delete document.');
        }
      } catch (err) {
        console.error('Delete error:', err);
        alert('Connection error.');
      }
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const API_URL = 'http://localhost:5076';

  return (
    <div className="p-4 bg-[#f8f9fc] min-h-screen font-sans">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-gray-700" />
          <h1 className="text-lg font-bold text-gray-800 uppercase tracking-tight">My Documents</h1>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => onNavigate?.('/dashboard')}
            className="flex items-center gap-2 px-4 py-2 bg-[#4e73df] text-white text-[11px] font-bold rounded shadow-sm hover:opacity-90"
          >
            <LayoutDashboard className="w-3 h-3" /> Dashboard
          </button>
          <button 
            onClick={() => onNavigate?.('/upload-documents')}
            className="flex items-center gap-2 px-4 py-2 bg-[#0061f2] text-white text-[11px] font-bold rounded shadow-sm hover:opacity-90"
          >
            <Plus className="w-3 h-3" /> Upload New Document
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-rose-50 border border-rose-100 rounded-xl flex items-center gap-3 text-rose-600">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <p className="text-[11px] font-black uppercase tracking-widest">{error}</p>
        </div>
      )}

      {/* Uploaded Documents Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Files className="w-4 h-4 text-blue-600" />
            <span className="text-xs font-bold text-blue-600 uppercase">Uploaded Documents</span>
          </div>
          <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded">
            {documents.length} Documents
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-[11px]">
            <thead>
              <tr className="bg-gray-50/50 text-gray-600 uppercase tracking-wider border-b border-gray-50">
                <th className="px-4 py-4 text-center font-bold">#</th>
                <th className="px-4 py-4 text-left font-bold">Document Name</th>
                <th className="px-4 py-4 text-left font-bold">Category</th>
                <th className="px-4 py-4 text-left font-bold">Sub Category</th>
                <th className="px-4 py-4 text-center font-bold">File Type</th>
                <th className="px-4 py-4 text-left font-bold">File Size</th>
                <th className="px-4 py-4 text-left font-bold">Remarks</th>
                <th className="px-4 py-4 text-left font-bold">Upload Date</th>
                <th className="px-4 py-4 text-center font-bold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr>
                  <td colSpan={9} className="py-20 text-center">
                    <RefreshCw className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-2" />
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Loading Documents...</span>
                  </td>
                </tr>
              ) : documents.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-20 text-center text-gray-400 font-bold uppercase tracking-widest">
                    No documents uploaded yet.
                  </td>
                </tr>
              ) : documents.map((doc, index) => (
                <tr key={doc.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-5 text-center text-gray-400">{index + 1}</td>
                  <td className="px-4 py-5 font-bold text-gray-700">
                    <div className="flex items-center gap-2">
                      <FileText className={`w-4 h-4 ${doc.fileType.toLowerCase().includes('pdf') ? 'text-red-500' : 'text-blue-500'}`} />
                      {doc.documentName}
                    </div>
                  </td>
                  <td className="px-4 py-5">
                    <span className="bg-cyan-500 text-white text-[9px] font-bold px-2 py-1 rounded uppercase">
                      {doc.category}
                    </span>
                  </td>
                  <td className="px-4 py-5">
                    {doc.subCategory ? (
                      <span className="bg-orange-400 text-white text-[9px] font-bold px-2 py-1 rounded uppercase">
                        {doc.subCategory}
                      </span>
                    ) : '-'}
                  </td>
                  <td className="px-4 py-5 text-center">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded text-white ${
                      doc.fileType.toLowerCase().includes('pdf') ? 'bg-red-500' : 'bg-blue-500'
                    }`}>
                      {doc.fileType.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-4 py-5 text-gray-500">{formatFileSize(doc.fileSize)}</td>
                  <td className="px-4 py-5 text-gray-400 italic">{doc.remarks || '-'}</td>
                  <td className="px-4 py-5 text-gray-400">{new Date(doc.uploadedAt).toLocaleString()}</td>
                  <td className="px-4 py-5">
                    <div className="flex items-center justify-center gap-1.5">
                      <a 
                        href={`${API_URL}${doc.filePath}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-1.5 bg-cyan-100 text-cyan-600 rounded hover:bg-cyan-600 hover:text-white transition-all"
                        title="View Document"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </a>
                      <a 
                        href={`${API_URL}${doc.filePath}`} 
                        download={doc.documentName}
                        className="p-1.5 bg-blue-100 text-blue-600 rounded hover:bg-blue-600 hover:text-white transition-all"
                        title="Download"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </a>
                      <button 
                        onClick={() => handleDelete(doc.id)}
                        className="p-1.5 bg-red-100 text-red-600 rounded hover:bg-red-600 hover:text-white transition-all"
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
      </div>

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
    </div>
  );
}

