// Import React and Fragment (Fragment lets us group elements without extra DOM nodes)
import React, { Fragment } from 'react';

// Importing HeadlessUI Menu and Transition for dropdown functionality + animations
import { Menu, Transition } from '@headlessui/react';

// Importing icons for dropdown arrow and logout button
import { ChevronDownIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';

// Hooks from Redux to interact with the store
import { useDispatch, useSelector } from 'react-redux';

// React Router hook for navigation
import { useNavigate } from 'react-router-dom';

// Importing auth selectors and actions
import { selectCurrentUser, logOut } from '../../features/auth/authSlice';

// Component for profile dropdown (shows user info + logout option)
const ProfileDropdown = () => {
  // Allows us to dispatch Redux actions
  const dispatch = useDispatch();

  // For navigating programmatically
  const navigate = useNavigate();

  // Get the currently logged-in user from Redux state
  const user = useSelector(selectCurrentUser);

  // Function that handles user logout
  const handleLogout = () => {
    dispatch(logOut());        // clears user from store
    navigate('/login');        // redirect back to login page
  };

  // If no user is logged in, don’t render anything
  if (!user) {
    return null;
  }

  return (
    // Menu wrapper (HeadlessUI component for dropdowns)
    <Menu as="div" className="relative inline-block text-left">
      <div>
        {/* Dropdown button showing user info + arrow */}
        <Menu.Button className="inline-flex w-full justify-center items-center rounded-md px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
          {/* User info: name and role stacked */}
          <div>
            <div className="font-semibold text-right">{user.name}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400 text-right">{user.role}</div>
          </div>
          {/* Small arrow icon to indicate dropdown */}
          <ChevronDownIcon
            className="ml-2 -mr-1 h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>

      {/* Dropdown transition animation (fade & scale) */}
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        {/* The actual dropdown menu */}
        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 dark:divide-gray-700 rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          
          {/* Section inside the dropdown */}
          <div className="px-1 py-1 ">
            
            {/* Menu Item: Logout */}
            <Menu.Item>
              {({ active }) => (
                <button
                  // Trigger logout when clicked
                  onClick={handleLogout}
                  // Change styles if active (hovered/focused)
                  className={`${
                    active ? 'bg-indigo-500 text-white' : 'text-gray-900 dark:text-gray-200'
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  {/* Logout icon */}
                  <ArrowRightOnRectangleIcon className="mr-2 h-5 w-5" aria-hidden="true" />
                  Logout
                </button>
              )}
            </Menu.Item>

          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

// Export so it can be used inside Navbar
export default ProfileDropdown;
