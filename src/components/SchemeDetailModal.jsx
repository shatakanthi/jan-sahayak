import React from 'react';
import { X, ShieldCheck, ExternalLink, CheckCircle2, Clock, Landmark, AlertCircle, ArrowDown } from 'lucide-react';

export default function SchemeDetailModal({ scheme, onClose, onResolveObstacle }) {
  if (!scheme) return null;

  const timelineSteps = [
    { num: '01', title: 'Check eligibility', desc: 'Verify age, income, and locality requirements.' },
    { num: '02', title: 'Prepare documents', desc: 'Gather mandatory identity, address, and income proofs.' },
    { num: '03', title: 'Submit application', desc: 'Submit form online on official portal or via Jan Sahayak.' },
    { num: '04', title: 'Verification', desc: 'Municipal / Nodal officer verifies documents.' },
    { num: '05', title: 'Track status & Benefit', desc: 'Sanction order issued & direct benefit transfer initiated.' }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-[#16796F]/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-3xl rounded-lg border border-[#B7BDA9] p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto relative shadow-2xl animate-editorial-reveal text-[#16796F]">
        
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-md bg-[#F4F6F3] hover:bg-[#B7BDA9]/40 text-[#599D9C] transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title Header */}
        <div className="space-y-2 border-b border-[#B7BDA9] pb-4">
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-bold uppercase px-2.5 py-0.5 rounded bg-[#16796F]/10 text-[#16796F]">
              {scheme.sector || scheme.category || 'Government Service'}
            </span>
            <span className="text-xs font-bold text-[#148B4B] flex items-center space-x-1">
              <ShieldCheck className="w-4 h-4" />
              <span>Verified Government Document</span>
            </span>
          </div>

          <h2 className="text-2xl font-bold text-[#16796F] font-editorial tracking-tight">
            {scheme.name}
          </h2>

          <div className="flex items-center space-x-4 text-xs text-[#599D9C]">
            <span>Department: <strong>{scheme.department}</strong></span>
            <span>|</span>
            <span>Last Updated: <strong>{scheme.lastVerified || 'September 2026'}</strong></span>
          </div>
        </div>

        {/* Short Overview */}
        <div className="space-y-2">
          <h3 className="text-sm font-bold text-[#16796F] uppercase tracking-wider font-editorial">Overview</h3>
          <p className="text-xs sm:text-sm text-[#599D9C] leading-relaxed">
            {scheme.description || scheme.shortDescription}
          </p>
        </div>

        {/* Benefits Section */}
        {scheme.benefits && (
          <div className="p-4 bg-[#F4F6F3] border border-[#B7BDA9] rounded-md space-y-1">
            <h4 className="text-xs font-bold text-[#16796F] uppercase tracking-wider">Benefits</h4>
            <p className="text-xs font-semibold text-[#16796F]">{scheme.benefits}</p>
          </div>
        )}

        {/* Required Documents Checklist */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-[#16796F] uppercase tracking-wider">Required Documents Checklist</h4>
          <div className="space-y-2">
            {scheme.requiredDocuments?.map((doc, idx) => {
              const docName = typeof doc === 'string' ? doc : doc.name;
              return (
                <div key={idx} className="jan-card p-3 flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-[#148B4B] shrink-0" />
                    <span className="font-medium text-[#16796F]">{docName}</span>
                  </div>
                  <button
                    onClick={() => {
                      onClose();
                      onResolveObstacle(docName);
                    }}
                    className="text-[11px] text-[#148B4B] font-bold hover:underline"
                  >
                    Don't have this?
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Visual 5-Step Application Timeline (Section 15) */}
        <div className="space-y-4 pt-2">
          <h4 className="text-xs font-bold text-[#16796F] uppercase tracking-wider">How to Apply (5-Step Guided Flow)</h4>
          
          <div className="space-y-3 relative pl-4 border-l-2 border-[#16796F]">
            {timelineSteps.map((step, idx) => (
              <div key={idx} className="space-y-1 relative">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-bold font-mono text-[#148B4B]">{step.num}</span>
                  <h5 className="text-xs font-bold text-[#16796F]">{step.title}</h5>
                </div>
                <p className="text-xs text-[#599D9C]">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-[#B7BDA9] flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#F4F6F3] text-[#599D9C] text-xs font-bold rounded-md hover:bg-[#B7BDA9]/30"
          >
            Close Document
          </button>

          <a
            href={scheme.officialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2 bg-[#148B4B] hover:bg-[#106f3c] text-white text-xs font-bold rounded-md flex items-center space-x-1 shadow"
          >
            <span>Go to Official Service Portal</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </div>
  );
}
