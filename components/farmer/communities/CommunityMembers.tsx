'use client';

import React, { useEffect, useState } from 'react';
import { Search, Crown, Shield, MoreVertical, MessageSquare, UserMinus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { getRoleIcon } from '@/lib/community-icons';
import { toast } from 'sonner';

interface Member {
  id: string;
  user: {
    id: string;
    name: string;
    avatar: string;
  };
  role: 'admin' | 'moderator' | 'member';
  joinedAt: Date;
}

interface CommunityMembersProps {
  communityId: string;
}

function MemberItem({ member }: { member: Member }) {
  const getRoleBadgeColor = (role: string) => {
    if (role === 'admin') return 'bg-green-100 dark:bg-green-950 text-green-800 dark:text-green-200';
    if (role === 'moderator') return 'bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-200';
    return 'bg-muted text-muted-foreground';
  };

  const getRoleLabel = (role: string) => {
    if (role === 'admin') return 'Admin';
    if (role === 'moderator') return 'Moderator';
    return 'Member';
  };

  const handleMessage = () => {
    toast.info(`Message feature coming soon for ${member.user.name}`);
  };

  const handleRemove = () => {
    toast.success(`${member.user.name} removed from community`);
  };

  return (
    <div className="flex items-center justify-between py-3 px-3 rounded-lg hover:bg-muted/60 transition-all group border border-transparent hover:border-border">
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <div className="relative flex-shrink-0">
          <Avatar className="h-10 w-10 border-2 border-primary/20">
            <AvatarImage src={member.user.avatar} />
            <AvatarFallback className="bg-primary/10 text-primary font-semibold">
              {member.user.name[0]}
            </AvatarFallback>
          </Avatar>
          {member.role === 'admin' && (
            <div className="absolute -top-1 -right-1 bg-green-600 rounded-full p-0.5 text-white">
              <Crown className="h-2.5 w-2.5" />
            </div>
          )}
          {member.role === 'moderator' && (
            <div className="absolute -top-1 -right-1 bg-blue-500 rounded-full p-0.5 text-white">
              <Shield className="h-2.5 w-2.5" />
            </div>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="text-sm font-semibold truncate text-foreground">{member.user.name}</p>
            <Badge variant="outline" className={`text-xs font-medium ${getRoleBadgeColor(member.role)}`}>
              {getRoleLabel(member.role)}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground">
            Joined {new Date(member.joinedAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-1 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
          onClick={handleMessage}
          title="Send message"
        >
          <MessageSquare className="h-4 w-4" />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
            >
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuItem>View Profile</DropdownMenuItem>
            {member.role !== 'admin' && (
              <>
                <DropdownMenuItem>Mute for 24h</DropdownMenuItem>
                <DropdownMenuItem className="text-destructive focus:text-destructive" onClick={handleRemove}>
                  <UserMinus className="h-4 w-4 mr-2" />
                  Remove Member
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

export function CommunityMembers({ communityId }: CommunityMembersProps) {
  const [members, setMembers] = useState<Member[]>([]);
  const [filteredMembers, setFilteredMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await fetch(`/api/communities/${communityId}/members`);
        if (response.ok) {
          const result = await response.json();
          setMembers(result.data || []);
          setFilteredMembers(result.data || []);
        }
      } catch (error) {
        console.error('[v0] Error fetching members:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, [communityId]);

  useEffect(() => {
    if (searchTerm) {
      setFilteredMembers(
        members.filter((m) =>
          m.user.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else {
      setFilteredMembers(members);
    }
  }, [searchTerm, members]);

  // Sort members: admins first, then moderators, then others
  const sortedMembers = [...filteredMembers].sort((a, b) => {
    const roleOrder = { admin: 0, moderator: 1, member: 2 };
    return roleOrder[a.role as keyof typeof roleOrder] - roleOrder[b.role as keyof typeof roleOrder];
  });

  if (loading) {
    return (
      <Card className="flex flex-col min-h-0">
        <CardHeader className="pb-4">
          <CardTitle className="text-base">Community Members</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 animate-pulse space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-12 bg-muted rounded-lg" />
          ))}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="flex flex-col min-h-0">
      <CardHeader className="pb-3 border-b border-border">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base sm:text-lg">Community Members</CardTitle>
              <p className="text-xs text-muted-foreground mt-1">
                {members.length} {members.length === 1 ? 'member' : 'members'} total
              </p>
            </div>
            <div className="flex items-center gap-2 bg-muted px-3 py-1 rounded-lg text-sm font-semibold text-foreground">
              👥 {members.length}
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search members by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 py-2 text-sm"
            />
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col min-h-0 p-3">
        {/* Members List */}
        <div className="flex-1 overflow-y-auto space-y-2">
          {sortedMembers.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <p className="text-2xl mb-2">🔍</p>
              <p className="text-sm text-muted-foreground">
                {searchTerm ? 'No members match your search' : 'No members found'}
              </p>
            </div>
          ) : (
            sortedMembers.map((member) => (
              <MemberItem key={member.id} member={member} />
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
