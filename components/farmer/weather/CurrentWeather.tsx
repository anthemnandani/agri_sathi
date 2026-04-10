'use client';

import React from 'react';
import { Sun, CloudSun, Cloud, CloudRain, CloudSnow, CloudLightning } from 'lucide-react';

export function CurrentWeather() {
  // Mock weather data - In production, this would come from an API
  const weather = {
    location: 'Supaul, Bihar',
    temperature: 31,
    minTemp: 27,
    maxTemp: 33,
    condition: 'Sunny',
  };

  // Get weather icon based on condition
  const getWeatherIcon = (condition: string) => {
    const iconProps = { className: 'h-16 w-16 md:h-20 md:w-20' };
    switch (condition.toLowerCase()) {
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

  return (
    <div className="flex flex-col items-center justify-center text-center py-2">
      {/* Location */}
      <p className="text-sm text-muted-foreground mb-3">{weather.location}</p>

      {/* Weather Icon and Temperature */}
      <div className="flex items-center justify-center gap-4 mb-2">
        {getWeatherIcon(weather.condition)}
        <div className="text-left">
          <p className="text-4xl md:text-5xl font-bold text-foreground">
            {weather.temperature}<span className="text-2xl md:text-3xl align-top">°</span>
          </p>
          <p className="text-sm md:text-base text-muted-foreground mt-1">
            {weather.minTemp}°/ {weather.maxTemp}°
          </p>
        </div>
      </div>
    </div>
  );
}
