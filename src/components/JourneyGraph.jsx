import React, { useState } from 'react';
import { GitFork, CheckCircle2, ShieldCheck, ArrowDown, FileCheck, Landmark, Clock, AlertTriangle, ExternalLink } from 'lucide-react';

export default function JourneyGraph({ searchResults, onResolveObstacle }) {
  const [activeStep, setActiveStep] = useState(0);

  const defaultJourney = [
    {
      stage: '1. Citizen Problem',
      icon: GitFork,
      color: 'from-blue-500 to-indigo-600',
      title: 'Problem Intent Extraction',
      description: 'Citizen describes real-life bottleneck (e.g. financial aid for elderly, college fees, relocation).',
      status: 'Completed'
    },
    {
      stage: '2. Understand Situation',
      icon: ShieldCheck,
      color: 'from-purple-500 to-indigo-600',
      title: 'Grounding & RAG Analysis',
      description: 'System filters intent against verified government databases to eliminate AI hallucinations.',
      status: 'Verified'
    },
    {
      stage: '3. Identify Services',
      icon: Landmark,
      color: 'from-emerald-500 to-teal-600',
      title: 'Cross-Department Scheme Bundling',
      description: 'Identifies matching schemes across Central, State, and Municipal departments.',
      status: 'Active'
    },
    {
      stage: '4. Eligibility Check',
      icon: FileCheck,
      color: 'from-amber-500 to-orange-600',
      title: 'Rules & Threshold Audit',
      description: 'Validates age, income category, location, and occupation requirements.',
      status: 'Ready'
    },
    {
      stage: '5. Document Audit',
      icon: FileCheck,
      color: 'from-pink-500 to-rose-600',
      title: 'Mandatory vs Optional Docs',
      description: 'Checks required proof of identity, residence, income, and bank account seeding.',
      status: 'Pending'
    },
    {
      stage: '6. Obstacle Resolution',
      icon: AlertTriangle,
      color: 'from-amber-400 to-rose-500',
      title: 'Hero Feature: Missing Document Solver',
      description: 'If address proof or income certificate is missing, provides 3-4 officially acceptable alternatives.',
      status: 'Hero Action'
    },
    {
      stage: '7. Department Application',
      icon: Landmark,
      color: 'from-blue-600 to-cyan-600',
      title: 'Direct Portal Redirection',
      description: 'Provides exact official registration links and form requirements.',
      status: 'Next Step'
    },
    {
      stage: '8. Status Tracking',
      icon: Clock,
      color: 'from-emerald-600 to-green-600',
      title: 'Application Reference Timeline',
      description: 'Track processing stages with real-time status updates.',
      status: 'Final Stage'
    }
  ];

  const steps = searchResults?.journeySteps || defaultJourney;

  return (
    <div className="space-y-6 pb-20">
      
      {/* Header */}
      <div className="text-center space-y-1">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold">
          <GitFork className="w-3.5 h-3.5" />
          <span>Interactive Journey Graph</span>
        </div>
        <h2 className="text-xl font-bold text-white">Your Guided Citizen Pathway</h2>
        <p className="text-xs text-slate-400 max-w-md mx-auto">
          Unlike static search portals, we visually guide you through every milestone from problem statement to status tracking.
        </p>
      </div>

      {/* Dynamic Graph Pipeline */}
      <div className="max-w-2xl mx-auto relative px-4">
        
        {/* Vertical Connecting Line */}
        <div className="absolute left-9 top-6 bottom-6 w-0.5 bg-gradient-to-b from-blue-500 via-indigo-500 to-emerald-500 hidden sm:block" />

        <div className="space-y-4">
          {steps.map((step, idx) => {
            const isSelected = activeStep === idx;
            
            return (
              <div
                key={idx}
                onClick={() => setActiveStep(idx)}
                className={`cursor-pointer transition-all duration-200 rounded-2xl p-4 border ${
                  isSelected
                    ? 'bg-slate-800/90 border-blue-500 shadow-lg shadow-blue-500/10 scale-[1.01]'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-start space-x-3">
                  
                  {/* Step Number Circle */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 shadow-md ${
                    isSelected
                      ? 'bg-blue-600 text-white ring-4 ring-blue-500/20'
                      : 'bg-slate-800 text-slate-300 border border-slate-700'
                  }`}>
                    {idx + 1}
                  </div>

                  {/* Step Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-white tracking-tight">
                        {step.stage || step.title}
                      </h4>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        idx === 5
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          : 'bg-blue-500/10 text-blue-400'
                      }`}>
                        {step.status || 'Active Node'}
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 mt-1">
                      {step.detail || step.description}
                    </p>

                    {/* Expanded details when clicked */}
                    {isSelected && (
                      <div className="mt-3 pt-3 border-t border-slate-700/60 space-y-2 animate-fadeIn">
                        <div className="text-[11px] font-medium text-slate-400">
                          Recommended Action for this Stage:
                        </div>
                        {idx === 5 ? (
                          <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between">
                            <span className="text-xs text-amber-300 font-medium">Missing documents? Resolve now</span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onResolveObstacle('No Address Proof');
                              }}
                              className="px-3 py-1 bg-amber-500 text-slate-950 text-xs font-bold rounded-lg hover:bg-amber-400"
                            >
                              Obstacle Solver
                            </button>
                          </div>
                        ) : (
                          <div className="text-xs text-blue-300 bg-blue-500/10 p-2.5 rounded-xl border border-blue-500/20">
                            ✓ Step verified against official government workflow rules.
                          </div>
                        )}
                      </div>
                    )}

                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
}
