'use client';

import React, { useState } from 'react';
import { MarketplaceHero } from '@/components/farmer/marketplace/MarketplaceHero';
import { CategoryTabs } from '@/components/farmer/marketplace/CategoryTabs';
import { ProductSection } from '@/components/farmer/marketplace/ProductSection';

export default function MarketplacePage() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'seeds', label: 'Seeds' },
    { id: 'fertilizer', label: 'Fertilizer' },
    { id: 'tools', label: 'Tools' },
    { id: 'cattle', label: 'Cattle' },
  ];

  const productSections = [
    {
      title: 'Vegetables seeds',
      products: [
        { id: '1', image: '🌱', name: 'Exfoliated Vermiculite - 1 kg', price: 200, originalPrice: 240, discount: 15 },
        { id: '2', image: '🌱', name: 'Exfoliated Vermiculite - 1 kg', price: 200, originalPrice: 240, discount: 15 },
        { id: '3', image: '🌱', name: 'Exfoliated Vermiculite - 1 kg', price: 200, originalPrice: 240, discount: 15 },
      ],
    },
    {
      title: 'Fruit seeds',
      products: [
        { id: '4', image: '🍎', name: 'Exfoliated Vermiculite - 1 kg', price: 200, originalPrice: 240, discount: 15 },
        { id: '5', image: '🍎', name: 'Exfoliated Vermiculite - 1 kg', price: 200, originalPrice: 240, discount: 15 },
        { id: '6', image: '🍎', name: 'Exfoliated Vermiculite - 1 kg', price: 200, originalPrice: 240, discount: 15 },
      ],
    },
    {
      title: 'Flower seeds',
      products: [
        { id: '7', image: '🌸', name: 'Exfoliated Vermiculite - 1 kg', price: 200, originalPrice: 240, discount: 15 },
        { id: '8', image: '🌸', name: 'Exfoliated Vermiculite - 1 kg', price: 200, originalPrice: 240, discount: 15 },
        { id: '9', image: '🌸', name: 'Exfoliated Vermiculite - 1 kg', price: 200, originalPrice: 240, discount: 15 },
      ],
    },
  ];

  return (
    <div className="bg-slate-950 text-white min-h-screen">
      {/* Hero Section */}
      <MarketplaceHero />

      {/* Category Tabs */}
      <CategoryTabs categories={categories} selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />

      {/* Product Sections */}
      <div className="space-y-8 px-4 md:px-6 py-8">
        {productSections.map((section) => (
          <ProductSection key={section.title} title={section.title} products={section.products} />
        ))}
      </div>
    </div>
  );
}
