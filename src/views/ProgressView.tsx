import React from 'react';
import {
  TrendingUp,
  CheckCircle2,
  Clock,
  Flame,
  Award,
  Zap,
  Timer,
  ShieldCheck,
  Calendar,
  Check,
  Dumbbell,
} from 'lucide-react';
import { ProgressStats, FitnessPlan } from '../types/fitness';
import { StatCard } from '../components/StatCard';
import { useToast } from '../components/Toast';

interface ProgressViewProps {
  progressStats: ProgressStats;
  activePlan: FitnessPlan;
  onWorkoutComplete: (workoutId: string) => void;
}

export const ProgressView: React.FC<ProgressViewProps> = ({
  progressStats,
  activePlan,
  onWorkoutComplete,
}) => {
  const { showToast } = useToast();

  // Weekly days data for bar/line visualization
  const weeklyDays = [
    { day: 'Mon', completed: true, mins: 30, target: 30 },
    { day: 'Tue', completed: true, mins: 25, target: 30 },
    { day: 'Wed', completed: true, mins: 15, target: 15, isRest: true },
    { day: 'Thu', completed: true, mins: 30, target: 30 },
    { day: 'Fri', completed: true, mins: 30, target: 30 },
    { day: 'Sat', completed: false, mins: 0, target: 30 },
    { day: 'Sun', completed: false, mins: 0, target: 15, isRest: true },
  ];

  const iconMap: Record<string, React.ElementType> = {
    Award,
    Flame,
    CheckCircle2,
    Zap,
    Timer,
    ShieldCheck,
  };

  const handleManualComplete = (workoutId: string) => {
    onWorkoutComplete(workoutId);
    showToast('Session logged! Progress chart updated 🎉', 'success');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Progress & Performance Tracking
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Monitor your training volume, consistency streak, and milestone achievements.
        </p>
      </div>

      {/* Top 4 Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Workouts Completed"
          value={`${progressStats.workoutsCompleted} sessions`}
          subtitle="All-time sessions logged"
          icon={CheckCircle2}
          iconColor="text-emerald-600"
        />

        <StatCard
          title="Total Workout Minutes"
          value={`${progressStats.totalWorkoutMinutes} min`}
          subtitle="Cumulative exercise time"
          icon={Clock}
          iconColor="text-indigo-600"
        />

        <StatCard
          title="Current Streak"
          value={`${progressStats.currentStreakDays} days`}
          subtitle="Consecutive active days"
          icon={Flame}
          iconColor="text-amber-500"
        />

        <StatCard
          title="Weekly Completion"
          value={`${progressStats.weeklyCompletionRate}%`}
          subtitle="5 of 7 target sessions"
          icon={TrendingUp}
          progressPercent={progressStats.weeklyCompletionRate}
          iconColor="text-emerald-600"
        />
      </div>

      {/* Weekly Workout Completion Chart */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">
              Weekly Volume & Completion Breakdown
            </h2>
            <p className="text-xs text-slate-500">
              Active minutes completed vs. scheduled session target
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-slate-500">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-emerald-500 inline-block" />
              <span>Completed</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-slate-200 inline-block" />
              <span>Upcoming / Rest</span>
            </div>
          </div>
        </div>

        {/* Visual Bar & Line Chart Container */}
        <div className="pt-4">
          <div className="grid grid-cols-7 gap-2 sm:gap-6 items-end h-48 pb-2 border-b border-slate-100">
            {weeklyDays.map((item, idx) => {
              const maxScale = 40; // 40 minutes max height scale
              const heightPercent = Math.min(100, Math.round((item.mins / maxScale) * 100));

              return (
                <div key={idx} className="flex flex-col items-center h-full justify-end group">
                  {/* Tooltip value */}
                  <span className="text-[11px] font-mono font-bold text-slate-700 opacity-0 group-hover:opacity-100 transition-opacity mb-1">
                    {item.mins}m
                  </span>

                  <div className="w-full max-w-[44px] bg-slate-100 rounded-t-xl overflow-hidden h-36 flex items-end">
                    <div
                      className={`w-full rounded-t-xl transition-all duration-500 ${
                        item.completed
                          ? 'bg-gradient-to-t from-emerald-600 to-emerald-400 group-hover:brightness-105'
                          : item.isRest
                          ? 'bg-slate-200'
                          : 'bg-slate-200 group-hover:bg-slate-300'
                      }`}
                      style={{ height: `${item.mins > 0 ? heightPercent : 6}%` }}
                    />
                  </div>

                  <span className="text-xs font-bold text-slate-700 mt-2">
                    {item.day}
                  </span>

                  <span className="text-[10px] text-slate-400 font-mono">
                    {item.completed ? 'Done' : item.isRest ? 'Rest' : 'Plan'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Grid: Recent Activity & Milestone Achievements */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Recent Activity Feed */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">
              Recent Activity Feed
            </h2>
            <span className="text-xs font-mono text-slate-500">
              {progressStats.recentActivity.length} logged
            </span>
          </div>

          <div className="space-y-3">
            {progressStats.recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
                    <Dumbbell className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">
                      {activity.workoutTitle}
                    </h3>
                    <p className="text-xs text-slate-500 font-mono mt-0.5">
                      {activity.date} · {activity.durationMinutes} min · {activity.estimatedCalories} kcal
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg shrink-0">
                  <Check className="w-3.5 h-3.5" />
                  <span>Completed</span>
                </div>
              </div>
            ))}
          </div>

          {/* Quick manual log prompt */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-dashed border-slate-300 text-center">
            <p className="text-xs text-slate-600 mb-2">
              Did a workout outside your scheduled plan today?
            </p>
            <button
              onClick={() => {
                const uncompleted = activePlan.weeklyWorkouts.find((w) => !w.completed);
                if (uncompleted) {
                  handleManualComplete(uncompleted.id);
                } else {
                  showToast('All weekly workouts are already completed! Fantastic job! 🎉', 'info');
                }
              }}
              className="px-4 py-2 text-xs font-semibold text-emerald-700 bg-white hover:bg-emerald-50 border border-emerald-300 rounded-xl transition-colors shadow-xs"
            >
              + Quick Mark Next Workout Complete
            </button>
          </div>
        </div>

        {/* Right Column: Achievement Badges */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">
              Milestone Achievements
            </h2>
            <span className="text-xs font-mono text-emerald-600 font-semibold">
              {progressStats.achievements.filter((a) => a.unlocked).length} / {progressStats.achievements.length} Unlocked
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {progressStats.achievements.map((ach) => {
              const Icon = iconMap[ach.iconName] || Award;
              return (
                <div
                  key={ach.id}
                  className={`p-4 rounded-2xl border transition-all ${
                    ach.unlocked
                      ? 'bg-white border-emerald-300 shadow-sm'
                      : 'bg-slate-50/70 border-slate-200 opacity-60'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                        ach.unlocked
                          ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/30'
                          : 'bg-slate-200 text-slate-500'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>

                    {ach.unlocked ? (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                        Unlocked
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono font-medium text-slate-500">
                        {ach.progressPercent}%
                      </span>
                    )}
                  </div>

                  <h3 className="text-sm font-bold text-slate-900">{ach.title}</h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    {ach.description}
                  </p>

                  {ach.unlockedAt && (
                    <div className="text-[10px] text-emerald-700 font-mono mt-2 font-medium">
                      Achieved: {ach.unlockedAt}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
