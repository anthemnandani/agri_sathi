'use client';

import React from 'react';
import { Badge } from '@/components/ui/badge';

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
      <div className="flex items-center justify-between">
        <h2 className="text-xl md:text-2xl font-semibold text-white">{title}</h2>
        <button className="text-green-500 hover:text-green-400 text-sm font-medium">
          View all
        </button>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {products.map((product) => (
          <div key={product.id} className="bg-slate-900 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
            {/* Product Image */}
            <div className="relative w-full aspect-square bg-slate-800 flex items-center justify-center overflow-hidden">
              <div className="text-4xl">{product.image}</div>
              {product.discount > 0 && (
                <Badge className="absolute top-2 left-2 bg-orange-500 hover:bg-orange-600 text-white">
                  {product.discount}% OFF
                </Badge>
              )}
            </div>

            {/* Product Info */}
            <div className="p-3 space-y-2">
              <h3 className="text-sm font-medium text-white line-clamp-2">
                {product.name}
              </h3>

              {/* Price Section */}
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-white">₹{product.price}</span>
                  <span className="text-xs text-gray-400 line-through">₹{product.originalPrice}</span>
                </div>
                <p className="text-xs text-green-400 font-medium">
                  Save ₹{product.originalPrice - product.price}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
