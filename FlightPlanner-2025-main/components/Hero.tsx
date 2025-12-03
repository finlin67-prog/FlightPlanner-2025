import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Building2, Briefcase, DollarSign, MapPin, Zap, Layers, Search, ArrowRight, UserCircle2 } from 'lucide-react';
import { useUser } from '../store/UserContext';
import { CITIES, ROLES, INDUSTRIES, COMPANY_SIZES, REVENUES, COMPANY_TYPES, PURPOSES } from '../data/staticData';

export const Hero: React.FC = () => {
  const navigate = useNavigate();
  const { profile, setProfile, setBooking } = useUser();
  
  // Step 1: Profile State
  const [role, setRole] = useState(profile?.role || '');
  const [industry, setIndustry] = useState(profile?.industry || '');
  const [companyType, setCompanyType] = useState(profile?.companyType || '');
  const [companySize, setCompanySize] = useState(profile?.companySize || '');
  const [revenue, setRevenue] = useState(profile?.revenue || '');

  // Step 2: Journey State
  const [bookingMode, setBookingMode] = useState<'manual' | 'quick' | 'deep'>('manual');
  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');
  const [purpose, setPurpose] = useState('');

  // Sync state with context if it exists
  useEffect(() => {
    if (profile) {
      if (profile.role) setRole(profile.role);
      if (profile.industry) setIndustry(profile.industry);
      if (profile.companyType) setCompanyType(profile.companyType);
      if (profile.companySize) setCompanySize(profile.companySize);
      if (profile.revenue) setRevenue(profile.revenue);
    }
  }, [profile]);

  const handleProfileUpdate = () => {
    setProfile({
      ...profile,
      role,
      industry,
      companyType,
      companySize,
      revenue
    } as any);
  };

  const handleSearch = () => {
    // 1. Save Profile
    handleProfileUpdate();

    // 2. Save Booking Request
    setBooking({
      mode: bookingMode,
      from: fromCity,
      to: toCity,
      purpose
    });

    // 3. Navigate based on mode
    if (bookingMode === 'manual') {
      // Simulate "Finding Flights" -> Go to Journey Map for now, or results
      navigate('/journey-map');
    } else if (bookingMode === 'quick') {
      navigate('/assessment');
    } else if (bookingMode === 'deep') {
      navigate('/tech-stack');
    }
  };

  return (
    <div className="w-full bg-white rounded-xl shadow-2xl overflow-hidden border border-slate-200">
      
      {/* STEP 1: TRAVELER PROFILE (Top Bar) */}
      <div className="bg-slate-50 border-b border-slate-200 p-6">
        <div className="flex items-center gap-2 mb-4">
          <UserCircle2 className="text-cyan-600" size={20} />
          <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider">Step 1: Traveler Profile</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-500 flex items-center gap-1">
              <User size={12} /> YOUR ROLE
            </label>
            <div className="relative">
              <select 
                value={role} onChange={e => setRole(e.target.value)}
                className="w-full p-2 bg-white border border-slate-300 rounded text-slate-800 text-sm font-medium focus:ring-2 focus:ring-cyan-500 outline-none appearance-none"
              >
                <option value="">Select Role</option>
                {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-500 flex items-center gap-1">
              <Briefcase size={12} /> INDUSTRY
            </label>
            <select 
              value={industry} onChange={e => setIndustry(e.target.value)}
              className="w-full p-2 bg-white border border-slate-300 rounded text-slate-800 text-sm font-medium focus:ring-2 focus:ring-cyan-500 outline-none"
            >
              <option value="">Select Industry</option>
              {INDUSTRIES.map(i => <option key={i} value={i}>{i}</option>)}
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-500 flex items-center gap-1">
              <Building2 size={12} /> COMPANY TYPE
            </label>
            <select 
              value={companyType} onChange={e => setCompanyType(e.target.value)}
              className="w-full p-2 bg-white border border-slate-300 rounded text-slate-800 text-sm font-medium focus:ring-2 focus:ring-cyan-500 outline-none"
            >
              <option value="">Select Type</option>
              {COMPANY_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-500 flex items-center gap-1">
              <Layers size={12} /> SIZE
            </label>
            <select 
              value={companySize} onChange={e => setCompanySize(e.target.value)}
              className="w-full p-2 bg-white border border-slate-300 rounded text-slate-800 text-sm font-medium focus:ring-2 focus:ring-cyan-500 outline-none"
            >
              <option value="">Select Size</option>
              {COMPANY_SIZES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-500 flex items-center gap-1">
              <DollarSign size={12} /> REVENUE
            </label>
            <select 
              value={revenue} onChange={e => setRevenue(e.target.value)}
              className="w-full p-2 bg-white border border-slate-300 rounded text-slate-800 text-sm font-medium focus:ring-2 focus:ring-cyan-500 outline-none"
            >
              <option value="">Select Revenue</option>
              {REVENUES.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* STEP 2: PLAN YOUR JOURNEY (Main Body) */}
      <div className="p-8">
        <div className="flex items-center gap-2 mb-6">
          <Zap className="text-cyan-600" size={20} />
          <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider">Step 2: Plan Your Journey</h2>
        </div>

        {/* Mode Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <button 
            onClick={() => setBookingMode('manual')}
            className={`flex flex-col items-start p-4 rounded-xl border-2 transition-all text-left ${
              bookingMode === 'manual' 
              ? 'border-cyan-500 bg-cyan-50 shadow-md' 
              : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            <div className={`p-2 rounded-lg mb-3 ${bookingMode === 'manual' ? 'bg-cyan-500 text-white' : 'bg-slate-200 text-slate-500'}`}>
              <MapPin size={20} />
            </div>
            <h3 className="font-bold text-slate-900">Manual Booking</h3>
            <p className="text-xs text-slate-500 mt-1">I know my current problem and where I want to go.</p>
            {bookingMode === 'manual' && <div className="absolute top-4 right-4 text-cyan-600"><Zap size={16} fill="currentColor" /></div>}
          </button>

          <button 
            onClick={() => setBookingMode('quick')}
            className={`flex flex-col items-start p-4 rounded-xl border-2 transition-all text-left ${
              bookingMode === 'quick' 
              ? 'border-emerald-500 bg-emerald-50 shadow-md' 
              : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            <div className={`p-2 rounded-lg mb-3 ${bookingMode === 'quick' ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-500'}`}>
              <Zap size={20} />
            </div>
            <h3 className="font-bold text-slate-900">Quick Scan</h3>
            <p className="text-xs text-slate-500 mt-1">Not sure where to start? Get an AI diagnosis in 30 seconds.</p>
          </button>

          <button 
            onClick={() => setBookingMode('deep')}
            className={`flex flex-col items-start p-4 rounded-xl border-2 transition-all text-left ${
              bookingMode === 'deep' 
              ? 'border-violet-500 bg-violet-50 shadow-md' 
              : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            <div className={`p-2 rounded-lg mb-3 ${bookingMode === 'deep' ? 'bg-violet-500 text-white' : 'bg-slate-200 text-slate-500'}`}>
              <Layers size={20} />
            </div>
            <h3 className="font-bold text-slate-900">Deep Dive Audit</h3>
            <p className="text-xs text-slate-500 mt-1">Detailed analysis of specific marketing functions or ops.</p>
          </button>
        </div>

        {/* Dynamic Input Area */}
        <div className="flex flex-col md:flex-row items-end gap-4">
          
          {bookingMode === 'manual' && (
            <>
              <div className="flex-1 w-full">
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">From (Current Issue)</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
                  <select 
                    value={fromCity} onChange={e => setFromCity(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-cyan-500 outline-none"
                  >
                    <option value="">Select a Function/City</option>
                    {CITIES.map(c => <option key={c.name} value={c.name}>{c.function} ({c.name})</option>)}
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-center pb-3 text-slate-400">
                <ArrowRight />
              </div>

              <div className="flex-1 w-full">
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">To (Desired Goal)</label>
                <div className="relative">
                   <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
                   <select 
                    value={toCity} onChange={e => setToCity(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-cyan-500 outline-none"
                  >
                    <option value="">Select a Function/City</option>
                    {CITIES.map(c => <option key={c.name} value={c.name}>{c.function} ({c.name})</option>)}
                  </select>
                </div>
              </div>

              <div className="flex-1 w-full">
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Purpose</label>
                <div className="relative">
                   <Zap className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
                   <select 
                    value={purpose} onChange={e => setPurpose(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-cyan-500 outline-none"
                  >
                    <option value="">What is your goal?</option>
                    {PURPOSES.map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
              </div>
            </>
          )}

          {bookingMode === 'quick' && (
             <div className="flex-1 p-4 bg-emerald-50 border border-emerald-100 rounded-lg text-emerald-800 text-sm">
               <p className="flex items-center gap-2 font-medium"><Zap size={16} /> Ready for takeoff?</p>
               <p className="mt-1 opacity-80">We'll ask 10 targeted questions to identify your altitude and flight path. Ideal for first-time travelers.</p>
             </div>
          )}

          {bookingMode === 'deep' && (
             <div className="flex-1 p-4 bg-violet-50 border border-violet-100 rounded-lg text-violet-800 text-sm">
               <p className="flex items-center gap-2 font-medium"><Layers size={16} /> Tech Stack Audit</p>
               <p className="mt-1 opacity-80">Catalog your current tools, identify redundancies, and optimize your MarTech engine for fuel efficiency.</p>
             </div>
          )}

          <div className="w-full md:w-auto">
            <button 
              onClick={handleSearch}
              className={`w-full md:w-auto px-8 py-3 rounded-full font-bold text-white shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0 ${
                bookingMode === 'manual' ? 'bg-[#ff690f] hover:bg-[#e05a00] shadow-orange-500/30' : 
                bookingMode === 'quick' ? 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-500/30' :
                'bg-violet-600 hover:bg-violet-500 shadow-violet-500/30'
              }`}
            >
              {bookingMode === 'manual' ? 'Find My Route' : bookingMode === 'quick' ? 'Start Assessment' : 'Begin Audit'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};