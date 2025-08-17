// Import functions from date-fns library
import { format, parseISO } from 'date-fns';

/**
 * Formats an ISO date string into a readable format.
 * Example: "2025-08-17T12:34:56Z" → "Aug 17, 2025"
 *
 * @param {string} dateString - The ISO date string to format
 * @returns {string} - Formatted date or error message
 */
export const formatDate = (dateString) => {
  if (!dateString) return 'N/A';  // Return 'N/A' if input is empty or null

  try {
    const date = parseISO(dateString);       // Parse the ISO string into a Date object
    return format(date, 'MMM d, yyyy');      // Format the date as "Aug 17, 2025"
  } catch (error) {
    console.error("Invalid date format:", dateString);  // Log error if parsing fails
    return 'Invalid Date';                // Return fallback text for invalid date
  }
};
