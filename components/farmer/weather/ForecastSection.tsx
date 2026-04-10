'use client';

import React from 'react';
import { Sun, CloudSun, Cloud, CloudRain, CloudSnow, CloudLightning, Droplets } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface ForecastDay {
  day: string;
  condition: string;
  minTemp: number;
  maxTemp: number;
  rainChance?: number;
  isToday?: boolean;
}

interface ForecastSectionProps {
  forecast?: ForecastDay[];
}

const getWeatherIcon = (condition: string, size: string = 'h-6 w-6') => {
  const iconProps = { className: size };
  switch (condition?.toLowerCase()) {
    case 'sunny':
    case 'clear':
      return <Sun {...iconProps} className={`${size} text-amber-500`} />;
    case 'partly cloudy':
      return <CloudSun {...iconProps} className={`${size} text-amber-400`} />;
    case 'cloudy':
      return <Cloud {...iconProps} className={`${size} text-gray-400`} />;
    case 'rainy':
    case 'rain':
      return <CloudRain {...iconProps} className={`${size} text-blue-500`} />;
    case 'snow':
      return <CloudSnow {...iconProps} className={`${size} text-blue-200`} />;
    case 'thunderstorm':
      return <CloudLightning {...iconProps} className={`${size} text-purple-500`} />;
    default:
      return <Sun {...iconProps} className={`${size} text-amber-500`} />;
  }
};

export function ForecastSection({ forecast }: ForecastSectionProps) {
  // Loading state
  if (!forecast || forecast.length === 0) {
    return (
      <div className="space-y-1">
        {[1, 2, 3, 4, 5, 6, 7].map((i) => (
          <div key={i} className="flex items-center justify-between p-2.5 md:p-3 rounded-lg">
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-6 w-6 rounded-full" />
            <Skeleton className="h-5 w-16" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-1">
      {forecast.map((day, idx) => (
        <div
          key={idx}
          className={`flex items-center justify-between p-2.5 md:p-3 rounded-lg transition-colors ${
            day.isToday 
              ? 'bg-primary/10 border border-primary/20' 
              : 'hover:bg-muted/50'
          }`}
        >
          {/* Day Name */}
          <div className="flex-1 min-w-0">
            <p className={`text-sm font-medium truncate ${day.isToday ? 'text-primary' : 'text-foreground'}`}>
              {day.day}
            </p>
            {day.isToday && day.condition && (
              <p className="text-xs text-muted-foreground">{day.condition}</p>
            )}
          </div>

          {/* Rain Chance (if today and has rain chance) */}
          {day.isToday && day.rainChance !== undefined && day.rainChance > 0 && (
            <div className="flex items-center gap-1 mx-2">
              <Droplets className="h-3 w-3 text-blue-500" />
              <span className="text-xs text-blue-500 font-medium">{day.rainChance}%</span>
            </div>
          )}

          {/* Weather Icon */}
          <div className="mx-2 md:mx-3">
            {getWeatherIcon(day.condition, day.isToday ? 'h-8 w-8' : 'h-6 w-6')}
          </div>

          {/* Temperature */}
          <div className="text-right min-w-[60px]">
            <p className="text-sm font-medium text-foreground">
              {day.minTemp}°/ {day.maxTemp}°
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
