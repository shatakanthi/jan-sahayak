import React, { useState } from 'react';
import { LIFE_EVENTS } from '../data/lifeEvents';
import { Baby, GraduationCap, HeartHandshake, Briefcase, MapPin, Tractor, Layers, ExternalLink, ArrowRight, ShieldCheck } from 'lucide-react';

const ICON_MAP = {
  Baby,
  GraduationCap,
  HeartHandshake,
  Briefcase,
  MapPin,
  Tractor
};

export default function LifeEventNavigator({ onSelectLifeEvent }) {
  const [selectedEventId, setSelectedEventId] = useState(LIFE_EVENTS[0].id);

  const activeEvent = LIFE_EVENTS.find(e => e.id === selectedEventId) || LIFE_EVENTS[0];
  const ActiveIcon = ICON_MAP[activeEvent.icon] || Layers;

  return (
    <div className="space-y-6 pb-24 text-[#383b3d]">
      
      {/* Header */}
      <div className="text-center space-y-1">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#74744a]/10 border border-[#74744a]/30 text-[#74744a] text-xs font-bold">
          <Layers className="w-3.5 h-3.5 text-[#e8ab16]" />
          <span>LIFE EVENT SERVICE NAVIGATOR</span>
        </div>
        <h2 className="text-2xl font-bold text-[#324a60] font-editorial">Organized Around Real Life Milestones</h2>
        <p className="text-xs text-[#896e6a] max-w-md mx-auto">
          Access complete multi-department service journeys bundled around key life events — without needing to know department names.
        </p>
      </div>

      {/* Grid of Life Event Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-3xl mx-auto">
        {LIFE_EVENTS.map((event) => {
          const Icon = ICON_MAP[event.icon] || Layers;
          const isActive = event.id === selectedEventId;

          return (
            <button
              key={event.id}
              onClick={() => setSelectedEventId(event.id)}
              className={`p-4 rounded-xl border transition-all duration-200 text-left space-y-2 relative overflow-hidden ${
                isActive
                  ? 'bg-[#324a60] text-white border-[#e8ab16] shadow-lg -translate-y-0.5'
                  : 'bg-white border-[#896e6a] text-[#324a60] hover:border-[#e8ab16] hover:bg-[#F8F9FA]'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold shadow ${
                  isActive ? 'bg-[#e8ab16] text-[#383b3d]' : 'bg-[#324a60]/10 text-[#324a60]'
                }`}>
                  <Icon className="w-4 h-4" />
                </div>
                {isActive && (
                  <span className="w-2.5 h-2.5 rounded-full bg-[#e8ab16] shadow" />
                )}
              </div>

              <h4 className={`text-xs font-bold font-editorial ${isActive ? 'text-white' : 'text-[#324a60]'}`}>
                {event.title}
              </h4>
            </button>
          );
        })}
      </div>

      {/* Active Life Event Details & Bundled Services */}
      <div className="max-w-3xl mx-auto p-6 rounded-xl bg-white border border-[#896e6a] shadow-md space-y-5">
        
        {/* Title & Description */}
        <div className="flex items-center space-x-3 border-b border-[#896e6a]/30 pb-4">
          <div className="w-12 h-12 rounded-xl bg-[#324a60] text-[#e8ab16] flex items-center justify-center shadow-md shrink-0">
            <ActiveIcon className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#324a60] font-editorial">{activeEvent.title}</h3>
            <p className="text-xs text-[#896e6a]">{activeEvent.description}</p>
          </div>
        </div>

        {/* Bundled Services List */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-[#324a60] uppercase tracking-wider flex items-center space-x-1.5">
              <ShieldCheck className="w-4 h-4 text-[#74744a]" />
              <span>{activeEvent.bundledServices.length} Department Services Included in Journey</span>
            </h4>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#74744a]/10 text-[#74744a] border border-[#74744a]/30">
              Multi-Department Package
            </span>
          </div>

          <div className="space-y-2.5">
            {activeEvent.bundledServices.map((service, idx) => (
              <div
                key={idx}
                className="bg-[#F8F9FA] p-3.5 rounded-lg border border-[#896e6a]/40 hover:border-[#e8ab16] transition flex items-center justify-between"
              >
                <div>
                  <h5 className="text-xs font-bold text-[#324a60] font-editorial">{service.name}</h5>
                  <p className="text-[11px] text-[#896e6a] mt-0.5">{service.department}</p>
                </div>

                <a
                  href={service.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-[#324a60] hover:bg-[#243545] text-white text-xs font-bold rounded-lg transition flex items-center space-x-1 shrink-0 shadow-sm"
                >
                  <span>Portal</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#e8ab16]" />
                </a>
              </div>
            ))}
          </div>

        </div>

      </div>

    </div>
  );
}
