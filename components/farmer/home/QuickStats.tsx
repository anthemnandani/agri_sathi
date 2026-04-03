'use client';

import React from 'react';
import { Cloud, AlertCircle, MessageSquare, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const stats = [
  {
    icon: Cloud,
    label: 'Weather',
    value: '28°C',
    subtext: 'Partly cloudy',
  },
  {
    icon: AlertCircle,
    label: 'Alerts',
    value: '2',
    subtext: 'Moderate rain expected',
  },
  {
    icon: MessageSquare,
    label: 'Messages',
    value: '5',
    subtext: 'Unread messages',
  },
  {
    icon: TrendingUp,
    label: 'Market',
    value: '↑ 12%',
    subtext: 'Crop prices trending up',
  },
];

export function QuickStats() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.label} className="hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-bold text-foreground mt-1">
                    {stat.value}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {stat.subtext}
                  </p>
                </div>
                <div className="rounded-lg bg-accent p-3">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
