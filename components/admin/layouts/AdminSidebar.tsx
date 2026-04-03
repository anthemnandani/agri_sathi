'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BarChart3,
  Users,
  MessageSquare,
  Leaf,
  Cloud,
  BookOpen,
  FileText,
  Zap,
  ChevronRight,
} from 'lucide-react';

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  {
    label: 'Dashboard',
    href: '/admin',
    icon: BarChart3,
  },
  {
    label: 'Users Management',
    href: '/admin/users',
    icon: Users,
  },
  {
    label: 'Posts Moderation',
    href: '/admin/posts',
    icon: MessageSquare,
  },
  {
    label: 'Government Schemes',
    href: '/admin/schemes',
    icon: Leaf,
  },
  {
    label: 'Crop Guide',
    href: '/admin/crop-guide',
    icon: BookOpen,
  },
  {
    label: 'Weather Alerts',
    href: '/admin/weather-alerts',
    icon: Cloud,
  },
  {
    label: 'Reports & Analytics',
    href: '/admin/reports',
    icon: FileText,
  },
  {
    label: 'Background Jobs',
    href: '/admin/background-jobs',
    icon: Zap,
  },
];

export default function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-card border-r border-border">
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white font-bold">
              AS
            </div>
            <div>
              <p className="text-sm font-bold">AgriSathi</p>
              <p className="text-xs text-muted-foreground">Admin Panel</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-foreground hover:bg-muted'
                }`}
              >
                <Icon size={20} />
                <span className="flex-1 text-sm font-medium">{item.label}</span>
                {isActive && <ChevronRight size={16} />}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-border">
          <div className="bg-muted/50 rounded-lg p-4 text-center">
            <p className="text-xs font-semibold mb-2">Version 1.0</p>
            <p className="text-xs text-muted-foreground">Last updated today</p>
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
        />
      )}
    </>
  );
}
