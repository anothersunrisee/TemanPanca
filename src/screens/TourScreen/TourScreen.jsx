import React, { useState, createElement } from 'react';
import * as Icons from 'lucide-react';

const SLIDES = [
  {
    id: 0,
    title: "Yuk belajar Pancasila dengan cara seru!",
    desc: "Bermain dan belajar nilai-nilai luhur menjadi lebih menyenangkan.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBa4uAWG00QWpE_zhYIXfpgWQU3G85fae5ttab6XhLsebw-llqdFYrzzZ0WVQAATYrvCN4oOJXm2xC4SlTkO8VoD8hvULPMHqkmTVACuUsK93Pz8l0QktEq2QnZSQktIrywALUYRNKYbJ4FQN8sY7w_LZv0opaoUFvsD7_3OftLMapfVGcBGl4Sn28f0X3sLGzokWQCWSCBFlC694AmRybYztci--9dDTvlDjYZHu2GnqHcOBfWSi0KtgqkOWtBBGLFOmT6Z3RiFbY",
    icon1: "BookOpen",
    icon2: "Library"
  },
  {
    id: 1,
    title: "Ada cerita, misi, dan quiz!",
    desc: "Selesaikan setiap misi dan kumpulkan berbagai lencana pencapaian.",
    image: "/Logo.png",
    icon1: "Trophy",
    icon2: "Puzzle"
  },
  {
    id: 2,
    title: "Bisa lihat AR juga!",
    desc: "Nikmati pengalaman belajar yang lebih nyata dengan teknologi Augmented Reality di setiap cerita.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB5PjpKPvBcLvGVTfnQEBhoQhkb415AePpOkNa2nxIDm5NNOdQ3C95RrOSJfmGEMQ7sO__odqqN1KJ11_mJGV7eiW7O6GUk5Qk79Y9XPmU0L2NXnk399fXlWW95JsNQRHuaANnEMfV0JS4vT0DhWEyHxpbjQ16iDmxPxNbFBKz5VhysgfdxDCFuWjfZ-l8MPptNSgV56dr5nPVVy-BXO5fztrv0G_V_ZviNN22nKg1xm9CdNlv2t2dn9QZ0LGb-azWe0q8H050NVbg",
    icon1: "Box",
    icon2: "Sparkles"
  }
];

export default function TourScreen({ onFinishTour }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slide = SLIDES[currentSlide];
  const isLast = currentSlide === SLIDES.length - 1;

  const handleNext = () => {
    if (isLast) {
      onFinishTour();
    } else {
      setCurrentSlide((prev) => prev + 1);
    }
  };

  return (
    <div className="bg-[#F8F7F6] text-on-background min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative Gradients (Unbounded, full screen) */}
      <div className="fixed top-0 left-0 w-full h-32 bg-gradient-to-b from-[#F8F7F6] to-transparent pointer-events-none opacity-90 z-20"></div>
      <div className="fixed bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#F8F7F6] to-transparent pointer-events-none opacity-90 z-20"></div>

      <main className="w-full max-w-[440px] flex flex-col items-center gap-12 text-center relative z-10 transition-opacity">
        <header className="flex flex-col items-center gap-6 w-full">
          {/* Animated Image/Graphic Container */}
          <div key={`img-${slide.id}`} className="relative w-56 h-56 md:w-64 md:h-64 mb-4 flex items-center justify-center animate-fade-in">
            <div className="absolute inset-0 bg-secondary-container/30 rounded-full blur-3xl scale-90 transition-transform duration-500 pointer-events-none"></div>
            <img 
              src={slide.image} 
              alt={slide.title} 
              className="relative z-10 w-full h-full object-contain drop-shadow-2xl transition-transform duration-500" 
            />
            {/* Floating Icons */}
            <div className="absolute top-[5%] right-[0%] z-20 bg-[#F8F7F6]/80 backdrop-blur-md p-2 rounded-full shadow-sm border border-outline-variant/10 -rotate-12 animate-bounce flex items-center justify-center">
              {createElement(Icons[slide.icon1] || Icons.HelpCircle, {size: 20, className: "text-tertiary-fixed-dim"})}
            </div>
            <div className="absolute bottom-[5%] left-[0%] z-20 bg-[#F8F7F6]/80 backdrop-blur-md p-2 rounded-full shadow-sm border border-outline-variant/10 rotate-12 animate-pulse flex items-center justify-center">
              {createElement(Icons[slide.icon2] || Icons.HelpCircle, {size: 20, className: "text-primary"})}
            </div>
          </div>

          {/* Text Content */}
          <div key={`text-${slide.id}`} className="space-y-3 px-2 animate-popup">
            <h1 className="font-headline font-black text-3xl md:text-4xl text-on-surface tracking-tighter leading-tight">
              {slide.title}
            </h1>
            <p className="font-body text-secondary text-lg font-medium opacity-80">
              {slide.desc}
            </p>
          </div>
        </header>

        {/* Controls */}
        <section className="w-full flex flex-col items-center space-y-8 z-30">
          {/* Pagination Dots */}
          <div className="flex items-center gap-2">
            {SLIDES.map((s, idx) => (
              <div 
                key={s.id} 
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentSlide === idx 
                    ? "w-8 bg-primary" 
                    : "w-2 bg-outline-variant/40"
                }`}
              ></div>
            ))}
          </div>

          <button 
            onClick={handleNext}
            className="w-full max-w-[340px] mx-auto py-4 px-6 bg-gradient-to-br from-amber-500 to-amber-700 text-white rounded-full font-headline font-bold text-lg shadow-lg shadow-amber-500/20 hover:scale-[0.98] active:scale-95 transition-transform duration-150 flex items-center justify-center gap-3"
          >
            <span>{isLast ? "Mulai Petualangan" : "Selanjutnya"}</span>
            <Icons.ArrowRight size={24} />
          </button>
        </section>

      </main>
    </div>
  );
}
