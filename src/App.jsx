import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import ProblemSearch from './components/ProblemSearch';
import SchemeWizard from './components/SchemeWizard';
import ObstacleResolverModal from './components/ObstacleResolverModal';
import LifeEventNavigator from './components/LifeEventNavigator';
import Dashboard from './components/Dashboard';
import AdminPanel from './components/AdminPanel';
import SchemeDetailModal from './components/SchemeDetailModal';
import ApiSettingsModal from './components/ApiSettingsModal';
import SimulatedPaymentModal from './components/SimulatedPaymentModal';
import UserAuthModal from './components/UserAuthModal';
import DigiLockerModal from './components/DigiLockerModal';
import { searchCitizenProblem } from './services/geminiService';
import { VERIFIED_SCHEMES } from './data/verifiedSchemes';
import { MOCK_CITIZEN_ACCOUNT } from './data/mockCitizenAccount';
import { getTranslation } from './data/translations';

export default function App() {
  const [activeTab, setActiveTab] = useState('search');
  const [isMobileFrame, setIsMobileFrame] = useState(false);
  const [currentLang, setCurrentLang] = useState('en');
  const [selectedLocality, setSelectedLocality] = useState('bangalore-urban');
  const [isAdminMode, setIsAdminMode] = useState(false);
  
  // Modals State
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isDigiLockerModalOpen, setIsDigiLockerModalOpen] = useState(false);
  
  // Dynamic User Session State (Editable per User Input)
  const [userSession, setUserSession] = useState({
    isLoggedIn: true,
    name: 'Citizen Profile',
    email: 'citizen@portal.in',
    age: '30',
    aadhaarNo: '9918-2049-8812',
    isDigiLockerVerified: false
  });

  const [apiKey, setApiKey] = useState(localStorage.getItem('gemini_api_key') || '');
  const [servicesCatalogue, setServicesCatalogue] = useState(VERIFIED_SCHEMES);
  const [citizenAccount, setCitizenAccount] = useState(MOCK_CITIZEN_ACCOUNT);
  
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState(null);
  
  const [selectedScheme, setSelectedScheme] = useState(null);
  const [selectedObstacle, setSelectedObstacle] = useState(null);
  const [payingBill, setPayingBill] = useState(null);

  const [profile, setProfile] = useState({
    age: 42,
    incomeCategory: 'Low Income (< ₹2.5L/yr)',
    occupation: 'Salaried / Commuter',
    state: 'Karnataka',
    documents: ['Aadhaar Card', 'Bank Passbook']
  });

  const t = (key) => getTranslation(currentLang, key);

  useEffect(() => {
    document.title = "Jan Sahayak | Government Service Discovery & DigiLocker Portal";
  }, []);

  useEffect(() => {
    handleSearch("I need senior citizen health cover & pension assistance");
  }, [selectedLocality, currentLang]);

  const handleSearch = async (userProblem) => {
    setLoading(true);
    try {
      const results = await searchCitizenProblem(userProblem, { ...profile, locality: selectedLocality }, apiKey);
      setSearchResults(results);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleResolveObstacle = (obstacleName) => {
    setSelectedObstacle(obstacleName);
    setActiveTab('obstacle');
  };

  const handleSimulateApply = (newApplication) => {
    setCitizenAccount(prev => ({
      ...prev,
      activeApplications: [newApplication, ...prev.activeApplications]
    }));
  };

  const handleSimulatePaymentComplete = (billId) => {
    setCitizenAccount(prev => ({
      ...prev,
      pendingBills: prev.pendingBills.filter(b => b.billId !== billId),
      transactionReceipts: [
        { receiptNo: 'RCP-2026-' + Math.floor(1000 + Math.random() * 9000), service: 'Utility Bill Payment', amount: payingBill?.amount || 500, date: new Date().toISOString().split('T')[0], status: 'Success (Simulated)' },
        ...prev.transactionReceipts
      ]
    }));
  };

  const handleAddAdminService = (newService) => {
    setServicesCatalogue(prev => [newService, ...prev]);
    if (searchResults) {
      setSearchResults(prev => ({
        ...prev,
        matchedSchemes: [newService, ...(prev?.matchedSchemes || [])]
      }));
    }
  };

  const handleDigiLockerSuccess = (digiData) => {
    setUserSession(prev => ({
      ...prev,
      isDigiLockerVerified: true,
      aadhaarNo: digiData.aadhaarNumber || prev.aadhaarNo,
      digiData: digiData
    }));

    setCitizenAccount(prev => ({
      ...prev,
      aadhaarStatus: 'DigiLocker Verified 🔒'
    }));
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#383b3d] flex flex-col items-center justify-start relative selection:bg-[#e8ab16] selection:text-[#383b3d] font-sans">
      
      {/* Main Container */}
      <div className={`w-full transition-all duration-300 ${
        isMobileFrame
          ? 'my-4 sm:my-8 mobile-device-frame bg-[#F8F9FA] flex flex-col overflow-hidden border-[#324a60] shadow-2xl'
          : 'min-h-screen flex flex-col'
      }`}>

        {/* Mobile Phone Top Notch */}
        {isMobileFrame && (
          <div className="w-full bg-[#324a60] pt-2 pb-1 flex justify-center items-center shrink-0 border-b border-[#896e6a]">
            <div className="w-20 h-4 bg-[#243545] rounded-full flex items-center justify-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#896e6a]" />
              <span className="w-8 h-1.5 rounded-full bg-[#896e6a]" />
            </div>
          </div>
        )}

        {/* Global Header */}
        <Header
          currentLang={currentLang}
          onLangChange={(lang) => setCurrentLang(lang)}
          selectedLocality={selectedLocality}
          onLocalityChange={(loc) => setSelectedLocality(loc)}
          onOpenApiKeyModal={() => setIsApiKeyModalOpen(true)}
          isMobileFrame={isMobileFrame}
          onToggleMobileFrame={() => setIsMobileFrame(!isMobileFrame)}
          isAdminMode={activeTab === 'admin'}
          onToggleAdminMode={() => setActiveTab(activeTab === 'admin' ? 'search' : 'admin')}
          activeTab={activeTab}
          onTabChange={(tab) => setActiveTab(tab)}
          hasApiKey={!!apiKey}
          onOpenLogin={() => setIsLoginModalOpen(true)}
          onOpenDigiLocker={() => setIsDigiLockerModalOpen(true)}
          isDigiLockerVerified={userSession.isDigiLockerVerified}
          userSession={userSession}
          t={t}
        />

        {/* Main Body Viewport */}
        <main className="flex-1 overflow-y-auto px-4 py-8 max-w-7xl w-full mx-auto space-y-8">
          
          {/* TAB 1: Search & Real-time Custom Query */}
          {activeTab === 'search' && (
            <div className="animate-editorial-reveal">
              <ProblemSearch
                onSearch={handleSearch}
                searchResults={searchResults}
                loading={loading}
                onSelectScheme={(scheme) => setSelectedScheme(scheme)}
                onResolveObstacle={handleResolveObstacle}
                onSimulateApply={handleSimulateApply}
                selectedLocality={selectedLocality}
                t={t}
                onNavigateWizard={() => setActiveTab('wizard')}
                onNavigateLifeEvents={() => setActiveTab('life-events')}
                onOpenDigiLocker={() => setIsDigiLockerModalOpen(true)}
                isDigiLockerVerified={userSession.isDigiLockerVerified}
              />
            </div>
          )}

          {/* TAB 2: Flagship Scheme Wizard */}
          {activeTab === 'wizard' && (
            <div className="animate-editorial-reveal">
              <SchemeWizard
                onSelectScheme={(scheme) => setSelectedScheme(scheme)}
                selectedLocality={selectedLocality}
                t={t}
              />
            </div>
          )}

          {/* TAB 3: Life Events Hub */}
          {activeTab === 'life-events' && (
            <div className="animate-editorial-reveal">
              <LifeEventNavigator
                onSelectLifeEvent={(evt) => console.log(evt)}
              />
            </div>
          )}

          {/* TAB 4: 2-Page Citizen Dashboard with DigiLocker Vault & User Excel Data Export */}
          {activeTab === 'dashboard' && (
            <div className="animate-editorial-reveal">
              <Dashboard
                accountData={citizenAccount}
                onSimulatePay={(bill) => setPayingBill(bill)}
                onSelectScheme={(scheme) => setSelectedScheme(scheme)}
                onOpenDigiLocker={() => setIsDigiLockerModalOpen(true)}
                userSession={userSession}
                selectedLocality={selectedLocality}
                t={t}
              />
            </div>
          )}

          {/* TAB 5: Obstacle Resolver & AI Assistant Chatbot */}
          {activeTab === 'obstacle' && (
            <div className="animate-editorial-reveal">
              <ObstacleResolverModal
                selectedObstacle={selectedObstacle}
                onClose={() => setSelectedObstacle(null)}
                t={t}
              />
            </div>
          )}

          {/* TAB 6: Government Admin Panel */}
          {activeTab === 'admin' && (
            <div className="animate-editorial-reveal">
              <AdminPanel
                t={t}
                services={servicesCatalogue}
                onAddService={handleAddAdminService}
              />
            </div>
          )}

        </main>

        {/* Mobile Bottom Navigation Bar */}
        <BottomNav
          activeTab={activeTab}
          onTabChange={(tab) => setActiveTab(tab)}
          t={t}
        />

      </div>

      {/* Scheme Detail Modal */}
      {selectedScheme && (
        <SchemeDetailModal
          scheme={selectedScheme}
          onClose={() => setSelectedScheme(null)}
          onResolveObstacle={handleResolveObstacle}
        />
      )}

      {/* API Key Modal */}
      {isApiKeyModalOpen && (
        <ApiSettingsModal
          onClose={() => setIsApiKeyModalOpen(false)}
          onSaveApiKey={(key) => setApiKey(key)}
        />
      )}

      {/* User Login & Registration Portal Modal */}
      {isLoginModalOpen && (
        <UserAuthModal
          onClose={() => setIsLoginModalOpen(false)}
          onLoginSuccess={(session) => setUserSession(session)}
          onOpenDigiLocker={() => setIsDigiLockerModalOpen(true)}
          currentUserSession={userSession}
        />
      )}

      {/* DigiLocker Authentication Modal */}
      {isDigiLockerModalOpen && (
        <DigiLockerModal
          onClose={() => setIsDigiLockerModalOpen(false)}
          onDigiLockerSuccess={handleDigiLockerSuccess}
          userSession={userSession}
        />
      )}

      {/* Simulated Payment Modal */}
      {payingBill && (
        <SimulatedPaymentModal
          bill={payingBill}
          onClose={() => setPayingBill(null)}
          onCompletePay={handleSimulatePaymentComplete}
        />
      )}

    </div>
  );
}
