'use client';

import React, { useState } from 'react';
import { ShoppingCart, Star, Heart } from 'lucide-react';
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
  const [liked, setLiked] = useState(false);
  const [cartAdded, setCartAdded] = useState(false);

  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  const handleAddToCart = () => {
    setCartAdded(true);
    setTimeout(() => setCartAdded(false), 2000);
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col h-full">
      <CardContent className="p-0 flex flex-col h-full">
        {/* Product Image */}
        <div className="relative bg-gradient-to-br from-muted to-muted/50 h-48 flex items-center justify-center text-6xl overflow-hidden group">
          <div className="group-hover:scale-110 transition-transform duration-300">
            {product.image}
          </div>
          
          {discount > 0 && (
            <Badge className="absolute top-3 left-3 bg-destructive hover:bg-destructive/90 shadow-md">
              Save {discount}%
            </Badge>
          )}
          
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-3 right-3 bg-white/90 hover:bg-white shadow-md"
            onClick={() => setLiked(!liked)}
          >
            <Heart
              className={cn(
                'h-5 w-5',
                liked ? 'fill-destructive text-destructive' : 'text-muted-foreground'
              )}
            />
          </Button>

          {!product.inStock && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <span className="text-white font-bold text-center px-4">Out of Stock</span>
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="p-4 space-y-3 flex-1 flex flex-col">
          <div>
            <h3 className="font-semibold text-sm text-foreground line-clamp-2 leading-snug">
              {product.title}
            </h3>
            <p className="text-xs text-muted-foreground mt-1 flex items-center">
              📍 {product.location}
            </p>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2 py-1">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    'h-3.5 w-3.5',
                    i < Math.floor(product.seller.rating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-muted-foreground'
                  )}
                />
              ))}
            </div>
            <span className="text-xs font-medium text-foreground">
              {product.seller.rating}
            </span>
            <span className="text-xs text-muted-foreground">
              ({product.reviews})
            </span>
          </div>

          {/* Seller Info */}
          <p className="text-xs text-muted-foreground">
            by <span className="font-medium">{product.seller.name}</span>
          </p>

          {/* Price */}
          <div className="flex items-baseline gap-2 py-2 border-t border-border pt-3">
            <span className="text-xl font-bold text-foreground">
              ₹{product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-muted-foreground line-through">
                ₹{product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          {/* Action Button */}
          <Button
            className="w-full mt-auto"
            disabled={!product.inStock}
            variant={product.inStock ? 'default' : 'outline'}
            onClick={handleAddToCart}
            size="sm"
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            {cartAdded
              ? 'Added to Cart!'
              : product.inStock
                ? 'Add to Cart'
                : 'Notify Me'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
