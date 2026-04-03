'use client';

import React from 'react';
import { Cloud, Droplets, Wind, Eye } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export function CurrentWeather() {
  // Mock weather data
  const weather = {
    location: 'Punjab, India',
    temperature: 28,
    condition: 'Partly Cloudy',
    feelsLike: 31,
    humidity: 65,
    windSpeed: 15,
    visibility: 10,
    uv: 7,
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Left - Main Weather Display */}
          <div className="flex flex-col justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-2">
                {weather.location}
              </p>
              <div className="flex items-start gap-4">
                <div className="text-6xl">☁️</div>
                <div>
                  <p className="text-5xl font-bold text-foreground">
                    {weather.temperature}°C
                  </p>
                  <p className="text-lg text-muted-foreground mt-1">
                    {weather.condition}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Feels like {weather.feelsLike}°C
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Weather Details */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-accent rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Droplets className="h-4 w-4 text-blue-500" />
                <span className="text-xs text-muted-foreground">Humidity</span>
              </div>
              <p className="text-2xl font-bold text-foreground">
                {weather.humidity}%
              </p>
            </div>

            <div className="bg-accent rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Wind className="h-4 w-4 text-blue-500" />
                <span className="text-xs text-muted-foreground">Wind Speed</span>
              </div>
              <p className="text-2xl font-bold text-foreground">
                {weather.windSpeed} km/h
              </p>
            </div>

            <div className="bg-accent rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Eye className="h-4 w-4 text-blue-500" />
                <span className="text-xs text-muted-foreground">Visibility</span>
              </div>
              <p className="text-2xl font-bold text-foreground">
                {weather.visibility} km
              </p>
            </div>

            <div className="bg-accent rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Cloud className="h-4 w-4 text-yellow-500" />
                <span className="text-xs text-muted-foreground">UV Index</span>
              </div>
              <p className="text-2xl font-bold text-foreground">
                {weather.uv}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
