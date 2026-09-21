import React, { useState } from 'react';
import { User, Lock, Mail, ShieldCheck, ArrowRight, X, Sparkles } from 'lucide-react';

export default function UserAuthModal({ onClose, onLoginSuccess, onOpenDigiLocker }) {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('rajesh.kumar@citizen.in');
  const [password, setPassword] = useState('password123');
  const [name, setName] = useState('Rajesh Kumar');

  const handleSubmit = (e) => {
    e.preventDefault();
    const userSession = {
      isLoggedIn: true,
      name: isRegister ? name : 'Rajesh Kumar',
      email: email,
      isDigiLockerVerified: true,
      city: 'Bangalore, Karnataka',
      instantEligibility: [
        'IGNOAPS Old Age Pension (₹2,500/mo)',
        'Ayushman Bharat Health Cover (₹5 Lakh)',
        'Electricity & Water Transfer Relocation',
        'PM SVANidhi Micro-Credit Loan'
      ]
    };

    if (onLoginSuccess) onLoginSuccess(userSession);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#102A43]/85 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-lg border border-[#E7E5DF] p-6 space-y-5 relative shadow-2xl text-[#1F2933]">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-md bg-[#F8F7F2] hover:bg-[#E7E5DF] text-[#52606D] transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-1 border-b border-[#E7E5DF] pb-3">
          <h3 className="text-lg font-bold text-[#102A43] font-editorial">
            {isRegister ? 'Register Citizen Profile' : 'Citizen Portal Login'}
          </h3>
          <p className="text-xs text-[#52606D]">Access saved services, pending requests & instant eligibility</p>
        </div>

        {/* DigiLocker Shortcut CTA */}
        <button
          onClick={() => {
            onClose();
            onOpenDigiLocker();
          }}
          className="w-full py-2.5 px-3 bg-[#167D5A]/10 border border-[#167D5A]/30 text-[#167D5A] hover:bg-[#167D5A]/20 text-xs font-bold rounded-md flex items-center justify-center space-x-2 transition"
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Authenticate & Login with DigiLocker 🔒</span>
        </button>

        <div className="flex items-center space-x-2 text-[11px] text-[#52606D]">
          <div className="flex-1 h-px bg-[#E7E5DF]" />
          <span>or sign in with email</span>
          <div className="flex-1 h-px bg-[#E7E5DF]" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          {isRegister && (
            <div className="space-y-1">
              <label className="font-semibold text-[#102A43]">Full Name:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#F8F7F2] border border-[#E7E5DF] rounded-md px-3 py-2 text-[#1F2933]"
              />
            </div>
          )}

          <div className="space-y-1">
            <label className="font-semibold text-[#102A43]">Email Address:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#F8F7F2] border border-[#E7E5DF] rounded-md px-3 py-2 text-[#1F2933]"
            />
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-[#102A43]">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#F8F7F2] border border-[#E7E5DF] rounded-md px-3 py-2 text-[#1F2933]"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-[#102A43] hover:bg-[#1F2933] text-white text-xs font-bold rounded-md transition shadow-sm"
          >
            {isRegister ? 'Create Profile & Login' : 'Login to User Portal'}
          </button>
        </form>

        <div className="text-center text-xs">
          <button
            onClick={() => setIsRegister(!isRegister)}
            className="text-[#D97706] font-semibold hover:underline"
          >
            {isRegister ? 'Already have an account? Login' : "Don't have an account? Register"}
          </button>
        </div>

      </div>
    </div>
  );
}
