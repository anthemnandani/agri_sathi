/**
 * Component-specific formatting utilities
 */

export function formatDisplayValue(value: any): string {
  if (value === null || value === undefined) return '-';
  if (typeof value === 'boolean') return value ? 'Yes' : 'No';
  if (typeof value === 'number') return value.toLocaleString();
  if (typeof value === 'object') return JSON.stringify(value);
  return String(value);
}

export function formatTableData<T extends Record<string, any>>(
  data: T[],
  fieldFormatters?: Record<string, (value: any) => string>
): T[] {
  return data.map(row => {
    const formatted = { ...row };
    if (fieldFormatters) {
      Object.entries(fieldFormatters).forEach(([field, formatter]) => {
        if (field in formatted) {
          (formatted as any)[field] = formatter((formatted as any)[field]);
        }
      });
    }
    return formatted;
  });
}
