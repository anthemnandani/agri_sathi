'use client';

import React, { useEffect, useState } from 'react';
import { ArrowLeft, Settings, Bell, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';

interface CommunityHeaderProps {
  communityId: string;
}

export function CommunityHeader({ communityId }: CommunityHeaderProps) {
  const [community, setCommunity] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCommunity = async () => {
      try {
        const response = await fetch(`/api/communities/${communityId}`);
        if (response.ok) {
          const result = await response.json();
          setCommunity(result.data);
        }
      } catch (error) {
        console.error('[v0] Error fetching community:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCommunity();
  }, [communityId]);

  if (loading || !community) {
    return (
      <div className="border-b bg-card animate-pulse h-20" />
    );
  }

  return (
    <div className="border-b bg-card sticky top-0 z-40">
      <div className="px-4 py-3 sm:px-6 flex items-center justify-between gap-4">
        {/* Left - Back and Title */}
        <div className="flex items-center gap-4 min-w-0 flex-1">
          <Link href="/farmer/communities">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-lg font-semibold truncate">
                {community.name}
              </h2>
              <Badge variant="outline" className="text-xs hidden sm:inline">
                {community.members} members
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">
              {community.language} • {community.private ? 'Private' : 'Public'}
            </p>
          </div>
        </div>

        {/* Right - Actions */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" title="Notifications">
            <Bell className="h-5 w-5" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Settings className="h-4 w-4 mr-2" />
                <span>Community Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span>Mute Notifications</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span>View Rules</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-600">
                <span>Leave Community</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Cover Image Banner */}
      {community.coverImage && (
        <div className="h-12 bg-cover bg-center relative overflow-hidden" style={{
          backgroundImage: `url(${community.coverImage})`,
        }}>
          <div className="absolute inset-0 bg-black/20" />
        </div>
      )}
    </div>
  );
}
