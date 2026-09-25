/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ToastProvider, useToast } from './components/Toast';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { Footer } from './components/Footer';
import { LandingView } from './views/LandingView';
import { AuthView } from './views/AuthView';
import { OnboardingView } from './views/OnboardingView';
import { DashboardView } from './views/DashboardView';
import { GeneratePlanView } from './views/GeneratePlanView';
import { FitnessPlanView } from './views/FitnessPlanView';
import { ProgressView } from './views/ProgressView';
import { AssistantView } from './views/AssistantView';
import { ProfileView } from './views/ProfileView';
import { SettingsView } from './views/SettingsView';
import { StorageService } from './services/storageService';
import { UserProfile, FitnessPlan, ProgressStats, AppSettings } from './types/fitness';

export type AppRoute =
  | 'landing'
  | 'login'
  | 'signup'
  | 'onboarding'
  | 'dashboard'
  | 'generate-plan'
  | 'fitness-plan'
  | 'progress'
  | 'assistant'
  | 'profile'
  | 'settings';

function routeFromPath(pathname: string): AppRoute {
  const clean = pathname.replace(/^\//, '').toLowerCase();
  switch (clean) {
    case '':
    case 'home':
      return 'landing';
    case 'login':
      return 'login';
    case 'signup':
      return 'signup';
    case 'onboarding':
      return 'onboarding';
    case 'dashboard':
      return 'dashboard';
    case 'generate-plan':
      return 'generate-plan';
    case 'fitness-plan':
      return 'fitness-plan';
    case 'progress':
      return 'progress';
    case 'assistant':
      return 'assistant';
    case 'profile':
      return 'profile';
    case 'settings':
      return 'settings';
    default:
      return 'landing';
  }
}

function pathFromRoute(route: AppRoute): string {
  if (route === 'landing') return '/';
  return `/${route}`;
}

export function MainApp() {
  const [currentRoute, setCurrentRoute] = useState<AppRoute>(() =>
    routeFromPath(window.location.pathname)
  );

  // App persistent state
  const [userProfile, setUserProfile] = useState<UserProfile>(() =>
    StorageService.getUserProfile()
  );
  const [activePlan, setActivePlan] = useState<FitnessPlan>(() =>
    StorageService.getActivePlan()
  );
  const [progressStats, setProgressStats] = useState<ProgressStats>(() =>
    StorageService.getProgressStats()
  );
  const [settings, setSettings] = useState<AppSettings>(() =>
    StorageService.getSettings()
  );
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() =>
    StorageService.getAuthState().isAuthenticated
  );

  // Sync with browser back/forward history
  useEffect(() => {
    const handlePopState = () => {
      setCurrentRoute(routeFromPath(window.location.pathname));
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (route: string) => {
    const validRoute = route as AppRoute;
    setCurrentRoute(validRoute);
    const targetPath = pathFromRoute(validRoute);
    if (window.location.pathname !== targetPath) {
      window.history.pushState(null, '', targetPath);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAuthSuccess = (name: string, email: string, isNewSignup: boolean) => {
    setIsAuthenticated(true);
    StorageService.setAuthState({
      isAuthenticated: true,
      userName: name,
      userEmail: email,
    });

    const updatedProfile = {
      ...userProfile,
      name,
      email,
    };
    setUserProfile(updatedProfile);
    StorageService.saveUserProfile(updatedProfile);

    if (isNewSignup) {
      navigateTo('onboarding');
    } else {
      navigateTo('dashboard');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    StorageService.setAuthState({
      isAuthenticated: false,
      userName: '',
      userEmail: '',
    });
    navigateTo('landing');
  };

  const handleFinishOnboarding = (updatedProfile: UserProfile) => {
    setUserProfile(updatedProfile);
    StorageService.saveUserProfile(updatedProfile);
    // After onboarding, navigate to AI generation
    navigateTo('generate-plan');
  };

  const handlePlanGenerated = (newPlan: FitnessPlan) => {
    setActivePlan(newPlan);
    StorageService.saveActivePlan(newPlan);
    navigateTo('fitness-plan');
  };

  const handleWorkoutComplete = (workoutId: string) => {
    const { plan, stats } = StorageService.markWorkoutComplete(workoutId);
    setActivePlan(plan);
    setProgressStats(stats);
  };

  const handleUpdateProfile = (updated: UserProfile) => {
    setUserProfile(updated);
    StorageService.saveUserProfile(updated);
  };

  const handleUpdateSettings = (newSettings: AppSettings) => {
    setSettings(newSettings);
    StorageService.saveSettings(newSettings);
  };

  const handleResetDemoData = () => {
    StorageService.resetToDemoDefaults();
    setUserProfile(StorageService.getUserProfile());
    setActivePlan(StorageService.getActivePlan());
    setProgressStats(StorageService.getProgressStats());
    setSettings(StorageService.getSettings());
  };

  // Determine layout structure
  const isPublicLayout =
    currentRoute === 'landing' ||
    currentRoute === 'login' ||
    currentRoute === 'signup' ||
    currentRoute === 'onboarding';

  return (
    <div className={`min-h-screen flex flex-col ${settings.darkMode ? 'dark bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'}`}>
      {isPublicLayout ? (
        // Public Flow: Top Navbar, Page Content, Footer
        <>
          <Navbar onNavigate={navigateTo} currentRoute={currentRoute} />

          <main className="flex-1">
            {currentRoute === 'landing' && <LandingView onNavigate={navigateTo} />}

            {currentRoute === 'login' && (
              <AuthView
                initialMode="login"
                onAuthSuccess={handleAuthSuccess}
                onNavigate={navigateTo}
              />
            )}

            {currentRoute === 'signup' && (
              <AuthView
                initialMode="signup"
                onAuthSuccess={handleAuthSuccess}
                onNavigate={navigateTo}
              />
            )}

            {currentRoute === 'onboarding' && (
              <OnboardingView
                initialProfile={userProfile}
                onFinishOnboarding={handleFinishOnboarding}
                onNavigate={navigateTo}
              />
            )}
          </main>

          <Footer onNavigate={navigateTo} />
        </>
      ) : (
        // Authenticated Dashboard Layout: Left Sidebar + Top Bar + Content Viewport + Footer
        <div className="flex-1 flex flex-col lg:flex-row min-h-screen">
          <Sidebar
            currentRoute={currentRoute}
            onNavigate={navigateTo}
            userProfile={userProfile}
            onLogout={handleLogout}
          />

          <div className="flex-1 flex flex-col min-w-0 pb-16 lg:pb-0">
            <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
              {currentRoute === 'dashboard' && (
                <DashboardView
                  userProfile={userProfile}
                  activePlan={activePlan}
                  progressStats={progressStats}
                  onNavigate={navigateTo}
                  onWorkoutComplete={handleWorkoutComplete}
                />
              )}

              {currentRoute === 'generate-plan' && (
                <GeneratePlanView
                  userProfile={userProfile}
                  onPlanGenerated={handlePlanGenerated}
                />
              )}

              {currentRoute === 'fitness-plan' && (
                <FitnessPlanView
                  plan={activePlan}
                  onNavigate={navigateTo}
                  onWorkoutComplete={handleWorkoutComplete}
                  onSavePlan={() => StorageService.saveActivePlan(activePlan)}
                />
              )}

              {currentRoute === 'progress' && (
                <ProgressView
                  progressStats={progressStats}
                  activePlan={activePlan}
                  onWorkoutComplete={handleWorkoutComplete}
                />
              )}

              {currentRoute === 'assistant' && <AssistantView />}

              {currentRoute === 'profile' && (
                <ProfileView
                  userProfile={userProfile}
                  onUpdateProfile={handleUpdateProfile}
                />
              )}

              {currentRoute === 'settings' && (
                <SettingsView
                  settings={settings}
                  userProfile={userProfile}
                  onUpdateSettings={handleUpdateSettings}
                  onNavigate={navigateTo}
                  onLogout={handleLogout}
                  onResetDemoData={handleResetDemoData}
                />
              )}
            </main>

            <Footer onNavigate={navigateTo} />
          </div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <MainApp />
    </ToastProvider>
  );
}
