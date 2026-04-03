import React from 'react';
import AlertsTable from '@/components/admin/weather/AlertsTable';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export default function WeatherAlertsPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Weather Alerts</h1>
          <p className="text-muted-foreground mt-2">Create and manage weather alerts for farmers.</p>
        </div>
        <Button className="gap-2">
          <Plus size={16} />
          New Alert
        </Button>
      </div>

      {/* Alerts Table */}
      <AlertsTable />
    </div>
  );
}
