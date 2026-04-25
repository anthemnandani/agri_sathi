// Enhanced mock data with 2000+ messages and 50+ farmers
export const mockFarmers = [
  {
    id: 'farmer1',
    name: 'Rajesh Kumar',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=rajesh',
    role: 'admin' as const,
    joinedAt: new Date('2023-01-15'),
    location: 'Punjab, India',
    crops: ['Wheat', 'Rice'],
  },
  {
    id: 'farmer2',
    name: 'Priya Singh',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=priya',
    role: 'moderator' as const,
    joinedAt: new Date('2023-02-20'),
    location: 'Haryana, India',
    crops: ['Cotton', 'Sugarcane'],
  },
  {
    id: 'farmer3',
    name: 'Amit Patel',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=amit',
    role: 'member' as const,
    joinedAt: new Date('2023-03-10'),
    location: 'Gujarat, India',
    crops: ['Groundnut', 'Sesame'],
  },
  {
    id: 'farmer4',
    name: 'Deepak Singh',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=deepak',
    role: 'member' as const,
    joinedAt: new Date('2023-04-05'),
    location: 'Punjab, India',
    crops: ['Maize', 'Sorghum'],
  },
  {
    id: 'farmer5',
    name: 'Anita Sharma',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=anita',
    role: 'member' as const,
    joinedAt: new Date('2023-05-12'),
    location: 'Madhya Pradesh, India',
    crops: ['Soybean', 'Chickpea'],
  },
  {
    id: 'farmer6',
    name: 'Vinod Kumar',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=vinod',
    role: 'member' as const,
    joinedAt: new Date('2023-06-18'),
    location: 'Punjab, India',
    crops: ['Wheat', 'Barley'],
  },
  {
    id: 'farmer7',
    name: 'Sunita Devi',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sunita',
    role: 'member' as const,
    joinedAt: new Date('2023-07-22'),
    location: 'Uttar Pradesh, India',
    crops: ['Rice', 'Potato'],
  },
  {
    id: 'farmer8',
    name: 'Ashok Verma',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ashok',
    role: 'member' as const,
    joinedAt: new Date('2023-08-14'),
    location: 'Rajasthan, India',
    crops: ['Bajra', 'Mustard'],
  },
  {
    id: 'farmer9',
    name: 'Kavita Singh',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=kavita',
    role: 'member' as const,
    joinedAt: new Date('2023-09-25'),
    location: 'Punjab, India',
    crops: ['Cotton', 'Rice'],
  },
  {
    id: 'farmer10',
    name: 'Mohan Lal',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=mohan',
    role: 'member' as const,
    joinedAt: new Date('2023-10-30'),
    location: 'Haryana, India',
    crops: ['Sugarcane', 'Wheat'],
  },
];

// Generate more farmers for realistic data (40+ total)
const generateAdditionalFarmers = () => {
  const names = [
    'Suresh Chandra', 'Neha Patel', 'Vikram Singh', 'Pooja Sharma', 'Arjun Kumar',
    'Divya Reddy', 'Sandeep Gupta', 'Priya Verma', 'Rohan Sharma', 'Anjali Singh',
    'Manoj Patel', 'Sneha Dutta', 'Akshay Kumar', 'Ritika Singh', 'Nikhil Verma',
    'Sakshi Sharma', 'Abhishek Patel', 'Meera Singh', 'Sanjay Kumar', 'Disha Gupta',
    'Harsh Sharma', 'Isha Patel', 'Rajiv Singh', 'Neelam Verma', 'Vikram Patel',
    'Shruti Kumar', 'Arjun Sharma', 'Pooja Singh', 'Saurav Patel', 'Anu Verma',
    'Vishal Sharma', 'Priya Gupta', 'Rohit Singh', 'Ananya Patel', 'Nitin Kumar',
    'Riya Sharma', 'Kamal Singh', 'Shreya Verma', 'Pranav Patel', 'Simran Gupta',
    'Aditya Singh', 'Zara Sharma', 'Bhavesh Kumar', 'Avni Patel',
  ];

  return names.map((name, i) => ({
    id: `farmer${i + 11}`,
    name,
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name.toLowerCase().replace(/\s/g, '')}`,
    role: 'member' as const,
    joinedAt: new Date(2023, Math.floor(i / 5), (i % 28) + 1),
    location: ['Punjab', 'Haryana', 'Gujarat', 'Uttar Pradesh', 'Madhya Pradesh'][i % 5] + ', India',
    crops: ['Wheat', 'Rice', 'Cotton', 'Sugarcane', 'Maize'][i % 5].split(','),
  }));
};

export const allFarmers = [...mockFarmers, ...generateAdditionalFarmers()];

// Generate 2000+ realistic messages
const messageTemplates = [
  'आजकल गेहूं की खेती में क्या सावधानियां रखनी चाहिए?',
  'धान की फसल में सड़न रोग आ गया है, कोई उपाय बताइए।',
  'खाद देने का सही समय क्या है?',
  'कीटनाशक का इस्तेमाल कैसे करें?',
  'मिट्टी की जांच कहां करवा सकते हैं?',
  'सिंचाई की सही व्यवस्था कैसे करें?',
  'नई किस्में कहां से मिलती हैं?',
  'बीज दर कितनी होनी चाहिए?',
  'फसल बीमा के लिए क्या शर्तें हैं?',
  'कृषि ऋण कैसे मिलेगा?',
  'बाजार में कीमत कितनी मिल रही है?',
  'फसल की कटाई का सही समय कब है?',
  'भंडारण की सुविधा कहां है?',
  'जैविक खेती के फायदे क्या हैं?',
  'नई तकनीक के बारे में जानकारी दीजिए।',
];

const mediaMessages = [
  { type: 'image', description: 'गेहूं की पत्तियों में रोग दिखा रहा है' },
  { type: 'image', description: 'फसल अच्छी हो रही है' },
  { type: 'image', description: 'सिंचाई का समय आ गया' },
  { type: 'document', description: 'कृषि मंत्रालय की नई नीति' },
  { type: 'document', description: 'जैविक खेती की जानकारी' },
  { type: 'voice', description: 'फसल से जुड़ी महत्वपूर्ण बात' },
];

export const generateMockMessages = () => {
  const messages = [];
  const now = new Date();
  const baseDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000); // 90 days ago

  for (let i = 0; i < 2050; i++) {
    const farmerIndex = i % allFarmers.length;
    const farmer = allFarmers[farmerIndex];
    const messageType = i % 20 < 16 ? 'text' : i % 20 < 18 ? 'image' : i % 20 < 19 ? 'document' : 'voice';

    const createdAt = new Date(baseDate.getTime() + Math.random() * 90 * 24 * 60 * 60 * 1000);

    let message: any = {
      id: `msg${i}`,
      senderId: farmer.id,
      sender: {
        id: farmer.id,
        name: farmer.name,
        avatar: farmer.avatar,
        role: farmer.role,
      },
      type: messageType,
      createdAt,
      approved: true,
      isPinned: i < 3, // First 3 messages are pinned
      replies: Math.floor(Math.random() * 5),
    };

    if (messageType === 'text') {
      message.content = messageTemplates[Math.floor(Math.random() * messageTemplates.length)];
    } else if (messageType === 'image') {
      const imageNum = Math.floor(Math.random() * 10) + 1;
      message.image = `https://images.unsplash.com/photo-1500595046?w=400&h=400&fit=crop`;
      message.content = mediaMessages[Math.floor(Math.random() * 3)].description;
    } else if (messageType === 'document') {
      message.content = mediaMessages[Math.floor(Math.random() * 2) + 3].description;
      message.documentUrl = '/documents/agriculture-guide.pdf';
      message.documentSize = Math.floor(Math.random() * 5000) + 500 + ' KB';
    } else {
      message.content = mediaMessages[5].description;
      message.voiceDuration = Math.floor(Math.random() * 120) + 15 + 's';
    }

    messages.push(message);
  }

  return messages.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
};

export const mockMessages = generateMockMessages();

export const mockCommunityDetail = {
  id: 'wheat-farmers-punjab',
  name: 'गेहूं किसान समूह',
  description: 'पंजाब के गेहूं किसानों का समूह जहां हम गेहूं की खेती के बारे में ज्ञान साझा करते हैं।',
  category: 'crop',
  language: 'Hindi',
  private: false,
  icon: '🌾',
  members: allFarmers.length,
  membersList: allFarmers,
  admin: mockFarmers[0],
  moderators: [mockFarmers[1]],
  createdAt: new Date('2023-01-15'),
  description_long: 'यह एक जीवंत किसान समूह है जहां पंजाब के किसान गेहूं की खेती के बारे में अपने अनुभव साझा करते हैं। यहां आप नई किस्मों, सिंचाई के तरीकों, कीट नियंत्रण और बाजार की कीमतों के बारे में चर्चा कर सकते हैं।',
  stats: {
    totalMessages: mockMessages.length,
    totalMedia: Math.floor(mockMessages.length * 0.15),
    totalDocuments: Math.floor(mockMessages.length * 0.08),
    activeToday: Math.floor(allFarmers.length * 0.6),
    activeThisWeek: Math.floor(allFarmers.length * 0.85),
  },
  rules: [
    'केवल कृषि से संबंधित विषयों पर चर्चा करें',
    'अपमानजनक भाषा का उपयोग न करें',
    'किसी को परेशान न करें',
    'विज्ञापन या स्पैम न करें',
  ],
};

export const mockMediaItems = [
  {
    id: 'media1',
    type: 'image',
    thumbnail: 'https://images.unsplash.com/photo-1500595046',
    url: 'https://images.unsplash.com/photo-1500595046',
    description: 'गेहूं की स्वस्थ फसल',
    uploadedBy: mockFarmers[0].name,
    uploadedAt: new Date('2024-01-20'),
  },
  {
    id: 'media2',
    type: 'image',
    thumbnail: 'https://images.unsplash.com/photo-1500595046',
    url: 'https://images.unsplash.com/photo-1500595046',
    description: 'सिंचाई की प्रक्रिया',
    uploadedBy: mockFarmers[1].name,
    uploadedAt: new Date('2024-01-19'),
  },
  {
    id: 'media3',
    type: 'image',
    thumbnail: 'https://images.unsplash.com/photo-1500595046',
    url: 'https://images.unsplash.com/photo-1500595046',
    description: 'कीट नियंत्रण उपाय',
    uploadedBy: mockFarmers[2].name,
    uploadedAt: new Date('2024-01-18'),
  },
  {
    id: 'media4',
    type: 'image',
    thumbnail: 'https://images.unsplash.com/photo-1500595046',
    url: 'https://images.unsplash.com/photo-1500595046',
    description: 'फसल की कटाई का समय',
    uploadedBy: mockFarmers[3].name,
    uploadedAt: new Date('2024-01-17'),
  },
];

export const mockDocuments = [
  {
    id: 'doc1',
    name: 'गेहूं की खेती - संपूर्ण गाइड',
    type: 'PDF',
    size: '2.5 MB',
    uploadedBy: mockFarmers[0].name,
    uploadedAt: new Date('2024-01-15'),
    url: '/documents/wheat-guide.pdf',
  },
  {
    id: 'doc2',
    name: 'कृषि विभाग की नई योजना',
    type: 'PDF',
    size: '1.2 MB',
    uploadedBy: mockFarmers[1].name,
    uploadedAt: new Date('2024-01-14'),
    url: '/documents/scheme.pdf',
  },
  {
    id: 'doc3',
    name: 'जैविक खेती की जानकारी',
    type: 'PDF',
    size: '3.1 MB',
    uploadedBy: mockFarmers[2].name,
    uploadedAt: new Date('2024-01-13'),
    url: '/documents/organic-farming.pdf',
  },
  {
    id: 'doc4',
    name: 'मिट्टी परीक्षण रिपोर्ट टेम्पलेट',
    type: 'PDF',
    size: '0.8 MB',
    uploadedBy: mockFarmers[3].name,
    uploadedAt: new Date('2024-01-12'),
    url: '/documents/soil-test.pdf',
  },
  {
    id: 'doc5',
    name: 'कीटनाशक का सही उपयोग',
    type: 'PDF',
    size: '2.3 MB',
    uploadedBy: mockFarmers[4].name,
    uploadedAt: new Date('2024-01-11'),
    url: '/documents/pesticide-guide.pdf',
  },
];
