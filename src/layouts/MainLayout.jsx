import React from 'react';
import TopAppBar from '../components/TopAppBar';
import BottomNavBar from '../components/BottomNavBar';

export default function MainLayout({ children, activeTab = 'home', onTabChange, userName, character, onNotificationClick }) {
  return (
    <div className="flex justify-center h-[100dvh] w-full bg-[#e7e8e9] overflow-hidden">
      {/* Mobile Container wrapper */}
      <div className="w-full max-w-[440px] bg-white h-full relative shadow-2xl flex flex-col font-body overflow-hidden">
        
        {/* Universal Top Nav */}
        <TopAppBar character={character} onNotificationClick={onNotificationClick} />
        
        {/* Scrollable Page Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto custom-scrollbar animate-fade-in relative z-10 w-full">
          {children}
        </main>

        {/* Universal Bottom Nav */}
        <BottomNavBar activeTab={activeTab} onTabChange={onTabChange} />
        
      </div>
    </div>
  );
}
