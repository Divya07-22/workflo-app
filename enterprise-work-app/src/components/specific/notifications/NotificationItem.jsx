// Importing React library to use JSX and build the component
import React from 'react';

// Importing a utility function 'formatDate' from the utils folder
// This function will format the date/time for displaying the notification timestamp
import { formatDate } from '../../../utils/dateUtils';

// Functional component 'NotificationItem' that accepts 'notification' as a prop
const NotificationItem = ({ notification }) => {
  // The component returns JSX UI for a single notification item
  return (
    // Outer div for the notification item with padding and hover background styles
    <div className="p-3 hover:bg-gray-100 dark:hover:bg-gray-700">
      
      {/* Displaying the notification message in paragraph */}
      <p className="text-sm text-gray-700 dark:text-gray-300">
        {notification.message}
      </p>

      {/* Displaying the formatted notification date using 'formatDate' */}
      {/* Passing 'notification.id' to formatDate function (assuming id is a timestamp) */}
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
        {formatDate(notification.id)}
      </p>
    </div>
  );
};

// Exporting the NotificationItem component so it can be used in other files
export default NotificationItem;
