// Import React and useState for local state management
import React, { useState } from 'react';
// Import Redux's useDispatch to trigger actions
import { useDispatch } from 'react-redux';
// Import useSortable from dnd-kit to make the card draggable
import { useSortable } from '@dnd-kit/sortable';
// Import CSS helpers from dnd-kit to style dragged elements
import { CSS } from '@dnd-kit/utilities';
// Import some icons for UI
import { CalendarIcon, ChatBubbleLeftEllipsisIcon, PaperClipIcon } from '@heroicons/react/24/outline';
// Import custom components
import Card from '../../common/Card';
import EditTaskModal from './EditTaskModal';
import DeleteTaskConfirmation from './DeleteTaskConfirmation';
// Utility to format task due date
import { formatDate } from '../../../utils/dateUtils';
// Redux action for deleting a task
import { deleteTask } from '../../../features/tasks/tasksSlice';

// Define colors for task types
const typeColors = {
  'Bug': 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
  'Feature': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
  'Improvement': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
};

// TaskCard component takes a task object and an onViewDetails function
const TaskCard = ({ task, onViewDetails }) => {
  const dispatch = useDispatch();

  // Local states to toggle edit and delete modals
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  // useSortable hook from dnd-kit gives us properties for drag-and-drop
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: task.id });

  // Apply transform and transition styles when dragging
  const style = { transform: CSS.Transform.toString(transform), transition };
  
  // Handle deleting a task
  const handleDelete = () => {
    dispatch(deleteTask(task.id)); // Dispatch redux action to remove task
    setDeleteModalOpen(false); // Close modal after deleting
  };

  // Handle edit button click
  const handleEditClick = (e) => {
    e.stopPropagation(); // Prevent triggering card click (view details)
    setEditModalOpen(true); // Open edit modal
  };

  // Handle delete button click
  const handleDeleteClick = (e) => {
    e.stopPropagation(); // Prevent triggering card click (view details)
    setDeleteModalOpen(true); // Open delete confirmation modal
  };

  return (
    <>
      {/* Wrapper div for drag-and-drop functionality */}
      <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
        <Card>
          {/* Task details clickable area - clicking opens task details */}
          <div onPointerDown={() => onViewDetails(task)} className="cursor-pointer">
            {/* Task title */}
            <p className="font-semibold text-gray-900 dark:text-white pr-2">{task.title}</p>
            
            {/* Top row: task type and assignee */}
            <div className="flex items-center justify-between mt-4">
              <span className={`px-2 py-1 text-xs font-semibold rounded-full ${typeColors[task.type]}`}>
                {task.type}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">{task.assignee}</span>
            </div>

            {/* Bottom row: due date, comments, and attachments */}
            <div className="flex items-center justify-between mt-4 pt-2 border-t border-gray-200 dark:border-gray-700">
              {/* Due date */}
              <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                <CalendarIcon className="h-4 w-4 mr-1" />
                <span>{formatDate(task.dueDate)}</span>
              </div>
              {/* Comments and attachments counters */}
              <div className="flex items-center space-x-3 text-xs text-gray-500 dark:text-gray-400">
                <span className="flex items-center">
                  <ChatBubbleLeftEllipsisIcon className="h-4 w-4 mr-1" /> 
                  {task.comments?.length || 0}
                </span>
                <span className="flex items-center">
                  <PaperClipIcon className="h-4 w-4 mr-1" /> 
                  {task.attachments?.length || 0}
                </span>
              </div>
            </div>
          </div>

          {/* Action buttons row (Edit/Delete) */}
          <div className="mt-4 flex justify-end items-center space-x-2 border-t border-gray-200 dark:border-gray-700 pt-2">
            <button 
              onClick={handleEditClick}
              onPointerDown={(e) => e.stopPropagation()} // Prevent drag when clicking
              className="flex items-center space-x-1 text-sm text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
            >
              <span>Edit</span>
            </button>
            <button 
              onClick={handleDeleteClick}
              onPointerDown={(e) => e.stopPropagation()} // Prevent drag when clicking
              className="flex items-center space-x-1 text-sm text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
            >
              <span>Delete</span>
            </button>
          </div>
        </Card>
      </div>
      
      {/* Edit Task Modal */}
      <EditTaskModal 
        isOpen={isEditModalOpen} 
        onClose={() => setEditModalOpen(false)} 
        task={task} 
      />

      {/* Delete Task Confirmation Modal */}
      <DeleteTaskConfirmation 
        isOpen={isDeleteModalOpen} 
        onClose={() => setDeleteModalOpen(false)} 
        onConfirm={handleDelete} 
      />
    </>
  );
};

// Export component for use in other parts of app
export default TaskCard;
