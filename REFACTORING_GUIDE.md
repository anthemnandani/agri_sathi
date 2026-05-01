# Production-Grade Refactoring Guide

## Overview

This document outlines the comprehensive refactoring of the Agri Sathi application into a production-grade, scalable architecture.

## Architecture

### Directory Structure

```
project/
├── lib/
│   ├── types/              # Central type definitions
│   ├── constants/          # Application constants
│   ├── validation/         # Zod schemas for validation
│   ├── services/           # Base service class
│   └── helpers/            # Utility functions
│       ├── api-response.ts # API response helpers
│       ├── auth.ts         # Authentication utilities
│       ├── error-handler.ts # Error handling
│       ├── logger.ts       # Logging utilities
│       └── utils.ts        # General utilities
├── modules/                # Feature modules
│   ├── users/
│   │   ├── users.service.ts
│   │   └── users.controller.ts
│   ├── crops/
│   │   ├── crops.service.ts
│   │   └── crops.controller.ts
│   ├── reports/
│   │   ├── reports.service.ts
│   │   └── reports.controller.ts
│   ├── marketplace/
│   ├── communities/
│   └── auth/
├── app/
│   ├── api/
│   │   ├── (old routes continue to work)
│   │   └── v1/             # New refactored routes
│   │       ├── users/
│   │       ├── crops/
│   │       ├── reports/
│   │       └── ...
│   └── (existing pages)
└── components/
```

### Layers

#### 1. Routes (Request Handler)
- Receive HTTP requests
- Log requests
- Delegate to controllers
- Handle errors

#### 2. Controllers
- Parse and validate request data
- Coordinate service calls
- Format responses
- Implement business logic orchestration

#### 3. Services
- Extend BaseService for CRUD operations
- Implement business logic
- Handle data transformations
- Manage domain rules

#### 4. Data Layer
- Mock data (admin-data.ts) for now
- Can be replaced with actual database queries
- Maintains in-memory state

#### 5. Utilities & Helpers
- Reusable functions across layers
- Error handling
- Logging
- Type validation
- Authentication

## Key Components

### Type System (`lib/types/index.ts`)
Central location for all TypeScript interfaces and types:
- User, Crop, Report, Product, Community types
- API response shapes
- Custom error classes

### Validation (`lib/validation/schemas.ts`)
Zod-based schemas for:
- Request body validation
- Filter parameter validation
- Automatic TypeScript type inference

### Error Handling (`lib/helpers/error-handler.ts`)
Consistent error handling across the application:
- Custom error classes (ValidationError, NotFoundError, etc.)
- Error mapping to HTTP status codes
- Sanitized error messages for clients
- Detailed logging for debugging

### Authentication (`lib/helpers/auth.ts`)
Auth utilities including:
- Token generation/verification
- Role-based permissions
- Password hashing/comparison
- Session management

### Logging (`lib/helpers/logger.ts`)
Structured logging with:
- Different log levels (DEBUG, INFO, WARN, ERROR)
- Context information
- Performance metrics
- Request/response logging

## Service Pattern

### BaseService
All services extend BaseService which provides:
```typescript
- getAll(filters?)
- getById(id)
- create(payload)
- update(id, payload)
- delete(id)
- exists(id)
- count(filters?)
- search(query, fields)
- paginate(page, limit, filters)
- bulkCreate(payloads)
- bulkUpdate(updates)
- bulkDelete(ids)
```

### Creating New Services
```typescript
export class UsersService extends BaseService<IUser> {
  constructor() {
    super('User', initialData);
  }
  
  // Extend with domain-specific methods
  async verifyEmail(userId: string): Promise<IUser> {
    // ...
  }
}

// Export singleton
export const usersService = new UsersService();
```

## Controller Pattern

Controllers act as HTTP handlers:
```typescript
export class UsersController {
  static async getUsers(searchParams: Record<string, any>): Promise<Response> {
    try {
      const results = await usersService.getUsers(searchParams);
      return successResponse(results);
    } catch (error) {
      return handleError(error);
    }
  }
}
```

## API Route Pattern

New routes follow this structure:
```typescript
import { NextRequest } from 'next/server';
import { UsersController } from '@/modules/users/users.controller';
import { handleError } from '@/lib/helpers/api-response';

export async function GET(request: NextRequest) {
  try {
    return await UsersController.getUsers(
      Object.fromEntries(request.nextUrl.searchParams)
    );
  } catch (error) {
    return handleError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    return await UsersController.createUser(request);
  } catch (error) {
    return handleError(error);
  }
}
```

## Migration Strategy

### Phase 1: Foundation ✓
- Create directory structure
- Define types and constants
- Create validation schemas
- Build base service class
- Create helpers and utilities

### Phase 2: Shared Logic ✓
- Extract auth utilities
- Create logger
- Implement error handlers
- Build API response helpers

### Phase 3: Feature Modules ✓
- Create service classes
- Implement controllers
- Add domain-specific logic

### Phase 4: API Refactoring (In Progress)
- Create /api/v1 routes
- Use new service/controller pattern
- Keep old routes working

### Phase 5: Component Cleanup
- Remove dead code
- Consolidate duplicates
- Improve organization

### Phase 6: Testing & Optimization
- Add integration tests
- Performance optimization
- Final cleanup

## Benefits

1. **Maintainability**: Clear separation of concerns
2. **Testability**: Services can be tested independently
3. **Reusability**: Shared utilities across modules
4. **Scalability**: New features can be added as modules
5. **Consistency**: Standard patterns across codebase
6. **Type Safety**: Full TypeScript support
7. **Error Handling**: Consistent error management
8. **Logging**: Centralized logging

## Best Practices

### When Creating New Features
1. Define types in `lib/types/index.ts`
2. Create validation schemas in `lib/validation/schemas.ts`
3. Create service in `modules/{feature}/{feature}.service.ts`
4. Create controller in `modules/{feature}/{feature}.controller.ts`
5. Create routes in `app/api/v1/{feature}/route.ts`

### Service Best Practices
- Always extend BaseService
- Use meaningful method names
- Add JSDoc comments
- Handle errors consistently
- Return typed responses

### Controller Best Practices
- Validate input using schemas
- Use controller methods for each endpoint
- Log important operations
- Return consistent response format
- Handle and convert errors

### Route Best Practices
- Use try-catch for error handling
- Log requests using logger
- Delegate to controller
- Use NextRequest/NextResponse APIs
- Support pagination where applicable

## Constants & Configuration

All application constants are centralized in `lib/constants/index.ts`:
- User roles and permissions
- HTTP status codes
- Pagination settings
- Cache configuration
- Email templates
- File upload constraints
- Rate limiting settings
- Validation rules

## Error Handling

Custom error classes for different scenarios:
```typescript
throw new ValidationError('Invalid email');
throw new NotFoundError('User', userId);
throw new UnauthorizedError('Authentication required');
throw new ForbiddenError('Insufficient permissions');
throw new ConflictError('Email already exists');
throw new InternalServerError('Database error');
```

## Response Format

Consistent API response structure:
```typescript
{
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
    timestamp: string;
  };
}
```

## Next Steps

1. Create remaining service/controller pairs
2. Migrate critical API routes to /api/v1
3. Add request middleware (auth, logging)
4. Implement caching layer
5. Add integration tests
6. Set up monitoring/analytics
7. Gradually deprecate old routes
8. Database integration

## Support

For questions about the refactoring approach, refer to:
- `/v0_plans/production-refactor-strategy.md` - Strategic overview
- Individual service files - Implementation examples
- `lib/helpers/` - Utility documentation
