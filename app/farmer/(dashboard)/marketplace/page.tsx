import React from 'react';
import { MarketplaceFilters } from '@/components/farmer/marketplace/MarketplaceFilters';
import { ProductGrid } from '@/components/farmer/marketplace/ProductGrid';

export const metadata = {
  title: 'Marketplace - AgriSathi',
  description: 'Buy and sell agricultural products, equipment, and services',
};

export default function MarketplacePage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Marketplace</h1>
        <p className="text-muted-foreground">
          Discover products, equipment, and services from farmers near you
        </p>
      </div>

      {/* Filters and Products */}
      <div className="grid gap-6 lg:grid-cols-4">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1">
          <MarketplaceFilters />
        </div>

        {/* Products Grid */}
        <div className="lg:col-span-3">
          <ProductGrid />
        </div>
      </div>
    </div>
  );
}
