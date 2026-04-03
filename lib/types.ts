// User & Authentication Types
export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  role: 'farmer' | 'expert' | 'worker' | 'admin';
  createdAt: Date;
  updatedAt: Date;
}

export interface Farmer extends User {
  pincode: string;
  location: string;
  crops: string[];
  landSize?: number;
  bio?: string;
  verified: boolean;
  rating?: number;
  followers: number;
  following: number;
}

export interface Expert extends User {
  specialization: string[];
  qualification?: string;
  experience?: number;
  bio?: string;
  verified: boolean;
  rating?: number;
  followers: number;
  consultationRate?: number;
}

export interface Worker extends User {
  specialization: string;
  location: string;
  availability: boolean;
  rating?: number;
  completedJobs: number;
}

// Post & Feed Types
export interface Post {
  id: string;
  authorId: string;
  author: Farmer | Expert;
  content: string;
  images?: string[];
  createdAt: Date;
  updatedAt: Date;
  likes: number;
  comments: number;
  shares: number;
  liked?: boolean;
}

export interface Comment {
  id: string;
  postId: string;
  authorId: string;
  author: User;
  content: string;
  createdAt: Date;
  likes: number;
}

export interface Like {
  id: string;
  userId: string;
  postId?: string;
  commentId?: string;
  createdAt: Date;
}

// Marketplace Types
export interface Product {
  id: string;
  title: string;
  description: string;
  category: 'seeds' | 'fertilizer' | 'pesticide' | 'equipment' | 'other';
  price: number;
  originalPrice?: number;
  image: string;
  sellerId: string;
  seller: Farmer;
  location: string;
  rating?: number;
  reviews: number;
  inStock: boolean;
  createdAt: Date;
}

export interface Equipment {
  id: string;
  title: string;
  description: string;
  image: string;
  ownerId: string;
  owner: Farmer;
  pricePerDay: number;
  location: string;
  available: boolean;
  rating?: number;
  createdAt: Date;
}

export interface Booking {
  id: string;
  equipmentId: string;
  equipment: Equipment;
  farmerId: string;
  farmer: Farmer;
  startDate: Date;
  endDate: Date;
  totalCost: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: Date;
}

// Weather Types
export interface Weather {
  location: string;
  pincode: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  feelsLike: number;
  icon: string;
  timestamp: Date;
}

export interface WeatherForecast {
  location: string;
  pincode: string;
  forecast: DailyForecast[];
  lastUpdated: Date;
}

export interface DailyForecast {
  date: Date;
  minTemp: number;
  maxTemp: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  icon: string;
  rainfall?: number;
}

export interface WeatherAlert {
  id: string;
  farmerId: string;
  type: 'rain' | 'frost' | 'hail' | 'wind' | 'temperature';
  severity: 'low' | 'medium' | 'high';
  message: string;
  createdAt: Date;
  acknowledged: boolean;
}

// Community Types
export interface Community {
  id: string;
  name: string;
  description: string;
  icon?: string;
  members: number;
  createdBy: string;
  createdAt: Date;
  private: boolean;
}

export interface CommunityMember {
  id: string;
  communityId: string;
  userId: string;
  user: User;
  role: 'admin' | 'moderator' | 'member';
  joinedAt: Date;
}

// Message Types
export interface Message {
  id: string;
  senderId: string;
  sender: User;
  recipientId: string;
  recipient: User;
  content: string;
  image?: string;
  timestamp: Date;
  read: boolean;
}

export interface Conversation {
  id: string;
  participants: string[];
  lastMessage?: Message;
  lastMessageTime?: Date;
  unreadCount: number;
  createdAt: Date;
}

// Crop & Diagnostics Types
export interface Crop {
  id: string;
  name: string;
  season: 'kharif' | 'rabi' | 'zaid';
  soilType: string[];
  waterRequirement: string;
  duration: number;
  minTemperature: number;
  maxTemperature: number;
  diseases?: Disease[];
}

export interface Disease {
  id: string;
  name: string;
  symptom: string;
  treatment: string;
  severity: 'mild' | 'moderate' | 'severe';
}

export interface CropDiagnosis {
  id: string;
  farmerId: string;
  farmer: Farmer;
  cropId: string;
  crop: Crop;
  image: string;
  diagnosis: string;
  confidence: number;
  diseaseFound?: string;
  treatment?: string;
  createdAt: Date;
}

// Scheme Types
export interface GovernmentScheme {
  id: string;
  title: string;
  description: string;
  eligibility: string;
  benefits: string;
  applyURL: string;
  deadline: Date;
  category: string;
  createdAt: Date;
}

// Notification Types
export interface Notification {
  id: string;
  userId: string;
  type: 'like' | 'comment' | 'follow' | 'message' | 'alert' | 'booking';
  title: string;
  message: string;
  relatedId?: string;
  relatedType?: string;
  read: boolean;
  createdAt: Date;
}

// Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

// Form Types
export interface LoginFormData {
  phone: string;
  otp: string;
}

export interface RegisterFormData {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: 'farmer' | 'expert' | 'worker';
}

export interface ProfileFormData {
  name: string;
  bio?: string;
  avatar?: string;
  pincode?: string;
  location?: string;
  crops?: string[];
}
