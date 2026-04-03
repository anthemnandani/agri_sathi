'use client';

import React, { useState } from 'react';
import { Users, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

interface CommunityCardProps {
  community: {
    id: string;
    name: string;
    description: string;
    members: number;
    icon: string;
    category: string;
    joined: boolean;
  };
}

export function CommunityCard({ community }: CommunityCardProps) {
  const [joined, setJoined] = useState(community.joined);
  const [loading, setLoading] = useState(false);

  const handleJoin = async () => {
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

  return (
    <Card className="hover:shadow-lg transition-shadow overflow-hidden flex flex-col">
      <CardContent className="p-6 flex flex-col h-full">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="text-4xl">{community.icon}</div>
          <Badge variant="outline">{community.category}</Badge>
        </div>

        {/* Title & Description */}
        <h3 className="font-semibold text-foreground mb-2 flex-grow">
          {community.name}
        </h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {community.description}
        </p>

        {/* Members */}
        <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground">
          <Users className="h-4 w-4" />
          <span>{community.members.toLocaleString()} members</span>
        </div>

        {/* Action Button */}
        <Button
          onClick={handleJoin}
          disabled={loading}
          variant={joined ? 'outline' : 'default'}
          className="w-full"
        >
          {joined ? 'Leave Community' : 'Join Community'}
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </CardContent>
    </Card>
  );
}
