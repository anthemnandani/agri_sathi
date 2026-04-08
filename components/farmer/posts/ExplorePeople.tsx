'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MoreVertical } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTranslation } from '@/lib/use-translation';

interface Person {
  id: number;
  name: string;
  avatar: string;
  role: string;
  isFollowing: boolean;
}

const initialPeople: Person[] = [
  { id: 1, name: 'Nandani Singh', avatar: '👩‍🌾', role: 'Farmer', isFollowing: false },
  { id: 2, name: 'Ramu Singh', avatar: '👨‍🌾', role: 'Farmer', isFollowing: false },
  { id: 3, name: 'Sonu Singh', avatar: '👨‍🌾', role: 'Farmer', isFollowing: false },
  { id: 4, name: 'Subhash Singh', avatar: '👨‍🌾', role: 'Farmer', isFollowing: false },
  { id: 5, name: 'Priya Singh', avatar: '👩‍🌾', role: 'Farmer', isFollowing: false },
  { id: 6, name: 'Nandani Singh', avatar: '👩‍🌾', role: 'Farmer', isFollowing: false },
];

export function ExplorePeople() {
  const [people, setPeople] = useState<Person[]>(initialPeople);
  const { t } = useTranslation();

  const handleFollow = (id: number) => {
    setPeople(
      people.map((person) =>
        person.id === id ? { ...person, isFollowing: !person.isFollowing } : person
      )
    );
  };

  return (
    <Card className="sticky top-4 shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg">{t('posts.explorePeople')}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {people.map((person) => (
            <div key={person.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-green-600 text-lg flex items-center justify-center flex-shrink-0">
                  {person.avatar}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-sm truncate">{person.name}</p>
                  <p className="text-xs text-muted-foreground">{person.role}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <Button
                  size="sm"
                  variant={person.isFollowing ? 'outline' : 'default'}
                  onClick={() => handleFollow(person.id)}
                  className="text-xs"
                >
                  {person.isFollowing ? t('posts.following') : t('posts.follow')}
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View Profile</DropdownMenuItem>
                    <DropdownMenuItem>Message</DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">Block User</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
