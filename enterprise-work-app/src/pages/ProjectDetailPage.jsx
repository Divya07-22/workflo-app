import React, { useState } from 'react';
// Import React and useState hook to manage local state

import { useParams, Link } from 'react-router-dom';
// useParams to get dynamic route parameters, Link to navigate between pages

import { useSelector } from 'react-redux';
// useSelector to access Redux state

import { selectAllProjects } from '../features/projects/projectsSlice';
import { selectAllTasks } from '../features/tasks/tasksSlice';
// Selectors to get all projects and tasks from Redux store

import Card from '../components/common/Card';
// Card component for consistent styled container

import TaskCard from '../components/specific/tasks/TaskCard';
import TaskDetailModal from '../components/specific/tasks/TaskDetailModal';
// Components for displaying individual tasks and detailed task modal

const ProjectDetailPage = () => {
  const { projectId } = useParams();
  // Extract the projectId from URL params

  const allProjects = useSelector(selectAllProjects);
  const allTasks = useSelector(selectAllTasks);
  // Get all projects and tasks from Redux store

  const [viewingTask, setViewingTask] = useState(null);
  // Local state to track the task currently being viewed in detail

  const project = allProjects.find(p => p.id.toString() === projectId);
  // Find the project that matches the route parameter

  const projectTasks = allTasks.filter(t => t.projectId === projectId);
  // Filter tasks that belong to this specific project

  if (!project) {
    // If project is not found, show a fallback UI
    return (
        <div className="text-center mt-16">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Project Not Found</h1>
            <p className="mt-4 text-gray-600 dark:text-gray-400">The project you are looking for does not exist.</p>
            <Link to="/projects" className="mt-6 inline-block px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                Back to Projects
            </Link>
        </div>
    );
  }

  return (
    <>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Project: {project.name}</h1>
          {/* Display project name */}
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">{project.description}</p>
          {/* Display project description */}
        </div>
        
        <Card>
          <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Tasks in this Project</h2>
          {/* Section heading for tasks */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projectTasks.length > 0 ? (
              projectTasks.map(task => (
                <TaskCard 
                  key={task.id} 
                  task={task} 
                  onViewDetails={() => setViewingTask(task)}
                  // Clicking a task opens the TaskDetailModal
                />
              ))
            ) : (
              <p className="text-gray-500 dark:text-gray-400 col-span-full">No tasks found for this project.</p>
              // Fallback message if no tasks are assigned
            )}
          </div>
        </Card>
      </div>

      <TaskDetailModal 
        isOpen={!!viewingTask} 
        onClose={() => setViewingTask(null)} 
        task={viewingTask} 
        // Pass the selected task to the modal and control its visibility
      />
    </>
  );
};

export default ProjectDetailPage;
// Export the component for routing
