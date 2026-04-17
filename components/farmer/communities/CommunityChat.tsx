'use client';

import React, { useEffect, useState, useRef } from 'react';
import { Send, Plus, Image, Mic, FileText, Pin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { toast } from 'sonner';

interface CommunityMessage {
  id: string;
  senderId: string;
  sender: {
    id: string;
    name: string;
    avatar: string;
    role: string;
  };
  content: string;
  type: 'text' | 'image' | 'voice' | 'document';
  image?: string;
  replies: number;
  isPinned: boolean;
  approved: boolean;
  createdAt: Date;
}

interface CommunityMessageProps {
  message: CommunityMessage;
  onReply?: (message: CommunityMessage) => void;
  onPin?: (message: CommunityMessage) => void;
}

function MessageItem({ message, onReply, onPin }: CommunityMessageProps) {
  const isAdmin = message.sender.role === 'farmer'; // Simplified for demo

  return (
    <div className="flex gap-3 mb-4 group hover:bg-muted/50 p-2 rounded-lg transition-colors">
      {/* Avatar */}
      <Avatar className="h-8 w-8 flex-shrink-0">
        <AvatarImage src={message.sender.avatar} />
        <AvatarFallback>{message.sender.name[0]}</AvatarFallback>
      </Avatar>

      {/* Message Content */}
      <div className="flex-1 min-w-0">
        {/* Header */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-semibold text-sm">{message.sender.name}</span>
          <span className="text-xs text-muted-foreground">
            {new Date(message.createdAt).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </span>
          {!message.approved && (
            <Badge variant="outline" className="text-xs">
              Pending Approval
            </Badge>
          )}
        </div>

        {/* Message Body */}
        {message.type === 'text' && (
          <p className="text-sm text-foreground mt-1 break-words">{message.content}</p>
        )}

        {message.type === 'image' && (
          <div className="mt-2">
            <img
              src={message.image}
              alt="Message image"
              className="max-w-xs rounded-lg max-h-64 object-cover"
            />
            {message.content && <p className="text-sm mt-2">{message.content}</p>}
          </div>
        )}

        {message.type === 'voice' && (
          <div className="mt-2 flex items-center gap-2">
            <Button size="sm" variant="outline" className="h-8">
              <Mic className="h-4 w-4 mr-2" />
              Voice Message
            </Button>
            <span className="text-xs text-muted-foreground">0:45</span>
          </div>
        )}

        {message.type === 'document' && (
          <div className="mt-2 flex items-center gap-2 p-2 bg-muted rounded">
            <FileText className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{message.content}</span>
          </div>
        )}

        {/* Replies Count */}
        {message.replies > 0 && (
          <button className="text-xs text-blue-600 mt-1 hover:underline">
            {message.replies} {message.replies === 1 ? 'reply' : 'replies'}
          </button>
        )}
      </div>

      {/* Actions */}
      <div className="hidden group-hover:flex items-center gap-1 flex-shrink-0">
        {onReply && (
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0"
            onClick={() => onReply(message)}
            title="Reply"
          >
            ↪️
          </Button>
        )}
        {onPin && (
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0"
            onClick={() => onPin(message)}
            title="Pin message"
          >
            <Pin className="h-3 w-3" />
          </Button>
        )}
      </div>
    </div>
  );
}

interface CommunityChatProps {
  communityId: string;
}

export function CommunityChat({ communityId }: CommunityChatProps) {
  const [messages, setMessages] = useState<CommunityMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(`/api/communities/${communityId}/messages`);
        if (response.ok) {
          const result = await response.json();
          setMessages(result.data || []);
        }
      } catch (error) {
        console.error('[v0] Error fetching messages:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [communityId]);

  const handleSend = async () => {
    if (!newMessage.trim()) return;

    setSending(true);
    try {
      const response = await fetch(`/api/communities/${communityId}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          senderId: 'user-current',
          sender: {
            id: 'user-current',
            name: 'You',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=you',
            role: 'farmer',
          },
          content: newMessage,
          type: 'text',
        }),
      });

      if (response.ok) {
        const result = await response.json();
        setMessages([...messages, result.data]);
        setNewMessage('');
        toast.success('Message sent');
      }
    } catch (error) {
      console.error('[v0] Error sending message:', error);
      toast.error('Failed to send message');
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return (
      <Card className="flex flex-col h-full">
        <div className="flex-1 p-4 space-y-4 animate-pulse">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-12 bg-muted rounded" />
          ))}
        </div>
      </Card>
    );
  }

  return (
    <Card className="flex flex-col h-full overflow-hidden rounded-lg sm:rounded-xl">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-2 sm:p-4 space-y-1 sm:space-y-2">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-muted-foreground text-center px-4">
            <p className="text-sm">Be the first to start the conversation!</p>
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <MessageItem
                key={message.id}
                message={message}
                onReply={() => toast.info('Reply feature coming soon')}
                onPin={() => toast.info('Pinning feature coming soon')}
              />
            ))}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Input Area */}
      <div className="border-t p-2 sm:p-4 bg-card space-y-2 sm:space-y-3">
        {/* Action Buttons - Hidden on mobile, shown on larger screens */}
        <div className="hidden sm:flex gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8" title="Add image">
            <Image className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" title="Send voice message">
            <Mic className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" title="Attach document">
            <FileText className="h-4 w-4" />
          </Button>
        </div>

        {/* Message Input */}
        <div className="flex gap-1 sm:gap-2">
          {/* Mobile action button - compact menu */}
          <Button variant="ghost" size="icon" className="sm:hidden h-8 w-8 flex-shrink-0">
            <Plus className="h-4 w-4" />
          </Button>

          <Input
            placeholder="Message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            className="flex-1 h-9 sm:h-10 text-sm"
          />
          <Button
            onClick={handleSend}
            disabled={sending || !newMessage.trim()}
            size="icon"
            className="bg-green-600 hover:bg-green-700 h-9 w-9 sm:h-10 sm:w-10 flex-shrink-0"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>

        <p className="text-xs text-muted-foreground text-center hidden sm:block">
          Press Shift+Enter for new line
        </p>
      </div>
    </Card>
  );
}
