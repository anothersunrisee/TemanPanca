import React, { useState, useEffect } from 'react';
import { Star, ArrowRight, Target } from 'lucide-react';
import MainLayout from '../../layouts/MainLayout';
import { BOY_IMG, GIRL_IMG } from '../../components/TopAppBar';
import { SILA_DATA } from '../../data/silaData';
import { OUTFITS } from '../../data/outfitData';


const SCENERY_IMG = "https://lh3.googleusercontent.com/aida-public/AB6AXuDMmBeq1IBaM3cwnuglwQ4ryF6yGMEtEaiqaeuTYpPw-DsUyquCM3oXZw0SCgt9RloXkQ3qzcHTcSBxMPh-HpdWh7mKuD2qBUQkenGF4hgxZKZFAR9OX9z4qhx7yzSkuXd4e2Wm10X31-_EBnyysilm9yvrCOlnkNxZTWQjWhXHjZ1bXfl33QL4iwT5M98_7QrJXCztYmG9JGtcPAGz8njKGIlERI-5eWIczQerel29y_eiRBFisJA_d-qKkZdFM-1SpKs6KoDmEUI";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getSilaProgress(silaId, completedMateri) {
  const sila = SILA_DATA[String(silaId)];
  if (!sila?.materiList?.length) return 0;
  const done = sila.materiList.filter(m => completedMateri.includes(m.id)).length;
  return Math.round((done / sila.materiList.length) * 100);
}

function isSilaUnlocked(idx, completedMateri) {
  if (idx === 0) return true;
  return getSilaProgress(idx, completedMateri) === 100; // prev sila id = idx (1‑indexed)
}

// Which sila is currently active (first incomplete, or 5 if all done)
function getActiveSila(completedMateri) {
  for (let i = 1; i <= 5; i++) {
    if (getSilaProgress(i, completedMateri) < 100) return i;
  }
  return 5;
}

// ─── Animated Donut ───────────────────────────────────────────────────────────
const AnimatedDonut = ({ percentage, sizeClass, innerClasses, formatLabel, dimmed = false }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let animationFrame;
    const duration = 1500;
    const startTime = performance.now();

    const animate = (time) => {
      const elapsed = time - startTime;
      const t = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - t, 4);
      setProgress(ease * percentage);
      if (t < 1) animationFrame = requestAnimationFrame(animate);
    };

    const timeout = setTimeout(() => { animationFrame = requestAnimationFrame(animate); }, 400);
    return () => { clearTimeout(timeout); if (animationFrame) cancelAnimationFrame(animationFrame); };
  }, [percentage]);

  const deg = (progress / 100) * 360;
  const bg = dimmed
    ? `conic-gradient(#cbd5e1 ${deg}deg, #e2e8f0 0deg)`
    : `conic-gradient(#fdbb2f ${deg}deg, #f7dbb8 0deg)`;

  return (
    <div className={`relative rounded-full flex-shrink-0 ${sizeClass}`} style={{ background: bg }}>
      <div className={`absolute bg-white rounded-full flex items-center justify-center z-10 ${innerClasses}`}>
        {formatLabel(Math.round(progress))}
      </div>
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
export default function HomeScreen({ userName, character, selectedOutfit, onNotificationClick, onTabChange, onSilaSelect }) {
  const outfitData = OUTFITS.find(o => o.id === selectedOutfit);
  const avatarUrl = outfitData ? outfitData.src : (character === 'Perempuan' ? GIRL_IMG : BOY_IMG);

  const firstName = userName ? userName.split(' ')[0] : 'Kawan';

  const [mounted, setMounted] = useState(false);
  const [xpProgress, setXpProgress] = useState(0);

  // Read progress from localStorage on mount
  const [completedMateri] = useState(() =>
    JSON.parse(localStorage.getItem('completedMateri') || '[]')
  );

  // Compute derived values
  const activeSilaId   = getActiveSila(completedMateri);
  const activeSila     = SILA_DATA[String(activeSilaId)];
  const activeProgress = getSilaProgress(activeSilaId, completedMateri);

  // Total progress across all silas
  const totalMateri    = Object.values(SILA_DATA).reduce((acc, s) => acc + (s.materiList?.length ?? 0), 0);
  const totalCompleted = completedMateri.length;
  const overallPercent = totalMateri > 0 ? Math.round((totalCompleted / totalMateri) * 100) : 0;
  
  // Total points
  const basePoints = totalCompleted * 150;
  const missionPoints = parseInt(localStorage.getItem('missionPoints') || '0', 10);
  const spentPoints = parseInt(localStorage.getItem('spentPoints') || '0', 10);
  const totalPoints = basePoints + missionPoints - spentPoints;

  useEffect(() => {
    const mountTimer = setTimeout(() => setMounted(true), 50);
    const xpTimer    = setTimeout(() => setXpProgress(overallPercent), 500);
    return () => { clearTimeout(mountTimer); clearTimeout(xpTimer); };
  }, [overallPercent]);

  const cascadeStyle = (delaySec) => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? 'translateY(0)' : 'translateY(20px)',
    transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delaySec}s`
  });

  return (
    <MainLayout activeTab="home" userName={userName} character={character} onNotificationClick={onNotificationClick} onTabChange={onTabChange}>

      {/* Level / XP Bar */}
      <section className="px-6 mb-6 flex items-center justify-between bg-surface-container-low/50 py-4 rounded-b-xl border-b border-surface-container gap-4" style={cascadeStyle(0.1)}>
        <div className="flex flex-col gap-1 w-[55%] flex-shrink-0">
          <div className="flex justify-between items-center mb-1">
            <span className="font-headline font-bold text-sm text-primary">Progres Total</span>
            <span className="font-body text-[10px] text-slate-500 font-semibold">{totalCompleted}/{totalMateri} Materi</span>
          </div>
          <div className="w-full h-2 bg-amber-100 rounded-full overflow-hidden">
            <div className="bg-primary h-full rounded-full transition-all duration-1000 ease-out" style={{ width: `${xpProgress}%` }}></div>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-primary-fixed/30 px-4 py-2.5 rounded-xl ml-auto border border-primary-fixed/20 shadow-sm">
          <Star size={20} className="text-amber-700 fill-amber-700" />
          <div className="flex flex-col items-start leading-none gap-0.5">
            <span className="font-headline font-black text-[15px] text-amber-800">{totalPoints}</span>
            <span className="font-body text-[9px] font-bold text-amber-700 uppercase tracking-widest">Poin</span>
          </div>
        </div>
      </section>

      {/* Hero */}
      <section className="relative px-6 mb-8 mt-4" style={cascadeStyle(0.2)}>
        <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-b from-sky-200 to-amber-50">
          <img className="absolute inset-0 w-full h-full object-cover" alt="Scenery" src={SCENERY_IMG} />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-48 z-10 transition-transform duration-700 hover:scale-105">
            <img className="w-full h-full object-contain filter drop-shadow-md" alt="Character Avatar" src={avatarUrl} />
          </div>
          <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20 w-[85%] animate-bounce-slow">
            <div className="bg-white/95 backdrop-blur rounded-2xl px-6 py-4 shadow-lg relative border border-white">
              <p className="font-headline font-bold text-primary text-center leading-tight">
                Waktunya Menjelajah Pancasila, {firstName}!
              </p>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white/95 rotate-45 border-b border-r border-white"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Lanjut Belajar — dynamic from real progress */}
      <section className="px-6 mb-10" style={cascadeStyle(0.3)}>
        <h2 className="font-headline font-extrabold text-2xl text-on-surface mb-4">Lanjut Belajar</h2>
        <div
          onClick={() => onSilaSelect && onSilaSelect(activeSilaId)}
          className="bg-white p-6 rounded-2xl shadow-[0_8px_24px_rgba(25,28,29,0.06)] flex items-center gap-6 border-l-8 border-amber-400 hover:-translate-y-1 transition-transform cursor-pointer active:scale-[0.98]"
        >
          <AnimatedDonut
            percentage={activeProgress}
            sizeClass="w-20 h-20"
            innerClasses="inset-2 shadow-inner"
            formatLabel={(p) => <span className="font-headline font-black text-xl text-primary">{p}%</span>}
          />
          <div className="flex-grow">
            <p className="font-body font-medium text-slate-500 text-xs uppercase tracking-widest mb-1">
              {activeProgress === 0 ? 'Belum Dimulai' : activeProgress === 100 ? 'Selesai ✓' : 'Sedang Dipelajari'}
            </p>
            <h3 className="font-headline font-bold text-xl text-on-surface leading-tight mb-3">
              Sila {activeSilaId}: {activeSila?.title?.split(' ').slice(0, 2).join(' ')}
            </h3>
            <button className="bg-gradient-to-br from-amber-600 to-amber-700 text-white font-headline font-bold py-2.5 px-6 rounded-full text-sm shadow-md active:scale-95 transition-transform">
              {activeProgress === 0 ? 'Mulai Belajar' : 'Lanjutkan'}
            </button>
          </div>
        </div>
      </section>

      {/* Progres Sila — all 5 donuts with real data */}
      <section className="px-6 mb-10" style={cascadeStyle(0.4)}>
        <div className="flex justify-between items-end mb-6">
          <h2 className="font-headline font-extrabold text-2xl text-on-surface">Progres Sila</h2>
          <button
            className="text-primary font-bold text-sm flex items-center gap-1 hover:underline"
            onClick={() => onTabChange && onTabChange('jelajah')}
          >
            Lihat Detail <ArrowRight size={16} />
          </button>
        </div>

        <div className="grid grid-cols-5 gap-3">
          {[1, 2, 3, 4, 5].map((silaNum, idx) => {
            const prog     = getSilaProgress(silaNum, completedMateri);
            const unlocked = isSilaUnlocked(idx, completedMateri);

            return (
              <div
                key={silaNum}
                onClick={() => unlocked && onSilaSelect && onSilaSelect(silaNum)}
                className={`flex flex-col items-center gap-2 transition-transform ${unlocked ? 'hover:-translate-y-1 cursor-pointer' : 'opacity-50 cursor-not-allowed'}`}
              >
                <AnimatedDonut
                  percentage={prog}
                  sizeClass="w-[50px] h-[50px] shadow-sm"
                  innerClasses="inset-1.5"
                  dimmed={!unlocked}
                  formatLabel={() => (
                    <span className={`text-[14px] font-headline font-black ${unlocked ? 'text-primary' : 'text-slate-400'}`}>
                      {silaNum}
                    </span>
                  )}
                />
                <span className={`text-[10px] font-bold font-body ${unlocked ? 'text-slate-600' : 'text-slate-400'}`}>
                  {prog > 0 ? `${prog}%` : `Sila ${silaNum}`}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Misi Harian */}
      <section className="px-6 mb-8" style={cascadeStyle(0.5)}>
        <div className="bg-secondary-container rounded-2xl p-5 flex items-center gap-4 relative overflow-hidden group cursor-pointer hover:shadow-md transition-shadow">
          <div className="z-10 transition-transform group-hover:translate-x-1">
            <h4 className="font-headline font-bold text-on-secondary-container">Misi Harian</h4>
            <p className="text-sm font-body text-on-secondary-container/80 mt-1">Selesaikan 2 misi hari ini!</p>
          </div>
          <Target size={72} strokeWidth={1.5} className="text-white/40 absolute -right-4 -bottom-2 transition-transform group-hover:scale-110 group-hover:-rotate-12" />
        </div>
      </section>
    </MainLayout>
  );
}
