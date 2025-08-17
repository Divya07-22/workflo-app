import { createSlice } from '@reduxjs/toolkit';

// Initial state for notifications: starts with an empty list of notifications
const initialState = { items: [] };

// Create a slice for notifications with reducers and actions
const notificationsSlice = createSlice({
  name: 'notifications',   // Slice name (used internally by Redux)
  initialState,
  reducers: {
    // Add a new notification to the list (at the beginning of the array)
    addNotification(state, action) {
      state.items.unshift({
        id: new Date().toISOString(), // Generate unique ID based on timestamp
        ...action.payload,            // Spread payload (e.g., message, type)
        read: false                   // New notifications start as unread
      });
    },

    // Mark all notifications as read
    markAllAsRead(state) {
      state.items.forEach(item => {
        item.read = true; // Update each notification's "read" status
      });
    },
  },
});

// Export actions to use in components
export const { addNotification, markAllAsRead } = notificationsSlice.actions;

// Export the reducer to include in the store
export default notificationsSlice.reducer;

// Selector to get all notifications from Redux store
export const selectAllNotifications = (state) => state.notifications.items;
