import React from 'react';
import { ProfileHeader } from '@/components/farmer/profile/ProfileHeader';
import { ProfileStats } from '@/components/farmer/profile/ProfileStats';
import { ProfileAbout } from '@/components/farmer/profile/ProfileAbout';

export const metadata = {
  title: 'My Profile - AgriSathi',
  description: 'View and edit your farmer profile',
};

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <ProfileHeader />

      {/* Profile Stats */}
      <ProfileStats />

      {/* About Section */}
      <ProfileAbout />
    </div>
  );
}
