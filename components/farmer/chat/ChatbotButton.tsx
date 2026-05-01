'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MessageCircle, X, Maximize2 } from 'lucide-react';
import FarmerAIChatbot from './FarmerAIChatbot';

interface ChatbotButtonProps {
  farmerId?: string;
}

export function ChatbotButton({ farmerId }: ChatbotButtonProps) {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <>
      {/* Floating Chatbot Button */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40">
        <div className="flex flex-col gap-2 items-end">
          {/* Expand to Full Page Button */}
          <Link href="/farmer/ai-help">
            <Button
              className="h-12 w-12 rounded-full shadow-lg bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white p-0"
              title="Open AI Help in Full Page"
              size="icon"
            >
              <Maximize2 className="w-5 h-5" />
            </Button>
          </Link>

          {/* Toggle Chatbot Modal Button */}
          <Button
            onClick={() => setIsChatOpen(!isChatOpen)}
            className="h-14 w-14 rounded-full shadow-lg bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white p-0"
            title="कृषि सहायक खोलें (Open Krishi Sahayak)"
            size="icon"
          >
            {isChatOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <MessageCircle className="w-6 h-6" />
            )}
          </Button>

          {/* Notification Badge */}
          {!isChatOpen && (
            <div className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold animate-pulse">
              1
            </div>
          )}
        </div>
      </div>

      {/* Chatbot Modal */}
      {isChatOpen && (
        <FarmerAIChatbot
          isOpen={isChatOpen}
          onClose={() => setIsChatOpen(false)}
          farmerId={farmerId}
          fullPage={false}
        />
      )}
    </>
  );
}
