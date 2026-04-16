import { NextResponse } from 'next/server';

// Mock data for farmer's rentals
const mockRentals = [
  {
    id: 'rental-1',
    toolName: 'John Deere Tractor',
    category: 'tractor',
    image: '🚜',
    owner: {
      name: 'Rajesh Kumar',
      location: 'Haryana',
      contact: '+91-9876543210',
    },
    rentalPeriod: {
      from: '2024-01-15',
      to: '2024-01-25',
    },
    dailyRate: 500,
    totalCost: 5000,
    status: 'completed',
  },
  {
    id: 'rental-2',
    toolName: 'Rotavator Machine',
    category: 'cultivator',
    image: '⚙️',
    owner: {
      name: 'Priya Singh',
      location: 'Punjab',
      contact: '+91-9876543211',
    },
    rentalPeriod: {
      from: '2024-02-01',
      to: '2024-02-10',
    },
    dailyRate: 250,
    totalCost: 2250,
    status: 'active',
  },
  {
    id: 'rental-3',
    toolName: 'Combine Harvester',
    category: 'harvester',
    image: '🌾',
    owner: {
      name: 'Harjit Singh',
      location: 'Punjab',
      contact: '+91-9876543212',
    },
    rentalPeriod: {
      from: '2024-03-01',
      to: '2024-03-15',
    },
    dailyRate: 800,
    totalCost: 11200,
    status: 'active',
  },
];

export async function GET() {
  try {
    // In a real app, you would fetch this from the database
    // filtering by the authenticated user's ID
    return NextResponse.json({
      success: true,
      data: mockRentals,
    });
  } catch (error) {
    console.error('[api] Error fetching rentals:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch rentals' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate request
    if (!body.toolId || !body.ownerId || !body.startDate || !body.endDate) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create new rental (mock)
    const newRental = {
      id: `rental-${Date.now()}`,
      ...body,
      createdAt: new Date().toISOString(),
    };

    // In a real app, save to database
    return NextResponse.json({
      success: true,
      data: newRental,
      message: 'Rental created successfully',
    });
  } catch (error) {
    console.error('[api] Error creating rental:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create rental' },
      { status: 500 }
    );
  }
}
