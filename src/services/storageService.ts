import {
  UserProfile,
  FitnessPlan,
  ProgressStats,
  AppSettings,
  ChatMessage,
  Workout,
} from '../types/fitness';
import {
  DEFAULT_USER_PROFILE,
  DEFAULT_FITNESS_PLAN,
  DEFAULT_PROGRESS_STATS,
  DEFAULT_SETTINGS,
} from '../data/mockFitnessData';

const STORAGE_KEYS = {
  PROFILE: 'fitbuddy_user_profile',
  PLAN: 'fitbuddy_active_plan',
  PROGRESS: 'fitbuddy_progress_stats',
  SETTINGS: 'fitbuddy_app_settings',
  CHAT: 'fitbuddy_chat_history',
  AUTH: 'fitbuddy_auth_state',
};

export interface AuthState {
  isAuthenticated: boolean;
  userEmail: string;
  userName: string;
}

export const StorageService = {
  // Authentication
  getAuthState(): AuthState {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.AUTH);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.warn('Storage read error:', e);
    }
    return {
      isAuthenticated: true, // Defaults to authenticated for smooth demo experience
      userEmail: DEFAULT_USER_PROFILE.email,
      userName: DEFAULT_USER_PROFILE.name,
    };
  },

  setAuthState(state: AuthState): void {
    try {
      localStorage.setItem(STORAGE_KEYS.AUTH, JSON.stringify(state));
    } catch (e) {
      console.error('Storage write error:', e);
    }
  },

  // User Profile
  getUserProfile(): UserProfile {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PROFILE);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.warn('Storage read error:', e);
    }
    return DEFAULT_USER_PROFILE;
  },

  saveUserProfile(profile: UserProfile): void {
    try {
      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
    } catch (e) {
      console.error('Storage write error:', e);
    }
  },

  // Fitness Plan
  getActivePlan(): FitnessPlan {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PLAN);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.warn('Storage read error:', e);
    }
    return DEFAULT_FITNESS_PLAN;
  },

  saveActivePlan(plan: FitnessPlan): void {
    try {
      localStorage.setItem(STORAGE_KEYS.PLAN, JSON.stringify(plan));
    } catch (e) {
      console.error('Storage write error:', e);
    }
  },

  // Progress Stats
  getProgressStats(): ProgressStats {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PROGRESS);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.warn('Storage read error:', e);
    }
    return DEFAULT_PROGRESS_STATS;
  },

  saveProgressStats(stats: ProgressStats): void {
    try {
      localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(stats));
    } catch (e) {
      console.error('Storage write error:', e);
    }
  },

  // Mark Workout Complete
  markWorkoutComplete(workoutId: string): { plan: FitnessPlan; stats: ProgressStats } {
    const currentPlan = this.getActivePlan();
    const currentStats = this.getProgressStats();

    let targetWorkout: Workout | undefined;
    const updatedWorkouts = currentPlan.weeklyWorkouts.map((w) => {
      if (w.id === workoutId && !w.completed) {
        targetWorkout = { ...w, completed: true, completedAt: new Date().toISOString() };
        return targetWorkout;
      }
      return w;
    });

    const updatedPlan: FitnessPlan = {
      ...currentPlan,
      weeklyWorkouts: updatedWorkouts,
    };
    this.saveActivePlan(updatedPlan);

    // Calculate completed count
    const completedCount = updatedWorkouts.filter((w) => w.completed).length;
    const totalCount = updatedWorkouts.length;
    const completionRate = Math.round((completedCount / totalCount) * 100);

    const newActivity = targetWorkout
      ? [
          {
            id: `act_${Date.now()}`,
            workoutTitle: targetWorkout.workoutTitle,
            date: 'Just now',
            durationMinutes: targetWorkout.durationMinutes,
            exercisesCompleted: targetWorkout.exercises.length,
            estimatedCalories: targetWorkout.estimatedCalories,
          },
          ...currentStats.recentActivity,
        ]
      : currentStats.recentActivity;

    const updatedMinutes = currentStats.totalWorkoutMinutes + (targetWorkout?.durationMinutes || 0);

    // Update achievements
    const updatedAchievements = currentStats.achievements.map((ach) => {
      if (ach.id === 'ach_3' && completedCount >= 5 && !ach.unlocked) {
        return { ...ach, unlocked: true, unlockedAt: 'Today', progressPercent: 100 };
      }
      if (ach.id === 'ach_4') {
        const pct = Math.min(100, Math.round((completedCount / 7) * 100));
        return {
          ...ach,
          progressPercent: pct,
          unlocked: completedCount >= 7,
          unlockedAt: completedCount >= 7 ? 'Today' : undefined,
        };
      }
      return ach;
    });

    const updatedStats: ProgressStats = {
      ...currentStats,
      workoutsCompleted: completedCount,
      totalWorkoutMinutes: updatedMinutes,
      currentStreakDays: currentStats.currentStreakDays + (targetWorkout ? 1 : 0),
      weeklyCompletionRate: completionRate,
      recentActivity: newActivity,
      achievements: updatedAchievements,
    };

    this.saveProgressStats(updatedStats);

    return { plan: updatedPlan, stats: updatedStats };
  },

  // Settings
  getSettings(): AppSettings {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.warn('Storage read error:', e);
    }
    return DEFAULT_SETTINGS;
  },

  saveSettings(settings: AppSettings): void {
    try {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    } catch (e) {
      console.error('Storage write error:', e);
    }
  },

  // Chat Messages
  getChatHistory(): ChatMessage[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CHAT);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.warn('Storage read error:', e);
    }
    return [
      {
        id: 'msg_welcome',
        sender: 'assistant',
        text: "Hi Alex! 👋 I'm your FitBuddy AI Coach. I can help answer questions about your current plan, suggest modifications for injuries or time constraints, or explain proper exercise form. What's on your mind today?",
        timestamp: '10:00 AM',
        quickSuggestions: [
          'What exercises can I do at home?',
          'How can I improve my endurance?',
          'What should I do on a rest day?',
          'How long should my workout be?',
        ],
      },
    ];
  },

  saveChatHistory(messages: ChatMessage[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.CHAT, JSON.stringify(messages));
    } catch (e) {
      console.error('Storage write error:', e);
    }
  },

  // Demo Reset
  resetToDemoDefaults(): void {
    localStorage.clear();
    this.saveUserProfile(DEFAULT_USER_PROFILE);
    this.saveActivePlan(DEFAULT_FITNESS_PLAN);
    this.saveProgressStats(DEFAULT_PROGRESS_STATS);
    this.saveSettings(DEFAULT_SETTINGS);
  },
};
