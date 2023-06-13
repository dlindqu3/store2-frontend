import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import { Router } from 'react-router-dom';
import Login from './Login';
import { BrowserRouter } from 'react-router-dom';


// jest.requireActual(moduleName)
// Returns the actual module instead of a mock, bypassing all checks on whether the module should receive a mock implementation or not.

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
 useNavigate: () => mockedUsedNavigate,
}));

test('it should an input field for an email', () => {
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  )
    const element = screen.getByTestId("email-field");
    expect(element).toBeInTheDocument(); 
});

test('it should have a submit button', () => {
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  )
    const element = screen.getByTestId("submit-button");
    expect(element).toBeInTheDocument(); 
});
  