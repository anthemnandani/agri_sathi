import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertCircle, User, FileText } from 'lucide-react';

const activities = [
  {
    id: 1,
    user: 'Farmer Rajesh',
    action: 'Listed new product',
    type: 'product',
    status: 'success',
    time: '2 hours ago',
  },
  {
    id: 2,
    user: 'Admin Review',
    action: 'Approved post by Priya Sharma',
    type: 'approval',
    status: 'success',
    time: '4 hours ago',
  },
  {
    id: 3,
    user: 'System',
    action: 'Weather alert sent to 1,234 users',
    type: 'alert',
    status: 'success',
    time: '6 hours ago',
  },
  {
    id: 4,
    user: 'Kumar',
    action: 'Flagged post for review',
    type: 'flag',
    status: 'warning',
    time: '8 hours ago',
  },
  {
    id: 5,
    user: 'Admin',
    action: 'Suspended user account',
    type: 'suspension',
    status: 'warning',
    time: '12 hours ago',
  },
];

const getIcon = (type: string) => {
  const baseClass = 'w-5 h-5';
  switch (type) {
    case 'product':
      return <FileText className={`${baseClass} text-blue-600`} />;
    case 'approval':
      return <CheckCircle className={`${baseClass} text-green-600`} />;
    case 'alert':
      return <AlertCircle className={`${baseClass} text-green-600`} />;
    case 'flag':
      return <AlertCircle className={`${baseClass} text-red-600`} />;
    case 'suspension':
      return <AlertCircle className={`${baseClass} text-red-600`} />;
    default:
      return <User className={`${baseClass} text-gray-600`} />;
  }
};

export default function ActivityLog() {
  return (
    <Card className="border border-border">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Latest platform actions and events</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors border border-transparent hover:border-border"
            >
              <div className="flex-shrink-0">
                {getIcon(activity.type)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">{activity.action}</p>
                <p className="text-xs text-muted-foreground">{activity.user}</p>
              </div>
              <div className="flex flex-col items-end gap-2 flex-shrink-0">
                <Badge
                  variant={activity.status === 'success' ? 'outline' : 'secondary'}
                  className={activity.status === 'warning' ? 'bg-green-100 text-green-800' : ''}
                >
                  {activity.status}
                </Badge>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
