import React from 'react';
import JobsTable from '@/components/admin/jobs/JobsTable';

export default function BackgroundJobsPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Background Jobs</h1>
        <p className="text-muted-foreground mt-2">Monitor and manage background tasks and scheduled jobs.</p>
      </div>

      {/* Jobs Table */}
      <JobsTable />
    </div>
  );
}
