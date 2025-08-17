import React from 'react';
import { render, screen } from '@testing-library/react';
// We need the Redux 'Provider' because TaskCard uses Redux hooks (like useDispatch).
import { Provider } from 'react-redux';
// We need the 'DndContext' because TaskCard uses drag-and-drop hooks.
import { DndContext } from '@dnd-kit/core';
// We import our actual Redux store to provide it to the component.
import { store } from '../../src/app/store';
// We import the TaskCard component we want to test.
import TaskCard from '../../src/components/specific/tasks/TaskCard';

// We create a "mock" or fake task object to pass as a prop to our component.
const mockTask = {
  id: 'task-1',
  title: 'Test this card',
  priority: 'High',
  type: 'Bug',
  assignee: 'Test User',
  dueDate: new Date().toISOString(),
};

// We start a test suite for the "TaskCard Component".
describe('TaskCard Component', () => {
  // This test case checks if the task's title is rendered correctly.
  it('renders the task title', () => {
    // ARRANGE: We render the TaskCard, making sure to wrap it in the necessary
    // Provider (for Redux) and DndContext (for drag-and-drop) so it doesn't crash.
    render(
      <Provider store={store}>
        <DndContext>
          <TaskCard task={mockTask} />
        </DndContext>
      </Provider>
    );
    
    // ACT & ASSERT: We look for the title of our mock task on the screen.
    expect(screen.getByText('Test this card')).toBeInTheDocument();
  });
});