import { NextResponse } from 'next/server';

const mockCommunities = [
  {
    id: '1',
    name: 'Wheat Farmers Network',
    description:
      'Connect with wheat farmers, share crop diseases, best practices, and market prices across northern India.',
    members: 2345,
    icon: '🌾',
    category: 'crop',
    language: 'Hindi',
    status: 'approved',
    joined: false,
    private: false,
    createdBy: 'farmer-1',
    createdAt: new Date('2024-01-15'),
    moderationLevel: 'moderate',
    rules: 'Be respectful, no spam, share verified information only',
  },
  {
    id: '2',
    name: 'Organic Farming Community',
    description:
      'Dedicated to organic and sustainable farming practices. Share techniques and products.',
    members: 1856,
    icon: '🌱',
    category: 'crop',
    language: 'English',
    status: 'approved',
    joined: true,
    private: false,
    createdBy: 'farmer-2',
    createdAt: new Date('2024-02-10'),
    moderationLevel: 'strict',
    rules: 'Only organic farming discussions, no chemical pesticides',
  },
  {
    id: '3',
    name: 'Youth Farmers Initiative',
    description:
      'For young farmers starting their agricultural journey. Mentorship and modern techniques.',
    members: 945,
    icon: '👨‍🌾',
    category: 'problem',
    language: 'Hindi',
    status: 'approved',
    joined: false,
    private: false,
    createdBy: 'farmer-3',
    createdAt: new Date('2024-01-20'),
    moderationLevel: 'moderate',
    rules: 'Support new farmers with guidance',
  },
  {
    id: '4',
    name: 'Equipment & Tools Sharing',
    description:
      'Discussion about farm equipment, rentals, and technology adoption for modern farming.',
    members: 1234,
    icon: '⚙️',
    category: 'other',
    language: 'English',
    status: 'approved',
    joined: true,
    private: false,
    createdBy: 'farmer-4',
    createdAt: new Date('2024-03-05'),
    moderationLevel: 'relaxed',
    rules: 'Share equipment info, pricing, and availability',
  },
  {
    id: '5',
    name: 'Dairy Farmers Co-operative',
    description:
      'Cattle management, dairy production, and milk market discussions for dairy farmers.',
    members: 1567,
    icon: '🐄',
    category: 'crop',
    language: 'Hindi',
    status: 'approved',
    joined: false,
    private: false,
    createdBy: 'farmer-5',
    createdAt: new Date('2024-02-28'),
    moderationLevel: 'moderate',
    rules: 'Discuss cattle health, production, market rates',
  },
  {
    id: '6',
    name: 'Vegetable Growers Guild',
    description:
      'Growing vegetables, pest management, seasonal planning, and distribution channels.',
    members: 2100,
    icon: '🥬',
    category: 'crop',
    language: 'English',
    status: 'approved',
    joined: false,
    private: false,
    createdBy: 'farmer-6',
    createdAt: new Date('2024-01-30'),
    moderationLevel: 'moderate',
    rules: 'Share vegetable cultivation techniques and market info',
  },
  {
    id: '7',
    name: 'Rajasthan Farmers Network',
    description: 'Specific community for farmers in Rajasthan region. Discuss local crops, weather, and market.',
    members: 1423,
    icon: '📍',
    category: 'location',
    language: 'Hindi',
    status: 'approved',
    joined: false,
    private: false,
    createdBy: 'farmer-7',
    createdAt: new Date('2024-03-10'),
    moderationLevel: 'moderate',
    rules: 'Focus on Rajasthan farming practices',
  },
  {
    id: '8',
    name: 'Crop Disease Management',
    description: 'Expert guidance on identifying and treating crop diseases. Share images and solutions.',
    members: 3245,
    icon: '🔬',
    category: 'problem',
    language: 'English',
    status: 'approved',
    joined: false,
    private: false,
    createdBy: 'expert-1',
    createdAt: new Date('2024-01-05'),
    moderationLevel: 'strict',
    rules: 'Only verified disease information, expert moderation',
  },
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const language = searchParams.get('language');
  const location = searchParams.get('location');
  const search = searchParams.get('search');

  let filtered = [...mockCommunities];

  if (category) {
    filtered = filtered.filter(c => c.category === category);
  }

  if (language) {
    filtered = filtered.filter(c => c.language === language);
  }

  if (search) {
    filtered = filtered.filter(c =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase())
    );
  }

  return NextResponse.json({
    success: true,
    data: filtered,
  });
}

export async function POST(request: Request) {
  const body = await request.json();
  
  const newCommunity = {
    id: Date.now().toString(),
    ...body,
    status: 'pending',
    createdAt: new Date(),
    members: 1,
    joined: true,
  };

  return NextResponse.json({
    success: true,
    data: newCommunity,
    message: 'Community created successfully. Waiting for admin approval.',
  });
}
