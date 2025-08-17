// Import React core functionality and hooks
import React, { useState, useEffect } from 'react';

// Import Outlet for nested routing
import { Outlet } from 'react-router-dom';

// Import Redux helpers to dispatch actions and access store state
import { useDispatch, useSelector } from 'react-redux';

// Import Sidebar component
import Sidebar from './Sidebar';

// Import Navbar component
import Navbar from './Navbar';

// Import async thunks (Redux slices) for fetching projects, tasks, and users
import { fetchProjects } from '../../features/projects/projectsSlice';
import { fetchTasks } from '../../features/tasks/tasksSlice';
import { fetchUsers } from '../../features/users/usersSlice';

// Import Spinner for showing loading animation
import Spinner from '../common/Spinner';

// Main layout component for the app
const AppLayout = () => {
  // Hook to dispatch Redux actions
  const dispatch = useDispatch();
  
  // Get the current fetch status of projects from Redux store
  const projectStatus = useSelector(state => state.projects.status);
  
  // Get the current fetch status of tasks from Redux store
  const taskStatus = useSelector(state => state.tasks.status);
  
  // Get the current fetch status of users from Redux store
  const userStatus = useSelector(state => state.users.status);

  // Local state to track sidebar open/close (for mobile view)
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  // useEffect runs when component mounts or when statuses change
  useEffect(() => {
    // If projects have not been fetched yet, trigger fetching
    if (projectStatus === 'idle') dispatch(fetchProjects());
    
    // If tasks have not been fetched yet, trigger fetching
    if (taskStatus === 'idle') dispatch(fetchTasks());
    
    // If users have not been fetched yet, trigger fetching
    if (userStatus === 'idle') dispatch(fetchUsers());
    
  // Dependencies ensure this only runs when status or dispatch changes
  }, [projectStatus, taskStatus, userStatus, dispatch]);

  // Check if any of the data is still loading (not yet succeeded)
  const isLoading = projectStatus !== 'succeeded' || taskStatus !== 'succeeded' || userStatus !== 'succeeded';

  // Return the layout structure
  return (
    // Wrapper div for sidebar + main content, with dark/light mode styles
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      
      {/* Sidebar component, receives open/close state and setter */}
      <Sidebar isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />
      
      {/* Main content wrapper (flex column layout) */}
      <div className="flex flex-col flex-1 overflow-hidden">
        
        {/* Navbar at the top, passes setter to toggle sidebar */}
        <Navbar setSidebarOpen={setSidebarOpen} />

        {/* Main section where actual page content is displayed */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900 p-4 md:p-8">
          
          {/* If still loading, show spinner in center of screen */}
          {isLoading ? (
            <div className="flex justify-center items-center h-full w-full">
              <Spinner size="h-12 w-12" color="text-indigo-600" />
            </div>
          ) : (
            // Otherwise show nested route content
            <Outlet />
          )}
        </main>
      </div>
    </div>
  );
};

// Export component so it can be used in other files
export default AppLayout;
