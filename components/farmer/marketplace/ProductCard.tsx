'use client';

import React from 'react';
import { ShoppingCart, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: {
    id: string;
    title: string;
    price: number;
    originalPrice?: number;
    category: string;
    seller: {
      name: string;
      rating: number;
    };
    location: string;
    reviews: number;
    inStock: boolean;
    image: string;
  };
}

export function ProductCard({ product }: ProductCardProps) {
  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardContent className="p-0">
        {/* Product Image */}
        <div className="relative bg-muted h-40 flex items-center justify-center text-5xl">
          {product.image}
          {discount > 0 && (
            <Badge className="absolute top-2 right-2 bg-destructive">
              -{discount}%
            </Badge>
          )}
          {!product.inStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="text-white font-semibold">Out of Stock</span>
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="p-4 space-y-3">
          <div>
            <h3 className="font-semibold text-foreground line-clamp-2">
              {product.title}
            </h3>
            <p className="text-xs text-muted-foreground mt-1">
              {product.location}
            </p>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    'h-3 w-3',
                    i < Math.floor(product.seller.rating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-muted-foreground'
                  )}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">
              {product.seller.rating} ({product.reviews})
            </span>
          </div>

          {/* Seller Info */}
          <p className="text-xs text-muted-foreground">
            by {product.seller.name}
          </p>

          {/* Price */}
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-foreground">
              ₹{product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ₹{product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          {/* Action Button */}
          <Button
            className="w-full"
            disabled={!product.inStock}
            variant={product.inStock ? 'default' : 'outline'}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            {product.inStock ? 'Add to Cart' : 'Notify Me'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
