'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { MapPin, Plus, Minus, Locate } from 'lucide-react';
import { WeatherDetailsPopup } from './WeatherDetailsPopup';
import { MapLayerControls, LayerState } from './MapLayerControls';
import { getWeatherData, LocationDetails, getWeatherOverlayData } from '@/utils/weather/weatherService';

interface MapMarker {
  id: string;
  lat: number;
  lng: number;
  label: string;
}

export function InteractiveWeatherMap() {
  // State management
  const [zoom, setZoom] = useState(8);
  const [center, setCenter] = useState({ lat: 26.2, lng: 87.5 }); // Default to user location (Bihar, Supaul)
  const [markers, setMarkers] = useState<MapMarker[]>([
    { id: '1', lat: 26.2, lng: 87.5, label: 'Supaul, Bihar' },
    { id: '2', lat: 28.7041, lng: 77.1025, label: 'Delhi' },
    { id: '3', lat: 19.076, lng: 72.8776, label: 'Mumbai' },
    { id: '4', lat: 12.9716, lng: 77.5946, label: 'Bangalore' },
  ]);
  const [selectedMarker, setSelectedMarker] = useState<MapMarker | null>(null);
  const [weatherData, setWeatherData] = useState<LocationDetails | null>(null);
  const [loadingWeather, setLoadingWeather] = useState(false);
  const [layers, setLayers] = useState<LayerState>({
    temperature: false,
    rain: false,
    thunderstorm: false,
    clouds: false,
    flood: false,
  });
  const [draggedPosition, setDraggedPosition] = useState<{ x: number; y: number } | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Handle zoom in
  const handleZoomIn = useCallback(() => {
    setZoom((prev) => Math.min(prev + 1, 18));
  }, []);

  // Handle zoom out
  const handleZoomOut = useCallback(() => {
    setZoom((prev) => Math.max(prev - 1, 1));
  }, []);

  // Handle map click to select location
  const handleMapClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Convert pixel coordinates to lat/lng (simplified)
    const latRange = 15; // degrees
    const lngRange = 30; // degrees
    const lat = center.lat + (0.5 - y / rect.height) * latRange * Math.pow(2, -zoom + 5);
    const lng = center.lng + (x / rect.width - 0.5) * lngRange * Math.pow(2, -zoom + 5);

    fetchWeatherForLocation(lat, lng, `Location ${lat.toFixed(2)}, ${lng.toFixed(2)}`);
  }, [center, zoom]);

  // Handle marker click
  const handleMarkerClick = useCallback(
    (marker: MapMarker) => {
      setSelectedMarker(marker);
      fetchWeatherForLocation(marker.lat, marker.lng, marker.label);
    },
    []
  );

  // Fetch weather data for location
  const fetchWeatherForLocation = useCallback(async (lat: number, lng: number, label: string) => {
    setLoadingWeather(true);
    try {
      const data = await getWeatherData(lat, lng);
      setWeatherData({ ...data, location: label });
    } catch (error) {
      console.error('Error fetching weather:', error);
    } finally {
      setLoadingWeather(false);
    }
  }, []);

  // Handle layer toggle
  const handleLayerToggle = useCallback((layer: keyof LayerState) => {
    setLayers((prev) => ({
      ...prev,
      [layer]: !prev[layer],
    }));
  }, []);

  // Handle current location
  const handleCurrentLocation = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCenter({ lat: latitude, lng: longitude });
          setZoom(10);
          fetchWeatherForLocation(latitude, longitude, 'Your Location');
        },
        (error) => {
          console.error('Geolocation error:', error);
          // Use default location if permission denied
          const defaultLat = 26.2;
          const defaultLng = 87.5;
          setCenter({ lat: defaultLat, lng: defaultLng });
          fetchWeatherForLocation(defaultLat, defaultLng, 'Supaul, Bihar');
        }
      );
    }
  }, [fetchWeatherForLocation]);

  // Handle map drag
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true);
    setDraggedPosition({ x: e.clientX, y: e.clientY });
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isDragging || !draggedPosition) return;

      const deltaX = e.clientX - draggedPosition.x;
      const deltaY = e.clientY - draggedPosition.y;

      // Update center based on drag
      const lngChange = (-deltaX / e.currentTarget.offsetWidth) * 30 * Math.pow(2, -zoom + 5);
      const latChange = (deltaY / e.currentTarget.offsetHeight) * 15 * Math.pow(2, -zoom + 5);

      setCenter((prev) => ({
        lat: Math.max(-85, Math.min(85, prev.lat + latChange)),
        lng: ((prev.lng + lngChange + 180) % 360) - 180,
      }));

      setDraggedPosition({ x: e.clientX, y: e.clientY });
    },
    [isDragging, draggedPosition, zoom]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    setDraggedPosition(null);
  }, []);

  // Load initial weather data on mount
  useEffect(() => {
    handleCurrentLocation();
  }, []);

  // Calculate visible bounds
  const latRange = 15 * Math.pow(2, -zoom + 5);
  const lngRange = 30 * Math.pow(2, -zoom + 5);
  const bounds = {
    north: center.lat + latRange / 2,
    south: center.lat - latRange / 2,
    east: center.lng + lngRange / 2,
    west: center.lng - lngRange / 2,
  };

  // Get overlay data
  const overlayData = Object.entries(layers).reduce(
    (acc, [key, isActive]) => {
      if (isActive) {
        acc[key as keyof LayerState] = getWeatherOverlayData(bounds, key as any);
      }
      return acc;
    },
    {} as Record<keyof LayerState, ReturnType<typeof getWeatherOverlayData>>
  );

  // Convert lat/lng to pixel position
  const latToPixel = (lat: number, containerHeight: number) => {
    const normalizedLat = (lat - bounds.south) / (bounds.north - bounds.south);
    return (1 - normalizedLat) * containerHeight;
  };

  const lngToPixel = (lng: number, containerWidth: number) => {
    const normalizedLng = (lng - bounds.west) / (bounds.east - bounds.west);
    return normalizedLng * containerWidth;
  };

  return (
    <div className="relative w-full h-full">
      {/* Map Container */}
      <div className="border-2 border-foreground/10 overflow-hidden h-full relative rounded-lg">
        <div
          className="relative w-full h-full min-h-[300px] sm:min-h-[400px] lg:min-h-[500px] cursor-grab active:cursor-grabbing bg-gradient-to-b from-blue-100 to-green-100 dark:from-blue-950 dark:to-green-950"
          onClick={handleMapClick}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {/* Map Background Grid */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
            <defs>
              <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                <path d="M 50 0 L 0 0 0 50" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>

          {/* Weather Overlays */}
          {Object.entries(overlayData).map(([layerType, data]) => (
            <svg key={layerType} className="absolute inset-0 w-full h-full pointer-events-none">
              {(data as any).map((point: any, idx: number) => {
                const x = lngToPixel(point.lng, 100);
                const y = latToPixel(point.lat, 100);
                const size = Math.max(10, 30 - zoom * 2);
                let color = 'rgba(0, 0, 0, 0.1)';
                let opacity = 0.6;

                switch (layerType) {
                  case 'temperature':
                    color = point.value > 30 ? 'rgb(239, 68, 68)' : point.value > 25 ? 'rgb(249, 115, 22)' : 'rgb(96, 165, 250)';
                    opacity = point.intensity === 'high' ? 0.7 : point.intensity === 'medium' ? 0.5 : 0.3;
                    break;
                  case 'rain':
                    color = point.intensity === 'heavy' ? 'rgb(29, 78, 216)' : 'rgb(96, 165, 250)';
                    opacity = point.intensity === 'heavy' ? 0.8 : 0.5;
                    break;
                  case 'thunderstorm':
                    color = 'rgb(168, 85, 247)';
                    opacity = 0.8;
                    break;
                  case 'clouds':
                    color = 'rgb(156, 163, 175)';
                    opacity = point.intensity === 'dense' ? 0.7 : point.intensity === 'moderate' ? 0.5 : 0.3;
                    break;
                  case 'flood':
                    color = 'rgb(239, 68, 68)';
                    opacity = point.intensity === 'high' ? 0.8 : 0.6;
                    break;
                }

                return (
                  <circle
                    key={idx}
                    cx={`${x}%`}
                    cy={`${y}%`}
                    r={size}
                    fill={color}
                    opacity={opacity}
                  />
                );
              })}
            </svg>
          ))}

          {/* Markers */}
          {markers.map((marker) => {
            const x = lngToPixel(marker.lng, 100);
            const y = latToPixel(marker.lat, 100);
            const isSelected = selectedMarker?.id === marker.id;

            return (
              <div
                key={marker.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                style={{ left: `${x}%`, top: `${y}%` }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleMarkerClick(marker);
                }}
              >
                <div
                  className={`relative ${
                    isSelected
                      ? 'scale-125 drop-shadow-lg'
                      : 'hover:scale-110 transition-transform'
                  }`}
                >
                  <MapPin
                    className={`h-8 w-8 ${
                      isSelected ? 'fill-red-500 text-red-500' : 'fill-primary text-primary'
                    } drop-shadow`}
                  />
                </div>
                {isSelected && (
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-foreground text-background px-2 py-1 rounded text-xs font-medium">
                    {marker.label}
                  </div>
                )}
              </div>
            );
          })}

          {/* Center Crosshair */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-6 h-6 border-2 border-primary/50 rounded-full"></div>
          </div>

          {/* Zoom Controls */}
          <div className="absolute top-4 right-4 sm:top-6 sm:right-6 flex flex-col gap-2 z-30">
            <Button
              size="sm"
              variant="outline"
              onClick={handleZoomIn}
              className="h-9 sm:h-10 w-9 sm:w-10 p-0"
              disabled={zoom >= 18}
              aria-label="Zoom in"
            >
              <Plus className="h-4 sm:h-5 w-4 sm:w-5" />
            </Button>
            <div className="text-center text-xs font-medium px-2 py-1 bg-background/80 rounded border border-border">
              {zoom}
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={handleZoomOut}
              className="h-9 sm:h-10 w-9 sm:w-10 p-0"
              disabled={zoom <= 1}
              aria-label="Zoom out"
            >
              <Minus className="h-4 sm:h-5 w-4 sm:w-5" />
            </Button>
          </div>

          {/* Current Location Button */}
          <Button
            size="sm"
            variant="outline"
            onClick={handleCurrentLocation}
            className="absolute top-4 left-4 sm:top-6 sm:left-6 z-30 text-xs sm:text-sm"
            aria-label="Go to current location"
          >
            <Locate className="h-4 w-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">My Location</span>
          </Button>

          {/* Loading State */}
          {loadingWeather && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 z-40">
              <div className="bg-background px-4 py-2 rounded-lg shadow-lg">
                <p className="text-sm text-foreground">Loading weather data...</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Layer Controls */}
      <MapLayerControls layers={layers} onLayerToggle={handleLayerToggle} />

      {/* Weather Details Popup */}
      {weatherData && (
        <WeatherDetailsPopup
          weatherData={weatherData}
          onClose={() => {
            setWeatherData(null);
            setSelectedMarker(null);
          }}
        />
      )}
    </div>
  );
}
