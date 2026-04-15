'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MessageSquare, ArrowLeft } from 'lucide-react';

interface CallEndModalProps {
  callDuration: number;
  isOpen: boolean;
  userId: string;
}

export function CallEndModal({ callDuration, isOpen, userId }: CallEndModalProps) {
  const router = useRouter();

  if (!isOpen) return null;

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const handleOpenChat = () => {
    router.push(`/farmer/messages`);
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-sm p-8 bg-white dark:bg-slate-900 space-y-6 shadow-lg">
        <div className="space-y-2 text-center">
          <h2 className="text-2xl font-bold text-foreground">Call Ended</h2>
          <p className="text-muted-foreground">Duration: {formatTime(callDuration)}</p>
        </div>

        <div className="flex flex-col gap-3">
          <Button
            onClick={handleOpenChat}
            className="bg-green-600 hover:bg-green-700 text-white flex items-center justify-center gap-2 h-10"
          >
            <MessageSquare className="h-4 w-4" />
            Open Chat
          </Button>
          <Button
            onClick={handleBack}
            variant="outline"
            className="flex items-center justify-center gap-2 h-10"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </div>
      </Card>
    </div>
  );
}
