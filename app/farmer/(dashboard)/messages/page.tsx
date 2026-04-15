'use client';

import React, { useState } from 'react';
import { MessagingCenter } from '@/components/farmer/messages/MessagingCenter';

export default function MessagesPage() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header - Hidden on mobile to save space */}
      <div className="border-b border-border p-4 md:p-6 hidden md:block">
        <h1 className="text-2xl font-bold text-foreground">Messages</h1>
        <p className="text-sm text-muted-foreground">
          Chat with farmers, experts, and service providers
        </p>
      </div>

      {/* Messaging Interface */}
      <div className="flex-1 overflow-hidden">
        <MessagingCenter onChatOpen={setIsChatOpen} isChatOpen={isChatOpen} />
      </div>
    </div>
  );
}
