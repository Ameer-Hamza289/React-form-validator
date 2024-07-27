import { renderHook, act } from '@testing-library/react-hooks';
import { useValidation } from './useValidation';
import { required, email, minLength, maxLength, regex } from '../validators';

const schema = {
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

describe('useValidation', () => {
  it('validates required fields correctly', () => {
    const { result } = renderHook(() => useValidation(schema));
    
    act(() => {
      result.current.handleChange({ target: { name: 'username', value: '' } } as React.ChangeEvent<HTMLInputElement>);
    });
    
    expect(result.current.errors.username).toBe('Username is required');
  });

  it('validates email fields correctly', () => {
    const { result } = renderHook(() => useValidation(schema));
    
    act(() => {
      result.current.handleChange({ target: { name: 'email', value: 'invalidemail' } } as React.ChangeEvent<HTMLInputElement>);
    });
    
    expect(result.current.errors.email).toBe('Please enter a valid email address');
  });

  it('validates minLength fields correctly', () => {
    const { result } = renderHook(() => useValidation(schema));
    
    act(() => {
      result.current.handleChange({ target: { name: 'password', value: '123' } } as React.ChangeEvent<HTMLInputElement>);
    });
    
    expect(result.current.errors.password).toBe('Password must be at least 6 characters long');
  });

  it('validates maxLength fields correctly', () => {
    const { result } = renderHook(() => useValidation(schema));
    
    act(() => {
      result.current.handleChange({ target: { name: 'username', value: 'thisusernameiswaytoolong' } } as React.ChangeEvent<HTMLInputElement>);
    });
    
    expect(result.current.errors.username).toBe('Username cannot exceed 15 characters');
  });

  it('validates regex fields correctly', () => {
    const { result } = renderHook(() => useValidation(schema));
    
    act(() => {
      result.current.handleChange({ target: { name: 'confirmPassword', value: 'password' } } as React.ChangeEvent<HTMLInputElement>);
    });
    
    expect(result.current.errors.confirmPassword).toBe('Password must contain at least one uppercase letter, one lowercase letter, and one number');
  });

  it('handles valid form submission', () => {
    const { result } = renderHook(() => useValidation(schema));
    const mockCallback = jest.fn();

    act(() => {
      result.current.handleChange({ target: { name: 'username', value: 'validUser' } } as React.ChangeEvent<HTMLInputElement>);
      result.current.handleChange({ target: { name: 'email', value: 'valid@example.com' } } as React.ChangeEvent<HTMLInputElement>);
      result.current.handleChange({ target: { name: 'password', value: 'ValidPass123' } } as React.ChangeEvent<HTMLInputElement>);
      result.current.handleChange({ target: { name: 'confirmPassword', value: 'ValidPass123' } } as React.ChangeEvent<HTMLInputElement>);
    });

    act(() => {
      result.current.handleSubmit(mockCallback)({ preventDefault: () => {} } as React.FormEvent<HTMLFormElement>);
    });

    expect(mockCallback).toHaveBeenCalled();
  });

  it('handles invalid form submission', () => {
    const { result } = renderHook(() => useValidation(schema));
    const mockCallback = jest.fn();

    act(() => {
      result.current.handleChange({ target: { name: 'username', value: '' } } as React.ChangeEvent<HTMLInputElement>);
    });

    act(() => {
      result.current.handleSubmit(mockCallback)({ preventDefault: () => {} } as React.FormEvent<HTMLFormElement>);
    });

    expect(mockCallback).not.toHaveBeenCalled();
    expect(result.current.errors.username).toBe('Username is required');
  });
});
