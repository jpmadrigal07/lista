import { render, screen } from '@testing-library/react';
import Home from './pages/Home/Home';

test('renders welcome to Lista', () => {
  render(
    <Home />
  );
  const linkElement = screen.getByText(/Welcome to Lista!/i);
  expect(linkElement).toBeInTheDocument();
});
