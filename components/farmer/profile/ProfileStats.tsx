'use client';

import React from 'react';
import {
  ShoppingCart,
  Heart,
  MessageSquare,
  Award,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const stats = [
  {
    icon: ShoppingCart,
    label: 'Products Listed',
    value: '12',
    color: 'bg-blue-100 text-blue-600',
  },
  {
    icon: Heart,
    label: 'Liked Posts',
    value: '48',
    color: 'bg-red-100 text-red-600',
  },
  {
    icon: MessageSquare,
    label: 'Discussions',
    value: '23',
    color: 'bg-green-100 text-green-600',
  },
  {
    icon: Award,
    label: 'Achievements',
    value: '7',
    color: 'bg-yellow-100 text-yellow-600',
  },
];

export function ProfileStats() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.label}>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-bold text-foreground">
                    {stat.value}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
