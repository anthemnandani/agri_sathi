export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');
  const status = searchParams.get('status');

  const mockBookings = [
    {
      id: 'b1',
      toolId: '1',
      toolName: 'John Deere Tractor',
      toolImage: '🚜',
      ownerId: 'owner1',
      ownerName: 'Rajesh Kumar',
      ownerContact: '+91 98765 43210',
      userId: 'user1',
      startDate: '2024-04-20',
      endDate: '2024-04-22',
      days: 2,
      pricePerDay: 500,
      totalPrice: 1000,
      status: 'confirmed',
      bookingDate: '2024-04-10',
      paymentStatus: 'completed',
    },
    {
      id: 'b2',
      toolId: '2',
      toolName: 'Combine Harvester',
      toolImage: '🌾',
      ownerId: 'owner2',
      ownerName: 'Priya Singh',
      ownerContact: '+91 97654 32109',
      userId: 'user1',
      startDate: '2024-05-05',
      endDate: '2024-05-07',
      days: 2,
      pricePerDay: 800,
      totalPrice: 1600,
      status: 'pending',
      bookingDate: '2024-04-15',
      paymentStatus: 'pending',
    },
    {
      id: 'b3',
      toolId: '4',
      toolName: 'Drip Irrigation System',
      toolImage: '💧',
      ownerId: 'owner4',
      ownerName: 'Suresh Reddy',
      ownerContact: '+91 95432 10987',
      userId: 'user1',
      startDate: '2024-03-15',
      endDate: '2024-03-18',
      days: 3,
      pricePerDay: 150,
      totalPrice: 450,
      status: 'completed',
      bookingDate: '2024-03-05',
      paymentStatus: 'completed',
    },
    {
      id: 'b4',
      toolId: '3',
      toolName: 'Rotavator Machine',
      toolImage: '⚙️',
      ownerId: 'owner3',
      ownerName: 'Vikram Patel',
      ownerContact: '+91 96543 21098',
      userId: 'user1',
      startDate: '2024-04-25',
      endDate: '2024-04-26',
      days: 1,
      pricePerDay: 250,
      totalPrice: 250,
      status: 'cancelled',
      bookingDate: '2024-04-18',
      paymentStatus: 'refunded',
      cancellationReason: 'Weather conditions',
    },
  ];

  // Filter by userId if provided
  let filtered = mockBookings;
  if (userId) {
    filtered = filtered.filter((booking) => booking.userId === userId);
  }

  // Filter by status if provided
  if (status && status !== 'all') {
    filtered = filtered.filter((booking) => booking.status === status);
  }

  return Response.json({
    success: true,
    data: filtered,
  });
}

export async function POST(request: Request) {
  const body = await request.json();

  // Mock booking creation
  const newBooking = {
    id: `b${Date.now()}`,
    ...body,
    status: 'pending',
    bookingDate: new Date().toISOString().split('T')[0],
    paymentStatus: 'pending',
  };

  return Response.json({
    success: true,
    data: newBooking,
    message: 'Booking request submitted successfully',
  });
}
