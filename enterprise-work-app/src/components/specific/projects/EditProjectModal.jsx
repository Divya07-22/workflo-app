import React, { useState } from 'react';  
// Import React and useState hook to manage component state

import { useDispatch } from 'react-redux';  
// Import useDispatch hook to dispatch Redux actions

import { updateProject } from '../../../features/projects/projectsSlice';  
// Import the updateProject action from the projects slice

import Modal from '../../common/Modal';  
// Import the reusable Modal component

import ProjectForm from './ProjectForm';  
// Import the ProjectForm component used inside the modal

const EditProjectModal = ({ isOpen, onClose, project }) => {  
  // Define EditProjectModal component with props: isOpen, onClose, and project

  const dispatch = useDispatch();  
  // Get the dispatch function from Redux

  const [isSubmitting, setIsSubmitting] = useState(false);  
  // Local state to track whether the form is currently being submitted

  const handleSubmit = async (data) => {  
    // Function to handle form submission
    setIsSubmitting(true);  
    // Mark form as submitting to disable buttons or show loader
    await dispatch(updateProject({ ...project, ...data })).unwrap();  
    // Dispatch updateProject action with merged project data (old + new form values)
    setIsSubmitting(false);  
    // Reset submitting state after completion
    onClose();  
    // Close modal after successful update
  };

  return (  
    // Render the modal with project editing form
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Project">  
      {/* Modal wrapper with title and close option */}
      <ProjectForm  
        onSubmit={handleSubmit}  
        // Pass the submit handler to form
        onCancel={onClose}  
        // Allow cancel button to close the modal
        isSubmitting={isSubmitting}  
        // Pass submitting state to form for disabling submit button
        initialData={project}  
        // Pre-fill form fields with current project details
      />  
    </Modal>  
  );  
};

export default EditProjectModal;  
// Export the component so it can be used elsewhere
