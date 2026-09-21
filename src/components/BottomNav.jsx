import React from 'react';
import { Search, UserCheck, AlertTriangle, UserCog, Sparkles } from 'lucide-react';

export default function BottomNav({ activeTab, onTabChange, t = (k) => k }) {
  const tabs = [
    { id: 'search', label: t('problemTab') || 'Gov Services', icon: Search },
    { id: 'wizard', label: t('wizardTab') || 'Service Finder', icon: Sparkles, badge: 'Flagship' },
    { id: 'dashboard', label: t('dashboardTab') || 'Citizen Portal', icon: UserCheck },
    { id: 'obstacle', label: t('obstacleTab') || 'Obstacle AI', icon: AlertTriangle, badge: 'Hero' },
    { id: 'admin', label: t('adminTab') || 'Admin', icon: UserCog },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#324a60] text-white border-t border-[#896e6a] px-2 py-1.5 max-w-7xl mx-auto shadow-xl">
      <div className="flex items-center justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`relative flex flex-col items-center py-1 px-3 rounded-md transition-all duration-150 ${
                isActive
                  ? 'text-[#e8ab16] font-bold bg-[#e8ab16]/10'
                  : 'text-slate-200 hover:text-white'
              }`}
            >
              <div className="relative">
                <Icon className={`w-4 h-4 transition-transform ${isActive ? 'scale-110 text-[#e8ab16]' : ''}`} />
                {tab.badge && (
                  <span className={`absolute -top-1.5 -right-3 text-[8px] font-bold px-1 rounded ${
                    tab.badge === 'Hero' ? 'bg-[#e8ab16] text-[#383b3d]' : 'bg-[#74744a] text-white'
                  }`}>
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] mt-1 font-medium">{tab.label}</span>

              {isActive && (
                <span className="absolute bottom-0 w-6 h-0.5 bg-[#e8ab16] rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
