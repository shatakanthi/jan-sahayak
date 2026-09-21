import React, { useState } from 'react';
import { MOCK_CITIZEN_ACCOUNT } from '../data/mockCitizenAccount';
import { UserCheck, Clock, CreditCard, Bookmark, ShieldCheck, Download, FileText, CheckCircle2, Lock, Sparkles, Filter } from 'lucide-react';

export default function Dashboard({ 
  accountData = MOCK_CITIZEN_ACCOUNT, 
  onSimulatePay, 
  onSelectScheme,
  onOpenDigiLocker,
  userSession,
  t 
}) {
  // Page 1: Overview & DigiLocker Vault | Page 2: Applications & Excel Export
  const [dashboardPage, setDashboardPage] = useState(1);
  const [exportedSuccess, setExportedSuccess] = useState(false);

  // Helper to export user data into CSV / Excel file
  const handleExportUserExcel = () => {
    const headers = ['Citizen ID', 'Name', 'Age', 'City', 'DigiLocker Status', 'Active Applications', 'Pending Bills Count', 'Eligibility Score'];
    const row = [
      accountData.citizenId,
      accountData.name,
      accountData.age,
      accountData.city,
      accountData.aadhaarStatus,
      accountData.activeApplications.length,
      accountData.pendingBills.length,
      '98%'
    ];

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), row.join(',')].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Jan_Sahayak_User_Registry_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setExportedSuccess(true);
    setTimeout(() => setExportedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 pb-24 text-[#16796F]">
      
      {/* Dashboard Top Navigation & Two-Page Switcher */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#B7BDA9] pb-4">
        <div>
          <span className="text-[11px] font-bold text-[#148B4B] uppercase tracking-widest">CITIZEN PORTAL</span>
          <h2 className="text-2xl font-bold text-[#16796F] font-editorial">
            Welcome back, {accountData.name}
          </h2>
          <p className="text-xs text-[#599D9C]">Citizen ID: {accountData.citizenId} • {accountData.city}</p>
        </div>

        {/* Two Page Selector Buttons */}
        <div className="bg-[#B7BDA9]/40 p-1 rounded-md flex space-x-1">
          <button
            onClick={() => setDashboardPage(1)}
            className={`px-4 py-2 text-xs font-bold rounded-md transition ${
              dashboardPage === 1 ? 'bg-[#16796F] text-white shadow-sm' : 'text-[#599D9C] hover:text-[#16796F]'
            }`}
          >
            Page 1: Overview & DigiLocker Vault
          </button>

          <button
            onClick={() => setDashboardPage(2)}
            className={`px-4 py-2 text-xs font-bold rounded-md transition ${
              dashboardPage === 2 ? 'bg-[#16796F] text-white shadow-sm' : 'text-[#599D9C] hover:text-[#16796F]'
            }`}
          >
            Page 2: Applications & Excel Export
          </button>
        </div>
      </div>

      {/* ================= PAGE 1: OVERVIEW & DIGILOCKER VAULT ================= */}
      {dashboardPage === 1 && (
        <div className="space-y-6 animate-editorial-reveal">
          
          {/* DigiLocker Status & Instant Eligibility Card */}
          <div className="jan-card p-6 rounded-lg space-y-4 border-l-4 border-l-[#148B4B]">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-md bg-[#148B4B]/10 border border-[#148B4B]/30 flex items-center justify-center text-[#148B4B]">
                  <Lock className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="text-base font-bold text-[#16796F] font-editorial">DigiLocker Verified Profile</h3>
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded bg-[#148B4B]/10 text-[#148B4B] border border-[#148B4B]/30">
                      🔒 Verified
                    </span>
                  </div>
                  <p className="text-xs text-[#599D9C]">Aadhaar: 9918-2049-8812 • Verified by UIDAI & Revenue Dept</p>
                </div>
              </div>

              <button
                onClick={onOpenDigiLocker}
                className="px-4 py-2 bg-[#148B4B] hover:bg-[#106f3c] text-white text-xs font-bold rounded-md transition shadow-sm"
              >
                Re-Authenticate DigiLocker
              </button>
            </div>

            {/* Instant Eligibility Display */}
            <div className="pt-3 border-t border-[#B7BDA9] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#16796F] uppercase tracking-wider flex items-center space-x-1.5">
                  <Sparkles className="w-4 h-4 text-[#148B4B]" />
                  <span>Instant Eligibility & Pre-Verified Requirements</span>
                </span>
                <span className="text-xs font-bold text-[#148B4B]">Score: 98% Match</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 bg-[#F4F6F3] rounded border border-[#B7BDA9] text-[#16796F] font-medium flex items-center justify-between">
                  <span>IGNOAPS Old Age Pension (₹2,500/mo)</span>
                  <span className="text-[10px] font-bold text-[#148B4B]">Eligible</span>
                </div>
                <div className="p-2.5 bg-[#F4F6F3] rounded border border-[#B7BDA9] text-[#16796F] font-medium flex items-center justify-between">
                  <span>Ayushman Bharat Health Cover (₹5 Lakh)</span>
                  <span className="text-[10px] font-bold text-[#148B4B]">Eligible</span>
                </div>
                <div className="p-2.5 bg-[#F4F6F3] rounded border border-[#B7BDA9] text-[#16796F] font-medium flex items-center justify-between">
                  <span>BESCOM Electricity & Water Transfer</span>
                  <span className="text-[10px] font-bold text-[#148B4B]">Verified</span>
                </div>
                <div className="p-2.5 bg-[#F4F6F3] rounded border border-[#B7BDA9] text-[#16796F] font-medium flex items-center justify-between">
                  <span>PM SVANidhi Micro-Credit Loan</span>
                  <span className="text-[10px] font-bold text-[#148B4B]">Eligible</span>
                </div>
              </div>
            </div>

          </div>

          {/* Pending Bills Grid */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-[#16796F] uppercase tracking-wider font-editorial">
              Pending Utility Bills ({accountData.pendingBills.length})
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {accountData.pendingBills.map((bill, idx) => (
                <div key={idx} className="jan-card p-4 rounded-lg space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-[#599D9C] uppercase">{bill.provider}</span>
                      <h4 className="text-sm font-bold text-[#16796F] mt-0.5">{bill.title}</h4>
                    </div>
                    <span className="text-base font-bold text-[#148B4B]">₹{bill.amount}</span>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-2 border-t border-[#B7BDA9]">
                    <span className="text-[#599D9C]">Due: {bill.dueDate}</span>
                    <button
                      onClick={() => onSimulatePay(bill)}
                      className="px-3.5 py-1.5 bg-[#148B4B] hover:bg-[#106f3c] text-white font-bold text-xs rounded-md transition shadow-sm"
                    >
                      Pay ₹{bill.amount} (Simulated)
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* ================= PAGE 2: APPLICATIONS & EXCEL EXPORT ================= */}
      {dashboardPage === 2 && (
        <div className="space-y-6 animate-editorial-reveal">
          
          {/* Excel Export Action Header */}
          <div className="p-5 rounded-lg border border-[#B7BDA9] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-[#F4F6F3]">
            <div>
              <h3 className="text-base font-bold text-[#16796F] font-editorial">Citizen Registry Data Exporter</h3>
              <p className="text-xs text-[#599D9C]">Export complete citizen profiles, DigiLocker verification statuses, and application records to Excel/CSV.</p>
            </div>

            <button
              onClick={handleExportUserExcel}
              className="px-5 py-2.5 bg-[#16796F] hover:bg-[#148B4B] text-white font-bold text-xs rounded-md shadow transition flex items-center space-x-2 shrink-0"
            >
              <Download className="w-4 h-4 text-[#B7BDA9]" />
              <span>Export User Data (Excel / CSV)</span>
            </button>
          </div>

          {exportedSuccess && (
            <div className="p-3 bg-[#148B4B]/10 border border-[#148B4B]/30 text-[#148B4B] text-xs font-bold rounded-md flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>User Registry Excel/CSV file downloaded successfully!</span>
            </div>
          )}

          {/* Active Applications Timeline List */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-[#16796F] uppercase tracking-wider font-editorial">
              Active Application Records ({accountData.activeApplications.length})
            </h3>

            {accountData.activeApplications.map((app, idx) => (
              <div key={idx} className="jan-card p-5 rounded-lg space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-[#16796F] uppercase tracking-wider">
                      {app.sector} • REF: {app.appId}
                    </span>
                    <h4 className="text-base font-bold text-[#16796F] mt-0.5 font-editorial">{app.serviceName}</h4>
                    <p className="text-xs text-[#599D9C]">Applied Date: {app.appliedDate}</p>
                  </div>

                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#148B4B]/10 text-[#148B4B] border border-[#148B4B]/20">
                    {app.status}
                  </span>
                </div>

                <div className="p-3 bg-[#F4F6F3] rounded border border-[#B7BDA9] flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-2 text-[#16796F]">
                    <Clock className="w-4 h-4 text-[#148B4B]" />
                    <span>Current Stage: <strong>{app.currentStage}</strong></span>
                  </div>
                  <span className="text-[#599D9C] text-[11px]">Est. Completion: {app.estimatedCompletion}</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

    </div>
  );
}
