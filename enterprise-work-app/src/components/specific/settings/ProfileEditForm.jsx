// Import React library to build the component
import React from 'react';

// Import the useForm hook from react-hook-form for handling form logic
import { useForm } from 'react-hook-form';

// Import hooks from react-redux to interact with the Redux store
import { useSelector, useDispatch } from 'react-redux';

// Import yupResolver to connect Yup validation with react-hook-form
import { yupResolver } from '@hookform/resolvers/yup';

// Import a predefined validation schema for the profile form
import { profileSchema } from '../../../utils/validationSchemas';

// Import Redux slice actions and selectors for user authentication
import { selectCurrentUser, updateUserProfile } from '../../../features/auth/authSlice';

// Import custom Input component for form fields
import Input from '../../common/Input';

// Import custom Button component for submit action
import Button from '../../common/Button';

// Define the ProfileEditForm component
const ProfileEditForm = () => {

  // Get the dispatch function to trigger Redux actions
  const dispatch = useDispatch();

  // Get the currently logged-in user's data from Redux store
  const user = useSelector(selectCurrentUser);

  // Setup form handling with react-hook-form
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    // Apply Yup validation schema for form validation
    resolver: yupResolver(profileSchema),
    // Pre-fill default values with existing user data if available
    defaultValues: {
      name: user?.name || '',   // If user has a name, use it, else empty string
      email: user?.email || '', // If user has an email, use it, else empty string
    },
  });

  // Function to handle form submission
  const onSubmit = (data) => {
    // Dispatch action to update user profile in Redux store with new values
    dispatch(updateUserProfile({ ...user, ...data }));
  };

  // Render the form UI
  return (
    // Form wrapper with handleSubmit from react-hook-form
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      
      {/* Input field for Full Name */}
      <Input label="Full Name" name="name" register={register} errors={errors} />

      {/* Input field for Email Address */}
      <Input label="Email Address" name="email" type="email" register={register} errors={errors} />

      {/* Submit button container with padding */}
      <div className="pt-2">
        {/* Custom button that shows loading state if form is submitting */}
        <Button type="submit" isLoading={isSubmitting}>Save Changes</Button>
      </div>
    </form>
  );
};

// Export the component so it can be used in other parts of the app
export default ProfileEditForm;
