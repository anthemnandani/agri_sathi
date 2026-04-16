import { NextResponse } from 'next/server';

// Mock incoming rental requests for farmer's tools
const mockRentalRequests = [
  {
    id: 'req-1',
    toolId: 'tool-1',
    toolName: 'Mini Rotavator',
    requesterName: 'Farmer Amit',
    requesterLocation: 'Bihar',
    requesterContact: '+91-9876543200',
    requestedDates: {
      from: '2024-02-20',
      to: '2024-02-25',
    },
    status: 'pending',
    createdAt: '2024-02-15',
  },
  {
    id: 'req-2',
    toolId: 'tool-2',
    toolName: 'Drip Irrigation Kit',
    requesterName: 'Farm Co-op',
    requesterLocation: 'Haryana',
    requesterContact: '+91-9876543201',
    requestedDates: {
      from: '2024-03-01',
      to: '2024-03-10',
    },
    status: 'pending',
    createdAt: '2024-02-16',
  },
];

export async function GET() {
  try {
    // In a real app, fetch from database filtered by authenticated user
    return NextResponse.json({
      success: true,
      data: mockRentalRequests,
    });
  } catch (error) {
    console.error('[api] Error fetching rental requests:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch rental requests' },
      { status: 500 }
    );
  }
}
