import { NextResponse } from 'next/server';

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
    isBanned: false,
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
    isBanned: false,
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
    isBanned: false,
  },
  {
    id: '4',
    communityId: '1',
    userId: 'user-4',
    user: {
      id: 'user-4',
      name: 'सुमit्रा वर्मा',
      email: 'sumitra@agrisathi.com',
      phone: '9876543213',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=4',
      role: 'farmer',
    },
    role: 'member',
    joinedAt: new Date('2024-02-15'),
    isBanned: false,
  },
  {
    id: '5',
    communityId: '1',
    userId: 'user-5',
    user: {
      id: 'user-5',
      name: 'विनय सिंह',
      email: 'vinay@agrisathi.com',
      phone: '9876543214',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=5',
      role: 'farmer',
    },
    role: 'member',
    joinedAt: new Date('2024-03-01'),
    isBanned: false,
  },
];

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const communityId = params.id;
  const { searchParams } = new URL(request.url);
  const role = searchParams.get('role');
  const search = searchParams.get('search');

  let members = mockMembers.filter(m => m.communityId === communityId);

  if (role) {
    members = members.filter(m => m.role === role);
  }

  if (search) {
    members = members.filter(m =>
      m.user.name.toLowerCase().includes(search.toLowerCase()) ||
      m.user.email.toLowerCase().includes(search.toLowerCase())
    );
  }

  return NextResponse.json({
    success: true,
    data: members,
  });
}

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const communityId = params.id;

  const newMember = {
    id: Date.now().toString(),
    communityId,
    ...body,
    joinedAt: new Date(),
  };

  return NextResponse.json({
    success: true,
    data: newMember,
    message: 'Joined community successfully',
  });
}
