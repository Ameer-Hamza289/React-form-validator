# React Form Validator

A lightweight and easy-to-use form validation library for React.

## Installation

Install the library using npm:

```sh
npm install react-form-validator-mini

```

## Usage

Here’s a simple example of how to use the react-form-validator in your project.

### Setting Up

First, import the necessary hooks and validators:

```sh
import React from 'react';
import { useValidation, ValidationSchema } from 'react-form-validator';
import { required, email, minLength, maxLength, regex } from 'react-form-validator/validators';

```

### Define Validation Schema

Create a validation schema that defines the validation rules for each field:

```sh
const schema: ValidationSchema = {
  username: [
    required('Username is required'),
    minLength(3, 'Username must be at least 3 characters long'),
    maxLength(15, 'Username cannot exceed 15 characters')
  ],
  email: [
    required('Email is required'),
    email('Please enter a valid email address')
  ],
  password: [
    required('Password is required'),
    minLength(6, 'Password must be at least 6 characters long')
  ],
  confirmPassword: [
    required('Confirm Password is required'),
    regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/, 'Password must contain at least one uppercase letter, one lowercase letter, and one number')
  ],
};

```

### Create a Form Component

Use the 'useValidation' hook in your form component to manage validation

```sh
const MyForm: React.FC = () => {
  const { values, errors, handleChange, handleSubmit } = useValidation(schema);

  const onSubmit = () => {
    // handle form submission
    console.log("Form Submitted", values);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Username:</label>
        <input name="username" onChange={handleChange} />
        {errors.username && <p>{errors.username}</p>}
      </div>
      <div>
        <label>Email:</label>
        <input name="email" onChange={handleChange} />
        {errors.email && <p>{errors.email}</p>}
      </div>
      <div>
        <label>Password:</label>
        <input name="password" type="password" onChange={handleChange} />
        {errors.password && <p>{errors.password}</p>}
      </div>
      <div>
        <label>Confirm Password:</label>
        <input name="confirmPassword" type="password" onChange={handleChange} />
        {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default MyForm;

```

### Validation Functions

The library provides several built-in validation functions that you can use:

required(message?: string): Validates that a field is not empty.
email(message?: string): Validates that a field contains a valid email address.
minLength(length: number, message?: string): Validates that a field contains at least a certain number of characters.
maxLength(length: number, message?: string): Validates that a field contains no more than a certain number of characters.
regex(pattern: RegExp, message?: string): Validates that a field matches a given regular expression.

## Example Usage

Here’s a complete example of how to use the library:

```sh
import React from 'react';
import { useValidation, ValidationSchema } from 'react-form-validator';
import { required, email, minLength, maxLength, regex } from 'react-form-validator/validators';

const schema: ValidationSchema = {
  username: [
    required('Username is required'),
    minLength(3, 'Username must be at least 3 characters long'),
    maxLength(15, 'Username cannot exceed 15 characters')
  ],
  email: [
    required('Email is required'),
    email('Please enter a valid email address')
  ],
  password: [
    required('Password is required'),
    minLength(6, 'Password must be at least 6 characters long')
  ],
  confirmPassword: [
    required('Confirm Password is required'),
    regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/, 'Password must contain at least one uppercase letter, one lowercase letter, and one number')
  ],
};

const MyForm: React.FC = () => {
  const { values, errors, handleChange, handleSubmit } = useValidation(schema);

  const onSubmit = () => {
    // handle form submission
    console.log("Form Submitted", values);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Username:</label>
        <input name="username" onChange={handleChange} />
        {errors.username && <p>{errors.username}</p>}
      </div>
      <div>
        <label>Email:</label>
        <input name="email" onChange={handleChange} />
        {errors.email && <p>{errors.email}</p>}
      </div>
      <div>
        <label>Password:</label>
        <input name="password" type="password" onChange={handleChange} />
        {errors.password && <p>{errors.password}</p>}
      </div>
      <div>
        <label>Confirm Password:</label>
        <input name="confirmPassword" type="password" onChange={handleChange} />
        {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default MyForm;

```

## Contribution

Feel free to contribute to the project by opening issues or submitting pull requests. We welcome all improvements and suggestions.

<!-- ## License

This project is licensed under the MIT License. -->
