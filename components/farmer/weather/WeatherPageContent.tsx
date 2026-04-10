'use client';

import React, { useState } from 'react';
import { CurrentWeather } from '@/components/farmer/weather/CurrentWeather';
import { ForecastSection } from '@/components/farmer/weather/ForecastSection';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Phone, WifiOff, Cloud, CloudRain, Wind, Droplets, Sun, Moon } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export function WeatherPageContent() {
  const [offlineAlertsEnabled, setOfflineAlertsEnabled] = useState(false);
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

  const handleOfflineToggle = (enabled: boolean) => {
    setOfflineAlertsEnabled(enabled);
    if (enabled) {
      setShowRegistrationModal(true);
    }
  };

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
        <Card className="border-2 border-foreground/10 bg-gradient-to-br from-background to-muted lg:col-span-1">
          <CardHeader className="pb-3">
            <CardTitle className="text-xl font-bold">Real Time Weather</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <CurrentWeather />
          </CardContent>
        </Card>

        {/* Middle Column - Weather Alerts */}
        <Card className="border-2 border-foreground/10 bg-gradient-to-br from-background to-muted lg:col-span-1">
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
        <Card className="border-2 border-orange-300 bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-orange-950/30 dark:to-yellow-950/30 lg:col-span-1">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-bold">Offline SMS alert</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Enable SMS Alert
            </p>
            <p className="text-xs text-muted-foreground">
              Receive critical weather alerts even when you&apos;re offline
            </p>
            <Dialog open={showRegistrationModal} onOpenChange={setShowRegistrationModal}>
              <DialogTrigger asChild>
                <Button
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white"
                  onClick={() => handleOfflineToggle(true)}
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Enable SMS Alert
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
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
                            <AlertDescription>
                              Registration successful! You'll receive alerts via SMS.
                            </AlertDescription>
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
                            className="mt-2 w-full min-h-[80px] p-2 border border-input rounded-md bg-background text-foreground"
                          />
                        </div>

                        <div>
                          <Label htmlFor="occupation" className="text-sm font-medium">
                            Occupation
                          </Label>
                          <Input
                            id="occupation"
                            name="occupation"
                            placeholder="Occupation ...."
                            value={formData.occupation}
                            onChange={handleInputChange}
                            className="mt-2"
                          />
                        </div>

                        {/* Register For */}
                        <div className="space-y-3">
                          <Label className="text-sm font-medium">Register for</Label>
                          <div className="flex items-center gap-6">
                            {[
                              { value: 'self', label: 'Self' },
                              { value: 'family', label: 'Friend/Family' },
                            ].map((option) => (
                              <div key={option.value} className="flex items-center gap-2">
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
                                <Label htmlFor={option.value} className="font-normal cursor-pointer">
                                  {option.label}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </div>

                        <Button
                          type="submit"
                          className="w-full bg-foreground text-background hover:bg-foreground/90"
                          disabled={loading}
                          size="lg"
                        >
                          {loading ? 'Submitting...' : 'Submit'}
                        </Button>
                      </form>
                  </div>

                  {/* Safety Guide */}
                  <div className="space-y-4">
                      <div>
                        <h3 className="text-xl font-bold mb-3">Lightning Safety</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Essential tips to stay safe before and during lightning strikes and thunderstorms.
                        </p>
                      </div>

                      <div className="space-y-4">
                        {/* Before Lightning */}
                        <div>
                          <h4 className="font-bold text-sm mb-2">Before Lightning</h4>
                          <div className="space-y-2">
                            <div>
                              <p className="text-xs font-semibold text-foreground mb-1">What to Do</p>
                              <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
                                <li>Stay Informed: Monitor weather forecasts and updates through apps or radio.</li>
                                <li>Look for signs: Dark clouds and strong winds.</li>
                                <li>Prepare Your Surroundings: Secure loose items.</li>
                                <li>Unplug Equipment: Disconnect power to prevent damage from power surges.</li>
                                <li>Gather Supplies: Have a dry, safe location ready.</li>
                              </ul>
                            </div>
                            <div>
                              <p className="text-xs font-semibold text-foreground mb-1">What Not to Do</p>
                              <ol className="text-xs text-muted-foreground space-y-1 list-decimal list-inside">
                                <li>Don&apos;t ignore weather alerts or warning signs.</li>
                                <li>Avoid planning outdoor activities if lightning is forecasted.</li>
                              </ol>
                            </div>
                          </div>
                        </div>

                        {/* During Lightning */}
                        <div className="border-t pt-4">
                          <h4 className="font-bold text-sm mb-2">During Lightning</h4>
                          <div className="space-y-2">
                            <div>
                              <p className="text-xs font-semibold text-foreground mb-1">What to Do</p>
                              <ol className="text-xs text-muted-foreground space-y-1 list-decimal list-inside">
                                <li>Seek Shelter Immediately: Go to a building or car.</li>
                                <li>Stay Inside: Avoid windows and doors.</li>
                                <li>Minimize Risk Indoors: Stay away from electronics and walls.</li>
                                <li>If Outdoors: Crouch down with feet together and minimize contact with the ground.</li>
                              </ol>
                            </div>
                            <div>
                              <p className="text-xs font-semibold text-foreground mb-1">What Not to Do</p>
                              <ol className="text-xs text-muted-foreground space-y-1 list-decimal list-inside">
                                <li>Avoid Open Areas: Never stand in open fields.</li>
                                <li>Avoid Metal Objects: Don&apos;t touch metal poles or fencing.</li>
                                <li>Stay away From Water: Avoid swimming or boating in pools.</li>
                                <li>Don&apos;t Use Phones: Avoid using wired electronics and appliances.</li>
                              </ol>
                            </div>
                          </div>
                        </div>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Section - 2 Columns */}
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

        {/* Map Placeholder */}
        <Card className="border-2 border-foreground/10 overflow-hidden">
          <div className="w-full h-full min-h-[400px] bg-gradient-to-b from-blue-300 to-green-200 relative flex items-center justify-center">
            <div className="text-center">
              <Cloud className="h-16 w-16 text-blue-600 mx-auto mb-3 opacity-50" />
              <p className="text-sm text-muted-foreground">Map of India</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
