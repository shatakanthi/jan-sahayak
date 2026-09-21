import React, { useState } from 'react';
import ObstacleChatbot from './ObstacleChatbot';
import { OBSTACLE_MATRIX } from '../data/obstacleData';
import { AlertTriangle, CheckCircle2, ShieldCheck, MessageSquare, Grid } from 'lucide-react';

export default function ObstacleResolverModal({ selectedObstacle, onClose, t }) {
  const [activeViewMode, setActiveViewMode] = useState('chatbot'); // 'chatbot' | 'matrix'
  const [activeObstacleId, setActiveObstacleId] = useState(
    selectedObstacle ? OBSTACLE_MATRIX.find(o => o.missingDocName.toLowerCase().includes(selectedObstacle.toLowerCase()))?.missingDocId || OBSTACLE_MATRIX[0].missingDocId : OBSTACLE_MATRIX[0].missingDocId
  );

  const currentObstacle = OBSTACLE_MATRIX.find(o => o.missingDocId === activeObstacleId) || OBSTACLE_MATRIX[0];

  return (
    <div className="space-y-6 pb-24">
      
      {/* Hero Badge */}
      <div className="text-center space-y-2 pt-2">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold">
          <AlertTriangle className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
          <span>HERO FEATURE: Obstacle Resolver</span>
        </div>
        <h2 className="text-xl font-bold text-white">Don't Let Missing Documents Stop You</h2>
        <p className="text-xs text-slate-400 max-w-md mx-auto">
          Citizens often get stuck when they lack specific proof. Chat with our Obstacle AI Bot or browse acceptable alternative documents.
        </p>
      </div>

      {/* Switch between Obstacle AI Chatbot & Matrix View */}
      <div className="flex justify-center">
        <div className="bg-slate-900 p-1 rounded-2xl border border-slate-800 flex space-x-1">
          <button
            onClick={() => setActiveViewMode('chatbot')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition flex items-center space-x-2 ${
              activeViewMode === 'chatbot'
                ? 'bg-amber-500 text-slate-950 shadow-md font-extrabold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Obstacle AI Assistant Chatbot</span>
          </button>

          <button
            onClick={() => setActiveViewMode('matrix')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition flex items-center space-x-2 ${
              activeViewMode === 'matrix'
                ? 'bg-amber-500 text-slate-950 shadow-md font-extrabold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Grid className="w-4 h-4" />
            <span>Document Alternatives Matrix</span>
          </button>
        </div>
      </div>

      {/* VIEW 1: Interactive Chatbot */}
      {activeViewMode === 'chatbot' && (
        <div className="max-w-3xl mx-auto">
          <ObstacleChatbot t={t} />
        </div>
      )}

      {/* VIEW 2: Matrix Grid */}
      {activeViewMode === 'matrix' && (
        <div className="space-y-6">
          <div className="flex flex-wrap gap-2 justify-center max-w-2xl mx-auto">
            {OBSTACLE_MATRIX.map((item) => {
              const isActive = item.missingDocId === activeObstacleId;
              return (
                <button
                  key={item.missingDocId}
                  onClick={() => setActiveObstacleId(item.missingDocId)}
                  className={`text-xs px-3.5 py-2 rounded-xl border transition font-medium text-left flex items-center space-x-2 ${
                    isActive
                      ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-semibold shadow-md'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                  }`}
                >
                  <AlertTriangle className={`w-3.5 h-3.5 ${isActive ? 'text-amber-400' : 'text-slate-500'}`} />
                  <span>{item.missingDocName}</span>
                </button>
              );
            })}
          </div>

          <div className="max-w-3xl mx-auto glass-panel p-5 sm:p-6 rounded-3xl border border-amber-500/30 space-y-6">
            <div className="space-y-2 border-b border-slate-800 pb-4">
              <h3 className="text-base font-bold text-white flex items-center space-x-2">
                <span className="text-amber-400">Blocker:</span>
                <span>{currentObstacle.missingDocName}</span>
              </h3>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
                <strong>Why required:</strong> {currentObstacle.whyRequired}
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-sm font-bold text-emerald-400 flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>{currentObstacle.acceptableAlternatives.length} Officially Acceptable Alternatives</span>
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentObstacle.acceptableAlternatives.map((alt, idx) => (
                  <div key={idx} className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-3">
                    <div className="flex items-start justify-between">
                      <h5 className="text-xs font-bold text-white flex items-center space-x-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>{alt.name}</span>
                      </h5>
                      <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 shrink-0">
                        {alt.acquisitionDifficulty}
                      </span>
                    </div>

                    <p className="text-xs text-slate-300">{alt.description}</p>

                    <div className="space-y-1 bg-slate-950 p-2.5 rounded-xl border border-slate-800/60">
                      <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider">How to Obtain:</span>
                      <ol className="list-decimal list-inside text-[11px] text-slate-300 space-y-1">
                        {alt.steps.map((step, sIdx) => (
                          <li key={sIdx}>{step}</li>
                        ))}
                      </ol>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
