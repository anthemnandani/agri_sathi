'use client';

import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { PinnedMessages } from './PinnedMessages';
import { CommunityMembers } from './CommunityMembers';

interface MobileSidebarProps {
  communityId: string;
}

export function MobileSidebar({ communityId }: MobileSidebarProps) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-80 p-0 overflow-y-auto">
        <SheetHeader className="p-4 border-b">
          <SheetTitle>Community Info</SheetTitle>
        </SheetHeader>
        
        <div className="space-y-4 p-4">
          {/* Pinned Messages */}
          <PinnedMessages communityId={communityId} />

          {/* Members */}
          <CommunityMembers communityId={communityId} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
