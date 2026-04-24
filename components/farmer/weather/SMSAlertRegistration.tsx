'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, CheckCircle } from 'lucide-react';

export function SMSAlertRegistration() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    pincode: '800001',
    address: 'Bihar, Supaul',
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
    
    try {
      const response = await fetch('/api/weather/sms-alert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to register for SMS alerts');
      }

      setLoading(false);
      setSubmitted(true);
      
      // Redirect back to weather page after success
      setTimeout(() => {
        router.push('/farmer/(dashboard)/weather');
      }, 2000);
    } catch (error) {
      console.error('Error registering for SMS alerts:', error);
      setLoading(false);
      // TODO: Show error message to user
    }
  };

  const handleBack = () => {
    router.back();
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center p-4 sm:p-6">
        <Card className="w-full max-w-sm border-2 border-green-200 bg-green-50 dark:bg-green-950/30">
          <CardContent className="pt-8 sm:pt-12 pb-8 sm:pb-12 px-4 sm:px-6 flex flex-col items-center text-center space-y-3 sm:space-y-4">
            <div className="w-14 sm:w-16 h-14 sm:h-16 rounded-full bg-green-200 dark:bg-green-900 flex items-center justify-center flex-shrink-0">
              <CheckCircle className="w-7 sm:w-8 h-7 sm:h-8 text-green-600" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-green-700 dark:text-green-400">Success!</h2>
            <p className="text-sm sm:text-base text-green-600 dark:text-green-400">
              Registration successful! You&apos;ll receive weather alerts via SMS at {formData.phone}
            </p>
            <p className="text-xs sm:text-sm text-green-500 dark:text-green-500">
              Redirecting you back...
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted py-6 sm:py-8 px-3 sm:px-4 md:px-6">
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={handleBack}
          className="mb-4 sm:mb-6 text-sm sm:text-base"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Weather
        </Button>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
          {/* Left Column - Registration Form */}
          <Card className="border-2 border-foreground/10 bg-gradient-to-br from-background to-muted">
            <CardHeader className="pb-3 sm:pb-4 px-4 sm:px-6">
              <CardTitle className="text-xl sm:text-2xl font-bold">Registration</CardTitle>
              <p className="text-xs sm:text-sm text-muted-foreground mt-2">
                Register and receive early warnings of lightning in your area. You can also register for your friends and family.
              </p>
            </CardHeader>
            <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6">
              <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                <div>
                  <Label htmlFor="name" className="text-xs sm:text-sm font-medium">
                    Enter your name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Enter your name ...."
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="mt-1.5 sm:mt-2 text-sm"
                  />
                </div>

                <div>
                  <Label htmlFor="phone" className="text-xs sm:text-sm font-medium">
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
                    className="mt-1.5 sm:mt-2 text-sm"
                  />
                </div>

                <div>
                  <Label htmlFor="pincode" className="text-xs sm:text-sm font-medium">
                    Enter your pincode
                  </Label>
                  <Input
                    id="pincode"
                    name="pincode"
                    placeholder="Enter your pincode ...."
                    value={formData.pincode}
                    onChange={handleInputChange}
                    required
                    className="mt-1.5 sm:mt-2 text-sm"
                  />
                </div>

                <div>
                  <Label htmlFor="address" className="text-xs sm:text-sm font-medium">
                    Enter your address
                  </Label>
                  <textarea
                    id="address"
                    name="address"
                    placeholder="Enter your address ...."
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    className="mt-1.5 sm:mt-2 w-full px-3 py-2 text-sm rounded-md border border-input bg-background text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="occupation" className="text-xs sm:text-sm font-medium">
                    Occupation
                  </Label>
                  <Input
                    id="occupation"
                    name="occupation"
                    placeholder="Enter your occupation ...."
                    value={formData.occupation}
                    onChange={handleInputChange}
                    className="mt-1.5 sm:mt-2 text-sm"
                  />
                </div>

                <div className="space-y-2 sm:space-y-3">
                  <Label className="text-xs sm:text-sm font-medium">Register for</Label>
                  <div className="space-y-1.5 sm:space-y-2">
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
                          className="ml-2 cursor-pointer font-normal text-xs sm:text-sm"
                        >
                          {option.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-white text-sm sm:text-base"
                  disabled={loading}
                  size="lg"
                >
                  {loading ? 'Registering...' : 'Submit'}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Right Column - Lightning Safety Guide */}
          <Card className="border-2 border-foreground/10 bg-gradient-to-br from-background to-muted">
            <CardHeader className="pb-3 sm:pb-4 px-4 sm:px-6">
              <CardTitle className="text-xl sm:text-2xl font-bold">Lightning Safety</CardTitle>
              <p className="text-xs sm:text-sm text-muted-foreground mt-2">
                Essential tips to stay safe before during and after lightning strikes and thunderstorms.
              </p>
            </CardHeader>
            <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6">
              <div className="space-y-4 sm:space-y-6 max-h-[500px] sm:max-h-[600px] overflow-y-auto pr-2 sm:pr-4">
                <div>
                  <h4 className="font-semibold text-base sm:text-lg mb-2 sm:mb-3 text-foreground">Before Lightning</h4>
                  <div className="space-y-1.5 sm:space-y-2">
                    <div className="flex gap-2 sm:gap-3">
                      <span className="text-primary font-bold text-xs sm:text-sm min-w-5">1.</span>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        <strong>Stay Informed:</strong> Monitor weather forecasts and updates through apps or radio.
                      </p>
                    </div>
                    <div className="flex gap-2 sm:gap-3">
                      <span className="text-primary font-bold text-xs sm:text-sm min-w-5">2.</span>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        <strong>Look for signs:</strong> Dark clouds and strong winds indicate an approaching storm.
                      </p>
                    </div>
                    <div className="flex gap-2 sm:gap-3">
                      <span className="text-primary font-bold text-xs sm:text-sm min-w-5">3.</span>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        <strong>Prepare Your Surroundings:</strong> Secure loose items, trees, and outdoor equipment.
                      </p>
                    </div>
                    <div className="flex gap-2 sm:gap-3">
                      <span className="text-primary font-bold text-xs sm:text-sm min-w-5">4.</span>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        <strong>Unplug Equipment:</strong> Disconnect power to prevent damage from lightning surges.
                      </p>
                    </div>
                    <div className="flex gap-2 sm:gap-3">
                      <span className="text-primary font-bold text-xs sm:text-sm min-w-5">5.</span>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        <strong>Gather Supplies:</strong> Have a dry, safe location ready for shelter.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-3 sm:pt-4">
                  <h4 className="font-semibold text-base sm:text-lg mb-2 sm:mb-3 text-foreground">During Lightning</h4>
                  <div className="space-y-1.5 sm:space-y-2">
                    <div className="flex gap-2 sm:gap-3">
                      <span className="text-primary font-bold text-xs sm:text-sm min-w-5">1.</span>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        <strong>Seek Shelter Immediately:</strong> Go to a building or enclosed car.
                      </p>
                    </div>
                    <div className="flex gap-2 sm:gap-3">
                      <span className="text-primary font-bold text-xs sm:text-sm min-w-5">2.</span>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        <strong>Stay Inside:</strong> Avoid windows, doors, and metal objects.
                      </p>
                    </div>
                    <div className="flex gap-2 sm:gap-3">
                      <span className="text-primary font-bold text-xs sm:text-sm min-w-5">3.</span>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        <strong>Minimize Risk Indoors:</strong> Stay away from electronics and plumbing.
                      </p>
                    </div>
                    <div className="flex gap-2 sm:gap-3">
                      <span className="text-primary font-bold text-xs sm:text-sm min-w-5">4.</span>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        <strong>Avoid Open Areas:</strong> Never stand in open fields or near isolated trees.
                      </p>
                    </div>
                    <div className="flex gap-2 sm:gap-3">
                      <span className="text-primary font-bold text-xs sm:text-sm min-w-5">5.</span>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        <strong>Avoid Metal Objects:</strong> Don&apos;t touch metal poles or fencing.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-3 sm:pt-4">
                  <h4 className="font-semibold text-base sm:text-lg mb-2 sm:mb-3 text-foreground">After Lightning</h4>
                  <div className="space-y-1.5 sm:space-y-2">
                    <div className="flex gap-2 sm:gap-3">
                      <span className="text-primary font-bold text-xs sm:text-sm min-w-5">1.</span>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        <strong>Seek Medical Help:</strong> Check for injuries if struck.
                      </p>
                    </div>
                    <div className="flex gap-2 sm:gap-3">
                      <span className="text-primary font-bold text-xs sm:text-sm min-w-5">2.</span>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        <strong>Assess Damage:</strong> Inspect your property for damage.
                      </p>
                    </div>
                    <div className="flex gap-2 sm:gap-3">
                      <span className="text-primary font-bold text-xs sm:text-sm min-w-5">3.</span>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        <strong>Document Everything:</strong> Take photos for insurance.
                      </p>
                    </div>
                    <div className="flex gap-2 sm:gap-3">
                      <span className="text-primary font-bold text-xs sm:text-sm min-w-5">4.</span>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        <strong>Contact Authorities:</strong> Report any serious incidents.
                      </p>
                    </div>
                    <div className="flex gap-2 sm:gap-3">
                      <span className="text-primary font-bold text-xs sm:text-sm min-w-5">5.</span>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        <strong>Monitor Weather:</strong> Stay alert for follow-up storms.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
