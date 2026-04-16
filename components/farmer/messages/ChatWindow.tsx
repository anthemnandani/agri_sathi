'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Phone, Video, Search, MoreVertical, Send, Smile, Paperclip, ChevronLeft, Clock } from 'lucide-react';
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
import { cn } from '@/lib/utils';

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

export function ChatWindow({ chatId, onBack }: ChatWindowProps & { onBack?: () => void }) {
  const router = useRouter();
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

  const handleEmojiClick = () => {
    const emojis = ['😀', '😂', '❤️', '👍', '🙏', '😍', '🔥', '👏'];
    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
    setInputValue(inputValue + randomEmoji);
  };

  const handleDocumentClick = () => {
    // Trigger file input
    const fileInput = document.getElementById('file-input');
    if (fileInput) {
      (fileInput as HTMLInputElement).click();
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileName = file.name;
      setMessages([
        ...messages,
        {
          id: messages.length + 1,
          sender: 'self',
          text: `📎 ${fileName}`,
          timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }
  };

  return (
    <div className="flex flex-col h-screen md:h-full bg-gradient-to-br from-white/95 to-white dark:from-slate-900 dark:to-slate-950">
      {/* Chat Header - WhatsApp Style */}
      <div className="flex items-center justify-between p-3 md:p-4 border-b bg-gradient-to-r from-green-600 to-green-700 text-white shadow-md">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onBack?.()}
            className="text-white hover:bg-green-500 md:hidden shrink-0"
            title="Back to messages list"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-white">
            <Image
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop"
              alt="User"
              fill
              className="object-cover"
            />
          </div>
          <div className="min-w-0">
            <p className="font-semibold text-sm truncate">Nandani Singh</p>
            <p className="text-xs text-green-100">Active now</p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <Link href={`/farmer/voice-call/user-001`}>
            <Button variant="ghost" size="icon" className="text-white hover:bg-green-500">
              <Phone className="h-4 w-4" />
            </Button>
          </Link>

          <Link href={`/farmer/video-call/user-001`}>
            <Button variant="ghost" size="icon" className="text-white hover:bg-green-500">
              <Video className="h-4 w-4" />
            </Button>
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white hover:bg-green-500">
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

      {/* Messages Area - Flex to avoid overlap with fixed footer */}
      <ScrollArea className="flex-1 p-3 md:p-4 space-y-3 overflow-y-auto">
        <div className="space-y-2">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === 'self' ? 'justify-end' : 'justify-start'
              }`}
            >
              {message.sender === 'system' ? (
                <div className="text-center w-full">
                  <div className="inline-flex items-center gap-1 px-3 py-1.5 bg-gray-200 dark:bg-gray-700 rounded-full">
                    <Clock className="h-3 w-3 text-gray-600 dark:text-gray-300" />
                    <p className="text-xs text-gray-600 dark:text-gray-300 font-medium">
                      {message.text}
                    </p>
                  </div>
                </div>
              ) : (
                <div
                  className={cn(
                    'max-w-xs px-3 py-2 rounded-lg shadow-sm',
                    message.sender === 'self'
                      ? 'bg-green-500 text-white rounded-br-none'
                      : 'bg-gray-100 dark:bg-gray-800 text-foreground rounded-bl-none'
                  )}
                >
                  <p className="text-sm leading-snug">{message.text}</p>
                  <div className="flex items-center justify-end gap-1 mt-1">
                    <p
                      className={cn(
                        'text-xs',
                        message.sender === 'self'
                          ? 'text-green-50'
                          : 'text-muted-foreground'
                      )}
                    >
                      {message.timestamp}
                    </p>
                    {message.sender === 'self' && (
                      <svg
                        className="h-3 w-3 text-green-50"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                      </svg>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Message Input - WhatsApp Style - Fixed at bottom */}
      <div className="flex-shrink-0 p-3 md:p-4 border-t bg-white dark:bg-slate-900 shadow-lg">
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-gray-600 hover:text-green-600"
            onClick={handleDocumentClick}
            title="Attach file"
          >
            <Paperclip className="h-5 w-5" />
          </Button>

          <Input
            placeholder="Aa"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            className="flex-1 rounded-full bg-gray-100 dark:bg-gray-800 border-0 px-4 py-2 focus-visible:ring-0 focus-visible:bg-gray-200 dark:focus-visible:bg-gray-700"
          />

          <Button
            variant="ghost"
            size="icon"
            className="text-gray-600 hover:text-green-600"
            onClick={handleEmojiClick}
            title="Add emoji"
          >
            <Smile className="h-5 w-5" />
          </Button>

          <Button
            onClick={handleSendMessage}
            disabled={!inputValue.trim()}
            size="icon"
            className="bg-green-600 hover:bg-green-700 text-white disabled:opacity-50 disabled:cursor-not-allowed rounded-full"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Hidden file input */}
        <input
          id="file-input"
          type="file"
          onChange={handleFileSelect}
          className="hidden"
          accept="*/*"
        />
      </div>
    </div>
  );
}
