type Validator = (value: string) => string | null;

export const regex = (pattern: RegExp, message: string = 'Invalid format'): Validator => (value: string) => {
  return pattern.test(value) ? null : message;
};