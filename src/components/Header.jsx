import React from 'react';
import UserSubstackDropdown from './UserSubstackDropdown';
import logoImg from '../assets/logo.jpg';
import { Eye, ShieldCheck } from 'lucide-react';

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
  onOpenLogin,
  onOpenDigiLocker,
  isDigiLockerVerified,
  userSession,
  t = (k) => k
}) {
  const safeTabChange = (tab) => {
    if (onTabChange) onTabChange(tab);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0F4C81] text-white shadow-md border-b border-[#0B2545]">
      
      {/* 1. TOPMOST INSTITUTIONAL STRIP */}
      <div className="bg-[#0B2545] text-slate-300 px-4 py-1.5 text-[11px] font-medium border-b border-slate-700/80">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="font-semibold text-white">Government of India</span>
            <span className="text-slate-500">|</span>
            <span>National Citizen Services Portal</span>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-emerald-400 font-semibold flex items-center space-x-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Official Verified Portal</span>
            </span>
          </div>
        </div>
      </div>

      {/* 2. MAIN HEADER WITH LOGO IMAGE & USER SUBSTACK DROPDOWN */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        
        {/* Logo Image & Branding */}
        <div 
          onClick={() => safeTabChange('search')}
          className="flex items-center space-x-3 cursor-pointer shrink-0"
        >
          <img 
            src={logoImg} 
            alt="Jan Sahayak Logo" 
            className="w-10 h-10 rounded-lg object-contain bg-white p-0.5 shadow-sm border border-amber-400" 
          />
          <div>
            <h1 className="font-extrabold text-lg sm:text-xl text-white tracking-tight leading-none">
              JAN <span className="text-[#EA580C]">SAHAYAK</span>
            </h1>
            <p className="text-[10px] text-amber-300 font-semibold tracking-wider uppercase mt-0.5">HELPING THE PEOPLE</p>
          </div>
        </div>

        {/* Quiet Top Navigation Links (Terminology: Services) */}
        <nav className="hidden lg:flex items-center space-x-6 text-xs font-semibold text-slate-200">
          <button
            onClick={() => safeTabChange('search')}
            className={`transition py-1 border-b-2 ${activeTab === 'search' ? 'text-amber-400 font-bold border-amber-400' : 'border-transparent hover:text-white'}`}
          >
            Government Services
          </button>
          <button
            onClick={() => safeTabChange('wizard')}
            className={`transition py-1 border-b-2 ${activeTab === 'wizard' ? 'text-amber-400 font-bold border-amber-400' : 'border-transparent hover:text-white'}`}
          >
            Find Services for Me
          </button>
          <button
            onClick={() => safeTabChange('life-events')}
            className={`transition py-1 border-b-2 ${activeTab === 'life-events' ? 'text-amber-400 font-bold border-amber-400' : 'border-transparent hover:text-white'}`}
          >
            Life Events
          </button>
          <button
            onClick={() => safeTabChange('dashboard')}
            className={`transition py-1 border-b-2 ${activeTab === 'dashboard' ? 'text-amber-400 font-bold border-amber-400' : 'border-transparent hover:text-white'}`}
          >
            Citizen Dashboard
          </button>
          <button
            onClick={() => safeTabChange('obstacle')}
            className={`transition py-1 border-b-2 ${activeTab === 'obstacle' ? 'text-amber-400 font-bold border-amber-400' : 'border-transparent hover:text-white'}`}
          >
            Obstacle AI Bot
          </button>
        </nav>

        {/* Right Corner: AMAZON-STYLE SINGLE USER SUBSTACK DROPDOWN */}
        <div className="flex items-center space-x-2 shrink-0">
          <UserSubstackDropdown
            userSession={userSession}
            onOpenLogin={onOpenLogin}
            onOpenDigiLocker={onOpenDigiLocker}
            selectedLocality={selectedLocality}
            onLocalityChange={onLocalityChange}
            currentLang={currentLang}
            onLangChange={onLangChange}
            isAdminMode={isAdminMode}
            onToggleAdminMode={onToggleAdminMode}
            isMobileFrame={isMobileFrame}
            onToggleMobileFrame={onToggleMobileFrame}
            onOpenApiKeyModal={onOpenApiKeyModal}
            hasApiKey={hasApiKey}
            t={t}
          />
        </div>

      </div>
    </header>
  );
}
