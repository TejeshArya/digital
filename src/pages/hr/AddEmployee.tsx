import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  User, Mail, Calendar, GraduationCap, IndianRupee,
  FileText, Lock, RefreshCw, AlertCircle, ArrowLeft,
  Layout, ShieldCheck, CheckCircle, UserPlus,
  X, Copy, Eye, EyeOff, Sparkles, ClipboardList, Send,
  ChevronRight, ChevronDown, Phone, MapPin, CreditCard,
  Building2, Users, Heart, Upload, Paperclip, Image,
  Briefcase, Hash, Home, UserCheck, BadgeCheck, Landmark,
  Plus, Trash2, Utensils, Leaf
} from 'lucide-react';

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────
interface AddEmployeeProps {
  onNavigate?: (path: string) => void;
}

interface ValidationRules {
  id: number;
  fullName: boolean;
  officialEmail: boolean;
  employeeCode: boolean;
  dateOfJoining: boolean;
  department: boolean;
  location: boolean;
  designation: boolean;
  annualSalary: boolean;
  coreQualification: boolean;
  remarks: boolean;
  dateOfBirth: boolean;
  gender: boolean;
  maritalStatus: boolean;
  bloodGroup: boolean;
  religion: boolean;
  category: boolean;
  mobileNumber: boolean;
  alternateNumber: boolean;
  currentAddress: boolean;
  permanentAddress: boolean;
  photo: boolean;
  aadharNumber: boolean;
  panNumber: boolean;
  uanNumber: boolean;
  esicNumber: boolean;
  passportNumber: boolean;
  pvcNumber: boolean;
  bankDetails: boolean;
  emergencyName: boolean;
  emergencyPhone: boolean;
  emergencyRelation: boolean;
  nomineeDetails: boolean;
}

interface FamilyMember {
  name: string;
  relation: string;
  dateOfBirth: string;
  mealType: 'Veg' | 'Non-Veg' | '';
}

interface EmployeeFormData {
  fullName: string;
  officialEmail: string;
  employeeCode: string;
  dateOfJoining: string;
  department: string;
  location: string;
  designation: string;
  coreQualification: string[];
  annualSalary: string;
  remarks: string;
  dateOfBirth: string;
  gender: string;
  maritalStatus: string;
  bloodGroup: string;
  religion: string;
  category: string;
  mobileNumber: string;
  alternateNumber: string;
  currentAddressLine: string;
  currentCity: string;
  currentState: string;
  currentPincode: string;
  sameAsCurrent: boolean;
  permanentAddressLine: string;
  permanentCity: string;
  permanentState: string;
  permanentPincode: string;
  aadharNumber: string;
  panNumber: string;
  uanNumber: string;
  esicNumber: string;
  passportNumber: string;
  passportValidUpto: string;
  pvcNumber: string;
  pvcValidUpto: string;
  bankName: string;
  accountNumber: string;
  ifscCode: string;
  branchName: string;
  accountType: string;
  emergencyName: string;
  emergencyPhone: string;
  emergencyRelation: string;
  familyMembers: FamilyMember[];
  nomineeName: string;
  nomineeRelation: string;
  nomineeDOB: string;
  password: string;
  confirmPassword: string;
}

interface UploadedDocs {
  photo: File | null;
  aadharCard: File | null;
  panCard: File | null;
  bankPassbook: File | null;
  passport: File | null;
  pvc: File | null;
  educationCerts: File[];
  experienceLetter: File | null;
  offerLetter: File | null;
  otherDocs: File[];
}

interface ApiDepartment { id: number; name: string; }
interface ApiLocation   { id: number; name: string; }

// ─────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────
const API = 'http://localhost:5076';

const QUALIFICATIONS = [
  'B.E / B.TECH', 'MBA', 'MCA', 'M.TECH', 'Ph.D',
  'B.COM', 'M.COM', 'B.SC', 'M.SC', 'DIPLOMA', 'ITI', '10th Pass', '12th Pass',
];

const BLOOD_GROUPS = ['A+', 'A−', 'B+', 'B−', 'AB+', 'AB−', 'O+', 'O−'];
const ACCOUNT_TYPES = ['Savings', 'Current', 'Salary'];
const CATEGORIES = ['General', 'OBC', 'SC', 'ST', 'EWS'];
const RELIGIONS = ['Hindu', 'Muslim', 'Christian', 'Sikh', 'Buddhist', 'Jain', 'Others'];

const FAMILY_RELATIONS = [
  'Father', 'Mother', 'Spouse', 'Son', 'Daughter',
  'Brother', 'Sister', 'Grandfather', 'Grandmother', 'Other',
];

const STEPS = [
  { id: 1, label: 'Basic Info',  sublabel: 'Identity & Role'    },
  { id: 2, label: 'Personal',    sublabel: 'Profile Details'    },
  { id: 3, label: 'Address',     sublabel: 'Current & Permanent'},
  { id: 4, label: 'Govt. IDs',   sublabel: 'IDs & Documents'    },
  { id: 5, label: 'Bank',        sublabel: 'Account Details'    },
  { id: 6, label: 'Family',      sublabel: 'Members & Nominee'  },
  { id: 7, label: 'Credentials', sublabel: 'Login Setup'        },
  { id: 8, label: 'Review',      sublabel: 'Confirm & Submit'   },
];

const TOTAL_STEPS = STEPS.length;

const EMPTY_FAMILY_MEMBER: FamilyMember = { name: '', relation: '', dateOfBirth: '', mealType: '' };

const DEFAULT_RULES: ValidationRules = {
  id: 1,
  fullName: true,
  officialEmail: true,
  employeeCode: false,
  dateOfJoining: true,
  department: true,
  location: false,
  designation: true,
  annualSalary: false,
  coreQualification: true,
  remarks: false,
  dateOfBirth: true,
  gender: true,
  maritalStatus: true,
  bloodGroup: true,
  religion: false,
  category: true,
  mobileNumber: true,
  alternateNumber: false,
  currentAddress: true,
  permanentAddress: true,
  photo: true,
  aadharNumber: true,
  panNumber: true,
  uanNumber: false,
  esicNumber: false,
  passportNumber: false,
  pvcNumber: false,
  bankDetails: true,
  emergencyName: true,
  emergencyPhone: true,
  emergencyRelation: true,
  nomineeDetails: false
};

const EMPTY_FORM: EmployeeFormData = {
  fullName: '', officialEmail: '', employeeCode: '', dateOfJoining: '',
  department: '', location: '', designation: '', coreQualification: [], annualSalary: '', remarks: '',
  dateOfBirth: '', gender: '', maritalStatus: '', bloodGroup: '', religion: '', category: '',
  mobileNumber: '', alternateNumber: '',
  currentAddressLine: '', currentCity: '', currentState: '', currentPincode: '',
  sameAsCurrent: false,
  permanentAddressLine: '', permanentCity: '', permanentState: '', permanentPincode: '',
  aadharNumber: '', panNumber: '', uanNumber: '', esicNumber: '',
  passportNumber: '', passportValidUpto: '',
  pvcNumber: '', pvcValidUpto: '',
  bankName: '', accountNumber: '', ifscCode: '', branchName: '', accountType: '',
  emergencyName: '', emergencyPhone: '', emergencyRelation: '',
  familyMembers: [{ ...EMPTY_FAMILY_MEMBER }],
  nomineeName: '', nomineeRelation: '', nomineeDOB: '',
  password: '', confirmPassword: '',
};

const EMPTY_DOCS: UploadedDocs = {
  photo: null, aadharCard: null, panCard: null, bankPassbook: null,
  passport: null, pvc: null,
  educationCerts: [], experienceLetter: null, offerLetter: null, otherDocs: [],
};

// ─────────────────────────────────────────────
// Shared UI helpers
// ─────────────────────────────────────────────
const inputCls =
  'w-full px-3 py-2.5 sm:px-4 sm:py-3 bg-gray-50 border border-gray-200 rounded-lg text-xs sm:text-sm font-semibold text-gray-700 focus:outline-none focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-50 transition-all placeholder:text-gray-300 placeholder:font-normal';

function FieldLabel({ icon, text, required, optional }: {
  icon?: React.ReactNode; text: string; required?: boolean; optional?: boolean;
}) {
  return (
    <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.15em] flex items-center gap-1.5 flex-wrap">
      {icon && <span className="text-gray-300">{icon}</span>}
      {text}
      {required && <span className="text-rose-400 font-black">*</span>}
      {optional && !required && <span className="text-gray-300 normal-case font-bold tracking-normal">(optional)</span>}
    </label>
  );
}

function SectionBanner({ color, icon, title, desc }: {
  color: 'blue' | 'purple' | 'teal' | 'emerald' | 'amber' | 'rose' | 'indigo';
  icon: React.ReactNode; title: string; desc: string;
}) {
  const palette: Record<string, { wrap: string; iconBg: string; text: string }> = {
    blue:    { wrap: 'bg-blue-50 border-blue-100',      iconBg: 'bg-blue-600',    text: 'text-blue-800'    },
    purple:  { wrap: 'bg-purple-50 border-purple-100',  iconBg: 'bg-purple-600',  text: 'text-purple-800'  },
    teal:    { wrap: 'bg-teal-50 border-teal-100',      iconBg: 'bg-teal-600',    text: 'text-teal-800'    },
    emerald: { wrap: 'bg-emerald-50 border-emerald-100',iconBg: 'bg-emerald-600', text: 'text-emerald-800' },
    amber:   { wrap: 'bg-amber-50 border-amber-100',    iconBg: 'bg-amber-600',   text: 'text-amber-800'   },
    rose:    { wrap: 'bg-rose-50 border-rose-100',      iconBg: 'bg-rose-600',    text: 'text-rose-800'    },
    indigo:  { wrap: 'bg-indigo-50 border-indigo-100',  iconBg: 'bg-indigo-600',  text: 'text-indigo-800'  },
  };
  const p = palette[color];
  return (
    <div className={`border rounded-xl p-3 sm:p-4 mb-5 sm:mb-6 ${p.wrap}`}>
      <div className={`flex items-start gap-3 ${p.text}`}>
        <div className={`${p.iconBg} p-1.5 rounded-full mt-0.5 flex-shrink-0`}>
          <span className="text-white">{icon}</span>
        </div>
        <div>
          <h3 className="text-[11px] sm:text-xs font-black uppercase tracking-widest mb-0.5">{title}</h3>
          <p className="text-[10px] sm:text-[11px] font-medium opacity-80 leading-snug">{desc}</p>
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
    <div className="relative">
      <select name={name} value={value} onChange={onChange} required={required}
        className={`${inputCls} appearance-none cursor-pointer pr-10`}>
        {children}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
    </div>
  );
}

// ─────────────────────────────────────────────
// Step Indicator  — FIX: single progress bar on mobile, no duplicate
// ─────────────────────────────────────────────
function StepIndicator({ currentStep }: { currentStep: number }) {
  return (
    <div>
      {/* Mobile: step pills + label */}
      <div className="md:hidden">
        <div className="flex items-center gap-1 mb-2">
          {STEPS.map(s => (
            <div key={s.id}
              className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
                s.id <= currentStep ? 'bg-[#0061f2]' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
        <div className="text-center">
          <span className="text-[11px] font-black text-[#0061f2] uppercase tracking-widest">{STEPS[currentStep - 1].label}</span>
          <span className="text-[9px] text-gray-400 font-bold ml-2">— {STEPS[currentStep - 1].sublabel}</span>
        </div>
      </div>

      {/* Desktop: full step row */}
      <div className="hidden md:flex items-center justify-center flex-wrap gap-y-1 py-1">
        {STEPS.map((step, idx) => {
          const done   = step.id < currentStep;
          const active = step.id === currentStep;
          return (
            <React.Fragment key={step.id}>
              <div className="flex items-center gap-1.5">
                <div className={`w-6 h-6 lg:w-7 lg:h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                  done   ? 'bg-[#0061f2] shadow-sm shadow-blue-200'
                  : active ? 'bg-[#0061f2] ring-4 ring-blue-100 shadow-sm shadow-blue-200'
                  : 'bg-gray-200'
                }`}>
                  {done
                    ? <CheckCircle className="w-3 h-3 lg:w-3.5 lg:h-3.5 text-white" />
                    : <span className={`text-[10px] font-black ${active ? 'text-white' : 'text-gray-500'}`}>{step.id}</span>
                  }
                </div>
                <div className="hidden lg:flex flex-col leading-tight">
                  <span className={`text-[9px] font-black uppercase tracking-wide ${done || active ? 'text-[#0061f2]' : 'text-gray-400'}`}>
                    {step.label}
                  </span>
                  <span className="text-[8px] text-gray-400 font-bold">{step.sublabel}</span>
                </div>
              </div>
              {idx < STEPS.length - 1 && (
                <div className="flex items-center gap-0.5 mx-1">
                  <div className={`h-0.5 w-4 lg:w-5 rounded-full ${step.id < currentStep ? 'bg-[#0061f2]' : 'bg-gray-200'}`} />
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
// Qualification Multi-Select — FIX: mobile overflow, portal-free positioning
// ─────────────────────────────────────────────
function QualificationMultiSelect({ selected, onChange }: { selected: string[]; onChange: (v: string[]) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const toggle = (q: string) =>
    onChange(selected.includes(q) ? selected.filter(s => s !== q) : [...selected, q]);
  const remove = (q: string) => onChange(selected.filter(s => s !== q));

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      <button type="button" onClick={() => setOpen(o => !o)}
        className={`${inputCls} flex items-center justify-between gap-2 text-left`}>
        <span className={`truncate ${selected.length === 0 ? 'text-gray-300' : 'text-gray-700'}`}>
          {selected.length === 0 ? 'Select qualifications...' : `${selected.length} selected`}
        </span>
        <ChevronDown className={`w-4 h-4 text-gray-400 flex-shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute z-30 mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden">
          <div className="px-3 py-2 bg-gray-50 border-b border-gray-100">
            <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Select all that apply</p>
          </div>
          <ul className="max-h-44 overflow-y-auto divide-y divide-gray-50">
            {QUALIFICATIONS.map(q => {
              const checked = selected.includes(q);
              return (
                <li key={q} onClick={() => toggle(q)}
                  className={`flex items-center gap-3 px-4 py-2.5 cursor-pointer text-xs font-semibold transition-colors ${
                    checked ? 'bg-blue-50 text-[#0061f2]' : 'text-gray-600 hover:bg-gray-50'
                  }`}>
                  <span className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                    checked ? 'bg-[#0061f2] border-[#0061f2]' : 'border-gray-300 bg-white'
                  }`}>
                    {checked && <CheckCircle className="w-3 h-3 text-white" />}
                  </span>
                  {q}
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {selected.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-2">
          {selected.map(q => (
            <span key={q}
              className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-50 border border-blue-100 text-blue-700 text-[10px] font-black rounded-full uppercase tracking-wide">
              {q}
              <button type="button"
                onClick={e => { e.stopPropagation(); remove(q); }}
                className="text-blue-400 hover:text-rose-600 ml-0.5 transition-colors">
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
// File Upload Widget — FIX: input key reset so same file can be re-selected
// ─────────────────────────────────────────────
function FileUploadBox({ label, icon, accept, file, onChange, required, hint }: {
  label: string; icon: React.ReactNode; accept: string;
  file: File | null; onChange: (f: File | null) => void;
  required?: boolean; hint?: string;
}) {
  const [inputKey, setInputKey] = useState(0);
  const ref = useRef<HTMLInputElement>(null);

  const handleRemove = () => {
    onChange(null);
    setInputKey(k => k + 1); // reset file input so same file can be re-selected
  };

  return (
    <div className="space-y-2">
      <FieldLabel icon={icon} text={label} required={required} optional={!required} />
      {file ? (
        <div className="flex items-center justify-between px-3 py-2.5 sm:px-4 bg-emerald-50 border border-emerald-200 rounded-lg">
          <div className="flex items-center gap-2 min-w-0">
            <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <div className="min-w-0">
              <p className="text-[11px] font-black text-emerald-700 truncate">{file.name}</p>
              <p className="text-[9px] text-emerald-500 font-bold">{(file.size / 1024).toFixed(1)} KB</p>
            </div>
          </div>
          <button type="button" onClick={handleRemove}
            className="text-emerald-400 hover:text-rose-500 transition-colors ml-2 flex-shrink-0">
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <button type="button" onClick={() => ref.current?.click()}
          className="w-full flex flex-col items-center justify-center gap-2 px-4 py-4 sm:py-5 bg-gray-50 border-2 border-dashed border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50/30 active:scale-[0.98] transition-all">
          <span className="text-gray-300">{icon}</span>
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Click to Upload</span>
          {hint && <span className="text-[9px] text-gray-300 font-bold">{hint}</span>}
        </button>
      )}
      <input key={inputKey} ref={ref} type="file" accept={accept} className="hidden"
        onChange={e => onChange(e.target.files?.[0] ?? null)} />
    </div>
  );
}

function MultiFileUploadBox({ label, icon, accept, files, onChange, hint }: {
  label: string; icon: React.ReactNode; accept: string;
  files: File[]; onChange: (f: File[]) => void; hint?: string;
}) {
  const [inputKey, setInputKey] = useState(0);
  const ref = useRef<HTMLInputElement>(null);
  const addFiles = (newFiles: FileList | null) => {
    if (!newFiles) return;
    onChange([...files, ...Array.from(newFiles)]);
    setInputKey(k => k + 1);
  };
  const remove = (idx: number) => onChange(files.filter((_, i) => i !== idx));

  return (
    <div className="space-y-2">
      <FieldLabel icon={icon} text={label} optional />
      <button type="button" onClick={() => ref.current?.click()}
        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-50 border-2 border-dashed border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50/30 transition-all text-[10px] font-black text-gray-400 uppercase tracking-widest">
        <Upload className="w-4 h-4" /> Add Files {hint && <span className="normal-case font-bold text-gray-300">({hint})</span>}
      </button>
      <input key={inputKey} ref={ref} type="file" accept={accept} multiple className="hidden"
        onChange={e => addFiles(e.target.files)} />
      {files.length > 0 && (
        <div className="space-y-1.5">
          {files.map((f, i) => (
            <div key={i} className="flex items-center justify-between px-3 py-2 bg-emerald-50 border border-emerald-100 rounded-lg">
              <div className="flex items-center gap-2 min-w-0">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                <span className="text-[11px] font-black text-emerald-700 truncate">{f.name}</span>
                <span className="text-[9px] text-emerald-500 font-bold flex-shrink-0">{(f.size / 1024).toFixed(1)} KB</span>
              </div>
              <button type="button" onClick={() => remove(i)}
                className="text-emerald-400 hover:text-rose-500 ml-2 flex-shrink-0">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
// Review helpers
// ─────────────────────────────────────────────
function ReviewRow({ label, value }: { label: string; value: React.ReactNode }) {
  // FIX: treat empty/whitespace string as falsy
  const display = typeof value === 'string' ? value.trim() || '—' : (value ?? '—');
  return (
    <div className="px-3 sm:px-4 py-2 sm:py-2.5 flex flex-col gap-0.5 border-b border-gray-50 last:border-0">
      <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{label}</span>
      <span className="text-[11px] sm:text-xs font-bold text-gray-700 break-words">{display}</span>
    </div>
  );
}

function ReviewCard({ title, icon, color, children }: {
  title: string; icon: React.ReactNode; color: string; children: React.ReactNode;
}) {
  return (
    <div className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm">
      <div className={`${color} px-3 sm:px-4 py-2.5 flex items-center gap-2`}>
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
function Step1({ fd, ch, qch, departments, locations, depsLoading, locsLoading, rules }: {
  fd: EmployeeFormData;
  ch: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>;
  qch: (v: string[]) => void;
  departments: ApiDepartment[];
  locations: ApiLocation[];
  depsLoading: boolean;
  locsLoading: boolean;
  rules: ValidationRules;
}) {
  return (
    <div>
      <SectionBanner color="blue" icon={<UserPlus className="w-4 h-4" />}
        title="Basic Employee Information"
        desc="Enter the core identity, role, and employment details for this new employee." />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 lg:gap-x-10 gap-y-5">
        <div className="space-y-2">
          <FieldLabel icon={<User className="w-3.5 h-3.5" />} text="Full Name" required={rules.fullName} optional={!rules.fullName} />
          <input type="text" name="fullName" value={fd.fullName} onChange={ch}
            placeholder="Employee's full name" required={rules.fullName} className={inputCls} />
        </div>
        <div className="space-y-2">
          <FieldLabel icon={<Mail className="w-3.5 h-3.5" />} text="Official Email ID" required={rules.officialEmail} optional={!rules.officialEmail} />
          <input type="email" name="officialEmail" value={fd.officialEmail} onChange={ch}
            placeholder="employee@company.com" required={rules.officialEmail} className={inputCls} />
          <p className="text-[9px] text-gray-400 font-medium italic">Used for login &amp; communications</p>
        </div>
        <div className="space-y-2">
          <FieldLabel icon={<Hash className="w-3.5 h-3.5" />} text="Employee Code / ID" required={rules.employeeCode} optional={!rules.employeeCode} />
          <input type="text" name="employeeCode" value={fd.employeeCode} onChange={ch}
            placeholder="EMP-001 (auto-generated if blank)" required={rules.employeeCode} className={inputCls} />
        </div>
        <div className="space-y-2">
          <FieldLabel icon={<Calendar className="w-3.5 h-3.5" />} text="Date of Joining" required={rules.dateOfJoining} optional={!rules.dateOfJoining} />
          <input type="date" name="dateOfJoining" value={fd.dateOfJoining} onChange={ch}
            required={rules.dateOfJoining} className={inputCls} />
        </div>

        {/* Department — from API */}
        <div className="space-y-2">
          <FieldLabel icon={<Building2 className="w-3.5 h-3.5" />} text="Department" required={rules.department} optional={!rules.department} />
          {depsLoading ? (
            <div className="h-10 sm:h-12 bg-gray-100 rounded-lg animate-pulse" />
          ) : (
            <NativeSelect name="department" value={fd.department} onChange={ch} required={rules.department}>
              <option value="">-- Select Department --</option>
              {departments.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
            </NativeSelect>
          )}
        </div>

        {/* Location — from API */}
        <div className="space-y-2">
          <FieldLabel icon={<MapPin className="w-3.5 h-3.5" />} text="Location / Branch" required={rules.location} optional={!rules.location} />
          {locsLoading ? (
            <div className="h-10 sm:h-12 bg-gray-100 rounded-lg animate-pulse" />
          ) : (
            <NativeSelect name="location" value={fd.location} onChange={ch} required={rules.location}>
              <option value="">-- Select Location --</option>
              {locations.map(l => <option key={l.id} value={l.name}>{l.name}</option>)}
            </NativeSelect>
          )}
        </div>
        <div className="space-y-2">
          <FieldLabel icon={<Briefcase className="w-3.5 h-3.5" />} text="Designation / Post" required={rules.designation} optional={!rules.designation} />
          <input type="text" name="designation" value={fd.designation} onChange={ch}
            placeholder="e.g. Software Engineer" required={rules.designation} className={inputCls} />
        </div>

        <div className="space-y-2">
          <FieldLabel icon={<IndianRupee className="w-3.5 h-3.5" />} text="Annual Salary (₹)" required={rules.annualSalary} optional={!rules.annualSalary} />
          <input type="number" name="annualSalary" value={fd.annualSalary} onChange={ch}
            placeholder="Gross annual CTC" min="0" required={rules.annualSalary} className={inputCls} />
        </div>

        <div className="space-y-2 sm:col-span-2">
          <FieldLabel icon={<GraduationCap className="w-3.5 h-3.5" />} text="Core Qualification" required={rules.coreQualification} optional={!rules.coreQualification} />
          <QualificationMultiSelect selected={fd.coreQualification} onChange={qch} />
          <p className="text-[9px] text-gray-400 font-medium italic">Select all educational qualifications that apply</p>
        </div>

        <div className="space-y-2 sm:col-span-2">
          <FieldLabel icon={<FileText className="w-3.5 h-3.5" />} text="Remarks / Notes" required={rules.remarks} optional={!rules.remarks} />
          <textarea name="remarks" value={fd.remarks} onChange={ch}
            placeholder="Any onboarding notes..." rows={2}
            required={rules.remarks} className={`${inputCls} resize-none`} />
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// STEP 2 — Personal Details
// ─────────────────────────────────────────────
function Step2({ fd, ch, categories, catsLoading, rules }: {
  fd: EmployeeFormData;
  ch: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>;
  categories: any[];
  catsLoading: boolean;
  rules: ValidationRules;
}) {
  return (
    <div>
      <SectionBanner color="purple" icon={<User className="w-4 h-4" />}
        title="Personal Details"
        desc="Enter complete personal profile information for the employee's record." />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 lg:gap-x-10 gap-y-5">
        <div className="space-y-2">
          <FieldLabel icon={<Calendar className="w-3.5 h-3.5" />} text="Date of Birth" required={rules.dateOfBirth} optional={!rules.dateOfBirth} />
          <input type="date" name="dateOfBirth" value={fd.dateOfBirth} onChange={ch}
            required={rules.dateOfBirth} className={inputCls} />
        </div>
        <div className="space-y-2">
          <FieldLabel icon={<User className="w-3.5 h-3.5" />} text="Gender" required={rules.gender} optional={!rules.gender} />
          <NativeSelect name="gender" value={fd.gender} onChange={ch} required={rules.gender}>
            <option value="">-- Select Gender --</option>
            <option>Male</option><option>Female</option>
            <option>Transgender</option><option>Prefer not to say</option>
          </NativeSelect>
        </div>
        <div className="space-y-2">
          <FieldLabel icon={<Heart className="w-3.5 h-3.5" />} text="Marital Status" required={rules.maritalStatus} optional={!rules.maritalStatus} />
          <NativeSelect name="maritalStatus" value={fd.maritalStatus} onChange={ch} required={rules.maritalStatus}>
            <option value="">-- Select Status --</option>
            <option>Single</option><option>Married</option>
            <option>Divorced</option><option>Widowed</option>
          </NativeSelect>
        </div>
        <div className="space-y-2">
          <FieldLabel icon={<Heart className="w-3.5 h-3.5" />} text="Blood Group" required={rules.bloodGroup} optional={!rules.bloodGroup} />
          <NativeSelect name="bloodGroup" value={fd.bloodGroup} onChange={ch} required={rules.bloodGroup}>
            <option value="">-- Select Blood Group --</option>
            {BLOOD_GROUPS.map(b => <option key={b} value={b}>{b}</option>)}
          </NativeSelect>
        </div>
        <div className="space-y-2">
          <FieldLabel text="Religion" required={rules.religion} optional={!rules.religion} />
          <NativeSelect name="religion" value={fd.religion} onChange={ch} required={rules.religion}>
            <option value="">-- Select Religion --</option>
            {RELIGIONS.map(r => <option key={r} value={r}>{r}</option>)}
          </NativeSelect>
        </div>
        <div className="space-y-2">
          <FieldLabel text="Category" required={rules.category} optional={!rules.category} />
          {catsLoading ? (
            <div className="h-10 sm:h-12 bg-gray-100 rounded-lg animate-pulse" />
          ) : (
            <NativeSelect name="category" value={fd.category} onChange={ch} required={rules.category}>
              <option value="">-- Select Category --</option>
              {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
            </NativeSelect>
          )}
        </div>
        <div className="space-y-2">
          <FieldLabel icon={<Phone className="w-3.5 h-3.5" />} text="Mobile Number" required={rules.mobileNumber} optional={!rules.mobileNumber} />
          <input type="tel" name="mobileNumber" value={fd.mobileNumber} onChange={ch}
            placeholder="10-digit mobile number" maxLength={10} required={rules.mobileNumber}
            pattern="[0-9]{10}" className={inputCls} />
        </div>
        <div className="space-y-2">
          <FieldLabel icon={<Phone className="w-3.5 h-3.5" />} text="Alternate Number" required={rules.alternateNumber} optional={!rules.alternateNumber} />
          <input type="tel" name="alternateNumber" value={fd.alternateNumber} onChange={ch}
            placeholder="Alternate contact number" maxLength={10} required={rules.alternateNumber} className={inputCls} />
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// STEP 3 — Address
// ─────────────────────────────────────────────
function Step3({ fd, ch, onSameToggle, rules }: {
  fd: EmployeeFormData;
  ch: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>;
  onSameToggle: () => void;
  rules: ValidationRules;
}) {
  return (
    <div>
      <SectionBanner color="teal" icon={<MapPin className="w-4 h-4" />}
        title="Address Information"
        desc="Enter current residence and permanent address details." />

      <div className="mb-5 sm:mb-6">
        <h3 className="text-[11px] font-black text-blue-700 uppercase tracking-widest flex items-center gap-2 mb-4">
          <Home className="w-4 h-4" /> Current Address
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 lg:gap-x-10 gap-y-4">
          <div className="space-y-2 sm:col-span-2">
            <FieldLabel icon={<MapPin className="w-3.5 h-3.5" />} text="Address Line" required={rules.currentAddress} optional={!rules.currentAddress} />
            <textarea name="currentAddressLine" value={fd.currentAddressLine} onChange={ch}
              placeholder="House No., Street, Area, Locality" rows={2} required={rules.currentAddress}
              className={`${inputCls} resize-none`} />
          </div>
          <div className="space-y-2">
            <FieldLabel text="City" required={rules.currentAddress} optional={!rules.currentAddress} />
            <input type="text" name="currentCity" value={fd.currentCity} onChange={ch}
              placeholder="City" required={rules.currentAddress} className={inputCls} />
          </div>
          <div className="space-y-2">
            <FieldLabel text="State" required={rules.currentAddress} optional={!rules.currentAddress} />
            <input type="text" name="currentState" value={fd.currentState} onChange={ch}
              placeholder="State" required={rules.currentAddress} className={inputCls} />
          </div>
          <div className="space-y-2">
            <FieldLabel text="Pincode" required={rules.currentAddress} optional={!rules.currentAddress} />
            <input type="text" name="currentPincode" value={fd.currentPincode} onChange={ch}
              placeholder="6-digit pincode" maxLength={6} pattern="[0-9]{6}" required={rules.currentAddress} className={inputCls} />
          </div>
        </div>
      </div>

      {/* Same as Current checkbox */}
      <button type="button"
        onClick={onSameToggle}
        className="w-full flex items-center gap-3 mb-5 p-3 bg-blue-50 border border-blue-100 rounded-xl hover:bg-blue-100/50 transition-colors text-left">
        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
          fd.sameAsCurrent ? 'bg-[#0061f2] border-[#0061f2]' : 'border-gray-300 bg-white'
        }`}>
          {fd.sameAsCurrent && <CheckCircle className="w-3.5 h-3.5 text-white" />}
        </div>
        <span className="text-[11px] font-black text-blue-700 uppercase tracking-widest">
          Permanent address is same as current address
        </span>
      </button>

      {!fd.sameAsCurrent && (
        <div>
          <h3 className="text-[11px] font-black text-purple-700 uppercase tracking-widest flex items-center gap-2 mb-4">
            <Home className="w-4 h-4" /> Permanent Address
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 lg:gap-x-10 gap-y-4">
            <div className="space-y-2 sm:col-span-2">
              <FieldLabel icon={<MapPin className="w-3.5 h-3.5" />} text="Address Line" required={rules.permanentAddress} optional={!rules.permanentAddress} />
              <textarea name="permanentAddressLine" value={fd.permanentAddressLine} onChange={ch}
                placeholder="House No., Street, Area, Locality" rows={2} required={rules.permanentAddress}
                className={`${inputCls} resize-none`} />
            </div>
            <div className="space-y-2">
              <FieldLabel text="City" required={rules.permanentAddress} optional={!rules.permanentAddress} />
              <input type="text" name="permanentCity" value={fd.permanentCity} onChange={ch}
                placeholder="City" required={rules.permanentAddress} className={inputCls} />
            </div>
            <div className="space-y-2">
              <FieldLabel text="State" required={rules.permanentAddress} optional={!rules.permanentAddress} />
              <input type="text" name="permanentState" value={fd.permanentState} onChange={ch}
                placeholder="State" required={rules.permanentAddress} className={inputCls} />
            </div>
            <div className="space-y-2">
              <FieldLabel text="Pincode" required={rules.permanentAddress} optional={!rules.permanentAddress} />
              <input type="text" name="permanentPincode" value={fd.permanentPincode} onChange={ch}
                placeholder="6-digit pincode" maxLength={6} pattern="[0-9]{6}" required={rules.permanentAddress} className={inputCls} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
// STEP 4 — Government IDs + Uploads
// ─────────────────────────────────────────────
function Step4({ fd, ch, docs, setDocs, rules }: {
  fd: EmployeeFormData;
  ch: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>;
  docs: UploadedDocs;
  setDocs: React.Dispatch<React.SetStateAction<UploadedDocs>>;
  rules: ValidationRules;
}) {
  const setDoc = useCallback(<K extends keyof UploadedDocs>(key: K, val: UploadedDocs[K]) => {
    setDocs(prev => ({ ...prev, [key]: val }));
  }, [setDocs]);

  // FIX: PAN is stored uppercase in state so submission is correct
  const handlePanChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const syntheticEvent = {
      ...e,
      target: { ...e.target, name: 'panNumber', value: e.target.value.toUpperCase() },
    } as React.ChangeEvent<HTMLInputElement>;
    ch(syntheticEvent);
  };

  return (
    <div>
      <SectionBanner color="amber" icon={<CreditCard className="w-4 h-4" />}
        title="Government IDs & Document Uploads"
        desc="Enter all official identification numbers and upload corresponding documents on the same page." />

      {/* ── Employee Photo ── */}
      <div className="mb-6 sm:mb-8">
        <h3 className="text-[11px] font-black text-amber-700 uppercase tracking-widest flex items-center gap-2 mb-3 sm:mb-4">
          <Image className="w-4 h-4" /> Employee Photo
        </h3>
        <div className="mb-2">
          <FieldLabel text="Employee Photo Document" required={rules.photo} optional={!rules.photo} />
        </div>
        <div className="max-w-xs">
          {docs.photo ? (
            <div className="flex items-center gap-3 px-3 sm:px-4 py-3 bg-emerald-50 border border-emerald-200 rounded-lg">
              <img src={URL.createObjectURL(docs.photo)} alt="preview"
                className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-lg border border-emerald-200 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-black text-emerald-700 truncate">{docs.photo.name}</p>
                <p className="text-[9px] text-emerald-500 font-bold">{(docs.photo.size / 1024).toFixed(1)} KB</p>
              </div>
              <button type="button" onClick={() => setDoc('photo', null)}
                className="text-emerald-400 hover:text-rose-500 flex-shrink-0">
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <label className="w-full flex flex-col items-center justify-center gap-2 px-4 py-6 bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50/30 transition-all cursor-pointer">
              <Image className="w-8 h-8 text-gray-300" />
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Upload Passport Photo</span>
              <span className="text-[9px] text-gray-300 font-bold">JPG / PNG · Max 2 MB</span>
              <input type="file" accept="image/*" className="hidden"
                onChange={e => setDoc('photo', e.target.files?.[0] ?? null)} />
            </label>
          )}
        </div>
      </div>

      {/* ── Aadhar ── */}
      <IDSection color="amber" title="Aadhar Card" icon={<CreditCard className="w-4 h-4" />}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 lg:gap-x-10 gap-y-4">
          <div className="space-y-2">
            <FieldLabel icon={<CreditCard className="w-3.5 h-3.5" />} text="Aadhar Number" required={rules.aadharNumber} optional={!rules.aadharNumber} />
            <input type="text" name="aadharNumber" value={fd.aadharNumber} onChange={ch}
              placeholder="12-digit Aadhar number" maxLength={12} required={rules.aadharNumber} className={inputCls} />
            <p className="text-[9px] text-gray-400 font-medium italic">As per UIDAI issued Aadhar Card</p>
          </div>
          <FileUploadBox label="Aadhar Card Document" icon={<CreditCard className="w-3.5 h-3.5" />}
            accept=".jpg,.jpeg,.png,.pdf" file={docs.aadharCard}
            onChange={f => setDoc('aadharCard', f)} required={rules.aadharNumber} hint="JPG / PNG / PDF · Max 5 MB" />
        </div>
      </IDSection>

      {/* ── PAN ── */}
      <IDSection color="amber" title="PAN Card" icon={<CreditCard className="w-4 h-4" />}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 lg:gap-x-10 gap-y-4">
          <div className="space-y-2">
            <FieldLabel icon={<CreditCard className="w-3.5 h-3.5" />} text="PAN Number" required={rules.panNumber} optional={!rules.panNumber} />
            {/* FIX: stored uppercase in state */}
            <input type="text" name="panNumber" value={fd.panNumber} onChange={handlePanChange}
              placeholder="e.g. ABCDE1234F" maxLength={10} required={rules.panNumber} className={inputCls} />
            <p className="text-[9px] text-gray-400 font-medium italic">10-character PAN issued by Income Tax Dept</p>
          </div>
          <FileUploadBox label="PAN Card Document" icon={<CreditCard className="w-3.5 h-3.5" />}
            accept=".jpg,.jpeg,.png,.pdf" file={docs.panCard}
            onChange={f => setDoc('panCard', f)} required={rules.panNumber} hint="JPG / PNG / PDF · Max 5 MB" />
        </div>
      </IDSection>

      {/* ── UAN & ESIC ── */}
      <IDSection color="amber" title="UAN & ESIC Numbers" icon={<Hash className="w-4 h-4" />}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 lg:gap-x-10 gap-y-4">
          <div className="space-y-2">
            <FieldLabel icon={<Hash className="w-3.5 h-3.5" />} text="UAN Number" required={rules.uanNumber} optional={!rules.uanNumber} />
            <input type="text" name="uanNumber" value={fd.uanNumber} onChange={ch}
              placeholder="12-digit UAN (EPFO)" maxLength={12} required={rules.uanNumber} className={inputCls} />
            <p className="text-[9px] text-gray-400 font-medium italic">Universal Account Number (PF)</p>
          </div>
          <div className="space-y-2">
            <FieldLabel icon={<Hash className="w-3.5 h-3.5" />} text="ESIC Number" required={rules.esicNumber} optional={!rules.esicNumber} />
            <input type="text" name="esicNumber" value={fd.esicNumber} onChange={ch}
              placeholder="ESIC Insurance Number" required={rules.esicNumber} className={inputCls} />
            <p className="text-[9px] text-gray-400 font-medium italic">Employee State Insurance Corporation</p>
          </div>
        </div>
      </IDSection>

      {/* ── Passport ── */}
      <IDSection color="blue" title="Passport" icon={<FileText className="w-4 h-4" />}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 lg:gap-x-10 gap-y-4">
          <div className="space-y-2">
            <FieldLabel icon={<CreditCard className="w-3.5 h-3.5" />} text="Passport Number" required={rules.passportNumber} optional={!rules.passportNumber} />
            <input type="text" name="passportNumber" value={fd.passportNumber} onChange={ch}
              placeholder="Passport number (if applicable)" required={rules.passportNumber} className={`${inputCls} uppercase`} />
          </div>
          <div className="space-y-2">
            <FieldLabel icon={<Calendar className="w-3.5 h-3.5" />} text="Valid Upto" optional />
            <input type="date" name="passportValidUpto" value={fd.passportValidUpto} onChange={ch}
              className={inputCls} />
            <p className="text-[9px] text-gray-400 font-medium italic">Passport expiry date</p>
          </div>
          <div className="space-y-2 sm:col-span-2">
            <FileUploadBox label="Passport Document" icon={<FileText className="w-3.5 h-3.5" />}
              accept=".jpg,.jpeg,.png,.pdf" file={docs.passport}
              onChange={f => setDoc('passport', f)} required={rules.passportNumber} hint="JPG / PNG / PDF · Max 5 MB" />
          </div>
        </div>
      </IDSection>

      {/* ── PVC ── */}
      <IDSection color="rose" title="Police Verification Certificate (PVC)" icon={<ShieldCheck className="w-4 h-4" />}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 lg:gap-x-10 gap-y-4">
          <div className="space-y-2">
            <FieldLabel icon={<ShieldCheck className="w-3.5 h-3.5" />} text="PVC Number" required={rules.pvcNumber} optional={!rules.pvcNumber} />
            <input type="text" name="pvcNumber" value={fd.pvcNumber} onChange={ch}
              placeholder="Police Verification Certificate number" required={rules.pvcNumber} className={inputCls} />
            <p className="text-[9px] text-gray-400 font-medium italic">Reference number from local police verification authority</p>
          </div>
          <div className="space-y-2">
            <FieldLabel icon={<Calendar className="w-3.5 h-3.5" />} text="Valid Upto" optional />
            <input type="date" name="pvcValidUpto" value={fd.pvcValidUpto} onChange={ch}
              className={inputCls} />
            <p className="text-[9px] text-gray-400 font-medium italic">PVC certificate expiry date</p>
          </div>
          <div className="space-y-2 sm:col-span-2">
            <FileUploadBox label="PVC Document" icon={<ShieldCheck className="w-3.5 h-3.5" />}
              accept=".jpg,.jpeg,.png,.pdf" file={docs.pvc}
              onChange={f => setDoc('pvc', f)} required={rules.pvcNumber} hint="JPG / PNG / PDF · Max 5 MB" />
          </div>
        </div>
      </IDSection>

      {/* ── Additional Documents ── */}
      <IDSection color="indigo" title="Additional Documents" icon={<Paperclip className="w-4 h-4" />} noBorder>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <FileUploadBox label="Bank Passbook / Cancelled Cheque" icon={<Landmark className="w-3.5 h-3.5" />}
            accept=".jpg,.jpeg,.png,.pdf" file={docs.bankPassbook}
            onChange={f => setDoc('bankPassbook', f)} required={rules.bankDetails} hint="JPG / PNG / PDF · Max 5 MB" />
          <FileUploadBox label="Offer / Appointment Letter" icon={<FileText className="w-3.5 h-3.5" />}
            accept=".pdf,.doc,.docx" file={docs.offerLetter}
            onChange={f => setDoc('offerLetter', f)} hint="PDF / DOC · Max 5 MB" />
          <FileUploadBox label="Previous Experience Letter" icon={<Briefcase className="w-3.5 h-3.5" />}
            accept=".pdf,.doc,.docx" file={docs.experienceLetter}
            onChange={f => setDoc('experienceLetter', f)} hint="PDF / DOC · Max 5 MB" />
          <MultiFileUploadBox label="Educational Certificates" icon={<GraduationCap className="w-3.5 h-3.5" />}
            accept=".jpg,.jpeg,.png,.pdf" files={docs.educationCerts}
            onChange={f => setDoc('educationCerts', f)} hint="Degree / Mark Sheets" />
          <div className="sm:col-span-2">
            <MultiFileUploadBox label="Other Supporting Documents" icon={<Paperclip className="w-3.5 h-3.5" />}
              accept=".jpg,.jpeg,.png,.pdf,.doc,.docx" files={docs.otherDocs}
              onChange={f => setDoc('otherDocs', f)} hint="Any additional documents" />
          </div>
        </div>
      </IDSection>

      <div className="mt-4 bg-amber-50 border border-amber-100 rounded-xl p-3 sm:p-4">
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

// Helper component to avoid duplicate section header markup
function IDSection({ color, title, icon, children, noBorder }: {
  color: 'amber' | 'blue' | 'rose' | 'indigo';
  title: string; icon: React.ReactNode; children: React.ReactNode; noBorder?: boolean;
}) {
  const colors: Record<string, string> = {
    amber: 'text-amber-700', blue: 'text-blue-700', rose: 'text-rose-700', indigo: 'text-indigo-700',
  };
  return (
    <div className={`mb-6 sm:mb-8 ${noBorder ? '' : 'pb-6 sm:pb-8 border-b border-gray-100'}`}>
      <h3 className={`text-[11px] font-black uppercase tracking-widest flex items-center gap-2 mb-3 sm:mb-4 ${colors[color]}`}>
        {icon} {title}
      </h3>
      {children}
    </div>
  );
}

// ─────────────────────────────────────────────
// STEP 5 — Bank Details
// ─────────────────────────────────────────────
function Step5({ fd, ch, banks, banksLoading, rules }: {
  fd: EmployeeFormData;
  ch: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>;
  banks: any[];
  banksLoading: boolean;
  rules: ValidationRules;
}) {
  return (
    <div>
      <SectionBanner color="emerald" icon={<Landmark className="w-4 h-4" />}
        title="Bank Account Details"
        desc="Enter the employee's bank account information for salary disbursement." />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 lg:gap-x-10 gap-y-5">
        <div className="space-y-2">
          <FieldLabel icon={<Landmark className="w-3.5 h-3.5" />} text="Bank Name" required={rules.bankDetails} optional={!rules.bankDetails} />
          {banksLoading ? (
            <div className="h-10 sm:h-12 bg-gray-100 rounded-lg animate-pulse" />
          ) : (
            <NativeSelect name="bankName" value={fd.bankName} onChange={ch} required={rules.bankDetails}>
              <option value="">-- Select Bank --</option>
              {banks.map(b => <option key={b.id} value={b.name}>{b.name}</option>)}
            </NativeSelect>
          )}
        </div>
        <div className="space-y-2">
          <FieldLabel icon={<Hash className="w-3.5 h-3.5" />} text="Account Number" required={rules.bankDetails} optional={!rules.bankDetails} />
          <input type="text" name="accountNumber" value={fd.accountNumber} onChange={ch}
            placeholder="Bank account number" required={rules.bankDetails} className={inputCls} />
        </div>
        <div className="space-y-2">
          <FieldLabel icon={<Hash className="w-3.5 h-3.5" />} text="IFSC Code" required={rules.bankDetails} optional={!rules.bankDetails} />
          <input type="text" name="ifscCode" value={fd.ifscCode} onChange={ch}
            placeholder="e.g. SBIN0001234" maxLength={11} required={rules.bankDetails}
            className={`${inputCls} uppercase`} />
          <p className="text-[9px] text-gray-400 font-medium italic">11-character bank branch IFSC code</p>
        </div>
        <div className="space-y-2">
          <FieldLabel icon={<MapPin className="w-3.5 h-3.5" />} text="Branch Name" required={rules.bankDetails} optional={!rules.bankDetails} />
          <input type="text" name="branchName" value={fd.branchName} onChange={ch}
            placeholder="Branch name and city" required={rules.bankDetails} className={inputCls} />
        </div>
        <div className="space-y-2">
          <FieldLabel icon={<CreditCard className="w-3.5 h-3.5" />} text="Account Type" required={rules.bankDetails} optional={!rules.bankDetails} />
          <NativeSelect name="accountType" value={fd.accountType} onChange={ch} required={rules.bankDetails}>
            <option value="">-- Select Account Type --</option>
            {ACCOUNT_TYPES.map(a => <option key={a} value={a}>{a}</option>)}
          </NativeSelect>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// STEP 6 — Emergency, Family, Nominee
// FIX: meal type row full-width on all breakpoints
// ─────────────────────────────────────────────
function Step6({ fd, ch, setFd, rules }: {
  fd: EmployeeFormData;
  ch: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>;
  setFd: React.Dispatch<React.SetStateAction<EmployeeFormData>>;
  rules: ValidationRules;
}) {
  const updateMember = (idx: number, field: keyof FamilyMember, value: string) => {
    setFd(prev => {
      const updated = [...prev.familyMembers];
      updated[idx] = { ...updated[idx], [field]: value };
      return { ...prev, familyMembers: updated };
    });
  };

  const addMember = () =>
    setFd(prev => ({ ...prev, familyMembers: [...prev.familyMembers, { ...EMPTY_FAMILY_MEMBER }] }));

  const removeMember = (idx: number) =>
    setFd(prev => ({ ...prev, familyMembers: prev.familyMembers.filter((_, i) => i !== idx) }));

  return (
    <div>
      <SectionBanner color="rose" icon={<Users className="w-4 h-4" />}
        title="Emergency Contact, Family Members & Nominee"
        desc="Enter emergency contact, all family members with meal preferences, and nominee details." />

      {/* Emergency Contact */}
      <div className="mb-6 sm:mb-8 pb-6 sm:pb-8 border-b border-gray-100">
        <h3 className="text-[11px] font-black text-rose-700 uppercase tracking-widest flex items-center gap-2 mb-3 sm:mb-4">
          <Phone className="w-4 h-4" /> Emergency Contact
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
          <div className="space-y-2">
            <FieldLabel text="Contact Person Name" required={rules.emergencyName} optional={!rules.emergencyName} />
            <input type="text" name="emergencyName" value={fd.emergencyName} onChange={ch}
              placeholder="Full name" required={rules.emergencyName} className={inputCls} />
          </div>
          <div className="space-y-2">
            <FieldLabel icon={<Phone className="w-3.5 h-3.5" />} text="Contact Phone" required={rules.emergencyPhone} optional={!rules.emergencyPhone} />
            <input type="tel" name="emergencyPhone" value={fd.emergencyPhone} onChange={ch}
              placeholder="Mobile number" maxLength={10} required={rules.emergencyPhone} className={inputCls} />
          </div>
          <div className="space-y-2">
            <FieldLabel text="Relation" required={rules.emergencyRelation} optional={!rules.emergencyRelation} />
            <NativeSelect name="emergencyRelation" value={fd.emergencyRelation} onChange={ch} required={rules.emergencyRelation}>
              <option value="">-- Select Relation --</option>
              <option>Father</option><option>Mother</option><option>Spouse</option>
              <option>Sibling</option><option>Son</option><option>Daughter</option>
              <option>Friend</option><option>Other</option>
            </NativeSelect>
          </div>
        </div>
      </div>

      {/* Family Members */}
      <div className="mb-6 sm:mb-8 pb-6 sm:pb-8 border-b border-gray-100">
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <h3 className="text-[11px] font-black text-purple-700 uppercase tracking-widest flex items-center gap-2">
            <Users className="w-4 h-4" /> Family Members
            <span className="px-2 py-0.5 bg-purple-50 border border-purple-100 text-purple-600 rounded-full text-[9px] font-black">
              {fd.familyMembers.length}
            </span>
          </h3>
          <button type="button" onClick={addMember}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-600 text-white text-[9px] font-black rounded-lg uppercase tracking-widest hover:bg-purple-700 active:scale-95 transition-all">
            <Plus className="w-3.5 h-3.5" /> Add Member
          </button>
        </div>

        <div className="space-y-4">
          {fd.familyMembers.map((member, idx) => (
            <div key={idx} className="bg-gray-50 border border-gray-200 rounded-xl p-4 sm:p-5">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <span className="flex items-center gap-2 text-[10px] font-black text-gray-500 uppercase tracking-widest">
                  <span className="w-5 h-5 bg-purple-100 rounded-full flex items-center justify-center text-purple-700 font-black text-[9px]">
                    {idx + 1}
                  </span>
                  Member {idx + 1}
                </span>
                {fd.familyMembers.length > 1 && (
                  <button type="button" onClick={() => removeMember(idx)}
                    className="flex items-center gap-1 px-2.5 py-1.5 bg-rose-50 border border-rose-100 text-rose-600 hover:bg-rose-100 rounded-lg text-[9px] font-black uppercase transition-all">
                    <Trash2 className="w-3 h-3" /> Remove
                  </button>
                )}
              </div>

              {/* FIX: proper responsive grid — name+relation+dob on top, meal below full width */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-3 sm:mb-4">
                <div className="space-y-1.5 sm:col-span-1">
                  <FieldLabel icon={<User className="w-3 h-3" />} text="Full Name" required />
                  <input type="text" value={member.name}
                    onChange={e => updateMember(idx, 'name', e.target.value)}
                    placeholder="Member's full name" className={inputCls} />
                </div>
                <div className="space-y-1.5">
                  <FieldLabel text="Relation" required />
                  <select value={member.relation}
                    onChange={e => updateMember(idx, 'relation', e.target.value)}
                    className={`${inputCls} appearance-none cursor-pointer`}>
                    <option value="">-- Relation --</option>
                    {FAMILY_RELATIONS.map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <FieldLabel icon={<Calendar className="w-3 h-3" />} text="Date of Birth" optional />
                  <input type="date" value={member.dateOfBirth}
                    onChange={e => updateMember(idx, 'dateOfBirth', e.target.value)}
                    className={inputCls} />
                </div>
              </div>

              {/* Meal type — always full width */}
              <div className="space-y-2">
                <FieldLabel icon={<Utensils className="w-3 h-3" />} text="Meal Preference" required />
                <div className="flex flex-wrap gap-3">
                  {(['Veg', 'Non-Veg'] as const).map(type => (
                    <button key={type} type="button"
                      onClick={() => updateMember(idx, 'mealType', type)}
                      className={`flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl border-2 text-[11px] font-black uppercase tracking-widest transition-all ${
                        member.mealType === type
                          ? type === 'Veg'
                            ? 'bg-emerald-500 border-emerald-500 text-white shadow-md shadow-emerald-100'
                            : 'bg-rose-500 border-rose-500 text-white shadow-md shadow-rose-100'
                          : 'bg-white border-gray-200 text-gray-400 hover:border-gray-300 hover:text-gray-500'
                      }`}>
                      {type === 'Veg' ? <Leaf className="w-3.5 h-3.5" /> : <Utensils className="w-3.5 h-3.5" />}
                      {type}
                    </button>
                  ))}
                  {!member.mealType && (
                    <span className="flex items-center text-[9px] font-bold text-rose-400 italic">
                      Please select meal preference
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <button type="button" onClick={addMember}
          className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-purple-200 text-purple-500 hover:bg-purple-50 hover:border-purple-400 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">
          <Plus className="w-4 h-4" /> Add Another Family Member
        </button>
      </div>

      {/* Nominee */}
      <div>
        <h3 className="text-[11px] font-black text-emerald-700 uppercase tracking-widest flex items-center gap-2 mb-3 sm:mb-4">
          <UserCheck className="w-4 h-4" /> Nominee Details
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
          <div className="space-y-2">
            <FieldLabel text="Nominee Name" required={rules.nomineeDetails} optional={!rules.nomineeDetails} />
            <input type="text" name="nomineeName" value={fd.nomineeName} onChange={ch}
              placeholder="Nominee's full name" required={rules.nomineeDetails} className={inputCls} />
          </div>
          <div className="space-y-2">
            <FieldLabel text="Relation with Nominee" required={rules.nomineeDetails} optional={!rules.nomineeDetails} />
            <NativeSelect name="nomineeRelation" value={fd.nomineeRelation} onChange={ch} required={rules.nomineeDetails}>
              <option value="">-- Select Relation --</option>
              <option>Father</option><option>Mother</option><option>Spouse</option>
              <option>Son</option><option>Daughter</option><option>Sibling</option><option>Other</option>
            </NativeSelect>
          </div>
          <div className="space-y-2">
            <FieldLabel text="Nominee Date of Birth" required={rules.nomineeDetails} optional={!rules.nomineeDetails} />
            <input type="date" name="nomineeDOB" value={fd.nomineeDOB} onChange={ch}
              required={rules.nomineeDetails} className={inputCls} />
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// STEP 7 — Credentials
// ─────────────────────────────────────────────
function Step7({ fd, ch, showPwd, showConfPwd, onTogglePwd, onToggleConfPwd, onGenerate }: {
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
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 lg:gap-x-10 gap-y-6">
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
              className="flex items-center gap-1.5 px-3 py-2 bg-white border border-gray-200 rounded-lg text-blue-500 hover:bg-blue-50 shadow-sm text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all">
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
              className={`${inputCls} pr-10 ${match ? 'border-emerald-400 focus:border-emerald-500' : mismatch ? 'border-rose-400 focus:border-rose-500' : ''}`} />
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
// STEP 8 — Review & Submit
// FIX: ReviewRow handles empty/whitespace values; location shown
// ─────────────────────────────────────────────
function Step8({ fd, docs }: { fd: EmployeeFormData; docs: UploadedDocs }) {
  const addr = (line: string, city: string, state: string, pin: string) =>
    [line, city, state, pin].filter(s => s.trim()).join(', ') || '—';

  const permanentAddr = fd.sameAsCurrent
    ? addr(fd.currentAddressLine, fd.currentCity, fd.currentState, fd.currentPincode) + ' (same as current)'
    : addr(fd.permanentAddressLine, fd.permanentCity, fd.permanentState, fd.permanentPincode);

  const uploadedCount = [
    docs.photo, docs.aadharCard, docs.panCard, docs.bankPassbook,
    docs.passport, docs.pvc, docs.offerLetter, docs.experienceLetter,
    ...docs.educationCerts, ...docs.otherDocs,
  ].filter(Boolean).length;

  return (
    <div>
      <SectionBanner color="teal" icon={<ClipboardList className="w-4 h-4" />}
        title="Review & Confirm"
        desc="Please review all entered information carefully before submitting the employee record." />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
        <ReviewCard title="Basic Info" icon={<UserPlus className="w-3.5 h-3.5 text-blue-700" />} color="bg-blue-50 border-b border-blue-100 text-blue-700">
          <ReviewRow label="Full Name"       value={fd.fullName} />
          <ReviewRow label="Official Email"  value={fd.officialEmail} />
          <ReviewRow label="Employee Code"   value={fd.employeeCode} />
          <ReviewRow label="Date of Joining" value={fd.dateOfJoining} />
          <ReviewRow label="Department"      value={fd.department} />
          <ReviewRow label="Location"        value={fd.location} />
          <ReviewRow label="Designation"     value={fd.designation} />
          <ReviewRow label="Qualification"
            value={fd.coreQualification.length > 0
              ? <div className="flex flex-wrap gap-1 mt-0.5">
                  {fd.coreQualification.map(q => (
                    <span key={q} className="px-2 py-0.5 bg-blue-50 border border-blue-100 text-blue-700 text-[9px] font-black rounded-full">{q}</span>
                  ))}
                </div>
              : '—'} />
          <ReviewRow label="Annual Salary" value={fd.annualSalary ? `₹ ${Number(fd.annualSalary).toLocaleString('en-IN')}` : ''} />
        </ReviewCard>

        <ReviewCard title="Personal Details" icon={<User className="w-3.5 h-3.5 text-purple-700" />} color="bg-purple-50 border-b border-purple-100 text-purple-700">
          <ReviewRow label="Date of Birth"  value={fd.dateOfBirth} />
          <ReviewRow label="Gender"         value={fd.gender} />
          <ReviewRow label="Marital Status" value={fd.maritalStatus} />
          <ReviewRow label="Blood Group"    value={fd.bloodGroup} />
          <ReviewRow label="Category"       value={fd.category} />
          <ReviewRow label="Mobile"         value={fd.mobileNumber} />
          <ReviewRow label="Alternate"      value={fd.alternateNumber} />
        </ReviewCard>

        <ReviewCard title="Address" icon={<MapPin className="w-3.5 h-3.5 text-teal-700" />} color="bg-teal-50 border-b border-teal-100 text-teal-700">
          <ReviewRow label="Current Address"   value={addr(fd.currentAddressLine, fd.currentCity, fd.currentState, fd.currentPincode)} />
          <ReviewRow label="Permanent Address" value={permanentAddr} />
        </ReviewCard>

        <ReviewCard title="Government IDs" icon={<CreditCard className="w-3.5 h-3.5 text-amber-700" />} color="bg-amber-50 border-b border-amber-100 text-amber-700">
          <ReviewRow label="Aadhar"              value={fd.aadharNumber} />
          <ReviewRow label="PAN"                 value={fd.panNumber} />
          <ReviewRow label="UAN"                 value={fd.uanNumber} />
          <ReviewRow label="ESIC"                value={fd.esicNumber} />
          <ReviewRow label="Passport No."        value={fd.passportNumber} />
          <ReviewRow label="Passport Valid Upto" value={fd.passportValidUpto} />
          <ReviewRow label="PVC Number"          value={fd.pvcNumber} />
          <ReviewRow label="PVC Valid Upto"      value={fd.pvcValidUpto} />
        </ReviewCard>

        <ReviewCard title="Bank Details" icon={<Landmark className="w-3.5 h-3.5 text-emerald-700" />} color="bg-emerald-50 border-b border-emerald-100 text-emerald-700">
          <ReviewRow label="Bank Name"    value={fd.bankName} />
          <ReviewRow label="Account No." value={fd.accountNumber} />
          <ReviewRow label="IFSC Code"   value={fd.ifscCode} />
          <ReviewRow label="Branch"      value={fd.branchName} />
          <ReviewRow label="Account Type"value={fd.accountType} />
        </ReviewCard>

        <ReviewCard title="Emergency & Family" icon={<Users className="w-3.5 h-3.5 text-rose-700" />} color="bg-rose-50 border-b border-rose-100 text-rose-700">
          <ReviewRow label="Emergency Contact" value={[fd.emergencyName, fd.emergencyRelation].filter(Boolean).join(' — ')} />
          <ReviewRow label="Emergency Phone"   value={fd.emergencyPhone} />
          <div className="px-3 sm:px-4 py-2 sm:py-2.5 border-b border-gray-50">
            <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Family Members</span>
            <div className="mt-1.5 space-y-1.5">
              {fd.familyMembers.filter(m => m.name.trim()).map((m, i) => (
                <div key={i} className="flex items-center justify-between flex-wrap gap-1">
                  <span className="text-[11px] font-bold text-gray-700">
                    {m.name} {m.relation && <span className="text-gray-400 font-normal">({m.relation})</span>}
                  </span>
                  <span className={`text-[8px] font-black px-2 py-0.5 rounded-full uppercase ${
                    m.mealType === 'Veg' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                    : m.mealType === 'Non-Veg' ? 'bg-rose-50 text-rose-700 border border-rose-100'
                    : 'bg-gray-50 text-gray-400'
                  }`}>
                    {m.mealType || 'Not specified'}
                  </span>
                </div>
              ))}
              {!fd.familyMembers.some(m => m.name.trim()) && <span className="text-[11px] text-gray-300">—</span>}
            </div>
          </div>
          <ReviewRow label="Nominee" value={[fd.nomineeName, fd.nomineeRelation].filter(Boolean).join(' — ')} />
        </ReviewCard>

        <ReviewCard title="Documents Uploaded" icon={<Paperclip className="w-3.5 h-3.5 text-indigo-700" />} color="bg-indigo-50 border-b border-indigo-100 text-indigo-700">
          {[
            { label: 'Photo',              file: docs.photo },
            { label: 'Aadhar Card',        file: docs.aadharCard },
            { label: 'PAN Card',           file: docs.panCard },
            { label: 'Passport',           file: docs.passport },
            { label: 'Bank Passbook',      file: docs.bankPassbook },
            { label: 'Police Verification (PVC)', file: docs.pvc },
            { label: 'Offer Letter',       file: docs.offerLetter },
            { label: 'Experience Letter',  file: docs.experienceLetter },
          ].map(({ label, file }) => (
            <div key={label} className="px-3 sm:px-4 py-2 flex items-center justify-between border-b border-gray-50 last:border-0">
              <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{label}</span>
              {file
                ? <span className="text-[10px] font-black text-emerald-600 flex items-center gap-1"><CheckCircle className="w-3 h-3" /> Uploaded</span>
                : <span className="text-[10px] font-bold text-gray-300">Not uploaded</span>}
            </div>
          ))}
          <div className="px-3 sm:px-4 py-2 flex items-center justify-between">
            <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Education Certs</span>
            <span className="text-[10px] font-black text-emerald-600">{docs.educationCerts.length} file(s)</span>
          </div>
          <div className="px-3 sm:px-4 py-2 border-t border-gray-50">
            <span className="text-[9px] font-black text-indigo-600 uppercase tracking-widest">{uploadedCount} total document(s) attached</span>
          </div>
        </ReviewCard>

        <ReviewCard title="Login Credentials" icon={<Lock className="w-3.5 h-3.5 text-gray-700" />} color="bg-gray-100 border-b border-gray-200 text-gray-700">
          <ReviewRow label="Login Email (ID)" value={fd.officialEmail} />
          <ReviewRow label="Temp Password" value={fd.password ? '•'.repeat(fd.password.length) : ''} />
        </ReviewCard>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Success Screen  — FIX: graceful empty dept/designation
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
    <div className="p-4 sm:p-6 flex flex-col items-center justify-center min-h-[500px] sm:min-h-[600px] bg-white rounded-2xl shadow-xl border border-blue-50">
      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-5 sm:mb-6 animate-bounce">
        <BadgeCheck className="w-9 h-9 sm:w-12 sm:h-12 text-emerald-600" />
      </div>
      <h2 className="text-xl sm:text-2xl font-black text-gray-800 uppercase tracking-widest mb-1 text-center">Employee Created!</h2>
      <p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest mb-3 text-center max-w-sm">
        Full employee record has been created. Share temporary credentials with the employee.
      </p>
      <div className="flex flex-wrap gap-2 mb-6 mt-2 justify-center">
        {fd.department && (
          <span className="px-3 py-1 bg-blue-50 text-blue-700 text-[10px] font-black rounded-full border border-blue-100 uppercase">{fd.department}</span>
        )}
        {fd.designation && (
          <span className="px-3 py-1 bg-purple-50 text-purple-700 text-[10px] font-black rounded-full border border-purple-100 uppercase">{fd.designation}</span>
        )}
      </div>
      <div className="w-full max-w-md space-y-3 mb-7">
        <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
          <p className="text-[9px] font-black text-blue-600 uppercase tracking-widest mb-1">Login Email</p>
          <p className="text-base sm:text-lg font-black text-gray-700 break-all">{fd.officialEmail}</p>
        </div>
        <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 relative">
          <p className="text-[9px] font-black text-emerald-600 uppercase tracking-widest mb-1">Temporary Password</p>
          <p className="text-base sm:text-lg font-black text-gray-700 tracking-wider font-mono pr-10">{fd.password}</p>
          <button onClick={handleCopy}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white rounded-lg shadow-sm hover:shadow-md text-blue-600 transition-all">
            {copied ? <CheckCircle className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Workflow */}
      <div className="w-full max-w-md mb-7 overflow-x-auto">
        <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-3 text-center">Pending Workflow</p>
        <div className="flex items-center justify-center gap-0.5 sm:gap-1 min-w-max mx-auto">
          {['HR Submitted', 'IT Approval', 'Account Active', 'Employee Login'].map((label, i) => (
            <React.Fragment key={i}>
              <div className="flex flex-col items-center gap-1">
                <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-[10px] sm:text-[11px] font-black ${
                  i === 0 ? 'bg-[#0061f2] text-white shadow-md shadow-blue-100'
                  : i === 1 ? 'bg-[#0061f2] ring-4 ring-blue-100 text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  {i === 0 ? <CheckCircle className="w-3.5 h-3.5" /> : i + 1}
                </div>
                <span className={`text-[7px] sm:text-[8px] font-black uppercase tracking-tight text-center max-w-[52px] ${
                  i <= 1 ? 'text-[#0061f2]' : 'text-gray-400'
                }`}>{label}</span>
              </div>
              {i < 3 && (
                <div className="flex items-center gap-0.5 mx-0.5 mb-4">
                  <div className={`h-0.5 w-4 sm:w-5 rounded-full ${i === 0 ? 'bg-[#0061f2]' : 'bg-gray-200'}`} />
                  <ChevronRight className={`w-3 h-3 ${i === 0 ? 'text-[#0061f2]' : 'text-gray-300'}`} />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <button onClick={onCreateAnother}
          className="px-5 sm:px-6 py-3 bg-gray-100 text-gray-600 font-black uppercase text-[10px] tracking-widest rounded-xl hover:bg-gray-200 transition-all">
          Add Another
        </button>
        <button onClick={() => onNavigate?.('/hr/employees')}
          className="px-5 sm:px-6 py-3 bg-[#0061f2] text-white font-black uppercase text-[10px] tracking-widest rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-100">
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
  const [step, setStep]         = useState(1);
  const [fd, setFd]             = useState<EmployeeFormData>(EMPTY_FORM);
  const [docs, setDocs]         = useState<UploadedDocs>(EMPTY_DOCS);
  const [loading, setLoading]   = useState(false);
  const [showPwd, setShowPwd]   = useState(false);
  const [showConf, setShowConf] = useState(false);
  const [success, setSuccess]   = useState(false);
  const [error, setError]       = useState<string | null>(null);
  const [visible, setVisible]   = useState(true);
  const [animDir, setAnimDir]   = useState<'f' | 'b'>('f');

  const [rules, setRules] = useState<ValidationRules>(DEFAULT_RULES);
  const [rulesOpen, setRulesOpen] = useState(false);
  const [savingRules, setSavingRules] = useState(false);

  const handleSaveRules = async (updatedRules: ValidationRules) => {
    try {
      setSavingRules(true);
      const response = await fetch(`${API}/api/employeerequiredrules`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedRules)
      });
      if (response.ok) {
        const data = await response.json();
        setRules(data);
        setRulesOpen(false);
        setError('Validation rules updated successfully!');
        setTimeout(() => setError(null), 3000);
      } else {
        alert('Failed to save validation rules.');
      }
    } catch (err) {
      console.error('Error saving rules:', err);
      alert('Connection error while saving rules.');
    } finally {
      setSavingRules(false);
    }
  };

  const ruleKeys = [
    'fullName', 'officialEmail', 'employeeCode', 'dateOfJoining', 'department', 'location',
    'designation', 'annualSalary', 'coreQualification', 'remarks', 'dateOfBirth', 'gender',
    'maritalStatus', 'bloodGroup', 'religion', 'category', 'mobileNumber', 'alternateNumber',
    'currentAddress', 'permanentAddress', 'photo', 'aadharNumber', 'panNumber', 'uanNumber',
    'esicNumber', 'passportNumber', 'pvcNumber', 'bankDetails', 'emergencyName', 'emergencyPhone',
    'emergencyRelation', 'nomineeDetails'
  ] as const;

  const isAllRequired = ruleKeys.every(k => rules[k]);
  const isAllOptional = ruleKeys.every(k => !rules[k]);

  const handleMasterChange = (val: string) => {
    if (val === 'all-required') {
      setRules(prev => {
        const next = { ...prev };
        ruleKeys.forEach(k => { next[k] = true; });
        return next;
      });
    } else if (val === 'all-optional') {
      setRules(prev => {
        const next = { ...prev };
        ruleKeys.forEach(k => { next[k] = false; });
        return next;
      });
    }
  };

  const handleResetToDefaults = () => {
    setRules({ ...DEFAULT_RULES });
  };


  // API-loaded dropdown data
  const [departments, setDepartments] = useState<ApiDepartment[]>([]);
  const [locations,   setLocations]   = useState<ApiLocation[]>([]);
  const [depsLoading, setDepsLoading] = useState(true);
  const [locsLoading, setLocsLoading] = useState(true);
  const [categories,  setCategories]  = useState<any[]>([]);
  const [banks,       setBanks]       = useState<any[]>([]);
  const [catsLoading, setCatsLoading] = useState(true);
  const [banksLoading, setBanksLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/api/employeerequiredrules`)
      .then(r => {
        if (!r.ok) throw new Error();
        return r.json();
      })
      .then((data: any) => setRules(data))
      .catch((e) => console.error('Error fetching validation rules:', e));

    fetch(`${API}/api/departments`)
      .then(r => {
        if (!r.ok) throw new Error();
        return r.json();
      })
      .then((data: any) => setDepartments(Array.isArray(data) ? data : data?.value ?? []))
      .catch(() => setDepartments([]))
      .finally(() => setDepsLoading(false));

    fetch(`${API}/api/locations`)
      .then(r => {
        if (!r.ok) throw new Error();
        return r.json();
      })
      .then((data: any) => setLocations(Array.isArray(data) ? data : data?.value ?? []))
      .catch(() => setLocations([]))
      .finally(() => setLocsLoading(false));

    fetch(`${API}/api/categories`)
      .then(r => {
        if (!r.ok) throw new Error();
        return r.json();
      })
      .then((data: any) => {
        const raw = Array.isArray(data) ? data : data?.value ?? [];
        if (raw.length > 0) {
          setCategories(raw);
        } else {
          setCategories(CATEGORIES.map((c, i) => ({ id: i, name: c })));
        }
      })
      .catch(() => setCategories(CATEGORIES.map((c, i) => ({ id: i, name: c }))))
      .finally(() => setCatsLoading(false));

    fetch(`${API}/api/banks`)
      .then(r => {
        if (!r.ok) throw new Error();
        return r.json();
      })
      .then((data: any) => {
        const raw = Array.isArray(data) ? data : data?.value ?? [];
        if (raw.length > 0) {
          setBanks(raw);
        } else {
          setBanks([
            { id: 1, name: 'State Bank of India' },
            { id: 2, name: 'HDFC Bank' },
            { id: 3, name: 'ICICI Bank' },
            { id: 4, name: 'Axis Bank' },
            { id: 5, name: 'Punjab National Bank' }
          ]);
        }
      })
      .catch(() => setBanks([
        { id: 1, name: 'State Bank of India' },
        { id: 2, name: 'HDFC Bank' },
        { id: 3, name: 'ICICI Bank' },
        { id: 4, name: 'Axis Bank' },
        { id: 5, name: 'Punjab National Bank' }
      ]))
      .finally(() => setBanksLoading(false));
  }, []);

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

  const animateTo = (dir: 'f' | 'b', next: number) => {
    setAnimDir(dir); setVisible(false);
    setTimeout(() => { setStep(next); setVisible(true); }, 200);
  };

  const validateStep = (s: number) => {
    // Basic Info (Step 1)
    if (s === 1) {
      if (rules.fullName && !fd.fullName.trim()) return 'Full Name is required.';
      if (rules.officialEmail && !fd.officialEmail.trim()) return 'Official Email ID is required.';
      if (rules.dateOfJoining && !fd.dateOfJoining) return 'Date of Joining is required.';
      if (rules.department && !fd.department) return 'Department is required.';
      if (rules.designation && !fd.designation.trim()) return 'Designation / Post is required.';
      if (rules.employeeCode && !fd.employeeCode.trim()) return 'Employee Code / ID is required.';
      if (rules.location && !fd.location) return 'Location / Branch is required.';
      if (rules.annualSalary && !fd.annualSalary) return 'Annual Salary is required.';
      if (rules.coreQualification && fd.coreQualification.length === 0) return 'Core Qualification is required.';
      if (rules.remarks && !fd.remarks.trim()) return 'Remarks / Notes are required.';
    }

    // Personal Details (Step 2)
    if (s === 2) {
      if (rules.dateOfBirth && !fd.dateOfBirth) return 'Date of Birth is required.';
      if (rules.gender && !fd.gender) return 'Gender is required.';
      if (rules.maritalStatus && !fd.maritalStatus) return 'Marital Status is required.';
      if (rules.mobileNumber) {
        if (!fd.mobileNumber.trim()) return 'Mobile Number is required.';
        if (fd.mobileNumber.trim().length !== 10) return 'Mobile Number must be exactly 10 digits.';
      }
      if (rules.bloodGroup && !fd.bloodGroup) return 'Blood Group is required.';
      if (rules.religion && !fd.religion) return 'Religion is required.';
      if (rules.category && !fd.category) return 'Category is required.';
      if (rules.alternateNumber && !fd.alternateNumber.trim()) return 'Alternate Number is required.';
    }

    // Address Details (Step 3)
    if (s === 3) {
      if (rules.currentAddress) {
        if (!fd.currentAddressLine.trim()) return 'Current Address Line is required.';
        if (!fd.currentCity.trim()) return 'Current City is required.';
        if (!fd.currentState.trim()) return 'Current State is required.';
        if (!fd.currentPincode.trim()) return 'Current Pincode is required.';
        if (fd.currentPincode.trim().length !== 6) return 'Current Pincode must be exactly 6 digits.';
      }
      
      if (rules.permanentAddress && !fd.sameAsCurrent) {
        if (!fd.permanentAddressLine.trim()) return 'Permanent Address Line is required.';
        if (!fd.permanentCity.trim()) return 'Permanent City is required.';
        if (!fd.permanentState.trim()) return 'Permanent State is required.';
        if (!fd.permanentPincode.trim()) return 'Permanent Pincode is required.';
        if (fd.permanentPincode.trim().length !== 6) return 'Permanent Pincode must be exactly 6 digits.';
      }
    }

    // Govt IDs & Docs (Step 4)
    if (s === 4) {
      if (rules.photo && !docs.photo) return 'Employee Photo is required.';
      if (rules.aadharNumber) {
        if (!fd.aadharNumber.trim()) return 'Aadhar Number is required.';
        if (fd.aadharNumber.trim().length !== 12) return 'Aadhar Number must be exactly 12 digits.';
        if (!docs.aadharCard) return 'Aadhar Card Document is required.';
      }
      if (rules.panNumber) {
        if (!fd.panNumber.trim()) return 'PAN Number is required.';
        if (fd.panNumber.trim().length !== 10) return 'PAN Number must be exactly 10 characters.';
        if (!docs.panCard) return 'PAN Card Document is required.';
      }
      if (rules.uanNumber && !fd.uanNumber.trim()) return 'UAN Number is required.';
      if (rules.esicNumber && !fd.esicNumber.trim()) return 'ESIC Number is required.';
      if (rules.passportNumber) {
        if (!fd.passportNumber.trim()) return 'Passport Number is required.';
        if (!docs.passport) return 'Passport Document is required.';
      }
      if (rules.pvcNumber) {
        if (!fd.pvcNumber.trim()) return 'PVC Number is required.';
        if (!docs.pvc) return 'PVC Document is required.';
      }
    }

    // Bank Details (Step 5)
    if (s === 5) {
      if (rules.bankDetails) {
        if (!fd.bankName) return 'Bank Name is required.';
        if (!fd.accountNumber.trim()) return 'Account Number is required.';
        if (!fd.ifscCode.trim()) return 'IFSC Code is required.';
        if (!fd.branchName.trim()) return 'Branch Name is required.';
        if (!fd.accountType) return 'Account Type is required.';
        if (!docs.bankPassbook) return 'Bank Passbook / Cancelled Cheque is required.';
      }
    }

    // Emergency, Family & Nominee (Step 6)
    if (s === 6) {
      if (rules.emergencyName && !fd.emergencyName.trim()) return 'Emergency Contact Person Name is required.';
      if (rules.emergencyPhone && !fd.emergencyPhone.trim()) return 'Emergency Contact Phone is required.';
      if (rules.emergencyRelation && !fd.emergencyRelation) return 'Emergency Contact Relation is required.';
      
      // Validate Family Meal Preferences if any members added
      for (let i = 0; i < fd.familyMembers.length; i++) {
        const m = fd.familyMembers[i];
        if (m.name.trim() || m.relation || m.dateOfBirth || m.mealType) {
          if (!m.name.trim()) return `Family Member ${i + 1} Name is required.`;
          if (!m.relation) return `Family Member ${i + 1} Relation is required.`;
          if (!m.mealType) return `Family Member ${i + 1} Meal Preference is required.`;
        }
      }

      if (rules.nomineeDetails) {
        if (!fd.nomineeName.trim()) return 'Nominee Name is required.';
        if (!fd.nomineeRelation) return 'Relation with Nominee is required.';
        if (!fd.nomineeDOB) return 'Nominee Date of Birth is required.';
      }
    }

    // Credentials Setup (Step 7)
    if (s === 7) {
      if (!fd.password) return 'Temporary Password is required.';
      if (!fd.confirmPassword) return 'Password Confirmation is required.';
      if (fd.password !== fd.confirmPassword) return 'Passwords do not match.';
    }

    return null;
  };

  const handleNext = () => {
    const validationError = validateStep(step);
    if (validationError) {
      setError(validationError);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    setError(null);
    if (step < TOTAL_STEPS) animateTo('f', step + 1);
  };
  const handleBack = () => { if (step > 1) animateTo('b', step - 1); };

  const handleSubmit = async () => {
    const validationError = validateStep(step);
    if (validationError) {
      setError(validationError);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    try {
      setLoading(true); setError(null);
      const response = await fetch(`${API}/api/employees`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name:               fd.fullName,
          email:              fd.officialEmail,
          employeeCode:       fd.employeeCode,
          department:         fd.department,
          location:           fd.location,
          designation:        fd.designation,
          dateOfJoining:      fd.dateOfJoining,
          qualification:      fd.coreQualification.join(', '),
          annualSalary:       fd.annualSalary,
          remarks:            fd.remarks,
          role:               'Employee',
          temporaryPassword:  fd.password,
          dateOfBirth:        fd.dateOfBirth,
          gender:             fd.gender,
          maritalStatus:      fd.maritalStatus,
          bloodGroup:         fd.bloodGroup,
          religion:           fd.religion,
          category:           fd.category,
          mobileNumber:       fd.mobileNumber,
          alternateNumber:    fd.alternateNumber,
          currentAddress:   `${fd.currentAddressLine}, ${fd.currentCity}, ${fd.currentState} - ${fd.currentPincode}`,
          permanentAddress: fd.sameAsCurrent
            ? `${fd.currentAddressLine}, ${fd.currentCity}, ${fd.currentState} - ${fd.currentPincode}`
            : `${fd.permanentAddressLine}, ${fd.permanentCity}, ${fd.permanentState} - ${fd.permanentPincode}`,
          aadharNumber:       fd.aadharNumber,
          panNumber:          fd.panNumber,
          uanNumber:          fd.uanNumber,
          esicNumber:         fd.esicNumber,
          passportNumber:     fd.passportNumber,
          passportValidUpto:  fd.passportValidUpto,
          pvcNumber:          fd.pvcNumber,
          pvcValidUpto:       fd.pvcValidUpto,
          bankName:           fd.bankName,
          accountNumber:      fd.accountNumber,
          ifscCode:           fd.ifscCode,
          branchName:         fd.branchName,
          accountType:        fd.accountType,
          emergencyContactName:     fd.emergencyName,
          emergencyContactPhone:    fd.emergencyPhone,
          emergencyContactRelation: fd.emergencyRelation,
          nomineeName:        fd.nomineeName,
          nomineeRelation:    fd.nomineeRelation,
          nomineeDOB:         fd.nomineeDOB,
          familyMembers:      fd.familyMembers
            .filter(m => m.name.trim())
            .map(m => ({ name: m.name, relation: m.relation, dateOfBirth: m.dateOfBirth, mealType: m.mealType })),
        }),
      });
      if (response.ok) {
        setSuccess(true);
      } else if (response.status === 409) {
        const data = await response.json();
        setError(data.message ?? 'An employee with this email already exists.');
      } else {
        const text = await response.text();
        setError(`Failed to create employee. ${text || 'Please check all fields.'}`);
      }
    } catch {
      setError('Connection error. Please ensure the backend server is running at ' + API);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setSuccess(false); setStep(1);
    setFd(EMPTY_FORM); setDocs(EMPTY_DOCS); setError(null);
  };

  if (success) {
    return (
      <div className="p-3 sm:p-4 bg-[#f8f9fc] min-h-screen">
        <SuccessScreen fd={fd} onNavigate={onNavigate} onCreateAnother={reset} />
      </div>
    );
  }

  return (
    <div className="p-3 sm:p-4 bg-[#f8f9fc] min-h-screen font-sans">
      {/* ── Top Header ── */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4 sm:mb-5">
        <div>
          <h1 className="text-gray-700 font-black text-lg sm:text-xl uppercase tracking-widest flex items-center gap-2">
            <UserPlus className="w-5 h-5 text-[#0061f2]" /> Add New Employee
          </h1>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">
            HR Onboarding · Complete Employee Registration
          </p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <button onClick={() => setRulesOpen(true)}
            className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-amber-500 text-white text-[10px] font-black rounded-lg shadow-sm uppercase tracking-widest hover:bg-amber-600 transition-all active:scale-95">
            <ShieldCheck className="w-4 h-4" /> <span>Manage Required</span>
          </button>
          <button onClick={() => onNavigate?.('/hr/employees')}
            className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-[#6b58d3] text-white text-[10px] font-black rounded-lg shadow-sm uppercase tracking-widest hover:bg-purple-700 transition-all active:scale-95">
            <ArrowLeft className="w-4 h-4" /> <span className="hidden sm:inline">Back to Employees</span><span className="sm:hidden">Back</span>
          </button>
          <button onClick={() => onNavigate?.('/hr/dashboard')}
            className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-[#00cfd5] text-white text-[10px] font-black rounded-lg shadow-sm uppercase tracking-widest hover:bg-cyan-600 transition-all active:scale-95">
            <Layout className="w-4 h-4" /> <span className="hidden sm:inline">HR Dashboard</span><span className="sm:hidden">Dashboard</span>
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto space-y-3 sm:space-y-4">
        {/* ── Step Indicator Card ── */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-gray-50/50 px-4 sm:px-6 py-3 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-[11px] font-black text-[#0061f2] uppercase tracking-widest flex items-center gap-2">
              <UserPlus className="w-4 h-4" /> Employee Registration
            </h2>
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
              Step {step} / {TOTAL_STEPS}
            </span>
          </div>
          <div className="px-3 sm:px-4 py-3 sm:py-4">
            <StepIndicator currentStep={step} />
            {/* Desktop progress bar */}
            <div className="hidden md:block mt-2 sm:mt-3 h-1 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-500"
                style={{ width: `${((step - 1) / (TOTAL_STEPS - 1)) * 100}%` }} />
            </div>
          </div>
        </div>

        {/* ── Error Banner ── */}
        {error && (
          <div className="p-3 sm:p-4 bg-rose-50 border border-rose-200 rounded-xl flex items-start gap-3 text-rose-600">
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-[11px] font-black uppercase tracking-widest">{error}</p>
              <button onClick={() => setError(null)} className="text-[10px] text-rose-400 underline mt-0.5">Dismiss</button>
            </div>
          </div>
        )}

        {/* ── Step Content Card — FIX: min-height to prevent layout jump ── */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : animDir === 'f' ? 'translateY(10px)' : 'translateY(-10px)',
            transition: 'opacity 0.2s ease, transform 0.2s ease',
          }}>
          <div className="p-4 sm:p-6 md:p-8 min-h-[420px]">
            {step === 1 && (
              <Step1 fd={fd} ch={ch} qch={v => setFd(p => ({ ...p, coreQualification: v }))}
                departments={departments} locations={locations}
                depsLoading={depsLoading} locsLoading={locsLoading} rules={rules} />
            )}
            {step === 2 && <Step2 fd={fd} ch={ch} categories={categories} catsLoading={catsLoading} rules={rules} />}
            {step === 3 && <Step3 fd={fd} ch={ch} rules={rules} onSameToggle={() => setFd(p => ({ ...p, sameAsCurrent: !p.sameAsCurrent }))} />}
            {step === 4 && <Step4 fd={fd} ch={ch} docs={docs} setDocs={setDocs} rules={rules} />}
            {step === 5 && <Step5 fd={fd} ch={ch} banks={banks} banksLoading={banksLoading} rules={rules} />}
            {step === 6 && <Step6 fd={fd} ch={ch} setFd={setFd} rules={rules} />}
            {step === 7 && (
              <Step7 fd={fd} ch={ch}
                showPwd={showPwd} showConfPwd={showConf}
                onTogglePwd={() => setShowPwd(p => !p)}
                onToggleConfPwd={() => setShowConf(p => !p)}
                onGenerate={generatePassword} />
            )}
            {step === 8 && <Step8 fd={fd} docs={docs} />}
          </div>

          {/* ── Bottom Navigation ── */}
          <div className="px-4 sm:px-6 md:px-8 py-4 sm:py-5 border-t border-gray-100 bg-gray-50/40 flex items-center justify-between gap-2 sm:gap-3">
            <button type="button" onClick={handleBack} disabled={step === 1}
              className="flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 bg-[#6b58d3] text-white text-[10px] font-black rounded-lg shadow-sm uppercase tracking-widest hover:bg-purple-700 transition-all disabled:opacity-30 disabled:cursor-not-allowed active:scale-95">
              <ArrowLeft className="w-4 h-4" /> <span className="hidden sm:inline">Previous</span>
            </button>

            {/* Step dot pills */}
            <div className="flex items-center gap-1 flex-1 justify-center">
              {STEPS.map(s => (
                <div key={s.id} className={`h-1.5 rounded-full transition-all duration-300 ${
                  s.id < step ? 'bg-[#0061f2] w-3' : s.id === step ? 'bg-[#0061f2] w-5' : 'bg-gray-200 w-1.5'
                }`} />
              ))}
            </div>

            {step < TOTAL_STEPS ? (
              <button type="button" onClick={handleNext}
                className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-2.5 bg-[#0061f2] text-white text-[10px] font-black rounded-lg shadow-lg shadow-blue-100 uppercase tracking-widest hover:bg-blue-700 transition-all active:scale-95">
                <span className="hidden sm:inline">Next</span> <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button type="button" onClick={handleSubmit} disabled={loading}
                className="flex items-center gap-2 px-4 sm:px-8 py-2 sm:py-2.5 bg-emerald-600 text-white text-[10px] font-black rounded-lg shadow-lg shadow-emerald-100 uppercase tracking-widest hover:bg-emerald-700 transition-all disabled:opacity-50 active:scale-95">
                {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                {loading ? 'Creating...' : <><span className="hidden sm:inline">Create Employee</span><span className="sm:hidden">Submit</span></>}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 sm:mt-10 pt-5 sm:pt-6 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center text-[10px] text-gray-400 font-bold tracking-[0.15em] uppercase gap-2 px-2 sm:px-4">
        <p>Copyright &copy; Digital New Enterprises 2024</p>
        <div className="flex gap-4">
          <a href="#" className="hover:underline hover:text-gray-600 transition-colors">Privacy Policy</a>
          <span>•</span>
          <a href="#" className="hover:underline hover:text-gray-600 transition-colors">Terms &amp; Conditions</a>
        </div>
      </div>

      {/* ── Onboarding Rules Modal ── */}
      {rulesOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm transition-all duration-300">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-hidden flex flex-col animate-scale-up">
            
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-amber-500 to-amber-600 px-6 py-4 flex justify-between items-center text-white">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5" />
                <h3 className="font-black text-sm uppercase tracking-widest">Onboarding Required Rules</h3>
              </div>
              <button onClick={() => setRulesOpen(false)} className="text-white/80 hover:text-white hover:scale-110 transition-all">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6">
              <p className="text-xs text-gray-500 font-bold uppercase tracking-wider leading-relaxed border-b border-gray-100 pb-3">
                Configure which data fields are strictly mandatory vs. optional during employee onboarding.
              </p>

              {/* Master Control Panel */}
              <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 mb-6">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-amber-100 text-amber-700 rounded-lg">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-gray-700 uppercase tracking-widest">Master Rules Controller</h4>
                    <p className="text-[10px] text-gray-400 font-bold uppercase mt-0.5">Quickly apply global presets or clear configs</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <select 
                    value={isAllRequired ? 'all-required' : isAllOptional ? 'all-optional' : 'custom'} 
                    onChange={e => handleMasterChange(e.target.value)}
                    className="flex-1 sm:flex-none px-3.5 py-2 bg-white border border-gray-200 rounded-lg text-xs font-black uppercase text-gray-700 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 cursor-pointer"
                  >
                    <option value="custom">⚙️ Custom Selection</option>
                    <option value="all-required">🔴 All Fields Required</option>
                    <option value="all-optional">🟢 All Fields Optional</option>
                  </select>
                  <button 
                    type="button" 
                    onClick={handleResetToDefaults}
                    className="px-4 py-2 bg-rose-50 border border-rose-100 text-rose-600 text-[10px] font-black rounded-lg uppercase tracking-widest hover:bg-rose-100 active:scale-95 transition-all flex items-center gap-1.5"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Clear to Defaults
                  </button>
                </div>
              </div>

              {/* Group 1: Basic Info */}
              <div>
                <h4 className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                  <UserPlus className="w-3.5 h-3.5" /> 1. Basic Information Step
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <RuleSelect label="Full Name" value={rules.fullName} onChange={v => setRules(p => ({ ...p, fullName: v }))} />
                  <RuleSelect label="Official Email ID" value={rules.officialEmail} onChange={v => setRules(p => ({ ...p, officialEmail: v }))} />
                  <RuleSelect label="Employee Code / ID" value={rules.employeeCode} onChange={v => setRules(p => ({ ...p, employeeCode: v }))} />
                  <RuleSelect label="Date of Joining" value={rules.dateOfJoining} onChange={v => setRules(p => ({ ...p, dateOfJoining: v }))} />
                  <RuleSelect label="Department" value={rules.department} onChange={v => setRules(p => ({ ...p, department: v }))} />
                  <RuleSelect label="Location / Branch" value={rules.location} onChange={v => setRules(p => ({ ...p, location: v }))} />
                  <RuleSelect label="Designation / Post" value={rules.designation} onChange={v => setRules(p => ({ ...p, designation: v }))} />
                  <RuleSelect label="Annual Salary (CTC)" value={rules.annualSalary} onChange={v => setRules(p => ({ ...p, annualSalary: v }))} />
                  <RuleSelect label="Core Qualification" value={rules.coreQualification} onChange={v => setRules(p => ({ ...p, coreQualification: v }))} />
                  <RuleSelect label="Remarks / Notes" value={rules.remarks} onChange={v => setRules(p => ({ ...p, remarks: v }))} />
                </div>
              </div>

              {/* Group 2: Personal Details */}
              <div>
                <h4 className="text-[10px] font-black text-purple-600 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5" /> 2. Personal Profile Step
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <RuleSelect label="Date of Birth" value={rules.dateOfBirth} onChange={v => setRules(p => ({ ...p, dateOfBirth: v }))} />
                  <RuleSelect label="Gender" value={rules.gender} onChange={v => setRules(p => ({ ...p, gender: v }))} />
                  <RuleSelect label="Marital Status" value={rules.maritalStatus} onChange={v => setRules(p => ({ ...p, maritalStatus: v }))} />
                  <RuleSelect label="Blood Group" value={rules.bloodGroup} onChange={v => setRules(p => ({ ...p, bloodGroup: v }))} />
                  <RuleSelect label="Religion" value={rules.religion} onChange={v => setRules(p => ({ ...p, religion: v }))} />
                  <RuleSelect label="Category" value={rules.category} onChange={v => setRules(p => ({ ...p, category: v }))} />
                  <RuleSelect label="Mobile Number" value={rules.mobileNumber} onChange={v => setRules(p => ({ ...p, mobileNumber: v }))} />
                  <RuleSelect label="Alternate Number" value={rules.alternateNumber} onChange={v => setRules(p => ({ ...p, alternateNumber: v }))} />
                </div>
              </div>

              {/* Group 3: Address Details */}
              <div>
                <h4 className="text-[10px] font-black text-[#00cfd5] uppercase tracking-widest mb-3 flex items-center gap-1.5">
                  <Home className="w-3.5 h-3.5" /> 3. Address Details Step
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <RuleSelect label="Current Address Line & Info" value={rules.currentAddress} onChange={v => setRules(p => ({ ...p, currentAddress: v }))} />
                  <RuleSelect label="Permanent Address Line & Info" value={rules.permanentAddress} onChange={v => setRules(p => ({ ...p, permanentAddress: v }))} />
                </div>
              </div>

              {/* Group 4: Govt IDs & Docs */}
              <div>
                <h4 className="text-[10px] font-black text-amber-600 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                  <CreditCard className="w-3.5 h-3.5" /> 4. Government IDs & Uploads
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <RuleSelect label="Employee Photo File" value={rules.photo} onChange={v => setRules(p => ({ ...p, photo: v }))} />
                  <RuleSelect label="Aadhar Card" value={rules.aadharNumber} onChange={v => setRules(p => ({ ...p, aadharNumber: v }))} />
                  <RuleSelect label="PAN Card" value={rules.panNumber} onChange={v => setRules(p => ({ ...p, panNumber: v }))} />
                  <RuleSelect label="UAN (PF) Number" value={rules.uanNumber} onChange={v => setRules(p => ({ ...p, uanNumber: v }))} />
                  <RuleSelect label="ESIC Number" value={rules.esicNumber} onChange={v => setRules(p => ({ ...p, esicNumber: v }))} />
                  <RuleSelect label="Passport & Doc" value={rules.passportNumber} onChange={v => setRules(p => ({ ...p, passportNumber: v }))} />
                  <RuleSelect label="PVC & Doc" value={rules.pvcNumber} onChange={v => setRules(p => ({ ...p, pvcNumber: v }))} />
                </div>
              </div>

              {/* Group 5: Bank & Nominee */}
              <div>
                <h4 className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                  <Landmark className="w-3.5 h-3.5" /> 5. Bank Account & Family Onboarding
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <RuleSelect label="Bank account & passbook" value={rules.bankDetails} onChange={v => setRules(p => ({ ...p, bankDetails: v }))} />
                  <RuleSelect label="Emergency Contact Name" value={rules.emergencyName} onChange={v => setRules(p => ({ ...p, emergencyName: v }))} />
                  <RuleSelect label="Emergency Contact Phone" value={rules.emergencyPhone} onChange={v => setRules(p => ({ ...p, emergencyPhone: v }))} />
                  <RuleSelect label="Emergency Contact Relation" value={rules.emergencyRelation} onChange={v => setRules(p => ({ ...p, emergencyRelation: v }))} />
                  <RuleSelect label="Nominee Details" value={rules.nomineeDetails} onChange={v => setRules(p => ({ ...p, nomineeDetails: v }))} />
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="bg-gray-50 px-6 py-4 flex justify-end gap-3 border-t border-gray-100">
              <button onClick={() => setRulesOpen(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 text-[10px] font-black rounded-lg uppercase tracking-widest hover:bg-gray-300 transition-all active:scale-95">
                Cancel
              </button>
              <button onClick={() => handleSaveRules(rules)} disabled={savingRules}
                className="flex items-center gap-2 px-6 py-2 bg-emerald-600 text-white text-[10px] font-black rounded-lg shadow-md shadow-emerald-100 uppercase tracking-widest hover:bg-emerald-700 transition-all disabled:opacity-50 active:scale-95">
                {savingRules && <RefreshCw className="w-3 h-3 animate-spin" />}
                {savingRules ? 'Saving...' : 'Save Rules'}
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}

// ── Onboarding RuleSelect Select Box Helper Component ──
function RuleSelect({ label, value, onChange }: { label: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 border border-gray-100 rounded-xl">
      <span className="text-[11px] font-black text-gray-600 uppercase tracking-wide">{label}</span>
      <select value={value ? 'required' : 'optional'} onChange={e => onChange(e.target.value === 'required')}
        className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-bold text-gray-700 focus:outline-none focus:border-blue-400">
        <option value="required">Required</option>
        <option value="optional">Optional</option>
      </select>
    </div>
  );
}
