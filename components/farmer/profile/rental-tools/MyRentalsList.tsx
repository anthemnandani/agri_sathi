'use client';

import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Phone, MessageSquare, Calendar, DollarSign, MapPin } from 'lucide-react';

interface Rental {
  id: string;
  toolName: string;
  category: string;
  image: string;
  owner: {
    name: string;
    location: string;
    contact: string;
  };
  rentalPeriod: {
    from: string;
    to: string;
  };
  dailyRate: number;
  totalCost: number;
  status: 'active' | 'completed' | 'cancelled';
}

interface MyRentalsListProps {
  rentals: Rental[];
  isLoading: boolean;
}

export function MyRentalsList({ rentals, isLoading }: MyRentalsListProps) {
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'completed'>('all');

  const filteredRentals = rentals.filter((rental) => {
    if (filterStatus === 'all') return true;
    return rental.status === filterStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-400';
      case 'completed':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-400';
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (rentals.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-5xl mb-4">📦</div>
        <p className="text-muted-foreground">No rentals yet. Check out the marketplace to rent tools!</p>
        <Button className="mt-4 bg-green-600 hover:bg-green-700">Browse Tools</Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Filter Tabs */}
      <Tabs
        value={filterStatus}
        onValueChange={(value) => setFilterStatus(value as 'all' | 'active' | 'completed')}
      >
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">All ({rentals.length})</TabsTrigger>
          <TabsTrigger value="active">
            Active ({rentals.filter((r) => r.status === 'active').length})
          </TabsTrigger>
          <TabsTrigger value="completed">
            Completed ({rentals.filter((r) => r.status === 'completed').length})
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Rentals List */}
      <div className="space-y-4">
        {filteredRentals.map((rental) => (
          <Card key={rental.id} className="overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-6 space-y-4">
              {/* Header with Tool Info */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex gap-4">
                  <div className="text-5xl">{rental.image}</div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground text-lg">{rental.toolName}</h3>
                    <p className="text-sm text-muted-foreground capitalize">{rental.category}</p>
                    <Badge className={`mt-2 ${getStatusColor(rental.status)}`}>
                      {rental.status.charAt(0).toUpperCase() + rental.status.slice(1)}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Rental Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 py-4 border-t border-b">
                {/* Rental Duration */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
                    <Calendar className="h-4 w-4" />
                    Duration
                  </div>
                  <p className="text-sm font-semibold text-foreground">
                    {new Date(rental.rentalPeriod.from).toLocaleDateString()} -{' '}
                    {new Date(rental.rentalPeriod.to).toLocaleDateString()}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {Math.ceil(
                      (new Date(rental.rentalPeriod.to).getTime() -
                        new Date(rental.rentalPeriod.from).getTime()) /
                        (1000 * 60 * 60 * 24)
                    )}{' '}
                    days
                  </p>
                </div>

                {/* Cost */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
                    <DollarSign className="h-4 w-4" />
                    Cost
                  </div>
                  <p className="text-sm font-semibold text-foreground">₹{rental.totalCost.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">₹{rental.dailyRate}/day</p>
                </div>

                {/* Owner Location */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
                    <MapPin className="h-4 w-4" />
                    Owner Location
                  </div>
                  <p className="text-sm font-semibold text-foreground">{rental.owner.location}</p>
                </div>
              </div>

              {/* Owner Info and Actions */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <p className="text-xs text-muted-foreground font-medium">Owner</p>
                  <p className="text-sm font-semibold text-foreground">{rental.owner.name}</p>
                </div>
                <div className="flex gap-2">
                  <a href={`tel:${rental.owner.contact}`}>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Phone className="h-4 w-4" />
                      <span className="hidden sm:inline">Call</span>
                    </Button>
                  </a>
                  <Button variant="outline" size="sm" className="gap-2">
                    <MessageSquare className="h-4 w-4" />
                    <span className="hidden sm:inline">Message</span>
                  </Button>
                  {rental.status === 'active' && (
                    <Button variant="default" size="sm" className="bg-green-600 hover:bg-green-700">
                      Extend Rental
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
