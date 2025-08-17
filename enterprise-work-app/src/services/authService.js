// Simulated login function
export const login = async (credentials) => {
  // Simulate network delay of 500ms
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Store the password in localStorage (simulated database)
  localStorage.setItem('user_password', credentials.password);

  // Extract the name from email for display purposes
  const email = credentials.email.toLowerCase();
  const nameFromEmail = email.split('@')[0].replace(/[^a-zA-Z]/g, ''); // Keep only letters
  const capitalizedName = nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1);

  // Determine user role based on email keywords
  let role = 'Employee';
  if (email.includes('admin')) {
    role = 'Admin';
  } else if (email.includes('manager')) {
    role = 'Manager';
  }

  // Return simulated user object and a fake JWT token
  return {
    user: {
      id: `user-${Date.now()}`, // Unique ID using timestamp
      name: capitalizedName,
      email: credentials.email,
      role: role,
    },
    accessToken: `fake-${role.toLowerCase()}-jwt-token-${Date.now()}`,
  };
};

// Simulated signup function
export const signup = async (details) => {
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate delay
  
  // Save password in localStorage as "database"
  localStorage.setItem('user_password', details.password);

  // Return new user object and a fake JWT token
  return {
    user: {
      id: `user-${Date.now()}`,
      name: details.name,
      email: details.email,
      role: details.role,
    },
    accessToken: `new-fake-${details.role.toLowerCase()}-jwt-token-${Date.now()}`,
  };
};

// Simulated profile update function
export const updateProfile = async (userData) => {
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate delay
  return userData; // Return updated user data
};

// Simulated change password function
export const changePassword = async (passwordData) => {
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate delay
  
  const savedPassword = localStorage.getItem('user_password'); // Get saved password

  if (!savedPassword) {
    // No password stored (user not logged in properly)
    throw new Error("No password found. Please log out and log back in.");
  }

  if (passwordData.currentPassword !== savedPassword) {
    // Current password does not match
    throw new Error("The current password you entered is incorrect.");
  }

  if (passwordData.currentPassword === passwordData.newPassword) {
    // New password same as current
    throw new Error("New password cannot be the same as the old password.");
  }

  // Update password in localStorage
  localStorage.setItem('user_password', passwordData.newPassword);
  
  return { success: true, message: "Password changed successfully." };
};
