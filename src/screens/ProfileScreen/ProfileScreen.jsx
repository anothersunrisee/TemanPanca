import React, { useState, useEffect } from 'react';
import { Pencil, UserSearch, Star, Award, Lock, CheckCircle2, UserCog, LogOut, ChevronRight } from 'lucide-react';
import MainLayout from '../../layouts/MainLayout';
import { supabase } from '../../utils/supabase';

export default function ProfileScreen({ userName, character, onNotificationClick, onTabChange }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const cascadeStyle = (delaySec) => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? 'translateY(0)' : 'translateY(20px)',
    transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delaySec}s`
  });

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <MainLayout activeTab="profil" userName={userName} character={character} onNotificationClick={onNotificationClick} onTabChange={onTabChange}>
      <div className="px-6 pt-6 pb-12 space-y-8">
        
        {/* Avatar Section */}
        <section className="flex flex-col items-center text-center space-y-4 mt-2" style={cascadeStyle(0.1)}>
          <div className="relative">
            <div className="w-32 h-32 rounded-full overflow-hidden bg-secondary-container border-4 border-white shadow-lg">
              <img 
                alt="User Avatar" 
                className="w-full h-full object-cover" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDSQB-ZY7fKQROcz40EZKcM_thowEX-WYRHKAf0_ThgtGne-zXhQ_EpXVMVige_DriQ9eE3Vd1AaoY4ouMfDwTl0rYYktUcZ58YF9CwFcV3NleFY-4TnWjZxZC9iQ1gSmeHmSg3KsBif7YLUg2wqJB7mqC5KP-0k5UJN_h9MATdO8yHwyy0w2GzwgLnB2uC-FSpCFIdAaxjXXN_0KvZ7Wl0bRBhswaIXgXNw5s84RDcYX-268od8Q3frYdUOl5w5YfTDCp6Pj7bBRo"
              />
            </div>
            <div className="absolute bottom-1 right-1 bg-[#fdbb2f] p-2.5 rounded-full shadow-md cursor-pointer hover:scale-110 transition-transform">
              <Pencil size={16} className="text-[#5e4200]" />
            </div>
          </div>
          <div>
            <h2 className="font-headline font-bold text-2xl text-on-surface">Halo, {userName}!</h2>
            <p className="font-body font-bold text-xs text-primary bg-primary-fixed/50 px-4 py-1.5 rounded-full inline-block mt-2">Level 2 • {character}</p>
          </div>
          
          <button className="w-full py-4 rounded-full bg-gradient-to-br from-amber-600 to-amber-700 text-white font-headline font-bold text-lg shadow-lg shadow-amber-900/20 transition-transform active:scale-95 flex items-center justify-center gap-2 mt-2">
            <UserSearch size={22} />
            Ganti Karakter
          </button>
        </section>

        {/* Pencapaian Terbaru Section */}
        <section className="space-y-4" style={cascadeStyle(0.2)}>
          <h3 className="font-headline font-bold text-lg text-on-surface px-1">Pencapaian Terbaru</h3>
          <div className="bg-white rounded-3xl p-6 flex items-center gap-6 shadow-[0_8px_24px_rgba(25,28,29,0.06)] border border-slate-100">
            <div className="flex flex-col items-center justify-center bg-[#996d00] text-white p-4 rounded-2xl min-w-[90px] shadow-sm">
              <span className="text-3xl font-black font-headline tracking-tighter">100</span>
              <span className="text-[10px] font-bold uppercase tracking-widest opacity-90">Poin</span>
            </div>
            <div className="flex flex-1 gap-3 overflow-x-auto no-scrollbar pb-1">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#ffddb9] flex items-center justify-center border-2 border-[#a46700] shadow-sm">
                <Star size={24} className="text-[#835100] fill-[#835100]" />
              </div>
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#f7dbb8] flex items-center justify-center border-2 border-[#745f43] shadow-sm">
                <Award size={24} className="text-[#745f43] fill-[#745f43]" />
              </div>
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#eceeef] flex items-center justify-center border-2 border-[#d8c3af] opacity-40">
                <Lock size={20} className="text-[#857463]" />
              </div>
            </div>
          </div>
        </section>

        {/* Misi Selesai Section */}
        <section className="space-y-4" style={cascadeStyle(0.3)}>
          <div className="flex justify-between items-center px-1">
            <h3 className="font-headline font-bold text-lg text-on-surface flex-1">Misi Selesai</h3>
            <span className="text-xs font-bold text-[#835100] bg-primary-fixed/30 px-3 py-1 rounded-full">1/5 Selesai</span>
          </div>
          <div className="bg-white rounded-3xl p-6 shadow-[0_8px_24px_rgba(25,28,29,0.06)] border border-slate-100">
            <div className="h-4 w-full bg-[#f2f4f5] rounded-full overflow-hidden shadow-inner">
              <div className="h-full rounded-full transition-all duration-1000 bg-gradient-to-r from-[#fdbb2f] to-[#ffb962]" style={{width: '20%'}}></div>
            </div>
            <div className="mt-4 flex items-center gap-3 text-sm text-[#524435] font-semibold bg-[#f8f9fa] p-3 rounded-xl border border-slate-50">
              <CheckCircle2 size={20} className="text-[#835100]" />
              <span>Selesaikan Pengenalan Pancasila</span>
            </div>
          </div>
        </section>

        {/* Settings Section */}
        <section className="space-y-2 mt-4" style={cascadeStyle(0.4)}>
          <div className="bg-white rounded-3xl overflow-hidden shadow-[0_8px_24px_rgba(25,28,29,0.06)] border border-slate-100">
            <button className="w-full flex items-center justify-between px-6 py-4.5 hover:bg-slate-50 transition-colors border-b border-slate-100 active:bg-slate-100">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-slate-50 rounded-full">
                  <UserCog size={20} className="text-[#524435]" />
                </div>
                <span className="font-headline font-semibold text-[#191c1d]">Ganti Nama</span>
              </div>
              <ChevronRight size={20} className="text-[#d8c3af]" />
            </button>
            <button onClick={handleLogout} className="w-full flex items-center justify-between px-6 py-4.5 hover:bg-[#ffdad6]/20 transition-colors active:bg-[#ffdad6]/30">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-[#ffdad6]/30 rounded-full">
                  <LogOut size={20} className="text-[#ba1a1a]" />
                </div>
                <span className="font-headline font-semibold text-[#ba1a1a]">Keluar / Logout</span>
              </div>
            </button>
          </div>
        </section>

      </div>
    </MainLayout>
  );
}
