import React from 'react';
import { render, screen } from '@testing-library/react';
// We need 'useForm' to provide the necessary context for our Input component.
import { useForm } from 'react-hook-form';
// We import the Input component we want to test.
import Input from '../../src/components/common/Input';

// This is a small helper component created just for this test.
// The Input component expects to receive a 'register' function from 'react-hook-form'.
// This wrapper provides that function so the Input component doesn't crash during the test.
const TestInputWrapper = () => {
  const { register } = useForm();
  return <Input label="Test Input" name="test" register={register} errors={{}} />;
};

// We start a test suite for the "Input Component".
describe('Input Component', () => {
  // This test case checks if the input is rendered correctly along with its label.
  it('renders the input with its label', () => {
    // ARRANGE: We render our special wrapper component.
    render(<TestInputWrapper />);
    
    // ACT & ASSERT: We use 'getByLabelText' to find the input field by its associated label text.
    // This is the best way to test forms, as it mimics how users with screen readers interact with the UI.
    // If the input associated with "Test Input" is found, the test passes.
    expect(screen.getByLabelText(/test input/i)).toBeInTheDocument();
  });
});