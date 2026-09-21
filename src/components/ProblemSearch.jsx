import React, { useState, useRef } from 'react';
import { Mic, MicOff, Search, ArrowRight, ShieldCheck, FileText, ExternalLink, AlertCircle, RefreshCw, Home, CheckCircle2, Lock, Sparkles, Building2, UserCheck, ShieldAlert, GraduationCap, Heart, Briefcase, MapPin } from 'lucide-react';
import logoImg from '../assets/logo.jpg';
import { LOCALITIES } from '../data/mockLocalityData';
import { getLocalityPortal } from '../data/localityUrls';

export default function ProblemSearch({ 
  onSearch, 
  searchResults, 
  loading, 
  onSelectScheme, 
  onResolveObstacle,
  onSimulateApply,
  selectedLocality,
  t,
  onNavigateWizard,
  onNavigateLifeEvents,
  onOpenDigiLocker,
  isDigiLockerVerified
}) {
  const [query, setQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [appliedId, setAppliedId] = useState(null);
  const resultsRef = useRef(null);

  const activeLocalityObj = LOCALITIES.find(l => l.id === selectedLocality) || LOCALITIES[0];

  const categoryBlocks = [
    { name: 'Education Services', desc: 'Scholarships, fee waivers & education loans', count: '14 Services', icon: GraduationCap },
    { name: 'Healthcare Services', desc: 'Free hospital cover, OPD slots & Ayushman PM-JAY', count: '9 Services', icon: Heart },
    { name: 'Employment Services', desc: 'PMKVY skill certification & job portals', count: '18 Services', icon: Briefcase },
    { name: 'Housing & Utility Services', desc: 'Electricity, water meter transfer & connection', count: '12 Services', icon: Home },
    { name: 'Agriculture Services', desc: 'PM-KISAN direct income & Kisan credit cards', count: '15 Services', icon: Building2 },
    { name: 'Women & Child Services', desc: 'Pradhan Mantri Matru Vandana & savings', count: '11 Services', icon: ShieldCheck },
    { name: 'Senior Citizen Services', desc: 'IGNOAPS pension & elderly social assistance', count: '8 Services', icon: UserCheck },
    { name: 'Disability Assistance Services', desc: 'Swavlamban UDID card & free assistive aid', count: '7 Services', icon: ShieldAlert }
  ];

  const handleSearchSubmit = (e) => {
    e?.preventDefault();
    if (query.trim()) {
      onSearch(query);
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    }
  };

  const handleCategoryClick = (catName) => {
    setQuery(catName);
    onSearch(catName);
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  const toggleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      alert("Voice input is not supported in this browser. Please type your query.");
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-IN';

    if (isListening) {
      setIsListening(false);
      recognition.stop();
      return;
    }

    setIsListening(true);
    recognition.start();

    recognition.onresult = (event) => {
      const speechToText = event.results[0][0].transcript;
      setQuery(speechToText);
      setIsListening(false);
      onSearch(speechToText);
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    };

    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);
  };

  const handleDigiLockerAutoFillSubmit = (scheme) => {
    const generatedId = 'DIGI-APP-' + Math.floor(100000 + Math.random() * 900000);
    setAppliedId(generatedId);
    if (onSimulateApply) {
      onSimulateApply({
        appId: generatedId,
        serviceName: scheme.name,
        sector: scheme.sector || scheme.category,
        appliedDate: new Date().toISOString().split('T')[0],
        currentStage: 'DigiLocker Verification & Instant Approval',
        estimatedCompletion: 'Instant (Biometric Verified)',
        status: 'Approved'
      });
    }
    setTimeout(() => setAppliedId(null), 4000);
  };

  return (
    <div className="space-y-14 pb-20 text-[#383b3d]">
      
      {/* 1. HERO SECTION WITH OFFICIAL LOGO IMAGE */}
      <div className="bg-[#324a60] text-white p-8 sm:p-14 rounded-xl space-y-8 relative shadow-lg">
        
        <div className="max-w-3xl space-y-5">
          <div className="flex items-center space-x-3">
            <img src={logoImg} alt="Jan Sahayak Emblem" className="w-12 h-12 rounded-lg bg-white p-1 object-contain border-2 border-[#e8ab16]" />
            <div>
              <span className="text-xs font-bold text-[#e8ab16] tracking-widest uppercase">जन सहायक • JAN SHAYAK</span>
              <h3 className="text-sm font-semibold text-slate-200">{t('appTagline') || 'HELPING THE PEOPLE'}</h3>
            </div>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white font-editorial leading-tight">
            Discover the Services Available to You.
          </h2>

          <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-sans max-w-2xl">
            Explore government services, benefits and rights based on your needs, eligibility and location.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={onNavigateWizard}
              className="px-6 py-3 bg-[#e8ab16] hover:bg-[#d19910] text-[#383b3d] font-bold text-xs rounded-lg shadow transition flex items-center space-x-2"
            >
              <span>{t('wizardTab') || 'Find Services for Me'}</span>
              <ArrowRight className="w-4 h-4 text-[#383b3d]" />
            </button>

            <button
              onClick={onOpenDigiLocker}
              className="px-6 py-3 bg-[#243545] hover:bg-[#243545]/80 text-white border border-[#e8ab16]/40 font-bold text-xs rounded-lg transition flex items-center space-x-2"
            >
              <Lock className="w-4 h-4 text-[#e8ab16]" />
              <span>{t('digiLockerBtn') || 'Connect DigiLocker 🔒'}</span>
            </button>
          </div>
        </div>

        {/* Search Bar Input Form */}
        <form onSubmit={handleSearchSubmit} className="max-w-3xl">
          <div className="relative flex items-center bg-white rounded-lg p-2 shadow-lg border border-[#896e6a]">
            <Search className="w-5 h-5 text-[#896e6a] ml-3 shrink-0" />
            
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t('searchPlaceholder') || "Search government services, benefits, departments or utility transfers..."}
              className="w-full bg-transparent px-3 py-2 text-sm text-[#324a60] placeholder-[#896e6a] focus:outline-none font-medium"
            />

            <button
              type="button"
              onClick={toggleVoiceInput}
              title="Voice Input"
              className={`p-2 rounded-md transition-colors shrink-0 ${
                isListening ? 'bg-rose-500 text-white' : 'bg-[#F8F9FA] text-[#324a60] hover:bg-slate-200'
              }`}
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4 text-[#e8ab16]" />}
            </button>

            <button
              type="submit"
              disabled={loading}
              className="ml-2 px-6 py-2.5 bg-[#e8ab16] hover:bg-[#d19910] text-[#383b3d] font-bold text-xs rounded-lg flex items-center space-x-1.5 transition shrink-0 shadow"
            >
              {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <span>{t('navigateBtn') || 'Search Services'}</span>}
            </button>
          </div>
        </form>

        <div className="text-xs text-slate-200 pt-1 flex items-center justify-between border-t border-[#896e6a]/40 max-w-3xl">
          <span>Active Locality: <strong>{activeLocalityObj.name}</strong></span>
          <span className="text-[#e8ab16] font-bold">Grounded AI Search Enabled</span>
        </div>

      </div>

      {/* 2. CATEGORY SECTOR NAVIGATION WITH CLEAR SPACIOUS PADDING */}
      <div className="space-y-6 service-section">
        <div>
          <span className="text-[11px] font-bold text-[#e8ab16] uppercase tracking-widest">CATEGORIES</span>
          <h3 className="text-2xl font-bold text-[#324a60] font-editorial mt-0.5">What services are you looking for?</h3>
          <p className="text-xs text-[#896e6a]">Browse services grouped by category and life requirements.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {categoryBlocks.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <div 
                key={idx}
                onClick={() => handleCategoryClick(cat.name)}
                className="jan-card p-5 rounded-xl cursor-pointer space-y-3 bg-white border border-[#896e6a] hover:border-[#e8ab16] shadow-sm hover:shadow-md transition"
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-lg bg-[#324a60]/10 border border-[#324a60]/20 flex items-center justify-center text-[#324a60]">
                    <Icon className="w-5 h-5 text-[#324a60]" />
                  </div>
                  <span className="text-[10px] font-mono font-bold text-[#74744a] bg-[#74744a]/10 px-2 py-0.5 rounded border border-[#74744a]/20">{cat.count}</span>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-[#324a60] font-editorial">{cat.name}</h4>
                  <p className="text-xs text-[#896e6a] mt-0.5">{cat.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. SEARCH RESULTS DISPLAY (LARGE HORIZONTAL ROWS FOR SERVICES) */}
      <div ref={resultsRef}>
        {searchResults && (
          <div className="space-y-6 service-section animate-editorial-reveal">
            
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold text-[#74744a] uppercase tracking-wider">VERIFIED SERVICES CATALOGUE</span>
                <h3 className="text-2xl font-bold text-[#324a60] font-editorial mt-0.5">Government Services You May Be Eligible to Explore</h3>
              </div>
              <span className="text-xs px-3 py-1 rounded-full bg-[#324a60]/10 text-[#324a60] font-mono font-bold border border-[#324a60]/20">
                {searchResults.matchedSchemes?.length || 0} Services Found
              </span>
            </div>

            {appliedId && (
              <div className="p-4 bg-[#74744a]/10 border border-[#74744a]/30 text-[#74744a] text-xs font-bold rounded-lg flex items-center space-x-2 animate-editorial-reveal">
                <CheckCircle2 className="w-5 h-5 text-[#74744a]" />
                <span className="text-[#324a60]">DigiLocker 1-Click Service Application Submitted! Ref ID: {appliedId}</span>
              </div>
            )}

            {/* Horizontal Rows */}
            <div className="space-y-5">
              {searchResults.matchedSchemes?.map((scheme) => {
                const localityPortal = getLocalityPortal(scheme.sector || scheme.category, selectedLocality);

                return (
                  <div key={scheme.id} className="jan-card p-6 rounded-xl space-y-4 bg-white border border-[#896e6a]">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#324a60]/10 text-[#324a60] uppercase tracking-wider border border-[#324a60]/20">
                            {scheme.sector || scheme.category}
                          </span>
                          <span className="text-xs text-[#896e6a] font-medium">{scheme.department}</span>
                        </div>
                        <h4 className="text-lg font-bold text-[#324a60] font-editorial">{scheme.name}</h4>
                      </div>

                      <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#74744a]/10 text-[#74744a] border border-[#74744a]/30 self-start md:self-auto">
                        ● 100% Eligible
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-[#383b3d] leading-relaxed">
                      {scheme.shortDescription || scheme.description}
                    </p>

                    <div className="flex flex-wrap gap-4 text-xs text-[#896e6a] pt-2 border-t border-[#896e6a]/30">
                      <div>Official Source: <strong className="text-[#383b3d]">{scheme.verifiedSource || 'Government Portal'}</strong></div>
                      <div>Data Owner: <strong className="text-[#383b3d]">{scheme.dataOwner || 'Department'}</strong></div>
                      <div>Last Verified: <strong className="text-[#383b3d]">{scheme.lastVerified || '2026-09-20'}</strong></div>
                    </div>

                    {scheme.potentialObstacle && (
                      <div className="p-3 bg-[#e8ab16]/10 border border-[#e8ab16]/30 rounded-lg flex items-center justify-between text-xs">
                        <div className="flex items-center space-x-2 text-[#383b3d]">
                          <AlertCircle className="w-4 h-4 text-[#e8ab16] shrink-0" />
                          <span>Missing document? <strong>{scheme.potentialObstacle}</strong></span>
                        </div>
                        <button
                          onClick={() => onResolveObstacle(scheme.potentialObstacle)}
                          className="px-3 py-1 bg-[#e8ab16] hover:bg-[#d19910] text-[#383b3d] font-bold text-xs rounded-md transition shadow"
                        >
                          Solve Obstacle
                        </button>
                      </div>
                    )}

                    <div className="flex flex-wrap items-center justify-between gap-2 pt-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <button
                          onClick={() => onSelectScheme(scheme)}
                          className="px-4 py-2 bg-[#324a60] hover:bg-[#243545] text-white text-xs font-bold rounded-lg transition shadow"
                        >
                          View Service Details
                        </button>

                        <button
                          onClick={() => handleDigiLockerAutoFillSubmit(scheme)}
                          className="px-4 py-2 bg-[#74744a] hover:bg-[#5a5a3a] text-white text-xs font-bold rounded-lg transition flex items-center space-x-1 shadow-sm"
                        >
                          <Sparkles className="w-3.5 h-3.5 text-[#e8ab16]" />
                          <span>DigiLocker 1-Click Auto-Fill & Apply</span>
                        </button>
                      </div>

                      <a
                        href={localityPortal.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3.5 py-2 bg-[#F8F9FA] border border-[#896e6a] text-[#324a60] text-xs font-bold rounded-lg hover:bg-slate-200 transition flex items-center space-x-1"
                      >
                        <span>{localityPortal.name}</span>
                        <ExternalLink className="w-3.5 h-3.5 text-[#896e6a]" />
                      </a>
                    </div>

                  </div>
                );
              })}
            </div>

          </div>
        )}
      </div>

      {/* 4. CLEAN MINIMAL MOBILE-OPTIMIZED FOOTER (NO BLOATED TOPIC LISTS) */}
      <footer className="bg-[#324a60] text-white rounded-xl p-6 sm:p-8 space-y-4 mt-12 shadow-lg border border-[#896e6a]">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#896e6a]/40 pb-4">
          <div className="flex items-center space-x-3">
            <img src={logoImg} alt="Jan Sahayak Logo" className="w-10 h-10 rounded-lg object-contain bg-white p-0.5 border border-[#e8ab16]" />
            <div>
              <h4 className="font-bold text-base text-white font-editorial">Jan Sahayak (जन सहायक)</h4>
              <p className="text-[11px] text-[#e8ab16] font-semibold uppercase">{t('appTagline') || 'HELPING THE PEOPLE'}</p>
            </div>
          </div>

          <div className="text-xs text-slate-200 space-x-4 font-medium">
            <span>National Citizen Portal</span>
            <span>|</span>
            <span>Privacy & Terms</span>
            <span>|</span>
            <span>Accessibility</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-300 gap-2">
          <span>Official Public Digital Service Discovery Platform. Government of India.</span>
          <span>Last Verified: September 2026</span>
        </div>
      </footer>

    </div>
  );
}
