import React, { useState } from 'react';
import { User, Lock, Mail, ShieldCheck, ArrowRight, X, Sparkles, Download } from 'lucide-react';

export default function UserAuthModal({ onClose, onLoginSuccess, onOpenDigiLocker, currentUserSession }) {
  const [isRegister, setIsRegister] = useState(true);
  const [name, setName] = useState(currentUserSession?.name || '');
  const [email, setEmail] = useState(currentUserSession?.email || '');
  const [age, setAge] = useState(currentUserSession?.age || '');
  const [aadhaarNo, setAadhaarNo] = useState(currentUserSession?.aadhaarNo || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    
    const newUser = {
      name,
      email,
      age,
      aadhaarNo,
      registeredAt: new Date().toISOString()
    };

    // Trigger Automatic Excel/CSV file download of user dataset
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
    <div className="fixed inset-0 z-50 bg-[#324a60]/85 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-xl border border-[#896e6a] p-6 space-y-4 relative shadow-2xl text-[#383b3d]">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-md bg-[#F8F9FA] hover:bg-slate-200 text-[#896e6a] transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-1 border-b border-[#896e6a] pb-3">
          <h3 className="text-lg font-bold text-[#324a60] font-editorial">
            {isRegister ? 'Citizen Registration & Profile Setup' : 'Citizen Portal Login'}
          </h3>
          <p className="text-xs text-[#896e6a]">Enter your personal details to update profile & auto-generate Excel registry</p>
        </div>

        {/* DigiLocker Shortcut CTA */}
        <button
          onClick={() => {
            onClose();
            onOpenDigiLocker();
          }}
          className="w-full py-2.5 px-3 bg-[#74744a]/10 border border-[#74744a]/30 text-[#74744a] hover:bg-[#74744a]/20 text-xs font-bold rounded-lg flex items-center justify-center space-x-2 transition"
        >
          <ShieldCheck className="w-4 h-4 text-[#74744a]" />
          <span className="text-[#324a60]">Authenticate & Login with DigiLocker 🔒</span>
        </button>

        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div className="space-y-1">
            <label className="font-bold text-[#324a60]">Full Name:</label>
            <input
              type="text"
              required
              placeholder="e.g. Ramesh Kumar"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#F8F9FA] border border-[#896e6a] rounded-lg px-3 py-2 text-[#383b3d] font-medium focus:outline-none focus:border-[#e8ab16]"
            />
          </div>

          <div className="space-y-1">
            <label className="font-bold text-[#324a60]">Email ID:</label>
            <input
              type="email"
              required
              placeholder="e.g. ramesh@citizen.in"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#F8F9FA] border border-[#896e6a] rounded-lg px-3 py-2 text-[#383b3d] font-medium focus:outline-none focus:border-[#e8ab16]"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <label className="font-bold text-[#324a60]">Age (Years):</label>
              <input
                type="number"
                required
                placeholder="e.g. 35"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full bg-[#F8F9FA] border border-[#896e6a] rounded-lg px-3 py-2 text-[#383b3d] font-medium focus:outline-none focus:border-[#e8ab16]"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-[#324a60]">Aadhaar Number:</label>
              <input
                type="text"
                required
                placeholder="12-Digit Aadhaar"
                value={aadhaarNo}
                onChange={(e) => setAadhaarNo(e.target.value)}
                className="w-full bg-[#F8F9FA] border border-[#896e6a] rounded-lg px-3 py-2 font-mono text-[#383b3d] focus:outline-none focus:border-[#e8ab16]"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-[#e8ab16] hover:bg-[#d19910] text-[#383b3d] text-xs font-bold rounded-lg transition shadow flex items-center justify-center space-x-2"
          >
            <Download className="w-4 h-4 text-[#324a60]" />
            <span>Save Profile & Export Excel Record</span>
          </button>
        </form>

      </div>
    </div>
  );
}
