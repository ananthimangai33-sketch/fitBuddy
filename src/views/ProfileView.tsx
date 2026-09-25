import React, { useState } from 'react';
import {
  User,
  Mail,
  Calendar,
  Activity,
  Target,
  Home,
  Dumbbell,
  Clock,
  Edit3,
  Check,
  X,
  Camera,
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

interface ProfileViewProps {
  userProfile: UserProfile;
  onUpdateProfile: (updated: UserProfile) => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  userProfile,
  onUpdateProfile,
}) => {
  const { showToast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<UserProfile>(userProfile);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile(formData);
    setIsEditing(false);
    showToast('Profile updated successfully!', 'success');
  };

  const handleCancel = () => {
    setFormData(userProfile);
    setIsEditing(false);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in duration-200">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            User Profile
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage your personal physical metrics, preferences, and training constraints.
          </p>
        </div>

        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-sm shadow-emerald-600/20 transition-all flex items-center gap-1.5 self-start active:scale-[0.98]"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Edit Profile</span>
          </button>
        )}
      </div>

      {/* Main Profile Card */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
        {/* Top Banner with Avatar */}
        <div className="p-6 sm:p-8 bg-gradient-to-r from-slate-900 to-slate-800 text-white flex flex-col sm:flex-row items-center gap-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white/20 bg-slate-800 shadow-xl shrink-0">
              {formData.avatarUrl ? (
                <img
                  src={formData.avatarUrl}
                  alt={formData.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-3xl font-bold text-emerald-400">
                  {formData.name[0]}
                </div>
              )}
            </div>
            {isEditing && (
              <button
                type="button"
                onClick={() => showToast('Avatar upload simulated in demo mode', 'info')}
                className="absolute bottom-0 right-0 p-2 rounded-full bg-emerald-500 text-slate-950 border-2 border-slate-900 shadow-sm hover:bg-emerald-400 transition-colors"
                title="Change avatar photo"
              >
                <Camera className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="text-center sm:text-left space-y-1">
            <h2 className="text-2xl font-bold text-white">{formData.name}</h2>
            <p className="text-xs text-slate-300 flex items-center justify-center sm:justify-start gap-1.5 font-mono">
              <Mail className="w-3.5 h-3.5 text-slate-400" />
              <span>{formData.email}</span>
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 capitalize">
                {formData.fitnessLevel}
              </span>
              <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-700/80 text-slate-200 capitalize">
                {formData.fitnessGoal.replace('_', ' ')}
              </span>
            </div>
          </div>
        </div>

        {/* Profile Details or Edit Form */}
        <div className="p-6 sm:p-8">
          {isEditing ? (
            <form onSubmit={handleSave} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Age
                  </label>
                  <input
                    type="number"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Gender
                  </label>
                  <input
                    type="text"
                    value={formData.gender || ''}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Height
                  </label>
                  <input
                    type="text"
                    value={formData.height}
                    onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Weight
                  </label>
                  <input
                    type="text"
                    value={formData.weight}
                    onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Fitness Level
                  </label>
                  <select
                    value={formData.fitnessLevel}
                    onChange={(e) =>
                      setFormData({ ...formData, fitnessLevel: e.target.value as FitnessLevel })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Fitness Goal
                  </label>
                  <select
                    value={formData.fitnessGoal}
                    onChange={(e) =>
                      setFormData({ ...formData, fitnessGoal: e.target.value as FitnessGoal })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  >
                    <option value="general_fitness">General Fitness</option>
                    <option value="strength">Strength</option>
                    <option value="endurance">Endurance</option>
                    <option value="flexibility">Flexibility</option>
                    <option value="weight_management">Weight Management</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Workout Location
                  </label>
                  <select
                    value={formData.workoutLocation}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        workoutLocation: e.target.value as WorkoutLocation,
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  >
                    <option value="home">Home</option>
                    <option value="gym">Gym</option>
                    <option value="outdoor">Outdoor</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Equipment
                  </label>
                  <select
                    value={formData.equipment}
                    onChange={(e) =>
                      setFormData({ ...formData, equipment: e.target.value as EquipmentType })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  >
                    <option value="no_equipment">No Equipment</option>
                    <option value="basic_equipment">Basic Equipment</option>
                    <option value="full_gym">Full Gym</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Additional Preferences
                </label>
                <textarea
                  value={formData.additionalPreferences || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, additionalPreferences: e.target.value })
                  }
                  rows={2}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-sm transition-all"
                >
                  Save Profile
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 text-sm">
                <div>
                  <span className="text-xs font-semibold text-slate-400 block uppercase tracking-wider">
                    Age
                  </span>
                  <span className="font-bold text-slate-900 mt-1 block font-mono">
                    {formData.age} years old
                  </span>
                </div>

                <div>
                  <span className="text-xs font-semibold text-slate-400 block uppercase tracking-wider">
                    Gender
                  </span>
                  <span className="font-bold text-slate-900 mt-1 block">
                    {formData.gender || 'Not specified'}
                  </span>
                </div>

                <div>
                  <span className="text-xs font-semibold text-slate-400 block uppercase tracking-wider">
                    Height & Weight
                  </span>
                  <span className="font-bold text-slate-900 mt-1 block font-mono">
                    {formData.height} · {formData.weight}
                  </span>
                </div>

                <div>
                  <span className="text-xs font-semibold text-slate-400 block uppercase tracking-wider">
                    Fitness Level
                  </span>
                  <span className="font-bold text-slate-900 mt-1 block capitalize">
                    {formData.fitnessLevel}
                  </span>
                </div>

                <div>
                  <span className="text-xs font-semibold text-slate-400 block uppercase tracking-wider">
                    Fitness Goal
                  </span>
                  <span className="font-bold text-slate-900 mt-1 block capitalize">
                    {formData.fitnessGoal.replace('_', ' ')}
                  </span>
                </div>

                <div>
                  <span className="text-xs font-semibold text-slate-400 block uppercase tracking-wider">
                    Workout Location
                  </span>
                  <span className="font-bold text-slate-900 mt-1 block capitalize">
                    {formData.workoutLocation}
                  </span>
                </div>

                <div>
                  <span className="text-xs font-semibold text-slate-400 block uppercase tracking-wider">
                    Equipment
                  </span>
                  <span className="font-bold text-slate-900 mt-1 block capitalize">
                    {formData.equipment.replace('_', ' ')}
                  </span>
                </div>

                <div>
                  <span className="text-xs font-semibold text-slate-400 block uppercase tracking-wider">
                    Session Duration
                  </span>
                  <span className="font-bold text-slate-900 mt-1 block font-mono">
                    {formData.workoutDuration} minutes
                  </span>
                </div>

                <div>
                  <span className="text-xs font-semibold text-slate-400 block uppercase tracking-wider">
                    Schedule
                  </span>
                  <span className="font-bold text-emerald-600 mt-1 block font-mono">
                    {formData.selectedDays.length} days / week
                  </span>
                </div>
              </div>

              {formData.additionalPreferences && (
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-xs font-bold text-slate-700 block mb-1">
                    Special Training Notes & Preferences:
                  </span>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {formData.additionalPreferences}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
