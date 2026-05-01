'use client';

import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, CloudRain, Wind, Droplets, Eye } from 'lucide-react';

interface FarmerWeatherMapProps {
  userLocation?: {
    latitude: number;
    longitude: number;
    name: string;
  };
  onLocationSelect?: (location: { lat: number; lng: number; name: string }) => void;
}

export function FarmerWeatherMap({ 
  userLocation = { latitude: 26.2, longitude: 87.5, name: 'Your Farm Area' },
  onLocationSelect 
}: FarmerWeatherMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string>(userLocation.name);
  const [weatherInfo, setWeatherInfo] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!mapContainer.current) return;

    // Initialize map
    if (!map.current) {
      map.current = L.map(mapContainer.current).setView(
        [userLocation.latitude, userLocation.longitude],
        12
      );

      // Add tile layer (using OpenStreetMap)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19,
        minZoom: 3,
      }).addTo(map.current);

      // Add weather layer
      L.tileLayer('https://tile.openweathermap.org/map/clouds/{z}/{x}/{y}.png?appid=47a00147d1ee7c51ff7c08f4e70a189b', {
        opacity: 0.5,
        maxZoom: 18,
      }).addTo(map.current);

      // Custom icon for user's location
      const customIcon = L.divIcon({
        html: `
          <div class="flex items-center justify-center">
            <div class="relative">
              <div class="absolute inset-0 animate-pulse bg-green-400 rounded-full opacity-50"></div>
              <div class="relative w-8 h-8 bg-green-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
        popupAnchor: [0, -16],
        className: 'custom-marker',
      });

      // Add marker for user location
      if (markerRef.current) {
        markerRef.current.remove();
      }
      markerRef.current = L.marker(
        [userLocation.latitude, userLocation.longitude],
        { icon: customIcon }
      )
        .addTo(map.current)
        .bindPopup(`
          <div class="p-3 rounded-lg">
            <p class="font-semibold text-sm text-foreground">${userLocation.name}</p>
            <p class="text-xs text-muted-foreground mt-1">Your Current Location</p>
          </div>
        `)
        .openPopup();

      // Handle map clicks for location selection
      map.current.on('click', (e) => {
        const { lat, lng } = e.latlng;
        
        // Update marker position
        if (markerRef.current) {
          markerRef.current.setLatLng([lat, lng]);
        }

        const newLocationName = `Location (${lat.toFixed(2)}, ${lng.toFixed(2)})`;
        setSelectedLocation(newLocationName);
        onLocationSelect?.({ lat, lng, name: newLocationName });
        
        // Fetch weather for this location
        fetchWeatherData(lat, lng);
      });
    }

    return () => {
      // Cleanup on unmount
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [userLocation, onLocationSelect]);

  const fetchWeatherData = async (lat: number, lng: number) => {
    setIsLoading(true);
    try {
      // This is mock weather data - replace with actual API call
      const mockWeather = {
        temp: 28 + Math.random() * 5,
        humidity: 65 + Math.random() * 20,
        windSpeed: 10 + Math.random() * 5,
        visibility: 8 + Math.random() * 2,
        rainfall: Math.random() * 50,
        condition: ['Partly Cloudy', 'Clear', 'Rainy', 'Sunny'][Math.floor(Math.random() * 4)],
      };
      setWeatherInfo(mockWeather);
    } catch (error) {
      console.error('Error fetching weather:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Weather Map</CardTitle>
          <CardDescription>Click on any location to check weather. Green marker shows your farm area.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Map Container */}
          <div
            ref={mapContainer}
            className="w-full h-[400px] sm:h-[500px] lg:h-[600px] rounded-lg border border-border overflow-hidden shadow-lg"
          />

          {/* Current Location Display */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-3 rounded-lg bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800">
              <p className="text-xs font-semibold text-green-900 dark:text-green-200">Selected Location</p>
              <p className="text-sm font-bold text-green-700 dark:text-green-400 mt-1">{selectedLocation}</p>
            </div>

            {/* Help Text for Farmers */}
            <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800">
              <p className="text-xs font-semibold text-blue-900 dark:text-blue-200">Farmer Tip</p>
              <p className="text-xs text-blue-700 dark:text-blue-400 mt-1">
                Tap/click on the map to select your field location
              </p>
            </div>
          </div>

          {/* Weather Information */}
          {isLoading && (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent"></div>
            </div>
          )}

          {weatherInfo && !isLoading && (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 mt-4">
              {/* Temperature */}
              <div className="p-3 rounded-lg bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-800">
                <p className="text-xs text-orange-600 dark:text-orange-400 font-semibold">Temperature</p>
                <p className="text-lg font-bold text-orange-700 dark:text-orange-300 mt-1">
                  {weatherInfo.temp.toFixed(1)}°C
                </p>
              </div>

              {/* Humidity */}
              <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800">
                <div className="flex items-center gap-1">
                  <Droplets className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </div>
                <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold mt-1">Humidity</p>
                <p className="text-lg font-bold text-blue-700 dark:text-blue-300">
                  {weatherInfo.humidity.toFixed(0)}%
                </p>
              </div>

              {/* Wind Speed */}
              <div className="p-3 rounded-lg bg-cyan-50 dark:bg-cyan-950/30 border border-cyan-200 dark:border-cyan-800">
                <Wind className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                <p className="text-xs text-cyan-600 dark:text-cyan-400 font-semibold mt-1">Wind</p>
                <p className="text-lg font-bold text-cyan-700 dark:text-cyan-300">
                  {weatherInfo.windSpeed.toFixed(1)} km/h
                </p>
              </div>

              {/* Rainfall */}
              <div className="p-3 rounded-lg bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800">
                <CloudRain className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                <p className="text-xs text-purple-600 dark:text-purple-400 font-semibold mt-1">Rainfall</p>
                <p className="text-lg font-bold text-purple-700 dark:text-purple-300">
                  {weatherInfo.rainfall.toFixed(1)} mm
                </p>
              </div>

              {/* Visibility */}
              <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-950/30 border border-gray-200 dark:border-gray-800">
                <Eye className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                <p className="text-xs text-gray-600 dark:text-gray-400 font-semibold mt-1">Visibility</p>
                <p className="text-lg font-bold text-gray-700 dark:text-gray-300">
                  {weatherInfo.visibility.toFixed(1)} km
                </p>
              </div>
            </div>
          )}

          {/* Farmer Alert */}
          <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 flex gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-amber-900 dark:text-amber-200">Farmer Advisory</p>
              <p className="text-xs text-amber-700 dark:text-amber-300 mt-1">
                Always check local conditions before farming activities. Use this map to plan irrigation and crop care.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
