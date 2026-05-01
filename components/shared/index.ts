/**
 * Shared Components Index
 * 
 * Re-exports commonly used components and provides a single entry point
 * for shared UI elements across the application
 */

// Re-export UI components
export * from '@/components/ui/button';
export * from '@/components/ui/input';
export * from '@/components/ui/select';
export * from '@/components/ui/card';
export * from '@/components/ui/badge';
export * from '@/components/ui/dialog';
export * from '@/components/ui/dropdown-menu';
export * from '@/components/ui/form';
export * from '@/components/ui/label';
export * from '@/components/ui/table';
export * from '@/components/ui/tabs';

// Common component types
export interface SharedComponentProps {
  className?: string;
  disabled?: boolean;
  loading?: boolean;
}

export interface TableColumn<T> {
  key: keyof T;
  label: string;
  render?: (value: any, row: T) => React.ReactNode;
  sortable?: boolean;
  width?: string;
}

export interface PaginationProps {
  page: number;
  limit: number;
  total: number;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
}

export interface FilterOption {
  label: string;
  value: string | number;
}

export interface SearchProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onSearch?: (query: string) => void;
}

// Hook exports
export * from './hooks';

// Utility exports
export * from './utils';
