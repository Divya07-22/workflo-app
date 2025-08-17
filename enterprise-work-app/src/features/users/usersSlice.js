import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'; 
// Import Redux Toolkit functions to create slices and handle async actions

import { toast } from 'react-toastify'; 
// Import toast for showing notifications

import * as userService from '../../services/userService'; 
// Import service functions to interact with backend API for users

import { addNotification } from '../notifications/notificationsSlice'; 
// Import action to add app notifications

// Initial state for users slice
const initialState = { 
  items: [],       // Array to hold all user objects
  status: 'idle',  // Status of async operations: 'idle', 'loading', 'succeeded', 'failed'
  error: null,     // Holds any error message
};

// Async thunk to fetch all users from backend
export const fetchUsers = createAsyncThunk(
  'users/fetchUsers', 
  async () => await userService.getUsers() // Calls service function to fetch users
);

// Async thunk to create a new user
export const createNewUser = createAsyncThunk(
  'users/createNewUser', 
  async (userData, { dispatch }) => {
    const newUser = await userService.createUser(userData); // Call API to create user
    toast.success('User created successfully!'); // Show success toast
    dispatch(addNotification({ message: `New user created: ${newUser.name}` })); // Add notification
    return newUser; // Return newly created user to update Redux state
  }
);

// Async thunk to update an existing user
export const updateUser = createAsyncThunk(
  'users/updateUser', 
  async (userData, { dispatch }) => {
    const updatedUser = await userService.updateUser(userData); // Call API to update user
    toast.success('User updated successfully!'); // Show success toast
    dispatch(addNotification({ message: `User updated: ${updatedUser.name}` })); // Add notification
    return updatedUser; // Return updated user to update Redux state
  }
);

// Async thunk to delete a user
export const deleteUser = createAsyncThunk(
  'users/deleteUser', 
  async (userId, { dispatch, getState }) => {
    const user = getState().users.items.find(u => u.id === userId); // Get user object from state
    await userService.deleteUser(userId); // Call API to delete user
    toast.info('User deleted.'); // Show info toast
    dispatch(addNotification({ message: `User deleted: ${user?.name || ''}` })); // Add notification
    return userId; // Return deleted user's id to update Redux state
  }
);

// Create the users slice
const usersSlice = createSlice({
  name: 'users', // Slice name
  initialState,  // Set initial state
  reducers: {},  // No synchronous reducers in this slice
  extraReducers: (builder) => { // Handle async thunks
    builder
        // Pending state for fetching users
        .addCase(fetchUsers.pending, (state) => { state.status = 'loading'; })
        // Fulfilled state for fetching users
        .addCase(fetchUsers.fulfilled, (state, action) => { 
          state.status = 'succeeded'; 
          state.items = action.payload; // Update users array with fetched users
        })
        // Rejected state for fetching users
        .addCase(fetchUsers.rejected, (state, action) => { 
          state.status = 'failed'; 
          state.error = action.error.message; // Save error message
        })
        // Fulfilled state for creating a new user
        .addCase(createNewUser.fulfilled, (state, action) => { 
          state.items.push(action.payload); // Add new user to array
        })
        // Fulfilled state for updating a user
        .addCase(updateUser.fulfilled, (state, action) => {
            const index = state.items.findIndex(u => u.id === action.payload.id); // Find user index
            if (index !== -1) state.items[index] = action.payload; // Replace with updated user
        })
        // Fulfilled state for deleting a user
        .addCase(deleteUser.fulfilled, (state, action) => {
            state.items = state.items.filter(u => u.id !== action.payload); // Remove user from array
        });
  },
});

// Export reducer to configure store
export default usersSlice.reducer;

// Selector to get all users from state
export const selectAllUsers = (state) => state.users.items;
