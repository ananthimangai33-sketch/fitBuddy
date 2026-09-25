import React, { useState } from 'react';
import {
  Sparkles,
  Target,
  Dumbbell,
  Clock,
  Calendar,
  Home,
  Building,
  Trees,
  CheckCircle2,
  Brain,
  Info,
} from 'lucide-react';
import {
  UserProfile,
  FitnessGoal,
  FitnessLevel,
  WorkoutLocation,
  EquipmentType,
  WorkoutDuration,
  PreferredWorkoutType,
} from '../types/fitness';
import { LoadingAnimation } from '../components/LoadingAnimation';
import { generateFitnessPlan } from '../services/geminiService';
import { useToast } from '../components/Toast';

interface GeneratePlanViewProps {
  userProfile: UserProfile;
  onPlanGenerated: (newPlan: any) => void;
}

export const GeneratePlanView: React.FC<GeneratePlanViewProps> = ({
  userProfile,
  onPlanGenerated,
}) => {
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  // Form State
  const [goal, setGoal] = useState<FitnessGoal>(userProfile.fitnessGoal || 'general_fitness');
  const [level, setLevel] = useState<FitnessLevel>(userProfile.fitnessLevel || 'beginner');
  const [location, setLocation] = useState<WorkoutLocation>(userProfile.workoutLocation || 'home');
  const [equipment, setEquipment] = useState<EquipmentType>(userProfile.equipment || 'no_equipment');
  const [duration, setDuration] = useState<WorkoutDuration>(userProfile.workoutDuration || 30);
  const [daysPerWeek, setDaysPerWeek] = useState<number>(userProfile.daysPerWeek || 5);
  const [preferredType, setPreferredType] = useState<PreferredWorkoutType>(
    userProfile.preferredType || 'full_body'
  );
  const [additionalPreferences, setAdditionalPreferences] = useState(
    userProfile.additionalPreferences || ''
  );

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const temporaryProfile: UserProfile = {
        ...userProfile,
        fitnessGoal: goal,
        fitnessLevel: level,
        workoutLocation: location,
        equipment: equipment,
        workoutDuration: duration,
        daysPerWeek: daysPerWeek,
        preferredType: preferredType,
        additionalPreferences: additionalPreferences,
      };

      const newPlan = await generateFitnessPlan(temporaryProfile);
      showToast('Your fitness plan has been generated successfully!', 'success');
      onPlanGenerated(newPlan);
    } catch (err) {
      console.error('Error generating plan:', err);
      showToast('Failed to generate plan. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="py-12 animate-in fade-in">
        <LoadingAnimation title="FitBuddy AI is creating your personalized plan..." />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-200">
      {/* Page Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 uppercase tracking-wider mb-1">
          <Brain className="w-4 h-4" />
          <span>Gemini Generative Engine</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          AI Fitness Plan Generator
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Customize your parameters and let Gemini AI synthesize a scientific, goal-specific weekly routine.
        </p>
      </div>

      <form onSubmit={handleGenerate} className="space-y-8 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-sm">
        {/* Field 1: Fitness Goal */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-3">
            Fitness Goal
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
            {[
              { id: 'general_fitness' as FitnessGoal, label: 'General Fitness' },
              { id: 'strength' as FitnessGoal, label: 'Strength' },
              { id: 'endurance' as FitnessGoal, label: 'Endurance' },
              { id: 'flexibility' as FitnessGoal, label: 'Flexibility' },
              { id: 'weight_management' as FitnessGoal, label: 'Weight Mgmt' },
            ].map((item) => (
              <button
                type="button"
                key={item.id}
                onClick={() => setGoal(item.id)}
                className={`py-3 px-2 text-xs font-semibold rounded-xl border text-center transition-all ${
                  goal === item.id
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm shadow-emerald-600/20'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Field 2: Fitness Level */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-3">
            Fitness Level
          </label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { id: 'beginner' as FitnessLevel, label: 'Beginner', desc: 'Focus on form & consistency' },
              { id: 'intermediate' as FitnessLevel, label: 'Intermediate', desc: 'Moderate resistance & volume' },
              { id: 'advanced' as FitnessLevel, label: 'Advanced', desc: 'High intensity & density' },
            ].map((item) => (
              <button
                type="button"
                key={item.id}
                onClick={() => setLevel(item.id)}
                className={`p-3.5 rounded-xl border text-left transition-all ${
                  level === item.id
                    ? 'bg-emerald-50/70 border-emerald-500 text-slate-900 ring-1 ring-emerald-500'
                    : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
                }`}
              >
                <div className="text-xs font-bold text-slate-900">{item.label}</div>
                <div className="text-[11px] text-slate-500 mt-0.5">{item.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Field 3 & 4: Location & Equipment */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Workout Location
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'home' as WorkoutLocation, label: 'Home', icon: Home },
                { id: 'gym' as WorkoutLocation, label: 'Gym', icon: Building },
                { id: 'outdoor' as WorkoutLocation, label: 'Outdoor', icon: Trees },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    type="button"
                    key={item.id}
                    onClick={() => setLocation(item.id)}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      location === item.id
                        ? 'bg-emerald-600 text-white border-emerald-600'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <Icon className="w-4 h-4 mx-auto mb-1" />
                    <span className="text-xs font-semibold block">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Equipment
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'no_equipment' as EquipmentType, label: 'No Equipment' },
                { id: 'basic_equipment' as EquipmentType, label: 'Basic' },
                { id: 'full_gym' as EquipmentType, label: 'Full Gym' },
              ].map((item) => (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => setEquipment(item.id)}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    equipment === item.id
                      ? 'bg-emerald-600 text-white border-emerald-600'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <span className="text-xs font-semibold block">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Field 5 & 6: Duration & Days per Week */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Workout Duration
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[15, 30, 45, 60].map((d) => (
                <button
                  type="button"
                  key={d}
                  onClick={() => setDuration(d as WorkoutDuration)}
                  className={`py-2.5 text-xs font-bold font-mono rounded-xl border transition-all ${
                    duration === d
                      ? 'bg-emerald-600 text-white border-emerald-600'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {d} min
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Days per Week
            </label>
            <div className="grid grid-cols-5 gap-2">
              {[2, 3, 4, 5, 6].map((days) => (
                <button
                  type="button"
                  key={days}
                  onClick={() => setDaysPerWeek(days)}
                  className={`py-2.5 text-xs font-bold font-mono rounded-xl border transition-all ${
                    daysPerWeek === days
                      ? 'bg-emerald-600 text-white border-emerald-600'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {days} days
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Field 7: Preferred Workout Type */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-3">
            Preferred Workout Focus
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
            {[
              { id: 'full_body' as PreferredWorkoutType, label: 'Full Body' },
              { id: 'upper_body' as PreferredWorkoutType, label: 'Upper Body' },
              { id: 'lower_body' as PreferredWorkoutType, label: 'Lower Body' },
              { id: 'cardio' as PreferredWorkoutType, label: 'Cardio' },
              { id: 'mixed' as PreferredWorkoutType, label: 'Mixed Hybrid' },
            ].map((item) => (
              <button
                type="button"
                key={item.id}
                onClick={() => setPreferredType(item.id)}
                className={`py-2.5 px-3 text-xs font-semibold rounded-xl border transition-all ${
                  preferredType === item.id
                    ? 'bg-emerald-600 text-white border-emerald-600'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Field 8: Additional Preferences */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
            Additional Preferences & Specific Constraints
          </label>
          <textarea
            value={additionalPreferences}
            onChange={(e) => setAdditionalPreferences(e.target.value)}
            rows={3}
            placeholder="e.g. Focus on low-impact knee-friendly movements, avoid jumping, include 5 minutes of core work at the end of each session..."
            className="w-full p-3.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-slate-900"
          />
        </div>

        {/* Submit Button */}
        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Info className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>AI automatically calculates warmups, rest intervals, and recovery days</span>
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto px-8 py-3.5 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 rounded-xl shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
          >
            <Sparkles className="w-4 h-4 text-emerald-200" />
            <span>Generate AI Fitness Plan</span>
          </button>
        </div>
      </form>
    </div>
  );
};
