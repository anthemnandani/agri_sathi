import { IAuthPayload, IUser, UnauthorizedError, ForbiddenError, UserRole } from '../types';

/**
 * Mock token generation (replace with actual JWT in production)
 */
export function generateToken(user: IUser): string {
  const payload: IAuthPayload = {
    userId: user.id,
    email: user.email,
    role: user.role,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60, // 24 hours
  };

  // In production, use jsonwebtoken library
  // return jwt.sign(payload, process.env.JWT_SECRET!);
  
  // For now, return base64 encoded payload
  return Buffer.from(JSON.stringify(payload)).toString('base64');
}

/**
 * Decode and validate token
 */
export function decodeToken(token: string): IAuthPayload {
  try {
    // In production, use jsonwebtoken library
    // return jwt.verify(token, process.env.JWT_SECRET!);
    
    // For now, decode base64
    const payload = JSON.parse(Buffer.from(token, 'base64').toString('utf-8'));
    
    // Check expiration
    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
      throw new UnauthorizedError('Token has expired');
    }

    return payload;
  } catch (error) {
    throw new UnauthorizedError('Invalid or malformed token');
  }
}

/**
 * Extract token from Authorization header
 */
export function extractTokenFromHeader(authHeader?: string): string {
  if (!authHeader) {
    throw new UnauthorizedError('Missing authorization header');
  }

  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0].toLowerCase() !== 'bearer') {
    throw new UnauthorizedError('Invalid authorization header format');
  }

  return parts[1];
}

/**
 * Check if user has required role
 */
export function hasRole(userRole: UserRole, requiredRole: UserRole | UserRole[]): boolean {
  const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
  return roles.includes(userRole);
}

/**
 * Check if user has required permission
 */
export function hasPermission(userRole: UserRole, permission: string): boolean {
  const permissions: Record<UserRole, string[]> = {
    [UserRole.ADMIN]: ['*'], // All permissions
    [UserRole.FARMER]: ['view_crops', 'manage_products', 'view_communities', 'create_posts'],
    [UserRole.BUYER]: ['browse_products', 'make_bookings', 'view_communities'],
    [UserRole.WORKER]: ['manage_rentals', 'view_tasks', 'update_status'],
    [UserRole.EXPERT]: ['provide_advice', 'manage_guides', 'moderate_communities'],
  };

  const userPermissions = permissions[userRole] || [];
  return userPermissions.includes('*') || userPermissions.includes(permission);
}

/**
 * Verify user permission, throws error if not allowed
 */
export function verifyPermission(
  userRole: UserRole,
  requiredPermission: string
): void {
  if (!hasPermission(userRole, requiredPermission)) {
    throw new ForbiddenError(
      `User does not have required permission: ${requiredPermission}`
    );
  }
}

/**
 * Hash password (mock - use bcrypt in production)
 */
export function hashPassword(password: string): string {
  // In production, use bcrypt
  // return bcrypt.hashSync(password, 10);
  
  // Mock hash
  return Buffer.from(password).toString('base64');
}

/**
 * Compare password with hash (mock - use bcrypt in production)
 */
export function comparePassword(password: string, hash: string): boolean {
  // In production, use bcrypt
  // return bcrypt.compareSync(password, hash);
  
  // Mock comparison
  return Buffer.from(password).toString('base64') === hash;
}

/**
 * Generate secure random token for password reset
 */
export function generateResetToken(): string {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
}

/**
 * Create session data
 */
export function createSessionData(user: IUser) {
  return {
    userId: user.id,
    email: user.email,
    role: user.role,
    name: user.name,
    avatar: user.avatar,
  };
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate password strength
 */
export function validatePasswordStrength(password: string): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }

  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }

  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }

  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number');
  }

  if (!/[!@#$%^&*]/.test(password)) {
    errors.push('Password must contain at least one special character (!@#$%^&*)');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Generate secure session ID
 */
export function generateSessionId(): string {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15) +
         Date.now().toString(36);
}

/**
 * Verify IP address hasn't changed (basic security check)
 */
export function verifyIpAddress(storedIp: string | undefined, currentIp: string): boolean {
  if (!storedIp) return true;
  return storedIp === currentIp;
}

/**
 * Check if user account is active
 */
export function isAccountActive(userStatus: string): boolean {
  return userStatus === 'active' || userStatus === 'verified';
}

/**
 * Check if user account is suspended
 */
export function isAccountSuspended(userStatus: string): boolean {
  return userStatus === 'suspended';
}

/**
 * Get user initials for avatar
 */
export function getUserInitials(name: string): string {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
}

/**
 * Sanitize user data for response (remove sensitive info)
 */
export function sanitizeUserData(user: IUser) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role,
    status: user.status,
    avatar: user.avatar,
    joinDate: user.joinDate,
    lastActive: user.lastActive,
    verified: user.verified,
    activityScore: user.activityScore,
    successRate: user.successRate,
  };
}
