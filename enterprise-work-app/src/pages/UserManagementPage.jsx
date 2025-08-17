import React, { useState } from 'react';
// Import React and useState hook for managing local state

import { useSelector } from 'react-redux';
// Import useSelector to access Redux store

import { selectAllUsers } from '../features/users/usersSlice';
// Import selector to get all users from Redux state

import Card from '../components/common/Card';
// Import reusable Card component for styling

import Button from '../components/common/Button';
// Import reusable Button component

import { formatDate } from '../utils/dateUtils';
// Import a utility function to format dates

import CreateUserModal from '../components/specific/users/CreateUserModal';
import EditUserModal from '../components/specific/users/EditUserModal';
import DeleteUserConfirmation from '../components/specific/users/DeleteUserConfirmation';
// Import modal components for creating, editing, and deleting users

const UserManagementPage = () => {
  const users = useSelector(selectAllUsers);
  // Fetch all users from Redux state

  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [deletingUserId, setDeletingUserId] = useState(null);
  // Local state to manage modal visibility for create, edit, and delete actions

  const statusColor = (status) => 
    status === 'Active' 
      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' 
      : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
  // Function to determine badge color based on user status

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">User Management</h1>
        {/* Page heading */}
        <div className="w-48">
            <Button onClick={() => setCreateModalOpen(true)}>Create New User</Button>
            {/* Open create user modal */}
        </div>
      </div>

      <Card>
        <div className="overflow-x-auto">
          {/* Table wrapper with horizontal scroll */}
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            {/* Table header */}
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Last Activity</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Actions</th>
              </tr>
            </thead>

            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {users.map(user => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900 dark:text-white">{user.name}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{user.email}</div>
                      {/* Display user name and email */}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-gray-300">{user.role}</td>
                  {/* Display user role */}
                  <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColor(user.status)}`}>
                        {user.status}
                      </span>
                      {/* Status badge with dynamic color */}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {formatDate(user.lastActivity)}
                    {/* Display last activity date in formatted style */}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <a href="#" onClick={(e) => { e.preventDefault(); setEditingUser(user); }} 
                        className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300">
                        Edit
                      </a>
                      {/* Edit user button triggers EditUserModal */}
                      <a href="#" onClick={(e) => { e.preventDefault(); setDeletingUserId(user.id); }} 
                        className="ml-4 text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">
                        Delete
                      </a>
                      {/* Delete user button triggers DeleteUserConfirmation modal */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      
      {/* Modals */}
      {isCreateModalOpen && <CreateUserModal isOpen={isCreateModalOpen} onClose={() => setCreateModalOpen(false)} />}
      {editingUser && <EditUserModal isOpen={!!editingUser} onClose={() => setEditingUser(null)} user={editingUser} />}
      {deletingUserId && <DeleteUserConfirmation isOpen={!!deletingUserId} onClose={() => setDeletingUserId(null)} userId={deletingUserId} />}
    </div>
  );
};

export default UserManagementPage;
// Export the UserManagementPage component
