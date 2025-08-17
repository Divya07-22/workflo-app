// Import React and useEffect hook
import React, { useEffect } from 'react';

// Import react-hook-form to handle form state and validation
import { useForm } from 'react-hook-form';

// Import yup resolver to connect Yup schema validation with react-hook-form
import { yupResolver } from '@hookform/resolvers/yup';

// Import project validation schema (name, description rules, etc.)
import { projectSchema } from '../../../utils/validationSchemas';

// Import custom reusable Input component
import Input from '../../common/Input';

// Import custom reusable Button component
import Button from '../../common/Button';

// Form component for creating or editing a project
const ProjectForm = ({ onSubmit, onCancel, isSubmitting, initialData = null }) => {
  
  // Initialize form using react-hook-form
  // - register: used to connect inputs to the form
  // - handleSubmit: function that runs when form is submitted
  // - errors: stores validation errors
  // - reset: resets form values
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    // Connect form validation with Yup schema
    resolver: yupResolver(projectSchema),
    // Set default values for the form (use initialData if available, otherwise empty fields)
    defaultValues: initialData || { name: '', description: '' },
  });

  // Re-run whenever initialData changes (e.g., editing a project)
  useEffect(() => {
    // Reset form with new data or fallback to empty fields
    reset(initialData || { name: '', description: '' });
  }, [initialData, reset]);

  // Render the form UI
  return (
    // Form element with submit handler
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      
      {/* Input field for project name */}
      <Input 
        label="Project Name" 
        name="name" 
        register={register} 
        errors={errors} 
      />

      {/* Textarea for project description */}
      <div>
        <label 
          htmlFor="description" 
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Description
        </label>
        <textarea
          id="description"
          name="description"
          // Register this field with react-hook-form
          {...register('description')}
          rows={4}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm 
                     focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm 
                     dark:bg-gray-900 dark:border-gray-600 dark:text-gray-300"
        />
      </div>

      {/* Form action buttons (Cancel + Submit) */}
      <div className="flex justify-end space-x-2 pt-4">
        {/* Cancel button (calls onCancel instead of submitting) */}
        <Button onClick={onCancel} variant="secondary" type="button">
          Cancel
        </Button>

        {/* Submit button (shows loading state when isSubmitting is true) */}
        <Button type="submit" isLoading={isSubmitting}>
          {/* If editing existing project -> show "Save Changes", else -> "Create Project" */}
          {initialData ? 'Save Changes' : 'Create Project'}
        </Button>
      </div>
    </form>
  );
};

// Export component for use in other parts of the app
export default ProjectForm;
