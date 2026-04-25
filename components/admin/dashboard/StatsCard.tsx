import React from 'react';
import { ArrowUp, ArrowDown, LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: LucideIcon;
  color: 'emerald' | 'blue' | 'green' | 'purple';
}

const colorClasses = {
  emerald: 'bg-emerald-100/20 text-emerald-600 border-emerald-500/20',
  blue: 'bg-blue-100/20 text-blue-600 border-blue-500/20',
  green: 'bg-green-100/20 text-green-600 border-green-500/20',
  purple: 'bg-purple-100/20 text-purple-600 border-purple-500/20',
};

const trendColors = {
  emerald: 'text-emerald-600 bg-emerald-100/30',
  blue: 'text-blue-600 bg-blue-100/30',
  green: 'text-green-600 bg-green-100/30',
  purple: 'text-purple-600 bg-purple-100/30',
};

export default function StatsCard({
  title,
  value,
  change,
  trend,
  icon: Icon,
  color,
}: StatsCardProps) {
  const isPositive = trend === 'up';
  const TrendIcon = isPositive ? ArrowUp : ArrowDown;

  return (
    <Card className="border border-border">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-3 flex-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold text-foreground">{value}</p>
            <p className={`text-sm font-medium flex items-center gap-1 ${trendColors[color]}`}>
              <TrendIcon size={16} />
              {change} from last month
            </p>
          </div>
          <div className={`p-3 rounded-lg border ${colorClasses[color]}`}>
            <Icon size={24} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
