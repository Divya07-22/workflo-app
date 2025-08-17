// Import React library to create the component
import React from 'react';

// Import useSelector hook to read authentication state from Redux store
import { useSelector } from 'react-redux';

// Import Navigate (for redirecting), useLocation (to track current route), and Outlet (for nested routes) from react-router
import { Navigate, useLocation, Outlet } from 'react-router-dom';

// Define a ProtectedRoute component that accepts `children` (optional content) and `allowedRoles` (list of roles allowed to access)
const ProtectedRoute = ({ children, allowedRoles }) => {
  
  // Get the current authenticated user and token from Redux store
  const { user, token } = useSelector((state) => state.auth);

  // Get the current location so we can redirect back after login if needed
  const location = useLocation();

  // If no user or token is found, redirect the user to login page
  // Also pass the current location so the app can navigate back after login
  if (!token || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If the user exists but their role is not in the allowedRoles list,
  // redirect them to a safe default page (dashboard here)
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  // If everything is fine (user authenticated and role allowed):
  // - Render children if provided (explicit content passed in)
  // - Otherwise render <Outlet /> which allows nested routes
  return children ? children : <Outlet />;
};

// Export the ProtectedRoute so it can be used in other files
export default ProtectedRoute;
