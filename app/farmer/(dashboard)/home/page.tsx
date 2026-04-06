import React from 'react';
import { QuickStats } from '@/components/farmer/home/QuickStats';
import { PostCreate } from '@/components/farmer/home/PostCreate';
import { FeedSection } from '@/components/farmer/home/FeedSection';
import { HomeOverview } from '@/components/farmer/home/HomeOverview';

export const metadata = {
  title: 'Home - AgriSathi',
  description: 'Your personalized farming dashboard and feed',
};

export default function HomePage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Welcome back!</h1>
        <p className="text-muted-foreground">Here&apos;s what&apos;s happening in your farming community</p>
      </div>

      {/* Quick Stats */}
      <QuickStats />

      {/* Home Overview - Featured Sections */}
      <HomeOverview />

      {/* Create Post */}
      <PostCreate />

      {/* Feed */}
      <FeedSection />
    </div>
  );
}
