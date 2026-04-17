import React, { useState, useEffect } from 'react';
import { Star, ArrowRight, Check } from 'lucide-react';

import MainLayout from '../../layouts/MainLayout';
import { SILA_DATA } from '../../data/silaData';

const MAP_IMG = "https://lh3.googleusercontent.com/aida-public/AB6AXuASRe5iH7xRqeKAol_ye77u7snNdszKmumBbHsafGdm7k4lqwrlBgcmRaKyNAxoq5iOKysHJ5kXmYSOzygimbcpKbRpcxh5Kde3QVIQG68UY2bXRiCbkNXysfDO_4HsH7iGsHJ-qx6w7KoDLmMCtqfDxvs9tNy8VeOK8jXZjKoczenGLoEcbHfOmZ4zM_A6v7KojP3fQewpQ0t6duNK2g6-ptNHyLUuhsIl57uVJtplLDxQlPWaVfEb28CsVftXa6Gk1FZl7ZBpw3c";
const BIMO      = "https://lh3.googleusercontent.com/aida-public/AB6AXuCItkigDW3rEPlzAEBka2LKa1_eC_qt0dDiLP-JXboxXdJFQN3OptxrTb8ad6pCS2P-fVQAIqYX00Riwb5WhZKk-A5XHZTz8nlDury5W-O-lk6OIXRoTmTN7esTlOpwtxx89SVPxzJErYo1ubkOZJDC0OXu6pfvxW95eNeEo_56WXu5srU_b0BVmdbMPGMN4rMK0ywRJKcsOBUFXthuXN5qhdnkjhSn2E6DBic3mtC05B7ROVxn1bl00lPHRORucgG6ZsRd3l_LoYc";
const BIMO_SILA1= "https://lh3.googleusercontent.com/aida-public/AB6AXuBpswKK2Ukx9Dil1WwiitnQZxXAPqD_5YJUB_NGMQt67Nm1Y5Sl-NRZGh4LKKqQ4u7GTJZuwmIhCVy-rq7QlvuxFgEVkEdakjCpbzjHDmrVnTjx_kFyjrv5f6DYCa8UFZh9rmJZXeHYlUhrjk9c0QO9ytSXKJLsElAOZJ11A_UJGi-qQnrR_Acq5wu9H_MAkcLS9asm6dBAWhfJdjs9mt8AXcbyceQSu5R5Kj8NUAAzt9FF5nCk-_cgWmC5rLky-IlGvKaVPeqbZnk";
const SIREGAR   = "https://lh3.googleusercontent.com/aida-public/AB6AXuAe6PLCvdhY25YiBaOoP0UU35zHclS9Sq8JYLfy-VFB4azsx7JTMnEL-MYsclT-SXu7YVwAzcdn3dIMCC_WeWsRqyeqPP2LqID3GZSunSveKQnq89YAIyKVw1P-aS1MdJz9gnNVtFApd90yE6UEq4JDaq4KVGiZwBr_df-FCUeR5bMU55iQ8CpHvgY5W8Lccw9Oq6U_AcPoZ5vEy_KDobi08JOe7nxBzwy1zeGRrbg17PnELohRerQunuMKnda8jn6jDmS0KnSniTA";
const SINTA     = "https://lh3.googleusercontent.com/aida-public/AB6AXuDB3yBKAM3nv7-mp5OkCr8pU3OoDCvc4EyeMkU_sfhb392LfsAhzdCH1z1mUYHlqU-pkarvW9LJpx10oVPOY4oSvWuXwa-yHBgn09CsBmD-46Db5F-H6PYR_6TDdJppEqCnEf0r7daRinbRw0Wx83jxpy9xgE96kRxjWmOa-BmDI2_15Gf6l_Hq4wTa8BJ7OyYMv3e6Jw6j1MM2KWvel3F7NfW8CrMhqsewVoEUrU5jQmICr9PC6r7Lgd-GPvtE-jzJ2Ze7JyX8YDU";
const PASSA     = "https://lh3.googleusercontent.com/aida-public/AB6AXuB7lvoESQHpoJDRChWSPgGcvpsyDpYD3rnUyOIYlTGLGBmCUt49vXxut5clZvFU6OA02qIQLalLDGkv0Q2coawNuqd4meopK-USK28EGFvK9X1GT_iGg0megL7PWDr1-UoyN5byyWO8TCP649Z9drZ--k8_4sDG4wCwyF0lJnZRMk2fGW61syVOj4N-nTvzhRYGnt2xavvKiA5Zr1z6R4agFShwce3__t6KnAaaGC8GmeDWtXIyjhBbRkw25RwjfTPavtjjSA4UhYo";
const ARUYA     = "https://lh3.googleusercontent.com/aida-public/AB6AXuBaLFfFGf6bGRZ_LEnFjaeQ8BGKkKg5Rbq095H8Oa7tmR5R__Fzxa6d6EXL0oi4y55_-QZsTkgWoMNKGImlm5olJm-pMyR2by5eLASS7mj67jGOYf2dbnoMIr-MWaQfODxVEZDRtBOV7JCANpyxX46XppO-_t2nL-S9MdI3kLeNFLiY3SLY6-LsnhD0q9sHEk00vcD6fF0n9RBL9H7IafKDIwVJJcUIwa08rBbq7xcZA__Yi7T3IwkJKp9c6rIfqlaRBi62RraW_jY";

// Static metadata for all 5 silas
const SILA_META = [
  { id: 1, name: "Ketuhanan Yang Maha Esa",                          guide: "Bimo",    img: BIMO_SILA1 },
  { id: 2, name: "Kemanusiaan yang Adil dan Beradab",                guide: "Siregar", img: SIREGAR   },
  { id: 3, name: "Persatuan Indonesia",                              guide: "Sinta",   img: SINTA     },
  { id: 4, name: "Kerakyatan yang Dipimpin oleh Hikmat",             guide: "Passa",   img: PASSA     },
  { id: 5, name: "Keadilan Sosial bagi Seluruh Rakyat",              guide: "Aruya",   img: ARUYA     },
];

// Compute progress % for one sila from completedMateri list
function getSilaProgress(silaId, completedMateri) {
  const sila = SILA_DATA[String(silaId)];
  if (!sila || !sila.materiList || sila.materiList.length === 0) return 0;
  const done = sila.materiList.filter(m => completedMateri.includes(m.id)).length;
  return Math.round((done / sila.materiList.length) * 100);
}

// Check if a sila is fully completed
function isSilaComplete(silaId, completedMateri) {
  return getSilaProgress(silaId, completedMateri) === 100;
}

// Check if a sila is unlocked (idx=0 always, else previous sila finished)
function isSilaUnlocked(idx, completedMateri) {
  if (idx === 0) return true;
  return isSilaComplete(idx, completedMateri); // silaId of previous = idx (1-indexed, so idx = prev id)
}

function getActiveSila(completedMateri) {
  for (let i = 1; i <= 5; i++) {
    if (getSilaProgress(i, completedMateri) < 100) return i;
  }
  return 5;
}

const MapPin = ({ id, img, posClass, unlocked, complete, isActive, onSelect }) => (
  <div 
    onClick={() => unlocked && onSelect && onSelect(id)} 
    className={`absolute ${posClass} transform -translate-x-1/2 transition-all duration-300 z-10 
      ${unlocked ? 'cursor-pointer hover:scale-110 active:scale-95' : 'cursor-not-allowed'}
      ${isActive ? 'animate-float' : ''}`}
  >
    <div className={`relative w-12 h-12 md:w-14 md:h-14 rounded-full border-[3px] shadow-lg overflow-hidden transition-all
      ${unlocked ? 'border-white scale-100' : 'border-slate-200 scale-90 grayscale opacity-80'}`}>
      <img className="w-full h-full object-cover" alt={`Sila ${id}`} src={img} />
      
      {!unlocked && (
        <div className="absolute inset-0 bg-slate-900/10 flex items-center justify-center">
          <div className="bg-slate-800/80 p-1 rounded-full">
            <Star size={12} className="text-white opacity-40" />
          </div>
        </div>
      )}
    </div>

    {/* Status Indicators */}
    {complete && (
      <div className="absolute -top-1 -right-1 bg-green-500 border-2 border-white text-white p-0.5 rounded-full shadow-sm">
        <Check size={12} strokeWidth={4} />
      </div>
    )}
    
    {isActive && (
      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-amber-500 text-white text-[10px] font-black px-3 py-0.5 rounded-full shadow-md whitespace-nowrap animate-pulse">
        Mulai!
      </div>
    )}
  </div>
);

export default function JelajahScreen({ userName, character, onNotificationClick, onTabChange, onSilaSelect }) {
  const [mounted, setMounted] = useState(false);
  const [completedMateri] = useState(() =>
    JSON.parse(localStorage.getItem('completedMateri') || '[]')
  );

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const cascadeStyle = (delaySec) => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? 'translateY(0)' : 'translateY(20px)',
    transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delaySec}s`
  });

  return (
    <MainLayout activeTab="jelajah" userName={userName} character={character} onNotificationClick={onNotificationClick} onTabChange={onTabChange}>
      <div className="px-6 mb-8 pt-6">

        {/* Hero Map */}
        <section className="relative mb-12" style={cascadeStyle(0.1)}>
          <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden shadow-xl shadow-slate-200/50">
            <img className="w-full h-full object-cover" alt="Map Jelajah" src={MAP_IMG} />

            {/* Map pins using our new generic component */}
            <MapPin 
              id={1} img={BIMO} posClass="top-[20%] left-[22%]" 
              unlocked={isSilaUnlocked(0, completedMateri)} 
              complete={isSilaComplete(1, completedMateri)}
              isActive={getActiveSila(completedMateri) === 1}
              onSelect={onSilaSelect}
            />
            <MapPin 
              id={2} img={SIREGAR} posClass="top-[45%] left-[35%]" 
              unlocked={isSilaUnlocked(1, completedMateri)} 
              complete={isSilaComplete(2, completedMateri)}
              isActive={getActiveSila(completedMateri) === 2}
              onSelect={onSilaSelect}
            />
            <MapPin 
              id={3} img={SINTA} posClass="bottom-[20%] left-[45%]" 
              unlocked={isSilaUnlocked(2, completedMateri)} 
              complete={isSilaComplete(3, completedMateri)}
              isActive={getActiveSila(completedMateri) === 3}
              onSelect={onSilaSelect}
            />
            <MapPin 
              id={4} img={PASSA} posClass="top-[30%] right-[25%]" 
              unlocked={isSilaUnlocked(3, completedMateri)} 
              complete={isSilaComplete(4, completedMateri)}
              isActive={getActiveSila(completedMateri) === 4}
              onSelect={onSilaSelect}
            />
            <MapPin 
              id={5} img={ARUYA} posClass="bottom-[35%] right-[20%]" 
              unlocked={isSilaUnlocked(4, completedMateri)} 
              complete={isSilaComplete(5, completedMateri)}
              isActive={getActiveSila(completedMateri) === 5}
              onSelect={onSilaSelect}
            />
          </div>

          <div className="mt-8 text-center">
            <h1 className="font-headline text-3xl font-extrabold text-on-surface tracking-tight leading-tight">Jelajah Nilai Pancasila</h1>
            <p className="font-body text-slate-500 mt-2 text-sm font-medium">Ikuti petualangan bersama teman-teman!</p>
          </div>
        </section>

        {/* Sila Cards */}
        <div className="space-y-6">
          {SILA_META.map((sila, idx) => {
            const unlocked = isSilaUnlocked(idx, completedMateri);
            const progress = getSilaProgress(sila.id, completedMateri);
            const started  = progress > 0;
            const delay    = 0.2 + idx * 0.1;

            const isFirstCard = idx === 0;

            // Amber when unlocked, slate when locked
            const cardShadow  = unlocked ? 'shadow-xl shadow-slate-200/40' : 'shadow-md shadow-slate-200/30';
            const badgeBg     = unlocked ? 'bg-primary-fixed/30 text-primary' : 'bg-slate-100 text-slate-500';
            const titleCol    = unlocked ? 'text-on-surface' : 'text-slate-400';
            const guideCol    = unlocked ? 'text-slate-500' : 'text-slate-400';
            const progressCol = unlocked ? 'text-primary' : 'text-slate-400';
            const progressBar = unlocked
              ? 'bg-gradient-to-r from-amber-400 to-amber-500'
              : 'bg-slate-300';
            const btnClass    = unlocked
              ? 'bg-gradient-to-br from-amber-600 to-amber-700 text-white shadow-lg shadow-amber-900/20'
              : 'bg-slate-200 text-slate-400 cursor-not-allowed';
            const btnLabel    = !unlocked ? 'Terkunci' : started ? 'Lanjut Belajar' : 'Mulai Belajar';
            const starClass   = unlocked ? 'text-amber-500 fill-amber-500' : 'text-slate-300 fill-slate-300';

            return (
              <div
                key={sila.id}
                className={`bg-white rounded-2xl p-6 ${cardShadow} relative overflow-hidden active:scale-[0.98] transition-transform duration-200 border border-slate-100`}
                style={cascadeStyle(delay)}
              >
                <div className="flex items-start gap-5">
                  <div className={`w-16 h-16 rounded-full overflow-hidden shrink-0 border-2 ${unlocked ? 'bg-primary-fixed border-primary-fixed/50' : 'bg-slate-100 border-slate-200'}`}>
                    <img className="w-full h-full object-cover" alt={sila.guide} src={sila.img} />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <span className={`font-headline text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full mb-3 inline-block ${badgeBg}`}>
                        Sila {sila.id}
                      </span>
                      <Star className={starClass} size={20} />
                    </div>
                    <h2 className={`font-headline text-lg font-bold leading-tight ${titleCol}`}>{sila.name}</h2>
                    <p className={`font-body text-xs mt-1.5 font-medium ${guideCol}`}>Dipandu oleh {sila.guide}</p>

                    <div className="mt-5">
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Progres Belajar</span>
                        <span className={`text-[10px] font-black ${progressCol}`}>{progress}%</span>
                      </div>
                      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden relative">
                        <div
                          className={`h-full rounded-full transition-all duration-1000 ease-out ${progressBar}`}
                          style={{ width: mounted ? `${progress}%` : '0%' }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => unlocked && onSilaSelect && onSilaSelect(sila.id)}
                  disabled={!unlocked}
                  className={`w-full mt-6 py-3.5 rounded-full font-bold text-sm flex items-center justify-center gap-2 active:scale-95 transition-transform ${btnClass}`}
                >
                  {btnLabel}
                  {unlocked && <ArrowRight size={16} />}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </MainLayout>
  );
}
