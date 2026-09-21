import React, { useState, useRef, useEffect } from 'react';
import { User, Lock, MapPin, Globe, UserCog, Smartphone, Monitor, Key, ChevronDown, CheckCircle2, FileText, Download } from 'lucide-react';
import { LOCALITIES } from '../data/mockLocalityData';
import { LANGUAGES } from '../data/translations';

export default function UserSubstackDropdown({
  userSession,
  onOpenLogin,
  onOpenDigiLocker,
  selectedLocality,
  onLocalityChange,
  currentLang,
  onLangChange,
  isAdminMode,
  onToggleAdminMode,
  isMobileFrame,
  onToggleMobileFrame,
  onOpenApiKeyModal,
  hasApiKey,
  t
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      
      {/* Amazon-Style Main User Substack Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-3 py-1.5 bg-[#0B2545] hover:bg-[#0F4C81] text-white border border-slate-700 hover:border-[#EA580C] rounded-lg text-xs font-semibold flex items-center space-x-2 transition shadow-sm"
      >
        <div className="w-6 h-6 rounded-full bg-[#EA580C] text-white flex items-center justify-center font-bold text-xs">
          <User className="w-3.5 h-3.5" />
        </div>

        <div className="text-left hidden sm:block leading-tight">
          <div className="text-[10px] text-slate-300 font-normal">Hello, {userSession.name || 'Citizen'}</div>
          <div className="text-xs font-bold text-white flex items-center space-x-1">
            <span>User Account & Settings</span>
            <ChevronDown className={`w-3 h-3 text-amber-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </div>
        </div>

        <span className="sm:hidden text-xs font-bold text-amber-400">User ▾</span>
      </button>

      {/* Dropdown Menu Substack */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-white border border-[#E2E8F0] rounded-xl shadow-2xl z-50 text-[#0B2545] p-3 space-y-3 animate-editorial-reveal">
          
          {/* User Profile Header */}
          <div className="p-3 bg-[#F8FAFC] rounded-lg border border-[#E2E8F0] space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#0F4C81]">{userSession.name || 'Rajesh Kumar'}</span>
              <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-[#059669]/10 text-[#059669] border border-[#059669]/30">
                🔒 DigiLocker Verified
              </span>
            </div>
            <p className="text-[11px] text-[#64748B]">{userSession.email || 'rajesh.kumar@citizen.in'}</p>
            <div className="text-[10px] text-[#0B2545] font-mono pt-1">Aadhaar: 9918-2049-8812 (Age: 42)</div>

            <button
              onClick={() => { setIsOpen(false); onOpenLogin(); }}
              className="w-full mt-2 py-1.5 bg-[#0F4C81] text-white text-[11px] font-bold rounded hover:bg-[#0B2545] transition"
            >
              Manage Profile & Details
            </button>
          </div>

          <div className="border-t border-[#E2E8F0] pt-2 space-y-2 text-xs">
            
            {/* 1. DigiLocker Shortcut (Topic Kept Right Here!) */}
            <div 
              onClick={() => { setIsOpen(false); onOpenDigiLocker(); }}
              className="p-2 rounded-lg hover:bg-slate-50 cursor-pointer flex items-center justify-between"
            >
              <div className="flex items-center space-x-2">
                <Lock className="w-4 h-4 text-[#059669]" />
                <div>
                  <div className="font-bold text-[#0B2545]">Authenticate with DigiLocker 🔒</div>
                  <div className="text-[10px] text-[#64748B]">Fetch verified Aadhaar & certificates</div>
                </div>
              </div>
              <span className="text-[10px] text-[#059669] font-bold">Connect →</span>
            </div>

            {/* 2. Select Your Area / Locality */}
            <div className="p-2 rounded-lg bg-slate-50 space-y-1">
              <label className="text-[10px] font-bold text-[#0F4C81] uppercase tracking-wider flex items-center space-x-1">
                <MapPin className="w-3.5 h-3.5 text-[#EA580C]" />
                <span>Select Your Area / Locality:</span>
              </label>
              <select
                value={selectedLocality}
                onChange={(e) => onLocalityChange(e.target.value)}
                className="w-full bg-white border border-[#E2E8F0] text-xs rounded p-1.5 text-[#0B2545] font-medium"
              >
                {LOCALITIES.map((loc) => (
                  <option key={loc.id} value={loc.id}>{loc.name}</option>
                ))}
              </select>
            </div>

            {/* 3. Select Your Language */}
            <div className="p-2 rounded-lg bg-slate-50 space-y-1">
              <label className="text-[10px] font-bold text-[#0F4C81] uppercase tracking-wider flex items-center space-x-1">
                <Globe className="w-3.5 h-3.5 text-[#0F4C81]" />
                <span>Select Your Language:</span>
              </label>
              <select
                value={currentLang}
                onChange={(e) => onLangChange(e.target.value)}
                className="w-full bg-white border border-[#E2E8F0] text-xs rounded p-1.5 text-[#0B2545] font-medium"
              >
                {LANGUAGES.map((lang) => (
                  <option key={lang.code} value={lang.code}>{lang.name}</option>
                ))}
              </select>
            </div>

            {/* 4. Government Admin Portal */}
            <div 
              onClick={() => { setIsOpen(false); onToggleAdminMode(); }}
              className="p-2 rounded-lg hover:bg-slate-50 cursor-pointer flex items-center justify-between"
            >
              <div className="flex items-center space-x-2">
                <UserCog className="w-4 h-4 text-[#EA580C]" />
                <span className="font-bold text-[#0B2545]">Government Admin Portal</span>
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${isAdminMode ? 'bg-[#EA580C] text-white' : 'bg-slate-200 text-slate-700'}`}>
                {isAdminMode ? 'ACTIVE' : 'OPEN'}
              </span>
            </div>

            {/* 5. Mobile Frame Toggle & API Key */}
            <div className="flex items-center justify-between pt-1 border-t border-[#E2E8F0]">
              <button
                onClick={onToggleMobileFrame}
                className="text-[11px] font-semibold text-[#0F4C81] hover:underline flex items-center space-x-1"
              >
                {isMobileFrame ? <Monitor className="w-3.5 h-3.5" /> : <Smartphone className="w-3.5 h-3.5" />}
                <span>{isMobileFrame ? 'Full View' : 'Mobile Frame'}</span>
              </button>

              <button
                onClick={() => { setIsOpen(false); onOpenApiKeyModal(); }}
                className="text-[11px] font-semibold text-[#0F4C81] hover:underline flex items-center space-x-1"
              >
                <Key className="w-3.5 h-3.5 text-[#EA580C]" />
                <span>{hasApiKey ? 'Gemini Active' : 'API Key'}</span>
              </button>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}
