import React from 'react';
import StatsCard from '@/components/admin/dashboard/StatsCard';
import RevenueChart from '@/components/admin/dashboard/RevenueChart';
import UserGrowthChart from '@/components/admin/dashboard/UserGrowthChart';
import ActivityLog from '@/components/admin/dashboard/ActivityLog';
import QuickActions from '@/components/admin/dashboard/QuickActions';
import { TrendingUp, Users, ShoppingCart, MessageSquare } from 'lucide-react';

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-2">Welcome back! Here&apos;s an overview of your platform performance.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Revenue"
          value="₹4,24,890"
          change="+12.5%"
          trend="up"
          icon={TrendingUp}
          color="emerald"
        />
        <StatsCard
          title="Active Users"
          value="12,456"
          change="+8.2%"
          trend="up"
          icon={Users}
          color="blue"
        />
        <StatsCard
          title="Products Sold"
          value="3,842"
          change="+23.1%"
          trend="up"
          icon={ShoppingCart}
          color="green"
        />
        <StatsCard
          title="Community Posts"
          value="8,234"
          change="+15.3%"
          trend="up"
          icon={MessageSquare}
          color="purple"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueChart />
        <UserGrowthChart />
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ActivityLog />
        </div>
        <QuickActions />
      </div>
    </div>
  );
}
