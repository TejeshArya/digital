import { useState, useEffect } from 'react';
import { Upload, FileText, Folder, Tag, ArrowLeft, Files, Plus, CheckCircle, AlertCircle, ChevronDown, RefreshCw } from 'lucide-react';

interface UploadDocumentsProps {
  onNavigate?: (path: string) => void;
}

export function UploadDocuments({ onNavigate }: UploadDocumentsProps) {
  const [formData, setFormData] = useState({
    category: '',
    subCategory: '',
    subSubCategory: '',
    documentName: '',
    remarks: ''
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [categories, setCategories] = useState<any[]>([]);
  const [subCategories, setSubCategories] = useState<any[]>([]);
  const [subSubCategories, setSubSubCategories] = useState<any[]>([]);

  const user = JSON.parse(localStorage.getItem('user') || '{"email": "anonymous@company.com"}');

  useEffect(() => {
    fetchMasterData();
  }, []);

  const fetchMasterData = async () => {
    try {
      const [catRes, subRes, subSubRes] = await Promise.all([
        fetch('https://dee-backend-7x0g.onrender.com/api/MasterData/category/Document%20Category'),
        fetch('https://dee-backend-7x0g.onrender.com/api/MasterData/category/Sub%20Document%20Category'),
        fetch('https://dee-backend-7x0g.onrender.com/api/MasterData/category/Sub-Sub%20Document%20Category')
      ]);
      setCategories(await catRes.json());
      setSubCategories(await subRes.json());
      setSubSubCategories(await subSubRes.json());
    } catch (e) {
      console.error('Error fetching master data:', e);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile || !formData.category || !formData.documentName) {
      setError('Please fill all required fields and select a file.');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    const data = new FormData();
    data.append('File', selectedFile);
    data.append('EmployeeEmail', user.email || user.Email);
    data.append('Category', formData.category);
    data.append('SubCategory', formData.subCategory);
    data.append('SubSubCategory', formData.subSubCategory);
    data.append('DocumentName', formData.documentName);
    data.append('Remarks', formData.remarks);

    try {
      const response = await fetch('https://dee-backend-7x0g.onrender.com/api/documents/upload', {
        method: 'POST',
        body: data
      });

      if (response.ok) {
        setSuccess(true);
        setFormData({
          category: '',
          subCategory: '',
          subSubCategory: '',
          documentName: '',
          remarks: ''
        });
        setSelectedFile(null);
      } else {
        const errData = await response.json();
        setError(errData.message || 'Failed to upload document.');
      }
    } catch (err) {
      console.error('Upload error:', err);
      setError('Connection error. Please ensure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-[#f8f9fc] min-h-screen font-sans">
      {/* Top Header Section */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2 text-gray-800">
          <Upload className="w-6 h-6 text-gray-600" />
          <h1 className="text-xl font-bold tracking-tight text-gray-800">Upload Documents</h1>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => onNavigate?.('/dashboard')}
            className="flex items-center gap-1.5 px-4 py-2 bg-[#6b21a8] text-white text-[12px] font-semibold rounded hover:bg-[#581c87] transition-all shadow-sm uppercase tracking-wider"
          >
            <ArrowLeft className="w-4 h-4" /> Dashboard
          </button>
          <button 
            onClick={() => onNavigate?.('/my-documents')}
            className="flex items-center gap-1.5 px-4 py-2 bg-[#0d6efd] text-white text-[12px] font-semibold rounded hover:bg-[#0b5ed7] transition-all shadow-sm uppercase tracking-wider"
          >
            <Files className="w-4 h-4" /> My Documents
          </button>
          <button 
            onClick={() => {
              setFormData({ category: '', subCategory: '', subSubCategory: '', documentName: '', remarks: '' });
              setSelectedFile(null);
              setSuccess(false);
              setError(null);
            }}
            className="flex items-center gap-1.5 px-4 py-2 bg-[#198754] text-white text-[12px] font-semibold rounded hover:bg-[#157347] transition-all shadow-sm uppercase tracking-wider"
          >
            <Plus className="w-4 h-4" /> Upload New
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleUpload} className="bg-white rounded-lg shadow-sm border border-gray-100 mb-6 overflow-hidden">
          <div className="bg-[#0061f2] p-4 flex items-center gap-2.5">
            <Upload className="w-5 h-5 text-white" />
            <h2 className="text-white font-bold text-[13px] uppercase tracking-wider">Upload New Document</h2>
          </div>

          <div className="p-8 space-y-6">
            {error && (
              <div className="p-4 bg-rose-50 border border-rose-100 rounded-lg flex items-center gap-3 text-rose-600">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <p className="text-[11px] font-bold uppercase tracking-wider">{error}</p>
              </div>
            )}

            {success && (
              <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-lg flex items-center gap-3 text-emerald-600">
                <CheckCircle className="w-5 h-5 flex-shrink-0" />
                <p className="text-[11px] font-bold uppercase tracking-wider">Document uploaded successfully!</p>
              </div>
            )}

            {/* Document Category */}
            <div className="space-y-1.5">
              <label className="flex items-center gap-1.5 text-[11px] font-bold text-gray-500 uppercase tracking-wide">
                <Folder className="w-3.5 h-3.5 text-blue-600" /> Document Category <span className="text-red-500 ml-0.5">*</span>
              </label>
              <div className="relative">
                <select 
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded text-sm text-gray-700 focus:outline-none focus:border-blue-400 appearance-none transition-all"
                >
                  <option value="">Select Document Category</option>
                  {categories.map(c => <option key={c.id} value={c.value}>{c.value}</option>)}
                </select>
                <ChevronDown className="absolute right-3 top-3.5 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Sub Document Category */}
            <div className="space-y-1.5">
              <label className="flex items-center gap-1.5 text-[11px] font-bold text-gray-500 uppercase tracking-wide">
                <Folder className="w-3.5 h-3.5 text-blue-600" /> Sub Document Category <span className="text-red-500 ml-0.5">*</span>
              </label>
              <div className="relative">
                <select 
                  name="subCategory"
                  value={formData.subCategory}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded text-sm text-gray-700 focus:outline-none focus:border-blue-400 appearance-none transition-all"
                >
                  <option value="">Select Sub Document Category</option>
                  {subCategories.map(s => <option key={s.id} value={s.value}>{s.value}</option>)}
                </select>
                <ChevronDown className="absolute right-3 top-3.5 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Sub-Sub Document Category */}
            <div className="space-y-1.5">
              <label className="flex items-center gap-1.5 text-[11px] font-bold text-gray-500 uppercase tracking-wide">
                <Folder className="w-3.5 h-3.5 text-blue-600" /> Sub-Sub Document Category <span className="text-red-500 ml-0.5">*</span>
              </label>
              <div className="relative">
                <select 
                  name="subSubCategory"
                  value={formData.subSubCategory}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded text-sm text-gray-700 focus:outline-none focus:border-blue-400 appearance-none transition-all"
                >
                  <option value="">Select Sub-Sub Document Category</option>
                  {subSubCategories.map(ss => <option key={ss.id} value={ss.value}>{ss.value}</option>)}
                </select>
                <ChevronDown className="absolute right-3 top-3.5 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Document Name */}
            <div className="space-y-1.5">
              <label className="flex items-center gap-1.5 text-[11px] font-bold text-gray-500 uppercase tracking-wide">
                <Tag className="w-3.5 h-3.5 text-blue-600" /> Document Name <span className="text-red-500 ml-0.5">*</span>
              </label>
              <input
                type="text"
                name="documentName"
                value={formData.documentName}
                onChange={handleInputChange}
                required
                placeholder="e.g., Aadhar Card, Passport, Resume, Certificate"
                className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded text-sm text-gray-700 focus:outline-none focus:border-blue-400 transition-all placeholder:text-gray-300"
              />
              <p className="text-[10px] text-gray-400 mt-1 font-medium">Enter a descriptive name for your document</p>
            </div>

            {/* Select File */}
            <div className="space-y-1.5">
              <label className="flex items-center gap-1.5 text-[11px] font-bold text-gray-500 uppercase tracking-wide">
                <FileText className="w-3.5 h-3.5 text-blue-600" /> Select File <span className="text-red-500 ml-0.5">*</span>
              </label>
              <div className="border border-dashed border-gray-300 rounded-lg p-2.5 flex items-center bg-gray-50/30">
                <input 
                  type="file" 
                  onChange={handleFileChange}
                  required
                  className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-r file:border-gray-200 file:text-[12px] file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200 cursor-pointer w-full"
                />
              </div>
            </div>

            {/* Remarks */}
            <div className="space-y-1.5">
              <label className="flex items-center gap-1.5 text-[11px] font-bold text-gray-500 uppercase tracking-wide">
                <FileText className="w-3.5 h-3.5 text-blue-600" /> Remarks (Optional)
              </label>
              <textarea
                name="remarks"
                value={formData.remarks}
                onChange={handleInputChange}
                placeholder="Add any additional notes or description about this document..."
                rows={3}
                className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded text-sm text-gray-700 focus:outline-none focus:border-blue-400 transition-all placeholder:text-gray-300"
              />
            </div>

            {/* Submit & Reset Buttons */}
            <div className="flex gap-2 pt-4">
              <button 
                type="submit"
                disabled={loading}
                className={`flex-1 py-3 bg-[#0061f2] text-white text-[12px] font-bold rounded shadow-sm uppercase tracking-wider hover:bg-blue-700 transition-all flex items-center justify-center gap-2 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                {loading ? 'Uploading...' : 'Upload Document'}
              </button>
              <button 
                type="button"
                onClick={() => setFormData({ category: '', subCategory: '', subSubCategory: '', documentName: '', remarks: '' })}
                className="px-6 py-3 bg-gray-100 text-gray-600 text-[12px] font-bold rounded uppercase tracking-wider hover:bg-gray-200 transition-all"
              >
                Reset Form
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
