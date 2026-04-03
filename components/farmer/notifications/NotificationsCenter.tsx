'use client';

import React, { useState } from 'react';
import { Bell, Heart, MessageSquare, AlertCircle, Gift, Trash2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const mockNotifications = [
  {
    id: '1',
    type: 'like',
    message: 'Priya Singh liked your wheat farming post',
    timestamp: '2 hours ago',
    read: false,
    icon: Heart,
  },
  {
    id: '2',
    type: 'comment',
    message: 'New comment on your product listing: "Is this organic?"',
    timestamp: '5 hours ago',
    read: false,
    icon: MessageSquare,
  },
  {
    id: '3',
    type: 'alert',
    message: 'Weather alert: Heavy rain expected tomorrow',
    timestamp: '1 day ago',
    read: true,
    icon: AlertCircle,
  },
  {
    id: '4',
    type: 'message',
    message: 'New message from Rajesh Kumar',
    timestamp: '2 days ago',
    read: true,
    icon: MessageSquare,
  },
  {
    id: '5',
    type: 'promotion',
    message: 'You earned ₹200 cashback on your last purchase!',
    timestamp: '3 days ago',
    read: true,
    icon: Gift,
  },
];

export function NotificationsCenter() {
  const [notifications, setNotifications] = useState(mockNotifications);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleDelete = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  const handleMarkAllAsRead = () => {
    setNotifications(
      notifications.map((n) => ({ ...n, read: true }))
    );
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case 'like':
        return 'text-red-500';
      case 'comment':
      case 'message':
        return 'text-blue-500';
      case 'alert':
        return 'text-orange-500';
      case 'promotion':
        return 'text-green-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <Tabs defaultValue="all" className="w-full">
      <TabsList>
        <TabsTrigger value="all">
          All
          {unreadCount > 0 && (
            <Badge variant="destructive" className="ml-2">
              {unreadCount}
            </Badge>
          )}
        </TabsTrigger>
        <TabsTrigger value="unread">Unread</TabsTrigger>
      </TabsList>

      <TabsContent value="all" className="space-y-2 mt-4">
        {notifications.length > 0 && (
          <div className="flex justify-end mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleMarkAllAsRead}
            >
              Mark all as read
            </Button>
          </div>
        )}

        {notifications.length === 0 ? (
          <div className="text-center py-12">
            <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">
              No notifications yet. Stay tuned!
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {notifications.map((notif) => {
              const Icon = notif.icon;
              return (
                <Card
                  key={notif.id}
                  className={cn(
                    'cursor-pointer hover:bg-accent transition-colors',
                    !notif.read && 'border-l-4 border-l-primary bg-accent/50'
                  )}
                >
                  <CardContent className="p-4 flex items-start justify-between">
                    <div className="flex gap-3 flex-1">
                      <div
                        className={cn(
                          'p-2 rounded-lg bg-muted',
                          getIconColor(notif.type)
                        )}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-foreground">
                          {notif.message}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {notif.timestamp}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(notif.id)}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </TabsContent>

      <TabsContent value="unread" className="space-y-2 mt-4">
        {notifications.filter((n) => !n.read).length === 0 ? (
          <div className="text-center py-12">
            <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">
              No unread notifications
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {notifications
              .filter((n) => !n.read)
              .map((notif) => {
                const Icon = notif.icon;
                return (
                  <Card key={notif.id} className="border-l-4 border-l-primary bg-accent/50">
                    <CardContent className="p-4 flex items-start justify-between">
                      <div className="flex gap-3 flex-1">
                        <div
                          className={cn(
                            'p-2 rounded-lg bg-muted',
                            getIconColor(notif.type)
                          )}
                        >
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-foreground">
                            {notif.message}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {notif.timestamp}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(notif.id)}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
}
