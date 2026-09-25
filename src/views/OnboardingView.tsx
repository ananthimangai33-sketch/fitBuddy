import React, { useState } from 'react';
import {
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Check,
  CheckCircle2,
  Dumbbell,
  Target,
  Flame,
  Zap,
  Activity,
  Calendar,
  Clock,
  Home,
  Building,
  Trees,
} from 'lucide-react';
import {
  UserProfile,
  FitnessGoal,
  FitnessLevel,
  WorkoutLocation,
  EquipmentType,
  WorkoutDuration,
} from '../types/fitness';
import { useToast } from '../components/Toast';

interface OnboardingViewProps {
  initialProfile: UserProfile;
  onFinishOnboarding: (updatedProfile: UserProfile) => void;
  onNavigate: (route: string) => void;
}

export const OnboardingView: React.FC<OnboardingViewProps> = ({
  initialProfile,
  onFinishOnboarding,
  onNavigate,
}) => {
  const { showToast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 6;
  const [isCompletedState, setIsCompletedState] = useState(false);

  // Form State initialized with realistic defaults
  const [formData, setFormData] = useState<UserProfile>({
    ...initialProfile,
  });

  const updateField = <K extends keyof UserProfile>(field: K, value: UserProfile[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleDay = (day: string) => {
    setFormData((prev) => {
      const exists = prev.selectedDays.includes(day);
      const updated = exists
        ? prev.selectedDays.filter((d) => d !== day)
        : [...prev.selectedDays, day];
      return {
        ...prev,
        selectedDays: updated,
        daysPerWeek: updated.length,
      };
    });
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setIsCompletedState(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleGeneratePlan = () => {
    showToast('Profile saved! Generating your custom fitness plan...', 'success');
    onFinishOnboarding(formData);
  };

  const allDays = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  // If completed final summary screen
  if (isCompletedState) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 bg-slate-50">
        <div className="w-full max-w-xl bg-white rounded-3xl border border-slate-200/90 shadow-2xl p-8 sm:p-10 text-center animate-in fade-in zoom-in-95 duration-200">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-600 to-emerald-500 text-white flex items-center justify-center mx-auto mb-6 shadow-xl shadow-emerald-500/20">
            <CheckCircle2 className="w-8 h-8 text-white" />
          </div>

          <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">
            Profile Assessment Complete
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-1 mb-3">
            Your profile is ready!
          </h2>
          <p className="text-sm text-slate-600 max-w-md mx-auto mb-8">
            FitBuddy has calibrated your baseline data. We are ready to synthesize your personalized Gemini workout program.
          </p>

          {/* Quick Profile Summary Card */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left mb-8 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
            <div>
              <span className="text-slate-400 block font-medium">Goal</span>
              <span className="font-bold text-slate-900 capitalize">
                {formData.fitnessGoal.replace('_', ' ')}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block font-medium">Level</span>
              <span className="font-bold text-slate-900 capitalize">
                {formData.fitnessLevel}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block font-medium">Duration</span>
              <span className="font-bold text-slate-900 font-mono">
                {formData.workoutDuration} min/day
              </span>
            </div>
            <div>
              <span className="text-slate-400 block font-medium">Location</span>
              <span className="font-bold text-slate-900 capitalize">
                {formData.workoutLocation}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block font-medium">Equipment</span>
              <span className="font-bold text-slate-900 capitalize">
                {formData.equipment.replace('_', ' ')}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block font-medium">Schedule</span>
              <span className="font-bold text-emerald-600 font-mono">
                {formData.selectedDays.length} days/week
              </span>
            </div>
          </div>

          <button
            onClick={handleGeneratePlan}
            className="w-full py-4 px-6 text-base font-bold text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 rounded-2xl shadow-xl shadow-emerald-600/25 transition-all flex items-center justify-center gap-2 group active:scale-[0.98]"
          >
            <Sparkles className="w-5 h-5 text-emerald-200" />
            <span>Generate My Fitness Plan</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 bg-slate-50">
      <div className="w-full max-w-2xl bg-white rounded-3xl border border-slate-200/90 shadow-xl p-6 sm:p-10 animate-in fade-in duration-200">
        {/* Step Progress Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-2">
            <span className="uppercase tracking-wider">
              Step {currentStep} of {totalSteps}
            </span>
            <span className="font-mono text-emerald-600">
              {Math.round((currentStep / totalSteps) * 100)}% Completed
            </span>
          </div>

          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
            <div
              className="bg-emerald-500 h-full rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* =========================================================================
            STEP 1: Basic Information
            ========================================================================= */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                Step 1 – Basic Information
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Tell us a bit about your baseline physical metrics.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm"
                  placeholder="Your Name"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Age
                </label>
                <input
                  type="number"
                  value={formData.age}
                  onChange={(e) => updateField('age', Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm"
                  placeholder="28"
                  min={12}
                  max={100}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Gender (optional)
                </label>
                <input
                  type="text"
                  value={formData.gender || ''}
                  onChange={(e) => updateField('gender', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm"
                  placeholder="Female, Male, Non-binary..."
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Height
                </label>
                <input
                  type="text"
                  value={formData.height}
                  onChange={(e) => updateField('height', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm"
                  placeholder="175 cm"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Weight
                </label>
                <input
                  type="text"
                  value={formData.weight}
                  onChange={(e) => updateField('weight', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm"
                  placeholder="70 kg"
                />
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            STEP 2: Fitness Level
            ========================================================================= */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                Step 2 – Fitness Level
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Select the experience tier that best describes your current routine.
              </p>
            </div>

            <div className="space-y-3">
              {[
                {
                  id: 'beginner' as FitnessLevel,
                  title: 'Beginner',
                  desc: 'New to consistent exercise or returning after a long hiatus. Prioritize form, balance, and basic motor patterns.',
                },
                {
                  id: 'intermediate' as FitnessLevel,
                  title: 'Intermediate',
                  desc: 'Comfortable with foundational compound lifts and cardio. Ready for moderate training volume and progressive resistance.',
                },
                {
                  id: 'advanced' as FitnessLevel,
                  title: 'Advanced',
                  desc: 'Years of consistent structured training. High work capacity seeking optimized hypertrophy and metabolic splits.',
                },
              ].map((lvl) => {
                const isSelected = formData.fitnessLevel === lvl.id;
                return (
                  <div
                    key={lvl.id}
                    onClick={() => updateField('fitnessLevel', lvl.id)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-4 ${
                      isSelected
                        ? 'border-emerald-500 bg-emerald-50/50 shadow-sm'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 mt-0.5 rounded-full border flex items-center justify-center shrink-0 ${
                        isSelected
                          ? 'border-emerald-600 bg-emerald-600 text-white'
                          : 'border-slate-300'
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3 text-white" />}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{lvl.title}</h4>
                      <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{lvl.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* =========================================================================
            STEP 3: Fitness Goal
            ========================================================================= */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                Step 3 – Fitness Goal
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                What primary outcome do you want to target over the next 8–12 weeks?
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                {
                  id: 'general_fitness' as FitnessGoal,
                  title: 'General Fitness',
                  desc: 'All-around health, steady daily energy, and joint resilience.',
                  icon: Activity,
                },
                {
                  id: 'strength' as FitnessGoal,
                  title: 'Strength',
                  desc: 'Build functional muscle mass, power, and bone density.',
                  icon: Dumbbell,
                },
                {
                  id: 'endurance' as FitnessGoal,
                  title: 'Endurance',
                  desc: 'Enhance VO2 max, stamina, and cardiovascular efficiency.',
                  icon: Zap,
                },
                {
                  id: 'flexibility' as FitnessGoal,
                  title: 'Flexibility',
                  desc: 'Improve range of motion, postural stability, and mobility.',
                  icon: Target,
                },
                {
                  id: 'weight_management' as FitnessGoal,
                  title: 'Weight Management',
                  desc: 'High caloric density and metabolic conditioning.',
                  icon: Flame,
                },
              ].map((goal) => {
                const Icon = goal.icon;
                const isSelected = formData.fitnessGoal === goal.id;
                return (
                  <div
                    key={goal.id}
                    onClick={() => updateField('fitnessGoal', goal.id)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'border-emerald-500 bg-emerald-50/50 shadow-sm'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <Icon className={`w-5 h-5 ${isSelected ? 'text-emerald-600' : 'text-slate-400'}`} />
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                      </div>
                      <h4 className="text-sm font-bold text-slate-900">{goal.title}</h4>
                      <p className="text-xs text-slate-500 mt-1">{goal.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* =========================================================================
            STEP 4: Workout Preferences & Location
            ========================================================================= */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                Step 4 – Workout Preferences
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Where will you be working out, and what equipment do you have?
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Primary Location
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'home' as WorkoutLocation, title: 'Home', icon: Home },
                  { id: 'gym' as WorkoutLocation, title: 'Gym', icon: Building },
                  { id: 'outdoor' as WorkoutLocation, title: 'Outdoor', icon: Trees },
                ].map((loc) => {
                  const Icon = loc.icon;
                  const isSelected = formData.workoutLocation === loc.id;
                  return (
                    <div
                      key={loc.id}
                      onClick={() => updateField('workoutLocation', loc.id)}
                      className={`p-4 rounded-2xl border text-center transition-all cursor-pointer ${
                        isSelected
                          ? 'border-emerald-500 bg-emerald-50/50'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <Icon className={`w-5 h-5 mx-auto mb-1 ${isSelected ? 'text-emerald-600' : 'text-slate-400'}`} />
                      <span className="text-xs font-bold text-slate-900 block">{loc.title}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Equipment Available
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  {
                    id: 'no_equipment' as EquipmentType,
                    title: 'No Equipment',
                    desc: 'Pure bodyweight calisthenics only',
                  },
                  {
                    id: 'basic_equipment' as EquipmentType,
                    title: 'Basic Equipment',
                    desc: 'Dumbbells, resistance loop bands, mat',
                  },
                  {
                    id: 'full_gym' as EquipmentType,
                    title: 'Full Gym',
                    desc: 'Barbells, cables, racks, machines',
                  },
                ].map((eq) => {
                  const isSelected = formData.equipment === eq.id;
                  return (
                    <div
                      key={eq.id}
                      onClick={() => updateField('equipment', eq.id)}
                      className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'border-emerald-500 bg-emerald-50/50 shadow-sm'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <span className="text-xs font-bold text-slate-900 block">{eq.title}</span>
                      <span className="text-[11px] text-slate-500 mt-1 block">{eq.desc}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            STEP 5: Availability / Duration
            ========================================================================= */}
        {currentStep === 5 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                Step 5 – Session Availability
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                How much time can you realistically invest per workout session?
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { duration: 15 as WorkoutDuration, label: '15 minutes', desc: 'Micro circuits' },
                { duration: 30 as WorkoutDuration, label: '30 minutes', desc: 'The sweet spot' },
                { duration: 45 as WorkoutDuration, label: '45 minutes', desc: 'Thorough split' },
                { duration: 60 as WorkoutDuration, label: '60 minutes+', desc: 'Full volume' },
              ].map((opt) => {
                const isSelected = formData.workoutDuration === opt.duration;
                return (
                  <div
                    key={opt.duration}
                    onClick={() => updateField('workoutDuration', opt.duration)}
                    className={`p-4 rounded-2xl border text-center transition-all cursor-pointer ${
                      isSelected
                        ? 'border-emerald-500 bg-emerald-50/50 shadow-sm'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <Clock className={`w-5 h-5 mx-auto mb-2 ${isSelected ? 'text-emerald-600' : 'text-slate-400'}`} />
                    <span className="text-sm font-bold text-slate-900 block font-mono">
                      {opt.label}
                    </span>
                    <span className="text-[11px] text-slate-500 block mt-0.5">{opt.desc}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* =========================================================================
            STEP 6: Weekly Availability / Days
            ========================================================================= */}
        {currentStep === 6 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                Step 6 – Weekly Workout Days
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Select which days of the week you plan to train ({formData.selectedDays.length} days selected).
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {allDays.map((day) => {
                const isSelected = formData.selectedDays.includes(day);
                return (
                  <button
                    key={day}
                    type="button"
                    onClick={() => toggleDay(day)}
                    className={`p-3.5 rounded-xl border text-sm font-semibold transition-all flex items-center justify-between ${
                      isSelected
                        ? 'border-emerald-500 bg-emerald-600 text-white shadow-sm'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <span>{day}</span>
                    {isSelected && <Check className="w-4 h-4 text-white" />}
                  </button>
                );
              })}
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600">
              💡 <span className="font-semibold">Recommendation:</span> For {formData.fitnessLevel} lifters aiming for {formData.fitnessGoal.replace('_', ' ')}, 4–5 training days with 2–3 active recovery days provides optimal muscle protein synthesis.
            </div>
          </div>
        )}

        {/* Navigation Controls */}
        <div className="mt-10 pt-6 border-t border-slate-100 flex items-center justify-between">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={handleBack}
              className="px-4 py-2.5 text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => onNavigate('landing')}
              className="px-4 py-2.5 text-sm font-semibold text-slate-400 hover:text-slate-600 transition-colors"
            >
              Cancel
            </button>
          )}

          <button
            type="button"
            onClick={handleNext}
            className="px-6 py-2.5 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 rounded-xl shadow-md shadow-emerald-600/20 transition-all flex items-center gap-2 active:scale-[0.98]"
          >
            <span>{currentStep === totalSteps ? 'Finish & Review' : 'Continue'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
