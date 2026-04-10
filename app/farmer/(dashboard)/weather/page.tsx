import React from 'react';
import { WeatherPageContent } from '@/components/farmer/weather/WeatherPageContent';

export const metadata = {
  title: 'Weather & Alerts - AgriSathi',
  description: 'Weather forecast and agricultural alerts for your location',
};

export default function WeatherPage() {
  return (
    <div className="space-y-6">
      <WeatherPageContent />
    </div>
  );
}
