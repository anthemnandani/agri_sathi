import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { X, Cloud, Droplets, Wind, Eye, Sun, CloudRain, Zap } from 'lucide-react';
import { LocationDetails } from '@/utils/weather/weatherService';

interface WeatherDetailsPopupProps {
  weatherData: LocationDetails;
  onClose: () => void;
}

export const WeatherDetailsPopup = React.memo(function WeatherDetailsPopup({
  weatherData,
  onClose,
}: WeatherDetailsPopupProps) {
  return (
    <div className="fixed inset-0 flex items-end md:items-center justify-center z-50 p-4 bg-black/40">
      <Card className="w-full md:max-w-md max-h-[80vh] overflow-y-auto bg-background border-2 border-foreground/10">
        {/* Header */}
        <CardHeader className="pb-3 flex flex-row items-start justify-between">
          <div>
            <CardTitle className="text-lg md:text-xl">{weatherData.location}</CardTitle>
            <p className="text-xs text-muted-foreground mt-1">
              Updated: {new Date(weatherData.lastUpdated).toLocaleTimeString()}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-muted rounded-md transition"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Current Weather */}
          <div className="text-center space-y-2">
            <div className="text-4xl md:text-5xl">{weatherData.icon}</div>
            <p className="text-lg md:text-2xl font-bold text-foreground">{weatherData.condition}</p>
            <div className="flex items-center justify-center gap-2">
              <span className="text-3xl md:text-4xl font-bold text-primary">{Math.round(weatherData.temperature)}°</span>
              <span className="text-sm text-muted-foreground">Feels like {Math.round(weatherData.feelsLike)}°</span>
            </div>
          </div>

          {/* Weather Metrics Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-lg bg-muted border border-border">
              <div className="flex items-center gap-2 mb-1">
                <Droplets className="h-4 w-4 text-blue-500" />
                <p className="text-xs text-muted-foreground">Humidity</p>
              </div>
              <p className="text-lg font-semibold text-foreground">{Math.round(weatherData.humidity)}%</p>
            </div>

            <div className="p-3 rounded-lg bg-muted border border-border">
              <div className="flex items-center gap-2 mb-1">
                <Wind className="h-4 w-4 text-cyan-500" />
                <p className="text-xs text-muted-foreground">Wind Speed</p>
              </div>
              <p className="text-lg font-semibold text-foreground">{Math.round(weatherData.windSpeed)} km/h</p>
            </div>

            <div className="p-3 rounded-lg bg-muted border border-border">
              <div className="flex items-center gap-2 mb-1">
                <Eye className="h-4 w-4 text-amber-500" />
                <p className="text-xs text-muted-foreground">Visibility</p>
              </div>
              <p className="text-lg font-semibold text-foreground">{Math.round(weatherData.visibility)} km</p>
            </div>

            <div className="p-3 rounded-lg bg-muted border border-border">
              <div className="flex items-center gap-2 mb-1">
                <Cloud className="h-4 w-4 text-gray-500" />
                <p className="text-xs text-muted-foreground">Cloud Cover</p>
              </div>
              <p className="text-lg font-semibold text-foreground">{Math.round(weatherData.cloudCover)}%</p>
            </div>

            <div className="p-3 rounded-lg bg-muted border border-border">
              <div className="flex items-center gap-2 mb-1">
                <Sun className="h-4 w-4 text-yellow-500" />
                <p className="text-xs text-muted-foreground">UV Index</p>
              </div>
              <p className="text-lg font-semibold text-foreground">{Math.round(weatherData.uvIndex * 10) / 10}</p>
            </div>

            <div className="p-3 rounded-lg bg-muted border border-border">
              <div className="flex items-center gap-2 mb-1">
                <CloudRain className="h-4 w-4 text-blue-600" />
                <p className="text-xs text-muted-foreground">Rain Probability</p>
              </div>
              <p className="text-lg font-semibold text-foreground">{Math.round(weatherData.rainProbability)}%</p>
            </div>
          </div>

          {/* Sun Times */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800">
              <div className="flex items-center gap-2 mb-1">
                <Sun className="h-4 w-4 text-amber-600" />
                <p className="text-xs text-muted-foreground">Sunrise</p>
              </div>
              <p className="text-sm font-semibold text-foreground">{weatherData.sunrise}</p>
            </div>
            <div className="p-3 rounded-lg bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800">
              <div className="flex items-center gap-2 mb-1">
                <Moon className="h-4 w-4 text-purple-600" />
                <p className="text-xs text-muted-foreground">Sunset</p>
              </div>
              <p className="text-sm font-semibold text-foreground">{weatherData.sunset}</p>
            </div>
          </div>

          {/* Alerts */}
          {(weatherData.thunderstorm || weatherData.floodRisk !== 'low' || weatherData.rainProbability > 70) && (
            <div className="space-y-2">
              {weatherData.thunderstorm && (
                <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800">
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-red-600" />
                    <p className="text-sm text-red-700 dark:text-red-400">⚠️ Thunderstorm Alert</p>
                  </div>
                </div>
              )}
              {weatherData.floodRisk === 'high' && (
                <div className="p-3 rounded-lg bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-800">
                  <p className="text-sm text-orange-700 dark:text-orange-400">⚠️ High Flood Risk</p>
                </div>
              )}
              {weatherData.rainProbability > 70 && (
                <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800">
                  <p className="text-sm text-blue-700 dark:text-blue-400">💧 Heavy Rain Expected</p>
                </div>
              )}
            </div>
          )}

          {/* Short Forecast */}
          {weatherData.forecast && weatherData.forecast.length > 0 && (
            <div>
              <p className="text-sm font-semibold text-foreground mb-2">Next 6 Hours</p>
              <div className="grid grid-cols-3 gap-2">
                {weatherData.forecast.slice(0, 3).map((forecast, idx) => (
                  <div
                    key={idx}
                    className="p-2 rounded-lg bg-muted border border-border text-center text-xs"
                  >
                    <p className="text-muted-foreground mb-1">{forecast.time}</p>
                    <div className="text-lg mb-1">{forecast.icon}</div>
                    <p className="font-semibold text-foreground">{Math.round(forecast.temperature)}°</p>
                    <p className="text-xs text-muted-foreground">{Math.round(forecast.rainProbability)}% rain</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
});

WeatherDetailsPopup.displayName = 'WeatherDetailsPopup';

// Moon icon for completeness
const Moon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
  </svg>
);
