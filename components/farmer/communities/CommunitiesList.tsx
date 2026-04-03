'use client';

import React from 'react';
import { CommunityCard } from './CommunityCard';

const mockCommunities = [
  {
    id: '1',
    name: 'Wheat Farmers Network',
    description:
      'Connect with wheat farmers, share crop diseases, best practices, and market prices.',
    members: 2345,
    icon: '🌾',
    category: 'Crops',
    joined: false,
  },
  {
    id: '2',
    name: 'Organic Farming Community',
    description:
      'Dedicated to organic and sustainable farming practices. Share techniques and products.',
    members: 1856,
    icon: '🌱',
    category: 'Farming Methods',
    joined: true,
  },
  {
    id: '3',
    name: 'Youth Farmers Initiative',
    description:
      'For young farmers starting their agricultural journey. Mentorship and modern techniques.',
    members: 945,
    icon: '👨‍🌾',
    category: 'Demographics',
    joined: false,
  },
  {
    id: '4',
    name: 'Equipment & Tools',
    description:
      'Discussion about farm equipment, rentals, and technology adoption for modern farming.',
    members: 1234,
    icon: '⚙️',
    category: 'Equipment',
    joined: true,
  },
  {
    id: '5',
    name: 'Dairy Farmers Co-operative',
    description:
      'Cattle management, dairy production, and milk market discussions for dairy farmers.',
    members: 1567,
    icon: '🐄',
    category: 'Livestock',
    joined: false,
  },
  {
    id: '6',
    name: 'Vegetable Growers Guild',
    description:
      'Growing vegetables, pest management, seasonal planning, and distribution channels.',
    members: 2100,
    icon: '🥬',
    category: 'Crops',
    joined: false,
  },
];

export function CommunitiesList() {
  return (
    <div>
      <div className="mb-6 space-y-2">
        <h2 className="text-lg font-semibold text-foreground">
          All Communities
        </h2>
        <p className="text-sm text-muted-foreground">
          {mockCommunities.length} communities available
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {mockCommunities.map((community) => (
          <CommunityCard key={community.id} community={community} />
        ))}
      </div>
    </div>
  );
}
