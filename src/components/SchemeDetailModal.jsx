import React from 'react';
import { X, ShieldCheck, ExternalLink, FileText, CheckCircle2, AlertTriangle, Landmark } from 'lucide-react';

export default function SchemeDetailModal({ scheme, onClose, onResolveObstacle }) {
  if (!scheme) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="glass-panel w-full max-w-2xl rounded-3xl border border-slate-700/80 p-6 space-y-6 max-h-[90vh] overflow-y-auto relative animate-fadeIn shadow-2xl">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title Header */}
        <div className="space-y-2 border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/20">
              {scheme.category || 'Government Scheme'}
            </span>
            <span className="text-xs font-semibold text-emerald-400 flex items-center space-x-1 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Verified Source</span>
            </span>
          </div>

          <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
            {scheme.name}
          </h2>

          <div className="flex items-center space-x-2 text-xs text-slate-400">
            <Landmark className="w-4 h-4 text-slate-500 shrink-0" />
            <span>{scheme.department}</span>
          </div>
        </div>

        {/* Grounding Source Info */}
        <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center justify-between text-xs">
          <div>
            <div className="text-slate-400">Official Source: <strong className="text-slate-200">{scheme.verifiedSource || 'Government Portal'}</strong></div>
            <div className="text-slate-500 text-[11px]">Last Grounded & Verified: {scheme.lastVerified || '2026-09-15'}</div>
          </div>

          <a
            href={scheme.officialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs rounded-xl flex items-center space-x-1 transition shrink-0"
          >
            <span>Visit Portal</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Description */}
        <div className="space-y-1.5">
          <h4 className="text-xs font-bold text-blue-400 uppercase tracking-wider">Overview & Benefits</h4>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {scheme.description || scheme.shortDescription}
          </p>
          {scheme.benefits && (
            <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-xs text-blue-300">
              <strong>Key Benefit:</strong> {scheme.benefits}
            </div>
          )}
        </div>

        {/* Required Documents Checklist */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold text-blue-400 uppercase tracking-wider">Required Documents Checklist</h4>
          <div className="space-y-1.5">
            {scheme.requiredDocuments?.map((doc, idx) => {
              const docName = typeof doc === 'string' ? doc : doc.name;
              return (
                <div key={idx} className="flex items-center justify-between bg-slate-900/80 p-2.5 rounded-xl border border-slate-800 text-xs">
                  <div className="flex items-center space-x-2 text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{docName}</span>
                  </div>
                  <button
                    onClick={() => {
                      onClose();
                      onResolveObstacle(docName);
                    }}
                    className="text-[10px] text-amber-400 hover:underline font-medium"
                  >
                    Don't have this?
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Step-by-Step Application Steps */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold text-blue-400 uppercase tracking-wider">Guided Application Workflow</h4>
          <ol className="space-y-2 list-decimal list-inside text-xs text-slate-300 bg-slate-950 p-4 rounded-2xl border border-slate-800">
            {scheme.applicationSteps?.map((step, idx) => (
              <li key={idx} className="leading-relaxed">{step}</li>
            ))}
          </ol>
        </div>

      </div>
    </div>
  );
}
