import React, { useState, useEffect } from 'react';
import { ArrowLeft, Sparkles, Award, BookOpen } from 'lucide-react';

const MASCOT_IMG = "https://lh3.googleusercontent.com/aida-public/AB6AXuAkPWWNdtZD6qxrYYXg9PVnQvcCmxqp6MsfH2J70-iaVdQjERd1k4nceLjQ4CPtDlagab2NaoZ_CFFcyv7lib8M3_McdAdotE1kYLy68SJ1eC9mrQQinN2knWsEzTkqdQ6wo1EkwR_196R5FzqAo7tLIt95NRftN4pt0gkbau0H9MaVQDsFFw_fk_-9THSAhZ6Ga9DkGspsu60bTUw8GhSla-xFdaqVjL9tZ-iE1WFRvMly60qPAmxn98Y6YErsprMZnY7o3y-x0QQ";

export default function NotificationScreen({ onBack }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(timer);
  }, []);

  // Entrance animation for list items using robust inline transitions
  const cascadeStyle = (delaySec) => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? 'translateY(0)' : 'translateY(20px)',
    transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delaySec}s`
  });

  return (
    <div className="flex justify-center h-[100dvh] w-full bg-[#e7e8e9] overflow-hidden">
      <div className="w-full max-w-[440px] bg-white h-full relative shadow-2xl overflow-x-hidden overflow-y-auto flex flex-col font-body animate-fade-in custom-scrollbar">
        
        {/* Top Header */}
        <header className="sticky top-0 w-full z-50 bg-white/80 backdrop-blur-md shadow-sm">
          <div className="flex items-center px-4 h-16 w-full mx-auto">
            <button 
              onClick={onBack}
              className="text-amber-700 p-2 hover:bg-surface-container-low transition-colors active:scale-95 duration-200 rounded-full"
            >
              <ArrowLeft size={24} />
            </button>
            <h1 className="font-headline tracking-tight ml-2 text-on-surface font-bold text-xl">Notifikasi</h1>
          </div>
        </header>

        {/* Main Content */}
        <main className="pb-24 px-6 mx-auto w-full pt-4">
          {/* Section Header */}
          <div className="mb-4">
            <h2 className="font-headline text-slate-500 font-semibold text-lg">Terbaru</h2>
          </div>
          
          <div className="space-y-4">
            {/* Notification Item 1 */}
            <div className="bg-white p-5 rounded-2xl shadow-[0_8px_24px_rgba(25,28,29,0.06)] flex gap-4 items-start cursor-pointer active:scale-[0.98] transition-transform duration-200 border border-slate-100" style={cascadeStyle(0.1)}>
              <div className="bg-primary-fixed/30 w-12 h-12 rounded-full flex items-center justify-center shrink-0">
                <Sparkles size={24} className="text-primary" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-headline font-bold text-on-surface text-base leading-tight">Misi Baru Tersedia!</h3>
                  <span className="text-[10px] font-bold text-primary uppercase tracking-wider bg-primary-fixed/50 px-2 py-0.5 rounded-sm">Baru</span>
                </div>
                <p className="font-body text-slate-500 text-sm leading-relaxed">Yuk selesaikan misi hari ini untuk dapat poin tambahan.</p>
                <div className="mt-3 flex">
                  <button className="bg-gradient-to-br from-amber-600 to-amber-700 text-white px-4 py-1.5 rounded-full text-xs font-bold transition-all shadow-md active:scale-95">
                    Lihat Misi
                  </button>
                </div>
              </div>
            </div>

            {/* Notification Item 2 */}
            <div className="bg-white p-5 rounded-2xl shadow-[0_8px_24px_rgba(25,28,29,0.06)] flex gap-4 items-start cursor-pointer active:scale-[0.98] transition-transform duration-200 border border-slate-100" style={cascadeStyle(0.2)}>
              <div className="bg-tertiary-fixed w-12 h-12 rounded-full flex items-center justify-center shrink-0">
                <Award size={24} className="text-tertiary-fixed-dim" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-headline font-bold text-on-surface text-base leading-tight">Reward Terbuka!</h3>
                  <span className="text-[10px] font-medium text-slate-400">10m</span>
                </div>
                <p className="font-body text-slate-500 text-sm leading-relaxed">Kamu berhasil membuka outfit Jawa! Cek di profilmu.</p>
              </div>
            </div>

            {/* Yesterday Section */}
            <div className="pt-4 pb-2" style={cascadeStyle(0.3)}>
              <h2 className="font-headline text-slate-500 font-semibold text-lg">Kemarin</h2>
            </div>
            
            {/* Notification Item 3 */}
            <div className="bg-surface-container-low/30 p-5 rounded-2xl shadow-[0_8px_24px_rgba(25,28,29,0.04)] flex gap-4 items-start cursor-pointer active:scale-[0.98] transition-transform duration-200 border border-slate-50 opacity-70" style={cascadeStyle(0.4)}>
              <div className="bg-secondary-container w-12 h-12 rounded-full flex items-center justify-center shrink-0">
                <BookOpen size={24} className="text-secondary" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-headline font-bold text-on-surface text-base leading-tight">Ayo Belajar Lagi</h3>
                  <span className="text-[10px] font-medium text-slate-400">1h</span>
                </div>
                <p className="font-body text-slate-500 text-sm leading-relaxed">Bimo sudah menunggumu untuk belajar Sila 1.</p>
              </div>
            </div>

            {/* Decorative Illustration Card */}
            <div className="relative overflow-hidden bg-gradient-to-br from-primary to-primary-container p-6 rounded-2xl shadow-lg text-white mt-8 group" style={cascadeStyle(0.5)}>
              <div className="relative z-10 w-[70%]">
                <h4 className="font-headline text-xl font-bold mb-2">Ingat Teman!</h4>
                <p className="font-body text-sm opacity-90 leading-relaxed mb-4">Semakin rajin kamu belajar, semakin banyak lencana keren yang bisa dikoleksi!</p>
                <button className="bg-white text-primary font-bold px-5 py-2.5 rounded-full text-sm shadow-md active:scale-95 transition-transform">
                  Mulai Belajar
                </button>
              </div>
              <div className="absolute -right-4 -bottom-4 w-[160px] h-[160px] opacity-40 transform rotate-12 group-hover:rotate-0 group-hover:scale-110 transition-all duration-500">
                <img alt="Mascot" className="w-full h-full object-contain filter drop-shadow-lg" src={MASCOT_IMG}/>
              </div>
            </div>
          </div>
        </main>
        
      </div>
    </div>
  );
}
