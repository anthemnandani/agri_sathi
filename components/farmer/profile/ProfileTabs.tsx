'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RentalToolsTab } from './RentalToolsTab';

interface ProfileTabsProps {
  activeTab: string;
}

export function ProfileTabs({ activeTab }: ProfileTabsProps) {
  const renderTabContent = () => {
    switch (activeTab.toLowerCase()) {
      case 'bio':
        return (
          <Card>
            <CardHeader>
              <CardTitle>About</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Bio</h3>
                <p className="text-muted-foreground">
                  Passionate farmer dedicated to sustainable agriculture. 20 years of farming experience with focus on organic farming methods.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Specialties</h3>
                <div className="flex flex-wrap gap-2">
                  {['Organic Farming', 'Sustainable Agriculture', 'Crop Rotation'].map((spec) => (
                    <Badge key={spec} variant="secondary">{spec}</Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        );
      case 'crops':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Crops</CardTitle>
              <CardDescription>Crops currently grown</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {['Wheat', 'Rice', 'Maize', 'Sugarcane', 'Cotton', 'Pulses'].map((crop) => (
                  <div key={crop} className="p-4 border rounded-lg text-center hover:bg-accent transition">
                    <p className="font-medium">{crop}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        );
      case 'communities':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Communities</CardTitle>
              <CardDescription>Communities joined</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {['Organic Farming Group', 'Wheat Farmers Association', 'Sustainable Agriculture'].map((community) => (
                  <div key={community} className="p-3 border rounded-lg hover:bg-accent transition">
                    <p className="font-medium text-sm">{community}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        );
      case 'posts':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Recent Posts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((post) => (
                  <div key={post} className="p-4 border rounded-lg hover:bg-accent transition">
                    <p className="text-sm font-medium">Post {post}</p>
                    <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        );
      case 'market place':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Market Place</CardTitle>
              <CardDescription>Products listed for sale</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {['Organic Wheat - 50kg', 'Fresh Vegetables Bundle', 'Dairy Products'].map((product) => (
                  <div key={product} className="p-4 border rounded-lg hover:bg-accent transition">
                    <p className="font-medium text-sm">{product}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        );
      case 'rental tools':
        return <RentalToolsTab />;
      default:
        return null;
    }
  };

  return <div>{renderTabContent()}</div>;
}
