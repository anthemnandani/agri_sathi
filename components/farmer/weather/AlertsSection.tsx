'use client';

import React, { useState } from 'react';
import {
  AlertCircle,
  CheckCircle,
  Bell,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { cn } from '@/lib/utils';

const mockAlerts = [
  {
    id: '1',
    type: 'rain',
    severity: 'high',
    message: 'Heavy rainfall expected in the next 24 hours (80mm)',
    timestamp: '2 hours ago',
  },
  {
    id: '2',
    type: 'frost',
    severity: 'medium',
    message: 'Frost warning for early morning hours (5°C)',
    timestamp: '5 hours ago',
  },
  {
    id: '3',
    type: 'wind',
    severity: 'low',
    message: 'Strong winds expected (30-40 km/h)',
    timestamp: '1 day ago',
  },
];

export function AlertsSection() {
  const [alerts, setAlerts] = useState(mockAlerts);

  const handleDismiss = (id: string) => {
    setAlerts(alerts.filter((alert) => alert.id !== id));
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-destructive text-destructive-foreground';
      case 'medium':
        return 'bg-yellow-500 text-yellow-900';
      case 'low':
        return 'bg-blue-500 text-blue-900';
      default:
        return 'bg-muted';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Active Alerts
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {alerts.length === 0 ? (
          <Alert>
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              No active weather alerts for your area. Stay safe!
            </AlertDescription>
          </Alert>
        ) : (
          alerts.map((alert) => (
            <div
              key={alert.id}
              className="border border-border rounded-lg p-4 space-y-3"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex gap-3 flex-1">
                  <AlertCircle
                    className={cn(
                      'h-5 w-5 shrink-0 mt-0.5',
                      alert.severity === 'high' && 'text-destructive',
                      alert.severity === 'medium' && 'text-yellow-600',
                      alert.severity === 'low' && 'text-blue-600'
                    )}
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-foreground mb-1">
                      {alert.type.charAt(0).toUpperCase() +
                        alert.type.slice(1)}{' '}
                      Alert
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {alert.message}
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      {alert.timestamp}
                    </p>
                  </div>
                </div>
                <Badge className={getSeverityColor(alert.severity)}>
                  {alert.severity}
                </Badge>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDismiss(alert.id)}
              >
                Dismiss
              </Button>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
