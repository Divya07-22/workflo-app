import { createSlice } from '@reduxjs/toolkit'; // Import Redux Toolkit function to create slices

// Helper function to apply the theme to the document and store it in localStorage
const applyTheme = (theme) => {
  if (theme === 'dark') {
    document.documentElement.classList.add('dark'); // Add 'dark' class to <html> for dark mode
  } else {
    document.documentElement.classList.remove('dark'); // Remove 'dark' class for light mode
  }
  localStorage.setItem('theme', theme); // Persist current theme in localStorage
};

// Initial state of the theme slice
const initialState = { 
  mode: localStorage.getItem('theme') || 'light' // Load theme from localStorage or default to 'light'
};

// Immediately apply the theme on initial load
applyTheme(initialState.mode);

// Create the theme slice
const themeSlice = createSlice({
  name: 'theme', // Name of the slice
  initialState,  // Initial state
  reducers: {
    // Reducer to toggle between light and dark modes
    toggleTheme: (state) => {
      const newTheme = state.mode === 'light' ? 'dark' : 'light'; // Determine new theme
      state.mode = newTheme; // Update state
      applyTheme(newTheme); // Apply the theme and save to localStorage
    },
  },
});

// Export the toggleTheme action
export const { toggleTheme } = themeSlice.actions;

// Export the reducer to configure the store
export default themeSlice.reducer;
