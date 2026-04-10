import React from 'react';
import { DiagnosticsSection } from '@/components/farmer/expert/DiagnosticsSection';
import { HistorySection } from '@/components/farmer/expert/HistorySection';

export const metadata = {
  title: 'Expert Talk & AI Diagnostics - AgriSathi',
  description: 'Get crop diagnostics and expert advice through AI analysis',
};

export default function ExpertTalkPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Expert Talk</h1>
        <p className="text-muted-foreground">
          Upload crop images for AI diagnostics or connect with agricultural experts
        </p>
      </div>

      {/* Diagnostics Upload Section */}
      <DiagnosticsSection />

      {/* History Section */}
      <HistorySection />
    </div>
  );
}
