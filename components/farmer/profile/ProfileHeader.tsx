'use client';

import React from 'react';
import { Edit, Share2, MoreVertical } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function ProfileHeader() {
  // Mock user data
  const user = {
    name: 'Rajesh Kumar',
    location: 'Punjab, India',
    pincode: '140001',
    crops: ['Wheat', 'Rice', 'Maize'],
    bio: 'Passionate farmer dedicated to sustainable agriculture. 20 years of farming experience.',
    followers: 256,
    following: 145,
    rating: 4.8,
    verified: true,
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Avatar */}
          <div className="h-24 w-24 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-4xl">
            🌾
          </div>

          {/* User Info */}
          <div className="flex-1">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold text-foreground">
                    {user.name}
                  </h1>
                  {user.verified && (
                    <Badge variant="secondary">✓ Verified</Badge>
                  )}
                </div>
                <p className="text-muted-foreground">{user.location}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4 mr-1" />
                  Edit Profile
                </Button>
                <Button variant="outline" size="icon">
                  <Share2 className="h-4 w-4" />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Block User</DropdownMenuItem>
                    <DropdownMenuItem>Report</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Bio */}
            <p className="text-sm text-muted-foreground mb-4">{user.bio}</p>

            {/* Crops Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {user.crops.map((crop) => (
                <Badge key={crop} variant="secondary">
                  {crop}
                </Badge>
              ))}
            </div>

            {/* Stats */}
            <div className="flex gap-6">
              <div>
                <p className="text-xs text-muted-foreground">Followers</p>
                <p className="text-lg font-semibold text-foreground">
                  {user.followers}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Following</p>
                <p className="text-lg font-semibold text-foreground">
                  {user.following}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Rating</p>
                <p className="text-lg font-semibold text-foreground">
                  ⭐ {user.rating}
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
