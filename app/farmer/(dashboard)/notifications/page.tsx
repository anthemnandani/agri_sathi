import React from 'react';
import { NotificationsCenter } from '@/components/farmer/notifications/NotificationsCenter';

export const metadata = {
  title: 'Notifications - AgriSathi',
  description: 'Your notification center',
};

export default function NotificationsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Notifications</h1>
        <p className="text-muted-foreground">
          Stay updated with all your alerts and messages
        </p>
      </div>

      {/* Notifications */}
      <NotificationsCenter />
    </div>
  );
}
