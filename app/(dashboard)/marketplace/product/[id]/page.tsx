'use client';

import React, { use } from 'react';
import { ProductDetail } from '@/components/farmer/marketplace/ProductDetail';

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  return <ProductDetail productId={id} />;
}
