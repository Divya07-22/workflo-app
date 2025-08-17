import React from 'react';
import { render, screen } from '@testing-library/react';
// We import the StatCard component we want to test.
import StatCard from '../../src/components/specific/dashboard/StatCard';

// We start a test suite for the "StatCard Component".
describe('StatCard Component', () => {
  // This test case checks if the component correctly displays the props we pass to it.
  it('renders the title and value', () => {
    // ARRANGE: We render the StatCard with a specific title and value.
    render(<StatCard title="Total Projects" value="25" icon={<span>Icon</span>} />);
    
    // ACT & ASSERT: We check for two things on the screen.
    // First, we expect to find the text "Total Projects".
    expect(screen.getByText('Total Projects')).toBeInTheDocument();
    // Second, we expect to find the text "25".
    expect(screen.getByText('25')).toBeInTheDocument();
  });
});