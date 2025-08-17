// We import the necessary tools from React and the testing library.
import React from 'react';
import { render, screen } from '@testing-library/react';
// We import the Card component that we want to test.
import Card from '../../src/components/common/Card';

// We start a test suite for the "Card Component".
describe('Card Component', () => {
  // This is a single test case to check if the component renders its "children".
  // "children" is a special prop in React that refers to whatever is placed inside the component's tags.
  it('renders its children', () => {
    // ARRANGE: We render the Card component with a <p> tag inside it.
    render(<Card><p>Card Content</p></Card>);
    
    // ACT & ASSERT: We look for the text "Card Content" on the screen.
    // If the text is found, it means the Card successfully rendered its child content.
    expect(screen.getByText('Card Content')).toBeInTheDocument();
  });
});