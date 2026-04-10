'use client';

import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MapPin, Plus, Minus, Locate, Search, X, Layers, Navigation } from 'lucide-react';
import { WeatherDetailsPopup } from './WeatherDetailsPopup';
import { MapLayerControls, LayerState } from './MapLayerControls';
import { getWeatherData, LocationDetails, getWeatherOverlayData } from '@/utils/weather/weatherService';

// Types for Leaflet
interface LatLng {
  lat: number;
  lng: number;
}

interface MapMarker {
  id: string;
  lat: number;
  lng: number;
  label: string;
  type?: 'default' | 'user' | 'searched';
}

interface WeatherPoint {
  lat: number;
  lng: number;
  value: number;
  intensity?: string;
}

// Predefined locations for filtering
const PREDEFINED_LOCATIONS: MapMarker[] = [
  { id: 'supaul', lat: 26.1197, lng: 86.9967, label: 'Supaul, Bihar', type: 'default' },
  { id: 'delhi', lat: 28.7041, lng: 77.1025, label: 'Delhi', type: 'default' },
  { id: 'mumbai', lat: 19.076, lng: 72.8776, label: 'Mumbai', type: 'default' },
  { id: 'bangalore', lat: 12.9716, lng: 77.5946, label: 'Bangalore', type: 'default' },
  { id: 'patna', lat: 25.5941, lng: 85.1376, label: 'Patna, Bihar', type: 'default' },
  { id: 'kolkata', lat: 22.5726, lng: 88.3639, label: 'Kolkata', type: 'default' },
  { id: 'chennai', lat: 13.0827, lng: 80.2707, label: 'Chennai', type: 'default' },
  { id: 'hyderabad', lat: 17.385, lng: 78.4867, label: 'Hyderabad', type: 'default' },
];

export function LeafletMap() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const markersRef = useRef<Map<string, any>>(new Map());
  const overlayLayersRef = useRef<Map<string, any>>(new Map());
  const tileLayerRef = useRef<any>(null);

  // State
  const [isMapReady, setIsMapReady] = useState(false);
  const [zoom, setZoom] = useState(5);
  const [center, setCenter] = useState<LatLng>({ lat: 22.5937, lng: 78.9629 }); // Center of India
  const [markers, setMarkers] = useState<MapMarker[]>(PREDEFINED_LOCATIONS);
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
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [showLocationFilter, setShowLocationFilter] = useState(false);
  const [userLocation, setUserLocation] = useState<LatLng | null>(null);
  const [mapError, setMapError] = useState<string | null>(null);

  // Initialize Leaflet map
  useEffect(() => {
    let L: any;
    let map: any;

    const initMap = async () => {
      try {
        // Dynamic import Leaflet
        L = (await import('leaflet')).default;

        // Fix default marker icons
        delete (L.Icon.Default.prototype as any)._getIconUrl;
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
          iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
        });

        if (!mapContainerRef.current || mapRef.current) return;

        // Create map
        map = L.map(mapContainerRef.current, {
          center: [center.lat, center.lng],
          zoom: zoom,
          zoomControl: false,
          attributionControl: true,
        });

        // Add OpenStreetMap tiles
        tileLayerRef.current = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
          maxZoom: 19,
        }).addTo(map);

        mapRef.current = map;

        // Add event listeners
        map.on('zoomend', () => {
          setZoom(map.getZoom());
        });

        map.on('moveend', () => {
          const mapCenter = map.getCenter();
          setCenter({ lat: mapCenter.lat, lng: mapCenter.lng });
        });

        map.on('click', async (e: any) => {
          const { lat, lng } = e.latlng;
          await fetchWeatherForLocation(lat, lng, `${lat.toFixed(4)}, ${lng.toFixed(4)}`);
        });

        // Add initial markers
        PREDEFINED_LOCATIONS.forEach((marker) => {
          addMarkerToMap(marker, L);
        });

        setIsMapReady(true);
        setMapError(null);

        // Get user location
        handleCurrentLocation();
      } catch (error) {
        console.error('Error initializing map:', error);
        setMapError('Map initialization failed. Please try refreshing the page.');
      }
    };

    initMap();

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
      markersRef.current.clear();
      overlayLayersRef.current.clear();
    };
  }, []);

  // Add marker to map
  const addMarkerToMap = useCallback((marker: MapMarker, L?: any) => {
    if (!mapRef.current) return;

    const leaflet = L || (window as any).L;
    if (!leaflet) return;

    // Remove existing marker if present
    if (markersRef.current.has(marker.id)) {
      mapRef.current.removeLayer(markersRef.current.get(marker.id));
    }

    // Create custom icon based on marker type
    let iconUrl = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png';
    let iconSize: [number, number] = [25, 41];
    let iconAnchor: [number, number] = [12, 41];
    let popupAnchor: [number, number] = [1, -34];

    if (marker.type === 'user') {
      iconUrl = 'data:image/svg+xml;base64,' + btoa(`
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="#22c55e" stroke="#16a34a" stroke-width="2">
          <circle cx="12" cy="12" r="10"/>
          <circle cx="12" cy="12" r="4" fill="white"/>
        </svg>
      `);
      iconSize = [32, 32];
      iconAnchor = [16, 16];
      popupAnchor = [0, -16];
    }

    const icon = leaflet.icon({
      iconUrl,
      iconSize,
      iconAnchor,
      popupAnchor,
      shadowUrl: marker.type === 'user' ? undefined : 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
      shadowSize: marker.type === 'user' ? undefined : [41, 41],
    });

    const leafletMarker = leaflet.marker([marker.lat, marker.lng], { icon })
      .addTo(mapRef.current)
      .bindPopup(`
        <div style="text-align: center; min-width: 120px;">
          <strong style="font-size: 14px;">${marker.label}</strong>
          <br/>
          <small style="color: #666;">Click for weather details</small>
        </div>
      `);

    leafletMarker.on('click', async () => {
      setSelectedMarker(marker);
      await fetchWeatherForLocation(marker.lat, marker.lng, marker.label);
    });

    markersRef.current.set(marker.id, leafletMarker);
  }, []);

  // Fetch weather for location
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

  // Handle current location
  const handleCurrentLocation = useCallback(() => {
    if (!navigator.geolocation) {
      console.error('Geolocation not supported');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const newLocation = { lat: latitude, lng: longitude };
        setUserLocation(newLocation);

        // Add user location marker
        const userMarker: MapMarker = {
          id: 'user-location',
          lat: latitude,
          lng: longitude,
          label: 'Your Location',
          type: 'user',
        };

        // Dynamically import Leaflet for marker creation
        const L = (await import('leaflet')).default;
        addMarkerToMap(userMarker, L);

        // Center map on user location
        if (mapRef.current) {
          mapRef.current.setView([latitude, longitude], 10);
        }

        // Fetch weather for user location
        await fetchWeatherForLocation(latitude, longitude, 'Your Location');
      },
      (error) => {
        console.error('Geolocation error:', error);
        // Default to Supaul, Bihar
        const defaultLocation = PREDEFINED_LOCATIONS[0];
        if (mapRef.current) {
          mapRef.current.setView([defaultLocation.lat, defaultLocation.lng], 8);
        }
        fetchWeatherForLocation(defaultLocation.lat, defaultLocation.lng, defaultLocation.label);
      }
    );
  }, [addMarkerToMap, fetchWeatherForLocation]);

  // Handle zoom
  const handleZoomIn = useCallback(() => {
    if (mapRef.current) {
      mapRef.current.zoomIn();
    }
  }, []);

  const handleZoomOut = useCallback(() => {
    if (mapRef.current) {
      mapRef.current.zoomOut();
    }
  }, []);

  // Handle layer toggle
  const handleLayerToggle = useCallback(async (layer: keyof LayerState) => {
    setLayers((prev) => {
      const newLayers = { ...prev, [layer]: !prev[layer] };
      updateOverlayLayers(newLayers);
      return newLayers;
    });
  }, []);

  // Update overlay layers
  const updateOverlayLayers = useCallback(async (currentLayers: LayerState) => {
    if (!mapRef.current) return;

    const L = (await import('leaflet')).default;
    const bounds = mapRef.current.getBounds();
    const mapBounds = {
      north: bounds.getNorth(),
      south: bounds.getSouth(),
      east: bounds.getEast(),
      west: bounds.getWest(),
    };

    // Remove all existing overlay layers
    overlayLayersRef.current.forEach((layer) => {
      mapRef.current.removeLayer(layer);
    });
    overlayLayersRef.current.clear();

    // Add active layers
    Object.entries(currentLayers).forEach(([layerType, isActive]) => {
      if (!isActive) return;

      const data = getWeatherOverlayData(mapBounds, layerType as any) as WeatherPoint[];
      const layerGroup = L.layerGroup();

      data.forEach((point: WeatherPoint) => {
        let color = 'rgba(0, 0, 0, 0.3)';
        let radius = 30000; // meters

        switch (layerType) {
          case 'temperature':
            color = point.value > 30 ? 'rgba(239, 68, 68, 0.5)' : point.value > 25 ? 'rgba(249, 115, 22, 0.5)' : 'rgba(96, 165, 250, 0.5)';
            radius = 50000;
            break;
          case 'rain':
            color = point.intensity === 'heavy' ? 'rgba(29, 78, 216, 0.6)' : 'rgba(96, 165, 250, 0.4)';
            radius = 40000;
            break;
          case 'thunderstorm':
            color = 'rgba(168, 85, 247, 0.7)';
            radius = 35000;
            break;
          case 'clouds':
            color = point.intensity === 'dense' ? 'rgba(156, 163, 175, 0.6)' : 'rgba(156, 163, 175, 0.3)';
            radius = 60000;
            break;
          case 'flood':
            color = point.intensity === 'high' ? 'rgba(239, 68, 68, 0.7)' : 'rgba(251, 146, 60, 0.5)';
            radius = 45000;
            break;
        }

        const circle = L.circle([point.lat, point.lng], {
          color: 'transparent',
          fillColor: color.replace(/[\d.]+\)$/, '0.1)'),
          fillOpacity: 0.6,
          radius,
          weight: 0,
        }).bindPopup(`
          <div style="text-align: center;">
            <strong>${layerType.charAt(0).toUpperCase() + layerType.slice(1)}</strong><br/>
            ${layerType === 'temperature' ? `${point.value.toFixed(1)}°C` : `Intensity: ${point.intensity || 'N/A'}`}
          </div>
        `);

        layerGroup.addLayer(circle);
      });

      layerGroup.addTo(mapRef.current);
      overlayLayersRef.current.set(layerType, layerGroup);
    });
  }, []);

  // Update overlays when map moves
  useEffect(() => {
    if (!isMapReady || !mapRef.current) return;

    const handleMoveEnd = () => {
      const activeLayers = Object.entries(layers).filter(([, active]) => active);
      if (activeLayers.length > 0) {
        updateOverlayLayers(layers);
      }
    };

    mapRef.current.on('moveend', handleMoveEnd);
    mapRef.current.on('zoomend', handleMoveEnd);

    return () => {
      if (mapRef.current) {
        mapRef.current.off('moveend', handleMoveEnd);
        mapRef.current.off('zoomend', handleMoveEnd);
      }
    };
  }, [isMapReady, layers, updateOverlayLayers]);

  // Handle search
  const handleSearch = useCallback(async () => {
    if (!searchQuery.trim()) return;

    try {
      // Use Nominatim for geocoding (free OpenStreetMap service)
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&limit=1`
      );
      const data = await response.json();

      if (data && data.length > 0) {
        const { lat, lon, display_name } = data[0];
        const latitude = parseFloat(lat);
        const longitude = parseFloat(lon);

        // Add searched location marker
        const searchedMarker: MapMarker = {
          id: `search-${Date.now()}`,
          lat: latitude,
          lng: longitude,
          label: display_name.split(',')[0],
          type: 'searched',
        };

        const L = (await import('leaflet')).default;
        addMarkerToMap(searchedMarker, L);

        // Center map on searched location
        if (mapRef.current) {
          mapRef.current.setView([latitude, longitude], 12);
        }

        // Fetch weather for searched location
        await fetchWeatherForLocation(latitude, longitude, searchedMarker.label);

        setSearchQuery('');
        setShowSearch(false);
      }
    } catch (error) {
      console.error('Search error:', error);
    }
  }, [searchQuery, addMarkerToMap, fetchWeatherForLocation]);

  // Handle location filter selection
  const handleLocationSelect = useCallback(async (marker: MapMarker) => {
    if (mapRef.current) {
      mapRef.current.setView([marker.lat, marker.lng], 10);
    }
    setSelectedMarker(marker);
    await fetchWeatherForLocation(marker.lat, marker.lng, marker.label);
    setShowLocationFilter(false);
  }, [fetchWeatherForLocation]);

  // Filtered locations based on search
  const filteredLocations = useMemo(() => {
    if (!searchQuery.trim()) return PREDEFINED_LOCATIONS;
    return PREDEFINED_LOCATIONS.filter((loc) =>
      loc.label.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  return (
    <div className="relative w-full h-full min-h-[400px]">
      {/* Map Container */}
      <Card className="border-2 border-foreground/10 overflow-hidden h-full relative">
        {/* Leaflet CSS */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.css"
          crossOrigin="anonymous"
        />

        {/* Map */}
        <div
          ref={mapContainerRef}
          className="w-full h-full min-h-[400px] z-0"
          style={{ background: '#e5e7eb' }}
        />

        {/* Error State */}
        {mapError && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/90 z-50">
            <div className="text-center p-6">
              <p className="text-destructive font-medium mb-2">{mapError}</p>
              <Button onClick={() => window.location.reload()}>Refresh Page</Button>
            </div>
          </div>
        )}

        {/* Loading State */}
        {!isMapReady && !mapError && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-50">
            <div className="text-center">
              <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-2"></div>
              <p className="text-sm text-muted-foreground">Loading map...</p>
            </div>
          </div>
        )}

        {/* Search Bar */}
        <div className="absolute top-4 left-4 right-20 z-20">
          <div className="flex gap-2">
            {showSearch ? (
              <div className="flex gap-2 flex-1 max-w-md">
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search location..."
                  className="bg-background/95 backdrop-blur border-2"
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
                <Button size="icon" onClick={handleSearch} className="shrink-0">
                  <Search className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="outline" onClick={() => setShowSearch(false)} className="shrink-0 bg-background/95">
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setShowSearch(true)}
                  className="bg-background/95 backdrop-blur border-2"
                >
                  <Search className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Search</span>
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleCurrentLocation}
                  className="bg-background/95 backdrop-blur border-2"
                >
                  <Locate className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">My Location</span>
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Zoom Controls */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 z-20">
          <Button
            size="icon"
            variant="outline"
            onClick={handleZoomIn}
            className="h-10 w-10 bg-background/95 backdrop-blur border-2"
            disabled={zoom >= 18}
            aria-label="Zoom in"
          >
            <Plus className="h-5 w-5" />
          </Button>
          <div className="text-center text-xs font-medium px-2 py-1 bg-background/95 backdrop-blur rounded border-2 border-border">
            {zoom}
          </div>
          <Button
            size="icon"
            variant="outline"
            onClick={handleZoomOut}
            className="h-10 w-10 bg-background/95 backdrop-blur border-2"
            disabled={zoom <= 2}
            aria-label="Zoom out"
          >
            <Minus className="h-5 w-5" />
          </Button>
        </div>

        {/* Location Filter Button */}
        <Button
          size="sm"
          variant="outline"
          onClick={() => setShowLocationFilter(!showLocationFilter)}
          className="absolute top-16 right-4 z-20 bg-background/95 backdrop-blur border-2"
        >
          <Navigation className="h-4 w-4 mr-2" />
          <span className="hidden sm:inline">Locations</span>
        </Button>

        {/* Location Filter Panel */}
        {showLocationFilter && (
          <Card className="absolute top-28 right-4 z-30 w-64 max-h-80 overflow-y-auto bg-background/95 backdrop-blur border-2">
            <div className="p-3">
              <h3 className="font-semibold text-sm mb-3">Quick Locations</h3>
              <div className="space-y-1">
                {PREDEFINED_LOCATIONS.map((loc) => (
                  <button
                    key={loc.id}
                    onClick={() => handleLocationSelect(loc)}
                    className="w-full text-left px-3 py-2 rounded-md text-sm hover:bg-muted transition flex items-center gap-2"
                  >
                    <MapPin className="h-4 w-4 text-primary shrink-0" />
                    <span className="truncate">{loc.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </Card>
        )}

        {/* Weather Loading Indicator */}
        {loadingWeather && (
          <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-30">
            <div className="bg-background/95 backdrop-blur px-4 py-2 rounded-lg shadow-lg border-2 flex items-center gap-2">
              <div className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full"></div>
              <p className="text-sm text-foreground">Loading weather data...</p>
            </div>
          </div>
        )}

        {/* Map Legend */}
        <div className="absolute bottom-4 right-4 z-20">
          <Card className="bg-background/95 backdrop-blur border-2 p-2">
            <p className="text-xs text-muted-foreground mb-1 font-medium">Legend</p>
            <div className="space-y-1 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span>Your Location</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span>Predefined</span>
              </div>
            </div>
          </Card>
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
