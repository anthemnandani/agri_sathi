'use client';

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { CheckCircle, XCircle, Eye, MessageCircle } from 'lucide-react';

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

interface PostModalProps {
  post: Post | null;
  isOpen: boolean;
  onClose: () => void;
}

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

export default function PostModal({ post, isOpen, onClose }: PostModalProps) {
  if (!post) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-96 overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">{post.title}</DialogTitle>
          <DialogDescription>by {post.author} · {post.date}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Badges */}
          <div className="flex gap-2">
            <Badge className={getStatusColor(post.status)}>
              {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
            </Badge>
            <Badge variant="outline">{post.category}</Badge>
          </div>

          <Separator />

          {/* Content */}
          <div>
            <p className="text-sm font-medium mb-2">Post Content</p>
            <p className="text-sm text-foreground bg-muted p-4 rounded-lg">{post.content}</p>
          </div>

          {/* Engagement Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="p-3 bg-muted rounded-lg text-center">
              <p className="text-lg font-bold">{post.likes}</p>
              <p className="text-xs text-muted-foreground flex items-center justify-center gap-1 mt-1">
                <Eye size={12} />
                Views
              </p>
            </div>
            <div className="p-3 bg-muted rounded-lg text-center">
              <p className="text-lg font-bold">{post.comments}</p>
              <p className="text-xs text-muted-foreground flex items-center justify-center gap-1 mt-1">
                <MessageCircle size={12} />
                Comments
              </p>
            </div>
            <div className="p-3 bg-muted rounded-lg text-center">
              <p className="text-lg font-bold">98%</p>
              <p className="text-xs text-muted-foreground">Engagement Rate</p>
            </div>
          </div>

          <Separator />

          {/* Moderation Actions */}
          {post.status === 'pending' && (
            <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900 rounded-lg p-4">
              <p className="text-sm font-medium text-green-900 dark:text-green-200 mb-3">
                Moderation Required
              </p>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" className="gap-2 text-emerald-600 hover:text-emerald-700">
                  <CheckCircle size={16} />
                  Approve
                </Button>
                <Button variant="outline" className="gap-2 text-red-600 hover:text-red-700">
                  <XCircle size={16} />
                  Reject
                </Button>
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          {post.status === 'approved' && (
            <Button variant="destructive">Remove Post</Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
