// Import React to create the component
import React from 'react';
// Import Modal component to display confirmation inside a popup
import Modal from '../../common/Modal';
// Import Button component for action buttons inside the modal
import Button from '../../common/Button';

// Functional component for delete confirmation modal
const DeleteProjectConfirmation = ({ isOpen, onClose, onConfirm }) => {
  return (
    // Modal wrapper that opens/closes based on `isOpen` and uses `onClose` to close
    <Modal isOpen={isOpen} onClose={onClose} title="Delete Project">
      
      {/* Warning message to inform user about permanent deletion */}
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Are you sure you want to delete this project? This action cannot be undone.
      </p>

      {/* Footer section with action buttons */}
      <div className="mt-6 flex justify-end space-x-4">
        
        {/* Cancel button - closes the modal without deleting */}
        <Button onClick={onClose} variant="secondary">
          Cancel
        </Button>

        {/* Delete button - calls `onConfirm` to proceed with deletion */}
        <Button onClick={onConfirm} variant="danger">
          Delete
        </Button>
      </div>
    </Modal>
  );
};

// Export the component so it can be used in other files
export default DeleteProjectConfirmation;
