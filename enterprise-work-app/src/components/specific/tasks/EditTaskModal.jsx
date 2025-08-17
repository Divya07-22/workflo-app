// Import React and useState hook for managing component state
import React, { useState } from 'react';

// Import useDispatch hook from react-redux to dispatch Redux actions
import { useDispatch } from 'react-redux';

// Import the updateTask action from the Redux slice (to update an existing task)
import { updateTask } from '../../../features/tasks/tasksSlice';

// Import the reusable Modal component
import Modal from '../../common/Modal';

// Import the TaskForm component (form UI for task input)
import TaskForm from './TaskForm';

// Define the EditTaskModal component that accepts props: isOpen, onClose, and task
const EditTaskModal = ({ isOpen, onClose, task }) => {
  // Get the dispatch function to trigger Redux actions
  const dispatch = useDispatch();

  // Local state to track if form submission is in progress
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Function to handle form submission
  const handleSubmit = async (data) => {
    // Set submitting state to true (to disable form during submission)
    setIsSubmitting(true);

    // Dispatch updateTask action with merged old task + updated form data
    await dispatch(updateTask({ ...task, ...data })).unwrap();

    // After submission, set submitting state back to false
    setIsSubmitting(false);

    // Close the modal after successful update
    onClose();
  };

  // Render the modal with a title and a TaskForm inside
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Task">
      <TaskForm
        onSubmit={handleSubmit}      // Pass submit handler
        onCancel={onClose}           // Pass cancel handler (close modal)
        isSubmitting={isSubmitting}  // Pass loading state
        initialData={task}           // Pre-fill form fields with task data
      />
    </Modal>
  );
};

// Export the component for use in other parts of the app
export default EditTaskModal;
