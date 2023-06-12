import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import Home from "./Home"; 

test('renders h2 with text', () => {
  render(<Home />);
  const h2 = screen.getByText(/home/i);
  expect(h2).toBeInTheDocument(); 
});