import React, { useState } from 'react';
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

  const activeLocalityObj = LOCALITIES.find(l => l.id === selectedLocality) || LOCALITIES[0];

  const categoryBlocks = [
    { name: 'Education Services', desc: 'Scholarships, fee waivers & loans', count: '14 Services', icon: GraduationCap },
    { name: 'Healthcare Services', desc: 'Free hospital cover & OPD slots', count: '9 Services', icon: Heart },
    { name: 'Employment Services', desc: 'Skill development & worker IDs', count: '18 Services', icon: Briefcase },
    { name: 'Housing & Utility Services', desc: 'Electricity, water & meter transfers', count: '12 Services', icon: Home },
    { name: 'Agriculture Services', desc: 'PM-KISAN direct income & insurance', count: '15 Services', icon: Building2 },
    { name: 'Women & Child Services', desc: 'Maternal benefits & savings', count: '11 Services', icon: ShieldCheck },
    { name: 'Senior Citizen Services', desc: 'Pensions & assisted living devices', count: '8 Services', icon: UserCheck },
    { name: 'Disability Assistance Services', desc: 'Assistive devices & monthly aid', count: '7 Services', icon: ShieldAlert }
  ];

  const handleSearchSubmit = (e) => {
    e?.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
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
    <div className="space-y-14 pb-20 text-[#16796F]">
      
      {/* 1. HERO SECTION WITH OFFICIAL LOGO IMAGE */}
      <div className="bg-[#16796F] text-white p-8 sm:p-14 rounded-xl space-y-8 relative shadow-lg">
        
        <div className="max-w-3xl space-y-5">
          <div className="flex items-center space-x-3">
            <img src={logoImg} alt="Jan Sahayak Emblem" className="w-12 h-12 rounded-lg bg-white p-1 object-contain border-2 border-[#148B4B]" />
            <div>
              <span className="text-xs font-bold text-[#B7BDA9] tracking-widest uppercase">जन सहायक • JAN SHAYAK</span>
              <h3 className="text-sm font-semibold text-emerald-100">HELPING THE PEOPLE</h3>
            </div>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white font-editorial leading-tight">
            Discover the Services Available to You.
          </h2>

          <p className="text-sm sm:text-base text-emerald-100 leading-relaxed font-sans max-w-2xl">
            Explore government services, benefits and rights based on your needs, eligibility and location.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={onNavigateWizard}
              className="px-6 py-3 bg-[#148B4B] hover:bg-[#106f3c] text-white font-bold text-xs rounded-lg shadow transition flex items-center space-x-2"
            >
              <span>Find Services for Me</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenDigiLocker}
              className="px-6 py-3 bg-[#115E57] hover:bg-[#115E57]/80 text-white border border-[#B7BDA9]/40 font-bold text-xs rounded-lg transition flex items-center space-x-2"
            >
              <Lock className="w-4 h-4 text-[#B7BDA9]" />
              <span>Connect DigiLocker 🔒</span>
            </button>
          </div>
        </div>

        {/* Search Bar Input Form */}
        <form onSubmit={handleSearchSubmit} className="max-w-3xl">
          <div className="relative flex items-center bg-white rounded-lg p-2 shadow-lg border border-[#B7BDA9]">
            <Search className="w-5 h-5 text-[#599D9C] ml-3 shrink-0" />
            
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search government services, benefits, departments or utility transfers..."
              className="w-full bg-transparent px-3 py-2 text-sm text-[#16796F] placeholder-[#599D9C] focus:outline-none font-medium"
            />

            <button
              type="button"
              onClick={toggleVoiceInput}
              title="Voice Input"
              className={`p-2 rounded-md transition-colors shrink-0 ${
                isListening ? 'bg-rose-500 text-white' : 'bg-[#F4F6F3] text-[#16796F] hover:bg-slate-200'
              }`}
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4 text-[#148B4B]" />}
            </button>

            <button
              type="submit"
              disabled={loading}
              className="ml-2 px-6 py-2.5 bg-[#148B4B] hover:bg-[#106f3c] text-white font-bold text-xs rounded-lg flex items-center space-x-1.5 transition shrink-0"
            >
              {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <span>Search Services</span>}
            </button>
          </div>
        </form>

        <div className="text-xs text-emerald-100 pt-1 flex items-center justify-between border-t border-[#599D9C]/60 max-w-3xl">
          <span>Active Locality: <strong>{activeLocalityObj.name}</strong></span>
          <span className="text-[#B7BDA9] font-semibold">Grounded AI Search Enabled</span>
        </div>

      </div>

      {/* 2. CATEGORY SECTOR NAVIGATION WITH CLEAR SPACIOUS PADDING */}
      <div className="space-y-6 service-section">
        <div>
          <span className="text-[11px] font-bold text-[#148B4B] uppercase tracking-widest">CATEGORIES</span>
          <h3 className="text-2xl font-bold text-[#16796F] font-editorial mt-0.5">What services are you looking for?</h3>
          <p className="text-xs text-[#599D9C]">Browse services grouped by category and life requirements.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {categoryBlocks.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <div 
                key={idx}
                onClick={() => onSearch(cat.name)}
                className="jan-card p-5 rounded-xl cursor-pointer space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-lg bg-[#F4F6F3] border border-[#B7BDA9] flex items-center justify-center text-[#16796F]">
                    <Icon className="w-5 h-5 text-[#16796F]" />
                  </div>
                  <span className="text-[10px] font-mono font-semibold text-[#599D9C] bg-[#F4F6F3] px-2 py-0.5 rounded">{cat.count}</span>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-[#16796F] font-editorial">{cat.name}</h4>
                  <p className="text-xs text-[#64748B] mt-0.5">{cat.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. SEARCH RESULTS DISPLAY (LARGE HORIZONTAL ROWS FOR SERVICES) */}
      {searchResults && (
        <div className="space-y-6 service-section">
          
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold text-[#059669] uppercase tracking-wider">VERIFIED SERVICES CATALOGUE</span>
              <h3 className="text-2xl font-bold text-[#0B2545] font-editorial mt-0.5">Government Services You May Be Eligible to Explore</h3>
            </div>
            <span className="text-xs px-3 py-1 rounded-full bg-[#0F4C81]/10 text-[#0F4C81] font-mono font-bold">
              {searchResults.matchedSchemes?.length || 0} Services Found
            </span>
          </div>

          {appliedId && (
            <div className="p-4 bg-[#059669]/10 border border-[#059669]/30 text-[#059669] text-xs font-bold rounded-lg flex items-center space-x-2 animate-editorial-reveal">
              <CheckCircle2 className="w-5 h-5" />
              <span>DigiLocker 1-Click Service Application Submitted! Ref ID: {appliedId}</span>
            </div>
          )}

          {/* Horizontal Rows */}
          <div className="space-y-5">
            {searchResults.matchedSchemes?.map((scheme) => {
              const localityPortal = getLocalityPortal(scheme.sector || scheme.category, selectedLocality);

              return (
                <div key={scheme.id} className="jan-card p-6 rounded-xl space-y-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#0F4C81]/10 text-[#0F4C81] uppercase tracking-wider">
                          {scheme.sector || scheme.category}
                        </span>
                        <span className="text-xs text-[#64748B] font-medium">{scheme.department}</span>
                      </div>
                      <h4 className="text-lg font-bold text-[#0B2545] font-editorial">{scheme.name}</h4>
                    </div>

                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#059669]/10 text-[#059669] border border-[#059669]/30 self-start md:self-auto">
                      ● Likely Eligible
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                    {scheme.shortDescription || scheme.description}
                  </p>

                  <div className="flex flex-wrap gap-4 text-xs text-[#64748B] pt-2 border-t border-[#E2E8F0]">
                    <div>Official Source: <strong>{scheme.verifiedSource || 'Government Portal'}</strong></div>
                    <div>Data Owner: <strong>{scheme.dataOwner || 'Department'}</strong></div>
                    <div>Last Verified: <strong>{scheme.lastVerified || '2026-09-20'}</strong></div>
                  </div>

                  {scheme.potentialObstacle && (
                    <div className="p-3 bg-[#EA580C]/10 border border-[#EA580C]/30 rounded-lg flex items-center justify-between text-xs">
                      <div className="flex items-center space-x-2 text-[#EA580C]">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>Missing document? <strong>{scheme.potentialObstacle}</strong></span>
                      </div>
                      <button
                        onClick={() => onResolveObstacle(scheme.potentialObstacle)}
                        className="px-3 py-1 bg-[#EA580C] hover:bg-[#C2410C] text-white font-bold text-xs rounded-md transition"
                      >
                        Solve Obstacle
                      </button>
                    </div>
                  )}

                  <div className="flex flex-wrap items-center justify-between gap-2 pt-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        onClick={() => onSelectScheme(scheme)}
                        className="px-4 py-2 bg-[#0F4C81] hover:bg-[#0B2545] text-white text-xs font-bold rounded-lg transition"
                      >
                        View Service Details
                      </button>

                      <button
                        onClick={() => handleDigiLockerAutoFillSubmit(scheme)}
                        className="px-4 py-2 bg-[#059669] hover:bg-[#047857] text-white text-xs font-bold rounded-lg transition flex items-center space-x-1 shadow-sm"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                        <span>DigiLocker 1-Click Auto-Fill & Apply</span>
                      </button>
                    </div>

                    <a
                      href={localityPortal.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-2 bg-white border border-[#E2E8F0] text-[#0B2545] text-xs font-semibold rounded-lg hover:bg-slate-50 transition flex items-center space-x-1"
                    >
                      <span>{localityPortal.name}</span>
                      <ExternalLink className="w-3.5 h-3.5 text-[#64748B]" />
                    </a>
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      )}

      {/* 4. CLEAN MINIMAL MOBILE-OPTIMIZED FOOTER (NO BLOATED TOPIC LISTS) */}
      <footer className="bg-[#0B2545] text-white rounded-xl p-6 sm:p-8 space-y-4 mt-12 shadow-lg">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-3">
            <img src={logoImg} alt="Jan Sahayak Logo" className="w-10 h-10 rounded-lg object-contain bg-white p-0.5 border border-amber-400" />
            <div>
              <h4 className="font-bold text-base text-white font-editorial">Jan Sahayak (जन सहायक)</h4>
              <p className="text-[11px] text-amber-300 font-semibold uppercase">HELPING THE PEOPLE</p>
            </div>
          </div>

          <div className="text-xs text-slate-300 space-x-4 font-medium">
            <span>National Citizen Portal</span>
            <span>|</span>
            <span>Privacy & Terms</span>
            <span>|</span>
            <span>Accessibility</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-2">
          <span>Official Public Digital Service Discovery Platform. Government of India.</span>
          <span>Last Verified: September 2026</span>
        </div>
      </footer>

    </div>
  );
}
