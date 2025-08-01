'use client';

import React from 'react';

export interface KPICardProps {
  title: string;
  value: string | number;
  unit?: string;
  trend?: {
    direction: 'up' | 'down' | 'neutral';
    value: string;
    label: string;
  };
  status?: 'normal' | 'warning' | 'critical';
  subtitle?: string;
  onClick?: () => void;
  isClickable?: boolean;
}

export function KPICard({
  title,
  value,
  unit = '',
  trend,
  status = 'normal',
  subtitle,
  onClick,
  isClickable = false
}: KPICardProps) {
  const statusColors = {
    normal: 'text-gray-900',
    warning: 'text-orange-600',
    critical: 'text-red-600'
  };

  const trendColors = {
    up: 'text-green-600',
    down: 'text-red-600',
    neutral: 'text-gray-600'
  };

  const trendIcons = {
    up: '↗',
    down: '↘',
    neutral: '→'
  };

  return (
    <div
      className={`bg-white rounded-lg shadow p-6 transition-all duration-200 ${
        isClickable 
          ? 'hover:shadow-md hover:scale-105 cursor-pointer border-2 border-transparent hover:border-blue-200' 
          : ''
      }`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        {status !== 'normal' && (
          <div className={`w-3 h-3 rounded-full ${
            status === 'warning' ? 'bg-orange-500' : 'bg-red-500'
          }`} />
        )}
      </div>
      
      <div className="flex items-baseline space-x-1 mb-2">
        <p className={`text-3xl font-bold ${statusColors[status]}`}>
          {value}
        </p>
        {unit && (
          <span className="text-lg font-medium text-gray-500">{unit}</span>
        )}
      </div>

      {subtitle && (
        <p className="text-sm text-gray-600 mb-2">{subtitle}</p>
      )}
      
      {trend && (
        <div className="flex items-center space-x-1">
          <span className={`text-sm font-medium ${trendColors[trend.direction]}`}>
            {trendIcons[trend.direction]} {trend.value}
          </span>
          <span className="text-sm text-gray-500">{trend.label}</span>
        </div>
      )}
    </div>
  );
}