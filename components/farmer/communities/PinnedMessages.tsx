'use client';

import React, { useEffect, useState } from 'react';
import { Pin, ChevronDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

interface PinnedMessage {
  id: string;
  sender: {
    id: string;
    name: string;
    avatar: string;
  };
  content: string;
  type: 'text' | 'image';
  image?: string;
  createdAt: Date;
}

interface PinnedMessagesProps {
  communityId: string;
}

function PinnedMessageItem({ message }: { message: PinnedMessage }) {
  return (
    <div className="p-3 bg-amber-50 dark:bg-amber-950/20 rounded-lg border border-amber-200 dark:border-amber-900/30">
      <div className="flex items-center gap-2 mb-2">
        <Pin className="h-3.5 w-3.5 text-amber-600" />
        <span className="text-xs font-semibold text-amber-700 dark:text-amber-200">
          PINNED
        </span>
      </div>

      <div className="flex gap-2">
        <Avatar className="h-6 w-6 flex-shrink-0">
          <AvatarImage src={message.sender.avatar} />
          <AvatarFallback>{message.sender.name[0]}</AvatarFallback>
        </Avatar>

        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold">{message.sender.name}</p>
          {message.type === 'text' && (
            <p className="text-xs text-foreground line-clamp-2 mt-1">
              {message.content}
            </p>
          )}
          {message.type === 'image' && (
            <div className="mt-1">
              <img
                src={message.image}
                alt="Pinned"
                className="h-20 w-20 object-cover rounded"
              />
            </div>
          )}
        </div>
      </div>

      <p className="text-xs text-muted-foreground mt-2">
        {new Date(message.createdAt).toLocaleDateString()}
      </p>
    </div>
  );
}

export function PinnedMessages({ communityId }: PinnedMessagesProps) {
  const [pinnedMessages, setPinnedMessages] = useState<PinnedMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const fetchPinnedMessages = async () => {
      try {
        const response = await fetch(
          `/api/communities/${communityId}/messages?pinned=true`
        );
        if (response.ok) {
          const result = await response.json();
          setPinnedMessages(result.data || []);
        }
      } catch (error) {
        console.error('[v0] Error fetching pinned messages:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPinnedMessages();
  }, [communityId]);

  if (loading) {
    return (
      <Card className="flex flex-col min-h-0">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Updates</CardTitle>
        </CardHeader>
        <CardContent className="animate-pulse">
          <div className="h-20 bg-muted rounded" />
        </CardContent>
      </Card>
    );
  }

  if (pinnedMessages.length === 0) {
    return (
      <Card className="flex flex-col min-h-0">
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <Pin className="h-4 w-4" />
            Pinned Updates
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center text-muted-foreground text-sm py-6">
          No pinned messages yet
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="flex flex-col min-h-0">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger className="w-full">
          <div className="flex items-center justify-between p-4 hover:bg-muted rounded-t-lg">
            <CardTitle className="text-base flex items-center gap-2">
              <Pin className="h-4 w-4" />
              Important Updates ({pinnedMessages.length})
            </CardTitle>
            <ChevronDown
              className={`h-4 w-4 transition-transform ${
                isOpen ? 'rotate-180' : ''
              }`}
            />
          </div>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <CardContent className="pt-0 space-y-2 max-h-64 overflow-y-auto">
            {pinnedMessages.map((message) => (
              <PinnedMessageItem key={message.id} message={message} />
            ))}
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}
