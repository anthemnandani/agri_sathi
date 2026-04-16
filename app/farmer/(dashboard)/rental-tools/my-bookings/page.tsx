'use client';

import React, { useState, useEffect } from 'react';
import { Calendar, Phone, CheckCircle, Clock, X } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Booking {
  id: string;
  toolId: string;
  toolName: string;
  toolImage: string;
  ownerId: string;
  ownerName: string;
  ownerContact: string;
  startDate: string;
  endDate: string;
  days: number;
  pricePerDay: number;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  paymentStatus: 'pending' | 'completed' | 'refunded';
  bookingDate: string;
  cancellationReason?: string;
}

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'confirmed' | 'completed' | 'cancelled'>('all');

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams();
        if (filter !== 'all') params.append('status', filter);
        params.append('userId', 'user1'); // Mock user ID

        const response = await fetch(`/api/rental-tools/bookings?${params}`);
        if (response.ok) {
          const result = await response.json();
          setBookings(result.data || []);
        }
      } catch (error) {
        console.error('[v0] Error fetching bookings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [filter]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-600" />;
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-blue-600" />;
      case 'cancelled':
        return <X className="h-5 w-5 text-red-600" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-700';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'completed':
        return 'bg-blue-100 text-blue-700';
      case 'cancelled':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const BookingCard = ({ booking }: { booking: Booking }) => (
    <Card className="p-4 md:p-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
        {/* Tool Image */}
        <div className="md:col-span-1">
          <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-lg p-6 text-center text-4xl h-32 flex items-center justify-center">
            {booking.toolImage}
          </div>
        </div>

        {/* Booking Details */}
        <div className="md:col-span-2 space-y-3">
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              {booking.toolName}
            </h3>
            <p className="text-sm text-muted-foreground">Booking ID: {booking.id}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-xs text-muted-foreground">Start Date</p>
              <p className="font-semibold text-foreground">{booking.startDate}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">End Date</p>
              <p className="font-semibold text-foreground">{booking.endDate}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Duration</p>
              <p className="font-semibold text-foreground">{booking.days} days</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Price/Day</p>
              <p className="font-semibold text-foreground">₹{booking.pricePerDay}</p>
            </div>
          </div>

          {booking.status === 'cancelled' && booking.cancellationReason && (
            <div className="bg-red-50 dark:bg-red-950 p-2 rounded text-xs text-red-700 dark:text-red-300">
              <p className="font-semibold">Cancellation Reason:</p>
              <p>{booking.cancellationReason}</p>
            </div>
          )}
        </div>

        {/* Status and Amount */}
        <div className="md:col-span-1 space-y-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              {getStatusIcon(booking.status)}
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(booking.status)}`}>
                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
              </span>
            </div>
            <div className="text-xs text-muted-foreground">
              Payment: {booking.paymentStatus.charAt(0).toUpperCase() + booking.paymentStatus.slice(1)}
            </div>
          </div>

          <div className="border-t border-border pt-4">
            <p className="text-xs text-muted-foreground">Total Amount</p>
            <p className="text-2xl font-bold text-green-600">
              ₹{booking.totalPrice}
            </p>
          </div>

          <div className="space-y-2 pt-4 border-t border-border">
            <Button
              variant="outline"
              size="sm"
              className="w-full gap-2 text-xs"
              asChild
            >
              <a href={`tel:${booking.ownerContact}`}>
                <Phone className="h-3.5 w-3.5" />
                Call Owner
              </a>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-full text-xs"
            >
              Message Owner
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="border-b border-border p-4 md:p-6">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">My Bookings</h1>
        <p className="text-sm md:text-base text-muted-foreground">
          Manage your rental equipment bookings
        </p>
      </div>

      {/* Filters */}
      <div className="border-b border-border p-4 md:p-6">
        <Tabs defaultValue="all" onValueChange={(value) => setFilter(value as any)}>
          <TabsList className="grid grid-cols-5 w-full md:w-auto">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Bookings List */}
      <div className="p-4 md:p-6 space-y-4">
        {loading ? (
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-48 bg-muted rounded-lg animate-pulse" />
            ))}
          </div>
        ) : bookings.length > 0 ? (
          <>
            <p className="text-sm text-muted-foreground mb-4">
              Showing {bookings.length} booking{bookings.length !== 1 ? 's' : ''}
            </p>
            <div className="space-y-4">
              {bookings.map((booking) => (
                <BookingCard key={booking.id} booking={booking} />
              ))}
            </div>
          </>
        ) : (
          <Card className="p-12 text-center">
            <div className="text-4xl mb-4">📋</div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              No bookings found
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              You haven&apos;t made any bookings yet
            </p>
            <Button className="bg-green-600 hover:bg-green-700">
              Browse Rental Tools
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
}
