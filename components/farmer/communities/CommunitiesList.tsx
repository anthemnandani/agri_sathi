'use client';

import React, { useState, useEffect } from 'react';
import { CommunityCard } from './CommunityCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

interface CommunitiesListProps {
  compact?: boolean;
}

export function CommunitiesList({ compact = false }: CommunitiesListProps) {
  const [communities, setCommunities] = useState([]);
  const [filteredCommunities, setFilteredCommunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);

  const categories = ['crop', 'location', 'problem', 'other'];
  const languages = ['English', 'Hindi'];

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
        setFilteredCommunities(result.data || []);
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

  useEffect(() => {
    let filtered = communities;

    if (searchTerm) {
      filtered = filtered.filter((c: any) =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter((c: any) => c.category === selectedCategory);
    }

    if (selectedLanguage) {
      filtered = filtered.filter((c: any) => c.language === selectedLanguage);
    }

    setFilteredCommunities(filtered);
  }, [searchTerm, selectedCategory, selectedLanguage, communities]);

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
            <CardTitle className="text-base">Explore communities</CardTitle>
            <Link href="/farmer/communities/all">
              <Button variant="ghost" size="sm" className="text-xs text-muted-foreground hover:text-foreground">
                View all
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {communities.slice(0, 3).map((community: any) => (
            <Link key={community.id} href={`/farmer/communities/${community.id}`}>
              <div className="rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
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
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{community.members} members</span>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700 h-8 text-xs">
                      {community.joined ? 'Joined' : 'Join'}
                    </Button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="space-y-4">
        <div className="flex flex-col gap-4">
          {/* Search */}
          <Input
            placeholder="Search communities by name or topic..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />

          {/* Category Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Category</label>
            <div className="flex flex-wrap gap-2">
              <Badge
                variant={selectedCategory === null ? 'default' : 'outline'}
                className="cursor-pointer"
                onClick={() => setSelectedCategory(null)}
              >
                All
              </Badge>
              {categories.map((cat) => (
                <Badge
                  key={cat}
                  variant={selectedCategory === cat ? 'default' : 'outline'}
                  className="cursor-pointer capitalize"
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </Badge>
              ))}
            </div>
          </div>

          {/* Language Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Language</label>
            <div className="flex flex-wrap gap-2">
              <Badge
                variant={selectedLanguage === null ? 'default' : 'outline'}
                className="cursor-pointer"
                onClick={() => setSelectedLanguage(null)}
              >
                All
              </Badge>
              {languages.map((lang) => (
                <Badge
                  key={lang}
                  variant={selectedLanguage === lang ? 'default' : 'outline'}
                  className="cursor-pointer"
                  onClick={() => setSelectedLanguage(lang)}
                >
                  {lang}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">
            Communities ({filteredCommunities.length})
          </h2>
          <Link href="/farmer/communities/create">
            <Button className="bg-green-600 hover:bg-green-700">
              Create Community
            </Button>
          </Link>
        </div>

        {filteredCommunities.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground mb-4">No communities found matching your filters</p>
              <Button variant="outline" onClick={() => {
                setSearchTerm('');
                setSelectedCategory(null);
                setSelectedLanguage(null);
              }}>
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredCommunities.map((community: any) => (
              <CommunityCard key={community.id} community={community} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
