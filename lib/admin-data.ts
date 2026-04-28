// Dummy data for Admin Panel - Replace with actual DB queries later

export interface Farmer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  pincode: string;
  status: 'active' | 'inactive' | 'suspended' | 'pending';
  joinDate: string;
  avatar?: string;
  totalProducts: number;
  totalSales: number;
  rating: number;
  verified: boolean;
  crops: string[];
  landSize: string;
  lastActive: string;
}

export interface Product {
  id: string;
  name: string;
  category: 'seeds' | 'fertilizer' | 'tools' | 'cattle' | 'crops' | 'pesticides';
  price: number;
  stock: number;
  sellerId: string;
  sellerName: string;
  status: 'active' | 'pending' | 'rejected' | 'sold_out';
  image: string;
  description: string;
  createdAt: string;
  views: number;
  sales: number;
}

export interface RentalTool {
  id: string;
  name: string;
  category: 'tractor' | 'harvester' | 'sprayer' | 'plough' | 'seeder' | 'other';
  pricePerDay: number;
  ownerId: string;
  ownerName: string;
  ownerPhone: string;
  location: string;
  status: 'available' | 'rented' | 'maintenance' | 'pending_approval';
  image: string;
  description: string;
  rating: number;
  totalBookings: number;
  createdAt: string;
}

export interface Booking {
  id: string;
  toolId: string;
  toolName: string;
  renterId: string;
  renterName: string;
  renterPhone: string;
  ownerId: string;
  ownerName: string;
  startDate: string;
  endDate: string;
  totalAmount: number;
  status: 'pending' | 'approved' | 'rejected' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface Community {
  id: string;
  name: string;
  description: string;
  category: 'crop' | 'location' | 'problem' | 'general';
  memberCount: number;
  postCount: number;
  adminId: string;
  adminName: string;
  status: 'active' | 'inactive' | 'pending';
  createdAt: string;
  image: string;
}

export interface Post {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  content: string;
  images: string[];
  likes: number;
  comments: number;
  shares: number;
  status: 'active' | 'pending' | 'reported' | 'removed';
  reportCount: number;
  createdAt: string;
  communityId?: string;
  communityName?: string;
}

export interface Scheme {
  id: string;
  name: string;
  organization: string;
  category: string;
  description: string;
  subsidy: string;
  eligibility: string;
  deadline: string;
  status: 'active' | 'expired' | 'upcoming';
  applicationCount: number;
  documents: string[];
}

export interface WeatherAlert {
  id: string;
  title: string;
  type: 'warning' | 'advisory' | 'watch';
  severity: 'low' | 'medium' | 'high' | 'critical';
  regions: string[];
  message: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'expired' | 'scheduled';
  createdBy: string;
}

export interface AdminStats {
  totalFarmers: number;
  activeFarmers: number;
  newFarmersThisMonth: number;
  totalProducts: number;
  activeListings: number;
  totalSales: number;
  totalRevenue: number;
  rentalTools: number;
  activeRentals: number;
  communities: number;
  totalPosts: number;
  reportedPosts: number;
  pendingApprovals: number;
}

// Dummy Farmers Data
export const farmers: Farmer[] = [
  {
    id: 'f1',
    name: 'Rajesh Kumar',
    email: 'rajesh.kumar@email.com',
    phone: '9876543210',
    address: 'Village Rampur, District Varanasi',
    pincode: '221001',
    status: 'active',
    joinDate: '2024-01-15',
    avatar: '/avatars/farmer1.jpg',
    totalProducts: 12,
    totalSales: 45000,
    rating: 4.8,
    verified: true,
    crops: ['Rice', 'Wheat', 'Sugarcane'],
    landSize: '5 acres',
    lastActive: '2024-03-20',
  },
  {
    id: 'f2',
    name: 'Priya Sharma',
    email: 'priya.sharma@email.com',
    phone: '9876543211',
    address: 'Village Sundarpur, District Lucknow',
    pincode: '226001',
    status: 'active',
    joinDate: '2024-02-20',
    totalProducts: 8,
    totalSales: 32000,
    rating: 4.5,
    verified: true,
    crops: ['Vegetables', 'Pulses'],
    landSize: '3 acres',
    lastActive: '2024-03-19',
  },
  {
    id: 'f3',
    name: 'Arjun Singh',
    email: 'arjun.singh@email.com',
    phone: '9876543212',
    address: 'Village Chandanpur, District Kanpur',
    pincode: '208001',
    status: 'pending',
    joinDate: '2024-03-10',
    totalProducts: 0,
    totalSales: 0,
    rating: 0,
    verified: false,
    crops: ['Cotton', 'Soybean'],
    landSize: '10 acres',
    lastActive: '2024-03-18',
  },
  {
    id: 'f4',
    name: 'Meera Patel',
    email: 'meera.patel@email.com',
    phone: '9876543213',
    address: 'Village Govindpur, District Ahmedabad',
    pincode: '380001',
    status: 'active',
    joinDate: '2023-12-05',
    totalProducts: 15,
    totalSales: 78000,
    rating: 4.9,
    verified: true,
    crops: ['Groundnut', 'Cotton', 'Cumin'],
    landSize: '8 acres',
    lastActive: '2024-03-20',
  },
  {
    id: 'f5',
    name: 'Vikram Das',
    email: 'vikram.das@email.com',
    phone: '9876543214',
    address: 'Village Krishnapur, District Kolkata',
    pincode: '700001',
    status: 'suspended',
    joinDate: '2023-11-20',
    totalProducts: 3,
    totalSales: 12000,
    rating: 2.5,
    verified: false,
    crops: ['Jute', 'Rice'],
    landSize: '4 acres',
    lastActive: '2024-02-15',
  },
  {
    id: 'f6',
    name: 'Sunita Devi',
    email: 'sunita.devi@email.com',
    phone: '9876543215',
    address: 'Village Ramganj, District Patna',
    pincode: '800001',
    status: 'active',
    joinDate: '2024-01-25',
    totalProducts: 6,
    totalSales: 28000,
    rating: 4.3,
    verified: true,
    crops: ['Maize', 'Wheat', 'Lentils'],
    landSize: '6 acres',
    lastActive: '2024-03-20',
  },
  {
    id: 'f7',
    name: 'Ramesh Yadav',
    email: 'ramesh.yadav@email.com',
    phone: '9876543216',
    address: 'Village Shivpur, District Jaipur',
    pincode: '302001',
    status: 'inactive',
    joinDate: '2023-10-10',
    totalProducts: 2,
    totalSales: 8000,
    rating: 3.8,
    verified: true,
    crops: ['Bajra', 'Mustard'],
    landSize: '12 acres',
    lastActive: '2024-01-05',
  },
  {
    id: 'f8',
    name: 'Kavita Reddy',
    email: 'kavita.reddy@email.com',
    phone: '9876543217',
    address: 'Village Nagarjuna, District Hyderabad',
    pincode: '500001',
    status: 'active',
    joinDate: '2024-02-01',
    totalProducts: 10,
    totalSales: 55000,
    rating: 4.7,
    verified: true,
    crops: ['Rice', 'Chillies', 'Turmeric'],
    landSize: '7 acres',
    lastActive: '2024-03-20',
  },
];

// Dummy Products Data
export const products: Product[] = [
  {
    id: 'p1',
    name: 'Organic Basmati Rice - 25kg',
    category: 'crops',
    price: 2500,
    stock: 50,
    sellerId: 'f1',
    sellerName: 'Rajesh Kumar',
    status: 'active',
    image: '/products/rice.jpg',
    description: 'Premium quality organic basmati rice from Varanasi region',
    createdAt: '2024-03-01',
    views: 245,
    sales: 18,
  },
  {
    id: 'p2',
    name: 'DAP Fertilizer - 50kg Bag',
    category: 'fertilizer',
    price: 1350,
    stock: 100,
    sellerId: 'f4',
    sellerName: 'Meera Patel',
    status: 'active',
    image: '/products/fertilizer.jpg',
    description: 'High quality DAP fertilizer for all crops',
    createdAt: '2024-02-28',
    views: 189,
    sales: 32,
  },
  {
    id: 'p3',
    name: 'Hybrid Tomato Seeds - 100g',
    category: 'seeds',
    price: 450,
    stock: 200,
    sellerId: 'f2',
    sellerName: 'Priya Sharma',
    status: 'active',
    image: '/products/seeds.jpg',
    description: 'High yield hybrid tomato seeds, disease resistant',
    createdAt: '2024-03-05',
    views: 312,
    sales: 45,
  },
  {
    id: 'p4',
    name: 'Manual Seed Drill',
    category: 'tools',
    price: 3500,
    stock: 15,
    sellerId: 'f6',
    sellerName: 'Sunita Devi',
    status: 'pending',
    image: '/products/seeddrill.jpg',
    description: 'Manual seed drill for small scale farming',
    createdAt: '2024-03-18',
    views: 56,
    sales: 0,
  },
  {
    id: 'p5',
    name: 'Organic Neem Pesticide - 5L',
    category: 'pesticides',
    price: 890,
    stock: 75,
    sellerId: 'f8',
    sellerName: 'Kavita Reddy',
    status: 'active',
    image: '/products/pesticide.jpg',
    description: '100% organic neem based pesticide',
    createdAt: '2024-03-10',
    views: 178,
    sales: 28,
  },
  {
    id: 'p6',
    name: 'Jersey Cow - 3 Years',
    category: 'cattle',
    price: 65000,
    stock: 2,
    sellerId: 'f1',
    sellerName: 'Rajesh Kumar',
    status: 'active',
    image: '/products/cow.jpg',
    description: 'Healthy Jersey cow, good milk yield',
    createdAt: '2024-03-12',
    views: 89,
    sales: 1,
  },
  {
    id: 'p7',
    name: 'Wheat Seeds Grade A - 10kg',
    category: 'seeds',
    price: 680,
    stock: 0,
    sellerId: 'f7',
    sellerName: 'Ramesh Yadav',
    status: 'sold_out',
    image: '/products/wheat-seeds.jpg',
    description: 'High quality wheat seeds for rabi season',
    createdAt: '2024-02-15',
    views: 234,
    sales: 67,
  },
  {
    id: 'p8',
    name: 'Fresh Vegetables Combo',
    category: 'crops',
    price: 350,
    stock: 30,
    sellerId: 'f2',
    sellerName: 'Priya Sharma',
    status: 'rejected',
    image: '/products/vegetables.jpg',
    description: 'Mixed fresh vegetables pack',
    createdAt: '2024-03-19',
    views: 12,
    sales: 0,
  },
];

// Dummy Rental Tools Data
export const rentalTools: RentalTool[] = [
  {
    id: 'rt1',
    name: 'Mahindra 575 DI Tractor',
    category: 'tractor',
    pricePerDay: 1500,
    ownerId: 'f1',
    ownerName: 'Rajesh Kumar',
    ownerPhone: '9876543210',
    location: 'Varanasi, UP',
    status: 'available',
    image: '/tools/tractor1.jpg',
    description: '45 HP tractor with rotavator attachment available',
    rating: 4.8,
    totalBookings: 34,
    createdAt: '2024-01-20',
  },
  {
    id: 'rt2',
    name: 'Mini Rice Harvester',
    category: 'harvester',
    pricePerDay: 2500,
    ownerId: 'f4',
    ownerName: 'Meera Patel',
    ownerPhone: '9876543213',
    location: 'Ahmedabad, Gujarat',
    status: 'rented',
    image: '/tools/harvester.jpg',
    description: 'Compact harvester for paddy fields',
    rating: 4.5,
    totalBookings: 22,
    createdAt: '2024-02-10',
  },
  {
    id: 'rt3',
    name: 'Battery Operated Sprayer',
    category: 'sprayer',
    pricePerDay: 200,
    ownerId: 'f2',
    ownerName: 'Priya Sharma',
    ownerPhone: '9876543211',
    location: 'Lucknow, UP',
    status: 'available',
    image: '/tools/sprayer.jpg',
    description: '16L capacity battery sprayer',
    rating: 4.2,
    totalBookings: 56,
    createdAt: '2024-01-15',
  },
  {
    id: 'rt4',
    name: 'MB Plough - 2 Bottom',
    category: 'plough',
    pricePerDay: 800,
    ownerId: 'f6',
    ownerName: 'Sunita Devi',
    ownerPhone: '9876543215',
    location: 'Patna, Bihar',
    status: 'pending_approval',
    image: '/tools/plough.jpg',
    description: 'Heavy duty MB plough for deep tillage',
    rating: 0,
    totalBookings: 0,
    createdAt: '2024-03-18',
  },
  {
    id: 'rt5',
    name: 'Seed Cum Fertilizer Drill',
    category: 'seeder',
    pricePerDay: 600,
    ownerId: 'f8',
    ownerName: 'Kavita Reddy',
    ownerPhone: '9876543217',
    location: 'Hyderabad, Telangana',
    status: 'available',
    image: '/tools/seeder.jpg',
    description: '9 row seed drill with fertilizer attachment',
    rating: 4.6,
    totalBookings: 28,
    createdAt: '2024-02-25',
  },
  {
    id: 'rt6',
    name: 'Swaraj 744 FE Tractor',
    category: 'tractor',
    pricePerDay: 1800,
    ownerId: 'f7',
    ownerName: 'Ramesh Yadav',
    ownerPhone: '9876543216',
    location: 'Jaipur, Rajasthan',
    status: 'maintenance',
    image: '/tools/tractor2.jpg',
    description: '48 HP tractor with trolley',
    rating: 4.4,
    totalBookings: 41,
    createdAt: '2024-01-05',
  },
];

// Dummy Bookings Data
export const bookings: Booking[] = [
  {
    id: 'b1',
    toolId: 'rt1',
    toolName: 'Mahindra 575 DI Tractor',
    renterId: 'f2',
    renterName: 'Priya Sharma',
    renterPhone: '9876543211',
    ownerId: 'f1',
    ownerName: 'Rajesh Kumar',
    startDate: '2024-03-22',
    endDate: '2024-03-25',
    totalAmount: 6000,
    status: 'pending',
    createdAt: '2024-03-20',
  },
  {
    id: 'b2',
    toolId: 'rt2',
    toolName: 'Mini Rice Harvester',
    renterId: 'f1',
    renterName: 'Rajesh Kumar',
    renterPhone: '9876543210',
    ownerId: 'f4',
    ownerName: 'Meera Patel',
    startDate: '2024-03-18',
    endDate: '2024-03-22',
    totalAmount: 10000,
    status: 'approved',
    createdAt: '2024-03-15',
  },
  {
    id: 'b3',
    toolId: 'rt3',
    toolName: 'Battery Operated Sprayer',
    renterId: 'f6',
    renterName: 'Sunita Devi',
    renterPhone: '9876543215',
    ownerId: 'f2',
    ownerName: 'Priya Sharma',
    startDate: '2024-03-10',
    endDate: '2024-03-12',
    totalAmount: 400,
    status: 'completed',
    createdAt: '2024-03-08',
  },
  {
    id: 'b4',
    toolId: 'rt5',
    toolName: 'Seed Cum Fertilizer Drill',
    renterId: 'f7',
    renterName: 'Ramesh Yadav',
    renterPhone: '9876543216',
    ownerId: 'f8',
    ownerName: 'Kavita Reddy',
    startDate: '2024-03-25',
    endDate: '2024-03-28',
    totalAmount: 1800,
    status: 'pending',
    createdAt: '2024-03-20',
  },
  {
    id: 'b5',
    toolId: 'rt1',
    toolName: 'Mahindra 575 DI Tractor',
    renterId: 'f8',
    renterName: 'Kavita Reddy',
    renterPhone: '9876543217',
    ownerId: 'f1',
    ownerName: 'Rajesh Kumar',
    startDate: '2024-03-05',
    endDate: '2024-03-07',
    totalAmount: 3000,
    status: 'completed',
    createdAt: '2024-03-02',
  },
];

// Dummy Communities Data
export const communities: Community[] = [
  {
    id: 'c1',
    name: 'Rice Farmers India',
    description: 'Community for rice cultivators to share tips and techniques',
    category: 'crop',
    memberCount: 2456,
    postCount: 890,
    adminId: 'f1',
    adminName: 'Rajesh Kumar',
    status: 'active',
    createdAt: '2023-08-15',
    image: '/communities/rice.jpg',
  },
  {
    id: 'c2',
    name: 'Organic Farming Network',
    description: 'Promoting organic and sustainable farming practices',
    category: 'general',
    memberCount: 3210,
    postCount: 1245,
    adminId: 'f4',
    adminName: 'Meera Patel',
    status: 'active',
    createdAt: '2023-06-20',
    image: '/communities/organic.jpg',
  },
  {
    id: 'c3',
    name: 'UP Farmers Forum',
    description: 'Connect with farmers from Uttar Pradesh',
    category: 'location',
    memberCount: 5670,
    postCount: 2340,
    adminId: 'f2',
    adminName: 'Priya Sharma',
    status: 'active',
    createdAt: '2023-05-10',
    image: '/communities/up.jpg',
  },
  {
    id: 'c4',
    name: 'Pest Control Solutions',
    description: 'Share and find solutions for pest problems',
    category: 'problem',
    memberCount: 1890,
    postCount: 670,
    adminId: 'f8',
    adminName: 'Kavita Reddy',
    status: 'active',
    createdAt: '2023-09-25',
    image: '/communities/pest.jpg',
  },
  {
    id: 'c5',
    name: 'New Farming Techniques',
    description: 'Discussion about modern farming methods',
    category: 'general',
    memberCount: 456,
    postCount: 78,
    adminId: 'f3',
    adminName: 'Arjun Singh',
    status: 'pending',
    createdAt: '2024-03-15',
    image: '/communities/modern.jpg',
  },
];

// Dummy Posts Data
export const posts: Post[] = [
  {
    id: 'post1',
    authorId: 'f1',
    authorName: 'Rajesh Kumar',
    authorAvatar: '/avatars/farmer1.jpg',
    content: 'Happy to share that my organic rice yield increased by 20% this season using traditional methods combined with modern soil testing.',
    images: ['/posts/rice-field.jpg'],
    likes: 245,
    comments: 34,
    shares: 12,
    status: 'active',
    reportCount: 0,
    createdAt: '2024-03-20',
    communityId: 'c1',
    communityName: 'Rice Farmers India',
  },
  {
    id: 'post2',
    authorId: 'f2',
    authorName: 'Priya Sharma',
    authorAvatar: '/avatars/farmer2.jpg',
    content: 'Looking for advice on dealing with aphids in my tomato crop. Any organic solutions?',
    images: [],
    likes: 89,
    comments: 56,
    shares: 5,
    status: 'active',
    reportCount: 0,
    createdAt: '2024-03-19',
    communityId: 'c4',
    communityName: 'Pest Control Solutions',
  },
  {
    id: 'post3',
    authorId: 'f5',
    authorName: 'Vikram Das',
    authorAvatar: '/avatars/farmer5.jpg',
    content: 'Selling premium seeds at discounted rates. Contact me directly for bulk orders.',
    images: ['/posts/seeds.jpg'],
    likes: 12,
    comments: 3,
    shares: 1,
    status: 'reported',
    reportCount: 5,
    createdAt: '2024-03-18',
  },
  {
    id: 'post4',
    authorId: 'f4',
    authorName: 'Meera Patel',
    authorAvatar: '/avatars/farmer4.jpg',
    content: 'Attended the organic farming workshop in Ahmedabad. Learned so much about composting techniques!',
    images: ['/posts/workshop.jpg', '/posts/compost.jpg'],
    likes: 567,
    comments: 89,
    shares: 45,
    status: 'active',
    reportCount: 0,
    createdAt: '2024-03-17',
    communityId: 'c2',
    communityName: 'Organic Farming Network',
  },
  {
    id: 'post5',
    authorId: 'f6',
    authorName: 'Sunita Devi',
    authorAvatar: '/avatars/farmer6.jpg',
    content: 'Weather alert: Heavy rainfall expected in Bihar next week. Protect your crops!',
    images: [],
    likes: 234,
    comments: 45,
    shares: 78,
    status: 'pending',
    reportCount: 0,
    createdAt: '2024-03-20',
  },
];

// Dummy Schemes Data
export const schemes: Scheme[] = [
  {
    id: 's1',
    name: 'PM-Kisan Samman Nidhi',
    organization: 'Government of India',
    category: 'Direct Income Support',
    description: 'Direct income support of Rs 6000 per year to all farmer families',
    subsidy: 'Rs 6,000/year',
    eligibility: 'All land-holding farmer families',
    deadline: '2024-12-31',
    status: 'active',
    applicationCount: 12456,
    documents: ['Aadhaar Card', 'Land Documents', 'Bank Passbook'],
  },
  {
    id: 's2',
    name: 'Pradhan Mantri Fasal Bima Yojana',
    organization: 'Ministry of Agriculture',
    category: 'Crop Insurance',
    description: 'Comprehensive crop insurance scheme for farmers',
    subsidy: 'Premium subsidy up to 50%',
    eligibility: 'All farmers growing notified crops',
    deadline: '2024-06-30',
    status: 'active',
    applicationCount: 8934,
    documents: ['Land Records', 'Sowing Certificate', 'Bank Account Details'],
  },
  {
    id: 's3',
    name: 'Paramparagat Krishi Vikas Yojana',
    organization: 'Ministry of Agriculture',
    category: 'Organic Farming',
    description: 'Promotion of organic farming through cluster approach',
    subsidy: 'Rs 50,000/hectare over 3 years',
    eligibility: 'Groups of minimum 50 farmers',
    deadline: '2024-08-15',
    status: 'active',
    applicationCount: 2345,
    documents: ['Group Formation Document', 'Land Documents', 'Organic Certification Plan'],
  },
  {
    id: 's4',
    name: 'Kisan Credit Card Scheme',
    organization: 'NABARD',
    category: 'Credit',
    description: 'Timely credit support to farmers for agricultural needs',
    subsidy: '4% interest subvention',
    eligibility: 'All farmers, sharecroppers, tenant farmers',
    deadline: 'Ongoing',
    status: 'active',
    applicationCount: 15678,
    documents: ['Identity Proof', 'Land Documents', 'Passport Photo'],
  },
  {
    id: 's5',
    name: 'Soil Health Card Scheme',
    organization: 'Government of India',
    category: 'Soil Testing',
    description: 'Free soil testing and health card for optimal fertilizer use',
    subsidy: 'Free Service',
    eligibility: 'All farmers',
    deadline: '2024-03-31',
    status: 'expired',
    applicationCount: 6789,
    documents: ['Aadhaar Card', 'Land Location Details'],
  },
];

// Dummy Weather Alerts Data
export const weatherAlerts: WeatherAlert[] = [
  {
    id: 'wa1',
    title: 'Heavy Rainfall Warning',
    type: 'warning',
    severity: 'high',
    regions: ['Bihar', 'Jharkhand', 'West Bengal'],
    message: 'Heavy to very heavy rainfall expected in next 48 hours. Farmers advised to protect standing crops and ensure proper drainage.',
    startDate: '2024-03-21',
    endDate: '2024-03-23',
    status: 'active',
    createdBy: 'IMD',
  },
  {
    id: 'wa2',
    title: 'Heat Wave Advisory',
    type: 'advisory',
    severity: 'medium',
    regions: ['Rajasthan', 'Gujarat', 'Madhya Pradesh'],
    message: 'Temperature expected to rise above 40°C. Ensure adequate irrigation and avoid midday field work.',
    startDate: '2024-03-22',
    endDate: '2024-03-26',
    status: 'scheduled',
    createdBy: 'IMD',
  },
  {
    id: 'wa3',
    title: 'Frost Watch',
    type: 'watch',
    severity: 'low',
    regions: ['Punjab', 'Haryana', 'Uttar Pradesh'],
    message: 'Light frost possible in early morning hours. Protect sensitive crops.',
    startDate: '2024-03-15',
    endDate: '2024-03-18',
    status: 'expired',
    createdBy: 'State Agriculture Dept',
  },
  {
    id: 'wa4',
    title: 'Cyclone Alert',
    type: 'warning',
    severity: 'critical',
    regions: ['Odisha', 'Andhra Pradesh', 'Tamil Nadu'],
    message: 'Cyclonic storm approaching eastern coast. Evacuate livestock and secure farm equipment.',
    startDate: '2024-03-20',
    endDate: '2024-03-22',
    status: 'active',
    createdBy: 'IMD',
  },
];

// Admin Dashboard Stats
export const adminStats: AdminStats = {
  totalFarmers: 12456,
  activeFarmers: 8934,
  newFarmersThisMonth: 456,
  totalProducts: 3842,
  activeListings: 2156,
  totalSales: 15678,
  totalRevenue: 4248900,
  rentalTools: 234,
  activeRentals: 89,
  communities: 156,
  totalPosts: 8234,
  reportedPosts: 23,
  pendingApprovals: 67,
};

// Chart data for dashboard
export const revenueChartData = [
  { month: 'Jan', revenue: 245000, sales: 890 },
  { month: 'Feb', revenue: 312000, sales: 1120 },
  { month: 'Mar', revenue: 398000, sales: 1450 },
  { month: 'Apr', revenue: 356000, sales: 1280 },
  { month: 'May', revenue: 445000, sales: 1620 },
  { month: 'Jun', revenue: 489000, sales: 1780 },
];

export const userGrowthData = [
  { month: 'Jan', farmers: 8500, workers: 1200, experts: 150 },
  { month: 'Feb', farmers: 9200, workers: 1350, experts: 180 },
  { month: 'Mar', farmers: 10100, workers: 1480, experts: 210 },
  { month: 'Apr', farmers: 10800, workers: 1590, experts: 245 },
  { month: 'May', farmers: 11600, workers: 1720, experts: 280 },
  { month: 'Jun', farmers: 12456, workers: 1890, experts: 320 },
];

export const categoryDistribution = [
  { name: 'Seeds', value: 35, color: '#22c55e' },
  { name: 'Fertilizers', value: 25, color: '#3b82f6' },
  { name: 'Tools', value: 15, color: '#f59e0b' },
  { name: 'Crops', value: 18, color: '#8b5cf6' },
  { name: 'Others', value: 7, color: '#6b7280' },
];

export const recentActivity = [
  { id: 1, type: 'user_joined', message: 'New farmer Arjun Singh registered', time: '5 min ago' },
  { id: 2, type: 'product_listed', message: 'New product "Organic Rice" listed by Rajesh Kumar', time: '15 min ago' },
  { id: 3, type: 'booking', message: 'Tool booking request from Priya Sharma', time: '30 min ago' },
  { id: 4, type: 'report', message: 'Post reported for spam content', time: '1 hour ago' },
  { id: 5, type: 'payment', message: 'Payment of Rs 6,000 received for tool rental', time: '2 hours ago' },
  { id: 6, type: 'community', message: 'New community "Wheat Growers" created', time: '3 hours ago' },
];
