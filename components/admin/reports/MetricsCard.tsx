import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface MetricsCardProps {
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
}

export default function MetricsCard({ label, value, change, trend }: MetricsCardProps) {
  const isPositive = trend === 'up';
  const TrendIcon = isPositive ? ArrowUp : ArrowDown;
  const trendColor = isPositive ? 'text-emerald-600 bg-emerald-100/30' : 'text-red-600 bg-red-100/30';

  return (
    <Card className="border border-border">
      <CardContent className="p-6">
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        <p className="text-2xl font-bold text-foreground mt-2">{value}</p>
        <p className={`text-sm font-medium flex items-center gap-1 mt-2 ${trendColor}`}>
          <TrendIcon size={16} />
          {change}
        </p>
      </CardContent>
    </Card>
  );
}
