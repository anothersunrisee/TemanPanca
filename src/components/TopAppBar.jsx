import React from 'react';

export const BOY_IMG = "https://lh3.googleusercontent.com/aida-public/AB6AXuBB1QYtk9ASRxzIRCQSAU_nIShJtPUx6D7-JT0deHP8Uygg5yW4Xgcd2hn1yE1S8ZmFrVewN2FiTK3Ii_WyKg13bZD95YFheJ34dL3sBOtksaDzS30YOvGAH4M9iFHi582Oux--L0tmHIxXFkkamRx06rtaS2K244ZRpkZlZmwKxcVmdmfH-c3JTLxap7lvntH5LMxt6Scl7W3n7Sl1NnHjBOHAQLuRmNmInStT89835gGunBbuQNduxAfQuBxKskIdAdc6quAL7OM";
export const GIRL_IMG = "https://lh3.googleusercontent.com/aida-public/AB6AXuCNxPDvJkSAPUCH08xdFIdjaG0f1hHmjZY83JT4bA0YggGPTQn_4NvEvPOg-0QWzrl-ypZsfp4x-GXFYdRJaF9zfVrffB4XK5hnXsd2ZVJvPMP20e9RaGOnvNyohKq2fxG4p5T9o4zD0xFOtug4CVHFEQMVX7hiSFIT3LlIguWSo2nNU4mD9tLZIpYujZHXwv7RopfaradaPN4nOmujDWvaN6MiKQxubpIlgUbchji2HimsH3am6n8GexLqlvi7DEkoKLG3hzQ4qk0";

export default function TopAppBar({ character, onNotificationClick }) {
  const avatarUrl = character === 'Perempuan' ? GIRL_IMG : BOY_IMG;

  return (
    <header className="fixed top-0 w-full max-w-[440px] z-50 bg-white/80 backdrop-blur-md shadow-sm flex justify-between items-center px-6 py-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary-fixed bg-secondary-container shadow-inner">
          <img alt="Avatar" src={avatarUrl} className="w-full h-full object-cover" />
        </div>
        
        {/* Custom Two-Tone Logo Text */}
        <div className="font-black text-2xl font-headline tracking-tight flex items-center pt-1">
          <span style={{ color: '#F5D9B6' }}>Teman</span>
          <span style={{ color: '#C87E00' }}>Panca</span>
        </div>
      </div>
      
      <button onClick={onNotificationClick} className="relative p-2 text-slate-600 hover:bg-amber-50 rounded-full transition-colors active:scale-95">
        <span className="material-symbols-outlined text-2xl">notifications</span>
        <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 border-2 border-white rounded-full"></span>
      </button>
    </header>
  );
}
