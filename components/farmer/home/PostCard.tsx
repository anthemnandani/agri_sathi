'use client';

import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, MoreVertical, X } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { toast } from 'sonner';

interface PostCardProps {
  post: {
    id: string;
    author: {
      name: string;
      role: string;
      avatar: string;
    };
    postType: 'general' | 'selling-crop' | 'selling-animal' | 'question' | 'tips';
    content: string;
    media?: { type: 'image' | 'video'; url: string }[];
    timestamp: string;
    likes: number;
    comments: number;
    liked: boolean;
  };
}

const postTypeBadges: Record<string, { label: string; variant: any }> = {
  general: { label: 'General', variant: 'secondary' },
  'selling-crop': { label: 'Selling Crop', variant: 'outline' },
  'selling-animal': { label: 'Selling Animal', variant: 'outline' },
  question: { label: 'Question', variant: 'default' },
  tips: { label: 'Farming Tips', variant: 'secondary' },
};

export function PostCard({ post }: PostCardProps) {
  const [liked, setLiked] = useState(post.liked);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [commentCount, setCommentCount] = useState(post.comments);
  const [commentText, setCommentText] = useState('');
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<{ id: string; author: string; text: string; timestamp: string }[]>([
    { id: '1', author: 'राज कुमार', text: 'बहुत अच्छा सुझाव है!', timestamp: '2 hours ago' },
    { id: '2', author: 'प्रिया शर्मा', text: 'क्या इसमें और जानकारी दे सकते हो?', timestamp: '1 hour ago' },
  ]);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
    toast.success(liked ? 'Unliked' : 'Liked');
  };

  const handleAddComment = () => {
    if (!commentText.trim()) {
      toast.error('Write a comment first');
      return;
    }

    const newComment = {
      id: `${Date.now()}`,
      author: 'You',
      text: commentText,
      timestamp: 'now',
    };

    setComments([...comments, newComment]);
    setCommentCount(commentCount + 1);
    setCommentText('');
    toast.success('Comment added');
  };

  const handleShare = () => {
    toast.success('Post shared! Link copied to clipboard');
  };

  const badgeInfo = postTypeBadges[post.postType] || postTypeBadges.general;

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="pt-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex gap-3 flex-1">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white font-bold text-sm">
              {post.author.avatar}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <p className="font-semibold text-foreground">
                  {post.author.name}
                </p>
                <Badge variant={badgeInfo.variant as any} className="text-xs">
                  {badgeInfo.label}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">{post.timestamp}</p>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Report Post</DropdownMenuItem>
              <DropdownMenuItem>Hide Post</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Post Content */}
        <p className="text-foreground mb-4 leading-relaxed">{post.content}</p>

        {/* Media Display */}
        {post.media && post.media.length > 0 && (
          <div className="mb-4 rounded-lg overflow-hidden bg-muted">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-2">
              {post.media.map((m, idx) => (
                <div
                  key={idx}
                  className="aspect-square rounded bg-muted-foreground/20 flex items-center justify-center text-muted-foreground text-sm"
                >
                  {m.type === 'image' ? '[Image]' : '[Video]'}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Engagement Stats */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4 py-2 border-y border-border">
          <div className="cursor-pointer hover:text-primary">
            {likeCount} {likeCount === 1 ? 'like' : 'likes'}
          </div>
          <div className="cursor-pointer hover:text-primary">
            {commentCount} {commentCount === 1 ? 'comment' : 'comments'}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 mb-4">
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

          <Dialog open={showComments} onOpenChange={setShowComments}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="sm" className="flex-1 gap-2">
                <MessageCircle className="h-4 w-4" />
                Comment
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Comments</DialogTitle>
                <DialogDescription className="sr-only">View and add comments to this post</DialogDescription>
              </DialogHeader>
              <div className="max-h-80 overflow-y-auto space-y-4 mb-4">
                {comments.map((comment) => (
                  <div key={comment.id} className="flex gap-2">
                    <div className="h-8 w-8 rounded-full bg-muted flex-shrink-0" />
                    <div className="flex-1">
                      <p className="font-medium text-sm">{comment.author}</p>
                      <p className="text-sm text-muted-foreground">{comment.text}</p>
                      <p className="text-xs text-muted-foreground mt-1">{comment.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="Add a comment..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') handleAddComment();
                  }}
                />
                <Button size="sm" onClick={handleAddComment}>
                  Post
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <Button
            variant="ghost"
            size="sm"
            className="flex-1 gap-2"
            onClick={handleShare}
          >
            <Share2 className="h-4 w-4" />
            Share
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
