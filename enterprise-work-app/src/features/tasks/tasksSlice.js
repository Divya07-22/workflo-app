import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'; // Import Redux Toolkit functions
import { toast } from 'react-toastify'; // Import toast notifications
import * as taskService from '../../services/taskService'; // Import API service functions for tasks
import { addNotification } from '../notifications/notificationsSlice'; // Import action to add notifications

// Initial state of the tasks slice
const initialState = { 
  items: [],    // Array to store all tasks
  status: 'idle', // Async operation status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,  // Error message if any async action fails
};

// Async thunk to fetch all tasks
export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks', 
  async () => await taskService.getTasks()
);

// Async thunk to create a new task
export const createNewTask = createAsyncThunk(
  'tasks/createNewTask', 
  async (taskData, { dispatch }) => {
    const newTask = await taskService.createTask(taskData); // Call API to create task
    toast.success(`Task "${newTask.title}" created!`); // Show success toast
    dispatch(addNotification({ message: `New task added: ${newTask.title}` })); // Dispatch notification
    return newTask; // Return new task to update state
  }
);

// Async thunk to update an existing task
export const updateTask = createAsyncThunk(
  'tasks/updateTask', 
  async (taskData, { dispatch }) => {
    const updatedTask = await taskService.updateTask(taskData); // Call API to update task
    toast.success(`Task "${updatedTask.title}" updated!`); // Show success toast
    dispatch(addNotification({ message: `Task updated: ${updatedTask.title}` })); // Dispatch notification
    return updatedTask; // Return updated task to update state
  }
);

// Async thunk to delete a task
export const deleteTask = createAsyncThunk(
  'tasks/deleteTask', 
  async (taskId, { dispatch, getState }) => {
    const task = getState().tasks.items.find(t => t.id === taskId); // Find task before deletion
    await taskService.deleteTask(taskId); // Call API to delete task
    toast.info('Task deleted.'); // Show info toast
    dispatch(addNotification({ message: `Task deleted: ${task?.title || ''}` })); // Dispatch notification
    return taskId; // Return id to remove task from state
  }
);

// Create the tasks slice
const tasksSlice = createSlice({
  name: 'tasks', // Name of the slice
  initialState,  // Initial state
  reducers: {
    // Synchronous reducer to update task status
    updateTaskStatus: (state, action) => {
      const { taskId, newStatus } = action.payload; // Get task ID and new status
      const task = state.items.find(t => t.id === taskId); // Find task by ID
      if (task) {
        task.status = newStatus; // Update status
        toast.info(`Task "${task.title}" moved to ${newStatus}`); // Show info toast
      }
    },
    // Reducer to add a comment to a task
    addCommentToTask: (state, action) => {
        const { taskId } = action.payload; // Get task ID
        const task = state.items.find(t => t.id === taskId); // Find task
        if (task) {
            if (!task.comments) task.comments = []; // Initialize comments array if not exist
            task.comments.push({ id: `com-${Date.now()}`, ...action.payload.comment, date: new Date().toISOString() }); // Add comment
            toast.success("Comment added!"); // Show success toast
        }
    },
    // Reducer to add an attachment to a task
    addAttachmentToTask: (state, action) => {
        const { taskId } = action.payload; // Get task ID
        const task = state.items.find(t => t.id === taskId); // Find task
        if (task) {
            if (!task.attachments) task.attachments = []; // Initialize attachments array if not exist
            task.attachments.push({ id: `att-${Date.now()}`, ...action.payload.attachment }); // Add attachment
            toast.success("Attachment added!"); // Show success toast
        }
    }
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchTasks pending state
      .addCase(fetchTasks.pending, (state) => { state.status = 'loading'; })
      // Handle fetchTasks fulfilled state
      .addCase(fetchTasks.fulfilled, (state, action) => { 
        state.status = 'succeeded'; 
        state.items = action.payload; 
      })
      // Handle fetchTasks rejected state
      .addCase(fetchTasks.rejected, (state, action) => { 
        state.status = 'failed'; 
        state.error = action.error.message; 
      })
      // Handle createNewTask fulfilled state
      .addCase(createNewTask.fulfilled, (state, action) => { state.items.push(action.payload); })
      // Handle updateTask fulfilled state
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.items.findIndex(t => t.id === action.payload.id); // Find task index
        if (index !== -1) state.items[index] = action.payload; // Update task in array
      })
      // Handle deleteTask fulfilled state
      .addCase(deleteTask.fulfilled, (state, action) => {
          state.items = state.items.filter(task => task.id !== action.payload); // Remove task from state
      });
  },
});

// Export synchronous actions
export const { updateTaskStatus, addCommentToTask, addAttachmentToTask } = tasksSlice.actions;

// Export the reducer to configure the store
export default tasksSlice.reducer;

// Selector to get all tasks from state
export const selectAllTasks = (state) => state.tasks.items;
