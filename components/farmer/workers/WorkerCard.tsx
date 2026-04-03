'use client';

import React from 'react';
import { MapPin, Phone, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface WorkerCardProps {
  worker: {
    id: string;
    name: string;
    specialization: string;
    location: string;
    distance: string;
    rating: number;
    reviews: number;
    availability: boolean;
    hourlyRate: number;
    experience: string;
  };
}

export function WorkerCard({ worker }: WorkerCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow overflow-hidden">
      <CardContent className="p-6 space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3 flex-1">
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-xl">
              👷
            </div>
            <div>
              <h3 className="font-semibold text-foreground">{worker.name}</h3>
              <p className="text-sm text-muted-foreground">
                {worker.specialization}
              </p>
            </div>
          </div>
          <Badge
            variant={worker.availability ? 'default' : 'outline'}
          >
            {worker.availability ? 'Available' : 'Busy'}
          </Badge>
        </div>

        {/* Details */}
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>
              {worker.location} • {worker.distance}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="font-medium text-foreground">
              {worker.rating}
            </span>
            <span className="text-muted-foreground">
              ({worker.reviews} reviews)
            </span>
          </div>
          <div className="pt-2 border-t border-border">
            <p className="text-xs text-muted-foreground mb-1">Experience</p>
            <p className="font-medium text-foreground">{worker.experience}</p>
          </div>
        </div>

        {/* Rate & Actions */}
        <div className="space-y-3 pt-2 border-t border-border">
          <p className="text-lg font-bold text-foreground">
            ₹{worker.hourlyRate}
            <span className="text-sm font-normal text-muted-foreground">
              /hour
            </span>
          </p>
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" className="w-full">
              <Phone className="h-4 w-4 mr-1" />
              Call
            </Button>
            <Button className="w-full">Hire</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
