// React for components/JSX
import React from 'react';
// Reusable Card wrapper
import Card from '../../common/Card';

// Small stat card: icon + title + value
const StatCard = ({ title, value, icon }) => {
  // render UI
  return (
    // outer container with card chrome
    <Card>
      {/* row layout: icon on left, text on right */}
      <div className="flex items-center">
        {/* icon box with colored bg */}
        <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
          {/* inject classes into passed icon */}
          {React.cloneElement(icon, { className: 'h-8 w-8 text-white' })}
        </div>
        {/* text block */}
        <div className="ml-5 w-0 flex-1">
          {/* label/title */}
          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
            {title}
          </dt>
          {/* value/number */}
          <dd className="text-2xl font-semibold text-gray-900 dark:text-white">
            {value}
          </dd>
        </div>
      </div>
    </Card>
  );
};

// export for use in dashboards
export default StatCard;
