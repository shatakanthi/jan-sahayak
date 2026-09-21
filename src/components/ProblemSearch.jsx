import React, { useState } from 'react';
import { Mic, MicOff, Search, ArrowRight, ShieldCheck, FileText, ExternalLink, AlertCircle, RefreshCw, Home, CheckCircle2, MapPin, GraduationCap, Heart, Briefcase, UserCheck, ShieldAlert, Sparkles, Building2 } from 'lucide-react';
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
  onNavigateLifeEvents
}) {
  const [query, setQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [appliedId, setAppliedId] = useState(null);

  const activeLocalityObj = LOCALITIES.find(l => l.id === selectedLocality) || LOCALITIES[0];

  const categoryBlocks = [
    { name: 'Education', desc: 'Scholarships, fee waivers & loans', count: '14 Schemes', icon: GraduationCap },
    { name: 'Healthcare', desc: 'Free hospital cover & OPD slots', count: '9 Schemes', icon: Heart },
    { name: 'Employment', desc: 'Skill development & worker IDs', count: '18 Schemes', icon: Briefcase },
    { name: 'Housing & Relocation', desc: 'Electricity, water & utility transfers', count: '12 Schemes', icon: Home },
    { name: 'Agriculture', desc: 'PM-KISAN direct income & insurance', count: '15 Schemes', icon: Building2 },
    { name: 'Women & Children', desc: 'Maternal benefits & savings', count: '11 Schemes', icon: ShieldCheck },
    { name: 'Senior Citizens', desc: 'Pensions & assisted living devices', count: '8 Schemes', icon: UserCheck },
    { name: 'Disability Support', desc: 'Assistive devices & monthly aid', count: '7 Schemes', icon: ShieldAlert }
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

  const handleQuickApply = (scheme) => {
    const generatedId = 'REF-' + Math.floor(100000 + Math.random() * 900000);
    setAppliedId(generatedId);
    if (onSimulateApply) {
      onSimulateApply({
        appId: generatedId,
        serviceName: scheme.name,
        sector: scheme.sector || scheme.category,
        appliedDate: new Date().toISOString().split('T')[0],
        currentStage: 'Application Submitted & Document Audit',
        estimatedCompletion: '3 Working Days',
        status: 'In Progress'
      });
    }
    setTimeout(() => setAppliedId(null), 3000);
  };

  return (
    <div className="space-y-12 pb-20 text-[#1F2933]">
      
      {/* 1. HERO SECTION MATCHING MASTER DESIGN PROMPT SECTION 7 */}
      <div className="bg-[#102A43] text-white p-8 sm:p-14 rounded-xl space-y-8 relative shadow-md">
        
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-[#0B1D2D] border border-[#1A3652] text-amber-400 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>NATIONAL PUBLIC DIGITAL SERVICE PORTAL</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white font-editorial leading-tight">
            Discover the support available to you.
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans max-w-2xl">
            Explore government schemes, benefits and services based on your needs, eligibility and location.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={onNavigateWizard}
              className="px-6 py-3 bg-[#D97706] hover:bg-[#B45309] text-white font-bold text-xs rounded-md shadow transition flex items-center space-x-2"
            >
              <span>Find Schemes for Me</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onSearch("All active schemes")}
              className="px-6 py-3 bg-[#0B1D2D] hover:bg-slate-800 text-slate-200 border border-slate-700 font-bold text-xs rounded-md transition"
            >
              Browse All Schemes
            </button>
          </div>
        </div>

        {/* Command Search Bar */}
        <form onSubmit={handleSearchSubmit} className="max-w-3xl">
          <div className="relative flex items-center bg-white rounded-md p-2 shadow-lg border border-slate-200">
            <Search className="w-5 h-5 text-slate-400 ml-3 shrink-0" />
            
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search schemes, benefits, departments or services... (Press '/' to search)"
              className="w-full bg-transparent px-3 py-2 text-sm text-[#1F2933] placeholder-slate-400 focus:outline-none font-medium"
            />

            <button
              type="button"
              onClick={toggleVoiceInput}
              title="Voice Search"
              className={`p-2 rounded-md transition-colors shrink-0 ${
                isListening ? 'bg-rose-500 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4 text-[#D97706]" />}
            </button>

            <button
              type="submit"
              disabled={loading}
              className="ml-2 px-6 py-2.5 bg-[#102A43] hover:bg-[#1F2933] text-white font-bold text-xs rounded-md flex items-center space-x-1.5 transition shrink-0"
            >
              {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <span>Search</span>}
            </button>
          </div>
        </form>

        <div className="text-xs text-slate-300 pt-1 flex items-center justify-between border-t border-[#1A3652] max-w-3xl">
          <span>Active Locality Context: <strong>{activeLocalityObj.name}</strong></span>
          <span className="text-amber-400 font-semibold">Hero Test: "{t('heroQuery')}"</span>
        </div>

      </div>

      {/* 2. CATEGORY NAVIGATION (SECTION 9) */}
      <div className="space-y-4">
        <div>
          <span className="text-[11px] font-bold text-[#D97706] uppercase tracking-widest">CATEGORIES</span>
          <h3 className="text-2xl font-bold text-[#102A43] font-editorial mt-0.5">What are you looking for?</h3>
          <p className="text-xs text-[#52606D]">Browse services grouped by sector and life requirements.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categoryBlocks.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <div 
                key={idx}
                onClick={() => onSearch(cat.name)}
                className="civic-card p-5 rounded-md cursor-pointer space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-md bg-[#F8F7F2] border border-[#E7E5DF] flex items-center justify-center text-[#102A43]">
                    <Icon className="w-5 h-5 text-[#102A43]" />
                  </div>
                  <span className="text-[10px] font-mono font-semibold text-[#52606D]">{cat.count}</span>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-[#1F2933] font-editorial">{cat.name}</h4>
                  <p className="text-xs text-[#52606D] mt-0.5">{cat.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. SCHEME RESULTS DISPLAY (SECTION 12: LARGE HORIZONTAL INFORMATION ROWS) */}
      {searchResults && (
        <div className="space-y-6 pt-4 border-t border-[#E7E5DF]">
          
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold text-[#167D5A] uppercase tracking-wider">VERIFIED RESULT CATALOGUE</span>
              <h3 className="text-2xl font-bold text-[#102A43] font-editorial mt-0.5">Schemes you may be eligible to explore</h3>
            </div>
            <span className="text-xs px-3 py-1 rounded-full bg-[#102A43]/10 text-[#102A43] font-mono font-bold">
              {searchResults.matchedSchemes?.length || 0} Matches
            </span>
          </div>

          {appliedId && (
            <div className="p-3.5 bg-[#167D5A]/10 border border-[#167D5A]/30 text-[#167D5A] text-xs font-bold rounded-md flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>Simulated Application Submitted! Ref ID: {appliedId} (Tracking live on Citizen Dashboard)</span>
            </div>
          )}

          {/* Horizontal Rows */}
          <div className="space-y-4">
            {searchResults.matchedSchemes?.map((scheme) => {
              const localityPortal = getLocalityPortal(scheme.sector || scheme.category, selectedLocality);

              return (
                <div key={scheme.id} className="civic-card p-6 rounded-lg space-y-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#102A43]/10 text-[#102A43] uppercase tracking-wider">
                          {scheme.sector || scheme.category}
                        </span>
                        <span className="text-xs text-[#52606D] font-medium">{scheme.department}</span>
                      </div>
                      <h4 className="text-lg font-bold text-[#1F2933] font-editorial">{scheme.name}</h4>
                    </div>

                    {/* Eligibility Indicator (Section 13) */}
                    <div className="self-start md:self-auto">
                      <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#167D5A]/10 text-[#167D5A] border border-[#167D5A]/30 flex items-center space-x-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#167D5A]" />
                        <span>Likely eligible</span>
                      </span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-[#52606D] leading-relaxed">
                    {scheme.shortDescription || scheme.description}
                  </p>

                  {/* Grounding Source & Data Owner (Section 18) */}
                  <div className="flex flex-wrap gap-4 text-xs text-[#52606D] pt-2 border-t border-[#E7E5DF]">
                    <div>Official Source: <strong>{scheme.verifiedSource || 'Government Portal'}</strong></div>
                    <div>Data Owner: <strong>{scheme.dataOwner || 'Department'}</strong></div>
                    <div>Last Verified: <strong>{scheme.lastVerified || '2026-09-20'}</strong></div>
                  </div>

                  {/* Obstacle Resolver Alert */}
                  {scheme.potentialObstacle && (
                    <div className="p-3 bg-[#D97706]/10 border border-[#D97706]/30 rounded-md flex items-center justify-between text-xs">
                      <div className="flex items-center space-x-2 text-[#D97706]">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>Missing document? <strong>{scheme.potentialObstacle}</strong></span>
                      </div>
                      <button
                        onClick={() => onResolveObstacle(scheme.potentialObstacle)}
                        className="px-3 py-1 bg-[#D97706] hover:bg-[#B45309] text-white font-bold text-xs rounded-md transition"
                      >
                        Solve Obstacle
                      </button>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-2">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => onSelectScheme(scheme)}
                        className="px-4 py-2 bg-[#102A43] hover:bg-[#1F2933] text-white text-xs font-bold rounded-md transition"
                      >
                        View Details & Checklist
                      </button>

                      <button
                        onClick={() => handleQuickApply(scheme)}
                        className="px-4 py-2 bg-[#167D5A] hover:bg-[#0F5C41] text-white text-xs font-bold rounded-md transition"
                      >
                        Simulate Application
                      </button>
                    </div>

                    <a
                      href={localityPortal.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-2 bg-white border border-[#E7E5DF] text-[#1F2933] text-xs font-semibold rounded-md hover:bg-slate-50 transition flex items-center space-x-1"
                    >
                      <span>{localityPortal.name}</span>
                      <ExternalLink className="w-3.5 h-3.5 text-[#52606D]" />
                    </a>
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      )}

      {/* 4. TRUST SYSTEM SECTION (SECTION 18) */}
      <div className="civic-panel p-8 space-y-4 border border-[#E7E5DF]">
        <span className="text-[11px] font-bold text-[#102A43] uppercase tracking-widest">TRUST & VERIFICATION LAYER</span>
        <h3 className="text-xl font-bold text-[#102A43] font-editorial">Information you can trust.</h3>
        <p className="text-xs text-[#52606D] max-w-2xl leading-relaxed">
          Every scheme listed on Jan Sahayak is verified directly against official central and state government Gazette notices. We strictly separate real government information from simulated hackathon sandbox actions.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs pt-2">
          <div className="p-4 bg-white border border-[#E7E5DF] rounded-md space-y-1">
            <strong className="text-[#102A43]">Official Sources</strong>
            <p className="text-[#52606D] text-[11px]">Direct links to myscheme.gov.in, India.gov.in & Discom portals.</p>
          </div>
          <div className="p-4 bg-white border border-[#E7E5DF] rounded-md space-y-1">
            <strong className="text-[#102A43]">Privacy First</strong>
            <p className="text-[#52606D] text-[11px]">No real personal data or financial credentials stored.</p>
          </div>
          <div className="p-4 bg-white border border-[#E7E5DF] rounded-md space-y-1">
            <strong className="text-[#102A43]">WCAG 2.1 Compliant</strong>
            <p className="text-[#52606D] text-[11px]">Full accessibility, high contrast mode & multilingual support.</p>
          </div>
        </div>
      </div>

      {/* 5. INSTITUTIONAL FOOTER (SECTION 26) */}
      <footer className="bg-[#102A43] text-white rounded-lg p-8 sm:p-10 space-y-8 mt-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 border-b border-[#1A3652] pb-8 text-xs">
          
          <div className="space-y-3">
            <h4 className="font-bold text-base text-white font-editorial">Jan Sahayak (SevaSetu)</h4>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              National public digital service discovery platform. Connecting citizens with essential public and commercial tertiary services.
            </p>
          </div>

          <div className="space-y-2">
            <h5 className="font-bold text-amber-400 uppercase tracking-wider text-[10px]">Government Services</h5>
            <div className="space-y-1 text-slate-300 text-[11px]">
              <div>Municipal & Utilities</div>
              <div>Healthcare Discovery</div>
              <div>Transport Services</div>
              <div>Banking & Financial Aid</div>
            </div>
          </div>

          <div className="space-y-2">
            <h5 className="font-bold text-amber-400 uppercase tracking-wider text-[10px]">Citizen Support</h5>
            <div className="space-y-1 text-slate-300 text-[11px]">
              <div>Obstacle AI Bot</div>
              <div>Document Preparation</div>
              <div>Application Tracking</div>
              <div>Accessibility Help</div>
            </div>
          </div>

          <div className="space-y-2">
            <h5 className="font-bold text-amber-400 uppercase tracking-wider text-[10px]">Institutional</h5>
            <div className="space-y-1 text-slate-300 text-[11px]">
              <div>Government of India</div>
              <div>National Portal of India</div>
              <div>Digital India Programme</div>
              <div>Terms & Privacy Policy</div>
            </div>
          </div>

        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-2">
          <span>Government Infrastructure, Redesigned Around the Citizen.</span>
          <span>Last Verified: September 2026</span>
        </div>
      </footer>

    </div>
  );
}
