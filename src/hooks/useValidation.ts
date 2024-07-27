import { useState } from 'react';

type Validator = (value: string) => string | null;

interface Schema {
  [key: string]: Validator[];
}

interface ValidationResult {
  [key: string]: string | null;
}

export const useValidation = (schema: Schema) => {
  const [values, setValues] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<ValidationResult>({});

  const validate = (field: string, value: string): string | null => {
    const rules = schema[field];
    if (!rules) return null;

    for (let rule of rules) {
      const error = rule(value);
      if (error) {
        return error;
      }
    }
    return null;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validate(name, value),
    }));
  };

  const handleSubmit = (callback: () => void) => (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors: ValidationResult = {};
    let hasErrors = false;

    for (let field in schema) {
      const error = validate(field, values[field] || '');
      if (error) {
        newErrors[field] = error;
        hasErrors = true;
      }
    }

    setErrors(newErrors);

    if (!hasErrors) {
      callback();
    }
  };

  return {
    values,
    errors,
    handleChange,
    handleSubmit,
  };
};

