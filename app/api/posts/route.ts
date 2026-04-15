import { NextResponse } from 'next/server';

const mockPosts = [
  {
    id: '1',
    author: {
      name: 'Rajesh Kumar',
      role: 'Farmer',
      avatar: '🌾',
    },
    content:
      'Just harvested my wheat crop! The yield was 15% higher than last year thanks to the new irrigation technique.',
    timestamp: '2 hours ago',
    likes: 24,
    comments: 5,
    liked: false,
  },
  {
    id: '2',
    author: {
      name: 'Dr. Priya Singh',
      role: 'Agricultural Expert',
      avatar: '👩‍🔬',
    },
    content:
      'Early detection of pests is crucial. Check your crops regularly for signs of infestation. Reply if you need guidance!',
    timestamp: '4 hours ago',
    likes: 42,
    comments: 12,
    liked: false,
  },
  {
    id: '3',
    author: {
      name: 'Farmer Cooperative',
      role: 'Community',
      avatar: '🤝',
    },
    content:
      'Tomorrow at 10 AM: Free webinar on soil health management. Register now at agrisathi.com/webinar',
    timestamp: '6 hours ago',
    likes: 18,
    comments: 3,
    liked: true,
  },
];

export async function GET() {
  return NextResponse.json({
    success: true,
    data: mockPosts,
  });
}
