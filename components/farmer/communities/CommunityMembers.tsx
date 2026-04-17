'use client';

import React, { useEffect, useState } from 'react';
import { Search, Crown, Shield } from 'lucide-react';
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
  const getRoleIcon = (role: string) => {
    if (role === 'admin') return <Crown className="h-3.5 w-3.5 text-amber-500" />;
    if (role === 'moderator') return <Shield className="h-3.5 w-3.5 text-blue-500" />;
    return null;
  };

  const getRoleBadgeColor = (role: string) => {
    if (role === 'admin') return 'bg-amber-100 text-amber-800';
    if (role === 'moderator') return 'bg-blue-100 text-blue-800';
    return 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="flex items-center justify-between py-2 px-2 rounded-lg hover:bg-muted transition-colors group">
      <div className="flex items-center gap-2 min-w-0 flex-1">
        <Avatar className="h-8 w-8">
          <AvatarImage src={member.user.avatar} />
          <AvatarFallback>{member.user.name[0]}</AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium truncate">{member.user.name}</p>
          <p className="text-xs text-muted-foreground">
            {new Date(member.joinedAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-1 flex-shrink-0">
        {getRoleIcon(member.role) && (
          <div title={member.role}>
            {getRoleIcon(member.role)}
          </div>
        )}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
              ⋯
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuItem>Message</DropdownMenuItem>
            <DropdownMenuItem>View Profile</DropdownMenuItem>
            <DropdownMenuItem className="text-red-600">Remove from group</DropdownMenuItem>
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
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Members</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 animate-pulse">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-8 bg-muted rounded mb-2" />
          ))}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="flex flex-col min-h-0">
      <CardHeader className="pb-2 sm:pb-3">
        <CardTitle className="text-sm sm:text-base">Members ({members.length})</CardTitle>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col min-h-0 gap-2 sm:gap-3">
        {/* Search */}
        <div className="relative hidden sm:block">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search members..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8 h-8 text-sm"
          />
        </div>

        {/* Members List */}
        <div className="flex-1 overflow-y-auto space-y-1">
          {sortedMembers.length === 0 ? (
            <p className="text-xs sm:text-sm text-muted-foreground text-center py-4">
              No members found
            </p>
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
