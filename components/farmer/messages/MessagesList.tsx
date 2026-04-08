'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Search, Video, Phone } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import Link from 'next/link';

const CONVERSATIONS = [
  {
    id: 'user-001',
    name: 'Nandani Singh',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=48&h=48&fit=crop',
    lastMessage: 'Video',
    timestamp: '12:01 pm',
    unread: true,
  },
  {
    id: 'user-002',
    name: 'Ram Kumar',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=48&h=48&fit=crop',
    lastMessage: 'Video',
    timestamp: '12:01 pm',
    unread: false,
  },
  {
    id: 'user-003',
    name: 'Shyam Patel',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=48&h=48&fit=crop',
    lastMessage: 'Video',
    timestamp: '12:01 pm',
    unread: false,
  },
];

interface MessagesListProps {
  selectedChat: string | null;
  onSelectChat: (chatId: string) => void;
}

export function MessagesList({ selectedChat, onSelectChat }: MessagesListProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredConversations = CONVERSATIONS.filter((conv) =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b">
        <h2 className="text-xl font-bold mb-3">Messages</h2>
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* Conversations List */}
      <ScrollArea className="flex-1">
        <div className="space-y-1 p-2">
          {filteredConversations.map((conversation) => (
            <button
              key={conversation.id}
              onClick={() => onSelectChat(conversation.id)}
              className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
                selectedChat === conversation.id
                  ? 'bg-green-100 dark:bg-green-900'
                  : 'hover:bg-accent'
              }`}
            >
              {/* Avatar */}
              <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                <Image
                  src={conversation.avatar}
                  alt={conversation.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0 text-left">
                <p className="font-medium text-sm truncate">{conversation.name}</p>
                <div className="flex items-center gap-1">
                  <Video className="h-3 w-3 text-muted-foreground" />
                  <p className="text-xs text-muted-foreground truncate">
                    {conversation.lastMessage}
                  </p>
                </div>
              </div>

              {/* Time and Unread Badge */}
              <div className="flex flex-col items-end gap-1">
                <p className="text-xs text-muted-foreground">{conversation.timestamp}</p>
                {conversation.unread && (
                  <div className="w-2 h-2 bg-green-600 rounded-full" />
                )}
              </div>
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
