import { required, email } from './validators';

type Validator = (value: any) => string | null;

export type ValidationSchema = {
  [field: string]: Validator[];
};

export const validate = (schema: ValidationSchema, values: { [key: string]: any }): { [key: string]: string | null } => {
  const errors: { [key: string]: string | null } = {};

  for (const field in schema) {
    if (schema.hasOwnProperty(field)) {
      const validators = schema[field];
      const value = values[field];
      
      for (const validator of validators) {
        const error = validator(value);
        if (error) {
          errors[field] = error;
          break;
        }
      }
    }
  }

  return errors;
};
