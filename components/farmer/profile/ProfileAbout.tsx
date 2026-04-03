'use client';

import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export function ProfileAbout() {
  const userInfo = {
    email: 'rajesh@example.com',
    phone: '+91 98765 43210',
    landSize: 5.5,
    district: 'Ludhiana',
    joinedDate: 'January 2022',
    totalPosts: 34,
    totalProducts: 12,
  };

  const crops = [
    { name: 'Wheat', experience: '20 years' },
    { name: 'Rice', experience: '15 years' },
    { name: 'Maize', experience: '8 years' },
    { name: 'Cotton', experience: '5 years' },
  ];

  const recentProducts = [
    { title: 'Premium Wheat Seeds', date: '2 weeks ago' },
    { title: 'Organic Fertilizer', date: '1 month ago' },
    { title: 'Water Pump 2HP', date: '1 month ago' },
  ];

  return (
    <Tabs defaultValue="about" className="space-y-4">
      <TabsList>
        <TabsTrigger value="about">About</TabsTrigger>
        <TabsTrigger value="crops">Crops</TabsTrigger>
        <TabsTrigger value="products">Products</TabsTrigger>
      </TabsList>

      {/* About Tab */}
      <TabsContent value="about" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Email</p>
              <p className="font-medium text-foreground">{userInfo.email}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Phone</p>
              <p className="font-medium text-foreground">{userInfo.phone}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Farm Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Land Size</p>
              <p className="font-medium text-foreground">
                {userInfo.landSize} hectares
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">District</p>
              <p className="font-medium text-foreground">{userInfo.district}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Member Since</p>
              <p className="font-medium text-foreground">
                {userInfo.joinedDate}
              </p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Crops Tab */}
      <TabsContent value="crops" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Crops Grown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {crops.map((crop) => (
                <div
                  key={crop.name}
                  className="flex items-center justify-between py-2 border-b border-border last:border-0"
                >
                  <div>
                    <p className="font-medium text-foreground">{crop.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {crop.experience}
                    </p>
                  </div>
                  <Badge variant="secondary">Growing</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Products Tab */}
      <TabsContent value="products" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              Recent Products ({userInfo.totalProducts})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentProducts.map((product, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-2 border-b border-border last:border-0"
                >
                  <div>
                    <p className="font-medium text-foreground">
                      {product.title}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Listed {product.date}
                    </p>
                  </div>
                  <Badge variant="outline">View</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
