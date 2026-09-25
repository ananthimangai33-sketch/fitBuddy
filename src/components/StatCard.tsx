import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  iconColor?: string;
  progressPercent?: number;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  iconColor = 'text-emerald-600',
  progressPercent,
}) => {
  return (
    <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm transition-all hover:border-slate-300">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          {title}
        </span>
        <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
          <Icon className={`w-4 h-4 ${iconColor}`} />
        </div>
      </div>

      <div className="flex items-baseline justify-between">
        <div className="text-2xl sm:text-3xl font-bold font-mono tabular-nums text-slate-900 tracking-tight">
          {value}
        </div>
      </div>

      {progressPercent !== undefined && (
        <div className="mt-3">
          <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-emerald-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, Math.max(0, progressPercent))}%` }}
            />
          </div>
        </div>
      )}

      {subtitle && (
        <p className="text-xs text-slate-500 mt-2 font-medium">
          {subtitle}
        </p>
      )}
    </div>
  );
};
