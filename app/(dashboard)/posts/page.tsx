'use client';

import React, { useState } from 'react';
import { PostCreate } from '@/components/farmer/home/PostCreate';
import { FeedSection } from '@/components/farmer/home/FeedSection';
import { ExplorePeople } from '@/components/farmer/posts/ExplorePeople';
import { StoriesSection } from '@/components/farmer/posts/StoriesSection';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export default function PostsPage() {
  const [isStoryModalOpen, setIsStoryModalOpen] = useState(false);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Feed - Left Side */}
      <div className="lg:col-span-2 space-y-6">
        {/* Stories */}
        <StoriesSection onYourStoryClick={() => setIsStoryModalOpen(true)} />

        {/* Feed */}
        <FeedSection />
      </div>

      {/* Right Sidebar - Explore People */}
      <div className="hidden lg:block">
        <ExplorePeople />
      </div>

      {/* Story Creation Modal */}
      <Dialog open={isStoryModalOpen} onOpenChange={setIsStoryModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create Your Story</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <PostCreate />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
