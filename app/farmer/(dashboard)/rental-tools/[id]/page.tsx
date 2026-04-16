'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeft, Phone, MessageSquare, MapPin, Calendar, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { BookingModal } from '@/components/farmer/rental-tools/BookingModal';
import { ReviewSection } from '@/components/farmer/rental-tools/ReviewSection';

interface Tool {
  id: string;
  name: string;
  image: string;
  price: number;
  rating: number;
  reviews: number;
  description: string;
  longDescription: string;
  specifications: Record<string, string | number>;
  availability: string[];
  owner: {
    name: string;
    contact: string;
    village: string;
    distance: string;
    responseTime: string;
    joinedDate: string;
  };
  amenities: string[];
}

export default function ToolDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [tool, setTool] = useState<Tool | null>(null);
  const [loading, setLoading] = useState(true);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [toolId, setToolId] = useState<string>('');

  useEffect(() => {
    const getToolId = async () => {
      const { id } = await params;
      setToolId(id);
    };
    getToolId();
  }, [params]);

  useEffect(() => {
    const fetchTool = async () => {
      if (!toolId) return;
      try {
        setLoading(true);
        const response = await fetch(`/api/rental-tools/${toolId}`);
        
        if (response.ok) {
          const result = await response.json();
          setTool(result.data);
        }
      } catch (error) {
        console.error('[v0] Error fetching tool:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTool();
  }, [toolId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-4 md:p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-12 bg-muted rounded" />
          <div className="h-64 bg-muted rounded" />
          <div className="h-32 bg-muted rounded" />
        </div>
      </div>
    );
  }

  if (!tool) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="p-8 text-center max-w-md">
          <div className="text-4xl mb-4">❌</div>
          <h2 className="text-xl font-semibold text-foreground mb-2">Tool not found</h2>
          <p className="text-sm text-muted-foreground mb-4">The rental tool you are looking for does not exist.</p>
          <Link href="/farmer/rental-tools">
            <Button className="mt-4 bg-green-600 hover:bg-green-700">
              Back to listing
            </Button>
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header with Back Button */}
      <div className="border-b border-border p-4 md:p-6">
        <Link href="/farmer/rental-tools">
          <Button variant="ghost" className="mb-4 gap-2">
            <ChevronLeft className="h-5 w-5" />
            Back
          </Button>
        </Link>
        <h1 className="text-2xl md:text-3xl font-bold">{tool.name}</h1>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 md:p-6">
        {/* Left Column - Images and Details */}
        <div className="md:col-span-2 space-y-6">
          {/* Image */}
          <Card className="bg-gradient-to-br from-green-100 to-green-200 p-12 text-center text-6xl rounded-lg">
            {tool.image}
          </Card>

          {/* Description */}
          <Card className="p-6 space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                About this tool
              </h3>
              <p className="text-foreground text-sm leading-relaxed">
                {tool.longDescription}
              </p>
            </div>
          </Card>

          {/* Specifications */}
          {tool.specifications && (
            <Card className="p-6 space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Specifications</h3>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(tool.specifications).map(([key, value]) => (
                  <div key={key} className="border-b border-border pb-3">
                    <p className="text-xs text-muted-foreground capitalize">
                      {key.replace(/([A-Z])/g, ' $1')}
                    </p>
                    <p className="text-sm font-semibold text-foreground">{String(value)}</p>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Amenities */}
          {tool.amenities && tool.amenities.length > 0 && (
            <Card className="p-6 space-y-4">
              <h3 className="text-lg font-semibold text-foreground">What&apos;s included</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {tool.amenities.map((amenity, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="text-green-600">✓</span>
                    <span className="text-sm text-foreground">{amenity}</span>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Availability */}
          <Card className="p-6 space-y-4">
            <h3 className="text-lg font-semibold text-foreground">
              <Calendar className="inline h-5 w-5 mr-2" />
              Available Days
            </h3>
            <div className="flex flex-wrap gap-2">
              {tool.availability.map((day) => (
                <span
                  key={day}
                  className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold"
                >
                  {day}
                </span>
              ))}
            </div>
          </Card>

          {/* Reviews */}
          <ReviewSection toolId={params.id} />
        </div>

        {/* Right Column - Booking Card and Owner Info */}
        <div className="space-y-4 md:sticky md:top-6 h-fit">
          {/* Price and Booking Card */}
          <Card className="p-6 space-y-4 bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800">
            <div>
              <div className="text-4xl font-bold text-green-600 mb-1">
                ₹{tool.price}
              </div>
              <p className="text-sm text-muted-foreground">per day</p>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2 pb-4 border-b border-green-200 dark:border-green-800">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(tool.rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-semibold text-foreground">
                {tool.rating} ({tool.reviews} reviews)
              </span>
            </div>

            <Button
              onClick={() => setShowBookingModal(true)}
              className="w-full bg-green-600 hover:bg-green-700 h-12 text-base font-semibold"
            >
              Request Booking
            </Button>
          </Card>

          {/* Owner Info */}
          <Card className="p-6 space-y-4">
            <h3 className="font-semibold text-foreground">Tool Owner</h3>

            <div className="space-y-3">
              <div>
                <p className="text-xs text-muted-foreground">Name</p>
                <p className="text-sm font-semibold text-foreground">
                  {tool.owner.name}
                </p>
              </div>

              <div>
                <p className="text-xs text-muted-foreground">Location</p>
                <div className="flex items-center gap-2 mt-1">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-foreground">
                    {tool.owner.village} ({tool.owner.distance})
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <p className="text-muted-foreground">Response Time</p>
                  <p className="font-semibold text-foreground">
                    {tool.owner.responseTime}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Joined</p>
                  <p className="font-semibold text-foreground">
                    {tool.owner.joinedDate}
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Buttons */}
            <div className="border-t border-border pt-4 space-y-2">
              <a href={`tel:${tool.owner.contact}`} className="block">
                <Button variant="outline" className="w-full gap-2">
                  <Phone className="h-4 w-4" />
                  Call Owner
                </Button>
              </a>
              <Button variant="outline" className="w-full gap-2">
                <MessageSquare className="h-4 w-4" />
                Message Owner
              </Button>
            </div>
          </Card>
        </div>
      </div>

      {/* Booking Modal */}
      <BookingModal
        isOpen={showBookingModal}
        onClose={() => setShowBookingModal(false)}
        tool={{
          id: tool.id,
          name: tool.name,
          price: tool.price,
          image: tool.image,
          owner: {
            name: tool.owner.name,
            contact: tool.owner.contact,
          },
        }}
      />
    </div>
  );
}
