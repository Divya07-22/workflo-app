// Import React library
import React, { useState } from 'react';

// Import useForm hook from react-hook-form for handling form input
import { useForm } from 'react-hook-form';

// Import useDispatch hook to dispatch Redux actions
import { useDispatch } from 'react-redux';

// Import yupResolver to connect Yup validation with react-hook-form
import { yupResolver } from '@hookform/resolvers/yup';

// Import password validation schema from utility file
import { passwordChangeSchema } from '../../../utils/validationSchemas';

// Import Redux action for changing user password
import { changeUserPassword } from '../../../features/auth/authSlice';

// Import custom Input and Button components
import Input from '../../common/Input';
import Button from '../../common/Button';

// Functional component for the change password form
const ChangePasswordForm = () => {
  // Initialize Redux dispatch function
  const dispatch = useDispatch();

  // Local state to hold any API error message
  const [apiError, setApiError] = useState(null);

  // Initialize useForm with Yup validation schema
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm({
    resolver: yupResolver(passwordChangeSchema),
  });

  // Function to handle form submission
  const onSubmit = async (data) => {
    setApiError(null); // Clear any previous error before submitting
    try {
      // Dispatch Redux action to update password
      await dispatch(changeUserPassword(data)).unwrap();
      
      // Reset the form fields on success
      reset();
    } catch (error) {
      // If backend/API returns an error, save it in state
      setApiError(error);
    }
  };

  return (
    // Form with submit handler
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      
      {/* Input field for current password */}
      <Input label="Current Password" name="currentPassword" type="password" register={register} errors={errors} />
      
      {/* Input field for new password */}
      <Input label="New Password" name="newPassword" type="password" register={register} errors={errors} />
      
      {/* Input field for confirm new password */}
      <Input label="Confirm New Password" name="confirmPassword" type="password" register={register} errors={errors} />
      
      {/* Display API error message if present */}
      {apiError && <p className="mt-2 text-sm text-red-600">{apiError}</p>}

      {/* Submit button with loading state */}
      <div className="pt-2">
        <Button type="submit" isLoading={isSubmitting}>Update Password</Button>
      </div>
    </form>
  );
};

// Export the component for use in other files
export default ChangePasswordForm;
