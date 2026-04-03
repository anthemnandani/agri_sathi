import React from 'react';
import PostsTable from '@/components/admin/posts/PostsTable';
import PostFilters from '@/components/admin/posts/PostFilters';

export default function PostsPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Posts Moderation</h1>
        <p className="text-muted-foreground mt-2">Review, approve, or reject community posts.</p>
      </div>

      {/* Filters */}
      <PostFilters />

      {/* Posts Table */}
      <PostsTable />
    </div>
  );
}
