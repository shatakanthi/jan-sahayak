import React, { useState } from 'react';
import { User, Lock, Mail, ShieldCheck, ArrowRight, X, Sparkles, Download } from 'lucide-react';

export default function UserAuthModal({ onClose, onLoginSuccess, onOpenDigiLocker }) {
  const [isRegister, setIsRegister] = useState(true);
  const [name, setName] = useState('Rajesh Kumar');
  const [email, setEmail] = useState('rajesh.kumar@citizen.in');
  const [age, setAge] = useState('42');
  const [aadhaarNo, setAadhaarNo] = useState('9918-2049-8812');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newUser = {
      name,
      email,
      age,
      aadhaarNo,
      registeredAt: new Date().toISOString()
    };

    // Trigger Automatic Excel/CSV file generation of user dataset
    const headers = ['Full Name', 'Email ID', 'Age', 'Aadhaar Number', 'Registration Timestamp'];
    const row = [name, email, age, aadhaarNo, newUser.registeredAt];
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), row.join(',')].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Jan_Sahayak_User_${name.replace(/\s+/g, '_')}_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    const userSession = {
      isLoggedIn: true,
      name,
      email,
      age,
      aadhaarNo,
      isDigiLockerVerified: true
    };

    if (onLoginSuccess) onLoginSuccess(userSession);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0B2545]/85 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-xl border border-[#E2E8F0] p-6 space-y-4 relative shadow-2xl text-[#0B2545]">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-md bg-slate-100 hover:bg-slate-200 text-[#64748B] transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-1 border-b border-[#E2E8F0] pb-3">
          <h3 className="text-lg font-bold text-[#0B2545] font-editorial">
            {isRegister ? 'Citizen Registration' : 'Citizen Portal Login'}
          </h3>
          <p className="text-xs text-[#64748B]">Provide your information to create profile & auto-generate Excel registry</p>
        </div>

        {/* DigiLocker Shortcut CTA */}
        <button
          onClick={() => {
            onClose();
            onOpenDigiLocker();
          }}
          className="w-full py-2.5 px-3 bg-[#059669]/10 border border-[#059669]/30 text-[#059669] hover:bg-[#059669]/20 text-xs font-bold rounded-lg flex items-center justify-center space-x-2 transition"
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Authenticate & Login with DigiLocker 🔒</span>
        </button>

        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div className="space-y-1">
            <label className="font-semibold text-[#0B2545]">Full Name:</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg px-3 py-2 text-[#0B2545] font-medium"
            />
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-[#0B2545]">Email ID:</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg px-3 py-2 text-[#0B2545] font-medium"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <label className="font-semibold text-[#0B2545]">Age (Years):</label>
              <input
                type="number"
                required
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg px-3 py-2 text-[#0B2545] font-medium"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-[#0B2545]">Aadhaar Number:</label>
              <input
                type="text"
                required
                value={aadhaarNo}
                onChange={(e) => setAadhaarNo(e.target.value)}
                className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg px-3 py-2 font-mono text-[#0B2545]"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-[#0F4C81] hover:bg-[#0B2545] text-white text-xs font-bold rounded-lg transition shadow-sm flex items-center justify-center space-x-2"
          >
            <Download className="w-4 h-4 text-[#EA580C]" />
            <span>Save Profile & Export Excel Record</span>
          </button>
        </form>

      </div>
    </div>
  );
}
