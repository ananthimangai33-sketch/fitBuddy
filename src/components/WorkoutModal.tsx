import React, { useState, useEffect } from 'react';
import {
  X,
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  Clock,
  Flame,
  Dumbbell,
  Target,
  Sparkles,
  Info,
} from 'lucide-react';
import { Workout, Exercise } from '../types/fitness';
import { useToast } from './Toast';

interface WorkoutModalProps {
  workout: Workout | null;
  isOpen: boolean;
  onClose: () => void;
  onWorkoutComplete: (workoutId: string) => void;
  initialActiveMode?: boolean;
}

export const WorkoutModal: React.FC<WorkoutModalProps> = ({
  workout,
  isOpen,
  onClose,
  onWorkoutComplete,
  initialActiveMode = false,
}) => {
  const { showToast } = useToast();
  const [isActiveMode, setIsActiveMode] = useState(initialActiveMode);
  const [completedExerciseIds, setCompletedExerciseIds] = useState<string[]>([]);
  const [activeExerciseIndex, setActiveExerciseIndex] = useState(0);

  // Rest Timer State
  const [restSecondsLeft, setRestSecondsLeft] = useState<number>(45);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [initialTimerDuration, setInitialTimerDuration] = useState<number>(45);

  useEffect(() => {
    setIsActiveMode(initialActiveMode);
    if (workout) {
      // Initialize completed exercises if already done
      const alreadyDone = workout.exercises.filter((e) => e.completed).map((e) => e.id);
      setCompletedExerciseIds(alreadyDone);
      setActiveExerciseIndex(0);
    }
  }, [workout, initialActiveMode]);

  // Timer countdown hook
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerRunning && restSecondsLeft > 0) {
      interval = setInterval(() => {
        setRestSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (restSecondsLeft === 0 && isTimerRunning) {
      setIsTimerRunning(false);
      showToast('Rest interval finished! Ready for the next set 💪', 'info');
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, restSecondsLeft, showToast]);

  if (!isOpen || !workout) return null;

  const toggleExerciseComplete = (exerciseId: string) => {
    setCompletedExerciseIds((prev) => {
      const exists = prev.includes(exerciseId);
      if (exists) {
        return prev.filter((id) => id !== exerciseId);
      } else {
        // Start rest timer when completing an exercise
        setRestSecondsLeft(45);
        setIsTimerRunning(true);
        return [...prev, exerciseId];
      }
    });
  };

  const handleCompleteFullWorkout = () => {
    onWorkoutComplete(workout.id);
    showToast('Workout completed! Great job! 🎉', 'success');
    onClose();
  };

  const currentExercise = workout.exercises[activeExerciseIndex] || workout.exercises[0];
  const allExercisesCompleted =
    workout.exercises.length > 0 &&
    workout.exercises.every((ex) => completedExerciseIds.includes(ex.id));

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-slate-900 to-slate-800 text-white flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1">
              <span>{workout.dayName}</span>
              <span>·</span>
              <span>{workout.durationMinutes} min</span>
              <span>·</span>
              <span>{workout.difficulty}</span>
            </div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <span>{workout.workoutTitle}</span>
              {workout.completed && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Completed
                </span>
              )}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-700/50 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 max-h-[75vh] overflow-y-auto space-y-6">
          {/* Workout Metadata Bar */}
          <div className="grid grid-cols-3 gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-center">
            <div>
              <div className="text-[11px] text-slate-500 font-medium">Duration</div>
              <div className="text-base font-bold text-slate-900 flex items-center justify-center gap-1 mt-0.5">
                <Clock className="w-4 h-4 text-emerald-600" />
                <span className="font-mono tabular-nums">{workout.durationMinutes}m</span>
              </div>
            </div>
            <div>
              <div className="text-[11px] text-slate-500 font-medium">Est. Calories</div>
              <div className="text-base font-bold text-slate-900 flex items-center justify-center gap-1 mt-0.5">
                <Flame className="w-4 h-4 text-amber-500" />
                <span className="font-mono tabular-nums">{workout.estimatedCalories} kcal</span>
              </div>
            </div>
            <div>
              <div className="text-[11px] text-slate-500 font-medium">Exercises</div>
              <div className="text-base font-bold text-slate-900 flex items-center justify-center gap-1 mt-0.5">
                <Dumbbell className="w-4 h-4 text-emerald-600" />
                <span className="font-mono tabular-nums">{workout.exercises.length}</span>
              </div>
            </div>
          </div>

          {/* AI Coaching Tip */}
          {workout.coachingTip && (
            <div className="p-3.5 rounded-xl bg-emerald-50/80 border border-emerald-200 flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-emerald-950 uppercase tracking-wider">
                  AI Coach Insight
                </h4>
                <p className="text-xs text-emerald-900 mt-0.5 leading-relaxed">
                  {workout.coachingTip}
                </p>
              </div>
            </div>
          )}

          {/* Active Workout Interactive Rest Timer */}
          {isActiveMode && (
            <div className="p-4 rounded-xl bg-slate-900 text-white border border-slate-800 flex items-center justify-between">
              <div>
                <div className="text-xs font-medium text-slate-400">Inter-Set Rest Timer</div>
                <div className="text-2xl font-bold font-mono tabular-nums text-emerald-400 mt-0.5">
                  00:{restSecondsLeft < 10 ? `0${restSecondsLeft}` : restSecondsLeft}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsTimerRunning(!isTimerRunning)}
                  className="px-3 py-1.5 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg flex items-center gap-1.5 transition-colors"
                >
                  {isTimerRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  <span>{isTimerRunning ? 'Pause' : 'Start'}</span>
                </button>
                <button
                  onClick={() => {
                    setIsTimerRunning(false);
                    setRestSecondsLeft(45);
                  }}
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                  aria-label="Reset timer"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Exercises Checklist */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-bold text-slate-900">
                Exercise Breakdown ({completedExerciseIds.length}/{workout.exercises.length} checked)
              </h4>
              {!isActiveMode && (
                <button
                  onClick={() => setIsActiveMode(true)}
                  className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>Start Live Workout</span>
                </button>
              )}
            </div>

            <div className="space-y-3">
              {workout.exercises.map((ex, idx) => {
                const isCompleted = completedExerciseIds.includes(ex.id);
                const isSelected = activeExerciseIndex === idx;

                return (
                  <div
                    key={ex.id}
                    onClick={() => setActiveExerciseIndex(idx)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'border-emerald-500 bg-emerald-50/30 shadow-sm'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleExerciseComplete(ex.id);
                          }}
                          className={`w-6 h-6 mt-0.5 rounded-lg border flex items-center justify-center transition-all ${
                            isCompleted
                              ? 'bg-emerald-600 border-emerald-600 text-white'
                              : 'border-slate-300 hover:border-emerald-500 text-transparent'
                          }`}
                          aria-label={`Mark ${ex.name} as complete`}
                        >
                          <CheckCircle2 className="w-4 h-4" />
                        </button>

                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold text-slate-400 font-mono">
                              {idx + 1}.
                            </span>
                            <span
                              className={`text-sm font-bold ${
                                isCompleted ? 'line-through text-slate-400' : 'text-slate-900'
                              }`}
                            >
                              {ex.name}
                            </span>
                          </div>

                          <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-slate-500 font-mono">
                            <span className="font-semibold text-slate-700">{ex.sets} sets</span>
                            <span>×</span>
                            <span>{ex.repsOrTime}</span>
                            <span>·</span>
                            <span>Rest: {ex.rest}</span>
                          </div>
                        </div>
                      </div>

                      <span className="text-[11px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                        {ex.targetMuscles.split(',')[0]}
                      </span>
                    </div>

                    {/* Detailed Instruction Drawer for selected exercise */}
                    {isSelected && ex.instructions && (
                      <div className="mt-3 pt-3 border-t border-slate-100 text-xs text-slate-600 space-y-1 animate-in fade-in">
                        <div className="flex items-center gap-1.5 font-semibold text-slate-700">
                          <Target className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Muscles: {ex.targetMuscles}</span>
                        </div>
                        <p className="leading-relaxed text-slate-600">
                          {ex.instructions}
                        </p>
                        {ex.equipmentRequired && (
                          <div className="text-[11px] text-slate-500 font-medium">
                            Equipment: {ex.equipmentRequired}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2.5 text-sm font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-200/60 rounded-xl transition-colors"
          >
            Close
          </button>

          <div className="flex items-center gap-2">
            {!workout.completed && (
              <button
                onClick={handleCompleteFullWorkout}
                className="px-5 py-2.5 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 rounded-xl shadow-sm shadow-emerald-600/20 transition-all flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Mark Full Workout Complete</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
