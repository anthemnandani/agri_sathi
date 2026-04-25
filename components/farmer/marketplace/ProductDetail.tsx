'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Star, Check, Truck, ShieldCheck, MapPin, Phone, MessageSquare, Wrench, Calendar, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';

const productDatabase: Record<string, any> = {
  '1': {
    id: '1',
    name: 'Apollo Chinese Cabbage F1',
    price: 187,
    originalPrice: 240,
    discount: 22,
    rating: 4.5,
    reviews: 142,
    image: '🥬',
    images: ['🥬', '🌱', '🥬', '🥕'],
    description: 'Apollo Chinese Cabbage is a fresh, premium leafy vegetable with a crisp texture and mild sweetness. Perfect for salads, stir-fries, and soups, it adds crunch and essential nutrients to your meals.',
    longDescription: 'Apollo Chinese Cabbage F1 is a premium quality hybrid seed variety developed for Indian farmers. It offers excellent field holding capacity and strong disease resistance. The variety is suitable for spring and early summer planting and produces uniform, high-quality heads with bright green external color and light yellow internal color. Perfect for commercial cultivation and high-value crop production.',
    category: 'Seeds',
    originCountry: 'India',
    sku: 'ACB-F1-250',
    inStock: true,
    stockQuantity: 45,
    specifications: {
      'Head Weight': '5.5 lbs',
      'Maturity': '65 days',
      'Plant Height': 'Moderate',
      'External Color': 'Bright green',
      'Internal Color': 'Light yellow',
      'Suitable Season': 'Spring to early summer'
    },
    features: [
      'Excellent field holding and harvest flexibility',
      'Strong tolerance to heat and heat spikes',
      'Strong resistance to Clubroot disease',
      'Reduced disease pressure in humid climates',
      'Uniform head size and quality',
      'High market value'
    ],
    harvesting: 'Approximately 65 days after sowing. Note: Chinese Cabbage requires vernalization. Bud differentiation and bolting results from low temperatures of 5°C for a week or 10°C for two weeks. For spring harvest, transplant seedlings with 5-7 true leaves raised at 23-24°C during the day.',
    usage: 'Fresh consumption, salads, stir-fries, soups. Can be stored for extended periods in cool conditions.',
    seller: {
      name: 'AgroSeeds India',
      rating: 4.7,
      reviews: 287,
      joinedDate: '2019',
      location: 'Punjab',
      responseTime: '2-4 hours',
      contact: '+91-9876543210'
    },
    benefits: [
      'Original verified seeds',
      'High germination rate',
      'Certified by agricultural department',
      'Free delivery on orders above ₹500',
      '30-day replacement guarantee'
    ],
    similarProducts: [
      { id: '2', name: 'Exfoliated Vermiculite - 1 kg', price: 200, originalPrice: 240, discount: 15, image: '🌱' },
      { id: '3', name: 'NPK Fertilizer - 5 kg', price: 280, originalPrice: 350, discount: 20, image: '🌾' },
      { id: '4', name: 'Organic Pesticide - 500 ml', price: 150, originalPrice: 200, discount: 25, image: '🧪' },
      { id: '5', name: 'Garden Soil - 10 kg', price: 320, originalPrice: 400, discount: 20, image: '🪨' },
    ]
  }
};

// Create entries for all product IDs
for (let i = 2; i <= 15; i++) {
  productDatabase[String(i)] = {
    ...productDatabase['1'],
    id: String(i),
    image: i <= 3 ? '🌱' : i <= 6 ? '🍎' : '🌸',
    seller: {
      ...productDatabase['1'].seller,
      name: `Seller ${i}`
    }
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

      <div className="px-3 sm:px-4 md:px-6 py-8 max-w-7xl mx-auto">
        {/* Main Product Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12">
          {/* Left Column - Product Images */}
          <div className="md:col-span-2 space-y-4">
            {/* Main Image */}
            <div className="relative w-full aspect-square bg-gradient-to-br from-green-100 to-green-50 dark:from-green-900 dark:to-green-950 rounded-xl flex items-center justify-center overflow-hidden border border-border">
              <div className="text-9xl">{product.images[selectedImage]}</div>
              {product.discount > 0 && (
                <Badge className="absolute top-4 left-4 bg-green-600 text-white text-base px-3 py-1">
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
                      ? 'border-green-600 bg-green-50 dark:bg-green-950'
                      : 'border-border hover:border-green-600'
                  }`}
                >
                  {img}
                </button>
              ))}
            </div>
          </div>

          {/* Right Column - Quick Info & Action */}
          <div className="space-y-4">
            {/* Price & Stock Card */}
            <Card className="p-6 space-y-4 bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800">
              {/* Price */}
              <div>
                <div className="text-4xl font-bold text-green-600 mb-1">
                  ₹{product.price}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground line-through">
                    ₹{product.originalPrice}
                  </span>
                  <Badge className="bg-green-600 text-white text-xs">
                    Save ₹{product.originalPrice - product.price}
                  </Badge>
                </div>
              </div>

              {/* Stock Status */}
              <div className="border-t border-green-200 dark:border-green-800 pt-3">
                <p className="text-xs text-muted-foreground mb-1">Stock Available</p>
                <p className="text-lg font-semibold text-green-600">{product.stockQuantity} in stock</p>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2 border-t border-green-200 dark:border-green-800 pt-3">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(product.rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-semibold">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-3">
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium">Quantity:</span>
                  <div className="flex items-center border border-green-600 rounded-lg bg-white dark:bg-slate-950">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-2 hover:bg-green-100 dark:hover:bg-green-900 transition-colors"
                    >
                      −
                    </button>
                    <span className="px-6 py-2 font-medium border-l border-r border-green-600">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-2 hover:bg-green-100 dark:hover:bg-green-900 transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                <Button
                  onClick={handleAddToCart}
                  variant="outline"
                  className="w-full h-12 text-base border-2 border-green-600 text-green-600 hover:bg-green-100 dark:hover:bg-green-900"
                >
                  Add to Cart
                </Button>
                <Button
                  onClick={handleBuyNow}
                  className="w-full h-12 text-base bg-green-600 hover:bg-green-700 text-white font-semibold"
                >
                  Buy Now
                </Button>
              </div>
            </Card>

            {/* Benefits Card */}
            <Card className="p-4 space-y-3">
              <h3 className="font-semibold text-foreground">Why Choose This?</h3>
              {product.benefits.map((benefit: string, idx: number) => (
                <div key={idx} className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">{benefit}</span>
                </div>
              ))}
            </Card>
          </div>
        </div>

        {/* Seller Info Card */}
        <Card className="p-6 mb-12 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {/* Seller Name & Rating */}
            <div>
              <h3 className="text-sm text-muted-foreground mb-2">Sold by</h3>
              <p className="text-lg font-semibold text-foreground">{product.seller.name}</p>
              <div className="flex items-center gap-1 mt-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3 w-3 ${
                        i < Math.floor(product.seller.rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs text-muted-foreground">{product.seller.rating} ({product.seller.reviews} reviews)</span>
              </div>
            </div>

            {/* Location */}
            <div>
              <h3 className="text-sm text-muted-foreground mb-2">Location</h3>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium text-foreground">{product.seller.location}</span>
              </div>
            </div>

            {/* Response Time */}
            <div>
              <h3 className="text-sm text-muted-foreground mb-2">Response Time</h3>
              <p className="text-sm font-medium text-foreground">{product.seller.responseTime}</p>
            </div>

            {/* Contact Actions */}
            <div className="space-y-2">
              <a href={`tel:${product.seller.contact}`} className="block">
                <Button variant="outline" className="w-full gap-2 text-sm h-9">
                  <Phone className="h-4 w-4" />
                  Call Seller
                </Button>
              </a>
              <Button variant="outline" className="w-full gap-2 text-sm h-9">
                <MessageSquare className="h-4 w-4" />
                Message
              </Button>
            </div>
          </div>
        </Card>

        {/* Product Details Tabs */}
        <div className="border-t border-border pt-12 space-y-8">
          {/* Description */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Tag className="h-6 w-6 text-green-600" />
              About This Product
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed">
              {product.longDescription}
            </p>
          </div>

          {/* Specifications */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Wrench className="h-6 w-6 text-green-600" />
              Specifications
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="border border-border rounded-lg p-4">
                  <p className="text-xs text-muted-foreground font-medium capitalize mb-1">
                    {key}
                  </p>
                  <p className="text-sm font-semibold text-foreground">{String(value)}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Features */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {product.features.map((feature: string, idx: number) => (
                <div key={idx} className="flex gap-3 p-3 bg-muted/50 rounded-lg">
                  <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
                  <span className="text-sm text-foreground">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Harvesting & Usage */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Calendar className="h-5 w-5 text-green-600" />
                Harvesting Guidelines
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {product.harvesting}
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Usage & Storage</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {product.usage}
              </p>
            </div>
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
                  <div className="relative w-full aspect-square bg-gradient-to-br from-green-100 to-green-50 dark:from-green-900 dark:to-green-950 flex items-center justify-center text-5xl">
                    {similar.image}
                    {similar.discount > 0 && (
                      <Badge className="absolute top-2 left-2 bg-green-600 text-white text-xs">
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
