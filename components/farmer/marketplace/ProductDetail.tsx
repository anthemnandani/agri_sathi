'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Star, Check, Truck, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

const productDatabase: Record<string, any> = {
  '1': {
    id: '1',
    name: 'Apollo Chinese Cabbage F1',
    price: 187,
    originalPrice: 240,
    discount: 22,
    rating: 4.5,
    reviews: 3,
    image: '🥬',
    images: ['🥬', '🌱', '🥬', '🥕'],
    description: 'Apollo Chinese Cabbage is a fresh, premium leafy vegetable with a crisp texture and mild sweetness. Perfect for salads, stir-fries, and soups, it adds crunch and essential nutrients to your meals.',
    originCountry: 'India',
    specifications: [
      'Head weight: approximately 5.5lbs, moderate head height',
      'Bright green external color, light yellow internal color',
      'Suitable for harvest - spring to early summer'
    ],
    features: [
      'Excellent field holding • Harvest flexibility',
      'Strong tolerance to heat • Tolerant to heat spikes',
      'Strong resistance to Clubroot • Reduced disease pressure'
    ],
    harvesting: 'Approximately 65 days after sowing. Note: Chinese Cabbage requires vernalization. Bud differentiation and bolting results from low temperatures of 5°C for a week or 10°C for two weeks. For spring harvest, transplant seedlings with 5-7 true leaves raised at 23-24°C during the day',
    similarProducts: [
      { id: '2', name: 'Exfoliated Vermiculite - 1 kg', price: 200, originalPrice: 240, discount: 15, image: '🌱' },
      { id: '3', name: 'Exfoliated Vermiculite - 1 kg', price: 200, originalPrice: 240, discount: 15, image: '🌱' },
      { id: '4', name: 'Exfoliated Vermiculite - 1 kg', price: 200, originalPrice: 240, discount: 15, image: '🌱' },
      { id: '5', name: 'Exfoliated Vermiculite - 1 kg', price: 200, originalPrice: 240, discount: 15, image: '🌱' },
    ]
  }
};

// Create entries for all product IDs
for (let i = 2; i <= 15; i++) {
  productDatabase[String(i)] = {
    ...productDatabase['1'],
    id: String(i),
    image: i <= 3 ? '🌱' : i <= 6 ? '🍎' : '🌸'
  };
}

interface ProductDetailProps {
  productId: string;
}

export function ProductDetail({ productId }: ProductDetailProps) {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const product = productDatabase[productId] || productDatabase['1'];

  const handleAddToCart = () => {
    toast.success(`Added ${quantity} ${product.name} to cart`);
  };

  const handleBuyNow = () => {
    toast.success(`Proceeding to checkout for ${quantity} ${product.name}`);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header with Back Button */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b border-border px-3 sm:px-4 md:px-6 py-4">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-foreground hover:text-green-600 transition-colors"
        >
          <ChevronLeft className="h-5 w-5" />
          <span className="text-sm sm:text-base">Back</span>
        </button>
      </div>

      <div className="px-3 sm:px-4 md:px-6 py-8 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 mb-12">
          {/* Product Images - Left Side */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative w-full aspect-square bg-muted rounded-xl flex items-center justify-center overflow-hidden border border-border">
              <div className="text-9xl">{product.images[selectedImage]}</div>
              {product.discount > 0 && (
                <Badge className="absolute top-4 left-4 bg-orange-500 text-white text-base px-3 py-1">
                  {product.discount}% OFF
                </Badge>
              )}
            </div>

            {/* Thumbnail Gallery */}
            <div className="flex gap-2">
              {product.images.map((img: string, idx: number) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`w-16 h-16 sm:w-20 sm:h-20 rounded-lg flex items-center justify-center border-2 transition-all text-4xl sm:text-5xl ${
                    selectedImage === idx
                      ? 'border-green-600 bg-muted'
                      : 'border-border hover:border-green-600'
                  }`}
                >
                  {img}
                </button>
              ))}
            </div>
          </div>

          {/* Product Info - Right Side */}
          <div className="space-y-6">
            {/* Title and Rating */}
            <div className="space-y-3">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
                {product.name}
              </h1>
              
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">{product.reviews} reviews</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              {product.description}
            </p>

            {/* Price Section */}
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">Price</div>
              <div className="flex items-center gap-3">
                <span className="text-3xl sm:text-4xl font-bold text-foreground">
                  ${product.price}
                </span>
                <span className="text-lg text-muted-foreground line-through">
                  ${product.originalPrice}
                </span>
              </div>
            </div>

            {/* Benefits */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Check className="h-5 w-5 text-green-600" />
                <span className="text-sm">Country of Origin {product.originCountry}</span>
              </div>
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-5 w-5 text-green-600" />
                <span className="text-sm">Secure Payments</span>
              </div>
              <div className="flex items-center gap-3">
                <Truck className="h-5 w-5 text-green-600" />
                <span className="text-sm">Free Delivery</span>
              </div>
            </div>

            {/* Quantity and Action Buttons */}
            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium">Quantity:</span>
                <div className="flex items-center border border-border rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 hover:bg-muted transition-colors"
                  >
                    −
                  </button>
                  <span className="px-6 py-2 font-medium border-l border-r border-border">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 hover:bg-muted transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={handleAddToCart}
                  variant="outline"
                  className="flex-1 h-12 text-base border-2 border-green-600 text-green-600 hover:bg-green-50 dark:hover:bg-green-950"
                >
                  Add to Cart
                </Button>
                <Button
                  onClick={handleBuyNow}
                  className="flex-1 h-12 text-base bg-green-600 hover:bg-green-700 text-white"
                >
                  Buy Now
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Product Description Section */}
        <div className="border-t border-border pt-12 space-y-8">
          {/* Specifications */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Product Description</h2>
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Specifications:</h3>
              <ul className="space-y-2">
                {product.specifications.map((spec: string, idx: number) => (
                  <li key={idx} className="flex gap-3 text-sm text-muted-foreground">
                    <span className="text-green-600 font-bold">•</span>
                    {spec}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Features:</h3>
            <ul className="space-y-2">
              {product.features.map((feature: string, idx: number) => (
                <li key={idx} className="flex gap-3 text-sm text-muted-foreground">
                  <span className="text-green-600 font-bold">•</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Harvesting */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Harvesting:</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {product.harvesting}
            </p>
          </div>
        </div>

        {/* Similar Products Section */}
        <div className="border-t border-border pt-12 mt-12">
          <h2 className="text-2xl font-bold mb-6">Similar Products</h2>
          <div className="overflow-x-auto pb-2" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            <style>{`div::-webkit-scrollbar { display: none; }`}</style>
            <div className="flex gap-4 min-w-min">
              {product.similarProducts.map((similar: any) => (
                <button
                  key={similar.id}
                  onClick={() => router.push(`/farmer/marketplace/product/${similar.id}`)}
                  className="flex-shrink-0 w-40 sm:w-48 rounded-lg overflow-hidden hover:shadow-lg transition-all hover:scale-105 cursor-pointer bg-card border border-border"
                >
                  <div className="relative w-full aspect-square bg-muted flex items-center justify-center text-5xl">
                    {similar.image}
                    {similar.discount > 0 && (
                      <Badge className="absolute top-2 left-2 bg-orange-500 text-white text-xs">
                        {similar.discount}% OFF
                      </Badge>
                    )}
                  </div>
                  <div className="p-3 space-y-2">
                    <h3 className="text-xs sm:text-sm font-medium text-foreground line-clamp-2">
                      {similar.name}
                    </h3>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm sm:text-base font-bold text-foreground">
                          ₹{similar.price}
                        </span>
                        <span className="text-xs text-muted-foreground line-through">
                          ₹{similar.originalPrice}
                        </span>
                      </div>
                      <p className="text-xs text-green-600 dark:text-green-400 font-medium">
                        Save ₹{similar.originalPrice - similar.price}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
