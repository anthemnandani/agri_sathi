'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Filter, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { RentalToolCard } from '@/components/farmer/rental-tools/RentalToolCard';
import { FilterSidebar } from '@/components/farmer/rental-tools/FilterSidebar';
import { useIsMobile } from '@/hooks/use-mobile';

interface Tool {
  id: string;
  name: string;
  image: string;
  price: number;
  rating: number;
  reviews: number;
  category: string;
  owner: {
    name: string;
    village: string;
    distance: string;
  };
  description: string;
}

export default function RentalToolsPage() {
  const isMobile = useIsMobile();
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchTools = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams();
        if (selectedCategory !== 'all') params.append('category', selectedCategory);
        if (selectedLocation) params.append('location', selectedLocation);
        params.append('page', page.toString());

        const response = await fetch(`/api/rental-tools?${params}`);
        if (response.ok) {
          const result = await response.json();
          setTools(result.data || []);
        }
      } catch (error) {
        console.error('[v0] Error fetching tools:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTools();
  }, [selectedCategory, selectedLocation, page]);

  // Filter by search and price locally
  const filteredTools = tools.filter(
    (tool) =>
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      tool.price >= priceRange[0] &&
      tool.price <= priceRange[1]
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="border-b border-border p-4 md:p-6">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Rent Farm Equipment</h1>
        <p className="text-sm md:text-base text-muted-foreground">
          Find and rent agricultural tools from farmers near you
        </p>
      </div>

      {/* Search and Filter Bar */}
      <div className="border-b border-border p-4 md:p-6 space-y-4">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search tools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          {isMobile && (
            <Button
              variant="outline"
              size="icon"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-5 w-5" />
            </Button>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:grid md:grid-cols-4 gap-6 p-4 md:p-6">
        {/* Filters Sidebar */}
        {(!isMobile || showFilters) && (
          <div className={isMobile ? 'col-span-4 mb-4' : 'col-span-1'}>
            <FilterSidebar
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              selectedLocation={selectedLocation}
              onLocationChange={setSelectedLocation}
              priceRange={priceRange}
              onPriceChange={setPriceRange}
            />
          </div>
        )}

        {/* Tools Grid */}
        <div className={isMobile ? 'col-span-4' : 'col-span-3'}>
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-64 bg-muted rounded-lg animate-pulse" />
              ))}
            </div>
          ) : filteredTools.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredTools.map((tool) => (
                  <RentalToolCard key={tool.id} tool={tool} />
                ))}
              </div>
              
              {/* Pagination */}
              <div className="mt-6 flex justify-center gap-2">
                <Button
                  variant="outline"
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                >
                  Previous
                </Button>
                <span className="px-4 py-2 text-sm text-muted-foreground">
                  Page {page}
                </span>
                <Button
                  variant="outline"
                  onClick={() => setPage(p => p + 1)}
                  disabled={filteredTools.length < 12}
                >
                  Next
                </Button>
              </div>
            </>
          ) : (
            <Card className="p-8 text-center">
              <div className="text-4xl mb-3">🚜</div>
              <h3 className="font-semibold text-lg mb-2">No tools found</h3>
              <p className="text-muted-foreground">
                Try adjusting your filters or search query
              </p>
            </Card>
          )}
        </div>
      </div>

      {/* Floating Action Button */}
      <Link
        href="/farmer/rental-tools/add-tool"
        className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-40"
      >
        <Button
          size="lg"
          className="rounded-full h-14 w-14 bg-green-600 hover:bg-green-700 shadow-lg gap-0"
        >
          <Plus className="h-6 w-6" />
        </Button>
      </Link>
    </div>
  );
}
