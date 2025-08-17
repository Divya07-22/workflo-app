import { useState, useEffect } from 'react';
// Import useState and useEffect hooks from React

export default function useDebounce(value, delay) {
  // Custom hook that debounces a value, delaying its update by a specified time
  const [debouncedValue, setDebouncedValue] = useState(value);
  // State to store the debounced value, initialized with the current value

  useEffect(() => {
    // Effect runs whenever 'value' or 'delay' changes
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    // Set a timeout to update 'debouncedValue' after the specified delay

    return () => {
      clearTimeout(handler);
    };
    // Cleanup: clear the previous timeout if 'value' or 'delay' changes
    // This prevents multiple pending timeouts and ensures only the latest value is used
  }, [value, delay]);

  return debouncedValue;
  // Return the debounced value to the component
}
