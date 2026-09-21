import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import ProblemSearch from './components/ProblemSearch';
import SchemeWizard from './components/SchemeWizard';
import JourneyGraph from './components/JourneyGraph';
import ObstacleResolverModal from './components/ObstacleResolverModal';
import LifeEventNavigator from './components/LifeEventNavigator';
import Dashboard from './components/Dashboard';
import AdminPanel from './components/AdminPanel';
import SchemeDetailModal from './components/SchemeDetailModal';
import ApiSettingsModal from './components/ApiSettingsModal';
import SimulatedPaymentModal from './components/SimulatedPaymentModal';
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
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);
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
    document.title = "Jan Sahayak | World-Class Government Scheme Discovery Portal";
  }, []);

  useEffect(() => {
    handleSearch(t('heroQuery'));
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

  return (
    <div className="min-h-screen bg-[#F8F7F2] text-[#1F2933] flex flex-col items-center justify-start relative selection:bg-[#D97706] selection:text-white font-sans">
      
      {/* Main Container */}
      <div className={`w-full transition-all duration-300 ${
        isMobileFrame
          ? 'my-4 sm:my-8 mobile-device-frame bg-[#F8F7F2] flex flex-col overflow-hidden border-[#102A43] shadow-2xl'
          : 'min-h-screen flex flex-col'
      }`}>

        {/* Mobile Phone Top Notch */}
        {isMobileFrame && (
          <div className="w-full bg-[#102A43] pt-2 pb-1 flex justify-center items-center shrink-0 border-b border-slate-800">
            <div className="w-20 h-4 bg-[#0B1D2D] rounded-full flex items-center justify-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-800" />
              <span className="w-8 h-1.5 rounded-full bg-slate-800" />
            </div>
          </div>
        )}

        {/* Global Institutional Header */}
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
          t={t}
        />

        {/* Main Body Viewport */}
        <main className="flex-1 overflow-y-auto px-4 py-8 max-w-7xl w-full mx-auto space-y-8">
          
          {/* TAB 1: Search & Home */}
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

          {/* TAB 4: Personalized Citizen Dashboard */}
          {activeTab === 'dashboard' && (
            <div className="animate-editorial-reveal">
              <Dashboard
                accountData={citizenAccount}
                onSimulatePay={(bill) => setPayingBill(bill)}
                onSelectScheme={(scheme) => setSelectedScheme(scheme)}
                t={t}
              />
            </div>
          )}

          {/* TAB 5: Citizen Journey Graph */}
          {activeTab === 'journey' && (
            <div className="animate-editorial-reveal">
              <JourneyGraph
                searchResults={searchResults}
                onResolveObstacle={handleResolveObstacle}
                t={t}
              />
            </div>
          )}

          {/* TAB 6: Obstacle Resolver & AI Assistant */}
          {activeTab === 'obstacle' && (
            <div className="animate-editorial-reveal">
              <ObstacleResolverModal
                selectedObstacle={selectedObstacle}
                onClose={() => setSelectedObstacle(null)}
                t={t}
              />
            </div>
          )}

          {/* TAB 7: Government Admin Panel */}
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
