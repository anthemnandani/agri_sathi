'use client';

import React from 'react';
import { ProductCard } from './ProductCard';

const mockProducts = [
  {
    id: '1',
    title: 'Premium Wheat Seeds',
    price: 2500,
    originalPrice: 3000,
    category: 'seeds',
    seller: {
      name: 'Farmer Singh',
      rating: 4.5,
    },
    location: 'Punjab',
    reviews: 24,
    inStock: true,
    image: '🌾',
  },
  {
    id: '2',
    title: 'Organic Fertilizer (50kg)',
    price: 1500,
    category: 'fertilizer',
    seller: {
      name: 'Green Earth Co.',
      rating: 4.8,
    },
    location: 'Madhya Pradesh',
    reviews: 42,
    inStock: true,
    image: '🟤',
  },
  {
    id: '3',
    title: 'Agricultural Pesticide',
    price: 800,
    originalPrice: 1000,
    category: 'pesticide',
    seller: {
      name: 'Agro Solutions',
      rating: 4.3,
    },
    location: 'Karnataka',
    reviews: 18,
    inStock: true,
    image: '🧪',
  },
  {
    id: '4',
    title: 'Water Pump (2HP)',
    price: 8500,
    category: 'equipment',
    seller: {
      name: 'Equipment Hub',
      rating: 4.6,
    },
    location: 'Gujarat',
    reviews: 56,
    inStock: true,
    image: '⚙️',
  },
  {
    id: '5',
    title: 'Rice Seeds - High Yield',
    price: 3200,
    category: 'seeds',
    seller: {
      name: 'Seed Master',
      rating: 4.7,
    },
    location: 'West Bengal',
    reviews: 31,
    inStock: false,
    image: '🌾',
  },
  {
    id: '6',
    title: 'Soil Testing Kit',
    price: 1200,
    category: 'equipment',
    seller: {
      name: 'Tech Farm',
      rating: 4.4,
    },
    location: 'Haryana',
    reviews: 22,
    inStock: true,
    image: '🔬',
  },
];

export function ProductGrid() {
  return (
    <div>
      <p className="text-sm text-muted-foreground mb-4">
        Showing {mockProducts.length} products
      </p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {mockProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
