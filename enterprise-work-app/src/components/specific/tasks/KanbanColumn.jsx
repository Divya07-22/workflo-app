// Import React library to build components
import React from 'react';
// Import the useDroppable hook from @dnd-kit/core to allow drag-and-drop functionality
import { useDroppable } from '@dnd-kit/core';

// Define a KanbanColumn component that takes props: id, title, and children
const KanbanColumn = ({ id, title, children }) => {
  // useDroppable tells the column that it can accept dropped items
  // setNodeRef is a function that connects the DOM element with the drag-and-drop system
  const { setNodeRef } = useDroppable({ id });

  return (
    // Main container of the column
    // ref={setNodeRef} connects this column to the drag-and-drop system
    <div 
      ref={setNodeRef} 
      className="bg-gray-200 dark:bg-gray-800/50 rounded-lg p-4 w-80 flex-shrink-0"
    >
      {/* Column title (e.g., "To Do", "In Progress", "Done") */}
      <h3 className="font-bold text-lg mb-4 text-gray-900 dark:text-white">
        {title}
      </h3>

      {/* Container for tasks inside the column */}
      {/* space-y-4 → adds spacing between tasks */}
      {/* min-h-[100px] → ensures a minimum height so even empty columns are visible */}
      <div className="space-y-4 min-h-[100px]">
        {children} {/* Render the tasks (cards) inside the column */}
      </div>
    </div>
  );
};

// Export the KanbanColumn component so it can be used elsewhere
export default KanbanColumn;
