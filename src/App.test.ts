import { render, screen } from '@testing-library/react';
import App from './App';
import { APP_TITLE, APP_COPYRIGHT } from './constant';

test('renders Footer with copyright', () => {
  render(<App />);
  const element = screen.getByText(RegExp(APP_COPYRIGHT, 'i'));
  expect(element).toBeInTheDocument();
});
