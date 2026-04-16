import React, { useState, useEffect } from 'react';
import { BookOpen, Trophy, Star, ArrowRight, CheckCircle2, Hourglass, Gift, Check } from 'lucide-react';
import MainLayout from '../../layouts/MainLayout';

export default function MisiScreen({ userName, character, onNotificationClick, onTabChange }) {
  const [mounted, setMounted] = useState(false);
  const [dailyData, setDailyData] = useState({ materiCompletedToday: [], claimedMissions: [] });

  useEffect(() => {
    // Simple mount cascade effect
    const timer = setTimeout(() => setMounted(true), 50);

    // Read daily progress
    const today = new Date().toISOString().split('T')[0];
    const stored = JSON.parse(localStorage.getItem('dailyProgress') || '{}');
    if (stored.date === today) {
      setDailyData({
        materiCompletedToday: stored.materiCompletedToday || [],
        claimedMissions: stored.claimedMissions || []
      });
    }

    return () => clearTimeout(timer);
  }, []);

  const cascadeStyle = (delaySec) => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? 'translateY(0)' : 'translateY(20px)',
    transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delaySec}s`
  });

  const missions = [
    { id: 'm1', title: 'Belajar 1 Materi', target: 1, reward: 20, icon: BookOpen, color: 'primary' },
    { id: 'm2', title: 'Belajar 2 Materi', target: 2, reward: 50, icon: Trophy, color: 'tertiary' }
  ];

  const completedCount = dailyData.materiCompletedToday.length;

  // Derive total daily progress
  const totalMissions = missions.length;
  const completedMissionsCount = missions.filter(m => completedCount >= m.target).length;
  const progressPercent = (completedMissionsCount / totalMissions) * 100;

  const handleClaim = (missionId, reward) => {
    const today = new Date().toISOString().split('T')[0];
    const stored = JSON.parse(localStorage.getItem('dailyProgress') || '{}');
    
    // Safety check date
    if (stored.date !== today) return;
    
    const newClaimed = [...(stored.claimedMissions || []), missionId];
    stored.claimedMissions = newClaimed;
    localStorage.setItem('dailyProgress', JSON.stringify(stored));
    
    setDailyData(prev => ({ ...prev, claimedMissions: newClaimed }));

    // Add points
    const currentPoints = parseInt(localStorage.getItem('missionPoints') || '0', 10);
    localStorage.setItem('missionPoints', (currentPoints + reward).toString());
  };

  return (
    <MainLayout activeTab="misi" userName={userName} character={character} onNotificationClick={onNotificationClick} onTabChange={onTabChange}>
      <div className="px-6 pt-8 space-y-8 pb-10">
        
        {/* Header Section */}
        <section className="space-y-1" style={cascadeStyle(0.1)}>
          <h1 className="font-headline font-black text-3xl text-on-surface tracking-tight">Misi Hari Ini</h1>
          <p className="font-body text-secondary font-medium">Selesaikan misi untuk poin ekstra!</p>
        </section>

        {/* Mission List */}
        <div className="bg-white rounded-2xl p-6 shadow-[0_8px_24px_-4px_rgba(25,28,29,0.06)] space-y-4 border border-surface-container-low" style={cascadeStyle(0.2)}>
          
          {missions.map((m, idx) => {
            const isCompleted = completedCount >= m.target;
            const isClaimed = dailyData.claimedMissions.includes(m.id);
            const Icon = m.icon;

            return (
              <div key={m.id} className="flex items-center justify-between p-4 bg-surface-container-low/50 rounded-xl hover:bg-surface-container-low transition-colors">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 flex items-center justify-center rounded-full shadow-sm ${m.color === 'primary' ? 'bg-primary-container/10 text-primary' : 'bg-tertiary-container/10 text-tertiary'}`}>
                    <Icon size={20} />
                  </div>
                  <div>
                    <p className="font-bold font-body text-on-surface-variant text-[13px]">{m.title}</p>
                    <p className="font-body text-[10px] text-slate-500 font-semibold">{Math.min(completedCount, m.target)} / {m.target}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  {!isCompleted ? (
                    <Hourglass size={24} className="text-amber-500 opacity-80" />
                  ) : isClaimed ? (
                    <CheckCircle2 size={24} className="text-green-500" />
                  ) : (
                    <button 
                      onClick={() => handleClaim(m.id, m.reward)}
                      className="bg-primary text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md animate-bounce-slow flex items-center gap-1"
                    >
                      Klaim <Gift size={14} />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Progress Section */}
        <section className="space-y-3" style={cascadeStyle(0.3)}>
          <div className="flex justify-between items-end">
            <h3 className="font-headline font-bold text-lg text-on-surface">Progres Misi</h3>
            <span className="font-body text-amber-800 font-bold text-xs bg-amber-100 px-3 py-1 rounded-full border border-amber-200">{completedMissionsCount} / {totalMissions} selesai</span>
          </div>
          <div className="h-4 w-full bg-amber-50 rounded-full overflow-hidden relative border border-amber-100">
            {/* Progress Bar */}
            <div 
              className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full transition-all duration-1000 ease-out flex justify-end items-center px-1" 
              style={{ width: mounted ? `${progressPercent}%` : '0%' }}
            >
              {progressPercent > 0 && <div className="w-1.5 h-1.5 bg-white/80 rounded-full shadow-sm"></div>}
            </div>
          </div>
        </section>

        {/* Reward Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-[#835100] to-[#c87e00] rounded-2xl p-6 text-white shadow-xl hover:-translate-y-1 transition-transform" style={cascadeStyle(0.4)}>
          {/* Decorative element */}
          <div className="absolute -top-6 -right-6 w-24 h-24 bg-white/10 rounded-full blur-xl animate-pulse"></div>
          <div className="flex flex-col gap-2 relative z-10">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white/20 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center shadow-inner relative">
                <Star size={32} className="text-amber-100 fill-amber-100 drop-shadow" />
              </div>
              <div>
                <h4 className="font-headline font-black text-xl leading-tight">Poin Misi Terkumpul</h4>
                <p className="font-body text-amber-100 font-medium text-xs mt-0.5">Tukarkan hadiah nanti!</p>
              </div>
            </div>
            
            <div className="mt-2 flex items-center justify-between bg-black/10 rounded-lg p-3 border border-white/10">
              <span className="font-body text-sm font-semibold opacity-90">Total Poin Ekstra:</span>
              <span className="font-headline font-black text-2xl text-amber-50">{localStorage.getItem('missionPoints') || '0'} XP</span>
            </div>
          </div>
        </section>

        {/* CTA Button Section */}
        <section className="pt-2" style={cascadeStyle(0.5)}>
          <button 
            onClick={() => onTabChange && onTabChange('jelajah')}
            className="w-full bg-gradient-to-br from-amber-600 to-amber-700 text-white py-4 rounded-full font-headline font-bold text-lg shadow-lg shadow-amber-900/20 active:scale-95 transition-transform duration-200 flex items-center justify-center gap-2 group"
          >
            Lanjut Belajar
            <ArrowRight size={24} className="transition-transform group-hover:translate-x-1" />
          </button>
        </section>

      </div>
    </MainLayout>
  );
}
