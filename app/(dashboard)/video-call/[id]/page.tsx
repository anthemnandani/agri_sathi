import React from 'react';
import { VideoCallInterface } from '@/components/farmer/calling/VideoCallInterface';

export const metadata = {
  title: 'Video Call - AgriSathi',
};

interface VideoCallPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function VideoCallPage({ params }: VideoCallPageProps) {
  const { id } = await params;
  return <VideoCallInterface userId={id} />;
}
