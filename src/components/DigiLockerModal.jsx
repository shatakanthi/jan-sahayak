import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, Lock, X, FileText, ArrowRight, Sparkles } from 'lucide-react';

export default function DigiLockerModal({ onClose, onDigiLockerSuccess }) {
  const [step, setStep] = useState('auth'); // 'auth' | 'fetching' | 'success'
  const [aadhaarNo, setAadhaarNo] = useState('9918 2049 8812');

  const handleConnect = (e) => {
    e?.preventDefault();
    setStep('fetching');

    setTimeout(() => {
      setStep('success');
      const verifiedData = {
        isDigiLockerVerified: true,
        aadhaarNumber: aadhaarNo,
        verifiedDocs: [
          { docType: 'Aadhaar Card', issuer: 'UIDAI', docNumber: '9918-2049-8812', verifiedDate: '2026-09-15' },
          { docType: 'Driving License', issuer: 'Ministry of Road Transport', docNumber: 'KA-01-2022-00912', verifiedDate: '2026-08-20' },
          { docType: 'Income Certificate', issuer: 'Revenue Department Karnataka', docNumber: 'RD-2026-88192', verifiedDate: '2026-09-01' },
          { docType: 'BPL Ration Card', issuer: 'Food & Civil Supplies', docNumber: 'RC-560001-992', verifiedDate: '2026-07-10' }
        ],
        instantEligibilityScore: 98,
        eligibleSchemesCount: 7
      };

      if (onDigiLockerSuccess) onDigiLockerSuccess(verifiedData);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#102A43]/85 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-lg border border-[#E7E5DF] p-6 space-y-5 relative shadow-2xl animate-editorial-reveal text-[#1F2933]">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-md bg-[#F8F7F2] hover:bg-[#E7E5DF] text-[#52606D] transition"
        >
          <X className="w-5 h-5" />
        </button>

        {step === 'auth' && (
          <div className="space-y-4">
            <div className="flex items-center space-x-3 border-b border-[#E7E5DF] pb-3">
              <div className="w-10 h-10 rounded-md bg-[#167D5A]/10 border border-[#167D5A]/30 flex items-center justify-center text-[#167D5A]">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#102A43] font-editorial">DigiLocker Authentication</h3>
                <p className="text-xs text-[#52606D]">Fetch verified documents & instant eligibility</p>
              </div>
            </div>

            <form onSubmit={handleConnect} className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#102A43]">Enter Aadhaar / Mobile Number:</label>
                <input
                  type="text"
                  value={aadhaarNo}
                  onChange={(e) => setAadhaarNo(e.target.value)}
                  className="w-full bg-[#F8F7F2] border border-[#E7E5DF] rounded-md px-3 py-2 text-xs font-mono text-[#1F2933]"
                />
              </div>

              <div className="p-3 bg-[#167D5A]/10 border border-[#167D5A]/20 rounded-md text-[11px] text-[#167D5A] font-medium space-y-1">
                <div className="flex items-center space-x-1 font-bold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Verified Government Identity Vault</span>
                </div>
                <p>Authenticates your identity and imports verified Aadhaar, License, and Income certificates directly into your citizen profile.</p>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#167D5A] hover:bg-[#0F5C41] text-white font-bold text-xs rounded-md shadow transition flex items-center justify-center space-x-2"
              >
                <span>Authenticate with DigiLocker</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}

        {step === 'fetching' && (
          <div className="py-8 text-center space-y-3">
            <div className="w-10 h-10 rounded-full border-4 border-[#167D5A] border-t-transparent animate-spin mx-auto" />
            <h4 className="text-sm font-bold text-[#102A43] font-editorial">Connecting to DigiLocker Vault...</h4>
            <p className="text-xs text-[#52606D]">Importing verified Aadhaar, DL, and Income credentials</p>
          </div>
        )}

        {step === 'success' && (
          <div className="space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-[#167D5A]/10 border border-[#167D5A] text-[#167D5A] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>

            <div>
              <h3 className="text-base font-bold text-[#102A43] font-editorial">DigiLocker Verified!</h3>
              <p className="text-xs text-[#52606D]">4 Verified Documents Imported into Citizen Profile</p>
            </div>

            <div className="bg-[#F8F7F2] p-4 rounded-md border border-[#E7E5DF] text-left text-xs space-y-2">
              <div className="flex items-center justify-between text-[#167D5A] font-bold">
                <span>Instant Eligibility Score:</span>
                <span className="bg-[#167D5A]/10 px-2 py-0.5 rounded border border-[#167D5A]/20">98% Match</span>
              </div>
              <p className="text-[11px] text-[#52606D]">Based on your verified credentials, you qualify for 7 high-benefit central & state schemes.</p>
            </div>

            <button
              onClick={onClose}
              className="w-full py-2.5 bg-[#102A43] hover:bg-[#1F2933] text-white font-bold text-xs rounded-md transition"
            >
              Continue to Dashboard
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
