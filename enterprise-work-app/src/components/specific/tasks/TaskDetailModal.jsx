// Import React library to create components
import React from 'react';
// Import reusable Modal component for displaying popups
import Modal from '../../common/Modal';
// Import TaskDetailView component to show detailed task info inside the modal
import TaskDetailView from './TaskDetailView';

// Functional component that displays task details in a modal popup
const TaskDetailModal = ({ isOpen, onClose, task }) => {
  // If no task is provided, don't render anything
  if (!task) return null;

  // Render modal with task details if a task is available
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Task Details">
      {/* Pass the selected task data to TaskDetailView component */}
      <TaskDetailView task={task} />
    </Modal>
  );
};

// Export component so it can be used in other parts of the app
export default TaskDetailModal;
