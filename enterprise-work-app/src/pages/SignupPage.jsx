import React from 'react';
// Import React

import { Link } from 'react-router-dom';
// Import Link for navigation between routes

import SignupForm from '../components/specific/auth/SignupForm';
// Import SignupForm component for the signup form

const SignupPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center items-center p-4">
      {/* Page container: full screen height, background adapts to light/dark mode, centers content vertically and horizontally, padding 4 */}

      <div className="max-w-md w-full mx-auto">
        {/* Container for heading: max width medium, full width on small screens, centered horizontally */}

        <h2 className="text-center text-3xl font-extrabold text-gray-900 dark:text-white">
          Create a new account
        </h2>
        {/* Page heading */}
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        {/* Container for the form: margin top 8, centered on small screens, full width with max width medium */}

        <div className="bg-white dark:bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {/* Card container: white background (dark mode: gray-800), padding top/bottom 8, left/right 4, shadow, rounded corners on small screens, extra padding on small screens */}

          <SignupForm />
          {/* Signup form component */}

          <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
            {/* Text for users who already have an account */}
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">
              Sign In
            </Link>
            {/* Link to login page */}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
// Export the SignupPage component
