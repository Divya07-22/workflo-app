import { useMemo } from 'react'; 
// Import useMemo hook from React to memoize computed values

import { useSelector } from 'react-redux'; 
// Import useSelector to access Redux store state

import { selectCurrentUser } from '../features/auth/authSlice'; 
// Import selector to get the current authenticated user from auth slice

// Custom hook to provide authenticated user data
export const useAuth = () => {
  const user = useSelector(selectCurrentUser); 
  // Get the current user from Redux store

  return useMemo(() => ({ user }), [user]); 
  // Memoize the returned object so that its reference only changes when 'user' changes
  // This avoids unnecessary re-renders in components using this hook
};
