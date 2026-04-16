import { NextResponse } from 'next/server';

// Mock data for booking requests
const mockBookingRequests = [
  {
    id: 'booking-1',
    renterName: 'Rajesh Kumar',
    renterPhone: '+91-9876543210',
    renterLocation: 'Hathras, Uttar Pradesh',
    toolName: 'Mini Rotavator',
    toolCategory: 'cultivator',
    rentalDuration: {
      from: '2024-04-20',
      to: '2024-04-25',
    },
    dailyRate: 200,
    totalCost: 1000,
    status: 'pending' as const,
    requestedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'booking-2',
    renterName: 'Priya Singh',
    renterPhone: '+91-8765432109',
    renterLocation: 'Agra, Uttar Pradesh',
    toolName: 'Drip Irrigation Kit',
    toolCategory: 'irrigation',
    rentalDuration: {
      from: '2024-04-22',
      to: '2024-05-05',
    },
    dailyRate: 150,
    totalCost: 2850,
    status: 'approved' as const,
    requestedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'booking-3',
    renterName: 'Amit Patel',
    renterPhone: '+91-7654321098',
    renterLocation: 'Mathura, Uttar Pradesh',
    toolName: 'Mini Rotavator',
    toolCategory: 'cultivator',
    rentalDuration: {
      from: '2024-05-10',
      to: '2024-05-15',
    },
    dailyRate: 200,
    totalCost: 1000,
    status: 'pending' as const,
    requestedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
  },
];

export async function GET() {
  try {
    // In a real app, fetch from database filtered by authenticated user's tools
    return NextResponse.json({
      success: true,
      data: mockBookingRequests,
    });
  } catch (error) {
    console.error('[api] Error fetching booking requests:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch booking requests' },
      { status: 500 }
    );
  }
}
