'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export function PrivacySettings() {
  const [privacy, setPrivacy] = useState({
    profilePublic: true,
    locationVisible: true,
    showCrops: true,
    allowMessages: true,
    allowFollows: true,
  });

  const handleToggle = (key: string) => {
    setPrivacy({ ...privacy, [key]: !privacy[key] });
  };

  const handleSave = async () => {
    try {
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success('Privacy settings updated');
    } catch (error) {
      toast.error('Failed to update settings');
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Privacy Controls</CardTitle>
          <CardDescription>
            Control who can see your information and interact with you
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-border">
            <div>
              <Label className="font-medium text-foreground">
                Public Profile
              </Label>
              <p className="text-sm text-muted-foreground">
                Anyone can view your profile
              </p>
            </div>
            <Switch
              checked={privacy.profilePublic}
              onCheckedChange={() => handleToggle('profilePublic')}
            />
          </div>

          <div className="flex items-center justify-between py-3 border-b border-border">
            <div>
              <Label className="font-medium text-foreground">
                Show Location
              </Label>
              <p className="text-sm text-muted-foreground">
                Display your location to other farmers
              </p>
            </div>
            <Switch
              checked={privacy.locationVisible}
              onCheckedChange={() => handleToggle('locationVisible')}
            />
          </div>

          <div className="flex items-center justify-between py-3 border-b border-border">
            <div>
              <Label className="font-medium text-foreground">
                Show Crops I Grow
              </Label>
              <p className="text-sm text-muted-foreground">
                Make your crops list visible to others
              </p>
            </div>
            <Switch
              checked={privacy.showCrops}
              onCheckedChange={() => handleToggle('showCrops')}
            />
          </div>

          <div className="flex items-center justify-between py-3 border-b border-border">
            <div>
              <Label className="font-medium text-foreground">
                Allow Direct Messages
              </Label>
              <p className="text-sm text-muted-foreground">
                Let others send you private messages
              </p>
            </div>
            <Switch
              checked={privacy.allowMessages}
              onCheckedChange={() => handleToggle('allowMessages')}
            />
          </div>

          <div className="flex items-center justify-between py-3">
            <div>
              <Label className="font-medium text-foreground">
                Allow Others to Follow You
              </Label>
              <p className="text-sm text-muted-foreground">
                Users can follow your profile
              </p>
            </div>
            <Switch
              checked={privacy.allowFollows}
              onCheckedChange={() => handleToggle('allowFollows')}
            />
          </div>

          <div className="pt-4">
            <Button onClick={handleSave}>Save Privacy Settings</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Data & Privacy</CardTitle>
          <CardDescription>
            Manage your personal data
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button variant="outline" className="w-full">
            Download My Data
          </Button>
          <Button variant="outline" className="w-full">
            View Privacy Policy
          </Button>
          <Button variant="outline" className="w-full">
            View Terms of Service
          </Button>
        </CardContent>
      </Card>

      <Card className="border-destructive">
        <CardHeader>
          <CardTitle className="text-destructive">Block & Report</CardTitle>
          <CardDescription>
            Manage blocked users and safety
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button variant="outline" className="w-full">
            Manage Blocked Users
          </Button>
          <Button variant="destructive" className="w-full">
            Report Abuse
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
