import { NextResponse } from 'next/server';

const mockCommunityDetails = {
  '1': {
    id: '1',
    name: 'Wheat Farmers Network',
    description: 'Connect with wheat farmers, share crop diseases, best practices, and market prices across northern India.',
    members: 2345,
    icon: '🌾',
    category: 'crop',
    language: 'Hindi',
    status: 'approved',
    private: false,
    createdBy: 'farmer-1',
    createdAt: new Date('2024-01-15'),
    moderationLevel: 'moderate',
    rules: 'Be respectful, no spam, share verified information only',
    coverImage: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=1200&h=300&fit=crop',
    adminCount: 3,
    moderatorCount: 5,
    recentActivity: 245,
  },
};

const mockMembers = [
  {
    id: '1',
    communityId: '1',
    userId: 'user-1',
    user: {
      id: 'user-1',
      name: 'राज कुमार',
      email: 'raj@agrisathi.com',
      phone: '9876543210',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=1',
      role: 'farmer',
    },
    role: 'admin',
    joinedAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    communityId: '1',
    userId: 'user-2',
    user: {
      id: 'user-2',
      name: 'प्रिया शर्मा',
      email: 'priya@agrisathi.com',
      phone: '9876543211',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=2',
      role: 'farmer',
    },
    role: 'member',
    joinedAt: new Date('2024-02-01'),
  },
  {
    id: '3',
    communityId: '1',
    userId: 'user-3',
    user: {
      id: 'user-3',
      name: 'मोहन पटेल',
      email: 'mohan@agrisathi.com',
      phone: '9876543212',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=3',
      role: 'farmer',
    },
    role: 'moderator',
    joinedAt: new Date('2024-02-10'),
  },
];

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const communityId = params.id;
  const community = mockCommunityDetails[communityId as keyof typeof mockCommunityDetails];

  if (!community) {
    return NextResponse.json(
      { success: false, error: 'Community not found' },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    data: community,
  });
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const communityId = params.id;

  return NextResponse.json({
    success: true,
    data: { id: communityId, ...body },
    message: 'Community updated successfully',
  });
}
