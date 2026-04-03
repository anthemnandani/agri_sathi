'use client';

import React from 'react';
import { Eye, MessageSquare, Edit2, Trash2, Copy } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface MyProductCardProps {
  product: {
    id: string;
    title: string;
    price: number;
    image: string;
    status: string;
    views: number;
    inquiries: number;
    sold: number;
  };
}

export function MyProductCard({ product }: MyProductCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-700';
      case 'Inactive':
        return 'bg-gray-100 text-gray-700';
      case 'Sold Out':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <Card>
      <CardContent className="p-4 space-y-4">
        {/* Product Header */}
        <div className="flex items-start justify-between">
          <div className="flex gap-3 flex-1">
            <div className="h-16 w-16 rounded-lg bg-muted flex items-center justify-center text-3xl">
              {product.image}
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground line-clamp-2">
                {product.title}
              </h3>
              <p className="text-lg font-bold text-primary mt-1">
                ₹{product.price.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                ⋯
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Edit2 className="h-4 w-4 mr-2" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Copy className="h-4 w-4 mr-2" />
                Duplicate
              </DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Status Badge */}
        <Badge className={getStatusColor(product.status)}>
          {product.status}
        </Badge>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 p-3 bg-accent rounded-lg">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Eye className="h-4 w-4 text-muted-foreground" />
              <p className="text-xs text-muted-foreground">Views</p>
            </div>
            <p className="font-semibold text-foreground">{product.views}</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
              <p className="text-xs text-muted-foreground">Inquiries</p>
            </div>
            <p className="font-semibold text-foreground">{product.inquiries}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-muted-foreground mb-1">Sold</p>
            <p className="font-semibold text-foreground">{product.sold}</p>
          </div>
        </div>

        {/* Action Buttons */}
        {product.status === 'Active' && (
          <Button variant="outline" className="w-full" size="sm">
            Mark as Inactive
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
