import { NextRequest, NextResponse } from 'next/server';

// Types for locations
export interface WeatherLocation {
  id: string;
  name: string;
  lat: number;
  lng: number;
  state: string;
  country: string;
  type: 'city' | 'town' | 'village' | 'district';
  pincode?: string;
  isDefault?: boolean;
}

// Dummy locations data - Replace with actual DB calls later
const DUMMY_LOCATIONS: WeatherLocation[] = [
  {
    id: 'loc-001',
    name: 'Supaul',
    lat: 26.1197,
    lng: 86.9967,
    state: 'Bihar',
    country: 'India',
    type: 'district',
    pincode: '847215',
    isDefault: true,
  },
  {
    id: 'loc-002',
    name: 'Delhi',
    lat: 28.7041,
    lng: 77.1025,
    state: 'Delhi',
    country: 'India',
    type: 'city',
    pincode: '110001',
  },
  {
    id: 'loc-003',
    name: 'Mumbai',
    lat: 19.076,
    lng: 72.8776,
    state: 'Maharashtra',
    country: 'India',
    type: 'city',
    pincode: '400001',
  },
  {
    id: 'loc-004',
    name: 'Bangalore',
    lat: 12.9716,
    lng: 77.5946,
    state: 'Karnataka',
    country: 'India',
    type: 'city',
    pincode: '560001',
  },
  {
    id: 'loc-005',
    name: 'Patna',
    lat: 25.5941,
    lng: 85.1376,
    state: 'Bihar',
    country: 'India',
    type: 'city',
    pincode: '800001',
  },
  {
    id: 'loc-006',
    name: 'Kolkata',
    lat: 22.5726,
    lng: 88.3639,
    state: 'West Bengal',
    country: 'India',
    type: 'city',
    pincode: '700001',
  },
  {
    id: 'loc-007',
    name: 'Chennai',
    lat: 13.0827,
    lng: 80.2707,
    state: 'Tamil Nadu',
    country: 'India',
    type: 'city',
    pincode: '600001',
  },
  {
    id: 'loc-008',
    name: 'Hyderabad',
    lat: 17.385,
    lng: 78.4867,
    state: 'Telangana',
    country: 'India',
    type: 'city',
    pincode: '500001',
  },
  {
    id: 'loc-009',
    name: 'Triveniganj',
    lat: 26.0866,
    lng: 86.7444,
    state: 'Bihar',
    country: 'India',
    type: 'town',
    pincode: '847215',
  },
  {
    id: 'loc-010',
    name: 'Bhikhna Thori',
    lat: 26.0500,
    lng: 86.6833,
    state: 'Bihar',
    country: 'India',
    type: 'village',
    pincode: '847223',
  },
  {
    id: 'loc-011',
    name: 'Saharsa',
    lat: 25.8871,
    lng: 86.5867,
    state: 'Bihar',
    country: 'India',
    type: 'district',
    pincode: '852201',
  },
  {
    id: 'loc-012',
    name: 'Madhepura',
    lat: 25.9211,
    lng: 86.7791,
    state: 'Bihar',
    country: 'India',
    type: 'district',
    pincode: '852113',
  },
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q')?.toLowerCase();
    const state = searchParams.get('state')?.toLowerCase();
    const type = searchParams.get('type');
    const limit = parseInt(searchParams.get('limit') || '20');

    let locations = [...DUMMY_LOCATIONS];

    // Filter by search query
    if (query) {
      locations = locations.filter(
        loc =>
          loc.name.toLowerCase().includes(query) ||
          loc.state.toLowerCase().includes(query) ||
          loc.pincode?.includes(query)
      );
    }

    // Filter by state
    if (state) {
      locations = locations.filter(loc => loc.state.toLowerCase() === state);
    }

    // Filter by type
    if (type) {
      locations = locations.filter(loc => loc.type === type);
    }

    // Apply limit
    locations = locations.slice(0, limit);

    return NextResponse.json({
      success: true,
      data: locations,
      total: locations.length,
    });
  } catch (error) {
    console.error('Locations API error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch locations' },
      { status: 500 }
    );
  }
}
