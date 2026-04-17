import React, { useState, useEffect } from 'react';
import { Pencil, Shirt, Star, Award, Lock, CheckCircle2, UserCog, LogOut, ChevronRight, ShieldCheck } from 'lucide-react';
import MainLayout from '../../layouts/MainLayout';
import { supabase } from '../../utils/supabase';
import { SILA_DATA } from '../../data/silaData';
import { OUTFITS } from '../../data/outfitData';


export default function ProfileScreen({ userName, character, selectedOutfit, onNotificationClick, onTabChange, onCharacterEdit }) {
  const outfitData = OUTFITS.find(o => o.id === selectedOutfit);
  const avatarUrl = outfitData ? outfitData.src : "https://lh3.googleusercontent.com/aida-public/AB6AXuDSQB-ZY7fKQROcz40EZKcM_thowEX-WYRHKAf0_ThgtGne-zXhQ_EpXVMVige_DriQ9eE3Vd1AaoY4ouMfDwTl0rYYktUcZ58YF9CwFcV3NleFY-4TnWjZxZC9iQ1gSmeHmSg3KsBif7YLUg2wqJB7mqC5KP-0k5UJN_h9MATdO8yHwyy0w2GzwgLnB2uC-FSpCFIdAaxjXXN_0KvZ7Wl0bRBhswaIXgXNw5s84RDcYX-268od8Q3frYdUOl5w5YfTDCp6Pj7bBRo";

  const [mounted, setMounted] = useState(false);
  const [completedMateri, setCompletedMateri] = useState([]);
  const [missionPoints, setMissionPoints] = useState(0);
  const [dailyData, setDailyData] = useState({ claimedMissions: [] });

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 50);
    
    setCompletedMateri(JSON.parse(localStorage.getItem('completedMateri') || '[]'));
    setMissionPoints(parseInt(localStorage.getItem('missionPoints') || '0', 10));

    const today = new Date().toISOString().split('T')[0];
    const storedDaily = JSON.parse(localStorage.getItem('dailyProgress') || '{}');
    if (storedDaily.date === today) {
      setDailyData({ claimedMissions: storedDaily.claimedMissions || [] });
    }

    return () => clearTimeout(timer);
  }, []);

  const spentPoints = parseInt(localStorage.getItem('spentPoints') || '0', 10);
  const totalPoints = (completedMateri.length * 150) + missionPoints - spentPoints;

  // Calculate Sila Milestones
  const getSilaProgress = (silaId) => {
    const sila = SILA_DATA[String(silaId)];
    if (!sila?.materiList?.length) return 0;
    const done = sila.materiList.filter(m => completedMateri.includes(m.id)).length;
    return Math.round((done / sila.materiList.length) * 100);
  };

  const unlockedSilas = [1, 2, 3, 4, 5].filter(s => getSilaProgress(s) === 100);

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
                src={avatarUrl}

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
          
          <button
            onClick={onCharacterEdit}
            className="w-full py-4 rounded-full bg-gradient-to-br from-[#835100] to-[#a46700] text-white font-headline font-bold text-lg shadow-[0_8px_24px_rgba(131,81,0,0.20)] transition-transform active:scale-95 flex items-center justify-center gap-2 mt-2"
          >
            <Shirt size={22} />
            Ganti Karakter
          </button>
        </section>

        {/* Pencapaian Terbaru Section */}
        <section className="space-y-4" style={cascadeStyle(0.2)}>
          <h3 className="font-headline font-bold text-lg text-on-surface px-1">Pencapaian & Milestone</h3>
          <div className="bg-white rounded-3xl p-6 shadow-[0_8px_24px_rgba(25,28,29,0.06)] border border-slate-100 flex flex-col gap-5">
            
            {/* Total Points Header */}
            <div className="flex items-center gap-4 border-b border-slate-100 pb-5">
              <div className="flex flex-col items-center justify-center bg-amber-600 text-white p-4 rounded-2xl min-w-[90px] shadow-sm">
                <span className="text-3xl font-black font-headline tracking-tighter">{totalPoints}</span>
                <span className="text-[10px] font-bold uppercase tracking-widest opacity-90">Poin</span>
              </div>
              <div className="flex-1">
                <p className="font-headline font-extrabold text-slate-800 leading-tight">Total Skor PancaGo</p>
                <p className="text-xs font-body text-slate-500 mt-0.5">Dikumpulkan dari materi & misi harian.</p>
              </div>
            </div>

            {/* Medals & Milestones Scroll */}
            <div>
              <p className="text-xs font-bold text-slate-400 font-body uppercase tracking-wider mb-3">Medali Perjalananmu</p>
              <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
                
                {/* Default Starter Medal */}
                <div className="flex flex-col items-center gap-2 min-w-[70px]">
                  <div className="flex-shrink-0 w-14 h-14 rounded-full bg-amber-100 flex items-center justify-center border-2 border-amber-600 shadow-sm relative">
                    <Star size={26} className="text-amber-600 fill-amber-600" />
                  </div>
                  <span className="text-[10px] font-bold text-center text-amber-800 leading-tight">Pionir<br/>Panca</span>
                </div>

                {/* Sila Milestones */}
                {[1, 2, 3, 4, 5].map(silaNum => {
                  const isUnlocked = unlockedSilas.includes(silaNum);
                  
                  return (
                    <div key={silaNum} className={`flex flex-col items-center gap-2 min-w-[70px] ${!isUnlocked && 'opacity-50 grayscale-[40%]'}`}>
                      <div className={`flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center border-2 shadow-sm ${isUnlocked ? 'bg-amber-100 border-amber-600' : 'bg-slate-100 border-slate-300'}`}>
                        {isUnlocked ? (
                          <ShieldCheck size={26} className="text-amber-600" />
                        ) : (
                          <Lock size={20} className="text-slate-400" />
                        )}
                      </div>
                      <span className={`text-[10px] font-bold text-center leading-tight ${isUnlocked ? 'text-amber-800' : 'text-slate-500'}`}>
                        Tamat<br/>Sila {silaNum}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Misi Selesai Section */}
        <section className="space-y-4" style={cascadeStyle(0.3)}>
          <div className="flex justify-between items-center px-1">
            <h3 className="font-headline font-bold text-lg text-on-surface flex-1">Misi Harian Selesai</h3>
            <span className="text-xs font-bold text-amber-800 bg-amber-100 px-3 py-1 rounded-full border border-amber-200">
              {dailyData.claimedMissions.length}/2 Selesai
            </span>
          </div>
          <div className="bg-white rounded-3xl p-6 shadow-[0_8px_24px_rgba(25,28,29,0.06)] border border-slate-100">
            <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden shadow-inner">
              <div 
                className="h-full rounded-full transition-all duration-1000 bg-gradient-to-r from-amber-400 to-amber-500" 
                style={{width: `${(dailyData.claimedMissions.length / 2) * 100}%`}}>
              </div>
            </div>
            {dailyData.claimedMissions.length > 0 ? (
              <div className="mt-4 flex items-center gap-3 text-sm text-slate-700 font-semibold bg-slate-50 py-3 px-4 rounded-xl border border-slate-100">
                <CheckCircle2 size={20} className="text-green-500" />
                <span>Kamu telah menyelesaikan {dailyData.claimedMissions.length} misi hari ini!</span>
              </div>
            ) : (
              <div className="mt-4 flex items-center gap-3 text-sm text-slate-500 font-semibold bg-slate-50 py-3 px-4 rounded-xl border border-slate-100">
                <CheckCircle2 size={20} className="text-slate-300" />
                <span>Belum ada misi yang diselesaikan hari ini.</span>
              </div>
            )}
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
