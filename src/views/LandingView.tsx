import React from 'react';
import {
  Sparkles,
  ArrowRight,
  Brain,
  Target,
  Calendar,
  TrendingUp,
  MessageSquare,
  Clock,
  CheckCircle2,
  Dumbbell,
  ShieldCheck,
  Flame,
  Zap,
} from 'lucide-react';
import heroImage from '../assets/images/hero_fitness_athlete_1790321289356.jpg';
import featureEquipmentImage from '../assets/images/workout_strength_feature_1790321316541.jpg';

interface LandingViewProps {
  onNavigate: (route: string) => void;
}

export const LandingView: React.FC<LandingViewProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* =========================================================================
          HERO SECTION
          ========================================================================= */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28">
        {/* Subtle background ambient mesh */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-emerald-100/40 via-emerald-50/20 to-transparent blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Headline & Action */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
              {/* Quiet editorial text kicker */}
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-800 tracking-wide uppercase">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Next-Generation Adaptive Fitness</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1] text-balance">
                Your Personalized Fitness Plan, Powered by AI
              </h1>

              <p className="text-lg text-slate-600 leading-relaxed max-w-xl mx-auto lg:mx-0">
                FitBuddy uses Gemini AI to create personalized workout plans based on your fitness goals, experience level, available time, and preferences.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  onClick={() => onNavigate('onboarding')}
                  className="w-full sm:w-auto px-6 py-3.5 text-base font-semibold text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 rounded-xl shadow-lg shadow-emerald-600/25 transition-all flex items-center justify-center gap-2 group active:scale-[0.98]"
                >
                  <Sparkles className="w-5 h-5 text-emerald-200" />
                  <span>Create My Fitness Plan</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => {
                    const el = document.querySelector('#features');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full sm:w-auto px-6 py-3.5 text-base font-semibold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors"
                >
                  Explore Features
                </button>
              </div>

              {/* Adjacency Proof Line */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-500 font-mono">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Evidence-Based Splits</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Zero Equipment Ready</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>100% Free Demo Access</span>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual & Interactive Mockup Card */}
            <div className="lg:col-span-6 relative">
              <div className="relative mx-auto max-w-lg lg:max-w-none">
                {/* Floating pill badge 1: AI Plan Generated */}
                <div className="absolute -top-4 -left-4 z-20 bg-slate-900/95 text-white px-4 py-2.5 rounded-xl border border-slate-700 shadow-xl flex items-center gap-2.5 animate-in fade-in slide-in-from-left-4">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-400 font-medium">Gemini 3.8 Flash</div>
                    <div className="text-xs font-bold text-white">AI Plan Generated</div>
                  </div>
                </div>

                {/* Floating pill badge 2: 7 Day Workout */}
                <div className="absolute top-24 -right-4 z-20 bg-white text-slate-900 px-3.5 py-2 rounded-xl border border-slate-200 shadow-lg flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-emerald-600" />
                  <span className="text-xs font-bold">7-Day Workout Split</span>
                </div>

                {/* Floating pill badge 3: Progress 72% */}
                <div className="absolute -bottom-4 -left-2 z-20 bg-white text-slate-900 px-4 py-2.5 rounded-xl border border-slate-200 shadow-xl flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold font-mono text-xs">
                    72%
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">Weekly Progress: 72%</div>
                    <div className="text-[11px] text-slate-500">5 of 7 Sessions Done</div>
                  </div>
                </div>

                {/* Main Hero Card Container */}
                <div className="rounded-2xl bg-white border border-slate-200 shadow-2xl overflow-hidden">
                  {/* Photo Banner with Scrim */}
                  <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-slate-100">
                    <img
                      src={heroImage}
                      alt="Athlete stretching in bright modern gym"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent flex items-end p-5">
                      <div className="text-white">
                        <span className="text-[11px] font-semibold text-emerald-300 uppercase tracking-wider">
                          Active Routine
                        </span>
                        <h3 className="text-lg font-bold text-white">
                          Full Body Activation & Stamina
                        </h3>
                      </div>
                    </div>
                  </div>

                  {/* Dashboard Snapshot Stats */}
                  <div className="p-5 space-y-4">
                    <div className="grid grid-cols-3 gap-3 text-center">
                      <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                        <div className="text-[10px] text-slate-500 font-semibold uppercase">Completed</div>
                        <div className="text-base font-bold font-mono text-emerald-600 mt-0.5">5 / 7</div>
                      </div>
                      <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                        <div className="text-[10px] text-slate-500 font-semibold uppercase">Streak</div>
                        <div className="text-base font-bold font-mono text-slate-900 mt-0.5 flex items-center justify-center gap-1">
                          <Flame className="w-3.5 h-3.5 text-amber-500" />
                          <span>4 Days</span>
                        </div>
                      </div>
                      <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                        <div className="text-[10px] text-slate-500 font-semibold uppercase">Active Time</div>
                        <div className="text-base font-bold font-mono text-slate-900 mt-0.5">165 min</div>
                      </div>
                    </div>

                    {/* Today's Workout Row */}
                    <div className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-200/80 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0">
                          <Dumbbell className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-900">Today: Lower Body Power</div>
                          <div className="text-[11px] text-slate-500 font-mono">30 min · 4 exercises · 210 kcal</div>
                        </div>
                      </div>

                      <button
                        onClick={() => onNavigate('dashboard')}
                        className="px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors"
                      >
                        Start
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          FEATURES SECTION
          ========================================================================= */}
      <section id="features" className="py-20 bg-white border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
              Core Capabilities
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Engineered for Real Adherence and Results
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              Everything you need to turn vague fitness aspirations into an enjoyable, sustainable daily routine.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-emerald-300 transition-all hover:shadow-sm group">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <Brain className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                1. AI-Powered Fitness Plans
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Generate personalized workout plans using Gemini AI, structured with progressive overload and biomechanical safety in mind.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-emerald-300 transition-all hover:shadow-sm group">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                2. Goal-Based Planning
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Create plans according to your exact target: general fitness, strength hypertrophy, aerobic endurance, mobility, or weight management.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-emerald-300 transition-all hover:shadow-sm group">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <Calendar className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                3. Weekly Workout Schedule
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                View your entire week at a glance with clear day-by-day statuses, warmup instructions, exercise sets, reps, and scheduled recovery days.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-emerald-300 transition-all hover:shadow-sm group">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                4. Progress Tracking
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Track completed workouts, cumulative active minutes, current streaks, and unlock achievement milestones as you build consistency.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-emerald-300 transition-all hover:shadow-sm group">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <MessageSquare className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                5. AI Fitness Assistant
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Ask general fitness questions 24/7. Get instant tips on form cues, rest day protocols, exercise substitutions, and nutrition basics.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-emerald-300 transition-all hover:shadow-sm group">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                6. Flexible Workout Duration
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Generate plans according to your exact time availability: concise 15-minute high-density workouts up to 60-minute comprehensive strength splits.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          HOW IT WORKS (4 STEPS)
          ========================================================================= */}
      <section id="how-it-works" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
              Simple 4-Step Process
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              How FitBuddy Works
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              From zero to a personalized training roadmap in less than two minutes.
            </p>
          </div>

          {/* Steps: Horizontal on desktop, vertical on mobile */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            {/* Step 1 */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm relative">
              <div className="text-3xl font-extrabold font-mono text-emerald-600/30 mb-3">
                01
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1.5">
                Tell Us About You
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Enter your basic fitness information, experience level, height, weight, and available equipment.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm relative">
              <div className="text-3xl font-extrabold font-mono text-emerald-600/30 mb-3">
                02
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1.5">
                Choose Your Goal
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Select your desired fitness target, preferred session duration (15 to 60 min), and training days.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm relative">
              <div className="text-3xl font-extrabold font-mono text-emerald-600/30 mb-3">
                03
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1.5">
                AI Creates Your Plan
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Gemini AI generates a balanced 7-day schedule with sets, reps, rest intervals, and warmups.
              </p>
            </div>

            {/* Step 4 */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm relative">
              <div className="text-3xl font-extrabold font-mono text-emerald-600/30 mb-3">
                04
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1.5">
                Track Your Progress
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Complete daily workouts, run the inter-set timer, monitor weekly completion, and unlock badges.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={() => onNavigate('onboarding')}
              className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 rounded-xl shadow-md transition-all active:scale-[0.98]"
            >
              <span>Get Started with Step 1</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          ABOUT & SPORT SCIENCE HIGHLIGHT
          ========================================================================= */}
      <section id="about" className="py-20 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 relative">
              <div className="rounded-2xl overflow-hidden shadow-xl border border-slate-200 bg-slate-100">
                <img
                  src={featureEquipmentImage}
                  alt="Minimalist fitness equipment setup"
                  referrerPolicy="no-referrer"
                  className="w-full h-80 object-cover"
                />
              </div>
            </div>

            <div className="lg:col-span-7 space-y-5">
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
                About FitBuddy
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Designed to Prevent Burnout and Accelerate Consistency
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Most fitness apps throw rigid cookie-cutter PDFs at users or expect them to own thousands of dollars in gym equipment. FitBuddy was founded on one simple premise: training programs should adapt to your actual life constraints.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="font-bold text-slate-900 text-sm mb-1 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Safe Movement Progression</span>
                  </div>
                  <p className="text-xs text-slate-500">
                    Calculated rep ranges matching your joint capacity and baseline conditioning.
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="font-bold text-slate-900 text-sm mb-1 flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-emerald-600" />
                    <span>Instant AI Adaptability</span>
                  </div>
                  <p className="text-xs text-slate-500">
                    Regenerate your entire weekly plan whenever equipment or schedule changes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          BOTTOM CALL TO ACTION
          ========================================================================= */}
      <section className="py-16 bg-slate-900 text-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Ready to Generate Your Personalized Fitness Plan?
          </h2>
          <p className="text-slate-300 text-base max-w-xl mx-auto">
            Join Alex and thousands of lifters who stopped guessing their workouts and started training with purpose.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('onboarding')}
              className="w-full sm:w-auto px-8 py-3.5 text-base font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 active:bg-emerald-500 rounded-xl shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-5 h-5 text-slate-950" />
              <span>Start Free AI Plan</span>
            </button>
            <button
              onClick={() => onNavigate('login')}
              className="w-full sm:w-auto px-6 py-3.5 text-base font-semibold text-white bg-slate-800 hover:bg-slate-700 rounded-xl border border-slate-700 transition-colors"
            >
              Log In to Existing Plan
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
