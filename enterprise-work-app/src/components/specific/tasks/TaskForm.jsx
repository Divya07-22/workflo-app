// Import React and useEffect hook
import React, { useEffect } from 'react';
// Import react-hook-form for form handling
import { useForm } from 'react-hook-form';
// Import yupResolver to connect Yup schema validation with react-hook-form
import { yupResolver } from '@hookform/resolvers/yup';
// Import validation schema for tasks
import { taskSchema } from '../../../utils/validationSchemas';
// Import reusable form components
import Input from '../../common/Input';
import Button from '../../common/Button';
// Import Redux hook and selector to get users list
import { useSelector } from 'react-redux';
import { selectAllUsers } from '../../../features/users/usersSlice';

// TaskForm component handles both creating and editing tasks
const TaskForm = ({ onSubmit, onCancel, isSubmitting, initialData = null }) => {
  // Get list of users from Redux store
  const users = useSelector(selectAllUsers);

  // Setup react-hook-form with validation and default values
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(taskSchema), // Apply Yup validation
    defaultValues: initialData || {     // Use initialData if editing, otherwise defaults
      title: '', 
      description: '',
      type: 'Feature', 
      priority: 'Medium', 
      assignee: 'Unassigned',
      dueDate: new Date().toISOString().split('T')[0], // Default to today's date
    }
  });

  // Sync form values when editing an existing task
  useEffect(() => {
    if (initialData?.dueDate) {
      // Convert stored date into YYYY-MM-DD format for <input type="date">
      const formattedData = {
        ...initialData,
        dueDate: new Date(initialData.dueDate).toISOString().split('T')[0]
      };
      reset(formattedData); // Reset form with formatted values
    } else {
      reset(initialData); // Reset form with provided data (if any)
    }
  }, [initialData, reset]);

  return (
    // Form wrapper with submit handler
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

      {/* Task title field */}
      <Input label="Task Title" name="title" register={register} errors={errors} />
      
      {/* Task description field */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Description
        </label>
        <textarea 
          id="description"
          {...register('description')} 
          rows={3} 
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm 
                     focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm 
                     dark:bg-gray-900 dark:border-gray-600 dark:text-gray-300" 
        />
      </div>

      {/* Task type selection */}
      <div>
        <label htmlFor="type" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Task Type
        </label>
        <select 
          id="type" 
          {...register('type')} 
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 
                     focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm 
                     dark:bg-gray-900 dark:border-gray-600 dark:text-gray-300"
        >
          <option>Feature</option>
          <option>Bug</option>
          <option>Improvement</option>
        </select>
      </div>

      {/* Task priority selection */}
      <div>
        <label htmlFor="priority" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Priority
        </label>
        <select 
          id="priority" 
          {...register('priority')} 
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 
                     focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm 
                     dark:bg-gray-900 dark:border-gray-600 dark:text-gray-300"
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
      </div>

      {/* Due date input */}
      <Input label="Due Date" name="dueDate" type="date" register={register} errors={errors} />

      {/* Assignee dropdown */}
      <div>
        <label htmlFor="assignee" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Assign To
        </label>
        <select 
          id="assignee" 
          {...register('assignee')} 
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 
                     focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm 
                     dark:bg-gray-900 dark:border-gray-600 dark:text-gray-300"
        >
          <option>Unassigned</option>
          {/* Populate with user list from Redux */}
          {users.map(user => (
            <option key={user.id} value={user.name}>{user.name}</option>
          ))}
        </select>
      </div>

      {/* Action buttons */}
      <div className="flex justify-end space-x-2 pt-4">
        {/* Cancel button (triggers onCancel callback) */}
        <Button onClick={onCancel} variant="secondary" type="button">Cancel</Button>
        
        {/* Submit button (shows loading state if submitting) */}
        <Button type="submit" isLoading={isSubmitting}>
          {initialData ? 'Save Changes' : 'Create Task'}
        </Button>
      </div>
    </form>
  );
};

// Export component
export default TaskForm;
