import { BaseService } from '@/lib/services/base.service';
import { IUser, UserRole, UserStatus, ValidationError, NotFoundError } from '@/lib/types';
import { hashPassword, comparePassword } from '@/lib/helpers/auth';
import { users as mockUsers } from '@/lib/admin-data';

/**
 * Users Service - handles all user-related operations
 */
export class UsersService extends BaseService<IUser> {
  constructor() {
    super('User', mockUsers);
  }

  /**
   * Register a new user
   */
  async register(data: {
    name: string;
    email: string;
    phone: string;
    password: string;
    role: UserRole;
  }): Promise<IUser> {
    // Check if email already exists
    const existing = this.data.find(u => u.email === data.email);
    if (existing) {
      throw new ValidationError('Email already registered', { email: data.email });
    }

    const hashedPassword = hashPassword(data.password);
    const newUser: IUser = {
      id: this.generateId(),
      name: data.name,
      email: data.email,
      phone: data.phone,
      role: data.role,
      status: UserStatus.PENDING,
      verified: false,
      activityScore: 50,
      successRate: 0,
      joinDate: new Date().toISOString(),
      lastActive: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      avatar: undefined,
    } as IUser;

    this.data.push(newUser);
    return newUser;
  }

  /**
   * Login user
   */
  async login(email: string, password: string): Promise<IUser> {
    const user = this.data.find(u => u.email === email);
    if (!user) {
      throw new ValidationError('Invalid email or password');
    }

    if (user.status === UserStatus.SUSPENDED) {
      throw new ValidationError('Account has been suspended');
    }

    // In real implementation, would hash and compare
    if (!comparePassword(password, hashPassword(password))) {
      throw new ValidationError('Invalid email or password');
    }

    // Update last active
    user.lastActive = new Date().toISOString();
    return user;
  }

  /**
   * Get user by email
   */
  async findByEmail(email: string): Promise<IUser> {
    const user = this.data.find(u => u.email === email);
    if (!user) {
      throw new NotFoundError('User', `email: ${email}`);
    }
    return user;
  }

  /**
   * Get users by role
   */
  async findByRole(role: UserRole): Promise<IUser[]> {
    return this.data.filter(u => u.role === role);
  }

  /**
   * Get users by status
   */
  async findByStatus(status: UserStatus): Promise<IUser[]> {
    return this.data.filter(u => u.status === status);
  }

  /**
   * Verify user email
   */
  async verifyEmail(userId: string): Promise<IUser> {
    const user = await this.getById(userId);
    return this.update(userId, {
      verified: true,
      status: UserStatus.ACTIVE,
    });
  }

  /**
   * Suspend user
   */
  async suspendUser(userId: string, reason?: string): Promise<IUser> {
    const user = await this.getById(userId);
    return this.update(userId, {
      status: UserStatus.SUSPENDED,
    });
  }

  /**
   * Reactivate suspended user
   */
  async reactivateUser(userId: string): Promise<IUser> {
    const user = await this.getById(userId);
    return this.update(userId, {
      status: UserStatus.ACTIVE,
    });
  }

  /**
   * Update user activity
   */
  async updateActivity(userId: string): Promise<IUser> {
    const user = await this.getById(userId);
    return this.update(userId, {
      lastActive: new Date().toISOString(),
    });
  }

  /**
   * Update user activity score
   */
  async updateActivityScore(userId: string, score: number): Promise<IUser> {
    const user = await this.getById(userId);
    const currentScore = user.activityScore || 0;
    const newScore = Math.min(100, Math.max(0, currentScore + score));
    
    return this.update(userId, {
      activityScore: newScore,
    });
  }

  /**
   * Update user success rate
   */
  async updateSuccessRate(userId: string, totalTransactions: number, successful: number): Promise<IUser> {
    const user = await this.getById(userId);
    const successRate = totalTransactions > 0 ? (successful / totalTransactions) * 100 : 0;
    
    return this.update(userId, {
      successRate: Math.round(successRate * 100) / 100,
    });
  }

  /**
   * Search users
   */
  async searchUsers(query: string): Promise<IUser[]> {
    return this.search(query, ['name', 'email', 'phone'] as any);
  }

  /**
   * Filter users
   */
  async filterUsers(filters: {
    role?: UserRole;
    status?: UserStatus;
    verified?: boolean;
    search?: string;
  }): Promise<IUser[]> {
    let results = [...this.data];

    if (filters.role) {
      results = results.filter(u => u.role === filters.role);
    }

    if (filters.status) {
      results = results.filter(u => u.status === filters.status);
    }

    if (filters.verified !== undefined) {
      results = results.filter(u => u.verified === filters.verified);
    }

    if (filters.search) {
      const lowerSearch = filters.search.toLowerCase();
      results = results.filter(u =>
        u.name.toLowerCase().includes(lowerSearch) ||
        u.email.toLowerCase().includes(lowerSearch) ||
        u.phone.includes(lowerSearch)
      );
    }

    return results;
  }

  /**
   * Get user statistics
   */
  async getUserStats(): Promise<{
    total: number;
    byRole: Record<UserRole, number>;
    byStatus: Record<UserStatus, number>;
    verified: number;
  }> {
    return {
      total: this.data.length,
      byRole: {
        [UserRole.ADMIN]: this.data.filter(u => u.role === UserRole.ADMIN).length,
        [UserRole.FARMER]: this.data.filter(u => u.role === UserRole.FARMER).length,
        [UserRole.BUYER]: this.data.filter(u => u.role === UserRole.BUYER).length,
        [UserRole.WORKER]: this.data.filter(u => u.role === UserRole.WORKER).length,
        [UserRole.EXPERT]: this.data.filter(u => u.role === UserRole.EXPERT).length,
      },
      byStatus: {
        [UserStatus.ACTIVE]: this.data.filter(u => u.status === UserStatus.ACTIVE).length,
        [UserStatus.INACTIVE]: this.data.filter(u => u.status === UserStatus.INACTIVE).length,
        [UserStatus.SUSPENDED]: this.data.filter(u => u.status === UserStatus.SUSPENDED).length,
        [UserStatus.PENDING]: this.data.filter(u => u.status === UserStatus.PENDING).length,
      },
      verified: this.data.filter(u => u.verified).length,
    };
  }

  /**
   * Bulk status update
   */
  async bulkUpdateStatus(userIds: string[], status: UserStatus): Promise<IUser[]> {
    return Promise.all(
      userIds.map(id => this.update(id, { status }))
    );
  }

  /**
   * Delete inactive users (older than 90 days)
   */
  async deleteInactiveUsers(daysThreshold: number = 90): Promise<number> {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysThreshold);

    const toDelete = this.data.filter(
      u => new Date(u.lastActive) < cutoffDate && u.status === UserStatus.INACTIVE
    );

    await this.bulkDelete(toDelete.map(u => u.id));
    return toDelete.length;
  }
}

/**
 * Export singleton instance
 */
export const usersService = new UsersService();
