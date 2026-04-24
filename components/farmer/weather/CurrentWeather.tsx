'use client';

import React, { useState, useEffect } from 'react';
import { Cloud, Droplets, Wind, Eye } from 'lucide-react';
import { useUserLocation } from '@/hooks/useUserLocation';
import { getWeatherData } from '@/utils/weather/weatherService';

interface WeatherData {
  location: string;
  temperature: number;
  condition: string;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  visibility: number;
  uv: number;
}

export function CurrentWeather() {
  const { userLocation, loading: locationLoading } = useUserLocation();
  const [weather, setWeather] = useState<WeatherData>({
    location: 'Loading...',
    temperature: 0,
    condition: 'Loading...',
    feelsLike: 0,
    humidity: 0,
    windSpeed: 0,
    visibility: 0,
    uv: 0,
  });
  const [weatherLoading, setWeatherLoading] = useState(true);

  useEffect(() => {
    const loadWeather = async () => {
      try {
        if (userLocation && userLocation.latitude && userLocation.longitude) {
          const data = await getWeatherData(userLocation.latitude, userLocation.longitude);
          setWeather({
            location: userLocation.location || data.location,
            temperature: data.temperature,
            condition: data.condition,
            feelsLike: data.feelsLike,
            humidity: data.humidity,
            windSpeed: data.windSpeed,
            visibility: data.visibility,
            uv: Math.round(data.uvIndex),
          });
        } else {
          // Fallback to default location
          const data = await getWeatherData(26.2, 87.5);
          setWeather({
            location: 'Bihar, Supaul',
            temperature: data.temperature,
            condition: data.condition,
            feelsLike: data.feelsLike,
            humidity: data.humidity,
            windSpeed: data.windSpeed,
            visibility: data.visibility,
            uv: Math.round(data.uvIndex),
          });
        }
      } catch (error) {
        console.error('Error loading weather:', error);
      } finally {
        setWeatherLoading(false);
      }
    };

    if (!locationLoading) {
      loadWeather();
    }
  }, [userLocation, locationLoading]);

  if (weatherLoading || locationLoading) {
    return (
      <div className="w-full space-y-4 animate-pulse">
        <div className="h-4 bg-muted rounded w-2/3" />
        <div className="flex items-start gap-3 sm:gap-4">
          <div className="text-4xl sm:text-5xl md:text-6xl opacity-50">☁️</div>
          <div className="flex-1 space-y-2">
            <div className="h-12 bg-muted rounded w-3/4" />
            <div className="h-4 bg-muted rounded w-1/2" />
            <div className="h-4 bg-muted rounded w-2/3" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-accent rounded-lg p-2 sm:p-3 md:p-4 h-20 sm:h-24" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-4">
      <div className="space-y-3">
        <p className="text-xs sm:text-sm text-muted-foreground">
          {weather.location}
        </p>
        <div className="flex items-start gap-3 sm:gap-4">
          <div className="text-4xl sm:text-5xl md:text-6xl">☁️</div>
          <div className="flex-1">
            <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight">
              {weather.temperature}°C
            </p>
            <p className="text-sm sm:text-base text-muted-foreground mt-1">
              {weather.condition}
            </p>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Feels like {weather.feelsLike}°C
            </p>
          </div>
        </div>
      </div>

      {/* Weather Details Grid */}
      <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4">
        <div className="bg-accent rounded-lg p-2 sm:p-3 md:p-4">
          <div className="flex items-center gap-1.5 sm:gap-2 mb-1 sm:mb-2">
            <Droplets className="h-3 sm:h-4 w-3 sm:w-4 text-blue-500 flex-shrink-0" />
            <span className="text-xs text-muted-foreground line-clamp-1">Humidity</span>
          </div>
          <p className="text-lg sm:text-xl md:text-2xl font-bold text-foreground">
            {Math.round(weather.humidity)}%
          </p>
        </div>

        <div className="bg-accent rounded-lg p-2 sm:p-3 md:p-4">
          <div className="flex items-center gap-1.5 sm:gap-2 mb-1 sm:mb-2">
            <Wind className="h-3 sm:h-4 w-3 sm:w-4 text-blue-500 flex-shrink-0" />
            <span className="text-xs text-muted-foreground line-clamp-1">Wind</span>
          </div>
          <p className="text-lg sm:text-xl md:text-2xl font-bold text-foreground">
            {weather.windSpeed} km/h
          </p>
        </div>

        <div className="bg-accent rounded-lg p-2 sm:p-3 md:p-4">
          <div className="flex items-center gap-1.5 sm:gap-2 mb-1 sm:mb-2">
            <Eye className="h-3 sm:h-4 w-3 sm:w-4 text-blue-500 flex-shrink-0" />
            <span className="text-xs text-muted-foreground line-clamp-1">Visibility</span>
          </div>
          <p className="text-lg sm:text-xl md:text-2xl font-bold text-foreground">
            {weather.visibility} km
          </p>
        </div>

        <div className="bg-accent rounded-lg p-2 sm:p-3 md:p-4">
          <div className="flex items-center gap-1.5 sm:gap-2 mb-1 sm:mb-2">
            <Cloud className="h-3 sm:h-4 w-3 sm:w-4 text-yellow-500 flex-shrink-0" />
            <span className="text-xs text-muted-foreground line-clamp-1">UV Index</span>
          </div>
          <p className="text-lg sm:text-xl md:text-2xl font-bold text-foreground">
            {Math.round(weather.uv)}
          </p>
        </div>
      </div>
    </div>
  );
}
