'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  ShoppingBag,
  Cloud,
  Users,
  Stethoscope,
  FileText,
  Wrench,
  Package,
  Share2,
  Leaf,
  Settings,
  HelpCircle,
  Tractor,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

const menuItems = [
  { label: 'Home', href: '/farmer/home', icon: Home },
  { label: 'Posts', href: '/farmer/posts', icon: Share2 },
  { label: 'Marketplace', href: '/farmer/marketplace', icon: ShoppingBag },
  { label: 'Rental Tools', href: '/farmer/rental-tools', icon: Tractor },
  { label: 'Weather', href: '/farmer/weather', icon: Cloud },
  { label: 'Crops', href: '/farmer/crops', icon: Leaf },
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
    <aside className="w-64 border-r border-border bg-card flex flex-col">
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
