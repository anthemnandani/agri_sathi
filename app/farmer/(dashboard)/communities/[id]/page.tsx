'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CommunityHeader } from '@/components/farmer/communities/CommunityHeader';
import { CommunityChat } from '@/components/farmer/communities/CommunityChat';
import { CommunityMembers } from '@/components/farmer/communities/CommunityMembers';
import { PinnedMessages } from '@/components/farmer/communities/PinnedMessages';
import { MediaGallery } from '@/components/farmer/communities/MediaGallery';
import { CommunityDocuments } from '@/components/farmer/communities/CommunityDocuments';
import { Users, Lock } from 'lucide-react';
import { mockCommunityDetail, mockMediaItems, mockDocuments } from '@/lib/mock-communities-enhanced';
import { toast } from 'sonner';

export const metadata = {
  title: 'Community - AgriSathi',
  description: 'Community group chat and discussion',
};

export default function CommunityDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const [hasJoined, setHasJoined] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showMediaGallery, setShowMediaGallery] = useState(false);
  const [showDocuments, setShowDocuments] = useState(false);
  const [showMembers, setShowMembers] = useState(false);

  useEffect(() => {
    // Simulate checking if user is member
    const timer = setTimeout(() => {
      setLoading(false);
      // Default to not joined, user sees join button
      setHasJoined(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [params.id]);

  const handleJoinCommunity = async () => {
    try {
      setLoading(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setHasJoined(true);
      toast.success(`${mockCommunityDetail.name} में शामिल हो गए!`);
    } catch (error) {
      toast.error('समूह में शामिल होने में विफल');
    } finally {
      setLoading(false);
    }
  };

  const handleLeaveCommunity = () => {
    setHasJoined(false);
    toast.success(`${mockCommunityDetail.name} से निकल गए`);
    router.push('/farmer/communities');
  };

  if (loading) {
    return (
      <div className="h-[100dvh] flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
      </div>
    );
  }

  // Join Screen - WhatsApp style
  if (!hasJoined) {
    return (
      <div className="h-[100dvh] flex items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-8 space-y-6 text-center">
            {/* Header */}
            <div className="space-y-2">
              <div className="text-6xl mb-4">{mockCommunityDetail.icon}</div>
              <h1 className="text-3xl font-bold text-foreground">
                {mockCommunityDetail.name}
              </h1>
              <p className="text-muted-foreground text-sm">
                {mockCommunityDetail.description}
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 bg-muted/30 rounded-lg p-4">
              <div>
                <p className="text-2xl font-bold text-primary">
                  {mockCommunityDetail.membersList.length}
                </p>
                <p className="text-xs text-muted-foreground">सदस्य</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-accent">
                  {mockCommunityDetail.stats.totalMessages}
                </p>
                <p className="text-xs text-muted-foreground">संदेश</p>
              </div>
            </div>

            {/* Info */}
            <div className="space-y-2 text-left">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="h-4 w-4" />
                <span>{mockCommunityDetail.stats.activeToday} सदस्य आज सक्रिय हैं</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="text-xl">🌐</span>
                <span>{mockCommunityDetail.language} भाषा में चर्चा</span>
              </div>
              {mockCommunityDetail.private && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Lock className="h-4 w-4" />
                  <span>निजी समूह</span>
                </div>
              )}
            </div>

            {/* Rules */}
            <div className="text-left bg-muted/30 rounded-lg p-3 space-y-2">
              <p className="font-semibold text-sm text-foreground">समूह के नियम:</p>
              <ul className="text-xs text-muted-foreground space-y-1">
                {mockCommunityDetail.rules.map((rule, idx) => (
                  <li key={idx}>• {rule}</li>
                ))}
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 pt-2">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => router.push('/farmer/communities')}
              >
                वापस जाएं
              </Button>
              <Button
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
                onClick={handleJoinCommunity}
              >
                अभी शामिल हों
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Full Community View - WhatsApp style
  return (
    <div className="h-[100dvh] flex flex-col bg-background overflow-hidden">
      {/* Header */}
      <CommunityHeader
        communityId={params.id}
        onMembersClick={() => setShowMembers(true)}
        onMediaClick={() => setShowMediaGallery(true)}
        onDocumentsClick={() => setShowDocuments(true)}
        onLeave={handleLeaveCommunity}
      />

      {/* Main Content - Responsive Grid */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-0 lg:gap-4 min-h-0 bg-background overflow-hidden lg:p-4">
        {/* Chat Area - Full width on mobile */}
        <div className="lg:col-span-3 flex flex-col min-h-0 rounded-none lg:rounded-lg border-0 lg:border border-border bg-card overflow-hidden">
          <CommunityChat communityId={params.id} />
        </div>

        {/* Desktop Sidebar - Hidden on mobile */}
        <div className="hidden lg:flex flex-col gap-4 min-h-0 overflow-y-auto">
          {/* Pinned Messages */}
          <div className="flex-shrink-0">
            <PinnedMessages communityId={params.id} />
          </div>

          {/* Members */}
          <div className="flex-1 min-h-0 overflow-y-auto">
            <CommunityMembers communityId={params.id} />
          </div>

          {/* Quick Actions */}
          <div className="flex-shrink-0 space-y-2">
            <Button
              variant="outline"
              className="w-full text-xs font-medium"
              onClick={() => setShowMediaGallery(true)}
            >
              📸 मीडिया गैलरी
            </Button>
            <Button
              variant="outline"
              className="w-full text-xs font-medium"
              onClick={() => setShowDocuments(true)}
            >
              📄 दस्तावेज़
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Action Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 border-t border-border bg-card p-2 flex gap-2 justify-between">
        <Button
          variant="outline"
          size="sm"
          className="flex-1 h-10 text-xs"
          onClick={() => setShowMembers(true)}
          title="सदस्य"
        >
          👥 सदस्य
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="flex-1 h-10 text-xs"
          onClick={() => setShowMediaGallery(true)}
          title="मीडिया"
        >
          📸 मीडिया
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="flex-1 h-10 text-xs"
          onClick={() => setShowDocuments(true)}
          title="दस्तावेज़"
        >
          📄 फाइल
        </Button>
      </div>

      {/* Add padding to chat to account for bottom bar on mobile */}
      <style>{`
        @media (max-width: 1024px) {
          .lg\\:col-span-3 {
            padding-bottom: 56px;
          }
        }
      `}</style>

      {/* Media Gallery Modal */}
      <MediaGallery
        isOpen={showMediaGallery}
        onClose={() => setShowMediaGallery(false)}
        mediaItems={mockMediaItems}
      />

      {/* Documents Modal */}
      <CommunityDocuments
        isOpen={showDocuments}
        onClose={() => setShowDocuments(false)}
        documents={mockDocuments}
      />

      {/* Members Modal - Bottom Sheet on Mobile */}
      {showMembers && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-end lg:items-center lg:justify-center">
          <Card className="w-full lg:max-w-2xl max-h-[80vh] rounded-t-2xl lg:rounded-lg overflow-hidden">
            <CardContent className="p-0">
              {/* Modal Header */}
              <div className="flex items-center justify-between border-b border-border p-4 lg:hidden">
                <h2 className="font-bold text-lg">समूह सदस्य</h2>
                <button
                  onClick={() => setShowMembers(false)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  ✕
                </button>
              </div>
              {/* Modal Content */}
              <div className="overflow-y-auto">
                <CommunityMembers communityId={params.id} />
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
