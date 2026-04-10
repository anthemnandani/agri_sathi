'use client';

import dynamic from 'next/dynamic';

// Dynamically import LeafletMap with SSR disabled since Leaflet requires window object
const LeafletMap = dynamic(
  () => import('./LeafletMap').then((mod) => mod.LeafletMap),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full min-h-[400px] flex items-center justify-center bg-muted rounded-lg border-2 border-foreground/10">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-2"></div>
          <p className="text-sm text-muted-foreground">Loading interactive map...</p>
        </div>
      </div>
    ),
  }
);

export function InteractiveWeatherMap() {
  return <LeafletMap />;
}
