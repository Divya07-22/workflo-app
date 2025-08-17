import React, { useState } from 'react';
// Import React and useState hook for managing local state

import { useSelector } from 'react-redux';
// useSelector to access Redux state

import { selectAllProjects } from '../features/projects/projectsSlice';
// Selector to get all projects from Redux store

import ProjectCard from '../components/specific/projects/ProjectCard';
// Component to display individual project info in a card

import Button from '../components/common/Button';
// Reusable button component

import CreateProjectModal from '../components/specific/projects/CreateProjectModal';
// Modal component for creating a new project

const ProjectsPage = () => {
  const projects = useSelector(selectAllProjects);
  // Get all projects from Redux store

  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  // Local state to control visibility of the create project modal

  return (
    <div>
      {/* Header section with title and create project button */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Projects</h1>
        {/* Page title */}
        <div className="w-48">
          <Button onClick={() => setCreateModalOpen(true)}>
            {/* Open the create project modal when clicked */}
            Create New Project
          </Button>
        </div>
      </div>

      {/* Grid layout for displaying all project cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          // Render a ProjectCard for each project
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {/* Modal for creating a new project */}
      <CreateProjectModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setCreateModalOpen(false)} 
      />
    </div>
  );
};

export default ProjectsPage;
// Export the component for use in routing
