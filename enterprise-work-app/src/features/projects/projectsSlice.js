import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import * as projectService from '../../services/projectService';
import { addNotification } from '../notifications/notificationsSlice';

// Initial state for the projects slice
const initialState = { 
  items: [],     // Array to store projects
  status: 'idle', // Status for async operations: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,    // To store any error messages
};

// Async thunk to fetch all projects
export const fetchProjects = createAsyncThunk(
  'projects/fetchProjects', 
  async () => await projectService.getProjects()
);

// Async thunk to create a new project
export const createNewProject = createAsyncThunk(
  'projects/createNewProject', 
  async (projectData, { dispatch }) => {
    const newProject = await projectService.createProject(projectData);
    toast.success(`Project "${newProject.name}" created successfully!`); // Show toast notification
    dispatch(addNotification({ message: `New project created: ${newProject.name}` })); // Add notification
    return newProject; // Return data to update state
  }
);

// Async thunk to update an existing project
export const updateProject = createAsyncThunk(
  'projects/updateProject', 
  async (projectData, { dispatch }) => {
    const updatedProject = await projectService.updateProject(projectData);
    toast.success(`Project "${updatedProject.name}" updated!`);
    dispatch(addNotification({ message: `Project updated: ${updatedProject.name}` }));
    return updatedProject;
  }
);

// Async thunk to delete a project
export const deleteProject = createAsyncThunk(
  'projects/deleteProject', 
  async (projectId, { dispatch, getState }) => {
    // Get project info before deletion (to include in notification)
    const project = getState().projects.items.find(p => p.id === projectId);
    await projectService.deleteProject(projectId); // Call API to delete
    toast.info('Project deleted.');
    dispatch(addNotification({ message: `Project deleted: ${project?.name || ''}` }));
    return projectId; // Return id to remove from state
  }
);

// Create projects slice
const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {}, // No synchronous reducers needed for now
  extraReducers: (builder) => {
    builder
      // Fetch projects
      .addCase(fetchProjects.pending, (state) => { 
        state.status = 'loading'; 
      })
      .addCase(fetchProjects.fulfilled, (state, action) => { 
        state.status = 'succeeded'; 
        state.items = action.payload; 
      })
      .addCase(fetchProjects.rejected, (state, action) => { 
        state.status = 'failed'; 
        state.error = action.error.message; 
      })

      // Create project
      .addCase(createNewProject.fulfilled, (state, action) => { 
        state.items.push(action.payload); 
      })

      // Update project
      .addCase(updateProject.fulfilled, (state, action) => {
        const index = state.items.findIndex(p => p.id === action.payload.id);
        if (index !== -1) state.items[index] = action.payload;
      })

      // Delete project
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.items = state.items.filter(p => p.id !== action.payload);
      });
  },
});

// Export the reducer for store configuration
export default projectsSlice.reducer;

// Selector to get all projects from the state
export const selectAllProjects = (state) => state.projects.items;
