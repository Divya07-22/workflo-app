// Import React library to create components
import React, { useState } from 'react';
// Import Redux hook to dispatch actions
import { useDispatch } from 'react-redux';
// Import action creator to add a new user from the users slice
import { createNewUser } from '../../../features/users/usersSlice';
// Import Modal component (a reusable popup component)
import Modal from '../../common/Modal';
// Import UserForm component (form to create/edit user)
import UserForm from './UserForm';

// Define CreateUserModal component with props isOpen and onClose
const CreateUserModal = ({ isOpen, onClose }) => {
  // Initialize Redux dispatcher
  const dispatch = useDispatch();
  // Local state to track if the form is submitting
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Function to handle form submission
  const handleSubmit = async (data) => {
    setIsSubmitting(true); // set submitting state to true
    // Dispatch action to create a new user with form data
    await dispatch(createNewUser(data)).unwrap();
    setIsSubmitting(false); // reset submitting state
    onClose(); // close the modal after submission
  };

  // Render Modal component with UserForm inside
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New User">
      {/* Pass form handlers and states to UserForm */}
      <UserForm onSubmit={handleSubmit} onCancel={onClose} isSubmitting={isSubmitting} />
    </Modal>
  );
};

// Export component so it can be used in other parts of the app
export default CreateUserModal;
