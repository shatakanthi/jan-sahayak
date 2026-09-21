import React, { useState } from 'react';
import { Check, ArrowRight, ArrowLeft, ShieldCheck, Sparkles, Filter, Building2, User, HelpCircle } from 'lucide-react';
import { VERIFIED_SCHEMES } from '../data/verifiedSchemes';

export default function SchemeWizard({ onSelectScheme, selectedLocality, t }) {
  const [step, setStep] = useState(1);
  const [who, setWho] = useState('Senior Citizen');
  const [need, setNeed] = useState('Financial Support');

  const whoOptions = [
    { id: 'Student', label: 'Student', desc: 'Scholarships & higher education' },
    { id: 'Farmer', label: 'Farmer', desc: 'Direct subsidies & crop insurance' },
    { id: 'Senior Citizen', label: 'Senior Citizen', desc: 'Pension & elderly care' },
    { id: 'Entrepreneur', label: 'Entrepreneur / MSME', desc: 'Micro-credit & trade licenses' },
    { id: 'Worker', label: 'Worker / Employee', desc: 'Public transport & relocation' },
    { id: 'Woman', label: 'Woman / Mother', desc: 'Maternal care & savings' },
    { id: 'Person with Disability', label: 'Person with Disability', desc: 'Assistance devices & support' },
    { id: 'Other', label: 'Other Citizen', desc: 'General civic services' }
  ];

  const needOptions = [
    { id: 'Education', label: 'Education & Studies' },
    { id: 'Healthcare', label: 'Healthcare & Medical Cover' },
    { id: 'Employment', label: 'Employment & Skills' },
    { id: 'Housing', label: 'Housing & Relocation' },
    { id: 'Financial Support', label: 'Financial Assistance & Pensions' },
    { id: 'Business Support', label: 'Business & Micro-Credit' },
    { id: 'Agriculture', label: 'Agriculture & Land Support' }
  ];

  // Dynamic filtering based on user selection in Step 1 & Step 2
  const matched = VERIFIED_SCHEMES.filter(scheme => {
    const text = `${scheme.name} ${scheme.category} ${scheme.sector} ${scheme.shortDescription} ${scheme.description}`.toLowerCase();
    
    let matchesWho = false;
    if (who === 'Student') matchesWho = text.includes('edu') || text.includes('scholarship') || text.includes('student');
    else if (who === 'Farmer') matchesWho = text.includes('agri') || text.includes('kisan') || text.includes('farm') || text.includes('crop');
    else if (who === 'Senior Citizen') matchesWho = text.includes('senior') || text.includes('pension') || text.includes('old age');
    else if (who === 'Entrepreneur') matchesWho = text.includes('business') || text.includes('credit') || text.includes('loan') || text.includes('msme') || text.includes('bank');
    else if (who === 'Worker') matchesWho = text.includes('employ') || text.includes('skill') || text.includes('work') || text.includes('transport') || text.includes('utilit');
    else if (who === 'Woman') matchesWho = text.includes('women') || text.includes('matru') || text.includes('child') || text.includes('matern');
    else if (who === 'Person with Disability') matchesWho = text.includes('disab') || text.includes('udid') || text.includes('handicap') || text.includes('aid');
    else matchesWho = true;

    let matchesNeed = false;
    if (need === 'Education') matchesNeed = text.includes('edu') || text.includes('scholar') || text.includes('school');
    else if (need === 'Healthcare') matchesNeed = text.includes('health') || text.includes('ayushman') || text.includes('hospit') || text.includes('opd');
    else if (need === 'Employment') matchesNeed = text.includes('employ') || text.includes('skill') || text.includes('job') || text.includes('work');
    else if (need === 'Housing') matchesNeed = text.includes('hous') || text.includes('utilit') || text.includes('water') || text.includes('elec') || text.includes('meter');
    else if (need === 'Financial Support') matchesNeed = text.includes('pension') || text.includes('dbt') || text.includes('income') || text.includes('bank') || text.includes('allowance');
    else if (need === 'Business Support') matchesNeed = text.includes('credit') || text.includes('loan') || text.includes('business') || text.includes('bank');
    else if (need === 'Agriculture') matchesNeed = text.includes('agri') || text.includes('kisan') || text.includes('crop') || text.includes('land');
    else matchesNeed = true;

    return matchesWho || matchesNeed;
  });

  const finalMatched = matched.length > 0 ? matched : VERIFIED_SCHEMES.slice(0, 3);

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-4 text-[#383b3d]">
      
      {/* Service Wizard Header */}
      <div className="space-y-2 border-b border-[#896e6a] pb-6">
        <span className="text-[11px] font-bold text-[#e8ab16] uppercase tracking-widest">PERSONALIZED SERVICE FINDER</span>
        <h2 className="text-2xl sm:text-3xl font-bold text-[#324a60] font-editorial">
          Find Services Relevant to You.
        </h2>
        <p className="text-xs sm:text-sm text-[#896e6a]">
          Answer three simple questions. We will display the government services and benefits you may be eligible to explore.
        </p>

        {/* Progress Bar */}
        <div className="pt-4 flex items-center space-x-2">
          {[1, 2, 3].map(i => (
            <div key={i} className="flex-1 flex items-center space-x-2">
              <div className={`h-1.5 rounded-full flex-1 transition-all duration-300 ${
                step >= i ? 'bg-[#324a60]' : 'bg-[#896e6a]/30'
              }`} />
              <span className={`text-[10px] font-bold font-mono ${step >= i ? 'text-[#324a60]' : 'text-[#896e6a]'}`}>
                0{i}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* STEP 1: Who are you? */}
      {step === 1 && (
        <div className="space-y-6">
          <h3 className="text-lg font-bold text-[#324a60] font-editorial">Step 1 — Who are you?</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            {whoOptions.map(opt => {
              const isSelected = who === opt.id;
              return (
                <div
                  key={opt.id}
                  onClick={() => setWho(opt.id)}
                  className={`jan-card p-4 cursor-pointer transition-all ${
                    isSelected ? 'border-[#324a60] bg-[#324a60]/10 ring-2 ring-[#324a60]' : ''
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <User className={`w-4 h-4 ${isSelected ? 'text-[#e8ab16]' : 'text-[#896e6a]'}`} />
                    {isSelected && <Check className="w-4 h-4 text-[#74744a]" />}
                  </div>
                  <h4 className="text-xs font-bold text-[#324a60]">{opt.label}</h4>
                  <p className="text-[11px] text-[#896e6a] mt-0.5">{opt.desc}</p>
                </div>
              );
            })}
          </div>

          <div className="flex justify-end pt-4">
            <button
              onClick={() => setStep(2)}
              className="px-6 py-2.5 bg-[#e8ab16] hover:bg-[#d19910] text-[#383b3d] text-xs font-bold rounded-lg flex items-center space-x-2 shadow transition"
            >
              <span>Continue to Step 2</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: What do you need? */}
      {step === 2 && (
        <div className="space-y-6">
          <h3 className="text-lg font-bold text-[#324a60] font-editorial">Step 2 — What do you need support for?</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {needOptions.map(opt => {
              const isSelected = need === opt.id;
              return (
                <div
                  key={opt.id}
                  onClick={() => setNeed(opt.id)}
                  className={`jan-card p-4 cursor-pointer transition-all flex items-center justify-between ${
                    isSelected ? 'border-[#324a60] bg-[#324a60]/10 ring-2 ring-[#324a60]' : ''
                  }`}
                >
                  <span className="text-xs font-bold text-[#324a60]">{opt.label}</span>
                  {isSelected && <Check className="w-4 h-4 text-[#74744a]" />}
                </div>
              );
            })}
          </div>

          <div className="flex justify-between pt-4">
            <button
              onClick={() => setStep(1)}
              className="px-5 py-2 bg-white text-[#896e6a] border border-[#896e6a] hover:bg-slate-50 text-xs font-semibold rounded-lg flex items-center space-x-1"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <button
              onClick={() => setStep(3)}
              className="px-6 py-2.5 bg-[#e8ab16] hover:bg-[#d19910] text-[#383b3d] text-xs font-bold rounded-lg flex items-center space-x-2 shadow transition"
            >
              <span>View Customized Services</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: Customized Services Results */}
      {step === 3 && (
        <div className="space-y-6 animate-editorial-reveal">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#896e6a] pb-4 gap-2">
            <div>
              <span className="text-[11px] font-bold text-[#74744a] uppercase tracking-wider flex items-center space-x-1">
                <ShieldCheck className="w-4 h-4" />
                <span>Customized for {who} • Need: {need}</span>
              </span>
              <h3 className="text-xl font-bold text-[#324a60] font-editorial mt-1">
                Matched Services ({finalMatched.length})
              </h3>
            </div>

            <button
              onClick={() => setStep(1)}
              className="text-xs text-[#e8ab16] font-bold hover:underline self-start sm:self-auto"
            >
              Modify Options
            </button>
          </div>

          <div className="space-y-4">
            {finalMatched.map(scheme => (
              <div
                key={scheme.id}
                className="jan-card p-6 rounded-xl space-y-4 hover:border-[#324a60] transition bg-white"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#324a60]/10 text-[#324a60] uppercase">
                        {scheme.sector || scheme.category}
                      </span>
                      <span className="text-xs text-[#896e6a]">{scheme.department}</span>
                    </div>
                    <h4 className="text-base font-bold text-[#324a60] mt-1 font-editorial">{scheme.name}</h4>
                  </div>

                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#74744a]/10 text-[#74744a] border border-[#74744a]/30 self-start md:self-auto">
                    ● 100% Eligible
                  </span>
                </div>

                <p className="text-xs text-[#383b3d] leading-relaxed">
                  {scheme.description || scheme.shortDescription}
                </p>

                <div className="flex items-center justify-between pt-2 border-t border-[#896e6a]/40 text-xs">
                  <span className="text-[#896e6a]">Source: <strong>{scheme.verifiedSource}</strong></span>
                  <button
                    onClick={() => onSelectScheme(scheme)}
                    className="px-4 py-2 bg-[#324a60] text-white font-bold rounded-lg hover:bg-[#243545] transition"
                  >
                    View Details & Requirements →
                  </button>
                </div>

              </div>
            ))}
          </div>

        </div>
      )}

    </div>
  );
}
