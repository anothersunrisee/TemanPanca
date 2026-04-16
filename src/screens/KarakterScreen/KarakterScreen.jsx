import React, { useState } from 'react';
import { ArrowLeft, Check, Lock, ShieldCheck, X } from 'lucide-react';

const OUTFITS = [
  {
    id: 'default',
    label: 'Default',
    price: 0,
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB108fhDPKMlX6NaK45QU5lPm2jIBSUDw2Tra2Szz_9aMhXkLiUqzehtOYSkbKS_9_eIQQl7L3IKH46NoGLI5kXRCEK847DivkJUKV3UxMYwspwxN519G_1SzLZyJila3ROxMus1ajUye2Iu9sZdXPIfzXRh_OjiGA0Ctvh91d4YU0P5maHC5GOWDvXpT4fTt-Et_EaAU8RTThyAuCbHjfEhW1Q-k5WpcNC_iYIGvbgp6DwkP4emrGuLtSPRBUAR09RbXSMU1pe_Js',
    alt: 'Simple t-shirt and jeans casual outfit',
    description: 'Pakaian kasual sehari-hari yang nyaman dipakai belajar dan bermain.',
  },
  {
    id: 'jawa',
    label: 'Jawa',
    price: 0,
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCdZsFogf_0lq2gFhOLT1Pg5TR9h4o91xKQtqItgpOLS8nFCyV9EzIMEaB7shwcCeA48XRAWhLTG9UmW9d1RHzufauqsPxxClapTDseMwD-D6G-wb_OT5ImbZJAUeqiKwhNDq8I568vGpo8wYOQyJyvHwB9MwU9IwO3ywg6HaMa1fgB03tIWCagxiNq7-NQeU07K3C63tCjtc6nWnwzlYmMJGp8PMdeDeWYs5XYwnJuK4ApYYZA9OurWES9Hzg9mNRasjCZHZlhdB4',
    alt: 'Javanese traditional batik and blangkon hat',
    description: 'Baju adat Jawa yang elegan dengan sentuhan kain Batik asli yang mendunia.',
  },
  {
    id: 'batak',
    label: 'Batak',
    price: 300,
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBe5xGT6N9rkRSupO1U9KE-XEauDo_J0bLNurGV61XT3Hlhc_7pj6mSAVS47U6q_DaE-opeUC6cTCIFUQlyDwPtV6784OAa-B3XyxSNTJHO1K9GX6ic9GzUswQvXHHXlHX-0wA2ZYnPTKxTDsQqnlU4AxZSOSAVFqYcKxD0EAoRWWh5UmLnq3gsaHLiN6z8PzwpkRBaiKaKIBO7z4UMpzAGmMG9rGCDPqhtYjD15G02OESem7-E2jAg5Kx6AN3UWVdA8qCTfg2xsRM',
    alt: 'Batak traditional Ulos fabric costume',
    description: 'Pakaian berbalut kain Ulos khas Sumatera Utara. Simbol ikatan dan perlindungan yang kuat!',
  },
  {
    id: 'dayak',
    label: 'Dayak',
    price: 450,
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCTlcd3cqx0yBlKErwvz8tZ98lAC5Ay8IWAjgTWnlg6Ucnj-ym_0hGLaqcgiRHtZDzyL_1vdOQLCG7n1mr-dZcDLrxCT7ERWExgRJPjmuYOCreyvE3pxa8t26Ku9qYCtEoxheu1NsAuaHf_ar8-O9Ay8Lg77p72mtgWf7IzIGtYWtIr54gWNM7tWN5IBLlYF_3v2dsFwZ_M0eBZphLThKN0rln9W4fEH0gxvG9kL-GXg1lI75PNKSveS3ZIalsjpZumFwvA6_t2aZc',
    alt: 'Dayak traditional costume with feathers and beadwork',
    description: 'Baju adat dari Kalimantan yang dilengkapi ornamen bulu burung enggang yang legendaris.',
  },
  {
    id: 'bugis',
    label: 'Bugis',
    price: 300,
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDLTyeYNrZUUVFZiZM0ReFztc_cKBFWpy55gw2eY6sszWHm8Rkz7muvItlxCi_z8DvFx2aaKN7Lgqye6OCl_j3b0yNM66kVw5Uz5Aw9tt6qaTW9uXVwx7Y7LeMhot5azutjzjjDBsiIJp0gnu-JOjdWOrok1jrcjNb5tgxYUUm4NEN9o0NMNcv6msbImQQRwE45Dfsl9Bl4BS7UVfy6hWWcNpNtocGqflf-v9yJMdNcMiczzbgHnTwUIUrUuZs6FsysJSeXIIrrcVk',
    alt: 'Bugis traditional Baju Bodo',
    description: 'Pakaian tradisional tertua dari Sulawesi Selatan yang memancarkan pesona kebudayaan maritim Bugis.',
  },
  {
    id: 'papua',
    label: 'Papua',
    price: 600,
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAsThHe39Ev_bSq1n_qBPF1lvuTXIX6ji5TfGuU_vJjAYajt9Plr29YQcmWVeXp8-NVLasPamZwgZ66ZbP1-d5bPyoxGAlrJ2n5rt-ECWYHJWX-jsverjkev4hCs_7uP2B-tVH_TrUsMlZHWMKXBSp0shrRjt4HAT0C19RqGIV4DNh0IZfgjD151Lrr-JJjS4wFs7z6RUcPvNALg_s125owne2JDN4vXyqiewEQ6MVTqt73X8glfD0paNZi4vBw7CswEcKHExyqFSM',
    alt: 'Papuan traditional grass skirt and shell accessories',
    description: 'Pakaian asli bumi Cendrawasih dengan dekorasi alami. Tampil sangat berani dan mencintai alam!',
  },
  {
    id: 'bali',
    label: 'Bali',
    price: 800,
    comingSoon: true,
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/1x1.png/120px-1x1.png',
    alt: 'Coming Soon Placeholder',
    description: 'Segera hadir membawa eksotisme pulau Dewata ke ujung jarimu.',
  },
  {
    id: 'minang',
    label: 'Minang',
    price: 900,
    comingSoon: true,
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/1x1.png/120px-1x1.png',
    alt: 'Coming Soon Placeholder',
    description: 'Segera hadir dengan kemegahan budaya Minangkabau yang memukau.',
  },
];

const AVATAR_SRC = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBQm_ulq0nj_E54Wh2VlaNks3lcZIAOx8_aZ5foVTD2-RjQDuDbU6FL5eUv8rxKsLC5JyWCRuDGDg9iYP-vKFyDv44PlFdCuP-YJZ9pRucZSenBHsccaeaStLzvkr_CYSsLaf3o1WG61mCrmC9SomX2NQt35g07rrD5Qw5_VyGMUAC2L79zY_950LNlVImOwOvDJVgos1nJmckmnFw3PcZCEm0yGRhzuGD4-yk5c4S5eq27aQshZWktBQZLW6Ktr9gHVzJ6ogffut8';

export default function KarakterScreen({ onBack, character: initialCharacter, onCharacterSave }) {
  const [selectedGender, setSelectedGender] = useState(
    initialCharacter === 'Perempuan' ? 'Perempuan' : 'Laki-laki'
  );
  
  // Points system states
  const [purchasedOutfits, setPurchasedOutfits] = useState(() => {
    return JSON.parse(localStorage.getItem('purchasedOutfits') || '["default", "jawa"]');
  });
  
  const [balance, setBalance] = useState(0);

  // Modal States
  const [showModal, setShowModal] = useState(false);
  const [focusedOutfit, setFocusedOutfit] = useState(null);

  React.useEffect(() => {
    const completedMateri = JSON.parse(localStorage.getItem('completedMateri') || '[]');
    const missionPts = parseInt(localStorage.getItem('missionPoints') || '0', 10);
    const spentPts = parseInt(localStorage.getItem('spentPoints') || '0', 10);
    setBalance((completedMateri.length * 150) + missionPts - spentPts);
  }, [purchasedOutfits]);

  const [selectedOutfit, setSelectedOutfit] = useState(() => {
    return localStorage.getItem('selectedOutfit') || 'jawa';
  });

  const handleOutfitClick = (outfit) => {
    const isLocked = !purchasedOutfits.includes(outfit.id);

    if (isLocked) {
      setFocusedOutfit(outfit);
      setShowModal(true);
    } else {
      setSelectedOutfit(outfit.id);
    }
  };

  const handlePurchase = () => {
    if (!focusedOutfit) return;

    if (balance >= focusedOutfit.price) {
      // Add to purchased
      const updatedPurchases = [...purchasedOutfits, focusedOutfit.id];
      setPurchasedOutfits(updatedPurchases);
      localStorage.setItem('purchasedOutfits', JSON.stringify(updatedPurchases));

      // Subtract points
      const spentPts = parseInt(localStorage.getItem('spentPoints') || '0', 10);
      localStorage.setItem('spentPoints', (spentPts + focusedOutfit.price).toString());

      // Select immediately and close
      setSelectedOutfit(focusedOutfit.id);
      setShowModal(false);
    }
  };

  const handleSave = () => {
    if (onCharacterSave) {
      onCharacterSave(selectedGender);
    }
    localStorage.setItem('selectedOutfit', selectedOutfit);
    if (onBack) onBack();
  };

  return (
    <div className="flex justify-center h-[100dvh] w-full bg-[#e7e8e9]">
      <div className="w-full max-w-[440px] bg-slate-50 h-[100dvh] relative shadow-2xl flex flex-col font-body overflow-hidden">

        {/* Top App Bar */}
        <header className="sticky top-0 z-40 flex items-center justify-between px-4 h-[72px] backdrop-blur-xl bg-white/80 border-b border-slate-200/60 shadow-sm">
          <div className="flex items-center gap-2">
            <button
              onClick={onBack}
              className="p-2 rounded-full hover:bg-amber-50 active:scale-90 transition-all duration-200 group"
            >
              <ArrowLeft size={24} className="text-slate-700 group-hover:text-amber-700" />
            </button>
            <h1 className="font-headline text-xl font-black text-slate-800">Karakterku</h1>
          </div>
          
          <div className="bg-gradient-to-r from-amber-100 to-amber-50 px-4 py-1.5 rounded-full flex items-center gap-1.5 border border-amber-200 shadow-sm">
            <ShieldCheck size={16} className="text-amber-600" />
            <span className="font-headline font-black text-amber-900 text-sm tracking-tight">{balance}</span>
            <span className="font-body text-[9px] font-bold text-amber-700 uppercase tracking-widest bg-amber-200/50 px-1.5 rounded-sm">Poin</span>
          </div>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto pb-32 px-5">

          {/* Avatar Preview */}
          <section className="relative flex justify-center py-10">
            <div className="relative w-64 h-64 flex items-center justify-center">
              {/* Decorative stacked backgrounds */}
              <div className="absolute -z-10 w-full h-full bg-gradient-to-tr from-amber-200/60 to-orange-100/60 rounded-3xl rotate-[4deg] shadow-lg" />
              <div className="absolute -z-10 w-full h-full bg-white/60 rounded-3xl -rotate-[3deg]" />
              <img
                alt="Avatar Character"
                className="w-full h-full object-cover rounded-3xl shadow-[0_8px_30px_rgba(217,119,6,0.15)] border-4 border-white"
                src={AVATAR_SRC}
              />
            </div>
          </section>

          {/* Gender Selection */}
          <section className="flex flex-col gap-3 mb-10">
            <h2 className="font-headline text-xl font-black text-slate-800">1. Pilih Gender</h2>
            <div className="flex gap-4">
              {/* Laki-laki */}
              <button
                onClick={() => setSelectedGender('Laki-laki')}
                className={`flex-1 py-4 px-5 rounded-2xl flex flex-col items-center gap-2 transition-all duration-300 active:scale-[0.96] ${
                  selectedGender === 'Laki-laki'
                    ? 'bg-gradient-to-b from-amber-50 to-orange-50 border-2 border-amber-500 shadow-[0_8px_20px_rgba(217,119,6,0.15)] ring-4 ring-amber-50'
                    : 'bg-white border-2 border-slate-100 shadow-sm hover:border-amber-200 hover:bg-amber-50/30'
                }`}
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className={selectedGender === 'Laki-laki' ? 'text-amber-600' : 'text-slate-400'} stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="10" cy="14" r="5" />
                  <line x1="19" y1="5" x2="14.14" y2="9.86" />
                  <polyline points="19 11 19 5 13 5" />
                </svg>
                <span className={`font-bold text-[13px] ${selectedGender === 'Laki-laki' ? 'text-amber-800' : 'text-slate-500'}`}>
                  Laki-laki
                </span>
              </button>

              {/* Perempuan */}
              <button
                onClick={() => setSelectedGender('Perempuan')}
                className={`flex-1 py-4 px-5 rounded-2xl flex flex-col items-center gap-2 transition-all duration-300 active:scale-[0.96] ${
                  selectedGender === 'Perempuan'
                    ? 'bg-gradient-to-b from-amber-50 to-orange-50 border-2 border-amber-500 shadow-[0_8px_20px_rgba(217,119,6,0.15)] ring-4 ring-amber-50'
                    : 'bg-white border-2 border-slate-100 shadow-sm hover:border-amber-200 hover:bg-amber-50/30'
                }`}
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className={selectedGender === 'Perempuan' ? 'text-amber-600' : 'text-slate-400'} stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="9" r="5" />
                  <line x1="12" y1="14" x2="12" y2="21" />
                  <line x1="9" y1="18" x2="15" y2="18" />
                </svg>
                <span className={`font-bold text-[13px] ${selectedGender === 'Perempuan' ? 'text-amber-800' : 'text-slate-500'}`}>
                  Perempuan
                </span>
              </button>
            </div>
          </section>

          {/* Outfit Selection */}
          <section className="flex flex-col gap-4">
            <h2 className="font-headline text-xl font-black text-slate-800">2. Baju & Aksesoris</h2>
            <div className="grid grid-cols-2 gap-4">
              {OUTFITS.map((outfit) => {
                const isSelected = selectedOutfit === outfit.id;
                const isLocked = !purchasedOutfits.includes(outfit.id) || outfit.comingSoon;
                const isComingSoon = outfit.comingSoon;

                return (
                  <div
                    key={outfit.id}
                    onClick={() => !isComingSoon && handleOutfitClick(outfit)}
                    className={`relative p-3 rounded-[20px] transition-all duration-300 group ${
                      isComingSoon
                        ? 'bg-white opacity-60 cursor-not-allowed border border-slate-200/50'
                        : isLocked
                        ? 'bg-white border border-slate-200 shadow-sm cursor-pointer hover:shadow-md hover:border-slate-300 active:scale-[0.97]'
                        : isSelected
                        ? 'bg-gradient-to-b from-amber-50 to-white border-2 border-amber-500 shadow-[0_8px_16px_rgba(217,119,6,0.08)] cursor-pointer active:scale-[0.97]'
                        : 'bg-white border-2 border-transparent shadow-sm cursor-pointer active:scale-[0.97] hover:shadow-md hover:border-amber-100'
                    }`}
                  >
                    {/* Outfit Thumbnail */}
                    <div className={`aspect-square bg-slate-50 rounded-2xl mb-3 overflow-hidden relative border ${isLocked && !isComingSoon ? 'border-dashed border-slate-300' : 'border-slate-100'}`}>
                      {!isComingSoon ? (
                        <img
                          className={`w-full h-full object-cover transition-transform duration-500 ${!isLocked && 'group-hover:scale-110'} ${isLocked ? 'blur-[1px] grayscale-[70%] opacity-80' : ''}`}
                          src={outfit.src}
                          alt={outfit.alt}
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center gap-1.5 bg-gradient-to-br from-slate-100 to-slate-50">
                          <Lock size={20} className="text-slate-300" />
                          <span className="text-[9px] uppercase font-bold tracking-widest text-slate-400">Segera</span>
                        </div>
                      )}

                      {/* Locked Price Badge over image */}
                      {isLocked && !isComingSoon && (
                        <div className="absolute inset-x-0 bottom-2 flex flex-col items-center justify-center">
                          <div className="bg-slate-900/80 backdrop-blur-sm border border-white/10 px-3 py-1 flex items-center gap-1.5 rounded-full shadow-lg">
                            <Lock size={10} className="text-amber-400" />
                            <span className="font-bold text-[11px] text-amber-50 tracking-wide">{outfit.price}</span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Label */}
                    <p className={`text-sm px-1 text-center font-headline ${
                      isLocked
                        ? 'font-bold text-slate-500'
                        : isSelected
                        ? 'font-black text-amber-900'
                        : 'font-bold text-slate-800'
                    }`}>
                      {outfit.label}
                    </p>

                    {/* Active Checkmark Label */}
                    {isSelected && !isLocked && (
                      <div className="absolute -top-3 -right-3 bg-amber-500 border-4 border-white text-white p-1.5 rounded-full flex items-center justify-center shadow-md">
                        <Check size={16} strokeWidth={3.5} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        </main>

        {/* Fixed Bottom CTA */}
        <div className="absolute bottom-0 left-0 w-full px-6 pb-8 pt-6 bg-gradient-to-t from-white via-white/95 to-transparent z-40 pointer-events-none">
          <button
            onClick={handleSave}
            className="w-full h-14 pointer-events-auto rounded-full bg-gradient-to-r from-amber-500 via-amber-600 to-orange-600 text-white font-headline font-black text-lg shadow-[0_8px_20px_rgba(217,119,6,0.3)] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2"
          >
            Simpan Karakter <Check size={20} />
          </button>
        </div>

        {/* Purchase Custom Modal Overlay */}
        {showModal && focusedOutfit && (
          <div className="absolute inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-5 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white w-full max-w-[440px] rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-in slide-in-from-bottom-8 duration-300">
              
              {/* Modal Banner/Image */}
              <div className="relative h-48 bg-slate-100 flex-shrink-0">
                <img 
                  src={focusedOutfit.src} 
                  alt={focusedOutfit.label}
                  className="w-full h-full object-cover grayscale-[30%] opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white"></div>
                <button 
                  onClick={() => setShowModal(false)}
                  className="absolute top-4 right-4 bg-white/40 backdrop-blur-md p-2 rounded-full text-slate-800 hover:bg-white active:scale-95 transition-all"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Modal Content */}
              <div className="px-6 pt-2 pb-8 flex flex-col gap-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-headline font-black text-3xl text-slate-800 tracking-tight">
                      {focusedOutfit.label}
                    </h3>
                    <div className="inline-flex items-center gap-1.5 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full mt-2">
                       <ShieldCheck size={14} className="text-amber-600" />
                       <span className="font-bold text-xs text-amber-800 uppercase tracking-widest">Outfit Premium</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="font-headline font-black text-2xl text-amber-600">{focusedOutfit.price}</span>
                    <span className="font-body text-[10px] uppercase font-bold text-slate-400">Poin Dibutuhkan</span>
                  </div>
                </div>

                <p className="text-sm font-body font-medium text-slate-600 leading-relaxed border-l-4 border-amber-400 pl-3 py-1">
                  {focusedOutfit.description}
                </p>

                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 flex justify-between items-center mt-2">
                  <span className="font-semibold text-sm text-slate-500">Saldo Poin Kamu:</span>
                  <span className={`font-headline font-black text-lg ${balance >= focusedOutfit.price ? 'text-slate-800' : 'text-red-500'}`}>
                    {balance} Poin
                  </span>
                </div>

                {/* Purchase Button Action */}
                <div className="mt-4">
                  {balance >= focusedOutfit.price ? (
                    <button 
                      onClick={handlePurchase}
                      className="w-full py-4 rounded-full bg-slate-900 text-white font-headline font-black text-lg hover:bg-slate-800 active:scale-95 transition-transform shadow-lg flex justify-center items-center gap-2"
                    >
                      Buka Pakaian Sekarang <Lock size={18} className="text-amber-400" />
                    </button>
                  ) : (
                    <button 
                      disabled
                      className="w-full py-4 rounded-full bg-slate-200 text-slate-400 font-headline font-black text-lg cursor-not-allowed flex justify-center items-center gap-2"
                    >
                      Poin Tidak Cukup
                    </button>
                  )}
                  <button 
                    onClick={() => setShowModal(false)}
                    className="w-full py-3 mt-2 rounded-full font-headline font-bold text-slate-500 active:bg-slate-100 transition-colors"
                  >
                    Batal
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
