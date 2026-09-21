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
    <header className="sticky top-0 z-40 bg-[#324a60] text-white shadow-md border-b border-[#896e6a]">
      
      {/* 1. TOPMOST INSTITUTIONAL STRIP */}
      <div className="bg-[#243545] text-slate-100 px-4 py-1.5 text-[11px] font-medium border-b border-[#896e6a]/40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="font-semibold text-white">Government of India</span>
            <span className="text-[#e8ab16]">|</span>
            <span>National Citizen Services Portal</span>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-[#e8ab16] font-semibold flex items-center space-x-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#e8ab16]" />
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
            className="w-10 h-10 rounded-lg object-contain bg-white p-0.5 shadow-sm border border-[#e8ab16]" 
          />
          <div>
            <h1 className="font-extrabold text-lg sm:text-xl text-white tracking-tight leading-none font-editorial">
              JAN <span className="text-[#e8ab16]">SAHAYAK</span>
            </h1>
            <p className="text-[10px] text-[#e8ab16] font-semibold tracking-wider uppercase mt-0.5">{t('appTagline') || 'HELPING THE PEOPLE'}</p>
          </div>
        </div>

        {/* Quiet Top Navigation Links (Terminology: Services & Multilingual support) */}
        <nav className="hidden lg:flex items-center space-x-6 text-xs font-semibold text-slate-100">
          <button
            onClick={() => safeTabChange('search')}
            className={`transition py-1 border-b-2 ${activeTab === 'search' ? 'text-[#e8ab16] font-bold border-[#e8ab16] bg-[#e8ab16]/10 px-2 rounded.t' : 'border-transparent hover:text-white'}`}
          >
            {t('problemTab') || 'Government Services'}
          </button>
          <button
            onClick={() => safeTabChange('wizard')}
            className={`transition py-1 border-b-2 ${activeTab === 'wizard' ? 'text-[#e8ab16] font-bold border-[#e8ab16] bg-[#e8ab16]/10 px-2 rounded-t' : 'border-transparent hover:text-white'}`}
          >
            {t('wizardTab') || 'Find Services for Me'}
          </button>
          <button
            onClick={() => safeTabChange('dashboard')}
            className={`transition py-1 border-b-2 ${activeTab === 'dashboard' ? 'text-[#e8ab16] font-bold border-[#e8ab16] bg-[#e8ab16]/10 px-2 rounded-t' : 'border-transparent hover:text-white'}`}
          >
            {t('dashboardTab') || 'Citizen Dashboard'}
          </button>
          <button
            onClick={() => safeTabChange('obstacle')}
            className={`transition py-1 border-b-2 ${activeTab === 'obstacle' ? 'text-[#e8ab16] font-bold border-[#e8ab16] bg-[#e8ab16]/10 px-2 rounded-t' : 'border-transparent hover:text-white'}`}
          >
            {t('obstacleTab') || 'Obstacle AI Bot'}
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
