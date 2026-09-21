import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, AlertTriangle, ShieldCheck, CheckCircle2, ArrowRight, RefreshCw } from 'lucide-react';
import { OBSTACLE_MATRIX } from '../data/obstacleData';

export default function ObstacleChatbot({ t }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: "Hello! I am your Jan Sahayak **Obstacle AI Assistant**. Tell me which document or proof you are missing, and I will find officially acceptable alternative documents and step-by-step solutions for you!",
      alternatives: null
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  const quickPrompts = [
    "I don't have address proof / rent agreement",
    "My income certificate is expired",
    "Name spelling mismatch between Aadhaar & Marksheet",
    "My bank account is not linked with Aadhaar"
  ];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = (customText) => {
    const queryText = customText || input;
    if (!queryText.trim()) return;

    const userMsg = { id: Date.now(), sender: 'user', text: queryText };
    setMessages(prev => [...prev, userMsg]);
    if (!customText) setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const lower = queryText.toLowerCase();
      let matchedObstacle = OBSTACLE_MATRIX.find(o => 
        o.missingDocName.toLowerCase().includes(lower) || 
        o.missingDocId.toLowerCase().includes(lower) ||
        (lower.includes('address') && o.missingDocId === 'no-address-proof') ||
        (lower.includes('income') && o.missingDocId === 'no-income-cert') ||
        (lower.includes('name') && o.missingDocId === 'name-mismatch') ||
        (lower.includes('bank') && o.missingDocId === 'no-bank-dbt')
      );

      if (!matchedObstacle) {
        matchedObstacle = OBSTACLE_MATRIX[0];
      }

      const botReply = {
        id: Date.now() + 1,
        sender: 'bot',
        text: `Here is the verified obstacle solution for **${matchedObstacle.missingDocName}**:\n\n**Why Required:** ${matchedObstacle.whyRequired}`,
        obstacleData: matchedObstacle
      };

      setMessages(prev => [...prev, botReply]);
      setIsTyping(false);
    }, 800);
  };

  return (
    <div className="glass-panel rounded-3xl border border-amber-500/30 overflow-hidden flex flex-col h-[580px] shadow-2xl">
      
      {/* Chatbot Header */}
      <div className="bg-slate-900 border-b border-slate-800 p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-600 flex items-center justify-center text-slate-950 font-bold shadow-lg shadow-amber-500/20">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-sm font-bold text-white">Jan Sahayak Obstacle AI Assistant</h3>
              <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Active AI
              </span>
            </div>
            <p className="text-[11px] text-slate-400">Interactive Missing Document & Blocker Resolver</p>
          </div>
        </div>

        <span className="text-xs text-amber-400 font-semibold bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
          Hero AI Bot
        </span>
      </div>

      {/* Messages Scroll View */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-950/60">
        
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start space-x-2.5 max-w-[88%] ${
              msg.sender === 'user' ? 'ml-auto flex-row-reverse space-x-reverse' : ''
            }`}
          >
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
              msg.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-amber-500 text-slate-950 font-bold'
            }`}>
              {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            <div className={`p-4 rounded-2xl text-xs leading-relaxed space-y-3 ${
              msg.sender === 'user'
                ? 'bg-blue-600 text-white rounded-tr-none'
                : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none'
            }`}>
              <div className="whitespace-pre-line">{msg.text}</div>

              {/* Display Obstacle Alternatives Card if present */}
              {msg.obstacleData && (
                <div className="space-y-3 pt-2 border-t border-slate-800">
                  <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider flex items-center space-x-1">
                    <ShieldCheck className="w-4 h-4" />
                    <span>{msg.obstacleData.acceptableAlternatives.length} Acceptable Alternative Documents:</span>
                  </span>

                  <div className="space-y-2">
                    {msg.obstacleData.acceptableAlternatives.map((alt, aIdx) => (
                      <div key={aIdx} className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1.5">
                        <div className="flex items-center justify-between text-xs font-bold text-white">
                          <span className="flex items-center space-x-1 text-emerald-300">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                            <span>{alt.name}</span>
                          </span>
                          <span className="text-[9px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                            {alt.acquisitionDifficulty}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-300">{alt.description}</p>
                        
                        <div className="text-[10px] text-blue-400 font-mono pt-1">
                          Steps: {alt.steps.join(' ➔ ')}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center space-x-2 text-xs text-amber-400 font-medium">
            <RefreshCw className="w-4 h-4 animate-spin" />
            <span>Obstacle AI Assistant is finding grounded alternatives...</span>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Quick Scenario Chips */}
      <div className="px-4 py-2 bg-slate-900 border-t border-slate-800 flex items-center space-x-2 overflow-x-auto">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider shrink-0">Quick Scenarios:</span>
        {quickPrompts.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(prompt)}
            className="text-[11px] px-3 py-1 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 shrink-0 text-left transition"
          >
            "{prompt}"
          </button>
        ))}
      </div>

      {/* Chat Input Form */}
      <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} className="p-3 bg-slate-900 border-t border-slate-800 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask Obstacle AI (e.g. 'I don't have address proof')..."
          className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 font-medium"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl flex items-center space-x-1 shadow-md transition"
        >
          <span>Ask AI</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>

    </div>
  );
}
