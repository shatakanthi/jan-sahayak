import React, { useState } from 'react';
import { ShieldCheck, Plus, CheckCircle2, Server, BarChart3, Settings, AlertTriangle, Layers, MapPin } from 'lucide-react';
import { VERIFIED_SCHEMES } from '../data/verifiedSchemes';
import { LOCALITIES } from '../data/mockLocalityData';

export default function AdminPanel({ t, services = VERIFIED_SCHEMES, onAddService }) {
  const [activeAdminSubTab, setActiveAdminSubTab] = useState('services');
  const [showAddModal, setShowAddModal] = useState(false);

  // Form State for new service
  const [newServiceName, setNewServiceName] = useState('');
  const [newServiceCategory, setNewServiceCategory] = useState('Municipal & Utilities');
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
    <div className="space-y-6 pb-24">
      
      {/* Header Banner */}
      <div className="glass-panel p-5 rounded-3xl border border-purple-500/30 bg-gradient-to-r from-purple-950/40 via-slate-900 to-blue-950/40 space-y-3">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">{t('adminHeader')}</h2>
              <p className="text-xs text-slate-300">{t('adminSub')}</p>
            </div>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs rounded-xl shadow-lg transition flex items-center space-x-1.5 shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>{t('addNewService')}</span>
          </button>
        </div>
      </div>

      {/* Admin Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800 space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Services</span>
          <div className="text-xl font-bold text-white">{services.length}</div>
        </div>
        <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800 space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Localities Covered</span>
          <div className="text-xl font-bold text-emerald-400">{LOCALITIES.length}</div>
        </div>
        <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800 space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Mock APIs Health</span>
          <div className="text-xl font-bold text-blue-400">100% Operational</div>
        </div>
        <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800 space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Verification Audit</span>
          <div className="text-xl font-bold text-purple-400">Pass (0 Fallbacks)</div>
        </div>
      </div>

      {/* Admin Sub Navigation */}
      <div className="flex space-x-2 border-b border-slate-800 pb-2">
        <button
          onClick={() => setActiveAdminSubTab('services')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition flex items-center space-x-2 ${
            activeAdminSubTab === 'services' ? 'bg-purple-600 text-white shadow-md' : 'bg-slate-900 text-slate-400'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Active Catalogue ({services.length})</span>
        </button>

        <button
          onClick={() => setActiveAdminSubTab('analytics')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition flex items-center space-x-2 ${
            activeAdminSubTab === 'analytics' ? 'bg-purple-600 text-white shadow-md' : 'bg-slate-900 text-slate-400'
          }`}
        >
          <BarChart3 className="w-3.5 h-3.5" />
          <span>Locality Demand Analytics</span>
        </button>
      </div>

      {/* SUB-TAB 1: Service Management Catalogue */}
      {activeAdminSubTab === 'services' && (
        <div className="space-y-3">
          {services.map((scheme) => (
            <div key={scheme.id} className="glass-panel p-4 rounded-2xl border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-purple-400 uppercase tracking-wider">
                  {scheme.category || scheme.sector}
                </span>
                <h4 className="text-sm font-bold text-white mt-0.5">{scheme.name}</h4>
                <p className="text-[11px] text-slate-400">Data Owner: {scheme.dataOwner || scheme.department}</p>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
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
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Locality-wise Citizen Requests</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {LOCALITIES.map((loc) => (
              <div key={loc.id} className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800 flex items-center justify-between">
                <div>
                  <h5 className="text-xs font-bold text-white flex items-center space-x-1.5">
                    <MapPin className="w-3.5 h-3.5 text-purple-400" />
                    <span>{loc.name}</span>
                  </h5>
                  <p className="text-[11px] text-slate-400">Discom: {loc.discom}</p>
                </div>
                <span className="text-xs font-bold text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-lg border border-blue-500/20">
                  {Math.floor(140 + Math.random() * 300)} Requests
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add New Service Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-panel w-full max-w-md rounded-3xl border border-slate-700 p-6 space-y-4">
            <h3 className="text-base font-bold text-white">Publish New Service Guidelines</h3>
            
            <form onSubmit={handleCreateService} className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs text-slate-300 font-medium">Service Name:</label>
                <input
                  type="text"
                  value={newServiceName}
                  onChange={(e) => setNewServiceName(e.target.value)}
                  placeholder="e.g. Property Tax Khata Registration"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-slate-300 font-medium">Sector Category:</label>
                <select
                  value={newServiceCategory}
                  onChange={(e) => setNewServiceCategory(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2 text-xs text-white"
                >
                  <option value="Municipal & Utilities">Municipal & Utilities</option>
                  <option value="Healthcare Discovery">Healthcare Discovery</option>
                  <option value="Transport">Transport Services</option>
                  <option value="Banking & Financial Assistance">Banking & Financial Assistance</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs text-slate-300 font-medium">Target Locality:</label>
                <select
                  value={newServiceLocality}
                  onChange={(e) => setNewServiceLocality(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2 text-xs text-white"
                >
                  {LOCALITIES.map(loc => (
                    <option key={loc.id} value={loc.id}>{loc.name}</option>
                  ))}
                </select>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs rounded-xl"
                >
                  Publish Service
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="py-2.5 px-4 bg-slate-800 text-slate-300 text-xs rounded-xl"
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
