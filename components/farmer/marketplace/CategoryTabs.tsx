'use client';

import React from 'react';
import { Button } from '@/components/ui/button';

interface Category {
  id: string;
  label: string;
}

interface CategoryTabsProps {
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
}

export function CategoryTabs({ categories, selectedCategory, onSelectCategory }: CategoryTabsProps) {
  return (
    <div className="border-b border-border px-3 sm:px-4 md:px-6">
      <div className="flex gap-6 overflow-x-auto pb-0" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        <style>{`div::-webkit-scrollbar { display: none; }`}</style>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onSelectCategory(category.id)}
            className={`py-4 px-2 font-medium text-sm whitespace-nowrap transition-colors border-b-2 ${
              selectedCategory === category.id
                ? 'border-green-600 text-green-600 dark:text-green-500'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>
    </div>
  );
}
