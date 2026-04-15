import React, { useState, useEffect } from 'react';
import { X, Heart, Info, Award, Star, ArrowRight } from 'lucide-react';
import { MATERI_DATA } from '../../data/materiData';

export default function BelajarScreen({ materiId, onClose }) {
  const materi = MATERI_DATA[materiId] || MATERI_DATA['s1_m1'];
  
  const [phase, setPhase] = useState('slides'); // 'slides', 'interaction', 'quiz', 'reward'
  const [slideIndex, setSlideIndex] = useState(0);
  const [quizIndex, setQuizIndex] = useState(0);
  
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  // Save completion to localStorage when reward phase is reached
  useEffect(() => {
    if (phase === 'reward') {
      const completed = JSON.parse(localStorage.getItem('completedMateri') || '[]');
      if (!completed.includes(materiId)) {
        completed.push(materiId);
        localStorage.setItem('completedMateri', JSON.stringify(completed));
      }
    }
  }, [phase, materiId]);

  // Compute absolute progress
  const totalSteps = materi.slides.length + 1 + materi.quiz.length; 
  let currentStep = 0;
  if (phase === 'slides') currentStep = slideIndex;
  else if (phase === 'interaction') currentStep = materi.slides.length;
  else if (phase === 'quiz') currentStep = materi.slides.length + 1 + quizIndex;
  else if (phase === 'reward') currentStep = totalSteps;
  const progressPercent = phase === 'reward' ? 100 : ((currentStep + 1) / totalSteps) * 100;

  const handleNext = () => {
    if (phase === 'slides') {
      if (slideIndex < materi.slides.length - 1) {
        setSlideIndex(slideIndex + 1);
      } else {
        setPhase('interaction');
      }
    } else if (phase === 'interaction') {
      if (!showFeedback) return;
      setPhase('quiz');
      setSelectedOption(null);
      setShowFeedback(false);
    } else if (phase === 'quiz') {
      if (!showFeedback) return;
      if (quizIndex < materi.quiz.length - 1) {
        setQuizIndex(quizIndex + 1);
        setSelectedOption(null);
        setShowFeedback(false);
      } else {
        setPhase('reward');
      }
    } else if (phase === 'reward') {
      onClose(); // Exit module entirely
    }
  };

  const handleOptionSelect = (idx, isCorrect) => {
    if (showFeedback) return;
    setSelectedOption(idx);
    setShowFeedback(true);
    
    if (isCorrect) {
      const points = phase === 'quiz' ? 100 : 50;
      setScore(s => s + points);
    }
  };

  const isModuleLocked = (phase === 'interaction' || phase === 'quiz') && !showFeedback;

  return (
    <div className="flex justify-center h-[100dvh] w-full bg-[#e7e8e9] overflow-hidden">
      <div className="w-full max-w-[440px] bg-slate-50 h-full relative shadow-2xl overflow-hidden flex flex-col font-body animate-fade-in">
        
        {/* Top Header */}
        <header className="absolute top-0 w-full z-50 bg-white/90 backdrop-blur-md shadow-sm border-b border-slate-100">
          <div className="flex justify-between items-center px-6 py-4">
            <button onClick={onClose} className="text-amber-700 hover:bg-slate-100 p-2 rounded-full transition-colors active:scale-95 flex items-center">
              <X size={24} />
            </button>
            
            {/* Progress Bar */}
            <div className="flex-1 mx-6 relative h-2.5 bg-slate-100 rounded-full overflow-hidden">
              <div 
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-50 rounded-full border border-amber-100">
              <Heart className="text-amber-500 fill-amber-500" size={16} />
              <span className="font-headline font-bold text-amber-800 text-sm">5</span>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 w-full flex flex-col px-6 pt-24 pb-32 overflow-y-auto custom-scrollbar relative z-10">
          <div className="mt-4 flex flex-col gap-6">
            
            {phase !== 'reward' ? (
              <>
                {/* Frame Container 16:9 Illustration Box */}
                <div className="w-full aspect-video rounded-3xl overflow-hidden shadow-lg border-[3px] border-white relative bg-slate-200 shrink-0">
                  <img src={materi.illustration} className="w-full h-full object-cover filter brightness-[0.9]" alt="Materi Illustration" />
                  
                  {/* Floating Bimo mascot tucked in corner */}
                  <div className="absolute -bottom-2 -right-1 w-24 h-24 animate-[bimo-bob_4s_ease-in-out_infinite] z-20">
                    <img src={materi.character_img} className="w-full h-full object-contain filter drop-shadow-xl saturate-110" alt={materi.character} />
                  </div>
                </div>

                <div className="flex flex-col items-center">
                  {/* Dynamic Content Switching */}
                  {phase === 'slides' && (
                    <div className="text-center space-y-4 w-full animate-fade-in" key={slideIndex}>
                      <h2 className="font-headline text-2xl font-black text-slate-800 leading-tight">Halo, Kawan!</h2>
                      <div className="bg-white rounded-2xl p-6 relative w-full border border-slate-100 shadow-[0_4px_20px_rgba(25,28,29,0.04)]">
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-white border-t border-l border-slate-100 rotate-45"></div>
                        <p className="text-lg font-medium text-slate-700 leading-relaxed relative z-10 transition-opacity">
                          <span className="font-bold text-amber-700">{materi.character}: </span>
                          {materi.slides[slideIndex].text}
                        </p>
                      </div>
                    </div>
                  )}

                  {phase === 'interaction' && (
                    <div className="text-center w-full animate-fade-in" key="interaction">
                      <h2 className="font-headline text-2xl font-black text-slate-800 leading-tight mb-6">{materi.interaction.question}</h2>
                      <div className="flex flex-col gap-3">
                        {materi.interaction.options.map((opt, idx) => {
                          const isSelected = selectedOption === idx;
                          let btnStyle = "p-4 rounded-2xl border-2 font-bold transition-all text-left w-full shadow-sm ";
                          
                          if (!showFeedback) {
                            btnStyle += "border-slate-200 bg-white text-slate-600 hover:border-amber-400 active:scale-95";
                          } else {
                            if (isSelected && opt.isCorrect) btnStyle += "border-green-500 bg-green-50 text-green-700";
                            else if (isSelected && !opt.isCorrect) btnStyle += "border-red-500 bg-red-50 text-red-700";
                            else if (!isSelected && opt.isCorrect) btnStyle += "border-green-500 bg-green-50 text-green-700";
                            else btnStyle += "border-slate-200 bg-slate-50 text-slate-400 opacity-50";
                          }

                          return (
                            <button 
                              key={idx}
                              disabled={showFeedback} 
                              onClick={() => handleOptionSelect(idx, opt.isCorrect)} 
                              className={btnStyle}
                            >
                              {opt.text}
                            </button>
                          );
                        })}
                      </div>

                      {showFeedback && (
                        <div className={`mt-5 p-4 rounded-2xl ${materi.interaction.options[selectedOption].isCorrect ? 'bg-green-100 text-green-800 border border-green-200' : 'bg-red-100 text-red-800 border border-red-200'} font-bold font-headline animate-fade-in`}>
                          {materi.interaction.options[selectedOption].feedback}
                        </div>
                      )}
                    </div>
                  )}

                  {phase === 'quiz' && (
                    <div className="text-center w-full animate-fade-in" key={`quiz-${quizIndex}`}>
                      <div className="bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full inline-flex mb-3">
                        Kuis {quizIndex + 1} / {materi.quiz.length}
                      </div>
                      <h2 className="font-headline text-2xl font-black text-slate-800 leading-tight mb-6 mt-1">{materi.quiz[quizIndex].question}</h2>
                      
                      <div className="flex flex-col gap-3">
                        {materi.quiz[quizIndex].options.map((optLabel, idx) => {
                          const isCorrect = optLabel === materi.quiz[quizIndex].answer;
                          const isSelected = selectedOption === idx;
                          let btnStyle = "p-4 rounded-2xl border-2 font-bold transition-all text-left w-full shadow-sm ";
                          
                          if (!showFeedback) {
                            btnStyle += "border-slate-200 bg-white text-slate-600 hover:border-amber-400 active:scale-95";
                          } else {
                            if (isSelected && isCorrect) btnStyle += "border-green-500 bg-green-50 text-green-700";
                            else if (isSelected && !isCorrect) btnStyle += "border-red-500 bg-red-50 text-red-700";
                            else if (!isSelected && isCorrect) btnStyle += "border-green-500 bg-green-50 text-green-700";
                            else btnStyle += "border-slate-200 bg-slate-50 text-slate-400 opacity-50";
                          }

                          return (
                            <button 
                              key={idx}
                              disabled={showFeedback} 
                              onClick={() => handleOptionSelect(idx, isCorrect)} 
                              className={btnStyle}
                            >
                              <span className="mr-3 text-slate-400">{['A','B','C','D'][idx]}.</span>
                              {optLabel}
                            </button>
                          );
                        })}
                      </div>

                      {showFeedback && (
                        <div className="mt-5 p-4 rounded-2xl bg-blue-50 border border-blue-200 text-blue-800 font-bold font-body text-sm animate-fade-in text-left flex gap-3 items-start">
                          <Info size={20} className="text-blue-500 mt-0.5 shrink-0" />
                          <span className="leading-relaxed">{materi.quiz[quizIndex].explanation}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </>
            ) : (
              // REWARD PHASE
              <div className="text-center space-y-6 w-full animate-fade-in flex flex-col items-center justify-center pt-8">
                 <div className="w-32 h-32 bg-gradient-to-br from-amber-300 to-amber-500 rounded-full flex items-center justify-center animate-[bimo-bob_4s_ease-in-out_infinite] shadow-xl border-4 border-white mb-2">
                    <Award size={70} className="text-white" />
                 </div>
                 <div>
                   <h2 className="font-headline text-3xl font-black text-slate-800 leading-tight">Luar Biasa!</h2>
                   <p className="font-body text-slate-500 font-medium mt-2">Kamu berhasil menyelesaikan kuis Sila 1 dengan gemilang.</p>
                 </div>
                 
                 <div className="bg-emerald-50 border-2 border-emerald-200 rounded-3xl p-6 px-10 w-full space-y-2 relative overflow-hidden shadow-sm mt-4">
                    <div className="absolute -right-6 -top-6 text-emerald-500/10 rotate-12">
                      <Star size={150} className="text-emerald-500/20 fill-emerald-500/20" />
                    </div>
                    <p className="text-emerald-700 font-headline font-bold text-sm tracking-widest uppercase relative z-10">Poin Didapat</p>
                    <h3 className="text-emerald-600 font-black text-6xl relative z-10 flex justify-center items-center gap-1">
                      <span className="text-3xl">+</span>{score}
                    </h3>
                 </div>
              </div>
            )}
          </div>
        </main>

        {/* Footer Action */}
        <footer className="absolute bottom-0 w-full bg-white/95 backdrop-blur-xl pb-8 pt-4 px-6 z-50 border-t border-slate-100 shadow-[0_-8px_24px_rgba(25,28,29,0.06)]">
          <button 
            onClick={handleNext} 
            disabled={isModuleLocked}
            className={`w-full h-16 rounded-full font-headline font-bold text-lg flex items-center justify-center gap-3 transition-transform duration-150 active:scale-95 ${
              isModuleLocked 
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed opacity-70' 
                : 'bg-gradient-to-br from-[#835100] to-[#C87E00] text-white shadow-[0_8px_24px_rgba(131,81,0,0.25)]'
            }`}
          >
            <span>{phase === 'reward' ? 'Selesai & Tutup' : (isModuleLocked ? 'Pilih Jawaban' : 'Lanjut')}</span>
            {!isModuleLocked && <ArrowRight size={24} />}
          </button>
        </footer>

      </div>
    </div>
  );
}
