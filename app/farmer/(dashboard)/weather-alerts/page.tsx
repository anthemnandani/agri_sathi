'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Cloud, Phone } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function WeatherAlertsPage() {
  const [smsEnabled, setSmsEnabled] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    registerFor: 'self',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Weather Alerts</h1>
        <p className="text-muted-foreground">
          Register for real-time weather alerts and critical agricultural warnings
        </p>
      </div>

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
                        Registration successful! You'll receive alerts via {smsEnabled ? 'SMS and Email' : 'Email'}
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
    </div>
  );
}
