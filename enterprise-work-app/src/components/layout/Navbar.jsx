// Importing React to build the component
import React from 'react';

// Importing a hamburger icon (three bars) from Heroicons library
import { Bars3Icon } from '@heroicons/react/24/outline';

// Importing NotificationBell component (handles notifications)
import NotificationBell from '../specific/notifications/NotificationBell';

// Importing ProfileDropdown component (shows user menu/profile options)
import ProfileDropdown from './ProfileDropdown';

// Navbar component, takes setSidebarOpen as a prop to control sidebar visibility
const Navbar = ({ setSidebarOpen }) => {
    return (
        // Header wrapper with flexbox, background color, border, and padding
        <header className="flex items-center justify-between h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 flex-shrink-0">

            {/* Mobile Hamburger Button - visible only on small screens (hidden on md and larger) */}
            <button 
              // When clicked, setSidebarOpen(true) opens the sidebar
              onClick={() => setSidebarOpen(true)}
              // Styling: gray text, dark mode color, remove default outline, hidden on medium screens and up
              className="text-gray-500 dark:text-gray-300 focus:outline-none md:hidden"
            >
              {/* The actual hamburger icon (3 horizontal bars) */}
              <Bars3Icon className="h-6 w-6" />
            </button>

            {/* Empty div used as a spacer to push notification/profile items to the right on desktop */}
            <div className="hidden md:block"></div>

            {/* Right-side section of the navbar */}
            <div className="flex items-center space-x-4">
                {/* Notification Bell Icon/Component */}
                <NotificationBell />

                {/* Divider line between notifications and profile menu */}
                <div className="h-8 border-l border-gray-300 dark:border-gray-600"></div>

                {/* Profile Dropdown (user profile menu with settings/logout etc.) */}
                <ProfileDropdown />
            </div>
        </header>
    );
};

// Exporting the Navbar so it can be used in other parts of the app
export default Navbar;
