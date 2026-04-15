import React, { useState, useEffect } from 'react';
import { Star, ArrowRight, ChevronRight } from 'lucide-react';
import MainLayout from '../../layouts/MainLayout';

const MAP_IMG = "https://lh3.googleusercontent.com/aida-public/AB6AXuASRe5iH7xRqeKAol_ye77u7snNdszKmumBbHsafGdm7k4lqwrlBgcmRaKyNAxoq5iOKysHJ5kXmYSOzygimbcpKbRpcxh5Kde3QVIQG68UY2bXRiCbkNXysfDO_4HsH7iGsHJ-qx6w7KoDLmMCtqfDxvs9tNy8VeOK8jXZjKoczenGLoEcbHfOmZ4zM_A6v7KojP3fQewpQ0t6duNK2g6-ptNHyLUuhsIl57uVJtplLDxQlPWaVfEb28CsVftXa6Gk1FZl7ZBpw3c";
const BIMO = "https://lh3.googleusercontent.com/aida-public/AB6AXuCItkigDW3rEPlzAEBka2LKa1_eC_qt0dDiLP-JXboxXdJFQN3OptxrTb8ad6pCS2P-fVQAIqYX00Riwb5WhZKk-A5XHZTz8nlDury5W-O-lk6OIXRoTmTN7esTlOpwtxx89SVPxzJErYo1ubkOZJDC0OXu6pfvxW95eNeEo_56WXu5srU_b0BVmdbMPGMN4rMK0ywRJKcsOBUFXthuXN5qhdnkjhSn2E6DBic3mtC05B7ROVxn1bl00lPHRORucgG6ZsRd3l_LoYc";
const BIMO_SILA1 = "https://lh3.googleusercontent.com/aida-public/AB6AXuBpswKK2Ukx9Dil1WwiitnQZxXAPqD_5YJUB_NGMQt67Nm1Y5Sl-NRZGh4LKKqQ4u7GTJZuwmIhCVy-rq7QlvuxFgEVkEdakjCpbzjHDmrVnTjx_kFyjrv5f6DYCa8UFZh9rmJZXeHYlUhrjk9c0QO9ytSXKJLsElAOZJ11A_UJGi-qQnrR_Acq5wu9H_MAkcLS9asm6dBAWhfJdjs9mt8AXcbyceQSu5R5Kj8NUAAzt9FF5nCk-_cgWmC5rLky-IlGvKaVPeqbZnk";
const SIREGAR = "https://lh3.googleusercontent.com/aida-public/AB6AXuAe6PLCvdhY25YiBaOoP0UU35zHclS9Sq8JYLfy-VFB4azsx7JTMnEL-MYsclT-SXu7YVwAzcdn3dIMCC_WeWsRqyeqPP2LqID3GZSunSveKQnq89YAIyKVw1P-aS1MdJz9gnNVtFApd90yE6UEq4JDaq4KVGiZwBr_df-FCUeR5bMU55iQ8CpHvgY5W8Lccw9Oq6U_AcPoZ5vEy_KDobi08JOe7nxBzwy1zeGRrbg17PnELohRerQunuMKnda8jn6jDmS0KnSniTA";
const SINTA = "https://lh3.googleusercontent.com/aida-public/AB6AXuDB3yBKAM3nv7-mp5OkCr8pU3OoDCvc4EyeMkU_sfhb392LfsAhzdCH1z1mUYHlqU-pkarvW9LJpx10oVPOY4oSvWuXwa-yHBgn09CsBmD-46Db5F-H6PYR_6TDdJppEqCnEf0r7daRinbRw0Wx83jxpy9xgE96kRxjWmOa-BmDI2_15Gf6l_Hq4wTa8BJ7OyYMv3e6Jw6j1MM2KWvel3F7NfW8CrMhqsewVoEUrU5jQmICr9PC6r7Lgd-GPvtE-jzJ2Ze7JyX8YDU";
const PASSA = "https://lh3.googleusercontent.com/aida-public/AB6AXuB7lvoESQHpoJDRChWSPgGcvpsyDpYD3rnUyOIYlTGLGBmCUt49vXxut5clZvFU6OA02qIQLalLDGkv0Q2coawNuqd4meopK-USK28EGFvK9X1GT_iGg0megL7PWDr1-UoyN5byyWO8TCP649Z9drZ--k8_4sDG4wCwyF0lJnZRMk2fGW61syVOj4N-nTvzhRYGnt2xavvKiA5Zr1z6R4agFShwce3__t6KnAaaGC8GmeDWtXIyjhBbRkw25RwjfTPavtjjSA4UhYo";
const ARUYA = "https://lh3.googleusercontent.com/aida-public/AB6AXuBaLFfFGf6bGRZ_LEnFjaeQ8BGKkKg5Rbq095H8Oa7tmR5R__Fzxa6d6EXL0oi4y55_-QZsTkgWoMNKGImlm5olJm-pMyR2by5eLASS7mj67jGOYf2dbnoMIr-MWaQfODxVEZDRtBOV7JCANpyxX46XppO-_t2nL-S9MdI3kLeNFLiY3SLY6-LsnhD0q9sHEk00vcD6fF0n9RBL9H7IafKDIwVJJcUIwa08rBbq7xcZA__Yi7T3IwkJKp9c6rIfqlaRBi62RraW_jY";

export default function JelajahScreen({ userName, character, onNotificationClick, onTabChange, onSilaSelect }) {
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

  return (
    <MainLayout activeTab="jelajah" userName={userName} character={character} onNotificationClick={onNotificationClick} onTabChange={onTabChange}>
      <div className="px-6 mb-8 pt-6">
        {/* Hero Section: Illustrative Map */}
        <section className="relative mb-12" style={cascadeStyle(0.1)}>
          <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden shadow-xl shadow-slate-200/50">
            <img className="w-full h-full object-cover" alt="Map Jelajah" src={MAP_IMG} />
            
            {/* Character Avatars as Pins */}
            <div 
              onClick={() => onSilaSelect && onSilaSelect(1)}
              className="absolute top-[20%] left-[22%] transform -translate-x-1/2 hover:scale-110 transition-transform cursor-pointer group z-10"
            >
              <div className="w-10 h-10 rounded-full border-[3px] border-white shadow-lg overflow-hidden">
                <img className="w-full h-full object-cover" alt="Bimo" src={BIMO} />
              </div>
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-white text-primary text-[10px] font-bold px-2 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-sm">Sila 1</div>
            </div>
            
            <div onClick={() => onSilaSelect && onSilaSelect(2)} className="absolute top-[45%] left-[35%] hover:scale-110 transition-transform cursor-pointer group z-10">
              <div className="w-10 h-10 rounded-full border-[3px] border-white shadow-lg overflow-hidden">
                <img className="w-full h-full object-cover" alt="Siregar" src={SIREGAR} />
              </div>
            </div>
            
            <div onClick={() => onSilaSelect && onSilaSelect(3)} className="absolute bottom-[20%] left-[45%] hover:scale-110 transition-transform cursor-pointer group z-10">
              <div className="w-10 h-10 rounded-full border-[3px] border-white shadow-lg overflow-hidden">
                <img className="w-full h-full object-cover" alt="Sinta" src={SINTA} />
              </div>
            </div>
            
            <div onClick={() => onSilaSelect && onSilaSelect(4)} className="absolute top-[30%] right-[30%] hover:scale-110 transition-transform cursor-pointer group z-10">
              <div className="w-10 h-10 rounded-full border-[3px] border-white shadow-lg overflow-hidden">
                <img className="w-full h-full object-cover" alt="Passa" src={PASSA} />
              </div>
            </div>
            
            <div onClick={() => onSilaSelect && onSilaSelect(5)} className="absolute bottom-[35%] right-[25%] hover:scale-110 transition-transform cursor-pointer group z-10">
              <div className="w-10 h-10 rounded-full border-[3px] border-white shadow-lg overflow-hidden">
                <img className="w-full h-full object-cover" alt="Aruya" src={ARUYA} />
              </div>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <h1 className="font-headline text-3xl font-extrabold text-on-surface tracking-tight leading-tight">Jelajah Nilai Pancasila</h1>
            <p className="font-body text-slate-500 mt-2 text-sm font-medium">Ikuti petualangan bersama teman-teman!</p>
          </div>
        </section>

        {/* Sila Cards Section */}
        <div className="space-y-6">
          {/* Sila 1 (UNLOCKED) */}
          <div className="bg-white rounded-2xl p-6 shadow-xl shadow-slate-200/40 relative overflow-hidden active:scale-[0.98] transition-transform duration-200 border border-slate-100" style={cascadeStyle(0.2)}>
            <div className="flex items-start gap-5">
              <div className="w-16 h-16 rounded-full overflow-hidden bg-primary-fixed shrink-0 border-2 border-primary-fixed/50">
                <img className="w-full h-full object-cover" alt="Bimo Sila 1" src={BIMO_SILA1} />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <span className="font-headline text-[10px] uppercase font-bold text-primary tracking-widest bg-primary-fixed/30 px-3 py-1 rounded-full mb-3 inline-block">Sila 1</span>
                  <Star className="text-amber-500 fill-amber-500" size={20} />
                </div>
                <h2 className="font-headline text-lg font-bold text-on-surface leading-tight">Ketuhanan Yang Maha Esa</h2>
                <p className="font-body text-xs text-slate-500 mt-1.5 font-medium">Dipandu oleh Bimo</p>
                
                <div className="mt-5">
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Progres Belajar</span>
                    <span className="text-[10px] font-black text-primary">80%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden relative">
                    <div className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full transition-all duration-1000 ease-out" style={{ width: mounted ? '80%' : '0%' }}></div>
                  </div>
                </div>
              </div>
            </div>
            
            <button 
              onClick={() => onSilaSelect && onSilaSelect(1)}
              className="w-full mt-6 py-3.5 rounded-full bg-gradient-to-br from-amber-600 to-amber-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-900/20 active:scale-95 transition-transform"
            >
              Lanjut Belajar
              <ArrowRight size={16} />
            </button>
          </div>

          {[
            { id: 2, locked: false, name: "Kemanusiaan yang Adil dan Beradab", guide: "Siregar", img: SIREGAR, delay: 0.3 },
            { id: 3, locked: false, name: "Persatuan Indonesia", guide: "Sinta", img: SINTA, delay: 0.4 },
            { id: 4, locked: false, name: "Kerakyatan yang Dipimpin oleh Hikmat...", guide: "Passa", img: PASSA, delay: 0.5 },
            { id: 5, locked: false, name: "Keadilan Sosial bagi Seluruh Rakyat...", guide: "Aruya", img: ARUYA, delay: 0.6 }
          ].map((sila) => (
            <div 
              key={sila.id} 
              onClick={() => onSilaSelect && onSilaSelect(sila.id)}
              className="bg-white rounded-2xl p-6 shadow-md shadow-slate-200/40 relative overflow-hidden active:scale-[0.98] transition-transform duration-200 border border-slate-100 cursor-pointer" 
              style={cascadeStyle(sila.delay)}>
              <div className="flex items-start gap-5">
                <div className="w-16 h-16 rounded-full overflow-hidden bg-slate-100 shrink-0 border-2 border-slate-200">
                  <img className="w-full h-full object-cover" alt={sila.guide} src={sila.img} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-headline text-[10px] uppercase font-bold text-slate-500 tracking-widest bg-slate-100 px-3 py-1 rounded-full inline-block">Sila {sila.id}</span>
                  </div>
                  <h2 className="font-headline text-lg font-bold text-slate-700 leading-tight pr-6">{sila.name}</h2>
                  <p className="font-body text-xs text-slate-500 mt-1.5 font-medium">Dipandu oleh {sila.guide}</p>
                </div>
              </div>
              <div className="absolute top-5 right-5 text-slate-300">
                <ChevronRight size={24} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
