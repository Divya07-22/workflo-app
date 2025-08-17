// Import React to create the component
import React from 'react';
// Import useDispatch hook from react-redux to dispatch actions to the Redux store
import { useDispatch } from 'react-redux';
// Import the deleteUser action creator from the usersSlice
import { deleteUser } from '../../../features/users/usersSlice';
// Import a reusable Modal component for showing confirmation dialogs
import Modal from '../../common/Modal';
// Import a reusable Button component for actions
import Button from '../../common/Button';

// Define DeleteUserConfirmation functional component
// It receives three props: isOpen (modal visibility), onClose (close handler), and userId (ID of the user to delete)
const DeleteUserConfirmation = ({ isOpen, onClose, userId }) => {
  // Get the dispatch function from Redux to trigger actions
  const dispatch = useDispatch();

  // Function that runs when user confirms deletion
  const handleConfirm = () => {
    // Dispatch the deleteUser action with the provided userId
    dispatch(deleteUser(userId));
    // Close the modal after deletion
    onClose();
  };

  // Return JSX to render the modal content
  return (
    // Modal wrapper with title "Delete User"
    <Modal isOpen={isOpen} onClose={onClose} title="Delete User">
      {/* Confirmation message for the user */}
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Are you sure you want to delete this user? This action is irreversible.
      </p>

      {/* Action buttons aligned to the right */}
      <div className="mt-6 flex justify-end space-x-4">
        {/* Cancel button - just closes the modal */}
        <Button onClick={onClose} variant="secondary">Cancel</Button>
        {/* Delete button - triggers handleConfirm function */}
        <Button onClick={handleConfirm} variant="danger">Delete</Button>
      </div>
    </Modal>
  );
};

// Export the component so it can be used elsewhere
export default DeleteUserConfirmation;
