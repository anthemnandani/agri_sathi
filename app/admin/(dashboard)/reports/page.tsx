import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import MetricsCard from '@/components/admin/reports/MetricsCard';
import ReportGenerator from '@/components/admin/reports/ReportGenerator';
import { Download, TrendingUp } from 'lucide-react';

export default function ReportsPage() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Reports & Analytics</h1>
        <p className="text-muted-foreground mt-2">Platform analytics and detailed performance reports.</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricsCard
          label="Total Users"
          value="12,456"
          change="+8.2%"
          trend="up"
        />
        <MetricsCard
          label="Revenue"
          value="₹42,48,900"
          change="+12.5%"
          trend="up"
        />
        <MetricsCard
          label="Active Products"
          value="3,842"
          change="+5.1%"
          trend="up"
        />
        <MetricsCard
          label="Transactions"
          value="8,234"
          change="+23.1%"
          trend="up"
        />
      </div>

      {/* Report Generator */}
      <ReportGenerator />
    </div>
  );
}
