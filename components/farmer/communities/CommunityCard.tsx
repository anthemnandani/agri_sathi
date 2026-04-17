'use client';

import React, { useState } from 'react';
import { Users, ArrowRight, Globe, Lock, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import Link from 'next/link';
import { getCategoryColor, getCategoryIcon, getStatusIcon, getStatusColor } from '@/lib/community-icons';

interface CommunityCardProps {
  community: {
    id: string;
    name: string;
    description: string;
    members: number;
    icon: string;
    category: string;
    joined: boolean;
    language: string;
    private?: boolean;
    status?: 'pending' | 'approved' | 'active' | 'inactive';
    growth?: number;
  };
}

export function CommunityCard({ community }: CommunityCardProps) {
  const [joined, setJoined] = useState(community.joined);
  const [loading, setLoading] = useState(false);

  const handleJoin = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setLoading(true);
    try {
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 800));
      setJoined(!joined);
      toast.success(
        joined ? 'Left community' : 'Joined community successfully!'
      );
    } catch (error) {
      toast.error('Failed to update community');
    } finally {
      setLoading(false);
    }
  };

  const categoryColor = getCategoryColor(community.category);
  const categoryIcon = getCategoryIcon(community.category);
  const statusIcon = community.status ? getStatusIcon(community.status) : null;
  const statusColor = community.status ? getStatusColor(community.status) : null;
  const isApproved = community.status === 'approved' || community.status === 'active';

  return (
    <Link href={`/farmer/communities/${community.id}`}>
      <Card className="hover:shadow-lg transition-all overflow-hidden flex flex-col cursor-pointer h-full hover:-translate-y-1 border-border">
        {/* Cover Image */}
        <div className="h-24 sm:h-32 bg-gradient-to-br from-primary/30 to-primary/50 relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center text-3xl sm:text-5xl opacity-70">
            {community.icon || categoryIcon}
          </div>
          {/* Status Badge in corner */}
          {community.status && (
            <div className={`absolute top-2 right-2 ${statusColor?.bg} ${statusColor?.text} px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1`}>
              <span>{statusIcon}</span>
              <span className="capitalize">{community.status}</span>
            </div>
          )}
        </div>

        <CardContent className="p-3 sm:p-5 flex flex-col flex-grow gap-3">
          {/* Header with Category Badge */}
          <div className="flex items-start justify-between gap-2">
            <Badge className={`${categoryColor.bg} ${categoryColor.text} text-xs sm:text-sm font-semibold`}>
              <span className="mr-1">{categoryIcon}</span>
              {community.category.charAt(0).toUpperCase() + community.category.slice(1)}
            </Badge>
            {community.private ? (
              <div className="flex items-center gap-1 text-muted-foreground text-xs">
                <Lock className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">Private</span>
              </div>
            ) : (
              <div className="flex items-center gap-1 text-muted-foreground text-xs">
                <Globe className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">Public</span>
              </div>
            )}
          </div>

          {/* Title & Description */}
          <div>
            <h3 className="font-bold text-sm sm:text-base text-foreground mb-1 line-clamp-2">
              {community.name}
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">
              {community.description}
            </p>
          </div>

          {/* Meta Info with Growth Indicator */}
          <div className="space-y-2 text-xs text-muted-foreground">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <Users className="h-3.5 w-3.5 flex-shrink-0" />
                <span>{community.members.toLocaleString()} members</span>
              </div>
              {community.growth && (
                <div className="flex items-center gap-1 text-green-600 dark:text-green-400 font-semibold text-xs">
                  <TrendingUp className="h-3 w-3" />
                  +{community.growth}%
                </div>
              )}
            </div>
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1 bg-muted px-2 py-1 rounded-md text-xs font-medium">
                🌐 {community.language}
              </span>
              {joined && (
                <span className="inline-flex items-center gap-1 text-primary font-semibold text-xs">
                  ✓ Joined
                </span>
              )}
            </div>
          </div>

          {/* Action Button */}
          <Button
            onClick={handleJoin}
            disabled={loading}
            variant={joined ? 'outline' : 'default'}
            className="w-full text-xs sm:text-sm font-semibold mt-1"
            size="sm"
          >
            {joined ? 'Open Community' : 'Join Now'}
            <ArrowRight className="h-3 w-3 sm:h-3.5 sm:w-3.5 ml-2" />
          </Button>
        </CardContent>
      </Card>
    </Link>
  );
}
