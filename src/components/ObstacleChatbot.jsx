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
    <div className="bg-white rounded-xl border border-[#896e6a] overflow-hidden flex flex-col h-[580px] shadow-lg text-[#383b3d]">
      
      {/* Chatbot Header */}
      <div className="bg-[#324a60] text-white p-4 flex items-center justify-between border-b border-[#896e6a]">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-[#e8ab16] text-[#383b3d] flex items-center justify-center font-bold shadow">
            <Bot className="w-5 h-5 text-[#324a60]" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-sm font-bold font-editorial text-white">Obstacle AI Assistant</h3>
              <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-[#74744a]/20 text-[#e8ab16] border border-[#e8ab16]/30">
                Active Grounded AI
              </span>
            </div>
            <p className="text-[11px] text-slate-200">Interactive Missing Document & Blocker Resolver</p>
          </div>
        </div>

        <span className="text-xs text-[#e8ab16] font-bold uppercase tracking-wider">
          AI Assistant
        </span>
      </div>

      {/* Messages Scroll View */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#F8F9FA]">
        
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start space-x-2.5 max-w-[88%] ${
              msg.sender === 'user' ? 'ml-auto flex-row-reverse space-x-reverse' : ''
            }`}
          >
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 shadow ${
              msg.sender === 'user' ? 'bg-[#324a60] text-white' : 'bg-[#e8ab16] text-[#383b3d] font-bold'
            }`}>
              {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4 text-[#324a60]" />}
            </div>

            <div className={`p-4 rounded-xl text-xs leading-relaxed space-y-3 ${
              msg.sender === 'user'
                ? 'bg-[#324a60] text-white rounded-tr-none shadow'
                : 'bg-white border border-[#896e6a] text-[#383b3d] rounded-tl-none shadow-sm'
            }`}>
              <div className="whitespace-pre-line">{msg.text}</div>

              {/* Display Obstacle Alternatives Card if present */}
              {msg.obstacleData && (
                <div className="space-y-3 pt-2 border-t border-[#896e6a]/30">
                  <span className="text-[11px] font-bold text-[#324a60] uppercase tracking-wider flex items-center space-x-1">
                    <ShieldCheck className="w-4 h-4 text-[#74744a]" />
                    <span>{msg.obstacleData.acceptableAlternatives.length} Acceptable Alternative Documents:</span>
                  </span>

                  <div className="space-y-2">
                    {msg.obstacleData.acceptableAlternatives.map((alt, aIdx) => (
                      <div key={aIdx} className="bg-[#F8F9FA] p-3 rounded-lg border border-[#896e6a]/40 space-y-1.5">
                        <div className="flex items-center justify-between text-xs font-bold text-[#324a60]">
                          <span className="flex items-center space-x-1">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#74744a]" />
                            <span>{alt.name}</span>
                          </span>
                          <span className="text-[9px] px-2 py-0.5 rounded bg-[#74744a]/10 text-[#74744a] border border-[#74744a]/30">
                            {alt.acquisitionDifficulty}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#383b3d]">{alt.description}</p>
                        
                        <div className="text-[10px] text-[#324a60] font-mono pt-1">
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
          <div className="flex items-center space-x-2 text-xs text-[#324a60] font-bold">
            <RefreshCw className="w-4 h-4 animate-spin text-[#e8ab16]" />
            <span>Obstacle AI Assistant is finding grounded alternatives...</span>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Quick Scenario Chips */}
      <div className="px-4 py-2 bg-[#F8F9FA] border-t border-[#896e6a]/40 flex items-center space-x-2 overflow-x-auto">
        <span className="text-[10px] font-bold text-[#324a60] uppercase tracking-wider shrink-0">Quick Scenarios:</span>
        {quickPrompts.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(prompt)}
            className="text-[11px] px-3 py-1 rounded-lg bg-white hover:bg-slate-100 text-[#324a60] font-semibold border border-[#896e6a] shrink-0 text-left transition shadow-sm"
          >
            "{prompt}"
          </button>
        ))}
      </div>

      {/* Chat Input Form */}
      <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} className="p-3 bg-white border-t border-[#896e6a] flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask Obstacle AI (e.g. 'I don't have address proof')..."
          className="flex-1 bg-[#F8F9FA] border border-[#896e6a] rounded-lg px-3 py-2 text-xs text-[#383b3d] placeholder-[#896e6a] focus:outline-none focus:border-[#e8ab16] font-medium"
        />
        <button
          type="submit"
          className="px-5 py-2 bg-[#e8ab16] hover:bg-[#d19910] text-[#383b3d] font-bold text-xs rounded-lg flex items-center space-x-1 shadow transition"
        >
          <span>Ask AI</span>
          <Send className="w-3.5 h-3.5 text-[#324a60]" />
        </button>
      </form>

    </div>
  );
}
