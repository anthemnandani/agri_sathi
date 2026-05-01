// User Role Permissions
export const ROLE_PERMISSIONS = {
  admin: ['manage_users', 'manage_reports', 'manage_alerts', 'manage_jobs', 'manage_crops'],
  farmer: ['view_crops', 'manage_products', 'view_communities', 'create_posts'],
  buyer: ['browse_products', 'make_bookings', 'view_communities'],
  worker: ['manage_rentals', 'view_tasks', 'update_status'],
  expert: ['provide_advice', 'manage_guides', 'moderate_communities'],
} as const;

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
} as const;

// Pagination Defaults
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100,
} as const;

// Cache Keys
export const CACHE_KEYS = {
  USER: (id: string) => `user:${id}`,
  USERS: 'users:list',
  CROP: (id: string) => `crop:${id}`,
  CROPS: 'crops:list',
  PRODUCT: (id: string) => `product:${id}`,
  PRODUCTS: 'products:list',
  REPORT: (id: string) => `report:${id}`,
  REPORTS: 'reports:list',
  COMMUNITY: (id: string) => `community:${id}`,
  COMMUNITIES: 'communities:list',
  WEATHER_ALERTS: 'weather:alerts',
  BACKGROUND_JOBS: 'jobs:list',
} as const;

// Cache TTL (in seconds)
export const CACHE_TTL = {
  SHORT: 300, // 5 minutes
  MEDIUM: 900, // 15 minutes
  LONG: 3600, // 1 hour
  VERY_LONG: 86400, // 24 hours
} as const;

// Job Types Configuration
export const JOB_CONFIG = {
  MAX_RETRIES: 3,
  TIMEOUT_MS: 300000, // 5 minutes
  QUEUE_SIZE: 1000,
  WORKER_THREADS: 4,
} as const;

// Email Templates
export const EMAIL_TEMPLATES = {
  WELCOME: 'welcome',
  PASSWORD_RESET: 'password-reset',
  BOOKING_CONFIRMATION: 'booking-confirmation',
  REPORT_READY: 'report-ready',
  ALERT_NOTIFICATION: 'alert-notification',
} as const;

// File Upload Config
export const UPLOAD_CONFIG = {
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/webp'],
  ALLOWED_DOCUMENT_TYPES: ['application/pdf', 'application/msword'],
  UPLOAD_DIR: 'uploads',
} as const;

// API Rate Limiting
export const RATE_LIMIT = {
  WINDOW_MS: 15 * 60 * 1000, // 15 minutes
  MAX_REQUESTS: 100,
  SKIP_SUCCESSFUL_REQUESTS: false,
} as const;

// Validation Constraints
export const VALIDATION = {
  MIN_PASSWORD_LENGTH: 8,
  MAX_PASSWORD_LENGTH: 128,
  MAX_NAME_LENGTH: 255,
  MAX_EMAIL_LENGTH: 254,
  MAX_PHONE_LENGTH: 20,
  MAX_DESCRIPTION_LENGTH: 5000,
} as const;

// Date Formats
export const DATE_FORMATS = {
  ISO: 'YYYY-MM-DD',
  DISPLAY: 'DD/MM/YYYY',
  TIME: 'HH:mm:ss',
  DATETIME: 'YYYY-MM-DD HH:mm:ss',
} as const;

// Crop Categories
export const CROP_CATEGORIES = [
  'cereals',
  'pulses',
  'vegetables',
  'fruits',
  'oilseeds',
  'spices',
] as const;

// Seasons
export const SEASONS = [
  'kharif',
  'rabi',
  'zaid',
] as const;

// Water Needs
export const WATER_NEEDS = [
  'low',
  'medium',
  'high',
] as const;

// Product Units
export const PRODUCT_UNITS = [
  'kg',
  'quintal',
  'ton',
  'liter',
  'piece',
  'bundle',
  'bag',
] as const;

// Report Types
export const REPORT_TYPES = [
  'sales',
  'users',
  'products',
  'rentals',
  'communities',
  'revenue',
] as const;

// Error Codes
export const ERROR_CODES = {
  // Auth Errors
  INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
  TOKEN_EXPIRED: 'TOKEN_EXPIRED',
  TOKEN_INVALID: 'TOKEN_INVALID',
  SESSION_EXPIRED: 'SESSION_EXPIRED',

  // Validation Errors
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  INVALID_INPUT: 'INVALID_INPUT',
  MISSING_REQUIRED_FIELD: 'MISSING_REQUIRED_FIELD',

  // Resource Errors
  NOT_FOUND: 'NOT_FOUND',
  ALREADY_EXISTS: 'ALREADY_EXISTS',
  RESOURCE_CONFLICT: 'RESOURCE_CONFLICT',

  // Permission Errors
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  INSUFFICIENT_PERMISSIONS: 'INSUFFICIENT_PERMISSIONS',

  // Server Errors
  INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
  DATABASE_ERROR: 'DATABASE_ERROR',
  EXTERNAL_SERVICE_ERROR: 'EXTERNAL_SERVICE_ERROR',
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  CREATED: 'Resource created successfully',
  UPDATED: 'Resource updated successfully',
  DELETED: 'Resource deleted successfully',
  FETCHED: 'Data retrieved successfully',
} as const;

// Default Values
export const DEFAULTS = {
  PAGE_SIZE: 10,
  SORT_ORDER: 'desc',
  SORT_BY: 'createdAt',
  ACTIVITY_SCORE_INITIAL: 50,
  SUCCESS_RATE_INITIAL: 0,
} as const;
