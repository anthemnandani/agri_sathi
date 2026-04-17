import React from 'react';
import { CommunityHeader } from '@/components/farmer/communities/CommunityHeader';
import { CommunityChat } from '@/components/farmer/communities/CommunityChat';
import { CommunityMembers } from '@/components/farmer/communities/CommunityMembers';
import { PinnedMessages } from '@/components/farmer/communities/PinnedMessages';
import { MobileSidebar } from '@/components/farmer/communities/MobileSidebar';

export const metadata = {
  title: 'Community - AgriSathi',
  description: 'Community group chat and discussion',
};

export default function CommunityDetailPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div className="h-[100dvh] flex flex-col bg-background">
      {/* Header */}
      <CommunityHeader communityId={params.id} />

      {/* Main Content */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-2 sm:gap-4 min-h-0 p-2 sm:p-4 overflow-hidden">
        {/* Chat Area */}
        <div className="lg:col-span-3 flex flex-col min-h-0">
          <CommunityChat communityId={params.id} />
        </div>

        {/* Desktop Sidebar */}
        <div className="hidden lg:flex flex-col gap-4 min-h-0">
          {/* Pinned Messages */}
          <PinnedMessages communityId={params.id} />

          {/* Members */}
          <CommunityMembers communityId={params.id} />
        </div>

        {/* Mobile Sidebar Trigger */}
        <div className="absolute top-20 right-2 sm:right-4 lg:hidden z-30">
          <MobileSidebar communityId={params.id} />
        </div>
      </div>
    </div>
  );
}
