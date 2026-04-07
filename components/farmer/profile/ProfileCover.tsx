'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MessageCircle, Phone, Video, Heart, MapPin, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const PROFILE_DATA = {
  id: 'farmer-001',
  name: 'Nandani Singh',
  title: 'Farmer',
  location: 'Bihar',
  joinedYear: 2024,
  coverImage: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=1200&h=300&fit=crop',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
  bio: 'Passionate farmer dedicated to sustainable agriculture.',
  posts: 1863,
  followers: 12600,
  following: 990,
  isFollowing: false,
};

interface ProfileCoverProps {
  onTabChange: (tab: string) => void;
}

export function ProfileCover({ onTabChange }: ProfileCoverProps) {
  const [isFollowing, setIsFollowing] = useState(PROFILE_DATA.isFollowing);

  return (
    <Card className="overflow-hidden">
      <div className="relative h-48 bg-gradient-to-r from-green-400 to-green-600">
        <Image
          src={PROFILE_DATA.coverImage}
          alt="Cover"
          fill
          className="object-cover"
        />
      </div>

      <CardContent className="pt-0">
        <div className="flex flex-col md:flex-row gap-4 md:gap-6 mb-6">
          {/* Avatar - Positioned over cover */}
          <div className="flex justify-center md:justify-start -mt-16 md:-mt-12">
            <div className="relative w-32 h-32 rounded-full border-4 border-background overflow-hidden bg-muted">
              <Image
                src={PROFILE_DATA.avatar}
                alt={PROFILE_DATA.name}
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Profile Info and Actions */}
          <div className="flex-1 pt-4">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-foreground">{PROFILE_DATA.name}</h1>
                <p className="text-muted-foreground text-sm">{PROFILE_DATA.title}</p>
                
                <div className="flex items-center gap-4 mt-2 flex-wrap">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    {PROFILE_DATA.location}
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    Joined {PROFILE_DATA.joinedYear}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 flex-wrap md:flex-nowrap">
                <Button
                  variant={isFollowing ? 'outline' : 'default'}
                  onClick={() => setIsFollowing(!isFollowing)}
                  className="flex-1 md:flex-none"
                >
                  {isFollowing ? 'Following' : '+ Follow'}
                </Button>
                
                <Link href="/farmer/messages">
                  <Button variant="outline" className="flex-1 md:flex-none">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Message
                  </Button>
                </Link>

                <Link href={`/farmer/voice-call/${PROFILE_DATA.id}`}>
                  <Button variant="outline" size="icon">
                    <Phone className="h-4 w-4" />
                  </Button>
                </Link>

                <Link href={`/farmer/video-call/${PROFILE_DATA.id}`}>
                  <Button variant="outline" size="icon">
                    <Video className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-6 pt-4 border-t">
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase">Posts</p>
                <p className="text-2xl font-bold text-foreground">{PROFILE_DATA.posts.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase">Followers</p>
                <p className="text-2xl font-bold text-foreground">{(PROFILE_DATA.followers / 1000).toFixed(1)}K</p>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase">Following</p>
                <p className="text-2xl font-bold text-foreground">{PROFILE_DATA.following}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-6 border-t pt-4 overflow-x-auto">
          {['Bio', 'Crops', 'Communities', 'Posts', 'Market Place'].map((tab) => (
            <button
              key={tab}
              onClick={() => onTabChange(tab.toLowerCase())}
              className="text-sm font-medium text-muted-foreground hover:text-foreground pb-2 border-b-2 border-transparent hover:border-green-600 transition-colors whitespace-nowrap"
            >
              {tab}
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
