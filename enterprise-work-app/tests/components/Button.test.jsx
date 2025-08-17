// First, we import React, which is necessary for writing any component test.
import React from 'react';

// We import 'render' and 'screen' from React Testing Library.
// 'render' is used to draw our component in a simulated test environment.
// 'screen' is our tool to find and interact with the rendered component.
import { render, screen } from '@testing-library/react';

// Finally, we import the actual Button component that we want to test.
import Button from '../../src/components/common/Button';

// The 'describe' block creates a "test suite". It's a container for all the tests
// related to a single component, in this case, the 'Button Component'.
describe('Button Component', () => {

  // The 'it' block defines an individual "test case".
  // The description should say in plain English what this specific test is checking.
  it('renders its children', () => {

    // ARRANGE: First, we set up the test by rendering the component.
    // We render the Button component with the text "Click Me" inside it.
    render(<Button>Click Me</Button>);

    // ACT & ASSERT: Now, we act like a user and check the result.
    // We use 'screen.getByRole' to find an element with the role of 'button'.
    // To be more specific, we also look for one that has the name (or text) "Click Me".
    // This is the best way to test, as it mimics how a real user or a screen reader finds elements.
    const buttonElement = screen.getByRole('button', { name: /click me/i });

    // This is the final check, called an "assertion".
    // We 'expect' the 'buttonElement' we found to be in the document (i.e., to have been rendered successfully).
    // If it is, the test passes. If it's not found, the test fails.
    expect(buttonElement).toBeInTheDocument();
  });
});