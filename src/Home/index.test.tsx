import { render } from '@testing-library/react';
import Home from '.';

describe('Home', () => {
  it('should take a snapshot', () => {
    const { asFragment } = render(<Home />);
    expect(asFragment()).toMatchSnapshot();
  });
});
