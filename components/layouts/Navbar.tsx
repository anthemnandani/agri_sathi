'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Bell, Search, User, Menu, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';

export function Navbar() {
  const [notifications] = useState([
    { id: 1, message: 'New product added in your area', unread: true },
    { id: 2, message: 'Weather alert: Heavy rain expected', unread: true },
  ]);

  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <nav className="border-b border-border bg-card shadow-sm">
      <div className="flex items-center justify-between px-4 py-3 md:px-6">
        {/* Logo & Brand */}
        <Link href="/farmer/(dashboard)/home" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-green-600 to-green-800" />
          <span className="hidden text-xl font-bold text-foreground sm:inline">
            AgriSathi
          </span>
        </Link>

        {/* Search Bar - Hidden on Mobile */}
        <div className="hidden flex-1 mx-4 md:flex md:max-w-xs">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search products, communities..."
              className="pl-10"
            />
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Notifications */}
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              asChild
            >
              <Link href="/farmer/notifications">
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -right-2 -top-2 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center"
                  >
                    {unreadCount}
                  </Badge>
                )}
              </Link>
            </Button>
          </div>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem asChild>
                <Link href="/farmer/profile">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/farmer/my-products">My Products</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/farmer/messages">Messages</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/farmer/settings">Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}
