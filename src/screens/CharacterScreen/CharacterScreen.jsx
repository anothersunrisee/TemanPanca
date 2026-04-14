import React, { useState } from 'react';

export default function CharacterScreen({ onCharacterSelect }) {
  const [selectedGender, setSelectedGender] = useState(null);

  const handleSubmit = () => {
    if (selectedGender) {
      onCharacterSelect(selectedGender);
    }
  };

  return (
    <div className="bg-[#F8F7F6] text-on-surface font-body min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      
      {/* Decorative Backgrounds (Full Screen) */}
      <div className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none">
        <div className="absolute top-24 left-10 pointer-events-none opacity-20 hidden lg:block">
          <div className="w-24 h-24 rounded-xl rotate-12 bg-primary-fixed border-4 border-white shadow-lg flex items-center justify-center">
            <span className="material-symbols-outlined text-4xl text-primary">draw</span>
          </div>
        </div>
        <div className="absolute bottom-32 right-10 pointer-events-none opacity-20 hidden lg:block">
          <div className="w-32 h-32 rounded-full -rotate-6 bg-tertiary-fixed border-4 border-white shadow-lg flex items-center justify-center">
            <span className="material-symbols-outlined text-5xl text-tertiary">star</span>
          </div>
        </div>
      </div>

      <main className="w-full max-w-[440px] px-6 py-12 flex flex-col items-center justify-center z-10 animate-fade-in">
        <div className="text-center mb-10 space-y-3">
          <h1 className="text-3xl md:text-4xl font-black text-on-surface tracking-tight font-headline">
            Pilih karaktermu
          </h1>
          <p className="text-on-surface-variant font-medium text-base md:text-lg">
            Siapa yang akan menemanimu hari ini?
          </p>
        </div>

        {/* Character Selection Grid - Left and Right */}
        <div className="grid grid-cols-2 gap-4 w-full h-full">
          {/* Petualang / Laki-laki */}
          <div className="group relative flex flex-col items-center transition-all duration-300 hover:-translate-y-2">
            <div className="absolute -top-3 -left-3 z-10 bg-secondary-fixed text-on-secondary-container px-3 py-1 rounded-full font-bold text-[10px] uppercase tracking-widest filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.1)] rotate-[-6deg]">
                Petualang
            </div>
            <button 
              onClick={() => setSelectedGender('Laki-laki')}
              className={`w-full bg-white p-4 rounded-xl shadow-[0_8px_24px_rgba(25,28,29,0.06)] border-4 transition-all group-active:scale-[0.98] ${
                selectedGender === 'Laki-laki' ? 'border-primary ring-2 ring-primary/20' : 'border-transparent'
              }`}
            >
              <div className="aspect-[4/5] w-full rounded-lg bg-secondary-container mb-4 overflow-hidden relative border border-black/5">
                <img 
                  className="w-full h-full object-cover mix-blend-multiply opacity-90 group-hover:scale-105 transition-transform duration-500" 
                  alt="Boy character" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBB1QYtk9ASRxzIRCQSAU_nIShJtPUx6D7-JT0deHP8Uygg5yW4Xgcd2hn1yE1S8ZmFrVewN2FiTK3Ii_WyKg13bZD95YFheJ34dL3sBOtksaDzS30YOvGAH4M9iFHi582Oux--L0tmHIxXFkkamRx06rtaS2K244ZRpkZlZmwKxcVmdmfH-c3JTLxap7lvntH5LMxt6Scl7W3n7Sl1NnHjBOHAQLuRmNmInStT89835gGunBbuQNduxAfQuBxKskIdAdc6quAL7OM"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary-container/40 to-transparent"></div>
              </div>
              <span className="text-lg md:text-xl font-bold font-headline text-on-surface block">Laki-laki</span>
            </button>
          </div>

          {/* Cerdas / Perempuan */}
          <div className="group relative flex flex-col items-center transition-all duration-300 hover:-translate-y-2">
            <div className="absolute -top-3 -right-3 z-10 bg-tertiary-fixed text-on-tertiary-fixed-variant px-3 py-1 rounded-full font-bold text-[10px] uppercase tracking-widest filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.1)] rotate-[8deg]">
                Cerdas
            </div>
            <button 
              onClick={() => setSelectedGender('Perempuan')}
              className={`w-full bg-white p-4 rounded-xl shadow-[0_8px_24px_rgba(25,28,29,0.06)] border-4 transition-all group-active:scale-[0.98] ${
                selectedGender === 'Perempuan' ? 'border-primary ring-2 ring-primary/20' : 'border-transparent'
              }`}
            >
              <div className="aspect-[4/5] w-full rounded-lg bg-tertiary-container mb-4 overflow-hidden relative border border-black/5">
                <img 
                  className="w-full h-full object-cover mix-blend-multiply opacity-90 group-hover:scale-105 transition-transform duration-500" 
                  alt="Girl character" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCNxPDvJkSAPUCH08xdFIdjaG0f1hHmjZY83JT4bA0YggGPTQn_4NvEvPOg-0QWzrl-ypZsfp4x-GXFYdRJaF9zfVrffB4XK5hnXsd2ZVJvPMP20e9RaGOnvNyohKq2fxG4p5T9o4zD0xFOtug4CVHFEQMVX7hiSFIT3LlIguWSo2nNU4mD9tLZIpYujZHXwv7RopfaradaPN4nOmujDWvaN6MiKQxubpIlgUbchji2HimsH3am6n8GexLqlvi7DEkoKLG3hzQ4qk0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-tertiary-container/40 to-transparent"></div>
              </div>
              <span className="text-lg md:text-xl font-bold font-headline text-on-surface block">Perempuan</span>
            </button>
          </div>
        </div>

        <div className="mt-14 w-full">
          <button 
            onClick={handleSubmit}
            disabled={!selectedGender}
            className={`w-full max-w-[340px] mx-auto py-4 px-6 rounded-full font-black text-xl font-headline flex items-center justify-center gap-3 transition-all duration-200 ${
              selectedGender 
                ? 'bg-gradient-to-br from-primary to-primary-container text-on-primary shadow-lg shadow-primary/20 hover:scale-[0.98] active:scale-95 cursor-pointer' 
                : 'bg-surface-variant text-outline cursor-not-allowed opacity-60'
            }`}
          >
            Mulai Petualangan
            <span className="material-symbols-outlined font-bold text-2xl">rocket_launch</span>
          </button>
        </div>
      </main>
    </div>
  );
}
