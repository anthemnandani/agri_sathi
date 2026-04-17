'use client';

import React, { useState } from 'react';
import { Users, ArrowRight, Globe, Lock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import Link from 'next/link';

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

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      crop: 'bg-green-100 text-green-800',
      location: 'bg-blue-100 text-blue-800',
      problem: 'bg-amber-100 text-amber-800',
      other: 'bg-purple-100 text-purple-800',
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  return (
    <Link href={`/farmer/communities/${community.id}`}>
      <Card className="hover:shadow-lg transition-shadow overflow-hidden flex flex-col cursor-pointer h-full">
        {/* Cover Image */}
        <div className="h-24 sm:h-32 bg-gradient-to-br from-green-300 to-green-500 relative">
          <div className="absolute inset-0 flex items-center justify-center text-3xl sm:text-5xl opacity-80">
            {community.icon}
          </div>
        </div>

        <CardContent className="p-3 sm:p-6 flex flex-col flex-grow">
          {/* Header with Badge */}
          <div className="flex items-start justify-between mb-2 sm:mb-3 gap-2">
            <Badge className={getCategoryColor(community.category) + ' text-xs sm:text-sm'}>
              {community.category}
            </Badge>
            {community.private ? (
              <Lock className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground flex-shrink-0" />
            ) : (
              <Globe className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground flex-shrink-0" />
            )}
          </div>

          {/* Title & Description */}
          <h3 className="font-semibold text-sm sm:text-base text-foreground mb-1 sm:mb-2 line-clamp-2">
            {community.name}
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4 line-clamp-2 flex-grow">
            {community.description}
          </p>

          {/* Meta Info */}
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-3 sm:mb-4">
            <div className="flex items-center gap-1 min-w-0">
              <Users className="h-3 w-3 sm:h-3.5 sm:w-3.5 flex-shrink-0" />
              <span className="truncate">{community.members.toLocaleString()} members</span>
            </div>
            <span className="text-xs bg-muted px-2 py-0.5 sm:px-2 sm:py-1 rounded flex-shrink-0">
              {community.language}
            </span>
          </div>

          {/* Action Button */}
          <Button
            onClick={handleJoin}
            disabled={loading}
            variant={joined ? 'outline' : 'default'}
            className="w-full text-xs sm:text-sm"
            size="sm"
          >
            {joined ? 'Open' : 'Join'}
            <ArrowRight className="h-3 w-3 sm:h-3.5 sm:w-3.5 ml-1" />
          </Button>
        </CardContent>
      </Card>
    </Link>
  );
}
