'use client';

import React from 'react';
import { ForecastCard } from './ForecastCard';

const mockForecast = [
  {
    date: 'Tomorrow',
    minTemp: 22,
    maxTemp: 32,
    condition: 'Sunny',
    icon: '☀️',
    rainfall: null,
  },
  {
    date: 'Mon, Apr 7',
    minTemp: 20,
    maxTemp: 30,
    condition: 'Cloudy',
    icon: '☁️',
    rainfall: 15,
  },
  {
    date: 'Tue, Apr 8',
    minTemp: 18,
    maxTemp: 28,
    condition: 'Rainy',
    icon: '🌧️',
    rainfall: 45,
  },
  {
    date: 'Wed, Apr 9',
    minTemp: 21,
    maxTemp: 29,
    condition: 'Partly Cloudy',
    icon: '⛅',
    rainfall: 5,
  },
  {
    date: 'Thu, Apr 10',
    minTemp: 23,
    maxTemp: 33,
    condition: 'Sunny',
    icon: '☀️',
    rainfall: null,
  },
  {
    date: 'Fri, Apr 11',
    minTemp: 24,
    maxTemp: 34,
    condition: 'Sunny',
    icon: '☀️',
    rainfall: null,
  },
];

export function ForecastSection() {
  return (
    <div className="w-full">
      <div className="grid gap-2 sm:gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-3">
        {mockForecast.map((day) => (
          <ForecastCard key={day.date} forecast={day} />
        ))}
      </div>
    </div>
  );
}
