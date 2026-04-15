'use client';

import React, { useState, useEffect } from 'react';
import { SchemeCard } from './SchemeCard';

export function SchemesList() {
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSchemes = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/schemes');
        if (!response.ok) {
          throw new Error('Failed to fetch schemes');
        }
        const result = await response.json();
        setSchemes(result.data || []);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('[v0] Error fetching schemes:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSchemes();
  }, []);

  if (loading) {
    return <div className="space-y-4">{Array.from({ length: 6 }).map((_, i) => (
      <div key={i} className="h-32 bg-muted rounded-lg animate-pulse" />
    ))}</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  return (
    <div>
      <div className="mb-6 space-y-2">
        <h2 className="text-lg font-semibold text-foreground">
          Available Schemes
        </h2>
        <p className="text-sm text-muted-foreground">
          {schemes.length} schemes available for your benefit
        </p>
      </div>

      <div className="space-y-4">
        {schemes.map((scheme: any) => (
          <SchemeCard key={scheme.id} scheme={scheme} />
        ))}
      </div>
    </div>
  );
}
