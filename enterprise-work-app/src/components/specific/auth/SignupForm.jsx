// Import React library to build the component
import React from 'react';
// Import useForm hook from react-hook-form for handling form state and validation
import { useForm } from 'react-hook-form';
// Import yupResolver to connect Yup validation schema with react-hook-form
import { yupResolver } from '@hookform/resolvers/yup';
// Import Redux hooks to dispatch actions and access state
import { useDispatch, useSelector } from 'react-redux';
// Import useNavigate from react-router-dom for programmatic navigation
import { useNavigate } from 'react-router-dom';
// Import custom Yup validation schema for signup
import { signupSchema } from '../../../utils/validationSchemas';
// Import signup action from Redux slice
import { signupUser } from '../../../features/auth/authSlice';
// Import custom reusable Button component
import Button from '../../common/Button';
// Import custom reusable Input component
import Input from '../../common/Input';

// Define the SignupForm component
const SignupForm = () => {
  // Initialize Redux dispatch function
  const dispatch = useDispatch();
  // Initialize navigation function
  const navigate = useNavigate();
  // Get authentication status and error from Redux store
  const { status, error } = useSelector((state) => state.auth);

  // Setup form with validation using react-hook-form and Yup
  const {
    register,          // Function to register input fields
    handleSubmit,      // Function to handle form submission
    formState: { errors }, // Holds validation errors for inputs
  } = useForm({
    resolver: yupResolver(signupSchema), // Connect Yup schema for validation
    defaultValues: {
        role: 'Employee', // Default role set to Employee
    }
  });

  // Track if form is currently submitting (loading state from Redux)
  const isSubmitting = status === 'loading';

  // Handle form submission
  const onSubmit = (data) => {
    // Dispatch signup action with form data
    dispatch(signupUser(data))
      .unwrap() // Unwraps the async thunk result (gives raw resolved value or error)
      .then(() => {
        // Navigate to dashboard if signup successful
        navigate('/dashboard');
      })
      .catch((err) => {
        // Log error if signup fails
        console.error('Failed to sign up:', err);
      });
  };

  // Render the signup form
  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      {/* Input field for Full Name */}
      <Input label="Full Name" name="name" type="text" register={register} errors={errors} />
      {/* Input field for Email */}
      <Input label="Email Address" name="email" type="email" register={register} errors={errors} />
      {/* Input field for Password */}
      <Input label="Password" name="password" type="password" register={register} errors={errors} />
      
      {/* Dropdown for selecting user role */}
      <div>
        <label htmlFor="role" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Role
        </label>
        <select
          id="role"
          {...register('role')} // Register select field with react-hook-form
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 
                     focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm 
                     dark:bg-gray-900 dark:border-gray-600 dark:text-gray-300"
        >
          <option>Employee</option>
          <option>Manager</option>
          <option>Admin</option>
        </select>
        {/* Show error if role is not valid */}
        {errors.role && <p className="mt-1 text-sm text-red-600">{errors.role.message}</p>}
      </div>

      {/* Show error message from Redux if signup fails */}
      {status === 'failed' && <p className="text-sm text-red-600">{error}</p>}
      
      {/* Submit button (disabled & shows loader when submitting) */}
      <Button type="submit" isLoading={isSubmitting}>
        Sign Up
      </Button>
    </form>
  );
};

// Export SignupForm so it can be used in other components
export default SignupForm;
