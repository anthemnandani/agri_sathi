import React from 'react';
import { VoiceCallInterface } from '@/components/farmer/calling/VoiceCallInterface';

export const metadata = {
  title: 'Voice Call - AgriSathi',
};

interface VoiceCallPageProps {
  params: {
    id: string;
  };
}

export default function VoiceCallPage({ params }: VoiceCallPageProps) {
  return <VoiceCallInterface userId={params.id} />;
}
