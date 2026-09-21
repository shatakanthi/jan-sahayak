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
    <div className="space-y-6 pb-24 text-[#1F2933]">
      
      {/* Dashboard Top Navigation & Two-Page Switcher */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#E7E5DF] pb-4">
        <div>
          <span className="text-[11px] font-bold text-[#D97706] uppercase tracking-widest">CITIZEN PORTAL</span>
          <h2 className="text-2xl font-bold text-[#102A43] font-editorial">
            Welcome back, {accountData.name}
          </h2>
          <p className="text-xs text-[#52606D]">Citizen ID: {accountData.citizenId} • {accountData.city}</p>
        </div>

        {/* Two Page Selector Buttons */}
        <div className="bg-[#E7E5DF]/60 p-1 rounded-md flex space-x-1">
          <button
            onClick={() => setDashboardPage(1)}
            className={`px-4 py-2 text-xs font-bold rounded-md transition ${
              dashboardPage === 1 ? 'bg-[#102A43] text-white shadow-sm' : 'text-[#52606D] hover:text-[#1F2933]'
            }`}
          >
            Page 1: Overview & DigiLocker Vault
          </button>

          <button
            onClick={() => setDashboardPage(2)}
            className={`px-4 py-2 text-xs font-bold rounded-md transition ${
              dashboardPage === 2 ? 'bg-[#102A43] text-white shadow-sm' : 'text-[#52606D] hover:text-[#1F2933]'
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
          <div className="civic-card p-6 rounded-lg space-y-4 border-l-4 border-l-[#167D5A]">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-md bg-[#167D5A]/10 border border-[#167D5A]/30 flex items-center justify-center text-[#167D5A]">
                  <Lock className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="text-base font-bold text-[#102A43] font-editorial">DigiLocker Verified Profile</h3>
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded bg-[#167D5A]/10 text-[#167D5A] border border-[#167D5A]/30">
                      🔒 Verified
                    </span>
                  </div>
                  <p className="text-xs text-[#52606D]">Aadhaar: 9918-2049-8812 • Verified by UIDAI & Revenue Dept</p>
                </div>
              </div>

              <button
                onClick={onOpenDigiLocker}
                className="px-4 py-2 bg-[#167D5A] hover:bg-[#0F5C41] text-white text-xs font-bold rounded-md transition shadow-sm"
              >
                Re-Authenticate DigiLocker
              </button>
            </div>

            {/* Instant Eligibility Display */}
            <div className="pt-3 border-t border-[#E7E5DF] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#102A43] uppercase tracking-wider flex items-center space-x-1.5">
                  <Sparkles className="w-4 h-4 text-[#D97706]" />
                  <span>Instant Eligibility & Pre-Verified Requirements</span>
                </span>
                <span className="text-xs font-bold text-[#167D5A]">Score: 98% Match</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 bg-[#F8F7F2] rounded border border-[#E7E5DF] text-[#102A43] font-medium flex items-center justify-between">
                  <span>IGNOAPS Old Age Pension (₹2,500/mo)</span>
                  <span className="text-[10px] font-bold text-[#167D5A]">Eligible</span>
                </div>
                <div className="p-2.5 bg-[#F8F7F2] rounded border border-[#E7E5DF] text-[#102A43] font-medium flex items-center justify-between">
                  <span>Ayushman Bharat Health Cover (₹5 Lakh)</span>
                  <span className="text-[10px] font-bold text-[#167D5A]">Eligible</span>
                </div>
                <div className="p-2.5 bg-[#F8F7F2] rounded border border-[#E7E5DF] text-[#102A43] font-medium flex items-center justify-between">
                  <span>BESCOM Electricity & Water Transfer</span>
                  <span className="text-[10px] font-bold text-[#167D5A]">Verified</span>
                </div>
                <div className="p-2.5 bg-[#F8F7F2] rounded border border-[#E7E5DF] text-[#102A43] font-medium flex items-center justify-between">
                  <span>PM SVANidhi Micro-Credit Loan</span>
                  <span className="text-[10px] font-bold text-[#167D5A]">Eligible</span>
                </div>
              </div>
            </div>

          </div>

          {/* Pending Bills Grid */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-[#102A43] uppercase tracking-wider font-editorial">
              Pending Utility Bills ({accountData.pendingBills.length})
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {accountData.pendingBills.map((bill, idx) => (
                <div key={idx} className="civic-card p-4 rounded-lg space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-[#52606D] uppercase">{bill.provider}</span>
                      <h4 className="text-sm font-bold text-[#1F2933] mt-0.5">{bill.title}</h4>
                    </div>
                    <span className="text-base font-bold text-[#167D5A]">₹{bill.amount}</span>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-2 border-t border-[#E7E5DF]">
                    <span className="text-[#52606D]">Due: {bill.dueDate}</span>
                    <button
                      onClick={() => onSimulatePay(bill)}
                      className="px-3.5 py-1.5 bg-[#167D5A] hover:bg-[#0F5C41] text-white font-bold text-xs rounded-md transition shadow-sm"
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
          <div className="civic-panel p-5 rounded-lg border border-[#E7E5DF] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-[#F8F7F2]">
            <div>
              <h3 className="text-base font-bold text-[#102A43] font-editorial">Citizen Registry Data Exporter</h3>
              <p className="text-xs text-[#52606D]">Export complete citizen profiles, DigiLocker verification statuses, and application records to Excel/CSV.</p>
            </div>

            <button
              onClick={handleExportUserExcel}
              className="px-5 py-2.5 bg-[#102A43] hover:bg-[#1F2933] text-white font-bold text-xs rounded-md shadow transition flex items-center space-x-2 shrink-0"
            >
              <Download className="w-4 h-4 text-[#D97706]" />
              <span>Export User Data (Excel / CSV)</span>
            </button>
          </div>

          {exportedSuccess && (
            <div className="p-3 bg-[#167D5A]/10 border border-[#167D5A]/30 text-[#167D5A] text-xs font-bold rounded-md flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>User Registry Excel/CSV file downloaded successfully!</span>
            </div>
          )}

          {/* Active Applications Timeline List */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-[#102A43] uppercase tracking-wider font-editorial">
              Active Application Records ({accountData.activeApplications.length})
            </h3>

            {accountData.activeApplications.map((app, idx) => (
              <div key={idx} className="civic-card p-5 rounded-lg space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-[#102A43] uppercase tracking-wider">
                      {app.sector} • REF: {app.appId}
                    </span>
                    <h4 className="text-base font-bold text-[#1F2933] mt-0.5 font-editorial">{app.serviceName}</h4>
                    <p className="text-xs text-[#52606D]">Applied Date: {app.appliedDate}</p>
                  </div>

                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#D97706]/10 text-[#D97706] border border-[#D97706]/20">
                    {app.status}
                  </span>
                </div>

                <div className="p-3 bg-[#F8F7F2] rounded border border-[#E7E5DF] flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-2 text-[#102A43]">
                    <Clock className="w-4 h-4 text-[#D97706]" />
                    <span>Current Stage: <strong>{app.currentStage}</strong></span>
                  </div>
                  <span className="text-[#52606D] text-[11px]">Est. Completion: {app.estimatedCompletion}</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

    </div>
  );
}
