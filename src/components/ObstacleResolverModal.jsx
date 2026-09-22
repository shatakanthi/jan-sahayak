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
    <div className="space-y-6 pb-24 text-[#383b3d]">
      
      {/* Hero Badge */}
      <div className="text-center space-y-2 pt-2">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#e8ab16]/15 border border-[#e8ab16]/40 text-[#383b3d] text-xs font-bold">
          <AlertTriangle className="w-3.5 h-3.5 text-[#e8ab16]" />
          <span>OBSTACLE RESOLVER & ALTERNATIVES AI</span>
        </div>
        <h2 className="text-2xl font-bold text-[#324a60] font-editorial">Don't Let Missing Documents Stop You</h2>
        <p className="text-xs text-[#896e6a] max-w-md mx-auto">
          Citizens often get stuck when they lack specific proof. Chat with our Obstacle AI Assistant or browse officially acceptable alternative documents.
        </p>
      </div>

      {/* Switch between Obstacle AI Chatbot & Matrix View */}
      <div className="flex justify-center">
        <div className="bg-[#896e6a]/20 p-1.5 rounded-xl border border-[#896e6a]/40 flex space-x-1">
          <button
            onClick={() => setActiveViewMode('chatbot')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition flex items-center space-x-2 ${
              activeViewMode === 'chatbot'
                ? 'bg-[#324a60] text-white shadow font-bold'
                : 'text-[#383b3d] hover:text-[#324a60]'
            }`}
          >
            <MessageSquare className="w-4 h-4 text-[#e8ab16]" />
            <span>Obstacle AI Assistant Chatbot</span>
          </button>

          <button
            onClick={() => setActiveViewMode('matrix')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition flex items-center space-x-2 ${
              activeViewMode === 'matrix'
                ? 'bg-[#324a60] text-white shadow font-bold'
                : 'text-[#383b3d] hover:text-[#324a60]'
            }`}
          >
            <Grid className="w-4 h-4 text-[#e8ab16]" />
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
                  className={`text-xs px-3.5 py-2 rounded-lg border transition font-bold text-left flex items-center space-x-2 ${
                    isActive
                      ? 'bg-[#324a60] text-white border-[#e8ab16] shadow'
                      : 'bg-white border-[#896e6a] text-[#324a60] hover:border-[#e8ab16]'
                  }`}
                >
                  <AlertTriangle className={`w-3.5 h-3.5 ${isActive ? 'text-[#e8ab16]' : 'text-[#896e6a]'}`} />
                  <span>{item.missingDocName}</span>
                </button>
              );
            })}
          </div>

          <div className="max-w-3xl mx-auto p-6 rounded-xl bg-white border border-[#896e6a] shadow-md space-y-6">
            <div className="space-y-2 border-b border-[#896e6a]/30 pb-4">
              <h3 className="text-base font-bold text-[#324a60] font-editorial flex items-center space-x-2">
                <span className="text-[#e8ab16]">Blocker Issue:</span>
                <span>{currentObstacle.missingDocName}</span>
              </h3>
              <div className="p-3 rounded-lg bg-[#F8F9FA] border border-[#896e6a]/40 text-xs text-[#383b3d]">
                <strong>Why required:</strong> {currentObstacle.whyRequired}
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-xs font-bold text-[#324a60] uppercase tracking-wider flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-[#74744a]" />
                <span>{currentObstacle.acceptableAlternatives.length} Officially Acceptable Alternatives</span>
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentObstacle.acceptableAlternatives.map((alt, idx) => (
                  <div key={idx} className="bg-[#F8F9FA] p-4 rounded-xl border border-[#896e6a]/40 space-y-3">
                    <div className="flex items-start justify-between">
                      <h5 className="text-xs font-bold text-[#324a60] font-editorial flex items-center space-x-1.5">
                        <CheckCircle2 className="w-4 h-4 text-[#74744a] shrink-0" />
                        <span>{alt.name}</span>
                      </h5>
                      <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-[#74744a]/10 text-[#74744a] border border-[#74744a]/30 shrink-0">
                        {alt.acquisitionDifficulty}
                      </span>
                    </div>

                    <p className="text-xs text-[#383b3d]">{alt.description}</p>

                    <div className="space-y-1 bg-white p-2.5 rounded-lg border border-[#896e6a]/30">
                      <span className="text-[10px] font-bold text-[#324a60] uppercase tracking-wider">How to Obtain:</span>
                      <ol className="list-decimal list-inside text-[11px] text-[#383b3d] space-y-1 font-medium">
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
