'use client';

import React, { useRouter } from 'next/navigation';
import { useRouter as useNavigationRouter } from 'next/navigation';
import FarmerAIChatbot from '@/components/farmer/chat/FarmerAIChatbot';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function AIHelpPage() {
  const router = useNavigationRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 pb-20">
      {/* Header with Back Button */}
      <div className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-green-200/30 dark:border-slate-700/50 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.back()}
              className="hover:bg-green-100 dark:hover:bg-slate-800"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-green-700 dark:text-green-400">
                🌾 Krishi Sahayak
              </h1>
              <p className="text-sm text-muted-foreground">
                Your AI farming assistant is here to help
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Chatbot Area */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="h-[calc(100vh-180px)]">
          <FarmerAIChatbot fullPage={true} />
        </div>
      </div>
    </div>
  );
}
