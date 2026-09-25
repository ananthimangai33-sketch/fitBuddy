import React, { useState } from 'react';
import { Dumbbell, Menu, X, Sparkles, ArrowRight } from 'lucide-react';

interface NavbarProps {
  onNavigate: (route: string) => void;
  currentRoute: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentRoute }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLinkClick = (hashOrRoute: string) => {
    setMobileMenuOpen(false);
    if (hashOrRoute.startsWith('#')) {
      if (currentRoute !== 'landing') {
        onNavigate('landing');
        setTimeout(() => {
          const el = document.querySelector(hashOrRoute);
          el?.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      } else {
        const el = document.querySelector(hashOrRoute);
        el?.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      onNavigate(hashOrRoute);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Zone 1: Brand Wordmark */}
        <button
          onClick={() => handleLinkClick('landing')}
          className="flex items-center gap-2.5 text-left group focus:outline-none"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-emerald-500 flex items-center justify-center text-white shadow-sm shadow-emerald-500/20 group-hover:scale-105 transition-transform">
            <Dumbbell className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900 group-hover:text-emerald-600 transition-colors">
            FitBuddy
          </span>
        </button>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <button
            onClick={() => handleLinkClick('landing')}
            className={`transition-colors hover:text-emerald-600 ${
              currentRoute === 'landing' ? 'text-emerald-600 font-semibold' : ''
            }`}
          >
            Home
          </button>
          <button
            onClick={() => handleLinkClick('#features')}
            className="transition-colors hover:text-emerald-600"
          >
            Features
          </button>
          <button
            onClick={() => handleLinkClick('#how-it-works')}
            className="transition-colors hover:text-emerald-600"
          >
            How It Works
          </button>
          <button
            onClick={() => handleLinkClick('#about')}
            className="transition-colors hover:text-emerald-600"
          >
            About
          </button>
        </nav>

        {/* Zone 3: Primary Actions */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => onNavigate('login')}
            className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors rounded-lg hover:bg-slate-100"
          >
            Login
          </button>
          <button
            onClick={() => onNavigate('signup')}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 rounded-lg shadow-sm shadow-emerald-600/20 transition-all hover:shadow-emerald-600/30 active:scale-[0.98]"
          >
            <span>Get Started</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => onNavigate('signup')}
            className="px-3 py-1.5 text-xs font-semibold text-white bg-emerald-600 rounded-lg shadow-sm"
          >
            Get Started
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-3 pb-5 space-y-2 animate-in fade-in slide-in-from-top-2">
          <button
            onClick={() => handleLinkClick('landing')}
            className="w-full text-left px-3 py-2 text-base font-medium text-slate-700 hover:text-emerald-600 hover:bg-slate-50 rounded-lg"
          >
            Home
          </button>
          <button
            onClick={() => handleLinkClick('#features')}
            className="w-full text-left px-3 py-2 text-base font-medium text-slate-700 hover:text-emerald-600 hover:bg-slate-50 rounded-lg"
          >
            Features
          </button>
          <button
            onClick={() => handleLinkClick('#how-it-works')}
            className="w-full text-left px-3 py-2 text-base font-medium text-slate-700 hover:text-emerald-600 hover:bg-slate-50 rounded-lg"
          >
            How It Works
          </button>
          <button
            onClick={() => handleLinkClick('#about')}
            className="w-full text-left px-3 py-2 text-base font-medium text-slate-700 hover:text-emerald-600 hover:bg-slate-50 rounded-lg"
          >
            About
          </button>
          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate('login');
              }}
              className="w-full py-2.5 text-center text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              Login
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate('signup');
              }}
              className="w-full py-2.5 text-center text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-4 h-4" />
              <span>Create Free Account</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
