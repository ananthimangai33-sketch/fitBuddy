import React, { useState } from 'react';
import {
  LayoutDashboard,
  CalendarDays,
  Sparkles,
  TrendingUp,
  MessageSquare,
  User,
  Settings,
  LogOut,
  Dumbbell,
  Menu,
  X,
  ChevronRight,
} from 'lucide-react';
import { UserProfile } from '../types/fitness';

interface SidebarProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
  userProfile: UserProfile;
  onLogout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentRoute,
  onNavigate,
  userProfile,
  onLogout,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'fitness-plan', label: 'My Fitness Plan', icon: CalendarDays },
    { id: 'generate-plan', label: 'Generate Plan', icon: Sparkles, badge: 'AI' },
    { id: 'progress', label: 'Progress', icon: TrendingUp },
    { id: 'assistant', label: 'AI Assistant', icon: MessageSquare },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Desktop Sidebar (Fixed left 260px) */}
      <aside className="hidden lg:flex flex-col w-64 bg-slate-900 text-slate-300 border-r border-slate-800 shrink-0 select-none">
        {/* Brand Lockup */}
        <div className="h-16 flex items-center px-6 border-b border-slate-800 gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-slate-950 font-bold shadow-md shadow-emerald-500/20">
            <Dumbbell className="w-4 h-4 text-slate-950" />
          </div>
          <div>
            <span className="text-base font-bold text-white tracking-tight">FitBuddy</span>
            <div className="text-[11px] text-emerald-400 font-medium">Gemini AI Powered</div>
          </div>
        </div>

        {/* Navigation List */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentRoute === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all group ${
                  isActive
                    ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 font-semibold'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4 h-4 transition-colors ${
                      isActive ? 'text-emerald-400' : 'text-slate-400 group-hover:text-white'
                    }`}
                  />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* User Profile Footer Card */}
        <div className="p-3 border-t border-slate-800/80 bg-slate-950/40">
          <div
            onClick={() => handleNavClick('profile')}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-800/60 transition-colors cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-full bg-slate-800 overflow-hidden border border-slate-700 shrink-0">
              {userProfile.avatarUrl ? (
                <img
                  src={userProfile.avatarUrl}
                  alt={userProfile.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-sm font-bold text-emerald-400">
                  {userProfile.name.charAt(0)}
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-semibold text-white truncate group-hover:text-emerald-400 transition-colors">
                {userProfile.name}
              </div>
              <div className="text-[11px] text-slate-400 truncate">
                {userProfile.fitnessGoal.replace('_', ' ')}
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-slate-300" />
          </div>

          <button
            onClick={onLogout}
            className="mt-2 w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Mobile Top Header */}
      <header className="lg:hidden sticky top-0 z-30 flex items-center justify-between px-4 h-14 bg-slate-900 text-white border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-emerald-500 flex items-center justify-center text-slate-950 font-bold">
            <Dumbbell className="w-3.5 h-3.5 text-slate-950" />
          </div>
          <span className="font-bold text-sm tracking-tight">FitBuddy</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handleNavClick('generate-plan')}
            className="px-2.5 py-1 text-xs font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-500/40 rounded-lg flex items-center gap-1"
          >
            <Sparkles className="w-3 h-3 text-emerald-400" />
            <span>AI Plan</span>
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
          <div className="absolute top-0 right-0 bottom-0 w-72 bg-slate-900 border-l border-slate-800 p-4 flex flex-col justify-between shadow-2xl">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500 flex items-center justify-center text-slate-950">
                    <Dumbbell className="w-4 h-4" />
                  </div>
                  <span className="font-bold text-white text-base">FitBuddy</span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 text-slate-400 hover:text-white rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentRoute === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-emerald-600/20 text-emerald-400 font-semibold'
                          : 'text-slate-400 hover:text-white hover:bg-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 space-y-3">
              <div
                onClick={() => handleNavClick('profile')}
                className="flex items-center gap-3 p-2 rounded-lg bg-slate-800/60 cursor-pointer"
              >
                <div className="w-8 h-8 rounded-full bg-slate-700 overflow-hidden">
                  {userProfile.avatarUrl ? (
                    <img
                      src={userProfile.avatarUrl}
                      alt={userProfile.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs text-white">
                      {userProfile.name[0]}
                    </div>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold text-white truncate">{userProfile.name}</p>
                  <p className="text-[11px] text-slate-400 truncate">{userProfile.email}</p>
                </div>
              </div>

              <button
                onClick={onLogout}
                className="w-full py-2 text-center text-xs font-semibold text-rose-400 bg-rose-950/20 hover:bg-rose-950/40 border border-rose-900/30 rounded-lg transition-colors flex items-center justify-center gap-1.5"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Log Out</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Bottom Quick Navigation Bar (Sticky bottom thumb zone) */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-slate-900/95 backdrop-blur-md border-t border-slate-800 px-2 py-1.5 flex items-center justify-around shadow-lg">
        <button
          onClick={() => handleNavClick('dashboard')}
          className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-lg text-[11px] font-medium transition-colors ${
            currentRoute === 'dashboard' ? 'text-emerald-400' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <LayoutDashboard className="w-4 h-4" />
          <span>Home</span>
        </button>

        <button
          onClick={() => handleNavClick('fitness-plan')}
          className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-lg text-[11px] font-medium transition-colors ${
            currentRoute === 'fitness-plan' ? 'text-emerald-400' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <CalendarDays className="w-4 h-4" />
          <span>Plan</span>
        </button>

        <button
          onClick={() => handleNavClick('generate-plan')}
          className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-lg text-[11px] font-medium transition-colors ${
            currentRoute === 'generate-plan' ? 'text-emerald-400' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <div className="w-7 h-7 -mt-3 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center shadow-md shadow-emerald-500/30">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <span className="text-[10px] font-semibold text-emerald-400">Generate</span>
        </button>

        <button
          onClick={() => handleNavClick('assistant')}
          className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-lg text-[11px] font-medium transition-colors ${
            currentRoute === 'assistant' ? 'text-emerald-400' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>Coach</span>
        </button>

        <button
          onClick={() => handleNavClick('progress')}
          className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-lg text-[11px] font-medium transition-colors ${
            currentRoute === 'progress' ? 'text-emerald-400' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>Stats</span>
        </button>
      </nav>
    </>
  );
};
