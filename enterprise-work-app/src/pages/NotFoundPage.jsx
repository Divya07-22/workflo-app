import React from 'react';
// Import React to create the component

import { Link } from 'react-router-dom';
// Import Link from react-router-dom for navigation back to another page

const NotFoundPage = () => {
  return (
    // Main container for the 404 page
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
      {/* Full screen height, flex to center content vertically and horizontally, light/dark background */}
      
      <h1 className="text-6xl font-bold text-indigo-600 dark:text-indigo-400">404</h1>
      {/* Large 404 error code with color adapting to theme */}

      <h2 className="text-2xl font-semibold mt-4 text-gray-900 dark:text-white">Page Not Found</h2>
      {/* Secondary heading to describe the error */}

      <p className="mt-2 text-gray-600 dark:text-gray-400">
        Sorry, the page you are looking for does not exist.
      </p>
      {/* Additional message to inform the user */}

      <Link 
        to="/dashboard" 
        className="mt-6 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
      >
        Go to Dashboard
      </Link>
      {/* Button-like link to redirect users back to the dashboard */}
    </div>
  );
};

export default NotFoundPage;
// Export the NotFoundPage component for use in routing
