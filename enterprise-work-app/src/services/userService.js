// Import initial mock user data from JSON file
import users from '../data/users.json';

// Create a copy of users to simulate an in-memory database
let mockUsers = [...users];

// Helper function to simulate network/server delay (300ms)
const simulateDelay = () => new Promise(resolve => setTimeout(resolve, 300));

// Function to fetch all users
export const getUsers = async () => {
  await simulateDelay();            // Simulate network delay
  return [...mockUsers];            // Return a copy of all users
};

// Function to create a new user
export const createUser = async (userData) => {
  await simulateDelay();            // Simulate delay

  // Create new user object with default values
  const newUser = {
    id: `user-${Date.now()}`,       // Generate unique ID using timestamp
    ...userData,                    // Spread user-provided data
    status: 'Active',               // Default status for new users
    lastActivity: new Date().toISOString(),  // Set current timestamp as last activity
  };

  mockUsers.push(newUser);          // Add the new user to the mock database
  return newUser;                   // Return the newly created user
};

// Function to update an existing user
export const updateUser = async (userData) => {
  await simulateDelay();            // Simulate delay

  // Update the user in the mock database
  mockUsers = mockUsers.map(user =>
    user.id === userData.id ? { ...user, ...userData } : user
  );

  return userData;                  // Return the updated user
};

// Function to delete a user by ID
export const deleteUser = async (userId) => {
  await simulateDelay();            // Simulate delay

  // Remove the user from the mock database
  mockUsers = mockUsers.filter(user => user.id !== userId);

  return { success: true };         // Return success confirmation
};
