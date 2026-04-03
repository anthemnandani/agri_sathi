'use client';

import React, { useState } from 'react';
import { Heart, MessageCircle, Share2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface PostCardProps {
  post: {
    id: string;
    author: {
      name: string;
      role: string;
      avatar: string;
    };
    content: string;
    timestamp: string;
    likes: number;
    comments: number;
    liked: boolean;
  };
}

export function PostCard({ post }: PostCardProps) {
  const [liked, setLiked] = useState(post.liked);
  const [likeCount, setLikeCount] = useState(post.likes);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="pt-6">
        {/* Author Info */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex gap-3">
            <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center text-lg">
              {post.author.avatar}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <p className="font-semibold text-foreground">
                  {post.author.name}
                </p>
                <span className="text-xs bg-accent text-accent-foreground px-2 py-1 rounded">
                  {post.author.role}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">{post.timestamp}</p>
            </div>
          </div>
        </div>

        {/* Post Content */}
        <p className="text-foreground mb-4 leading-relaxed">{post.content}</p>

        {/* Engagement Stats */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4 py-2 border-y border-border">
          <div className="hover:text-primary cursor-pointer">
            {likeCount} likes
          </div>
          <div className="hover:text-primary cursor-pointer">
            {post.comments} comments
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLike}
            className={cn(
              'flex-1 gap-2',
              liked && 'text-red-500 hover:text-red-600'
            )}
          >
            <Heart
              className={cn('h-4 w-4', liked && 'fill-current')}
            />
            Like
          </Button>
          <Button variant="ghost" size="sm" className="flex-1 gap-2">
            <MessageCircle className="h-4 w-4" />
            Comment
          </Button>
          <Button variant="ghost" size="sm" className="flex-1 gap-2">
            <Share2 className="h-4 w-4" />
            Share
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
