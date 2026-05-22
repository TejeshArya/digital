import React, { useState, useEffect } from 'react';
import { 
  Calendar, Plus, Search, Filter, Edit3, 
  Trash2, Save, FileText, Info, History,
  MapPin, Users, CheckCircle2, Clock, 
  X, Map, Smartphone, ArrowRight, Check,
  Fingerprint, Wifi, Laptop, MapPinned, AlertTriangle, Send, CheckCircle, RefreshCw
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../components/ui/dialog";

interface AttendanceRecord {
  date: string;
  start: string;
  end: string;
  status: string;
}

export function DailyAttendance() {
  const [locations, setLocations] = useState<any[]>([
    { id: 1, name: 'VISAKHAPATNAM' },
    { id: 2, name: 'HYDERABAD' },
    { id: 3, name: 'BANGALORE' }
  ]);

  const [recentAttendance, setRecentAttendance] = useState<AttendanceRecord[]>([
    { date: 'Apr 30, 2026', start: '08:55 AM', end: '06:00 PM', status: 'Approved' },
    { date: 'Apr 29, 2026', start: '08:55 AM', end: '06:00 PM', status: 'Approved' },
    { date: 'Apr 28, 2026', start: '08:55 AM', end: '06:00 PM', status: 'Approved' },
    { date: 'Apr 27, 2026', start: '08:55 AM', end: '06:00 PM', status: 'Approved' },
    { date: 'Apr 26, 2026', start: '08:55 AM', end: '06:00 PM', status: 'Approved' },
    { date: 'Apr 25, 2026', start: '08:55 AM', end: '06:00 PM', status: 'Approved' },
    { date: 'Apr 24, 2026', start: '08:55 AM', end: '06:00 PM', status: 'Approved' },
    { date: 'Apr 23, 2026', start: '08:55 AM', end: '06:00 PM', status: 'Approved' },
    { date: 'Apr 22, 2026', start: '08:55 AM', end: '06:00 PM', status: 'Approved' },
    { date: 'Apr 21, 2026', start: '08:55 AM', end: '06:00 PM', status: 'Approved' },
  ]);

  // Core interactive states
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [checkLocation, setCheckLocation] = useState<string>('');
  const [checkSubLocation, setCheckSubLocation] = useState<string>('');
  const [checkDevice, setCheckDevice] = useState<string>('');

  // Geofence states
  const [verificationState, setVerificationState] = useState<'idle' | 'scanning' | 'verified' | 'failed'>('idle');
  const [scanStep, setScanStep] = useState<number>(0);
  const [scanMessage, setScanMessage] = useState<string>('');

  // Check-In record states
  const [isCheckedIn, setIsCheckedIn] = useState<boolean>(false);
  const [checkInTime, setCheckInTime] = useState<string>('');
  const [checkedLocationName, setCheckedLocationName] = useState<string>('');
  const [checkedSubLocationName, setCheckedSubLocationName] = useState<string>('');
  const [checkedDeviceName, setCheckedDeviceName] = useState<string>('');

  // Modals state
  const [showLeaveModal, setShowLeaveModal] = useState<boolean>(false);
  const [showApprovalModal, setShowApprovalModal] = useState<boolean>(false);

  // Form states for Leave
  const [leaveType, setLeaveType] = useState<string>('Casual Leave');
  const [leaveStart, setLeaveStart] = useState<string>('');
  const [leaveEnd, setLeaveEnd] = useState<string>('');
  const [leaveReason, setLeaveReason] = useState<string>('');
  const [isSubmittingLeave, setIsSubmittingLeave] = useState<boolean>(false);

  // Pending approval list
  const [pendingApprovals, setPendingApprovals] = useState<any[]>([
    { id: 'DEE280326123', name: 'ALAMANDA NARENDRA', time: '09:02 AM', type: 'Check-In Request' },
    { id: 'DEE221225101', name: 'BALMIKI GUPTA', time: '08:48 AM', type: 'Check-In Request' },
    { id: 'DEE251225108', name: 'BIPIN KUMAR THAKUR', time: '09:15 AM', type: 'Check-In Request' }
  ]);

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    try {
      const res = await fetch('http://localhost:5076/api/locations');
      if (res.ok) {
        const data = await res.json();
        if (data && data.length > 0) {
          setLocations(data);
        }
      }
    } catch (e) {
      console.error('Error fetching locations:', e);
    }
  };

  // Sub-locations list mapped by location
  const subLocations: Record<string, string[]> = {
    'VISAKHAPATNAM': ['Main Office Desk - Block A', 'Server Room - Floor 1', 'Conference Room - East Wing', 'Lobby reception Desk'],
    'HYDERABAD': ['Development Lab - 4th Floor', 'Meeting Room C', 'Cafeteria Desk Area'],
    'BANGALORE': ['Corporate Workspace - Suite 102', 'IT Support Desk', 'Boardroom A']
  };

  const devices = [
    'Corporate Android App (Registered GPS)',
    'Authorized Employee Mobile (iPhone)',
    'Corporate Web App (Office Network IP)',
    'Authorized Biometric Attendance Terminal'
  ];

  // Geofence scan simulation
  const startGeofenceVerification = () => {
    if (!checkLocation || !checkSubLocation || !checkDevice) {
      alert('Please select Location, Sub-Location, and Device to proceed.');
      return;
    }

    setVerificationState('scanning');
    setScanStep(0);
    setScanMessage('Initializing Geofence Radar and securing connection...');

    const steps = [
      'Accessing device GPS telemetry and carrier signal coordinates...',
      'Retrieving corporate network gateway IP & SSID details...',
      'Comparing distance coordinates to verified Office Location geofence bounds...',
      'Success! Verified: Within 12 meters of Office Range (Limit: 50m)'
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      if (currentStep < steps.length) {
        setScanStep(currentStep);
        setScanMessage(steps[currentStep]);
      } else {
        clearInterval(interval);
        setVerificationState('verified');
      }
    }, 900);
  };

  // Mark Attendance Punch-in / Punch-out
  const handlePunch = () => {
    if (!isCheckedIn) {
      // Punch-in
      const timeStr = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
      const todayStr = new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
      
      setIsCheckedIn(true);
      setCheckInTime(timeStr);
      setCheckedLocationName(checkLocation);
      setCheckedSubLocationName(checkSubLocation);
      setCheckedDeviceName(checkDevice);

      // Prepend to recent attendance table
      const newRecord: AttendanceRecord = {
        date: todayStr,
        start: timeStr,
        end: '---',
        status: 'Approved'
      };
      setRecentAttendance(prev => [newRecord, ...prev]);
    } else {
      // Punch-out
      setIsCheckedIn(false);
      setVerificationState('idle');
      setCheckLocation('');
      setCheckSubLocation('');
      setCheckDevice('');
      
      // Update today's record end time in recent attendance
      const todayStr = new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
      const timeStr = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
      
      setRecentAttendance(prev => 
        prev.map(r => r.date === todayStr ? { ...r, end: timeStr } : r)
      );
    }
  };

  // Smooth scroll to attendance mark section
  const scrollToMarkSection = () => {
    const element = document.getElementById('location-check-card');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      // Add subtle glow animation class dynamically
      element.classList.add('ring-4', 'ring-blue-400/50');
      setTimeout(() => {
        element.classList.remove('ring-4', 'ring-blue-400/50');
      }, 2000);
    }
  };

  // Handle Leave Apply Simulation
  const handleApplyLeaveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leaveStart || !leaveEnd || !leaveReason) {
      alert('Please fill out all fields.');
      return;
    }
    setIsSubmittingLeave(true);
    setTimeout(() => {
      setIsSubmittingLeave(false);
      setShowLeaveModal(false);
      alert('Leave application submitted successfully for review!');
      setLeaveStart('');
      setLeaveEnd('');
      setLeaveReason('');
    }, 1200);
  };

  // Approve employee attendance
  const approveEmployee = (id: string, name: string) => {
    setPendingApprovals(prev => prev.filter(e => e.id !== id));
    alert(`Attendance approved successfully for employee ${name} (${id})!`);
  };

  const rejectEmployee = (id: string, name: string) => {
    setPendingApprovals(prev => prev.filter(e => e.id !== id));
    alert(`Attendance request rejected for employee ${name} (${id}).`);
  };

  // Auto detect sub-locations list options
  const selectedSubLocations = subLocations[checkLocation] || ['General Workdesk Area', 'Ground Floor Cabin', 'First Floor Hub'];

  return (
    <div className="p-4 bg-[#f8f9fc] min-h-screen font-sans">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div className="space-y-1">
          <h1 className="text-gray-700 font-black text-xl uppercase tracking-widest flex items-center gap-2">
             Daily Attendance
          </h1>
          <p className="text-[11px] text-gray-400 font-bold uppercase tracking-tight">Track employee attendance and geofence locations</p>
        </div>
        <div className="flex flex-wrap gap-2">
           <button 
             onClick={scrollToMarkSection}
             className="flex items-center gap-2 px-4 py-2.5 bg-[#0061f2] text-white text-[10px] font-black rounded shadow-lg shadow-blue-100 uppercase tracking-widest hover:bg-blue-700 transition-all active:scale-95"
           >
              <Fingerprint className="w-4 h-4" /> Mark Attendance (HR)
           </button>
           <button 
             onClick={() => setShowLeaveModal(true)}
             className="flex items-center gap-2 px-4 py-2.5 bg-[#f6c23e] text-white text-[10px] font-black rounded shadow-lg shadow-yellow-100 uppercase tracking-widest hover:bg-yellow-600 transition-all active:scale-95"
           >
              <Calendar className="w-4 h-4" /> Apply Leave
           </button>
           <button 
             onClick={() => setShowApprovalModal(true)}
             className="flex items-center gap-2 px-4 py-2.5 bg-[#1cc88a] text-white text-[10px] font-black rounded shadow-lg shadow-green-100 uppercase tracking-widest hover:bg-emerald-600 transition-all active:scale-95"
           >
              <CheckCircle2 className="w-4 h-4" /> Approve Attendance
           </button>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Column */}
        <div className="lg:col-span-2 space-y-6">
           {/* Date Display */}
           <div className="text-center space-y-1 bg-white p-4 rounded-xl shadow-sm border border-gray-100/50">
              <p className="text-[11px] font-black text-blue-600/75 uppercase tracking-[0.3em]">DEE251225103</p>
              <h2 className="text-[15px] font-black text-gray-600 uppercase tracking-widest">
                {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: '2-digit', year: 'numeric' })}
              </h2>
           </div>

           {/* Today's Attendance Card */}
           <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all">
              <div className="bg-[#0061f2] px-6 py-4 flex items-center justify-between">
                 <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-white" />
                    <h3 className="text-white text-[12px] font-black uppercase tracking-widest">Today's Attendance <span className="text-white/60 text-[10px] ml-2">(Employees You Manage)</span></h3>
                 </div>
                 {isCheckedIn && (
                   <span className="bg-emerald-500 text-white text-[9px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-widest animate-pulse">
                     Active Session
                   </span>
                 )}
              </div>

              {!isCheckedIn ? (
                <div className="p-16 flex flex-col items-center justify-center gap-4">
                   <div className="bg-gray-100 p-4 rounded-full">
                      <X className="w-8 h-8 text-gray-300" />
                   </div>
                   <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest">No attendance marked today for managed employees.</p>
                </div>
              ) : (
                <div className="p-8 bg-gradient-to-r from-emerald-50/50 to-teal-50/20">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Status Box */}
                    <div className="bg-white p-5 rounded-xl border border-emerald-100 shadow-sm flex items-center gap-4">
                      <div className="bg-emerald-500 p-3 rounded-lg text-white">
                        <CheckCircle className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="text-[9px] font-black text-emerald-600 uppercase tracking-widest">STATUS</div>
                        <div className="text-[15px] font-black text-gray-800 uppercase">PRESENT</div>
                      </div>
                    </div>

                    {/* Time Box */}
                    <div className="bg-white p-5 rounded-xl border border-emerald-100 shadow-sm flex items-center gap-4">
                      <div className="bg-blue-500 p-3 rounded-lg text-white">
                        <Clock className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="text-[9px] font-black text-blue-600 uppercase tracking-widest">PUNCH IN TIME</div>
                        <div className="text-[15px] font-black text-gray-800 uppercase">{checkInTime}</div>
                      </div>
                    </div>

                    {/* Device Box */}
                    <div className="bg-white p-5 rounded-xl border border-emerald-100 shadow-sm flex items-center gap-4">
                      <div className="bg-[#6b58d3] p-3 rounded-lg text-white">
                        <Smartphone className="w-6 h-6" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-[9px] font-black text-[#6b58d3] uppercase tracking-widest">VERIFIED DEVICE</div>
                        <div className="text-[11px] font-black text-gray-700 truncate uppercase">{checkedDeviceName.split(' ')[0]}</div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-white/80 border border-emerald-100/50 rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-sm">
                    <div className="space-y-1">
                      <div className="text-[10px] font-bold text-gray-400 uppercase">OFFICE RANGE LOCATION</div>
                      <div className="text-[12px] font-black text-gray-700 uppercase flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 text-emerald-500" />
                        {checkedLocationName} &mdash; <span className="text-blue-600 font-bold">{checkedSubLocationName}</span>
                      </div>
                    </div>

                    <button 
                      onClick={handlePunch}
                      className="px-6 py-2 bg-rose-600 text-white text-[10px] font-black rounded-lg uppercase tracking-widest hover:bg-rose-700 transition-colors shadow-md shadow-rose-100 hover:shadow-lg active:scale-95"
                    >
                      Punch Out Session
                    </button>
                  </div>
                </div>
              )}
           </div>

           {/* Geofence Settings */}
           <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 space-y-6">
              <div className="flex items-center gap-3 text-gray-700">
                 <MapPin className="w-5 h-5 text-blue-600" />
                 <h3 className="text-[13px] font-black uppercase tracking-widest">Office Location & Geofence Settings</h3>
              </div>
              
              <div className="space-y-6 pt-4 border-t border-gray-50">
                 <div className="flex items-center gap-2 text-blue-600">
                    <span className="w-5 h-5 rounded-full bg-blue-50 text-[10px] font-black flex items-center justify-center">1</span>
                    <span className="text-[11px] font-black uppercase tracking-widest">Step 1: Select Corporate Location</span>
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Location *</label>
                      <select 
                        value={selectedLocation}
                        onChange={(e) => setSelectedLocation(e.target.value)}
                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-[12px] font-bold text-gray-500 focus:outline-none focus:border-blue-400 transition-all appearance-none cursor-pointer"
                      >
                         <option value="">-- Select Location --</option>
                         {locations.map(loc => (
                           <option key={loc.id} value={loc.name}>{loc.name}</option>
                         ))}
                      </select>
                   </div>

                   {selectedLocation && (
                     <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100/50 space-y-2">
                       <div className="text-[9px] font-black text-blue-600 uppercase tracking-widest">ACTIVE GEOFENCE SPECIFICATIONS</div>
                       <div className="grid grid-cols-2 gap-2 text-[10px] font-bold text-gray-600">
                         <div>RADIUS: <span className="text-gray-800 font-black">50 METERS</span></div>
                         <div>LIMIT: <span className="text-gray-800 font-black">AUTHORIZED IP</span></div>
                         <div className="col-span-2">COORDINATES: <span className="text-gray-800 font-black">17.6868° N, 83.2185° E</span></div>
                       </div>
                     </div>
                   )}
                 </div>
              </div>
           </div>

           {/* Location Check */}
           <div 
             id="location-check-card"
             className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 space-y-6 transition-all duration-300"
           >
              <div className="flex items-center gap-3 text-gray-700">
                 <Users className="w-5 h-5 text-blue-600" />
                 <h3 className="text-[13px] font-black uppercase tracking-widest">Employee Location Check</h3>
              </div>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-tight">Select location, sub-location, and device to check if you are within office range.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-gray-50">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-rose-500 uppercase tracking-widest">Select Location *</label>
                    <select 
                      value={checkLocation}
                      onChange={(e) => {
                        setCheckLocation(e.target.value);
                        setCheckSubLocation('');
                        setVerificationState('idle');
                      }}
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-[12px] font-bold text-gray-500 focus:outline-none focus:border-blue-400 transition-all appearance-none cursor-pointer"
                    >
                       <option value="">-- Select Location --</option>
                       {locations.map(loc => (
                         <option key={loc.id} value={loc.name}>{loc.name}</option>
                       ))}
                    </select>
                 </div>

                 {checkLocation && (
                   <>
                     <div className="space-y-2">
                        <label className="text-[10px] font-black text-rose-500 uppercase tracking-widest">Sub-Location *</label>
                        <select 
                          value={checkSubLocation}
                          onChange={(e) => {
                            setCheckSubLocation(e.target.value);
                            setVerificationState('idle');
                          }}
                          className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-[12px] font-bold text-gray-500 focus:outline-none focus:border-blue-400 transition-all appearance-none cursor-pointer"
                        >
                           <option value="">-- Select Sub-Location --</option>
                           {selectedSubLocations.map((sub, i) => (
                             <option key={i} value={sub}>{sub}</option>
                           ))}
                        </select>
                     </div>

                     <div className="space-y-2">
                        <label className="text-[10px] font-black text-rose-500 uppercase tracking-widest">Select Device *</label>
                        <select 
                          value={checkDevice}
                          onChange={(e) => {
                            setCheckDevice(e.target.value);
                            setVerificationState('idle');
                          }}
                          className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-[12px] font-bold text-gray-500 focus:outline-none focus:border-blue-400 transition-all appearance-none cursor-pointer"
                        >
                           <option value="">-- Select Device --</option>
                           {devices.map((dev, i) => (
                             <option key={i} value={dev}>{dev}</option>
                           ))}
                        </select>
                     </div>
                   </>
                 )}
              </div>

              {checkLocation && checkSubLocation && checkDevice && (
                <div className="pt-6 border-t border-gray-50 flex flex-col items-center justify-center">
                  
                  {verificationState === 'idle' && (
                    <button 
                      onClick={startGeofenceVerification}
                      className="flex items-center gap-2 px-8 py-3 bg-[#0061f2] text-white text-[11px] font-black rounded-lg uppercase tracking-widest hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg active:scale-95"
                    >
                      <Wifi className="w-4 h-4 animate-bounce" /> Verify Location & Geofence Range
                    </button>
                  )}

                  {verificationState === 'scanning' && (
                    <div className="w-full max-w-xl p-6 bg-slate-50 border border-slate-100 rounded-xl space-y-4 text-center">
                      <div className="relative w-16 h-16 mx-auto flex items-center justify-center">
                        <div className="absolute inset-0 border-4 border-blue-200 rounded-full animate-ping" />
                        <div className="absolute inset-0 border-4 border-t-blue-600 border-r-transparent border-l-transparent border-b-transparent rounded-full animate-spin" />
                        <Fingerprint className="w-8 h-8 text-blue-600" />
                      </div>
                      <div className="text-[9px] font-black text-blue-600 uppercase tracking-widest">GEOFENCE RADAR SCANNING</div>
                      <p className="text-[11px] font-bold text-gray-500 h-8 flex items-center justify-center px-4 leading-relaxed uppercase tracking-tight">
                        {scanMessage}
                      </p>
                      <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                        <div 
                          className="bg-blue-600 h-full rounded-full transition-all duration-300"
                          style={{ width: `${(scanStep + 1) * 25}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {verificationState === 'verified' && (
                    <div className="w-full max-w-xl p-6 bg-emerald-50 border border-emerald-100 rounded-xl text-center space-y-4 shadow-sm animate-fadeIn">
                      <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center text-white mx-auto shadow-md">
                        <Check className="w-6 h-6 stroke-[3]" />
                      </div>
                      <div>
                        <div className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">VERIFICATION SUCCESSFUL</div>
                        <h4 className="text-[13px] font-black text-gray-800 uppercase mt-1">You are inside the Office Range!</h4>
                        <p className="text-[10px] font-bold text-gray-400 uppercase mt-0.5">Visakhapatnam &bull; {checkSubLocation}</p>
                      </div>

                      <div className="pt-2">
                        {!isCheckedIn ? (
                          <button 
                            onClick={handlePunch}
                            className="flex items-center gap-2 px-10 py-3.5 bg-emerald-600 text-white text-[12px] font-black rounded-xl uppercase tracking-widest hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-100 hover:shadow-xl active:scale-95 animate-pulse"
                          >
                            <Fingerprint className="w-5 h-5" /> Mark Present / Punch In
                          </button>
                        ) : (
                          <div className="text-[11px] font-black text-emerald-600 uppercase bg-white border border-emerald-100 px-4 py-2.5 rounded-lg inline-block">
                            SUCCESS: You have successfully punched in for today!
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                </div>
              )}
           </div>
        </div>

        {/* Sidebar Column */}
        <div className="space-y-6">
           <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
                 <h3 className="text-[13px] font-black text-gray-700 uppercase tracking-widest">Recent Attendance</h3>
                 <History className="w-4 h-4 text-gray-400" />
              </div>
              <div className="divide-y divide-gray-50 max-h-[700px] overflow-y-auto custom-scrollbar">
                 {recentAttendance.map((item, idx) => (
                   <div key={idx} className="p-6 hover:bg-gray-50/30 transition-all flex justify-between items-center group">
                      <div className="space-y-1">
                         <h4 className="text-[13px] font-black text-gray-700 uppercase tracking-tight group-hover:text-blue-600 transition-colors">{item.date}</h4>
                         <p className="text-[10px] font-bold text-gray-400 flex items-center gap-1.5 uppercase">
                            <Clock className="w-3 h-3 text-blue-500" /> Start: <span className="text-gray-600 font-black">{item.start}</span> | End: <span className="text-gray-600 font-black">{item.end}</span>
                         </p>
                      </div>
                      <span className={`text-[8px] font-black px-2 py-0.5 rounded shadow-sm uppercase tracking-widest ${item.status === 'Approved' ? 'bg-[#1cc88a] text-white' : 'bg-amber-500 text-white'}`}>
                         {item.status}
                      </span>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </div>

      {/* Leave Application Modal */}
      <Dialog open={showLeaveModal} onOpenChange={setShowLeaveModal}>
        <DialogContent className="max-w-md bg-white p-6 rounded-xl border border-gray-100">
          <DialogHeader>
            <DialogTitle className="text-sm font-black text-gray-700 uppercase tracking-widest border-b border-gray-50 pb-3 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-600" /> Apply For Leave
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleApplyLeaveSubmit} className="space-y-4 pt-2">
            <div className="space-y-1">
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Leave Type *</label>
              <select 
                value={leaveType}
                onChange={(e) => setLeaveType(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-[12px] font-bold text-gray-600 bg-white"
              >
                <option value="Casual Leave">Casual Leave (CL)</option>
                <option value="Sick Leave">Sick Leave (SL)</option>
                <option value="Earned Leave">Earned Leave (EL)</option>
                <option value="Maternity Leave">Maternity Leave</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Start Date *</label>
                <input 
                  type="date"
                  value={leaveStart}
                  onChange={(e) => setLeaveStart(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg text-[12px] font-bold text-gray-600"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">End Date *</label>
                <input 
                  type="date"
                  value={leaveEnd}
                  onChange={(e) => setLeaveEnd(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg text-[12px] font-bold text-gray-600"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Reason / Remarks *</label>
              <textarea 
                rows={3}
                value={leaveReason}
                onChange={(e) => setLeaveReason(e.target.value)}
                placeholder="Enter details about your leave request..."
                className="w-full px-4 py-2 border border-gray-200 rounded-lg text-[12px] font-bold text-gray-600 focus:outline-none focus:border-blue-400 resize-none"
              />
            </div>

            <div className="pt-4 border-t border-gray-50 flex justify-end gap-2">
              <button 
                type="button" 
                onClick={() => setShowLeaveModal(false)}
                className="px-4 py-2 border border-gray-200 rounded-lg text-[10px] font-black text-gray-500 uppercase tracking-wider hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                type="submit"
                disabled={isSubmittingLeave}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg text-[10px] font-black uppercase tracking-wider hover:bg-blue-700 flex items-center gap-1.5 shadow-md shadow-blue-100 disabled:opacity-50"
              >
                {isSubmittingLeave ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" /> Submit Request
                  </>
                )}
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Attendance Approval Modal */}
      <Dialog open={showApprovalModal} onOpenChange={setShowApprovalModal}>
        <DialogContent className="max-w-xl bg-white p-6 rounded-xl border border-gray-100">
          <DialogHeader>
            <DialogTitle className="text-sm font-black text-gray-700 uppercase tracking-widest border-b border-gray-50 pb-3 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" /> Pending Approvals
              </span>
              <span className="bg-blue-50 text-blue-600 text-[9px] font-black px-2 py-0.5 rounded-full uppercase">
                {pendingApprovals.length} Request{pendingApprovals.length !== 1 ? 's' : ''}
              </span>
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 pt-2 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
            {pendingApprovals.length === 0 ? (
              <div className="text-center py-12 text-gray-400 font-bold text-[11px] uppercase tracking-widest">
                🎉 No pending attendance approval requests!
              </div>
            ) : (
              pendingApprovals.map((emp) => (
                <div key={emp.id} className="p-4 border border-gray-100 rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-50/50 hover:bg-white hover:shadow-sm hover:border-gray-200 transition-all">
                  <div className="space-y-1">
                    <h4 className="text-[12px] font-black text-gray-700 uppercase">{emp.name}</h4>
                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                      EMP ID: <span className="text-gray-600 font-black">{emp.id}</span> &bull; {emp.type}
                    </div>
                    <div className="text-[10px] text-gray-500 font-semibold uppercase tracking-tight flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-blue-500" /> Time: {emp.time}
                    </div>
                  </div>

                  <div className="flex gap-2 w-full md:w-auto">
                    <button 
                      onClick={() => rejectEmployee(emp.id, emp.name)}
                      className="flex-1 md:flex-none px-4 py-1.5 border border-rose-200 text-rose-600 rounded-lg text-[9px] font-black uppercase tracking-widest hover:bg-rose-50 transition-colors"
                    >
                      Reject
                    </button>
                    <button 
                      onClick={() => approveEmployee(emp.id, emp.name)}
                      className="flex-1 md:flex-none px-4 py-1.5 bg-emerald-600 text-white rounded-lg text-[9px] font-black uppercase tracking-widest hover:bg-emerald-700 transition-colors shadow-sm"
                    >
                      Approve
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Footer */}
      <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center text-[10px] text-gray-400 font-bold tracking-[0.2em] uppercase px-4">
        <p>Copyright &copy; Digital New Enterprises 2024</p>
        <div className="flex gap-4">
          <a href="#" className="hover:underline transition-colors hover:text-gray-600">Privacy Policy</a>
          <span>•</span>
          <a href="#" className="hover:underline transition-colors hover:text-gray-600">Terms & Conditions</a>
        </div>
      </div>
    </div>
  );
}
