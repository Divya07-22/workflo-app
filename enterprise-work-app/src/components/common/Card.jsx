// Importing React so we can define our functional component
import React from 'react';

// Defining the Card component
// This component is meant to be a reusable "container box" for wrapping content.
// It accepts:
//   - children → whatever content is placed inside <Card> ... </Card>
//   - className → optional extra styles passed from outside
//   - ...props → any additional HTML props (like id, onClick, aria-label, etc.)
const Card = ({ children, className = '', ...props }) => {

  // Returning the actual JSX markup for the Card
  return (
    // The root div of the Card
    <div
      // className defines the styling of the card.
      // Default styles applied:
      //   bg-white              → white background for light mode
      //   dark:bg-gray-800      → dark gray background in dark mode
      //   border border-gray-200 → light border in light mode
      //   dark:border-gray-700  → darker border in dark mode
      //   rounded-lg            → rounded corners for modern UI look
      //   shadow-sm             → small shadow to make card "pop"
      //   p-6                   → padding inside the card
      //   ${className}          → allows developer to add extra custom styles when using Card
      className={`bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm p-6 ${className}`}

      // Spreading props means:
      // Any extra attributes (like id, onClick, aria-label, etc.)
      // passed when using <Card> will be applied here on the div.
      {...props}
    >
      {/* children means → whatever content is passed between <Card>...</Card> */}
      {children}
    </div>
  );
};

// Exporting the Card so other files can import and use it
export default Card;
