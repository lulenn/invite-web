import { render, waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UserModal from '.';
import axiosMock from 'axios';

jest.mock('axios');

const onOk = jest.fn();
const onCancel = jest.fn();
const props = {
  visible: true,
  onOk,
  onCancel
};

describe('UserModal', () => {
  it('should take a snapshot', () => {
    const { asFragment } = render(<UserModal {...props} />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('form should validate correctly', async () => {
    render(<UserModal {...props} />);
    const btn = screen.getByText('Send');
    const nameInput = screen.getByPlaceholderText('Full name');
    const emailInput = screen.getByPlaceholderText('Email');
    const confirmEmailInput = screen.getByPlaceholderText('Confirm email');

    userEvent.click(btn);
    await waitFor(() => expect(screen.getByText('Full name is required!')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText('Email is required!')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText('Confirm email is required!')).toBeInTheDocument());

    userEvent.type(nameInput, 'aa');
    expect(nameInput).toHaveValue('aa');
    expect(screen.queryByText('Full name is required!')).toBeInTheDocument();

    userEvent.type(nameInput, 'aaa');
    expect(nameInput).toHaveValue('aaa');
    expect(screen.queryByText('Full name needs to be at least 3 characters long!')).toBeInTheDocument();

    userEvent.type(emailInput, 'invalid.email');
    expect(emailInput).toHaveValue('invalid.email');
    expect(screen.queryByText('Email is not in a validation email format!')).toBeInTheDocument();

    userEvent.type(emailInput, 'valid@xx.email.com');
    userEvent.type(confirmEmailInput, 'valid@yy.email.com');
    expect(confirmEmailInput).toHaveValue('valid@yy.email.com');
    expect(screen.queryByText('The confirm email does not match the email!')).toBeInTheDocument();
  });

  it('submit', async () => {
    render(<UserModal {...props} />);
    const btn = screen.getByText('Send');
    const nameInput = screen.getByPlaceholderText('Full name');
    const emailInput = screen.getByPlaceholderText('Email');
    const confirmEmailInput = screen.getByPlaceholderText('Confirm email');

    userEvent.type(nameInput, 'aaa');
    userEvent.type(emailInput, 'usedemail@airwallex.com');
    userEvent.type(confirmEmailInput, 'usedemail@airwallex.com');
    expect(screen.getByTestId('error')).not.toBeInTheDocument();
    // TODO:mock code here
    userEvent.click(btn);
    await waitFor(() => expect(screen.getByTestId('error')).toBeInTheDocument());

    userEvent.type(nameInput, 'bbb');
    userEvent.type(emailInput, 'valid@xx.email.com');
    userEvent.type(confirmEmailInput, 'valid@yy.email.com');
    // TODO:mock code here
    userEvent.click(btn);
    expect(onOk).toBeCalledTimes(1);
  });
});
