import React from 'react';
import { Dumbbell, ShieldAlert } from 'lucide-react';

interface FooterProps {
  onNavigate?: (route: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Col 1: Brand & Tagline */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-slate-950 font-bold">
                <Dumbbell className="w-4 h-4 text-slate-950" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">FitBuddy</span>
            </div>
            <p className="text-slate-400 text-sm max-w-sm">
              Personalized fitness guidance powered by Gemini AI models. Build strength, enhance endurance, and track daily habit momentum.
            </p>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-3">
              Platform
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => onNavigate?.('landing')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate?.('landing');
                    setTimeout(() => {
                      document.querySelector('#features')?.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Features
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate?.('landing');
                    setTimeout(() => {
                      document.querySelector('#how-it-works')?.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }}
                  className="hover:text-emerald-400 transition-colors"
                >
                  How It Works
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate?.('generate-plan')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  AI Plan Generator
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Legal & Resources */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-3">
              Safety & Terms
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <span className="hover:text-slate-200 transition-colors cursor-pointer">
                  Privacy Policy
                </span>
              </li>
              <li>
                <span className="hover:text-slate-200 transition-colors cursor-pointer">
                  Terms of Service
                </span>
              </li>
              <li>
                <span className="hover:text-slate-200 transition-colors cursor-pointer">
                  Medical Disclaimer
                </span>
              </li>
              <li>
                <span className="hover:text-slate-200 transition-colors cursor-pointer">
                  Contact Support
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Mandatory Health / Safety Disclaimer */}
        <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-400 mb-8 flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <span className="font-semibold text-slate-300">Safety Disclaimer:</span> FitBuddy provides general fitness guidance generated with AI. Fitness plans may not be suitable for everyone. Consult a qualified healthcare or fitness professional for personalized advice, especially if you have pre-existing medical conditions, chronic pain, or injuries.
          </p>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 FitBuddy. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Powered by Gemini AI</span>
            <span>·</span>
            <span>Engineered with sports science</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
