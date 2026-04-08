import React from 'react';
import { PostCreate } from '@/components/farmer/home/PostCreate';
import { FeedSection } from '@/components/farmer/home/FeedSection';
import { ExplorePeople } from '@/components/farmer/posts/ExplorePeople';
import { StoriesSection } from '@/components/farmer/posts/StoriesSection';

export const metadata = {
  title: 'Posts - AgriSathi',
  description: 'Share and discover agricultural posts from the farming community',
};

export default function PostsPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Feed - Left Side */}
      <div className="lg:col-span-2 space-y-6">
        {/* Stories */}
        <StoriesSection />

        {/* Create Post */}
        <PostCreate />

        {/* Feed */}
        <FeedSection />
      </div>

      {/* Right Sidebar - Explore People */}
      <div className="hidden lg:block">
        <ExplorePeople />
      </div>
    </div>
  );
}
