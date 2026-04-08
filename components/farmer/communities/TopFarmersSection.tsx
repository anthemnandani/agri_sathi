'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MoreVertical } from 'lucide-react';
import Image from 'next/image';

interface Farmer {
  id: string;
  name: string;
  specialty: string;
  avatar: string;
  followed: boolean;
}

const topFarmers: Farmer[] = [
  {
    id: '1',
    name: 'Nandani Singh',
    specialty: 'Organic farming specialist',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200',
    followed: false,
  },
  {
    id: '2',
    name: 'Rajesh Kumar',
    specialty: 'Wheat & rice cultivation',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200',
    followed: true,
  },
  {
    id: '3',
    name: 'Priya Sharma',
    specialty: 'Vegetable farming',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200',
    followed: false,
  },
  {
    id: '4',
    name: 'Ramesh Patel',
    specialty: 'Dairy & livestock',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200',
    followed: false,
  },
  {
    id: '5',
    name: 'Anjali Desai',
    specialty: 'Sustainable farming',
    avatar: 'https://images.unsplash.com/photo-1517836357463-d25ddfcbf042?w=200&h=200',
    followed: true,
  },
  {
    id: '6',
    name: 'Vikram Singh',
    specialty: 'Horticulture expert',
    avatar: 'https://images.unsplash.com/photo-1516321318423-f06c6a504b50?w=200&h=200',
    followed: false,
  },
];

export function TopFarmersSection() {
  const [farmers, setFarmers] = useState(topFarmers);

  const handleFollow = (id: string) => {
    setFarmers(
      farmers.map((farmer) =>
        farmer.id === id ? { ...farmer, followed: !farmer.followed } : farmer
      )
    );
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle>Top farmers</CardTitle>
          <Button variant="ghost" size="sm" className="text-xs text-muted-foreground hover:text-foreground">
            See more
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {farmers.slice(0, 5).map((farmer) => (
          <div
            key={farmer.id}
            className="flex items-center justify-between p-3 rounded-lg bg-green-600 hover:bg-green-700 transition-colors"
          >
            <div className="flex items-center gap-3 flex-1">
              <div className="relative w-10 h-10 rounded-full overflow-hidden bg-muted flex-shrink-0">
                <Image
                  src={farmer.avatar}
                  alt={farmer.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="min-w-0">
                <div className="font-semibold text-white text-sm truncate">
                  {farmer.name}
                </div>
                <div className="text-xs text-green-100 truncate">
                  {farmer.specialty}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <Button
                size="sm"
                variant={farmer.followed ? 'secondary' : 'ghost'}
                className={`h-8 text-xs ${
                  farmer.followed
                    ? 'bg-white text-green-600 hover:bg-gray-100'
                    : 'text-white hover:bg-green-600'
                }`}
                onClick={() => handleFollow(farmer.id)}
              >
                {farmer.followed ? 'Following' : 'Follow'}
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 text-white hover:bg-green-600"
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
