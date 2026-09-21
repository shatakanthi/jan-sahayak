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
        className="flex items-center space-x-2 bg-[#115E57] hover:bg-[#115E57]/80 px-3 py-1.5 rounded-lg border border-[#B7BDA9]/60 transition shadow-sm"
      >
        <div className="w-7 h-7 rounded-full bg-[#148B4B] text-white flex items-center justify-center font-bold text-xs">
          <User className="w-3.5 h-3.5" />
        </div>

        <div className="text-left hidden sm:block leading-tight">
          <div className="text-[10px] text-slate-200 font-normal">Hello, {userSession?.name || 'Citizen'}</div>
          <div className="text-xs font-bold text-white flex items-center space-x-1">
            <span>User Account & Settings</span>
            <ChevronDown className={`w-3 h-3 text-[#B7BDA9] transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </div>
        </div>

        <span className="sm:hidden text-xs font-bold text-[#B7BDA9]">User ▾</span>
      </button>

      {/* Dropdown Menu Substack */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-white border border-[#B7BDA9] rounded-xl shadow-2xl z-50 text-[#16796F] p-3 space-y-3 animate-editorial-reveal">
          
          {/* User Profile Header */}
          <div className="p-3 bg-[#F4F6F3] rounded-lg border border-[#B7BDA9] space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#16796F]">{userSession?.name || 'Rajesh Kumar'}</span>
              <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-[#148B4B]/10 text-[#148B4B] border border-[#148B4B]/30">
                🔒 DigiLocker Verified
              </span>
            </div>
            <p className="text-[11px] text-[#599D9C]">{userSession?.email || 'rajesh.kumar@citizen.in'}</p>
            <div className="text-[10px] text-[#16796F] font-mono pt-1">Aadhaar: 9918-2049-8812 (Age: 42)</div>

            <button
              onClick={() => { setIsOpen(false); onOpenLogin(); }}
              className="w-full mt-2 py-1.5 bg-[#16796F] text-white text-[11px] font-bold rounded hover:bg-[#148B4B] transition"
            >
              Manage Profile & Details
            </button>
          </div>

          <div className="border-t border-[#B7BDA9] pt-2 space-y-2 text-xs">
            
            {/* 1. DigiLocker Shortcut (Topic Kept Right Here!) */}
            <div 
              onClick={() => { setIsOpen(false); onOpenDigiLocker(); }}
              className="p-2 rounded-lg hover:bg-[#F4F6F3] cursor-pointer flex items-center justify-between"
            >
              <div className="flex items-center space-x-2">
                <Lock className="w-4 h-4 text-[#148B4B]" />
                <div>
                  <div className="font-bold text-[#16796F]">Authenticate with DigiLocker 🔒</div>
                  <div className="text-[10px] text-[#599D9C]">Fetch verified Aadhaar & certificates</div>
                </div>
              </div>
              <span className="text-[10px] text-[#148B4B] font-bold">Connect →</span>
            </div>

            {/* 2. Select Your Area / Locality */}
            <div className="p-2 rounded-lg bg-[#F4F6F3] space-y-1">
              <label className="text-[10px] font-bold text-[#16796F] uppercase tracking-wider flex items-center space-x-1">
                <MapPin className="w-3.5 h-3.5 text-[#148B4B]" />
                <span>Select Your Area / Locality:</span>
              </label>
              <select
                value={selectedLocality}
                onChange={(e) => onLocalityChange(e.target.value)}
                className="w-full bg-white border border-[#B7BDA9] text-xs rounded p-1.5 text-[#16796F] font-medium"
              >
                {LOCALITIES.map((loc) => (
                  <option key={loc.id} value={loc.id}>{loc.name}</option>
                ))}
              </select>
            </div>

            {/* 3. Select Your Language */}
            <div className="p-2 rounded-lg bg-[#F4F6F3] space-y-1">
              <label className="text-[10px] font-bold text-[#16796F] uppercase tracking-wider flex items-center space-x-1">
                <Globe className="w-3.5 h-3.5 text-[#599D9C]" />
                <span>Select Your Language:</span>
              </label>
              <select
                value={currentLang}
                onChange={(e) => onLangChange(e.target.value)}
                className="w-full bg-white border border-[#B7BDA9] text-xs rounded p-1.5 text-[#16796F] font-medium"
              >
                {LANGUAGES.map((lang) => (
                  <option key={lang.code} value={lang.code}>{lang.name}</option>
                ))}
              </select>
            </div>

            {/* 4. Government Admin Portal */}
            <div 
              onClick={() => { setIsOpen(false); onToggleAdminMode(); }}
              className="p-2 rounded-lg hover:bg-[#F4F6F3] cursor-pointer flex items-center justify-between"
            >
              <div className="flex items-center space-x-2">
                <UserCog className="w-4 h-4 text-[#148B4B]" />
                <span className="font-bold text-[#16796F]">Government Admin Portal</span>
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${isAdminMode ? 'bg-[#148B4B] text-white' : 'bg-[#B7BDA9]/40 text-[#16796F]'}`}>
                {isAdminMode ? 'ACTIVE' : 'OPEN'}
              </span>
            </div>

            {/* 5. Mobile Frame Toggle & API Key */}
            <div className="flex items-center justify-between pt-1 border-t border-[#B7BDA9]">
              <button
                onClick={onToggleMobileFrame}
                className="text-[11px] font-semibold text-[#16796F] hover:underline flex items-center space-x-1"
              >
                {isMobileFrame ? <Monitor className="w-3.5 h-3.5" /> : <Smartphone className="w-3.5 h-3.5" />}
                <span>{isMobileFrame ? 'Full View' : 'Mobile Frame'}</span>
              </button>

              <button
                onClick={() => { setIsOpen(false); onOpenApiKeyModal(); }}
                className="text-[11px] font-semibold text-[#16796F] hover:underline flex items-center space-x-1"
              >
                <Key className="w-3.5 h-3.5 text-[#148B4B]" />
                <span>{hasApiKey ? 'Gemini Active' : 'API Key'}</span>
              </button>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}
