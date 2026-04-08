'use client';

import React, { useState } from 'react';
import { MessagesList } from './MessagesList';
import { ChatWindow } from './ChatWindow';
import { Card } from '@/components/ui/card';

export function MessagesPageContent() {
  const [selectedChat, setSelectedChat] = useState<string | null>('user-001');

  return (
    <div className="h-[calc(100vh-160px)] flex flex-col md:grid md:grid-cols-3 md:gap-4">
      {/* Messages List - Left Sidebar */}
      <div className={`${selectedChat ? 'hidden md:flex' : 'flex'} md:col-span-1 overflow-hidden border-r flex-col`}>
        <MessagesList selectedChat={selectedChat} onSelectChat={setSelectedChat} />
      </div>

      {/* Chat Window - Right Content */}
      <div className={`${selectedChat ? 'flex' : 'hidden md:flex'} md:col-span-2 flex-col overflow-hidden`}>
        {selectedChat ? (
          <ChatWindow chatId={selectedChat} />
        ) : (
          <Card className="h-full flex items-center justify-center">
            <div className="text-center">
              <p className="text-muted-foreground">Select a chat to start messaging</p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
