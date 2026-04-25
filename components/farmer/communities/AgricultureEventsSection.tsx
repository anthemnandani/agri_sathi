'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Filter } from 'lucide-react';
import Image from 'next/image';

interface Event {
  id: string;
  title: string;
  image: string;
  date: string;
  location: string;
  description: string;
  status: 'Upcoming' | 'Going on' | 'Ongoing';
  highlights: string[];
  targetAudience: string;
}

const events: Event[] = [
  {
    id: '1',
    title: 'Organic Farming Workshop',
    image:
      'https://images.unsplash.com/photo-1488459716781-6918f33427d7?w=600&h=400',
    date: 'April 10, 2025',
    location: 'Bangalore, Karnataka',
    description:
      'Learn the fundamentals of organic farming practices, including composting, crop rotation, and pest control without chemicals.',
    status: 'Upcoming',
    highlights: [
      'Hands-on sessions on compost preparation.',
      'Expert talks on soil health and organic certifications.',
    ],
    targetAudience: 'Organic Farmers, Agriculture Students',
  },
  {
    id: '2',
    title: 'Modern Irrigation Techniques',
    image:
      'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=600&h=400',
    date: 'April 15, 2025',
    location: 'Pune, Maharashtra',
    description:
      'Explore modern irrigation technologies including drip irrigation, sprinkler systems, and water management strategies.',
    status: 'Going on',
    highlights: [
      'Live demonstration of drip irrigation systems.',
      'Cost-benefit analysis of different irrigation methods.',
    ],
    targetAudience: 'All Farmers, Irrigation Experts',
  },
  {
    id: '3',
    title: 'Soil Health & Nutrient Management',
    image:
      'https://images.unsplash.com/photo-1625246333195-78d9c38ad576?w=600&h=400',
    date: 'April 20, 2025',
    location: 'Delhi, India',
    description:
      'Comprehensive training on soil testing, nutrient management, and sustainable farming practices for maximum yield.',
    status: 'Upcoming',
    highlights: [
      'Soil testing and analysis workshop.',
      'Fertilizer application best practices.',
    ],
    targetAudience: 'Smallholder Farmers, Agricultural Scientists',
  },
];

const statusColors = {
  Upcoming: 'bg-blue-100 text-blue-700 hover:bg-blue-200',
  'Going on': 'bg-green-100 text-green-700 hover:bg-green-200',
  Ongoing: 'bg-green-100 text-green-700 hover:bg-green-200',
};

export function AgricultureEventsSection() {
  const [selectedStatus, setSelectedStatus] = useState<
    string | 'Upcoming' | 'Going on' | 'Ongoing'
  >('');

  const filteredEvents = selectedStatus
    ? events.filter((e) => e.status === selectedStatus)
    : events;

  return (
    <div className="space-y-4">
      {/* Header with Filter */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Agriculture Events</h2>
        <Button variant="outline" size="sm" className="gap-2">
          <Filter className="h-4 w-4" />
          Filter
        </Button>
      </div>

      {/* Status Badges */}
      <div className="flex flex-wrap gap-2">
        <Badge
          variant={selectedStatus === '' ? 'default' : 'outline'}
          className="cursor-pointer"
          onClick={() => setSelectedStatus('')}
        >
          All Events
        </Badge>
        {['Upcoming', 'Going on', 'Organic farming'].map((status) => (
          <Badge
            key={status}
            variant={selectedStatus === status ? 'default' : 'outline'}
            className="cursor-pointer"
            onClick={() =>
              setSelectedStatus(
                status as 'Upcoming' | 'Going on' | 'Organic farming'
              )
            }
          >
            {status}
          </Badge>
        ))}
      </div>

      {/* Events Grid */}
      <div className="space-y-4">
        {filteredEvents.map((event) => (
          <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="grid gap-4 md:grid-cols-[300px_1fr]">
              {/* Event Image */}
              <div className="relative h-48 md:h-auto bg-muted overflow-hidden">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover hover:scale-105 transition-transform"
                />
              </div>

              {/* Event Details */}
              <CardContent className="p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold text-foreground">
                      {event.title}
                    </h3>
                    <Badge
                      className={`whitespace-nowrap ${
                        statusColors[event.status as keyof typeof statusColors]
                      }`}
                    >
                      {event.status}
                    </Badge>
                  </div>

                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                    {event.description}
                  </p>

                  {/* Date and Location */}
                  <div className="space-y-2 mb-4 text-sm">
                    <div className="text-foreground">
                      <span className="font-semibold">Date:</span> {event.date}
                    </div>
                    <div className="text-foreground">
                      <span className="font-semibold">Location:</span>{' '}
                      {event.location}
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="mb-4">
                    <div className="font-semibold text-sm text-foreground mb-2">
                      Highlights:
                    </div>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {event.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex gap-2">
                          <span className="text-green-600 font-bold">•</span>
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="text-xs text-muted-foreground">
                    <span className="font-semibold">Target Audience:</span>{' '}
                    {event.targetAudience}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 mt-4 pt-4 border-t">
                  <Button className="flex-1 bg-green-600 hover:bg-green-700">
                    Join event
                  </Button>
                  <Button variant="secondary" className="flex-1">
                    More
                  </Button>
                </div>
              </CardContent>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
