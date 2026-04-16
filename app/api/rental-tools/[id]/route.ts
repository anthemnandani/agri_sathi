export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;

  // Mock tool data with reviews
  const mockToolsMap: Record<string, any> = {
    '1': {
      id: '1',
      name: 'John Deere Tractor',
      category: 'tractor',
      price: 500,
      rating: 4.8,
      reviews: 24,
      image: '🚜',
      owner: {
        id: 'owner1',
        name: 'Rajesh Kumar',
        contact: '+91 98765 43210',
        village: 'Haryana',
        distance: '2.5 km',
        responseTime: '< 1 hour',
        joinedDate: '2 years ago',
      },
      description: 'Well-maintained 40 HP tractor with attached plow, perfect for medium-sized farms',
      longDescription:
        'This is a highly reliable John Deere tractor that has been maintained with utmost care. It comes with an attached moldboard plow for efficient soil preparation. The tractor has been regularly serviced and is in excellent working condition.',
      specifications: {
        power: '40 HP',
        fuelType: 'Diesel',
        condition: 'Excellent',
        year: 2018,
        engineType: '3-cylinder',
        transmission: 'Manual with Power Steering',
      },
      availability: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      location: {
        latitude: 28.7041,
        longitude: 77.1025,
      },
      images: ['🚜', '🔧', '⚙️'],
      amenities: ['Free delivery', 'Operator training', 'Insurance included'],
      reviews: [
        {
          id: 'r1',
          user: 'Farmer Harjit',
          rating: 5,
          date: '2 weeks ago',
          comment: 'Excellent tractor! Works like new. Owner was very helpful.',
        },
        {
          id: 'r2',
          user: 'Singh Cultivation',
          rating: 4,
          date: '1 month ago',
          comment: 'Good condition and timely delivery. Highly recommended.',
        },
        {
          id: 'r3',
          user: 'Village Farmer Co-op',
          rating: 5,
          date: '2 months ago',
          comment: 'Perfect for our farm size. Delivered on time.',
        },
      ],
    },
    '2': {
      id: '2',
      name: 'Combine Harvester',
      category: 'harvester',
      price: 800,
      rating: 4.6,
      reviews: 18,
      image: '🌾',
      owner: {
        id: 'owner2',
        name: 'Priya Singh',
        contact: '+91 97654 32109',
        village: 'Punjab',
        distance: '5.2 km',
        responseTime: '< 2 hours',
        joinedDate: '1.5 years ago',
      },
      description: 'Powerful combine harvester ideal for wheat and rice harvesting',
      longDescription:
        'Professional-grade combine harvester suitable for large-scale harvesting operations. Features advanced cutting and threshing mechanisms for efficient grain separation.',
      specifications: {
        power: '75 HP',
        fuelType: 'Diesel',
        condition: 'Very Good',
        year: 2017,
        cuttingWidth: '2.4 m',
        capacity: '5 tons',
      },
      availability: ['Saturday', 'Sunday', 'Monday'],
      location: {
        latitude: 31.5497,
        longitude: 74.3436,
      },
      images: ['🌾', '🚜', '🔧'],
      amenities: ['Trained operator', 'Fuel provided', 'Same day delivery'],
      reviews: [
        {
          id: 'r1',
          user: 'Punjab Farms',
          rating: 5,
          date: '3 weeks ago',
          comment: 'Best harvester in the area. Highly efficient.',
        },
        {
          id: 'r2',
          user: 'Harvest Masters',
          rating: 4,
          date: '1.5 months ago',
          comment: 'Good machine, very professional owner.',
        },
      ],
    },
  };

  const tool = mockToolsMap[id];

  if (!tool) {
    return Response.json(
      { success: false, error: 'Tool not found' },
      { status: 404 }
    );
  }

  return Response.json({
    success: true,
    data: tool,
  });
}
