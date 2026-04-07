import React from 'react';
import { VideoCallInterface } from '@/components/farmer/calling/VideoCallInterface';

export const metadata = {
  title: 'Video Call - AgriSathi',
};

interface VideoCallPageProps {
  params: {
    id: string;
  };
}

export default function VideoCallPage({ params }: VideoCallPageProps) {
  return <VideoCallInterface userId={params.id} />;
}
