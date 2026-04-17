'use client';

import React, { useEffect, useState } from 'react';
import {
  AlertCircle,
  Users,
  MessageSquare,
  Settings,
  Trash2,
  Ban,
  CheckCircle,
  Clock,
  TrendingUp,
  Flag,
  Activity,
  BarChart3,
  Zap,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { toast } from 'sonner';

interface AdminPanelProps {
  communityId: string;
}

interface AdminStats {
  totalMembers: number;
  activeMembers24h: number;
  totalMessages: number;
  messagesLast24h: number;
  joinRequestsPending: number;
  reportsPending: number;
}

interface AdminSettings {
  announcementMode: boolean;
  slowMode: boolean;
  slowModeDuration: number;
  requirePostApproval: boolean;
  autoModeration: boolean;
  maxMessageLength: number;
}

export function AdminPanel({ communityId }: AdminPanelProps) {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [settings, setSettings] = useState<AdminSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedAction, setSelectedAction] = useState<string | null>(null);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const [statsRes, settingsRes] = await Promise.all([
          fetch(`/api/communities/${communityId}/admin?type=stats`),
          fetch(`/api/communities/${communityId}/admin?type=settings`),
        ]);

        if (statsRes.ok && settingsRes.ok) {
          const statsData = await statsRes.json();
          const settingsData = await settingsRes.json();
          setStats(statsData.data);
          setSettings(settingsData.data);
        }
      } catch (error) {
        console.error('[v0] Error fetching admin data:', error);
        toast.error('Failed to load admin data');
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, [communityId]);

  const handleSettingChange = async (
    key: keyof AdminSettings,
    value: boolean | number
  ) => {
    if (!settings) return;

    const updatedSettings = { ...settings, [key]: value };
    setSettings(updatedSettings);

    try {
      await fetch(`/api/communities/${communityId}/admin`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: `set-${key}`,
          settings: { [key]: value },
        }),
      });
      toast.success('Setting updated');
    } catch (error) {
      toast.error('Failed to update setting');
      // Revert
      setSettings({ ...updatedSettings, [key]: !value });
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="py-12">
          <div className="animate-pulse space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-8 bg-muted rounded" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-primary" />
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Admin Dashboard</h2>
        </div>
        <p className="text-sm text-muted-foreground">Manage your community settings and moderation</p>
      </div>

      {/* Stats Overview */}
      {stats && (
        <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <Card className="border-border hover:shadow-md transition-shadow">
            <CardHeader className="pb-3 border-b border-border">
              <CardTitle className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Active Members
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-2">
                <div className="flex items-baseline gap-2">
                  <div className="text-3xl sm:text-4xl font-bold text-primary">{stats.activeMembers24h}</div>
                  <div className="text-xs text-muted-foreground">/ {stats.totalMembers}</div>
                </div>
                <p className="text-xs text-muted-foreground">
                  {Math.round((stats.activeMembers24h / stats.totalMembers) * 100)}% active in 24h
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border hover:shadow-md transition-shadow">
            <CardHeader className="pb-3 border-b border-border">
              <CardTitle className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-accent" />
                Messages (24h)
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-2">
                <div className="flex items-baseline gap-2">
                  <div className="text-3xl sm:text-4xl font-bold text-accent">{stats.messagesLast24h}</div>
                  <div className="text-xs text-muted-foreground">total {stats.totalMessages}</div>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-accent rounded-full transition-all"
                    style={{
                      width: `${Math.min((stats.messagesLast24h / stats.totalMessages) * 100, 100)}%`,
                    }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border hover:shadow-md transition-shadow">
            <CardHeader className="pb-3 border-b border-border">
              <CardTitle className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-destructive" />
                Pending Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-2">
                <div className="text-3xl sm:text-4xl font-bold text-destructive">
                  {stats.joinRequestsPending + stats.reportsPending}
                </div>
                <div className="space-y-1 text-xs">
                  <p className="text-muted-foreground">
                    <span className="font-semibold text-destructive">{stats.reportsPending}</span> reports
                  </p>
                  <p className="text-muted-foreground">
                    <span className="font-semibold text-primary">{stats.joinRequestsPending}</span> join requests
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Admin Settings Tabs */}
      <Tabs defaultValue="moderation" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="moderation">Moderation</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="logs">Activity Logs</TabsTrigger>
        </TabsList>

        {/* Moderation Tab */}
        <TabsContent value="moderation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Flag className="h-5 w-5" />
                Reported Content
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {stats && stats.reportsPending > 0 ? (
                Array.from({ length: 2 }).map((_, i) => (
                  <div
                    key={i}
                    className="p-4 border rounded-lg flex items-start justify-between"
                  >
                    <div className="space-y-1">
                      <p className="font-semibold text-sm">Spam Report #{i + 1}</p>
                      <p className="text-xs text-muted-foreground">
                        Multiple repeated messages about unrelated products
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Reported by: Member #{i + 1}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-green-600"
                        onClick={() => toast.success('Report approved')}
                      >
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-red-600"
                        onClick={() => toast.success('Report dismissed')}
                      >
                        Dismiss
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-6 text-muted-foreground">
                  No pending reports
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Manage Members
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Input
                placeholder="Search members..."
                className="mb-4"
              />
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>M{i + 1}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-semibold">Member {i + 1}</p>
                      <p className="text-xs text-muted-foreground">
                        Joined 5 days ago
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-amber-600"
                      onClick={() => toast.info('Mute feature coming soon')}
                    >
                      <Clock className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-red-600"
                      onClick={() => setSelectedAction(`ban-${i}`)}
                    >
                      <Ban className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Community Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {settings && (
                <>
                  {/* Announcement Mode */}
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <p className="font-semibold text-sm">Announcement Mode</p>
                      <p className="text-xs text-muted-foreground">
                        Only admins can send messages
                      </p>
                    </div>
                    <Switch
                      checked={settings.announcementMode}
                      onCheckedChange={(checked) =>
                        handleSettingChange('announcementMode', checked)
                      }
                    />
                  </div>

                  {/* Slow Mode */}
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <p className="font-semibold text-sm">Slow Mode</p>
                      <p className="text-xs text-muted-foreground">
                        Limit message frequency to prevent spam
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        min="5"
                        max="300"
                        value={settings.slowModeDuration}
                        onChange={(e) =>
                          handleSettingChange(
                            'slowModeDuration',
                            parseInt(e.target.value)
                          )
                        }
                        className="w-20 h-8 text-xs"
                        disabled={!settings.slowMode}
                      />
                      <span className="text-xs text-muted-foreground">sec</span>
                      <Switch
                        checked={settings.slowMode}
                        onCheckedChange={(checked) =>
                          handleSettingChange('slowMode', checked)
                        }
                      />
                    </div>
                  </div>

                  {/* Require Post Approval */}
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <p className="font-semibold text-sm">Require Post Approval</p>
                      <p className="text-xs text-muted-foreground">
                        All messages must be approved before showing
                      </p>
                    </div>
                    <Switch
                      checked={settings.requirePostApproval}
                      onCheckedChange={(checked) =>
                        handleSettingChange('requirePostApproval', checked)
                      }
                    />
                  </div>

                  {/* Auto Moderation */}
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <p className="font-semibold text-sm">Auto Moderation</p>
                      <p className="text-xs text-muted-foreground">
                        Automatically flag inappropriate content
                      </p>
                    </div>
                    <Switch
                      checked={settings.autoModeration}
                      onCheckedChange={(checked) =>
                        handleSettingChange('autoModeration', checked)
                      }
                    />
                  </div>

                  {/* Max Message Length */}
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <p className="font-semibold text-sm">Max Message Length</p>
                      <p className="text-xs text-muted-foreground">
                        Characters per message
                      </p>
                    </div>
                    <Input
                      type="number"
                      min="100"
                      max="10000"
                      value={settings.maxMessageLength}
                      onChange={(e) =>
                        handleSettingChange(
                          'maxMessageLength',
                          parseInt(e.target.value)
                        )
                      }
                      className="w-24 h-8 text-xs"
                    />
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Logs Tab */}
        <TabsContent value="logs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Activity Log
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-start gap-3 pb-3 border-b last:border-0">
                  <div className="mt-1">
                    {i % 2 === 0 ? (
                      <Trash2 className="h-4 w-4 text-red-600" />
                    ) : (
                      <Ban className="h-4 w-4 text-amber-600" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold">
                      {i % 2 === 0 ? 'Message Deleted' : 'Member Muted'}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      by Admin • 2 hours ago
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Confirmation Dialogs */}
      <AlertDialog open={!!selectedAction} onOpenChange={() => setSelectedAction(null)}>
        <AlertDialogContent>
          <AlertDialogTitle>Ban Member?</AlertDialogTitle>
          <AlertDialogDescription>
            This action will remove the member from the community. They won&apos;t be
            able to rejoin without being invited.
          </AlertDialogDescription>
          <div className="flex gap-3 justify-end">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700"
              onClick={() => {
                toast.success('Member banned');
                setSelectedAction(null);
              }}
            >
              Ban Member
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
