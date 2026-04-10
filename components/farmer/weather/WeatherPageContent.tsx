'use client';

import React, { useState } from 'react';
import { CurrentWeather } from '@/components/farmer/weather/CurrentWeather';
import { ForecastSection } from '@/components/farmer/weather/ForecastSection';
import { InteractiveWeatherMap } from '@/components/farmer/weather/InteractiveWeatherMap';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  AlertCircle, 
  Phone, 
  CloudRain, 
  Wind, 
  Droplets, 
  Sun, 
  Moon, 
  Zap,
  MessageSquare
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export function WeatherPageContent() {
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    pincode: '',
    address: '',
    occupation: '',
    registerFor: 'self',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setLoading(false);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', phone: '', pincode: '', address: '', occupation: '', registerFor: 'self' });
      setShowRegistrationModal(false);
    }, 2000);
  };

  const weatherAlerts = [
    { icon: CloudRain, label: 'Chance of rain', value: '0%', color: 'text-blue-500' },
    { icon: Zap, label: 'Lightning', value: 'N/A', color: 'text-yellow-500' },
    { icon: Wind, label: 'Wind speed', value: '0.2 KM/h', color: 'text-emerald-500' },
    { icon: Droplets, label: 'Humidity', value: '40.67%', color: 'text-cyan-500' },
    { icon: Sun, label: 'Sunrise', value: '07:00:23', color: 'text-orange-500' },
    { icon: Moon, label: 'Sunset', value: '18:10:03', color: 'text-indigo-500' },
  ];

  return (
    <div className="w-full space-y-4 md:space-y-6">
      {/* Top Section - 3 Columns on Desktop */}
      <div className="grid w-full grid-cols-1 gap-4 md:gap-6 lg:grid-cols-3">
        {/* Left Column - Real Time Weather */}
        <Card className="border border-border/50 bg-card shadow-sm">
          <CardHeader className="pb-2 px-4 pt-4 md:px-6 md:pt-6">
            <CardTitle className="text-lg md:text-xl font-bold text-foreground">Real Time Weather</CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4 md:px-6 md:pb-6">
            <CurrentWeather />
          </CardContent>
        </Card>

        {/* Middle Column - Weather Alerts */}
        <Card className="border border-border/50 bg-card shadow-sm">
          <CardHeader className="pb-2 px-4 pt-4 md:px-6 md:pt-6">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <CardTitle className="text-lg md:text-xl font-bold text-foreground">Weather Stats</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="px-4 pb-4 md:px-6 md:pb-6">
            <div className="grid grid-cols-2 gap-2 md:gap-3">
              {weatherAlerts.map((alert, idx) => {
                const Icon = alert.icon;
                return (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-2.5 md:p-3 rounded-lg bg-muted/50 border border-border/30 hover:bg-muted transition-colors"
                  >
                    <div className={`p-1.5 md:p-2 rounded-md bg-background ${alert.color}`}>
                      <Icon className="h-4 w-4 md:h-5 md:w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] md:text-xs text-muted-foreground truncate">{alert.label}</p>
                      <p className="text-xs md:text-sm font-semibold text-foreground">{alert.value}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Right Column - Offline SMS Alert */}
        <Card className="border border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 dark:border-amber-800/50 shadow-sm">
          <CardHeader className="pb-2 px-4 pt-4 md:px-6 md:pt-6">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              <CardTitle className="text-lg md:text-xl font-bold text-foreground">Offline SMS alert</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-3 px-4 pb-4 md:px-6 md:pb-6">
            <div>
              <p className="text-sm font-medium text-foreground">Enable SMS Alert</p>
              <p className="text-xs text-muted-foreground mt-1">Receive critical weather alerts even offline</p>
            </div>
            <Dialog open={showRegistrationModal} onOpenChange={setShowRegistrationModal}>
              <DialogTrigger asChild>
                <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white font-medium shadow-sm">
                  <Phone className="h-4 w-4 mr-2" />
                  Enable SMS Alert
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogDescription className="sr-only">Weather alert registration form with safety guide</DialogDescription>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Registration Form */}
                  <div>
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-bold">Registration</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4 mt-6">
                      {submitted && (
                        <Alert className="bg-green-50 border-green-200 text-green-800 dark:bg-green-950 dark:border-green-800 dark:text-green-200">
                          <AlertCircle className="h-4 w-4" />
                          <AlertDescription>Registration successful! You&apos;ll receive alerts via SMS.</AlertDescription>
                        </Alert>
                      )}

                      <div>
                        <Label htmlFor="name" className="text-sm font-medium">
                          Enter your name
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          placeholder="Enter your name ...."
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="mt-2"
                        />
                      </div>

                      <div>
                        <Label htmlFor="phone" className="text-sm font-medium">
                          Enter your mobile no
                        </Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          placeholder="Enter your mobile no ...."
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                          className="mt-2"
                        />
                      </div>

                      <div>
                        <Label htmlFor="pincode" className="text-sm font-medium">
                          Enter your pincode
                        </Label>
                        <Input
                          id="pincode"
                          name="pincode"
                          placeholder="Enter your pincode ...."
                          value={formData.pincode}
                          onChange={handleInputChange}
                          required
                          className="mt-2"
                        />
                      </div>

                      <div>
                        <Label htmlFor="address" className="text-sm font-medium">
                          Enter your address
                        </Label>
                        <textarea
                          id="address"
                          name="address"
                          placeholder="Enter your address ...."
                          value={formData.address}
                          onChange={handleInputChange}
                          required
                          className="mt-2 w-full px-3 py-2 rounded-md border border-input bg-background text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring text-sm"
                          rows={3}
                        />
                      </div>

                      <div>
                        <Label htmlFor="occupation" className="text-sm font-medium">
                          Occupation
                        </Label>
                        <Input
                          id="occupation"
                          name="occupation"
                          placeholder="Enter your occupation ...."
                          value={formData.occupation}
                          onChange={handleInputChange}
                          className="mt-2"
                        />
                      </div>

                      <div className="space-y-3">
                        <Label className="text-sm font-medium">Register for</Label>
                        <div className="space-y-2">
                          {[
                            { value: 'self', label: 'Myself' },
                            { value: 'family', label: 'Myself & Family' },
                            { value: 'community', label: 'Community' },
                          ].map((option) => (
                            <div key={option.value} className="flex items-center">
                              <input
                                type="radio"
                                id={option.value}
                                name="registerFor"
                                value={option.value}
                                checked={formData.registerFor === option.value}
                                onChange={(e) =>
                                  setFormData((prev) => ({
                                    ...prev,
                                    registerFor: e.target.value,
                                  }))
                                }
                                className="h-4 w-4"
                              />
                              <Label
                                htmlFor={option.value}
                                className="ml-2 cursor-pointer font-normal"
                              >
                                {option.label}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>

                      <Button
                        type="submit"
                        className="w-full"
                        disabled={loading}
                        size="lg"
                      >
                        {loading ? 'Registering...' : 'Submit'}
                      </Button>
                    </form>
                  </div>

                  {/* Safety Guide */}
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold">Lightning Safety</h3>
                    <div className="space-y-4 max-h-[500px] overflow-y-auto">
                      <div>
                        <h4 className="font-semibold text-lg mb-2">Before Lightning</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li>Stay Informed: Monitor weather forecasts and updates through apps or radio.</li>
                          <li>Look for signs: Dark clouds and strong winds indicate an approaching storm.</li>
                          <li>Prepare Your Surroundings: Secure loose items, trees, and outdoor equipment.</li>
                          <li>Unplug Equipment: Disconnect power to prevent damage from lightning surges.</li>
                          <li>Gather Supplies: Have a dry, safe location ready for shelter.</li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold text-lg mb-2">During Lightning</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li>Seek Shelter Immediately: Go to a building or enclosed car.</li>
                          <li>Stay Inside: Avoid windows, doors, and metal objects.</li>
                          <li>Minimize Risk Indoors: Stay away from electronics and plumbing.</li>
                          <li>Avoid Open Areas: Never stand in open fields or near isolated trees.</li>
                          <li>Avoid Metal Objects: Don&apos;t touch metal poles or fencing.</li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold text-lg mb-2">After Lightning</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li>Seek Medical Help: Check for injuries if struck.</li>
                          <li>Assess Damage: Inspect your property for damage.</li>
                          <li>Document Everything: Take photos for insurance.</li>
                          <li>Contact Authorities: Report any serious incidents.</li>
                          <li>Monitor Weather: Stay alert for follow-up storms.</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Section - 7 Day Forecast and Map */}
      <div className="grid w-full grid-cols-1 gap-4 md:gap-6 lg:grid-cols-12">
        {/* 7 Day Forecast - Takes less space */}
        <div className="lg:col-span-5 xl:col-span-4">
          <Card className="border border-border/50 bg-card shadow-sm h-full">
            <CardHeader className="pb-2 px-4 pt-4 md:px-6 md:pt-6">
              <CardTitle className="text-lg md:text-xl font-bold text-foreground">7-days weather forecast</CardTitle>
            </CardHeader>
            <CardContent className="px-4 pb-4 md:px-6 md:pb-6">
              <ForecastSection />
            </CardContent>
          </Card>
        </div>

        {/* Interactive Weather Map - Takes more space */}
        <div className="lg:col-span-7 xl:col-span-8">
          <div className="relative h-[400px] md:h-[500px] lg:h-full lg:min-h-[500px] rounded-lg overflow-hidden border border-border/50 shadow-sm">
            <InteractiveWeatherMap />
          </div>
        </div>
      </div>
    </div>
  );
}
