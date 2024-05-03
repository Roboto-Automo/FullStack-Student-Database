import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';


test('Renders Title', () => {
  render(<App />, {wrapper: BrowserRouter})
  // const user = userEvent.setup()
  const titleElement = screen.getByText(/Student Database/i);
  expect(titleElement).toBeInTheDocument();
});

test('Renders elements based on admin state', () => {
  // Render the app component with admin state set to true
  render(<App />, {wrapper: BrowserRouter})

   // Check if the Student View button is rendered initially
   const studentViewButton = screen.getByText('Student View');
   expect(studentViewButton).toBeInTheDocument();
 

  // Check if the Add Student form is rendered initially
  const nameInput = screen.queryByPlaceholderText('Name');
  expect(nameInput).toBeInTheDocument();

   // Check if the Age input field is visible initially
   const ageInput = screen.getByPlaceholderText('Age');
   expect(ageInput).toBeInTheDocument();

     // Check if the Date of Birth input field is visible initially
  const dobInput = screen.getByPlaceholderText('Date of Birth');
  expect(dobInput).toBeInTheDocument();

    // Check if the Email input field is visible initially
    const emailInput = screen.getByPlaceholderText('Email');
    expect(emailInput).toBeInTheDocument();

  // Click the Admin View button to toggle admin state
  fireEvent.click(studentViewButton);

  // Check if the Admin View button changes to Student View after click
  const studentViewButtonAfterClick = screen.getByText('Admin View');
  expect(studentViewButtonAfterClick).toBeInTheDocument();


   // Check if the Name input field is not visible after admin button click
   expect(nameInput).not.toBeInTheDocument();

   // Check if the Age input field is not visible after admin button click
   expect(ageInput).not.toBeInTheDocument();
 
   // Check if the Date of Birth input field is not visible after admin button click
   expect(dobInput).not.toBeInTheDocument();
 
   // Check if the Email input field is not visible after admin button click
   expect(emailInput).not.toBeInTheDocument();
});


// Mock the fetch function
global.fetch = jest.fn();

test('Creates new entry on form submission', async () => {
  // Render the component
  render(<App />, {wrapper: BrowserRouter})

  // Fill out form inputs
  const nameInput = screen.getByPlaceholderText('Name');
  const ageInput = screen.getByPlaceholderText('Age');
  const dobInput = screen.getByPlaceholderText('Date of Birth');
  const emailInput = screen.getByPlaceholderText('Email');

  userEvent.type(nameInput, 'Jimmy');
  userEvent.type(ageInput, '25');
  userEvent.type(dobInput, '1999-01-01');
  userEvent.type(emailInput, 'john.doe@example.com');

  // Mock the fetch API to resolve with a success response
  fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => ({}), // Mock response data if needed
  });

  const submitButton = screen.getByText('Add Student');
  fireEvent.click(submitButton);

  // Wait for the updated data to be fetched and displayed
  await waitFor(() => {
    const updatedStudentElement = screen.getByText('Jimmy');
    expect(updatedStudentElement).toBeInTheDocument();
  });

  await waitFor(() => {
    const updatedElement = screen.getByText('1999-01-01');
    expect(updatedElement).toBeInTheDocument();
  });

  await waitFor(() => {
    const updatedElement = screen.getByText('john.doe@example.com');
    expect(updatedElement).toBeInTheDocument();
  });


  await waitFor(() => {
    const updatedElement = screen.getByText('Age: 25');
    expect(updatedElement).toBeInTheDocument();
  });

  // Check if the fetch API was called with the correct data
  expect(fetch).toHaveBeenCalledWith('/api/students', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: expect.stringContaining('"id"'), // Expect any id value here
  });

});