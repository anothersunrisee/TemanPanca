import React, { useState } from 'react';
import { ArrowLeft, Check, Lock } from 'lucide-react';

const OUTFITS = [
  {
    id: 'default',
    label: 'Default',
    locked: false,
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB108fhDPKMlX6NaK45QU5lPm2jIBSUDw2Tra2Szz_9aMhXkLiUqzehtOYSkbKS_9_eIQQl7L3IKH46NoGLI5kXRCEK847DivkJUKV3UxMYwspwxN519G_1SzLZyJila3ROxMus1ajUye2Iu9sZdXPIfzXRh_OjiGA0Ctvh91d4YU0P5maHC5GOWDvXpT4fTt-Et_EaAU8RTThyAuCbHjfEhW1Q-k5WpcNC_iYIGvbgp6DwkP4emrGuLtSPRBUAR09RbXSMU1pe_Js',
    alt: 'Simple t-shirt and jeans casual outfit',
  },
  {
    id: 'jawa',
    label: 'Jawa',
    locked: false,
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCdZsFogf_0lq2gFhOLT1Pg5TR9h4o91xKQtqItgpOLS8nFCyV9EzIMEaB7shwcCeA48XRAWhLTG9UmW9d1RHzufauqsPxxClapTDseMwD-D6G-wb_OT5ImbZJAUeqiKwhNDq8I568vGpo8wYOQyJyvHwB9MwU9IwO3ywg6HaMa1fgB03tIWCagxiNq7-NQeU07K3C63tCjtc6nWnwzlYmMJGp8PMdeDeWYs5XYwnJuK4ApYYZA9OurWES9Hzg9mNRasjCZHZlhdB4',
    alt: 'Javanese traditional batik and blangkon hat',
  },
  {
    id: 'batak',
    label: 'Batak',
    locked: true,
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBe5xGT6N9rkRSupO1U9KE-XEauDo_J0bLNurGV61XT3Hlhc_7pj6mSAVS47U6q_DaE-opeUC6cTCIFUQlyDwPtV6784OAa-B3XyxSNTJHO1K9GX6ic9GzUswQvXHHXlHX-0wA2ZYnPTKxTDsQqnlU4AxZSOSAVFqYcKxD0EAoRWWh5UmLnq3gsaHLiN6z8PzwpkRBaiKaKIBO7z4UMpzAGmMG9rGCDPqhtYjD15G02OESem7-E2jAg5Kx6AN3UWVdA8qCTfg2xsRM',
    alt: 'Batak traditional Ulos fabric costume',
  },
  {
    id: 'dayak',
    label: 'Dayak',
    locked: true,
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCTlcd3cqx0yBlKErwvz8tZ98lAC5Ay8IWAjgTWnlg6Ucnj-ym_0hGLaqcgiRHtZDzyL_1vdOQLCG7n1mr-dZcDLrxCT7ERWExgRJPjmuYOCreyvE3pxa8t26Ku9qYCtEoxheu1NsAuaHf_ar8-O9Ay8Lg77p72mtgWf7IzIGtYWtIr54gWNM7tWN5IBLlYF_3v2dsFwZ_M0eBZphLThKN0rln9W4fEH0gxvG9kL-GXg1lI75PNKSveS3ZIalsjpZumFwvA6_t2aZc',
    alt: 'Dayak traditional costume with feathers and beadwork',
  },
  {
    id: 'bugis',
    label: 'Bugis',
    locked: true,
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDLTyeYNrZUUVFZiZM0ReFztc_cKBFWpy55gw2eY6sszWHm8Rkz7muvItlxCi_z8DvFx2aaKN7Lgqye6OCl_j3b0yNM66kVw5Uz5Aw9tt6qaTW9uXVwx7Y7LeMhot5azutjzjjDBsiIJp0gnu-JOjdWOrok1jrcjNb5tgxYUUm4NEN9o0NMNcv6msbImQQRwE45Dfsl9Bl4BS7UVfy6hWWcNpNtocGqflf-v9yJMdNcMiczzbgHnTwUIUrUuZs6FsysJSeXIIrrcVk',
    alt: 'Bugis traditional Baju Bodo',
  },
  {
    id: 'papua',
    label: 'Papua',
    locked: true,
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAsThHe39Ev_bSq1n_qBPF1lvuTXIX6ji5TfGuU_vJjAYajt9Plr29YQcmWVeXp8-NVLasPamZwgZ66ZbP1-d5bPyoxGAlrJ2n5rt-ECWYHJWX-jsverjkev4hCs_7uP2B-tVH_TrUsMlZHWMKXBSp0shrRjt4HAT0C19RqGIV4DNh0IZfgjD151Lrr-JJjS4wFs7z6RUcPvNALg_s125owne2JDN4vXyqiewEQ6MVTqt73X8glfD0paNZi4vBw7CswEcKHExyqFSM',
    alt: 'Papuan traditional grass skirt and shell accessories',
  },
];

const AVATAR_SRC = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBQm_ulq0nj_E54Wh2VlaNks3lcZIAOx8_aZ5foVTD2-RjQDuDbU6FL5eUv8rxKsLC5JyWCRuDGDg9iYP-vKFyDv44PlFdCuP-YJZ9pRucZSenBHsccaeaStLzvkr_CYSsLaf3o1WG61mCrmC9SomX2NQt35g07rrD5Qw5_VyGMUAC2L79zY_950LNlVImOwOvDJVgos1nJmckmnFw3PcZCEm0yGRhzuGD4-yk5c4S5eq27aQshZWktBQZLW6Ktr9gHVzJ6ogffut8';

export default function KarakterScreen({ onBack, character: initialCharacter, onCharacterSave }) {
  const [selectedGender, setSelectedGender] = useState(
    initialCharacter === 'Perempuan' ? 'Perempuan' : 'Laki-laki'
  );
  const [selectedOutfit, setSelectedOutfit] = useState('jawa');

  const handleSave = () => {
    if (onCharacterSave) {
      onCharacterSave(selectedGender);
    }
    if (onBack) onBack();
  };

  return (
    <div className="flex justify-center min-h-[100dvh] w-full bg-[#e7e8e9]">
      {/* Mobile container */}
      <div className="w-full max-w-[440px] bg-[#f8f9fa] min-h-[100dvh] relative shadow-2xl flex flex-col font-body overflow-hidden">

        {/* Top App Bar */}
        <header className="sticky top-0 z-50 flex items-center px-4 h-16 backdrop-blur-md bg-white/90 border-b border-slate-100/80">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="p-2 rounded-full hover:bg-slate-100 active:scale-90 transition-all duration-200"
            >
              <ArrowLeft size={22} className="text-[#835100]" />
            </button>
            <h1 className="font-headline text-xl font-bold text-on-surface">Karakterku</h1>
          </div>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto pb-28 px-5">

          {/* Avatar Preview */}
          <section className="relative flex justify-center py-8">
            <div className="relative w-56 h-56 flex items-center justify-center">
              {/* Decorative stacked backgrounds */}
              <div className="absolute -z-10 w-full h-full bg-[#f7dbb8]/50 rounded-2xl rotate-3" />
              <div className="absolute -z-10 w-full h-full bg-[#ffdea8]/30 rounded-xl -rotate-6" />
              <img
                alt="Avatar Character"
                className="w-full h-full object-cover rounded-2xl shadow-[0_8px_32px_rgba(131,81,0,0.14)]"
                src={AVATAR_SRC}
              />
            </div>
          </section>

          {/* Gender Selection */}
          <section className="flex flex-col gap-3 mb-8">
            <h2 className="font-headline text-lg font-bold text-[#524435]">Pilih Gender</h2>
            <div className="flex gap-3">
              {/* Laki-laki */}
              <button
                onClick={() => setSelectedGender('Laki-laki')}
                className={`flex-1 py-4 px-5 rounded-full flex flex-col items-center gap-1.5 transition-all duration-200 active:scale-[0.96] ${
                  selectedGender === 'Laki-laki'
                    ? 'bg-white border-2 border-[#835100] shadow-[0_4px_16px_rgba(131,81,0,0.12)]'
                    : 'bg-[#f2f4f5] border-2 border-transparent'
                }`}
              >
                {/* Using SVG inline for the male/female symbols since Lucide doesn't have them */}
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className={selectedGender === 'Laki-laki' ? 'text-[#835100]' : 'text-[#524435]/60'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="10" cy="14" r="5" />
                  <line x1="19" y1="5" x2="14.14" y2="9.86" />
                  <polyline points="19 11 19 5 13 5" />
                </svg>
                <span className={`font-semibold text-sm ${selectedGender === 'Laki-laki' ? 'text-[#835100]' : 'text-[#524435]/60'}`}>
                  Laki-laki
                </span>
              </button>

              {/* Perempuan */}
              <button
                onClick={() => setSelectedGender('Perempuan')}
                className={`flex-1 py-4 px-5 rounded-full flex flex-col items-center gap-1.5 transition-all duration-200 active:scale-[0.96] ${
                  selectedGender === 'Perempuan'
                    ? 'bg-white border-2 border-[#835100] shadow-[0_4px_16px_rgba(131,81,0,0.12)]'
                    : 'bg-[#f2f4f5] border-2 border-transparent'
                }`}
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className={selectedGender === 'Perempuan' ? 'text-[#835100]' : 'text-[#524435]/60'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="9" r="5" />
                  <line x1="12" y1="14" x2="12" y2="21" />
                  <line x1="9" y1="18" x2="15" y2="18" />
                </svg>
                <span className={`font-semibold text-sm ${selectedGender === 'Perempuan' ? 'text-[#835100]' : 'text-[#524435]/60'}`}>
                  Perempuan
                </span>
              </button>
            </div>
          </section>

          {/* Outfit Selection */}
          <section className="flex flex-col gap-4">
            <h2 className="font-headline text-lg font-bold text-[#524435]">Pilih Pakaian</h2>
            <div className="grid grid-cols-2 gap-3">
              {OUTFITS.map((outfit) => {
                const isSelected = selectedOutfit === outfit.id;
                const isLocked = outfit.locked;

                return (
                  <div
                    key={outfit.id}
                    onClick={() => !isLocked && setSelectedOutfit(outfit.id)}
                    className={`relative p-3 rounded-2xl transition-all duration-200 ${
                      isLocked
                        ? 'bg-[#f2f4f5] opacity-75 cursor-not-allowed'
                        : isSelected
                        ? 'bg-white border-2 border-[#835100] shadow-[0_8px_24px_rgba(131,81,0,0.12)] cursor-pointer active:scale-[0.97]'
                        : 'bg-white shadow-[0_4px_16px_rgba(25,28,29,0.06)] cursor-pointer active:scale-[0.97] hover:shadow-[0_4px_16px_rgba(25,28,29,0.10)]'
                    }`}
                  >
                    {/* Outfit Thumbnail */}
                    <div className="aspect-square bg-[#e7e8e9] rounded-xl mb-2 overflow-hidden relative">
                      <img
                        className={`w-full h-full object-cover ${isLocked ? 'blur-[2px]' : ''}`}
                        src={outfit.src}
                        alt={outfit.alt}
                      />
                      {isLocked && (
                        <>
                          <div className="absolute inset-0 bg-[#191c1d]/10 rounded-xl" />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="bg-white/80 backdrop-blur-sm p-2.5 rounded-full shadow-md">
                              <Lock size={20} className="text-[#524435]/70" />
                            </div>
                          </div>
                        </>
                      )}
                    </div>

                    {/* Label */}
                    <p className={`text-sm px-1 ${
                      isLocked
                        ? 'font-medium text-[#524435]/50'
                        : isSelected
                        ? 'font-bold text-[#835100]'
                        : 'font-medium text-on-surface'
                    }`}>
                      {outfit.label}
                    </p>

                    {/* Active check badge */}
                    {isSelected && !isLocked && (
                      <div className="absolute top-2 right-2 bg-[#835100] text-white p-1 rounded-full flex items-center justify-center shadow-sm">
                        <Check size={12} strokeWidth={3} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        </main>

        {/* Fixed Bottom CTA */}
        <div className="absolute bottom-0 left-0 w-full px-5 pb-8 pt-4 bg-white/90 backdrop-blur-md border-t border-slate-100/60 z-50">
          <button
            onClick={handleSave}
            className="w-full h-14 rounded-full bg-gradient-to-br from-[#835100] to-[#a46700] text-white font-headline font-bold text-base shadow-[0_8px_24px_rgba(131,81,0,0.24)] active:scale-[0.96] transition-transform duration-150"
          >
            Gunakan
          </button>
        </div>

      </div>
    </div>
  );
}
