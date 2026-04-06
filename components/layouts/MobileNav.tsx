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
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { label: 'Home', href: '/farmer/home', icon: Home },
  { label: 'Posts', href: '/farmer/posts', icon: Share2 },
  { label: 'Market', href: '/farmer/marketplace', icon: ShoppingBag },
  { label: 'Weather', href: '/farmer/weather', icon: Cloud },
  { label: 'Community', href: '/farmer/communities', icon: Users },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="border-t border-border bg-card md:hidden">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-1 flex-col items-center gap-1 py-3 px-2 text-xs font-medium transition-colors',
                isActive
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <Icon className="h-6 w-6" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
