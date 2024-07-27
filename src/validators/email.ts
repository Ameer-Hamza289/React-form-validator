 type Validator = (value: string) => string | null;

export const email = (message: string = 'Please enter a valid email address'): Validator => (value: string) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(value) ? null : message;
};