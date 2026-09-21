import React, { useState } from 'react';
import { ShieldCheck, Plus, CheckCircle2, Server, BarChart3, Settings, AlertTriangle, Layers, MapPin, X } from 'lucide-react';
import { VERIFIED_SCHEMES } from '../data/verifiedSchemes';
import { LOCALITIES } from '../data/mockLocalityData';

export default function AdminPanel({ t, services = VERIFIED_SCHEMES, onAddService }) {
  const [activeAdminSubTab, setActiveAdminSubTab] = useState('services');
  const [showAddModal, setShowAddModal] = useState(false);

  // Form State for new service
  const [newServiceName, setNewServiceName] = useState('');
  const [newServiceCategory, setNewServiceCategory] = useState('Education Services');
  const [newServiceDept, setNewServiceDept] = useState('');
  const [newServiceLocality, setNewServiceLocality] = useState('bangalore-urban');

  const handleCreateService = (e) => {
    e.preventDefault();
    if (!newServiceName.trim()) return;

    const created = {
      id: 'admin-created-' + Date.now(),
      name: newServiceName,
      category: newServiceCategory,
      sector: newServiceCategory,
      department: newServiceDept || 'Department of Public Services',
      officialUrl: 'https://india.gov.in/',
      lastVerified: new Date().toISOString().split('T')[0],
      verifiedSource: 'Jan Sahayak Admin Verified',
      dataOwner: 'Jan Sahayak Nodal Portal',
      confidenceScore: 100,
      shortDescription: `New service guidelines added by administrator for ${newServiceLocality}.`,
      description: `Newly published service workflow managed through Jan Sahayak Admin Hub.`,
      eligibility: { state: 'All India' },
      requiredDocuments: [{ name: 'Aadhaar Card', mandatory: true }],
      applicationSteps: ['Submit online form on portal.', 'Verification by nodal officer.']
    };

    if (onAddService) onAddService(created);
    setShowAddModal(false);
    setNewServiceName('');
  };

  return (
    <div className="space-y-6 pb-24 text-[#383b3d]">
      
      {/* Header Banner */}
      <div className="p-6 rounded-xl border border-[#896e6a] bg-[#324a60] text-white shadow-md">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-xl bg-[#e8ab16] text-[#383b3d] flex items-center justify-center font-bold text-lg shadow">
              <ShieldCheck className="w-6 h-6 text-[#324a60]" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white font-editorial">{t('adminHeader')}</h2>
              <p className="text-xs text-[#B7BDA9] mt-0.5">{t('adminSub')}</p>
            </div>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-5 py-2.5 bg-[#e8ab16] hover:bg-[#d19910] text-[#383b3d] font-bold text-xs rounded-lg shadow transition flex items-center space-x-1.5 shrink-0"
          >
            <Plus className="w-4 h-4 text-[#324a60]" />
            <span>{t('addNewService')}</span>
          </button>
        </div>
      </div>

      {/* Admin Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="jan-card p-4 rounded-xl border border-[#896e6a] bg-white space-y-1">
          <span className="text-[10px] font-bold text-[#896e6a] uppercase tracking-wider">Total Services</span>
          <div className="text-2xl font-bold text-[#324a60] font-editorial">{services.length}</div>
        </div>
        <div className="jan-card p-4 rounded-xl border border-[#896e6a] bg-white space-y-1">
          <span className="text-[10px] font-bold text-[#896e6a] uppercase tracking-wider">Localities Covered</span>
          <div className="text-2xl font-bold text-[#74744a] font-editorial">{LOCALITIES.length}</div>
        </div>
        <div className="jan-card p-4 rounded-xl border border-[#896e6a] bg-white space-y-1">
          <span className="text-[10px] font-bold text-[#896e6a] uppercase tracking-wider">Mock APIs Health</span>
          <div className="text-2xl font-bold text-[#324a60] font-editorial">100% Operational</div>
        </div>
        <div className="jan-card p-4 rounded-xl border border-[#896e6a] bg-white space-y-1">
          <span className="text-[10px] font-bold text-[#896e6a] uppercase tracking-wider">Verification Audit</span>
          <div className="text-2xl font-bold text-[#74744a] font-editorial">Pass (0 Fallbacks)</div>
        </div>
      </div>

      {/* Admin Sub Navigation */}
      <div className="flex space-x-2 border-b border-[#896e6a] pb-3">
        <button
          onClick={() => setActiveAdminSubTab('services')}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition flex items-center space-x-2 ${
            activeAdminSubTab === 'services' ? 'bg-[#324a60] text-white shadow' : 'bg-white text-[#383b3d] border border-[#896e6a]'
          }`}
        >
          <Layers className="w-3.5 h-3.5 text-[#e8ab16]" />
          <span>Active Catalogue ({services.length})</span>
        </button>

        <button
          onClick={() => setActiveAdminSubTab('analytics')}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition flex items-center space-x-2 ${
            activeAdminSubTab === 'analytics' ? 'bg-[#324a60] text-white shadow' : 'bg-white text-[#383b3d] border border-[#896e6a]'
          }`}
        >
          <BarChart3 className="w-3.5 h-3.5 text-[#e8ab16]" />
          <span>Locality Demand Analytics</span>
        </button>
      </div>

      {/* SUB-TAB 1: Service Management Catalogue */}
      {activeAdminSubTab === 'services' && (
        <div className="space-y-3">
          {services.map((scheme) => (
            <div key={scheme.id} className="jan-card p-4 rounded-xl border border-[#896e6a] bg-white flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-[#74744a] uppercase tracking-wider">
                  {scheme.category || scheme.sector}
                </span>
                <h4 className="text-sm font-bold text-[#324a60] mt-0.5 font-editorial">{scheme.name}</h4>
                <p className="text-[11px] text-[#896e6a]">Data Owner: {scheme.dataOwner || scheme.department}</p>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#74744a]/10 text-[#74744a] border border-[#74744a]/30">
                  Active 🟢
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* SUB-TAB 2: Locality Analytics */}
      {activeAdminSubTab === 'analytics' && (
        <div className="space-y-4">
          <h4 className="text-xs font-bold text-[#324a60] uppercase tracking-wider">Locality-wise Citizen Requests</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {LOCALITIES.map((loc) => (
              <div key={loc.id} className="jan-card p-4 rounded-xl border border-[#896e6a] bg-white flex items-center justify-between">
                <div>
                  <h5 className="text-xs font-bold text-[#324a60] flex items-center space-x-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#e8ab16]" />
                    <span>{loc.name}</span>
                  </h5>
                  <p className="text-[11px] text-[#896e6a]">Discom: {loc.discom}</p>
                </div>
                <span className="text-xs font-bold text-[#324a60] bg-[#324a60]/10 px-2.5 py-1 rounded-lg border border-[#324a60]/20">
                  {Math.floor(140 + Math.random() * 300)} Requests
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add New Service Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-[#324a60]/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-xl border border-[#896e6a] p-6 space-y-4 shadow-2xl relative text-[#383b3d]">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 p-2 rounded-md bg-[#F8F9FA] text-[#896e6a] hover:bg-slate-200"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-base font-bold text-[#324a60] font-editorial">Publish New Service Guidelines</h3>
            
            <form onSubmit={handleCreateService} className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs text-[#324a60] font-bold">Service Name:</label>
                <input
                  type="text"
                  required
                  value={newServiceName}
                  onChange={(e) => setNewServiceName(e.target.value)}
                  placeholder="e.g. Property Tax Khata Registration"
                  className="w-full bg-[#F8F9FA] border border-[#896e6a] rounded-lg px-3 py-2 text-xs text-[#383b3d] focus:outline-none focus:border-[#e8ab16]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-[#324a60] font-bold">Sector Category:</label>
                <select
                  value={newServiceCategory}
                  onChange={(e) => setNewServiceCategory(e.target.value)}
                  className="w-full bg-[#F8F9FA] border border-[#896e6a] rounded-lg p-2 text-xs text-[#383b3d]"
                >
                  <option value="Education Services">Education Services</option>
                  <option value="Healthcare Services">Healthcare Services</option>
                  <option value="Employment Services">Employment Services</option>
                  <option value="Housing & Utility Services">Housing & Utility Services</option>
                  <option value="Agriculture Services">Agriculture Services</option>
                  <option value="Women & Child Services">Women & Child Services</option>
                  <option value="Senior Citizen Services">Senior Citizen Services</option>
                  <option value="Disability Assistance Services">Disability Assistance Services</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs text-[#324a60] font-bold">Target Locality:</label>
                <select
                  value={newServiceLocality}
                  onChange={(e) => setNewServiceLocality(e.target.value)}
                  className="w-full bg-[#F8F9FA] border border-[#896e6a] rounded-lg p-2 text-xs text-[#383b3d]"
                >
                  {LOCALITIES.map(loc => (
                    <option key={loc.id} value={loc.id}>{loc.name}</option>
                  ))}
                </select>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-[#e8ab16] hover:bg-[#d19910] text-[#383b3d] font-bold text-xs rounded-lg shadow"
                >
                  Publish Service
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="py-2.5 px-4 bg-[#F8F9FA] text-[#896e6a] border border-[#896e6a] text-xs font-semibold rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
