import React from 'react';
import { Landmark, MapPin, UserCog, Smartphone, Monitor, Globe, Key } from 'lucide-react';
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
  const safeTabChange = (tab) => {
    if (onTabChange) onTabChange(tab);
  };

  return (
    <header className="sticky top-0 z-30 bg-[#0b192c] text-white border-b border-slate-800/80 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        
        {/* Brand Logo matching Template Screenshot */}
        <div 
          onClick={() => safeTabChange('search')}
          className="flex items-center space-x-3 cursor-pointer shrink-0"
        >
          <div className="w-10 h-10 rounded-xl bg-amber-600 flex items-center justify-center text-white shadow-md shadow-amber-600/30">
            <Landmark className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-extrabold text-lg sm:text-xl text-white tracking-tight leading-none">
              Jan Sahayak <span className="text-amber-500 text-xs font-semibold px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">SevaSetu</span>
            </h1>
            <p className="text-[10px] text-slate-300 font-medium">Citizen Service Navigator</p>
          </div>
        </div>

        {/* Top Center Navigation Links */}
        <nav className="hidden md:flex items-center space-x-6 text-xs font-medium text-slate-300">
          <button
            onClick={() => safeTabChange('search')}
            className={`hover:text-amber-400 transition ${activeTab === 'search' ? 'text-amber-400 font-bold border-b-2 border-amber-500 pb-0.5' : ''}`}
          >
            All Services
          </button>
          <button
            onClick={() => safeTabChange('life-events')}
            className={`hover:text-amber-400 transition ${activeTab === 'life-events' ? 'text-amber-400 font-bold border-b-2 border-amber-500 pb-0.5' : ''}`}
          >
            Life Events
          </button>
          <button
            onClick={() => safeTabChange('dashboard')}
            className={`hover:text-amber-400 transition ${activeTab === 'dashboard' ? 'text-amber-400 font-bold border-b-2 border-amber-500 pb-0.5' : ''}`}
          >
            Citizen Dashboard
          </button>
          <button
            onClick={() => safeTabChange('obstacle')}
            className={`hover:text-amber-400 transition ${activeTab === 'obstacle' ? 'text-amber-400 font-bold border-b-2 border-amber-500 pb-0.5' : ''}`}
          >
            Obstacle AI Bot
          </button>
        </nav>

        {/* Right Controls: Locality, Language, Admin & Frame */}
        <div className="flex items-center space-x-2 shrink-0">
          
          {/* Locality Selector Dropdown */}
          <div className="relative flex items-center">
            <MapPin className="w-3.5 h-3.5 text-amber-400 absolute left-2.5 pointer-events-none" />
            <select
              value={selectedLocality}
              onChange={(e) => onLocalityChange && onLocalityChange(e.target.value)}
              className="bg-slate-900 border border-slate-700 text-slate-100 text-xs rounded-xl pl-8 pr-2 py-1.5 focus:outline-none focus:border-amber-500 cursor-pointer font-medium max-w-[130px] sm:max-w-[170px] truncate"
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
              className="bg-slate-900 border border-slate-700 text-slate-100 text-xs rounded-xl pl-8 pr-2 py-1.5 focus:outline-none focus:border-amber-500 cursor-pointer font-medium"
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
            className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-1 transition border ${
              isAdminMode
                ? 'bg-amber-600 text-slate-950 border-amber-500'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
            }`}
          >
            <UserCog className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Admin</span>
          </button>

          {/* Mobile Frame Toggle */}
          <button
            onClick={onToggleMobileFrame}
            className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
          >
            {isMobileFrame ? <Monitor className="w-4 h-4 text-amber-400" /> : <Smartphone className="w-4 h-4 text-emerald-400" />}
          </button>

          {/* API Key Modal Button */}
          <button
            onClick={onOpenApiKeyModal}
            className={`p-1.5 rounded-xl border transition ${
              hasApiKey ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' : 'bg-slate-800 text-slate-300 border-slate-700'
            }`}
          >
            <Key className="w-3.5 h-3.5" />
          </button>

        </div>

      </div>
    </header>
  );
}
