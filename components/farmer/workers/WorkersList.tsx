'use client';

import React from 'react';
import { WorkerCard } from './WorkerCard';

const mockWorkers = [
  {
    id: '1',
    name: 'Rajesh Patel',
    specialization: 'Equipment Operator',
    location: 'Punjab',
    distance: '5 km',
    rating: 4.8,
    reviews: 42,
    availability: true,
    hourlyRate: 500,
    experience: '12 years',
  },
  {
    id: '2',
    name: 'Priya Sharma',
    specialization: 'Soil Specialist',
    location: 'Haryana',
    distance: '8 km',
    rating: 4.6,
    reviews: 28,
    availability: true,
    hourlyRate: 800,
    experience: '8 years',
  },
  {
    id: '3',
    name: 'Vijay Singh',
    specialization: 'Pesticide Consultant',
    location: 'Punjab',
    distance: '12 km',
    rating: 4.7,
    reviews: 35,
    availability: true,
    hourlyRate: 600,
    experience: '10 years',
  },
  {
    id: '4',
    name: 'Meera Gupta',
    specialization: 'Irrigation Expert',
    location: 'Haryana',
    distance: '3 km',
    rating: 4.5,
    reviews: 19,
    availability: false,
    hourlyRate: 700,
    experience: '6 years',
  },
  {
    id: '5',
    name: 'Ajay Kumar',
    specialization: 'Farm Labor',
    location: 'Punjab',
    distance: '2 km',
    rating: 4.4,
    reviews: 56,
    availability: true,
    hourlyRate: 300,
    experience: '15 years',
  },
  {
    id: '6',
    name: 'Kavya Patel',
    specialization: 'Seed Selection Expert',
    location: 'Gujarat',
    distance: '15 km',
    rating: 4.9,
    reviews: 22,
    availability: true,
    hourlyRate: 650,
    experience: '7 years',
  },
];

export function WorkersList() {
  return (
    <div>
      <div className="mb-6 space-y-2">
        <h2 className="text-lg font-semibold text-foreground">
          Available Workers & Service Providers
        </h2>
        <p className="text-sm text-muted-foreground">
          {mockWorkers.length} professionals near you
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {mockWorkers.map((worker) => (
          <WorkerCard key={worker.id} worker={worker} />
        ))}
      </div>
    </div>
  );
}
