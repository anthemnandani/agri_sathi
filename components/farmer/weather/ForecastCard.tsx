'use client';

import React from 'react';
import { Cloud } from 'lucide-react';

interface ForecastCardProps {
  forecast: {
    date: string;
    minTemp: number;
    maxTemp: number;
    condition: string;
    icon: string;
    rainfall?: number | null;
  };
}

export function ForecastCard({ forecast }: ForecastCardProps) {
  return (
    <div className="border border-border rounded-lg p-4 text-center hover:bg-accent transition-colors">
      <p className="text-sm font-medium text-foreground mb-3">{forecast.date}</p>
      
      <div className="text-4xl mb-3">{forecast.icon}</div>
      
      <p className="text-xs text-muted-foreground mb-3">{forecast.condition}</p>
      
      <div className="flex justify-center gap-4 mb-3">
        <div>
          <p className="text-xs text-muted-foreground">Min</p>
          <p className="font-semibold text-foreground">{forecast.minTemp}°</p>
        </div>
        <div className="w-px bg-border"></div>
        <div>
          <p className="text-xs text-muted-foreground">Max</p>
          <p className="font-semibold text-foreground">{forecast.maxTemp}°</p>
        </div>
      </div>

      {forecast.rainfall !== null && (
        <div className="text-xs">
          <Cloud className="inline h-3 w-3 mr-1" />
          <span className="text-muted-foreground">
            {forecast.rainfall}mm
          </span>
        </div>
      )}
    </div>
  );
}
