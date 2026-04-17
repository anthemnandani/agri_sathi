'use client';

import React, { useEffect, useState } from 'react';
import { ArrowLeft, Bell, Users, Globe, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getCategoryIcon, getCategoryColor } from '@/lib/community-icons';
import { CommunityActionMenu } from './CommunityActionMenu';
import Link from 'next/link';

interface CommunityHeaderProps {
  communityId: string;
  onMembersClick?: () => void;
  onMediaClick?: () => void;
  onDocumentsClick?: () => void;
  onLeave?: () => void;
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

  const categoryColor = getCategoryColor(community.category);
  const categoryIcon = getCategoryIcon(community.category);

  return (
    <div className="border-b bg-card sticky top-0 z-40 shadow-sm">
      <div className="px-4 py-3 sm:px-6 flex items-center justify-between gap-4">
        {/* Left - Back and Title */}
        <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
          <Link href="/farmer/communities">
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <h2 className="text-lg sm:text-xl font-bold truncate text-foreground">
                {community.name}
              </h2>
              <Badge className={`text-xs font-semibold ${categoryColor.bg} ${categoryColor.text}`}>
                <span className="mr-1">{categoryIcon}</span>
                {community.category}
              </Badge>
            </div>
            <div className="flex items-center gap-3 flex-wrap text-xs">
              <div className="flex items-center gap-1 text-muted-foreground">
                <Users className="h-3.5 w-3.5" />
                <span className="font-medium">{community.members} members</span>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground">
                <span className="text-xs">🌐</span>
                <span>{community.language}</span>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground">
                {community.private ? (
                  <>
                    <Lock className="h-3.5 w-3.5" />
                    <span>Private</span>
                  </>
                ) : (
                  <>
                    <Globe className="h-3.5 w-3.5" />
                    <span>Public</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right - Actions */}
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-9 w-9" title="सूचनाएं">
            <Bell className="h-5 w-5" />
          </Button>

          <CommunityActionMenu
            communityId={communityId}
            communityName={community.name}
            onMembersClick={onMembersClick || (() => {})}
            onMediaClick={onMediaClick || (() => {})}
            onDocumentsClick={onDocumentsClick || (() => {})}
            onLeave={onLeave || (() => {})}
          />
        </div>
      </div>

      {/* Cover Image Banner */}
      {community.coverImage && (
        <div className="h-16 sm:h-20 bg-cover bg-center relative overflow-hidden bg-gradient-to-r from-primary/30 to-accent/30" style={{
          backgroundImage: `url(${community.coverImage})`,
        }}>
          <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-black/5" />
        </div>
      )}
    </div>
  );
}
