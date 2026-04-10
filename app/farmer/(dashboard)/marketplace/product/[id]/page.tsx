'use client';

import React from 'react';
import { ProductDetail } from '@/components/farmer/marketplace/ProductDetail';

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  return <ProductDetail productId={params.id} />;
}
