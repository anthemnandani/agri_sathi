import { z } from 'zod';
import { VALIDATION } from '../constants';

// Auth Schemas
export const LoginSchema = z.object({
  email: z
    .string('Email is required')
    .email('Invalid email address')
    .max(VALIDATION.MAX_EMAIL_LENGTH),
  password: z
    .string('Password is required')
    .min(VALIDATION.MIN_PASSWORD_LENGTH, `Password must be at least ${VALIDATION.MIN_PASSWORD_LENGTH} characters`),
});

export const RegisterSchema = LoginSchema.extend({
  name: z
    .string('Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(VALIDATION.MAX_NAME_LENGTH),
  phone: z
    .string('Phone is required')
    .regex(/^[0-9\-\+\(\)\s]+$/, 'Invalid phone number format')
    .max(VALIDATION.MAX_PHONE_LENGTH),
  role: z.enum(['farmer', 'buyer', 'worker', 'expert']),
});

export const PasswordResetSchema = z.object({
  email: z.string().email('Invalid email address'),
});

export const NewPasswordSchema = z.object({
  token: z.string().min(1, 'Token is required'),
  password: z
    .string('Password is required')
    .min(VALIDATION.MIN_PASSWORD_LENGTH, `Password must be at least ${VALIDATION.MIN_PASSWORD_LENGTH} characters`),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

// User Schemas
export const UpdateUserSchema = z.object({
  name: z.string().min(2).max(VALIDATION.MAX_NAME_LENGTH).optional(),
  phone: z.string().regex(/^[0-9\-\+\(\)\s]+$/).optional(),
  avatar: z.string().url().optional(),
}).strict();

export const UserFilterSchema = z.object({
  role: z.enum(['admin', 'farmer', 'buyer', 'worker', 'expert']).optional(),
  status: z.enum(['active', 'inactive', 'suspended', 'pending']).optional(),
  search: z.string().optional(),
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(10),
});

// Crop Schemas
export const CreateCropSchema = z.object({
  name: z.string().min(2).max(VALIDATION.MAX_NAME_LENGTH),
  scientificName: z.string().min(2),
  category: z.enum(['cereals', 'pulses', 'vegetables', 'fruits', 'oilseeds', 'spices']),
  season: z.enum(['kharif', 'rabi', 'zaid']),
  duration: z.string().min(1),
  waterNeed: z.enum(['low', 'medium', 'high']),
  temperature: z.object({
    min: z.number().min(-50).max(50),
    max: z.number().min(-50).max(50),
  }),
  soilType: z.array(z.string()).min(1),
  commonDiseases: z.array(z.string()).optional(),
  pestManagement: z.array(z.string()).optional(),
  harvestTime: z.string().min(1),
  yield: z.string().min(1),
  description: z.string().max(VALIDATION.MAX_DESCRIPTION_LENGTH),
});

export const UpdateCropSchema = CreateCropSchema.partial();

export const CropFilterSchema = z.object({
  category: z.enum(['cereals', 'pulses', 'vegetables', 'fruits', 'oilseeds', 'spices']).optional(),
  season: z.enum(['kharif', 'rabi', 'zaid']).optional(),
  waterNeed: z.enum(['low', 'medium', 'high']).optional(),
  search: z.string().optional(),
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(10),
});

// Product Schemas
export const CreateProductSchema = z.object({
  name: z.string().min(2).max(VALIDATION.MAX_NAME_LENGTH),
  description: z.string().max(VALIDATION.MAX_DESCRIPTION_LENGTH),
  category: z.string().min(1),
  price: z.number().positive('Price must be positive'),
  quantity: z.number().positive('Quantity must be positive'),
  unit: z.enum(['kg', 'quintal', 'ton', 'liter', 'piece', 'bundle', 'bag']),
  images: z.array(z.string().url()).optional(),
});

export const UpdateProductSchema = CreateProductSchema.partial();

export const ProductFilterSchema = z.object({
  category: z.string().optional(),
  minPrice: z.number().min(0).optional(),
  maxPrice: z.number().min(0).optional(),
  sellerId: z.string().optional(),
  status: z.enum(['active', 'inactive', 'sold', 'delisted']).optional(),
  search: z.string().optional(),
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(10),
});

// Booking Schemas
export const CreateBookingSchema = z.object({
  productId: z.string().min(1, 'Product ID is required'),
  quantity: z.number().positive('Quantity must be positive'),
});

export const UpdateBookingSchema = z.object({
  status: z.enum(['pending', 'confirmed', 'completed', 'cancelled']),
});

// Community Schemas
export const CreateCommunitySchema = z.object({
  name: z.string().min(2).max(VALIDATION.MAX_NAME_LENGTH),
  description: z.string().max(VALIDATION.MAX_DESCRIPTION_LENGTH),
  category: z.string().min(1),
});

export const UpdateCommunitySchema = CreateCommunitySchema.partial();

// Post Schemas
export const CreatePostSchema = z.object({
  communityId: z.string().min(1, 'Community ID is required'),
  title: z.string().min(3).max(VALIDATION.MAX_NAME_LENGTH),
  content: z.string().min(10).max(VALIDATION.MAX_DESCRIPTION_LENGTH),
  images: z.array(z.string().url()).optional(),
});

export const UpdatePostSchema = CreatePostSchema.partial();

export const PostFilterSchema = z.object({
  communityId: z.string().optional(),
  authorId: z.string().optional(),
  status: z.enum(['published', 'draft', 'archived']).optional(),
  search: z.string().optional(),
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(10),
});

// Report Schemas
export const CreateReportSchema = z.object({
  name: z.string().min(2).max(VALIDATION.MAX_NAME_LENGTH),
  type: z.enum(['sales', 'users', 'products', 'rentals', 'communities', 'revenue']),
  dateRange: z.object({
    start: z.string().datetime(),
    end: z.string().datetime(),
  }),
});

export const ReportFilterSchema = z.object({
  type: z.enum(['sales', 'users', 'products', 'rentals', 'communities', 'revenue']).optional(),
  status: z.enum(['pending', 'ready', 'failed']).optional(),
  search: z.string().optional(),
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(10),
});

// Weather Alert Schemas
export const CreateWeatherAlertSchema = z.object({
  title: z.string().min(2).max(VALIDATION.MAX_NAME_LENGTH),
  type: z.enum(['warning', 'advisory', 'watch']),
  severity: z.enum(['low', 'medium', 'high', 'critical']),
  regions: z.array(z.string()).min(1, 'At least one region is required'),
  message: z.string().max(VALIDATION.MAX_DESCRIPTION_LENGTH),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
}).refine(data => new Date(data.endDate) > new Date(data.startDate), {
  message: 'End date must be after start date',
  path: ['endDate'],
});

export const UpdateWeatherAlertSchema = CreateWeatherAlertSchema.partial();

export const WeatherAlertFilterSchema = z.object({
  type: z.enum(['warning', 'advisory', 'watch']).optional(),
  severity: z.enum(['low', 'medium', 'high', 'critical']).optional(),
  status: z.enum(['active', 'expired', 'scheduled']).optional(),
  search: z.string().optional(),
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(10),
});

// Background Job Schemas
export const JobFilterSchema = z.object({
  type: z.enum(['data_sync', 'report_generation', 'email_broadcast', 'image_processing', 'data_cleanup']).optional(),
  status: z.enum(['queued', 'running', 'completed', 'failed', 'cancelled']).optional(),
  search: z.string().optional(),
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(10),
});

// Pagination Schema
export const PaginationSchema = z.object({
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(10),
  sort: z.string().optional(),
  order: z.enum(['asc', 'desc']).default('desc'),
});

// Type exports for better IDE support
export type LoginInput = z.infer<typeof LoginSchema>;
export type RegisterInput = z.infer<typeof RegisterSchema>;
export type CreateCropInput = z.infer<typeof CreateCropSchema>;
export type CreateProductInput = z.infer<typeof CreateProductSchema>;
export type CreateBookingInput = z.infer<typeof CreateBookingSchema>;
export type CreateCommunityInput = z.infer<typeof CreateCommunitySchema>;
export type CreatePostInput = z.infer<typeof CreatePostSchema>;
export type CreateReportInput = z.infer<typeof CreateReportSchema>;
export type CreateWeatherAlertInput = z.infer<typeof CreateWeatherAlertSchema>;
export type UserFilterInput = z.infer<typeof UserFilterSchema>;
export type CropFilterInput = z.infer<typeof CropFilterSchema>;
export type ProductFilterInput = z.infer<typeof ProductFilterSchema>;
export type PostFilterInput = z.infer<typeof PostFilterSchema>;
export type ReportFilterInput = z.infer<typeof ReportFilterSchema>;
export type WeatherAlertFilterInput = z.infer<typeof WeatherAlertFilterSchema>;
export type JobFilterInput = z.infer<typeof JobFilterSchema>;
export type PaginationInput = z.infer<typeof PaginationSchema>;
