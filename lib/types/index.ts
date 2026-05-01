// User Types
export enum UserRole {
  ADMIN = 'admin',
  FARMER = 'farmer',
  BUYER = 'buyer',
  WORKER = 'worker',
  EXPERT = 'expert',
}

export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  SUSPENDED = 'suspended',
  PENDING = 'pending',
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  status: UserStatus;
  avatar?: string;
  joinDate: string;
  lastActive: string;
  verified: boolean;
  activityScore: number;
  successRate: number;
  createdAt: string;
  updatedAt: string;
}

// Auth Types
export interface IAuthPayload {
  userId: string;
  email: string;
  role: UserRole;
  iat: number;
  exp: number;
}

export interface ILoginRequest {
  email: string;
  password: string;
}

export interface ILoginResponse {
  success: boolean;
  token?: string;
  user?: Omit<IUser, 'password'>;
  message?: string;
}

// Crops Types
export enum CropCategory {
  CEREALS = 'cereals',
  PULSES = 'pulses',
  VEGETABLES = 'vegetables',
  FRUITS = 'fruits',
  OILSEEDS = 'oilseeds',
  SPICES = 'spices',
}

export enum Season {
  KHARIF = 'kharif',
  RABI = 'rabi',
  ZAID = 'zaid',
}

export enum WaterNeed {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}

export interface ICrop {
  id: string;
  name: string;
  scientificName: string;
  category: CropCategory;
  season: Season;
  duration: string;
  waterNeed: WaterNeed;
  temperature: { min: number; max: number };
  soilType: string[];
  commonDiseases: string[];
  pestManagement: string[];
  harvestTime: string;
  yield: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

// Marketplace Types
export enum ProductStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  SOLD = 'sold',
  DELISTED = 'delisted',
}

export interface IProduct {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  quantity: number;
  unit: string;
  sellerId: string;
  status: ProductStatus;
  images: string[];
  createdAt: string;
  updatedAt: string;
}

export interface IBooking {
  id: string;
  productId: string;
  buyerId: string;
  quantity: number;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

// Reports Types
export enum ReportType {
  SALES = 'sales',
  USERS = 'users',
  PRODUCTS = 'products',
  RENTALS = 'rentals',
  COMMUNITIES = 'communities',
  REVENUE = 'revenue',
}

export enum ReportStatus {
  PENDING = 'pending',
  READY = 'ready',
  FAILED = 'failed',
}

export interface IReport {
  id: string;
  name: string;
  type: ReportType;
  generatedBy: string;
  generatedAt: string;
  dateRange: { start: string; end: string };
  metrics: {
    totalValue: number;
    change: number;
    changePercent: number;
  };
  dataPoints: { label: string; value: number }[];
  status: ReportStatus;
  createdAt: string;
  updatedAt: string;
}

// Community Types
export interface ICommunity {
  id: string;
  name: string;
  description: string;
  category: string;
  members: string[];
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface IPost {
  id: string;
  communityId: string;
  authorId: string;
  title: string;
  content: string;
  images?: string[];
  likes: number;
  comments: number;
  status: 'published' | 'draft' | 'archived';
  createdAt: string;
  updatedAt: string;
}

// API Response Types
export interface IApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: Record<string, any>;
  };
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    timestamp?: string;
  };
}

export interface IPaginationQuery {
  page?: number;
  limit?: number;
  sort?: string;
  order?: 'asc' | 'desc';
}

// Background Job Types
export enum JobStatus {
  QUEUED = 'queued',
  RUNNING = 'running',
  COMPLETED = 'completed',
  FAILED = 'failed',
  CANCELLED = 'cancelled',
}

export enum JobType {
  DATA_SYNC = 'data_sync',
  REPORT_GENERATION = 'report_generation',
  EMAIL_BROADCAST = 'email_broadcast',
  IMAGE_PROCESSING = 'image_processing',
  DATA_CLEANUP = 'data_cleanup',
}

export interface IBackgroundJob {
  id: string;
  name: string;
  type: JobType;
  status: JobStatus;
  progress: number;
  startTime: string;
  endTime?: string;
  duration?: string;
  errorMessage?: string;
  logsUrl: string;
  triggeredBy: string;
  createdAt: string;
  updatedAt: string;
}

// Weather Alert Types
export enum AlertType {
  WARNING = 'warning',
  ADVISORY = 'advisory',
  WATCH = 'watch',
}

export enum AlertSeverity {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical',
}

export enum AlertStatus {
  ACTIVE = 'active',
  EXPIRED = 'expired',
  SCHEDULED = 'scheduled',
}

export interface IWeatherAlert {
  id: string;
  title: string;
  type: AlertType;
  severity: AlertSeverity;
  regions: string[];
  message: string;
  startDate: string;
  endDate: string;
  status: AlertStatus;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

// Request Context Types
export interface IRequestContext {
  userId?: string;
  user?: IUser;
  role?: UserRole;
  ip?: string;
  userAgent?: string;
}

// Error Types
export class ApiError extends Error {
  constructor(
    public statusCode: number,
    public code: string,
    message: string,
    public details?: Record<string, any>
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export class ValidationError extends ApiError {
  constructor(message: string, details?: Record<string, any>) {
    super(400, 'VALIDATION_ERROR', message, details);
    this.name = 'ValidationError';
  }
}

export class NotFoundError extends ApiError {
  constructor(resource: string, id?: string) {
    const message = id ? `${resource} with id ${id} not found` : `${resource} not found`;
    super(404, 'NOT_FOUND', message);
    this.name = 'NotFoundError';
  }
}

export class UnauthorizedError extends ApiError {
  constructor(message = 'Unauthorized') {
    super(401, 'UNAUTHORIZED', message);
    this.name = 'UnauthorizedError';
  }
}

export class ForbiddenError extends ApiError {
  constructor(message = 'Forbidden') {
    super(403, 'FORBIDDEN', message);
    this.name = 'ForbiddenError';
  }
}

export class ConflictError extends ApiError {
  constructor(message: string, details?: Record<string, any>) {
    super(409, 'CONFLICT', message, details);
    this.name = 'ConflictError';
  }
}

export class InternalServerError extends ApiError {
  constructor(message = 'Internal server error') {
    super(500, 'INTERNAL_SERVER_ERROR', message);
    this.name = 'InternalServerError';
  }
}
