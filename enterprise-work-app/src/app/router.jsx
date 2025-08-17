// Importing the createBrowserRouter function from react-router-dom
import { createBrowserRouter } from 'react-router-dom';

// Importing layout component for wrapping pages with navigation, sidebar, etc.
import AppLayout from '../components/layout/AppLayout';

// Importing custom ProtectedRoute component to restrict access based on authentication/roles
import ProtectedRoute from '../components/layout/ProtectedRoute';

// Importing different page components used in routes
import DashboardPage from '../pages/DashboardPage';
import KanbanBoardPage from '../pages/KanbanBoardPage';
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';
import NotFoundPage from '../pages/NotFoundPage';
import ProjectDetailPage from '../pages/ProjectDetailPage';
import ProjectsPage from '../pages/ProjectsPage';
import ReportsPage from '../pages/ReportsPage';
import SettingsPage from '../pages/SettingsPage';
import UserManagementPage from '../pages/UserManagementPage';

// Creating and exporting the router configuration
export const router = createBrowserRouter([

  // Public route for login page
  { path: '/login', element: <LoginPage /> },

  // Public route for signup page
  { path: '/signup', element: <SignupPage /> },

  // Protected routes section (requires authentication)
  {
    element: <ProtectedRoute />,   // Wrap all child routes inside ProtectedRoute
    children: [

      // Root layout for authenticated users
      {
        path: '/',                 // Base route
        element: <AppLayout />,    // Uses AppLayout (header/sidebar wrapper)
        errorElement: <NotFoundPage />, // Page shown when route not found inside layout

        // Nested child routes of AppLayout
        children: [
          { index: true, element: <DashboardPage /> }, // Default route -> Dashboard
          { path: 'dashboard', element: <DashboardPage /> }, // /dashboard
          { path: 'projects', element: <ProjectsPage /> },   // /projects list
          { path: 'projects/:projectId', element: <ProjectDetailPage /> }, // Project details with dynamic ID
          { path: 'board', element: <KanbanBoardPage /> },   // Kanban board page

          // Reports page restricted to Admin + Manager roles
          { 
            path: 'reports',
            element: (
              <ProtectedRoute allowedRoles={['Admin', 'Manager']}>
                <ReportsPage />
              </ProtectedRoute>
            )
          },

          // Settings page (no extra role restriction, just authenticated)
          { path: 'settings', element: <SettingsPage /> },

          // User management restricted only to Admin
          {
            path: 'admin/users',
            element: (
              <ProtectedRoute allowedRoles={['Admin']}>
                <UserManagementPage />
              </ProtectedRoute>
            )
          }
        ]
      }
    ]
  },

  // Catch-all route for any undefined paths -> 404 page
  { path: '*', element: <NotFoundPage /> }
]);
