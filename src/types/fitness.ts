export type FitnessGoal =
  | 'general_fitness'
  | 'strength'
  | 'endurance'
  | 'flexibility'
  | 'weight_management';

export type FitnessLevel = 'beginner' | 'intermediate' | 'advanced';

export type WorkoutLocation = 'home' | 'gym' | 'outdoor';

export type EquipmentType = 'no_equipment' | 'basic_equipment' | 'full_gym';

export type WorkoutDuration = 15 | 30 | 45 | 60;

export type PreferredWorkoutType =
  | 'full_body'
  | 'upper_body'
  | 'lower_body'
  | 'cardio'
  | 'mixed';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  age: number;
  gender?: string;
  height: string; // e.g. "175 cm" or "5'9""
  weight: string; // e.g. "72 kg" or "158 lbs"
  fitnessLevel: FitnessLevel;
  fitnessGoal: FitnessGoal;
  workoutLocation: WorkoutLocation;
  equipment: EquipmentType;
  workoutDuration: WorkoutDuration;
  daysPerWeek: number;
  selectedDays: string[]; // e.g. ["Monday", "Tuesday", "Thursday", "Saturday", "Sunday"]
  preferredType: PreferredWorkoutType;
  additionalPreferences?: string;
  avatarUrl?: string;
}

export interface Exercise {
  id: string;
  name: string;
  category: 'strength' | 'cardio' | 'mobility' | 'core';
  sets: number;
  repsOrTime: string; // e.g. "12 reps" or "45 sec"
  rest: string; // e.g. "45 sec"
  targetMuscles: string;
  instructions?: string;
  equipmentRequired?: string;
  completed?: boolean;
}

export interface Workout {
  id: string;
  dayName: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  workoutTitle: string;
  workoutType: PreferredWorkoutType | 'Rest Day';
  durationMinutes: number;
  difficulty: FitnessLevel;
  estimatedCalories: number;
  exercises: Exercise[];
  isRestDay: boolean;
  completed: boolean;
  completedAt?: string;
  coachingTip?: string;
}

export interface FitnessPlan {
  id: string;
  title: string;
  summary: string;
  userProfileSummary: {
    goal: FitnessGoal;
    fitnessLevel: FitnessLevel;
    workoutDuration: WorkoutDuration;
    daysPerWeek: number;
    location: WorkoutLocation;
    equipment: EquipmentType;
  };
  weeklyWorkouts: Workout[];
  generatedAt: string;
  aiNotes: string;
  generationModel?: string;
}

export interface ActivityLogItem {
  id: string;
  workoutTitle: string;
  date: string;
  durationMinutes: number;
  exercisesCompleted: number;
  estimatedCalories: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  iconName: string;
  unlocked: boolean;
  unlockedAt?: string;
  progressPercent: number;
}

export interface ProgressStats {
  workoutsCompleted: number;
  totalWorkoutMinutes: number;
  currentStreakDays: number;
  weeklyCompletionRate: number; // 0 - 100
  recentActivity: ActivityLogItem[];
  achievements: Achievement[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  quickSuggestions?: string[];
}

export interface AppSettings {
  notifications: boolean;
  workoutReminders: boolean;
  reminderTime: string;
  darkMode: boolean;
  measurementUnits: 'metric' | 'imperial';
}
