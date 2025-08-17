// Import React library
import React from 'react';

// Import useForm from react-hook-form (used for handling forms easily)
import { useForm } from 'react-hook-form';

// Import yupResolver for schema-based validation
import { yupResolver } from '@hookform/resolvers/yup';

// Import Redux hooks: useDispatch (to trigger actions) and useSelector (to read state)
import { useDispatch, useSelector } from 'react-redux';

// Import navigation hook to redirect users after login
import { useNavigate } from 'react-router-dom';

// Import the validation schema for login form
import { loginSchema } from '../../../utils/validationSchemas';

// Import the loginUser async thunk from Redux slice
import { loginUser } from '../../../features/auth/authSlice';

// Import reusable Button and Input components
import Button from '../../common/Button';
import Input from '../../common/Input';

// Define the LoginForm functional component
const LoginForm = () => {
  // Initialize dispatch for triggering Redux actions
  const dispatch = useDispatch();

  // Initialize navigate for programmatic route navigation
  const navigate = useNavigate();

  // Extract status and error state from auth slice in Redux store
  const { status, error } = useSelector((state) => state.auth);

  // Initialize react-hook-form with yup validation schema
  const {
    register,          // Registers input fields for form handling
    handleSubmit,      // Handles form submission
    formState: { errors }, // Stores validation errors
  } = useForm({
    resolver: yupResolver(loginSchema), // Use yup schema for validation
  });
  
  // Determine if the form is currently submitting based on Redux status
  const isSubmitting = status === 'loading';

  // Function that runs when form is submitted
  const onSubmit = (credentials) => {
    // Dispatch loginUser action with form data
    dispatch(loginUser(credentials))
      .unwrap() // Unwraps the promise returned by Redux Toolkit
      .then(() => {
        // If login successful → redirect user to dashboard
        navigate('/dashboard');
      })
      .catch((err) => {
        // If login fails → log error in console
        console.error('Failed to login:', err);
      });
  };

  // Return JSX for the form UI
  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      {/* Input field for Email */}
      <Input 
        label="Email Address" 
        name="email" 
        type="email" 
        register={register} 
        errors={errors} 
        placeholder="admin@test.com" 
      />

      {/* Input field for Password */}
      <Input 
        label="Password" 
        name="password" 
        type="password" 
        register={register} 
        errors={errors} 
        placeholder="Password123!" 
      />

      {/* Show error message if login failed */}
      {status === 'failed' && <p className="text-sm text-red-600">{error}</p>}

      {/* Submit button */}
      <div>
        <Button type="submit" isLoading={isSubmitting}>
          Sign In
        </Button>
      </div>
    </form>
  );
};

// Export LoginForm so it can be used in other components
export default LoginForm;
