type Validator = (value: string) => string | null;

export const minLength = (min: number, message: string = `Minimum length is ${min} characters`): Validator => (value: string) => {
  return value.length >= min ? null : message;
};