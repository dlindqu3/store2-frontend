import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import { Router } from 'react-router-dom';
import Register from "./Register";
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

// jest.requireActual(moduleName)
// Returns the actual module instead of a mock, bypassing all checks on whether the module should receive a mock implementation or not.

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
 useNavigate: () => mockedUsedNavigate,
}));

test('it should have an input field for an email', () => {
  render(
    <BrowserRouter>
      <Register />
    </BrowserRouter>
  )
    const element = screen.getByTestId("email-field");
    expect(element).toBeInTheDocument(); 
});

test('it should have a submit button', () => {
  render(
    <BrowserRouter>
      <Register />
    </BrowserRouter>
  )
    const element = screen.getByTestId("submit-button");
    expect(element).toBeInTheDocument(); 
});

test('it should display an error if there is no username, email, or password provided on submit', async () => {
  render(
    <BrowserRouter>
      <Register />
    </BrowserRouter>
  )
  const buttonElement = screen.getByTestId("submit-button"); 
  userEvent.click(buttonElement);
  // watch for p tag with data-testid="signup-error"
  const errorElement = await screen.findByTestId("signup-error"); 
  expect(errorElement).toBeInTheDocument(); 
});

test('it should display an error if the email does not include text@text', async () => {
  render(
    <BrowserRouter>
      <Register />
    </BrowserRouter>
  )

  // add a valid username 
  const usernameElement = screen.getByTestId("username-field");
  userEvent.type(usernameElement, "batman");

  // fireEvent is BAD, deprecated 
  // fireEvent.change(usernameElement, {target: {value: 'batman'}});

  // add a bad email 
    // need "text@text" to pass 
  const emailElement = screen.getByTestId("email-field"); 
  userEvent.type(emailElement, "batman@"); 

  // add a valid password
  const passwordElement = screen.getByTestId("password-field");
  userEvent.type(passwordElement, "Gotham@55"); 

  const buttonElement = screen.getByTestId("submit-button"); 
  userEvent.click(buttonElement);

  // watch for p tag with data-testid="signup-error"
  const errorElement = await screen.findByTestId("signup-error"); 
  expect(errorElement).toBeInTheDocument(); 
});

test('it should display an error if the password is not at least 8 characters', async () => {
  render(
    <BrowserRouter>
      <Register />
    </BrowserRouter>
  )

  // add a valid username 
  const usernameElement = screen.getByTestId("username-field");
  userEvent.type(usernameElement, "batman");

  // fireEvent is BAD, deprecated 
  // fireEvent.change(usernameElement, {target: {value: 'batman'}});

  // add a valid email 
    // need "text@text" to pass 
  const emailElement = screen.getByTestId("email-field"); 
  userEvent.type(emailElement, "batman55@gmail.com"); 

  // add an invalid password, under 8 characters 
  const passwordElement = screen.getByTestId("password-field");
  userEvent.type(passwordElement, "Gotham"); 

  const buttonElement = screen.getByTestId("submit-button"); 
  userEvent.click(buttonElement);

  // watch for p tag with data-testid="signup-error"
  const errorElement = await screen.findByTestId("signup-error"); 
  expect(errorElement).toBeInTheDocument(); 
});


test('it should display an error if the username is empty', async () => {
  render(
    <BrowserRouter>
      <Register />
    </BrowserRouter>
  )

  // NO USERNAME added 

  // add a valid email 
    // need "text@text" to pass 
  const emailElement = screen.getByTestId("email-field"); 
  userEvent.type(emailElement, "batman55@gmail.com"); 

  // add an invalid password, under 8 characters 
  const passwordElement = screen.getByTestId("password-field");
  userEvent.type(passwordElement, "Gotham"); 

  const buttonElement = screen.getByTestId("submit-button"); 
  userEvent.click(buttonElement);

  // watch for p tag with data-testid="signup-error"
  const errorElement = await screen.findByTestId("signup-error"); 
  expect(errorElement).toBeInTheDocument(); 
});