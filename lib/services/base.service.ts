import { IApiResponse, NotFoundError, ValidationError } from '../types';
import { CACHE_KEYS, CACHE_TTL } from '../constants';

/**
 * Base service class with common CRUD operations
 * All feature services should extend this class
 */
export abstract class BaseService<T extends { id: string }> {
  protected resourceName: string;
  protected data: T[] = [];

  constructor(resourceName: string, initialData?: T[]) {
    this.resourceName = resourceName;
    this.data = initialData || [];
  }

  /**
   * Get all resources
   */
  async getAll(filters?: Record<string, any>): Promise<T[]> {
    let results = this.data;

    if (filters) {
      results = results.filter(item => {
        return Object.entries(filters).every(([key, value]) => {
          if (value === undefined || value === null) return true;
          return (item as any)[key] === value;
        });
      });
    }

    return results;
  }

  /**
   * Get single resource by ID
   */
  async getById(id: string): Promise<T> {
    const item = this.data.find(item => item.id === id);
    if (!item) {
      throw new NotFoundError(this.resourceName, id);
    }
    return item;
  }

  /**
   * Create new resource
   */
  async create(payload: Omit<T, 'id' | 'createdAt' | 'updatedAt'>): Promise<T> {
    const now = new Date().toISOString();
    const newItem: T = {
      ...payload,
      id: this.generateId(),
      createdAt: now,
      updatedAt: now,
    } as T;

    this.data.push(newItem);
    return newItem;
  }

  /**
   * Update resource
   */
  async update(id: string, payload: Partial<T>): Promise<T> {
    const index = this.data.findIndex(item => item.id === id);
    if (index === -1) {
      throw new NotFoundError(this.resourceName, id);
    }

    const now = new Date().toISOString();
    const updated: T = {
      ...this.data[index],
      ...payload,
      id,
      updatedAt: now,
    };

    this.data[index] = updated;
    return updated;
  }

  /**
   * Delete resource
   */
  async delete(id: string): Promise<boolean> {
    const index = this.data.findIndex(item => item.id === id);
    if (index === -1) {
      throw new NotFoundError(this.resourceName, id);
    }

    this.data.splice(index, 1);
    return true;
  }

  /**
   * Check if resource exists
   */
  async exists(id: string): Promise<boolean> {
    return this.data.some(item => item.id === id);
  }

  /**
   * Count resources matching criteria
   */
  async count(filters?: Record<string, any>): Promise<number> {
    const items = await this.getAll(filters);
    return items.length;
  }

  /**
   * Search resources by text
   */
  async search(query: string, searchFields: (keyof T)[]): Promise<T[]> {
    const lowerQuery = query.toLowerCase();
    return this.data.filter(item =>
      searchFields.some(field => {
        const value = (item[field] as any);
        if (typeof value === 'string') {
          return value.toLowerCase().includes(lowerQuery);
        }
        return false;
      })
    );
  }

  /**
   * Paginate resources
   */
  async paginate(
    page: number = 1,
    limit: number = 10,
    filters?: Record<string, any>
  ): Promise<{ items: T[]; total: number; page: number; limit: number; pages: number }> {
    const items = await this.getAll(filters);
    const total = items.length;
    const pages = Math.ceil(total / limit);
    const skip = (page - 1) * limit;

    return {
      items: items.slice(skip, skip + limit),
      total,
      page,
      limit,
      pages,
    };
  }

  /**
   * Bulk create resources
   */
  async bulkCreate(payloads: Omit<T, 'id' | 'createdAt' | 'updatedAt'>[]): Promise<T[]> {
    return Promise.all(payloads.map(payload => this.create(payload)));
  }

  /**
   * Bulk update resources
   */
  async bulkUpdate(updates: { id: string; data: Partial<T> }[]): Promise<T[]> {
    return Promise.all(updates.map(({ id, data }) => this.update(id, data)));
  }

  /**
   * Bulk delete resources
   */
  async bulkDelete(ids: string[]): Promise<boolean> {
    for (const id of ids) {
      try {
        await this.delete(id);
      } catch (error) {
        console.error(`Failed to delete ${this.resourceName} with id ${id}:`, error);
      }
    }
    return true;
  }

  /**
   * Validate resource data
   */
  protected validateData(data: any, requiredFields: string[]): void {
    for (const field of requiredFields) {
      if (!data[field]) {
        throw new ValidationError(`${field} is required`);
      }
    }
  }

  /**
   * Generate unique ID
   */
  protected generateId(): string {
    return `${this.resourceName}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Handle service errors
   */
  protected handleError(error: unknown): never {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error(`${this.resourceName} service error: ${String(error)}`);
  }

  /**
   * Clear all data (for testing)
   */
  async clear(): Promise<void> {
    this.data = [];
  }

  /**
   * Get service statistics
   */
  async getStats(): Promise<{ total: number; resourceName: string }> {
    return {
      total: this.data.length,
      resourceName: this.resourceName,
    };
  }
}

/**
 * Generic service factory
 */
export function createService<T extends { id: string }>(
  resourceName: string,
  initialData?: T[]
): BaseService<T> {
  return new BaseService<T>(resourceName, initialData);
}
