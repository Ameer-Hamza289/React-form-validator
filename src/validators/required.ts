type Validator = (value: string) => string | null;

export const required = (message: string = 'This field is required'): Validator => (value: string) => {
  return value.trim() ? null : message;
};