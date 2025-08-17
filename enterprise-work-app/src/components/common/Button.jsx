// Import React so we can write a functional component
import React from 'react';

// Import a Spinner component that will show a loading animation inside the button
import Spinner from './Spinner';

// Define a reusable Button component
// Props: children (button text/element), onClick handler, type, variant (style), extra classes, disabled state, and loading state
const Button = ({ 
  children, 
  onClick, 
  type = 'button', 
  variant = 'primary', 
  className = '', 
  disabled = false, 
  isLoading = false 
}) => {
  
  // Base styles applied to every button
  const baseStyles = 'w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200';
  
  // Variant styles: different color schemes for primary, secondary, and danger buttons
  const variants = {
    primary: 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 text-white',
    secondary: 'bg-gray-200 hover:bg-gray-300 focus:ring-indigo-500 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-300',
    danger: 'bg-red-600 hover:bg-red-700 focus:ring-red-500 text-white',
  };

  // Return the button element
  return (
    <button
      // Set the button type (default: "button", but can be "submit" or "reset")
      type={type}

      // Click handler function
      onClick={onClick}

      // Disable the button if "disabled" is true or while "isLoading" is true
      disabled={disabled || isLoading}

      // Apply base styles + variant styles + extra classes passed in props
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {/* If loading, show the Spinner, else show button children (like "Submit") */}
      {isLoading ? <Spinner size="h-5 w-5" /> : children}
    </button>
  );
};

// Export the Button so it can be used in other files
export default Button;
