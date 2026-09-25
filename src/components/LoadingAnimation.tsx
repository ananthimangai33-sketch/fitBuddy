import React, { useEffect, useState } from 'react';
import { Sparkles, Brain, Check, Dumbbell } from 'lucide-react';

interface LoadingAnimationProps {
  onComplete?: () => void;
  title?: string;
}

export const LoadingAnimation: React.FC<LoadingAnimationProps> = ({
  onComplete,
  title = 'FitBuddy AI is creating your personalized plan...',
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const steps = [
    'Analyzing target goal and experience level...',
    'Calculating muscle recovery windows and weekly volume...',
    'Selecting compound exercises for your equipment profile...',
    'Synthesizing intelligent form cues and rest intervals...',
    'Finalizing your customized Gemini fitness plan...',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStepIndex((prev) => {
        if (prev < steps.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 450);

    return () => clearInterval(interval);
  }, [steps.length]);

  return (
    <div className="flex flex-col items-center justify-center p-8 sm:p-12 text-center max-w-lg mx-auto bg-white rounded-2xl border border-slate-200/90 shadow-xl">
      {/* Animated Glowing AI Orb */}
      <div className="relative mb-6">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-emerald-600 via-emerald-500 to-lime-400 flex items-center justify-center text-white shadow-xl shadow-emerald-500/25 animate-pulse">
          <Brain className="w-10 h-10 text-white animate-bounce" />
        </div>
        <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-slate-900 border-2 border-white flex items-center justify-center">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
        </div>
      </div>

      <h3 className="text-xl font-bold text-slate-900 mb-2">{title}</h3>
      <p className="text-sm text-slate-500 mb-8 max-w-xs">
        Gemini 3.8 Flash model is structuring an evidence-based training split
      </p>

      {/* Step Indicators */}
      <div className="w-full space-y-3 text-left mb-6">
        {steps.map((step, idx) => {
          const isDone = idx < currentStepIndex;
          const isCurrent = idx === currentStepIndex;

          return (
            <div
              key={idx}
              className={`flex items-center gap-3 p-2.5 rounded-lg text-xs transition-all duration-300 ${
                isCurrent
                  ? 'bg-emerald-50 text-emerald-950 font-semibold border border-emerald-200 shadow-sm'
                  : isDone
                  ? 'text-slate-500 line-through opacity-70'
                  : 'text-slate-400 opacity-40'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                  isDone
                    ? 'bg-emerald-600 text-white'
                    : isCurrent
                    ? 'bg-emerald-500 text-white animate-spin'
                    : 'bg-slate-200 text-slate-500'
                }`}
              >
                {isDone ? (
                  <Check className="w-3 h-3" />
                ) : isCurrent ? (
                  <Dumbbell className="w-2.5 h-2.5" />
                ) : (
                  <span className="text-[10px]">{idx + 1}</span>
                )}
              </div>
              <span className="truncate">{step}</span>
            </div>
          );
        })}
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
        <div
          className="bg-gradient-to-r from-emerald-500 to-lime-400 h-full transition-all duration-500 ease-out"
          style={{ width: `${Math.min(100, ((currentStepIndex + 1) / steps.length) * 100)}%` }}
        />
      </div>
    </div>
  );
};
