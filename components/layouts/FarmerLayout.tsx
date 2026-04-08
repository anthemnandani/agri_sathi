'use client';

import React, { ReactNode, useState } from 'react';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { MobileNav } from './MobileNav';
import { useIsMobile } from '@/hooks/use-mobile';

function SidebarWithClose({ onClose }: { onClose: () => void }) {
  const handleNavigation = () => {
    // Close sidebar on any navigation
    setTimeout(() => onClose(), 50);
  };

  return (
    <div onClick={handleNavigation}>
      <Sidebar />
    </div>
  );
}

interface FarmerLayoutProps {
  children: ReactNode;
}

export function FarmerLayout({ children }: FarmerLayoutProps) {
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen flex-col bg-background">
      {/* Top Navbar */}
      <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

      <div className="flex flex-1 overflow-hidden mt-[60px]">
        {/* Desktop Sidebar */}
        {!isMobile && <Sidebar />}

        {/* Mobile Sidebar */}
        {isMobile && sidebarOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-30 bg-black/50 md:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            {/* Mobile Sidebar */}
            <div className="fixed left-0 top-[60px] h-[calc(100vh-60px)] overflow-y-auto md:hidden w-64 bg-card border-r border-border" style={{ zIndex: 35 }}>
              <SidebarWithClose onClose={() => setSidebarOpen(false)} />
            </div>
          </>
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-7xl p-4 md:p-6">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      {isMobile && <MobileNav />}
    </div>
  );
}
