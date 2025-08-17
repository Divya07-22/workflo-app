// Import React to define a functional component
import React from 'react';

// Define the Input component
// Props explanation:
//   - label → The text displayed above the input field
//   - name → The unique name/id for this input field
//   - type → The type of input (default is "text", but can be "email", "password", etc.)
//   - register → Function from react-hook-form to connect input to form state
//   - errors → Object containing validation errors from react-hook-form
//   - placeholder → Text shown inside the input when it’s empty
const Input = ({ label, name, type = 'text', register, errors, placeholder }) => {
  
  // Return the JSX markup for the Input field
  return (
    // Wrapper div for label + input + error message
    <div>
      
      {/* The label for the input field 
          - htmlFor links the label to the input’s id for accessibility
          - Tailwind classes: 
              block text-sm font-medium → small but bold text
              text-gray-700 → gray color in light mode
              dark:text-gray-300 → lighter gray for dark mode
      */}
      <label 
        htmlFor={name} 
        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
      >
        {label}
      </label>

      {/* A container for the input and its potential error message */}
      <div className="mt-1">
        
        {/* The actual input field 
            - id and name make it unique and connect it with react-hook-form
            - type sets what kind of input (text, email, password, etc.)
            - {...register(name)} registers this input with react-hook-form
            - placeholder shows hint text inside the input
            - Tailwind classes applied for styling:
                block w-full             → full width input
                appearance-none          → removes browser default styles
                rounded-md               → rounded corners
                border border-gray-300   → light gray border
                px-3 py-2                → padding inside
                placeholder-gray-400     → gray color for placeholder text
                shadow-sm                → small shadow effect
                focus:border-indigo-500  → border turns indigo on focus
                focus:ring-indigo-500    → glow effect on focus
                dark:bg-gray-900         → dark background in dark mode
                dark:border-gray-600     → darker border in dark mode
                dark:text-gray-300       → light text in dark mode
                dark:placeholder-gray-500 → dimmed placeholder in dark mode
        */}
        <input
          id={name}
          name={name}
          type={type}
          {...register(name)}
          placeholder={placeholder}
          className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm dark:bg-gray-900 dark:border-gray-600 dark:text-gray-300 dark:placeholder-gray-500"
        />

        {/* Error message rendering
            - If errors[name] exists, it means validation failed for this field
            - errors[name].message will contain the validation error text
            - Styled with small red text to indicate an error
        */}
        {errors[name] && (
          <p className="mt-2 text-sm text-red-600">
            {errors[name].message}
          </p>
        )}
      </div>
    </div>
  );
};

// Export the Input so it can be imported and used in forms across the app
export default Input;
