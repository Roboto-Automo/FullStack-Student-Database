import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import Home from './Pages/Home';
import { BrowserRouter } from 'react-router-dom';


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