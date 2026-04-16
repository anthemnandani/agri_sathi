'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { X } from 'lucide-react';

interface FilterSidebarProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  selectedLocation: string;
  onLocationChange: (location: string) => void;
  priceRange: [number, number];
  onPriceChange: (range: [number, number]) => void;
  onClose?: () => void;
  isMobile?: boolean;
}

const categories = [
  { id: 'all', label: 'All Tools' },
  { id: 'tractor', label: 'Tractor' },
  { id: 'harvester', label: 'Harvester' },
  { id: 'cultivator', label: 'Cultivator' },
  { id: 'irrigation', label: 'Irrigation' },
  { id: 'thresher', label: 'Thresher' },
  { id: 'sprayer', label: 'Sprayer' },
  { id: 'baler', label: 'Baler' },
];

const locations = [
  'All Locations',
  'Haryana',
  'Punjab',
  'Gujarat',
  'Telangana',
  'Madhya Pradesh',
  'Uttar Pradesh',
  'Jammu & Kashmir',
  'Himachal Pradesh',
];

export function FilterSidebar({
  selectedCategory,
  onCategoryChange,
  selectedLocation,
  onLocationChange,
  priceRange,
  onPriceChange,
  onClose,
  isMobile = false,
}: FilterSidebarProps) {
  return (
    <Card className={`p-4 ${isMobile ? 'rounded-lg' : 'rounded-lg'}`}>
      {/* Mobile Close Button */}
      {isMobile && (
        <div className="flex justify-between items-center mb-4 pb-4 border-b border-border">
          <h3 className="font-semibold text-foreground">Filters</h3>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Category Filter */}
      <div className="mb-6 space-y-3">
        <h4 className="font-semibold text-sm text-foreground">Category</h4>
        <div className="space-y-2">
          {categories.map((category) => (
            <label key={category.id} className="flex items-center gap-3 cursor-pointer">
              <Checkbox
                checked={selectedCategory === category.id}
                onCheckedChange={() => onCategoryChange(category.id)}
              />
              <span className="text-sm text-foreground">{category.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Location Filter */}
      <div className="mb-6 space-y-3">
        <h4 className="font-semibold text-sm text-foreground">Location</h4>
        <select
          value={selectedLocation}
          onChange={(e) => onLocationChange(e.target.value)}
          className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          {locations.map((location) => (
            <option key={location} value={location === 'All Locations' ? '' : location}>
              {location}
            </option>
          ))}
        </select>
      </div>

      {/* Price Range Filter */}
      <div className="space-y-3">
        <h4 className="font-semibold text-sm text-foreground">Price Range (₹/day)</h4>
        <div className="space-y-2">
          <div>
            <Label className="text-xs text-muted-foreground">Min: ₹{priceRange[0]}</Label>
            <Input
              type="range"
              min="0"
              max="1000"
              value={priceRange[0]}
              onChange={(e) => onPriceChange([parseInt(e.target.value), priceRange[1]])}
              className="w-full"
            />
          </div>
          <div>
            <Label className="text-xs text-muted-foreground">Max: ₹{priceRange[1]}</Label>
            <Input
              type="range"
              min="0"
              max="1000"
              value={priceRange[1]}
              onChange={(e) => onPriceChange([priceRange[0], parseInt(e.target.value)])}
              className="w-full"
            />
          </div>
        </div>
      </div>

      {/* Reset Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => {
          onCategoryChange('all');
          onLocationChange('');
          onPriceChange([0, 1000]);
        }}
        className="w-full mt-6"
      >
        Reset Filters
      </Button>
    </Card>
  );
}
