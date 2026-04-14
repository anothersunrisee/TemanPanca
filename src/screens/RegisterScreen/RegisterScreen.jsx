import React, { useState } from 'react';

export default function RegisterScreen({ onNameSubmit }) {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      onNameSubmit(name.trim());
    }
  };

  return (
    <div className="bg-[#F8F7F6] text-on-surface min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden selection:bg-primary-fixed">
      {/* Full-screen Background Decoratives */}
      <div className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none">
        {/* Blob shapes mimicking scrapbook style */}
        <div className="absolute top-[5%] left-[5%] w-48 h-48 bg-secondary-fixed/30 rounded-[60%_40%_30%_70%/60%_30%_70%_40%] blur-3xl"></div>
        <div className="absolute bottom-[10%] right-[5%] w-64 h-64 bg-tertiary-fixed/20 rounded-[60%_40%_30%_70%/60%_30%_70%_40%] blur-3xl"></div>
        
        {/* Floating Icons */}
        <div className="absolute bottom-10 left-10 text-outline-variant/40 hidden md:flex flex-col gap-4">
          <span className="material-symbols-outlined text-6xl rotate-12">auto_stories</span>
        </div>
        <div className="absolute top-10 right-10 text-outline-variant/40 hidden md:flex flex-col gap-4">
          <span className="material-symbols-outlined text-6xl -rotate-12">extension</span>
        </div>
      </div>

      <main className="w-full max-w-[440px] flex flex-col items-center text-center z-10 animate-fade-in py-10">
        
        {/* Animated Image/Graphic Container */}
        <div className="relative mb-10 w-48 h-48 md:w-56 md:h-56 flex items-center justify-center animate-popup">
          <div className="absolute inset-0 bg-surface-container-low rounded-[60%_40%_30%_70%/60%_30%_70%_40%] rotate-12 scale-110 shadow-sm border border-white/50"></div>
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDzcclgmz9nEKpYsYIZMC9G2jNTN7H3jlQ8kE1ZeCcRqx2GpptfYnEwry_M9ezNxS6BMBLeJhlMzl238rmLMi1hr3-NUkM8ZU_3BWUXvcqZ3Zxf67veNWbcEqP1IC270rpbfb2kEN8S9rKco1IO2Ry_hvIa9HzBl_osuaHXsCBOImditPDhGOEZ1kYLW41chBp1CueOjzfMHA3zMBx0oi2YEX-dt-s1rjLSdKbKHkHC4kl7_gTVr4zMkGgINiTR5rZtBwly4t6qOnw" 
            alt="Friendly character waving" 
            className="relative z-10 w-40 h-40 md:w-48 md:h-48 transform -rotate-3 object-contain drop-shadow-md" 
          />
        </div>

        <header className="mb-10 space-y-3">
          <h1 className="font-headline font-extrabold text-3xl md:text-4xl tracking-tight text-on-surface">
            Siapa namamu?
          </h1>
          <p className="text-on-surface-variant font-body font-medium text-base md:text-lg px-2">
            Aku ingin mengenalmu lebih dekat sebelum kita mulai berpetualang!
          </p>
        </header>

        <form onSubmit={handleSubmit} className="w-full space-y-8 flex flex-col items-center">
          <div className="w-full max-w-[340px] relative group mx-auto">
             {/* Input box styled as requested */}
            <input 
              type="text" 
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Tulis namamu di sini..."
              className="w-full bg-white border-none rounded-full px-8 py-5 text-lg md:text-xl font-bold font-body text-primary placeholder:text-outline-variant placeholder:font-semibold shadow-[0_4px_24px_rgba(25,28,29,0.06)] focus:ring-4 focus:ring-primary-fixed/60 transition-all outline-none text-center"
            />
            {/* Subtle glow underneath */}
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4/5 h-1 bg-primary-fixed/30 rounded-full blur-sm group-focus-within:bg-primary/20"></div>
          </div>

          <button 
            type="submit"
            className="group relative w-full max-w-[340px] mx-auto flex items-center justify-center gap-3 bg-gradient-to-br from-primary to-primary-container text-on-primary font-headline font-bold text-xl py-4 rounded-full shadow-[0_12px_32px_rgba(131,81,0,0.15)] hover:scale-[0.98] active:scale-95 transition-all duration-200"
          >
            <span>Lanjut</span>
            <span className="material-symbols-outlined font-bold text-2xl transition-transform group-hover:translate-x-1">arrow_forward</span>
          </button>
        </form>

        {/* Minimal indicator dots like their design */}
        <div className="mt-12 flex gap-2">
          <div className="h-2 w-10 rounded-full bg-primary/20"></div>
          <div className="h-2 w-10 rounded-full bg-primary/20"></div>
          <div className="h-2 w-4 rounded-full bg-primary"></div>
        </div>
      </main>
    </div>
  );
}
