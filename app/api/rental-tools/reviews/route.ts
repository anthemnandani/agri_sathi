export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const toolId = searchParams.get('toolId');

  const mockReviews: Record<string, any[]> = {
    '1': [
      {
        id: 'r1',
        user: 'Farmer Harjit',
        userId: 'user2',
        rating: 5,
        date: '2 weeks ago',
        comment: 'Excellent tractor! Works like new. Owner was very helpful.',
        verified: true,
      },
      {
        id: 'r2',
        user: 'Singh Cultivation',
        userId: 'user3',
        rating: 4,
        date: '1 month ago',
        comment: 'Good condition and timely delivery. Highly recommended.',
        verified: true,
      },
      {
        id: 'r3',
        user: 'Village Farmer Co-op',
        userId: 'user4',
        rating: 5,
        date: '2 months ago',
        comment: 'Perfect for our farm size. Delivered on time.',
        verified: true,
      },
    ],
    '2': [
      {
        id: 'r1',
        user: 'Punjab Farms',
        userId: 'user5',
        rating: 5,
        date: '3 weeks ago',
        comment: 'Best harvester in the area. Highly efficient.',
        verified: true,
      },
      {
        id: 'r2',
        user: 'Harvest Masters',
        userId: 'user6',
        rating: 4,
        date: '1.5 months ago',
        comment: 'Good machine, very professional owner.',
        verified: true,
      },
    ],
  };

  const reviews = toolId ? mockReviews[toolId] || [] : [];

  return Response.json({
    success: true,
    data: reviews,
  });
}

export async function POST(request: Request) {
  const body = await request.json();

  // Mock review creation
  const newReview = {
    id: `r${Date.now()}`,
    user: body.user,
    rating: body.rating,
    date: 'just now',
    comment: body.comment,
    verified: false,
  };

  return Response.json({
    success: true,
    data: newReview,
    message: 'Review submitted successfully',
  });
}
