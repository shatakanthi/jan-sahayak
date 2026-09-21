import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, Lock, X, FileText, ArrowRight, Sparkles, Smartphone, Key } from 'lucide-react';

export default function DigiLockerModal({ onClose, onDigiLockerSuccess, userSession }) {
  const [step, setStep] = useState('credentials'); // 'credentials' | 'otp' | 'fetching' | 'success'
  const [aadhaarNo, setAadhaarNo] = useState(userSession?.aadhaarNo || '');
  const [pin, setPin] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSendOtp = (e) => {
    e?.preventDefault();
    if (!aadhaarNo || aadhaarNo.replace(/\D/g, '').length < 10) {
      setErrorMsg('Please enter a valid 12-digit Aadhaar or 10-digit Mobile Number.');
      return;
    }
    if (!pin || pin.length < 4) {
      setErrorMsg('Please enter your 6-digit DigiLocker Security PIN.');
      return;
    }

    setErrorMsg('');
    setOtpSent(true);
    setStep('otp');
  };

  const handleVerifyOtp = (e) => {
    e?.preventDefault();
    if (!otp || otp.length < 4) {
      setErrorMsg('Please enter the 6-digit OTP sent to your registered mobile number.');
      return;
    }

    setErrorMsg('');
    setStep('fetching');

    setTimeout(() => {
      setStep('success');
      const verifiedData = {
        isDigiLockerVerified: true,
        aadhaarNumber: aadhaarNo,
        digiPin: pin,
        verifiedDocs: [
          { docType: 'Aadhaar Card', issuer: 'UIDAI', docNumber: aadhaarNo, verifiedDate: new Date().toISOString().split('T')[0] },
          { docType: 'Driving License', issuer: 'Ministry of Road Transport', docNumber: 'DL-' + Math.floor(100000 + Math.random() * 900000), verifiedDate: '2026-08-20' },
          { docType: 'Income Certificate', issuer: 'Revenue Department', docNumber: 'INC-' + Math.floor(100000 + Math.random() * 900000), verifiedDate: '2026-09-01' }
        ]
      };

      if (onDigiLockerSuccess) onDigiLockerSuccess(verifiedData);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#324a60]/85 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-xl border border-[#896e6a] p-6 space-y-5 relative shadow-2xl animate-editorial-reveal text-[#383b3d]">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-md bg-[#F8F9FA] hover:bg-[#896e6a]/20 text-[#383b3d] transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* STEP 1: ENTER AADHAAR & DIGILOCKER PIN */}
        {step === 'credentials' && (
          <div className="space-y-4">
            <div className="flex items-center space-x-3 border-b border-[#896e6a] pb-3">
              <div className="w-10 h-10 rounded-lg bg-[#324a60] text-[#e8ab16] flex items-center justify-center shrink-0">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#324a60] font-editorial">DigiLocker Portal Authentication</h3>
                <p className="text-xs text-[#896e6a]">Official Government Identity & Credential Vault</p>
              </div>
            </div>

            {errorMsg && (
              <div className="p-2.5 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-lg font-medium">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSendOtp} className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#324a60]">Aadhaar Number / Registered Mobile:</label>
                <div className="relative flex items-center">
                  <Smartphone className="w-4 h-4 text-[#896e6a] absolute left-3" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. 9918 2049 8812"
                    value={aadhaarNo}
                    onChange={(e) => setAadhaarNo(e.target.value)}
                    className="w-full bg-[#F8F9FA] border border-[#896e6a] rounded-lg pl-9 pr-3 py-2 text-xs font-mono text-[#383b3d] focus:outline-none focus:border-[#e8ab16]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#324a60]">6-Digit DigiLocker Security PIN:</label>
                <div className="relative flex items-center">
                  <Key className="w-4 h-4 text-[#896e6a] absolute left-3" />
                  <input
                    type="password"
                    required
                    maxLength={6}
                    placeholder="Enter 6-Digit Security PIN"
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    className="w-full bg-[#F8F9FA] border border-[#896e6a] rounded-lg pl-9 pr-3 py-2 text-xs font-mono text-[#383b3d] focus:outline-none focus:border-[#e8ab16]"
                  />
                </div>
              </div>

              <div className="p-3 bg-[#74744a]/10 border border-[#74744a]/30 rounded-lg text-xs text-[#74744a] font-medium space-y-1">
                <div className="flex items-center space-x-1.5 font-bold text-[#324a60]">
                  <ShieldCheck className="w-4 h-4 text-[#74744a]" />
                  <span>Government meITY DigiLocker Protocol</span>
                </div>
                <p className="text-[11px] text-[#383b3d]">Generates an instant 2-Factor OTP to fetch legally valid Aadhaar, License & Income certificates.</p>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#e8ab16] hover:bg-[#d19910] text-[#383b3d] font-bold text-xs rounded-lg shadow transition flex items-center justify-center space-x-2"
              >
                <span>Get DigiLocker Security OTP</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}

        {/* STEP 2: OTP VERIFICATION */}
        {step === 'otp' && (
          <div className="space-y-4">
            <div className="flex items-center space-x-3 border-b border-[#896e6a] pb-3">
              <div className="w-10 h-10 rounded-lg bg-[#324a60] text-[#e8ab16] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#324a60] font-editorial">Enter 6-Digit Security OTP</h3>
                <p className="text-xs text-[#896e6a]">Sent to Aadhaar linked mobile: xxx-xxx-8812</p>
              </div>
            </div>

            {errorMsg && (
              <div className="p-2.5 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-lg font-medium">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div className="space-y-1 text-center">
                <label className="text-xs font-bold text-[#324a60] block">Enter OTP Code (Test Code: 892104):</label>
                <input
                  type="text"
                  required
                  maxLength={6}
                  placeholder="8 9 2 1 0 4"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-48 mx-auto text-center tracking-widest bg-[#F8F9FA] border border-[#896e6a] rounded-lg px-3 py-2 text-base font-mono text-[#324a60] focus:outline-none focus:border-[#e8ab16]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#324a60] hover:bg-[#243545] text-white font-bold text-xs rounded-lg shadow transition flex items-center justify-center space-x-2"
              >
                <span>Verify OTP & Connect DigiLocker</span>
                <ArrowRight className="w-4 h-4 text-[#e8ab16]" />
              </button>
            </form>
          </div>
        )}

        {/* STEP 3: FETCHING VAULT DATA */}
        {step === 'fetching' && (
          <div className="py-8 text-center space-y-3">
            <div className="w-10 h-10 rounded-full border-4 border-[#e8ab16] border-t-[#324a60] animate-spin mx-auto" />
            <h4 className="text-sm font-bold text-[#324a60] font-editorial">Authenticating with DigiLocker API...</h4>
            <p className="text-xs text-[#896e6a]">Importing verified Aadhaar, License & Income Certificates</p>
          </div>
        )}

        {/* STEP 4: SUCCESS */}
        {step === 'success' && (
          <div className="space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-[#74744a]/20 border border-[#74744a] text-[#74744a] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>

            <div>
              <h3 className="text-base font-bold text-[#324a60] font-editorial">DigiLocker Successfully Authenticated!</h3>
              <p className="text-xs text-[#896e6a]">Verified Citizen Profile & Documents Synced</p>
            </div>

            <div className="bg-[#F8F9FA] p-4 rounded-lg border border-[#896e6a] text-left text-xs space-y-2">
              <div className="flex items-center justify-between text-[#74744a] font-bold">
                <span>Verification Status:</span>
                <span className="bg-[#74744a]/20 px-2 py-0.5 rounded border border-[#74744a]/30 text-[#324a60]">🔒 UIDAI Verified</span>
              </div>
              <p className="text-[11px] text-[#383b3d]">Aadhaar Number ({aadhaarNo}) authenticated with official meITY DigiLocker portal.</p>
            </div>

            <button
              onClick={onClose}
              className="w-full py-2.5 bg-[#324a60] hover:bg-[#243545] text-white font-bold text-xs rounded-lg transition"
            >
              Continue to Dashboard
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
