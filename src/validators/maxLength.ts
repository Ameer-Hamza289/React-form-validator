type Validator = (value: string) => string | null;
export const maxLength = (max: number, message: string = `Maximum length is ${max} characters`): Validator => (value: string) => {
  return value.length <= max ? null : message;
};