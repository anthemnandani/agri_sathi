'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { Menu, Bell, Search, Sun, Moon, ChevronDown, User, Settings, LogOut } from 'lucide-react';
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
import { useTheme } from '@/lib/theme-context';

interface AdminNavbarProps {
  onMenuClick: () => void;
  onSidebarToggle: () => void;
}

const pageTitles: Record<string, string> = {
  '/admin': 'Dashboard',
  '/admin/farmers': 'Farmers Management',
  '/admin/products': 'Products',
  '/admin/rental-tools': 'Rental Tools',
  '/admin/posts': 'Posts Moderation',
  '/admin/communities': 'Communities',
  '/admin/schemes': 'Government Schemes',
  '/admin/crop-guide': 'Crop Guide',
  '/admin/weather-alerts': 'Weather Alerts',
  '/admin/analytics': 'Analytics',
  '/admin/notifications': 'Notifications',
  '/admin/settings': 'Settings',
};

export default function AdminNavbar({ onMenuClick }: AdminNavbarProps) {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const pageTitle = pageTitles[pathname] || 'Admin Panel';

  return (
    <header className="h-16 border-b border-border bg-card flex items-center justify-between px-4 lg:px-6">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={onMenuClick}
        >
          <Menu className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-lg font-semibold text-foreground">{pageTitle}</h1>
          <p className="text-xs text-muted-foreground hidden sm:block">
            Manage your agricultural platform
          </p>
        </div>
      </div>

      {/* Center - Search */}
      <div className="hidden md:flex flex-1 max-w-md mx-8">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search farmers, products, communities..."
            className="pl-10 h-9 bg-muted/50 border-0 focus-visible:ring-1"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2">
        {/* Theme Toggle */}
        <Button variant="ghost" size="icon" onClick={toggleTheme} className="h-9 w-9">
          {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-9 w-9 relative">
              <Bell className="h-4 w-4" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-[10px] bg-destructive text-destructive-foreground">
                8
              </Badge>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <div className="flex items-center justify-between px-3 py-2 border-b">
              <span className="font-semibold text-sm">Notifications</span>
              <Button variant="ghost" size="sm" className="text-xs h-7">Mark all read</Button>
            </div>
            <div className="max-h-80 overflow-y-auto">
              <DropdownMenuItem className="flex flex-col items-start gap-1 py-3">
                <span className="font-medium text-sm">New farmer registration</span>
                <span className="text-xs text-muted-foreground">Arjun Singh from Kanpur registered</span>
                <span className="text-[10px] text-muted-foreground">5 min ago</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-col items-start gap-1 py-3">
                <span className="font-medium text-sm">Post reported</span>
                <span className="text-xs text-muted-foreground">A post has been reported for spam</span>
                <span className="text-[10px] text-muted-foreground">1 hour ago</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-col items-start gap-1 py-3">
                <span className="font-medium text-sm">Product approval pending</span>
                <span className="text-xs text-muted-foreground">5 new products await approval</span>
                <span className="text-[10px] text-muted-foreground">2 hours ago</span>
              </DropdownMenuItem>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="justify-center text-primary font-medium">
              View all notifications
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-9 gap-2 px-2">
              <div className="h-7 w-7 rounded-full bg-primary flex items-center justify-center">
                <span className="text-xs font-bold text-primary-foreground">AD</span>
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-medium leading-none">Admin</p>
              </div>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <div className="px-3 py-2 border-b">
              <p className="font-semibold text-sm">Admin User</p>
              <p className="text-xs text-muted-foreground">admin@agrisathi.com</p>
            </div>
            <DropdownMenuItem>
              <User className="h-4 w-4 mr-2" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
