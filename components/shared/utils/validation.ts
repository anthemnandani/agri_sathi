/**
 * Component props validation utilities
 */

export function validateComponentProps(
  props: any,
  requiredProps: string[]
): { valid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  for (const prop of requiredProps) {
    if (props[prop] === undefined || props[prop] === null) {
      errors[prop] = `${prop} is required`;
    }
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}
