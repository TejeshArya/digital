import { Upload, File, FileText, Image, CheckCircle, X, LayoutDashboard, Files, Plus, Lightbulb, ChevronDown } from 'lucide-react';
import { useState } from 'react';

export function UploadDocuments() {
  return (
    <div className="p-4 bg-[#f8f9fc] min-h-screen font-sans">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-gray-700">
          <Upload className="w-5 h-5" />
          <h1 className="text-lg font-bold uppercase tracking-tight">Upload Documents</h1>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-[#4e73df] text-white text-[11px] font-bold rounded shadow-sm hover:opacity-90 transition-all uppercase">
            <LayoutDashboard className="w-3.5 h-3.5" /> Dashboard
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#4e73df] text-white text-[11px] font-bold rounded shadow-sm hover:opacity-90 transition-all uppercase">
            <Files className="w-3.5 h-3.5" /> My Documents
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#1cc88a] text-white text-[11px] font-bold rounded shadow-sm hover:opacity-90 transition-all uppercase">
            <Plus className="w-3.5 h-3.5" /> Upload New
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Form Area */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 mb-6 overflow-hidden">
          <div className="bg-[#0061f2] p-4 flex items-center gap-2">
            <Upload className="w-4 h-4 text-white" />
            <h2 className="text-white font-bold text-xs uppercase tracking-wider">Upload New Document</h2>
          </div>

          <div className="p-10 space-y-8">
            {/* Category Dropdowns */}
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-[11px] font-bold text-gray-600 uppercase tracking-wide">
                  <Files className="w-3.5 h-3.5 text-blue-600" /> Document Category <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select className="w-full pl-3 pr-10 py-3 bg-white border border-gray-200 rounded-lg text-xs text-gray-500 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-100 appearance-none transition-all">
                    <option>Select Document Category</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-[11px] font-bold text-gray-600 uppercase tracking-wide">
                  <Files className="w-3.5 h-3.5 text-blue-600" /> Sub Document Category <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select className="w-full pl-3 pr-10 py-3 bg-[#f8f9fc] border border-gray-200 rounded-lg text-xs text-gray-400 focus:outline-none appearance-none cursor-not-allowed">
                    <option>Select Sub Document Category</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-[11px] font-bold text-gray-600 uppercase tracking-wide">
                  <Files className="w-3.5 h-3.5 text-blue-600" /> Sub-Sub Document Category <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select className="w-full pl-3 pr-10 py-3 bg-[#f8f9fc] border border-gray-200 rounded-lg text-xs text-gray-400 focus:outline-none appearance-none cursor-not-allowed">
                    <option>Select Sub-Sub Document Category</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Document Name */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[11px] font-bold text-gray-600 uppercase tracking-wide">
                <FileText className="w-3.5 h-3.5 text-blue-600" /> Document Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g., Aadhar Card, Passport, Resume, Certificate"
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-xs text-gray-600 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-100 transition-all placeholder:text-gray-300"
              />
              <p className="text-[10px] text-gray-400 mt-1 font-medium italic">Enter a descriptive name for your document</p>
            </div>

            {/* File Selection */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[11px] font-bold text-gray-600 uppercase tracking-wide">
                <Plus className="w-3.5 h-3.5 text-blue-600" /> Select File <span className="text-red-500">*</span>
              </label>
              <div className="border border-dashed border-gray-300 rounded-lg p-1 flex items-center bg-[#fdfdfd]">
                <button className="px-6 py-2 bg-white border border-gray-200 text-[11px] font-bold text-gray-600 rounded-lg hover:bg-gray-50 mr-4 shadow-sm">
                  Choose File
                </button>
                <span className="text-xs text-gray-400 font-medium italic">No file chosen</span>
              </div>
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-3 h-3 text-blue-500" />
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">Allowed formats: PDF, DOC, DOCX, XLS, XLSX, CSV, JPG, JPEG, PNG, GIF, WEBP, TXT</span>
                </div>
              </div>
              <div className="flex items-center gap-1.5 mt-1">
                <Files className="w-3 h-3 text-gray-400" />
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">Max file size: 100 MB</span>
              </div>
            </div>

            {/* Remarks */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[11px] font-bold text-gray-600 uppercase tracking-wide">
                <Files className="w-3.5 h-3.5 text-blue-600" /> Remarks (Optional)
              </label>
              <textarea
                placeholder="Add any additional notes or description about this document..."
                rows={3}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-xs text-gray-600 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-100 transition-all placeholder:text-gray-300"
              />
              <p className="text-[10px] text-gray-400 mt-1 font-medium italic">Provide context or details about this document (max 1000 characters)</p>
            </div>

            {/* Buttons */}
            <div className="space-y-3 pt-4">
              <button className="w-full py-3.5 bg-[#0061f2] text-white text-[11px] font-extrabold rounded-lg shadow-lg shadow-blue-200 uppercase tracking-widest hover:opacity-90 transition-all flex items-center justify-center gap-2">
                <Upload className="w-4 h-4" /> Upload Document
              </button>
              <button className="w-full py-3 bg-white border border-purple-200 text-purple-600 text-[11px] font-extrabold rounded-lg uppercase tracking-widest hover:bg-purple-50 transition-all flex items-center justify-center gap-2">
                <X className="w-4 h-4" /> Cancel
              </button>
            </div>
          </div>
        </div>

        {/* Quick Tips Section */}
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
              <li>Large files may take longer to upload depending on your internet speed</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-12 flex justify-between items-center text-[10px] text-gray-400 px-2 uppercase font-bold tracking-widest">
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
