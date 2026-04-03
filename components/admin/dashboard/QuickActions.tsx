import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, MessageCircle, FileText, Cloud } from 'lucide-react';

const actions = [
  {
    label: 'New Scheme',
    href: '/admin/schemes?new=true',
    icon: Plus,
    color: 'emerald',
    description: 'Create government scheme',
  },
  {
    label: 'Send Alert',
    href: '/admin/weather-alerts?new=true',
    icon: Cloud,
    color: 'blue',
    description: 'Broadcast weather alert',
  },
  {
    label: 'Review Posts',
    href: '/admin/posts?filter=pending',
    icon: MessageCircle,
    color: 'purple',
    description: '3 posts pending',
  },
  {
    label: 'View Reports',
    href: '/admin/reports',
    icon: FileText,
    color: 'amber',
    description: 'Analytics & insights',
  },
];

const colorClasses = {
  emerald: 'hover:bg-emerald-100/20 text-emerald-600',
  blue: 'hover:bg-blue-100/20 text-blue-600',
  purple: 'hover:bg-purple-100/20 text-purple-600',
  amber: 'hover:bg-amber-100/20 text-amber-600',
};

export default function QuickActions() {
  return (
    <Card className="border border-border">
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Common admin tasks</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <Link
              key={index}
              href={action.href}
              className={`flex items-center gap-3 p-3 rounded-lg border border-border transition-all hover:border-muted-foreground/50 ${colorClasses[action.color as keyof typeof colorClasses]}`}
            >
              <Icon size={20} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">{action.label}</p>
                <p className="text-xs text-muted-foreground">{action.description}</p>
              </div>
            </Link>
          );
        })}
      </CardContent>
    </Card>
  );
}
