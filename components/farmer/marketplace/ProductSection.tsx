'use client';

import React from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface Product {
  id: string;
  image: string;
  name: string;
  price: number;
  originalPrice: number;
  discount: number;
}

interface ProductSectionProps {
  title: string;
  products: Product[];
}

export function ProductSection({ title, products }: ProductSectionProps) {
  return (
    <div className="space-y-4">
      {/* Section Header */}
      <div className="flex items-center justify-between px-0">
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-foreground">{title}</h2>
        <button className="text-green-600 hover:text-green-700 dark:text-green-500 dark:hover:text-green-400 text-xs sm:text-sm font-medium">
          View all
        </button>
      </div>

      {/* Products Horizontal Scroll */}
      <div className="overflow-x-auto pb-2" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        <style>{`div::-webkit-scrollbar { display: none; }`}</style>
        <div className="flex gap-3 sm:gap-4 min-w-min">
          {products.map((product) => (
            <div 
              key={product.id} 
              className={cn(
                "flex-shrink-0 w-40 sm:w-48 rounded-lg overflow-hidden hover:shadow-lg transition-shadow",
                "bg-card border border-border"
              )}
            >
              {/* Product Image */}
              <div className="relative w-full aspect-square bg-muted flex items-center justify-center overflow-hidden">
                <div className="text-5xl">{product.image}</div>
                {product.discount > 0 && (
                  <Badge className="absolute top-2 left-2 bg-orange-500 hover:bg-orange-600 text-white text-xs">
                    {product.discount}% OFF
                  </Badge>
                )}
              </div>

              {/* Product Info */}
              <div className="p-3 space-y-2">
                <h3 className="text-xs sm:text-sm font-medium text-foreground line-clamp-2">
                  {product.name}
                </h3>

                {/* Price Section */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm sm:text-base font-bold text-foreground">₹{product.price}</span>
                    <span className="text-xs text-muted-foreground line-through">₹{product.originalPrice}</span>
                  </div>
                  <p className="text-xs text-green-600 dark:text-green-400 font-medium">
                    Save ₹{product.originalPrice - product.price}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
