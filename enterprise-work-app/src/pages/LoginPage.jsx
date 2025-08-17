import React from 'react';
// Import React for building the component

import { Link } from 'react-router-dom';
// Import Link from react-router-dom for navigation between pages

import LoginForm from '../components/specific/auth/LoginForm';
// Import the LoginForm component which contains the form fields and submit logic

const LoginPage = () => {
  return (
    // Main container for the login page
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center items-center p-4">
      {/* Full screen height, background color changes based on theme, flex to center content */}
      
      <div className="max-w-md w-full mx-auto">
        {/* Container for the heading with max width */}
        <h2 className="text-center text-3xl font-extrabold text-gray-900 dark:text-white">
          Sign in to your account
        </h2>
        {/* Page title */}
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        {/* Container for the login form */}
        <div className="bg-white dark:bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {/* Card with background, padding, shadow, and rounded corners */}
          
          <LoginForm />
          {/* Render the login form component */}

          <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
            {/* Text for redirecting users to sign up if they don't have an account */}
            Don't have an account?{' '}
            <Link 
              to="/signup" 
              className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
            >
              Sign Up
            </Link>
            {/* Link to the signup page */}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
// Export the LoginPage component for use in routing
