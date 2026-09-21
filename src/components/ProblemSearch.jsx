import React, { useState } from 'react';
import { Mic, MicOff, Search, ArrowRight, ShieldCheck, FileText, ExternalLink, AlertCircle, RefreshCw, CheckCircle2, Lock, Sparkles, Building2, UserCheck, ShieldAlert, GraduationCap, Heart, Briefcase, Home } from 'lucide-react';
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

  const handleSearchSubmit = (e) => {
    e?.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  const toggleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      alert("Voice input is not supported in this browser. Please type your custom query.");
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

  // Standout Hackathon Hero Feature: DigiLocker 1-Click Auto-Fill & Instant Application Engine
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
    <div className="space-y-10 pb-20 text-[#1F2933]">
      
      {/* HERO SECTION MATCHING MASTER DESIGN PROMPT */}
      <div className="bg-[#102A43] text-white p-8 sm:p-14 rounded-lg space-y-8 relative shadow-md">
        
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded bg-[#0B1D2D] border border-[#1A3652] text-amber-400 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>NATIONAL CITIZEN SERVICE DISCOVERY PORTAL</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white font-editorial leading-tight">
            Discover the support available to you.
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans max-w-2xl">
            Enter any custom question or problem statement. Our real-time AI will scan verified central and state schemes for your exact requirements.
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
              onClick={onOpenDigiLocker}
              className="px-6 py-3 bg-[#167D5A] hover:bg-[#0F5C41] text-white border border-[#167D5A] font-bold text-xs rounded-md transition flex items-center space-x-2"
            >
              <Lock className="w-4 h-4" />
              <span>Connect DigiLocker 🔒</span>
            </button>
          </div>
        </div>

        {/* Real-time Custom Search Input Form */}
        <form onSubmit={handleSearchSubmit} className="max-w-3xl">
          <div className="relative flex items-center bg-white rounded-md p-2 shadow-lg border border-slate-200">
            <Search className="w-5 h-5 text-slate-400 ml-3 shrink-0" />
            
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter your custom question (e.g. 'I need senior citizen health cover & pension')..."
              className="w-full bg-transparent px-3 py-2 text-sm text-[#1F2933] placeholder-slate-400 focus:outline-none font-medium"
            />

            <button
              type="button"
              onClick={toggleVoiceInput}
              title="Voice Input"
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
              {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <span>Search AI</span>}
            </button>
          </div>
        </form>

        <div className="text-xs text-slate-300 pt-1 flex items-center justify-between border-t border-[#1A3652] max-w-3xl">
          <span>Active Locality: <strong>{activeLocalityObj.name}</strong></span>
          <span className="text-emerald-400 font-semibold">Real-Time Search Enabled</span>
        </div>

      </div>

      {/* REAL-TIME AI SEARCH RESULTS */}
      {searchResults && (
        <div className="space-y-6 pt-4 border-t border-[#E7E5DF]">
          
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold text-[#167D5A] uppercase tracking-wider">REAL-TIME AI SEARCH RESULTS</span>
              <h3 className="text-2xl font-bold text-[#102A43] font-editorial mt-0.5">Matching Verified Schemes & Requirements</h3>
            </div>
            <span className="text-xs px-3 py-1 rounded-full bg-[#102A43]/10 text-[#102A43] font-mono font-bold">
              {searchResults.matchedSchemes?.length || 0} Matches Found
            </span>
          </div>

          {appliedId && (
            <div className="p-4 bg-[#167D5A]/10 border border-[#167D5A]/30 text-[#167D5A] text-xs font-bold rounded-md flex items-center space-x-2 animate-editorial-reveal">
              <CheckCircle2 className="w-5 h-5" />
              <span>DigiLocker 1-Click Instant Application Submitted! Ref ID: {appliedId} (Tracking live on Citizen Dashboard)</span>
            </div>
          )}

          {/* Horizontal Rows for Schemes */}
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

                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#167D5A]/10 text-[#167D5A] border border-[#167D5A]/30 self-start md:self-auto">
                      ● Likely Eligible
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-[#52606D] leading-relaxed">
                    {scheme.shortDescription || scheme.description}
                  </p>

                  <div className="flex flex-wrap gap-4 text-xs text-[#52606D] pt-2 border-t border-[#E7E5DF]">
                    <div>Official Source: <strong>{scheme.verifiedSource || 'Government Portal'}</strong></div>
                    <div>Data Owner: <strong>{scheme.dataOwner || 'Department'}</strong></div>
                    <div>Verified: <strong>{scheme.lastVerified || '2026-09-20'}</strong></div>
                  </div>

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

                  {/* Actions & Hackathon Standout Feature */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        onClick={() => onSelectScheme(scheme)}
                        className="px-4 py-2 bg-[#102A43] hover:bg-[#1F2933] text-white text-xs font-bold rounded-md transition"
                      >
                        View Details & Checklist
                      </button>

                      {/* Standout Hackathon Feature: DigiLocker 1-Click Auto-Fill */}
                      <button
                        onClick={() => handleDigiLockerAutoFillSubmit(scheme)}
                        className="px-4 py-2 bg-[#167D5A] hover:bg-[#0F5C41] text-white text-xs font-bold rounded-md transition flex items-center space-x-1 shadow-sm"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                        <span>DigiLocker 1-Click Auto-Fill & Apply</span>
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

    </div>
  );
}
