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
    <div className="space-y-6 pb-24">
      
      {/* Header */}
      <div className="text-center space-y-1">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold">
          <Layers className="w-3.5 h-3.5" />
          <span>Life Event Service Bundles</span>
        </div>
        <h2 className="text-xl font-bold text-white">Organized Around Life Milestones</h2>
        <p className="text-xs text-slate-400 max-w-md mx-auto">
          Instead of visiting 5 separate department sites, access complete multi-department service packages built for key life events.
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
              className={`p-3.5 rounded-2xl border transition-all duration-200 text-left space-y-2 relative overflow-hidden ${
                isActive
                  ? 'bg-slate-800/90 border-blue-500 shadow-lg shadow-blue-500/10'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className={`w-8 h-8 rounded-xl bg-gradient-to-tr ${event.color} flex items-center justify-center text-white shadow-md`}>
                  <Icon className="w-4 h-4" />
                </div>
                {isActive && (
                  <span className="w-2 h-2 rounded-full bg-blue-400 shadow-sm shadow-blue-400" />
                )}
              </div>

              <h4 className="text-xs font-bold text-white tracking-tight">
                {event.title}
              </h4>
            </button>
          );
        })}
      </div>

      {/* Active Life Event Details & Bundled Services */}
      <div className="max-w-3xl mx-auto glass-panel p-5 sm:p-6 rounded-3xl border border-slate-800 space-y-5">
        
        {/* Title & Description */}
        <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
          <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${activeEvent.color} flex items-center justify-center text-white shadow-xl`}>
            <ActiveIcon className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">{activeEvent.title}</h3>
            <p className="text-xs text-slate-300">{activeEvent.description}</p>
          </div>
        </div>

        {/* Bundled Services List */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-blue-400 uppercase tracking-wider flex items-center space-x-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>{activeEvent.bundledServices.length} Unified Department Services Package</span>
          </h4>

          <div className="space-y-2.5">
            {activeEvent.bundledServices.map((service, idx) => (
              <div
                key={idx}
                className="bg-slate-900/90 p-3.5 rounded-xl border border-slate-800/80 hover:border-slate-700 transition flex items-center justify-between"
              >
                <div>
                  <h5 className="text-xs font-bold text-white">{service.name}</h5>
                  <p className="text-[11px] text-slate-400 mt-0.5">{service.department}</p>
                </div>

                <a
                  href={service.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-lg border border-slate-700 flex items-center space-x-1 transition shrink-0"
                >
                  <span>Portal</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            ))}
          </div>

        </div>

      </div>

    </div>
  );
}
