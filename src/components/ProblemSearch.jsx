import React, { useState } from 'react';
import { Mic, MicOff, Search, Sparkles, ArrowRight, ShieldCheck, FileText, ExternalLink, AlertCircle, RefreshCw, Home, CheckCircle2, MapPin, Clock, DollarSign, Baby, GraduationCap, Heart, Briefcase, UserCheck, ShieldAlert } from 'lucide-react';
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
  onNavigateLifeEvents
}) {
  const [query, setQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [appliedId, setAppliedId] = useState(null);

  const activeLocalityObj = LOCALITIES.find(l => l.id === selectedLocality) || LOCALITIES[0];

  const popularTags = [
    { label: 'Birth certificate', query: 'Birth certificate registration' },
    { label: 'Ration card', query: 'New Ration Card application' },
    { label: 'Pension', query: 'Old Age Pension assistance' },
    { label: 'Aadhaar', query: 'Aadhaar Card address update' },
    { label: 'Scholarship', query: 'National Scholarship (NSP)' },
    { label: 'Driving licence', query: 'Driving License address change' }
  ];

  const lifeEventCards = [
    { title: 'Birth of a Child', desc: 'Registration, immunisation and your child\'s first savings', icon: Baby },
    { title: 'School & Studies', desc: 'Scholarships, marksheets and fee concessions', icon: GraduationCap },
    { title: 'Marriage', desc: 'Register the wedding and set up your new household', icon: Heart },
    { title: 'Job & Employment', desc: 'IDs, licences and social security for working life', icon: Briefcase },
    { title: 'Retirement & Pension', desc: 'Pensions and health cover for the golden years', icon: UserCheck },
    { title: 'Death & Succession', desc: 'Certificates, benefits and inheritance — step by step', icon: ShieldAlert }
  ];

  const handleSearchSubmit = (e) => {
    e?.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  const handlePresetClick = (preset) => {
    setQuery(preset);
    onSearch(preset);
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
    <div className="space-y-10 pb-20 text-slate-900">
      
      {/* 1. HERO SECTION MATCHING TEMPLATE SCREENSHOT (media_1789983714526.jpg) */}
      <div className="bg-[#0b192c] text-white p-8 sm:p-12 rounded-3xl space-y-6 text-center shadow-xl relative overflow-hidden">
        
        {/* Glow Badge */}
        <div className="inline-flex items-center space-x-1.5 px-3.5 py-1 rounded-full bg-slate-800/90 border border-slate-700 text-amber-400 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
          <span>ONE PLACE FOR EVERY GOVERNMENT SERVICE</span>
        </div>

        {/* Hero Title & Subtitle */}
        <div className="space-y-2 max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            Every government service. <br className="hidden sm:inline" />
            <span className="text-amber-500">One doorway.</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            Stop hopping between department websites. Search in plain words, browse by life event, and know exactly what you need before you apply.
          </p>
        </div>

        {/* Search Bar Input Container */}
        <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto">
          <div className="relative flex items-center bg-white rounded-2xl p-2 shadow-2xl border border-slate-200">
            <Search className="w-5 h-5 text-slate-400 ml-3 shrink-0" />
            
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Try 'birth certificate' or 'pension'..."
              className="w-full bg-transparent px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:outline-none font-medium"
            />

            <button
              type="button"
              onClick={toggleVoiceInput}
              title="Voice Search"
              className={`p-2 rounded-xl transition-colors shrink-0 ${
                isListening ? 'bg-rose-500 text-white animate-bounce' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4 text-amber-600" />}
            </button>

            <button
              type="submit"
              disabled={loading}
              className="ml-2 px-6 py-3 bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs rounded-xl flex items-center space-x-1.5 transition shrink-0 shadow-md"
            >
              {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : (
                <span>Search</span>
              )}
            </button>
          </div>
        </form>

        {/* Popular Search Tags below Search Bar */}
        <div className="flex flex-wrap gap-2 justify-center text-xs pt-1">
          <span className="text-slate-400 font-medium">Popular:</span>
          {popularTags.map((tag, idx) => (
            <button
              key={idx}
              onClick={() => handlePresetClick(tag.query)}
              className="px-3 py-1 rounded-full bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700/80 transition"
            >
              {tag.label}
            </button>
          ))}
        </div>

        {/* Hero Use Case Quick Trigger */}
        <div className="pt-3 border-t border-slate-800/80 max-w-xl mx-auto flex items-center justify-between text-xs text-slate-300">
          <span className="flex items-center space-x-1.5">
            <Home className="w-4 h-4 text-amber-400" />
            <span>Relocating? Try: <strong>"{t('heroQuery')}"</strong></span>
          </span>
          <button
            onClick={() => handlePresetClick(t('heroQuery'))}
            className="px-3 py-1 bg-amber-600/30 hover:bg-amber-600/50 text-amber-300 border border-amber-500/40 rounded-lg font-bold"
          >
            Run Journey →
          </button>
        </div>

      </div>

      {/* 2. POPULAR SERVICES GRID MATCHING TEMPLATE SCREENSHOT (media_1789983661870.jpg) */}
      <div className="space-y-4">
        <div>
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-slate-900">Popular services</h3>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 border border-amber-200 flex items-center space-x-1">
              <MapPin className="w-3.5 h-3.5" />
              <span>Locality: {activeLocalityObj.name}</span>
            </span>
          </div>
          <p className="text-xs text-slate-500">The documents and schemes citizens look for most.</p>
        </div>

        {searchResults && searchResults.matchedSchemes && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {searchResults.matchedSchemes.map((scheme) => {
              const localityPortal = getLocalityPortal(scheme.sector || scheme.category, selectedLocality);

              return (
                <div 
                  key={scheme.id}
                  className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm hover:shadow-md transition flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    
                    {/* Top Status Pill */}
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 flex items-center space-x-1">
                        <span>🌐 Online or centre help</span>
                      </span>
                    </div>

                    {/* Title & Description */}
                    <div>
                      <h4 className="text-base font-bold text-slate-900">{scheme.name}</h4>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2">{scheme.shortDescription || scheme.description}</p>
                    </div>
                  </div>

                  {/* Metrics & Department Redirect Link */}
                  <div className="space-y-3 border-t border-slate-100 pt-3">
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span className="flex items-center space-x-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>7-15 days</span>
                      </span>
                      <span className="font-bold text-slate-700">₹ Free</span>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <button
                        onClick={() => onSelectScheme(scheme)}
                        className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center space-x-1"
                      >
                        <span>Steps</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>

                      {/* Locality-Specific Redirect URL */}
                      <a
                        href={localityPortal.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] font-medium text-slate-600 hover:text-slate-900 flex items-center space-x-1 transition"
                      >
                        <span className="max-w-[120px] truncate">{localityPortal.name}</span>
                        <ExternalLink className="w-3 h-3 text-slate-400" />
                      </a>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 3. BROWSE BY LIFE EVENT MATCHING TEMPLATE SCREENSHOT (media_1789983694966.jpg) */}
      <div className="space-y-4 pt-4 border-t border-slate-200">
        <div>
          <span className="text-[10px] font-extrabold text-amber-600 uppercase tracking-widest">BROWSE BY LIFE EVENT</span>
          <h3 className="text-xl font-bold text-slate-900 mt-0.5">Guided help for life's big moments</h3>
          <p className="text-xs text-slate-500">A baby arrives, a job starts, a loved one passes away — each moment needs a set of services, in the right order.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {lifeEventCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div 
                key={idx}
                onClick={onNavigateLifeEvents}
                className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition cursor-pointer space-y-3"
              >
                <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-amber-600">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{card.title}</h4>
                  <p className="text-xs text-slate-500 mt-0.5">{card.desc}</p>
                </div>
                <div className="text-xs font-bold text-amber-600 hover:underline flex items-center space-x-1 pt-1">
                  <span>See the step-by-step guide</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. FOOTER MATCHING TEMPLATE SCREENSHOT (media_1789983661864.jpg) */}
      <footer className="bg-[#0b192c] text-white rounded-3xl p-8 space-y-6 mt-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-b border-slate-800 pb-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 rounded-lg bg-amber-600 flex items-center justify-center text-white">
                <Home className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-base text-white">Jan Sahayak (SevaSetu)</h4>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Central and state government services in one simple, plain-language catalogue — so every citizen can find, understand and apply.
            </p>
          </div>

          <div className="space-y-2">
            <h5 className="text-xs font-bold text-amber-400 uppercase tracking-wider">CATEGORIES</h5>
            <div className="grid grid-cols-2 text-xs text-slate-300 gap-1">
              <span>Certificates</span>
              <span>Health</span>
              <span>Welfare Schemes</span>
              <span>Agriculture</span>
              <span>Licences & Permits</span>
              <span>Housing</span>
              <span>Education</span>
              <span>Utilities & Taxes</span>
            </div>
          </div>

          <div className="space-y-2">
            <h5 className="text-xs font-bold text-amber-400 uppercase tracking-wider">LIFE EVENTS</h5>
            <div className="grid grid-cols-2 text-xs text-slate-300 gap-1">
              <span>Birth of a Child</span>
              <span>Job & Employment</span>
              <span>School & Studies</span>
              <span>Retirement & Pension</span>
              <span>Marriage</span>
              <span>Death & Succession</span>
            </div>
          </div>
        </div>

        <div className="text-center text-[11px] text-slate-400">
          Demo catalogue for illustration — always verify details on the department's official portal before applying.
        </div>
      </footer>

    </div>
  );
}
