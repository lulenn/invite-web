import { render, fireEvent } from '@testing-library/react';
import SuccessModal from '.';

const onOk = jest.fn();
const props = {
  visible: true,
  onOk
};

describe('SuccessModal', () => {
  it('should take a snapshot', () => {
    const { asFragment } = render(<SuccessModal {...props} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('close modal', () => {
    const { getByText } = render(<SuccessModal {...props} />);
    fireEvent.click(getByText('Ok'));
    expect(onOk).toHaveBeenCalledTimes(1);
  });
});
