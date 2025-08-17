// Import React library to create and use React components
import React from 'react';
// Import a reusable Modal component to display confirmation dialogs
import Modal from '../../common/Modal';
// Import a reusable Button component for actions inside the modal
import Button from '../../common/Button';

// Define the DeleteTaskConfirmation component
// It takes three props: 
// 1) isOpen → whether the modal is open or closed
// 2) onClose → function to close the modal
// 3) onConfirm → function to confirm the delete action
const DeleteTaskConfirmation = ({ isOpen, onClose, onConfirm }) => {
  return (
    // Render the Modal component, passing props to control its state and title
    <Modal isOpen={isOpen} onClose={onClose} title="Delete Task">
      
      {/* Display a warning message inside the modal */}
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Are you sure you want to delete this task? This action is irreversible.
      </p>

      {/* Container for the action buttons, with spacing and alignment */}
      <div className="mt-6 flex justify-end space-x-4">
        
        {/* Cancel button → calls onClose when clicked */}
        <Button onClick={onClose} variant="secondary">Cancel</Button>
        
        {/* Delete button → calls onConfirm when clicked */}
        <Button onClick={onConfirm} variant="danger">Delete</Button>
      </div>
    </Modal>
  );
};

// Export the component so it can be used in other parts of the app
export default DeleteTaskConfirmation;
