import React, { useState } from 'react';
import {
  Bell,
  Clock,
  Moon,
  Sun,
  Shield,
  RotateCcw,
  LogOut,
  User,
  Database,
  Check,
} from 'lucide-react';
import { AppSettings, UserProfile } from '../types/fitness';
import { StorageService } from '../services/storageService';
import { useToast } from '../components/Toast';

interface SettingsViewProps {
  settings: AppSettings;
  userProfile: UserProfile;
  onUpdateSettings: (newSettings: AppSettings) => void;
  onNavigate: (route: string) => void;
  onLogout: () => void;
  onResetDemoData: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  settings,
  userProfile,
  onUpdateSettings,
  onNavigate,
  onLogout,
  onResetDemoData,
}) => {
  const { showToast } = useToast();
  const [localSettings, setLocalSettings] = useState<AppSettings>(settings);

  const handleToggle = (field: keyof AppSettings) => {
    const updated = {
      ...localSettings,
      [field]: !localSettings[field],
    };
    setLocalSettings(updated);
    onUpdateSettings(updated);
    showToast('Preferences updated', 'info');
  };

  const handleTimeChange = (time: string) => {
    const updated = {
      ...localSettings,
      reminderTime: time,
    };
    setLocalSettings(updated);
    onUpdateSettings(updated);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in duration-200">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Application Settings
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Configure notifications, workout reminders, display options, and data privacy.
        </p>
      </div>

      <div className="space-y-6">
        {/* Account Settings Section */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-4">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            Account Overview
          </h2>

          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold">
                {userProfile.name[0]}
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">{userProfile.name}</h3>
                <p className="text-xs text-slate-500">{userProfile.email}</p>
              </div>
            </div>

            <button
              onClick={() => onNavigate('profile')}
              className="px-3.5 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white border border-slate-200 rounded-lg transition-colors shadow-2xs"
            >
              Edit Profile
            </button>
          </div>
        </div>

        {/* Preferences Section: Notification & Workout Reminders */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-4">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            Workout Reminders & Alerts
          </h2>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-white border border-slate-200">
                  <Bell className="w-4 h-4 text-emerald-600" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">Push Notifications</div>
                  <div className="text-xs text-slate-500">
                    Receive workout motivational prompts and milestone badges
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleToggle('notifications')}
                className={`w-12 h-6 rounded-full transition-colors relative focus:outline-none ${
                  localSettings.notifications ? 'bg-emerald-600' : 'bg-slate-300'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform absolute top-0.5 ${
                    localSettings.notifications ? 'right-0.5' : 'left-0.5'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-white border border-slate-200">
                  <Clock className="w-4 h-4 text-emerald-600" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">Daily Workout Reminder</div>
                  <div className="text-xs text-slate-500">
                    Schedule a prompt at your preferred morning or evening training time
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="time"
                  value={localSettings.reminderTime}
                  onChange={(e) => handleTimeChange(e.target.value)}
                  className="px-2.5 py-1 text-xs font-mono font-semibold rounded-lg border border-slate-200 bg-white"
                />

                <button
                  type="button"
                  onClick={() => handleToggle('workoutReminders')}
                  className={`w-12 h-6 rounded-full transition-colors relative focus:outline-none ${
                    localSettings.workoutReminders ? 'bg-emerald-600' : 'bg-slate-300'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform absolute top-0.5 ${
                      localSettings.workoutReminders ? 'right-0.5' : 'left-0.5'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Appearance Section */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-4">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            Appearance & Units
          </h2>

          <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-white border border-slate-200">
                {localSettings.darkMode ? (
                  <Moon className="w-4 h-4 text-indigo-600" />
                ) : (
                  <Sun className="w-4 h-4 text-amber-500" />
                )}
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900">Interface Theme</div>
                <div className="text-xs text-slate-500">
                  {localSettings.darkMode
                    ? 'Dark slate dashboard theme'
                    : 'Clean light mode with emerald accents'}
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleToggle('darkMode')}
              className="px-3.5 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 bg-white hover:bg-slate-100 transition-colors"
            >
              {localSettings.darkMode ? 'Switch to Light' : 'Switch to Dark'}
            </button>
          </div>
        </div>

        {/* Privacy & Storage Section */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-4">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            Privacy & Demo Storage
          </h2>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
            <div className="flex items-start gap-3">
              <Database className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
              <div>
                <h3 className="text-xs font-bold text-slate-900">Client-Side Persistence</h3>
                <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                  Your fitness plan, completed workout logs, streaks, and assistant chat history are saved securely in your browser's localStorage. No external trackers or analytics are embedded.
                </p>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between border-t border-slate-200/60">
              <span className="text-xs text-slate-500">Reset to pristine demo state:</span>
              <button
                type="button"
                onClick={() => {
                  onResetDemoData();
                  showToast('Demo data reset to initial values', 'info');
                }}
                className="px-3 py-1.5 text-xs font-semibold text-rose-600 hover:text-rose-700 hover:bg-rose-50 border border-rose-200 rounded-lg transition-colors flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Demo Data</span>
              </button>
            </div>
          </div>
        </div>

        {/* Sign Out Action */}
        <div className="pt-4 flex justify-end">
          <button
            onClick={onLogout}
            className="px-6 py-2.5 text-xs font-bold text-white bg-slate-900 hover:bg-rose-700 active:bg-rose-800 rounded-xl transition-colors shadow-sm flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out of FitBuddy</span>
          </button>
        </div>
      </div>
    </div>
  );
};
