// Import React and useState for component state
import React, { useState } from 'react';

// Import Link component for navigation
import { Link } from 'react-router-dom';

// Import Redux hook to dispatch actions
import { useDispatch } from 'react-redux';

// Import icons for edit and delete actions
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

// Import custom reusable Card component
import Card from '../../common/Card';

// Import modal for editing a project
import EditProjectModal from './EditProjectModal';

// Import modal for confirming deletion
import DeleteProjectConfirmation from './DeleteProjectConfirmation';

// Import Redux action to delete a project
import { deleteProject } from '../../../features/projects/projectsSlice';

// Component to display a single project card
const ProjectCard = ({ project }) => {
  // Hook to dispatch Redux actions
  const dispatch = useDispatch();

  // State to control visibility of the edit modal
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  // State to control visibility of the delete confirmation modal
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  // Function to handle deleting the project
  const handleDelete = () => {
    // Dispatch Redux action to delete the project using its ID
    dispatch(deleteProject(project.id));
    // Close the delete confirmation modal after deletion
    setDeleteModalOpen(false);
  };

  // Function to handle clicking the edit button
  const handleEditClick = (e) => {
    // Prevent the click from triggering navigation (Link behavior)
    e.stopPropagation();
    e.preventDefault();
    // Open the edit modal
    setEditModalOpen(true);
  };

  // Function to handle clicking the delete button
  const handleDeleteClick = (e) => {
    // Prevent the click from triggering navigation (Link behavior)
    e.stopPropagation();
    e.preventDefault();
    // Open the delete confirmation modal
    setDeleteModalOpen(true);
  };

  // Render the project card UI
  return (
    <>
      {/* Card wrapper to hold project info */}
      <Card className="flex flex-col h-full">
        
        {/* Clickable area to navigate to project details page */}
        <Link to={`/projects/${project.id}`} className="flex-grow">
          {/* Project name */}
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">{project.name}</h3>
          {/* Project description (limited to 2 lines) */}
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{project.description}</p>
        </Link>

        {/* Section showing project status */}
        <div className="flex-shrink-0 mt-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">Status: {project.status}</p>
        </div>

        {/* Action buttons (Edit + Delete) */}
        <div className="mt-4 flex justify-end items-center space-x-2 border-t border-gray-200 dark:border-gray-700 pt-2">
            
            {/* Edit button */}
            <button 
              onClick={handleEditClick} 
              className="flex items-center space-x-1 text-sm text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
            >
                <PencilIcon className="h-4 w-4" />
                <span>Edit</span>
            </button>

            {/* Delete button */}
            <button 
              onClick={handleDeleteClick} 
              className="flex items-center space-x-1 text-sm text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
            >
                <TrashIcon className="h-4 w-4" />
                <span>Delete</span>
            </button>
        </div>
      </Card>

      {/* Edit project modal (shown when isEditModalOpen is true) */}
      <EditProjectModal 
        isOpen={isEditModalOpen} 
        onClose={() => setEditModalOpen(false)} 
        project={project} 
      />

      {/* Delete project confirmation modal (shown when isDeleteModalOpen is true) */}
      <DeleteProjectConfirmation 
        isOpen={isDeleteModalOpen} 
        onClose={() => setDeleteModalOpen(false)} 
        onConfirm={handleDelete} 
      />
    </>
  );
};

// Export this component for use elsewhere
export default ProjectCard;
