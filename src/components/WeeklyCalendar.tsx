import React from 'react';
import { CheckCircle2, Clock, Dumbbell, Coffee, ChevronRight } from 'lucide-react';
import { Workout } from '../types/fitness';

interface WeeklyCalendarProps {
  workouts: Workout[];
  todayDayName?: string;
  onSelectWorkout: (workout: Workout) => void;
}

export const WeeklyCalendar: React.FC<WeeklyCalendarProps> = ({
  workouts,
  todayDayName = 'Friday', // Default Friday for demo context matching current mock date
  onSelectWorkout,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
      {workouts.map((workout) => {
        const isToday = workout.dayName === todayDayName;
        const isCompleted = workout.completed;
        const isRest = workout.isRestDay;

        // Visual status
        let statusLabel = 'Upcoming';
        let statusClass = 'text-slate-500';
        let borderClass = 'border-slate-200 hover:border-slate-300 bg-white';

        if (isCompleted) {
          statusLabel = 'Completed';
          statusClass = 'text-emerald-600 font-semibold';
          borderClass = 'border-emerald-200 bg-emerald-50/40 hover:border-emerald-300';
        } else if (isToday) {
          statusLabel = "Today's Session";
          statusClass = 'text-emerald-700 font-bold';
          borderClass = 'border-emerald-500 bg-white ring-2 ring-emerald-500/20 shadow-sm';
        } else if (isRest) {
          statusLabel = 'Rest & Recovery';
          statusClass = 'text-slate-500';
          borderClass = 'border-slate-200/60 bg-slate-50/80 hover:border-slate-300';
        }

        return (
          <div
            key={workout.id}
            onClick={() => onSelectWorkout(workout)}
            className={`p-4 rounded-xl border flex flex-col justify-between transition-all cursor-pointer group ${borderClass}`}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-900">
                  {workout.dayName}
                </span>
                {isCompleted ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : isRest ? (
                  <Coffee className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                ) : isToday ? (
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                ) : null}
              </div>

              <h4 className="text-sm font-semibold text-slate-900 line-clamp-1 group-hover:text-emerald-600 transition-colors">
                {workout.isRestDay ? 'Rest Day' : workout.workoutTitle}
              </h4>

              <div className="mt-2 text-xs text-slate-500 space-y-1">
                {!isRest && (
                  <div className="flex items-center gap-1.5 font-mono">
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span>{workout.durationMinutes} min</span>
                  </div>
                )}
                <div className="flex items-center gap-1.5 font-mono">
                  <Dumbbell className="w-3 h-3 text-slate-400" />
                  <span className="capitalize">{workout.isRestDay ? 'Mobility / Rest' : workout.workoutType.replace('_', ' ')}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className={`text-[11px] ${statusClass}`}>{statusLabel}</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
        );
      })}
    </div>
  );
};
