// Import the Redux Toolkit function to create a store with good defaults
import { configureStore } from '@reduxjs/toolkit';

// Import the reducer that handles authentication state (login, logout, user info)
import authReducer from '../features/auth/authSlice';

// Import the reducer that manages project-related state (list, create, update, delete projects)
import projectsReducer from '../features/projects/projectsSlice';

// Import the reducer that manages tasks/kanban items
import tasksReducer from '../features/tasks/tasksSlice';

// Import the reducer that manages user data (mainly for admin - list, roles, etc.)
import usersReducer from '../features/users/usersSlice';

// Import the reducer that handles theme state (light/dark mode, UI preferences)
import themeReducer from '../features/theme/themeSlice';

// Import the reducer that manages notifications (alerts, toasts, system messages)
import notificationsReducer from '../features/notifications/notificationsSlice';

// Create the Redux store and register all reducers
export const store = configureStore({
  
  // Each key here represents a piece of global state in the Redux store
  reducer: {
    // Handles user authentication state
    auth: authReducer,

    // Handles all project data and operations
    projects: projectsReducer,

    // Handles all tasks inside projects
    tasks: tasksReducer,

    // Handles user list and roles (admin-related)
    users: usersReducer,

    // Handles theme preferences (light/dark mode)
    theme: themeReducer,

    // Handles notifications/messages inside the app
    notifications: notificationsReducer,
  },
});
