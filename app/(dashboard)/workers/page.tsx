import React from 'react';
import { WorkersList } from '@/components/farmer/workers/WorkersList';

export const metadata = {
  title: 'Workers & Services - AgriSathi',
  description: 'Find and hire agricultural workers and service providers',
};

export default function WorkersPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Workers & Services</h1>
        <p className="text-muted-foreground">
          Find and hire skilled workers, equipment operators, and service providers
        </p>
      </div>

      {/* Workers List */}
      <WorkersList />
    </div>
  );
}
