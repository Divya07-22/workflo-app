// Import Redux Toolkit helpers for creating slices and async thunks
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// Import toast notifications for showing success/error messages
import { toast } from 'react-toastify';
// Import authentication service functions (login, signup, updateProfile, etc.)
import * as authService from '../../services/authService';

// Try to load the user and token from localStorage (persisted session)
const user = JSON.parse(localStorage.getItem('user'));
const token = localStorage.getItem('token');

// Define initial state for authentication
const initialState = {
  user: user || null,       // store logged-in user object
  token: token || null,     // store JWT access token
  status: 'idle',           // idle | loading | succeeded | failed
  error: null,              // stores error messages
};

/* ------------------- THUNKS (async actions) ------------------- */

// Thunk for logging in a user
export const loginUser = createAsyncThunk('auth/loginUser', async (credentials, { rejectWithValue }) => {
  try {
    const data = await authService.login(credentials); // call API to log in
    toast.success('Login successful!'); // show success toast
    return data; // return user + token data
  } catch (error) {
    toast.error(error.message || 'Failed to login.'); // show error toast
    return rejectWithValue(error.message); // reject with error message
  }
});

// Thunk for signing up a new user
export const signupUser = createAsyncThunk('auth/signupUser', async (details, { rejectWithValue }) => {
  try {
    const data = await authService.signup(details); // call API to create user
    toast.success('Account created successfully!'); // success toast
    return data; // return new user + token
  } catch (error) {
    toast.error(error.message || 'Failed to sign up.'); // error toast
    return rejectWithValue(error.message); // reject with error
  }
});

// Thunk for updating user profile
export const updateUserProfile = createAsyncThunk('auth/updateUserProfile', async (userData, { rejectWithValue }) => {
  try {
    const updatedUser = await authService.updateProfile(userData); // API call
    toast.success('Profile updated successfully!');
    return updatedUser; // return updated user info
  } catch (error) {
    toast.error('Failed to update profile.'); // error toast
    return rejectWithValue(error.message);
  }
});

// Thunk for changing user password
export const changeUserPassword = createAsyncThunk('auth/changeUserPassword', async (passwordData, { rejectWithValue }) => {
  try {
    await authService.changePassword(passwordData); // API call
    toast.success('Password changed successfully!');
  } catch (error) {
    // Display specific error from backend if available
    toast.error(error.message || 'Failed to change password.');
    // Reject with specific error so UI form can show it
    return rejectWithValue(error.message);
  }
});

/* ------------------- SLICE ------------------- */

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Action to log out user
    logOut: (state) => {
      state.user = null;  // clear user data
      state.token = null; // clear token
      localStorage.clear(); // clear local storage
      toast.info('You have been logged out.'); // info toast
    },
  },
  extraReducers: (builder) => {
    // Helper function for successful login/signup
    const handleAuthFulfilled = (state, action) => {
      state.status = 'succeeded'; // mark request as successful
      const { user, accessToken } = action.payload; // extract data from API
      state.user = user; // save user in Redux state
      state.token = accessToken; // save token
      localStorage.setItem('user', JSON.stringify(user)); // persist user
      localStorage.setItem('token', accessToken); // persist token
    };

    builder
      // When profile update succeeds, merge new data with old user data
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.user = { ...state.user, ...action.payload };
        localStorage.setItem('user', JSON.stringify(state.user)); // update localStorage
      })
      // Reuse same success handler for login and signup
      .addMatcher(
        (action) => ['auth/loginUser/fulfilled', 'auth/signupUser/fulfilled'].includes(action.type),
        handleAuthFulfilled
      );
  },
});

// Export logout action
export const { logOut } = authSlice.actions;

// Export reducer (to be used in store.js)
export default authSlice.reducer;

// Selector for accessing current user
export const selectCurrentUser = (state) => state.auth.user;
