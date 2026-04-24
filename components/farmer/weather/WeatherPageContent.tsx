'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { CurrentWeather } from '@/components/farmer/weather/CurrentWeather';
import { ForecastSection } from '@/components/farmer/weather/ForecastSection';
import { InteractiveWeatherMap } from '@/components/farmer/weather/InteractiveWeatherMap';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Phone, Cloud, CloudRain, Wind, Droplets, Sun, Moon, AlertCircle } from 'lucide-react';

export function WeatherPageContent() {
  const router = useRouter();

  const handleEnableSMSAlert = () => {
    router.push('/farmer/(dashboard)/weather/sms-alert-registration');
  };

  const weatherAlerts = [
    { icon: CloudRain, label: 'Chance of rain', value: '60%' },
    { icon: AlertCircle, label: 'Lightning risk', value: 'High' },
    { icon: Wind, label: 'Wind speed', value: '0.2 km/h' },
    { icon: Droplets, label: 'Humidity', value: '65.8%' },
    { icon: Sun, label: 'Sunrise', value: '5:30:23' },
    { icon: Moon, label: 'Sunset', value: '18:10:12' },
  ];

  return (
    <div className="w-full space-y-6">
      {/* Top Section - 3 Columns */}
      <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Column - Real Time Weather */}
        <Card className="border-2 border-foreground/10 bg-gradient-to-br from-background to-muted">
          <CardHeader className="pb-3">
            <CardTitle className="text-xl font-bold">Real Time Weather</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <CurrentWeather />
          </CardContent>
        </Card>

        {/* Middle Column - Weather Alerts */}
        <Card className="border-2 border-foreground/10 bg-gradient-to-br from-background to-muted">
          <CardHeader className="pb-3">
            <CardTitle className="text-xl font-bold">Weather Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {weatherAlerts.map((alert, idx) => {
                const Icon = alert.icon;
                return (
                  <div
                    key={idx}
                    className="flex flex-col items-center justify-center p-3 rounded-lg bg-muted border border-border hover:bg-accent/50 transition"
                  >
                    <Icon className="h-6 w-6 text-primary mb-2" />
                    <p className="text-xs text-muted-foreground text-center mb-1">{alert.label}</p>
                    <p className="text-sm font-semibold text-foreground">{alert.value}</p>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Right Column - Offline SMS Alert */}
        <Card className="border-2 border-orange-300 bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-orange-950/30 dark:to-yellow-950/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-bold">Offline SMS alert</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">Enable SMS Alert</p>
            <p className="text-xs text-muted-foreground">Receive critical weather alerts even when you&apos;re offline</p>
            <Button 
              onClick={handleEnableSMSAlert}
              className="w-full bg-orange-600 hover:bg-orange-700 text-white"
            >
              <Phone className="h-4 w-4 mr-2" />
              Enable SMS Alert
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Section - 7 Day Forecast and Map */}
      <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-2">
        {/* 7 Day Forecast */}
        <Card className="border-2 border-foreground/10 bg-gradient-to-br from-background to-muted">
          <CardHeader className="pb-3">
            <CardTitle className="text-xl font-bold">7 days weather forecast</CardTitle>
          </CardHeader>
          <CardContent>
            <ForecastSection />
          </CardContent>
        </Card>

        {/* Interactive Weather Map */}
        <div className="relative h-full min-h-[400px]">
          <InteractiveWeatherMap />
        </div>
      </div>
    </div>
  );
}
