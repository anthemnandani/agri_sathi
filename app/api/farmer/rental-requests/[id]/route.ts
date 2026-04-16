import { NextResponse } from 'next/server';

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const action = body.action; // 'accept' or 'decline'

    if (!action || !['accept', 'decline'].includes(action)) {
      return NextResponse.json(
        { success: false, message: 'Invalid action' },
        { status: 400 }
      );
    }

    // Mock request update (in real app, update in database)
    const updatedRequest = {
      id,
      status: action === 'accept' ? 'accepted' : 'declined',
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      data: updatedRequest,
      message: `Rental request ${action}ed successfully`,
    });
  } catch (error) {
    console.error('[api] Error processing rental request:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to process rental request' },
      { status: 500 }
    );
  }
}
