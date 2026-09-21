import React, { useState } from 'react';
import { MOCK_CITIZEN_ACCOUNT } from '../data/mockCitizenAccount';
import { UserCheck, Clock, CreditCard, Bookmark, CheckCircle2, ArrowRight, ShieldCheck, Download, AlertCircle } from 'lucide-react';

export default function Dashboard({ accountData = MOCK_CITIZEN_ACCOUNT, onSimulatePay, onSelectScheme }) {
  const [activeTab, setActiveTab] = useState('applications');

  return (
    <div className="space-y-6 pb-24">
      
      {/* USP Header Banner */}
      <div className="glass-panel p-5 rounded-3xl border border-blue-500/30 space-y-3">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
              {accountData.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-lg font-bold text-white">{accountData.name}</h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {accountData.aadhaarStatus}
                </span>
              </div>
              <p className="text-xs text-slate-400">ID: {accountData.citizenId} • {accountData.city}</p>
            </div>
          </div>

          <div className="bg-slate-900/90 px-3.5 py-2 rounded-2xl border border-slate-800 text-right">
            <div className="text-[10px] font-bold text-blue-400 uppercase tracking-wider">PROPOSED USP</div>
            <div className="text-xs font-medium text-slate-200">One Citizen Profile • Multiple Services • One Journey</div>
          </div>
        </div>
      </div>

      {/* Dashboard Sub-Tabs */}
      <div className="flex space-x-2 border-b border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('applications')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition flex items-center space-x-2 ${
            activeTab === 'applications'
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-slate-900 text-slate-400 hover:text-white'
          }`}
        >
          <Clock className="w-3.5 h-3.5" />
          <span>Active Requests ({accountData.activeApplications.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('bills')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition flex items-center space-x-2 ${
            activeTab === 'bills'
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-slate-900 text-slate-400 hover:text-white'
          }`}
        >
          <CreditCard className="w-3.5 h-3.5" />
          <span>Pending Bills ({accountData.pendingBills.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('saved')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition flex items-center space-x-2 ${
            activeTab === 'saved'
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-slate-900 text-slate-400 hover:text-white'
          }`}
        >
          <Bookmark className="w-3.5 h-3.5" />
          <span>Saved Services ({accountData.savedServices.length})</span>
        </button>
      </div>

      {/* TAB 1: Active Requests & Application Tracking */}
      {activeTab === 'applications' && (
        <div className="space-y-4">
          {accountData.activeApplications.map((app, idx) => (
            <div key={idx} className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider">
                    {app.sector} • REF: {app.appId}
                  </span>
                  <h4 className="text-base font-bold text-white mt-0.5">{app.serviceName}</h4>
                  <p className="text-xs text-slate-400">Applied: {app.appliedDate}</p>
                </div>
                <span className={`text-xs font-bold px-3 py-1 rounded-xl border ${
                  app.status === 'Approved'
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                    : 'bg-amber-500/10 text-amber-300 border-amber-500/20'
                }`}>
                  {app.status}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2 text-slate-300">
                  <Clock className="w-4 h-4 text-amber-400 animate-pulse" />
                  <span>Stage: <strong>{app.currentStage}</strong></span>
                </div>
                <span className="text-slate-500 text-[11px]">Est. Completion: {app.estimatedCompletion}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 2: Pending Utility Bills & Simulated Payment */}
      {activeTab === 'bills' && (
        <div className="space-y-4">
          <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-xs text-blue-300 flex items-center justify-between">
            <span>Notice: Payments use zero-risk simulated transactions for hackathon demo.</span>
            <span className="font-bold text-emerald-400">No real money required</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {accountData.pendingBills.map((bill, idx) => (
              <div key={idx} className="glass-panel p-4 rounded-2xl border border-slate-800 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      {bill.provider} • Bill #{bill.billId}
                    </span>
                    <h4 className="text-sm font-bold text-white mt-0.5">{bill.title}</h4>
                  </div>
                  <span className="text-base font-bold text-emerald-400">₹{bill.amount}</span>
                </div>

                <div className="flex items-center justify-between text-xs border-t border-slate-800 pt-2.5">
                  <span className="text-slate-400">Due Date: {bill.dueDate}</span>
                  <button
                    onClick={() => onSimulatePay(bill)}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition shadow-md flex items-center space-x-1"
                  >
                    <CreditCard className="w-3.5 h-3.5" />
                    <span>Pay ₹{bill.amount} (Simulated)</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: Saved Services */}
      {activeTab === 'saved' && (
        <div className="space-y-3">
          {accountData.savedServices.map((saved, idx) => (
            <div key={idx} className="glass-panel p-4 rounded-2xl border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider">{saved.category}</span>
                <h4 className="text-sm font-bold text-white mt-0.5">{saved.name}</h4>
              </div>
              <button
                onClick={() => onSelectScheme({ id: saved.id, name: saved.name })}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-xl border border-slate-700"
              >
                Launch Journey →
              </button>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
