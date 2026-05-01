/**
 * @fileoverview New API route structure using refactored service layer
 * 
 * This follows the pattern:
 * Route Handler → Controller → Service → Data Layer
 * 
 * Migration Path:
 * - Old routes continue to work as-is
 * - New routes use /api/v1/* path
 * - Gradually migrate routes to use services and controllers
 * - Eventually deprecate and remove old routes
 */

import { NextRequest, NextResponse } from 'next/server';
import { UsersController } from '@/modules/users/users.controller';
import { handleError } from '@/lib/helpers/api-response';
import { createLogger } from '@/lib/helpers/logger';

const logger = createLogger('UsersAPI');

/**
 * GET /api/v1/users
 * Retrieve all users with pagination support
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    logger.info('GET /api/v1/users');
    const searchParams = Object.fromEntries(request.nextUrl.searchParams);
    return await UsersController.getUsers(searchParams);
  } catch (error) {
    logger.error('GET /api/v1/users error:', error);
    return handleError(error);
  }
}

/**
 * POST /api/v1/users
 * Create a new user (register)
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    logger.info('POST /api/v1/users');
    return await UsersController.createUser(request);
  } catch (error) {
    logger.error('POST /api/v1/users error:', error);
    return handleError(error);
  }
}

/**
 * PUT /api/v1/users/[id]
 * Update a user
 * Note: Handled by separate route file for [id]/route.ts
 */

/**
 * DELETE /api/v1/users/[id]
 * Delete a user
 * Note: Handled by separate route file for [id]/route.ts
 */
