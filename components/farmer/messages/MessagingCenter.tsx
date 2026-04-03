'use client';

import React, { useState } from 'react';
import { Send, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

const mockConversations = [
  {
    id: '1',
    name: 'Rajesh Kumar',
    lastMessage: 'Thanks for the seeds, they arrived in great condition!',
    timestamp: '2 hours ago',
    unread: true,
    avatar: '👨‍🌾',
  },
  {
    id: '2',
    name: 'Dr. Priya Singh',
    lastMessage: 'Apply the fungicide every 7-10 days for best results',
    timestamp: '5 hours ago',
    unread: false,
    avatar: '👩‍🔬',
  },
  {
    id: '3',
    name: 'Farmer Cooperative',
    lastMessage: 'Next meeting scheduled for April 15th at 10 AM',
    timestamp: '1 day ago',
    unread: false,
    avatar: '🤝',
  },
];

const mockMessages = [
  {
    id: '1',
    sender: 'me',
    text: 'Hi Rajesh, did you receive the wheat seeds?',
    timestamp: '3 hours ago',
  },
  {
    id: '2',
    sender: 'other',
    text: 'Yes! They arrived this morning. Very impressive quality.',
    timestamp: '2 hours ago',
  },
  {
    id: '3',
    sender: 'other',
    text: 'Thanks for the seeds, they arrived in great condition!',
    timestamp: '2 hours ago',
  },
];

export function MessagingCenter() {
  const [selectedConversation, setSelectedConversation] = useState(
    mockConversations[0]
  );
  const [messages, setMessages] = useState(mockMessages);
  const [inputText, setInputText] = useState('');

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    setMessages([
      ...messages,
      {
        id: String(messages.length + 1),
        sender: 'me',
        text: inputText,
        timestamp: 'Just now',
      },
    ]);
    setInputText('');
  };

  return (
    <div className="flex h-full gap-4 p-4 md:p-6">
      {/* Conversations List */}
      <div className="hidden md:flex w-80 flex-col border border-border rounded-lg overflow-hidden">
        {/* Search */}
        <div className="p-4 border-b border-border">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search conversations..."
              className="pl-10"
            />
          </div>
        </div>

        {/* Conversations */}
        <ScrollArea className="flex-1">
          <div className="p-2 space-y-2">
            {mockConversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => setSelectedConversation(conv)}
                className={cn(
                  'w-full text-left p-3 rounded-lg transition-colors hover:bg-accent',
                  selectedConversation.id === conv.id && 'bg-accent'
                )}
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center text-lg">
                    {conv.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={cn(
                      'font-medium text-foreground',
                      conv.unread && 'font-bold'
                    )}>
                      {conv.name}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {conv.lastMessage}
                    </p>
                  </div>
                  {conv.unread && (
                    <div className="h-2 w-2 rounded-full bg-primary shrink-0" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Chat Area */}
      <div className="flex-1 border border-border rounded-lg overflow-hidden flex flex-col bg-card">
        {/* Chat Header */}
        <div className="border-b border-border p-4 flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center text-lg">
            {selectedConversation.avatar}
          </div>
          <div>
            <p className="font-semibold text-foreground">
              {selectedConversation.name}
            </p>
            <p className="text-xs text-muted-foreground">
              Last seen {selectedConversation.timestamp}
            </p>
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={cn(
                  'flex gap-2',
                  msg.sender === 'me' && 'justify-end'
                )}
              >
                <div
                  className={cn(
                    'max-w-xs px-4 py-2 rounded-lg',
                    msg.sender === 'me'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-foreground'
                  )}
                >
                  <p className="text-sm">{msg.text}</p>
                  <p className="text-xs opacity-70 mt-1">{msg.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Input */}
        <div className="border-t border-border p-4 flex gap-2">
          <Input
            placeholder="Type your message..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
          />
          <Button
            onClick={handleSendMessage}
            disabled={!inputText.trim()}
            size="icon"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
