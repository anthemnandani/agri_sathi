'use client';

import React from 'react';
import { MessagesPageContent } from './MessagesPageContent';

interface MessagingCenterProps {
  onChatOpen?: (isOpen: boolean) => void;
  isChatOpen?: boolean;
}

export function MessagingCenter({ onChatOpen, isChatOpen }: MessagingCenterProps = {}) {
  return <MessagesPageContent onChatOpen={onChatOpen} />;
}
