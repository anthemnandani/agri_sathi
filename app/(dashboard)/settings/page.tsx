import React from 'react';
import { SettingsSection } from '@/components/farmer/settings/SettingsSection';

export const metadata = {
  title: 'Settings - AgriSathi',
  description: 'Manage your account settings and preferences',
};

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account, preferences, and security settings
        </p>
      </div>

      {/* Settings */}
      <SettingsSection />
    </div>
  );
}
