'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const notificationOptions = [
  { id: 'likes', label: 'Likes & Reactions', description: 'When someone likes your posts' },
  { id: 'comments', label: 'Comments', description: 'When someone comments on your posts' },
  { id: 'messages', label: 'Messages', description: 'New direct messages' },
  { id: 'weather', label: 'Weather Alerts', description: 'Important weather information' },
  { id: 'marketplace', label: 'Marketplace Activity', description: 'New product inquiries and offers' },
  { id: 'schemes', label: 'Government Schemes', description: 'New schemes and subsidy updates' },
];

export function NotificationSettings() {
  const [settings, setSettings] = useState(
    notificationOptions.reduce((acc, opt) => ({ ...acc, [opt.id]: true }), {})
  );

  const handleSave = async () => {
    try {
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success('Notification settings updated');
    } catch (error) {
      toast.error('Failed to update settings');
    }
  };

  const handleToggle = (id: string) => {
    setSettings({ ...settings, [id]: !settings[id] });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Push Notifications</CardTitle>
          <CardDescription>
            Choose which notifications you want to receive
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {notificationOptions.map((option) => (
            <div
              key={option.id}
              className="flex items-center justify-between py-3 border-b border-border last:border-0"
            >
              <div>
                <Label className="font-medium text-foreground">
                  {option.label}
                </Label>
                <p className="text-sm text-muted-foreground">
                  {option.description}
                </p>
              </div>
              <Switch
                checked={settings[option.id]}
                onCheckedChange={() => handleToggle(option.id)}
              />
            </div>
          ))}

          <div className="pt-4">
            <Button onClick={handleSave}>Save Preferences</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Email Notifications</CardTitle>
          <CardDescription>
            Manage email notification frequency
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email-freq">Email Frequency</Label>
            <select
              id="email-freq"
              className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
              defaultValue="daily"
            >
              <option value="realtime">Real-time</option>
              <option value="daily">Daily digest</option>
              <option value="weekly">Weekly digest</option>
              <option value="never">Never</option>
            </select>
          </div>
          <Button onClick={handleSave}>Save Preferences</Button>
        </CardContent>
      </Card>
    </div>
  );
}
