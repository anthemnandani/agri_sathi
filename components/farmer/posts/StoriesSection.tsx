'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

const stories = [
  { id: 1, name: 'Your Story', image: '👨‍🌾', isYourStory: true },
  { id: 2, name: 'Jandi devi', image: '👩‍🌾' },
  { id: 3, name: 'Lusi', image: '👩‍🌾' },
  { id: 4, name: 'Sohan yadav', image: '👨‍🌾' },
  { id: 5, name: 'Vinay shaah', image: '👨‍🌾' },
  { id: 6, name: 'Ramul', image: '👨‍🌾' },
  { id: 7, name: 'Jaysort mahato', image: '👨‍🌾' },
  { id: 8, name: 'Lusi', image: '👩‍🌾' },
  { id: 9, name: 'Jyoti devi', image: '👩‍🌾' },
];

interface StoriesSectionProps {
  onYourStoryClick?: () => void;
}

export function StoriesSection({ onYourStoryClick }: StoriesSectionProps) {
  return (
    <div className="bg-card rounded-xl border border-border p-4 shadow-sm">
      <div className="flex items-center gap-4 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        <style>{`div::-webkit-scrollbar { display: none; }`}</style>
        {stories.map((story) => (
          <div 
            key={story.id} 
            className="flex flex-col items-center gap-2 cursor-pointer flex-shrink-0"
            onClick={() => story.isYourStory && onYourStoryClick?.()}
          >
            <div className={`relative w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-green-600 p-0.5 flex items-center justify-center text-2xl hover:shadow-lg transition-all ${story.isYourStory ? 'ring-2 ring-green-600 ring-offset-2' : ''}`}>
              {story.image}
            </div>
            <p className="text-xs font-medium text-foreground text-center max-w-16 truncate">
              {story.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
