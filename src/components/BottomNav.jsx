import React from 'react';
import { Search, UserCheck, GitFork, AlertTriangle, UserCog } from 'lucide-react';

export default function BottomNav({ activeTab, onTabChange, t }) {
  const tabs = [
    { id: 'search', label: t('problemTab'), icon: Search },
    { id: 'dashboard', label: t('dashboardTab'), icon: UserCheck, badge: 'Unified' },
    { id: 'journey', label: t('journeyTab'), icon: GitFork },
    { id: 'obstacle', label: t('obstacleTab'), icon: AlertTriangle, badge: 'Hero' },
    { id: 'admin', label: t('adminTab'), icon: UserCog },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-xl border-t border-slate-800 px-2 py-1.5 max-w-6xl mx-auto">
      <div className="flex items-center justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`relative flex flex-col items-center py-1 px-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'text-blue-400 font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 transition-transform duration-200 ${isActive ? 'scale-110 text-blue-400' : ''}`} />
                {tab.badge && (
                  <span className={`absolute -top-1.5 -right-3 text-[8px] font-bold px-1 rounded-full animate-pulse ${
                    tab.badge === 'Hero' ? 'bg-amber-500 text-slate-950' : 'bg-emerald-500 text-slate-950'
                  }`}>
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] mt-1 tracking-tight">{tab.label}</span>

              {isActive && (
                <span className="absolute bottom-0 w-8 h-0.5 bg-blue-500 rounded-full shadow-sm shadow-blue-500" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
