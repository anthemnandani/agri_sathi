import React from 'react';
import { CommunitiesList } from '@/components/farmer/communities/CommunitiesList';
import { TopFarmersSection } from '@/components/farmer/communities/TopFarmersSection';
import { AgricultureEventsSection } from '@/components/farmer/communities/AgricultureEventsSection';

export const metadata = {
  title: 'Communities - AgriSathi',
  description: 'Join farming communities and connect with other farmers',
};

export default function CommunitiesPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Communities</h1>
        <p className="text-muted-foreground">
          Join communities, share experiences, and learn from fellow farmers
        </p>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Agriculture Events */}
          <AgricultureEventsSection />
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-6">
          {/* Top Farmers */}
          <TopFarmersSection />
          
          {/* Explore Communities */}
          <CommunitiesList compact />
        </div>
      </div>
    </div>
  );
}
