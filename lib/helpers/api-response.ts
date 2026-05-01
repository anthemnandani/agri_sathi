import { NextResponse } from 'next/server';
import { IApiResponse, ApiError } from '../types';
import { HTTP_STATUS } from '../constants';

/**
 * Create a successful API response
 */
export function successResponse<T>(
  data: T,
  message?: string,
  statusCode = HTTP_STATUS.OK,
  meta?: any
): NextResponse<IApiResponse<T>> {
  return NextResponse.json(
    {
      success: true,
      data,
      meta: meta || {
        timestamp: new Date().toISOString(),
      },
    },
    { status: statusCode }
  );
}

/**
 * Create a paginated success response
 */
export function paginatedResponse<T>(
  data: T[],
  page: number,
  limit: number,
  total: number,
  message?: string
): NextResponse<IApiResponse<T[]>> {
  return NextResponse.json(
    {
      success: true,
      data,
      meta: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
        timestamp: new Date().toISOString(),
      },
    },
    { status: HTTP_STATUS.OK }
  );
}

/**
 * Create a creation success response
 */
export function createdResponse<T>(
  data: T,
  message = 'Resource created successfully'
): NextResponse<IApiResponse<T>> {
  return NextResponse.json(
    {
      success: true,
      data,
      meta: {
        timestamp: new Date().toISOString(),
      },
    },
    { status: HTTP_STATUS.CREATED }
  );
}

/**
 * Create a deletion success response
 */
export function deletedResponse(
  message = 'Resource deleted successfully'
): NextResponse<IApiResponse<null>> {
  return NextResponse.json(
    {
      success: true,
      data: null,
      meta: {
        timestamp: new Date().toISOString(),
      },
    },
    { status: HTTP_STATUS.OK }
  );
}

/**
 * Create an error response
 */
export function errorResponse(
  statusCode: number,
  code: string,
  message: string,
  details?: Record<string, any>
): NextResponse<IApiResponse> {
  return NextResponse.json(
    {
      success: false,
      error: {
        code,
        message,
        details,
      },
      meta: {
        timestamp: new Date().toISOString(),
      },
    },
    { status: statusCode }
  );
}

/**
 * Handle API errors and return appropriate response
 */
export function handleError(error: unknown): NextResponse<IApiResponse> {
  console.error('[API Error]', error);

  if (error instanceof ApiError) {
    return errorResponse(
      error.statusCode,
      error.code,
      error.message,
      error.details
    );
  }

  if (error instanceof SyntaxError) {
    return errorResponse(
      HTTP_STATUS.BAD_REQUEST,
      'PARSE_ERROR',
      'Invalid JSON in request body'
    );
  }

  if (error instanceof Error && error.message.includes('INVALID_TOKEN')) {
    return errorResponse(
      HTTP_STATUS.UNAUTHORIZED,
      'TOKEN_INVALID',
      'Invalid or malformed token'
    );
  }

  // Default error response
  return errorResponse(
    HTTP_STATUS.INTERNAL_SERVER_ERROR,
    'INTERNAL_SERVER_ERROR',
    'An unexpected error occurred',
    process.env.NODE_ENV === 'development'
      ? { message: error instanceof Error ? error.message : String(error) }
      : undefined
  );
}

/**
 * Validate request body against schema
 */
export async function validateRequestBody<T>(
  req: Request,
  schema: any
): Promise<T> {
  try {
    const body = await req.json();
    const validated = schema.parse(body);
    return validated;
  } catch (error: any) {
    if (error.errors) {
      const details: Record<string, string> = {};
      error.errors.forEach((err: any) => {
        const path = err.path.join('.');
        details[path] = err.message;
      });
      throw {
        statusCode: HTTP_STATUS.BAD_REQUEST,
        code: 'VALIDATION_ERROR',
        message: 'Request validation failed',
        details,
      };
    }
    throw error;
  }
}

/**
 * Extract pagination parameters from request
 */
export function extractPaginationParams(searchParams: Record<string, string | string[] | undefined>) {
  const page = parseInt(String(searchParams.page) || '1', 10);
  const limit = parseInt(String(searchParams.limit) || '10', 10);
  const sort = String(searchParams.sort) || 'createdAt';
  const order = (String(searchParams.order) || 'desc') as 'asc' | 'desc';

  return {
    page: Math.max(1, page),
    limit: Math.min(Math.max(1, limit), 100),
    sort,
    order,
    skip: (Math.max(1, page) - 1) * Math.min(Math.max(1, limit), 100),
  };
}

/**
 * Create a 204 No Content response
 */
export function noContentResponse(): NextResponse {
  return new NextResponse(null, { status: HTTP_STATUS.NO_CONTENT });
}

/**
 * Create a redirect response
 */
export function redirectResponse(url: string, status = 302): NextResponse {
  return NextResponse.redirect(url, { status });
}

/**
 * Utility to check if response is successful
 */
export function isSuccessResponse(response: IApiResponse): boolean {
  return response.success === true;
}

/**
 * Utility to throw API error from response
 */
export function throwFromResponse(response: IApiResponse): never {
  if (response.error) {
    throw new ApiError(
      400,
      response.error.code,
      response.error.message,
      response.error.details
    );
  }
  throw new Error('Unknown error occurred');
}
