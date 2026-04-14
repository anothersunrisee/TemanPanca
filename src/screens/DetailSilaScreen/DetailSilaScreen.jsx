import React, { useState, useEffect } from 'react';
import { SILA_DATA } from '../../data/silaData';

export default function DetailSilaScreen({ silaId, onBack, onMateriSelect }) {
  const [mounted, setMounted] = useState(false);

  // Dynamically load data based on the route
  const currentSila = SILA_DATA[silaId] || SILA_DATA["1"];

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
    <div className="flex justify-center h-[100dvh] w-full bg-[#e7e8e9] overflow-hidden">
      <div className="w-full max-w-[440px] bg-slate-50 h-full relative shadow-2xl overflow-x-hidden overflow-y-auto flex flex-col font-body custom-scrollbar animate-fade-in">
        
        {/* Top Header without profile and navbar */}
        <header className="sticky top-0 w-full z-50 bg-white/80 backdrop-blur-md shadow-sm border-b border-slate-100">
          <div className="flex items-center px-4 py-3 max-w-[440px] mx-auto gap-3">
            <button 
              onClick={onBack}
              className={`hover:bg-slate-100 transition-colors p-2 rounded-full active:scale-95 flex items-center justify-center text-${currentSila.themeColor}-700`}
            >
              <span className="material-symbols-outlined text-2xl">arrow_back</span>
            </button>
            <h2 className={`font-headline font-bold text-lg text-${currentSila.themeColor}-700 leading-tight tracking-tight`}>
              Sila {currentSila.id} – {currentSila.title.split(' ')[0]}
            </h2>
          </div>
        </header>

        <main className="pb-32 px-6 pt-6">
          {/* Hero Title Section */}
          <section className="mb-6" style={cascadeStyle(0.1)}>
            <h1 className="font-headline font-black text-3xl text-slate-800 tracking-tight leading-tight mb-2">
              Sila {currentSila.id} – <br />
              {currentSila.title}
            </h1>
            <p className="text-slate-500 font-medium font-body">{currentSila.subtitle}</p>
          </section>

          {/* Character Section */}
          <section className="relative flex items-end gap-2 mt-8 mb-10" style={cascadeStyle(0.2)}>
            <div className="w-32 flex-shrink-0 z-10 -mb-2">
              <img alt={currentSila.characterName} className="w-full h-auto drop-shadow-xl saturate-110" src={currentSila.characterImg} />
            </div>
            <div className="relative bg-white p-5 rounded-2xl rounded-bl-sm shadow-[0_8px_24px_rgba(25,28,29,0.06)] border border-slate-100 mb-6 flex-1">
              <p className="text-slate-700 font-medium leading-relaxed font-body text-sm">
                {currentSila.introText}
              </p>
              {/* Speech Bubble Arrow */}
              <div className="absolute -left-3 bottom-0 w-0 h-0 border-t-[12px] border-t-transparent border-r-[12px] border-r-white border-b-0 filter drop-shadow-sm"></div>
            </div>
          </section>

          {/* Progress Tracker Native */}
          <div className={`mb-10 bg-${currentSila.themeColor}-100 h-4 w-full rounded-full relative`} style={cascadeStyle(0.3)}>
            <div className={`absolute top-0 left-0 h-full bg-${currentSila.themeColor}-500 rounded-full flex items-center justify-end px-1.5 transition-all duration-1000 ease-out`} style={{ width: mounted ? '33%' : '0%' }}>
              <div className="w-2.5 h-2.5 bg-white rounded-full shadow-sm"></div>
            </div>
          </div>

          {/* Materi List */}
          <section className="space-y-5" style={cascadeStyle(0.4)}>
            <div className="flex justify-between items-end mb-4">
               <h2 className="font-headline font-extrabold text-xl text-slate-800">Daftar Materi</h2>
            </div>
            
            {currentSila.materiList.map((m, idx) => (
              <div 
                key={m.id}
                onClick={() => onMateriSelect && onMateriSelect(m.id)} 
                className="bg-white p-5 rounded-3xl shadow-[0_8px_24px_rgba(25,28,29,0.06)] group hover:-translate-y-1 transition-transform duration-200 border border-slate-100 cursor-pointer active:scale-[0.98]"
              >
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`${m.badgeBg} ${m.badgeText} text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider`}>Materi {idx + 1}</span>
                      <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                        <span className="material-symbols-outlined text-[14px]" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span>
                        Tersedia
                      </span>
                    </div>
                    <h3 className={`font-headline font-bold text-lg ${m.titleCol} leading-tight`}>{m.title}</h3>
                    <p className="text-slate-500 text-sm mt-1 font-body font-medium">{m.sub}</p>
                  </div>
                  <div className={`w-14 h-14 ${m.iconBg} rounded-full flex items-center justify-center ${m.iconCol} shrink-0 shadow-sm border ${m.iconBorder}`}>
                    <span className="material-symbols-outlined text-[28px]" style={{fontVariationSettings: "'FILL' 1"}}>{m.icon}</span>
                  </div>
                </div>
                <div className="mt-5 flex justify-end">
                  <button className={`bg-gradient-to-br ${m.btnGrad} text-white px-6 py-2.5 rounded-full font-bold text-sm shadow-md ${m.btnShadow} active:scale-95 transition-all w-full flex justify-center gap-2`}>
                    Mulai Belajar
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </button>
                </div>
              </div>
            ))}
          </section>

          {/* Referensi Notes */}
          <section className="mt-12 bg-surface-container-low/60 rounded-3xl p-6 border border-slate-200" style={cascadeStyle(0.6)}>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl drop-shadow-sm">📚</span>
              <h3 className="font-headline font-bold text-slate-700">Referensi Pembelajaran</h3>
            </div>
            <ul className="space-y-3 text-xs text-slate-500 font-medium font-body list-disc pl-5">
              {currentSila.references.map((ref, i) => (
                <li key={i}>{ref}</li>
              ))}
            </ul>
          </section>
        </main>
      </div>
    </div>
  );
}
