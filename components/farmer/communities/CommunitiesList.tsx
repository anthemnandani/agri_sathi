'use client';

import React, { useState, useEffect } from 'react';
import { CommunityCard } from './CommunityCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Search, Filter, Sparkles } from 'lucide-react';
import { getCategoryIcon } from '@/lib/community-icons';

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
      {/* Hero Section with Search */}
      <div className="space-y-4 mb-8">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
              Discover Communities
            </h1>
          </div>
          <p className="text-muted-foreground text-sm sm:text-base max-w-2xl">
            Connect with farmers in your area, learn about crops, and solve problems together. Find communities that match your interests.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by community name, topic, or region..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg border-2 border-border focus:border-primary transition-colors"
          />
        </div>
      </div>

      {/* Filters */}
      <div className="space-y-4 bg-card rounded-lg p-4 sm:p-6 border border-border">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="h-4 w-4 text-primary" />
          <h3 className="text-sm font-semibold text-foreground">Filters</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Category Filter */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-foreground">Category</label>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                  selectedCategory === null
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                All Categories
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all flex items-center gap-1 ${
                    selectedCategory === cat
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  <span>{getCategoryIcon(cat)}</span>
                  <span className="capitalize">{cat}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Language Filter */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-foreground">Language</label>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedLanguage(null)}
                className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                  selectedLanguage === null
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                All Languages
              </button>
              {languages.map((lang) => (
                <button
                  key={lang}
                  onClick={() => setSelectedLanguage(lang)}
                  className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                    selectedLanguage === lang
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  🌐 {lang}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Clear Filters Button */}
        {(selectedCategory || selectedLanguage || searchTerm) && (
          <div className="pt-3 border-t border-border">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory(null);
                setSelectedLanguage(null);
              }}
              className="text-xs"
            >
              Clear All Filters
            </Button>
          </div>
        )}
      </div>

      {/* Results */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground">
              {filteredCommunities.length > 0 && (
                <span className="text-primary">{filteredCommunities.length}</span>
              )}
              {filteredCommunities.length > 0 ? ' Communities Found' : 'No Communities Found'}
            </h2>
            {filteredCommunities.length > 0 && (
              <p className="text-sm text-muted-foreground mt-1">
                Choose a community to join and start learning
              </p>
            )}
          </div>
          <Link href="/farmer/communities/create" className="w-full sm:w-auto">
            <Button className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
              Create Community
            </Button>
          </Link>
        </div>

        {filteredCommunities.length === 0 ? (
          <Card className="bg-muted/30 border-border">
            <CardContent className="py-12 sm:py-16 text-center">
              <div className="space-y-4">
                <div className="text-4xl sm:text-6xl">🌾</div>
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2">
                    No communities found
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground mb-6">
                    {searchTerm || selectedCategory || selectedLanguage
                      ? 'Try adjusting your filters to find what you&apos;re looking for'
                      : 'No communities available yet. Be the first to create one!'}
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  {(searchTerm || selectedCategory || selectedLanguage) && (
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSearchTerm('');
                        setSelectedCategory(null);
                        setSelectedLanguage(null);
                      }}
                      className="text-xs sm:text-sm"
                    >
                      Clear Filters
                    </Button>
                  )}
                  <Link href="/farmer/communities/create" className="flex-1 sm:flex-none">
                    <Button className="w-full bg-primary hover:bg-primary/90 text-xs sm:text-sm">
                      Create a Community
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {filteredCommunities.map((community: any) => (
              <CommunityCard key={community.id} community={community} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
