import React from 'react';

export default function OnboardingScreen({ onLogin }) {
  return (
    <div className="text-on-background min-h-screen flex flex-col items-center justify-center p-6 overflow-hidden bg-[#F8F7F6]">
      {/* Full-screen Background Decoratives */}
      <div className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none">
        <div className="absolute top-[10%] left-[5%] w-64 h-64 bg-primary-fixed/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[15%] right-[5%] w-80 h-80 bg-tertiary-fixed/20 rounded-full blur-3xl"></div>
        <div className="absolute top-12 left-12 hidden lg:block opacity-20 rotate-[-15deg]">
          <span className="material-symbols-outlined text-8xl text-primary">palette</span>
        </div>
        <div className="absolute bottom-12 right-12 hidden lg:block opacity-20 rotate-[15deg]">
          <span className="material-symbols-outlined text-8xl text-tertiary">rocket_launch</span>
        </div>
        <div className="absolute top-1/4 right-20 hidden lg:block opacity-10 rotate-[5deg]">
          <span className="material-symbols-outlined text-9xl text-secondary">potted_plant</span>
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
                Masuk ke TemanPanca
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
              className="w-full py-4 px-6 rounded-full bg-gradient-to-br from-primary to-primary-container text-on-primary font-headline font-bold text-lg flex items-center justify-center gap-3 shadow-lg shadow-primary/20 hover:scale-[0.98] transition-transform active:scale-95"
            >
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"></path>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z" fill="#EA4335"></path>
                </svg>
              </div>
              Masuk dengan Google
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
              <span className="material-symbols-outlined text-amber-500 text-lg">face</span>
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
