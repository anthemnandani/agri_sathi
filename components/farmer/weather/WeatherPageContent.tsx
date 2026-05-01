'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { CurrentWeather } from '@/components/farmer/weather/CurrentWeather';
import { ForecastSection } from '@/components/farmer/weather/ForecastSection';
import { FarmerWeatherMap } from '@/components/farmer/weather/FarmerWeatherMap';
import { ChatbotButton } from '@/components/farmer/chat/ChatbotButton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Phone, CloudRain, Wind, Droplets, Sun, Moon, AlertCircle, MapPin } from 'lucide-react';

const userLocation = {
  location: 'Bihar, Supaul',
  pincode: '800001',
};

export function WeatherPageContent() {
  const router = useRouter();

  const handleEnableSMSAlert = () => {
    router.push('/farmer/(dashboard)/weather/sms-alert-registration');
  };

  const weatherAlerts = [
    { icon: CloudRain, label: 'Chance of rain', value: '60%' },
    { icon: AlertCircle, label: 'Lightning risk', value: 'High' },
    { icon: Wind, label: 'Wind speed', value: '15 km/h' },
    { icon: Droplets, label: 'Humidity', value: '65.8%' },
    { icon: Sun, label: 'Sunrise', value: '5:30:23' },
    { icon: Moon, label: 'Sunset', value: '18:10:12' },
  ];

  return (
    <>
      <ChatbotButton />
      <div className="w-full space-y-6 px-0 sm:px-2">
      {/* Location Header */}
      {userLocation && (
        <div className="flex items-center gap-2 px-4 sm:px-0">
          <MapPin className="h-5 w-5 text-primary" />
          <div>
            <p className="text-sm text-muted-foreground">Your Location</p>
            <p className="text-lg font-semibold text-foreground">{userLocation.location}</p>
          </div>
        </div>
      )}

      {/* Top Section - Responsive Grid */}
      <div className="grid w-full grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Left Column - Real Time Weather */}
        <Card className="border-2 border-foreground/10 bg-gradient-to-br from-background to-muted">
          <CardHeader className="pb-2 sm:pb-3">
            <CardTitle className="text-lg sm:text-xl font-bold">Real Time Weather</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 px-4 sm:px-6 pb-4 sm:pb-6">
            <CurrentWeather />
          </CardContent>
        </Card>

        {/* Middle Column - Weather Alerts */}
        <Card className="border-2 border-foreground/10 bg-gradient-to-br from-background to-muted md:col-span-2 lg:col-span-1">
          <CardHeader className="pb-2 sm:pb-3">
            <CardTitle className="text-lg sm:text-xl font-bold">Weather Alerts</CardTitle>
          </CardHeader>
          <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-2 sm:gap-3">
              {weatherAlerts.map((alert, idx) => {
                const Icon = alert.icon;
                return (
                  <div
                    key={idx}
                    className="flex flex-col items-center justify-center p-2 sm:p-3 rounded-lg bg-muted border border-border hover:bg-accent/50 transition"
                  >
                    <Icon className="h-5 sm:h-6 w-5 sm:w-6 text-primary mb-1 sm:mb-2" />
                    <p className="text-xs text-muted-foreground text-center mb-1">{alert.label}</p>
                    <p className="text-xs sm:text-sm font-semibold text-foreground">{alert.value}</p>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Right Column - Offline SMS Alert */}
        <Card className="border-2 border-green-300 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 md:col-span-2 lg:col-span-1">
          <CardHeader className="pb-2 sm:pb-3">
            <CardTitle className="text-base sm:text-lg font-bold">Offline SMS alert</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 sm:space-y-4 px-4 sm:px-6 pb-4 sm:pb-6">
            <p className="text-sm text-muted-foreground">Enable SMS Alert</p>
            <p className="text-xs text-muted-foreground">Receive critical weather alerts even when you&apos;re offline</p>
            <Button 
              onClick={handleEnableSMSAlert}
              className="w-full bg-green-600 hover:bg-green-700 text-white text-sm sm:text-base"
            >
              <Phone className="h-4 w-4 mr-2" />
              Enable SMS Alert
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Section - 7 Day Forecast and Map */}
      <div className="grid w-full grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2">
        {/* 7 Day Forecast */}
        <Card className="border-2 border-foreground/10 bg-gradient-to-br from-background to-muted">
          <CardHeader className="pb-2 sm:pb-3">
            <CardTitle className="text-lg sm:text-xl font-bold">7 days forecast</CardTitle>
          </CardHeader>
          <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6">
            <ForecastSection />
          </CardContent>
        </Card>

        {/* Leaflet Weather Map */}
        <FarmerWeatherMap 
          userLocation={{ 
            latitude: 26.2, 
            longitude: 87.5, 
            name: 'Bihar, Supaul' 
          }}
        />
      </div>
      </div>
    </>
  );
}
