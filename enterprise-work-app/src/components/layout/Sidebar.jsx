// Import React library to create components
import React from 'react';

// Import NavLink for navigation links in React Router
import { NavLink } from 'react-router-dom';

// Import Redux hook to read state
import { useSelector } from 'react-redux';

// Import a selector that gets the current user from auth slice
import { selectCurrentUser } from '../../features/auth/authSlice';

// Import Heroicons used for the sidebar menu
import { 
  HomeIcon, 
  BriefcaseIcon, 
  ClipboardDocumentListIcon, 
  ChartBarIcon, 
  Cog6ToothIcon, 
  UsersIcon 
} from '@heroicons/react/24/outline';

// SidebarLink is a small reusable component for each link in the sidebar
const SidebarLink = ({ to, icon, label, onClick }) => (
  <li>
    <NavLink
      to={to}                          // destination path for the link
      onClick={onClick}                // close sidebar on mobile when link is clicked
      className={({ isActive }) =>     // apply different styles depending on active state
        `flex items-center p-2 rounded-lg transition-colors duration-200 ${
          isActive 
            ? 'bg-indigo-600 text-white'   // active state: highlight link
            : 'text-gray-300 hover:bg-gray-700 hover:text-white' // inactive: default gray with hover effect
        }`
      }
    >
      {/* cloneElement lets us pass custom classes to the Heroicon */}
      {React.cloneElement(icon, { className: 'h-6 w-6 mr-3' })}

      {/* Display the label text next to the icon */}
      <span className="font-medium">{label}</span>
    </NavLink>
  </li>
);

// Main Sidebar component
// Accepts props: isSidebarOpen (boolean) and setSidebarOpen (function to toggle visibility)
const Sidebar = ({ isSidebarOpen, setSidebarOpen }) => {
    // Get the current logged-in user from Redux store
    const user = useSelector(selectCurrentUser);

    // Helper function to close sidebar (used on mobile)
    const closeSidebar = () => setSidebarOpen(false);

    return (
      <>
        {/* Mobile Overlay: a dark transparent background shown behind sidebar when open */}
        <div 
          className={`fixed inset-0 z-20 bg-black bg-opacity-50 transition-opacity md:hidden ${isSidebarOpen ? 'block' : 'hidden'}`}
          onClick={closeSidebar}  // clicking outside sidebar closes it
        ></div>

        {/* The Sidebar drawer itself */}
        <aside 
          className={`fixed inset-y-0 left-0 z-30 w-64 flex-shrink-0 bg-gray-900 text-white p-4 flex flex-col transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
        >
            {/* Sidebar Header / Brand Name */}
            <div className="text-2xl font-bold text-white mb-10 text-center">
              AgileFlow Enterprise
            </div>

            {/* Navigation Links */}
            <nav>
                <ul className="space-y-2">
                    {/* Always visible links */}
                    <SidebarLink to="/dashboard" icon={<HomeIcon />} label="Dashboard" onClick={closeSidebar} />
                    <SidebarLink to="/projects" icon={<BriefcaseIcon />} label="Projects" onClick={closeSidebar} />
                    <SidebarLink to="/board" icon={<ClipboardDocumentListIcon />} label="Kanban Board" onClick={closeSidebar} />
                    
                    {/* Only visible to Admins and Managers */}
                    {(user?.role === 'Admin' || user?.role === 'Manager') && (
                        <SidebarLink to="/reports" icon={<ChartBarIcon />} label="Reports" onClick={closeSidebar} />
                    )}

                    {/* Settings link visible to everyone */}
                    <SidebarLink to="/settings" icon={<Cog6ToothIcon />} label="Settings" onClick={closeSidebar} />
                    
                    {/* User Management link visible only to Admins */}
                    {user?.role === 'Admin' && (
                        <SidebarLink to="/admin/users" icon={<UsersIcon />} label="User Management" onClick={closeSidebar} />
                    )}
                </ul>
            </nav>
        </aside>
      </>
    );
};

// Export Sidebar component so it can be used in AppLayout
export default Sidebar;
