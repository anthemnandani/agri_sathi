'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  ShoppingBag,
  Tractor,
  MessageSquare,
  Users2,
  FileText,
  Leaf,
  Cloud,
  BarChart3,
  Settings,
  Bell,
  Shield,
  HelpCircle,
  ChevronRight,
  LogOut,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const mainMenuItems = [
  {
    label: 'Dashboard',
    href: '/admin',
    icon: LayoutDashboard,
    badge: null,
  },
  {
    label: 'Farmers',
    href: '/admin/farmers',
    icon: Users,
    badge: '12.4K',
  },
  {
    label: 'Products',
    href: '/admin/products',
    icon: ShoppingBag,
    badge: null,
  },
  {
    label: 'Rental Tools',
    href: '/admin/rental-tools',
    icon: Tractor,
    badge: '5',
  },
  {
    label: 'Posts',
    href: '/admin/posts',
    icon: MessageSquare,
    badge: '23',
  },
  {
    label: 'Communities',
    href: '/admin/communities',
    icon: Users2,
    badge: null,
  },
];

const contentMenuItems = [
  {
    label: 'Government Schemes',
    href: '/admin/schemes',
    icon: FileText,
    badge: null,
  },
  {
    label: 'Crop Guide',
    href: '/admin/crop-guide',
    icon: Leaf,
    badge: null,
  },
  {
    label: 'Weather Alerts',
    href: '/admin/weather-alerts',
    icon: Cloud,
    badge: '2',
  },
];

const systemMenuItems = [
  {
    label: 'Analytics',
    href: '/admin/analytics',
    icon: BarChart3,
    badge: null,
  },
  {
    label: 'Notifications',
    href: '/admin/notifications',
    icon: Bell,
    badge: '8',
  },
  {
    label: 'Settings',
    href: '/admin/settings',
    icon: Settings,
    badge: null,
  },
];

function NavItem({ item, isActive }: { item: typeof mainMenuItems[0]; isActive: boolean }) {
  const Icon = item.icon;
  
  return (
    <Link href={item.href}>
      <div
        className={cn(
          'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group',
          isActive
            ? 'bg-primary text-primary-foreground shadow-sm'
            : 'text-muted-foreground hover:bg-muted hover:text-foreground'
        )}
      >
        <Icon className={cn('h-5 w-5 flex-shrink-0', isActive ? '' : 'group-hover:text-primary')} />
        <span className="flex-1 text-sm font-medium">{item.label}</span>
        {item.badge && (
          <Badge 
            variant={isActive ? 'secondary' : 'outline'} 
            className={cn(
              'h-5 px-1.5 text-[10px] font-semibold',
              isActive ? 'bg-primary-foreground/20 text-primary-foreground border-0' : ''
            )}
          >
            {item.badge}
          </Badge>
        )}
        {isActive && <ChevronRight className="h-4 w-4 opacity-70" />}
      </div>
    </Link>
  );
}

export default function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/admin') {
      return pathname === '/admin';
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-card border-r border-border">
        {/* Logo */}
        <div className="h-16 flex items-center gap-3 px-4 border-b border-border">
          <div className="h-9 w-9 rounded-lg bg-primary flex items-center justify-center">
            <Leaf className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-base font-bold text-foreground">AgriSathi</h1>
            <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">Admin Panel</p>
          </div>
        </div>

        {/* Navigation */}
        <ScrollArea className="flex-1 py-4">
          <div className="px-3 space-y-6">
            {/* Main Menu */}
            <div>
              <p className="px-3 mb-2 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                Main Menu
              </p>
              <nav className="space-y-1">
                {mainMenuItems.map((item) => (
                  <NavItem key={item.href} item={item} isActive={isActive(item.href)} />
                ))}
              </nav>
            </div>

            {/* Content Management */}
            <div>
              <p className="px-3 mb-2 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                Content
              </p>
              <nav className="space-y-1">
                {contentMenuItems.map((item) => (
                  <NavItem key={item.href} item={item} isActive={isActive(item.href)} />
                ))}
              </nav>
            </div>

            {/* System */}
            <div>
              <p className="px-3 mb-2 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                System
              </p>
              <nav className="space-y-1">
                {systemMenuItems.map((item) => (
                  <NavItem key={item.href} item={item} isActive={isActive(item.href)} />
                ))}
              </nav>
            </div>
          </div>
        </ScrollArea>

        {/* Footer */}
        <div className="p-3 border-t border-border space-y-2">
          <Link href="/admin/help">
            <Button variant="ghost" className="w-full justify-start gap-3 h-9 text-muted-foreground hover:text-foreground">
              <HelpCircle className="h-4 w-4" />
              <span className="text-sm">Help & Support</span>
            </Button>
          </Link>
          <Button variant="ghost" className="w-full justify-start gap-3 h-9 text-muted-foreground hover:text-destructive">
            <LogOut className="h-4 w-4" />
            <span className="text-sm">Logout</span>
          </Button>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
            onClick={onClose}
          />
          <aside className="fixed inset-y-0 left-0 w-72 bg-card border-r border-border z-50 lg:hidden flex flex-col">
            {/* Logo */}
            <div className="h-16 flex items-center gap-3 px-4 border-b border-border">
              <div className="h-9 w-9 rounded-lg bg-primary flex items-center justify-center">
                <Leaf className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-base font-bold text-foreground">AgriSathi</h1>
                <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">Admin Panel</p>
              </div>
            </div>

            {/* Navigation */}
            <ScrollArea className="flex-1 py-4">
              <div className="px-3 space-y-6">
                {/* Main Menu */}
                <div>
                  <p className="px-3 mb-2 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                    Main Menu
                  </p>
                  <nav className="space-y-1">
                    {mainMenuItems.map((item) => (
                      <div key={item.href} onClick={onClose}>
                        <NavItem item={item} isActive={isActive(item.href)} />
                      </div>
                    ))}
                  </nav>
                </div>

                {/* Content Management */}
                <div>
                  <p className="px-3 mb-2 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                    Content
                  </p>
                  <nav className="space-y-1">
                    {contentMenuItems.map((item) => (
                      <div key={item.href} onClick={onClose}>
                        <NavItem item={item} isActive={isActive(item.href)} />
                      </div>
                    ))}
                  </nav>
                </div>

                {/* System */}
                <div>
                  <p className="px-3 mb-2 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                    System
                  </p>
                  <nav className="space-y-1">
                    {systemMenuItems.map((item) => (
                      <div key={item.href} onClick={onClose}>
                        <NavItem item={item} isActive={isActive(item.href)} />
                      </div>
                    ))}
                  </nav>
                </div>
              </div>
            </ScrollArea>

            {/* Footer */}
            <div className="p-3 border-t border-border space-y-2">
              <Button variant="ghost" className="w-full justify-start gap-3 h-9 text-muted-foreground hover:text-foreground">
                <HelpCircle className="h-4 w-4" />
                <span className="text-sm">Help & Support</span>
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-3 h-9 text-muted-foreground hover:text-destructive">
                <LogOut className="h-4 w-4" />
                <span className="text-sm">Logout</span>
              </Button>
            </div>
          </aside>
        </>
      )}
    </>
  );
}
