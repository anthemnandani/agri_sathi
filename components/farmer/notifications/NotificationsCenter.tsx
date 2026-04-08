'use client';

import React, { useState } from 'react';
import { Bell, Heart, MessageSquare, AlertCircle, Gift, Trash2, CheckCheck } from 'lucide-react';
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

  const handleMarkAsRead = (id: string) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications(
      notifications.map((n) => ({ ...n, read: true }))
    );
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case 'like':
        return 'bg-red-100 dark:bg-red-950 text-red-600 dark:text-red-400';
      case 'comment':
      case 'message':
        return 'bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400';
      case 'alert':
        return 'bg-orange-100 dark:bg-orange-950 text-orange-600 dark:text-orange-400';
      case 'promotion':
        return 'bg-green-100 dark:bg-green-950 text-green-600 dark:text-green-400';
      default:
        return 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400';
    }
  };

  const getNotificationType = (type: string): string => {
    switch (type) {
      case 'like':
        return 'Like';
      case 'comment':
        return 'Comment';
      case 'message':
        return 'Message';
      case 'alert':
        return 'Alert';
      case 'promotion':
        return 'Offer';
      default:
        return 'Notification';
    }
  };

  const NotificationCard = ({ notif }: { notif: typeof mockNotifications[0] }) => {
    const Icon = notif.icon;
    return (
      <Card
        className={cn(
          'overflow-hidden transition-all hover:shadow-md',
          notif.read
            ? 'bg-card border-border'
            : 'bg-gradient-to-r from-primary/5 to-transparent border-l-4 border-l-primary'
        )}
      >
        <CardContent className="p-4 flex items-start gap-4">
          {/* Icon */}
          <div className={cn('rounded-lg p-3 flex-shrink-0', getIconColor(notif.type))}>
            <Icon className="h-5 w-5" />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div>
                <Badge variant="outline" className="mb-2">
                  {getNotificationType(notif.type)}
                </Badge>
                <p className="font-medium text-foreground text-sm leading-snug break-words">
                  {notif.message}
                </p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {notif.timestamp}
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1 flex-shrink-0">
            {!notif.read && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleMarkAsRead(notif.id)}
                title="Mark as read"
                className="h-8 w-8 p-0"
              >
                <CheckCheck className="h-4 w-4" />
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleDelete(notif.id)}
              title="Delete"
              className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="w-full">
      {/* Header Section */}
      {notifications.length > 0 && (
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Notifications</h2>
            {unreadCount > 0 && (
              <p className="text-sm text-muted-foreground mt-1">
                {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
              </p>
            )}
          </div>
          {unreadCount > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleMarkAllAsRead}
              className="gap-2 whitespace-nowrap"
            >
              <CheckCheck className="h-4 w-4" />
              Mark all as read
            </Button>
          )}
        </div>
      )}

      {/* Tabs */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="all" className="relative">
            All Notifications
            {unreadCount > 0 && (
              <Badge variant="destructive" className="ml-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs font-bold">
                {unreadCount}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="unread">
            Unread {unreadCount > 0 && `(${unreadCount})`}
          </TabsTrigger>
        </TabsList>

        {/* All Notifications Tab */}
        <TabsContent value="all" className="space-y-3 mt-0">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="rounded-full bg-muted p-4 mb-4">
                <Bell className="h-8 w-8 text-muted-foreground" />
              </div>
              <p className="text-base font-medium text-foreground">No notifications yet</p>
              <p className="text-sm text-muted-foreground mt-1">
                Stay tuned for updates about your posts, messages, and more!
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {notifications.map((notif) => (
                <NotificationCard key={notif.id} notif={notif} />
              ))}
            </div>
          )}
        </TabsContent>

        {/* Unread Notifications Tab */}
        <TabsContent value="unread" className="space-y-3 mt-0">
          {notifications.filter((n) => !n.read).length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="rounded-full bg-muted p-4 mb-4">
                <CheckCheck className="h-8 w-8 text-muted-foreground" />
              </div>
              <p className="text-base font-medium text-foreground">All caught up!</p>
              <p className="text-sm text-muted-foreground mt-1">
                You&apos;ve read all your notifications
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {notifications
                .filter((n) => !n.read)
                .map((notif) => (
                  <NotificationCard key={notif.id} notif={notif} />
                ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
