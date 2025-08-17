// Import initial mock project data from JSON file
import projects from '../data/projects.json';

// Create a copy of projects to simulate in-memory database
let mockProjects = [...projects];

// Helper function to simulate network delay (300ms)
const simulateDelay = () => new Promise(resolve => setTimeout(resolve, 300));

// Function to fetch all projects
export const getProjects = async () => {
  await simulateDelay();          // Simulate server/network delay
  return [...mockProjects];       // Return a copy of all projects
};

// Function to create a new project
export const createProject = async (projectData) => {
  await simulateDelay();          // Simulate delay

  // Create new project object with unique ID and default status
  const newProject = { 
    id: `proj-${Date.now()}`,     // Generate unique ID using timestamp
    ...projectData,               // Spread user-provided project data
    status: 'Planning'            // Default status when creating a project
  };

  mockProjects.push(newProject);  // Add new project to in-memory database
  return newProject;              // Return the newly created project
};

// Function to update an existing project
export const updateProject = async (projectData) => {
  await simulateDelay();          // Simulate delay

  // Update project in the mock database
  mockProjects = mockProjects.map(p => 
    p.id === projectData.id ? { ...p, ...projectData } : p
  );

  return projectData;             // Return updated project data
};

// Function to delete a project by ID
export const deleteProject = async (projectId) => {
  await simulateDelay();          // Simulate delay

  // Remove project from mock database
  mockProjects = mockProjects.filter(p => p.id !== projectId);

  return { success: true };       // Return success confirmation
};
