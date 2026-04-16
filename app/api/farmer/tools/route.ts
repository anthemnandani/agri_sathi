import { NextResponse } from 'next/server';

// Mock data for farmer's own tools for rent
const mockTools = [
  {
    id: 'tool-1',
    name: 'Mini Rotavator',
    category: 'cultivator',
    image: '⚙️',
    condition: 'Good',
    dailyRate: 200,
    monthlyRate: 4000,
    status: 'active',
    bookings: 8,
    rating: 4.7,
    reviews: 12,
    totalEarnings: 4200,
    availability: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    minRentalDays: 1,
    power: '15 HP',
    fuelType: 'Diesel',
    year: 2020,
  },
  {
    id: 'tool-2',
    name: 'Drip Irrigation Kit',
    category: 'irrigation',
    image: '💧',
    condition: 'Excellent',
    dailyRate: 150,
    monthlyRate: 3000,
    status: 'active',
    bookings: 5,
    rating: 4.9,
    reviews: 8,
    totalEarnings: 2100,
    availability: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    minRentalDays: 1,
    power: null,
    fuelType: null,
    year: 2022,
  },
];

export async function GET() {
  try {
    // In a real app, fetch from database filtered by authenticated user
    return NextResponse.json({
      success: true,
      data: mockTools,
    });
  } catch (error) {
    console.error('[api] Error fetching tools:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch tools' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.name || !body.category || !body.dailyRate || !body.monthlyRate || !body.availability) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate numeric fields
    if (Number(body.dailyRate) <= 0 || Number(body.monthlyRate) <= 0) {
      return NextResponse.json(
        { success: false, message: 'Rates must be greater than 0' },
        { status: 400 }
      );
    }

    // Create new tool (mock)
    const newTool = {
      id: `tool-${Date.now()}`,
      name: body.name,
      category: body.category,
      image: getEmojiForCategory(body.category),
      condition: body.condition || 'Good',
      dailyRate: Number(body.dailyRate),
      monthlyRate: Number(body.monthlyRate),
      status: 'active',
      bookings: 0,
      rating: 5.0,
      reviews: 0,
      totalEarnings: 0,
      availability: body.availability,
      minRentalDays: Number(body.minRentalDays) || 1,
      power: body.power || null,
      fuelType: body.fuelType || null,
      year: body.year ? Number(body.year) : null,
      notes: body.notes || null,
      createdAt: new Date().toISOString(),
    };

    // In a real app, save to database
    return NextResponse.json({
      success: true,
      data: newTool,
      message: 'Tool added successfully',
    });
  } catch (error) {
    console.error('[api] Error adding tool:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to add tool' },
      { status: 500 }
    );
  }
}

function getEmojiForCategory(category: string): string {
  const emojiMap: Record<string, string> = {
    tractor: '🚜',
    harvester: '🌾',
    cultivator: '⚙️',
    irrigation: '💧',
    sprayer: '🧪',
    thresher: '🔄',
  };
  return emojiMap[category] || '🛠️';
}
