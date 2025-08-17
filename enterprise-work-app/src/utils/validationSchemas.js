// First, we import the 'yup' library, which is a powerful tool for validating data objects.
import * as yup from 'yup';

// We define a "regular expression" (regex) to check if an email format is valid.
// This looks for a pattern like "something@something.com".
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// We define a more complex regex for a strong password.
// It checks for: at least one lowercase letter, one uppercase letter, one number,
// one special character (@$!%*?&), and a minimum length of 8 characters.
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

// We export a 'loginSchema' which defines the rules for the login form data.
export const loginSchema = yup.object().shape({
  // The 'email' field must be a string.
  email: yup.string()
    // It must match the email regex we defined earlier.
    .matches(emailRegex, 'Please enter a valid email address')
    // It is a required field, and this is the error message if it's empty.
    .required('Email is required'),

  // The 'password' field must be a string.
  password: yup.string()
    // It must have a minimum of 8 characters.
    .min(8, 'Password must be at least 8 characters')
    // It must also match the strong password regex.
    .matches(passwordRegex, 'Password requires one uppercase, one lowercase, one number, and one special character')
    // It is a required field.
    .required('Password is required'),
});

// This schema defines the rules for the signup form.
export const signupSchema = yup.object().shape({
  // The 'name' field must be a string.
  name: yup.string()
    // We remove any extra whitespace from the beginning or end.
    .trim()
    // It must have a minimum of 2 characters.
    .min(2, 'Name must be at least 2 characters')
    // It is required.
    .required('Full name is required'),
  
  // The email rules are the same as in the login schema.
  email: yup.string().matches(emailRegex, 'Please enter a valid email address').required('Email is required'),
  
  // The password rules are the same as in the login schema.
  password: yup.string().min(8, 'Password must be at least 8 characters').matches(passwordRegex, 'Password requires one uppercase, one lowercase, one number, and one special character').required('Password is required'),
  
  // The 'role' field must be a string.
  role: yup.string()
    // It must be one of the three values in this list.
    .oneOf(['Admin', 'Manager', 'Employee'], 'Please select a valid role')
    // It is required.
    .required('Role is required'),
});

// This schema defines the rules for editing a user's profile.
export const profileSchema = yup.object().shape({
    name: yup.string().trim().min(2, 'Name must be at least 2 characters').required('Full name is required'),
    email: yup.string().matches(emailRegex, 'Please enter a valid email address').required('Email is required'),
});

// This schema defines the rules for the 'Change Password' form.
export const passwordChangeSchema = yup.object().shape({
    // The 'currentPassword' field is required.
    currentPassword: yup.string().required('Current password is required'),
    
    // The 'newPassword' field must follow the strong password rules.
    newPassword: yup.string().min(8, 'Password must be at least 8 characters').matches(passwordRegex, 'Password requires one uppercase, one lowercase, one number, and one special character').required('New password is required'),
    
    // The 'confirmPassword' field must be a string.
    confirmPassword: yup.string()
      // It must match the value of the 'newPassword' field.
      .oneOf([yup.ref('newPassword'), null], 'Passwords must match')
      // It is required.
      .required('Please confirm your new password'),
});

// This schema defines the rules for creating or editing a user in the User Management section.
export const userSchema = yup.object().shape({
    name: yup.string().trim().min(2, 'Name must be at least 2 characters').required('Full name is required'),
    email: yup.string().matches(emailRegex, 'Please enter a valid email address').required('Email is required'),
    role: yup.string().required('Role is required'),
});

// This schema defines the rules for creating or editing a project.
export const projectSchema = yup.object().shape({
  name: yup.string().min(3, 'Project name must be at least 3 characters').required('Project name is required'),
  // The 'description' field is a string but is not required.
  description: yup.string(),
});

// This schema defines the rules for creating or editing a task.
export const taskSchema = yup.object().shape({
    title: yup.string().min(3, 'Task title must be at least 3 characters').required('Task title is required'),
    description: yup.string(), // Description is optional.
    
    // 'dueDate' must be a valid date.
    dueDate: yup.date()
      .required('Due date is required')
      // This is the error message if the input is not a recognizable date.
      .typeError('Please enter a valid date'),
      
    assignee: yup.string().required('Assignee is required'),
    priority: yup.string().required('Priority is required'),
    type: yup.string().required('Task type is required'),
});