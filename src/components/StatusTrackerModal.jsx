import React, { useState } from 'react';
import { Clock, CheckCircle2, Search, ArrowRight, ShieldCheck } from 'lucide-react';

export default function StatusTrackerModal() {
  const [refNo, setRefNo] = useState('');
  const [statusResult, setStatusResult] = useState(null);

  const handleTrack = (e) => {
    e?.preventDefault();
    if (!refNo.trim()) return;

    setStatusResult({
      appId: refNo.toUpperCase(),
      schemeName: 'Indira Gandhi National Old Age Pension Scheme',
      department: 'Social Welfare Department',
      appliedDate: '2026-09-02',
      currentStage: 'District Nodal Approval',
      estimatedCompletion: '2026-09-28',
      timeline: [
        { stage: 'Application Submitted', date: '2026-09-02', status: 'Completed' },
        { stage: 'Document Verification by Gram Panchayat', date: '2026-09-08', status: 'Completed' },
        { stage: 'District Social Welfare Officer Review', date: '2026-09-18', status: 'In Progress' },
        { stage: 'Sanction Order & DBT Credit', date: 'Pending', status: 'Upcoming' }
      ]
    });
  };

  return (
    <div className="max-w-2xl mx-auto glass-panel p-5 rounded-3xl border border-slate-800 space-y-5">
      <div className="flex items-center space-x-2">
        <Clock className="w-5 h-5 text-blue-400" />
        <h3 className="text-base font-bold text-white">Track Application Status</h3>
      </div>

      <form onSubmit={handleTrack} className="flex gap-2">
        <input
          type="text"
          value={refNo}
          onChange={(e) => setRefNo(e.target.value)}
          placeholder="Enter Application Ref No (e.g. APP-9482)"
          className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl flex items-center space-x-1"
        >
          <span>Track</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </form>

      {statusResult && (
        <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800 space-y-4 animate-fadeIn">
          <div className="flex items-start justify-between border-b border-slate-800 pb-3">
            <div>
              <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider">
                REF: {statusResult.appId}
              </span>
              <h4 className="text-sm font-bold text-white mt-0.5">{statusResult.schemeName}</h4>
              <p className="text-[11px] text-slate-400">{statusResult.department}</p>
            </div>
            <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-xl border border-amber-500/20">
              {statusResult.currentStage}
            </span>
          </div>

          <div className="space-y-3">
            {statusResult.timeline.map((item, idx) => (
              <div key={idx} className="flex items-center space-x-3 text-xs">
                <CheckCircle2 className={`w-4 h-4 shrink-0 ${
                  item.status === 'Completed' ? 'text-emerald-400' : item.status === 'In Progress' ? 'text-amber-400 animate-pulse' : 'text-slate-600'
                }`} />
                <div className="flex-1 flex justify-between">
                  <span className={item.status === 'Completed' ? 'text-white' : 'text-slate-400'}>
                    {item.stage}
                  </span>
                  <span className="text-slate-500 text-[11px]">{item.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
