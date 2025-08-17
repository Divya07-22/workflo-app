import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
// Import React hooks and Redux selector

import { BriefcaseIcon, CheckCircleIcon, ClockIcon, DocumentDuplicateIcon } from '@heroicons/react/24/outline';
// Import icons from Heroicons for stats cards

import StatCard from '../components/specific/dashboard/StatCard';
import ActivityFeed from '../components/specific/dashboard/ActivityFeed';
import Card from '../components/common/Card';
// Import custom components for dashboard: stat cards, activity feed, and card wrapper

import { selectAllProjects } from '../features/projects/projectsSlice';
import { selectAllTasks } from '../features/tasks/tasksSlice';
import { selectAllNotifications } from '../features/notifications/notificationsSlice';
// Import Redux selectors to access projects, tasks, and notifications state

const DashboardPage = () => {
  // Get all projects from Redux
  const projects = useSelector(selectAllProjects);
  // Get all tasks from Redux
  const tasks = useSelector(selectAllTasks);
  // Get all notifications from Redux
  const notifications = useSelector(selectAllNotifications);

  // Calculate dashboard statistics using useMemo for performance optimization
  const stats = useMemo(() => {
    const totalProjects = projects.length; // Total number of projects
    const totalTasks = tasks.length;       // Total number of tasks
    const completedTasks = tasks.filter(task => task.status === 'Done').length; // Tasks marked as Done
    const pendingTasks = totalTasks - completedTasks; // Tasks not yet completed

    // Return an array of stats objects with name, value, and icon
    return [
      { name: 'Total Projects', stat: totalProjects, icon: <BriefcaseIcon /> },
      { name: 'Total Tasks', stat: totalTasks, icon: <DocumentDuplicateIcon /> },
      { name: 'Tasks Completed', stat: completedTasks, icon: <CheckCircleIcon /> },
      { name: 'Pending Tasks', stat: pendingTasks, icon: <ClockIcon /> },
    ];
  }, [projects, tasks]);

  // Filter only unread notifications
  const unreadNotifications = notifications.filter(n => !n.read);

  return (
    <div className="space-y-8">
      {/* Page heading */}
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>

      {/* Statistics cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => (
          <StatCard 
            key={item.name} 
            title={item.name} 
            value={item.stat} 
            icon={item.icon} 
          />
        ))}
      </div>

      {/* Main content: Activity feed + Notifications */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Activity Feed takes 2 columns */}
        <div className="lg:col-span-2">
          <ActivityFeed />
        </div>

        {/* Notifications take 1 column */}
        <div className="lg:col-span-1">
          <Card>
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Notifications</h2>
            {unreadNotifications.length > 0 ? (
              <div>
                {/* Display number of unread notifications */}
                <p className="mb-4 text-gray-600 dark:text-gray-400">
                  You have {unreadNotifications.length} unread notifications.
                </p>
                <ul className="space-y-2">
                  {/* Display up to 3 unread notifications */}
                  {unreadNotifications.slice(0, 3).map(notification => (
                    <li 
                      key={notification.id} 
                      className="text-sm p-2 bg-indigo-50 dark:bg-indigo-900/30 rounded-md text-gray-800 dark:text-gray-300"
                    >
                      {notification.message}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400">No new notifications.</p>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
