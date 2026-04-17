import { NextResponse } from 'next/server';
import { mockCommunityDetail, allFarmers } from '@/lib/mock-communities-enhanced';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    // Return enhanced community detail
    return NextResponse.json({
      success: true,
      data: {
        ...mockCommunityDetail,
        id: params.id,
        members: mockCommunityDetail.membersList.length,
        adminCount: mockCommunityDetail.membersList.filter((m) => m.role === 'admin').length,
        moderatorCount: mockCommunityDetail.membersList.filter((m) => m.role === 'moderator').length,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('[API] Error fetching community:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch community' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { name, description, rules, language } = body;

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    return NextResponse.json({
      success: true,
      data: {
        id: params.id,
        name: name || mockCommunityDetail.name,
        description: description || mockCommunityDetail.description,
        rules: rules || mockCommunityDetail.rules,
        language: language || mockCommunityDetail.language,
        updatedAt: new Date().toISOString(),
      },
      message: 'समूह अपडेट किया गया',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('[API] Error updating community:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update community' },
      { status: 500 }
    );
  }
}
