import { render, screen, test, expect } from '@testing-library/react';
import App from './App';

// to fix error "SyntaxError: Cannot use import statement outside a module" while testing: 
  // AAA 

test('renders h2 with text', () => {
  render(<App />);
  const h2 = screen.getByText(/home/i);
  expect(h2).toBeInTheDocument(); 
});