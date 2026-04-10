'use client';

import React from 'react';
import { Sun, CloudSun, Cloud, CloudRain, CloudSnow, CloudLightning } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface WeatherData {
  location: string;
  temperature: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  condition: string;
  rainProbability: number;
  thunderstorm: boolean;
  sunrise: string;
  sunset: string;
}

interface CurrentWeatherProps {
  data?: WeatherData;
}

export function CurrentWeather({ data }: CurrentWeatherProps) {
  // Get weather icon based on condition
  const getWeatherIcon = (condition: string) => {
    const iconProps = { className: 'h-16 w-16 md:h-20 md:w-20' };
    switch (condition?.toLowerCase()) {
      case 'sunny':
      case 'clear':
        return <Sun {...iconProps} className={`${iconProps.className} text-amber-500`} />;
      case 'partly cloudy':
        return <CloudSun {...iconProps} className={`${iconProps.className} text-amber-400`} />;
      case 'cloudy':
        return <Cloud {...iconProps} className={`${iconProps.className} text-gray-400`} />;
      case 'rainy':
      case 'rain':
        return <CloudRain {...iconProps} className={`${iconProps.className} text-blue-500`} />;
      case 'snow':
        return <CloudSnow {...iconProps} className={`${iconProps.className} text-blue-200`} />;
      case 'thunderstorm':
        return <CloudLightning {...iconProps} className={`${iconProps.className} text-purple-500`} />;
      default:
        return <Sun {...iconProps} className={`${iconProps.className} text-amber-500`} />;
    }
  };

  // Loading state
  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-2">
        <Skeleton className="h-4 w-32 mb-3" />
        <div className="flex items-center justify-center gap-4 mb-2">
          <Skeleton className="h-20 w-20 rounded-full" />
          <div className="text-left space-y-2">
            <Skeleton className="h-12 w-24" />
            <Skeleton className="h-4 w-16" />
          </div>
        </div>
      </div>
    );
  }

  // Extract min/max from temperature (mock calculation for now)
  const minTemp = Math.round(data.temperature - 4);
  const maxTemp = Math.round(data.temperature + 2);

  return (
    <div className="flex flex-col items-center justify-center text-center py-2">
      {/* Location */}
      <p className="text-sm text-muted-foreground mb-3">{data.location}</p>

      {/* Weather Icon and Temperature */}
      <div className="flex items-center justify-center gap-4 mb-2">
        {getWeatherIcon(data.condition)}
        <div className="text-left">
          <p className="text-4xl md:text-5xl font-bold text-foreground">
            {data.temperature}<span className="text-2xl md:text-3xl align-top">°</span>
          </p>
          <p className="text-sm md:text-base text-muted-foreground mt-1">
            {minTemp}°/ {maxTemp}°
          </p>
        </div>
      </div>

      {/* Condition label */}
      <p className="text-sm font-medium text-muted-foreground capitalize">{data.condition}</p>
    </div>
  );
}
