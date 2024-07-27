export { required, email, minLength, maxLength, regex } from './validators';
export { validate, ValidationSchema } from './schema';
export {useValidation } from './hooks/useValidation';

export const greet = (name: string): string => `Hello, ${name}!`;

