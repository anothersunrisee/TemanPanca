import React, { useState, useEffect } from 'react';
import { BookOpen, Trophy, Star, ArrowRight, CheckCircle2, Hourglass } from 'lucide-react';
import MainLayout from '../../layouts/MainLayout';

export default function MisiScreen({ userName, character, onNotificationClick, onTabChange }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Simple mount cascade effect
    const timer = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const cascadeStyle = (delaySec) => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? 'translateY(0)' : 'translateY(20px)',
    transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delaySec}s`
  });

  return (
    <MainLayout activeTab="misi" userName={userName} character={character} onNotificationClick={onNotificationClick} onTabChange={onTabChange}>
      <div className="px-6 pt-8 space-y-8 pb-10">
        
        {/* Header Section */}
        <section className="space-y-1" style={cascadeStyle(0.1)}>
          <h1 className="font-headline font-black text-3xl text-on-surface tracking-tight">Misi Hari Ini</h1>
          <p className="font-body text-secondary font-medium">Yuk selesaikan misimu!</p>
        </section>

        {/* Mission Card */}
        <div className="bg-white rounded-2xl p-6 shadow-[0_8px_24px_-4px_rgba(25,28,29,0.06)] space-y-4 border border-surface-container-low" style={cascadeStyle(0.2)}>
          
          {/* Task 1 (Complete) */}
          <div className="flex items-center justify-between p-4 bg-surface-container-low/50 rounded-xl hover:bg-surface-container-low transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 flex items-center justify-center bg-primary-container/10 rounded-full text-primary shadow-sm">
                <BookOpen size={20} />
              </div>
              <div>
                <p className="font-bold font-body text-on-surface-variant text-[13px]">Selesaikan 1 materi</p>
              </div>
            </div>
            <CheckCircle2 size={24} className="text-green-500 animate-bounce-slow" />
          </div>

          {/* Task 2 (Incomplete) */}
          <div className="flex items-center justify-between p-4 bg-surface-container-low/50 rounded-xl hover:bg-surface-container-low transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 flex items-center justify-center bg-tertiary-container/10 rounded-full text-tertiary shadow-sm">
                <Trophy size={20} />
              </div>
              <div>
                <p className="font-bold font-body text-on-surface-variant text-[13px]">Jawab 1 quiz</p>
              </div>
            </div>
            <Hourglass size={24} className="text-amber-500 opacity-80" />
          </div>
        </div>

        {/* Progress Section */}
        <section className="space-y-3" style={cascadeStyle(0.3)}>
          <div className="flex justify-between items-end">
            <h3 className="font-headline font-bold text-lg text-on-surface">Progress Misi</h3>
            <span className="font-body text-amber-800 font-bold text-xs bg-amber-100 px-3 py-1 rounded-full border border-amber-200">1 / 2 selesai</span>
          </div>
          <div className="h-4 w-full bg-amber-50 rounded-full overflow-hidden relative border border-amber-100">
            {/* Progress Bar */}
            <div 
              className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full transition-all duration-1000 ease-out flex justify-end items-center px-1" 
              style={{ width: mounted ? '50%' : '0%' }}
            >
              <div className="w-1.5 h-1.5 bg-white/80 rounded-full shadow-sm"></div>
            </div>
          </div>
        </section>

        {/* Reward Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-[#835100] to-[#c87e00] rounded-2xl p-6 text-white shadow-xl hover:-translate-y-1 transition-transform" style={cascadeStyle(0.4)}>
          {/* Decorative element */}
          <div className="absolute -top-6 -right-6 w-24 h-24 bg-white/10 rounded-full blur-xl animate-pulse"></div>
          <div className="flex items-center gap-5 relative z-10">
            <div className="w-14 h-14 bg-white/20 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center shadow-inner relative">
              <Star size={32} className="text-amber-100 fill-amber-100 drop-shadow" />
            </div>
            <div>
              <h4 className="font-headline font-black text-xl leading-tight">Hebat!</h4>
              <p className="font-body text-amber-100 font-medium text-xs mt-0.5">Kamu mendapatkan 10 poin!</p>
            </div>
          </div>
        </section>

        {/* CTA Button Section */}
        <section className="pt-2" style={cascadeStyle(0.5)}>
          <button 
            onClick={() => onTabChange && onTabChange('jelajah')}
            className="w-full bg-gradient-to-br from-amber-600 to-amber-700 text-white py-4 rounded-full font-headline font-bold text-lg shadow-lg shadow-amber-900/20 active:scale-95 transition-transform duration-200 flex items-center justify-center gap-2 group"
          >
            Mulai Belajar
            <ArrowRight size={24} className="transition-transform group-hover:translate-x-1" />
          </button>
        </section>

      </div>
    </MainLayout>
  );
}
