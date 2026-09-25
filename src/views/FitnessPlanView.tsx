import React, { useState } from 'react';
import {
  Sparkles,
  Calendar,
  CheckCircle2,
  Play,
  RotateCcw,
  BookmarkCheck,
  Clock,
  Flame,
  Dumbbell,
  Target,
  ShieldAlert,
  ArrowRight,
} from 'lucide-react';
import { FitnessPlan, Workout } from '../types/fitness';
import { WorkoutModal } from '../components/WorkoutModal';
import { useToast } from '../components/Toast';

interface FitnessPlanViewProps {
  plan: FitnessPlan;
  onNavigate: (route: string) => void;
  onWorkoutComplete: (workoutId: string) => void;
  onSavePlan?: () => void;
}

export const FitnessPlanView: React.FC<FitnessPlanViewProps> = ({
  plan,
  onNavigate,
  onWorkoutComplete,
  onSavePlan,
}) => {
  const { showToast } = useToast();
  const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalActiveMode, setModalActiveMode] = useState(false);

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

  const handleQuickMarkComplete = (workoutId: string) => {
    onWorkoutComplete(workoutId);
    showToast('Workout marked as complete! Great job! 🎉', 'success');
  };

  const handleSavePlan = () => {
    if (onSavePlan) {
      onSavePlan();
    }
    showToast('Fitness plan saved to your active profile!', 'success');
  };

  const completedCount = plan.weeklyWorkouts.filter((w) => w.completed).length;

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header & Action Toolbar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4" />
            <span>AI Generated Workout Routine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Your Personalized Fitness Plan
          </h1>
          <p className="text-sm text-slate-500 mt-1 max-w-2xl">
            {plan.summary}
          </p>
        </div>

        {/* Buttons: Mark as Complete / Start Workout / Regenerate Plan / Save Plan */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => onNavigate('generate-plan')}
            className="px-3.5 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-colors shadow-sm flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
            <span>Regenerate Plan</span>
          </button>

          <button
            onClick={handleSavePlan}
            className="px-3.5 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-colors shadow-sm flex items-center gap-1.5"
          >
            <BookmarkCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Save Plan</span>
          </button>

          <button
            onClick={() => {
              const nextWorkout =
                plan.weeklyWorkouts.find((w) => !w.completed && !w.isRestDay) ||
                plan.weeklyWorkouts[0];
              handleStartWorkout(nextWorkout);
            }}
            className="px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 rounded-xl shadow-sm shadow-emerald-600/20 transition-all flex items-center gap-1.5 active:scale-[0.98]"
          >
            <Play className="w-3.5 h-3.5" />
            <span>Start Next Workout</span>
          </button>
        </div>
      </div>

      {/* AI Summary Banner */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
          Plan Parameters Summary
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 text-xs">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-slate-400 block font-medium">Goal</span>
            <span className="text-sm font-bold text-slate-900 capitalize block mt-0.5">
              {plan.userProfileSummary.goal.replace('_', ' ')}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-slate-400 block font-medium">Level</span>
            <span className="text-sm font-bold text-slate-900 capitalize block mt-0.5">
              {plan.userProfileSummary.fitnessLevel}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-slate-400 block font-medium">Duration</span>
            <span className="text-sm font-bold text-slate-900 font-mono block mt-0.5">
              {plan.userProfileSummary.workoutDuration} min / day
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-slate-400 block font-medium">Days / Week</span>
            <span className="text-sm font-bold text-slate-900 font-mono block mt-0.5">
              {plan.userProfileSummary.daysPerWeek} days
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-slate-400 block font-medium">Location</span>
            <span className="text-sm font-bold text-slate-900 capitalize block mt-0.5">
              {plan.userProfileSummary.location}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-slate-400 block font-medium">Equipment</span>
            <span className="text-sm font-bold text-slate-900 capitalize block mt-0.5">
              {plan.userProfileSummary.equipment.replace('_', ' ')}
            </span>
          </div>
        </div>

        {plan.aiNotes && (
          <div className="mt-4 pt-4 border-t border-slate-100 flex items-start gap-2.5 text-xs text-slate-600">
            <Sparkles className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <span className="font-semibold text-slate-800">Gemini Coach Note: </span>
              {plan.aiNotes}
            </p>
          </div>
        )}
      </div>

      {/* 7 Weekly Workout Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900 tracking-tight">
            Weekly Workout Cards ({completedCount} of {plan.weeklyWorkouts.length} Completed)
          </h2>
        </div>

        <div className="space-y-4">
          {plan.weeklyWorkouts.map((workout) => (
            <div
              key={workout.id}
              className={`rounded-2xl border transition-all overflow-hidden ${
                workout.completed
                  ? 'bg-emerald-50/20 border-emerald-200'
                  : workout.isRestDay
                  ? 'bg-slate-50/60 border-slate-200'
                  : 'bg-white border-slate-200/90 shadow-sm hover:border-slate-300'
              }`}
            >
              {/* Workout Header Bar */}
              <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                      workout.completed
                        ? 'bg-emerald-600 text-white'
                        : workout.isRestDay
                        ? 'bg-slate-200 text-slate-600'
                        : 'bg-slate-900 text-white'
                    }`}
                  >
                    {workout.dayName.slice(0, 3)}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                        {workout.dayName}
                      </span>
                      <span>·</span>
                      <span className="text-xs text-slate-500 font-mono capitalize">
                        {workout.workoutType.replace('_', ' ')}
                      </span>
                      {workout.completed && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                          Completed
                        </span>
                      )}
                    </div>
                    <h3 className="text-base font-bold text-slate-900 mt-0.5">
                      {workout.workoutTitle}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs font-mono text-slate-600">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{workout.durationMinutes} min</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5 text-amber-500" />
                    <span>{workout.estimatedCalories} kcal</span>
                  </div>

                  <div className="flex items-center gap-2 ml-2">
                    {!workout.completed && (
                      <button
                        onClick={() => handleQuickMarkComplete(workout.id)}
                        className="px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-emerald-700 hover:bg-emerald-50 border border-slate-200 rounded-lg transition-colors flex items-center gap-1"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="hidden sm:inline">Mark as Complete</span>
                      </button>
                    )}

                    <button
                      onClick={() => handleStartWorkout(workout)}
                      className="px-3.5 py-1.5 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-1.5"
                    >
                      <Play className="w-3 h-3 text-emerald-400" />
                      <span>{workout.completed ? 'Review' : 'Start'}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Exercises Grid */}
              <div className="p-5">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {workout.exercises.map((ex, idx) => (
                    <div
                      key={ex.id}
                      onClick={() => handleViewDetails(workout)}
                      className="p-3 rounded-xl bg-slate-50/70 border border-slate-100 hover:border-slate-200 hover:bg-white transition-all cursor-pointer"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-xs font-bold text-slate-900">
                          {idx + 1}. {ex.name}
                        </span>
                        <span className="text-[10px] text-slate-500 bg-white px-1.5 py-0.5 rounded border border-slate-100">
                          {ex.targetMuscles.split(',')[0]}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 mt-1.5 text-xs text-slate-600 font-mono">
                        <span className="font-semibold text-slate-800">{ex.sets} sets</span>
                        <span>×</span>
                        <span>{ex.repsOrTime}</span>
                        {ex.rest && (
                          <>
                            <span>·</span>
                            <span className="text-slate-500">Rest: {ex.rest}</span>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Safety / Medical Disclaimer Box */}
      <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200/80 text-xs text-amber-900 flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <span className="font-bold">Medical Disclaimer:</span> FitBuddy provides general fitness guidance generated with AI. Fitness plans may not be suitable for everyone. Consult a qualified healthcare or fitness professional for personalized advice, especially if you have medical conditions or injuries.
        </p>
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
