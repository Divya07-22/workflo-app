// Import React library to use JSX and functional components
import React from 'react';

// Import the reusable Card component (acts as a styled container)
import Card from '../../common/Card';

// Define the ActivityFeed component
const ActivityFeed = () => {
  // A temporary list of activities (mock data).
  // In a real project, this could come from an API or Redux store.
  const mockActivities = [
    { id: 1, text: "User 'Alice' completed task \"Deploy to production\"." },
    { id: 2, text: "User 'Bob' created a new project \"Mobile App V2\"." },
    { id: 3, text: "User 'Admin User' was assigned to task \"Fix login bug\"." },
    { id: 4, text: "Project \"E-commerce Platform\" status was changed to In Progress." },
  ];

  // Return JSX (UI part)
  return (
    // Wrap everything inside a Card component for styling
    <Card>
      {/* Heading for the section */}
      <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
        Recent Activity
      </h2>

      {/* Unordered list to display activities */}
      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
        {/* Loop through each activity and render it as a list item */}
        {mockActivities.map(activity => (
          // Each list item must have a unique `key`
          <li
            key={activity.id}
            className="py-3 text-sm text-gray-600 dark:text-gray-400"
          >
            {/* Display the activity text */}
            {activity.text}
          </li>
        ))}
      </ul>
    </Card>
  );
};

// Export the component so it can be imported elsewhere
export default ActivityFeed;
