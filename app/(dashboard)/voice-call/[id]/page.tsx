import React from 'react';
import { VoiceCallInterface } from '@/components/farmer/calling/VoiceCallInterface';

export const metadata = {
  title: 'Voice Call - AgriSathi',
};

interface VoiceCallPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function VoiceCallPage({ params }: VoiceCallPageProps) {
  const { id } = await params;
  return <VoiceCallInterface userId={id} />;
}
