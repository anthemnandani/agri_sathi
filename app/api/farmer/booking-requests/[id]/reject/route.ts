import { NextResponse } from 'next/server';

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // In a real app, update database to mark booking request as rejected
    console.log(`[api] Rejecting booking request: ${id}`);

    return NextResponse.json({
      success: true,
      message: 'Booking request rejected',
      data: {
        id,
        status: 'rejected',
      },
    });
  } catch (error) {
    console.error('[api] Error rejecting booking request:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to reject booking request' },
      { status: 500 }
    );
  }
}
