'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { CheckCircle, XCircle, MoreHorizontal, Eye, MessageCircle } from 'lucide-react';
import PostModal from './PostModal';

interface Post {
  id: string;
  author: string;
  title: string;
  category: string;
  status: 'pending' | 'approved' | 'rejected';
  date: string;
  content: string;
  likes: number;
  comments: number;
}

const mockPosts: Post[] = [
  {
    id: '1',
    author: 'Rajesh Kumar',
    title: 'Best practices for rice cultivation',
    category: 'Agriculture',
    status: 'pending',
    date: '2024-03-15',
    content: 'Tips and tricks for growing healthy rice crops...',
    likes: 45,
    comments: 8,
  },
  {
    id: '2',
    author: 'Priya Sharma',
    title: 'Organic fertilizer guide',
    category: 'Education',
    status: 'approved',
    date: '2024-03-14',
    content: 'Complete guide on using organic fertilizers...',
    likes: 120,
    comments: 25,
  },
  {
    id: '3',
    author: 'Arjun Singh',
    title: 'Looking for dairy workers',
    category: 'Marketplace',
    status: 'rejected',
    date: '2024-03-13',
    content: 'Hiring skilled dairy workers...',
    likes: 0,
    comments: 0,
  },
  {
    id: '4',
    author: 'Meera Patel',
    title: 'Pest control methods',
    category: 'Education',
    status: 'pending',
    date: '2024-03-12',
    content: 'Natural and effective pest control...',
    likes: 32,
    comments: 6,
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'approved':
      return 'bg-emerald-100 text-emerald-800';
    case 'pending':
      return 'bg-green-100 text-green-800';
    case 'rejected':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'Agriculture':
      return 'bg-emerald-100/50 text-emerald-700';
    case 'Education':
      return 'bg-blue-100/50 text-blue-700';
    case 'Marketplace':
      return 'bg-green-100/50 text-green-700';
    default:
      return 'bg-gray-100/50 text-gray-700';
  }
};

export default function PostsTable() {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Card className="border border-border">
        <CardHeader className="border-b border-border">
          <CardTitle>Community Posts</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-border hover:bg-transparent">
                  <TableHead>Author</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-center">Engagement</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockPosts.map((post) => (
                  <TableRow
                    key={post.id}
                    className="border-b border-border hover:bg-muted/50 transition-colors"
                  >
                    <TableCell className="font-medium">{post.author}</TableCell>
                    <TableCell>
                      <div className="max-w-xs">
                        <p className="font-medium truncate">{post.title}</p>
                        <p className="text-sm text-muted-foreground truncate">{post.content}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getCategoryColor(post.category)}>
                        {post.category}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(post.status)}>
                        {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center text-sm">
                      <div className="flex items-center justify-center gap-2">
                        <span className="flex items-center gap-1">
                          <Eye size={14} />
                          {post.likes}
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageCircle size={14} />
                          {post.comments}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">{post.date}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal size={16} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedPost(post);
                              setIsModalOpen(true);
                            }}
                          >
                            <Eye size={16} className="mr-2" />
                            View Details
                          </DropdownMenuItem>
                          {post.status === 'pending' && (
                            <>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-emerald-600">
                                <CheckCircle size={16} className="mr-2" />
                                Approve
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">
                                <XCircle size={16} className="mr-2" />
                                Reject
                              </DropdownMenuItem>
                            </>
                          )}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            Remove Post
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Post Modal */}
      <PostModal
        post={selectedPost}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
