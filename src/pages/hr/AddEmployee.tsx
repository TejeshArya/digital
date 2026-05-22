import React, { useState, useRef } from 'react';
import {
  User, Mail, Calendar, GraduationCap, IndianRupee,
  FileText, Lock, RefreshCw, AlertCircle, ArrowLeft,
  Layout, ShieldCheck, CheckCircle, UserPlus,
  X, Copy, Eye, EyeOff, Sparkles, ClipboardList, Send,
  ChevronRight, ChevronDown, Phone, MapPin, CreditCard,
  Building2, Users, Heart, Upload, Paperclip, Image,
  Briefcase, Hash, Home, UserCheck, BadgeCheck, Landmark
} from 'lucide-react';

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────
interface AddEmployeeProps {
  onNavigate?: (path: string) => void;
}

interface EmployeeFormData {
  // Step 1 — Basic Info
  fullName: string;
  officialEmail: string;
  employeeCode: string;
  dateOfJoining: string;
  department: string;
  designation: string;
  coreQualification: string[];
  annualSalary: string;
  remarks: string;

  // Step 2 — Personal Details
  dateOfBirth: string;
  gender: string;
  maritalStatus: string;
  bloodGroup: string;
  religion: string;
  category: string;
  mobileNumber: string;
  alternateNumber: string;

  // Step 3 — Address
  currentAddressLine: string;
  currentCity: string;
  currentState: string;
  currentPincode: string;
  sameAsCurrent: boolean;
  permanentAddressLine: string;
  permanentCity: string;
  permanentState: string;
  permanentPincode: string;

  // Step 4 — Government IDs
  aadharNumber: string;
  panNumber: string;
  uanNumber: string;
  esicNumber: string;
  passportNumber: string;
  pvcNumber: string;

  // Step 5 — Bank Details
  bankName: string;
  accountNumber: string;
  ifscCode: string;
  branchName: string;
  accountType: string;

  // Step 6 — Emergency & Family
  emergencyName: string;
  emergencyPhone: string;
  emergencyRelation: string;
  fatherName: string;
  motherName: string;
  spouseName: string;
  nomineeName: string;
  nomineeRelation: string;
  nomineeDOB: string;

  // Step 8 — Credentials
  password: string;
  confirmPassword: string;
}

interface UploadedDocs {
  photo: File | null;
  aadharCard: File | null;
  panCard: File | null;
  bankPassbook: File | null;
  pvc: File | null;
  educationCerts: File[];
  experienceLetter: File | null;
  offerLetter: File | null;
  otherDocs: File[];
}

// ─────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────
const QUALIFICATIONS = [
  'B.E / B.TECH', 'MBA', 'MCA', 'M.TECH', 'Ph.D',
  'B.COM', 'M.COM', 'B.SC', 'M.SC', 'DIPLOMA', 'ITI', '10th Pass', '12th Pass',
];

const DEPARTMENTS = [
  'Human Resources', 'Finance & Accounts', 'Information Technology',
  'Operations', 'Sales & Marketing', 'Legal & Compliance',
  'Administration', 'Production', 'Quality Assurance', 'Logistics',
];

const BLOOD_GROUPS = ['A+', 'A−', 'B+', 'B−', 'AB+', 'AB−', 'O+', 'O−'];
const ACCOUNT_TYPES = ['Savings', 'Current', 'Salary'];
const CATEGORIES = ['General', 'OBC', 'SC', 'ST', 'EWS'];
const RELIGIONS = ['Hindu', 'Muslim', 'Christian', 'Sikh', 'Buddhist', 'Jain', 'Others'];

const STEPS = [
  { id: 1,  label: 'Basic Info',      sublabel: 'Identity & Role'      },
  { id: 2,  label: 'Personal',        sublabel: 'Profile Details'      },
  { id: 3,  label: 'Address',         sublabel: 'Current & Permanent'  },
  { id: 4,  label: 'Govt. IDs',       sublabel: 'Aadhar, PAN, UAN'     },
  { id: 5,  label: 'Bank',            sublabel: 'Account Details'      },
  { id: 6,  label: 'Family',          sublabel: 'Emergency & Nominee'  },
  { id: 7,  label: 'Documents',       sublabel: 'Upload Files'         },
  { id: 8,  label: 'Credentials',     sublabel: 'Login Setup'          },
  { id: 9,  label: 'Review',          sublabel: 'Confirm & Submit'     },
];

const EMPTY_FORM: EmployeeFormData = {
  fullName: '', officialEmail: '', employeeCode: '', dateOfJoining: '',
  department: '', designation: '', coreQualification: [], annualSalary: '', remarks: '',
  dateOfBirth: '', gender: '', maritalStatus: '', bloodGroup: '', religion: '', category: '',
  mobileNumber: '', alternateNumber: '',
  currentAddressLine: '', currentCity: '', currentState: '', currentPincode: '',
  sameAsCurrent: false,
  permanentAddressLine: '', permanentCity: '', permanentState: '', permanentPincode: '',
  aadharNumber: '', panNumber: '', uanNumber: '', esicNumber: '', passportNumber: '', pvcNumber: '',
  bankName: '', accountNumber: '', ifscCode: '', branchName: '', accountType: '',
  emergencyName: '', emergencyPhone: '', emergencyRelation: '',
  fatherName: '', motherName: '', spouseName: '', nomineeName: '', nomineeRelation: '', nomineeDOB: '',
  password: '', confirmPassword: '',
};

const EMPTY_DOCS: UploadedDocs = {
  photo: null, aadharCard: null, panCard: null, bankPassbook: null, pvc: null,
  educationCerts: [], experienceLetter: null, offerLetter: null, otherDocs: [],
};

// ─────────────────────────────────────────────
// Shared UI helpers
// ─────────────────────────────────────────────
const inputCls =
  'w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-lg text-[13px] font-bold text-gray-700 focus:outline-none focus:border-blue-400 focus:bg-white transition-all';

function FieldLabel({ icon, text }: { icon?: React.ReactNode; text: string; required?: boolean; optional?: boolean }) {
  return (
    <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] flex items-center gap-2">
      {icon && <span className="text-gray-300">{icon}</span>}
      {text}
    </label>
  );
}

function SectionBanner({ color, icon, title, desc }: {
  color: 'blue' | 'purple' | 'teal' | 'emerald' | 'amber' | 'rose' | 'indigo';
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  const p: Record<string, { wrap: string; iconBg: string; text: string }> = {
    blue:    { wrap: 'bg-blue-50 border-blue-100',     iconBg: 'bg-blue-600',    text: 'text-blue-800'    },
    purple:  { wrap: 'bg-purple-50 border-purple-100', iconBg: 'bg-purple-600',  text: 'text-purple-800'  },
    teal:    { wrap: 'bg-teal-50 border-teal-100',     iconBg: 'bg-teal-600',    text: 'text-teal-800'    },
    emerald: { wrap: 'bg-emerald-50 border-emerald-100',iconBg:'bg-emerald-600', text: 'text-emerald-800' },
    amber:   { wrap: 'bg-amber-50 border-amber-100',   iconBg: 'bg-amber-600',   text: 'text-amber-800'   },
    rose:    { wrap: 'bg-rose-50 border-rose-100',     iconBg: 'bg-rose-600',    text: 'text-rose-800'    },
    indigo:  { wrap: 'bg-indigo-50 border-indigo-100', iconBg: 'bg-indigo-600',  text: 'text-indigo-800'  },
  };
  const palette = p[color];
  return (
    <div className={`border rounded-lg p-4 mb-6 ${palette.wrap}`}>
      <div className={`flex items-start gap-3 ${palette.text}`}>
        <div className={`${palette.iconBg} p-1.5 rounded-full mt-0.5 flex-shrink-0`}>
          <span className="text-white">{icon}</span>
        </div>
        <div>
          <h3 className="text-[12px] font-black uppercase tracking-widest mb-0.5">{title}</h3>
          <p className="text-[11px] font-medium opacity-80">{desc}</p>
        </div>
      </div>
    </div>
  );
}

function NativeSelect({ name, value, onChange, children, required }: {
  name: string; value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  children: React.ReactNode; required?: boolean;
}) {
  return (
    <select name={name} value={value} onChange={onChange} required={required}
      className={`${inputCls} appearance-none cursor-pointer`}>
      {children}
    </select>
  );
}

// ─────────────────────────────────────────────
// Step Indicator
// ─────────────────────────────────────────────
function StepIndicator({ currentStep }: { currentStep: number }) {
  return (
    <div>
      {/* Mobile: compact progress */}
      <div className="flex items-center gap-2 md:hidden mb-2">
        {STEPS.map(s => (
          <div key={s.id} className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
            s.id < currentStep ? 'bg-[#0061f2]' : s.id === currentStep ? 'bg-[#0061f2]' : 'bg-gray-200'
          }`} />
        ))}
      </div>
      {/* Desktop: full steps */}
      <div className="hidden md:flex items-center justify-center flex-wrap gap-y-2 py-2">
        {STEPS.map((step, idx) => {
          const done   = step.id < currentStep;
          const active = step.id === currentStep;
          return (
            <React.Fragment key={step.id}>
              <div className="flex items-center gap-2">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                  done   ? 'bg-[#0061f2] shadow-md shadow-blue-100'
                  : active ? 'bg-[#0061f2] ring-4 ring-blue-100 shadow-md shadow-blue-100'
                  : 'bg-gray-200'
                }`}>
                  {done
                    ? <CheckCircle className="w-3.5 h-3.5 text-white" />
                    : <span className={`text-[11px] font-black ${active ? 'text-white' : 'text-gray-500'}`}>{step.id}</span>
                  }
                </div>
                <div className="flex flex-col leading-tight">
                  <span className={`text-[10px] font-black uppercase tracking-wide ${done || active ? 'text-[#0061f2]' : 'text-gray-400'}`}>
                    {step.label}
                  </span>
                  <span className="text-[8px] text-gray-400 font-bold">{step.sublabel}</span>
                </div>
              </div>
              {idx < STEPS.length - 1 && (
                <div className="flex items-center gap-0.5 mx-1.5 mb-3">
                  <div className={`h-0.5 w-5 rounded-full ${step.id < currentStep ? 'bg-[#0061f2]' : 'bg-gray-200'}`} />
                  <ChevronRight className={`w-3 h-3 flex-shrink-0 ${step.id < currentStep ? 'text-[#0061f2]' : 'text-gray-300'}`} />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Multi-Select Qualification Dropdown
// ─────────────────────────────────────────────
function QualificationMultiSelect({ selected, onChange }: { selected: string[]; onChange: (v: string[]) => void }) {
  const [open, setOpen] = useState(false);
  const toggle = (q: string) => onChange(selected.includes(q) ? selected.filter(s => s !== q) : [...selected, q]);
  const remove = (q: string) => onChange(selected.filter(s => s !== q));
  return (
    <div className="relative">
      <button type="button" onClick={() => setOpen(o => !o)}
        className={`${inputCls} flex items-center justify-between gap-2 text-left`}>
        <span className={selected.length === 0 ? 'text-gray-400' : 'text-gray-700'}>
          {selected.length === 0 ? '-- Select Qualifications --' : `${selected.length} selected`}
        </span>
        <ChevronDown className={`w-4 h-4 text-gray-400 flex-shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute z-20 mt-1 w-full bg-white border border-gray-100 rounded-xl shadow-lg overflow-hidden">
            <div className="px-3 py-2 bg-gray-50/60 border-b border-gray-100">
              <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Select all that apply</p>
            </div>
            <ul className="max-h-48 overflow-y-auto divide-y divide-gray-50">
              {QUALIFICATIONS.map(q => {
                const checked = selected.includes(q);
                return (
                  <li key={q} onClick={() => toggle(q)}
                    className={`flex items-center gap-3 px-4 py-2.5 cursor-pointer text-[12px] font-bold transition-colors ${checked ? 'bg-blue-50 text-[#0061f2]' : 'text-gray-600 hover:bg-gray-50'}`}>
                    <span className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors ${checked ? 'bg-[#0061f2] border-[#0061f2]' : 'border-gray-300 bg-white'}`}>
                      {checked && <CheckCircle className="w-3 h-3 text-white" />}
                    </span>
                    {q}
                  </li>
                );
              })}
            </ul>
          </div>
        </>
      )}
      {selected.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-2">
          {selected.map(q => (
            <span key={q} className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-50 border border-blue-100 text-blue-700 text-[10px] font-black rounded-full uppercase tracking-wide">
              {q}
              <button type="button" onClick={e => { e.stopPropagation(); remove(q); }} className="text-blue-400 hover:text-blue-700 ml-0.5">
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
// File Upload Widget
// ─────────────────────────────────────────────
function FileUploadBox({ label, icon, accept, file, onChange, required, hint }: {
  label: string; icon: React.ReactNode; accept: string;
  file: File | null; onChange: (f: File | null) => void;
  required?: boolean; hint?: string;
}) {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <div className="space-y-2">
      <FieldLabel icon={icon} text={label} required={required} optional={!required} />
      {file ? (
        <div className="flex items-center justify-between px-4 py-3 bg-emerald-50 border border-emerald-100 rounded-lg">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <div>
              <p className="text-[11px] font-black text-emerald-700 truncate max-w-[200px]">{file.name}</p>
              <p className="text-[9px] text-emerald-500 font-bold">{(file.size / 1024).toFixed(1)} KB</p>
            </div>
          </div>
          <button type="button" onClick={() => onChange(null)} className="text-emerald-400 hover:text-rose-500 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <button type="button" onClick={() => ref.current?.click()}
          className="w-full flex flex-col items-center justify-center gap-2 px-4 py-5 bg-gray-50 border-2 border-dashed border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50/30 transition-all cursor-pointer">
          <span className="text-gray-300">{icon}</span>
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Click to Upload</span>
          {hint && <span className="text-[9px] text-gray-300 font-bold">{hint}</span>}
        </button>
      )}
      <input ref={ref} type="file" accept={accept} className="hidden"
        onChange={e => onChange(e.target.files?.[0] ?? null)} />
    </div>
  );
}

function MultiFileUploadBox({ label, icon, accept, files, onChange, hint }: {
  label: string; icon: React.ReactNode; accept: string;
  files: File[]; onChange: (f: File[]) => void; hint?: string;
}) {
  const ref = useRef<HTMLInputElement>(null);
  const addFiles = (newFiles: FileList | null) => {
    if (!newFiles) return;
    onChange([...files, ...Array.from(newFiles)]);
  };
  const remove = (idx: number) => onChange(files.filter((_, i) => i !== idx));
  return (
    <div className="space-y-2">
      <FieldLabel icon={icon} text={label} optional />
      <button type="button" onClick={() => ref.current?.click()}
        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-50 border-2 border-dashed border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50/30 transition-all text-[10px] font-black text-gray-400 uppercase tracking-widest">
        <Upload className="w-4 h-4" /> Add Files {hint && <span className="normal-case font-bold text-gray-300">({hint})</span>}
      </button>
      <input ref={ref} type="file" accept={accept} multiple className="hidden" onChange={e => addFiles(e.target.files)} />
      {files.length > 0 && (
        <div className="space-y-1.5">
          {files.map((f, i) => (
            <div key={i} className="flex items-center justify-between px-3 py-2 bg-emerald-50 border border-emerald-100 rounded-lg">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-[11px] font-black text-emerald-700 truncate max-w-[220px]">{f.name}</span>
                <span className="text-[9px] text-emerald-500 font-bold">{(f.size / 1024).toFixed(1)} KB</span>
              </div>
              <button type="button" onClick={() => remove(i)} className="text-emerald-400 hover:text-rose-500"><X className="w-3.5 h-3.5" /></button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
// Review Field
// ─────────────────────────────────────────────
function ReviewRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="px-4 py-2.5 flex flex-col gap-0.5 border-b border-gray-50 last:border-0">
      <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{label}</span>
      <span className="text-[12px] font-bold text-gray-700 break-words">{value || '—'}</span>
    </div>
  );
}

function ReviewCard({ title, icon, color, children }: {
  title: string; icon: React.ReactNode;
  color: string; children: React.ReactNode;
}) {
  return (
    <div className="bg-gray-50 border border-gray-100 rounded-xl overflow-hidden">
      <div className={`${color} px-4 py-2.5 flex items-center gap-2`}>
        {icon}
        <span className="text-[10px] font-black uppercase tracking-widest">{title}</span>
      </div>
      <div>{children}</div>
    </div>
  );
}

// ─────────────────────────────────────────────
// STEP 1 — Basic Info
// ─────────────────────────────────────────────
function Step1({ fd, ch, qch }: { fd: EmployeeFormData; ch: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>; qch: (v: string[]) => void }) {
  return (
    <div>
      <SectionBanner color="blue" icon={<UserPlus className="w-4 h-4" />}
        title="Basic Employee Information"
        desc="Enter the core identity, role, and employment details for this new employee." />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
        <div className="space-y-2">
          <FieldLabel icon={<User className="w-3.5 h-3.5" />} text="Full Name" required />
          <input type="text" name="fullName" value={fd.fullName} onChange={ch} placeholder="Enter employee's full name" required className={inputCls} />
        </div>
        <div className="space-y-2">
          <FieldLabel icon={<Mail className="w-3.5 h-3.5" />} text="Official Email ID" required />
          <input type="email" name="officialEmail" value={fd.officialEmail} onChange={ch} placeholder="employee@company.com" required className={inputCls} />
          <p className="text-[9px] text-gray-300 font-bold italic">Used for login and official communications</p>
        </div>
        <div className="space-y-2">
          <FieldLabel icon={<Hash className="w-3.5 h-3.5" />} text="Employee Code / ID" optional />
          <input type="text" name="employeeCode" value={fd.employeeCode} onChange={ch} placeholder="e.g. EMP-001 (auto-generated if blank)" className={inputCls} />
        </div>
        <div className="space-y-2">
          <FieldLabel icon={<Calendar className="w-3.5 h-3.5" />} text="Date of Joining" required />
          <input type="date" name="dateOfJoining" value={fd.dateOfJoining} onChange={ch} required className={inputCls} />
        </div>
        <div className="space-y-2">
          <FieldLabel icon={<Building2 className="w-3.5 h-3.5" />} text="Department" required />
          <NativeSelect name="department" value={fd.department} onChange={ch} required>
            <option value="">-- Select Department --</option>
            {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
          </NativeSelect>
        </div>
        <div className="space-y-2">
          <FieldLabel icon={<Briefcase className="w-3.5 h-3.5" />} text="Designation / Post" required />
          <input type="text" name="designation" value={fd.designation} onChange={ch} placeholder="e.g. Software Engineer" required className={inputCls} />
        </div>
        <div className="space-y-2 md:col-span-2">
          <FieldLabel icon={<GraduationCap className="w-3.5 h-3.5" />} text="Core Qualification" required />
          <QualificationMultiSelect selected={fd.coreQualification} onChange={qch} />
          <p className="text-[9px] text-gray-300 font-bold italic">Select all educational qualifications that apply</p>
        </div>
        <div className="space-y-2">
          <FieldLabel icon={<IndianRupee className="w-3.5 h-3.5" />} text="Annual Salary (₹)" optional />
          <input type="number" name="annualSalary" value={fd.annualSalary} onChange={ch} placeholder="Gross annual CTC" className={inputCls} />
        </div>
        <div className="space-y-2">
          <FieldLabel icon={<FileText className="w-3.5 h-3.5" />} text="Remarks / Notes" optional />
          <textarea name="remarks" value={fd.remarks} onChange={ch} placeholder="Any onboarding notes..." rows={2} className={`${inputCls} resize-none`} />
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// STEP 2 — Personal Details
// ─────────────────────────────────────────────
function Step2({ fd, ch }: { fd: EmployeeFormData; ch: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> }) {
  return (
    <div>
      <SectionBanner color="purple" icon={<User className="w-4 h-4" />}
        title="Personal Details"
        desc="Enter complete personal profile information for the employee's record." />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
        <div className="space-y-2">
          <FieldLabel icon={<Calendar className="w-3.5 h-3.5" />} text="Date of Birth" required />
          <input type="date" name="dateOfBirth" value={fd.dateOfBirth} onChange={ch} required className={inputCls} />
        </div>
        <div className="space-y-2">
          <FieldLabel icon={<User className="w-3.5 h-3.5" />} text="Gender" required />
          <NativeSelect name="gender" value={fd.gender} onChange={ch} required>
            <option value="">-- Select Gender --</option>
            <option>Male</option><option>Female</option><option>Transgender</option><option>Prefer not to say</option>
          </NativeSelect>
        </div>
        <div className="space-y-2">
          <FieldLabel icon={<Heart className="w-3.5 h-3.5" />} text="Marital Status" required />
          <NativeSelect name="maritalStatus" value={fd.maritalStatus} onChange={ch} required>
            <option value="">-- Select Status --</option>
            <option>Single</option><option>Married</option><option>Divorced</option><option>Widowed</option>
          </NativeSelect>
        </div>
        <div className="space-y-2">
          <FieldLabel icon={<Heart className="w-3.5 h-3.5" />} text="Blood Group" required />
          <NativeSelect name="bloodGroup" value={fd.bloodGroup} onChange={ch} required>
            <option value="">-- Select Blood Group --</option>
            {BLOOD_GROUPS.map(b => <option key={b} value={b}>{b}</option>)}
          </NativeSelect>
        </div>
        <div className="space-y-2">
          <FieldLabel text="Religion" optional />
          <NativeSelect name="religion" value={fd.religion} onChange={ch}>
            <option value="">-- Select Religion --</option>
            {RELIGIONS.map(r => <option key={r} value={r}>{r}</option>)}
          </NativeSelect>
        </div>
        <div className="space-y-2">
          <FieldLabel text="Category" required />
          <NativeSelect name="category" value={fd.category} onChange={ch} required>
            <option value="">-- Select Category --</option>
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </NativeSelect>
        </div>
        <div className="space-y-2">
          <FieldLabel icon={<Phone className="w-3.5 h-3.5" />} text="Mobile Number" required />
          <input type="tel" name="mobileNumber" value={fd.mobileNumber} onChange={ch} placeholder="10-digit mobile number" maxLength={10} required className={inputCls} />
        </div>
        <div className="space-y-2">
          <FieldLabel icon={<Phone className="w-3.5 h-3.5" />} text="Alternate Number" optional />
          <input type="tel" name="alternateNumber" value={fd.alternateNumber} onChange={ch} placeholder="Alternate contact number" maxLength={10} className={inputCls} />
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// STEP 3 — Address
// ─────────────────────────────────────────────
function Step3({ fd, ch, onSameToggle }: {
  fd: EmployeeFormData;
  ch: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>;
  onSameToggle: () => void;
}) {
  return (
    <div>
      <SectionBanner color="teal" icon={<MapPin className="w-4 h-4" />}
        title="Address Information"
        desc="Enter current residence and permanent address details." />

      {/* Current Address */}
      <div className="mb-6">
        <h3 className="text-[11px] font-black text-blue-700 uppercase tracking-widest flex items-center gap-2 mb-4">
          <Home className="w-4 h-4" /> Current Address
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-5">
          <div className="space-y-2 md:col-span-2">
            <FieldLabel icon={<MapPin className="w-3.5 h-3.5" />} text="Address Line" required />
            <textarea name="currentAddressLine" value={fd.currentAddressLine} onChange={ch} placeholder="House No., Street, Area, Locality" rows={2} required className={`${inputCls} resize-none`} />
          </div>
          <div className="space-y-2">
            <FieldLabel text="City" required />
            <input type="text" name="currentCity" value={fd.currentCity} onChange={ch} placeholder="City" required className={inputCls} />
          </div>
          <div className="space-y-2">
            <FieldLabel text="State" required />
            <input type="text" name="currentState" value={fd.currentState} onChange={ch} placeholder="State" required className={inputCls} />
          </div>
          <div className="space-y-2">
            <FieldLabel text="Pincode" required />
            <input type="text" name="currentPincode" value={fd.currentPincode} onChange={ch} placeholder="6-digit pincode" maxLength={6} required className={inputCls} />
          </div>
        </div>
      </div>

      {/* Same as Current toggle */}
      <div className="flex items-center gap-3 mb-5 p-3 bg-blue-50 border border-blue-100 rounded-lg cursor-pointer" onClick={onSameToggle}>
        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors ${fd.sameAsCurrent ? 'bg-[#0061f2] border-[#0061f2]' : 'border-gray-300 bg-white'}`}>
          {fd.sameAsCurrent && <CheckCircle className="w-3.5 h-3.5 text-white" />}
        </div>
        <span className="text-[11px] font-black text-blue-700 uppercase tracking-widest">Permanent address is same as current address</span>
      </div>

      {/* Permanent Address */}
      {!fd.sameAsCurrent && (
        <div>
          <h3 className="text-[11px] font-black text-purple-700 uppercase tracking-widest flex items-center gap-2 mb-4">
            <Home className="w-4 h-4" /> Permanent Address
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-5">
            <div className="space-y-2 md:col-span-2">
              <FieldLabel icon={<MapPin className="w-3.5 h-3.5" />} text="Address Line" required />
              <textarea name="permanentAddressLine" value={fd.permanentAddressLine} onChange={ch} placeholder="House No., Street, Area, Locality" rows={2} required className={`${inputCls} resize-none`} />
            </div>
            <div className="space-y-2">
              <FieldLabel text="City" required />
              <input type="text" name="permanentCity" value={fd.permanentCity} onChange={ch} placeholder="City" required className={inputCls} />
            </div>
            <div className="space-y-2">
              <FieldLabel text="State" required />
              <input type="text" name="permanentState" value={fd.permanentState} onChange={ch} placeholder="State" required className={inputCls} />
            </div>
            <div className="space-y-2">
              <FieldLabel text="Pincode" required />
              <input type="text" name="permanentPincode" value={fd.permanentPincode} onChange={ch} placeholder="6-digit pincode" maxLength={6} required className={inputCls} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
// STEP 4 — Government IDs
// ─────────────────────────────────────────────
function Step4({ fd, ch }: { fd: EmployeeFormData; ch: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> }) {
  return (
    <div>
      <SectionBanner color="amber" icon={<CreditCard className="w-4 h-4" />}
        title="Government Identity Documents"
        desc="Enter all official government-issued identification numbers for this employee." />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
        <div className="space-y-2">
          <FieldLabel icon={<CreditCard className="w-3.5 h-3.5" />} text="Aadhar Number" required />
          <input type="text" name="aadharNumber" value={fd.aadharNumber} onChange={ch} placeholder="12-digit Aadhar number" maxLength={12} required className={inputCls} />
          <p className="text-[9px] text-gray-300 font-bold italic">As per UIDAI issued Aadhar Card</p>
        </div>
        <div className="space-y-2">
          <FieldLabel icon={<CreditCard className="w-3.5 h-3.5" />} text="PAN Number" required />
          <input type="text" name="panNumber" value={fd.panNumber} onChange={ch} placeholder="e.g. ABCDE1234F" maxLength={10} required
            className={`${inputCls} uppercase`} />
          <p className="text-[9px] text-gray-300 font-bold italic">10-character PAN issued by Income Tax Department</p>
        </div>
        <div className="space-y-2">
          <FieldLabel icon={<Hash className="w-3.5 h-3.5" />} text="UAN Number" optional />
          <input type="text" name="uanNumber" value={fd.uanNumber} onChange={ch} placeholder="12-digit UAN (EPFO)" maxLength={12} className={inputCls} />
          <p className="text-[9px] text-gray-300 font-bold italic">Universal Account Number (PF)</p>
        </div>
        <div className="space-y-2">
          <FieldLabel icon={<Hash className="w-3.5 h-3.5" />} text="ESIC Number" optional />
          <input type="text" name="esicNumber" value={fd.esicNumber} onChange={ch} placeholder="ESIC Insurance Number" className={inputCls} />
          <p className="text-[9px] text-gray-300 font-bold italic">Employee State Insurance Corporation</p>
        </div>
        <div className="space-y-2">
          <FieldLabel icon={<CreditCard className="w-3.5 h-3.5" />} text="Passport Number" optional />
          <input type="text" name="passportNumber" value={fd.passportNumber} onChange={ch} placeholder="Passport number (if applicable)" className={`${inputCls} uppercase`} />
        </div>
        <div className="space-y-2">
          <FieldLabel icon={<ShieldCheck className="w-3.5 h-3.5" />} text="PVC Number" required />
          <input type="text" name="pvcNumber" value={fd.pvcNumber} onChange={ch} placeholder="Police Verification Certificate number" required className={inputCls} />
          <p className="text-[9px] text-gray-300 font-bold italic">Reference number from local police verification authority</p>
        </div>
      </div>

      <div className="mt-6 bg-amber-50 border border-amber-100 rounded-lg p-4">
        <div className="flex items-start gap-3 text-amber-800">
          <ShieldCheck className="w-4 h-4 mt-0.5 flex-shrink-0 text-amber-600" />
          <div>
            <p className="text-[11px] font-black uppercase tracking-widest mb-1">Data Confidentiality Notice</p>
            <p className="text-[10px] font-medium opacity-80">All government ID numbers are encrypted and stored securely. Access is restricted to authorized HR and IT administrators only.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// STEP 5 — Bank Details
// ─────────────────────────────────────────────
function Step5({ fd, ch }: { fd: EmployeeFormData; ch: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> }) {
  return (
    <div>
      <SectionBanner color="emerald" icon={<Landmark className="w-4 h-4" />}
        title="Bank Account Details"
        desc="Enter the employee's bank account information for salary disbursement." />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
        <div className="space-y-2">
          <FieldLabel icon={<Landmark className="w-3.5 h-3.5" />} text="Bank Name" required />
          <input type="text" name="bankName" value={fd.bankName} onChange={ch} placeholder="e.g. State Bank of India" required className={inputCls} />
        </div>
        <div className="space-y-2">
          <FieldLabel icon={<Hash className="w-3.5 h-3.5" />} text="Account Number" required />
          <input type="text" name="accountNumber" value={fd.accountNumber} onChange={ch} placeholder="Bank account number" required className={inputCls} />
        </div>
        <div className="space-y-2">
          <FieldLabel icon={<Hash className="w-3.5 h-3.5" />} text="IFSC Code" required />
          <input type="text" name="ifscCode" value={fd.ifscCode} onChange={ch} placeholder="e.g. SBIN0001234" maxLength={11} required className={`${inputCls} uppercase`} />
          <p className="text-[9px] text-gray-300 font-bold italic">11-character bank branch IFSC code</p>
        </div>
        <div className="space-y-2">
          <FieldLabel icon={<MapPin className="w-3.5 h-3.5" />} text="Branch Name" required />
          <input type="text" name="branchName" value={fd.branchName} onChange={ch} placeholder="Branch name and city" required className={inputCls} />
        </div>
        <div className="space-y-2">
          <FieldLabel icon={<CreditCard className="w-3.5 h-3.5" />} text="Account Type" required />
          <NativeSelect name="accountType" value={fd.accountType} onChange={ch} required>
            <option value="">-- Select Account Type --</option>
            {ACCOUNT_TYPES.map(a => <option key={a} value={a}>{a}</option>)}
          </NativeSelect>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// STEP 6 — Emergency & Family
// ─────────────────────────────────────────────
function Step6({ fd, ch }: { fd: EmployeeFormData; ch: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> }) {
  return (
    <div>
      <SectionBanner color="rose" icon={<Users className="w-4 h-4" />}
        title="Emergency Contact & Family Details"
        desc="Enter emergency contact person and family/nominee information." />

      {/* Emergency Contact */}
      <div className="mb-7">
        <h3 className="text-[11px] font-black text-rose-700 uppercase tracking-widest flex items-center gap-2 mb-4">
          <Phone className="w-4 h-4" /> Emergency Contact
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-5">
          <div className="space-y-2">
            <FieldLabel text="Contact Person Name" required />
            <input type="text" name="emergencyName" value={fd.emergencyName} onChange={ch} placeholder="Full name" required className={inputCls} />
          </div>
          <div className="space-y-2">
            <FieldLabel icon={<Phone className="w-3.5 h-3.5" />} text="Contact Phone" required />
            <input type="tel" name="emergencyPhone" value={fd.emergencyPhone} onChange={ch} placeholder="Mobile number" maxLength={10} required className={inputCls} />
          </div>
          <div className="space-y-2">
            <FieldLabel text="Relation" required />
            <NativeSelect name="emergencyRelation" value={fd.emergencyRelation} onChange={ch} required>
              <option value="">-- Select Relation --</option>
              <option>Father</option><option>Mother</option><option>Spouse</option>
              <option>Sibling</option><option>Son</option><option>Daughter</option><option>Friend</option><option>Other</option>
            </NativeSelect>
          </div>
        </div>
      </div>

      {/* Family Details */}
      <div className="mb-7">
        <h3 className="text-[11px] font-black text-purple-700 uppercase tracking-widest flex items-center gap-2 mb-4">
          <Users className="w-4 h-4" /> Family Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-5">
          <div className="space-y-2">
            <FieldLabel text="Father's Name" required />
            <input type="text" name="fatherName" value={fd.fatherName} onChange={ch} placeholder="Father's full name" required className={inputCls} />
          </div>
          <div className="space-y-2">
            <FieldLabel text="Mother's Name" required />
            <input type="text" name="motherName" value={fd.motherName} onChange={ch} placeholder="Mother's full name" required className={inputCls} />
          </div>
          {(fd.maritalStatus === 'Married') && (
            <div className="space-y-2">
              <FieldLabel text="Spouse Name" optional />
              <input type="text" name="spouseName" value={fd.spouseName} onChange={ch} placeholder="Spouse's full name" className={inputCls} />
            </div>
          )}
        </div>
      </div>

      {/* Nominee */}
      <div>
        <h3 className="text-[11px] font-black text-emerald-700 uppercase tracking-widest flex items-center gap-2 mb-4">
          <UserCheck className="w-4 h-4" /> Nominee Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-5">
          <div className="space-y-2">
            <FieldLabel text="Nominee Name" required />
            <input type="text" name="nomineeName" value={fd.nomineeName} onChange={ch} placeholder="Nominee's full name" required className={inputCls} />
          </div>
          <div className="space-y-2">
            <FieldLabel text="Relation with Nominee" required />
            <NativeSelect name="nomineeRelation" value={fd.nomineeRelation} onChange={ch} required>
              <option value="">-- Select Relation --</option>
              <option>Father</option><option>Mother</option><option>Spouse</option>
              <option>Son</option><option>Daughter</option><option>Sibling</option><option>Other</option>
            </NativeSelect>
          </div>
          <div className="space-y-2">
            <FieldLabel text="Nominee Date of Birth" required />
            <input type="date" name="nomineeDOB" value={fd.nomineeDOB} onChange={ch} required className={inputCls} />
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// STEP 7 — Document Uploads
// ─────────────────────────────────────────────
function Step7({ docs, setDocs }: { docs: UploadedDocs; setDocs: (d: UploadedDocs) => void }) {
  const set = (key: keyof UploadedDocs, val: unknown) => setDocs({ ...docs, [key]: val });
  return (
    <div>
      <SectionBanner color="indigo" icon={<Paperclip className="w-4 h-4" />}
        title="Document Uploads"
        desc="Upload all required employee documents. Accepted formats: JPG, PNG, PDF. Max 5 MB each." />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Photo */}
        <div className="space-y-2">
          <FieldLabel icon={<Image className="w-3.5 h-3.5" />} text="Employee Photo" required />
          {docs.photo ? (
            <div className="flex items-center gap-3 px-4 py-3 bg-emerald-50 border border-emerald-100 rounded-lg">
              <img src={URL.createObjectURL(docs.photo)} alt="preview" className="w-12 h-12 object-cover rounded-lg border border-emerald-200" />
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-black text-emerald-700 truncate">{docs.photo.name}</p>
                <p className="text-[9px] text-emerald-500 font-bold">{(docs.photo.size / 1024).toFixed(1)} KB</p>
              </div>
              <button type="button" onClick={() => set('photo', null)} className="text-emerald-400 hover:text-rose-500"><X className="w-4 h-4" /></button>
            </div>
          ) : (
            <label className="w-full flex flex-col items-center justify-center gap-2 px-4 py-6 bg-gray-50 border-2 border-dashed border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50/30 transition-all cursor-pointer">
              <Image className="w-8 h-8 text-gray-300" />
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Upload Passport Photo</span>
              <span className="text-[9px] text-gray-300 font-bold">JPG / PNG · Max 2 MB</span>
              <input type="file" accept="image/*" className="hidden" onChange={e => set('photo', e.target.files?.[0] ?? null)} />
            </label>
          )}
        </div>

        <FileUploadBox label="Aadhar Card" icon={<CreditCard className="w-3.5 h-3.5" />}
          accept=".jpg,.jpeg,.png,.pdf" file={docs.aadharCard}
          onChange={f => set('aadharCard', f)} required hint="JPG / PNG / PDF · Max 5 MB" />

        <FileUploadBox label="PAN Card" icon={<CreditCard className="w-3.5 h-3.5" />}
          accept=".jpg,.jpeg,.png,.pdf" file={docs.panCard}
          onChange={f => set('panCard', f)} required hint="JPG / PNG / PDF · Max 5 MB" />

        <FileUploadBox label="Bank Passbook / Cancelled Cheque" icon={<Landmark className="w-3.5 h-3.5" />}
          accept=".jpg,.jpeg,.png,.pdf" file={docs.bankPassbook}
          onChange={f => set('bankPassbook', f)} required hint="JPG / PNG / PDF · Max 5 MB" />

        <FileUploadBox label="Police Verification Certificate (PVC)" icon={<ShieldCheck className="w-3.5 h-3.5" />}
          accept=".jpg,.jpeg,.png,.pdf" file={docs.pvc}
          onChange={f => set('pvc', f)} required hint="JPG / PNG / PDF · Max 5 MB" />

        <FileUploadBox label="Offer / Appointment Letter" icon={<FileText className="w-3.5 h-3.5" />}
          accept=".pdf,.doc,.docx" file={docs.offerLetter}
          onChange={f => set('offerLetter', f)} hint="PDF / DOC · Max 5 MB" />

        <FileUploadBox label="Previous Experience Letter" icon={<Briefcase className="w-3.5 h-3.5" />}
          accept=".pdf,.doc,.docx" file={docs.experienceLetter}
          onChange={f => set('experienceLetter', f)} hint="PDF / DOC · Max 5 MB" />

        <div className="md:col-span-2">
          <MultiFileUploadBox label="Educational Certificates" icon={<GraduationCap className="w-3.5 h-3.5" />}
            accept=".jpg,.jpeg,.png,.pdf" files={docs.educationCerts}
            onChange={f => set('educationCerts', f)} hint="Degree / Mark Sheets · Multiple allowed" />
        </div>
        <div className="md:col-span-2">
          <MultiFileUploadBox label="Other Documents" icon={<Paperclip className="w-3.5 h-3.5" />}
            accept=".jpg,.jpeg,.png,.pdf,.doc,.docx" files={docs.otherDocs}
            onChange={f => set('otherDocs', f)} hint="Any additional supporting documents" />
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// STEP 8 — Credentials
// ─────────────────────────────────────────────
function Step8({ fd, ch, showPwd, showConfPwd, onTogglePwd, onToggleConfPwd, onGenerate }: {
  fd: EmployeeFormData;
  ch: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>;
  showPwd: boolean; showConfPwd: boolean;
  onTogglePwd: () => void; onToggleConfPwd: () => void;
  onGenerate: () => void;
}) {
  const match    = !!(fd.password && fd.confirmPassword && fd.password === fd.confirmPassword);
  const mismatch = !!(fd.password && fd.confirmPassword && fd.password !== fd.confirmPassword);
  return (
    <div>
      <SectionBanner color="blue" icon={<Lock className="w-4 h-4" />}
        title="Login Credentials"
        desc="Set a temporary password for the employee's first login. They will be prompted to change it." />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
        <div className="space-y-2">
          <FieldLabel icon={<Lock className="w-3.5 h-3.5" />} text="Temporary Password" required />
          <div className="flex gap-2">
            <div className="relative flex-1">
              <input type={showPwd ? 'text' : 'password'} name="password" value={fd.password} onChange={ch}
                placeholder="Enter or generate" required className={`${inputCls} pr-10`} />
              <button type="button" onClick={onTogglePwd}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <button type="button" onClick={onGenerate}
              className="flex items-center gap-1.5 px-3 py-2 bg-white border border-gray-100 rounded-lg text-blue-500 hover:bg-blue-50 shadow-sm text-[10px] font-black uppercase tracking-widest whitespace-nowrap">
              <Sparkles className="w-4 h-4" /> Generate
            </button>
          </div>
          <div className="flex items-center gap-1.5 text-amber-500">
            <AlertCircle className="w-3.5 h-3.5" />
            <span className="text-[9px] font-black uppercase tracking-tight">Must be changed on first login</span>
          </div>
        </div>
        <div className="space-y-2">
          <FieldLabel icon={<ShieldCheck className="w-3.5 h-3.5" />} text="Confirm Password" required />
          <div className="relative">
            <input type={showConfPwd ? 'text' : 'password'} name="confirmPassword" value={fd.confirmPassword} onChange={ch}
              placeholder="Re-enter password" required
              className={`${inputCls} pr-10 ${match ? 'border-emerald-400' : mismatch ? 'border-rose-400' : ''}`} />
            <button type="button" onClick={onToggleConfPwd}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
              {showConfPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {match    && <p className="text-[9px] text-emerald-500 font-black uppercase flex items-center gap-1"><CheckCircle className="w-3 h-3" /> Passwords match</p>}
          {mismatch && <p className="text-[9px] text-rose-500 font-black uppercase flex items-center gap-1"><AlertCircle className="w-3 h-3" /> Passwords do not match</p>}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// STEP 9 — Review & Submit
// ─────────────────────────────────────────────
function Step9({ fd, docs }: { fd: EmployeeFormData; docs: UploadedDocs }) {
  const addr = (line: string, city: string, state: string, pin: string) =>
    [line, city, state, pin].filter(Boolean).join(', ') || '—';

  const permanentAddr = fd.sameAsCurrent
    ? addr(fd.currentAddressLine, fd.currentCity, fd.currentState, fd.currentPincode) + ' (Same as current)'
    : addr(fd.permanentAddressLine, fd.permanentCity, fd.permanentState, fd.permanentPincode);

  const uploadedCount = [
    docs.photo, docs.aadharCard, docs.panCard, docs.bankPassbook, docs.pvc, docs.offerLetter, docs.experienceLetter,
    ...docs.educationCerts, ...docs.otherDocs,
  ].filter(Boolean).length;

  return (
    <div>
      <SectionBanner color="teal" icon={<ClipboardList className="w-4 h-4" />}
        title="Review & Confirm"
        desc="Please review all entered information carefully before submitting the employee record." />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ReviewCard title="Basic Info" icon={<UserPlus className="w-3.5 h-3.5 text-blue-700" />} color="bg-blue-50 border-b border-blue-100 text-blue-700">
          <ReviewRow label="Full Name"       value={fd.fullName} />
          <ReviewRow label="Official Email"  value={fd.officialEmail} />
          <ReviewRow label="Employee Code"   value={fd.employeeCode} />
          <ReviewRow label="Date of Joining" value={fd.dateOfJoining} />
          <ReviewRow label="Department"      value={fd.department} />
          <ReviewRow label="Designation"     value={fd.designation} />
          <ReviewRow label="Qualification"
            value={fd.coreQualification.length > 0
              ? <div className="flex flex-wrap gap-1 mt-0.5">{fd.coreQualification.map(q => <span key={q} className="px-2 py-0.5 bg-blue-50 border border-blue-100 text-blue-700 text-[9px] font-black rounded-full">{q}</span>)}</div>
              : '—'} />
          <ReviewRow label="Annual Salary" value={fd.annualSalary ? `₹ ${Number(fd.annualSalary).toLocaleString('en-IN')}` : '—'} />
        </ReviewCard>

        <ReviewCard title="Personal Details" icon={<User className="w-3.5 h-3.5 text-purple-700" />} color="bg-purple-50 border-b border-purple-100 text-purple-700">
          <ReviewRow label="Date of Birth"    value={fd.dateOfBirth} />
          <ReviewRow label="Gender"           value={fd.gender} />
          <ReviewRow label="Marital Status"   value={fd.maritalStatus} />
          <ReviewRow label="Blood Group"      value={fd.bloodGroup} />
          <ReviewRow label="Category"         value={fd.category} />
          <ReviewRow label="Mobile"           value={fd.mobileNumber} />
          <ReviewRow label="Alternate"        value={fd.alternateNumber} />
        </ReviewCard>

        <ReviewCard title="Address" icon={<MapPin className="w-3.5 h-3.5 text-teal-700" />} color="bg-teal-50 border-b border-teal-100 text-teal-700">
          <ReviewRow label="Current Address"   value={addr(fd.currentAddressLine, fd.currentCity, fd.currentState, fd.currentPincode)} />
          <ReviewRow label="Permanent Address" value={permanentAddr} />
        </ReviewCard>

        <ReviewCard title="Government IDs" icon={<CreditCard className="w-3.5 h-3.5 text-amber-700" />} color="bg-amber-50 border-b border-amber-100 text-amber-700">
          <ReviewRow label="Aadhar"    value={fd.aadharNumber} />
          <ReviewRow label="PAN"       value={fd.panNumber} />
          <ReviewRow label="UAN"       value={fd.uanNumber} />
          <ReviewRow label="ESIC"      value={fd.esicNumber} />
          <ReviewRow label="Passport"  value={fd.passportNumber} />
          <ReviewRow label="PVC Number" value={fd.pvcNumber} />
        </ReviewCard>

        <ReviewCard title="Bank Details" icon={<Landmark className="w-3.5 h-3.5 text-emerald-700" />} color="bg-emerald-50 border-b border-emerald-100 text-emerald-700">
          <ReviewRow label="Bank Name"       value={fd.bankName} />
          <ReviewRow label="Account No."     value={fd.accountNumber} />
          <ReviewRow label="IFSC Code"       value={fd.ifscCode} />
          <ReviewRow label="Branch"          value={fd.branchName} />
          <ReviewRow label="Account Type"    value={fd.accountType} />
        </ReviewCard>

        <ReviewCard title="Emergency & Family" icon={<Users className="w-3.5 h-3.5 text-rose-700" />} color="bg-rose-50 border-b border-rose-100 text-rose-700">
          <ReviewRow label="Emergency Contact" value={`${fd.emergencyName} (${fd.emergencyRelation})`} />
          <ReviewRow label="Emergency Phone"   value={fd.emergencyPhone} />
          <ReviewRow label="Father's Name"     value={fd.fatherName} />
          <ReviewRow label="Mother's Name"     value={fd.motherName} />
          <ReviewRow label="Nominee"           value={`${fd.nomineeName} (${fd.nomineeRelation})`} />
        </ReviewCard>

        <ReviewCard title="Documents Uploaded" icon={<Paperclip className="w-3.5 h-3.5 text-indigo-700" />} color="bg-indigo-50 border-b border-indigo-100 text-indigo-700">
          {[
            { label: 'Photo',              file: docs.photo },
            { label: 'Aadhar Card',        file: docs.aadharCard },
            { label: 'PAN Card',           file: docs.panCard },
            { label: 'Bank Passbook',      file: docs.bankPassbook },
            { label: 'Police Verification (PVC)', file: docs.pvc },
            { label: 'Offer Letter',       file: docs.offerLetter },
            { label: 'Experience Letter',  file: docs.experienceLetter },
          ].map(({ label, file }) => (
            <div key={label} className="px-4 py-2.5 flex items-center justify-between border-b border-gray-50 last:border-0">
              <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{label}</span>
              {file
                ? <span className="text-[10px] font-black text-emerald-600 flex items-center gap-1"><CheckCircle className="w-3 h-3" /> Uploaded</span>
                : <span className="text-[10px] font-bold text-gray-300">Not uploaded</span>}
            </div>
          ))}
          <div className="px-4 py-2.5 flex items-center justify-between">
            <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Education Certs</span>
            <span className="text-[10px] font-black text-emerald-600">{docs.educationCerts.length} file(s)</span>
          </div>
          <div className="px-4 py-2.5 border-t border-gray-50">
            <span className="text-[9px] font-black text-indigo-600 uppercase tracking-widest">{uploadedCount} total document(s) attached</span>
          </div>
        </ReviewCard>

        <ReviewCard title="Login Credentials" icon={<Lock className="w-3.5 h-3.5 text-gray-700" />} color="bg-gray-100 border-b border-gray-200 text-gray-700">
          <ReviewRow label="Login Email (ID)" value={fd.officialEmail} />
          <ReviewRow label="Temp Password" value={'•'.repeat(fd.password.length || 0) || '—'} />
        </ReviewCard>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Success Screen
// ─────────────────────────────────────────────
function SuccessScreen({ fd, onCreateAnother, onNavigate }: {
  fd: EmployeeFormData; onCreateAnother: () => void; onNavigate?: (p: string) => void;
}) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(`Email: ${fd.officialEmail}\nPassword: ${fd.password}`);
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="p-6 flex flex-col items-center justify-center min-h-[600px] bg-white rounded-2xl shadow-xl border border-blue-50">
      <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-6 animate-bounce">
        <BadgeCheck className="w-12 h-12 text-emerald-600" />
      </div>
      <h2 className="text-2xl font-black text-gray-800 uppercase tracking-widest mb-1">Employee Created!</h2>
      <p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest mb-2 text-center max-w-sm">
        Full employee record has been created. Share temporary credentials with the employee.
      </p>
      <div className="flex gap-3 mb-7 mt-3">
        <span className="px-3 py-1 bg-blue-50 text-blue-700 text-[10px] font-black rounded-full border border-blue-100 uppercase">{fd.department}</span>
        <span className="px-3 py-1 bg-purple-50 text-purple-700 text-[10px] font-black rounded-full border border-purple-100 uppercase">{fd.designation}</span>
      </div>
      <div className="w-full max-w-md space-y-3 mb-8">
        <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
          <p className="text-[9px] font-black text-blue-600 uppercase tracking-widest mb-1">Login Email</p>
          <p className="text-lg font-black text-gray-700">{fd.officialEmail}</p>
        </div>
        <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 relative">
          <p className="text-[9px] font-black text-emerald-600 uppercase tracking-widest mb-1">Temporary Password</p>
          <p className="text-lg font-black text-gray-700 tracking-wider font-mono">{fd.password}</p>
          <button onClick={handleCopy}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white rounded-lg shadow-sm hover:shadow-md text-blue-600">
            {copied ? <CheckCircle className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Step status */}
      <div className="w-full max-w-md mb-8">
        <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-3 text-center">Pending Workflow</p>
        <div className="flex items-center justify-center gap-1">
          {['HR Submitted', 'IT Approval', 'Account Active', 'Employee Login'].map((label, i) => (
            <React.Fragment key={i}>
              <div className="flex flex-col items-center gap-1">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-black ${
                  i === 0 ? 'bg-[#0061f2] text-white shadow-md shadow-blue-100'
                          : i === 1 ? 'bg-[#0061f2] ring-4 ring-blue-100 text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  {i === 0 ? <CheckCircle className="w-4 h-4" /> : i + 1}
                </div>
                <span className={`text-[8px] font-black uppercase tracking-tight text-center max-w-[52px] ${i === 0 ? 'text-[#0061f2]' : i === 1 ? 'text-[#0061f2]' : 'text-gray-400'}`}>{label}</span>
              </div>
              {i < 3 && (
                <div className="flex items-center gap-0.5 mx-0.5 mb-4">
                  <div className={`h-0.5 w-5 rounded-full ${i === 0 ? 'bg-[#0061f2]' : 'bg-gray-200'}`} />
                  <ChevronRight className={`w-3 h-3 ${i === 0 ? 'text-[#0061f2]' : 'text-gray-300'}`} />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="flex gap-3">
        <button onClick={onCreateAnother}
          className="px-6 py-3 bg-gray-100 text-gray-600 font-black uppercase text-[10px] tracking-widest rounded-xl hover:bg-gray-200 transition-all">
          Add Another
        </button>
        <button onClick={() => onNavigate?.('/hr/employees')}
          className="px-6 py-3 bg-[#0061f2] text-white font-black uppercase text-[10px] tracking-widest rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-100">
          Manage Employees
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────
export function AddEmployee({ onNavigate }: AddEmployeeProps) {
  const [step, setStep]           = useState(1);
  const [fd, setFd]               = useState<EmployeeFormData>(EMPTY_FORM);
  const [docs, setDocs]           = useState<UploadedDocs>(EMPTY_DOCS);
  const [loading, setLoading]     = useState(false);
  const [showPwd, setShowPwd]     = useState(false);
  const [showConf, setShowConf]   = useState(false);
  const [success, setSuccess]     = useState(false);
  const [error, setError]         = useState<string | null>(null);
  const [visible, setVisible]     = useState(true);
  const [animDir, setAnimDir]     = useState<'f' | 'b'>('f');

  const ch: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> = e => {
    const { name, value } = e.target;
    setFd(prev => ({ ...prev, [name]: value }));
  };

  const generatePassword = () => {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
    let pass = '';
    for (let i = 0; i < 12; i++) pass += charset.charAt(Math.floor(Math.random() * charset.length));
    setFd(prev => ({ ...prev, password: pass, confirmPassword: pass }));
  };

  // Validations removed — HR can freely navigate between steps
  const canProceed = (): boolean => true;

  const animateTo = (dir: 'f' | 'b', next: number) => {
    setAnimDir(dir); setVisible(false);
    setTimeout(() => { setStep(next); setVisible(true); }, 200);
  };

  const handleNext = () => { if (step < 9) animateTo('f', step + 1); };
  const handleBack = () => { if (step > 1) animateTo('b', step - 1); };

  const handleSubmit = async () => {
    try {
      setLoading(true); setError(null);
      const permanent = fd.sameAsCurrent
        ? { line: fd.currentAddressLine, city: fd.currentCity, state: fd.currentState, pincode: fd.currentPincode }
        : { line: fd.permanentAddressLine, city: fd.permanentCity, state: fd.permanentState, pincode: fd.permanentPincode };

      const response = await fetch('http://localhost:5076/api/employees', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: fd.fullName, email: fd.officialEmail, employeeCode: fd.employeeCode,
          joiningDate: fd.dateOfJoining, department: fd.department, designation: fd.designation,
          qualification: fd.coreQualification.join(', '), annualSalary: fd.annualSalary, remarks: fd.remarks,
          dateOfBirth: fd.dateOfBirth, gender: fd.gender, maritalStatus: fd.maritalStatus,
          bloodGroup: fd.bloodGroup, religion: fd.religion, category: fd.category,
          mobileNumber: fd.mobileNumber, alternateNumber: fd.alternateNumber,
          currentAddress: `${fd.currentAddressLine}, ${fd.currentCity}, ${fd.currentState} - ${fd.currentPincode}`,
          permanentAddress: `${permanent.line}, ${permanent.city}, ${permanent.state} - ${permanent.pincode}`,
          aadharNumber: fd.aadharNumber, panNumber: fd.panNumber, uanNumber: fd.uanNumber,
          esicNumber: fd.esicNumber, passportNumber: fd.passportNumber, pvcNumber: fd.pvcNumber,
          bankName: fd.bankName, accountNumber: fd.accountNumber, ifscCode: fd.ifscCode,
          branchName: fd.branchName, accountType: fd.accountType,
          emergencyContactName: fd.emergencyName, emergencyContactPhone: fd.emergencyPhone,
          emergencyContactRelation: fd.emergencyRelation,
          fatherName: fd.fatherName, motherName: fd.motherName, spouseName: fd.spouseName,
          nomineeName: fd.nomineeName, nomineeRelation: fd.nomineeRelation, nomineeDOB: fd.nomineeDOB,
          temporaryPassword: fd.password, role: 'Employee', status: 'Pending',
        }),
      });
      if (response.ok) {
        setSuccess(true);
      } else if (response.status === 409) {
        const data = await response.json();
        setError(data.message);
      } else {
        setError('Failed to create employee. Please check all fields.');
      }
    } catch {
      setError('Connection error. Please ensure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setSuccess(false); setStep(1);
    setFd(EMPTY_FORM); setDocs(EMPTY_DOCS);
  };

  if (success) {
    return (
      <div className="p-4 bg-[#f8f9fc] min-h-screen font-sans">
        <SuccessScreen fd={fd} onNavigate={onNavigate} onCreateAnother={reset} />
      </div>
    );
  }

  return (
    <div className="p-4 bg-[#f8f9fc] min-h-screen font-sans">
      {/* ── Top Header ── */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-5">
        <div>
          <h1 className="text-gray-700 font-black text-xl uppercase tracking-widest flex items-center gap-2">
            <UserPlus className="w-5 h-5 text-[#0061f2]" /> Add New Employee
          </h1>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">
            HR Onboarding · Complete Employee Registration
          </p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => onNavigate?.('/hr/employees')}
            className="flex items-center gap-2 px-4 py-2 bg-[#6b58d3] text-white text-[10px] font-black rounded shadow-sm uppercase tracking-widest hover:bg-purple-700 transition-all">
            <ArrowLeft className="w-4 h-4" /> Back to Employees
          </button>
          <button onClick={() => onNavigate?.('/hr/dashboard')}
            className="flex items-center gap-2 px-4 py-2 bg-[#00cfd5] text-white text-[10px] font-black rounded shadow-sm uppercase tracking-widest hover:bg-cyan-600 transition-all">
            <Layout className="w-4 h-4" /> HR Dashboard
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto space-y-4">
        {/* ── Step Indicator Card ── */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-gray-50/50 px-6 py-3 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-[11px] font-black text-[#0061f2] uppercase tracking-widest flex items-center gap-2">
              <UserPlus className="w-4 h-4" /> Employee Registration
            </h2>
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
              Step {step} of {STEPS.length}
            </span>
          </div>
          <div className="px-4 py-4">
            <StepIndicator currentStep={step} />
            {/* Mobile: step name */}
            <div className="md:hidden mt-2 text-center">
              <span className="text-[11px] font-black text-[#0061f2] uppercase tracking-widest">{STEPS[step - 1].label}</span>
              <span className="text-[9px] text-gray-400 font-bold ml-2">— {STEPS[step - 1].sublabel}</span>
            </div>
            {/* Progress bar */}
            <div className="mt-3 h-1 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-[#0061f2] rounded-full transition-all duration-500"
                style={{ width: `${((step - 1) / (STEPS.length - 1)) * 100}%` }} />
            </div>
          </div>
        </div>

        {/* ── Error Banner ── */}
        {error && (
          <div className="p-4 bg-rose-50 border border-rose-100 rounded-xl flex items-center gap-3 text-rose-600">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p className="text-[11px] font-black uppercase tracking-widest">{error}</p>
          </div>
        )}

        {/* ── Step Content Card ── */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : animDir === 'f' ? 'translateY(12px)' : 'translateY(-12px)',
            transition: 'opacity 0.2s ease, transform 0.2s ease',
          }}>
          <div className="p-6 md:p-8">
            {step === 1 && <Step1 fd={fd} ch={ch} qch={v => setFd(p => ({ ...p, coreQualification: v }))} />}
            {step === 2 && <Step2 fd={fd} ch={ch} />}
            {step === 3 && <Step3 fd={fd} ch={ch} onSameToggle={() => setFd(p => ({ ...p, sameAsCurrent: !p.sameAsCurrent }))} />}
            {step === 4 && <Step4 fd={fd} ch={ch} />}
            {step === 5 && <Step5 fd={fd} ch={ch} />}
            {step === 6 && <Step6 fd={fd} ch={ch} />}
            {step === 7 && <Step7 docs={docs} setDocs={setDocs} />}
            {step === 8 && (
              <Step8 fd={fd} ch={ch}
                showPwd={showPwd} showConfPwd={showConf}
                onTogglePwd={() => setShowPwd(p => !p)}
                onToggleConfPwd={() => setShowConf(p => !p)}
                onGenerate={generatePassword} />
            )}
            {step === 9 && <Step9 fd={fd} docs={docs} />}
          </div>

          {/* ── Bottom Navigation ── */}
          <div className="px-6 md:px-8 py-5 border-t border-gray-100 bg-gray-50/40 flex items-center justify-between gap-3">
            <button type="button" onClick={handleBack} disabled={step === 1}
              className="flex items-center gap-2 px-5 py-2.5 bg-[#6b58d3] text-white text-[10px] font-black rounded-lg shadow-sm uppercase tracking-widest hover:bg-purple-700 transition-all disabled:opacity-30 disabled:cursor-not-allowed">
              <ArrowLeft className="w-4 h-4" /> Previous
            </button>

            {/* Step pills */}
            <div className="flex items-center gap-1">
              {STEPS.map(s => (
                <div key={s.id} className={`h-1.5 rounded-full transition-all duration-300 ${
                  s.id < step ? 'bg-[#0061f2] w-1.5' : s.id === step ? 'bg-[#0061f2] w-5' : 'bg-gray-200 w-1.5'
                }`} />
              ))}
            </div>

            {step < 9 ? (
              <button type="button" onClick={handleNext}
                className="flex items-center gap-2 px-6 py-2.5 bg-[#0061f2] text-white text-[10px] font-black rounded-lg shadow-lg shadow-blue-100 uppercase tracking-widest hover:bg-blue-700 transition-all">
                Next <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button type="button" onClick={handleSubmit} disabled={loading}
                className="flex items-center gap-2 px-8 py-2.5 bg-emerald-600 text-white text-[10px] font-black rounded-lg shadow-lg shadow-emerald-100 uppercase tracking-widest hover:bg-emerald-700 transition-all disabled:opacity-50">
                {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                {loading ? 'Creating...' : 'Create Employee'}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-10 pt-6 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center text-[10px] text-gray-400 font-bold tracking-[0.2em] uppercase px-4">
        <p>Copyright &copy; Digital New Enterprises 2024</p>
        <div className="flex gap-4">
          <a href="#" className="hover:underline hover:text-gray-600 transition-colors">Privacy Policy</a>
          <span>•</span>
          <a href="#" className="hover:underline hover:text-gray-600 transition-colors">Terms &amp; Conditions</a>
        </div>
      </div>
    </div>
  );
}
