'use client';

import React, { useEffect, useState, useRef } from 'react';
import { Send, Plus, Image, Mic, FileText, Pin, MoreVertical, Reply, Trash2, Flag, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { toast } from 'sonner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

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
  const getRoleColor = (role: string) => {
    if (role === 'admin') return 'text-amber-600 dark:text-amber-400 font-bold';
    if (role === 'moderator') return 'text-blue-600 dark:text-blue-400 font-bold';
    return 'text-foreground';
  };

  const isAdmin = message.sender.role === 'admin' || message.sender.role === 'moderator';

  return (
    <div className="flex gap-3 py-3 group hover:bg-muted/40 px-3 rounded-lg transition-colors border border-transparent hover:border-border">
      {/* Avatar */}
      <Avatar className="h-9 w-9 flex-shrink-0 border-2 border-border">
        <AvatarImage src={message.sender.avatar} />
        <AvatarFallback className="bg-primary/10 font-semibold text-primary">
          {message.sender.name[0]}
        </AvatarFallback>
      </Avatar>

      {/* Message Content */}
      <div className="flex-1 min-w-0">
        {/* Header */}
        <div className="flex items-center gap-2 flex-wrap mb-1">
          <span className={`font-semibold text-sm ${getRoleColor(message.sender.role)}`}>
            {message.sender.name}
          </span>
          {isAdmin && (
            <Badge variant="outline" className="text-xs font-semibold bg-primary/10 text-primary border-primary/20">
              {message.sender.role === 'admin' ? '👑 Admin' : '🛡️ Moderator'}
            </Badge>
          )}
          <span className="text-xs text-muted-foreground">
            {new Date(message.createdAt).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </span>
          {!message.approved && (
            <Badge variant="outline" className="text-xs bg-yellow-100 dark:bg-yellow-950 text-yellow-800 dark:text-yellow-200 border-yellow-200 dark:border-yellow-800">
              ⏳ Pending Approval
            </Badge>
          )}
          {message.isPinned && (
            <Badge variant="outline" className="text-xs bg-primary/10 text-primary border-primary/20">
              📌 Pinned
            </Badge>
          )}
        </div>

        {/* Message Body */}
        {message.type === 'text' && (
          <p className="text-sm text-foreground mt-1 break-words leading-relaxed">{message.content}</p>
        )}

        {message.type === 'image' && (
          <div className="mt-2 space-y-2">
            <img
              src={message.image}
              alt="Message image"
              className="max-w-sm rounded-lg max-h-80 object-cover border border-border"
            />
            {message.content && <p className="text-sm text-foreground">{message.content}</p>}
          </div>
        )}

        {message.type === 'voice' && (
          <div className="mt-2 flex items-center gap-3 bg-muted px-3 py-2 rounded-lg w-fit">
            <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-primary">
              <Mic className="h-4 w-4" />
            </Button>
            <div>
              <p className="text-xs text-muted-foreground font-medium">Voice Message</p>
              <p className="text-xs text-muted-foreground">0:45</p>
            </div>
          </div>
        )}

        {message.type === 'document' && (
          <div className="mt-2 flex items-center gap-3 p-3 bg-muted rounded-lg border border-border w-fit">
            <FileText className="h-5 w-5 text-primary flex-shrink-0" />
            <span className="text-sm font-medium text-foreground">{message.content}</span>
          </div>
        )}

        {/* Replies Count */}
        {message.replies > 0 && (
          <button className="text-xs font-semibold text-primary mt-2 hover:underline flex items-center gap-1">
            <MessageCircle className="h-3 w-3" />
            {message.replies} {message.replies === 1 ? 'reply' : 'replies'}
          </button>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
        {onReply && (
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
            onClick={() => onReply(message)}
            title="Reply to message"
          >
            <Reply className="h-4 w-4" />
          </Button>
        )}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
            >
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            {onPin && (
              <DropdownMenuItem onClick={() => onPin(message)} className="cursor-pointer">
                <Pin className="h-4 w-4 mr-2" />
                {message.isPinned ? 'Unpin' : 'Pin Message'}
              </DropdownMenuItem>
            )}
            <DropdownMenuItem className="cursor-pointer">
              <Trash2 className="h-4 w-4 mr-2 text-destructive" />
              <span className="text-destructive">Delete</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <Flag className="h-4 w-4 mr-2" />
              Report
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
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
