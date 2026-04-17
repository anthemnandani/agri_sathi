import { NextResponse } from 'next/server';

const mockMessages = [
  {
    id: '1',
    communityId: '1',
    senderId: 'user-1',
    sender: {
      id: 'user-1',
      name: 'राज कुमार',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=1',
      role: 'farmer',
    },
    content: 'नमस्ते सभी को! इस साल गेहूं की फसल कैसी रहेगी?',
    type: 'text',
    replies: 3,
    isPinned: false,
    requiresApproval: false,
    approved: true,
    createdAt: new Date(Date.now() - 3600000),
  },
  {
    id: '2',
    communityId: '1',
    senderId: 'user-2',
    sender: {
      id: 'user-2',
      name: 'प्रिया शर्मा',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=2',
      role: 'farmer',
    },
    content: 'मेरे खेत में पाउडरी मिल्ड्यू की समस्या आ रही है। कोई सुझाव देगा?',
    type: 'text',
    replies: 5,
    isPinned: true,
    requiresApproval: false,
    approved: true,
    createdAt: new Date(Date.now() - 1800000),
  },
  {
    id: '3',
    communityId: '1',
    senderId: 'user-3',
    sender: {
      id: 'user-3',
      name: 'मोहन पटेल',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=3',
      role: 'farmer',
    },
    content: 'डाक्टर साहब ने बताया है कि नीम के तेल का छिड़काव करो 2% की सांद्रता में।',
    type: 'text',
    replies: 0,
    isPinned: false,
    requiresApproval: false,
    approved: true,
    createdAt: new Date(Date.now() - 1200000),
    replyTo: '2',
  },
  {
    id: '4',
    communityId: '1',
    senderId: 'user-4',
    sender: {
      id: 'user-4',
      name: 'सुमित्रा वर्मा',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=4',
      role: 'farmer',
    },
    content: 'रोग का चित्र देखिए - यह गंभीर लग रहा है',
    type: 'image',
    image: 'https://images.unsplash.com/photo-1615487867141-f77ac8e1986d?w=500&h=400&fit=crop',
    replies: 2,
    isPinned: false,
    requiresApproval: true,
    approved: false,
    createdAt: new Date(Date.now() - 600000),
    replyTo: '2',
  },
  {
    id: '5',
    communityId: '1',
    senderId: 'user-1',
    sender: {
      id: 'user-1',
      name: 'राज कुमार',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=1',
      role: 'farmer',
    },
    content: 'यह तो सांस्कृतिक संक्रमण है। तुरंत कवकनाशी दवा का प्रयोग करें।',
    type: 'text',
    replies: 1,
    isPinned: false,
    requiresApproval: false,
    approved: true,
    createdAt: new Date(Date.now() - 300000),
    replyTo: '4',
  },
];

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const communityId = params.id;
  const { searchParams } = new URL(request.url);
  const skip = parseInt(searchParams.get('skip') || '0');
  const limit = parseInt(searchParams.get('limit') || '20');
  const pinned = searchParams.get('pinned') === 'true';

  let messages = mockMessages.filter(m => m.communityId === communityId);

  if (pinned) {
    messages = messages.filter(m => m.isPinned);
  } else {
    messages = messages.filter(m => !m.isPinned && m.approved);
  }

  const total = messages.length;
  const paginatedMessages = messages
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(skip, skip + limit);

  return NextResponse.json({
    success: true,
    data: paginatedMessages,
    pagination: {
      total,
      skip,
      limit,
      hasMore: skip + limit < total,
    },
  });
}

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const communityId = params.id;

  const newMessage = {
    id: Date.now().toString(),
    communityId,
    ...body,
    replies: 0,
    isPinned: false,
    requiresApproval: false,
    approved: true,
    createdAt: new Date(),
  };

  return NextResponse.json({
    success: true,
    data: newMessage,
    message: 'Message sent successfully',
  });
}
