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
    <div className="p-3 bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-950/30 dark:to-yellow-950/20 rounded-lg border-l-4 border-amber-500 dark:border-amber-600 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-2 mb-2">
        <Pin className="h-4 w-4 text-amber-600 dark:text-amber-400" />
        <span className="text-xs font-bold text-amber-700 dark:text-amber-200 uppercase tracking-wide">
          Important Update
        </span>
      </div>

      <div className="flex gap-2.5">
        <Avatar className="h-7 w-7 flex-shrink-0 border border-amber-200 dark:border-amber-800">
          <AvatarImage src={message.sender.avatar} />
          <AvatarFallback className="bg-amber-100 text-amber-700 text-xs font-semibold">
            {message.sender.name[0]}
          </AvatarFallback>
        </Avatar>

        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-foreground">{message.sender.name}</p>
          {message.type === 'text' && (
            <p className="text-sm text-foreground line-clamp-3 mt-1 leading-relaxed">
              {message.content}
            </p>
          )}
          {message.type === 'image' && (
            <div className="mt-2">
              <img
                src={message.image}
                alt="Pinned"
                className="h-24 w-24 object-cover rounded-md border border-amber-200 dark:border-amber-800"
              />
            </div>
          )}
          <p className="text-xs text-muted-foreground mt-2">
            {new Date(message.createdAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
        </div>
      </div>
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
      <Card className="flex flex-col min-h-0 border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Pin className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            Important Updates
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center text-muted-foreground text-sm py-8">
          <span className="text-2xl mb-2">📌</span>
          <p>No pinned messages yet</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="flex flex-col min-h-0 border-border overflow-hidden">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger className="w-full">
          <div className="flex items-center justify-between p-4 hover:bg-muted/40 transition-colors border-b border-border">
            <div className="flex items-center gap-2">
              <Pin className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              <CardTitle className="text-base">Important Updates</CardTitle>
              <Badge variant="secondary" className="ml-2 text-xs">
                {pinnedMessages.length}
              </Badge>
            </div>
            <ChevronDown
              className={`h-5 w-5 text-muted-foreground transition-transform ${
                isOpen ? 'rotate-180' : ''
              }`}
            />
          </div>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <CardContent className="pt-3 pb-4 space-y-3 max-h-80 overflow-y-auto">
            {pinnedMessages.map((message) => (
              <PinnedMessageItem key={message.id} message={message} />
            ))}
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}
