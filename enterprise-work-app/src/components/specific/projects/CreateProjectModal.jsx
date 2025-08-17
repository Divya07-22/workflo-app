// Import React and useState hook for local state management
import React, { useState } from 'react';
// Import Redux hook to dispatch actions
import { useDispatch } from 'react-redux';
// Import the async thunk to create a new project
import { createNewProject } from '../../../features/projects/projectsSlice';
// Import reusable Modal component
import Modal from '../../common/Modal';
// Import the form component for entering project details
import ProjectForm from './ProjectForm';

// Functional component for the Create Project modal
const CreateProjectModal = ({ isOpen, onClose }) => {
  // Initialize Redux dispatch function
  const dispatch = useDispatch();
  // Local state to track whether form submission is in progress
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle form submission
  const handleSubmit = async (data) => {
    // Set submitting state to true so we can show loading state if needed
    setIsSubmitting(true);
    // Dispatch createNewProject action with form data
    // `.unwrap()` lets us handle success/errors like normal promises
    await dispatch(createNewProject(data)).unwrap();
    // Reset submitting state once API call finishes
    setIsSubmitting(false);
    // Close the modal after project creation
    onClose();
  };

  // Render the modal with the form inside
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create a New Project">
      <ProjectForm
        onSubmit={handleSubmit}   // Pass submit handler to form
        onCancel={onClose}        // Pass cancel handler to form
        isSubmitting={isSubmitting} // Pass loading state to form
      />
    </Modal>
  );
};

// Export component so it can be reused elsewhere
export default CreateProjectModal;
