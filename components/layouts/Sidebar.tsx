'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  Shopping,
  Cloud,
  Users,
  Stethoscope,
  FileText,
  Wrench,
  Package,
  Settings,
  HelpCircle,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

const menuItems = [
  { label: 'Home', href: '/farmer/home', icon: Home },
  { label: 'Marketplace', href: '/farmer/marketplace', icon: Shopping },
  { label: 'Weather', href: '/farmer/weather', icon: Cloud },
  { label: 'Communities', href: '/farmer/communities', icon: Users },
  { label: 'Expert Talk', href: '/farmer/expert-talk', icon: Stethoscope },
  { label: 'Schemes', href: '/farmer/schemes', icon: FileText },
  { label: 'Workers', href: '/farmer/workers', icon: Wrench },
  { label: 'My Products', href: '/farmer/my-products', icon: Package },
];

const bottomItems = [
  { label: 'Settings', href: '/farmer/settings', icon: Settings },
  { label: 'Help', href: '/farmer/help', icon: HelpCircle },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 border-r border-border bg-card md:flex flex-col">
      <ScrollArea className="flex-1 px-4 py-6">
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname.startsWith(item.href);

            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={isActive ? 'default' : 'ghost'}
                  className="w-full justify-start gap-3"
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </Button>
              </Link>
            );
          })}
        </nav>
      </ScrollArea>

      {/* Bottom Menu Items */}
      <div className="border-t border-border px-4 py-4 space-y-2">
        {bottomItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname.startsWith(item.href);

          return (
            <Link key={item.href} href={item.href}>
              <Button
                variant={isActive ? 'default' : 'ghost'}
                className="w-full justify-start gap-3"
              >
                <Icon className="h-5 w-5" />
                {item.label}
              </Button>
            </Link>
          );
        })}
      </div>
    </aside>
  );
}
