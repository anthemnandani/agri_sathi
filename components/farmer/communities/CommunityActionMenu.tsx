'use client';

import React, { useState } from 'react';
import {
  MoreVertical,
  Users,
  Image,
  FileText,
  Settings,
  LogOut,
  Bell,
  Search,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';

interface CommunityActionMenuProps {
  communityId: string;
  communityName: string;
  onMembersClick: () => void;
  onMediaClick: () => void;
  onDocumentsClick: () => void;
  onLeave: () => void;
}

export function CommunityActionMenu({
  communityId,
  communityName,
  onMembersClick,
  onMediaClick,
  onDocumentsClick,
  onLeave,
}: CommunityActionMenuProps) {
  const [notifications, setNotifications] = useState(true);
  const [muteChat, setMuteChat] = useState(false);

  const handleLeave = () => {
    const confirmed = window.confirm(
      `क्या आप वाकई "${communityName}" से छोड़ना चाहते हैं? आप इसे फिर से जोड़ सकते हैं।`
    );
    if (confirmed) {
      onLeave();
      toast.success(`${communityName} से निकल गए`);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 text-muted-foreground hover:text-foreground"
          title="अधिक विकल्प"
        >
          <MoreVertical className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {/* Information Section */}
        <div className="px-2 py-1.5">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            जानकारी
          </p>
        </div>

        <DropdownMenuItem onClick={onMembersClick} className="cursor-pointer">
          <Users className="h-4 w-4 mr-3 text-primary" />
          <span>सदस्य देखें</span>
        </DropdownMenuItem>

        <DropdownMenuItem onClick={onMediaClick} className="cursor-pointer">
          <Image className="h-4 w-4 mr-3 text-accent" />
          <span>मीडिया गैलरी</span>
        </DropdownMenuItem>

        <DropdownMenuItem onClick={onDocumentsClick} className="cursor-pointer">
          <FileText className="h-4 w-4 mr-3 text-blue-500" />
          <span>दस्तावेज़</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* Settings Section */}
        <div className="px-2 py-1.5">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            सेटिंग्स
          </p>
        </div>

        <DropdownMenuCheckboxItem
          checked={notifications}
          onCheckedChange={setNotifications}
          className="cursor-pointer"
        >
          <Bell className="h-4 w-4 mr-3" />
          <span>सूचनाएं</span>
        </DropdownMenuCheckboxItem>

        <DropdownMenuCheckboxItem
          checked={muteChat}
          onCheckedChange={setMuteChat}
          className="cursor-pointer"
        >
          <span className="h-4 w-4 mr-3 flex items-center justify-center">🔇</span>
          <span>चैट को म्यूट करें</span>
        </DropdownMenuCheckboxItem>

        <DropdownMenuItem className="cursor-pointer">
          <Settings className="h-4 w-4 mr-3" />
          <span>समूह सेटिंग्स</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* Danger Zone */}
        <DropdownMenuItem
          onClick={handleLeave}
          className="text-destructive focus:text-destructive cursor-pointer"
        >
          <LogOut className="h-4 w-4 mr-3" />
          <span>समूह से निकलें</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
