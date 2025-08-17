import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
// 'userEvent' is a tool that simulates real user interactions like typing and clicking.
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
// 'RouterProvider' is needed to render our application with its modern routing setup.
import { RouterProvider } from 'react-router-dom';
import { store } from '../../src/app/store';
import { router } from '../../src/app/router';

// This is the most important part of an integration test. We use 'jest.mock'
// to replace our real API service files with fake ("mocked") versions.
// This allows us to control what the "backend" returns, making our test predictable and fast.
jest.mock('../../src/services/authService', () => ({
  login: jest.fn(() => Promise.resolve({
    user: { name: 'Admin User', email: 'admin@test.com', role: 'Admin' },
    accessToken: 'fake-admin-token',
  })),
}));

jest.mock('../../src/services/projectService', () => ({
  getProjects: jest.fn(() => Promise.resolve([])), // We pretend there are no projects at the start.
  createProject: jest.fn((data) => Promise.resolve({ id: 'proj-123', ...data, status: 'Planning' })),
}));

// We also mock the other services to prevent them from causing errors during this specific test.
jest.mock('../../src/services/taskService', () => ({ getTasks: jest.fn(() => Promise.resolve([])) }));
jest.mock('../../src/services/userService', () => ({ getUsers: jest.fn(() => Promise.resolve([])) }));

// We start a test suite for the "Login and Create Project Flow".
describe('Integration Test: Login and Create Project Flow', () => {
  // This single test case simulates a full user journey.
  it('allows a user to log in and create a new project', async () => {
    // ARRANGE: We render the entire application.
    render(
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    );

    // --- LOGIN STEP ---
    // ACT: We simulate a user typing their email and password.
    await userEvent.type(screen.getByLabelText(/email address/i), 'admin@test.com');
    await userEvent.type(screen.getByLabelText(/password/i), 'Password123!');
    // ACT: We simulate the user clicking the "Sign In" button.
    await userEvent.click(screen.getByRole('button', { name: /sign in/i }));
    
    // --- NAVIGATE STEP ---
    // ASSERT: We use 'waitFor' to wait for the page to update after the login.
    // We check that the Dashboard heading is now visible, proving the login was successful.
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /dashboard/i })).toBeInTheDocument();
    });
    // ACT: Now that we're on the dashboard, we simulate the user clicking the "Projects" link.
    await userEvent.click(screen.getByRole('link', { name: /projects/i }));

    // --- CREATE PROJECT STEP ---
    // ASSERT: We wait for the Projects page to load.
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /projects/i })).toBeInTheDocument();
    });
    // ACT: We simulate the user clicking the "Create New Project" button.
    await userEvent.click(screen.getByRole('button', { name: /create new project/i }));
    
    // ACT: We find the input in the new modal and simulate typing a project name.
    const projectNameInput = await screen.findByLabelText(/project name/i);
    await userEvent.type(projectNameInput, 'My New Awesome Project');
    // ACT: We simulate clicking the final "Create Project" button inside the modal.
    await userEvent.click(screen.getByRole('button', { name: /create project/i }));

    // --- FINAL VERIFICATION ---
    // ASSERT: We wait for the UI to update and check that the new project's name
    // is now visible on the Projects page. This proves the entire flow worked.
    expect(await screen.findByText('My New Awesome Project')).toBeInTheDocument();
  });
});