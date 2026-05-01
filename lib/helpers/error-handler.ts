import {
  ApiError,
  ValidationError,
  NotFoundError,
  UnauthorizedError,
  ForbiddenError,
  ConflictError,
  InternalServerError,
} from '../types';
import { ERROR_CODES, HTTP_STATUS } from '../constants';
import { createLogger } from './logger';

const logger = createLogger('ErrorHandler');

/**
 * Map error types to appropriate HTTP status codes and response structures
 */
export function mapErrorToResponse(error: unknown): {
  statusCode: number;
  code: string;
  message: string;
  details?: Record<string, any>;
} {
  if (error instanceof ApiError) {
    return {
      statusCode: error.statusCode,
      code: error.code,
      message: error.message,
      details: error.details,
    };
  }

  if (error instanceof SyntaxError) {
    return {
      statusCode: HTTP_STATUS.BAD_REQUEST,
      code: ERROR_CODES.INVALID_INPUT,
      message: 'Invalid JSON in request body',
    };
  }

  if (error instanceof TypeError) {
    return {
      statusCode: HTTP_STATUS.BAD_REQUEST,
      code: ERROR_CODES.INVALID_INPUT,
      message: error.message,
    };
  }

  if (error instanceof ReferenceError) {
    logger.error('Reference error:', error);
    return {
      statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      code: ERROR_CODES.INTERNAL_SERVER_ERROR,
      message: 'Internal server error',
    };
  }

  // Default error handling
  logger.error('Unknown error type:', error);
  return {
    statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
    code: ERROR_CODES.INTERNAL_SERVER_ERROR,
    message: 'An unexpected error occurred',
  };
}

/**
 * Assert condition, throw validation error if false
 */
export function assert(
  condition: boolean,
  message: string,
  details?: Record<string, any>
): asserts condition {
  if (!condition) {
    throw new ValidationError(message, details);
  }
}

/**
 * Assert resource exists, throw not found error if not
 */
export function assertExists<T>(
  resource: T | null | undefined,
  resourceName: string,
  id?: string
): asserts resource is T {
  if (!resource) {
    throw new NotFoundError(resourceName, id);
  }
}

/**
 * Assert user is authorized
 */
export function assertAuthorized(
  condition: boolean,
  message = 'Unauthorized'
): asserts condition {
  if (!condition) {
    throw new UnauthorizedError(message);
  }
}

/**
 * Assert user has permission
 */
export function assertHasPermission(
  condition: boolean,
  message = 'Insufficient permissions'
): asserts condition {
  if (!condition) {
    throw new ForbiddenError(message);
  }
}

/**
 * Wrap async function with error handling
 */
export async function tryCatch<T>(
  fn: () => Promise<T>,
  context?: string
): Promise<{ data?: T; error?: ApiError }> {
  try {
    const data = await fn();
    return { data };
  } catch (error) {
    const mappedError = mapErrorToResponse(error);
    const apiError = new ApiError(
      mappedError.statusCode,
      mappedError.code,
      mappedError.message,
      mappedError.details
    );

    if (context) {
      logger.error(`${context}: ${apiError.message}`, error);
    }

    return { error: apiError };
  }
}

/**
 * Validate required fields in object
 */
export function validateRequiredFields(
  obj: Record<string, any>,
  requiredFields: string[]
): { valid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  for (const field of requiredFields) {
    if (!obj[field] || (typeof obj[field] === 'string' && !obj[field].trim())) {
      errors[field] = `${field} is required`;
    }
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Parse and handle database errors
 */
export function handleDatabaseError(error: any): ApiError {
  const message = error?.message || 'Database operation failed';

  // Handle specific database error codes
  if (error?.code === 'UNIQUE_VIOLATION' || error?.code === '23505') {
    return new ConflictError('This resource already exists');
  }

  if (error?.code === 'NOT_NULL_VIOLATION' || error?.code === '23502') {
    const field = error?.column || 'unknown field';
    return new ValidationError(`${field} cannot be null`);
  }

  if (error?.code === 'FOREIGN_KEY_VIOLATION' || error?.code === '23503') {
    return new ValidationError('Referenced resource does not exist');
  }

  // Default database error
  logger.error('Database error:', error);
  return new InternalServerError('Database operation failed');
}

/**
 * Graceful error recovery
 */
export async function withFallback<T>(
  primaryFn: () => Promise<T>,
  fallbackFn: () => Promise<T> | T
): Promise<T> {
  try {
    return await primaryFn();
  } catch (error) {
    logger.warn('Primary operation failed, using fallback', error);
    return await fallbackFn();
  }
}

/**
 * Retry operation with exponential backoff
 */
export async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  maxAttempts = 3,
  initialDelayMs = 1000
): Promise<T> {
  let lastError: Error | undefined;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      
      if (attempt < maxAttempts) {
        const delayMs = initialDelayMs * Math.pow(2, attempt - 1);
        logger.warn(`Attempt ${attempt} failed, retrying in ${delayMs}ms`, { error: lastError.message });
        await new Promise(resolve => setTimeout(resolve, delayMs));
      }
    }
  }

  throw lastError || new Error('Max retries exceeded');
}

/**
 * Create a timeout promise
 */
export function withTimeout<T>(
  promise: Promise<T>,
  timeoutMs: number
): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(
        () => reject(new Error(`Operation timed out after ${timeoutMs}ms`)),
        timeoutMs
      )
    ),
  ]);
}

/**
 * Sanitize error message for client response
 */
export function sanitizeErrorMessage(error: any): string {
  if (error instanceof ApiError) {
    return error.message;
  }

  if (error instanceof Error) {
    // Don't expose internal error messages to client
    const message = error.message.toLowerCase();
    if (message.includes('database') || message.includes('connection')) {
      return 'A database error occurred';
    }
    if (message.includes('unauthorized') || message.includes('forbidden')) {
      return error.message;
    }
  }

  return 'An unexpected error occurred';
}

/**
 * Get error details for logging
 */
export function getErrorDetails(error: any): Record<string, any> {
  if (error instanceof ApiError) {
    return {
      code: error.code,
      message: error.message,
      statusCode: error.statusCode,
      details: error.details,
    };
  }

  if (error instanceof Error) {
    return {
      name: error.name,
      message: error.message,
      stack: error.stack,
    };
  }

  return {
    error: String(error),
  };
}
