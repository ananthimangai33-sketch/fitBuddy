import React, { useState } from 'react';
import {
  TrendingUp,
  CheckCircle2,
  Flame,
  Clock,
  Play,
  Eye,
  Sparkles,
  Calendar,
  Dumbbell,
  ArrowRight,
  ShieldCheck,
  Check,
} from 'lucide-react';
import { UserProfile, FitnessPlan, ProgressStats, Workout } from '../types/fitness';
import { StatCard } from '../components/StatCard';
import { WeeklyCalendar } from '../components/WeeklyCalendar';
import { WorkoutModal } from '../components/WorkoutModal';
import { useToast } from '../components/Toast';

interface DashboardViewProps {
  userProfile: UserProfile;
  activePlan: FitnessPlan;
  progressStats: ProgressStats;
  onNavigate: (route: string) => void;
  onWorkoutComplete: (workoutId: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  userProfile,
  activePlan,
  progressStats,
  onNavigate,
  onWorkoutComplete,
}) => {
  const { showToast } = useToast();
  const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalActiveMode, setModalActiveMode] = useState(false);

  // Today's workout: Find Friday (demo context) or next uncompleted session
  const todaysWorkout =
    activePlan.weeklyWorkouts.find((w) => w.dayName === 'Friday') ||
    activePlan.weeklyWorkouts.find((w) => !w.completed && !w.isRestDay) ||
    activePlan.weeklyWorkouts[0];

  const handleStartWorkout = (workout: Workout) => {
    setSelectedWorkout(workout);
    setModalActiveMode(true);
    setIsModalOpen(true);
  };

  const handleViewDetails = (workout: Workout) => {
    setSelectedWorkout(workout);
    setModalActiveMode(false);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Good morning, {userProfile.name} 👋
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Ready for today's workout? Keep your 4-day momentum burning!
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('assistant')}
            className="px-4 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-colors shadow-sm flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Ask AI Coach</span>
          </button>

          <button
            onClick={() => onNavigate('generate-plan')}
            className="px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 rounded-xl shadow-sm shadow-emerald-600/20 transition-all flex items-center gap-1.5 active:scale-[0.98]"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Generate New Plan</span>
          </button>
        </div>
      </div>

      {/* Top statistics cards:
          - Weekly Progress: 72%
          - Workouts Completed: 5/7
          - Workout Streak: 4 days
          - Total Workout Time: 165 min */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Weekly Progress"
          value={`${progressStats.weeklyCompletionRate}%`}
          subtitle="Target: 5 of 7 days logged"
          icon={TrendingUp}
          progressPercent={progressStats.weeklyCompletionRate}
          iconColor="text-emerald-600"
        />

        <StatCard
          title="Workouts Completed"
          value={`${progressStats.workoutsCompleted} / 7`}
          subtitle="On track for weekly goal"
          icon={CheckCircle2}
          iconColor="text-emerald-600"
        />

        <StatCard
          title="Workout Streak"
          value={`${progressStats.currentStreakDays} days`}
          subtitle="Personal best this month!"
          icon={Flame}
          iconColor="text-amber-500"
        />

        <StatCard
          title="Total Workout Time"
          value={`${progressStats.totalWorkoutMinutes} min`}
          subtitle="Approx. 880 kcal burned"
          icon={Clock}
          iconColor="text-indigo-600"
        />
      </div>

      {/* Prominent "Today's Workout" card */}
      <div className="rounded-2xl bg-white border border-slate-200/90 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 uppercase tracking-wider mb-1">
              <span>Today's Scheduled Session</span>
              <span>·</span>
              <span>{todaysWorkout.dayName}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
              <span>{todaysWorkout.workoutTitle}</span>
              {todaysWorkout.completed && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-medium">
                  Completed Today
                </span>
              )}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleViewDetails(todaysWorkout)}
              className="px-4 py-2.5 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors flex items-center gap-1.5"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>View Details</span>
            </button>

            <button
              onClick={() => handleStartWorkout(todaysWorkout)}
              className="px-5 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 rounded-xl shadow-sm shadow-emerald-600/20 transition-all flex items-center gap-1.5 active:scale-[0.98]"
            >
              <Play className="w-3.5 h-3.5" />
              <span>{todaysWorkout.completed ? 'Review / Repeat' : 'Start Workout'}</span>
            </button>
          </div>
        </div>

        {/* Workout Metadata Bar */}
        <div className="px-6 py-3 bg-slate-50/80 border-b border-slate-100 flex flex-wrap items-center gap-6 text-xs text-slate-600 font-mono">
          <div>
            <span className="text-slate-400">Duration: </span>
            <span className="font-bold text-slate-800">{todaysWorkout.durationMinutes} min</span>
          </div>
          <div>
            <span className="text-slate-400">Level: </span>
            <span className="font-bold text-slate-800 capitalize">{todaysWorkout.difficulty}</span>
          </div>
          <div>
            <span className="text-slate-400">Exercises: </span>
            <span className="font-bold text-slate-800">{todaysWorkout.exercises.length}</span>
          </div>
          <div>
            <span className="text-slate-400">Burn Est: </span>
            <span className="font-bold text-emerald-700">{todaysWorkout.estimatedCalories} kcal</span>
          </div>
        </div>

        {/* Exercise List */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {todaysWorkout.exercises.map((exercise, idx) => (
              <div
                key={exercise.id}
                onClick={() => handleViewDetails(todaysWorkout)}
                className="p-3.5 rounded-xl border border-slate-200/80 hover:border-emerald-300 hover:bg-emerald-50/20 transition-all cursor-pointer flex items-start gap-3 group"
              >
                <div className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 font-bold font-mono text-xs flex items-center justify-center shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                  {idx + 1}
                </div>

                <div className="min-w-0 flex-1">
                  <h4 className="text-xs font-bold text-slate-900 truncate group-hover:text-emerald-700 transition-colors">
                    {exercise.name}
                  </h4>
                  <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-500 font-mono">
                    <span>{exercise.sets} sets</span>
                    <span>×</span>
                    <span>{exercise.repsOrTime}</span>
                    <span>·</span>
                    <span>Rest: {exercise.rest}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Weekly Plan Calendar Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900 tracking-tight">
              Weekly Workout Schedule
            </h3>
            <p className="text-xs text-slate-500">
              Personalized 7-day split generated with Gemini AI
            </p>
          </div>

          <button
            onClick={() => onNavigate('fitness-plan')}
            className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 group"
          >
            <span>View Full Plan Details</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        <WeeklyCalendar
          workouts={activePlan.weeklyWorkouts}
          todayDayName="Friday"
          onSelectWorkout={(workout) => handleViewDetails(workout)}
        />
      </div>

      {/* AI Motivation & Coaching Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 text-white border border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">AI Coach Insights for Alex</h4>
            <p className="text-xs text-slate-300 mt-0.5 leading-relaxed max-w-xl">
              “You have completed 5 consecutive workouts this cycle! Tomorrow is a metabolic circuit. Be sure to drink 500ml water and get 8 hours of restorative sleep tonight.”
            </p>
          </div>
        </div>

        <button
          onClick={() => onNavigate('assistant')}
          className="self-start sm:self-center shrink-0 px-4 py-2 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-colors"
        >
          Chat with Coach
        </button>
      </div>

      {/* Interactive Workout Modal */}
      <WorkoutModal
        isOpen={isModalOpen}
        workout={selectedWorkout}
        onClose={() => setIsModalOpen(false)}
        onWorkoutComplete={onWorkoutComplete}
        initialActiveMode={modalActiveMode}
      />
    </div>
  );
};
