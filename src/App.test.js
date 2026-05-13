import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  expect(screen.getAllByText(/EDIFICA/i).length).toBeGreaterThan(0);
  expect(screen.getAllByText(/Construimos/i).length).toBeGreaterThan(0);
});
