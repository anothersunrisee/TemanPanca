import React, { useState, useEffect } from 'react';
import { Box } from 'lucide-react';
import MainLayout from '../../layouts/MainLayout';

export default function ARScreen({ userName, character, onNotificationClick, onTabChange }) {
  const [mounted, setMounted] = useState(false);
  const [selectedAR, setSelectedAR] = useState(null);

  const MODAL_IMG = "https://lh3.googleusercontent.com/aida-public/AB6AXuArFQc5gHcePmg-EF8bTWUo5oDJFCgS7jFPO1uI9nCQjai7tHdJR_NTimN0K5w_FuIigcQi8cIP002htZRmDzuweR8AYLeRhJ5GlaMkmGciosPoj5Qejl7g_3SCENgmxafhDm0vrf4CDgFTsFj3va3CQBQClxtu0iwkUgrCYT5W6A7hzITQxsA3sTQnnr1fY6AcS7vX7PGKCRcbZ_p-OVx3Ptugq8fWWKziZZCOBLTIyZj7x6eeKnA55GleoWA94OwlT2mMllLwx80";

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const cascadeStyle = (delaySec) => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? 'translateY(0)' : 'translateY(20px)',
    transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delaySec}s`
  });

  const AR_DATA = [
    {
      id: 1, title: 'Berdoa sebelum belajar', sub: 'Lihat Bimo berdoa sebelum belajar', guide: 'Sila 1',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBVcbxCvm52PXvjuFD0k9KF0cADy4u7nZKkK3QoMIWfz-RW4FxHUjNmL3eWLhL54oGqVeR5ZTJXKqSsX_SCJ--Dc_jLjpBfxRuPQq6K56lEXSlr53Wx3-I78eRzwcJoP8Da0Lyc43G4ulzwz-BWUijBxXQgMQjcf-JybolCpqgqSwaH2X5ouXmvG9inZsA_kA0g7dfavdorfBLRz8r_SwGqdxbc9Ezn3q4BaR2AD6nNiU6sB9BisNTwfYB41zreksMTkQk-jtcWpiU',
      delay: 0.1
    },
    {
      id: 2, title: 'Menolong teman', sub: 'Lihat Siregar menolong teman', guide: 'Sila 2',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCnzM23hcRruC-jEfq92BHeiJtRoGnZPeWoVRg17xWvlIQKIWmNEpfkjpiKSO-FkSxx_3ZsQHA3eG0jEsl_526u3JadtMDbDNIIbrssntmk2V8aDzw4wL78OwPjaNSq4JDBAMWal6i-SkQw3bt1kp8iz-2jdRnRFa8uVjLom5UDCI4_TMK8tOJAorGHHtnwNKT_Qws37et2hAPCHlnXFN-pV-iZFrwG5BE4UFfvqSRsRq3GEadUn_ZmIl4ubQPXk8KJ9cr1a2-Rt1M',
      delay: 0.2
    },
    {
      id: 3, title: 'Bermain bersama', sub: 'Lihat Sinta bermain bersama', guide: 'Sila 3',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuADnx6YuwCAzbeWDhvxJfd_XwA0e0-E5StPt01VdyN_zD3bIwSVE8CP1WCxIrnp_3toSNeRgJElBLYkwGzRCy-vfS2yrioojNGn7JCW-nCqR7nXciVEdKJkk_tjtmogW2F0WXzYyeZk4-Z5G3GzwPezvA7iTJ4a5NxtuMAAZ7ZeSipt2H8ZIY4iL8QqsdOYUFmFcu-fB9z_qaCtV3O5l5yaUYuFYesZnxBxRA21lM-efCpBr9IKhoPWvD70oclAqYKf1rN_Zhvq5zc',
      delay: 0.3
    },
    {
      id: 4, title: 'Musyawarah', sub: 'Lihat Passa berdiskusi', guide: 'Sila 4',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDdwmewaPXICjEnUjic68xnUHWGVx45D84hUMETq9UkOc32oVFlZBouDkyS7pM9eqzoOZo1YJOw-sKix-KnLGUpUgkPf8Rsoz9-K7_6b8LyiHXB78LSIT2FgBp-j1rTr7jvT8KBfG8OqVbPy_aOnIxhZlyxWOh6ekWqqpHMlyPO5Hy2_ygkEU3_X6CVZA1lBcdsK2gr1kesbrvpMxcy8GHIGfgXOpfn4z6muVE-XFzAq4UG9zOtNwUO_T_jAapoJg-MAjjCtQXSJh8',
      delay: 0.4
    },
    {
      id: 5, title: 'Berbagi adil', sub: 'Lihat Aruya berbagi adil', guide: 'Sila 5',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBzfRaoOMgIkp_ncZO5-5d0sWhXOHNYgF9DPx-nR6hsDeg436hiMBA2P46Z6qX65nPUXGL07SGZk00Qn2eXkipYGyG23YZBpLSCw9oHASfHIsmHOQGS-6jGlF1cdyywtNQZTvCTrZh8UaZBEGluKWrEdepib4al__OiODVfOXcNZgU9N-PxP1R2iLWv80JeqfMkifGvxwFMlPZsWEbZeeY0HPzx9_AZnQtAcLVODAvWM7IS--mBW800GFq_f9YsQhbDKrQ7sFitoiE',
      delay: 0.5
    }
  ];

  return (
    <MainLayout activeTab="ar" userName={userName} character={character} onNotificationClick={onNotificationClick} onTabChange={onTabChange}>
      <div className="px-6 pt-6 pb-8 space-y-8">
        {/* Header Section */}
        <section className="mt-2" style={cascadeStyle(0.05)}>
          <h2 className="font-headline font-bold text-3xl text-primary mb-2">Jelajah AR</h2>
          <p className="font-body text-on-surface-variant font-medium">Lihat dunia Pancasila dalam wujud 3D nyata!</p>
        </section>

        {/* AR Experience List */}
        <div className="flex flex-col gap-6">
          {AR_DATA.map((item) => (
            <article key={item.id} className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-[0_8px_24px_rgba(25,28,29,0.06)] group border border-slate-100" style={cascadeStyle(item.delay)}>
              <div className="p-5 flex flex-col gap-4">
                <span className="inline-flex items-center justify-center bg-secondary-fixed text-on-secondary-fixed-variant px-3 py-1 rounded-full text-[10px] font-bold w-fit uppercase tracking-wider">
                  {item.guide}
                </span>
                <div className="aspect-video w-full rounded-xl overflow-hidden bg-surface-container relative border border-slate-50">
                  <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={item.title} src={item.img} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
                <div className="flex flex-col gap-1 mb-2">
                  <h3 className="font-headline font-bold text-lg text-on-surface leading-tight">{item.title}</h3>
                  <p className="text-slate-500 font-body font-medium text-xs">{item.sub}</p>
                </div>
                <button 
                  onClick={() => setSelectedAR(item)}
                  className="w-full py-3.5 rounded-full bg-gradient-to-br from-amber-600 to-amber-700 text-white font-bold font-headline flex items-center justify-center gap-2 shadow-lg shadow-amber-900/20 active:scale-95 transition-transform"
                >
                  <Box size={20} />
                  Lihat AR
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Modal Overlay Backdrop */}
      {selectedAR && (
        <div className="fixed inset-0 bg-[#191c1d]/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4 animate-fade-in">
          {/* Modal Container */}
          <div className="bg-white w-[88%] max-w-[320px] rounded-3xl shadow-2xl overflow-hidden relative animate-popup">
            
            {/* Asymmetric Illustration Section */}
            <div className="relative pt-8 pb-2 px-6 flex justify-center">
              <div className="absolute top-2 right-4 w-20 h-20 bg-[#ffdea8]/30 rounded-full blur-xl"></div>
              <div className="relative">
                <img className="w-32 h-32 object-contain drop-shadow-lg transform -rotate-3" alt="Bimo Illustration" src={MODAL_IMG} />
              </div>
            </div>
            
            {/* Content Section */}
            <div className="px-6 pb-8 text-center">
              <h2 className="font-headline text-xl font-bold text-[#191c1d] mb-2 tracking-tight">
                Buka di Assemblr?
              </h2>
              <p className="font-body text-xs text-[#524435] leading-relaxed mb-6">
                Kamu akan diarahkan ke Assemblr EDU untuk melihat <span className="font-bold text-[#835100]">"{selectedAR.title}"</span> 3D!
              </p>
              
              {/* Actions */}
              <div className="flex flex-col gap-2.5">
                <a href="#" className="bg-gradient-to-br from-amber-600 to-amber-700 text-white font-headline font-bold py-3.5 px-6 rounded-full shadow-lg shadow-amber-900/20 active:scale-95 transition-transform duration-150 inline-block w-full text-sm">
                  Buka Sekarang
                </a>
                <button 
                  onClick={() => setSelectedAR(null)}
                  className="text-[#835100] font-headline font-bold py-2.5 px-6 rounded-full hover:bg-slate-50 transition-colors active:scale-95 duration-150 text-sm"
                >
                  Nanti Saja
                </button>
              </div>
            </div>
            
            {/* Subtle Tonal Accent */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-[#f7dbb8]"></div>
          </div>
        </div>
      )}
    </MainLayout>
  );
}
