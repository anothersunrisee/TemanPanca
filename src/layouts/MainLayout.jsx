import React from 'react';
import TopAppBar from '../components/TopAppBar';
import BottomNavBar from '../components/BottomNavBar';

export default function MainLayout({ children, activeTab = 'home', onTabChange, userName, character, onNotificationClick }) {
  return (
    <div className="flex justify-center h-[100dvh] w-full bg-[#e7e8e9] overflow-hidden">
      {/* Mobile Container limits the active screen dimensions exactly like on a real phone */}
      <div className="w-full max-w-[440px] bg-white h-full relative shadow-2xl overflow-x-hidden overflow-y-auto flex flex-col font-body custom-scrollbar">
        
        {/* Universal Top Nav */}
        <TopAppBar character={character} onNotificationClick={onNotificationClick} />
        
        {/* Dynamic Page Content */}
        <main className="pb-32 flex-grow pt-20 animate-fade-in relative z-10 w-full h-full">
          {children}
        </main>

        {/* Universal Bottom Nav */}
        <BottomNavBar activeTab={activeTab} onTabChange={onTabChange} />
        
      </div>
    </div>
  );
}
