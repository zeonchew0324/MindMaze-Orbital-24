import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import ResetPasswordForm from '../../../src/components/resetPasswordForm/ResetPasswordForm';
import { doSendPasswordResetEmail } from '../../../src/firebase/auth';

vi.mock('../../../src/firebase/auth', () => ({
  doSendPasswordResetEmail: vi.fn(),
}));

describe('ResetPasswordForm', () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it('Renders the reset password form', () => {
    render(<ResetPasswordForm />);

    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
    expect(screen.getByText(/Reset your password/i)).toBeInTheDocument();
    expect(screen.getByText(/Send Password Reset Email/i)).toBeInTheDocument();
  });

  it('Calls the reset password function with email', async () => {
    const mockDoSendPasswordResetEmail = vi.mocked(doSendPasswordResetEmail);
    mockDoSendPasswordResetEmail.mockResolvedValueOnce(void 0); // Mock successful email sending

    render(<ResetPasswordForm />);

    userEvent.type(screen.getByPlaceholderText(/Email/i), 'test@example.com');
    userEvent.click(screen.getByText(/Send Password Reset Email/i));

    expect(mockDoSendPasswordResetEmail).toHaveBeenCalledWith('test@example.com');
    expect(mockDoSendPasswordResetEmail).toHaveBeenCalledTimes(1);
  });

  // it('Shows an error message if sending email fails', async () => {
  //   const mockDoSendPasswordResetEmail = vi.mocked(doSendPasswordResetEmail);
  //   mockDoSendPasswordResetEmail.mockRejectedValueOnce(new Error('Reset email failed'));

  //   render(<ResetPasswordForm />);

  //   userEvent.type(screen.getByPlaceholderText(/Email/i), 'test@example.com');
  //   userEvent.click(screen.getByText(/Send Password Reset Email/i));

  //   const alertMessage = await screen.findByText('Reset email failed');
  //   expect(alertMessage).toBeInTheDocument();
  //   expect(mockDoSendPasswordResetEmail).toHaveBeenCalledTimes(1);
  // });

  // it('Prevents multiple submissions within 10 seconds', async () => {
  //   const mockDoSendPasswordResetEmail = vi.mocked(doSendPasswordResetEmail);
  //   mockDoSendPasswordResetEmail.mockResolvedValueOnce(void 0); // Mock successful email sending

  //   render(<ResetPasswordForm />);

  //   userEvent.type(screen.getByPlaceholderText(/Email/i), 'test@example.com');
  //   userEvent.click(screen.getByText(/Send Password Reset Email/i));

  //   expect(mockDoSendPasswordResetEmail).toHaveBeenCalledTimes(1);

  //   userEvent.click(screen.getByText(/Send Password Reset Email/i)); // Try to send again immediately
  //   const alertMessage = await screen.findByText('You can only do this every 10 seconds!');
  //   expect(alertMessage).toBeInTheDocument();
  //   expect(mockDoSendPasswordResetEmail).toHaveBeenCalledTimes(1); // Should still be 1
  // });
});
