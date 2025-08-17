// Import necessary dependencies from React and Redux
import React, { useState } from 'react';   // React core + useState hook for managing local state
import { useDispatch } from 'react-redux'; // useDispatch hook to trigger Redux actions

// Import the updateUser action from the users slice (Redux store logic)
import { updateUser } from '../../../features/users/usersSlice';

// Import shared UI components
import Modal from '../../common/Modal';   // Modal component for popup
import UserForm from './UserForm';       // Reusable user form component

// Functional component to edit an existing user
const EditUserModal = ({ isOpen, onClose, user }) => {
  // Get the Redux dispatch function
  const dispatch = useDispatch();

  // Local state to track form submission status (loading indicator)
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Function to handle form submission
  const handleSubmit = async (data) => {
    setIsSubmitting(true); // Show loading state

    // Dispatch Redux action to update user by merging existing user data with new form data
    await dispatch(updateUser({ ...user, ...data })).unwrap();

    setIsSubmitting(false); // Stop loading after update
    onClose();              // Close the modal after successful update
  };

  // Render the modal with form inside
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit User">
      {/* UserForm handles input fields, submit & cancel */}
      <UserForm
        onSubmit={handleSubmit}      // Submit handler for form
        onCancel={onClose}           // Cancel button closes modal
        isSubmitting={isSubmitting}  // Pass loading state to form (for disabling button/spinner)
        initialData={user}           // Pre-fill form with existing user data
      />
    </Modal>
  );
};

// Export component to use in other parts of the app
export default EditUserModal;
