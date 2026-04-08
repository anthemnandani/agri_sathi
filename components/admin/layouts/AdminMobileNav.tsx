'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { X } from 'lucide-react';
import {
  BarChart3,
  Users,
  MessageSquare,
  Leaf,
  Cloud,
  BookOpen,
  FileText,
  Zap,
} from 'lucide-react';

interface AdminMobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { label: 'Dashboard', href: '/admin', icon: BarChart3 },
  { label: 'Users', href: '/admin/users', icon: Users },
  { label: 'Posts', href: '/admin/posts', icon: MessageSquare },
  { label: 'Schemes', href: '/admin/schemes', icon: Leaf },
  { label: 'Crops', href: '/admin/crop-guide', icon: BookOpen },
  { label: 'Weather', href: '/admin/weather-alerts', icon: Cloud },
  { label: 'Reports', href: '/admin/reports', icon: FileText },
  { label: 'Jobs', href: '/admin/background-jobs', icon: Zap },
];

export default function AdminMobileNav({ isOpen, onClose }: AdminMobileNavProps) {
  const pathname = usePathname();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* Sidebar */}
      <div className="absolute left-0 top-0 bottom-0 w-64 bg-card border-r border-border shadow-lg flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="font-bold">Navigation</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-lg"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-foreground hover:bg-muted'
                }`}
              >
                <Icon size={20} />
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
