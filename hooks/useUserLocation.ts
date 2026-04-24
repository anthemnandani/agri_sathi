'use client';

import { useState, useEffect } from 'react';
import type { Farmer } from '@/lib/types';

interface UserLocationData {
  location: string;
  pincode: string;
  latitude?: number;
  longitude?: number;
}

/**
 * Hook to fetch user location from authenticated user data
 * In production, this would fetch from your auth provider/database
 */
export function useUserLocation() {
  const [userLocation, setUserLocation] = useState<UserLocationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserLocation = async () => {
      try {
        // In production, fetch from actual authentication provider
        // Example with Supabase, Auth.js, or your custom auth:
        // const { data: { session } } = await supabase.auth.getSession();
        // const userData = await fetchUserFromDatabase(session.user.id);

        // For now, using mock data that matches the Farmer type
        const mockUser: UserLocationData = {
          location: 'Bihar, Supaul',
          pincode: '800001',
          latitude: 26.2,
          longitude: 87.5,
        };

        setUserLocation(mockUser);
        setError(null);
      } catch (err) {
        console.error('Error fetching user location:', err);
        setError('Failed to fetch user location');
        // Fallback to default location
        setUserLocation({
          location: 'India',
          pincode: '000000',
          latitude: 20.5937,
          longitude: 78.9629,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUserLocation();
  }, []);

  return { userLocation, loading, error };
}

/**
 * Get initial map center based on user location
 */
export function getUserMapCenter(userLocation: UserLocationData | null) {
  if (!userLocation) {
    return { lat: 20.5937, lng: 78.9629 }; // Default: Center of India
  }

  return {
    lat: userLocation.latitude || 20.5937,
    lng: userLocation.longitude || 78.9629,
  };
}
