import { Upload, File, FileText, Image, CheckCircle, X, LayoutDashboard, Files, Plus, Lightbulb, ChevronDown, RefreshCw, AlertCircle } from 'lucide-react';
import { useState } from 'react';

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

  const user = JSON.parse(localStorage.getItem('user') || '{"email": "anonymous@company.com"}');

  const categories = ['KYC Documents', 'Educational Documents', 'Work Experience', 'Certifications', 'Other'];
  const subCategories = ['Identity Proof', 'Address Proof', 'Degree Certificate', 'Offer Letter', 'Payslip'];

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
    data.append('EmployeeEmail', user.email || user.Email); // Handle different case from login
    data.append('Category', formData.category);
    data.append('SubCategory', formData.subCategory);
    data.append('SubSubCategory', formData.subSubCategory);
    data.append('DocumentName', formData.documentName);
    data.append('Remarks', formData.remarks);

    try {
      const response = await fetch('http://localhost:5076/api/documents/upload', {
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
        // Clear file input manually if needed
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
    <div className="p-4 bg-[#f8f9fc] min-h-screen font-sans">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-gray-700">
          <Upload className="w-5 h-5" />
          <h1 className="text-lg font-bold uppercase tracking-tight">Upload Documents</h1>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => onNavigate?.('/dashboard')}
            className="flex items-center gap-2 px-4 py-2 bg-[#4e73df] text-white text-[11px] font-bold rounded shadow-sm hover:opacity-90 transition-all uppercase"
          >
            <LayoutDashboard className="w-3.5 h-3.5" /> Dashboard
          </button>
          <button 
            onClick={() => onNavigate?.('/my-documents')}
            className="flex items-center gap-2 px-4 py-2 bg-[#4e73df] text-white text-[11px] font-bold rounded shadow-sm hover:opacity-90 transition-all uppercase"
          >
            <Files className="w-3.5 h-3.5" /> My Documents
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleUpload} className="bg-white rounded-lg shadow-sm border border-gray-100 mb-6 overflow-hidden">
          <div className="bg-[#0061f2] p-4 flex items-center gap-2">
            <Upload className="w-4 h-4 text-white" />
            <h2 className="text-white font-bold text-xs uppercase tracking-wider">Upload New Document</h2>
          </div>

          <div className="p-10 space-y-8">
            {error && (
              <div className="p-4 bg-rose-50 border border-rose-100 rounded-xl flex items-center gap-3 text-rose-600 animate-shake">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <p className="text-[11px] font-black uppercase tracking-widest">{error}</p>
              </div>
            )}

            {success && (
              <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center gap-3 text-emerald-600">
                <CheckCircle className="w-5 h-5 flex-shrink-0" />
                <p className="text-[11px] font-black uppercase tracking-widest">Document uploaded successfully!</p>
              </div>
            )}

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-[11px] font-bold text-gray-600 uppercase tracking-wide">
                  <Files className="w-3.5 h-3.5 text-blue-600" /> Document Category <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select 
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-3 pr-10 py-3 bg-white border border-gray-200 rounded-lg text-xs text-gray-500 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-100 appearance-none transition-all"
                  >
                    <option value="">Select Document Category</option>
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-[11px] font-bold text-gray-600 uppercase tracking-wide">
                  <Files className="w-3.5 h-3.5 text-blue-600" /> Sub Document Category
                </label>
                <div className="relative">
                  <select 
                    name="subCategory"
                    value={formData.subCategory}
                    onChange={handleInputChange}
                    className="w-full pl-3 pr-10 py-3 bg-white border border-gray-200 rounded-lg text-xs text-gray-500 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-100 appearance-none transition-all"
                  >
                    <option value="">Select Sub Document Category</option>
                    {subCategories.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[11px] font-bold text-gray-600 uppercase tracking-wide">
                <FileText className="w-3.5 h-3.5 text-blue-600" /> Document Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="documentName"
                value={formData.documentName}
                onChange={handleInputChange}
                required
                placeholder="e.g., Aadhar Card, Passport, Resume, Certificate"
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-xs text-gray-600 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-100 transition-all placeholder:text-gray-300"
              />
              <p className="text-[10px] text-gray-400 mt-1 font-medium italic">Enter a descriptive name for your document</p>
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[11px] font-bold text-gray-600 uppercase tracking-wide">
                <Plus className="w-3.5 h-3.5 text-blue-600" /> Select File <span className="text-red-500">*</span>
              </label>
              <div className="border border-dashed border-gray-300 rounded-lg p-2 flex items-center bg-[#fdfdfd]">
                <input 
                  type="file" 
                  onChange={handleFileChange}
                  className="text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-[11px] file:font-bold file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100 cursor-pointer w-full"
                />
              </div>
              <div className="flex items-center gap-1.5 mt-2 text-[10px] text-gray-400 font-bold uppercase tracking-tight">
                <CheckCircle className="w-3 h-3 text-blue-500" />
                <span>PDF, DOC, XLS, JPG, PNG (Max 100MB)</span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[11px] font-bold text-gray-600 uppercase tracking-wide">
                <Files className="w-3.5 h-3.5 text-blue-600" /> Remarks (Optional)
              </label>
              <textarea
                name="remarks"
                value={formData.remarks}
                onChange={handleInputChange}
                placeholder="Add any additional notes or description about this document..."
                rows={3}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-xs text-gray-600 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-100 transition-all placeholder:text-gray-300"
              />
            </div>

            <div className="space-y-3 pt-4">
              <button 
                type="submit"
                disabled={loading}
                className={`w-full py-3.5 bg-[#0061f2] text-white text-[11px] font-extrabold rounded-lg shadow-lg shadow-blue-200 uppercase tracking-widest hover:opacity-90 transition-all flex items-center justify-center gap-2 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                {loading ? 'Uploading...' : 'Upload Document'}
              </button>
              <button 
                type="button"
                onClick={() => setFormData({ category: '', subCategory: '', subSubCategory: '', documentName: '', remarks: '' })}
                className="w-full py-3 bg-white border border-purple-200 text-purple-600 text-[11px] font-extrabold rounded-lg uppercase tracking-widest hover:bg-purple-50 transition-all flex items-center justify-center gap-2"
              >
                <X className="w-4 h-4" /> Reset Form
              </button>
            </div>
          </div>
        </form>

        <div className="bg-[#fdfdfd] border border-gray-100 rounded-lg p-6 flex gap-6 mt-8">
          <div className="w-12 h-12 bg-amber-400 rounded-full flex items-center justify-center shrink-0 shadow-lg shadow-amber-100">
            <Lightbulb className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-gray-800 text-sm mb-3">Quick Tips:</h3>
            <ul className="text-xs text-gray-500 space-y-2 list-disc ml-4 font-medium">
              <li>Ensure your document is clear and readable before uploading</li>
              <li>Use descriptive names to easily identify documents later</li>
              <li>PDF format is recommended for official documents</li>
              <li>You can upload multiple documents one by one</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

