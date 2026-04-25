'use client';

import React, { useEffect, useState, useRef } from 'react';
import {
  Send,
  Plus,
  Image,
  Mic,
  FileText,
  Pin,
  MoreVertical,
  Reply,
  Trash2,
  Flag,
  MessageCircle,
  X,
  Paperclip,
} from 'lucide-react';
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
import { MessageDateSeparator } from './MessageDateSeparator';
import { isSameDay } from 'date-fns';

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
  voiceDuration?: string;
  documentUrl?: string;
  documentSize?: string;
  replies: number;
  isPinned: boolean;
  approved: boolean;
  createdAt: Date;
}

interface CommunityMessageProps {
  message: CommunityMessage;
  onReply?: (message: CommunityMessage) => void;
  onPin?: (message: CommunityMessage) => void;
  isGrouped?: boolean;
}

function MessageItem({ message, onReply, onPin, isGrouped }: CommunityMessageProps) {
  const getRoleColor = (role: string) => {
    if (role === 'admin') return 'text-green-600 dark:text-green-400 font-bold';
    if (role === 'moderator') return 'text-blue-600 dark:text-blue-400 font-bold';
    return 'text-foreground';
  };

  const isAdmin = message.sender.role === 'admin' || message.sender.role === 'moderator';

  return (
    <div className="flex gap-3 py-2 group hover:bg-muted/40 px-3 rounded-lg transition-colors border border-transparent hover:border-border">
      {!isGrouped && (
        <Avatar className="h-9 w-9 flex-shrink-0 border-2 border-border">
          <AvatarImage src={message.sender.avatar} />
          <AvatarFallback className="bg-primary/10 font-semibold text-primary">
            {message.sender.name[0]}
          </AvatarFallback>
        </Avatar>
      )}

      {isGrouped && <div className="w-9 flex-shrink-0" />}

      <div className="flex-1 min-w-0">
        {!isGrouped && (
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className={`font-semibold text-sm ${getRoleColor(message.sender.role)}`}>
              {message.sender.name}
            </span>
            {isAdmin && (
              <Badge variant="outline" className="text-xs font-semibold bg-primary/10 text-primary border-primary/20">
                {message.sender.role === 'admin' ? '👑 ऐडमिन' : '🛡️ मॉडरेटर'}
              </Badge>
            )}
            <span className="text-xs text-muted-foreground">
              {new Date(message.createdAt).toLocaleTimeString('hi-IN', {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
            {!message.approved && (
              <Badge variant="outline" className="text-xs bg-yellow-100 dark:bg-yellow-950 text-yellow-800 dark:text-yellow-200 border-yellow-200 dark:border-yellow-800">
                ⏳ स्वीकृति की प्रतीक्षा
              </Badge>
            )}
            {message.isPinned && (
              <Badge variant="outline" className="text-xs bg-primary/10 text-primary border-primary/20">
                📌 पिन किया गया
              </Badge>
            )}
          </div>
        )}

        {/* Message Content */}
        {message.type === 'text' && (
          <p className="text-sm text-foreground break-words leading-relaxed">{message.content}</p>
        )}

        {message.type === 'image' && (
          <div className="mt-2 space-y-2">
            <img
              src={message.image}
              alt="Message image"
              className="max-w-sm rounded-lg max-h-80 object-cover border border-border cursor-pointer hover:opacity-90 transition-opacity"
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
              <p className="text-xs text-muted-foreground font-medium">ऑडियो संदेश</p>
              <p className="text-xs text-muted-foreground">{message.voiceDuration || '0:45'}</p>
            </div>
          </div>
        )}

        {message.type === 'document' && (
          <div className="mt-2 flex items-center gap-3 p-3 bg-muted rounded-lg border border-border w-fit">
            <FileText className="h-5 w-5 text-blue-500 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{message.content}</p>
              <p className="text-xs text-muted-foreground">{message.documentSize}</p>
            </div>
          </div>
        )}

        {/* Replies Count */}
        {message.replies > 0 && (
          <button className="text-xs font-semibold text-primary mt-2 hover:underline flex items-center gap-1">
            <MessageCircle className="h-3 w-3" />
            {message.replies} {message.replies === 1 ? 'जवाब' : 'जवाब'}
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
            title="जवाब दें"
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
                {message.isPinned ? 'अनपिन करें' : 'पिन करें'}
              </DropdownMenuItem>
            )}
            <DropdownMenuItem className="cursor-pointer">
              <Trash2 className="h-4 w-4 mr-2 text-destructive" />
              <span className="text-destructive">हटाएं</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <Flag className="h-4 w-4 mr-2" />
              रिपोर्ट करें
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

interface CommunityChatProps {
  communityId: string;
  onMessageSent?: () => void;
}

export function CommunityChat({ communityId, onMessageSent }: CommunityChatProps) {
  const [messages, setMessages] = useState<CommunityMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 5000);
    return () => clearInterval(interval);
  }, [communityId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchMessages = async () => {
    try {
      const response = await fetch(`/api/communities/${communityId}/messages`);
      if (response.ok) {
        const result = await response.json();
        setMessages(result.data);
      }
    } catch (error) {
      console.error('[v0] Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() && selectedFiles.length === 0) return;

    const messageData = {
      content: newMessage,
      type: selectedFiles.length > 0 ? (selectedFiles[0].type.startsWith('image') ? 'image' : 'document') : 'text',
      files: selectedFiles,
    };

    try {
      const response = await fetch(`/api/communities/${communityId}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(messageData),
      });

      if (response.ok) {
        setNewMessage('');
        setSelectedFiles([]);
        await fetchMessages();
        toast.success('संदेश भेजा गया');
        onMessageSent?.();
      }
    } catch (error) {
      toast.error('संदेश भेजने में विफल');
      console.error('[v0] Error sending message:', error);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setSelectedFiles(files);
  };

  const groupedMessages = messages.reduce((groups: any[], message) => {
    if (groups.length === 0) {
      groups.push({
        date: message.createdAt,
        items: [{ message, isGrouped: false }],
      });
      return groups;
    }

    const lastGroup = groups[groups.length - 1];
    const isSameDateAsLast = isSameDay(new Date(message.createdAt), lastGroup.date);

    if (!isSameDateAsLast) {
      groups.push({
        date: message.createdAt,
        items: [{ message, isGrouped: false }],
      });
    } else {
      const lastMessage = lastGroup.items[lastGroup.items.length - 1].message;
      const shouldGroup =
        lastMessage.senderId === message.senderId &&
        new Date(message.createdAt).getTime() - new Date(lastMessage.createdAt).getTime() < 60000;

      if (shouldGroup) {
        lastGroup.items[lastGroup.items.length - 1].isGrouped = true;
        lastGroup.items.push({ message, isGrouped: true });
      } else {
        lastGroup.items.push({ message, isGrouped: false });
      }
    }

    return groups;
  }, []);

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-1">
        {groupedMessages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <MessageCircle className="h-12 w-12 text-muted-foreground/30 mb-3" />
            <p className="text-muted-foreground">कोई संदेश नहीं। बातचीत शुरू करें!</p>
          </div>
        ) : (
          groupedMessages.map((group, groupIdx) => (
            <div key={groupIdx}>
              <MessageDateSeparator date={group.date} />
              {group.items.map(({ message, isGrouped }: any) => (
                <MessageItem
                  key={message.id}
                  message={message}
                  isGrouped={isGrouped}
                  onReply={() => toast.info('जवाब देने की सुविधा जल्द आएगी')}
                  onPin={() => toast.success('संदेश पिन किया गया')}
                />
              ))}
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t bg-card p-4 space-y-3">
        {selectedFiles.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {selectedFiles.map((file, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 bg-muted px-3 py-2 rounded-lg text-xs"
              >
                <Paperclip className="h-3 w-3" />
                <span className="truncate">{file.name}</span>
                <button
                  onClick={() =>
                    setSelectedFiles(selectedFiles.filter((_, i) => i !== idx))
                  }
                >
                  <X className="h-3 w-3 hover:text-destructive" />
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 text-muted-foreground"
            onClick={() => fileInputRef.current?.click()}
            title="फाइल जोड़ें"
          >
            <Plus className="h-5 w-5" />
          </Button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            className="hidden"
            accept="image/*,.pdf,.doc,.docx"
          />

          <Input
            placeholder="संदेश लिखें..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            className="flex-1"
          />

          <Button
            onClick={handleSendMessage}
            disabled={!newMessage.trim() && selectedFiles.length === 0}
            className="h-9 px-3 bg-primary hover:bg-primary/90"
            size="sm"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
