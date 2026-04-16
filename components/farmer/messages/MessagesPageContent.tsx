'use client';

import React, { useState } from 'react';
import { MessagesList } from './MessagesList';
import { ChatWindow } from './ChatWindow';
import { Card } from '@/components/ui/card';
import { useIsMobile } from '@/hooks/use-mobile';

interface MessagesPageContentProps {
  onChatOpen?: (isOpen: boolean) => void;
}

export function MessagesPageContent({ onChatOpen }: MessagesPageContentProps = {}) {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const isMobile = useIsMobile();

  const handleSelectChat = (chatId: string) => {
    setSelectedChat(chatId);
    onChatOpen?.(true);
  };

  const handleBackToList = () => {
    setSelectedChat(null);
    onChatOpen?.(false);
  };

  return (
    <div className="h-[calc(100vh-120px)] flex flex-col md:grid md:grid-cols-3 md:gap-4 bg-background">
      {/* Messages List - Left Sidebar */}
      <div className={`${selectedChat && isMobile ? 'hidden' : 'flex'} md:flex md:col-span-1 overflow-hidden border-r flex-col bg-white dark:bg-slate-950`}>
        <MessagesList selectedChat={selectedChat} onSelectChat={handleSelectChat} />
      </div>

      {/* Chat Window - Right Content */}
      <div className={`${selectedChat || !isMobile ? 'flex' : 'hidden'} md:col-span-2 flex-col overflow-hidden`}>
        {selectedChat ? (
          <ChatWindow chatId={selectedChat} onBack={handleBackToList} />
        ) : (
          <Card className="h-full flex items-center justify-center border-0">
            <div className="text-center space-y-4">
              <div className="text-4xl">💬</div>
              <p className="text-muted-foreground font-medium">Select a chat to start messaging</p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
