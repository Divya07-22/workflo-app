// Import React and useState for local state management
import React, { useState } from 'react';
// Import Redux hooks for dispatching actions and selecting state
import { useDispatch, useSelector } from 'react-redux';
// Import icons for UI
import { PaperClipIcon, ChatBubbleLeftEllipsisIcon, CalendarDaysIcon, UserCircleIcon } from '@heroicons/react/24/outline';
// Import task-related actions
import { addCommentToTask, addAttachmentToTask } from '../../../features/tasks/tasksSlice';
// Import authentication selector to get current user info
import { selectCurrentUser } from '../../../features/auth/authSlice';
// Import common reusable button component
import Button from '../../common/Button';
// Import date formatting utility
import { formatDate } from '../../../utils/dateUtils';

// TaskDetailView component: displays task details, attachments, and comments
const TaskDetailView = ({ task }) => {
  const dispatch = useDispatch(); // Redux dispatch function
  const currentUser = useSelector(selectCurrentUser); // Get logged-in user info
  const [newComment, setNewComment] = useState(''); // State for new comment input
  const [newAttachment, setNewAttachment] = useState(null); // State for selected file

  // Handle adding a new comment
  const handleAddComment = (e) => {
    e.preventDefault(); // Prevent form reload
    if (newComment.trim()) { // Ensure comment isn't empty
      // Dispatch action to add comment
      dispatch(addCommentToTask({ 
        taskId: task.id, 
        comment: { author: currentUser.name, text: newComment } 
      }));
      setNewComment(''); // Reset input field
    }
  };

  // Handle file selection for attachments
  const handleFileChange = (e) => {
    if (e.target.files[0]) { // If a file is selected
      setNewAttachment(e.target.files[0]); // Store it in state
    }
  };

  // Handle uploading attachment
  const handleAddAttachment = () => {
    if (newAttachment) {
      // Dispatch action with mock URL (placeholder, should be replaced with upload logic)
      dispatch(addAttachmentToTask({ 
        taskId: task.id, 
        attachment: { name: newAttachment.name, url: '#' } 
      }));
      setNewAttachment(null); // Reset state
      // Clear input field (needed because file inputs can't be controlled by state)
      document.getElementById(`file-input-${task.id}`).value = "";
    }
  };

  return (
    <div className="space-y-6">
      {/* Task header: title, assignee, due date, description */}
      <div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{task.title}</h3>
        <div className="mt-2 flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-500 dark:text-gray-400">
          <span className="flex items-center">
            <UserCircleIcon className="h-4 w-4 mr-1.5" /> Assigned to: <strong>{task.assignee}</strong>
          </span>
          <span className="flex items-center">
            <CalendarDaysIcon className="h-4 w-4 mr-1.5" /> Due: <strong>{formatDate(task.dueDate)}</strong>
          </span>
        </div>
        <p className="mt-4 text-gray-700 dark:text-gray-300">{task.description}</p>
      </div>

      {/* Attachments section */}
      <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
        <h4 className="font-semibold flex items-center text-gray-800 dark:text-white">
          <PaperClipIcon className="h-5 w-5 mr-2" />Attachments
        </h4>
        <ul className="mt-3 list-disc list-inside space-y-1">
          {/* Show each attachment as a link */}
          {task.attachments?.map(file => (
            <li key={file.id}>
              <a href={file.url} className="text-indigo-600 hover:underline dark:text-indigo-400">
                {file.name}
              </a>
            </li>
          ))}
          {/* Fallback if no attachments */}
          {!task.attachments?.length && (
            <p className="text-sm text-gray-500 dark:text-gray-400">No attachments yet.</p>
          )}
        </ul>

        {/* File upload input and button */}
        <div className="mt-4 flex items-center space-x-2">
          <input 
            type="file" 
            id={`file-input-${task.id}`} 
            onChange={handleFileChange}
            className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 
                      file:text-sm file:font-semibold file:bg-indigo-50 dark:file:bg-indigo-900/40 
                      file:text-indigo-700 dark:file:text-indigo-300 hover:file:bg-indigo-100" 
          />
          <div className="w-24">
            <Button onClick={handleAddAttachment} disabled={!newAttachment}>Upload</Button>
          </div>
        </div>
      </div>

      {/* Comments section */}
      <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
        <h4 className="font-semibold flex items-center text-gray-800 dark:text-white">
          <ChatBubbleLeftEllipsisIcon className="h-5 w-5 mr-2" />Comments
        </h4>
        
        {/* Existing comments list */}
        <div className="mt-4 space-y-4">
          {task.comments?.map(comment => (
            <div key={comment.id} className="text-sm bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
              <p className="font-bold text-gray-900 dark:text-white">{comment.author}</p>
              <p className="text-gray-700 dark:text-gray-300 py-1">{comment.text}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {new Date(comment.date).toLocaleString()}
              </p>
            </div>
          ))}
          {/* Fallback if no comments */}
          {!task.comments?.length && (
            <p className="text-sm text-gray-500 dark:text-gray-400">No comments yet.</p>
          )}
        </div>

        {/* New comment form */}
        <form onSubmit={handleAddComment} className="mt-4 flex space-x-2 items-start">
          <textarea 
            value={newComment} 
            onChange={(e) => setNewComment(e.target.value)} 
            placeholder="Add a comment..." 
            rows={2} 
            className="flex-grow border border-gray-300 dark:bg-gray-900 dark:border-gray-600 
                      dark:text-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
          <div className="w-32 pt-1">
            <Button type="submit">Add Comment</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Export component
export default TaskDetailView;
