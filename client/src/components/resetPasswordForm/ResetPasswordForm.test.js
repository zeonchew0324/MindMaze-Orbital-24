import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ResetPasswordForm from './ResetPasswordForm';
import { doSendPasswordResetEmail } from '../../firebase/auth';

jest.mock('../../firebase/auth');

describe('ResetPasswordForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders the form', () => {
    render(<ResetPasswordForm />);
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByText('Send Password Reset Email')).toBeInTheDocument();
  });

  test('submits the form with valid email', async () => {
    const mockEmail = 'test@example.com';
    doSendPasswordResetEmail.mockResolvedValue();

    render(<ResetPasswordForm />);

    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: mockEmail } });
    fireEvent.click(screen.getByText('Send Password Reset Email'));

    await waitFor(() => expect(doSendPasswordResetEmail).toHaveBeenCalledWith(mockEmail));
    await waitFor(() => expect(window.alert).toHaveBeenCalledWith('Email sent!'));
  });

  test('displays error message on failed submission', async () => {
    const mockEmail = 'test@example.com';
    const errorMessage = 'Error sending email';
    doSendPasswordResetEmail.mockRejectedValue(new Error(errorMessage));

    render(<ResetPasswordForm />);

    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: mockEmail } });
    fireEvent.click(screen.getByText('Send Password Reset Email'));

    await waitFor(() => expect(doSendPasswordResetEmail).toHaveBeenCalledWith(mockEmail));
    await waitFor(() => expect(window.alert).toHaveBeenCalledWith(errorMessage));
  });

  test('prevents submission if already sending', async () => {
    const mockEmail = 'test@example.com';
    doSendPasswordResetEmail.mockResolvedValue();

    render(<ResetPasswordForm />);

    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: mockEmail } });
    fireEvent.click(screen.getByText('Send Password Reset Email'));
    fireEvent.click(screen.getByText('Send Password Reset Email'));

    await waitFor(() => expect(doSendPasswordResetEmail).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(window.alert).toHaveBeenCalledWith('You can only do this every 10 seconds!'));
  });
});
