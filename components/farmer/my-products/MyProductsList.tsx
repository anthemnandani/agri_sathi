'use client';

import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MyProductCard } from './MyProductCard';

const mockProducts = [
  {
    id: '1',
    title: 'Premium Wheat Seeds',
    price: 2500,
    image: '🌾',
    status: 'Active',
    views: 234,
    inquiries: 12,
    sold: 45,
  },
  {
    id: '2',
    title: 'Organic Fertilizer',
    price: 1500,
    image: '🟤',
    status: 'Active',
    views: 156,
    inquiries: 8,
    sold: 28,
  },
  {
    id: '3',
    title: 'Water Pump 2HP',
    price: 8500,
    image: '⚙️',
    status: 'Inactive',
    views: 89,
    inquiries: 2,
    sold: 5,
  },
  {
    id: '4',
    title: 'Rice Seeds',
    price: 3200,
    image: '🌾',
    status: 'Sold Out',
    views: 412,
    inquiries: 24,
    sold: 100,
  },
];

export function MyProductsList() {
  const activeProducts = mockProducts.filter((p) => p.status === 'Active');
  const inactiveProducts = mockProducts.filter((p) => p.status === 'Inactive');
  const soldOutProducts = mockProducts.filter((p) => p.status === 'Sold Out');

  return (
    <div className="space-y-4">
      {/* Tabs */}
      <Tabs defaultValue="active" className="w-full">
        <TabsList>
          <TabsTrigger value="active">
            Active ({activeProducts.length})
          </TabsTrigger>
          <TabsTrigger value="inactive">
            Inactive ({inactiveProducts.length})
          </TabsTrigger>
          <TabsTrigger value="sold">
            Sold Out ({soldOutProducts.length})
          </TabsTrigger>
        </TabsList>

        {/* Active Tab */}
        <TabsContent value="active" className="space-y-4 mt-4">
          {activeProducts.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                No active products. Create your first listing!
              </p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {activeProducts.map((product) => (
                <MyProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </TabsContent>

        {/* Inactive Tab */}
        <TabsContent value="inactive" className="space-y-4 mt-4">
          {inactiveProducts.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                No inactive products.
              </p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {inactiveProducts.map((product) => (
                <MyProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </TabsContent>

        {/* Sold Out Tab */}
        <TabsContent value="sold" className="space-y-4 mt-4">
          {soldOutProducts.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                No sold out products.
              </p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {soldOutProducts.map((product) => (
                <MyProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
