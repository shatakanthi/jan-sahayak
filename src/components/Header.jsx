import React, { useState } from 'react';
import { Landmark, Search, MapPin, Globe, UserCog, Smartphone, Monitor, Key, Eye } from 'lucide-react';
import { LOCALITIES } from '../data/mockLocalityData';

export const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'te', name: 'తెలుగు (Telugu)' },
  { code: 'hi', name: 'हिंदी (Hindi)' },
  { code: 'ta', name: 'தமிழ் (Tamil)' },
  { code: 'kn', name: 'ಕನ್ನಡ (Kannada)' },
  { code: 'bn', name: 'বাংলা (Bengali)' },
  { code: 'mr', name: 'मराठी (Marathi)' }
];

export default function Header({ 
  currentLang, 
  onLangChange, 
  selectedLocality,
  onLocalityChange,
  onOpenApiKeyModal, 
  isMobileFrame, 
  onToggleMobileFrame,
  isAdminMode,
  onToggleAdminMode,
  activeTab = 'search',
  onTabChange,
  hasApiKey,
  t = (k) => k
}) {
  const [highContrast, setHighContrast] = useState(false);

  const safeTabChange = (tab) => {
    if (onTabChange) onTabChange(tab);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#102A43] text-white shadow-md border-b border-[#1F2933]">
      
      {/* 1. TOPMOST THIN STRIP - GOVERNMENT IDENTITY */}
      <div className="bg-[#0B1D2D] text-slate-300 px-4 py-1.5 text-[11px] font-medium border-b border-[#1A3652]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="font-semibold text-slate-200">Government of India</span>
            <span className="text-slate-500">|</span>
            <span>National Citizen Services Portal</span>
          </div>

          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setHighContrast(!highContrast)} 
              className="hover:text-amber-400 transition flex items-center space-x-1"
            >
              <Eye className="w-3 h-3 text-amber-400" />
              <span>Accessibility</span>
            </button>
            <span className="text-slate-500">|</span>
            <span className="text-emerald-400 font-medium">✓ Official Verified Portal</span>
          </div>
        </div>
      </div>

      {/* 2. MAIN INSTITUTIONAL NAVIGATION */}
      <div className="max-w-7xl mx-auto px-4 py-3.5 flex items-center justify-between gap-4">
        
        {/* Brand Identity */}
        <div 
          onClick={() => safeTabChange('search')}
          className="flex items-center space-x-3 cursor-pointer shrink-0"
        >
          <div className="w-10 h-10 rounded-md bg-[#D97706] flex items-center justify-center text-white font-bold shadow-sm">
            <Landmark className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="font-bold text-lg text-white tracking-tight leading-none font-editorial">
                Jan Sahayak
              </h1>
              <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-[#167D5A]/20 text-[#22C55E] border border-[#167D5A]/30">
                SevaSetu
              </span>
            </div>
            <p className="text-[11px] text-slate-300 font-sans mt-0.5">Civic Service Discovery Platform</p>
          </div>
        </div>

        {/* Quiet Navigation Tabs */}
        <nav className="hidden lg:flex items-center space-x-6 text-xs font-medium text-slate-200">
          <button
            onClick={() => safeTabChange('search')}
            className={`transition py-1 border-b-2 ${activeTab === 'search' ? 'text-amber-400 font-bold border-amber-500' : 'border-transparent hover:text-white'}`}
          >
            Gov Schemes
          </button>
          <button
            onClick={() => safeTabChange('wizard')}
            className={`transition py-1 border-b-2 ${activeTab === 'wizard' ? 'text-amber-400 font-bold border-amber-500' : 'border-transparent hover:text-white'}`}
          >
            Find Schemes for Me
          </button>
          <button
            onClick={() => safeTabChange('life-events')}
            className={`transition py-1 border-b-2 ${activeTab === 'life-events' ? 'text-amber-400 font-bold border-amber-500' : 'border-transparent hover:text-white'}`}
          >
            Life Events
          </button>
          <button
            onClick={() => safeTabChange('dashboard')}
            className={`transition py-1 border-b-2 ${activeTab === 'dashboard' ? 'text-amber-400 font-bold border-amber-500' : 'border-transparent hover:text-white'}`}
          >
            Track Application
          </button>
          <button
            onClick={() => safeTabChange('obstacle')}
            className={`transition py-1 border-b-2 ${activeTab === 'obstacle' ? 'text-amber-400 font-bold border-amber-500' : 'border-transparent hover:text-white'}`}
          >
            Obstacle AI Bot
          </button>
        </nav>

        {/* Right Controls */}
        <div className="flex items-center space-x-2 shrink-0">
          
          {/* Locality Selector */}
          <div className="relative flex items-center">
            <MapPin className="w-3.5 h-3.5 text-amber-400 absolute left-2.5 pointer-events-none" />
            <select
              value={selectedLocality}
              onChange={(e) => onLocalityChange && onLocalityChange(e.target.value)}
              className="bg-[#0B1D2D] border border-slate-700 text-slate-100 text-xs rounded-md pl-8 pr-2 py-1.5 focus:outline-none focus:border-amber-500 cursor-pointer max-w-[130px] sm:max-w-[170px] truncate"
            >
              {LOCALITIES.map((loc) => (
                <option key={loc.id} value={loc.id}>{loc.name}</option>
              ))}
            </select>
          </div>

          {/* Multilingual Selector */}
          <div className="relative flex items-center">
            <Globe className="w-3.5 h-3.5 text-amber-400 absolute left-2.5 pointer-events-none" />
            <select
              value={currentLang}
              onChange={(e) => onLangChange && onLangChange(e.target.value)}
              className="bg-[#0B1D2D] border border-slate-700 text-slate-100 text-xs rounded-md pl-8 pr-2 py-1.5 focus:outline-none focus:border-amber-500 cursor-pointer font-medium"
            >
              {LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>

          {/* Admin Panel Toggle */}
          <button
            onClick={onToggleAdminMode}
            className={`px-2.5 py-1.5 rounded-md text-xs font-semibold flex items-center space-x-1 transition border ${
              isAdminMode
                ? 'bg-amber-600 text-white border-amber-500'
                : 'bg-[#0B1D2D] hover:bg-slate-800 text-slate-300 border-slate-700'
            }`}
          >
            <UserCog className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Admin</span>
          </button>

          {/* Mobile Frame Preview Toggle */}
          <button
            onClick={onToggleMobileFrame}
            className="p-1.5 rounded-md bg-[#0B1D2D] text-slate-300 border border-slate-700 hover:text-white transition"
          >
            {isMobileFrame ? <Monitor className="w-4 h-4 text-amber-400" /> : <Smartphone className="w-4 h-4 text-emerald-400" />}
          </button>

          {/* Primary CTA: Find My Schemes */}
          <button
            onClick={() => safeTabChange('wizard')}
            className="px-3.5 py-1.5 bg-[#D97706] hover:bg-[#B45309] text-white text-xs font-semibold rounded-md transition shadow-sm shrink-0 hidden sm:inline-block"
          >
            Find My Schemes
          </button>

        </div>

      </div>
    </header>
  );
}
