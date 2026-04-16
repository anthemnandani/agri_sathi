'use client';

import React from 'react';
import Link from 'next/link';
import { Star, MapPin, Phone, MessageSquare } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Tool {
  id: string;
  name: string;
  image: string;
  price: number;
  rating: number;
  reviews: number;
  category: string;
  owner: {
    name: string;
    village: string;
    distance: string;
  };
  description: string;
}

interface RentalToolCardProps {
  tool: Tool;
}

export function RentalToolCard({ tool }: RentalToolCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
      {/* Image Section */}
      <div className="bg-gradient-to-br from-green-100 to-green-200 p-8 text-center text-5xl flex items-center justify-center h-40">
        {tool.image}
      </div>

      {/* Content Section */}
      <div className="flex-1 p-4 flex flex-col">
        <h3 className="font-semibold text-foreground text-sm line-clamp-2 mb-2">
          {tool.name}
        </h3>

        {/* Price */}
        <div className="mb-3">
          <div className="text-lg font-bold text-green-600">
            ₹{tool.price}
            <span className="text-xs text-muted-foreground font-normal">/day</span>
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          <div className="flex items-center">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="ml-1 text-sm font-semibold text-foreground">
              {tool.rating}
            </span>
          </div>
          <span className="text-xs text-muted-foreground">
            ({tool.reviews} reviews)
          </span>
        </div>

        {/* Owner Info */}
        <div className="space-y-2 mb-4 text-xs">
          <div className="flex items-start gap-2">
            <span className="font-semibold text-foreground min-w-fit">
              {tool.owner.name}
            </span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
            <span>{tool.owner.village}</span>
          </div>
          <div className="text-muted-foreground">{tool.owner.distance}</div>
        </div>

        {/* Buttons */}
        <div className="mt-auto space-y-2 pt-4 border-t border-border">
          <Link href={`/farmer/rental-tools/${tool.id}`} className="block">
            <Button
              variant="default"
              size="sm"
              className="w-full bg-green-600 hover:bg-green-700"
            >
              View Details
            </Button>
          </Link>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 h-9"
              title="Call owner"
            >
              <Phone className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex-1 h-9"
              title="Message owner"
            >
              <MessageSquare className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
