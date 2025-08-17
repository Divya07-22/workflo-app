// Import React and useEffect hook
import React, { useEffect } from 'react';
// Import useForm hook from react-hook-form for form handling
import { useForm } from 'react-hook-form';
// Import yupResolver to connect yup validation schema with react-hook-form
import { yupResolver } from '@hookform/resolvers/yup';
// Import user validation schema
import { userSchema } from '../../../utils/validationSchemas';
// Import custom Input component
import Input from '../../common/Input';
// Import custom Button component
import Button from '../../common/Button';

// Define UserForm component with props
const UserForm = ({ onSubmit, onCancel, isSubmitting, initialData = null }) => {
  // Initialize useForm with validation schema and default values
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(userSchema), // use yup schema for validation
    defaultValues: initialData || { name: '', email: '', role: 'Employee' }, // set default values
  });

  // Reset form when initialData changes (e.g., editing user data)
  useEffect(() => {
    reset(initialData); // update form fields with new data
  }, [initialData, reset]);

  // Return form UI
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Input field for Full Name */}
      <Input label="Full Name" name="name" register={register} errors={errors} />
      
      {/* Input field for Email */}
      <Input label="Email" name="email" type="email" register={register} errors={errors} />
      
      {/* Dropdown for selecting Role */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Role</label>
        <select 
          {...register('role')} // register role field for validation
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 
          focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm 
          dark:bg-gray-900 dark:border-gray-600 dark:text-gray-300"
        >
          <option>Employee</option>
          <option>Manager</option>
          <option>Admin</option>
        </select>
        {/* Show validation error if role is invalid */}
        {errors.role && <p className="mt-1 text-sm text-red-600">{errors.role.message}</p>}
      </div>

      {/* Action buttons */}
      <div className="flex justify-end space-x-2 pt-4">
        {/* Cancel button (does not submit form) */}
        <Button onClick={onCancel} variant="secondary" type="button">Cancel</Button>
        
        {/* Submit button (shows loading state if submitting) */}
        <Button type="submit" isLoading={isSubmitting}>
          {initialData ? 'Save Changes' : 'Create User'} {/* Change text based on edit/create */}
        </Button>
      </div>
    </form>
  );
};

// Export the UserForm component
export default UserForm;
