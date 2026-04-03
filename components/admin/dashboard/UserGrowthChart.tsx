'use client';

import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const data = [
  { week: 'Week 1', farmers: 2400, workers: 1200, buyers: 800 },
  { week: 'Week 2', farmers: 3100, workers: 1500, buyers: 1100 },
  { week: 'Week 3', farmers: 4200, workers: 2100, buyers: 1600 },
  { week: 'Week 4', farmers: 5100, workers: 2800, buyers: 2200 },
  { week: 'Week 5', farmers: 6200, workers: 3500, buyers: 2900 },
  { week: 'Week 6', farmers: 7300, workers: 4200, buyers: 3600 },
];

export default function UserGrowthChart() {
  return (
    <Card className="border border-border">
      <CardHeader>
        <CardTitle>User Growth</CardTitle>
        <CardDescription>Weekly active user growth by category</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
            <defs>
              <linearGradient id="colorFarmers" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="colorWorkers" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis
              dataKey="week"
              stroke="hsl(var(--muted-foreground))"
              style={{ fontSize: '12px' }}
            />
            <YAxis stroke="hsl(var(--muted-foreground))" style={{ fontSize: '12px' }} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
              }}
            />
            <Area
              type="monotone"
              dataKey="farmers"
              stackId="1"
              stroke="#10b981"
              fillOpacity={1}
              fill="url(#colorFarmers)"
              name="Farmers"
            />
            <Area
              type="monotone"
              dataKey="workers"
              stackId="1"
              stroke="#3b82f6"
              fillOpacity={1}
              fill="url(#colorWorkers)"
              name="Workers"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
