import React, { useState } from 'react';
import { MOCK_CITIZEN_ACCOUNT } from '../data/mockCitizenAccount';
import { LOCALITIES } from '../data/mockLocalityData';
import { UserCheck, Clock, CreditCard, Bookmark, ShieldCheck, Download, FileText, CheckCircle2, Lock, Sparkles, Filter, MapPin, Phone, Mail, Building2 } from 'lucide-react';

export default function Dashboard({ 
  accountData = MOCK_CITIZEN_ACCOUNT, 
  onSimulatePay, 
  onSelectScheme,
  onOpenDigiLocker,
  userSession,
  selectedLocality = 'bangalore-urban',
  t = (k) => k
}) {
  // Page 1: Overview & DigiLocker Vault | Page 2: Applications & Excel Export
  const [dashboardPage, setDashboardPage] = useState(1);
  const [exportedSuccess, setExportedSuccess] = useState(false);

  // Helper to export user data into CSV / Excel file
  const handleExportUserExcel = () => {
    const headers = ['Citizen ID', 'Name', 'Age', 'Aadhaar Status', 'Active Applications', 'Pending Bills Count', 'Eligibility Score'];
    const row = [
      accountData.citizenId,
      userSession?.name || accountData.name,
      userSession?.age || accountData.age,
      userSession?.isDigiLockerVerified ? 'DigiLocker Verified 🔒' : accountData.aadhaarStatus,
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

  const displayName = userSession?.name || accountData.name;
  const displayAadhaar = userSession?.aadhaarNo || '9918-2049-8812';
  const activeLocalityObj = LOCALITIES.find(l => l.id === selectedLocality) || LOCALITIES[0];

  return (
    <div className="space-y-6 pb-24 text-[#383b3d]">
      
      {/* Dashboard Top Navigation & Two-Page Switcher */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#896e6a] pb-4">
        <div>
          <span className="text-[11px] font-bold text-[#e8ab16] uppercase tracking-widest">{t('dashboardTab') || 'CITIZEN PORTAL'}</span>
          <h2 className="text-2xl font-bold text-[#324a60] font-editorial">
            Welcome back, {displayName}
          </h2>
          <p className="text-xs text-[#896e6a] flex items-center space-x-1.5 flex-wrap mt-0.5">
            <span>Citizen ID: {accountData.citizenId}</span>
            <span>•</span>
            <span>Locality: <strong>{activeLocalityObj.name}</strong></span>
          </p>
          {userSession?.fullAddress && (
            <p className="text-xs text-[#74744a] font-medium mt-1 flex items-center space-x-1">
              <MapPin className="w-3.5 h-3.5 text-[#e8ab16] shrink-0" />
              <span>{userSession.fullAddress}</span>
            </p>
          )}
        </div>

        {/* Two Page Selector Buttons */}
        <div className="bg-[#896e6a]/20 p-1 rounded-lg flex space-x-1">
          <button
            onClick={() => setDashboardPage(1)}
            className={`px-4 py-2 text-xs font-bold rounded-md transition ${
              dashboardPage === 1 ? 'bg-[#324a60] text-white shadow' : 'text-[#383b3d] hover:text-[#324a60]'
            }`}
          >
            {t('page1Overview') || 'Page 1: Overview & DigiLocker Vault'}
          </button>

          <button
            onClick={() => setDashboardPage(2)}
            className={`px-4 py-2 text-xs font-bold rounded-md transition ${
              dashboardPage === 2 ? 'bg-[#324a60] text-white shadow' : 'text-[#383b3d] hover:text-[#324a60]'
            }`}
          >
            {t('page2Tracker') || 'Page 2: Applications & Excel Export'}
          </button>
        </div>
      </div>

      {/* ================= PAGE 1: OVERVIEW & DIGILOCKER VAULT ================= */}
      {dashboardPage === 1 && (
        <div className="space-y-6 animate-editorial-reveal">
          
          {/* DigiLocker Status & Instant Eligibility Card */}
          <div className="jan-card p-6 rounded-xl space-y-4 border-l-4 border-l-[#74744a] bg-white border border-[#896e6a]">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-[#74744a]/10 border border-[#74744a]/30 flex items-center justify-center text-[#74744a]">
                  <Lock className="w-5 h-5 text-[#74744a]" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="text-base font-bold text-[#324a60] font-editorial">DigiLocker Verified Profile</h3>
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded bg-[#74744a]/10 text-[#74744a] border border-[#74744a]/30">
                      🔒 Verified
                    </span>
                  </div>
                  <p className="text-xs text-[#896e6a]">Aadhaar: {displayAadhaar} • Verified by UIDAI & Revenue Dept</p>
                </div>
              </div>

              <button
                onClick={onOpenDigiLocker}
                className="px-4 py-2 bg-[#e8ab16] hover:bg-[#d19910] text-[#383b3d] text-xs font-bold rounded-lg transition shadow"
              >
                Re-Authenticate DigiLocker
              </button>
            </div>

            {/* Instant Eligibility Display */}
            <div className="pt-3 border-t border-[#896e6a]/30 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#324a60] uppercase tracking-wider flex items-center space-x-1.5">
                  <Sparkles className="w-4 h-4 text-[#e8ab16]" />
                  <span>Instant Eligibility & Pre-Verified Requirements</span>
                </span>
                <span className="text-xs font-bold text-[#74744a]">Score: 98% Match</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 bg-[#F8F9FA] rounded-lg border border-[#896e6a]/40 text-[#324a60] font-medium flex items-center justify-between">
                  <span>IGNOAPS Old Age Pension (₹2,500/mo)</span>
                  <span className="text-[10px] font-bold text-[#74744a]">Eligible</span>
                </div>
                <div className="p-2.5 bg-[#F8F9FA] rounded-lg border border-[#896e6a]/40 text-[#324a60] font-medium flex items-center justify-between">
                  <span>Ayushman Bharat Health Cover (₹5 Lakh)</span>
                  <span className="text-[10px] font-bold text-[#74744a]">Eligible</span>
                </div>
                <div className="p-2.5 bg-[#F8F9FA] rounded-lg border border-[#896e6a]/40 text-[#324a60] font-medium flex items-center justify-between">
                  <span>BESCOM Electricity & Water Transfer</span>
                  <span className="text-[10px] font-bold text-[#74744a]">Verified</span>
                </div>
                <div className="p-2.5 bg-[#F8F9FA] rounded-lg border border-[#896e6a]/40 text-[#324a60] font-medium flex items-center justify-between">
                  <span>PM SVANidhi Micro-Credit Loan</span>
                  <span className="text-[10px] font-bold text-[#74744a]">Eligible</span>
                </div>
              </div>
            </div>

          </div>

          {/* Local Municipal Commission Head & Corporator Directory Card */}
          <div className="jan-card p-6 rounded-xl space-y-4 bg-white border border-[#896e6a] shadow-sm">
            <div className="flex items-center justify-between border-b border-[#896e6a]/30 pb-3">
              <div>
                <span className="text-[10px] font-bold text-[#e8ab16] uppercase tracking-wider">LOCAL GOVERNMENT CONTACT DIRECTORY</span>
                <h3 className="text-base font-bold text-[#324a60] font-editorial mt-0.5">Municipal Officials for {activeLocalityObj.name}</h3>
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded bg-[#324a60]/10 text-[#324a60] border border-[#324a60]/20">
                {activeLocalityObj.state}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              {/* Municipal Commissioner */}
              {activeLocalityObj.commissioner && (
                <div className="p-3 bg-[#F8F9FA] rounded-lg border border-[#896e6a]/40 space-y-1.5">
                  <div className="flex items-center space-x-1.5 font-bold text-[#324a60]">
                    <Building2 className="w-4 h-4 text-[#e8ab16]" />
                    <span>{activeLocalityObj.commissioner.title}</span>
                  </div>
                  <div className="text-sm font-bold text-[#383b3d]">{activeLocalityObj.commissioner.name}</div>
                  <div className="text-[11px] text-[#896e6a] flex items-center space-x-2 pt-1 border-t border-[#896e6a]/20">
                    <a href={`tel:${activeLocalityObj.commissioner.phone}`} className="hover:text-[#324a60] flex items-center space-x-1 font-mono">
                      <Phone className="w-3 h-3 text-[#74744a]" />
                      <span>{activeLocalityObj.commissioner.phone}</span>
                    </a>
                    {activeLocalityObj.commissioner.email && (
                      <a href={`mailto:${activeLocalityObj.commissioner.email}`} className="hover:text-[#324a60] flex items-center space-x-1 font-mono">
                        <Mail className="w-3 h-3 text-[#74744a]" />
                        <span className="truncate max-w-[130px]">{activeLocalityObj.commissioner.email}</span>
                      </a>
                    )}
                  </div>
                </div>
              )}

              {/* Ward Corporator */}
              {activeLocalityObj.corporator && (
                <div className="p-3 bg-[#F8F9FA] rounded-lg border border-[#896e6a]/40 space-y-1.5">
                  <div className="flex items-center space-x-1.5 font-bold text-[#324a60]">
                    <UserCheck className="w-4 h-4 text-[#e8ab16]" />
                    <span>{activeLocalityObj.corporator.title}</span>
                  </div>
                  <div className="text-sm font-bold text-[#383b3d]">{activeLocalityObj.corporator.name}</div>
                  <div className="text-[10px] text-[#74744a]">{activeLocalityObj.corporator.ward}</div>
                  <div className="text-[11px] text-[#896e6a] flex items-center space-x-2 pt-1 border-t border-[#896e6a]/20">
                    <a href={`tel:${activeLocalityObj.corporator.phone}`} className="hover:text-[#324a60] flex items-center space-x-1 font-mono font-bold">
                      <Phone className="w-3 h-3 text-[#74744a]" />
                      <span>{activeLocalityObj.corporator.phone}</span>
                    </a>
                  </div>
                </div>
              )}

              {/* Sarpanch / Panchayat President */}
              {activeLocalityObj.sarpanch && (
                <div className="p-3 bg-[#F8F9FA] rounded-lg border border-[#896e6a]/40 space-y-1.5">
                  <div className="flex items-center space-x-1.5 font-bold text-[#324a60]">
                    <Building2 className="w-4 h-4 text-[#e8ab16]" />
                    <span>{activeLocalityObj.sarpanch.title}</span>
                  </div>
                  <div className="text-sm font-bold text-[#383b3d]">{activeLocalityObj.sarpanch.name}</div>
                  <div className="text-[11px] text-[#896e6a] flex items-center space-x-2 pt-1 border-t border-[#896e6a]/20">
                    <a href={`tel:${activeLocalityObj.sarpanch.phone}`} className="hover:text-[#324a60] flex items-center space-x-1 font-mono">
                      <Phone className="w-3 h-3 text-[#74744a]" />
                      <span>{activeLocalityObj.sarpanch.phone}</span>
                    </a>
                  </div>
                </div>
              )}

              {/* Ward Officer */}
              {activeLocalityObj.wardOfficer && (
                <div className="p-3 bg-[#F8F9FA] rounded-lg border border-[#896e6a]/40 space-y-1.5">
                  <div className="flex items-center space-x-1.5 font-bold text-[#324a60]">
                    <MapPin className="w-4 h-4 text-[#e8ab16]" />
                    <span>Ward Officer & Help Hub</span>
                  </div>
                  <div className="text-sm font-bold text-[#383b3d]">{activeLocalityObj.wardOfficer.name}</div>
                  <div className="text-[10px] text-[#74744a] truncate">{activeLocalityObj.wardOfficer.office}</div>
                  <div className="text-[11px] text-[#896e6a] flex items-center space-x-2 pt-1 border-t border-[#896e6a]/20">
                    <a href={`tel:${activeLocalityObj.wardOfficer.phone}`} className="hover:text-[#324a60] flex items-center space-x-1 font-mono font-bold">
                      <Phone className="w-3 h-3 text-[#74744a]" />
                      <span>{activeLocalityObj.wardOfficer.phone}</span>
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Pending Bills Grid */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-[#324a60] uppercase tracking-wider font-editorial">
              Pending Utility Bills ({accountData.pendingBills.length})
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {accountData.pendingBills.map((bill, idx) => (
                <div key={idx} className="jan-card p-4 rounded-xl space-y-3 bg-white border border-[#896e6a]">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-[#896e6a] uppercase">{bill.provider}</span>
                      <h4 className="text-sm font-bold text-[#324a60] mt-0.5 font-editorial">{bill.title}</h4>
                    </div>
                    <span className="text-base font-bold text-[#74744a]">₹{bill.amount}</span>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-2 border-t border-[#896e6a]/30">
                    <span className="text-[#896e6a]">Due: {bill.dueDate}</span>
                    <button
                      onClick={() => onSimulatePay(bill)}
                      className="px-3.5 py-1.5 bg-[#324a60] hover:bg-[#243545] text-white font-bold text-xs rounded-lg transition shadow"
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
          <div className="p-5 rounded-xl border border-[#896e6a] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white shadow-sm">
            <div>
              <h3 className="text-base font-bold text-[#324a60] font-editorial">Citizen Registry Data Exporter</h3>
              <p className="text-xs text-[#896e6a]">Export complete citizen profiles, DigiLocker verification statuses, and application records to Excel/CSV.</p>
            </div>

            <button
              onClick={handleExportUserExcel}
              className="px-5 py-2.5 bg-[#e8ab16] hover:bg-[#d19910] text-[#383b3d] font-bold text-xs rounded-lg shadow transition flex items-center space-x-2 shrink-0"
            >
              <Download className="w-4 h-4 text-[#324a60]" />
              <span>{t('exportExcel') || 'Export User Data (Excel / CSV)'}</span>
            </button>
          </div>

          {exportedSuccess && (
            <div className="p-3 bg-[#74744a]/10 border border-[#74744a]/30 text-[#74744a] text-xs font-bold rounded-lg flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-[#74744a]" />
              <span className="text-[#324a60]">User Registry Excel/CSV file downloaded successfully!</span>
            </div>
          )}

          {/* Active Applications Timeline List */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-[#324a60] uppercase tracking-wider font-editorial">
              Active Application Records ({accountData.activeApplications.length})
            </h3>

            {accountData.activeApplications.map((app, idx) => (
              <div key={idx} className="jan-card p-5 rounded-xl space-y-3 bg-white border border-[#896e6a]">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-[#324a60] uppercase tracking-wider">
                      {app.sector} • REF: {app.appId}
                    </span>
                    <h4 className="text-base font-bold text-[#324a60] mt-0.5 font-editorial">{app.serviceName}</h4>
                    <p className="text-xs text-[#896e6a]">Applied Date: {app.appliedDate}</p>
                  </div>

                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#74744a]/10 text-[#74744a] border border-[#74744a]/30">
                    {app.status}
                  </span>
                </div>

                <div className="p-3 bg-[#F8F9FA] rounded-lg border border-[#896e6a]/30 flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-2 text-[#324a60]">
                    <Clock className="w-4 h-4 text-[#e8ab16]" />
                    <span>Current Stage: <strong>{app.currentStage}</strong></span>
                  </div>
                  <span className="text-[#896e6a] text-[11px]">Est. Completion: {app.estimatedCompletion}</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

    </div>
  );
}
