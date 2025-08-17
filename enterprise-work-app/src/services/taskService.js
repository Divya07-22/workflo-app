// Import initial mock task data from JSON file
import tasks from '../data/tasks.json';

// Create a copy of tasks to simulate in-memory database
let mockTasks = [...tasks];

// Helper function to simulate network delay (300ms)
const simulateDelay = () => new Promise(resolve => setTimeout(resolve, 300));

// Function to fetch all tasks
export const getTasks = async () => {
    await simulateDelay();           // Simulate network/server delay
    return [...mockTasks];           // Return a copy of all tasks
};

// Function to create a new task
export const createTask = async (taskData) => {
    await simulateDelay();           // Simulate delay

    // Create new task object with default values
    const newTask = {
        id: `task-${Date.now()}`,    // Generate unique ID using timestamp
        ...taskData,                 // Spread user-provided task data
        status: 'To Do',             // Default status for new task
        comments: [],                // Initialize empty comments array
        attachments: [],             // Initialize empty attachments array
        projectId: 'proj-1',         // Assign task to the first project by default
    };

    mockTasks.push(newTask);         // Add the new task to in-memory database
    return newTask;                  // Return the newly created task
};

// Function to update an existing task
export const updateTask = async (taskData) => {
    await simulateDelay();           // Simulate delay

    // Update the task in the mock database
    mockTasks = mockTasks.map(t =>
        t.id === taskData.id ? { ...t, ...taskData } : t
    );

    return taskData;                 // Return the updated task
};

// Function to delete a task by ID
export const deleteTask = async (taskId) => {
    await simulateDelay();           // Simulate delay

    // Remove the task from mock database
    mockTasks = mockTasks.filter(t => t.id !== taskId);

    return { success: true };        // Return success confirmation
};
