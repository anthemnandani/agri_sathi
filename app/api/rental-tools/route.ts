export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const location = searchParams.get('location');
  const page = parseInt(searchParams.get('page') || '1');
  const limit = 12;

  const mockTools = [
    {
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
      },
      description: 'Well-maintained 40 HP tractor with attached plow',
      specifications: {
        power: '40 HP',
        fuelType: 'Diesel',
        condition: 'Excellent',
      },
      availability: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      location: {
        latitude: 28.7041,
        longitude: 77.1025,
      },
    },
    {
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
      },
      description: 'Powerful combine harvester ideal for wheat and rice harvesting',
      specifications: {
        power: '75 HP',
        fuelType: 'Diesel',
        condition: 'Very Good',
      },
      availability: ['Saturday', 'Sunday', 'Monday'],
      location: {
        latitude: 31.5497,
        longitude: 74.3436,
      },
    },
    {
      id: '3',
      name: 'Rotavator Machine',
      category: 'cultivator',
      price: 250,
      rating: 4.7,
      reviews: 31,
      image: '⚙️',
      owner: {
        id: 'owner3',
        name: 'Vikram Patel',
        contact: '+91 96543 21098',
        village: 'Gujarat',
        distance: '1.8 km',
      },
      description: 'Heavy-duty rotavator for soil preparation and tilling',
      specifications: {
        power: '20 HP',
        fuelType: 'Diesel',
        condition: 'Good',
      },
      availability: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
      location: {
        latitude: 22.3039,
        longitude: 73.1812,
      },
    },
    {
      id: '4',
      name: 'Drip Irrigation System',
      category: 'irrigation',
      price: 150,
      rating: 4.9,
      reviews: 42,
      image: '💧',
      owner: {
        id: 'owner4',
        name: 'Suresh Reddy',
        contact: '+91 95432 10987',
        village: 'Telangana',
        distance: '3.1 km',
      },
      description: 'Complete drip irrigation setup with pipes and nozzles',
      specifications: {
        capacity: '500L/hour',
        coverage: '1 acre',
        condition: 'Excellent',
      },
      availability: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      location: {
        latitude: 17.3850,
        longitude: 78.4867,
      },
    },
    {
      id: '5',
      name: 'Thresher Machine',
      category: 'thresher',
      price: 300,
      rating: 4.5,
      reviews: 15,
      image: '🌽',
      owner: {
        id: 'owner5',
        name: 'Arun Sharma',
        contact: '+91 94321 09876',
        village: 'Madhya Pradesh',
        distance: '4.3 km',
      },
      description: 'Mechanical thresher for grain separation',
      specifications: {
        capacity: '800 kg/hour',
        power: '10 HP',
        condition: 'Good',
      },
      availability: ['Tuesday', 'Thursday', 'Saturday', 'Sunday'],
      location: {
        latitude: 23.1815,
        longitude: 79.9864,
      },
    },
    {
      id: '6',
      name: 'Sprayer Machine',
      category: 'sprayer',
      price: 100,
      rating: 4.4,
      reviews: 28,
      image: '🔫',
      owner: {
        id: 'owner6',
        name: 'Maya Verma',
        contact: '+91 93210 98765',
        village: 'Uttar Pradesh',
        distance: '2.7 km',
      },
      description: 'Motorized knapsack sprayer for pesticide and fertilizer application',
      specifications: {
        capacity: '20L',
        power: '2 HP',
        condition: 'Excellent',
      },
      availability: ['Monday', 'Wednesday', 'Friday'],
      location: {
        latitude: 26.8467,
        longitude: 75.8233,
      },
    },
    {
      id: '7',
      name: 'Baler Machine',
      category: 'baler',
      price: 450,
      rating: 4.7,
      reviews: 22,
      image: '📦',
      owner: {
        id: 'owner7',
        name: 'Deepak Singh',
        contact: '+91 92109 87654',
        village: 'Jammu & Kashmir',
        distance: '6.5 km',
      },
      description: 'Hay and straw baling machine for efficient harvesting',
      specifications: {
        baleSize: '120x90x60 cm',
        power: '35 HP',
        condition: 'Very Good',
      },
      availability: ['Sunday', 'Monday', 'Tuesday'],
      location: {
        latitude: 34.0837,
        longitude: 74.7973,
      },
    },
    {
      id: '8',
      name: 'Mini Tractor',
      category: 'tractor',
      price: 350,
      rating: 4.8,
      reviews: 35,
      image: '🚜',
      owner: {
        id: 'owner8',
        name: 'Neha Gupta',
        contact: '+91 91098 76543',
        village: 'Himachal Pradesh',
        distance: '1.2 km',
      },
      description: 'Compact mini tractor perfect for small farms',
      specifications: {
        power: '25 HP',
        fuelType: 'Diesel',
        condition: 'Excellent',
      },
      availability: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      location: {
        latitude: 31.7724,
        longitude: 77.1025,
      },
    },
  ];

  // Filter by category if provided
  let filtered = mockTools;
  if (category && category !== 'all') {
    filtered = filtered.filter((tool) => tool.category === category);
  }

  // Filter by location if provided (simple distance based filtering)
  if (location) {
    filtered = filtered.filter((tool) =>
      tool.owner.village.toLowerCase().includes(location.toLowerCase())
    );
  }

  // Pagination
  const start = (page - 1) * limit;
  const paginatedTools = filtered.slice(start, start + limit);

  return Response.json({
    success: true,
    data: paginatedTools,
    total: filtered.length,
    page,
    limit,
    hasMore: start + limit < filtered.length,
  });
}
