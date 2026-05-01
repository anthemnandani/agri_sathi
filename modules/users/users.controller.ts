import { IApiResponse, IUser } from '@/lib/types';
import { usersService } from './users.service';
import {
  successResponse,
  paginatedResponse,
  createdResponse,
  errorResponse,
  extractPaginationParams,
} from '@/lib/helpers/api-response';
import {
  validateRequestBody,
  mapErrorToResponse,
} from '@/lib/helpers/error-handler';
import { RegisterSchema, UserFilterSchema } from '@/lib/validation/schemas';

/**
 * Users Controller - handles HTTP requests for user operations
 */
export class UsersController {
  /**
   * Get all users with pagination
   */
  static async getUsers(
    searchParams: Record<string, string | string[] | undefined>
  ): Promise<Response> {
    try {
      const pagination = extractPaginationParams(searchParams);
      const filters = await validateRequestBody(
        new Request(null as any, {
          method: 'POST',
          body: JSON.stringify({
            page: pagination.page,
            limit: pagination.limit,
          }),
        }),
        UserFilterSchema
      );

      const result = await usersService.paginate(
        filters.page,
        filters.limit
      );

      return paginatedResponse(
        result.items,
        result.page,
        result.limit,
        result.total
      );
    } catch (error) {
      const { statusCode, code, message } = mapErrorToResponse(error);
      return errorResponse(statusCode, code, message);
    }
  }

  /**
   * Get user by ID
   */
  static async getUser(userId: string): Promise<Response> {
    try {
      const user = await usersService.getById(userId);
      return successResponse(user);
    } catch (error) {
      const { statusCode, code, message } = mapErrorToResponse(error);
      return errorResponse(statusCode, code, message);
    }
  }

  /**
   * Create new user (register)
   */
  static async createUser(req: Request): Promise<Response> {
    try {
      const data = await validateRequestBody(req, RegisterSchema);
      const user = await usersService.register({
        name: data.name,
        email: data.email,
        phone: data.phone,
        password: data.password,
        role: data.role,
      });

      return createdResponse(user, 'User registered successfully');
    } catch (error) {
      const { statusCode, code, message } = mapErrorToResponse(error);
      return errorResponse(statusCode, code, message);
    }
  }

  /**
   * Update user
   */
  static async updateUser(userId: string, req: Request): Promise<Response> {
    try {
      const updates = await req.json();
      const user = await usersService.update(userId, updates);
      return successResponse(user);
    } catch (error) {
      const { statusCode, code, message } = mapErrorToResponse(error);
      return errorResponse(statusCode, code, message);
    }
  }

  /**
   * Delete user
   */
  static async deleteUser(userId: string): Promise<Response> {
    try {
      await usersService.delete(userId);
      return successResponse(null, 'User deleted successfully');
    } catch (error) {
      const { statusCode, code, message } = mapErrorToResponse(error);
      return errorResponse(statusCode, code, message);
    }
  }

  /**
   * Login user
   */
  static async login(req: Request): Promise<Response> {
    try {
      const { email, password } = await req.json();
      const user = await usersService.login(email, password);
      return successResponse(user);
    } catch (error) {
      const { statusCode, code, message } = mapErrorToResponse(error);
      return errorResponse(statusCode, code, message);
    }
  }

  /**
   * Get user by email
   */
  static async getUserByEmail(email: string): Promise<Response> {
    try {
      const user = await usersService.findByEmail(email);
      return successResponse(user);
    } catch (error) {
      const { statusCode, code, message } = mapErrorToResponse(error);
      return errorResponse(statusCode, code, message);
    }
  }

  /**
   * Get user statistics
   */
  static async getUserStats(): Promise<Response> {
    try {
      const stats = await usersService.getUserStats();
      return successResponse(stats);
    } catch (error) {
      const { statusCode, code, message } = mapErrorToResponse(error);
      return errorResponse(statusCode, code, message);
    }
  }

  /**
   * Search users
   */
  static async searchUsers(query: string): Promise<Response> {
    try {
      const results = await usersService.searchUsers(query);
      return successResponse(results);
    } catch (error) {
      const { statusCode, code, message } = mapErrorToResponse(error);
      return errorResponse(statusCode, code, message);
    }
  }

  /**
   * Suspend user
   */
  static async suspendUser(userId: string): Promise<Response> {
    try {
      const user = await usersService.suspendUser(userId);
      return successResponse(user, 'User suspended successfully');
    } catch (error) {
      const { statusCode, code, message } = mapErrorToResponse(error);
      return errorResponse(statusCode, code, message);
    }
  }

  /**
   * Reactivate user
   */
  static async reactivateUser(userId: string): Promise<Response> {
    try {
      const user = await usersService.reactivateUser(userId);
      return successResponse(user, 'User reactivated successfully');
    } catch (error) {
      const { statusCode, code, message } = mapErrorToResponse(error);
      return errorResponse(statusCode, code, message);
    }
  }

  /**
   * Verify user email
   */
  static async verifyEmail(userId: string): Promise<Response> {
    try {
      const user = await usersService.verifyEmail(userId);
      return successResponse(user, 'Email verified successfully');
    } catch (error) {
      const { statusCode, code, message } = mapErrorToResponse(error);
      return errorResponse(statusCode, code, message);
    }
  }
}
