import React from 'react';
import { CommunitiesList } from '@/components/farmer/communities/CommunitiesList';

export const metadata = {
  title: 'Communities - AgriSathi',
  description: 'Join farming communities and connect with other farmers',
};

export default function CommunitiesPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Communities</h1>
        <p className="text-muted-foreground">
          Join farming communities, share experiences, ask questions, and solve problems together with fellow farmers
        </p>
      </div>

      {/* Communities List with Filters */}
      <CommunitiesList />
    </div>
  );
}
