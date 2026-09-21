import React, { useState } from 'react';
import { UserCheck, ShieldCheck, Check, Sparkles, Filter, RefreshCw } from 'lucide-react';
import { VERIFIED_SCHEMES } from '../data/verifiedSchemes';

export default function ProfileDrawer({ profile, onUpdateProfile, onSelectScheme }) {
  const [age, setAge] = useState(profile.age || 65);
  const [incomeCategory, setIncomeCategory] = useState(profile.incomeCategory || 'BPL');
  const [occupation, setOccupation] = useState(profile.occupation || 'Senior Citizen');
  const [state, setState] = useState(profile.state || 'Karnataka');
  const [documents, setDocuments] = useState(profile.documents || ['Aadhaar Card', 'Bank Passbook']);

  const availableDocs = ['Aadhaar Card', 'BPL Ration Card', 'Income Certificate', 'Caste Certificate', 'Bank Passbook', 'Land Record', '10th Marksheet'];

  const toggleDoc = (doc) => {
    if (documents.includes(doc)) {
      setDocuments(documents.filter(d => d !== doc));
    } else {
      setDocuments([...documents, doc]);
    }
  };

  const handleSave = () => {
    onUpdateProfile({ age, incomeCategory, occupation, state, documents });
  };

  // Compute live eligibility matches based on current profile inputs
  const matchedSchemes = VERIFIED_SCHEMES.map(scheme => {
    let score = 70;
    if (scheme.eligibility.minAge && age >= scheme.eligibility.minAge) score += 15;
    if (scheme.eligibility.incomeCategory && scheme.eligibility.incomeCategory === incomeCategory) score += 15;
    return { ...scheme, matchScore: Math.min(score, 99) };
  }).sort((a, b) => b.matchScore - a.matchScore);

  return (
    <div className="space-y-6 pb-24">
      
      {/* Header */}
      <div className="text-center space-y-1">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
          <UserCheck className="w-3.5 h-3.5" />
          <span>Personal Citizen Profile Engine</span>
        </div>
        <h2 className="text-xl font-bold text-white">What Am I Eligible For?</h2>
        <p className="text-xs text-slate-400 max-w-md mx-auto">
          Build a temporary context profile to instantly scan all verified government schemes tailored to your exact demographic.
        </p>
      </div>

      <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Profile Inputs Card */}
        <div className="md:col-span-1 glass-panel p-5 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-2.5">
            <Filter className="w-4 h-4 text-blue-400" />
            <span>Citizen Parameters</span>
          </h3>

          {/* Age */}
          <div className="space-y-1">
            <label className="text-xs text-slate-300 font-medium">Age: {age} years</label>
            <input
              type="range"
              min="16"
              max="90"
              value={age}
              onChange={(e) => setAge(parseInt(e.target.value))}
              className="w-full accent-blue-500 cursor-pointer"
            />
          </div>

          {/* Income Category */}
          <div className="space-y-1">
            <label className="text-xs text-slate-300 font-medium">Income Category</label>
            <select
              value={incomeCategory}
              onChange={(e) => setIncomeCategory(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 text-xs rounded-xl p-2 text-white"
            >
              <option value="BPL">Below Poverty Line (BPL)</option>
              <option value="Low Income">Low Income (&lt; ₹2.5L/yr)</option>
              <option value="Middle Income">Middle Income</option>
              <option value="EWS">EWS Category</option>
            </select>
          </div>

          {/* Occupation */}
          <div className="space-y-1">
            <label className="text-xs text-slate-300 font-medium">Occupation / Status</label>
            <select
              value={occupation}
              onChange={(e) => setOccupation(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 text-xs rounded-xl p-2 text-white"
            >
              <option value="Senior Citizen">Senior Citizen</option>
              <option value="Farmer">Farmer / Agriculture</option>
              <option value="Student">Student</option>
              <option value="Street Vendor">Street Vendor / Micro-Business</option>
              <option value="Salaried / Unemployed">Salaried / Unemployed</option>
            </select>
          </div>

          {/* Documents Held */}
          <div className="space-y-1.5">
            <label className="text-xs text-slate-300 font-medium">Documents You Possess:</label>
            <div className="space-y-1 max-h-36 overflow-y-auto pr-1">
              {availableDocs.map((doc) => {
                const isSelected = documents.includes(doc);
                return (
                  <button
                    key={doc}
                    type="button"
                    onClick={() => toggleDoc(doc)}
                    className={`w-full text-left text-[11px] px-2.5 py-1.5 rounded-lg border flex items-center justify-between transition ${
                      isSelected
                        ? 'bg-blue-600/20 border-blue-500 text-blue-300 font-semibold'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <span>{doc}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-blue-400" />}
                  </button>
                );
              })}
            </div>
          </div>

          <button
            onClick={handleSave}
            className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl transition shadow-md"
          >
            Update Profile & Filter
          </button>
        </div>

        {/* Personalized Eligible Schemes List */}
        <div className="md:col-span-2 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Matches based on Profile ({matchedSchemes.length})
            </h3>
            <span className="text-[11px] text-emerald-400 font-medium flex items-center space-x-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Real-Time Evaluation</span>
            </span>
          </div>

          <div className="space-y-3">
            {matchedSchemes.map((scheme) => (
              <div
                key={scheme.id}
                onClick={() => onSelectScheme(scheme)}
                className="glass-panel p-4 rounded-2xl border border-slate-800 hover:border-blue-500/50 transition cursor-pointer space-y-2"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider">
                      {scheme.category}
                    </span>
                    <h4 className="text-sm font-bold text-white mt-0.5">{scheme.name}</h4>
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
                    {scheme.matchScore}% Eligible
                  </span>
                </div>

                <p className="text-xs text-slate-300 line-clamp-2">
                  {scheme.shortDescription}
                </p>

                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-800">
                  <span>Department: {scheme.department}</span>
                  <span className="text-blue-400 font-semibold hover:underline">View Journey →</span>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>

    </div>
  );
}
