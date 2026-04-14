import React from 'react';

const TABS = [
  { id: 'home', label: 'Home', icon: 'home' },
  { id: 'jelajah', label: 'Jelajah', icon: 'explore' },
  { id: 'misi', label: 'Misi', icon: 'assignment' },
  { id: 'ar', label: 'AR', icon: 'view_in_ar' },
  { id: 'profil', label: 'Profil', icon: 'person' },
];

export default function BottomNavBar({ activeTab = 'home', onTabChange }) {
  return (
    <nav className="fixed bottom-0 w-full max-w-[440px] bg-white/90 backdrop-blur-xl flex justify-around items-center px-4 pb-6 pt-3 z-50 rounded-t-[2rem] shadow-[0_-8px_24px_rgba(25,28,29,0.06)] border-t border-slate-100">
      {TABS.map(tab => {
        const isActive = activeTab === tab.id;
        return (
          <button 
            key={tab.id}
            onClick={() => onTabChange && onTabChange(tab.id)}
            className={`flex flex-col items-center justify-center transition-all duration-300 active:scale-90 ${
              isActive 
                ? 'bg-gradient-to-br from-amber-600 to-amber-700 text-white rounded-full px-5 py-2 scale-105 shadow-md shadow-amber-900/20' 
                : 'text-slate-400 hover:text-amber-600 p-2'
            }`}
          >
            <span className="material-symbols-outlined" style={{fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0"}}>{tab.icon}</span>
            <span className="font-body text-[10px] font-medium mt-1">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
