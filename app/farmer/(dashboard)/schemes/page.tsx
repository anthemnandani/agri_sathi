import React from 'react';
import { SchemesList } from '@/components/farmer/schemes/SchemesList';

export const metadata = {
  title: 'Government Schemes - AgriSathi',
  description: 'Discover government schemes and subsidies for farmers',
};

export default function SchemesPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Government Schemes</h1>
        <p className="text-muted-foreground">
          Find and apply for government schemes and subsidies available for farmers
        </p>
      </div>

      {/* Schemes List */}
      <SchemesList />
    </div>
  );
}
