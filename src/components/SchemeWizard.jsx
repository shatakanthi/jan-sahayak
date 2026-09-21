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

  const matched = VERIFIED_SCHEMES;

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-4 text-[#0B2545]">
      
      {/* Service Wizard Header */}
      <div className="space-y-2 border-b border-[#E2E8F0] pb-6">
        <span className="text-[11px] font-bold text-[#EA580C] uppercase tracking-widest">PERSONALIZED SERVICE FINDER</span>
        <h2 className="text-2xl sm:text-3xl font-bold text-[#0B2545] font-editorial">
          Find Services Relevant to You.
        </h2>
        <p className="text-xs sm:text-sm text-[#64748B]">
          Answer three simple questions. We will display the government services and benefits you may be eligible to explore.
        </p>

        {/* Progress Bar */}
        <div className="pt-4 flex items-center space-x-2">
          {[1, 2, 3].map(i => (
            <div key={i} className="flex-1 flex items-center space-x-2">
              <div className={`h-1.5 rounded-full flex-1 transition-all duration-300 ${
                step >= i ? 'bg-[#0F4C81]' : 'bg-[#E2E8F0]'
              }`} />
              <span className={`text-[10px] font-bold font-mono ${step >= i ? 'text-[#0F4C81]' : 'text-[#64748B]'}`}>
                0{i}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* STEP 1: Who are you? */}
      {step === 1 && (
        <div className="space-y-6">
          <h3 className="text-lg font-bold text-[#0B2545] font-editorial">Step 1 — Who are you?</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            {whoOptions.map(opt => {
              const isSelected = who === opt.id;
              return (
                <div
                  key={opt.id}
                  onClick={() => setWho(opt.id)}
                  className={`jan-card p-4 cursor-pointer transition-all ${
                    isSelected ? 'border-[#0F4C81] bg-[#0F4C81]/5 ring-1 ring-[#0F4C81]' : ''
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <User className={`w-4 h-4 ${isSelected ? 'text-[#EA580C]' : 'text-[#64748B]'}`} />
                    {isSelected && <Check className="w-4 h-4 text-[#059669]" />}
                  </div>
                  <h4 className="text-xs font-bold text-[#0B2545]">{opt.label}</h4>
                  <p className="text-[11px] text-[#64748B] mt-0.5">{opt.desc}</p>
                </div>
              );
            })}
          </div>

          <div className="flex justify-end pt-4">
            <button
              onClick={() => setStep(2)}
              className="px-6 py-2.5 bg-[#0F4C81] hover:bg-[#0B2545] text-white text-xs font-bold rounded-lg flex items-center space-x-2 shadow-sm transition"
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
          <h3 className="text-lg font-bold text-[#0B2545] font-editorial">Step 2 — What do you need support for?</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {needOptions.map(opt => {
              const isSelected = need === opt.id;
              return (
                <div
                  key={opt.id}
                  onClick={() => setNeed(opt.id)}
                  className={`jan-card p-4 cursor-pointer transition-all flex items-center justify-between ${
                    isSelected ? 'border-[#0F4C81] bg-[#0F4C81]/5 ring-1 ring-[#0F4C81]' : ''
                  }`}
                >
                  <span className="text-xs font-bold text-[#0B2545]">{opt.label}</span>
                  {isSelected && <Check className="w-4 h-4 text-[#059669]" />}
                </div>
              );
            })}
          </div>

          <div className="flex justify-between pt-4">
            <button
              onClick={() => setStep(1)}
              className="px-5 py-2 bg-white text-[#64748B] border border-[#E2E8F0] hover:bg-slate-50 text-xs font-semibold rounded-lg flex items-center space-x-1"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <button
              onClick={() => setStep(3)}
              className="px-6 py-2.5 bg-[#0F4C81] hover:bg-[#0B2545] text-white text-xs font-bold rounded-lg flex items-center space-x-2 shadow-sm transition"
            >
              <span>View Eligible Services</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: Services Results */}
      {step === 3 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-4">
            <div>
              <span className="text-[11px] font-bold text-[#059669] uppercase tracking-wider flex items-center space-x-1">
                <ShieldCheck className="w-4 h-4" />
                <span>Results based on your information</span>
              </span>
              <h3 className="text-xl font-bold text-[#0B2545] font-editorial mt-1">
                Government Services You May Be Eligible to Explore ({matched.length})
              </h3>
            </div>

            <button
              onClick={() => setStep(1)}
              className="text-xs text-[#EA580C] font-semibold hover:underline"
            >
              Modify Selection
            </button>
          </div>

          <div className="space-y-4">
            {matched.map(scheme => (
              <div
                key={scheme.id}
                className="jan-card p-6 rounded-xl space-y-4 hover:border-[#0F4C81] transition"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#0F4C81]/10 text-[#0F4C81]">
                        {scheme.sector || scheme.category}
                      </span>
                      <span className="text-xs text-[#64748B]">{scheme.department}</span>
                    </div>
                    <h4 className="text-base font-bold text-[#0B2545] mt-1 font-editorial">{scheme.name}</h4>
                  </div>

                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#059669]/10 text-[#059669] border border-[#059669]/20 self-start md:self-auto">
                    ● Likely Eligible
                  </span>
                </div>

                <p className="text-xs text-[#64748B] leading-relaxed">
                  {scheme.description || scheme.shortDescription}
                </p>

                <div className="flex items-center justify-between pt-2 border-t border-[#E2E8F0] text-xs">
                  <span className="text-[#64748B]">Source: <strong>{scheme.verifiedSource}</strong></span>
                  <button
                    onClick={() => onSelectScheme(scheme)}
                    className="px-4 py-2 bg-[#0F4C81] text-white font-bold rounded-lg hover:bg-[#0B2545] transition"
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
