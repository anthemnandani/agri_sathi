'use client';

import React, { useState, useEffect } from 'react';
import { MarketplaceHero } from '@/components/farmer/marketplace/MarketplaceHero';
import { CategoryTabs } from '@/components/farmer/marketplace/CategoryTabs';
import { ProductSection } from '@/components/farmer/marketplace/ProductSection';

export default function MarketplacePage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'seeds', label: 'Seeds' },
    { id: 'fertilizer', label: 'Fertilizer' },
    { id: 'tools', label: 'Tools' },
    { id: 'cattle', label: 'Cattle' },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const url = selectedCategory === 'all' 
          ? '/api/products'
          : `/api/products?category=${selectedCategory}`;
        
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const result = await response.json();
        setProducts(result.data || []);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('[v0] Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory]);

  // Group products by section
  const productSections = products.reduce((acc: any, product: any) => {
    const existingSection = acc.find((s: any) => s.title === product.section);
    if (existingSection) {
      existingSection.products.push(product);
    } else {
      acc.push({
        title: product.section,
        category: product.category,
        products: [product],
      });
    }
    return acc;
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <MarketplaceHero />

      {/* Category Tabs */}
      <CategoryTabs categories={categories} selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />

      {/* Product Sections */}
      <div className="space-y-8 px-3 sm:px-4 md:px-6 py-8">
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-48 bg-muted rounded-lg animate-pulse" />
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-8 text-red-500">{error}</div>
        ) : (
          productSections.map((section: any) => (
            <ProductSection key={section.title} title={section.title} products={section.products} />
          ))
        )}
      </div>
    </div>
  );
}
