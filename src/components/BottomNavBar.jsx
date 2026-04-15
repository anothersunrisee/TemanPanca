import React from 'react';
import { Home, Compass, Target, Box, User } from 'lucide-react';

const TABS = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'jelajah', label: 'Jelajah', icon: Compass },
  { id: 'misi', label: 'Misi', icon: Target },
  { id: 'ar', label: 'AR', icon: Box },
  { id: 'profil', label: 'Profil', icon: User },
];

export default function BottomNavBar({ activeTab = 'home', onTabChange }) {
  return (
    <nav className="shrink-0 w-full bg-white/90 backdrop-blur-xl flex justify-around items-center px-4 pb-6 pt-3 z-50 rounded-t-[2rem] shadow-[0_-8px_24px_rgba(25,28,29,0.06)] border-t border-slate-100">
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
            <tab.icon size={22} className={isActive ? 'text-white' : ''} strokeWidth={isActive ? 2.5 : 2} />
            <span className="font-body text-[10px] font-medium mt-1">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
