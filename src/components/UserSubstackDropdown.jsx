import React, { useState, useRef, useEffect } from 'react';
import { User, Lock, MapPin, Globe, UserCog, Smartphone, Monitor, Key, ChevronDown, CheckCircle2, FileText, Download } from 'lucide-react';
import { LOCALITIES } from '../data/mockLocalityData';
import { LANGUAGES } from '../data/translations';

export default function UserSubstackDropdown({
  userSession = {},
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
  t = (k) => k
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
        className="flex items-center space-x-2 bg-[#243545] hover:bg-[#243545]/80 px-3 py-1.5 rounded-lg border border-[#e8ab16]/60 transition shadow-sm"
      >
        <div className="w-7 h-7 rounded-full bg-[#e8ab16] text-[#383b3d] flex items-center justify-center font-bold text-xs">
          <User className="w-3.5 h-3.5 text-[#324a60]" />
        </div>

        <div className="text-left hidden sm:block leading-tight">
          <div className="text-[10px] text-slate-200 font-normal">Hello, {userSession?.name || 'Citizen'}</div>
          <div className="text-xs font-bold text-white flex items-center space-x-1">
            <span>{t('userSubstack') || 'User Account & Settings'}</span>
            <ChevronDown className={`w-3 h-3 text-[#e8ab16] transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </div>
        </div>

        <span className="sm:hidden text-xs font-bold text-[#e8ab16]">User ▾</span>
      </button>

      {/* Dropdown Menu Substack */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-white border border-[#896e6a] rounded-xl shadow-2xl z-50 text-[#383b3d] p-3 space-y-3 animate-editorial-reveal">
          
          {/* User Profile Header */}
          <div className="p-3 bg-[#F8F9FA] rounded-lg border border-[#896e6a] space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#324a60]">{userSession?.name || 'Registered Citizen'}</span>
              <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-[#74744a]/10 text-[#74744a] border border-[#74744a]/30">
                🔒 {userSession?.isDigiLockerVerified ? 'DigiLocker Verified' : 'Standard Profile'}
              </span>
            </div>
            <p className="text-[11px] text-[#896e6a]">{userSession?.email || 'citizen@portal.in'}</p>
            <div className="text-[10px] text-[#324a60] font-mono pt-1">
              Aadhaar: {userSession?.aadhaarNo || 'Not Provided'} {userSession?.age ? `(Age: ${userSession.age})` : ''}
            </div>

            <button
              onClick={() => { setIsOpen(false); onOpenLogin(); }}
              className="w-full mt-2 py-1.5 bg-[#e8ab16] hover:bg-[#d19910] text-[#383b3d] text-[11px] font-bold rounded transition shadow"
            >
              Edit Profile & User Information
            </button>
          </div>

          <div className="border-t border-[#896e6a]/40 pt-2 space-y-2 text-xs">
            
            {/* 1. DigiLocker Shortcut */}
            <div 
              onClick={() => { setIsOpen(false); onOpenDigiLocker(); }}
              className="p-2 rounded-lg hover:bg-[#F8F9FA] cursor-pointer flex items-center justify-between"
            >
              <div className="flex items-center space-x-2">
                <Lock className="w-4 h-4 text-[#74744a]" />
                <div>
                  <div className="font-bold text-[#324a60]">{t('digiLockerBtn') || 'Authenticate with DigiLocker 🔒'}</div>
                  <div className="text-[10px] text-[#896e6a]">Fetch verified Aadhaar & certificates</div>
                </div>
              </div>
              <span className="text-[10px] text-[#e8ab16] font-bold">Connect →</span>
            </div>

            {/* 2. Select Your Area / Locality */}
            <div className="p-2 rounded-lg bg-[#F8F9FA] space-y-1">
              <label className="text-[10px] font-bold text-[#324a60] uppercase tracking-wider flex items-center space-x-1">
                <MapPin className="w-3.5 h-3.5 text-[#e8ab16]" />
                <span>Select Your Area / Locality:</span>
              </label>
              <select
                value={selectedLocality}
                onChange={(e) => onLocalityChange(e.target.value)}
                className="w-full bg-white border border-[#896e6a] text-xs rounded p-1.5 text-[#324a60] font-medium"
              >
                {LOCALITIES.map((loc) => (
                  <option key={loc.id} value={loc.id}>{loc.name}</option>
                ))}
              </select>
            </div>

            {/* 3. Select Your Language */}
            <div className="p-2 rounded-lg bg-[#F8F9FA] space-y-1">
              <label className="text-[10px] font-bold text-[#324a60] uppercase tracking-wider flex items-center space-x-1">
                <Globe className="w-3.5 h-3.5 text-[#e8ab16]" />
                <span>Select Your Language:</span>
              </label>
              <select
                value={currentLang}
                onChange={(e) => onLangChange(e.target.value)}
                className="w-full bg-white border border-[#896e6a] text-xs rounded p-1.5 text-[#324a60] font-bold"
              >
                {LANGUAGES.map((lang) => (
                  <option key={lang.code} value={lang.code}>{lang.name}</option>
                ))}
              </select>
            </div>

            {/* 4. Government Admin Portal */}
            <div 
              onClick={() => { setIsOpen(false); onToggleAdminMode(); }}
              className="p-2 rounded-lg hover:bg-[#F8F9FA] cursor-pointer flex items-center justify-between"
            >
              <div className="flex items-center space-x-2">
                <UserCog className="w-4 h-4 text-[#e8ab16]" />
                <span className="font-bold text-[#324a60]">Government Admin Portal</span>
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${isAdminMode ? 'bg-[#e8ab16] text-[#383b3d]' : 'bg-[#896e6a]/20 text-[#324a60]'}`}>
                {isAdminMode ? 'ACTIVE' : 'OPEN'}
              </span>
            </div>

            {/* 5. Mobile Frame Toggle & API Key */}
            <div className="flex items-center justify-between pt-1 border-t border-[#896e6a]/40">
              <button
                onClick={onToggleMobileFrame}
                className="text-[11px] font-semibold text-[#324a60] hover:underline flex items-center space-x-1"
              >
                {isMobileFrame ? <Monitor className="w-3.5 h-3.5 text-[#e8ab16]" /> : <Smartphone className="w-3.5 h-3.5 text-[#e8ab16]" />}
                <span>{isMobileFrame ? 'Full View' : 'Mobile Frame'}</span>
              </button>

              <button
                onClick={() => { setIsOpen(false); onOpenApiKeyModal(); }}
                className="text-[11px] font-semibold text-[#324a60] hover:underline flex items-center space-x-1"
              >
                <Key className="w-3.5 h-3.5 text-[#e8ab16]" />
                <span>{hasApiKey ? 'Gemini Active' : 'API Key'}</span>
              </button>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}
