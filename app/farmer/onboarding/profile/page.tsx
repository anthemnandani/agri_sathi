import React from 'react';
import { OnboardingForm } from '@/components/farmer/auth/OnboardingForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata = {
  title: 'Complete Your Profile - AgriSathi',
  description: 'Set up your farmer profile to get started',
};

export default function OnboardingPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <Card className="w-full max-w-lg">
        <CardHeader className="space-y-2 text-center">
          <div className="flex justify-center">
            <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-green-600 to-green-800" />
          </div>
          <CardTitle className="text-2xl">Complete Your Profile</CardTitle>
          <CardDescription>
            Help us know more about you to provide better recommendations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <OnboardingForm />
        </CardContent>
      </Card>
    </div>
  );
}
