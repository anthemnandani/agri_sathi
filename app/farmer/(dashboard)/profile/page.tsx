import React from 'react';
import { ProfileHeader } from '@/components/farmer/profile/ProfileHeader';
import { ProfileStats } from '@/components/farmer/profile/ProfileStats';
import { ProfileAbout } from '@/components/farmer/profile/ProfileAbout';
import { PostCreate } from '@/components/farmer/home/PostCreate';

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

      {/* Create Post Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-foreground mb-4">Share Something</h2>
        <PostCreate />
      </div>

      {/* About Section */}
      <ProfileAbout />
    </div>
  );
}
