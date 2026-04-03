import React from 'react';
import { PostCreate } from '@/components/farmer/home/PostCreate';
import { FeedSection } from '@/components/farmer/home/FeedSection';

export const metadata = {
  title: 'Posts - AgriSathi',
  description: 'Share and discover farming posts from your community',
};

export default function PostsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Community Posts</h1>
        <p className="text-muted-foreground">Share your farming journey and connect with other farmers</p>
      </div>

      {/* Create Post */}
      <PostCreate />

      {/* Feed */}
      <FeedSection />
    </div>
  );
}
