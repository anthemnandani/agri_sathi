'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, ArrowLeft, CheckCircle } from 'lucide-react';

// Mock user data - in production, this would come from authentication/database
const mockUserData = {
  name: 'Rajesh Kumar',
  phone: '9876543210',
  pincode: '800001',
  location: 'Bihar, Supaul',
  occupation: 'Farmer',
};

export function SMSAlertRegistration() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: mockUserData.name,
    phone: mockUserData.phone,
    pincode: mockUserData.pincode,
    address: mockUserData.location,
    occupation: mockUserData.occupation,
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
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setLoading(false);
    setSubmitted(true);
    
    // Redirect back to weather page after success
    setTimeout(() => {
      router.push('/farmer/(dashboard)/weather');
    }, 2000);
  };

  const handleBack = () => {
    router.back();
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center p-4">
        <Card className="w-full max-w-md border-2 border-green-200 bg-green-50 dark:bg-green-950/30">
          <CardContent className="pt-12 pb-12 flex flex-col items-center text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-green-200 dark:bg-green-900 flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-green-700 dark:text-green-400">Success!</h2>
            <p className="text-green-600 dark:text-green-400">
              Registration successful! You&apos;ll receive weather alerts via SMS at {formData.phone}
            </p>
            <p className="text-sm text-green-500 dark:text-green-500">
              Redirecting you back...
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={handleBack}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Weather
        </Button>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Registration Form */}
          <Card className="border-2 border-foreground/10 bg-gradient-to-br from-background to-muted">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl font-bold">Registration</CardTitle>
              <p className="text-sm text-muted-foreground mt-2">
                Register and receive early warnings of lightning in your area. You can also register for your friends and family.
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
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
                    className="mt-2 w-full px-3 py-2 rounded-md border border-input bg-background text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
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
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white"
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
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl font-bold">Lightning Safety</CardTitle>
              <p className="text-sm text-muted-foreground mt-2">
                Essential tips to stay safe before during and after lightning strikes and thunderstorms.
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-6 max-h-[600px] overflow-y-auto pr-4">
                <div>
                  <h4 className="font-semibold text-lg mb-3 text-foreground">Before Lightning</h4>
                  <div className="space-y-2">
                    <div className="flex gap-3">
                      <span className="text-primary font-bold min-w-6">1.</span>
                      <p className="text-sm text-muted-foreground">
                        <strong>Stay Informed:</strong> Monitor weather forecasts and updates through apps or radio.
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <span className="text-primary font-bold min-w-6">2.</span>
                      <p className="text-sm text-muted-foreground">
                        <strong>Look for signs:</strong> Dark clouds and strong winds indicate an approaching storm.
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <span className="text-primary font-bold min-w-6">3.</span>
                      <p className="text-sm text-muted-foreground">
                        <strong>Prepare Your Surroundings:</strong> Secure loose items, trees, and outdoor equipment.
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <span className="text-primary font-bold min-w-6">4.</span>
                      <p className="text-sm text-muted-foreground">
                        <strong>Unplug Equipment:</strong> Disconnect power to prevent damage from lightning surges.
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <span className="text-primary font-bold min-w-6">5.</span>
                      <p className="text-sm text-muted-foreground">
                        <strong>Gather Supplies:</strong> Have a dry, safe location ready for shelter.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-semibold text-lg mb-3 text-foreground">During Lightning</h4>
                  <div className="space-y-2">
                    <div className="flex gap-3">
                      <span className="text-primary font-bold min-w-6">1.</span>
                      <p className="text-sm text-muted-foreground">
                        <strong>Seek Shelter Immediately:</strong> Go to a building or enclosed car.
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <span className="text-primary font-bold min-w-6">2.</span>
                      <p className="text-sm text-muted-foreground">
                        <strong>Stay Inside:</strong> Avoid windows, doors, and metal objects.
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <span className="text-primary font-bold min-w-6">3.</span>
                      <p className="text-sm text-muted-foreground">
                        <strong>Minimize Risk Indoors:</strong> Stay away from electronics and plumbing.
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <span className="text-primary font-bold min-w-6">4.</span>
                      <p className="text-sm text-muted-foreground">
                        <strong>Avoid Open Areas:</strong> Never stand in open fields or near isolated trees.
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <span className="text-primary font-bold min-w-6">5.</span>
                      <p className="text-sm text-muted-foreground">
                        <strong>Avoid Metal Objects:</strong> Don&apos;t touch metal poles or fencing.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-semibold text-lg mb-3 text-foreground">After Lightning</h4>
                  <div className="space-y-2">
                    <div className="flex gap-3">
                      <span className="text-primary font-bold min-w-6">1.</span>
                      <p className="text-sm text-muted-foreground">
                        <strong>Seek Medical Help:</strong> Check for injuries if struck.
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <span className="text-primary font-bold min-w-6">2.</span>
                      <p className="text-sm text-muted-foreground">
                        <strong>Assess Damage:</strong> Inspect your property for damage.
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <span className="text-primary font-bold min-w-6">3.</span>
                      <p className="text-sm text-muted-foreground">
                        <strong>Document Everything:</strong> Take photos for insurance.
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <span className="text-primary font-bold min-w-6">4.</span>
                      <p className="text-sm text-muted-foreground">
                        <strong>Contact Authorities:</strong> Report any serious incidents.
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <span className="text-primary font-bold min-w-6">5.</span>
                      <p className="text-sm text-muted-foreground">
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
