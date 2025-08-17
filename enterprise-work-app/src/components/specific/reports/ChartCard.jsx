// Import React library to create the component
import React from 'react';

// Import the Card component from common folder (used to wrap the chart inside a styled card)
import Card from '../../common/Card';

// Define the ChartCard component, which accepts "title" and "children" as props
const ChartCard = ({ title, children }) => {
  return (
    // Wrap the chart content inside the Card component for consistent styling
    <Card>
      {/* Display the title of the chart in bold, with some spacing and text styling */}
      <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">{title}</h2>

      {/* Container for the chart with fixed height and full width */}
      <div className="h-96 w-full">
        {/* Render the chart or any child content passed to this component */}
        {children}
      </div>
    </Card>
  );
};

// Export the ChartCard component so it can be used in other files
export default ChartCard;
