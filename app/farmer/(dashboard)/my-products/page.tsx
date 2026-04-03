import React from 'react';
import { MyProductsList } from '@/components/farmer/my-products/MyProductsList';

export const metadata = {
  title: 'My Products - AgriSathi',
  description: 'Manage your product listings',
};

export default function MyProductsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Products</h1>
          <p className="text-muted-foreground">
            Manage your product listings and sales
          </p>
        </div>
      </div>

      {/* Products List */}
      <MyProductsList />
    </div>
  );
}
