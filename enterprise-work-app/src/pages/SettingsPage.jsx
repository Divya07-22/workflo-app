import React from 'react';
// Import React

import ProfileEditForm from '../components/specific/settings/ProfileEditForm';
// Import component for editing user profile

import ChangePasswordForm from '../components/specific/settings/ChangePasswordForm';
// Import component for changing user password

import Card from '../components/common/Card';
// Reusable Card component for UI sections

import { useDispatch, useSelector } from 'react-redux';
// Import Redux hooks: useDispatch to dispatch actions, useSelector to read state

import { toggleTheme } from '../features/theme/themeSlice';
// Import action to toggle between light/dark theme

import Button from '../components/common/Button';
// Reusable Button component

const SettingsPage = () => {
  const dispatch = useDispatch();
  // Get Redux dispatch function to dispatch actions

  const currentTheme = useSelector(state => state.theme.mode);
  // Get the current theme mode (light/dark) from Redux state

  return (
    <div className="space-y-8">
      {/* Page container with vertical spacing between sections */}
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>
      {/* Page title */}

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Responsive grid: single column on small screens, 2 columns on medium+ screens */}

        {/* Edit Profile Section */}
        <Card>
          <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Edit Profile</h2>
          <ProfileEditForm />
          {/* Form component to edit profile */}
        </Card>

        {/* Change Password Section */}
        <Card>
          <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Change Password</h2>
          <ChangePasswordForm />
          {/* Form component to change password */}
        </Card>

        {/* Appearance / Theme Section */}
        <Card>
          <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Appearance</h2>
          <p className="mb-4 text-gray-600 dark:text-gray-400">
            Current theme is: <span className="font-semibold capitalize">{currentTheme}</span>
          </p>
          {/* Display current theme */}

          <div className="w-48">
            <Button onClick={() => dispatch(toggleTheme())}>
              {/* Button dispatches toggleTheme action to switch theme */}
              Switch to {currentTheme === 'light' ? 'Dark' : 'Light'} Mode
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SettingsPage;
// Export the SettingsPage component
