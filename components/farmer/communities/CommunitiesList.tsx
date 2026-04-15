'use client';

import React, { useState, useEffect } from 'react';
import { CommunityCard } from './CommunityCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface CommunitiesListProps {
  compact?: boolean;
}

export function CommunitiesList({ compact = false }: CommunitiesListProps) {
  const [communities, setCommunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCommunities = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/communities');
        if (!response.ok) {
          throw new Error('Failed to fetch communities');
        }
        const result = await response.json();
        setCommunities(result.data || []);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('[v0] Error fetching communities:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCommunities();
  }, []);

  if (loading) {
    return (
      <div className={compact ? '' : 'grid gap-4 md:grid-cols-2 lg:grid-cols-3'}>
        {Array.from({ length: compact ? 3 : 6 }).map((_, i) => (
          <div key={i} className="h-32 bg-muted rounded-lg animate-pulse" />
        ))}
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  if (compact) {
    return (
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle>Explore communities</CardTitle>
            <Button variant="ghost" size="sm" className="text-xs text-muted-foreground hover:text-foreground">
              View all
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {communities.slice(0, 3).map((community: any) => (
            <div
              key={community.id}
              className="rounded-lg overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="bg-gradient-to-br from-green-300 to-green-500 h-24 relative">
                <div className="absolute inset-0 bg-cover bg-center opacity-40" />
              </div>
              <div className="p-4 bg-white">
                <h4 className="font-semibold text-foreground text-sm mb-1">
                  {community.name}
                </h4>
                <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
                  {community.description}
                </p>
                <Button size="sm" className="w-full bg-green-600 hover:bg-green-700 h-8">
                  Join Communities
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  return (
    <div>
      <div className="mb-6 space-y-2">
        <h2 className="text-lg font-semibold text-foreground">
          All Communities
        </h2>
        <p className="text-sm text-muted-foreground">
          {communities.length} communities available
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {communities.map((community: any) => (
          <CommunityCard key={community.id} community={community} />
        ))}
      </div>
    </div>
  );
}
