'use client';

import React, { useState } from 'react';
import { CurrentWeather } from '@/components/farmer/weather/CurrentWeather';
import { ForecastSection } from '@/components/farmer/weather/ForecastSection';
import { AlertsSection } from '@/components/farmer/weather/AlertsSection';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Cloud, Phone, WifiOff } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export function WeatherPageContent() {
  const [smsEnabled, setSmsEnabled] = useState(false);
  const [showOfflineModal, setShowOfflineModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    registerFor: 'self',
  });
  const [offlineFormData, setOfflineFormData] = useState({
    name: '',
    phone: '',
    address: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [offlineSubmitted, setOfflineSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [offlineLoading, setOfflineLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setLoading(false);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', phone: '', email: '', address: '', registerFor: 'self' });
    }, 3000);
  };

  const handleOfflineInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setOfflineFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOfflineSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setOfflineLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setOfflineLoading(false);
    setOfflineSubmitted(true);
    setTimeout(() => {
      setOfflineSubmitted(false);
      setOfflineFormData({ name: '', phone: '', address: '' });
      setShowOfflineModal(false);
    }, 3000);
  };

  return (
    <>
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

      {/* Alerts Registration & Safety Guide */}
      <Tabs defaultValue="register" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="register">Register for Alerts</TabsTrigger>
          <TabsTrigger value="safety">Safety Guide</TabsTrigger>
        </TabsList>

        {/* Registration Tab */}
        <TabsContent value="register" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Registration Form */}
            <Card>
              <CardHeader>
                <CardTitle>Sign Up for Weather Alerts</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {submitted && (
                    <Alert className="bg-green-50 border-green-200 text-green-800 dark:bg-green-950 dark:border-green-800 dark:text-green-200">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        Registration successful! You&apos;ll receive alerts via {smsEnabled ? 'SMS and Email' : 'Email'}
                      </AlertDescription>
                    </Alert>
                  )}

                  <div>
                    <Label htmlFor="name">Your Name</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="Enter your phone number"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="address">Farm Address</Label>
                    <Input
                      id="address"
                      name="address"
                      placeholder="Enter your farm address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  {/* SMS Notification Toggle */}
                  <Card className="bg-accent/50 border border-accent">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Phone className="h-5 w-5 text-primary" />
                          <div>
                            <Label className="cursor-pointer text-base font-medium">
                              Enable SMS Alerts
                            </Label>
                            <p className="text-xs text-muted-foreground mt-1">
                              Receive urgent weather alerts via SMS (charges may apply)
                            </p>
                          </div>
                        </div>
                        <Checkbox
                          checked={smsEnabled}
                          onCheckedChange={(checked) =>
                            setSmsEnabled(checked as boolean)
                          }
                        />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Register For */}
                  <div className="space-y-3">
                    <Label>Register for</Label>
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
                    {loading ? 'Registering...' : 'Register for Alerts'}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Information Section */}
            <div className="space-y-6">
              {/* Alert Types */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Cloud className="h-5 w-5" />
                    Types of Alerts
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    {
                      title: 'Heavy Rainfall',
                      description: 'Alerts for excessive rainfall and waterlogging',
                    },
                    {
                      title: 'Frost/Cold Wave',
                      description: 'Protection for frost-sensitive crops',
                    },
                    {
                      title: 'Strong Winds',
                      description: 'Warnings for damaging wind speeds',
                    },
                    {
                      title: 'Lightning Risk',
                      description: 'Safety alerts during thunderstorms',
                    },
                  ].map((alert, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-lg bg-muted border border-border"
                    >
                      <p className="font-semibold text-sm text-foreground">
                        {alert.title}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {alert.description}
                      </p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Benefits */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Benefits</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {[
                    'Real-time alerts to protect your crops',
                    'Local and specific to your area',
                    'Actionable guidance for each alert',
                    'Multilingual support (English & Hindi)',
                    'Free basic alerts',
                  ].map((benefit, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <div className="h-2 w-2 rounded-full bg-primary mt-2" />
                      <p className="text-sm text-muted-foreground">{benefit}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Offline Alert Card */}
          <Card className="bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-orange-950 dark:to-yellow-950 border-orange-200 dark:border-orange-800">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <WifiOff className="h-8 w-8 text-orange-600 dark:text-orange-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Offline SMS Alerts
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Receive critical weather alerts even when you&apos;re offline. Enable SMS alerts to get important warnings directly on your phone.
                  </p>
                  <Dialog open={showOfflineModal} onOpenChange={setShowOfflineModal}>
                    <DialogTrigger asChild>
                      <Button className="bg-orange-600 hover:bg-orange-700 text-white">
                        <Phone className="h-4 w-4 mr-2" />
                        Enable SMS Alert
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>Register for Offline SMS Alerts</DialogTitle>
                      </DialogHeader>
                      <form onSubmit={handleOfflineSubmit} className="space-y-4">
                        {offlineSubmitted && (
                          <Alert className="bg-green-50 border-green-200 text-green-800 dark:bg-green-950 dark:border-green-800 dark:text-green-200">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>
                              SMS alerts enabled successfully! You&apos;ll receive weather warnings via SMS.
                            </AlertDescription>
                          </Alert>
                        )}

                        <div>
                          <Label htmlFor="offline-name">Your Name</Label>
                          <Input
                            id="offline-name"
                            name="name"
                            placeholder="Enter your name"
                            value={offlineFormData.name}
                            onChange={handleOfflineInputChange}
                            required
                          />
                        </div>

                        <div>
                          <Label htmlFor="offline-phone">Phone Number</Label>
                          <Input
                            id="offline-phone"
                            name="phone"
                            type="tel"
                            placeholder="Enter your phone number"
                            value={offlineFormData.phone}
                            onChange={handleOfflineInputChange}
                            required
                          />
                        </div>

                        <div>
                          <Label htmlFor="offline-address">Farm Address</Label>
                          <Input
                            id="offline-address"
                            name="address"
                            placeholder="Enter your farm address"
                            value={offlineFormData.address}
                            onChange={handleOfflineInputChange}
                            required
                          />
                        </div>

                        <Button
                          type="submit"
                          className="w-full bg-orange-600 hover:bg-orange-700"
                          disabled={offlineLoading}
                        >
                          {offlineLoading ? 'Registering...' : 'Register for SMS Alerts'}
                        </Button>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Safety Guide Tab */}
        <TabsContent value="safety" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Lightning Safety Guide</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold text-lg mb-3">Before Lightning</h3>
                <div className="space-y-2">
                  {[
                    'Stay Informed: Monitor weather forecasts and updates',
                    'Look for signs: Dark clouds and strong winds',
                    'Prepare Your Surroundings: Secure loose items',
                    'Unplug Equipment: Disconnect power to prevent damage',
                    'Gather Supplies: Have a dry, safe location ready',
                  ].map((step, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <span className="font-bold text-primary min-w-fit">
                        {idx + 1}.
                      </span>
                      <p className="text-sm text-muted-foreground">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-border pt-6">
                <h3 className="font-semibold text-lg mb-3">During Lightning</h3>
                <div className="space-y-2">
                  {[
                    'Seek Shelter Immediately: Go to a building or car',
                    'Stay Inside: Avoid windows, doors, and metal objects',
                    'Minimize Risk Indoors: Stay away from electronics',
                    'Avoid Open Areas: Never stand in open fields',
                    'Avoid Metal Objects: Don&apos;t touch metal poles or fencing',
                  ].map((step, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <span className="font-bold text-destructive min-w-fit">
                        {idx + 1}.
                      </span>
                      <p className="text-sm text-muted-foreground">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-border pt-6">
                <h3 className="font-semibold text-lg mb-3">After Lightning</h3>
                <div className="space-y-2">
                  {[
                    'Seek Medical Help: Check for injuries if struck',
                    'Assess Damage: Inspect your property for damage',
                    'Document Everything: Take photos for insurance',
                    'Contact Authorities: Report any serious incidents',
                    'Monitor Weather: Stay alert for follow-up storms',
                  ].map((step, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <span className="font-bold text-green-600 min-w-fit">
                        {idx + 1}.
                      </span>
                      <p className="text-sm text-muted-foreground">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
}
