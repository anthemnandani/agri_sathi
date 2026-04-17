import { NextResponse } from 'next/server';
import { allFarmers } from '@/lib/mock-communities-enhanced';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search')?.toLowerCase();
    const role = searchParams.get('role');

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    let members = allFarmers.map((farmer) => ({
      id: farmer.id,
      communityId: params.id,
      userId: farmer.id,
      user: {
        id: farmer.id,
        name: farmer.name,
        avatar: farmer.avatar,
        role: 'farmer',
        location: farmer.location,
      },
      role: farmer.role,
      joinedAt: farmer.joinedAt,
      isBanned: false,
    }));

    // Filter by search
    if (search) {
      members = members.filter((m) =>
        m.user.name.toLowerCase().includes(search)
      );
    }

    // Filter by role
    if (role) {
      members = members.filter((m) => m.role === role);
    }

    // Sort by role (admin first, then moderator, then members)
    const roleOrder = { admin: 0, moderator: 1, member: 2 };
    members.sort(
      (a, b) =>
        (roleOrder[a.role as keyof typeof roleOrder] || 2) -
        (roleOrder[b.role as keyof typeof roleOrder] || 2)
    );

    return NextResponse.json({
      success: true,
      data: members,
      total: members.length,
      communityId: params.id,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('[API] Error fetching members:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch members' },
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
    const { userId, action } = body; // action: 'promote', 'demote', 'ban', 'unban'

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 400));

    return NextResponse.json({
      success: true,
      data: {
        userId,
        communityId: params.id,
        action,
        updatedAt: new Date().toISOString(),
      },
      message: `सदस्य ${action} किया गया`,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('[API] Error updating member:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update member' },
      { status: 500 }
    );
  }
}
