import { NextResponse } from 'next/server';
import { mockMessages, mockCommunityDetail } from '@/lib/mock-communities-enhanced';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '100', 10);
    const offset = parseInt(searchParams.get('offset') || '0', 10);

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 200));

    // Return paginated messages
    const paginatedMessages = mockMessages.slice(offset, offset + limit);

    return NextResponse.json({
      success: true,
      data: paginatedMessages,
      total: mockMessages.length,
      communityId: params.id,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('[API] Error fetching messages:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch messages' },
      { status: 500 }
    );
  }
}

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { content, type, files } = body;

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    // Create new message
    const newMessage = {
      id: `msg_${Date.now()}`,
      senderId: 'current-user',
      sender: {
        id: 'current-user',
        name: 'आप',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=current',
        role: 'member',
      },
      content: content || 'बिना पाठ वाली फाइल',
      type: type || 'text',
      image: files?.[0]?.url,
      replies: 0,
      isPinned: false,
      approved: true,
      createdAt: new Date(),
    };

    return NextResponse.json({
      success: true,
      data: newMessage,
      message: 'संदेश भेजा गया',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('[API] Error posting message:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to send message' },
      { status: 500 }
    );
  }
}
