import React, { useState, useEffect } from 'react';

export default function SplashScreen({ onFinish }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 2500; // 2.5 seconds total loading
    const interval = 50; 
    const steps = duration / interval;
    const increment = 100 / steps;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => onFinish(), 400); // Wait a bit before transition
          return 100;
        }
        return prev + increment;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [onFinish]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#F8F7F6] relative overflow-hidden transition-opacity duration-500">
      {/* Full-screen Background Blobs */}
      <div className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none">
        <div className="absolute top-[10%] left-[5%] w-64 h-64 bg-tertiary-fixed/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[10%] right-[5%] w-80 h-80 bg-secondary-fixed/20 rounded-full blur-3xl"></div>
      </div>

      <main className="relative w-full max-w-[440px] min-h-[100dvh] flex flex-col items-center justify-center py-20 px-6 z-10 text-on-background text-center">
        {/* Center Section: Animated Logo */}
        <div className="relative w-full flex flex-col items-center justify-center flex-1 animate-popup">
          <img 
            src="/Logo.png" 
            alt="TemanPanca Logo" 
            className="w-48 h-auto object-contain drop-shadow-xl" 
          />
        </div>

        {/* Bottom Section: Loading Indicator */}
        <div className="w-full max-w-[200px] flex flex-col items-center gap-6 mb-8">
          <div className="w-full h-3 bg-secondary-container rounded-full relative overflow-hidden">
            <div 
              className="absolute inset-y-0 left-0 bg-tertiary-fixed-dim rounded-full flex items-center justify-end pr-1 transition-all duration-[50ms] ease-linear"
              style={{ width: `${progress}%` }}
            >
              <div className="w-1.5 h-1.5 bg-white rounded-full shadow-sm"></div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-outline animate-spin text-sm">
              progress_activity
            </span>
            <p className="font-label text-[11px] font-semibold uppercase tracking-widest text-on-surface-variant/80">
              Menyiapkan Petualangan {Math.floor(progress)}%
            </p>
          </div>
        </div>

        {/* Subtle Footer */}
        <div className="absolute bottom-6 flex items-center gap-1 opacity-40">
          <span className="font-label text-[10px] font-bold tracking-tighter">TACTILE NARRATIVE</span>
          <div className="w-1 h-1 bg-primary rounded-full"></div>
          <span className="font-label text-[10px] font-bold tracking-tighter">BELA NEGARA</span>
        </div>
      </main>
    </div>
  );
}
