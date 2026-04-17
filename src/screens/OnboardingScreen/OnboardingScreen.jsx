import React from 'react';
import { Palette, Rocket, Sprout, Smile } from 'lucide-react';

export default function OnboardingScreen({ onLogin }) {
  return (
    <div className="text-on-background min-h-screen flex flex-col items-center justify-center p-6 overflow-hidden bg-[#F8F7F6]">
      {/* Full-screen Background Decoratives */}
      <div className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none">
        <div className="absolute top-[10%] left-[5%] w-64 h-64 bg-primary-fixed/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[15%] right-[5%] w-80 h-80 bg-tertiary-fixed/20 rounded-full blur-3xl"></div>
        <div className="absolute top-12 left-12 hidden lg:block opacity-20 rotate-[-15deg]">
          <Palette size={96} strokeWidth={1} className="text-primary" />
        </div>
        <div className="absolute bottom-12 right-12 hidden lg:block opacity-20 rotate-[15deg]">
          <Rocket size={96} strokeWidth={1} className="text-tertiary" />
        </div>
        <div className="absolute top-1/4 right-20 hidden lg:block opacity-10 rotate-[5deg]">
          <Sprout size={128} strokeWidth={1} className="text-secondary" />
        </div>
      </div>

      <main className="w-full max-w-[440px] flex flex-col items-center gap-12 text-center relative animate-fade-in z-10">
        <header className="flex flex-col items-center gap-6">
          <div className="relative w-32 h-32 md:w-36 md:h-36 mb-2 flex items-center justify-center">
            <img 
              src="/Logo.png" 
              alt="TemanPanca Logo" 
              className="w-full h-full object-contain drop-shadow-lg" 
            />
          </div>
          <div className="space-y-3">
            <h1 className="font-headline font-black text-3xl md:text-4xl text-on-surface tracking-tighter leading-tight">
                Mulai Belajar Pancasila
            </h1>
            <p className="font-body text-secondary text-lg font-medium opacity-80">
                Belajar jadi seru!
            </p>
          </div>
        </header>

        <section className="w-full space-y-6">
          <div className="bg-white/70 backdrop-blur-md p-8 rounded-xl shadow-[0_8px_32px_rgba(131,81,0,0.06)] border border-white/50 w-full max-w-[340px] mx-auto">
            <button 
              onClick={onLogin}
              className="w-full py-4 px-6 rounded-full bg-gradient-to-br from-amber-500 to-amber-700 text-white font-headline font-bold text-lg flex items-center justify-center gap-3 shadow-lg shadow-amber-500/20 hover:scale-[0.98] transition-transform active:scale-95"
            >
              <Rocket size={24} />
              Ayo Mulai!
            </button>
            <div className="mt-8 relative h-px bg-outline-variant/30 w-full">
              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 bg-[#f8f7f6] text-[10px] font-bold text-outline uppercase tracking-widest backdrop-blur-sm rounded-full">
                Mulai Petualangan
              </span>
            </div>
          </div>
          
          <div className="flex flex-col items-center gap-4">
            <div className="flex gap-2">
              <span className="w-2 h-2 rounded-full bg-primary/40"></span>
              <span className="w-2 h-2 rounded-full bg-secondary-fixed"></span>
              <span className="w-2 h-2 rounded-full bg-tertiary-fixed-dim"></span>
            </div>
            <p className="font-body text-sm font-semibold text-on-surface-variant flex items-center gap-2">
              <Smile size={20} className="text-amber-500" />
              Gunakan bantuan orang tua ya 😊
            </p>
          </div>
        </section>

        <footer className="mt-4">
          <div className="flex flex-wrap justify-center gap-6 opacity-60 text-[12px] font-bold uppercase tracking-wider text-secondary">
            <a className="hover:text-primary transition-colors" href="#">Syarat &amp; Ketentuan</a>
            <a className="hover:text-primary transition-colors" href="#">Kebijakan Privasi</a>
          </div>
        </footer>
      </main>
    </div>
  );
}
