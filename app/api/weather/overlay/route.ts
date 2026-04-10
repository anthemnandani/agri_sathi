import { NextRequest, NextResponse } from 'next/server';

// Types for weather overlay data
export interface WeatherOverlayPoint {
  lat: number;
  lng: number;
  value: number;
  intensity: 'low' | 'medium' | 'high' | 'critical';
  label?: string;
}

export interface WeatherOverlayData {
  type: 'temperature' | 'rain' | 'thunderstorm' | 'clouds' | 'flood';
  points: WeatherOverlayPoint[];
  lastUpdated: string;
  metadata: {
    minValue: number;
    maxValue: number;
    unit: string;
  };
}

// Generate overlay data based on map bounds and type
function generateOverlayData(
  bounds: { north: number; south: number; east: number; west: number },
  overlayType: string
): WeatherOverlayData {
  const points: WeatherOverlayPoint[] = [];
  
  // Generate grid of data points
  const latStep = (bounds.north - bounds.south) / 5;
  const lngStep = (bounds.east - bounds.west) / 5;

  for (let lat = bounds.south; lat <= bounds.north; lat += latStep) {
    for (let lng = bounds.west; lng <= bounds.east; lng += lngStep) {
      const randomValue = Math.random();

      switch (overlayType) {
        case 'temperature':
          points.push({
            lat,
            lng,
            value: Math.round((20 + randomValue * 18) * 10) / 10,
            intensity: randomValue > 0.8 ? 'high' : randomValue > 0.5 ? 'medium' : 'low',
            label: `${Math.round(20 + randomValue * 18)}°C`,
          });
          break;

        case 'rain':
          if (randomValue > 0.5) {
            points.push({
              lat,
              lng,
              value: Math.round(randomValue * 100),
              intensity: randomValue > 0.8 ? 'high' : randomValue > 0.6 ? 'medium' : 'low',
              label: `${Math.round(randomValue * 50)}mm`,
            });
          }
          break;

        case 'thunderstorm':
          if (randomValue > 0.75) {
            points.push({
              lat,
              lng,
              value: Math.round(randomValue * 100),
              intensity: randomValue > 0.9 ? 'critical' : 'high',
              label: 'Thunderstorm',
            });
          }
          break;

        case 'clouds':
          points.push({
            lat,
            lng,
            value: Math.round(randomValue * 100),
            intensity: randomValue > 0.8 ? 'high' : randomValue > 0.5 ? 'medium' : 'low',
            label: `${Math.round(randomValue * 100)}%`,
          });
          break;

        case 'flood':
          if (randomValue > 0.7) {
            points.push({
              lat,
              lng,
              value: Math.round(randomValue * 100),
              intensity: randomValue > 0.9 ? 'critical' : randomValue > 0.8 ? 'high' : 'medium',
              label: randomValue > 0.9 ? 'High Risk' : 'Medium Risk',
            });
          }
          break;
      }
    }
  }

  // Metadata based on type
  const metadata = {
    temperature: { minValue: 15, maxValue: 45, unit: '°C' },
    rain: { minValue: 0, maxValue: 100, unit: 'mm' },
    thunderstorm: { minValue: 0, maxValue: 100, unit: '%' },
    clouds: { minValue: 0, maxValue: 100, unit: '%' },
    flood: { minValue: 0, maxValue: 100, unit: 'risk %' },
  };

  return {
    type: overlayType as any,
    points,
    lastUpdated: new Date().toISOString(),
    metadata: metadata[overlayType as keyof typeof metadata] || metadata.temperature,
  };
}

// Predefined overlay data for specific regions
const PREDEFINED_OVERLAYS: Record<string, Record<string, WeatherOverlayPoint[]>> = {
  'bihar': {
    thunderstorm: [
      { lat: 26.5, lng: 86.5, value: 85, intensity: 'critical', label: 'Severe Thunderstorm' },
      { lat: 26.2, lng: 87.0, value: 70, intensity: 'high', label: 'Thunderstorm' },
      { lat: 25.8, lng: 86.8, value: 60, intensity: 'medium', label: 'Moderate' },
    ],
    flood: [
      { lat: 26.1, lng: 87.0, value: 90, intensity: 'critical', label: 'High Flood Risk - Kosi River' },
      { lat: 26.3, lng: 86.5, value: 75, intensity: 'high', label: 'Flood Warning' },
      { lat: 25.9, lng: 87.2, value: 50, intensity: 'medium', label: 'Moderate Risk' },
    ],
    rain: [
      { lat: 26.0, lng: 86.8, value: 80, intensity: 'high', label: '45mm expected' },
      { lat: 26.4, lng: 87.1, value: 65, intensity: 'medium', label: '30mm expected' },
      { lat: 25.7, lng: 86.6, value: 40, intensity: 'low', label: '15mm expected' },
    ],
  },
};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'temperature';
    const north = parseFloat(searchParams.get('north') || '28');
    const south = parseFloat(searchParams.get('south') || '22');
    const east = parseFloat(searchParams.get('east') || '90');
    const west = parseFloat(searchParams.get('west') || '82');
    const region = searchParams.get('region');

    // Check for predefined region data
    if (region && PREDEFINED_OVERLAYS[region] && PREDEFINED_OVERLAYS[region][type]) {
      return NextResponse.json({
        success: true,
        data: {
          type,
          points: PREDEFINED_OVERLAYS[region][type],
          lastUpdated: new Date().toISOString(),
          metadata: {
            minValue: 0,
            maxValue: 100,
            unit: type === 'temperature' ? '°C' : '%',
          },
        },
      });
    }

    // Generate overlay data for bounds
    const overlayData = generateOverlayData(
      { north, south, east, west },
      type
    );

    return NextResponse.json({
      success: true,
      data: overlayData,
    });
  } catch (error) {
    console.error('Weather overlay API error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch weather overlay data' },
      { status: 500 }
    );
  }
}
