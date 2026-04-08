'use client';

import React, { useState } from 'react';
import { MessagesList } from './MessagesList';
import { ChatWindow } from './ChatWindow';
import { Card } from '@/components/ui/card';

export function MessagesPageContent() {
  const [selectedChat, setSelectedChat] = useState<string | null>('user-001');

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[calc(100vh-160px)]">
      {/* Messages List - Left Sidebar */}
      <div className="md:col-span-1 overflow-y-auto border-r">
        <MessagesList selectedChat={selectedChat} onSelectChat={setSelectedChat} />
      </div>

      {/* Chat Window - Right Content */}
      <div className="md:col-span-2 overflow-y-auto">
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
