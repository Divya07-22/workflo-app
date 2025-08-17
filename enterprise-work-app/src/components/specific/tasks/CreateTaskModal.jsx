// Import React and useState hook for managing local state
import React, { useState } from 'react';

// Import useDispatch hook from react-redux for dispatching actions
import { useDispatch } from 'react-redux';

// Import the createNewTask action from the tasks slice
import { createNewTask } from '../../../features/tasks/tasksSlice';

// Import the reusable Modal component
import Modal from '../../common/Modal';

// Import the TaskForm component used for creating tasks
import TaskForm from './TaskForm';

// Define the CreateTaskModal component and receive props (isOpen, onClose)
const CreateTaskModal = ({ isOpen, onClose }) => {
  // Get the dispatch function from Redux
  const dispatch = useDispatch();

  // Local state to track whether form submission is in progress
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Function to handle form submission
  const handleSubmit = async (data) => {
    // Set submitting state to true when form submission starts
    setIsSubmitting(true);

    // Dispatch the createNewTask action with the form data and wait for it to finish
    await dispatch(createNewTask(data)).unwrap();

    // Set submitting state back to false after submission is complete
    setIsSubmitting(false);

    // Close the modal after the task is created
    onClose();
  };

  // Render the modal with the task form inside
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create a New Task">
      <TaskForm
        // Pass the handleSubmit function as the form submission handler
        onSubmit={handleSubmit}

        // Pass onClose to handle cancel action
        onCancel={onClose}

        // Pass submitting state to disable button while submitting
        isSubmitting={isSubmitting}
      />
    </Modal>
  );
};

// Export the component so it can be used in other parts of the app
export default CreateTaskModal;
