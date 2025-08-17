// Import React to use JSX syntax
import React from 'react';

// Import Redux hooks: useSelector to read state, useDispatch to send actions
import { useSelector, useDispatch } from 'react-redux';

// Import Popover and Transition components from Headless UI for dropdown animations
import { Popover, Transition } from '@headlessui/react';

// Import BellIcon (notification bell) from Heroicons
import { BellIcon } from '@heroicons/react/24/outline';

// Import Redux selectors and actions from notifications slice
import { selectAllNotifications, markAllAsRead } from '../../../features/notifications/notificationsSlice';

// Import custom component to render individual notification items
import NotificationItem from './NotificationItem';

// Functional React component for NotificationBell
const NotificationBell = () => {
  // Get all notifications from Redux store using selector
  const notifications = useSelector(selectAllNotifications);

  // Count how many notifications are unread (filter where read === false)
  const unreadCount = notifications.filter(n => !n.read).length;

  // Get dispatch function to send actions to Redux
  const dispatch = useDispatch();

  // JSX returned by the component
  return (
    // Popover wrapper (from Headless UI) - dropdown structure
    <Popover className="relative">
      <>
        {/* Popover button (the bell icon) */}
        <Popover.Button
          // When clicked: if unread notifications exist, mark them all as read
          onClick={() => unreadCount > 0 && dispatch(markAllAsRead())}
          // Styling for button (rounded, hover effects, dark mode support)
          className="relative p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
        >
          {/* Render the bell icon */}
          <BellIcon className="h-6 w-6" />

          {/* If unread notifications exist, show a small red dot badge */}
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 block h-3 w-3 rounded-full bg-red-500 border-2 border-white dark:border-gray-800"></span>
          )}
        </Popover.Button>

        {/* Transition for dropdown animation */}
        <Transition
          as={React.Fragment} // Use React.Fragment as wrapper
          enter="transition ease-out duration-200" // Animation when opening
          enterFrom="opacity-0 translate-y-1" // Start from invisible & slightly moved
          enterTo="opacity-100 translate-y-0" // End at visible & normal position
          leave="transition ease-in duration-150" // Animation when closing
          leaveFrom="opacity-100 translate-y-0" // Start visible
          leaveTo="opacity-0 translate-y-1" // End invisible & moved slightly
        >
          {/* Dropdown panel (notifications list) */}
          <Popover.Panel className="absolute right-0 z-10 mt-2 w-80 max-h-96 overflow-y-auto origin-top-right rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="p-2">
              {/* Heading for notifications list */}
              <h3 className="text-lg font-medium px-3 pt-2 text-gray-900 dark:text-white">Notifications</h3>

              {/* If there are notifications, render them */}
              {notifications.length > 0 ? (
                <div className="mt-2 divide-y divide-gray-200 dark:divide-gray-600">
                  {/* Map through notifications and render NotificationItem component for each */}
                  {notifications.map(n => <NotificationItem key={n.id} notification={n} />)}
                </div>
              ) : (
                // If no notifications, show "No new notifications" message
                <p className="text-center text-gray-500 dark:text-gray-400 py-4">No new notifications</p>
              )}
            </div>
          </Popover.Panel>
        </Transition>
      </>
    </Popover>
  );
};

// Export the NotificationBell component for use in other files
export default NotificationBell;
