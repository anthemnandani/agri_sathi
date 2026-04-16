import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Mock tool data (in real app, fetch from database)
    const mockTool = {
      id,
      name: 'Sample Tool',
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
    };

    return NextResponse.json({
      success: true,
      data: mockTool,
    });
  } catch (error) {
    console.error('[api] Error fetching tool:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch tool' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    // Validate update
    if (body.dailyRate && Number(body.dailyRate) <= 0) {
      return NextResponse.json(
        { success: false, message: 'Daily rate must be greater than 0' },
        { status: 400 }
      );
    }

    if (body.monthlyRate && Number(body.monthlyRate) <= 0) {
      return NextResponse.json(
        { success: false, message: 'Monthly rate must be greater than 0' },
        { status: 400 }
      );
    }

    // Mock update (in real app, update in database)
    const updatedTool = {
      id,
      ...body,
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      data: updatedTool,
      message: 'Tool updated successfully',
    });
  } catch (error) {
    console.error('[api] Error updating tool:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update tool' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Mock delete (in real app, delete from database)
    // Add verification that tool belongs to authenticated user

    return NextResponse.json({
      success: true,
      message: 'Tool deleted successfully',
      data: { id },
    });
  } catch (error) {
    console.error('[api] Error deleting tool:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete tool' },
      { status: 500 }
    );
  }
}
