'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Locate, Cloud, Zap, CloudRain } from 'lucide-react';
import { WeatherDetailsPopup } from './WeatherDetailsPopup';
import { MapLayerControls, LayerState } from './MapLayerControls';
import { getWeatherData, LocationDetails, getWeatherOverlayData } from '@/utils/weather/weatherService';

interface MapMarker {
  id: string;
  lat: number;
  lng: number;
  label: string;
}

interface MapState {
  zoom: number;
  center: { lat: number; lng: number };
}

export function InteractiveWeatherMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const [mapState, setMapState] = useState<MapState>({
    zoom: 5,
    center: { lat: 26.2, lng: 87.5 }, // Supaul, Bihar as default
  });

  const [markers, setMarkers] = useState<MapMarker[]>([
    { id: '1', lat: 26.2, lng: 87.5, label: 'Supaul, Bihar' },
    { id: '2', lat: 28.7041, lng: 77.1025, label: 'Delhi' },
    { id: '3', lat: 19.076, lng: 72.8776, label: 'Mumbai' },
    { id: '4', lat: 12.9716, lng: 77.5946, label: 'Bangalore' },
    { id: '5', lat: 23.1815, lng: 79.9864, label: 'Indore' },
  ]);

  const [selectedMarker, setSelectedMarker] = useState<MapMarker | null>(null);
  const [weatherData, setWeatherData] = useState<LocationDetails | null>(null);
  const [loadingWeather, setLoadingWeather] = useState(false);
  const [layers, setLayers] = useState<LayerState>({
    temperature: false,
    rain: false,
    thunderstorm: false,
    clouds: true,
    flood: false,
  });
  const [mapLoaded, setMapLoaded] = useState(false);

  // Fetch weather data for location
  const fetchWeatherForLocation = useCallback(async (lat: number, lng: number, label: string) => {
    setLoadingWeather(true);
    try {
      const data = await getWeatherData(lat, lng);
      setWeatherData({ ...data, location: label });
    } catch (error) {
      console.error('[v0] Error fetching weather:', error);
    } finally {
      setLoadingWeather(false);
    }
  }, []);

  // Handle marker click
  const handleMarkerClick = useCallback(
    (marker: MapMarker) => {
      setSelectedMarker(marker);
      fetchWeatherForLocation(marker.lat, marker.lng, marker.label);
      setMapState((prev) => ({
        ...prev,
        center: { lat: marker.lat, lng: marker.lng },
        zoom: 10,
      }));
      if (mapRef.current) {
        mapRef.current.setView([marker.lat, marker.lng], 10);
      }
    },
    [fetchWeatherForLocation]
  );

  // Handle map click
  const handleMapClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!mapRef.current) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const { zoom, center } = mapState;
      
      // Simple pixel to lat/lng conversion
      const pixelX = e.clientX - rect.left;
      const pixelY = e.clientY - rect.top;
      const normalizedX = (pixelX / rect.width) - 0.5;
      const normalizedY = 0.5 - (pixelY / rect.height);
      
      const latRange = 40 / Math.pow(2, zoom - 1);
      const lngRange = 60 / Math.pow(2, zoom - 1);
      
      const lat = center.lat + (normalizedY * latRange);
      const lng = center.lng + (normalizedX * lngRange);
      
      fetchWeatherForLocation(lat, lng, `Location ${lat.toFixed(2)}, ${lng.toFixed(2)}`);
    },
    [mapState, fetchWeatherForLocation]
  );

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
          setMapState({ zoom: 10, center: { lat: latitude, lng: longitude } });
          fetchWeatherForLocation(latitude, longitude, 'Your Location');
          if (mapRef.current) {
            mapRef.current.setView([latitude, longitude], 10);
          }
        },
        () => {
          // Use default location if permission denied
          setMapState({ zoom: 10, center: { lat: 26.2, lng: 87.5 } });
          fetchWeatherForLocation(26.2, 87.5, 'Supaul, Bihar');
          if (mapRef.current) {
            mapRef.current.setView([26.2, 87.5], 10);
          }
        }
      );
    }
  }, [fetchWeatherForLocation]);

  // Initialize map with Leaflet
  useEffect(() => {
    if (typeof window === 'undefined' || !containerRef.current) return;

    const initMap = async () => {
      try {
        const L = await import('leaflet');
        
        // Clear existing map if any
        if (mapRef.current) {
          mapRef.current.remove();
        }

        // Create map
        const map = L.map(containerRef.current!, {
          center: [mapState.center.lat, mapState.center.lng],
          zoom: mapState.zoom,
          zoomControl: false,
        });

        // Add tile layer from OpenStreetMap
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; OpenStreetMap contributors',
          maxZoom: 19,
        }).addTo(map);

        // Add markers
        markers.forEach((marker) => {
          const leafletMarker = L.marker([marker.lat, marker.lng], {
            title: marker.label,
          }).addTo(map);

          leafletMarker.on('click', () => {
            handleMarkerClick(marker);
          });

          leafletMarker.bindPopup(`<div class="text-sm font-medium">${marker.label}</div>`);
        });

        // Handle map click for weather data
        map.on('click', (e: any) => {
          const { lat, lng } = e.latlng;
          fetchWeatherForLocation(lat, lng, `Location ${lat.toFixed(2)}, ${lng.toFixed(2)}`);
        });

        // Update map state on move
        map.on('moveend', () => {
          const center = map.getCenter();
          const zoom = map.getZoom();
          setMapState({ zoom, center: { lat: center.lat, lng: center.lng } });
        });

        mapRef.current = map;
        setMapLoaded(true);
      } catch (error) {
        console.error('[v0] Error initializing map:', error);
      }
    };

    initMap();
    handleCurrentLocation();

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, []);

  // Calculate visible bounds for weather overlays
  const latRange = 40 / Math.pow(2, mapState.zoom - 1);
  const lngRange = 60 / Math.pow(2, mapState.zoom - 1);
  const bounds = {
    north: mapState.center.lat + latRange / 2,
    south: mapState.center.lat - latRange / 2,
    east: mapState.center.lng + lngRange / 2,
    west: mapState.center.lng - lngRange / 2,
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
      <Card className="border-2 border-foreground/10 overflow-hidden h-full relative">
        <div
          ref={containerRef}
          className="relative w-full h-full min-h-[400px] md:min-h-[500px] rounded-lg bg-blue-50 dark:bg-slate-900"
          onClick={handleMapClick}
        >
          {/* Weather Overlays SVG */}
          {mapLoaded && (
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
              {Object.entries(overlayData).map(([layerType, data]) => (
                <g key={layerType}>
                  {(data as any).map((point: any, idx: number) => {
                    const x = lngToPixel(point.lng, 100);
                    const y = latToPixel(point.lat, 100);
                    const size = Math.max(15, 40 - mapState.zoom);
                    let color = 'rgba(0, 0, 0, 0.1)';
                    let opacity = 0.6;

                    switch (layerType) {
                      case 'temperature':
                        color =
                          point.value > 30
                            ? 'rgb(239, 68, 68)'
                            : point.value > 25
                              ? 'rgb(249, 115, 22)'
                              : 'rgb(96, 165, 250)';
                        opacity =
                          point.intensity === 'high'
                            ? 0.7
                            : point.intensity === 'medium'
                              ? 0.5
                              : 0.3;
                        break;
                      case 'rain':
                        color =
                          point.intensity === 'heavy'
                            ? 'rgb(29, 78, 216)'
                            : 'rgb(96, 165, 250)';
                        opacity = point.intensity === 'heavy' ? 0.8 : 0.5;
                        break;
                      case 'thunderstorm':
                        color = 'rgb(168, 85, 247)';
                        opacity = 0.8;
                        break;
                      case 'clouds':
                        color = 'rgb(156, 163, 175)';
                        opacity =
                          point.intensity === 'dense'
                            ? 0.7
                            : point.intensity === 'moderate'
                              ? 0.5
                              : 0.3;
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
                </g>
              ))}
            </svg>
          )}

          {/* Controls - Top Right */}
          <div className="absolute top-4 right-4 z-40 flex flex-col gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={handleCurrentLocation}
              className="bg-white dark:bg-slate-900 shadow-md"
              title="Go to your current location"
            >
              <Locate className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline text-xs">My Location</span>
            </Button>
          </div>

          {/* Info Box - Top Left */}
          <div className="absolute top-4 left-4 z-40 bg-white dark:bg-slate-900 rounded-lg p-3 max-w-xs border border-border shadow-md">
            <div className="flex items-start gap-2">
              <Cloud className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
              <div className="text-sm">
                <p className="font-semibold text-foreground">Interactive Weather Map</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Click anywhere on the map or on markers to view weather details. Drag to explore different areas.
                </p>
              </div>
            </div>
          </div>

          {/* Legend - Bottom Left */}
          {Object.values(layers).some(Boolean) && (
            <div className="absolute bottom-24 left-4 z-40 bg-white dark:bg-slate-900 rounded-lg p-3 max-w-xs border border-border shadow-md">
              <p className="text-xs font-semibold text-foreground mb-2">Active Layers</p>
              <div className="space-y-1 text-xs">
                {layers.temperature && (
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'rgb(239, 68, 68)' }} />
                    <span className="text-muted-foreground">Temperature</span>
                  </div>
                )}
                {layers.rain && (
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'rgb(29, 78, 216)' }} />
                    <span className="text-muted-foreground">Rainfall</span>
                  </div>
                )}
                {layers.thunderstorm && (
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'rgb(168, 85, 247)' }} />
                    <span className="text-muted-foreground">Thunderstorm</span>
                  </div>
                )}
                {layers.clouds && (
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'rgb(156, 163, 175)' }} />
                    <span className="text-muted-foreground">Cloud Cover</span>
                  </div>
                )}
                {layers.flood && (
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'rgb(239, 68, 68)' }} />
                    <span className="text-muted-foreground">Flood Risk</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Loading Indicator */}
          {loadingWeather && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 z-40 rounded-lg">
              <div className="bg-white dark:bg-slate-900 px-4 py-3 rounded-lg shadow-lg flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                <p className="text-sm text-foreground">Loading weather data...</p>
              </div>
            </div>
          )}
        </div>
      </Card>

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
