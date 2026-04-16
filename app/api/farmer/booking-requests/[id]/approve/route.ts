import { NextResponse } from 'next/server';

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // In a real app, update database to mark booking request as approved
    console.log(`[api] Approving booking request: ${id}`);

    return NextResponse.json({
      success: true,
      message: 'Booking request approved successfully',
      data: {
        id,
        status: 'approved',
      },
    });
  } catch (error) {
    console.error('[api] Error approving booking request:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to approve booking request' },
      { status: 500 }
    );
  }
}
