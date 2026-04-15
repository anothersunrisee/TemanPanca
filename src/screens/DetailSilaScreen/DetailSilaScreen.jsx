import React, { useState, useEffect, createElement } from 'react';
import * as Icons from 'lucide-react';
import { SILA_DATA } from '../../data/silaData';

// ─── Theme config ────────────────────────────────────────────────────────────
const THEME = {
  amber: {
    badge:      'bg-amber-100 text-amber-800',
    title:      'text-amber-800',
    sub:        'text-slate-500',
    iconBg:     'bg-amber-50',
    iconCol:    'text-amber-600',
    iconBorder: 'border-amber-100',
    btn:        'from-amber-600 to-amber-700 shadow-amber-900/20',
    headerCol:  'text-amber-700',
    progress:   'from-amber-400 to-amber-500',
  },
  slate: {
    badge:      'bg-slate-100 text-slate-500',
    title:      'text-slate-400',
    sub:        'text-slate-400',
    iconBg:     'bg-slate-100',
    iconCol:    'text-slate-400',
    iconBorder: 'border-slate-200',
    btn:        'from-slate-400 to-slate-500 shadow-slate-900/10',
    headerCol:  'text-slate-700',
    progress:   'from-slate-300 to-slate-400',
  },
  red: {
    badge:      'bg-red-100 text-red-800',
    title:      'text-red-800',
    sub:        'text-slate-500',
    iconBg:     'bg-red-50',
    iconCol:    'text-red-600',
    iconBorder: 'border-red-100',
    btn:        'from-amber-600 to-amber-700 shadow-amber-900/20',
    headerCol:  'text-red-700',
    progress:   'from-amber-400 to-amber-500',
  },
  blue: {
    badge:      'bg-blue-100 text-blue-800',
    title:      'text-blue-800',
    sub:        'text-slate-500',
    iconBg:     'bg-blue-50',
    iconCol:    'text-blue-600',
    iconBorder: 'border-blue-100',
    btn:        'from-amber-600 to-amber-700 shadow-amber-900/20',
    headerCol:  'text-blue-700',
    progress:   'from-amber-400 to-amber-500',
  },
  green: {
    badge:      'bg-green-100 text-green-800',
    title:      'text-green-800',
    sub:        'text-slate-500',
    iconBg:     'bg-green-50',
    iconCol:    'text-green-600',
    iconBorder: 'border-green-100',
    btn:        'from-amber-600 to-amber-700 shadow-amber-900/20',
    headerCol:  'text-green-700',
    progress:   'from-amber-400 to-amber-500',
  },
};

// ─── Status Badge ─────────────────────────────────────────────────────────────
function StatusBadge({ status }) {
  if (status === 'completed') {
    return (
      <span className="flex items-center gap-1 text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
        <Icons.CheckCircle2 size={13} className="fill-blue-100" />
        Selesai
      </span>
    );
  }
  if (status === 'available') {
    return (
      <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
        <Icons.CheckCircle2 size={13} className="fill-emerald-100" />
        Tersedia
      </span>
    );
  }
  return (
    <span className="flex items-center gap-1 text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200">
      <Icons.XCircle size={13} />
      Belum Dimulai
    </span>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function DetailSilaScreen({ silaId, onBack, onMateriSelect }) {
  const [mounted, setMounted] = useState(false);
  // Read completed materi from localStorage on every mount (fresh after returning from BelajarScreen)
  const [completedMateri] = useState(() =>
    JSON.parse(localStorage.getItem('completedMateri') || '[]')
  );

  const currentSila = SILA_DATA[silaId] || SILA_DATA['1'];
  const silaTheme = THEME[currentSila.themeColor] || THEME.amber;

  // Compute progress
  const completedCount = currentSila.materiList.filter(m => completedMateri.includes(m.id)).length;
  const progressPercent = currentSila.materiList.length > 0
    ? (completedCount / currentSila.materiList.length) * 100
    : 0;

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const cascadeStyle = (delaySec) => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? 'translateY(0)' : 'translateY(20px)',
    transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delaySec}s`
  });

  // Per-card state: sequential unlock
  const getCardState = (m, idx) => {
    const isCompleted = completedMateri.includes(m.id);
    const prevCompleted = idx === 0 || completedMateri.includes(currentSila.materiList[idx - 1].id);
    const isAvailable = isCompleted || prevCompleted;

    const status = isCompleted ? 'completed' : isAvailable ? 'available' : 'locked';
    const cardTheme = isAvailable ? silaTheme : THEME.slate;

    return { status, cardTheme, isLocked: !isAvailable };
  };

  return (
    <div className="flex justify-center h-[100dvh] w-full bg-[#e7e8e9] overflow-hidden">
      <div className="w-full max-w-[440px] bg-slate-50 h-full relative shadow-2xl overflow-x-hidden overflow-y-auto flex flex-col font-body custom-scrollbar animate-fade-in">

        {/* Header */}
        <header className="sticky top-0 w-full z-50 bg-white/80 backdrop-blur-md shadow-sm border-b border-slate-100">
          <div className="flex items-center px-4 py-3 max-w-[440px] mx-auto gap-3">
            <button
              onClick={onBack}
              className={`hover:bg-slate-100 transition-colors p-2 rounded-full active:scale-95 flex items-center justify-center ${silaTheme.headerCol}`}
            >
              <Icons.ArrowLeft size={24} />
            </button>
            <h2 className={`font-headline font-bold text-lg ${silaTheme.headerCol} leading-tight tracking-tight`}>
              Sila {currentSila.id} – {currentSila.title.split(' ')[0]}
            </h2>
          </div>
        </header>

        <main className="pb-32 px-6 pt-6">
          {/* Hero Title */}
          <section className="mb-6" style={cascadeStyle(0.1)}>
            <h1 className="font-headline font-black text-3xl text-slate-800 tracking-tight leading-tight mb-2">
              Sila {currentSila.id} – <br />
              {currentSila.title}
            </h1>
            <p className="text-slate-500 font-medium font-body">{currentSila.subtitle}</p>
          </section>

          {/* Character bubble */}
          <section className="relative flex items-end gap-2 mt-8 mb-10" style={cascadeStyle(0.2)}>
            <div className="w-32 flex-shrink-0 z-10 -mb-2">
              <img alt={currentSila.characterName} className="w-full h-auto drop-shadow-xl saturate-110" src={currentSila.characterImg} />
            </div>
            <div className="relative bg-white p-5 rounded-2xl rounded-bl-sm shadow-[0_8px_24px_rgba(25,28,29,0.06)] border border-slate-100 mb-6 flex-1">
              <p className="text-slate-700 font-medium leading-relaxed font-body text-sm">
                {currentSila.introText}
              </p>
              <div className="absolute -left-3 bottom-0 w-0 h-0 border-t-[12px] border-t-transparent border-r-[12px] border-r-white border-b-0 filter drop-shadow-sm"></div>
            </div>
          </section>

          {/* Progress bar — based on actual completions */}
          <div className="mb-10 bg-slate-100 h-4 w-full rounded-full relative" style={cascadeStyle(0.3)}>
            <div
              className={`absolute top-0 left-0 h-full rounded-full flex items-center justify-end px-1.5 transition-all duration-1000 ease-out bg-gradient-to-r ${silaTheme.progress}`}
              style={{ width: mounted ? `${progressPercent || 0}%` : '0%' }}
            >
              {progressPercent > 0 && <div className="w-2.5 h-2.5 bg-white rounded-full shadow-sm"></div>}
            </div>
          </div>

          {/* Materi List */}
          <section className="space-y-5" style={cascadeStyle(0.4)}>
            <div className="flex justify-between items-end mb-4">
              <h2 className="font-headline font-extrabold text-xl text-slate-800">Daftar Materi</h2>
              <span className="text-xs font-bold text-slate-400">{completedCount}/{currentSila.materiList.length} Selesai</span>
            </div>

            {currentSila.materiList.map((m, idx) => {
              const { status, cardTheme, isLocked } = getCardState(m, idx);

              return (
                <div
                  key={m.id}
                  onClick={() => !isLocked && onMateriSelect && onMateriSelect(m.id)}
                  className={`bg-white p-5 rounded-3xl shadow-[0_8px_24px_rgba(25,28,29,0.06)] border transition-transform duration-200 ${
                    isLocked
                      ? 'border-slate-100 cursor-not-allowed'
                      : 'border-slate-100 group hover:-translate-y-1 cursor-pointer active:scale-[0.98]'
                  }`}
                >
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      {/* Badge row */}
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`${cardTheme.badge} text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider`}>
                          Materi {idx + 1}
                        </span>
                        <StatusBadge status={status} />
                      </div>

                      {/* Title */}
                      <h3 className={`font-headline font-bold text-lg leading-tight ${cardTheme.title}`}>
                        {m.title}
                      </h3>

                      {/* Subtitle */}
                      <p className={`text-sm mt-1 font-body font-medium ${cardTheme.sub}`}>
                        {m.sub}
                      </p>
                    </div>

                    {/* Icon */}
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center shrink-0 shadow-sm border relative ${cardTheme.iconBg} ${cardTheme.iconCol} ${cardTheme.iconBorder}`}>
                      {createElement(Icons[m.icon] || Icons.HelpCircle, { size: 28, className: 'fill-current opacity-20 absolute' })}
                      {createElement(Icons[m.icon] || Icons.HelpCircle, { size: 28, className: 'relative z-10' })}
                    </div>
                  </div>

                  {/* Button */}
                  <div className="mt-5">
                    {isLocked ? (
                      <div className="w-full py-3 rounded-full bg-slate-100 text-slate-400 font-bold text-sm flex items-center justify-center gap-2">
                        <Icons.Lock size={16} />
                        Selesaikan Materi {idx} dulu
                      </div>
                    ) : (
                      <button className={`w-full py-3.5 rounded-full bg-gradient-to-br ${cardTheme.btn} text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all`}>
                        {status === 'completed' ? 'Ulangi Materi' : 'Mulai Belajar'}
                        <Icons.ArrowRight size={18} />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </section>

          {/* References */}
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
