'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Phone, Video, Search, MoreVertical, Send, Smile, Paperclip } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';

const CHAT_MESSAGES = [
  {
    id: 1,
    sender: 'other',
    text: 'Hi, Ram',
    timestamp: '5:20 pm',
  },
  {
    id: 2,
    sender: 'self',
    text: 'Hello, Shyam',
    timestamp: '5:20 pm',
  },
  {
    id: 3,
    sender: 'system',
    text: 'Missed voice call at 5:20 pm',
    timestamp: '5:20 pm',
  },
];

interface ChatWindowProps {
  chatId: string;
}

export function ChatWindow({ chatId }: ChatWindowProps) {
  const [messages, setMessages] = useState(CHAT_MESSAGES);
  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      setMessages([
        ...messages,
        {
          id: messages.length + 1,
          sender: 'self',
          text: inputValue,
          timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
      setInputValue('');
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 border-b bg-card">
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-full overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop"
              alt="User"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <p className="font-medium text-sm">Nandani Singh</p>
            <p className="text-xs text-muted-foreground">Active now</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link href={`/farmer/voice-call/user-001`}>
            <Button variant="ghost" size="icon">
              <Phone className="h-4 w-4" />
            </Button>
          </Link>

          <Link href={`/farmer/video-call/user-001`}>
            <Button variant="ghost" size="icon">
              <Video className="h-4 w-4" />
            </Button>
          </Link>

          <Button variant="ghost" size="icon">
            <Search className="h-4 w-4" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>View Profile</DropdownMenuItem>
              <DropdownMenuItem>Block User</DropdownMenuItem>
              <DropdownMenuItem>Report</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Messages Area */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === 'self' ? 'justify-end' : 'justify-start'
              }`}
            >
              {message.sender === 'system' ? (
                <div className="text-center">
                  <p className="text-xs text-muted-foreground px-3 py-1 bg-muted rounded-full">
                    {message.text}
                  </p>
                </div>
              ) : (
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg ${
                    message.sender === 'self'
                      ? 'bg-green-600 text-white rounded-br-none'
                      : 'bg-muted text-foreground rounded-bl-none'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p
                    className={`text-xs mt-1 ${
                      message.sender === 'self'
                        ? 'text-green-100'
                        : 'text-muted-foreground'
                    }`}
                  >
                    {message.timestamp}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Message Input */}
      <div className="p-4 border-t bg-card">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Paperclip className="h-4 w-4" />
          </Button>

          <Input
            placeholder="Type a Message ......"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSendMessage();
              }
            }}
            className="flex-1"
          />

          <Button variant="ghost" size="icon">
            <Smile className="h-4 w-4" />
          </Button>

          <Button
            onClick={handleSendMessage}
            size="icon"
            className="bg-green-600 hover:bg-green-700"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
