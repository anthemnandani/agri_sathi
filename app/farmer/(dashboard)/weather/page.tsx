import React from 'react';
import { CurrentWeather } from '@/components/farmer/weather/CurrentWeather';
import { ForecastSection } from '@/components/farmer/weather/ForecastSection';
import { AlertsSection } from '@/components/farmer/weather/AlertsSection';

export const metadata = {
  title: 'Weather & Alerts - AgriSathi',
  description: 'Weather forecast and agricultural alerts for your location',
};

export default function WeatherPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Weather & Alerts</h1>
        <p className="text-muted-foreground">
          Real-time weather data and agricultural alerts for your area
        </p>
      </div>

      {/* Current Weather */}
      <CurrentWeather />

      {/* Forecast */}
      <ForecastSection />

      {/* Alerts */}
      <AlertsSection />
    </div>
  );
}
