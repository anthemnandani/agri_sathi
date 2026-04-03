'use client';

import React, { useState } from 'react';
import { ImagePlus, Send } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

export function PostCreate() {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

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
          <Textarea
            placeholder="Share your farming experience, ask questions, or post tips..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            disabled={loading}
            className="resize-none"
            rows={4}
          />

          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground"
              disabled={loading}
            >
              <ImagePlus className="h-4 w-4 mr-2" />
              Add Photo
            </Button>

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
