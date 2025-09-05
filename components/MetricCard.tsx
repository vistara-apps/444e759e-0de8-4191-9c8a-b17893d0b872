'use client';

import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export function MetricCard({ title, value, subtitle, icon: Icon, trend }: MetricCardProps) {
  return (
    <div className="metric-card">
      <div className="flex items-start justify-between mb-3">
        <div className="p-2 bg-white bg-opacity-20 rounded-lg">
          <Icon className="w-5 h-5 text-white" />
        </div>
        {trend && (
          <div className={`text-xs font-medium ${
            trend.isPositive ? 'text-green-400' : 'text-red-400'
          }`}>
            {trend.isPositive ? '+' : ''}{trend.value}%
          </div>
        )}
      </div>
      
      <div className="space-y-1">
        <div className="text-2xl font-bold text-white">
          {value}
        </div>
        <div className="text-sm font-medium text-white text-opacity-90">
          {title}
        </div>
        {subtitle && (
          <div className="text-xs text-white text-opacity-70">
            {subtitle}
          </div>
        )}
      </div>
    </div>
  );
}
