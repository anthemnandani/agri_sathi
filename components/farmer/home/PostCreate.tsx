'use client';

import React, { useState } from 'react';
import { ImagePlus, Video, Send, X } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

export type PostType = 'general' | 'selling-crop' | 'selling-animal' | 'question' | 'tips';

export function PostCreate() {
  const [content, setContent] = useState('');
  const [postType, setPostType] = useState<PostType>('general');
  const [attachments, setAttachments] = useState<{ id: string; type: 'image' | 'video'; name: string }[]>([]);
  const [loading, setLoading] = useState(false);

  const postTypeLabels: Record<PostType, string> = {
    general: 'General Share',
    'selling-crop': 'Selling Crop',
    'selling-animal': 'Selling Animal',
    question: 'Ask Question',
    tips: 'Farming Tips',
  };

  const handleAddImage = () => {
    const id = `img-${Date.now()}`;
    setAttachments([...attachments, { id, type: 'image', name: 'Image' }]);
    toast.success('Image option added');
  };

  const handleAddVideo = () => {
    const id = `vid-${Date.now()}`;
    setAttachments([...attachments, { id, type: 'video', name: 'Video' }]);
    toast.success('Video option added');
  };

  const handleRemoveAttachment = (id: string) => {
    setAttachments(attachments.filter((a) => a.id !== id));
  };

  const handlePost = async () => {
    if (!content.trim()) {
      toast.error('Please write something to post');
      return;
    }

    setLoading(true);
    try {
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success('Post created successfully!');
      setContent('');
      setPostType('general');
      setAttachments([]);
    } catch (error) {
      toast.error('Failed to create post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-4">
          {/* Post Type Selector */}
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              Post Type
            </label>
            <Select value={postType} onValueChange={(value) => setPostType(value as PostType)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="general">General Share</SelectItem>
                <SelectItem value="selling-crop">Selling Crop</SelectItem>
                <SelectItem value="selling-animal">Selling Animal</SelectItem>
                <SelectItem value="question">Ask Question</SelectItem>
                <SelectItem value="tips">Farming Tips</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Content Textarea */}
          <Textarea
            placeholder="Share your farming experience, ask questions, or post tips..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            disabled={loading}
            className="resize-none"
            rows={4}
          />

          {/* Attachments Display */}
          {attachments.length > 0 && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Media ({attachments.length})
              </label>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {attachments.map((attachment) => (
                  <div
                    key={attachment.id}
                    className="relative aspect-square rounded-lg border-2 border-dashed border-border bg-muted/50 flex items-center justify-center group"
                  >
                    <div className="text-center">
                      {attachment.type === 'image' ? (
                        <ImagePlus className="h-6 w-6 mx-auto text-muted-foreground" />
                      ) : (
                        <Video className="h-6 w-6 mx-auto text-muted-foreground" />
                      )}
                      <p className="text-xs text-muted-foreground mt-1">{attachment.name}</p>
                    </div>
                    <button
                      onClick={() => handleRemoveAttachment(attachment.id)}
                      className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground"
                disabled={loading}
                onClick={handleAddImage}
              >
                <ImagePlus className="h-4 w-4 mr-2" />
                Add Photo
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground"
                disabled={loading}
                onClick={handleAddVideo}
              >
                <Video className="h-4 w-4 mr-2" />
                Add Video
              </Button>
            </div>

            <Button
              onClick={handlePost}
              disabled={loading || !content.trim()}
            >
              <Send className="h-4 w-4 mr-2" />
              {loading ? 'Posting...' : 'Post'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
